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


## v0.2 Monte Carlo
```bash
npm i
npm run mc:base
npm run mc:opt
```

## v0.2 Sensitivity (tornado-ready)
```bash
npm run sens:base
npm run sens:opt
```
