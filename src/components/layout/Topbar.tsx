import { Bell, LogOut, Menu as MenuIcon, Moon, Search, Settings, Sun, User } from "lucide-react";
import { useNavigate } from "react-router";
import { currentUser } from "../../data/demo";
import { useTheme } from "../../lib/useTheme";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { Menu } from "../ui/Menu";

export function Topbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-surface/80 px-4 backdrop-blur sm:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onOpenMenu} aria-label="Open menu">
        <MenuIcon />
      </Button>

      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden />
        <input
          type="search"
          placeholder="Search customers, invoices…"
          aria-label="Search"
          className="h-9 w-full rounded-lg border border-border bg-surface-muted/60 pr-14 pl-9 text-sm placeholder:text-muted focus:border-primary focus:bg-surface focus:ring-3 focus:ring-primary/20 focus:outline-none"
        />
        <kbd className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-muted">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={toggle} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications, 3 unread">
          <Bell />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface" aria-hidden />
        </Button>

        <div className="ml-2 border-l border-border pl-3">
          <Menu
            label="Account menu"
            trigger={
              <span className="flex items-center gap-2.5">
                <Avatar name={currentUser.name} size="sm" />
                <span className="hidden text-left md:block">
                  <span className="block text-sm font-medium text-foreground">{currentUser.name}</span>
                  <span className="block text-xs text-muted">{currentUser.role}</span>
                </span>
              </span>
            }
            items={[
              { label: "Profile", icon: <User />, onSelect: () => navigate("/settings") },
              { label: "Settings", icon: <Settings />, onSelect: () => navigate("/settings") },
              { label: "Sign out", icon: <LogOut />, danger: true },
            ]}
          />
        </div>
      </div>
    </header>
  );
}
