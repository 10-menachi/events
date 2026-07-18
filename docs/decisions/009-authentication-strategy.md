# 009 - Use JWT Access Tokens with Opaque Refresh Tokens Stored in HttpOnly Cookies

## Status

Accepted

## Context

The Events application requires authentication for protected resources such as
event creation, modification, and deletion.

The system consists of:

- Express API backend
- PostgreSQL database
- SvelteKit frontend (planned)

We need an authentication strategy that provides:

- secure authentication for browser clients
- compatibility with API-based architecture
- support for future clients such as mobile applications
- ability to revoke user sessions
- support for multiple active sessions across devices
- good security practices

## Considered Options

### Server-side sessions

The server maintains authentication state and the client stores a session cookie.

Advantages:

- Simple logout and session invalidation
- Easy session management

Disadvantages:

- Requires server-side session lookup on every request
- Less suitable for independent API clients
- Increased server-side authentication state

---

### JWT Access Tokens Only

The server issues JWTs that clients send with each request.

Advantages:

- Stateless authentication
- Easy API consumption

Disadvantages:

- Difficult token revocation
- Compromised tokens remain valid until expiration
- Requires careful token lifetime management

---

### JWT Access Tokens + Refresh Tokens

The system issues:

- short-lived JWT access tokens
- long-lived opaque refresh tokens

Access tokens authenticate API requests.

Refresh tokens are used only to obtain new access tokens.

Advantages:

- Short-lived access credentials reduce exposure risk
- Refresh tokens can be revoked independently
- Supports multiple active sessions
- Works well with separate frontend and backend applications
- Allows token rotation

Disadvantages:

- More implementation complexity
- Requires refresh token lifecycle management

## Decision

We will implement JWT-based authentication using:

- short-lived JWT access tokens
- long-lived opaque refresh tokens
- HttpOnly secure cookies for browser storage
- refresh token rotation
- database-backed refresh token management
- session tracking

### Access Tokens

Access tokens will:

- be generated as JWTs
- contain minimal claims required for identification and authorization:
  - user ID (`sub`)
  - session ID (`sid`)
  - role information (future)

- not be stored in the database
- be validated by authentication middleware

### Refresh Tokens

Refresh tokens will:

- be generated as cryptographically secure random strings
- be stored by clients using HttpOnly cookies
- never be stored in plaintext
- be hashed before being persisted
- be associated with a user session
- support expiration and revocation

### Sessions

Each login creates a session record.

Sessions allow the system to:

- track active devices
- revoke individual sessions
- investigate suspicious account activity
- support future audit functionality

## Consequences

### Positive

- Secure browser authentication flow
- Reduced risk from token theft
- Supports multiple concurrent sessions
- Allows targeted session revocation
- Keeps access token validation fast
- Provides a clear separation between authentication and application logic

### Negative

- Additional authentication complexity
- Requires refresh token rotation and storage management
- Requires session lifecycle management

## Implementation Details

Authentication endpoints:

### POST `/auth/login`

Responsibilities:

- validate user credentials
- create a user session
- generate access token
- generate refresh token
- store refresh token hash
- return authentication cookies

---

### POST `/auth/refresh`

Responsibilities:

- validate refresh token
- verify associated session is active
- revoke old refresh token
- generate a new refresh token
- generate a new access token
- update refresh token storage

---

### POST `/auth/logout`

Responsibilities:

- revoke current refresh token
- revoke current session if required
- clear authentication cookies

---

### Authentication Middleware

Responsibilities:

- extract access token
- verify JWT signature
- validate token expiration
- verify session status
- attach authenticated user context to request

The middleware does not generate or refresh tokens.

Token refreshing is handled exclusively through `/auth/refresh`.
