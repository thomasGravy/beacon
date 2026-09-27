import { NavLink } from "react-router";
import { ChartColumn, FileText, Handshake, LayoutDashboard, Settings, Sparkles, Users, UsersRound, X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Logo } from "./Logo";

type NavItem = { label: string; to: string; icon: ReactNode; pro?: boolean };

const mainNav: NavItem[] = [
  { label: "Overview", to: "/", icon: <LayoutDashboard /> },
  { label: "Customers", to: "/customers", icon: <Users /> },
  { label: "Deals", to: "/pro", icon: <Handshake />, pro: true },
  { label: "Invoices", to: "/pro", icon: <FileText />, pro: true },
  { label: "Reports", to: "/pro", icon: <ChartColumn />, pro: true },
  { label: "Team", to: "/pro", icon: <UsersRound />, pro: true },
];

function NavEntry({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  return (
    <NavLink
      to={item.to}
      end={item.to === "/"}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors [&_svg]:size-4.5",
          isActive && !item.pro
            ? "bg-sidebar-hover text-white"
            : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-foreground",
        )
      }
    >
      {item.icon}
      <span className="flex-1">{item.label}</span>
      {item.pro && (
        <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-indigo-300 uppercase">
          Pro
        </span>
      )}
    </NavLink>
  );
}

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={cn("fixed inset-0 z-40 bg-slate-950/50 transition-opacity lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Sidebar"
      >
        <div className="flex h-16 items-center justify-between px-5">
          <NavLink to="/" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-white" onClick={onClose}>
            <Logo />
            Beacon
          </NavLink>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-sidebar-muted hover:text-white lg:hidden" aria-label="Close menu">
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            <p className="px-3 pb-1 text-[11px] font-semibold tracking-wider text-sidebar-muted/70 uppercase">Workspace</p>
            {mainNav.map((item) => (
              <NavEntry key={item.label} item={item} onNavigate={onClose} />
            ))}
          </div>
          <div className="space-y-1">
            <p className="px-3 pb-1 text-[11px] font-semibold tracking-wider text-sidebar-muted/70 uppercase">Account</p>
            <NavEntry item={{ label: "Settings", to: "/settings", icon: <Settings /> }} onNavigate={onClose} />
          </div>
        </nav>

        <div className="m-3 rounded-xl border border-sidebar-border bg-sidebar-hover p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles className="size-4 text-indigo-300" />
            Beacon Pro
          </div>
          <p className="mt-1 text-xs leading-relaxed text-sidebar-muted">
            20+ screens: deals pipeline, invoices, reports, auth pages and more.
          </p>
          <NavLink
            to="/pro"
            onClick={onClose}
            className="mt-3 inline-flex h-8 w-full items-center justify-center rounded-lg bg-primary text-xs font-semibold text-white transition-colors hover:bg-primary-hover dark:text-slate-950"
          >
            See what's included
          </NavLink>
        </div>
      </aside>
    </>
  );
}
