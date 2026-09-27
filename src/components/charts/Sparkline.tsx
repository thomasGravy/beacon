/** Tiny SVG trend line for KPI cards (no chart library needed). */
export function Sparkline({ data, positive = true }: { data: number[]; positive?: boolean }) {
  const width = 96;
  const height = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((value, index) => [
    (index / (data.length - 1)) * width,
    height - 2 - ((value - min) / range) * (height - 4),
  ]);
  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${width} ${height} L0 ${height} Z`;
  const color = positive ? "var(--success)" : "var(--danger)";
  const id = `spark-${positive ? "up" : "down"}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-8 w-24" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
