import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
Sentry.init({
    dsn: process.env.sentry_dsn,
    integrations: [
        nodeProfilingIntegration()
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0
});