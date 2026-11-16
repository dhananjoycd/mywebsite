export function generateAdminOrderAlertHtml({
  trackingCode,
  serviceTitle,
  servicePrice,
  clientName,
  clientEmail,
  clientPhone,
  projectDetails,
  servicePoints,
}: {
  trackingCode: string;
  serviceTitle: string;
  servicePrice: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  projectDetails: string;
  servicePoints: string[];
}) {
  const pointsList = servicePoints
    .map(
      (p) =>
        `<li style="margin-bottom:6px;color:#334155;font-size:14px;">${p}</li>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Service Booking Alert</title>
</head>
<body style="margin:0;padding:0;background-color:#0b1120;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0b1120;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
          <!-- Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg,#0284c7,#0369a1);padding:30px 40px;text-align:left;">
              <span style="background-color:rgba(255,255,255,0.2);color:#ffffff;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">
                New Service Booking
              </span>
              <h1 style="color:#ffffff;font-size:24px;font-weight:700;margin:12px 0 4px 0;">
                ${serviceTitle}
              </h1>
              <p style="color:#e0f2fe;font-size:14px;margin:0;">
                Starting at <strong style="color:#ffffff;">${servicePrice}</strong>
              </p>
            </td>
          </tr>

          <!-- Tracking Badge Box -->
          <tr>
            <td style="padding:24px 40px 10px 40px;">
              <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;">
                <div>
                  <div style="font-size:11px;color:#64748b;text-transform:uppercase;font-weight:600;letter-spacing:0.5px;">Tracking Code</div>
                  <div style="font-size:18px;font-family:monospace;font-weight:700;color:#0284c7;margin-top:2px;">${trackingCode}</div>
                </div>
              </div>
            </td>
          </tr>

          <!-- Client Details -->
          <tr>
            <td style="padding:10px 40px;">
              <h3 style="color:#0f172a;font-size:15px;font-weight:600;border-bottom:1px solid #e2e8f0;padding-bottom:8px;margin-bottom:14px;">
                Client Information
              </h3>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size:14px;color:#334155;">
                <tr>
                  <td width="100" style="padding:6px 0;color:#64748b;">Client Name:</td>
                  <td style="padding:6px 0;font-weight:600;color:#0f172a;">${clientName}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#64748b;">Email:</td>
                  <td style="padding:6px 0;"><a href="mailto:${clientEmail}" style="color:#0284c7;text-decoration:none;">${clientEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#64748b;">Phone:</td>
                  <td style="padding:6px 0;font-weight:600;color:#0f172a;">${clientPhone}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Requirements Note -->
          <tr>
            <td style="padding:10px 40px;">
              <h3 style="color:#0f172a;font-size:15px;font-weight:600;border-bottom:1px solid #e2e8f0;padding-bottom:8px;margin-bottom:10px;">
                Client Project Requirements
              </h3>
              <div style="background-color:#f1f5f9;border-left:4px solid #0284c7;padding:14px 16px;border-radius:4px;color:#334155;font-size:14px;line-height:1.6;">
                ${projectDetails || "<em>No additional details provided.</em>"}
              </div>
            </td>
          </tr>

          <!-- Included Scope -->
          ${
            servicePoints.length > 0
              ? `
          <tr>
            <td style="padding:10px 40px 24px 40px;">
              <h3 style="color:#0f172a;font-size:15px;font-weight:600;border-bottom:1px solid #e2e8f0;padding-bottom:8px;margin-bottom:10px;">
                Package Deliverables
              </h3>
              <ul style="margin:0;padding-left:20px;">
                ${pointsList}
              </ul>
            </td>
          </tr>
          `
              : ""
          }

          <!-- Footer Action -->
          <tr>
            <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;text-align:center;">
              <p style="color:#64748b;font-size:13px;margin:0 0 12px 0;">
                You can review this request, update status, and attach a formal quote inside your Admin Portal.
              </p>
              <div style="font-size:11px;color:#94a3b8;">
                Dhananjoy Portfolio System • Automated Notification
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function generateClientConfirmationHtml({
  trackingCode,
  serviceTitle,
  clientName,
  trackingUrl,
}: {
  trackingCode: string;
  serviceTitle: string;
  clientName: string;
  trackingUrl: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Service Order Received</title>
</head>
<body style="margin:0;padding:0;background-color:#0b1120;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0b1120;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0284c7,#0f172a);padding:36px 40px;text-align:center;">
              <h1 style="color:#ffffff;font-size:24px;font-weight:700;margin:0;">
                Thank You for Your Order!
              </h1>
              <p style="color:#93c5fd;font-size:14px;margin:8px 0 0 0;">
                We have successfully received your inquiry for <strong>${serviceTitle}</strong>.
              </p>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding:32px 40px;">
              <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 18px 0;">
                Hello <strong>${clientName}</strong>,
              </p>
              <p style="font-size:14px;color:#475569;line-height:1.6;margin:0 0 24px 0;">
                Thank you for choosing my web development services. I have received your request and am reviewing your project requirements. I typically respond within <strong>24 hours</strong> with an exact project timeline and formal quotation.
              </p>

              <!-- Tracking Code Banner -->
              <div style="background-color:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;padding:20px;text-align:center;margin-bottom:28px;">
                <span style="font-size:12px;color:#0284c7;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
                  Your Project Tracking Code
                </span>
                <div style="font-size:22px;font-family:monospace;font-weight:bold;color:#0369a1;margin:6px 0;">
                  ${trackingCode}
                </div>
                <p style="font-size:12px;color:#64748b;margin:4px 0 16px 0;">
                  Please keep this code to track milestone progress and deliverables at any time.
                </p>
                <a href="${trackingUrl}" style="background-color:#0284c7;color:#ffffff;padding:10px 22px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;display:inline-block;">
                  Track Order Live Status →
                </a>
              </div>

              <p style="font-size:14px;color:#475569;line-height:1.6;margin:0;">
                If you have any immediate questions or additional files to share, you can reply directly to this email.
              </p>
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;color:#64748b;font-size:13px;line-height:1.5;">
              <strong style="color:#0f172a;">Dhananjoy Chandra Das</strong><br>
              Full-Stack Web Developer & Educator<br>
              <a href="https://github.com/dhananjoycd" style="color:#0284c7;text-decoration:none;">github.com/dhananjoycd</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

