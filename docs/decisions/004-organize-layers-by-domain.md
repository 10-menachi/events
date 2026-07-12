# ADR 004: Organize Layers by Domain

## Status

Accepted

---

## Context

As the number of features increases, flat directories become difficult to navigate.

Grouping all controllers, services, or validators into a single directory does not scale well for large applications.

---

## Decision

Each architectural layer will be organized by business domain.

For example:

```
controllers/
    auth/
    user/
    event/

services/
    auth/
    user/
    event/

routes/
    auth/
    user/
    event/

validators/
    auth/
    user/
    event/
```

This organization keeps related files together while preserving separation between architectural layers.

---

## Consequences

### Advantages

- Improved scalability.
- Easier navigation.
- Reduced merge conflicts.
- Better separation between business domains.

### Trade-offs

- Slightly deeper directory structure.
- Requires consistent naming conventions.