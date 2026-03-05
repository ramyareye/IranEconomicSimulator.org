# `codex/` (Canonical documentation)

This folder is the project’s **canonical documentation set**: architecture decisions, data/method rules, and the execution plan.

If something in `docs/` conflicts with something here, **`codex/` wins**.

## Recommended reading order

1. `codex/PROJECT_MASTER_DOCUMENT.md` — mission, product split, non‑negotiables, documentation canon
2. `codex/DOCS_REVIEW_REPORT.md` — what’s reusable vs risky in `docs/`
3. `codex/ARCHITECTURE.md` — runtime + data-flow profile (Worker + release bundles)
4. `codex/METHODOLOGY.md` — claim labels, confidence labels, publication rules
5. `codex/DATA_GOVERNANCE.md` — data contracts, versioning, validation gates, correction workflow
6. `codex/SOURCE_POLICY.md` — source tiers, registry requirements, citation rules
7. `codex/IMPLEMENTATION_OPTIONS.md` — practical stack/storage tradeoffs
8. `codex/ROADMAP.md` + `codex/EXECUTION_BACKLOG.md` — delivery plan and tasks
9. `codex/CHANGELOG.md` — record of canon changes

## Canon rules (summary)

- Two products under one brand: **Evidence Atlas** (historical) vs **Scenario Lab** (future simulations).
- Every published number must be labeled: `observed | derived | estimated | scenario`.
- Confidence labels are unified: `high | medium | estimate | speculative`.
- No unsourced headline metrics; no generic/unresolvable source IDs.
- No fake/randomized “live” behavior in any public‑facing UI.

