# IPS Share Page (Twitter / Hacker News)

Minimal Next.js UI that reads IPS outputs and renders:
- Shareable 3 KPIs (Year 10) with p10–p90 range
- Sparkline chart (median path)
- Deep dive page with tornado chart + “Top 5 drivers” summary
- Methodology page

## Use
```bash
npm i
npm run dev
```
Then open:
- http://localhost:3000/?scenario=base
- http://localhost:3000/deep-dive?scenario=base

## Connect to your IPS repo outputs
Copy these from the main repo into `data/`:
- out/base.montecarlo.json -> data/base.montecarlo.json
- out/optimistic.montecarlo.json -> data/optimistic.montecarlo.json
- out/base.sensitivity.json -> data/base.sensitivity.json
- out/optimistic.sensitivity.json -> data/optimistic.sensitivity.json
