"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, Eye } from "@phosphor-icons/react";
import styles from "../../styles/pages/home.module.css";

const STATS_API_URL =
  process.env.NEXT_PUBLIC_STATS_API_URL ?? "https://flodlol-stats.onrender.com";

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;
const TICK_INTERVAL_MS = 1000;

type Stats = {
  visits: { total: number; uniqueToday: number; since: string | null };
  stars: { total: number; repos: Array<{ repo: string; stars: number | null }> };
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatElapsed(sinceIso: string | null, nowMs: number) {
  if (!sinceIso) return "—";
  const sinceMs = new Date(sinceIso).getTime();
  if (Number.isNaN(sinceMs)) return "—";
  const totalSeconds = Math.max(0, Math.floor((nowMs - sinceMs) / 1000));
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
  const [since, setSince] = useState<string | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    let cancelled = false;

    const recordVisit = () => {
      try {
        fetch(`${STATS_API_URL}/visit`, {
          method: "POST",
          keepalive: true,
        }).catch(() => {});
      } catch {
        /* ignore */
      }
    };

    const loadStats = async () => {
      try {
        const response = await fetch(`${STATS_API_URL}/stats`, {
          cache: "no-store",
        });
        if (!response.ok) return;
        const data = (await response.json()) as Stats;
        if (cancelled) return;
        setSince(data.visits.since);
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
    if (!since) return;
    const id = window.setInterval(() => setNowMs(Date.now()), TICK_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [since]);

  const elapsed = useMemo(
    () => formatElapsed(since, nowMs),
    [since, nowMs],
  );

  return (
    <div className={styles.siteStats} aria-label="Site statistics">
      <span className={styles.siteStat}>
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

