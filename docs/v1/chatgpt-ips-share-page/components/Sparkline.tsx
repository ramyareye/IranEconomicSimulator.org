import React from "react";

type Props = { values: number[]; width?: number; height?: number; label?: string };

function normalize(values: number[], height: number) {
  const finite = values.filter(Number.isFinite);
  const min = Math.min(...finite);
  const max = Math.max(...finite);
  const span = max - min || 1;
  return values.map((v) => {
    const t = (v - min) / span;
    return height - t * height;
  });
}

export function Sparkline({ values, width = 220, height = 44, label }: Props) {
  if (!values?.length) return null;
  const ys = normalize(values, height - 4);
  const dx = (width - 4) / Math.max(1, values.length - 1);
  const d = ys.map((y, i) => `${i === 0 ? "M" : "L"} ${2 + i * dx} ${2 + y}`).join(" ");
  return (
    <svg width={width} height={height} role="img" aria-label={label ?? "sparkline"}>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
