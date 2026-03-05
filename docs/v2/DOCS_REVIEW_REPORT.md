# Iran Economic Simulator Documentation Review Report

Date: 2026-03-04
Reviewer: Codex (documentation and technical architecture review)

## 1) Scope Reviewed

The following project branches/artifacts were reviewed:

- `docs/claude-iran-freedom-project/*`
- `docs/chatgpt-iran-potential-simulator/*`
- `docs/chatgpt-iran-potential-simulator-v0.2/*`
- `docs/chatgpt-ips-share-page/*`
- `docs/grok-iran-regime-economic-cost-tracker iran-waste-ticker-2026/*`
- `docs/gemini-Iran_Cost_Project_Blueprint/*`
- `docs/gemini-IOC_Full_Project_Arsenal/*`
- `docs/gemini-Iran_Economic_Simulator_Final_Package/*`
- Supporting prototypes/drafts:
  - `docs/cluade-iran-azadi-ticker.html`
  - `docs/gemini-ideological_drain.json`
  - `docs/chatgpt-iran_gdp_growth_scenario.txt`
  - `docs/iran-cost-tiker-com.txt`

## 2) Executive Assessment

Overall state: **Strong strategic vision, weak canonicalization, medium technical readiness**.

What is strong:
- Clear mission around transparency and public awareness.
- Good repeated emphasis on methodology, source traceability, and uncertainty.
- Existing runnable model prototypes (simulation, Monte Carlo, sensitivity).
- Early examples of data validation and scheduled live snapshot workflow.

What blocks credibility at launch:
- Multiple competing "master" narratives and architecture choices.
- Placeholder/draft values are mixed with production-like messaging.
- Inconsistent data confidence schemas across branches.
- Several source IDs are unresolved or too generic for external audit.
- Some UI prototypes simulate live values with random/fake logic.

## 3) Findings (Ordered by Severity)

### Critical Findings

1. **No canonical source-of-truth document; project is fragmented across parallel branches.**
- Evidence:
  - `docs/claude-iran-freedom-project/docs/PROJECT_PLAN.md`
  - `docs/chatgpt-iran-potential-simulator/README.md`
  - `docs/grok-iran-regime-economic-cost-tracker iran-waste-ticker-2026/PROJECT-PLAN.md`
  - `docs/gemini-Iran_Cost_Project_Blueprint/blueprint.md`
- Impact:
  - Teams can implement incompatible systems and conflicting claims.

2. **Placeholder/demo assumptions are still present in model and share artifacts used for presentation.**
- Evidence:
  - `docs/chatgpt-iran-potential-simulator-v0.2/data/parameters/core.parameters.json` (seed placeholders)
  - `docs/chatgpt-ips-share-page/data/*.json` (placeholder demo notes)
  - `docs/chatgpt-iran-potential-simulator-v0.2/app/README.md` (UI placeholder)
- Impact:
  - High risk of publishing non-defensible numbers as factual outputs.

3. **Conflicting confidence taxonomies between branches.**
- Evidence:
  - `docs/claude-iran-freedom-project/docs/METHODOLOGY.md` uses: `high|medium|estimate|speculative`
  - `docs/chatgpt-iran-potential-simulator-v0.2/data/schemas/parameter.schema.json` uses: `low|medium|high`
- Impact:
  - Hard to unify scoring and audit logic across model + data layers.

4. **Source traceability is incomplete for multiple published-style metrics and events.**
- Evidence:
  - `docs/claude-iran-freedom-project/data/events/timeline.json` references generic source IDs like `various_news`.
  - `docs/claude-iran-freedom-project/data/metrics/*` uses `own_calculation`, `various_estimates`, `multiple_think_tanks` without strict citation granularity.
- Impact:
  - Public and journalistic trust can collapse under basic challenge.

5. **At least one public-facing ticker prototype uses fake/randomized updates instead of data-driven updates.**
- Evidence:
  - `docs/cluade-iran-azadi-ticker.html` (random FX fluctuation and synthetic increments)
