"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import styles from "../../styles/pages/home.module.css";

type PreviewData = {
  ok: true;
  title: string | null;
  description: string | null;
  image: string | null;
  favicon: string | null;
  hostname: string | null;
  url: string | null;
};

const cache = new Map<string, PreviewData | null>();

export default function LinkPreview({
  href,
  className,
  image,
  children,
}: {
  href: string;
  className?: string;
  image?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<PreviewData | null>(
    () => cache.get(href) ?? null,
  );
  const [loading, setLoading] = useState(false);

  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const load = useCallback(() => {
    if (cache.has(href)) {
      setData(cache.get(href) ?? null);
      return;
    }
    if (loading) return;

    setLoading(true);
    abortRef.current = new AbortController();

    fetch(`/api/preview?url=${encodeURIComponent(href)}`, {
      signal: abortRef.current.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((json) => {
        const preview =
          json && typeof json === "object" && json.ok
            ? (json as PreviewData)
            : null;
        cache.set(href, preview);
        setData(preview);
      })
      .catch(() => {
        cache.set(href, null);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [href, loading]);

  const openCard = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    openTimerRef.current = window.setTimeout(() => {
      setOpen(true);
      load();
    }, 140);
  }, [load]);

  const closeCard = useCallback(() => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      abortRef.current?.abort();
    }, 120);
  }, []);

  useEffect(() => {
    return () => {
      clearTimers();
      abortRef.current?.abort();
    };
  }, [clearTimers]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const hostname = data?.hostname ?? null;
  const label = hostname ?? "link";
  const previewImage = image ?? data?.image ?? null;

  return (
    <span
      className={styles.linkPreview}
      onMouseEnter={openCard}
      onMouseLeave={closeCard}
      onFocus={openCard}
      onBlur={closeCard}
    >
      <a
        className={`${styles.linkPreviewAnchor}${
          className ? ` ${className}` : ""
        }`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>

      <span
        className={`${styles.linkPreviewCard}${
          open ? ` ${styles.linkPreviewCardOpen}` : ""
        }`}
        aria-hidden="true"
      >
        {previewImage ? (
          <span className={styles.linkPreviewMedia}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewImage}
              alt=""
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </span>
        ) : null}

        <span className={styles.linkPreviewBody}>
          <span className={styles.linkPreviewTitle}>
            {loading && !data ? "Loading preview…" : data?.title ?? label}
          </span>
          {data?.description ? (
            <span className={styles.linkPreviewDescription}>
              {data.description}
            </span>
          ) : null}
          <span className={styles.linkPreviewMeta}>
            {data?.favicon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className={styles.linkPreviewFavicon}
                src={data.favicon}
                alt=""
                referrerPolicy="no-referrer"
              />
            ) : null}
            {label}
          </span>
        </span>
      </span>
    </span>
  );
}
