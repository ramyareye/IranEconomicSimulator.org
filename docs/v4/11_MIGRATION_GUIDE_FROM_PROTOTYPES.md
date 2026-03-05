# Migration Guide (From `docs/` Prototypes → Canonical)

You have a lot of valuable work in `docs/`. The goal is to **keep all details** while preventing credibility risks.

Canonical reference:
- `codex/DOCS_REVIEW_REPORT.md`
- `codex/DATA_GOVERNANCE.md`

## 1) The migration rule

Nothing becomes “public truth” until it is:
- mapped to canonical claim/confidence labels
- backed by resolvable source IDs (no generic sources)
- validated by CI gates
- shipped in a versioned release bundle

## 2) Recommended migration approach (vertical slice)

Pick one narrow slice and take it end-to-end:

1. Choose 10 metrics (Evidence Atlas) and 10 events (Timeline)
2. Create complete source registry entries for every citation
3. Rewrite method notes in canonical language
4. Add uncertainty where required
5. Generate a release bundle
6. Build a minimal UI that exposes “show your work”

This creates a credible core you can expand safely.

## 3) Prototype-by-prototype mapping (what to reuse vs avoid)

### 3.1 `docs/chatgpt-iran-potential-simulator-v0.2/`

Reuse:
- `model/simulate.ts`, `model/montecarlo.ts`, `model/sensitivity.ts` (core logic patterns)
- schema ideas in `data/schemas/*`

Watch-outs:
- placeholders in parameters/sources seeds
- ensure claim/confidence labels match canonical labels (`high|medium|estimate|speculative`)

### 3.2 `docs/chatgpt-ips-share-page/`

Reuse:
- share-page UI concept (sparkline + tornado + “methodology” page)
- component patterns

Watch-outs:
- don’t ship placeholder demo JSON as if it were validated outputs
- ensure release watermark is displayed everywhere

### 3.3 `docs/claude-iran-freedom-project/`

Reuse:
- dataset structure (`data/metrics`, `data/events`, `data/sources`)
- validation script patterns (`scripts/validate.js`)
- bilingual disclaimer language

Watch-outs:
- replace generic/unresolvable sources
- unify confidence schema and claim type schema

### 3.4 `docs/grok-iran-regime-economic-cost-tracker iran-waste-ticker-2026/`

Reuse:
- pitch/outline and content brainstorming
- JSON breakdown idea

Watch-outs:
- “live ticker” framing is high-risk without strict methodology + release watermarking
- numbers described there must be re-audited and re-sourced before any public use

### 3.5 `docs/gemini-*/`

Reuse:
- narrative framing and modular taxonomy ideas
- “JSON-as-source” transparency philosophy

Watch-outs:
- avoid strong quantitative claims without exact sources and definitions

### 3.6 Loose files

- `docs/cluade-iran-azadi-ticker.html` is explicitly risky if it contains synthetic/random updates.
- `docs/*scenario*.txt` are useful for brainstorming but not canonical.

## 4) Migration checklist (copy/paste)

- [ ] Assign `claim_type` and `confidence`
- [ ] Add or fix source registry entries for every `source_id`
- [ ] Remove/replace banned generic sources
- [ ] Add uncertainty ranges where required
- [ ] Add method note for every derived/estimated/scenario output
- [ ] Add release metadata + seed for scenario outputs
- [ ] Run validation gates
- [ ] Generate release bundle + checksums

