# Quality Checklist (Before Shipping Anything Public)

Use this checklist for PR review, releases, and public pages.

## 1) Metrics (historical)

- [ ] `claim_type` is correct (`observed|derived|estimated`)
- [ ] `confidence` is justified (`high|medium|estimate|speculative`)
- [ ] `as_of`, units, and definitions are explicit
- [ ] sources are **specific** and resolvable (no generic IDs)
- [ ] derived/estimated values include a method note (and a range when applicable)
- [ ] bilingual titles/descriptions match in meaning (no drift)

## 2) Timeline events

- [ ] date is precise (or explicitly a range)
- [ ] descriptions are factual and non-incendiary
- [ ] sources are specific and resolvable
- [ ] impact estimates (if any) are labeled as `estimated` with uncertainty

## 3) Scenario outputs

- [ ] every chart/table is labeled “scenario output” (not a forecast)
- [ ] assumptions are visible and linkable
- [ ] uncertainty bands are present by default (p10/p50/p90 or min/median/max)
- [ ] sensitivity drivers are shown (top factors)
- [ ] release metadata is present: `model_version`, `data_version`, `generated_at`, seed (if relevant)

## 4) Public copy and share cards

- [ ] global disclaimer present (non-violence + “not a forecast”)
- [ ] no absolute certainty language for uncertain claims
- [ ] no “fake live” behavior (random ticking) presented as data-driven truth
- [ ] no individual targeting; focus on systems/policies/outcomes
- [ ] every share card includes release watermark (version + date)

## 5) Repo hygiene

- [ ] placeholders removed (`YOUR_ORG`, “TODO: source” in production paths)
- [ ] `codex/CHANGELOG.md` updated for canon changes
- [ ] anything copied from `docs/` prototypes is re-validated against canonical contracts

