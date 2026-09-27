// GitHub Pages has no SPA fallback: copy index.html into each route folder so deep links load with a 200.
import { copyFileSync, mkdirSync } from "node:fs";

const routes = ["customers", "settings", "pro"];
for (const route of routes) {
  mkdirSync(`dist/${route}`, { recursive: true });
  copyFileSync("dist/index.html", `dist/${route}/index.html`);
}
copyFileSync("dist/index.html", "dist/404.html");
console.log(`SPA routes: ${routes.join(", ")} + 404.html`);
