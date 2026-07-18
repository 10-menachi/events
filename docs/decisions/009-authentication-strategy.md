# 009 - Use JWT Access Tokens with Refresh Tokens Stored in HttpOnly Cookies

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
- ability to revoke sessions
- good security practices

## Considered Options

### Server-side sessions

The server maintains authentication state and the client stores a session cookie.

Advantages:

- Simple logout and session invalidation
- Familiar browser authentication model

Disadvantages:

- Requires server-side session storage
- Less suitable for multiple independent API clients

---

### JWT Access Tokens Only

The server issues JWTs that clients send with each request.

Advantages:

- Stateless authentication
- Easy API consumption

Disadvantages:

- Difficult token revocation
- Longer token lifetimes increase security risks

---

### JWT Access Tokens + Refresh Tokens

The system issues:

- short-lived access tokens
- long-lived refresh tokens

Tokens are stored using secure HttpOnly cookies.

Advantages:

- Reduced exposure of authentication credentials
- Supports token rotation
- Supports revocation through refresh token storage
- Works well with separate frontend and backend applications

Disadvantages:

- More implementation complexity

## Decision

We will implement JWT-based authentication using:

- short-lived access tokens
- long-lived refresh tokens
- HttpOnly cookies
- refresh token rotation
- database-backed refresh token management

The access token will authenticate normal API requests.

The refresh token will be used to obtain new access tokens after expiration.

## Consequences

### Positive

- Secure browser authentication flow
- Clear separation between authentication and application logic
- Supports future frontend and mobile clients
- Allows session revocation

### Negative

- Additional authentication complexity
- Requires refresh token lifecycle management

## Implementation Details

Authentication endpoints:
