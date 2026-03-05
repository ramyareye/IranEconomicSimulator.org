# Iran Economic Simulator - Master Project Document

Version: 1.0 (Canonical Draft)
Date: 2026-03-04
Status: Strategic + technical source of truth

## 1) Project Mission

Build a transparent, defensible, and high-impact public platform that:

1. Quantifies the historical economic and social cost imposed on Iran.
2. Simulates plausible future economic trajectories under alternative governance/trade scenarios.
3. Increases public awareness with evidence, not propaganda.
4. Supports journalists, researchers, diaspora communities, and policy audiences with auditable data.

## 2) Product Strategy (Two-Layer Model)

To avoid confusion and improve credibility, the project is split into two explicit products under one brand.

### 2.1 Evidence Atlas (Historical Reality)

What it does:
- Tracks documented historical metrics and event-linked impacts.
- Shows direct costs, structural costs, and institutional effects.
- Every metric is source-linked and confidence-rated.

Output type:
- "Observed/estimated historical data"

### 2.2 Scenario Lab (Future Paths)

What it does:
- Models counterfactual trajectories (GDP, GDP per capita, revenue, investment proxies).
- Supports scenario presets and user-editable assumptions.
- Publishes uncertainty bands (p10/p50/p90) and sensitivity rankings.

Output type:
- "Model-based scenario output" (not factual prediction)

## 3) Non-Negotiable Principles

1. **Methodological transparency first.**
2. **No single-point certainty where uncertainty is material.**
3. **No hidden assumptions.**
4. **No fabricated "live" behavior in public UI.**
5. **No military intervention advocacy; awareness and accountability only.**
6. **Bilingual clarity (FA/EN) with identical meaning in both languages.**

## 4) Audience and Impact Goals

Primary audiences:
- Iranian public and diaspora
- Journalists and analysts
- Policy and civic audiences
- Open-source contributors

Awareness and effectiveness KPIs (first 6 months):
- 100k+ unique users
- 40%+ sessions opening methodology/source details
- 25+ high-quality external citations (media, analysts, researchers)
- <3% unresolved source-challenge issues older than 14 days
- 0 public incidents of unsourced headline figures

## 5) Scope and Non-Goals

In scope:
- Historical cost tracking with source-backed ranges
- Scenario simulation with uncertainty
- Shareable visual outputs and API
- Transparent correction workflow via Issues/PRs

Out of scope:
- Definitive deterministic forecasting
- Personal targeting, doxxing, or incitement content
- Unsourced virality tactics

## 6) Canonical Claim Taxonomy

Every published number must be one of the following:

1. `observed`: measured from official or primary datasets.
2. `derived`: calculated from observed data with explicit formula.
3. `estimated`: modelled from indirect proxies with stated uncertainty.
4. `scenario`: future/counterfactual simulation output.

Every claim card must show:
- claim type
- source IDs
- confidence level
- time coverage
- method note
- uncertainty interval (if non-observed)

## 7) Unified Confidence Framework

Use one confidence schema across all repos:

- `high`: direct official/primary data, low interpretation burden
- `medium`: robust secondary analysis with moderate assumptions
- `estimate`: calculation or synthesis with meaningful assumptions
- `speculative`: high uncertainty, exploratory only

Action:
- Migrate any `low|medium|high` model schema to this canonical system, or map explicitly via adapter.

## 8) Data Governance and Source Policy

## 8.1 Source Evidence Tiers

- Tier A: IMF, World Bank, UN agencies, ILO, WHO, SIPRI, EIA, official state or multilateral datasets
- Tier B: peer-reviewed research, reproducible academic models
- Tier C: think tanks and investigative reporting
- Tier D: media-only or single-source claims (never headline without caution)

## 8.2 Source Contract (Required Fields)

Each source entry must include:
- `id`
- `title`
- `url`
- `publisher`
- `published_at`
- `retrieved_at`
- `tier`
- `bias_note` (if relevant)
- `license_or_reuse_note` (if relevant)

## 8.3 Metric Contract (Required Fields)

Each metric must include:
- `id`, `title.fa`, `title.en`
- `category`, `subcategory`
- `value`, `unit`, `as_of`
- `claim_type`
- `confidence`
- `sources[]`
- `method_note`
- `uncertainty` (for non-observed)
- `version`

