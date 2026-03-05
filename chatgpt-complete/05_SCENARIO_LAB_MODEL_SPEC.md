# Scenario Lab Model Spec (Super Detailed)

This is the “how the scenario engine should work” spec in plain language.

Canonical references:
- `codex/METHODOLOGY.md` (scenario rules)
- `codex/ARCHITECTURE.md` (release-bundle data flow)

This model spec is intentionally modular so you can replace parts without rewriting everything.

## 1) What Scenario Lab outputs

Minimum v1 outputs (time series):

- GDP (level)
- GDP per capita
- Government revenue (simple fiscal proxy)
- Investment proxy (optional but useful)

Everything is explicitly a `scenario` output.

## 2) Core structure (growth path)

We model GDP recursively:

- `GDP_t = GDP_{t-1} * (1 + g_t)`

Where:
- `t` is year (or quarter; start with yearly)
- `g_t` is the total growth rate for period `t`

### 2.1 Growth decomposition (modules)

Define:

`g_t = g_base + g_trade(t) + g_governance(t) + g_competition(t) + g_capital(t) + g_talent(t) + g_oil(t) + shocks(t)`

Interpretation:
- `g_base`: baseline growth absent major changes (can be small/low in conservative scenarios)
- `g_trade`: uplift from normalized trade and finance access
- `g_governance`: uplift from governance improvements (lower waste, better allocation)
- `g_competition`: uplift from reduced monopoly/rent-seeking and better market functioning
- `g_capital`: uplift from capital return / investment response and lower risk premium
- `g_talent`: uplift from talent return / productivity / entrepreneurship
- `g_oil`: uplift (or constraint) from energy sector normalization
- `shocks`: optional (negative or positive) shocks with probability

Rule:
- Each module must be documented with: (a) meaning, (b) parameters, (c) plausible bounds, (d) limitations.

## 3) Parameterization (what users edit)

Parameters should be human-auditable and UI-friendly.

Recommended v1 parameters (examples):

- `horizon_years` (e.g., 10)
- `g_base` (e.g., 0.02)
- `trade_uplift_peak` and `trade_uplift_years_to_peak`
- `governance_uplift_peak` and `years_to_peak`
- `competition_uplift_peak`
- `risk_premium_reduction` (translates to investment response)
- `capital_return_multiplier`
- `talent_return_multiplier`
- `oil_constraint` (cap or path)
- `shock_probability` and `shock_impact_range`

Each parameter must have:
- min/max bounds (plausibility)
- confidence
- source IDs or method note
- distribution definition (for MC)

See examples in `chatgpt-complete/samples/release/meta.json` and scenario output files.

## 4) Fiscal proxy (simple but explicit)

Define government revenue:

`Rev_t = Tax_t + OilRev_t + Customs_t + Other_t - Leakage_t`

For v1 simplicity, you can compress this to:

- `Tax_t = tax_to_gdp_t * GDP_t`
- `Leakage_t = leakage_rate_t * RevPotential_t`

Where:
- `tax_to_gdp_t` can improve under governance scenario assumptions
- `leakage_rate_t` declines under “reduced rent-seeking” assumptions

Rule:
- If you simplify the fiscal side, say so clearly and label outputs as “proxy”.

## 5) Monte Carlo uncertainty (mandatory for Scenario Lab)

### 5.1 Why MC exists

Scenario outputs depend on assumptions. MC makes uncertainty visible.

### 5.2 MC process

1. Pick a random seed (store it in output metadata).
2. For N runs (e.g., 2,000–10,000):
   - sample each uncertain parameter from its distribution
   - run the scenario simulation
3. For each output series at each year:
   - compute percentiles (p10/p50/p90)
4. Store the results as `*.montecarlo.json`.

### 5.3 Distribution guidance (pragmatic)

- Use **triangular** for “min/mode/max” assumptions (good for human settings).
- Use **uniform** when you truly have no idea (but it often overstates extremes).
- Use **lognormal** for strictly positive multipliers (avoid negatives).
- Truncate distributions to maintain plausibility bounds.

Rule:
- Distributions must never generate invalid values silently. Clamp or reject and log.

## 6) Sensitivity analysis (mandatory)

Goal:
- identify which assumptions drive results the most

Two easy v1 approaches:

### 6.1 OAT (one-at-a-time) tornado

For each parameter:
- set it to `min` (others baseline) → compute target metric at year H
- set it to `max` (others baseline) → compute target metric at year H
- record the difference from baseline

Output:
- list of parameters ranked by impact magnitude
- show as tornado chart

### 6.2 Regression / correlation (optional later)

Use MC sample runs and compute standardized effects. More complex, but sometimes more realistic when parameters interact.

## 7) Reproducibility (non-negotiable)

Every scenario output file must include:
- `release_version`
- `model_version`
- `data_version`
- `generated_at`
- `seed` (and RNG method if needed)

Rule:
- If you rerun with same versions + seed + inputs, outputs must match (within floating-point tolerance).

## 8) Minimal sample outputs (copy/paste)

See:
- point output: `chatgpt-complete/samples/release/scenarios/base.point.json`
- MC output: `chatgpt-complete/samples/release/scenarios/base.montecarlo.json`
- sensitivity output: `chatgpt-complete/samples/release/scenarios/base.sensitivity.json`

These are intentionally small but demonstrate the full contract.

## 9) Known limitations (be honest)

- This is a simplified macro model; it is not a DSGE model.
- Modules may overlap (e.g., governance and competition both affect productivity).
- Parameter ranges are often judgment-based; document that and keep them conservative in headlines.
- Some relationships are nonlinear and regime-dependent; v1 may approximate them linearly.

