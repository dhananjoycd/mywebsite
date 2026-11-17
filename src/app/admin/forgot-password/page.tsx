"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  KeyRound, 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  Loader2, 
  Eye, 
  EyeOff, 
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Step 1: Request Code
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your admin email address.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request_reset", email }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to process request");

      setMessage(data.message);
      setStep(2);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error sending code");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify Code
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      setError("Please enter the verification code.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify_code", email, code }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Verification failed");

      setResetToken(data.resetToken);
      setMessage("Code verified! Please set your new password.");
      setStep(3);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Code verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset_password", resetToken, newPassword }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to reset password");

      setSuccess(true);
      setMessage("Your admin password has been successfully reset!");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.15),transparent_35%),linear-gradient(180deg,#050b19_0%,#020617_100%)] p-4 text-slate-100">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.25)]">
            <KeyRound className="h-7 w-7" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-white">Reset Admin Password</h1>
          <p className="mt-1 text-xs text-slate-400">
            Secure multi-factor recovery for your Portfolio CMS
          </p>
        </div>

        <Card className="rounded-3xl border-white/10 bg-slate-950/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
              <ShieldAlert className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {message && !error && (
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-3.5 text-xs text-cyan-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
              <span>{message}</span>
            </div>
          )}

          {success ? (
            <div className="text-center py-4 space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="text-sm text-slate-300">
                You can now log in to the Admin Dashboard using your new password.
              </p>
              <Link href="/admin/login" className="block pt-2">
                <Button className="w-full gap-2">
                  Proceed to Login
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* STEP 1: Enter Email */}
              {step === 1 && (
                <form onSubmit={handleRequestCode} className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Registered Admin Email
                    </label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="dhananjoychandradas@gmail.com"
                        required
                        className="w-full rounded-xl border border-white/10 bg-slate-900/90 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full gap-2">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                    Send Verification Code
                  </Button>
                </form>
              )}

              {/* STEP 2: Enter OTP Code */}
              {step === 2 && (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                        6-Digit Code / Secret Key
                      </label>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-[11px] text-cyan-400 hover:underline"
                      >
                        Change Email
                      </button>
                    </div>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="e.g. 849201 or ADMIN_SECRET"
                      required
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900/90 px-4 py-2.5 text-center text-lg font-mono tracking-widest text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
                    />
                    <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                      Enter the 6-digit code received via email, or enter your environment <code className="text-cyan-300">ADMIN_SECRET</code> key as emergency master override.
                    </p>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full gap-2">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                    Verify Code
                  </Button>
                </form>
              )}

              {/* STEP 3: Enter New Password */}
              {step === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      New Password
                    </label>
                    <div className="relative mt-1.5">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        required
                        className="w-full rounded-xl border border-white/10 bg-slate-900/90 py-2.5 pl-4 pr-10 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Confirm New Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      required
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900/90 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full gap-2">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                    Set New Password
                  </Button>
                </form>
              )}
            </>
          )}

          <div className="mt-6 border-t border-white/10 pt-4 text-center">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Admin Login
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}

