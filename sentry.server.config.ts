// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const isProd = process.env.NODE_ENV === "production";

const dsn =
  process.env.SENTRY_DSN ??
  process.env.NEXT_PUBLIC_SENTRY_DSN ??
  undefined;

const tracesSampleRate =
  process.env.SENTRY_TRACES_SAMPLE_RATE !== undefined
    ? Number(process.env.SENTRY_TRACES_SAMPLE_RATE)
    : isProd
    ? 0.2
    : 1.0;

const enableLogs =
  process.env.SENTRY_ENABLE_LOGS !== undefined
    ? process.env.SENTRY_ENABLE_LOGS === "true"
    : !isProd;

const sendDefaultPii =
  process.env.SENTRY_SEND_DEFAULT_PII !== undefined
    ? process.env.SENTRY_SEND_DEFAULT_PII === "true"
    : false;

Sentry.init({
  dsn,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate,

  // Enable logs to be sent to Sentry
  enableLogs,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii,
});
