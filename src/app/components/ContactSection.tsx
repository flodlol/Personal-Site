"use client";

import { useCallback, useRef, useState } from "react";
import styles from "../../styles/pages/home.module.css";

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    // Fallback for older browsers / permission issues
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}

export default function ContactSection() {
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);
  const copiedTimeoutRef = useRef<number | null>(null);

  const onCopy = useCallback((handle: string) => {
    if (copiedTimeoutRef.current) {
      window.clearTimeout(copiedTimeoutRef.current);
      copiedTimeoutRef.current = null;
    }

    void copyToClipboard(handle);
    setCopiedHandle(handle);
    copiedTimeoutRef.current = window.setTimeout(() => {
      setCopiedHandle(null);
      copiedTimeoutRef.current = null;
    }, 1200);
  }, []);

  return (
    <section
      className={`${styles.section} ${styles.contactSection}`}
      aria-labelledby="contact"
    >
      <div className={styles.sectionHeading}>
        <div>
          <h2 className={styles.sectionTitle} id="contact">
            Get in touch
          </h2>
          <p className={styles.sectionText}>The easiest ways to reach me.</p>
        </div>
      </div>

      <div className={styles.contactGrid}>
        <a
          className={styles.contactItem}
          href="mailto:jonas.meuleman@icloud.com"
        >
          <span className={styles.contactIconWrap} aria-hidden="true">
            <svg
              className={styles.contactIconStroke}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </span>
          <div className={styles.contactText}>
            <div className={styles.contactLabel}>Personal email</div>
            <div className={styles.contactValue}>jonas.meuleman@icloud.com</div>
          </div>
        </a>

        <a className={styles.contactItem} href="mailto:jonas@study-track.app">
          <span className={styles.contactIconWrap} aria-hidden="true">
            <svg
              className={styles.contactIconStroke}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </span>
          <div className={styles.contactText}>
            <div className={styles.contactLabel}>Work email</div>
            <div className={styles.contactValue}>jonas@study-track.app</div>
          </div>
        </a>

        <div className={styles.contactItem} aria-label="Discord">
          <span className={styles.contactIconWrap} aria-hidden="true">
            <svg
              className={styles.contactIconFill}
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M19.54 5.31A17.06 17.06 0 0 0 15.4 4c-.2.36-.43.84-.59 1.22a16.09 16.09 0 0 0-4.63 0A12.42 12.42 0 0 0 9.6 4a16.55 16.55 0 0 0-4.15 1.31C2.83 9.18 2.11 12.94 2.47 16.65A16.7 16.7 0 0 0 7.3 19c.38-.52.72-1.08 1-1.67-.55-.2-1.08-.45-1.58-.75.13-.1.26-.21.38-.32 3.05 1.41 6.36 1.41 9.38 0 .12.11.25.22.38.32-.5.3-1.03.55-1.58.75.28.59.62 1.15 1 1.67a16.7 16.7 0 0 0 4.83-2.35c.44-4.3-.72-8.03-2.96-11.99ZM9.1 14.8c-.9 0-1.63-.83-1.63-1.85S8.2 11.1 9.1 11.1c.91 0 1.64.84 1.63 1.85 0 1.02-.72 1.85-1.63 1.85Zm5.8 0c-.9 0-1.63-.83-1.63-1.85s.73-1.85 1.63-1.85c.91 0 1.64.84 1.63 1.85 0 1.02-.72 1.85-1.63 1.85Z"
              />
            </svg>
          </span>
          <div className={styles.contactText}>
            <div className={styles.contactLabel}>Discord</div>
            <div className={styles.contactValueInline}>
              <span className={styles.contactHandleWrap}>
                <button
                  type="button"
                  className={styles.contactHandle}
                  onClick={() => onCopy("@.flod")}
                >
                  @.flod
                </button>
                <span className={styles.contactTooltipBottom} role="tooltip">
                  <span className={styles.contactTooltipAction}>
                    {copiedHandle === "@.flod" ? "copied" : "copy"}
                  </span>
                </span>
              </span>
              <span className={styles.contactDivider}>/</span>
              <span className={styles.contactHandleWrap}>
                <button
                  type="button"
                  className={styles.contactHandle}
                  onClick={() => onCopy("@jonasjonsas")}
                >
                  @jonasjonsas
                </button>
                <span className={styles.contactTooltipBottom} role="tooltip">
                  <span className={styles.contactTooltipAction}>
                    {copiedHandle === "@jonasjonsas" ? "copied" : "copy"}
                  </span>
                  <span className={styles.contactTooltipHint}>most active</span>
                </span>
              </span>
            </div>
          </div>
        </div>

        <a
          className={styles.contactItem}
          href="https://github.com/flodlol"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.contactIconWrap} aria-hidden="true">
            <svg
              className={styles.contactIconFill}
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.11.81 2.235 0 1.615-.015 2.915-.015 3.31 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z"
              />
            </svg>
          </span>
          <div className={styles.contactText}>
            <div className={styles.contactLabel}>GitHub</div>
            <div className={styles.contactValue}>github.com/flodlol</div>
          </div>
        </a>
      </div>
    </section>
  );
}
