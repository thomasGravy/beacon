import { cn } from "../../lib/cn";

export function Tabs<T extends string>({ tabs, value, onChange, label }: {
  tabs: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div role="tablist" aria-label={label} className="flex gap-1 border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={value === tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "-mb-px border-b-2 px-3 pb-2.5 text-sm font-medium transition-colors",
            value === tab.value ? "border-primary text-foreground" : "border-transparent text-muted hover:text-foreground",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
