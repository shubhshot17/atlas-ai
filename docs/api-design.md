# Planned REST API Design

> **Status: Planned, not implemented.** The routes and JSON below are illustrative design proposals for AtlasAI's future API. They are not a live contract, and no endpoints are currently provided by this document. Request fields, response shapes, validation rules, and authentication-provider integration may change during implementation.

## Conventions

- The planned Node.js API base path is `/api/v1`.
- JSON request and response examples omit transport headers. Successful resource requests return JSON; deletion and logout may return `204 No Content`.
- Protected routes require a valid bearer access token: `Authorization: Bearer <access-token>`. Authentication will be integrated with the selected provider; credential handling and token issuance must follow that provider's supported flow.
- Resource IDs are illustrative opaque strings. Dates use ISO 8601 (`YYYY-MM-DD`); timestamps use ISO 8601 with a time zone.
- Collection routes may support pagination and filters. A proposed list envelope is `{"data": [], "page": {"limit": 20, "next_cursor": null}}`.
- Errors should use a consistent JSON shape, for example `{"error": {"code": "VALIDATION_ERROR", "message": "A departure date is required.", "details": []}}`.

## Authentication

The following routes assume the API coordinates with the eventual identity provider. Registration and login are proposals; the exact credential and token flow depends on the provider selected.

### `POST /api/v1/auth/register`

Create an account and application profile.

Request:

```json
{
  "email": "alex@example.com",
  "password": "example-password",
  "display_name": "Alex Rivera"
}
```

Example response (`201 Created`):

