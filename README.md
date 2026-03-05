# Iran Economic Simulator

Standalone Vite + React prototype inside `IranEconomicSimulator.org`.

## What this prototype is

This build is intentionally split between two inputs:

- content and labeling mapped from the repo docs
- page structure and hierarchy modeled after the reference screenshots you sent

The current page pulls its language and section logic from:

- `codex/PROJECT_MASTER_DOCUMENT.md`
- `chatgpt-complete/08_UI_SPEC_AND_COPY.md`
- `chatgpt/PUBLIC_SITE_COPY.md`

## What it currently shows

- release banner + global disclaimer
- two-product split: `Evidence Atlas` and `Scenario Lab`
- docs-based proof cards with claim type, confidence, source IDs, and method notes
- large screenshot-style scenario card, explicitly marked as a placeholder demo output
- claim taxonomy, trust anchors, methodology cards, timeline, source registry preview
- a visible missing-features section

## Important

The large running number is not presented as real validated data. It is a placeholder formula used to preserve the reference layout until signed Scenario Lab release artifacts exist.

## Run locally

```bash
npm install
npm run dev
```
