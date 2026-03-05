/**
 * IPS v0.2 Monte Carlo
 * - Samples parameters within [min,max] using triangular distribution (min, mode=value, max)
 * - Runs N simulations and aggregates percentiles per year for key outputs.
 *
 * Output:
 * {
 *  meta, scenario, kind:"montecarlo",
 *  results: { years:[...], gdp_usd:{p10:[],p50:[],p90:[]}, gdp_pc_usd:{...}, gov_rev_usd:{...} }
 * }
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

function mulberry32(seed:number) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Triangular(min, mode, max)
function tri(rng:()=>number, a:number, c:number, b:number): number {
  if (a === b) return a;
  const u = rng();
  const fc = (c - a) / (b - a);
  if (u < fc) return a + Math.sqrt(u * (b - a) * (c - a));
  return b - Math.sqrt((1 - u) * (b - a) * (b - c));
}

function percentile(sorted:number[], p:number): number {
  if (sorted.length === 0) return NaN;
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  const w = idx - lo;
  return sorted[lo] * (1 - w) + sorted[hi] * w;
}

function main() {
  const repoRoot = process.cwd();
  const scenarioPath = process.argv[2] ? path.join(repoRoot, process.argv[2]) : path.join(repoRoot, "data/scenarios/base.json");
  const outPath = process.argv[3] ? path.join(repoRoot, process.argv[3]) : path.join(repoRoot, "out/base.montecarlo.json");
  const samples = process.argv[4] ? Number(process.argv[4]) : 5000;
  const years = process.argv[5] ? Number(process.argv[5]) : 15;
  const seed = process.argv[6] ? Number(process.argv[6]) : 1337;

  const core = readJson<ParamsFile>(path.join(repoRoot, "data/parameters/core.parameters.json"));
  const scenario = readJson<ScenarioFile>(scenarioPath);
  const base = applyScenario(core, scenario);

  const rng = mulberry32(seed);

  const yearlyGDP: number[][] = Array.from({length: years+1}, () => []);
  const yearlyGDPpc: number[][] = Array.from({length: years+1}, () => []);
  const yearlyRev: number[][] = Array.from({length: years+1}, () => []);

  const paramKeys = Object.keys(base.parameters);

  for (let s = 0; s < samples; s++) {
    const sampled: ParamsFile = JSON.parse(JSON.stringify(base));
    for (const k of paramKeys) {
      const p = sampled.parameters[k];
      // sample only if range exists and differs
      if (typeof p.min === "number" && typeof p.max === "number" && p.min !== p.max) {
        const a = p.min, b = p.max, c = p.value;
        sampled.parameters[k].value = tri(rng, a, c, b);
      }
    }
    const rows = simulate(sampled, years);
    for (let i = 0; i < rows.length; i++) {
      yearlyGDP[i].push(rows[i].gdp_usd);
      yearlyGDPpc[i].push(rows[i].gdp_per_capita_usd);
      yearlyRev[i].push(rows[i].government_revenue_usd);
    }
  }

  const yearsArr = Array.from({length: years+1}, (_,i)=> base.meta.baseline_year + i);

  function agg(mat:number[][]) {
    return {
      p10: mat.map(a => { const s = [...a].sort((x,y)=>x-y); return Math.round(percentile(s,0.10)); }),
      p50: mat.map(a => { const s = [...a].sort((x,y)=>x-y); return Math.round(percentile(s,0.50)); }),
      p90: mat.map(a => { const s = [...a].sort((x,y)=>x-y); return Math.round(percentile(s,0.90)); }),
    };
  }

  const bundle = {
    meta: {
      generated_at: new Date().toISOString(),
      model_version: "0.2.0",
      data_version: core.meta.version,
      baseline_year: core.meta.baseline_year,
      notes: `triangular sampling; samples=${samples}; seed=${seed}; years=${years}`
    },
    scenario: scenario.id,
    kind: "montecarlo",
    results: {
      years: yearsArr,
      gdp_usd: agg(yearlyGDP),
      gdp_per_capita_usd: agg(yearlyGDPpc),
      government_revenue_usd: agg(yearlyRev),
    }
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(bundle, null, 2));
  console.log(`Wrote Monte Carlo bundle -> ${outPath}`);
}

main();
