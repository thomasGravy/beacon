import { Check, ChartColumn, FileText, Handshake, KeyRound, Smartphone, Sparkles, UsersRound } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { GithubIcon } from "../components/layout/Logo";
import { buttonClasses } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const REPO_URL = "https://github.com/thomasGravy/beacon";

const features: { icon: ReactNode; title: string; description: string }[] = [
  { icon: <Handshake />, title: "Deals pipeline", description: "Drag-and-drop kanban with stages, owners and forecasts." },
  { icon: <FileText />, title: "Invoices", description: "Invoice list, detail view and a printable invoice template." },
  { icon: <ChartColumn />, title: "Reports", description: "Cohorts, retention and revenue breakdowns." },
  { icon: <UsersRound />, title: "Team", description: "Members, roles and invitations." },
  { icon: <KeyRound />, title: "Auth pages", description: "Sign in, sign up, reset password and 2FA." },
  { icon: <Smartphone />, title: "Mobile screens", description: "Every screen designed for small viewports." },
];

const lite = ["3 screens: overview, customers, settings", "Light and dark mode", "React + Tailwind CSS source code", "Figma file (coming soon)"];

export function Pro() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-sidebar px-6 py-12 text-center sm:px-12">
        <div className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" aria-hidden />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-indigo-200">
            <Sparkles className="size-3.5" /> Coming soon
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Beacon Pro</h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Everything in the free version, plus 20+ screens and a complete component library, in React and Figma.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={REPO_URL} target="_blank" rel="noreferrer" className={buttonClasses("primary", "md", "dark:text-slate-950")}>
              <GithubIcon className="size-4" />
              Follow Beacon on GitHub
            </a>
            <Link to="/" className={buttonClasses("secondary", "md", "border-white/15 bg-white/10 text-white hover:bg-white/15")}>
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>

      <section aria-labelledby="pro-features" className="space-y-4">
        <h2 id="pro-features" className="text-lg font-semibold text-foreground">
          What's in Pro
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="p-5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground [&_svg]:size-4.5">
                {feature.icon}
              </span>
              <h3 className="mt-4 text-sm font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-1 text-sm text-muted">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <Card className="p-6">
        <h2 className="text-sm font-semibold text-foreground">Included in the free version</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {lite.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-muted">
              <Check className="size-4 text-success" />
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
