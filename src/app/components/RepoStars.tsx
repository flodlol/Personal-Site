"use client";

import { useEffect, useState } from "react";
import { Star } from "@phosphor-icons/react";
import styles from "../../styles/pages/home.module.css";

function formatStars(stars: number) {
  return new Intl.NumberFormat("en-US").format(stars);
}

export default function RepoStars({
  repo,
  className,
}: {
  repo: string;
  className?: string;
}) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
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
    <span
      className={`${styles.repoStars}${className ? ` ${className}` : ""}`}
      aria-label={
        stars === null ? "Loading star count" : `${formatStars(stars)} stars`
      }
    >
      <Star size={12} weight="regular" aria-hidden="true" />
      <span>{stars === null ? "—" : formatStars(stars)}</span>
    </span>
  );
}
