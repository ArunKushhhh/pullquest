// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const isProd = process.env.NODE_ENV === "production";

Sentry.init({
  // Read DSN from environment to avoid hardcoding and to allow per-environment config.
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Define how likely traces are sampled.
  // Use a lower default sampling rate in production to control volume/cost,
  // while keeping full sampling in non-production for debugging.
  tracesSampleRate: isProd ? 0.1 : 1.0,

  // Enable logs to be sent to Sentry in non-production by default.
  // In production, disable by default to reduce noise and potential data exposure.
  enableLogs: isProd ? false : true,

  // Enable sending user PII (Personally Identifiable Information) only in non-production by default.
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: isProd ? false : true,
});
