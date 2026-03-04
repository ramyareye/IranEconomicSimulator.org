import Link from "next/link";
import { loadJsonOrNull } from "../components/load";
import { formatUSD } from "../components/format";
import { Sparkline } from "../components/Sparkline";

type MC = {
  scenario: string;
  kind: "montecarlo";
  results: {
    years: number[];
    gdp_usd: { p10: number[]; p50: number[]; p90: number[] };
    gdp_per_capita_usd: { p10: number[]; p50: number[]; p90: number[] };
    government_revenue_usd: { p10: number[]; p50: number[]; p90: number[] };
  };
};

function Card({ title, big, range, spark }: { title: string; big: string; range: string; spark?: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 16, display: "grid", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 13, opacity: 0.8 }}>{title}</div>
        {spark}
      </div>
      <div style={{ fontSize: 28, fontWeight: 650, letterSpacing: -0.3 }}>{big}</div>
      <div style={{ fontSize: 13, opacity: 0.8 }}>{range}</div>
    </div>
  );
}

export default function Page({ searchParams }: { searchParams?: { scenario?: string } }) {
  const scenario = searchParams?.scenario || "base";
  const mc = loadJsonOrNull<MC>(`data/${scenario}.montecarlo.json`);

  if (!mc) {
    return (
      <main style={{ padding: 28 }}>
        <h1 style={{ margin: 0 }}>Iran Potential Simulator</h1>
        <p style={{ opacity: 0.8 }}>
          Missing data file: <code>data/{scenario}.montecarlo.json</code>
        </p>
        <p style={{ opacity: 0.8 }}>
          Copy outputs from the main repo into this repo’s <code>data/</code> folder.
        </p>
      </main>
    );
  }

  const idx = 10; // Year 10
  const year = mc.results.years[idx] ?? "(year+10)";

  const gdp50 = mc.results.gdp_usd.p50[idx];
  const gdp10 = mc.results.gdp_usd.p10[idx];
  const gdp90 = mc.results.gdp_usd.p90[idx];

  const pc50 = mc.results.gdp_per_capita_usd.p50[idx];
  const pc10 = mc.results.gdp_per_capita_usd.p10[idx];
  const pc90 = mc.results.gdp_per_capita_usd.p90[idx];

  const rev50 = mc.results.government_revenue_usd.p50[idx];
  const rev10 = mc.results.government_revenue_usd.p10[idx];
  const rev90 = mc.results.government_revenue_usd.p90[idx];

  return (
    <main style={{ padding: 28, maxWidth: 980, margin: "0 auto", display: "grid", gap: 18 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, letterSpacing: -0.4 }}>Iran Potential Simulator</h1>
          <div style={{ marginTop: 6, fontSize: 13, opacity: 0.8 }}>
            Scenario model (not a forecast). Uncertainty shown as p10–p90 bands.
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {["conservative", "base", "optimistic"].map((s) => (
            <Link
              key={s}
              href={`/?scenario=${s}`}
              style={{
                padding: "8px 10px",
                borderRadius: 999,
                border: "1px solid rgba(0,0,0,0.12)",
                textDecoration: "none",
                color: "inherit",
                background: s === scenario ? "rgba(0,0,0,0.06)" : "transparent",
                fontSize: 13,
              }}
            >
              {s}
            </Link>
          ))}
        </div>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        <Card
          title={`Projected GDP (${year})`}
          big={formatUSD(gdp50)}
          range={`Range: ${formatUSD(gdp10)} – ${formatUSD(gdp90)} (p10–p90)`}
          spark={<Sparkline values={mc.results.gdp_usd.p50} label="GDP median path" />}
        />
        <Card
          title={`GDP per capita (${year})`}
          big={formatUSD(pc50)}
          range={`Range: ${formatUSD(pc10)} – ${formatUSD(pc90)} (p10–p90)`}
          spark={<Sparkline values={mc.results.gdp_per_capita_usd.p50} label="GDP per capita median path" />}
        />
        <Card
          title={`Government revenue (${year})`}
          big={formatUSD(rev50)}
          range={`Range: ${formatUSD(rev10)} – ${formatUSD(rev90)} (p10–p90)`}
          spark={<Sparkline values={mc.results.government_revenue_usd.p50} label="Gov revenue median path" />}
        />
      </section>

      <section style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
        <Link href={`/deep-dive?scenario=${scenario}`} style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}>
            Deep dive → Sensitivity & Tornado
          </div>
        </Link>
        <Link href="/methodology" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}>
            Methodology & Sources
          </div>
        </Link>
        <div style={{ fontSize: 12, opacity: 0.75 }}>
          Tip: share links like <code>/?scenario=optimistic</code>
        </div>
      </section>
    </main>
  );
}
