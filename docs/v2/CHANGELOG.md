# Changelog

## 1.0.4-cloudflare-workers-assets-config (2026-03-06)

Added:
- `wrangler.jsonc` at the repo root for Cloudflare Workers Assets deployment from `./dist`.

Updated:
- `package.json` with `cf:whoami` and `deploy` scripts for repo-root Cloudflare deployment.
- `.gitignore` to ignore `dist/` and `.wrangler/` artifacts.

Process:
- Audited the repo root after Wrangler reported a missing entry-point or assets directory.
- Confirmed the current app is a Vite static build at the repo root and that `dist/` is the correct deploy target.
- Added Workers Assets config with `html_handling: "auto-trailing-slash"` and `not_found_handling: "single-page-application"` so SPA routes fall back to `index.html`.
- Added a root deployment script so the normal flow is `bun run deploy` instead of manually building and then calling Wrangler without config.

Verified:
- `npm run build`

## 1.0.3-full-page-language-modes (2026-03-06)

Updated:
- `iran-economic-simulator-vite/src/App.jsx` to support two full page modes: English and Persian.
- `iran-economic-simulator-vite/src/styles.css` to reduce oversized hero typography, tighten spacing, add a real language switch, and support RTL Persian layout.

Process:
- Replaced the mixed bilingual hero with a true page-level language toggle instead of showing English and Persian copy at the same time.
- Added complete English and Persian UI copy for navigation, hero, buttons, section headings, section descriptions, metric-table headings, and footer CTA text.
- Localized metric labels and notes for both Level 1 and Level 2 sections so the Persian view is a full page variant rather than a partially translated shell.
- Localized scenario titles, provisional ledger labels, corruption-case labels, data-gap cards, and source-pack labels for the Persian mode.
- Added locale-aware formatting and RTL layout behavior so Persian mode uses Persian typography and direction across the page.
- Reduced hero headline size and adjusted layout proportions so the first fold reads as a product page instead of a poster.
- Simplified the hero summary bullets in both languages to remove internal project jargon and make the page understandable to first-time users.

Verified:
- `npm run build`

## 1.0.2-json-git-db-snapshot (2026-03-06)

Added:
- `iran-economic-simulator-vite/src/data/dashboard.snapshot.json` as the git-backed app data bundle for this pass.

Updated:
- `iran-economic-simulator-vite/src/App.jsx` to read results, sources, calculations, and provisional repo rows from JSON instead of JS constants.
- `iran-economic-simulator-vite/src/styles.css` to support the JSON-driven metric and source tables.

Process:
- Audited the existing app and confirmed the page was hardcoding mixed-quality numbers inside `src/App.jsx`.
- Matched the app against the repo's Level 1 and Level 2 data inventory so the first official pass covered the documented priority fields.
- Fetched official World Bank API values for GDP, population, investment, trade, FDI, oil-rents, lagged tax/revenue series, business density, and WGI governance percentiles on 2026-03-06.
- Fetched primary-source EIA context for crude oil production, crude oil exports, and China export concentration on 2026-03-06.
- Fetched the OFAC Iran sanctions page on 2026-03-06 and recorded the sanctions-program status as active.
- Calculated and stored the derived numbers in JSON: 2024 GDP per capita, 2024 trade balance, cumulative 1979-2024 current-dollar GDP, `13T / 2024 GDP`, `13T / cumulative GDP`, direct ideological-budget USD, weighted annual drain USD, and base-model growth percent.
- Preserved the existing repo-only `13T` headline as an `estimated` claim and did not promote it to an official total.
- Preserved provisional repo corruption and drain rows, but explicitly separated them from official Level 1 and Level 2 outputs.
- Added source metadata, retrieval dates, formulas, and a step-by-step process log directly into the JSON bundle so git remains the database of record.

Verified:
- `npm run build`

## 1.0.1-worker-profile (2026-03-05)

Updated:
- `codex/IMPLEMENTATION_OPTIONS.md` to Hono Worker-focused options and storage decision matrix (`GitHub-only` vs `Hybrid` vs `DB-first`).
- `codex/ARCHITECTURE.md` to Hono Worker runtime profile and Cloudflare bindings model.
- `codex/ROADMAP.md` to worker-first delivery milestones.
- `codex/EXECUTION_BACKLOG.md` to worker-specific tasks and storage decision tasks.
- `codex/PROJECT_MASTER_DOCUMENT.md` repository topology aligned to worker profile.

## 1.0.0-canonical-docs (2026-03-05)

Added:
- `codex/PROJECT_MASTER_DOCUMENT.md`
- `codex/DOCS_REVIEW_REPORT.md`
- `codex/IMPLEMENTATION_OPTIONS.md`
- `codex/ARCHITECTURE.md`
- `codex/DATA_GOVERNANCE.md`
- `codex/SOURCE_POLICY.md`
- `codex/ROADMAP.md`
- `codex/EXECUTION_BACKLOG.md`
- `codex/METHODOLOGY.md`

Updated:
- `codex/PROJECT_MASTER_DOCUMENT.md` (canonical docs list linked to implementation options and backlog)
