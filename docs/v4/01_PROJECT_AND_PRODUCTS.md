# Project and Products (Complete)

This document defines the full “what are we building?” story in a way that stays credible under public scrutiny.

## 1) Mission (what success looks like)

Build a transparent, defensible, and high-impact public platform that:

1. Documents historical economic and social outcomes affecting the Iranian people.
2. Quantifies (with uncertainty) the costs and trade-offs of policy choices and institutional structures.
3. Simulates conditional future trajectories under explicit assumptions.
4. Makes it easy for the public, journalists, and researchers to **verify** numbers, **challenge** them, and **see the methodology**.

Non-goal: deterministic prophecy. This is not a “we know the future” machine.

## 2) Two products under one brand (mandatory separation)

To avoid credibility collapse, the project is split into two explicit products:

### 2.1 Evidence Atlas (Historical reality)

**What it is:** historical metrics and event-linked impacts.

**Allowed claim types:**
- `observed` (directly measured from primary datasets)
- `derived` (calculated from observed inputs with a formula)
- `estimated` (inferred from proxies; must include uncertainty)

**Outputs users expect:**
- time series (with units + “as of” dates)
- method notes
- sources
- confidence
- uncertainty (when not purely observed)

### 2.2 Scenario Lab (Future paths)

**What it is:** conditional simulations: *if assumptions A, B, C are true, then outputs could look like X (with uncertainty)*.

**Allowed claim types:**
- `scenario` only

**Mandatory UI labeling:**
- every chart and number must be explicitly labeled “Scenario output (conditional), not a forecast.”

**Outputs users expect:**
- scenario presets (conservative/base/optimistic)
- editable assumptions
- uncertainty bands (p10/p50/p90 or similar)
- sensitivity analysis (“top drivers”)

## 3) Always-on disclaimer (recommended wording)

Place this in the footer and in every share view.

### English

- This project documents economic and social outcomes affecting the Iranian people.
- It does **not** advocate foreign military intervention.
- Scenario outputs are **conditional simulations**, not deterministic forecasts.
- Every number links to sources and a method note; disputed values can be challenged.

### Persian (FA)

- این پروژه پیامدهای اقتصادی و اجتماعیِ مرتبط با مردم ایران را مستند می‌کند.
- این پروژه از **هیچ‌گونه مداخلهٔ نظامی خارجی** حمایت نمی‌کند.
- خروجی‌های سناریو **مشروط به فرض‌ها** هستند و پیش‌بینی قطعی نیستند.
- هر عدد به منابع و توضیح روش محاسبه لینک می‌شود؛ اعداد قابل اعتراض و اصلاح هستند.

## 4) Who this is for (and what they need)

Primary audiences:
- Iranian public and diaspora (clarity, shareability, bilingual parity)
- Journalists and analysts (traceability, defensibility, reproducible releases)
- Policy/civic audiences (neutral language, uncertainty, limitations)
- Contributors (clean contracts, validation, review workflow)

What each audience must be able to do:
- **click through** from any number to sources + method
- understand the difference between evidence and scenarios
- see uncertainty by default (ranges, not false precision)

## 5) “Trust primitives” (features that prevent self-destruction)

These features are not optional; they’re what keep the project alive:

1. **Claim type labels:** `observed | derived | estimated | scenario`
2. **Confidence labels:** `high | medium | estimate | speculative`
3. **Source registry:** every `source_id` must resolve to a full citation record
4. **Releases:** public pages/API read from versioned release bundles, not ad-hoc drafts
5. **Correction workflow:** “challenge this number” is a first-class path

## 6) What “complete” means for v1

For a v1 that can survive public scrutiny:

- Evidence Atlas:
  - at least a small, audited set (e.g., 10–30 metrics + 10–30 events)
  - each with sources + method notes + labels
- Scenario Lab:
  - at least one scenario family with:
    - parameter set
    - point output
    - Monte Carlo bands
    - sensitivity ranking
    - reproducible seed and versions
- Release pipeline:
  - schemas + referential integrity validation
  - “no placeholders” gate for production release artifacts

## 7) Where the canonical truth lives

- Canonical rules and decisions: `codex/`
- Prototype archive: `docs/` (not canonical)
- Extra-detailed playbooks + samples: `chatgpt-complete/` (this folder)

