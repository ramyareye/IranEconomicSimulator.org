# UI Spec and Copy (Complete)

This is an opinionated but practical UI/content spec that turns the governance rules into UX.

Canonical reference: `codex/PROJECT_MASTER_DOCUMENT.md` (Information Architecture + UX rules).

## 1) Top-level navigation (v1)

- Home
- Evidence Atlas
- Scenario Lab
- Methodology
- Sources
- Timeline
- API

Global elements (always visible somewhere):
- release banner: `Release vX.Y.Z — generated YYYY-MM-DD`
- global disclaimer (non-violence + scenario-not-forecast)
- language toggle (FA/EN)

## 2) Home page (structure)

### 2.1 Above the fold

- Title: “Iran Economic Simulator”
- Two primary entry cards (equal prominence):
  - Evidence Atlas — “Historical reality, sourced”
  - Scenario Lab — “Conditional futures, assumptions shown”
- Two links:
  - “How this works” → Methodology
  - “See sources” → Sources

### 2.2 Three proof cards (max)

Show 3 cards total:
- 2 Evidence metrics (historical)
- 1 Scenario output (clearly labeled)

Each card must include:
- claim type label
- confidence
- sources link
- method note link

## 3) Evidence Atlas page

### 3.1 Requirements

- filter by category/subcategory
- search by keyword
- each metric opens an expandable “show your work” panel

### 3.2 Metric card (canonical UI component)

Fields shown by default:
- title
- value + unit
- as-of date
- claim type badge
- confidence badge

Expandable “show your work”:
- sources list (IDs + publisher + link)
- method note
- uncertainty (if present)
- version / release watermark

### 3.3 Copy rules

- Neutral, factual titles
- No incitement language
- Avoid false precision when uncertainty exists

## 4) Scenario Lab page

### 4.1 Requirements

- preset scenarios (Conservative/Base/Optimistic)
- editable assumptions (simple mode + advanced JSON)
- charts with uncertainty bands (default on)
- sensitivity drivers list + tornado chart
- strong “Scenario output (conditional)” label near every chart

### 4.2 Chart labeling (mandatory)

Every scenario chart should include:
- “Scenario output (conditional), not a forecast.”
- “Assumptions: view / edit”
- “Uncertainty: p10/p50/p90”

### 4.3 Sensitivity (what to show)

Show a ranked list:
- parameter label
- impact on target outcome at horizon (e.g., Year 10 GDP)
- min/max bounds used

## 5) Methodology page

Must answer:
- What are claim types?
- What are confidence labels?
- What does uncertainty range mean?
- What are limitations and failure modes?
- How do releases work?

Keep it scannable:
- short sections
- a glossary
- links to deeper docs (for power users)

## 6) Sources page

Must provide:
- searchable registry
- tier + reliability visible
- retrieved date visible
- deprecation notes if applicable

## 7) Timeline page

Timeline should:
- show events with citations
- allow filtering by impact type
- show “impact estimate” only when it meets `estimated` rules (range + method)

## 8) Share cards and embeds (credibility-protecting defaults)

Every share artifact must include:
- release version + generated date watermark
- claim type label
- “Scenario output (conditional)” if scenario
- a short URL or QR linking to “show your work”

Never publish:
- random ticking “live” numbers without an auditable model

## 9) Bilingual parity (avoid translation drift)

Rules:
- numbers, units, and dates must match exactly
- avoid idioms that change meaning
- keep definitions consistent (glossary)

Suggested workflow:
- write EN first (or FA first)
- translate
- run a parity review checklist (humans or tooling)

## 10) Microcopy templates (copy/paste)

### “Show your work” button

- EN: “Show your work”
- FA: “نمایش منبع و روش محاسبه”

### Scenario disclaimer block (inline)

- EN: “Scenario output (conditional). Not a deterministic forecast.”
- FA: “خروجی سناریو (مشروط به فرض‌ها). پیش‌بینی قطعی نیست.”

### Challenge link

- EN: “Challenge this number”
- FA: “اعتراض به این عدد / ارائهٔ منبع بهتر”

