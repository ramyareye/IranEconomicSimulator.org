# Roadmap (Hono Worker Practical Plan)

Date: 2026-03-05
Horizon: 12 weeks
Default stack: Hono Worker (API + web) + GitHub JSON releases

## Phase 0 (Week 1-2): Foundation

Goals:
- finalize Worker architecture
- unify schemas/confidence/source policy
- remove placeholder/fake public artifacts

Deliverables:
- canonical docs approved
- release schema contracts frozen
- CI validation active
- first clean release bundle generated

## Phase 1 (Week 3-5): Evidence Atlas MVP

Deliverables:
- Worker routes for `/`, `/evidence`, `/timeline`, `/methodology`, `/sources`
- API endpoints for metrics, timeline, sources
- version banner from `meta.json`
- release `v1.0.0-rc1`

## Phase 2 (Week 6-8): Scenario Lab v1

Deliverables:
- `/scenario` pages (preset + assumption views)
- MC uncertainty bands and tornado sensitivity visuals
- API endpoints for scenario outputs
- reproducibility checks in CI

## Phase 3 (Week 9-10): Launch Packaging

Deliverables:
- share cards and embed widget
- bilingual QA pass
- performance and accessibility pass
- launch pack (EN/FA)

## Phase 4 (Week 11-12): Reliability

Deliverables:
- incident runbook
- challenge/correction workflow SLA
- optional D1 integration for moderation/feedback queues
- release `v1.0.0`

## Success Metrics by Week 12

- 0 unsourced headline metrics
- 100% release artifacts versioned and reproducible
- p95 API latency under target
- methodology click-through > 30%
- correction issues triaged within 48h
