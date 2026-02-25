"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "../../styles/pages/home.module.css";

function formatStars(stars: number) {
  return new Intl.NumberFormat(undefined, { notation: "compact" }).format(stars);
}

export default function GithubStarsButton({
  repo,
  href,
  className,
}: {
  repo: string;
  href?: string;
  className?: string;
}) {
  const [stars, setStars] = useState<number | null>(null);

  const githubHref = useMemo(() => href ?? `https://github.com/${repo}`, [href, repo]);

  useEffect(() => {
    if (!repo) return;

    const controller = new AbortController();
    const load = async () => {
      try {
        const response = await fetch(
          `/api/github/stars?repo=${encodeURIComponent(repo)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          setStars(null);
          return;
        }

        const data: unknown = await response.json();
        if (
          typeof data === "object" &&
          data !== null &&
          "stars" in data &&
          typeof (data as { stars?: unknown }).stars === "number"
        ) {
          setStars((data as { stars: number }).stars);
          return;
        }

        setStars(null);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStars(null);
      }
    };

    load();

    return () => controller.abort();
  }, [repo]);

  return (
    <a
      className={`${styles.githubStarsButton}${className ? ` ${className}` : ""}`}
      href={githubHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => event.stopPropagation()}
    >
      <svg
        className={styles.githubStarsIcon}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="currentColor"
          d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z"
        />
      </svg>
      <span className={styles.githubStarsText}>GitHub Stars</span>
      {typeof stars === "number" ? (
        <span className={styles.githubStarsCount}>{formatStars(stars)}</span>
      ) : null}
    </a>
  );
}
