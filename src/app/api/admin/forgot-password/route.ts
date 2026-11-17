import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createPasswordResetToken, verifyPasswordResetToken } from "@/lib/auth";
import { createMailTransport } from "@/lib/mailer";

// Generate 6-digit random code
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    // STEP 1: Request Reset Code (Sends OTP to Admin Email)
    if (action === "request_reset") {
      const { email } = body;
      if (!email) {
        return NextResponse.json({ ok: false, error: "Email is required" }, { status: 400 });
      }

      const cleanEmail = email.toLowerCase().trim();
      const admin = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });

      if (!admin || admin.role !== "ADMIN") {
        // Return success message anyway to prevent email enumeration, but do nothing
        return NextResponse.json({
          ok: true,
          message: "If this email belongs to an admin account, a verification code has been dispatched.",
        });
      }

      const otp = generateOTP();
      const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

      // Store in SiteSetting table
      await prisma.siteSetting.upsert({
        where: { key: `pwd_reset_${cleanEmail}` },
        update: { value: JSON.stringify({ otp, expiresAt }) },
        create: {
          key: `pwd_reset_${cleanEmail}`,
          value: JSON.stringify({ otp, expiresAt }),
        },
      });

      // Try sending email via Nodemailer
      let emailSent = false;
      try {
        const { transporter, fromEmail } = createMailTransport();
        const fromAddress = process.env.SMTP_FROM || `"Admin Security" <${fromEmail}>`;
        
        await transporter.sendMail({
          from: fromAddress,
          to: cleanEmail,
          subject: "Password Reset Verification Code - Admin Portal",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b132b; color: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid #1c2a4f;">
              <h2 style="color: #38bdf8; margin-top: 0;">Admin Password Reset Request</h2>
              <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
                You recently requested to reset your password for the Admin Dashboard. Use the 6-digit verification code below to proceed:
              </p>
              <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #38bdf8; font-family: monospace;">
                  ${otp}
                </span>
              </div>
              <p style="color: #94a3b8; font-size: 12px; line-height: 1.5;">
                This code will expire in <strong>15 minutes</strong>. If you did not make this request, you can safely ignore this email.
              </p>
            </div>
          `,
        });
        emailSent = true;
      } catch (mailError) {
        console.warn("Could not send reset email via SMTP:", mailError);
      }

      return NextResponse.json({
        ok: true,
        message: emailSent
          ? `Verification code dispatched to ${cleanEmail}.`
          : `Verification code generated. (SMTP Notice: You can also use your ADMIN_SECRET key to verify instantly).`,
      });
    }

    // STEP 2: Verify Code or Admin Secret
    if (action === "verify_code") {
      const { email, code } = body;
      if (!email || !code) {
        return NextResponse.json({ ok: false, error: "Email and code are required" }, { status: 400 });
      }

      const cleanEmail = email.toLowerCase().trim();
      const adminSecret = process.env.ADMIN_SECRET;

      let isCodeValid = false;

      // Check Master ADMIN_SECRET override if configured
      if (adminSecret && adminSecret.trim() !== "" && code.trim() === adminSecret.trim()) {
        isCodeValid = true;
      } else {
        const record = await prisma.siteSetting.findUnique({
          where: { key: `pwd_reset_${cleanEmail}` },
        });

        if (record) {
          try {
            const data = JSON.parse(record.value);
            if (data.otp === code.trim() && Date.now() < data.expiresAt) {
              isCodeValid = true;
            }
          } catch {
            isCodeValid = false;
          }
        }
      }

      if (!isCodeValid) {
        return NextResponse.json(
          { ok: false, error: "Invalid or expired verification code" },
          { status: 400 }
        );
      }

      // Generate a single-use JWT reset token valid for 15 mins
      const resetToken = await createPasswordResetToken(cleanEmail);

      return NextResponse.json({
        ok: true,
        resetToken,
        message: "Code verified successfully.",
      });
    }

    // STEP 3: Reset Password with Verified Token
    if (action === "reset_password") {
      const { resetToken, newPassword } = body;
      if (!resetToken || !newPassword) {
        return NextResponse.json(
          { ok: false, error: "Reset token and new password are required" },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { ok: false, error: "Password must be at least 6 characters" },
          { status: 400 }
        );
      }

      const email = await verifyPasswordResetToken(resetToken);
      if (!email) {
        return NextResponse.json(
          { ok: false, error: "Invalid or expired reset session. Please request a new code." },
          { status: 400 }
        );
      }

      const newPasswordHash = await bcrypt.hash(newPassword, 12);

      await prisma.user.update({
        where: { email },
        data: { passwordHash: newPasswordHash },
      });

      // Cleanup reset code
      try {
        await prisma.siteSetting.delete({
          where: { key: `pwd_reset_${email}` },
        });
      } catch {
        // ignore
      }

      return NextResponse.json({
        ok: true,
        message: "Password has been successfully reset! You can now log in.",
      });
    }

    return NextResponse.json({ ok: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Forgot password API error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error occurred" },
      { status: 500 }
    );
  }
}
