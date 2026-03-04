# GitHub Projects – Issue / Task List (FA + EN)

> هدف: با حداقل گم‌شدن، هر هفته یک خروجی قابل انتشار داشته باشی.

---

## Column: Backlog (Research / Data)

### [DATA-001] Baseline macro dataset
**FA:** GDP (nominal), population, investment rate, tax-to-GDP برای سال مبنا  
**EN:** Baseline GDP (nominal), population, investment rate, tax-to-GDP for baseline year  
**Acceptance:**
- `data/parameters/core.parameters.json` updated
- Each field has `source_ids` or `method_note`

### [DATA-002] Oil module inputs
**FA:** تولید/صادرات نفت (حجم)، قیمت مرجع، سهم دولت  
**EN:** Oil production/export volume, reference price, government take  
**Acceptance:** parameters added + source notes

### [DATA-003] Leakage proxy definition
**FA:** تعریف قابل دفاع برای leakage_rate + رنج‌ها  
**EN:** defensible leakage proxy + ranges  
**Acceptance:** clear methodology doc paragraph + parameter update

### [DATA-004] Competition / monopoly proxy
**FA:** تعریف competition index (حتی کیفی) + نگاشت به g_competition  
**EN:** define competition proxy + mapping to g_competition  
**Acceptance:** doc + parameter ranges

### [DATA-005] Capital & talent return assumptions
**FA:** سناریوهای بازگشت سرمایه/نیرو + تاثیر روی g_capital/g_talent  
**EN:** capital & talent return assumptions and impact mapping  
**Acceptance:** scenario overrides updated

### [DATA-006] Peer benchmarks
**FA:** ۳–۵ کشور مرجع + چند سال رشد نمونه برای sanity check  
**EN:** 3–5 peer benchmarks and sample growth windows for sanity checks  
**Acceptance:** `docs/validation.md` (new) + citations list

---

## Column: In Progress (Build)

### [MODEL-001] Standard output format
**FA:** خروجی‌های point/MC/sensitivity همه با یک `meta` استاندارد  
**EN:** unify point/MC/sensitivity outputs under a standard meta format  
**Acceptance:** `data/schemas/output.schema.json` + all runners comply

### [MODEL-002] Monte Carlo engine (v0.2)
**FA:** اجرای ۱k–۲۰k نمونه با توزیع‌های ساده (triangular)  
**EN:** run 1k–20k samples with simple distributions (triangular)  
**Acceptance:** `model/montecarlo.ts` + output percentiles by year

### [MODEL-003] Sensitivity (tornado)
**FA:** محاسبه تاثیر هر پارامتر روی KPI (GDP 10y, Rev 10y)  
**EN:** parameter impact on KPIs (GDP 10y, Rev 10y)  
**Acceptance:** `model/sensitivity.ts` + ranked deltas

### [MODEL-004] Scenario editor JSON validation
**FA:** اعتبارسنجی JSON با schema قبل از اجرا  
**EN:** validate JSON against schema pre-run  
**Acceptance:** runner errors are friendly; fails fast

---

## Column: Review (Quality)

### [QA-001] Red-team assumptions page
**FA:** لیست «چرا ممکنه غلط باشه» برای هر ماژول  
**EN:** “why this may be wrong” list per module  
**Acceptance:** docs section added

### [QA-002] Reproducibility
**FA:** seed ثابت برای MC + ثبت نسخه‌ها  
**EN:** deterministic seed + version stamps  
**Acceptance:** MC outputs reproducible

---

## Column: Done (Release)

### [REL-001] v0.2 release tag
**FA/EN:** Tag data+model version + changelog  
**Acceptance:** `docs/CHANGELOG.md` exists + release notes template

---

## Column: Outreach (HN/Twitter)

### [COMM-001] Share page MVP
**FA:** یک صفحه با ۳ KPI + لینک assumptions/sources  
**EN:** single page with 3 KPIs + links  
**Acceptance:** runnable minimal web page (later)

### [COMM-002] “Show your work” post
**FA/EN:** یک پست کوتاه با تاکید روی transparency + uncertainty  
**Acceptance:** draft ready
