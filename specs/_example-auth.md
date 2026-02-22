# Example: User Authentication

## Status
done

## Metadata
- **Created**: 2026-02-22
- **Updated**: 2026-02-22
- **Author**: Example (this is a reference spec to demonstrate the template format)

## Problem
Users need a secure way to authenticate. The system currently has no authentication mechanism, meaning anyone can access all resources without identity verification.

## Solution
Implement a JWT-based authentication system with email/password login, token refresh, and secure session management.

## Acceptance Criteria
- [x] User can register with email and password; password is hashed with bcrypt (min cost 10)
- [x] User can log in with valid credentials and receives a JWT access token (15min TTL) and refresh token (7d TTL)
- [x] API returns 401 with `{ error: "Invalid credentials" }` for wrong email/password
- [x] Protected endpoints reject requests without a valid JWT (401 response)
- [x] Refresh token endpoint issues a new access token without re-authentication

## Technical Approach
- **Auth module**: `src/auth/` with controller, service, and middleware
- **Password hashing**: bcrypt with configurable salt rounds via `AUTH_BCRYPT_ROUNDS` env var
- **JWT**: Access token (short-lived) + refresh token (long-lived), secrets from env vars
- **Middleware**: `requireAuth` middleware validates JWT on protected routes
- **Storage**: Refresh tokens stored in database with user association

## Files to Create/Modify
- `src/auth/auth.controller.ts` - Route handlers for register, login, refresh
- `src/auth/auth.service.ts` - Business logic for authentication
- `src/auth/auth.middleware.ts` - JWT validation middleware
- `src/auth/auth.test.ts` - Tests for all acceptance criteria

## Dependencies
- Database setup for user storage
- `bcrypt` and `jsonwebtoken` packages

## Out of Scope
- OAuth / social login
- Email verification
- Password reset flow
- Rate limiting (separate spec)

## Open Questions
_None - all questions resolved during spec review._
