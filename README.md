# Event Platform

A production-oriented event management platform built to explore modern
software engineering practices using TypeScript, JavaScript, Laravel,
Go, and other technologies.

The goal of this project is not only to build a working application,
but to document the engineering decisions, architecture patterns, and
trade-offs involved in building scalable software.

---

## Goals

This project aims to explore:

- Full-stack application architecture
- TypeScript and JavaScript ecosystem deeply
- Backend engineering practices
- Database design
- Authentication systems
- Testing strategies
- API design
- Queues and background jobs
- Real-time communication
- Observability
- Distributed systems concepts

The initial implementation starts as a TypeScript modular monolith,
with the possibility of extracting services written in different
languages as the system evolves.

---

# Tech Stack

## Current

### Backend

- Bun runtime
- TypeScript
- Express.js
- Prisma ORM
- PostgreSQL

### Infrastructure

- Docker
- Docker Compose

### Documentation

- Markdown
- Mermaid diagrams
- Architecture Decision Records (ADRs)

---

# Repository Structure

```
events/
│
├── apps/
│   └── api/              # Backend API application
│
├── packages/             # Shared libraries and packages
│
├── docs/                 # Project documentation
│   ├── architecture.md
│   ├── domain-model.md
│   ├── db-design.md
│   ├── er-diagram.md
│   └── decisions/        # Architecture Decision Records
│
└── README.md
```

---

# Architecture

The project currently follows a modular monolith approach.

```
Client Applications

        |

        |

Express API

        |

        |

Application Modules

        |

        |

Prisma ORM

        |

        |

PostgreSQL
```

Future iterations may introduce:

- Background workers
- Message queues
- WebSocket services
- Independent services written in Go/Rust/Laravel

---

# Documentation

## Architecture

- [Architecture Overview](docs/architecture.md)

## Domain Design

- [Domain Model](docs/domain-model.md)
- [Database Design](docs/db-design.md)
- [Entity Relationship Diagram](docs/er-diagram.md)

## Architecture Decisions

- [ADR 001: Use PostgreSQL](docs/decisions/001-use-postgres.md)
- [ADR 002: Use UUID Primary Keys](docs/decisions/002-use-uuid-primary-keys.md)
- [ADR 003: Use Layer-Based Architecture](docs/decisions/003-use-layer-based-architecture.md)
- [ADR 004: Organize Layers by Domain](docs/decisions/004-organize-layers-by-domain.md)
- [ADR 005: Keep Business Logic in Services](docs/decisions/005-keep-business-logic-in-services.md)
- [ADR 006: Validate Requests Before Business Logic](docs/decisions/006-validate-requests-before-business-logic.md)

---

# Development Setup

## Requirements

Install:

- Bun
- Docker
- Docker Compose

---

## Clone Repository

```bash
git clone <repository-url>

cd events
```

---

## Install Dependencies

```bash
bun install
```

---

## Start Database

```bash
cd apps/api

docker compose up -d
```

---

## Run API

```bash
cd apps/api

bun run dev
```

---

# Development Philosophy

This project follows these principles:

## Design Before Implementation

Major features are designed before coding.

The workflow is:

```
Requirements

↓

Domain Design

↓

Architecture Decision

↓

Database Design

↓

Implementation

↓

Testing
```

---

## Document Decisions

Important architectural choices are documented using ADRs.

Examples:

- Why PostgreSQL?
- Why UUIDs?
- Why modular monolith?
- Why a specific authentication strategy?

---

# Roadmap

## Phase 1 — Foundation

- [x] Repository setup
- [x] TypeScript setup
- [x] Bun setup
- [x] Express setup
- [x] PostgreSQL setup
- [x] Prisma setup
- [x] Architecture documentation

## Phase 2 — Identity

- [ ] User model
- [ ] Authentication architecture
- [ ] Social login
- [ ] Email/password authentication
- [ ] Phone OTP authentication
- [ ] Session management

## Phase 3 — Organizations

- [ ] Organizations
- [ ] Teams
- [ ] Roles and permissions

## Phase 4 — Events

- [ ] Event creation
- [ ] Event scheduling
- [ ] Ticketing
- [ ] Registration

## Phase 5 — Advanced Systems

- [ ] Queues
- [ ] WebSockets
- [ ] Notifications
- [ ] Observability
- [ ] Additional services

---

# License

To be decided.