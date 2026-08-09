"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../../styles/pages/home.module.css";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export default function TypingName({
  words,
  typingMs = 90,
  deletingMs = 55,
  pauseMs = 900,
}: {
  words: string[];
  typingMs?: number;
  deletingMs?: number;
  pauseMs?: number;
}) {
  const sanitizedWords = useMemo(
    () => words.map((w) => w.trim()).filter(Boolean),
    [words],
  );

  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(sanitizedWords[0] ?? "");
  const timerRef = useRef<number | null>(null);
  const wordIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const valueRef = useRef(value);

  useEffect(() => {
    if (sanitizedWords.length === 0) return;
    valueRef.current = sanitizedWords[0] ?? "";
    setValue(valueRef.current);
    wordIndexRef.current = 0;
    isDeletingRef.current = false;
  }, [sanitizedWords]);

  useEffect(() => {
    if (sanitizedWords.length === 0) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);

    if (prefersReducedMotion) {
      valueRef.current = sanitizedWords[0] ?? "";
      setValue(valueRef.current);
      return;
    }

    const setValueBoth = (next: string) => {
      valueRef.current = next;
      setValue(next);
    };

    const schedule = (delay: number) => {
      timerRef.current = window.setTimeout(tick, delay);
    };

    const tick = () => {
      const word = sanitizedWords[wordIndexRef.current % sanitizedWords.length];
      const current = valueRef.current;

      if (!isDeletingRef.current) {
        if (current.length < word.length) {
          setValueBoth(word.slice(0, current.length + 1));
          schedule(typingMs);
          return;
        }

        isDeletingRef.current = true;
        schedule(pauseMs);
        return;
      }

      if (current.length > 0) {
        setValueBoth(word.slice(0, current.length - 1));
        schedule(deletingMs);
        return;
      }

      isDeletingRef.current = false;
      wordIndexRef.current = (wordIndexRef.current + 1) % sanitizedWords.length;
      schedule(250);
    };

    schedule(pauseMs);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [deletingMs, pauseMs, prefersReducedMotion, sanitizedWords, typingMs]);

  const accessibleName = sanitizedWords.join(", also known as ");
  const displayValue = prefersReducedMotion ? (sanitizedWords[0] ?? "") : value;

  return (
    <>
      <span className={styles.typingName} aria-hidden="true">
        <span>{displayValue}</span>
        {prefersReducedMotion ? null : (
          <span className={styles.typingCursor}>|</span>
        )}
      </span>
      <span className={styles.srOnly}>{accessibleName}</span>
    </>
  );
}
