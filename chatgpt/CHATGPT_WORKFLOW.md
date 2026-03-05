# ChatGPT Workflow (Safe + Useful)

This project’s biggest risk is **credibility loss from hallucinated sources, fake “live” behavior, or overstated copy**.

Use this workflow whenever ChatGPT helps create or edit project artifacts.

## 1) Decide the task type

- **Docs/copy**: writing pages, explanations, FAQs, translations
- **Data entry**: metrics, events, sources registry items
- **Model notes**: assumptions, parameter explanations, limitations

If it’s data or model related, keep `codex/DATA_GOVERNANCE.md`, `codex/SOURCE_POLICY.md`, and `codex/METHODOLOGY.md` open while working.

## 2) Inputs you must provide to ChatGPT

### For any factual claim

- the source URLs or citations you want used
- what you want the output to become (a doc section, a JSON entry, etc.)
- the intended claim type: `observed | derived | estimated | scenario`

If you don’t have sources yet, ask ChatGPT to:
- list what sources would be acceptable (Tier A/B first)
- draft a *placeholder* structure with `TODO: source` markers (do not publish)

### For derived/estimated numbers

- the formula
- the raw inputs (values + units + dates)
- a proposed uncertainty approach (min/max or distribution)

## 3) Outputs you should require from ChatGPT

### For data artifacts

- strict JSON (or JSON + a short method note section)
- explicit units, dates, and assumptions
- uncertainty/range when applicable
- confidence label justification in one sentence

### For public copy

- neutral language (avoid propaganda framing)
- visible boundary between historical evidence and scenario outputs
- the always-on disclaimer text included where relevant

## 4) Hard “don’ts”

- Don’t invent sources, publishers, report names, or publication dates.
- Don’t output fake “live” behavior (random increments) as if it were data-driven.
- Don’t mix scenario outputs into “historical fact” language.
- Don’t target individuals; keep the focus on systems, policies, and outcomes.

## 5) Review loop (recommended)

Before merging/publishing:

1. Spot-check: every number has the right claim type + confidence.
2. Spot-check: every metric/event has resolvable source IDs.
3. Spot-check: ranges exist where uncertainty is material.
4. Spot-check: English and Persian versions say the same thing (no meaning drift).

