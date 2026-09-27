import { Check, CreditCard, Upload } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { Avatar } from "../components/ui/Avatar";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input, fieldClasses } from "../components/ui/Input";
import { PageHeader } from "../components/ui/PageHeader";
import { Select } from "../components/ui/Select";
import { Switch } from "../components/ui/Switch";
import { Tabs } from "../components/ui/Tabs";
import { currentUser } from "../data/demo";
import { cn } from "../lib/cn";

type Tab = "profile" | "notifications" | "billing";

/** Two-column settings row: explanation on the left, controls on the right. */
function Section({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="grid gap-4 py-6 first:pt-0 md:grid-cols-3 md:gap-8">
      <div>
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
      <div className="md:col-span-2">{children}</div>
    </div>
  );
}

function Field({ label, htmlFor, hint, children }: { label: string; htmlFor: string; hint?: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}

function ProfileTab() {
  const [saved, setSaved] = useState(false);
  const [first, last] = currentUser.name.split(" ");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <form onSubmit={onSubmit} className="divide-y divide-border">
      <Section title="Photo" description="Shown next to your name across the workspace.">
        <div className="flex items-center gap-4">
          <Avatar name={currentUser.name} size="lg" />
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Upload />
              Upload
            </Button>
            <Button variant="ghost" size="sm">
              Remove
            </Button>
          </div>
        </div>
      </Section>

      <Section title="Personal information" description="Update your name, email and role.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name" htmlFor="first-name">
            <Input id="first-name" defaultValue={first} autoComplete="given-name" />
          </Field>
          <Field label="Last name" htmlFor="last-name">
            <Input id="last-name" defaultValue={last} autoComplete="family-name" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Email" htmlFor="email" hint="We'll send a confirmation link if you change it.">
              <Input id="email" type="email" defaultValue={currentUser.email} autoComplete="email" />
            </Field>
          </div>
          <Field label="Role" htmlFor="role">
            <Select id="role" defaultValue={currentUser.role}>
              <option>Admin</option>
              <option>Manager</option>
              <option>Sales</option>
              <option>Support</option>
            </Select>
          </Field>
          <Field label="Time zone" htmlFor="timezone">
            <Select id="timezone" defaultValue="Europe/Brussels">
              <option value="Europe/Brussels">Europe/Brussels (UTC+1)</option>
              <option value="Europe/London">Europe/London (UTC+0)</option>
              <option value="America/New_York">America/New York (UTC−5)</option>
            </Select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Bio" htmlFor="bio" hint="A few words for your teammates. 200 characters max.">
              <textarea id="bio" rows={3} maxLength={200} className={cn(fieldClasses, "h-auto py-2")} defaultValue="Head of growth. Coffee first, dashboards second." />
            </Field>
          </div>
        </div>
      </Section>

      <div className="flex items-center justify-end gap-3 pt-6">
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-success" role="status">
            <Check className="size-4" /> Changes saved
          </span>
        )}
        <Button variant="secondary">Cancel</Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}

const notificationOptions = [
  { id: "new-customer", title: "New customers", description: "When someone signs up or starts a trial." },
  { id: "failed-payment", title: "Failed payments", description: "When a card is declined or a payment fails." },
  { id: "weekly-report", title: "Weekly report", description: "A summary of revenue and growth every Monday." },
  { id: "product-news", title: "Product news", description: "New features and tips, about once a month." },
];

function NotificationsTab() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    "new-customer": true,
    "failed-payment": true,
    "weekly-report": true,
    "product-news": false,
  });

  return (
    <div className="divide-y divide-border">
      <Section title="Email notifications" description="Choose what lands in your inbox.">
        <ul className="divide-y divide-border rounded-lg border border-border">
          {notificationOptions.map((option) => (
            <li key={option.id} className="flex items-center justify-between gap-4 p-4">
              <div>
                <p id={`${option.id}-label`} className="text-sm font-medium text-foreground">
                  {option.title}
                </p>
                <p className="text-sm text-muted">{option.description}</p>
              </div>
              <Switch
                label={option.title}
                checked={enabled[option.id]}
                onChange={(value) => setEnabled((prev) => ({ ...prev, [option.id]: value }))}
              />
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function BillingTab() {
  return (
    <div className="divide-y divide-border">
      <Section title="Current plan" description="You can change or cancel your plan at any time.">
        <div className="rounded-lg border border-border p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold text-foreground">Growth</p>
                <Badge tone="primary">Current</Badge>
              </div>
              <p className="mt-1 text-sm text-muted">Up to 10 seats · unlimited customers · email support</p>
            </div>
            <p className="text-2xl font-semibold text-foreground">
              $99<span className="text-sm font-normal text-muted">/month</span>
            </p>
          </div>
          <div className="mt-5">
            <div className="mb-1.5 flex justify-between text-xs text-muted">
              <span>Seats used</span>
              <span className="font-medium text-foreground">7 of 10</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
              <div className="h-full w-[70%] rounded-full bg-primary" />
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <Button>Upgrade plan</Button>
            <Button variant="ghost">Cancel plan</Button>
          </div>
        </div>
      </Section>

      <Section title="Payment method" description="Charged on the 1st of every month.">
        <div className="flex items-center justify-between gap-4 rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-12 items-center justify-center rounded-md bg-surface-muted text-muted">
              <CreditCard className="size-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">Visa ending in 4242</p>
              <p className="text-xs text-muted">Expires 08/2028</p>
            </div>
          </div>
          <Button variant="secondary" size="sm">
            Update
          </Button>
        </div>
      </Section>
    </div>
  );
}

export function Settings() {
  const [tab, setTab] = useState<Tab>("profile");

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your account and preferences." />
      <Tabs
        label="Settings sections"
        value={tab}
        onChange={setTab}
        tabs={[
          { value: "profile", label: "Profile" },
          { value: "notifications", label: "Notifications" },
          { value: "billing", label: "Billing" },
        ]}
      />
      <Card className="p-6">
        {tab === "profile" && <ProfileTab />}
        {tab === "notifications" && <NotificationsTab />}
        {tab === "billing" && <BillingTab />}
      </Card>
    </div>
  );
}
