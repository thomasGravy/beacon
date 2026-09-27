import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

const fieldClasses =
  "h-9 w-full rounded-lg border border-border bg-surface px-3 text-sm text-foreground shadow-xs placeholder:text-muted transition-colors focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/20";

export function Input({ icon, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { icon?: ReactNode }) {
  if (!icon) return <input className={cn(fieldClasses, className)} {...props} />;
  return (
    <div className={cn("relative", className)}>
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted [&_svg]:size-4">{icon}</span>
      <input className={cn(fieldClasses, "pl-9")} {...props} />
    </div>
  );
}

export { fieldClasses };
