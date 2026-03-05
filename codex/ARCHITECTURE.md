# Architecture (Canonical)

Date: 2026-03-05
Primary implementation profile: **Option A - Hono Worker (API + Web) + GitHub JSON releases**

## 1. Goals

1. Keep v1 simple and maintainable.
2. Preserve transparency and auditability.
3. Separate historical evidence from scenario outputs.
4. Enforce reproducible release artifacts.

## 2. Logical Components

- `Worker App` (Hono)
  - `/api/*` endpoints
  - web page routes (React-rendered or static assets served by worker)
- `Model Engine` (Node/TypeScript scripts in CI)
  - `simulate`, `montecarlo`, `sensitivity`
- `Validation Pipeline` (Node scripts in CI)
  - schema, source integrity, sanity checks
- `Release Builder` (CI job)
  - builds immutable, versioned JSON release bundles

## 3. Data Flow

```txt
Raw sources / curated inputs
  -> normalize
  -> validate
  -> compute model outputs
  -> build release bundle
  -> publish to GitHub
  -> worker fetches + caches release
  -> API/Web render from release only
```

Rule:
- Public pages and APIs must read from validated release bundles, never ad-hoc draft files.

## 4. Runtime Topology (Cloudflare)

- Worker: Hono app for web + API
- KV: hot cache for release fragments
- Cache API: request-level caching for responses
- Optional D1: operational app state (not canonical metrics)
- Scheduler: GitHub Actions for release generation

## 5. Storage Strategy (Canonical)

Recommended v1:
- GitHub JSON: canonical metrics, sources, scenario outputs
- KV/Cache: performance cache
- D1: optional operational state only

Do not use local DB file as persistent source in Workers.

## 6. API Contract (v1)

- `GET /api/health`
- `GET /api/meta/release`
- `GET /api/metrics?category=...&lang=fa|en`
- `GET /api/timeline`
- `GET /api/scenario/:id/point`
- `GET /api/scenario/:id/montecarlo`
- `GET /api/scenario/:id/sensitivity`

All API responses should include:
- `release_version`
- `data_version`
- `model_version`
- `generated_at`

## 7. Release Artifact Layout

```txt
release/
  meta.json
  metrics.json
  timeline.json
  sources.json
  scenarios/
    base.point.json
    base.montecarlo.json
    base.sensitivity.json
  checksums.json
```

## 8. Non-Functional Requirements

Performance:
- p95 API latency < 400ms for cached reads
- first meaningful content < 2.5s target

Reliability:
- release pipeline success >= 99%
- no unresolved broken source references in production release

Security:
- branch protection for release sources
- checksums/signatures for release bundles
- basic rate limiting for API endpoints

## 9. Migration Notes

Reusable now:
- model scripts from `chatgpt-iran-potential-simulator-v0.2`
- data structures from `claude-iran-freedom-project`

Must clean before production:
- placeholder parameters
- generic source IDs
- fake/random ticker logic in static demos

## 10. ADR

ADR-001: Adopt Hono Worker profile for v1.
- Decision date: 2026-03-05
- Reason: simplest path aligned with your preferred stack and fast launch goals
- Revisit when write-heavy workloads require broader service split
