# SiteDriftCrowd API Documentation

This document outlines the core API endpoints used by the SiteDrift extension to interact with the Crowd Bypass system.

## Endpoints

### 1. Query a Bypassed Link
**Endpoint:** `POST /crowd/query_v1`

Used by the extension to check if a specific shortlink has already been bypassed by the community.

**Parameters (Form Data):**
- `domain` (string): The domain of the shortlink (max 254 chars).
- `path` (string): The path and query string of the shortlink (max 2047 chars).

**Responses:**
- `200 OK`: Link found. The response body contains the final destination URL (`https://...`).
- `204 No Content`: Link not found in the database, or randomly returned (1/15 chance) to ensure active contribution.
- `400 Bad Request`: Missing or invalid parameters.
- `413 Payload Too Large`: Domain or path exceeds character limits.
- `405 Method Not Allowed`: Request was not a POST.
- `500 Internal Server Error`: Database query failed.

---

### 2. Contribute a Bypassed Link
**Endpoint:** `POST /crowd/contribute_v1`

Used by the extension to submit a newly bypassed link to the community database.

**Parameters (Form Data):**
- `domain` (string): The domain of the shortlink (max 254 chars).
- `path` (string): The path and query string of the shortlink (max 2047 chars).
- `target` (string): The final destination URL (must be `http` or `https`, max 4095 chars).

**Responses:**
- `201 Created`: Contribution accepted and saved to the database (or recorded as a conflict if it differs from an existing entry).
- `400 Bad Request`: Missing, malformed, or invalid target URL.
- `403 Forbidden`: User's IP address is blacklisted from contributing.
- `413 Payload Too Large`: Parameters exceed character limits.
- `405 Method Not Allowed`: Request was not a POST.
- `500 Internal Server Error`: Database insertion failed.

---

### 3. Health Check
**Endpoint:** `GET /healthz`

Used for uptime monitoring and container orchestration.

**Responses:**
- `200 OK`: Server is healthy.
- `503 Service Unavailable`: Server is shutting down.