```json
{
  "user": {
    "id": "usr_123",
    "email": "alex@example.com",
    "display_name": "Alex Rivera"
  },
  "access_token": "<access-token>",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### `POST /api/v1/auth/login`

Authenticate an account.

Request:

```json
{
  "email": "alex@example.com",
  "password": "example-password"
}
```

Example response (`200 OK`):

```json
{
  "user": {
    "id": "usr_123",
    "email": "alex@example.com",
    "display_name": "Alex Rivera"
  },
  "access_token": "<access-token>",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### `POST /api/v1/auth/refresh`

Exchange a valid refresh credential using the identity provider's chosen mechanism.

Request:

```json
{
  "refresh_token": "<refresh-token>"
}
```

Example response (`200 OK`):

```json
{
  "access_token": "<new-access-token>",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### `POST /api/v1/auth/logout`

End the current session or revoke its refresh credential.

Request:

```json
{
  "refresh_token": "<refresh-token>"
}
```

Example response: `204 No Content`.

## Users

### `GET /api/v1/users/me`

Return the authenticated user's application profile.

Example response (`200 OK`):

```json
{
  "id": "usr_123",
  "email": "alex@example.com",
  "display_name": "Alex Rivera",
  "created_at": "2026-11-13T06:00:00Z"
}
```

### `PATCH /api/v1/users/me`

Update editable profile fields.

Request:

```json
{
  "display_name": "Alex R.",
  "home_city": "Toronto"
}
```

Example response (`200 OK`):

```json
{
  "id": "usr_123",
  "email": "alex@example.com",
  "display_name": "Alex R.",
  "home_city": "Toronto"
}
```

## Destinations

### `GET /api/v1/destinations`

Browse the destination catalogue. Proposed query parameters include `q`, `country_code`, `limit`, and `cursor`.

Example response (`200 OK`):

```json
{
  "data": [
    {
      "id": "dst_456",
      "name": "Kyoto",
      "country": "Japan",
      "country_code": "JP",
      "location": {"latitude": 35.0116, "longitude": 135.7681}
    }
  ],
  "page": {"limit": 20, "next_cursor": null}
}
```

### `GET /api/v1/destinations/{destination_id}`

Return one destination's catalogue details.

Example response (`200 OK`):

```json
{
  "id": "dst_456",
  "name": "Kyoto",
  "country": "Japan",
  "country_code": "JP",
  "description": "A historic city in Japan.",
  "location": {"latitude": 35.0116, "longitude": 135.7681}
}
```

## Trips

All trip routes require authentication. The owner and authorized collaborators can access a trip according to its implemented sharing rules.

### `GET /api/v1/trips`

List trips visible to the authenticated user. Proposed query parameters include `status`, `limit`, and `cursor`.

Example response (`200 OK`):

```json
{
  "data": [
    {
      "id": "trp_789",
      "name": "Kyoto in spring",
      "destination_id": "dst_456",
      "start_date": "2027-04-10",
      "end_date": "2027-04-15",
      "status": "planning",
      "role": "owner"
    }
  ],
  "page": {"limit": 20, "next_cursor": null}
}
```

### `POST /api/v1/trips`

Create a trip owned by the authenticated user.

Request:

```json
{
  "name": "Kyoto in spring",
  "destination_id": "dst_456",
  "start_date": "2027-04-10",
  "end_date": "2027-04-15",
  "preferences": {
    "pace": "relaxed",
    "interests": ["food", "history"]
  }
}
```

Example response (`201 Created`):

```json
{
  "id": "trp_789",
  "owner_id": "usr_123",
  "name": "Kyoto in spring",
  "destination_id": "dst_456",
  "start_date": "2027-04-10",
  "end_date": "2027-04-15",
  "status": "planning",
  "preferences": {
    "pace": "relaxed",
    "interests": ["food", "history"]
  }
}
```

### `GET /api/v1/trips/{trip_id}`

Return trip details visible to the caller.

Example response (`200 OK`):

```json
{
  "id": "trp_789",
  "owner_id": "usr_123",
  "name": "Kyoto in spring",
  "destination_id": "dst_456",
  "start_date": "2027-04-10",
  "end_date": "2027-04-15",
  "status": "planning",
  "collaborators": []
}
```

### `PATCH /api/v1/trips/{trip_id}`

Update editable trip fields.

Request:

```json
{
  "name": "Kyoto and Nara",
  "status": "planning"
}
```

Example response (`200 OK`):

```json
{
  "id": "trp_789",
  "name": "Kyoto and Nara",
  "destination_id": "dst_456",
  "start_date": "2027-04-10",
  "end_date": "2027-04-15",
  "status": "planning"
}
```

### `DELETE /api/v1/trips/{trip_id}`

Delete or archive a trip according to the final retention policy. Proposed response: `204 No Content`.

### `POST /api/v1/trips/{trip_id}/collaborators`

Invite a user to collaborate on a trip.

Request:

```json
{
  "email": "sam@example.com",
  "role": "editor"
}
```

Example response (`201 Created`):

```json
{
  "trip_id": "trp_789",
  "user_id": "usr_234",
  "role": "editor",
  "status": "invited"
}
```

### `DELETE /api/v1/trips/{trip_id}/collaborators/{user_id}`

Remove a collaborator or revoke their access, subject to ownership and authorization rules. Proposed response: `204 No Content`.

## Itineraries

Itineraries are organized as trip days containing ordered items. These nested routes scope day and item operations to a trip.

### `GET /api/v1/trips/{trip_id}/days`

List a trip's days and their itinerary items.

Example response (`200 OK`):

```json
{
  "data": [
    {
      "id": "day_001",
      "date": "2027-04-10",
      "sequence": 1,
      "items": [
        {
          "id": "itm_001",
          "title": "Visit Nishiki Market",
          "start_time": "10:00",
          "end_time": "12:00",
          "position": 1
        }
      ]
    }
  ]
}
```

### `POST /api/v1/trips/{trip_id}/days`

Add a day to the trip.

Request:

```json
{
  "date": "2027-04-10",
  "sequence": 1
}
```

Example response (`201 Created`):

```json
{
  "id": "day_001",
  "trip_id": "trp_789",
  "date": "2027-04-10",
  "sequence": 1,
  "items": []
}
```

### `PATCH /api/v1/trips/{trip_id}/days/{day_id}`

Update a day's date or sequence.

Request:

```json
{
  "date": "2027-04-11",
  "sequence": 2
}
```

Example response (`200 OK`):

```json
{
  "id": "day_001",
  "trip_id": "trp_789",
  "date": "2027-04-11",
  "sequence": 2
}
```

### `DELETE /api/v1/trips/{trip_id}/days/{day_id}`

Remove a day and, as defined by the eventual retention rules, its items. Proposed response: `204 No Content`.

### `POST /api/v1/trips/{trip_id}/days/{day_id}/items`

Add an itinerary item to a day.

Request:

```json
{
  "title": "Visit Nishiki Market",
  "notes": "Try local snacks",
  "start_time": "10:00",
  "end_time": "12:00",
  "position": 1,
  "location": {
    "name": "Nishiki Market",
    "latitude": 35.005,
    "longitude": 135.764
  }
}
```

Example response (`201 Created`):

```json
{
  "id": "itm_001",
  "day_id": "day_001",
  "title": "Visit Nishiki Market",
  "notes": "Try local snacks",
  "start_time": "10:00",
  "end_time": "12:00",
  "position": 1,
  "location": {
    "name": "Nishiki Market",
    "latitude": 35.005,
    "longitude": 135.764
  }
}
```

### `PATCH /api/v1/trips/{trip_id}/days/{day_id}/items/{item_id}`

Update an item's details or ordering.

Request:

```json
{
  "start_time": "10:30",
  "position": 2
}
```

Example response (`200 OK`):

```json
{
  "id": "itm_001",
  "day_id": "day_001",
  "title": "Visit Nishiki Market",
  "start_time": "10:30",
  "end_time": "12:00",
  "position": 2
}
```

### `DELETE /api/v1/trips/{trip_id}/days/{day_id}/items/{item_id}`

Remove an item from the day. Proposed response: `204 No Content`.

## Budgets

### `GET /api/v1/trips/{trip_id}/budgets`

List budget records for a trip.

Example response (`200 OK`):

```json
{
  "data": [
    {
      "id": "bdg_001",
      "category": "lodging",
      "amount": 900,
      "currency": "USD"
    }
  ]
}
```

### `POST /api/v1/trips/{trip_id}/budgets`

Add an overall or category budget.

Request:

```json
{
  "category": "lodging",
  "amount": 900,
  "currency": "USD"
}
```

Example response (`201 Created`):

```json
{
  "id": "bdg_001",
  "trip_id": "trp_789",
  "category": "lodging",
  "amount": 900,
  "currency": "USD"
}
```

### `PATCH /api/v1/trips/{trip_id}/budgets/{budget_id}`

Update a budget amount, category, or currency.

Request:

```json
{
  "amount": 1000
}
```

Example response (`200 OK`):

```json
{
  "id": "bdg_001",
  "trip_id": "trp_789",
  "category": "lodging",
  "amount": 1000,
  "currency": "USD"
}
```

### `DELETE /api/v1/trips/{trip_id}/budgets/{budget_id}`

Remove a budget record. Proposed response: `204 No Content`.

## Favourites

Favourites represent a user's saved destination catalogue entries, distinct from saved points of interest.

### `GET /api/v1/users/me/favourites`

List the authenticated user's favourited destinations.

Example response (`200 OK`):

```json
{
  "data": [
    {
      "destination": {
        "id": "dst_456",
        "name": "Kyoto",
        "country": "Japan"
      },
      "created_at": "2026-11-13T06:00:00Z"
    }
  ]
}
```

### `POST /api/v1/users/me/favourites`

Favourite a destination.

Request:

```json
{
  "destination_id": "dst_456"
}
```

Example response (`201 Created`):

```json
{
  "destination_id": "dst_456",
  "created_at": "2026-11-13T06:00:00Z"
}
```

### `DELETE /api/v1/users/me/favourites/{destination_id}`

Remove a destination from the authenticated user's favourites. Proposed response: `204 No Content`.

## AI Planning

AI planning requests are proposed as API-mediated calls to the planned AI service. Suggestions should be returned as drafts and should not modify a trip until the client or user explicitly saves them through the trip and itinerary endpoints.

### `POST /api/v1/ai/planning/suggestions`

Request itinerary ideas using trip context and optional constraints.

Request:

```json
{
  "trip_id": "trp_789",
  "destination_id": "dst_456",
  "date": "2027-04-10",
  "preferences": {
    "interests": ["food", "history"],
    "pace": "relaxed"
  },
  "constraints": {
    "budget_amount": 120,
    "currency": "USD",
    "max_items": 4
  }
}
```

Example response (`200 OK`):

```json
{
  "suggestions": [
    {
      "title": "Explore Nishiki Market",
      "description": "Browse local food stalls and try seasonal specialties.",
      "suggested_start_time": "10:00",
      "estimated_cost": {
        "amount": 20,
        "currency": "USD"
      },
      "location": {
        "name": "Nishiki Market",
        "latitude": 35.005,
        "longitude": 135.764
      },
      "rationale": "Matches the food interest and relaxed pace."
    }
  ],
  "saved_to_trip": false
}
```

The eventual implementation should validate trip access before using its context, avoid exposing secrets or provider internals in responses, and define behavior for unavailable AI providers and rate limits.

## Open Design Decisions

- Select the identity provider and settle registration, session, refresh, and logout flows.
- Finalize field validation, pagination, filtering, sorting, and error-code conventions.
- Decide whether trip deletion is permanent or archival and define related record retention.
- Define collaborator roles, invitation lifecycle, and write permissions consistently across trip resources.
- Confirm AI input limits, latency/rate-limit behavior, provider fallback behavior, and whether suggestions need an explicit save endpoint.
