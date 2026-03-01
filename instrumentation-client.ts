// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a user loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const isProd = process.env.NODE_ENV === "production";

if (isProd && !process.env.NEXT_PUBLIC_SENTRY_DSN) {
  console.warn("Sentry DSN is not configured. Set NEXT_PUBLIC_SENTRY_DSN to enable error tracking.");
}

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Add optional integrations for additional features
  integrations: [Sentry.replayIntegration()],

  // Use a lower sample rate in production to reduce volume and cost.
  tracesSampleRate: isProd ? 0.1 : 1.0,

  // Only enable log forwarding in non-production environments.
  enableLogs: !isProd,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Only send PII in non-production environments to protect user privacy.
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: !isProd,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
