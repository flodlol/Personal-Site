import type { ReactNode } from "react";

type BrowserWindowProps = {
  children: ReactNode;
  title?: string;
  url?: string;
  className?: string;
};

export function BrowserWindow({
  children,
  title,
  url,
  className = "",
}: BrowserWindowProps) {
  return (
    <div className={`browser-window ${className}`}>
      <div className="browser-toolbar">
        <div className="browser-traffic-lights" aria-hidden="true">
          <span className="browser-dot browser-dot-red" />
          <span className="browser-dot browser-dot-yellow" />
          <span className="browser-dot browser-dot-green" />
        </div>

        {url && (
          <div className="browser-address">
            <span>{url}</span>
          </div>
        )}

        {title && <div className="browser-title">{title}</div>}
      </div>

      <div className="browser-content">{children}</div>
    </div>
  );
}