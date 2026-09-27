# Beacon — free SaaS & CRM dashboard

A clean, free dashboard template for SaaS and CRM products, built with **React**, **Tailwind CSS** and **Recharts**, with a matching **Figma** file (coming soon).

**[Live demo](https://thomasgravy.github.io/beacon/)**

## What's inside

- **Overview**: KPI cards with sparklines, revenue chart (this year vs last year), revenue by plan, sales pipeline and recent transactions
- **Customers**: searchable, filterable and sortable table with row selection, bulk actions, row menus, empty state and pagination
- **Settings**: profile form, notification switches and billing
- **Light and dark mode**, remembered per visitor
- **Responsive**: collapsible sidebar on mobile
- **Accessible**: keyboard friendly, labelled controls, visible focus
- **Easy to re-theme**: every color is a CSS variable in `src/index.css`
- **Pages load on demand**, so the charts library only ships with the overview

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

To build for production:

```bash
npm run build
```

The site is written to `dist/`. To serve it from a sub-path (for example GitHub Pages), set `BASE_PATH`:

```bash
BASE_PATH=/my-repo/ npm run build
```

## Project structure

```
src/
  components/
    ui/        Button, Badge, Card, Input, Select, Checkbox, Switch, Avatar, Menu, Tabs…
    layout/    Sidebar, Topbar, AppLayout
    charts/    RevenueChart, PlanDonut, Sparkline
  pages/       Overview, Customers, Settings, Pro, NotFound
  data/        Fictional demo data: replace with your API calls
  lib/         Formatting helpers and the theme hook
  index.css    Design tokens (colors, radius) for light and dark mode
```

## Changing the colors

Open `src/index.css` and edit the variables in `:root` (light mode) and `.dark` (dark mode). For example, to switch the accent from indigo to emerald:

```css
:root {
  --primary: #10b981;
  --primary-hover: #059669;
  --primary-soft: #ecfdf5;
  --primary-soft-foreground: #047857;
}
```

## Beacon Pro

A Pro version with 20+ screens is in the works: deals pipeline, invoices, reports, team, auth pages and mobile layouts. Follow the repository to hear when it's out.

## Credits

- [React](https://react.dev), [React Router](https://reactrouter.com), [Tailwind CSS](https://tailwindcss.com), [Recharts](https://recharts.org), [Lucide icons](https://lucide.dev), [Inter](https://rsms.me/inter/) font
- Made by [thomasGravy](https://github.com/thomasGravy)

## License

MIT, see [LICENSE](LICENSE). Free for personal and commercial projects.
