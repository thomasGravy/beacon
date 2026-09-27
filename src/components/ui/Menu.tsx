import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export type MenuItem = { label: string; icon?: ReactNode; danger?: boolean; onSelect?: () => void };

/**
 * Small dropdown menu: opens on click, closes on outside click, Escape, scroll or resize.
 * It is positioned with `position: fixed` so scrollable containers (like tables) never clip it.
 */
export function Menu({ trigger, items, align = "end", label }: {
  trigger: ReactNode;
  items: MenuItem[];
  align?: "start" | "end";
  label: string;
}) {
  const [position, setPosition] = useState<CSSProperties | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const open = position !== null;

  function toggle() {
    if (open) return setPosition(null);
    const rect = buttonRef.current!.getBoundingClientRect();
    const below = window.innerHeight - rect.bottom > 220;
    setPosition({
      position: "fixed",
      ...(below ? { top: rect.bottom + 6 } : { bottom: window.innerHeight - rect.top + 6 }),
      ...(align === "end" ? { right: window.innerWidth - rect.right } : { left: rect.left }),
    });
  }

  useEffect(() => {
    if (!open) return;
    const close = () => setPosition(null);
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="inline-flex">
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
        className="inline-flex items-center rounded-lg text-muted transition-colors hover:text-foreground"
      >
        {trigger}
      </button>
      {open && (
        <div role="menu" style={position} className="z-50 min-w-44 rounded-lg border border-border bg-surface p-1 shadow-lg">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => {
                item.onSelect?.();
                setPosition(null);
              }}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors [&_svg]:size-4",
                item.danger ? "text-danger hover:bg-danger-soft" : "text-foreground hover:bg-surface-muted",
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
