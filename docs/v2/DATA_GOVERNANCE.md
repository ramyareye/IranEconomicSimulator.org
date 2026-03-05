# Data Governance (Canonical)

Date: 2026-03-05

## 1. Purpose

Define hard rules for data quality, consistency, and release safety.

## 2. Data Domains

- `historical_metrics`
- `timeline_events`
- `scenario_parameters`
- `scenario_outputs`
- `source_registry`

## 3. Required Field Contracts

## 3.1 Metric Contract (minimum)

- `id`
- `title.fa`
- `title.en`
- `category`
- `subcategory`
- `value`
- `unit`
- `as_of`
- `claim_type` (`observed|derived|estimated|scenario`)
- `confidence` (`high|medium|estimate|speculative`)
- `sources[]`
- `method_note`
- `version`

## 3.2 Timeline Event Contract (minimum)

- `id`
- `date`
- `title.fa`
- `title.en`
- `description.fa`
- `description.en`
- `impact_type`
- `impact_estimate` (or null)
- `sources[]`

## 3.3 Scenario Parameter Contract (minimum)

- `key`
- `value`
- `min`
- `max`
- `unit`
- `confidence`
- `source_ids[]` or `method_note`
- `last_updated`

## 4. Versioning Rules

Data versions:
- `MAJOR`: breaking schema/meaning change
- `MINOR`: new metrics/fields backward-compatible
- `PATCH`: value correction/typo fix

Model versions:
- bump when formulas or simulation logic changes

Release versions:
- include both model + data versions in release metadata

## 5. Validation Gates (CI Mandatory)

1. JSON schema validation
2. source ID integrity (all source IDs resolvable)
3. no banned generic sources (`various_news`, `various_estimates`, etc.)
4. range sanity checks (`min <= value <= max` when applicable)
5. deterministic reproducibility checks for model outputs
6. no placeholder markers in release artifacts

## 6. Data Change Workflow

1. Open PR with changed data/model files.
2. Include `change_reason` and impact note.
3. CI validations must pass.
4. Reviewer approves methodology + source quality.
5. Merge and generate release snapshot.

## 7. Correction Workflow

For contested numbers:
1. Issue opened with source evidence.
2. Label: `data-challenge`.
3. Triage within 48h.
4. Resolve as:
   - accepted (patch release)
   - partially accepted (range widened/confidence lowered)
   - rejected (documented reason)

## 8. Quality SLAs

- challenge triage: <= 48h
- correction decision: <= 7 days
- emergency factual correction: <= 24h

## 9. Hard Prohibitions

- No unsourced headline metrics.
- No fake/randomized "live" values in public builds.
- No mixing scenario outputs as observed historical facts.

## 10. Release Checklist

- [ ] schemas pass
- [ ] sources pass integrity
- [ ] no placeholder strings
- [ ] reproducibility pass
- [ ] bilingual parity spot-check pass
- [ ] changelog entry added
