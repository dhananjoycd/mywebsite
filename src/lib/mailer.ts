import nodemailer from "nodemailer";

const REQUIRED_CONFIG_MESSAGE = "Email service is not configured.";

function getEnvValue(key: string) {
  const value = process.env[key];
  return typeof value === "string" ? value.trim() : "";
}

export function getMailerConfig() {
  const service = getEnvValue("SMTP_SERVICE");
  const host = getEnvValue("SMTP_HOST");
  const portValue = getEnvValue("SMTP_PORT");
  const user = getEnvValue("SMTP_USER");
  const pass = getEnvValue("SMTP_PASS");
  const contactEmail = getEnvValue("CONTACT_EMAIL") || user;

  if (!user || !pass || !contactEmail) {
    throw new Error(REQUIRED_CONFIG_MESSAGE);
  }

  if (!service && !host) {
    throw new Error(REQUIRED_CONFIG_MESSAGE);
  }

  if (!service && !portValue) {
    throw new Error(REQUIRED_CONFIG_MESSAGE);
  }

  const port = portValue ? Number(portValue) : undefined;
  if (!service && (!port || !Number.isInteger(port) || port <= 0)) {
    throw new Error(REQUIRED_CONFIG_MESSAGE);
  }

  return {
    service,
    host,
    port,
    user,
    pass,
    contactEmail,
  };
}

export function createMailTransport() {
  const config = getMailerConfig();

  const transport = config.service
    ? nodemailer.createTransport({
        service: config.service,
        auth: {
          user: config.user,
          pass: config.pass,
        },
      })
    : nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.port === 465,
        auth: {
          user: config.user,
          pass: config.pass,
        },
      });

  return {
    transporter: transport,
    fromEmail: config.user,
    contactEmail: config.contactEmail,
  };
}
