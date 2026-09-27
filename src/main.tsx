import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "@fontsource-variable/inter";
import "./index.css";
import { AppLayout } from "./components/layout/AppLayout";
import { NotFound } from "./pages/NotFound";

// Each page is loaded on demand, so the charts library only ships with the overview.
const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        { index: true, lazy: () => import("./pages/Overview").then((m) => ({ Component: m.Overview })) },
        { path: "customers", lazy: () => import("./pages/Customers").then((m) => ({ Component: m.Customers })) },
        { path: "settings", lazy: () => import("./pages/Settings").then((m) => ({ Component: m.Settings })) },
        { path: "pro", lazy: () => import("./pages/Pro").then((m) => ({ Component: m.Pro })) },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, "") || "/" },
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
