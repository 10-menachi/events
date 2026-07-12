# ADR 006: Validate Requests Before Business Logic

## Status

Accepted

---

## Context

Application services should operate on valid data.

Allowing invalid input to reach business logic increases complexity and leads to inconsistent validation across the application.

---

## Decision

Incoming requests will be validated before controllers invoke business logic.

Validation rules will be implemented in dedicated validator modules.

Controllers may assume that validated data satisfies the application's input requirements.

---

## Consequences

### Advantages

- Consistent validation.
- Cleaner controllers.
- Improved type safety.
- Centralized validation rules.

### Trade-offs

- Additional validator modules.
- Validation must be maintained alongside API changes.