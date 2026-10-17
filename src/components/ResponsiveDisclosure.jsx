import { useMobileLayout } from "../hooks/usePerformanceMode";

// Native disclosure expands the page itself; it never adds a vertical scroller.
export default function ResponsiveDisclosure({ label, children }) {
  const mobile = useMobileLayout();
  return mobile ? (
    <details className="mobile-disclosure">
      <summary>{label}<span className="disclosure-mark" aria-hidden="true" /></summary>
      <div className="disclosure-content">{children}</div>
    </details>
  ) : children;
}
