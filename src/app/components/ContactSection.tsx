"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  DiscordLogo,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import styles from "../../styles/pages/home.module.css";

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
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

const discordHandles = [
  { value: "@.flod", note: "" },
  { value: "@jonasjonsas", note: "most active" },
];

export default function ContactSection() {
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);
  const copiedTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  const onCopy = useCallback((handle: string) => {
    if (copiedTimeoutRef.current) {
      window.clearTimeout(copiedTimeoutRef.current);
    }

    void copyToClipboard(handle);
    setCopiedHandle(handle);
    copiedTimeoutRef.current = window.setTimeout(() => {
      setCopiedHandle(null);
      copiedTimeoutRef.current = null;
    }, 1400);
  }, []);

  return (
    <section
      className={`${styles.section} ${styles.contactSection}`}
      aria-labelledby="contact"
    >
      <div className={styles.sectionHeading}>
        <h2 className={styles.sectionTitle} id="contact">
          Have something in mind?
        </h2>
        <p className={styles.sectionText}>
          Projects, questions, strange ideas, or just a hello. My inbox is open.
        </p>
      </div>

      <div className={styles.contactLayout}>
        <a
          className={styles.contactPrimary}
          href="mailto:jonas.meuleman@icloud.com"
          aria-label="Email Jonas at jonas.meuleman@icloud.com"
        >
          <span className={styles.contactPrimaryTop}>
            <span className={styles.contactPrimaryIcon} aria-hidden="true">
              <EnvelopeSimple size={24} weight="regular" />
            </span>
            <span className={styles.contactPrimaryArrow} aria-hidden="true">
              <ArrowUpRight size={30} weight="regular" />
            </span>
          </span>

          <span className={styles.contactPrimaryBody}>
            <span className={styles.contactPrimaryLabel}>
              Start a conversation
            </span>
            <span className={styles.contactPrimaryEmail}>
              jonas.meuleman@icloud.com
            </span>
          </span>

          <span className={styles.contactPrimaryNote}>
            Best for ideas, projects, and everything in between.
          </span>
        </a>

        <div className={styles.contactSecondary}>
          <div className={styles.contactDiscord}>
            <div className={styles.contactSecondaryHeading}>
              <DiscordLogo size={22} weight="fill" aria-hidden="true" />
              <div>
                <span className={styles.contactSecondaryTitle}>
                  Prefer a quick message?
                </span>
                <span className={styles.contactSecondaryText}>
                  Copy my Discord handle
                </span>
              </div>
            </div>

            <div className={styles.contactHandles}>
              {discordHandles.map((handle) => {
                const copied = copiedHandle === handle.value;

                return (
                  <button
                    key={handle.value}
                    type="button"
                    className={styles.contactHandle}
                    onClick={() => onCopy(handle.value)}
                    aria-label={`Copy Discord handle ${handle.value}`}
                  >
                    <span>
                      {handle.value}
                      {handle.note ? (
                        <small className={styles.contactHandleNote}>
                          {handle.note}
                        </small>
                      ) : null}
                    </span>
                    <span className={styles.contactCopyIcon} aria-hidden="true">
                      {copied ? (
                        <Check size={17} weight="bold" />
                      ) : (
                        <Copy size={17} weight="regular" />
                      )}
                    </span>
                    <span className={styles.srOnly} role="status">
                      {copied ? `${handle.value} copied` : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <a
            className={styles.contactSocialLink}
            href="https://github.com/flodlol"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.contactSocialIcon} aria-hidden="true">
              <GithubLogo size={22} weight="fill" />
            </span>
            <span>
              <span className={styles.contactSocialTitle}>
                See what I&apos;m building
              </span>
              <span className={styles.contactSocialText}>github.com/flodlol</span>
            </span>
            <ArrowUpRight
              className={styles.contactSocialArrow}
              size={21}
              weight="regular"
              aria-hidden="true"
            />
          </a>

          <a
            className={styles.contactSocialLink}
            href="https://www.linkedin.com/in/jonas-meuleman-26667a39a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.contactSocialIcon} aria-hidden="true">
              <LinkedinLogo size={22} weight="fill" />
            </span>
            <span>
              <span className={styles.contactSocialTitle}>
                Let&apos;s connect
              </span>
              <span className={styles.contactSocialText}>
                linkedin.com/in/jonas-meuleman
              </span>
            </span>
            <ArrowUpRight
              className={styles.contactSocialArrow}
              size={21}
              weight="regular"
              aria-hidden="true"
            />
          </a>

          <a
            className={styles.contactWorkLink}
            href="mailto:jonas@study-track.app"
          >
            <span>
              Building with Study-Track? Write to
              <strong>jonas@study-track.app</strong>
            </span>
            <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
