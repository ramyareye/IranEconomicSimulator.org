import React from "react";
import { formatUSD } from "./format";

type Item = {
  key: string;
  gdp_delta_min: number;
  gdp_delta_max: number;
  rev_delta_min: number;
  rev_delta_max: number;
  impact: number;
};

type Props = { items: Item[]; mode: "gdp" | "rev"; maxRows?: number };

export function Tornado({ items, mode, maxRows = 10 }: Props) {
  const rows = (items ?? []).slice(0, maxRows);

  const maxAbs = Math.max(
    1,
    ...rows.map((r) => {
      const a = mode === "gdp" ? [r.gdp_delta_min, r.gdp_delta_max] : [r.rev_delta_min, r.rev_delta_max];
      return Math.max(Math.abs(a[0]), Math.abs(a[1]));
    })
  );

  const scale = (v: number) => (Math.abs(v) / maxAbs) * 180;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {rows.map((r) => {
        const min = mode === "gdp" ? r.gdp_delta_min : r.rev_delta_min;
        const max = mode === "gdp" ? r.gdp_delta_max : r.rev_delta_max;
        const leftW = scale(min);
        const rightW = scale(max);

        return (
          <div key={r.key} style={{ display: "grid", gridTemplateColumns: "170px 200px 1fr", gap: 12, alignItems: "center" }}>
            <div style={{ fontSize: 13, opacity: 0.9, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={r.key}>
              {r.key}
            </div>

            <div style={{ position: "relative", height: 16, width: 200 }}>
              <div style={{ position: "absolute", left: "50%", top: 0, width: 1, height: 16, background: "currentColor", opacity: 0.25 }} />
              <div style={{ position: "absolute", right: "50%", top: 2, width: leftW, height: 12, background: "currentColor", opacity: 0.35, borderRadius: 6 }} />
              <div style={{ position: "absolute", left: "50%", top: 2, width: rightW, height: 12, background: "currentColor", opacity: 0.7, borderRadius: 6 }} />
            </div>

            <div style={{ fontSize: 12, opacity: 0.8 }}>
              min: {formatUSD(min)} &nbsp; | &nbsp; max: {formatUSD(max)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
