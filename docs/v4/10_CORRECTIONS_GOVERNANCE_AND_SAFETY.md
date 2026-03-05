# Corrections, Governance, and Safety (Complete)

This is how the project stays trustworthy under attack, controversy, and honest mistakes.

Canonical reference:
- `codex/DATA_GOVERNANCE.md` (correction workflow + SLAs)
- `codex/PROJECT_MASTER_DOCUMENT.md` (ethics/safety constraints)

## 1) Correction workflow (data challenges)

Every metric/event should have a “Challenge this” link that routes to an issue template.

Recommended SLA (from canonical docs):
- triage within 48 hours
- decision within 7 days
- emergency factual correction within 24 hours

Possible outcomes:
- accepted → patch release
- partially accepted → widen range and/or lower confidence
- rejected → documented reason with citations

## 2) What a good challenge report contains

- which metric/event is disputed (ID)
- what exact value is disputed (and where it appears)
- proposed corrected value(s)
- source URLs and quotes (short)
- reasoning about definitions (units, date coverage, PPP vs nominal)

## 3) Issue template (copy/paste)

Title:
- `Data challenge: <metric_id> (<short summary>)`

Body:

- **Metric/Event ID:** `...`
- **Current value shown:** `...` (include date + unit)
- **Why it might be wrong:** `...`
- **Proposed correction:** `...`
- **Sources:** `...` (URLs)
- **Definition notes:** PPP vs nominal, calendar vs fiscal year, etc.
- **Requested outcome:** accept / adjust range / lower confidence / add footnote

## 4) Moderation and anti-poisoning (minimum)

Threats:
- source spamming
- cherry-picked or manipulated reporting
- coordinated “correction” attacks to degrade credibility

Controls:
- require sources registry entries with tier + reliability
- require two reviewers for high-impact changes
- log every accepted correction with changelog entry
- rate limit public submission endpoints

## 5) Narrative safety rules (hard constraints)

- No individual targeting or doxxing
- No incitement or advocacy of violence
- Keep language factual; avoid propaganda tone

## 6) “No fake live behavior” enforcement

If a UI shows “live updates”:
- it must be driven by an auditable model or update job
- it must disclose how the live update is computed

Explicitly forbidden:
- random increments presented as real

## 7) Governance docs you’ll eventually want

Not required for day 1, but recommended:
- Maintainers list and review roles
- Release manager responsibilities
- “How we define tiers and reliability” playbook

