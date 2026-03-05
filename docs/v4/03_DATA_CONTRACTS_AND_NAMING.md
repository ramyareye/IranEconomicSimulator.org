# Data Contracts and Naming (Super Detailed)

This document explains **exactly** what fields should exist, what they mean, and how to name things so the project stays maintainable.

Canonical reference: `codex/DATA_GOVERNANCE.md` and `codex/SOURCE_POLICY.md`.

## 1) Data domains (what kinds of data exist)

- `historical_metrics` — Evidence Atlas metrics (observed/derived/estimated)
- `timeline_events` — dated events with citations
- `scenario_parameters` — assumption sets
- `scenario_outputs` — simulation results (point + uncertainty + sensitivity)
- `source_registry` — bibliography entries for every source ID

## 2) ID conventions (do this early or regret it later)

### 2.1 Source IDs

Format (recommended):

- `SRC.<publisher_or_type>.<slug>.<yyyy>` (human-scannable)
- Examples:
  - `SRC.DEMO.WDI.POP.2026`
  - `SRC.DEMO.IMF.WEO.2026`

Rules:
- Source IDs must be unique and stable.
- Source IDs must resolve in `sources.json` (or your canonical source registry).
- Never use generic IDs (banned): `various_news`, `various_estimates`, `multiple_think_tanks`, `own_calculation`.

### 2.2 Metric IDs

Format (recommended):

- `<domain>.<topic>.<metric_name>`
- Examples:
  - `macro.gdp.usd_current`
  - `macro.gdp_per_capita.ppp_2017`
  - `human_capital.emigration.rate`

Rules:
- Use lowercase + dots.
- Avoid embedding years in IDs unless the metric is inherently year-specific.

### 2.3 Event IDs

Format (recommended):

- `event.<yyyy_mm_dd>.<slug>`
- Example:
  - `event.2018_05_08.us_withdraws_jcpoa`

Rules:
- If exact date unknown, use a range or month-level ID and make the date explicit in the record.

## 3) Dates, units, and numbers

### Dates

- Use ISO-8601 strings: `YYYY-MM-DD` for a specific date.
- If you need time: `YYYY-MM-DDTHH:mm:ssZ`.

### Units

Decide a small set and reuse them:

- `usd_current` — current USD (nominal)
- `usd_2017_ppp` — constant PPP basis (example)
- `percent` — 0–100 scale (be explicit)
- `ratio` — 0–1 scale (be explicit)
- `people`, `people_per_1000`, etc.

Rule:
- Never publish a number without a unit.

### Significant figures

- For uncertain estimates, avoid false precision (e.g., don’t show 12 decimals).

## 4) Metric contract (expanded)

Minimum required fields (canonical):

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

Recommended extra fields:

- `uncertainty` — null or an object (see below)
- `notes` — optional footnote text (bilingual if user-facing)
- `inputs` — for derived metrics: list of input metric IDs (or source series IDs)
- `tags[]` — for filtering and search

### 4.1 Uncertainty object (recommended)

Use one of these shapes:

**Range:**
```json
{
  "type": "range",
  "min": 0,
  "max": 0,
  "basis": "model|source_disagreement|mixed",
  "notes": "Short explanation of what this range represents."
}
```

**Percentiles:**
```json
{
  "type": "percentiles",
  "p10": 0,
  "p50": 0,
  "p90": 0,
  "basis": "monte_carlo",
  "notes": "Short explanation."
}
```

Rule:
- `estimated` metrics should almost always have `uncertainty`.

## 5) Timeline event contract (expanded)

Minimum required fields (canonical):

- `id`
- `date`
- `title.fa`
- `title.en`
- `description.fa`
- `description.en`
- `impact_type`
- `impact_estimate` (or null)
- `sources[]`

Recommended extra fields:

- `tags[]`
- `location` (if relevant)
- `method_note` (if impact estimate exists)

### Impact estimate shape (recommended)

If you estimate an impact, treat it like a metric:

```json
{
  "claim_type": "estimated",
  "unit": "usd_current",
  "uncertainty": { "type": "range", "min": 0, "max": 0, "basis": "mixed", "notes": "…" },
  "value": 0,
  "confidence": "estimate",
  "method_note": "One sentence."
}
```

## 6) Scenario parameter contract (expanded)

Parameters are the assumptions. They must be easy to audit and change.

Minimum fields:

- `key` (stable identifier)
- `value`
- `min`
- `max`
- `unit`
- `confidence`
- `source_ids[]` or `method_note`
- `last_updated`

Recommended extra fields:

- `label.fa`, `label.en`
- `description.fa`, `description.en`
- `distribution` (for Monte Carlo)
- `category` (for UI grouping)

### Distribution shape (recommended)

```json
{
  "type": "triangular",
  "min": 0,
  "mode": 0,
  "max": 0,
  "notes": "Why this distribution?"
}
```

Common `type` options:
- `uniform`
- `triangular`
- `normal` (careful: can produce invalid values; often use truncated normal)
- `lognormal` (for strictly-positive multipliers)

## 7) Scenario outputs contract (expanded)

Scenario outputs are not “facts”; they are generated artifacts.

At minimum, every scenario output file should contain:

- scenario ID
- metadata: `generated_at`, `model_version`, `data_version`, `release_version`
- assumptions reference or inline assumptions hash
- results arrays (time series)

Recommended structure:

```json
{
  "scenario_id": "base",
  "release_version": "0.0.0-demo",
  "model_version": "0.0.0-demo",
  "data_version": "0.0.0-demo",
  "generated_at": "2026-03-05T00:00:00Z",
  "seed": 12345,
  "series": {
    "gdp_usd_current": [{ "year": 2026, "value": 0 }],
    "gdp_per_capita_usd_current": [{ "year": 2026, "value": 0 }]
  },
  "notes": "Scenario output (conditional), not a forecast."
}
```

## 8) Release bundle layout (what production reads)

Canonical structure (v1):

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

See a fully copy/pasteable minimal sample in `chatgpt-complete/samples/release/`.

