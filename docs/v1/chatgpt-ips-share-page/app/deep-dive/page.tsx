import Link from "next/link";
import { loadJsonOrNull } from "../../components/load";
import { Tornado } from "../../components/Tornado";
import { formatUSD } from "../../components/format";

type Sens = {
  scenario: string;
  kind: "sensitivity";
  results: {
    horizon_years: number;
    baseline_kpis: { gdp: number; rev: number };
    ranked_parameters: Array<{
      key: string;
      unit: string;
      base: number;
      min: number;
      max: number;
      gdp_delta_min: number;
      gdp_delta_max: number;
      rev_delta_min: number;
      rev_delta_max: number;
      impact: number;
    }>;
  };
};

export default function Page({ searchParams }: { searchParams?: { scenario?: string } }) {
  const scenario = searchParams?.scenario || "base";
  const sens = loadJsonOrNull<Sens>(`data/${scenario}.sensitivity.json`);

  if (!sens) {
    return (
      <main style={{ padding: 28 }}>
        <h1 style={{ margin: 0 }}>Deep dive</h1>
        <p style={{ opacity: 0.8 }}>
          Missing data file: <code>data/{scenario}.sensitivity.json</code>
        </p>
        <Link href={`/?scenario=${scenario}`}>← Back</Link>
      </main>
    );
  }

  const top5 = sens.results.ranked_parameters.slice(0, 5);

  return (
    <main style={{ padding: 28, maxWidth: 980, margin: "0 auto", display: "grid", gap: 18 }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, letterSpacing: -0.3 }}>Deep dive: Sensitivity</h1>
          <div style={{ marginTop: 6, fontSize: 13, opacity: 0.8 }}>
            One-at-a-time (OAT) sensitivity. Horizon: {sens.results.horizon_years} years.
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Link href={`/?scenario=${scenario}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ padding: "8px 10px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}>← Back</div>
          </Link>
          <Link href={`/methodology`} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ padding: "8px 10px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}>Methodology</div>
          </Link>
        </div>
      </header>

      <section style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 16 }}>
        <div style={{ fontSize: 13, opacity: 0.8 }}>Baseline KPIs at horizon</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 8 }}>
          <div><b>GDP</b>: {formatUSD(sens.results.baseline_kpis.gdp)}</div>
          <div><b>Gov revenue</b>: {formatUSD(sens.results.baseline_kpis.rev)}</div>
        </div>
      </section>

      <section style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 16, display: "grid", gap: 10 }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>Top 5 drivers of GDP variance</h2>
        <ol style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6, fontSize: 13, opacity: 0.9 }}>
          {top5.map((p) => (
            <li key={p.key}>
              <code>{p.key}</code> — impact ≈ <b>{formatUSD(p.impact)}</b>
            </li>
          ))}
        </ol>
        <div style={{ fontSize: 12, opacity: 0.7 }}>
          “Impact” = maximum absolute delta observed in OAT runs (min/max) vs baseline at the horizon.
        </div>
      </section>

      <section style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 16, display: "grid", gap: 12 }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>Tornado chart (GDP)</h2>
        <Tornado items={sens.results.ranked_parameters as any} mode="gdp" maxRows={10} />
      </section>

      <section style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 16, display: "grid", gap: 12 }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>Tornado chart (Government revenue)</h2>
        <Tornado items={sens.results.ranked_parameters as any} mode="rev" maxRows={10} />
      </section>
    </main>
  );
}
