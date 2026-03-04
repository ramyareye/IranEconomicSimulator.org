# Iran Waste Ticker – Master Project Plan v1.1 (March 2026)

## ۱. خلاصه اجرایی

- نام: Iran Regime Economic Cost Tracker
- تمرکز: Cumulative economic damage since 1979 (~10–15T USD opportunity cost) + future GDP uplift post-regime (82% to 389%)
- منبع کلیدی جدید: wiiw Austria 2026 report – sanctions lift → +82% GDP Iran, combined with productivity catch-up (Turkey/Korea level) → +240–389%
- Cumulative loss per studies: Farzanegan (2022) → فقط 1978–1988: ~$34,660 per capita loss (40% of potential income)
- Annual waste current: ~100–190B USD (proxies 15–30B/year, IRGC/corruption/subsidies mismanagement)

## ۲. دیتا مدل (JSON-based, GitHub as source of truth)

- cumulative-waste.json → total + breakdown
- annual-waste.json → سالانه
- future-scenarios.json → multipliers از wiiw
- scandals.json → موارد فساد بزرگ
- sources.json → تمام لینک‌ها + reliability

**تخمین‌های کلیدی به‌روز (از منابع ۲۰۲۵–۲۰۲۶)**:

- Opportunity cost total: 10–15 تریلیون دلار (از ترکیب synthetic control + oil loss + sanctions + war + brain drain)
- فقط 1978–1988: 34,660 دلار per capita loss (Farzanegan synthetic control)
- Sanctions oil loss: 200B+ direct + تریلیون‌ها opportunity
- Proxies: 200–500B cumulative
- wiiw 2026: sanctions lift → +82% GDP long-term; + Turkey productivity → +240%; + Korea → +389%

## ۳. معماری فنی (effective & scalable)

Phase 1 (1–4 هفته): Static JSON + simple HTML/JS demo
Phase 2: Next.js 15 + App Router + i18n (en/fa) + Recharts
Phase 3: PWA + optional Supabase (sync JSON → DB)
Phase 4: Community PR + scandals submission form
Phase 5: React Native / Expo app

## ۴. پلن قدم‌به‌قدم (۸–۱۲ هفته)

Week 1–2: ریپو + JSON populate + simple HTML ticker
Week 3: Bilingual + charts
Week 4: Deploy Vercel + PWA
Week 5–6: Community guide + PR templates
Week 7: Teaser X threads
Week 8: HN/Product Hunt submit + monitor
Week 9+: Iterate + add user scenarios calculator

## ۵. استراتژی لانچ & Pitch به Rubio/Investors

- Viral hook: "هر ثانیه X دلار از جیب ایرانی‌ها هدر می‌ره – ببین چقدر تا حالا رفته + اگر رژیم بره GDP چقدر می‌شه"
- اول X (persian + english threads) → HN → reddit r/iran + diaspora
- Pitch angle: "Transparency tool for regime cost + huge post-regime economic upside (EU gains too per wiiw)"
- Monetization future: optional donations / premium scenarios / data API

## ۶. ریسک‌ها

- Data attacks → هر عدد منبع‌دار + methodology note
- Political → factual data only
