# Public Site Copy Guide (Opinionated)

Goal: **maximum credibility under scrutiny** while still being clear, shareable, and emotionally resonant.

## 1) The core promise (one sentence)

“A transparent, source-linked view of Iran’s historical outcomes and *conditional* future scenarios — with assumptions, uncertainty, and reproducible releases.”

## 2) Always-on global disclaimer (recommended)

Place this in the header/footer and on every share page:

- This project documents economic and social outcomes affecting the Iranian people.
- It does **not** advocate foreign military intervention.
- Scenario outputs are **conditional simulations**, not deterministic forecasts.
- Every number links to sources and a method note; disputed values can be challenged.

## 3) Home page structure (suggested)

### Above the fold

- Title: “Iran Economic Simulator”
- Two tabs or two big cards:
  - **Evidence Atlas** (Historical reality)
  - **Scenario Lab** (Future paths)
- “How this works” link (goes to Methodology)
- “See sources” link (goes to Sources)
- Release banner: `Release vX.Y.Z — generated YYYY-MM-DD`

### Proof, not slogans

Show 3 items max, each as a **metric card** with a deep-link:
- one macro indicator (historical)
- one human-capital indicator (historical)
- one scenario result (clearly labeled “scenario output”)

### Trust anchors

- “Why ranges?” (short explainer)
- “How to challenge a number” (link to correction workflow)
- “What we don’t do” (no incitement, no individual targeting, no fake live tickers)

## 4) Metric card template (use everywhere)

Every metric card should show (even if collapsed):

- **Title (FA/EN)**
- **Value** (or range) + unit
- **As of** date
- **Claim type**: `observed | derived | estimated | scenario`
- **Confidence**: `high | medium | estimate | speculative`
- **Sources**: 1–3 primary source IDs visible (with “see all”)
- **Method note**: one sentence
- **Release version** (watermark or footer)

Avoid:
- single “headline” numbers without range when uncertainty is meaningful
- “live” tickers driven by random increments

## 5) Evidence Atlas page (historical)

Positioning:
- “Observed and estimated historical outcomes, sourced and challengeable.”

UX requirements:
- filters by category/subcategory
- “show your work” expands to sources + method
- “compare” mode (optional) must state comparator rationale and limitations

Copy rules:
- don’t use certainty language for estimates (“proved”, “undeniable”, “exact”)
- don’t mix moral judgment into metric titles; keep it factual and let context speak

## 6) Scenario Lab page (future)

Positioning:
- “Scenario outputs are *if‑then* results: if assumptions change, outputs change.”

Must-have UI elements:
- scenario presets + editable assumptions
- uncertainty bands (p10/p50/p90) by default
- sensitivity drivers (top factors) with plain-language explanations
- prominent “not a forecast” label near every chart

Copy rules:
- never present scenario outputs next to historical numbers without a visible label boundary
- avoid “will” and prefer “could”, “conditional on”, “under these assumptions”

## 7) Methodology and Sources pages

Methodology page should answer:
- What is a claim type? What is confidence?
- How are ranges produced?
- What are known limitations and failure modes?

Sources page should:
- expose the full source registry (tier + publisher + retrieved date)
- show deprecation/replacement notes if sources go stale

## 8) Microcopy do/don’t (quick)

Do:
- “Based on IMF series X and method Y…”
- “Range reflects disagreement between sources / model uncertainty…”
- “Challenge this value” (make it easy)

Don’t:
- “Real-time truth”
- “Impossible to dispute”
- “Every second X is stolen” unless it’s explicitly a derived estimate with defensible method + range + label

