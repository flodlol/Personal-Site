"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, Eye } from "@phosphor-icons/react";
import styles from "../../styles/pages/home.module.css";

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;
const TICK_INTERVAL_MS = 1000;

type Stats = {
  visits: { total: number | null; uniqueToday: number | null };
  stars: {
    total: number | null;
    repos: Array<{ repo: string; stars: number | null }>;
  };
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatElapsed(startedAtMs: number, nowMs: number) {
  const totalSeconds = Math.max(
    0,
    Math.floor((nowMs - startedAtMs) / 1000),
  );
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  if (days > 0) return `${days}d ${pad(hours)}:${pad(minutes)}`;
  if (hours > 0) return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  return `${minutes}:${pad(seconds)}`;
}

export default function SiteStats() {
  const [sessionStartedAt] = useState(() => Date.now());
  const [total, setTotal] = useState<number | null>(null);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    let cancelled = false;

    const recordVisit = () => {
      try {
        fetch("/api/site-stats", {
          method: "POST",
          keepalive: true,
        }).catch(() => {});
      } catch {
        /* ignore */
      }
    };

    const loadStats = async () => {
      try {
        const response = await fetch("/api/site-stats", {
          cache: "no-store",
        });
        if (!response.ok) return;
        const data = (await response.json()) as Stats;
        if (cancelled) return;
        setTotal(data.visits.total);
      } catch {
        /* network errors are fine, footer will retry */
      }
    };

    recordVisit();
    loadStats();
    const id = window.setInterval(loadStats, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), TICK_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  const elapsed = useMemo(
    () => formatElapsed(sessionStartedAt, nowMs),
    [nowMs, sessionStartedAt],
  );

  return (
    <div className={styles.siteStats} aria-label="Site statistics">
      <span className={styles.siteStat} aria-label={`Time on this visit: ${elapsed}`}>
        <Clock size={13} weight="regular" aria-hidden="true" />
        <span className={styles.siteStatValue}>{elapsed}</span>
      </span>
      <span
        className={`${styles.siteStat} ${styles.siteStatTooltip}`}
        tabIndex={0}
        role="img"
        aria-label={`${formatNumber(total ?? 0)} site views. Tracked via a render.com API + Upstash Redis. POST /visit on each page load.`}
        data-tooltip="Tracked via a render.com API + Upstash Redis. POST /visit on each page load."
      >
        <Eye size={13} weight="regular" aria-hidden="true" />
        <span className={styles.siteStatValue}>
          {total === null ? "—" : formatNumber(total)}
        </span>
        <span className={styles.siteStatLabel}>views</span>
      </span>
    </div>
  );
}
