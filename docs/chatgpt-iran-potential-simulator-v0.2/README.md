# Iran Potential Simulator (IPS)
> سناریوساز اقتصادی برای «ایرانِ نرمال» — شفاف، نسخه‌پذیر، قابل بررسی

**هدف:** ساخت یک وب‌سایت/ابزار متن‌باز که با فرض‌های شفاف و قابل‌تنظیم نشان دهد اگر ایران به یک اقتصاد «معمولی» با دسترسی نرمال به تجارت، سرمایه‌گذاری و حکمرانی بهتر نزدیک شود، مسیرهای ممکنِ **GDP، درآمد دولت، سرمایه‌گذاری، اشتغال** و چند KPI دیگر در بازه ۵ تا ۱۵ سال چه شکلی می‌تواند باشد.

**مهم:** این ابزار *پیش‌بینی قطعی* نیست؛ یک **Scenario Simulator** است.  
خروجی‌ها باید همیشه همراه با:
- فرض‌ها (Assumptions)
- منابع/روش تخمین (Sources/Method)
- بازه عدم قطعیت (Ranges)
- و هشدارهای روش‌شناسی

---

## چرا این پروژه (و چرا شفافیت حیاتی است)
در پروژه‌های «ticker» و مدل‌های عمومی (مثل چیزی که در هکرنیوز درباره‌اش بحث می‌شد)، مهم‌ترین نقدها معمولاً این‌ها هستند:
1) **عددها از کجا آمده؟** (Opaque assumptions)  
2) **چی حساب می‌کنی و چی حساب نمی‌کنی؟** (Excess cost vs total cost, scope ambiguity)  
3) **چقدر حساسه به یک فرض؟** (Sensitivity)  
4) **بازه خطا/عدم قطعیت کجاست؟** (Ranges) citeturn0search0

IPS از روز اول این‌ها را «feature» می‌کند:
- هر خروجی = تابعی از پارامترها + لینک به منبع یا روش تخمین
- هر پارامتر = مقدار پایه + min/max + توضیح + provenance
- سناریوها = قابل نسخه‌بندی (Git + JSON)

---

# English Summary

## What is IPS?
An open, assumption-driven **economic scenario simulator** for a “normalized Iran” (normal trade/finance access, governance improvements, competition, capital & talent return). It outputs trajectories for **GDP, GDP per capita, government revenue, investment**, and optional KPIs over 5–15 years.

## Not a prophecy
IPS is not a deterministic forecast; it’s a transparent scenario model. Every output must ship with:
- assumptions
- sources/method notes
- uncertainty ranges
- sensitivity analysis

---

# Product: What users see

## Landing (simple, shareable)
- A headline metric (e.g., “Potential GDP range in 10 years”)
- 3 preset scenarios: Conservative / Base / Optimistic
- “Assumptions are editable” CTA
- “Methodology & sources” CTA

## Deep-dive (for power users)
- Scenario editor (sliders + advanced JSON view)
- Output charts + tables
- Sensitivity: “Top 10 assumptions driving results”
- Compare: Iran vs peer benchmarks (Turkey/Malaysia/etc.)

---

# Model v0.1 (Starter): modular, replaceable
We start with a **modular growth + fiscal model**. Each module can be swapped later.

## 1) Macro: GDP trajectory
We model GDP as:
- `GDP_t = GDP_{t-1} * (1 + g_t)`
- `g_t` is composed of modules:

**g_t = g_base + g_trade + g_governance + g_competition + g_capital + g_talent + g_oil + shocks_t**

Each module:
- has a parameter set
- has a clear interpretation
- has min/max + notes
- can be turned on/off

## 2) Fiscal: Government revenue
Government revenue:
- `Rev_t = Tax_t + OilRev_t + Customs_t + SOEDividends_t - Leakage_t`
Where:
- `Tax_t = tax_to_gdp_t * GDP_t`
- `Leakage_t` captures “rent-seeking / corruption / inefficiency”
- “Religious budget reallocation” is modeled as:
  - reducing non-productive spending
  - increasing productive public investment (education/health/infrastructure)
  - improving risk & trust (affects capital inflow)

---

# Key concepts you requested (mapped to modules)

## Reverse migration of capital & people
- **Capital return**: increases domestic private investment, lowers risk premium
- **Talent return**: improves productivity (TFP), entrepreneurship, innovation

## Removing/reallocating religious budgets
Model it as *reallocation* + *risk reduction*, not as “magic money”:
- Reallocation → public investment → productivity over time
- Transparency + reduced ideological spending → lower risk premium → more investment

## Theft / monopoly / rent-seeking
Two simple knobs:
1) **Leakage rate** (budget & oil revenue not reaching productive use)
2) **Competition index** (monopoly power → lower productivity & higher prices)

---

# Data strategy (GitHub JSON vs DB)

## Option A — Git-first (recommended for v0.1)
- All parameters & scenarios as JSON in a public repo
- PRs for changes (reviewable), releases for versions
- Your web app reads JSON from GitHub raw (cached)

Pros:
- transparency
- easy review + history
- community contributions

Cons:
- not great for large time-series or per-user saved scenarios (but you can store user scenarios client-side or in a small DB)

