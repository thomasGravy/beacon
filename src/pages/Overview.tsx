import { ArrowDownRight, ArrowUpRight, Calendar, Download } from "lucide-react";
import { Link } from "react-router";
import { PlanDonut } from "../components/charts/PlanDonut";
import { RevenueChart } from "../components/charts/RevenueChart";
import { Sparkline } from "../components/charts/Sparkline";
import { Badge, type BadgeTone } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardHeader } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import { currentUser, kpis, pipeline, transactions, type Transaction } from "../data/demo";
import { cn } from "../lib/cn";
import { formatCompactCurrency, formatCurrency, formatDate, formatNumber } from "../lib/format";

function formatKpi(value: number, format: "currency" | "number" | "percent") {
  if (format === "currency") return value < 100 ? `$${value.toFixed(2)}` : formatCurrency(value);
  if (format === "percent") return `${value}%`;
  return formatNumber(value);
}

const transactionTone: Record<Transaction["status"], BadgeTone> = { Paid: "success", Pending: "warning", Failed: "danger" };

export function Overview() {
  const firstName = currentUser.name.split(" ")[0];
  const maxPipeline = Math.max(...pipeline.map((stage) => stage.value));

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${firstName}`}
        description="Here's how your business is doing this month."
        actions={
          <>
            <Button variant="secondary">
              <Calendar />
              Last 12 months
            </Button>
            <Button>
              <Download />
              Export
            </Button>
          </>
        }
      />

      {/* KPI cards */}
      <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          // For churn, going down is good news
          const good = kpi.label === "Churn rate" ? kpi.change < 0 : kpi.change > 0;
          return (
            <Card key={kpi.label} className="p-5">
              <p className="text-sm text-muted">{kpi.label}</p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <p className="text-2xl font-semibold tracking-tight text-foreground">{formatKpi(kpi.value, kpi.format)}</p>
                <Sparkline data={kpi.trend} positive={good} />
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs whitespace-nowrap text-muted">
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium",
                    good ? "bg-success-soft text-success" : "bg-danger-soft text-danger",
                  )}
                >
                  {kpi.change > 0 ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                  {Math.abs(kpi.change)}
                  {kpi.format === "percent" ? " pts" : "%"}
                </span>
                vs last month
              </p>
            </Card>
          );
        })}
      </section>

      {/* Revenue + plans */}
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Revenue"
            description="Monthly recurring revenue, compared with last year"
            action={
              <div className="hidden items-center gap-4 text-xs text-muted sm:flex">
                <span className="flex items-center gap-1.5">
                  <span className="h-0.5 w-4 rounded bg-[var(--chart-1)]" aria-hidden /> This year
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-0.5 w-4 rounded border-t-2 border-dashed border-[var(--chart-2)]" aria-hidden /> Last year
                </span>
              </div>
            }
          />
          <div className="px-3 pt-4 pb-3">
            <RevenueChart />
          </div>
        </Card>

        <Card>
          <CardHeader title="Revenue by plan" description="Share of MRR" />
          <div className="p-5">
            <PlanDonut />
          </div>
        </Card>
      </section>

      {/* Pipeline + transactions */}
      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader
            title="Sales pipeline"
            description="Open deals by stage"
            action={
              <Link to="/pro" className="text-xs font-medium text-primary hover:underline">
                View deals
              </Link>
            }
          />
          <ul className="space-y-4 p-5">
            {pipeline.map((stage) => (
              <li key={stage.stage}>
                <div className="mb-1.5 flex items-baseline justify-between text-sm">
                  <span className="text-foreground">{stage.stage}</span>
                  <span className="text-muted">
                    <span className="font-medium text-foreground">{formatCompactCurrency(stage.value)}</span> · {stage.deals} deals
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className={cn("h-full rounded-full", stage.stage === "Won" ? "bg-success" : "bg-primary")}
                    style={{ width: `${(stage.value / maxPipeline) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader
            title="Recent transactions"
            description="Latest payments from your customers"
            action={
              <Link to="/pro" className="text-xs font-medium text-primary hover:underline">
                View all
              </Link>
            }
          />
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-border bg-surface-muted/50 text-left text-xs font-medium text-muted">
                  <th scope="col" className="px-5 py-2.5 font-medium">Customer</th>
                  <th scope="col" className="px-5 py-2.5 font-medium">Plan</th>
                  <th scope="col" className="px-5 py-2.5 font-medium">Date</th>
                  <th scope="col" className="px-5 py-2.5 font-medium">Status</th>
                  <th scope="col" className="px-5 py-2.5 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="transition-colors hover:bg-surface-muted/40">
                    <td className="px-5 py-3 font-medium text-foreground">{tx.customer}</td>
                    <td className="px-5 py-3 text-muted">{tx.plan}</td>
                    <td className="px-5 py-3 whitespace-nowrap text-muted">{formatDate(tx.date)}</td>
                    <td className="px-5 py-3">
                      <Badge tone={transactionTone[tx.status]} dot>
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-right font-medium text-foreground">{formatCurrency(tx.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}
