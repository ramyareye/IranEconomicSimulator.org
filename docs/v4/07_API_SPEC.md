# API Spec (Complete + Examples)

This is a practical v1 API contract that matches the “release bundle” approach.

Canonical reference: `codex/ARCHITECTURE.md`.

## 1) Core rules

- API reads from the latest validated release bundle (or a pinned release if requested).
- Every response includes:
  - `release_version`
  - `data_version`
  - `model_version`
  - `generated_at`

## 2) Common response envelope (recommended)

```json
{
  "meta": {
    "release_version": "1.0.0-rc1",
    "data_version": "1.2.0",
    "model_version": "0.4.1",
    "generated_at": "2026-03-05T00:00:00Z"
  },
  "data": {}
}
```

## 3) Endpoints (v1)

### 3.1 Health

`GET /api/health`

Response:
```json
{
  "ok": true,
  "meta": { "release_version": "…", "data_version": "…", "model_version": "…", "generated_at": "…" }
}
```

### 3.2 Release metadata

`GET /api/meta/release`

Returns `meta.json`.

### 3.3 Metrics

`GET /api/metrics?category=...&lang=fa|en`

Notes:
- `lang` controls which localized strings are returned (or you return both and let UI choose).
- Support optional filters:
  - `subcategory`
  - `q` (search)

Response example:
```json
{
  "meta": { "release_version": "…", "data_version": "…", "model_version": "…", "generated_at": "…" },
  "data": {
    "items": [
      {
        "id": "macro.gdp_per_capita.demo",
        "title": "GDP per capita (demo)",
        "category": "macroeconomics",
        "subcategory": "output",
        "value": 1234,
        "unit": "usd_current",
        "as_of": "2026-03-05",
        "claim_type": "observed",
        "confidence": "medium",
        "sources": ["SRC.DEMO.EXAMPLE.2026"],
        "method_note": "Demo metric for API shape.",
        "uncertainty": null,
        "version": "0.0.0-demo"
      }
    ]
  }
}
```

### 3.4 Timeline

`GET /api/timeline?lang=fa|en`

Response example:
```json
{
  "meta": { "release_version": "…", "data_version": "…", "model_version": "…", "generated_at": "…" },
  "data": { "items": [] }
}
```

### 3.5 Sources

`GET /api/sources`

Returns the source registry (or a paginated view).

### 3.6 Scenario outputs

`GET /api/scenario/:id/point`

`GET /api/scenario/:id/montecarlo`

`GET /api/scenario/:id/sensitivity`

These serve release files like:
- `scenarios/base.point.json`
- `scenarios/base.montecarlo.json`
- `scenarios/base.sensitivity.json`

## 4) Error format (recommended)

```json
{
  "error": {
    "code": "not_found",
    "message": "Scenario not found",
    "details": { "scenario_id": "…" }
  },
  "meta": { "release_version": "…", "data_version": "…", "model_version": "…", "generated_at": "…" }
}
```

## 5) Caching guidance (edge-friendly)

- Cache release bundle fetches aggressively (immutable by version).
- Cache API responses with a short TTL for “latest” endpoints.
- Provide a query for pinning:
  - `?release_version=...` to fetch exact bundles (immutable, cache forever)

## 6) Security and abuse basics (v1)

- Basic rate limiting for API endpoints
- Add `Cache-Control` + ETag
- Avoid exposing write endpoints until moderation workflow exists

