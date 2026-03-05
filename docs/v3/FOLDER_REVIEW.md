# Folder Review (docs/ then codex/)

This is a pragmatic review focused on **credibility**, **maintainability**, and **shipping**.

## `docs/` review (archive material)

What it is:
- A valuable archive of prototypes and drafts from multiple models (ChatGPT/Claude/Gemini/Grok), mixing runnable code, plans, and one-off notes.

What’s strong:
- Multiple angles covered: cost tracking, scenario simulation, share pages, launch plans.
- Real implementation seeds exist (schemas, model scripts, Next.js UI skeletons).

What’s risky:
- Mixed maturity: demo placeholders and “production-sounding” language coexist.
- Inconsistent confidence/claim labeling across artifacts.
- Some drafts use strong claims without a durable, auditable source contract.
- Some prototypes explicitly describe “ticker” mechanics that could drift into fake/live behavior if reused naively.

My recommendation:
- Keep `docs/` as **archive/reference only**.
- Only reuse content by migrating it into the canonical system (contracts + validation + release workflow).
- Avoid publishing anything directly from `docs/` without rewriting to canonical claim/confidence language.

## `codex/` review (canonical)

What it is:
- A coherent canonical set: mission, product split, data governance, source policy, architecture, roadmap/backlog.

What’s strong:
- Clear separation: historical evidence vs scenario simulation.
- Explicit publication rules (claim types, confidence labels, prohibited patterns).
- Architecture biased toward transparency (release bundles; audited artifacts).

What to add next (opinionated):
- A lightweight ADR log if/when architecture choices change (even just “ADR-002, ADR-003…” as separate files).
- A public-facing “How to challenge a number” page spec (ties correction workflow to UI/UX).

## Priority next step (if you want a single action)

Pick one narrow “vertical slice” to canonicalize end-to-end:
- **Evidence Atlas MVP**: 10 metrics + 10 events + complete source registry + release bundle + a minimal UI that shows “show your work”.

