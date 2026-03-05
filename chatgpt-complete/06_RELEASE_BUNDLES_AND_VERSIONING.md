# Release Bundles and Versioning (Complete)

This project should **ship releases**, not “whatever is in main today”.

Canonical reference: `codex/ARCHITECTURE.md` and `codex/DATA_GOVERNANCE.md`.

## 1) Why releases are mandatory

Releases provide:
- immutability (auditors can reproduce what users saw)
- rollback safety
- clear version banners in UI
- separation between drafts and production

Rule:
- Public pages and the API must read from release bundles only.

## 2) Release bundle layout (canonical)

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

Minimal example exists at `chatgpt-complete/samples/release/`.

## 3) `meta.json` contract (recommended)

`meta.json` should include:

- `release_version` (e.g., `1.0.0-rc1`)
- `data_version` (semantic)
- `model_version` (semantic)
- `generated_at` (ISO timestamp)
- `git` metadata (optional but extremely helpful):
  - `commit_sha`
  - `repo`
  - `branch`
- `notes` and `warnings` (optional)

The UI should display:
- release version
- generated date
- “Scenario outputs are conditional” reminder near scenario pages

## 4) Checksums and integrity

At minimum:
- `checksums.json` maps file paths → SHA-256 hash

Why:
- helps detect tampering
- helps confirm what the worker cached

Optional later:
- signed checksums (e.g., Sigstore, PGP)

## 5) Versioning rules (semantic)

### Data versions

- `MAJOR`: breaking meaning or schema change
- `MINOR`: adds metrics/events/fields without breaking old readers
- `PATCH`: corrections, typos, small value fixes

### Model versions

Bump when:
- formulas change
- module logic changes
- MC settings change in a way that affects results

### Release versions

Release version should embed data/model versions in `meta.json`.

Example:
- `release_version`: `1.0.0-rc1`
- `data_version`: `1.2.0`
- `model_version`: `0.4.1`

## 6) Production gates (must pass before release)

1. JSON schema validation for all artifacts
2. Source ID integrity:
   - every `source_id` exists in registry
   - banned generic IDs are rejected
3. Range sanity:
   - where applicable: `min <= value <= max`
4. Placeholder detection:
   - reject `YOUR_ORG`, `TODO`, “placeholder”, fake demo strings in production release
5. Reproducibility:
   - scenario outputs deterministic with fixed seed

## 7) “Draft vs production” hygiene

Recommended:
- keep experimental drafts in `docs/` or in non-release data folders
- only promote audited content into the release pipeline inputs

Rule:
- if it’s not in a release, it’s not public truth.

