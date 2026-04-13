import { NextResponse } from "next/server";

import { createMailTransport } from "@/lib/mailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+()\-.\s\d]{7,30}$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 160;
const MAX_PHONE_LENGTH = 30;
const MAX_SERVICE_TITLE_LENGTH = 120;
const MAX_PRICE_LENGTH = 80;
const MAX_DETAILS_LENGTH = 1200;
const MAIL_TIMEOUT_MS = 10000;

function normalizeInput(value: unknown) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

function normalizePoints(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => normalizeInput(item))
    .filter(Boolean)
    .slice(0, 8);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
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
    const details = normalizeInput(body.details);
    const serviceTitle = normalizeInput(body.serviceTitle);
    const servicePrice = normalizeInput(body.servicePrice);
    const servicePoints = normalizePoints(body.servicePoints);

    if (!name || !email || !phone || !serviceTitle || !servicePrice) {
      return NextResponse.json(
        { error: "Name, email, phone, and service details are required." },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (!PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 },
      );
    }

    if (name.length > MAX_NAME_LENGTH || email.length > MAX_EMAIL_LENGTH || phone.length > MAX_PHONE_LENGTH) {
      return NextResponse.json(
        { error: "One or more fields are too long." },
        { status: 400 },
      );
    }

    if (serviceTitle.length > MAX_SERVICE_TITLE_LENGTH || servicePrice.length > MAX_PRICE_LENGTH) {
      return NextResponse.json(
        { error: "Invalid service information." },
        { status: 400 },
      );
    }

    if (details.length > MAX_DETAILS_LENGTH) {
      return NextResponse.json(
        { error: `Project details must be ${MAX_DETAILS_LENGTH} characters or fewer.` },
        { status: 400 },
      );
    }

    const { transporter, fromEmail, contactEmail } = createMailTransport();

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeServiceTitle = escapeHtml(serviceTitle);
    const safeServicePrice = escapeHtml(servicePrice);
    const safeDetails = escapeHtml(details || "Not provided.").replace(/\n/g, "<br />");
    const safePoints = servicePoints.map((point) => `<li>${escapeHtml(point)}</li>`).join("");

    await withTimeout(
      transporter.sendMail({
        from: `"Portfolio Orders" <${fromEmail}>`,
        to: contactEmail,
        replyTo: email,
        subject: `Service order request: ${serviceTitle}`,
        text:
          `New service order request\n\n` +
          `Service: ${serviceTitle}\n` +
          `Starting price: ${servicePrice}\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Phone: ${phone}\n\n` +
          `Project details:\n${details || "Not provided."}\n\n` +
          `Included points:\n${servicePoints.map((point) => `- ${point}`).join("\n")}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;">
            <h2>New Service Order Request</h2>
            <p><strong>Service:</strong> ${safeServiceTitle}</p>
            <p><strong>Starting Price:</strong> ${safeServicePrice}</p>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
            <p><strong>Project Details:</strong></p>
            <p>${safeDetails}</p>
            <p><strong>Included Points:</strong></p>
            <ul>${safePoints}</ul>
          </div>
        `,
      }),
      MAIL_TIMEOUT_MS,
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Service order submission failed.", error);
    return NextResponse.json(
      { error: "Unable to send the order request right now. Please try again later." },
      { status: 500 },
    );
  }
}
