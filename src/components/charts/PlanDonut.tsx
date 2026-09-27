import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { revenueByPlan } from "../../data/demo";
import { formatCurrency } from "../../lib/format";

const colors = ["var(--chart-1)", "var(--chart-3)", "var(--chart-4)", "var(--chart-2)"];

export function PlanDonut() {
  const total = revenueByPlan.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row lg:flex-col">
      <div className="relative size-40 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={revenueByPlan} dataKey="value" nameKey="plan" innerRadius="70%" outerRadius="100%" paddingAngle={2} stroke="none" isAnimationActive={false}>
              {revenueByPlan.map((item, index) => (
                <Cell key={item.plan} fill={colors[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-muted">Total MRR</span>
          <span className="text-lg font-semibold text-foreground">{formatCurrency(total)}</span>
        </div>
      </div>

      <ul className="w-full space-y-3">
        {revenueByPlan.map((item, index) => (
          <li key={item.plan} className="flex items-center gap-3 text-sm">
            <span className="size-2.5 rounded-full" style={{ background: colors[index] }} aria-hidden />
            <span className="text-foreground">{item.plan}</span>
            <span className="ml-auto font-medium text-foreground">{formatCurrency(item.value)}</span>
            <span className="w-10 text-right text-xs text-muted">{Math.round((item.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
