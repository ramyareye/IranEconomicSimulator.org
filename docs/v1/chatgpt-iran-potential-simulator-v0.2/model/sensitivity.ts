/**
 * IPS v0.2 Sensitivity (tornado-ready)
 * Method: one-at-a-time (OAT).
 * - Compute baseline KPI (GDP_10y, Rev_10y) for scenario
 * - For each parameter k:
 *    - set to min -> KPI_min
 *    - set to max -> KPI_max
 *    - impact = max(|KPI_min - KPI_base|, |KPI_max - KPI_base|)
 * - Rank by impact
 *
 * Output includes per-param deltas for both KPIs.
 */
import fs from "node:fs";
import path from "node:path";
import { simulate } from "./simulate.ts";

type Param = { value:number; min:number; max:number; unit:string; confidence:"low"|"medium"|"high"; source_ids?:string[]; method_note?:string; last_updated:string };
type ParamsFile = { meta:{version:string; baseline_year:number; currency:string; notes?:string}; parameters: Record<string, Param> };
type ScenarioFile = { id:string; name:string; description:string; overrides: Record<string, number> };

function readJson<T>(p:string):T { return JSON.parse(fs.readFileSync(p,"utf-8")); }

function applyScenario(core: ParamsFile, scenario: ScenarioFile): ParamsFile {
  const clone: ParamsFile = JSON.parse(JSON.stringify(core));
  for (const [k,v] of Object.entries(scenario.overrides)) {
    if (!clone.parameters[k]) {
      clone.parameters[k] = { value:v, min:v, max:v, unit:"unitless", confidence:"low", last_updated:new Date().toISOString().slice(0,10) };
    } else {
      clone.parameters[k].value = v;
    }
  }
  return clone;
}

function kpis(rows:any[], yearOffset:number) {
  const idx = Math.min(yearOffset, rows.length-1);
  return {
    gdp: rows[idx].gdp_usd,
    rev: rows[idx].government_revenue_usd
  };
}

function main() {
  const repoRoot = process.cwd();
  const scenarioPath = process.argv[2] ? path.join(repoRoot, process.argv[2]) : path.join(repoRoot, "data/scenarios/base.json");
  const outPath = process.argv[3] ? path.join(repoRoot, process.argv[3]) : path.join(repoRoot, "out/base.sensitivity.json");
  const horizonYears = process.argv[4] ? Number(process.argv[4]) : 10;

  const core = readJson<ParamsFile>(path.join(repoRoot, "data/parameters/core.parameters.json"));
  const scenario = readJson<ScenarioFile>(scenarioPath);
  const base = applyScenario(core, scenario);

  const baseRows = simulate(base, horizonYears);
  const baseKpi = kpis(baseRows, horizonYears);

  const items: any[] = [];
  for (const [k, p] of Object.entries(base.parameters)) {
    if (typeof p.min !== "number" || typeof p.max !== "number") continue;
    if (p.min === p.max) continue;

    // min run
    const pMin: ParamsFile = JSON.parse(JSON.stringify(base));
    pMin.parameters[k].value = p.min;
    const minRows = simulate(pMin, horizonYears);
    const minKpi = kpis(minRows, horizonYears);

    // max run
    const pMax: ParamsFile = JSON.parse(JSON.stringify(base));
    pMax.parameters[k].value = p.max;
    const maxRows = simulate(pMax, horizonYears);
    const maxKpi = kpis(maxRows, horizonYears);

    const gdpDeltaMin = minKpi.gdp - baseKpi.gdp;
    const gdpDeltaMax = maxKpi.gdp - baseKpi.gdp;
    const revDeltaMin = minKpi.rev - baseKpi.rev;
    const revDeltaMax = maxKpi.rev - baseKpi.rev;

    const impact = Math.max(Math.abs(gdpDeltaMin), Math.abs(gdpDeltaMax), Math.abs(revDeltaMin), Math.abs(revDeltaMax));

    items.push({
      key: k,
      unit: p.unit,
      base: p.value,
      min: p.min,
      max: p.max,
      kpi_base: baseKpi,
      gdp_delta_min: Math.round(gdpDeltaMin),
      gdp_delta_max: Math.round(gdpDeltaMax),
      rev_delta_min: Math.round(revDeltaMin),
      rev_delta_max: Math.round(revDeltaMax),
      impact: Math.round(impact)
    });
  }

  items.sort((a,b)=> b.impact - a.impact);

  const bundle = {
    meta: {
      generated_at: new Date().toISOString(),
      model_version: "0.2.0",
      data_version: core.meta.version,
      baseline_year: core.meta.baseline_year,
      notes: `OAT sensitivity; horizonYears=${horizonYears}`
    },
    scenario: scenario.id,
    kind: "sensitivity",
    results: {
      horizon_years: horizonYears,
      baseline_kpis: baseKpi,
      ranked_parameters: items
    }
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(bundle, null, 2));
  console.log(`Wrote sensitivity bundle -> ${outPath}`);
}

main();
