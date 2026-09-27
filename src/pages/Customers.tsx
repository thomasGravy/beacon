import { ArrowUpDown, ChevronLeft, ChevronRight, Download, Ellipsis, Mail, Pencil, Plus, Search, Trash2, UserX } from "lucide-react";
import { useMemo, useState } from "react";
import { Avatar } from "../components/ui/Avatar";
import { Badge, type BadgeTone } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Checkbox } from "../components/ui/Checkbox";
import { Input } from "../components/ui/Input";
import { Menu } from "../components/ui/Menu";
import { PageHeader } from "../components/ui/PageHeader";
import { Select } from "../components/ui/Select";
import { customers, type CustomerStatus, type Plan } from "../data/demo";
import { cn } from "../lib/cn";
import { formatCurrency, formatDate } from "../lib/format";

const PAGE_SIZE = 10;
const statusFilters: Array<"All" | CustomerStatus> = ["All", "Active", "Trial", "Past due", "Churned"];
const statusTone: Record<CustomerStatus, BadgeTone> = { Active: "success", Trial: "primary", "Past due": "warning", Churned: "neutral" };
const planTone: Record<Plan, BadgeTone> = { Starter: "neutral", Growth: "primary", Scale: "primary", Enterprise: "warning" };

type SortKey = "name" | "mrr" | "joined";

