# Method, Claim Types, Confidence (Complete)

This project only works if it uses consistent language and labeling everywhere.

## 1) The four claim types (mandatory)

Every published number must be labeled with **exactly one**:

1. `observed` — directly measured (dataset value, official series, etc.)
2. `derived` — computed from observed values using a stated formula
3. `estimated` — inferred from indirect proxies; must include uncertainty and assumptions
4. `scenario` — conditional future/counterfactual simulation output; not a forecast

### Rule: claim type is about epistemology, not importance

“Big” claims can still be `estimated`. “Small” claims can still be `observed`.

## 2) Confidence labels (unified)

Every metric/parameter must have one:

- `high` — primary/official data; low interpretation burden
- `medium` — strong secondary analysis or primary data with caveats
- `estimate` — meaningful assumptions, synthesis, or proxy-based inference
- `speculative` — exploratory; high uncertainty; should not be headline

### Confidence is not “political certainty”

Confidence is purely about evidence quality + model uncertainty.

## 3) What must be shown to users (publication rules)

### For `observed`

Must show:
- source IDs
- unit
- date coverage / “as of”
- definition

### For `derived`

Must show:
- source IDs for inputs
- formula in human language (and ideally machine-readable somewhere)
- inputs used (at least summarized)

### For `estimated`

Must show:
- uncertainty interval (range or distribution summary)
- assumptions
- method note
- source IDs (for any inputs / proxy justification)

### For `scenario`

Must show:
- “Scenario output (conditional)” label next to the number
- assumptions list (parameter set)
- uncertainty bands by default
- sensitivity / top drivers
- versions (data + model) + generated date

## 4) Language rules (copywriting constraints)

### Avoid absolute certainty

Don’t:
- “proves”, “undeniable”, “exact”, “real-time truth”
- “every second X is stolen” unless it’s explicitly a `derived` estimate with defensible method + range

Do:
- “based on…”
- “estimated range…”
- “conditional on these assumptions…”
- “this scenario suggests…”

### Boundary rule

Never place `scenario` outputs next to `observed/derived/estimated` historical metrics without a visible boundary (labels + section separation).

## 5) Uncertainty (how to represent it)

Uncertainty is not a footnote; it is part of the value.

### Minimum standard

- If uncertainty is material, show a range: `min`/`max` or `p10`/`p90`.
- If you have a distribution (Monte Carlo), show `p10/p50/p90`.
- Always state what the range means (source disagreement vs model uncertainty).

### Example (short, user-facing)

“Range reflects uncertainty in the assumed investment response and disagreement between two data sources.”

## 6) Counterfactual comparison rules (don’t create fake precision)

Any counterfactual must specify:

- baseline year (e.g., `1979`, `2005`, `2011`)
- comparator country/group and why (e.g., “peer group by income + region”)
- transformation method (PPP vs nominal; real vs current; deflators)
- limitations and failure modes (e.g., commodity cycles, wars, measurement breaks)

If you cannot specify these, the comparison stays as a narrative note, not a headline chart.

## 7) Examples (what correct labeling looks like)

### Example A: Observed metric (historical)

- “Iran population (World Bank series)” → `observed`, confidence `high`

### Example B: Derived metric

- “Cumulative GDP gap vs peer median” computed from observed GDP series + formula → `derived`, confidence depends on method assumptions

### Example C: Estimated metric

- “Opportunity cost of sanctions” computed from multiple proxies and models → `estimated`, confidence `estimate`, must include range + assumptions

### Example D: Scenario output

- “GDP per capita in 10 years under Base scenario” → `scenario`, show assumptions + p10/p50/p90 + sensitivity

