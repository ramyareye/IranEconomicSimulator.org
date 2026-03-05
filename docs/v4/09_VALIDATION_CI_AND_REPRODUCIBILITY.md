# Validation, CI, and Reproducibility (Complete)

This document turns credibility rules into automated gates.

Canonical reference: `codex/DATA_GOVERNANCE.md`.

## 1) Why CI gates exist

If validation is optional, bad data will ship eventually.

CI gates prevent:
- broken source references
- placeholder/demo strings leaking into public releases
- invalid ranges or impossible parameters
- non-reproducible scenario results

## 2) Mandatory validations (v1)

### 2.1 Schema validation

- Validate every JSON file against schemas (once canonical schemas exist).

### 2.2 Referential integrity

- Every `sources[]` reference must exist in the source registry.
- No banned generic IDs.

### 2.3 Range and type sanity

- `min <= value <= max` where applicable
- numeric fields are numeric, dates parse, units present

### 2.4 Placeholder detector

Reject if production release contains:
- `YOUR_ORG`
- `TODO`
- `placeholder`
- “random”, “fake”, “demo-only” (unless in explicitly non-production area)

### 2.5 Scenario reproducibility

For scenario outputs:
- rerun with pinned seed and verify outputs match stored artifacts (within tolerance)
- verify metadata contains versions + generated_at + seed

## 3) Suggested CI pipeline steps (high level)

1. Install dependencies
2. Validate JSON schemas
3. Validate sources integrity
4. Run model scripts (simulate + MC + sensitivity)
5. Compare generated outputs to committed outputs (or generate release bundle from scratch)
6. Build release bundle (immutable snapshot)
7. Generate checksums
8. Publish release artifacts

## 4) Human review checklist (still necessary)

Automation can’t catch:
- biased wording
- misleading chart framing
- definition mismatches between sources
- cherry-picking

So require a human review for:
- new headline metrics
- major methodology changes
- new scenario families

## 5) What “reproducible” means (practical definition)

Given:
- same `data_version`
- same `model_version`
- same seed
- same parameter set

Then:
- scenario outputs must match (within floating-point tolerance)

If not:
- CI fails
- the PR must explain the difference (e.g., version bump, RNG change)

## 6) Sample artifacts (what CI should check)

Use these sample files as a reference for required metadata fields:

- `chatgpt-complete/samples/release/meta.json`
- `chatgpt-complete/samples/release/scenarios/base.montecarlo.json`
- `chatgpt-complete/samples/release/scenarios/base.sensitivity.json`

