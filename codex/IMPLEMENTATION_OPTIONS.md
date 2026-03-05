# Implementation Options (Hono Worker + React Focus)

Date: 2026-03-05
Purpose: practical implementation paths with tradeoffs, biased toward simplicity.

## Decision Summary

Given your preference, choose **Option A**:
- Hono Worker for API
- React pages rendered/served from Worker
- GitHub JSON as canonical data source
- Optional D1 only for operational app state

## Option A (Recommended): Single Worker (Hono API + Web)

Stack:
- Runtime: Cloudflare Workers
- App framework: Hono
- Web UI: React pages in worker routes (SSR) or Worker-served static bundle
- Canonical data: GitHub JSON release snapshots
- Cache: Cloudflare Cache API + KV
- Optional DB: D1 (only for mutable app state)

Pros:
- Simple deployment footprint
- Very fast global edge responses
- Strong transparency with GitHub JSON as source of truth
- Fits Node/TypeScript workflow

Cons:
- Worker runtime constraints (no long CPU jobs in request path)
- Some npm packages are not edge-friendly

Best for:
- v1 with mostly read-heavy data
- small team and fast iteration

## Option B: Split Frontend and API on Cloudflare

Stack:
- Web: React app on Cloudflare Pages
- API: separate Hono Worker
- Data: same JSON release pipeline

Pros:
- cleaner separation of UI and API concerns
- easier frontend dev ergonomics for SPA workflows

Cons:
- two deployables to manage

Best for:
- teams wanting strict frontend/backend split

## Option C: Worker + Data Services (Future Scale)

Stack:
- Hono Worker (web + API gateway)
- D1 for operational + query-heavy state
- KV for caching
- R2 for immutable release bundles
- optional queue/cron workers for ingestion and enrichment

Pros:
- better scaling and operational control

Cons:
- higher complexity and governance burden

Best for:
- post-launch growth with higher write/query demands

## Storage Strategy Options (Your Question)

## 1) GitHub JSON only

Use when:
- data is mostly read-only
- transparency/audit trail is the top priority
- you do not need complex user-generated writes yet

Pattern:
- GitHub JSON = canonical
- Worker fetches release snapshot
- KV/Cache API used for speed

## 2) Hybrid (Recommended)

Use when:
- you want transparency and also app features (submissions, moderation, admin queues)

Pattern:
- GitHub JSON = canonical public metrics/scenarios/sources
- D1 = operational app data (feedback, challenge tickets, moderation states, rate limits)
- KV = cache layer for hot JSON reads

## 3) DB-first (Not recommended for v1)

Pattern:
- D1 canonical for everything
- export periodic JSON to GitHub for transparency

Why not now:
- adds migration and data governance overhead too early
- weaker default transparency posture

## Important Note on "db file"

In Workers, a local DB file is not a durable source of truth.
Use:
- D1 for relational storage
- R2 for files/blobs
- GitHub for public immutable JSON releases

## Architecture Comparison Matrix

| Dimension | Option A | Option B | Option C |
|---|---|---|---|
| Build speed | Fastest | Fast | Medium |
| Complexity | Low | Medium | High |
| Cost | Low | Low | Medium |
| Fit for your preference | Excellent | Good | Good |
| Transparency by default | High | High | Medium-High |
| Scale headroom | Medium | Medium | High |

## Recommended Path

1. Start with Option A + GitHub-only canonical data.
2. Add D1 only when mutable workflows are required.
3. Keep release contracts stable so you can evolve to Option C later.

## Trigger to Add D1

Add D1 when at least two are true:
- you need user submissions/challenges in production
- you need moderation/admin state tracking
- you need relational queries not practical in JSON
- cache invalidation logic becomes too fragile without a DB
