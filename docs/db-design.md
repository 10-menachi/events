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

The identity domain is responsible for representing users, their identities, and the different ways they can authenticate.

The system separates:

- User accounts
- User identities
- Authentication methods

A user represents a person/account on the platform.

Identities represent ways the user can be identified, such as:

- Email addresses
- Phone numbers

Authentication methods represent ways the user proves ownership of an identity, such as:

- Password authentication
- Phone OTP authentication
- Social authentication

Authentication methods should not define the user identity itself.

This separation allows users to have multiple authentication methods without creating duplicate accounts.

---

# User Entity

The `User` entity represents a person using the platform.

A user contains profile information and acts as the parent entity for identities, authentication methods, and sessions.

Current attributes:

| Field | Purpose |
| --- | --- |
| id | Unique identifier for the user |
| full_name | User's display name |
| username | Optional public identifier |
| avatar_url | Profile image reference |
| created_at | Account creation timestamp |
| updated_at | Last update timestamp |
| deleted_at | Indicates whether the account has been deleted |

---

# Email Identity

The `EMAIL_IDENTITY` entity represents an email address owned by a user.

Email addresses are separated from authentication methods because an email address is an identity, while a password is a method of proving ownership.

A user may have multiple email identities.

Example:

```
User

 |
 +-- personal@gmail.com (primary)
 |
 +-- work@company.com
```

Current attributes:

| Field | Purpose |
| --- | --- |
| id | Unique identifier for the email identity |
| user_id | User who owns the identity |
| email | Email address |
| is_primary | Indicates the default email identity |
| verified_at | Email verification timestamp |
| created_at | Identity creation timestamp |
| updated_at | Last update timestamp |

---

# Phone Identity

The `PHONE_IDENTITY` entity represents a phone number owned by a user.

A user may have multiple phone identities.

Example:

```
User

 |
 +-- +254712345678 (primary)
 |
 +-- +254700000000
```

Current attributes:

| Field | Purpose |
| --- | --- |
| id | Unique identifier for the phone identity |
| user_id | User who owns the identity |
| phone_number | Phone number |
| is_primary | Indicates the default phone identity |
| verified_at | Phone verification timestamp |
| created_at | Identity creation timestamp |
| updated_at | Last update timestamp |

---

# Authentication Methods

## Password Authentication

The `PASSWORD_CREDENTIAL` entity represents password-based authentication.

Passwords are attached to email identities rather than directly to users.

Reason:

A password proves ownership of an email identity, not the user's existence itself.

Relationship:

```
USER
 |
 |
EMAIL_IDENTITY
 |
 |
PASSWORD_CREDENTIAL
```

Current attributes:

| Field | Purpose |
| --- | --- |
| id | Unique identifier |
| email_identity_id | Email identity associated with the password |
| password_hash | Securely stored password hash |
| created_at | Credential creation timestamp |
| updated_at | Last update timestamp |

---

## Phone OTP Authentication

The `OTP_VERIFICATION` entity represents phone-based authentication attempts.

OTP verification records are attached to phone identities.

A phone identity may have multiple OTP records because users may:

- Request multiple OTP codes
- Enter incorrect codes
- Request new codes after expiration

Relationship:

```
PHONE_IDENTITY
 |
 |
OTP_VERIFICATION
```

Current attributes:

| Field | Purpose |
| --- | --- |
| id | Unique identifier |
| phone_identity_id | Phone identity being verified |
| code_hash | Securely stored OTP hash |
| expires_at | OTP expiration timestamp |
| verified_at | Successful verification timestamp |
| created_at | Verification attempt timestamp |

---

## Social Authentication

The `OAUTH_ACCOUNT` entity represents external authentication providers.

Supported providers may include:

- Google
- Facebook

A user may have multiple OAuth accounts.

Example:

```
USER

 |
 +-- Google Account
 |
 +-- Facebook Account
```

Current attributes:

| Field | Purpose |
| --- | --- |
| id | Unique identifier |
| user_id | User linked to the provider account |
| provider | OAuth provider name |
| provider_account_id | Provider-specific account identifier |
| created_at | Account creation timestamp |
| updated_at | Last update timestamp |

---

# Sessions

The `SESSION` entity represents authenticated sessions.

Sessions are independent from authentication methods.

A user may have multiple active sessions across:

- Web applications
- Mobile applications
- CLI tools

Example:

```
USER

 |
 +-- Browser Session
 |
 +-- Mobile Session
 |
 +-- CLI Session
```

Current attributes:

| Field | Purpose |
| --- | --- |
| id | Unique identifier |
| user_id | User who owns the session |
| token_hash | Secure session token hash |
| expires_at | Session expiration timestamp |
| created_at | Session creation timestamp |
| updated_at | Last update timestamp |

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
