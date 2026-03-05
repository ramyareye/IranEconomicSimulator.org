# Methodology (Canonical)

Date: 2026-03-05

## 1. Method Types

This project publishes two distinct method families:

1. Historical evidence methods (observed/derived/estimated)
2. Scenario simulation methods (counterfactual futures)

These must never be mixed in user-facing language.

## 2. Claim Labels

Every published claim must include one label:
- `observed`
- `derived`
- `estimated`
- `scenario`

## 3. Confidence Labels

- `high`
- `medium`
- `estimate`
- `speculative`

## 4. Historical Methods Rules

- direct metrics must reference concrete source IDs
- derived metrics must show formula and inputs
- estimated metrics must show uncertainty range
- conservative assumptions should be preferred for headlines

## 5. Scenario Methods Rules

- scenario outputs are conditional, not forecasts
- all scenario outputs must include assumptions and uncertainty bands
- sensitivity outputs must rank key drivers
- reproducible seed/version metadata is mandatory

## 6. Counterfactual Rules

Any counterfactual comparison must specify:
- baseline year
- comparator country/group and justification
- transformation method (PPP/real/nominal)
- limitations and known failure modes

## 7. Publication Rules

A metric may be published only when:
- source requirements pass
- schema checks pass
- method note exists
- confidence is assigned
- range is provided where required

## 8. Known Risks

- source bias and incompleteness
- over-interpretation of uncertain estimates
- confusion between historical values and future scenarios

## 9. Reviewer Checklist

- Is the claim type correct?
- Are sources specific and valid?
- Is the confidence level justified?
- Are limitations explicit?
- Is wording neutral and non-overstated?
