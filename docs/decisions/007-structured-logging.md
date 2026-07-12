# ADR 007: Use Structured Application Logging

## Status

Accepted

## Context

The application requires a consistent way to record runtime events,
errors, and operational information.

Simple console logging becomes difficult to maintain as the application
grows because logs need to be searchable, machine-readable, and usable
with monitoring systems.

The application is expected to run in containerized environments and
eventually Kubernetes, where log collection is typically handled by the
infrastructure layer.

## Decision

The application will use structured logging through Pino.

Application code should use the logger instead of direct console calls.

Example:

```ts
logger.info("Database connected");

logger.error(error);