import { Link } from "react-router";
import { buttonClasses } from "../components/ui/Button";

export function NotFound() {
  return (
    <div className="flex flex-col items-center py-24 text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Page not found</h1>
      <p className="mt-2 text-sm text-muted">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className={buttonClasses("primary", "md", "mt-6")}>
        Back to overview
      </Link>
    </div>
  );
}
