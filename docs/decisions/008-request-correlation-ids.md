# ADR 008: Use Request Correlation IDs

## Status

Accepted

## Context

As the application grows, multiple requests may be processed at the same time.
Debugging issues becomes difficult when logs from different requests are mixed
together.

A mechanism is required to trace all logs belonging to a single request.

## Decision

The application will generate a unique request ID for every incoming HTTP
request.

The request ID will:

- Be generated when a request enters the application.
- Be attached to the request context.
- Be returned to clients through the `X-Request-ID` response header.
- Be included in application logs.

Example:

```text
Client Request
      |
      v
Request ID: 7d8c1f...
      |
      +--> Controller Log
      |
      +--> Service Log
      |
      +--> Database Error Log
```