## Option B — DB-first (later)
- Store canonical data in DB
- Export a signed JSON snapshot per release

Pros:
- better for large datasets & analytics
Cons:
- less transparent by default, needs extra tooling

**Hybrid**: DB for heavy data + Git JSON snapshot for public parameters.

---

# Repository layout (included in the zip)

```
iran-potential-simulator/
  README.md
  docs/
    00-overview.fa.md
    00-overview.en.md
    01-model.fa.md
    01-model.en.md
    02-data-inventory.fa.md
    02-data-inventory.en.md
    03-sources-policy.fa.md
    03-sources-policy.en.md
    04-roadmap.fa.md
    04-roadmap.en.md
  data/
    schemas/
      parameter.schema.json
      scenario.schema.json
      sources.schema.json
    parameters/
      core.parameters.json
    scenarios/
      conservative.json
      base.json
      optimistic.json
    sources/
      sources.seed.json
  model/
    simulate.ts
    README.md
  app/
    README.md
```

---

# Implementation plan (step-by-step)

## Phase 0 — Governance & transparency (1–2 days)
- Define JSON schema for parameters/scenarios/sources
- Add “sources policy”: each parameter must have provenance or method note
- Add versioning rules (semantic versions for data + model)

## Phase 1 — Model v0.1 (MVP)
- Implement simulator (`model/simulate.ts`)
- Outputs:
  - GDP path
  - GDP per capita
  - Gov revenue
- Export results as JSON (for web/mobile rendering)

## Phase 2 — Web shareable page
- Minimal web page:
  - pick scenario
  - show headline + chart
  - link to assumptions + methodology

## Phase 3 — Sensitivity & uncertainty
- Run Monte Carlo using min/max distributions
- Show:
  - 10th/50th/90th percentile
  - tornado chart for sensitivity

## Phase 4 — Expand data & realism
- Add oil production/export constraints
- Add inflation & FX (optional)
- Add employment rough model (Okun-like or productivity-based)

---

# Data inventory (full list you should extract)
You said you want it “proper” and you’ll invest time. Good.  
Below is the **complete data checklist** to work toward. Start with Level 1.

## Level 1 — Core macro/fiscal (must-have)
**Macro**
- Current GDP (nominal USD) baseline year
- PPP GDP (optional but useful)
- Population baseline + growth projections
- Current GDP per capita
- Investment rate (gross capital formation % of GDP)
- Productivity proxy (TFP index or growth residual; can be estimated)

**Fiscal**
- Government revenue total (and breakdown if possible)
- Tax-to-GDP ratio (current)
- Oil & gas government take (royalties, taxes, dividends)
- Customs / tariffs revenue
- Government expenditure breakdown (at high level)
- Subsidies (energy, food) rough magnitude (even if uncertain)

**External**
- Oil production, export volumes (current, constrained)
- Oil price assumption (scenario-based)
- Non-oil exports baseline
- Imports baseline
- FDI baseline (inflow/outflow)
- Remittances (optional)

## Level 2 — Governance / corruption / monopoly (high impact)
- Leakage proxies:
  - procurement inefficiency estimates
  - corruption perception indices (as proxy)
  - share of quasi-state enterprises / bonyads / monopolies (rough)
- Competition proxies:
  - market concentration in key sectors (telecom, auto, banking, energy)
  - barriers-to-entry metrics (qualitative if needed)
- Risk metrics:
  - sovereign risk premium / CDS (if available)
  - sanctions intensity proxy (binary / index)

## Level 3 — Human capital & migration
- Skilled emigration estimates (flows, stock)
- Diaspora size (by skill band if possible)
- Potential return rates under scenarios (assumption-based)
- Education attainment distribution
- Labor participation rate, unemployment (baseline)

## Level 4 — “Religious budget / reallocation”
- Budget line items for religious/ideological institutions (where available)
- Public investment effectiveness (education/health/infra multipliers) — ranges
- Transparency/anti-corruption reforms index — proxy

## Level 5 — Validation & benchmarks
- Peer country time series:
  - Turkey, Malaysia, Poland, Indonesia, Saudi, UAE (pick 3–5)
- Their tax-to-GDP ratios, investment rates, growth periods
- Use them to sanity-check scenarios

---

# Communication strategy (Twitter + Hacker News)

## What HN cares about
- transparency & reproducibility
- “show your work” (assumptions + sources)
- uncertainty & sensitivity (not single-point numbers)
- clear scope: what’s included/excluded citeturn0search0

## Suggested first post copy (short)
- “Open-source scenario simulator for Iran’s economic potential under normalized trade/governance assumptions. All parameters are versioned JSON with sources, ranges, and sensitivity analysis.”

---

# Safety / personal risk note (non-legal)
If you want to reduce personal risk:
- keep it framed as “scenario modeling”
- avoid naming/targeting individuals
- keep everything sourced & methodological
- allow users to edit assumptions (you’re not asserting certainty)

---

# Next: how to use this zip
1) Unzip
2) Read `docs/00-overview.fa.md`
3) Run the model script instructions in `model/README.md`
4) Start filling `data/sources/sources.seed.json` and referencing IDs from `core.parameters.json`

