import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createMailTransport } from "@/lib/mailer";
import { 
  generateAdminOrderAlertHtml, 
  generateClientConfirmationHtml 
} from "@/lib/email-templates";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_PHONE_LENGTH = 30;
const MAX_SERVICE_TITLE_LENGTH = 150;
const MAX_PRICE_LENGTH = 50;
const MAX_DETAILS_LENGTH = 3000;
const MAIL_TIMEOUT_MS = 10000;

function normalizeInput(value: unknown) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        reject(new Error("Mail send timed out."));
      }, timeoutMs);
    }),
  ]);
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { error: "Unsupported media type." },
        { status: 415 },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;

    const name = normalizeInput(body.name);
    const email = normalizeInput(body.email).toLowerCase();
    const phone = normalizeInput(body.phone);
    const serviceTitle = normalizeInput(body.serviceTitle);
    const servicePrice = normalizeInput(body.servicePrice);
    const details = normalizeInput(body.details);
    const paymentMethod = normalizeInput(body.paymentMethod) || "CUSTOM_QUOTE";
    const company = normalizeInput(body.company);

    const rawPoints = Array.isArray(body.servicePoints) ? body.servicePoints : [];
    const servicePoints = rawPoints
      .map((point) => normalizeInput(point))
      .filter((point) => Boolean(point));

    // Honeypot check for bots
    if (company) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !phone || !serviceTitle || !servicePrice) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (name.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: `Name must be ${MAX_NAME_LENGTH} characters or fewer.` },
        { status: 400 },
      );
    }

    if (phone.length > MAX_PHONE_LENGTH) {
      return NextResponse.json(
        { error: `Phone must be ${MAX_PHONE_LENGTH} characters or fewer.` },
        { status: 400 },
      );
    }

    if (serviceTitle.length > MAX_SERVICE_TITLE_LENGTH) {
      return NextResponse.json(
        { error: `Service title must be ${MAX_SERVICE_TITLE_LENGTH} characters or fewer.` },
        { status: 400 },
      );
    }

    if (servicePrice.length > MAX_PRICE_LENGTH) {
      return NextResponse.json(
        { error: `Price must be ${MAX_PRICE_LENGTH} characters or fewer.` },
        { status: 400 },
      );
    }

    if (details.length > MAX_DETAILS_LENGTH) {
      return NextResponse.json(
        { error: `Project details must be ${MAX_DETAILS_LENGTH} characters or fewer.` },
        { status: 400 },
      );
    }

    const trackingCode = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // 1. Persist order to database first so the lead is never lost
    let savedOrder = null;
    try {
      savedOrder = await prisma.order.create({
        data: {
          trackingCode,
          clientName: name,
          clientEmail: email,
          clientPhone: phone,
          serviceTitle,
          servicePrice,
          servicePoints,
          projectDetails: details
            ? `${details}\n\n[Payment Preference: ${paymentMethod}]`
            : `[Payment Preference: ${paymentMethod}]`,
          status: "PENDING",
        },
      });
    } catch (dbError) {
      console.error("Failed to save order to database:", dbError);
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeServiceTitle = escapeHtml(serviceTitle);
    const safeServicePrice = escapeHtml(servicePrice);
    const safeDetails = escapeHtml(details || "Not provided.").replace(/\n/g, "<br />");

    // 2. Email Notifications Engine (Admin Alert + Client Confirmation)
    try {
      const { transporter, fromEmail, contactEmail } = createMailTransport();

      const origin = request.headers.get("origin") || "http://localhost:3000";
      const trackingUrl = `${origin}/track-order?code=${trackingCode}`;

      // A. Send Admin Alert Email
      await withTimeout(
        transporter.sendMail({
          from: `"Dhananjoy Orders" <${fromEmail}>`,
          to: contactEmail,
          replyTo: email,
          subject: `[${trackingCode}] New Order: ${serviceTitle} from ${name}`,
          text:
            `New service order request (${trackingCode})\n\n` +
            `Tracking Code: ${trackingCode}\n` +
            `Service: ${serviceTitle}\n` +
            `Price: ${servicePrice}\n` +
            `Client: ${name} (${email}, ${phone})\n\n` +
            `Project Requirements:\n${details || "Not provided."}`,
          html: generateAdminOrderAlertHtml({
            trackingCode,
            serviceTitle: safeServiceTitle,
            servicePrice: safeServicePrice,
            clientName: safeName,
            clientEmail: safeEmail,
            clientPhone: safePhone,
            projectDetails: safeDetails,
            servicePoints,
          }),
        }),
        MAIL_TIMEOUT_MS,
      );

      // B. Send Client Confirmation Email with Tracking Link
      await withTimeout(
        transporter.sendMail({
          from: `"Dhananjoy Chandra Das" <${fromEmail}>`,
          to: email,
          subject: `Order Confirmation: ${serviceTitle} [${trackingCode}]`,
          text:
            `Hello ${name},\n\n` +
            `Thank you for reaching out! I have received your request for "${serviceTitle}".\n` +
            `Your Tracking Code is: ${trackingCode}\n\n` +
            `Track your order status anytime at: ${trackingUrl}\n\n` +
            `Best regards,\nDhananjoy Chandra Das`,
          html: generateClientConfirmationHtml({
            trackingCode,
            serviceTitle: safeServiceTitle,
            clientName: safeName,
            trackingUrl,
          }),
        }),
        MAIL_TIMEOUT_MS,
      );
    } catch (mailError) {
      console.error("Mail send failed, but order was recorded in DB:", mailError);
    }

    return NextResponse.json({ 
      ok: true, 
      trackingCode,
      orderId: savedOrder?.id 
    });
  } catch (error) {
    console.error("Service order submission failed.", error);
    return NextResponse.json(
      { error: "Unable to process the order request right now. Please try again later." },
      { status: 500 },
    );
  }
}
