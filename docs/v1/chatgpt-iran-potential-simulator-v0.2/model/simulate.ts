/**
 * IPS v0.1 simulator (TypeScript)
 * - Reads core parameters + scenario overrides
 * - Produces yearly GDP + GDP per capita + Gov revenue
 *
 * NOTE: This is intentionally simple. Replace modules with better ones as you add data.
 */

import fs from "node:fs";
import path from "node:path";

type ParamsFile = {
  meta: { version: string; baseline_year: number; currency: string; notes?: string };
  parameters: Record<string, { value: number; min: number; max: number; unit: string; confidence: "low"|"medium"|"high"; source_ids?: string[]; method_note?: string; last_updated: string }>;
};

type ScenarioFile = { id: string; name: string; description: string; overrides: Record<string, number> };

function readJson<T>(p: string): T {
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

function getValue(params: ParamsFile, key: string): number {
  const v = params.parameters[key];
  if (!v) throw new Error(`Missing parameter: ${key}`);
  return v.value;
}

function applyScenario(params: ParamsFile, scenario: ScenarioFile): ParamsFile {
  const clone: ParamsFile = JSON.parse(JSON.stringify(params));
  for (const [k, v] of Object.entries(scenario.overrides)) {
    if (!clone.parameters[k]) {
      // allow new keys as scenario-only, but you'd typically define them in core
      clone.parameters[k] = { value: v, min: v, max: v, unit: "unitless", confidence: "low", last_updated: new Date().toISOString().slice(0,10) };
    } else {
      clone.parameters[k].value = v;
    }
  }
  return clone;
}

export function simulate(params: ParamsFile, years: number) {
  const baselineYear = params.meta.baseline_year;

  let gdp = getValue(params, "gdp_baseline");
  let pop = getValue(params, "population_baseline");

  const popGrowth = getValue(params, "population_growth");

  const results: Array<any> = [];

  for (let i = 0; i <= years; i++) {
    const year = baselineYear + i;

    const g =
      getValue(params, "g_base") +
      getValue(params, "g_trade") +
      getValue(params, "g_governance") +
      getValue(params, "g_competition") +
      getValue(params, "g_capital") +
      getValue(params, "g_talent") +
      getValue(params, "g_oil");

    // Fiscal
    const taxToGdp = getValue(params, "tax_to_gdp");
    const tax = taxToGdp * gdp;

    const oil = getValue(params, "oil_revenue");
    const customs = getValue(params, "customs_revenue");
    const soe = getValue(params, "soe_dividends");

    const leakageRate = getValue(params, "leakage_rate");
    const grossRev = tax + oil + customs + soe;
    const leakage = leakageRate * grossRev;
    const netRev = grossRev - leakage;

    results.push({
      year,
      g,
      gdp_usd: Math.round(gdp),
      population: Math.round(pop),
      gdp_per_capita_usd: Math.round(gdp / pop),
      government_revenue_usd: Math.round(netRev),
      government_revenue_gross_usd: Math.round(grossRev),
      leakage_usd: Math.round(leakage),
    });

    // advance
    gdp = gdp * (1 + g);
    pop = pop * (1 + popGrowth);
  }

  return results;
}

function main() {
  const repoRoot = process.cwd();
  const corePath = path.join(repoRoot, "data/parameters/core.parameters.json");
  const scenarioPath = process.argv[2] ? path.join(repoRoot, process.argv[2]) : path.join(repoRoot, "data/scenarios/base.json");
  const outPath = process.argv[3] ? path.join(repoRoot, process.argv[3]) : path.join(repoRoot, "out/results.json");

  const core = readJson<ParamsFile>(corePath);
  const scenario = readJson<ScenarioFile>(scenarioPath);
  const merged = applyScenario(core, scenario);

  const results = simulate(merged, 15);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify({ scenario: scenario.id, generated_at: new Date().toISOString(), results }, null, 2));
  console.log(`Wrote ${results.length} rows -> ${outPath}`);
}

if (require.main === module) main();
