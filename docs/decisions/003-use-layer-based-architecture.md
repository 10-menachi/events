# ADR 003: Use Layer-Based Architecture

## Status

Accepted

---

## Context

The backend requires a clear separation of responsibilities to improve maintainability, readability, and testability.

As the application grows, combining HTTP handling, business logic, configuration, validation, and infrastructure code in the same files would increase complexity and make the codebase more difficult to maintain.

---

## Decision

The backend will adopt a layer-based architecture.

Each application layer has a single responsibility.

The primary layers are:

- Routes
- Controllers
- Services
- Middleware
- Validators
- Configuration
- Utilities

Business logic must not be placed inside controllers or routes.

---

## Consequences

### Advantages

- Clear separation of responsibilities.
- Easier testing.
- Improved maintainability.
- Familiar architecture for Express applications.
- Better scalability as new features are introduced.

### Trade-offs

- Features are spread across multiple layers.
- Developers must understand the responsibilities of each layer.