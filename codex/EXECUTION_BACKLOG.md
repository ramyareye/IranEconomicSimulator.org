# Execution Backlog (Actionable)

Date: 2026-03-05
Planning style: milestone + issue IDs
Assumption: Hono Worker for API + web

## Milestone M0 - Canonical Setup (Week 1)

- [ ] `DOC-001` Approve canonical docs set.
- [ ] `ARCH-001` Confirm ADR-001 (Hono Worker profile).
- [ ] `ARCH-002` Define worker repo skeleton and route map.
- [ ] `ARCH-003` Define release artifact contract (`meta`, `metrics`, `timeline`, `scenarios`, `sources`).

## Milestone M1 - Data Contracts and Validation (Week 1-2)

- [ ] `DATA-001` Implement canonical JSON schemas.
- [ ] `DATA-002` Enforce source registry contract.
- [ ] `DATA-003` Remove generic source IDs from release-bound data.
- [ ] `QA-001` CI: schema validation.
- [ ] `QA-002` CI: source integrity validation.
- [ ] `QA-003` CI: placeholder detector.
- [ ] `REL-001` Build first clean release bundle.

## Milestone M2 - Worker MVP (Week 3-5)

- [ ] `WKR-001` Setup Hono Worker with route groups (`/api/*`, page routes).
- [ ] `WKR-002` Implement GitHub release fetch + cache strategy.
- [ ] `WKR-003` Implement API endpoints for metrics/timeline/sources.
- [ ] `WEB-001` Build home/evidence/timeline/methodology/sources pages.
- [ ] `WEB-002` Add release metadata display in UI.

## Milestone M3 - Scenario Lab (Week 6-8)

- [ ] `MODEL-001` Package and clean `simulate`, `montecarlo`, `sensitivity` scripts.
- [ ] `MODEL-002` Add deterministic seed/version metadata.
- [ ] `MODEL-003` Add plausibility constraints for scenario parameters.
- [ ] `WKR-004` Serve scenario outputs via API routes.
- [ ] `WEB-003` Build scenario pages with uncertainty and sensitivity charts.
- [ ] `QA-004` CI reproducibility test for scenario outputs.

## Milestone M4 - Launch Readiness (Week 9-10)

- [ ] `WEB-004` Social card generation with release watermark.
- [ ] `WEB-005` Embed widget route/output.
- [ ] `OPS-001` Add rate limiting and health checks.
- [ ] `OPS-002` Add structured logging and dashboard basics.
- [ ] `DOC-002` Publish issue templates for data challenges.

## Milestone M5 - Reliability and Optional D1 (Week 11-12)

- [ ] `OPS-003` Incident response and rollback runbook.
- [ ] `DB-001` Optional: add D1 for feedback/moderation queue.
- [ ] `DB-002` Optional: admin workflow for reviewing challenges.
- [ ] `REL-002` Tag and publish `v1.0.0`.

## Storage Decision Tasks

- [ ] `DEC-001` Decide: GitHub-only canonical data (yes/no).
- [ ] `DEC-002` Decide: add D1 now or defer to post-MVP.
- [ ] `DEC-003` Document decision in ADR with trigger conditions.