- Impact:
  - Severe credibility and reputation risk if reused in launch materials.

### High Findings

6. **Architecture drift: no-DB Git-only vs hybrid DB/Redis/API vs static ticker coexist without decision record.**
- Evidence:
  - `docs/gemini-IOC_Full_Project_Arsenal/TECHNICAL_ARCHITECTURE.md`
  - `docs/claude-iran-freedom-project/docs/PROJECT_PLAN.md`
  - `docs/chatgpt-iran-potential-simulator/README.md`
- Impact:
  - Delayed implementation and incompatible infra assumptions.

7. **Scope drift between "cost tracker" and "future potential simulator" without explicit product boundary.**
- Evidence:
  - Cost narrative: `docs/claude-iran-freedom-project/*`, `docs/grok-.../*`
  - Scenario narrative: `docs/chatgpt-iran-potential-simulator*/*`
- Impact:
  - Users may confuse measured historical cost with modelled future scenarios.

8. **Repository and URL placeholders remain in key docs.**
- Evidence:
  - `YOUR_ORG` placeholders in README and setup docs.
- Impact:
  - Signals unfinished governance and weakens external confidence.

9. **Validation and CI currently focus on limited checks; no schema-enforced end-to-end pipeline for all branches.**
- Evidence:
  - `docs/claude-iran-freedom-project/scripts/validate.js` only checks selected files and basic consistency.
  - No unified CI for all datasets and models.
- Impact:
  - Silent data regressions likely.

10. **Inconsistent maturity labels and release status across documents.**
- Evidence:
  - "Early stage", "draft", "placeholder", and near-production pitch language mixed.
- Impact:
  - Confuses contributors and potential partners/funders.

### Medium Findings

11. **Bilingual strategy exists but is not operationally standardized across all repos.**
- Impact:
  - Potential translation drift and inconsistent terminology.

12. **Several key metrics are presented without full uncertainty propagation.**
- Impact:
  - Gives false precision in policy-sensitive claims.

13. **Operational readiness gaps (incident response, data rollback policy, abuse handling).**
- Impact:
  - Hard to maintain trust under controversy or coordinated attacks.

## 4) What Is Reusable Immediately

- Data structure and confidence framing from `claude-iran-freedom-project`.
- Modular simulation + MC + OAT sensitivity from `chatgpt-iran-potential-simulator-v0.2`.
- Lean share-page concept from `chatgpt-ips-share-page`.
- Public-first Git data philosophy from Gemini/Grok branches.

## 5) Mandatory Fixes Before Public Launch

1. Create one canonical master doc and lock architecture decision records (ADR).
2. Separate "measured historical data" from "modelled scenario outputs" in product and docs.
3. Unify confidence schema and source evidence contract across all data/model artifacts.
4. Replace all placeholder, random, and synthetic live logic in public UI.
5. Enforce end-to-end CI validation for:
   - schema validity
   - source ID integrity
   - reproducibility of model outputs
   - changelog/version consistency
6. Remove all org/repo placeholders and add real governance contacts.

## 6) Recommended Canonical Documentation Structure

- `codex/PROJECT_MASTER_DOCUMENT.md` (single source of truth)
- `codex/ARCHITECTURE.md`
- `codex/METHODOLOGY.md`
- `codex/DATA_GOVERNANCE.md`
- `codex/SOURCE_POLICY.md`
- `codex/ROADMAP.md`
- `codex/CHANGELOG.md`

## 7) Suggested Maturity Gate

Only claim "public launch-ready" when all are true:

- 100% metrics have traceable source IDs mapped to bibliography entries.
- 100% scenario parameters have method note and uncertainty range.
- MC + sensitivity outputs are reproducible with fixed seed and version stamps.
- Public UI has no placeholder/fake data paths.
- Disclaimers and non-violence framing are consistent on every public page.
- Release tag exists with frozen data/model versions.

---

This report is intentionally strict because your stated goal is to be advanced, presentable, awareness-driving, and effective under public scrutiny.