## 8.4 Event Contract

Each timeline event requires:
- `date`, `title`, `description`
- `impact_type` (economic/social/human rights/geopolitical)
- `impact_estimate` with range or null
- `sources[]` (specific; no generic IDs like `various_news`)

## 9) Methodology Architecture

## 9.1 Historical Cost Modules (Evidence Atlas)

Module groups:
1. Macroeconomic divergence
2. Oil/sanctions and trade friction
3. Human capital and migration
4. Military/proxy and institutional extraction
5. Civil liberties and social development indicators

Rules:
- Separate direct cost vs opportunity cost in UI and data schema.
- Counterfactual comparisons require explicit comparator logic (why Turkey, Korea, etc.).
- Any composite number must expose all components and formula.

## 9.2 Scenario Model Modules (Scenario Lab)

Baseline model (already prototyped):
- Growth decomposition (`g_base + g_trade + g_governance + ...`)
- Fiscal identity with leakage
- Monte Carlo uncertainty
- OAT sensitivity

Required upgrades:
1. Replace static annual oil revenue assumption with a constrained oil submodel:
   - volume capacity
   - export sanctions factor
   - price path
   - government take
2. Add fiscal dynamics:
   - tax buoyancy
   - expenditure envelope
   - primary balance track
3. Add consistency constraints:
   - bounds on tax-to-GDP trajectory
   - plausibility against peer-country historical windows
4. Add structural break support (reform shock year, sanctions-lift year).

## 9.3 Validation Layers

- Schema validation (JSON Schema)
- Referential integrity (source IDs, related metric IDs)
- Statistical sanity checks (ranges, impossible jumps)
- Reproducibility checks (fixed seed outputs)
- Regression checks (release vs previous release deltas)

## 10) Technical Architecture (Advanced, Production-Oriented)

## 10.1 Repository Topology

Recommended:

- `iran-economic-data` (public data + methodology + source registry)
- `iran-economic-platform` (worker app + model packages)

Inside `iran-economic-platform`:
- `apps/worker` (Hono routes for both API and web pages)
- `packages/model` (simulation, MC, sensitivity)
- `packages/contracts` (schemas, zod/json-schema types)
- `packages/etl` (ingestion + normalization jobs)
- `packages/ui` (shared components)

## 10.2 Data Flow

`Ingest -> Normalize -> Validate -> Compute -> Snapshot -> Publish -> Render`

Pipeline details:
1. Pull source feeds and static inputs.
2. Normalize into canonical schema.
3. Run validation suite.
4. Generate model outputs (point/MC/sensitivity).
5. Produce signed release snapshot.
6. Publish snapshot + changelog.
7. Web/API consume only signed release artifacts.

## 10.3 Runtime and Caching

- API responses cached with short TTL for live metrics.
- Daily immutable snapshots stored by date.
- "Latest" alias points to newest valid snapshot.
- Frontend renders from snapshot + local UI transforms only.

## 10.4 Security and Integrity

- Sign release artifacts (hash + signature metadata).
- Require CI pass before publish tags.
- Enforce branch protection for data and method docs.
- Add abuse-resistant rate limits on public API.
- Publish threat model for data poisoning/disinformation attempts.

## 10.5 Observability

Minimum stack:
- structured logs
- pipeline run dashboard
- failed-source alerts
- schema drift alerts
- freshness SLO dashboard

Core SLOs:
- Data freshness for live endpoints: <6h lag
- Snapshot generation success: >=99%
- Broken source links older than 48h: 0 in production

## 11) Product and UX Requirements (Presentable + Effective)

## 11.1 Information Architecture

Top-level navigation:
- Home (headline evidence + clear disclaimers)
- Evidence Atlas (historical)
- Scenario Lab (future simulations)
- Methodology
- Sources
- Timeline
- API

## 11.2 Critical UX Rules

1. Every headline metric has a "How this is calculated" panel.
2. Scenario outputs are visually distinct from observed data.
3. Range visualization is default (not hidden advanced mode).
4. Every share card includes model/date/version watermark.
5. Bilingual parity checks must pass before release.

## 11.3 Awareness Mechanics

- Social cards generated per metric and scenario.
- One-click "show your work" deep link including assumptions.
- Lightweight embeddable widgets for external publishers.

## 12) Ethics, Safety, and Narrative Control

