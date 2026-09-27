import { cn } from "../../lib/cn";

const palette = [
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
  "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
  "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200",
  "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200",
  "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Initials avatar with a stable color picked from the name. */
export function Avatar({ name, size = "md", className }: { name: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const color = palette[[...name].reduce((sum, c) => sum + c.charCodeAt(0), 0) % palette.length];
  const sizes = { sm: "size-7 text-[11px]", md: "size-9 text-xs", lg: "size-16 text-lg" };
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full font-semibold", color, sizes[size], className)}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
