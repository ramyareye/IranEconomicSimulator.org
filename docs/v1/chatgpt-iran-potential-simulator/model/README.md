# Model runner (v0.1)

## Requirements
- Node.js 20+
- TypeScript runner (pick one):
  - `tsx` (recommended), or
  - `ts-node`, or
  - compile with `tsc`

## Quick run (using tsx)
```bash
npm i -D tsx typescript
npx tsx model/simulate.ts data/scenarios/base.json out/base.results.json
npx tsx model/simulate.ts data/scenarios/optimistic.json out/optimistic.results.json
```

## What it outputs
A JSON with yearly rows:
- GDP (USD)
- population
- GDP per capita
- gov revenue (net/gross) + leakage
