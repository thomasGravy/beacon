import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, type TooltipContentProps } from "recharts";
import { revenueByMonth } from "../../data/demo";
import { formatCompactCurrency, formatCurrency } from "../../lib/format";

function RevenueTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2 text-xs shadow-lg">
      <p className="mb-1 font-medium text-foreground">{label}</p>
      {payload.map((entry) => (
        <p key={String(entry.dataKey)} className="flex items-center gap-2 text-muted">
          <span className="size-2 rounded-full" style={{ background: entry.color }} aria-hidden />
          {entry.dataKey === "thisYear" ? "This year" : "Last year"}
          <span className="ml-auto pl-3 font-medium text-foreground">{formatCurrency(Number(entry.value))}</span>
        </p>
      ))}
    </div>
  );
}

export function RevenueChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={revenueByMonth} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
          <defs>
            <linearGradient id="revenue-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.28} />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 4" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={10} />
          <YAxis axisLine={false} tickLine={false} tickFormatter={formatCompactCurrency} width={56} />
          <Tooltip content={RevenueTooltip} cursor={{ stroke: "var(--border-strong)" }} />
          <Area type="monotone" dataKey="lastYear" stroke="var(--chart-2)" strokeWidth={2} strokeDasharray="5 5" fill="none" isAnimationActive={false} />
          <Area type="monotone" dataKey="thisYear" stroke="var(--chart-1)" strokeWidth={2.5} fill="url(#revenue-fill)" activeDot={{ r: 5 }} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
