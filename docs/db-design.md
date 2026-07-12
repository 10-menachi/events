# Database Design

## Overview

The application uses PostgreSQL as the primary relational database.

The database design prioritizes:

- Data integrity
- Clear entity relationships
- Auditability
- Extensibility
- Separation of concerns

The initial database model focuses on the identity domain.

---

# Identity Domain

The identity domain is responsible for representing users and the different ways they can authenticate.

A user is separated from authentication methods because a person can have multiple ways of proving ownership of their account.

Examples:

- Email/password authentication
- Social authentication
- Phone OTP authentication

Authentication methods should not define the user identity itself.

---

# User Entity

The `User` entity represents a person using the platform.

A user contains profile information and acts as the parent entity for authentication methods.

Current attributes:

| Field | Purpose |
|---|---|
| id | Unique identifier for the user |
| full_name | User's display name |
| username | Optional public identifier |
| avatar_url | Profile image reference |
| created_at | Account creation timestamp |
| updated_at | Last update timestamp |
| deleted_at | Indicates whether the account has been deleted |

---

# Account Deletion Strategy

## Decision

Users are soft deleted instead of being physically removed from the database.

A deleted user is identified by the presence of a value in the `deleted_at` column.

Example:

Active user:

```
deleted_at = NULL
```

Deleted user:

```
deleted_at = 2026-07-12 15:30:00
```

---

## Reasoning

Physical deletion creates problems with historical records.

Example:

A user creates an event:

```
User
 |
 +---- Event
```

If the user record is permanently deleted, historical relationships become difficult to explain.

Instead, the user record is retained while personal information can be anonymized.

This allows the system to preserve:

- Event ownership history
- Certificates
- Audit records
- Security investigations

---

## Privacy Considerations

Deletion workflows should respect privacy requirements.

When a user deletes their account:

1. The account enters a deleted state.
2. Personal identifiable information may be anonymized.
3. Historical records that require integrity are preserved.
4. Deleted users are displayed as anonymous users.

Example:

Before deletion:

```
Christian Wamalwa Timbe
christian@example.com
```

After deletion:

```
Deleted User
```

---

## Future Considerations

As the platform grows, a dedicated audit system will be introduced.

Possible future entity:

```
AUDIT_LOG

id
actor_user_id
action
entity_type
entity_id
timestamp
metadata
```

This will allow the system to track important actions while keeping user data management separate from audit history.