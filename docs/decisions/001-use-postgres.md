# ADR 001: Use PostGres as the Primary Database

## Status

Accepted

## Context

The Event Platform requires Strong relationships between entities:

- Users
- Organisations
- Events
- Tickets
- Registrations
- Payments

The system will contain many relational constraints and transactional operations.

## Decision

Use PostgreSQL as the Primary Database

The Application will access PostgreSQL through the Prisma ORM

## Consequences

Advantages:

- Strong Relational Modelling
- ACID Transactions
- Mature Indexing and Query Capabilities
- Good Support for Complex Relationships

Trade-Offs:

- Requires Schema Design and Migrations
- Less flexible for unstrructured data compared to document databases