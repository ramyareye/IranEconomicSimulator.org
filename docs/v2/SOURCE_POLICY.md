# Source Policy (Canonical)

Date: 2026-03-05

## 1. Purpose

Guarantee that published claims are traceable, challengeable, and defensible.

## 2. Source Tiers

- Tier A: official international datasets and primary institutional sources
- Tier B: peer-reviewed research and reproducible academic studies
- Tier C: think tanks and investigative organizations
- Tier D: media-only or secondary commentary

Policy:
- Headline metrics should prefer Tier A/B.
- Tier C requires clear bias note when relevant.
- Tier D cannot stand alone for high-impact claims.

## 3. Source Registry Requirements

Each source must include:
- `id`
- `title`
- `url`
- `publisher`
- `published_at` (if available)
- `retrieved_at`
- `tier`
- `reliability`
- `bias_note` (if applicable)

## 4. Citation Rules

Per metric/event:
- at least one concrete source ID
- derived/estimated claims require formula/method note
- if sources disagree, show range and explain choice

Forbidden citation patterns in production:
- `various_news`
- `various_estimates`
- `multiple_think_tanks`
- any generic non-resolvable source key

## 5. Confidence Mapping Rules

Recommended mapping:
- Tier A mostly `high`
- Tier B usually `medium` or `high`
- Tier C generally `medium` or `estimate`
- Tier D mostly `estimate` or `speculative`

## 6. Counterfactual and Scenario Claims

Any counterfactual/scenario claim must include:
- comparator rationale
- assumptions list
- uncertainty interval
- explicit label: "scenario output"

## 7. Conflict Resolution for Sources

When sources conflict:
1. document both values and methods
2. select conservative baseline for headline
3. widen uncertainty range
4. lower confidence if needed
5. record decision in changelog

## 8. Review Policy

Every data PR must answer:
1. What changed?
2. Why did it change?
3. Which source IDs support it?
4. Did confidence or uncertainty change?

## 9. Deprecation Policy

If a source becomes invalid or inaccessible:
- keep archived metadata
- mark source `deprecated`
- replace with a new source ID
- link the replacement in notes

## 10. Public Transparency Requirements

Public pages must provide:
- click-through source list per metric
- methodology note per calculated number
- last-updated timestamp and release version
