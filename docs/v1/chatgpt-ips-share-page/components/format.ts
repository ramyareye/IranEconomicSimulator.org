export function formatUSD(n: number): string {
  if (!Number.isFinite(n)) return "-";
  const abs = Math.abs(n);
  if (abs >= 1e12) return "$" + (n / 1e12).toFixed(2) + "T";
  if (abs >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
  if (abs >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
  return "$" + Math.round(n).toLocaleString();
}
