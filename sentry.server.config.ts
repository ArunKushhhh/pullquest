// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const isProd = process.env.NODE_ENV === "production";

if (isProd && !process.env.SENTRY_DSN) {
  console.warn("Sentry DSN is not configured. Set SENTRY_DSN to enable error tracking.");
}

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Use a lower sample rate in production to reduce volume and cost.
  tracesSampleRate: isProd ? 0.1 : 1.0,

  // Only enable log forwarding in non-production environments.
  enableLogs: !isProd,

  // Only send PII in non-production environments to protect user privacy.
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: !isProd,
});