export function Customers() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof statusFilters)[number]>("All");
  const [plan, setPlan] = useState<"All" | Plan>("All");
  const [sort, setSort] = useState<{ key: SortKey; desc: boolean }>({ key: "joined", desc: true });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = customers.filter(
      (c) =>
        (status === "All" || c.status === status) &&
        (plan === "All" || c.plan === plan) &&
        (!q || `${c.name} ${c.email} ${c.company}`.toLowerCase().includes(q)),
    );
    return rows.sort((a, b) => {
      const dir = sort.desc ? -1 : 1;
      if (sort.key === "mrr") return (a.mrr - b.mrr) * dir;
      if (sort.key === "joined") return (Date.parse(a.joined) - Date.parse(b.joined)) * dir;
      return a.name.localeCompare(b.name) * dir;
    });
  }, [query, status, plan, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const allOnPageSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));

  const counts = useMemo(() => {
    const map = new Map<string, number>([["All", customers.length]]);
    customers.forEach((c) => map.set(c.status, (map.get(c.status) ?? 0) + 1));
    return map;
  }, []);

  function toggleSort(key: SortKey) {
    setSort((s) => (s.key === key ? { key, desc: !s.desc } : { key, desc: key !== "name" }));
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function togglePage() {
    setSelected((prev) => {
      const next = new Set(prev);
      rows.forEach((r) => (allOnPageSelected ? next.delete(r.id) : next.add(r.id)));
      return next;
    });
  }

  const SortButton = ({ label, sortKey }: { label: string; sortKey: SortKey }) => (
    <button type="button" onClick={() => toggleSort(sortKey)} className="inline-flex items-center gap-1 hover:text-foreground">
      {label}
      <ArrowUpDown className={cn("size-3.5", sort.key === sortKey ? "text-foreground" : "opacity-50")} aria-hidden />
    </button>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description={`${customers.length} customers across all plans.`}
        actions={
          <>
            <Button variant="secondary">
              <Download />
              Export CSV
            </Button>
            <Button>
              <Plus />
              Add customer
            </Button>
          </>
        }
      />

      <Card>
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center">
          <div className="flex gap-1 overflow-x-auto rounded-lg bg-surface-muted p-1" role="group" aria-label="Filter by status">
            {statusFilters.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setStatus(s);
                  setPage(1);
                }}
                aria-pressed={status === s}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                  status === s ? "bg-surface text-foreground shadow-xs" : "text-muted hover:text-foreground",
                )}
              >
                {s}
                <span className="text-xs text-muted">{counts.get(s) ?? 0}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-1 flex-col gap-3 sm:flex-row lg:justify-end">
            <Input
              icon={<Search />}
              type="search"
              placeholder="Search name, email or company"
              aria-label="Search customers"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="sm:w-72"
            />
            <Select
              aria-label="Filter by plan"
              value={plan}
              onChange={(e) => {
                setPlan(e.target.value as "All" | Plan);
                setPage(1);
              }}
              className="sm:w-40"
            >
              <option value="All">All plans</option>
              <option>Starter</option>
              <option>Growth</option>
              <option>Scale</option>
              <option>Enterprise</option>
            </Select>
          </div>
        </div>

        {selected.size > 0 && (
          <div className="flex items-center gap-3 border-b border-border bg-primary-soft px-4 py-2.5 text-sm text-primary-soft-foreground">
            <span className="font-medium">{selected.size} selected</span>
            <Button variant="ghost" size="sm" className="text-primary-soft-foreground">
              <Mail />
              Email
            </Button>
            <Button variant="ghost" size="sm" className="text-danger hover:bg-danger-soft hover:text-danger">
              <Trash2 />
              Delete
            </Button>
            <button type="button" onClick={() => setSelected(new Set())} className="ml-auto text-xs font-medium hover:underline">
              Clear selection
            </button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-muted/50 text-left text-xs text-muted">
                <th scope="col" className="w-10 py-3 pr-2 pl-4">
                  <Checkbox checked={allOnPageSelected} onChange={togglePage} aria-label="Select all on this page" />
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  <SortButton label="Customer" sortKey="name" />
                </th>
                <th scope="col" className="hidden px-3 py-3 font-medium md:table-cell">Company</th>
                <th scope="col" className="px-3 py-3 font-medium">Plan</th>
                <th scope="col" className="px-3 py-3 font-medium">Status</th>
                <th scope="col" className="px-3 py-3 text-right font-medium">
                  <SortButton label="MRR" sortKey="mrr" />
                </th>
                <th scope="col" className="hidden px-3 py-3 font-medium lg:table-cell">
                  <SortButton label="Joined" sortKey="joined" />
                </th>
                <th scope="col" className="w-12 px-3 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((c) => (
                <tr key={c.id} className={cn("transition-colors hover:bg-surface-muted/40", selected.has(c.id) && "bg-primary-soft/50")}>
                  <td className="py-3 pr-2 pl-4">
                    <Checkbox checked={selected.has(c.id)} onChange={() => toggleRow(c.id)} aria-label={`Select ${c.name}`} />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={c.name} />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{c.name}</p>
                        <p className="truncate text-xs text-muted">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-3 py-3 text-muted md:table-cell">
                    <p className="text-foreground">{c.company}</p>
                    <p className="text-xs">{c.country}</p>
                  </td>
                  <td className="px-3 py-3">
                    <Badge tone={planTone[c.plan]}>{c.plan}</Badge>
                  </td>
                  <td className="px-3 py-3">
                    <Badge tone={statusTone[c.status]} dot>
                      {c.status}
                    </Badge>
                  </td>
                  <td className="px-3 py-3 text-right font-medium text-foreground tabular-nums">{c.mrr ? formatCurrency(c.mrr) : "—"}</td>
                  <td className="hidden px-3 py-3 whitespace-nowrap text-muted lg:table-cell">{formatDate(c.joined)}</td>
                  <td className="px-3 py-3 text-right">
                    <Menu
                      label={`Actions for ${c.name}`}
                      trigger={<Ellipsis className="size-5" />}
                      items={[
                        { label: "Edit", icon: <Pencil /> },
                        { label: "Send email", icon: <Mail /> },
                        { label: "Cancel subscription", icon: <UserX />, danger: true },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {rows.length === 0 && (
            <div className="flex flex-col items-center gap-2 px-4 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-surface-muted text-muted">
                <Search className="size-5" />
              </div>
              <p className="font-medium text-foreground">No customers found</p>
              <p className="text-sm text-muted">Try another search or clear the filters.</p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-2"
                onClick={() => {
                  setQuery("");
                  setStatus("All");
                  setPlan("All");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-3 text-sm text-muted">
          <p>
            Showing <span className="font-medium text-foreground">{filtered.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}</span>–
            <span className="font-medium text-foreground">{Math.min(currentPage * PAGE_SIZE, filtered.length)}</span> of{" "}
            <span className="font-medium text-foreground">{filtered.length}</span>
          </p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="icon" onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page">
              <ChevronLeft />
            </Button>
            <span className="tabular-nums">
              {currentPage} / {pageCount}
            </span>
            <Button variant="secondary" size="icon" onClick={() => setPage(currentPage + 1)} disabled={currentPage === pageCount} aria-label="Next page">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