Mandatory global disclaimer:
- This project documents economic and social impacts on Iranian people.
- It does not advocate foreign military intervention.
- Scenario outputs are conditional simulations, not deterministic forecasts.

Safety controls:
- Ban individual-targeting content in user-submitted text.
- Moderation queue for community-submitted sources.
- Red-team review before major narrative claims.

## 13) Documentation Canon

Adopt this canonical docs set:

- `codex/PROJECT_MASTER_DOCUMENT.md` (this file)
- `codex/IMPLEMENTATION_OPTIONS.md`
- `codex/ARCHITECTURE.md`
- `codex/METHODOLOGY.md`
- `codex/DATA_GOVERNANCE.md`
- `codex/SOURCE_POLICY.md`
- `codex/ROADMAP.md`
- `codex/EXECUTION_BACKLOG.md`
- `codex/CHANGELOG.md`

Rules:
- No new major planning docs outside this structure.
- Any architecture change needs an ADR.

## 14) Roadmap (12-Week Execution)

## Phase 0 (Week 1-2): Canonicalization and Trust Foundation

Deliverables:
- lock canonical schema contracts
- remove placeholders from public paths
- unify confidence system
- source registry v1 with complete metadata
- CI: schema + referential + reproducibility checks

## Phase 1 (Week 3-5): Evidence Atlas MVP

Deliverables:
- production-ready historical metric pages
- source drill-down and methodology UI
- timeline with audited event citations
- release snapshot v1.0

## Phase 2 (Week 6-8): Scenario Lab v1

Deliverables:
- scenario presets with editable assumptions
- MC bands and sensitivity charts
- validator for scenario plausibility
- API endpoints for model outputs

## Phase 3 (Week 9-10): Launch Readiness and Distribution

Deliverables:
- share cards + embed widgets
- performance/accessibility hardening
- bilingual QA and copy consistency pass
- media/research launch kit

## Phase 4 (Week 11-12): Resilience and Scale

Deliverables:
- anti-poisoning controls
- monitoring and incident runbooks
- contributor governance and review SLA
- post-launch analytics dashboard

## 15) Prioritized Technical Suggestions

## P0 (Immediate - must do before public launch)

1. Replace placeholder/demo data in share pages and model seeds.
2. Remove/retire fake ticker logic from any launch-facing UI.
3. Define canonical schema package and migrate all datasets.
4. Enforce strict source ID integrity (no generic IDs).
5. Implement deterministic model run metadata (seed, model version, data version).
6. Add CI gates for schema, reproducibility, and broken references.
7. Resolve architecture decision (Git-only vs hybrid) with documented ADR.

## P1 (High value - next)

1. Add oil and sanctions submodel with explicit constraints.
2. Add parameter provenance UI in Scenario Lab (hover -> source/method/range).
3. Build release pipeline for signed snapshot artifacts.
4. Add benchmark validator against peer-country trajectories.
5. Add automated changelog generation from data/model diffs.
6. Build a method challenge workflow (`/issues` template with required evidence fields).

## P2 (Advanced polish and long-term trust)

1. Add Bayesian update pathway for uncertain parameters.
2. Add multilingual glossary to lock term consistency.
3. Add policy-report export (PDF) generated from signed snapshots.
4. Add anomaly detection for live feeds (outlier/faulty source handling).
5. Add contributor reputation scoring for source submissions.

## 16) Definition of Done (v1 Public)

Project is launch-ready only if all are true:

- Canonical docs and schemas are merged and enforced.
- 100% public metrics have source IDs and method notes.
- Scenario outputs show uncertainty and sensitivity by default.
- No placeholder/fake values in public experience.
- Release artifacts are reproducible and versioned.
- Bilingual content parity and disclaimer consistency verified.
- Monitoring, incident response, and correction workflow active.

## 17) Immediate 14-Day Action Plan

Day 1-3:
- freeze canonical docs and schema decisions
- create migration checklist by folder

Day 4-7:
- migrate datasets and source registry
- implement CI validation matrix

Day 8-10:
- clean public UI and wire to canonical outputs
- add methodology/source trace components

Day 11-14:
- run red-team documentation audit
- publish `v1.0-rc1` snapshot and launch checklist

---

This document is designed to convert the current multi-branch draft state into a defensible, advanced, and launch-capable platform with strong public credibility.
