# ADR 005: Keep Business Logic in Services

## Status

Accepted

---

## Context

Controllers are responsible for handling HTTP requests and responses.

Mixing business logic with HTTP concerns leads to large controllers that are difficult to test and maintain.

---

## Decision

Business logic will reside in service classes or service functions.

Controllers are responsible for:

- Reading request data.
- Invoking services.
- Returning HTTP responses.

Services are responsible for implementing business rules and coordinating interactions with the database and external systems.

---

## Consequences

### Advantages

- Thin controllers.
- Easier testing.
- Reusable business logic.
- Improved maintainability.

### Trade-offs

- Increased number of files.
- Slightly more application structure.