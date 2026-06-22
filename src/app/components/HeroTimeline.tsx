"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "../../styles/pages/home.module.css";
import type { SkillTimelineItem } from "../content/skill-timeline";
import SkillLogo from "./SkillLogo";

export default function HeroTimeline({
  items,
}: {
  items: SkillTimelineItem[];
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const nodes = Array.from(
      element.querySelectorAll<HTMLElement>("[data-timeline-item]"),
    );
    if (nodes.length === 0) return;

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    let rafId: number | null = null;

    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
    const ease = (t: number) => t * t * (3 - 2 * t);

    const update = () => {
      rafId = null;
      const vh = window.innerHeight || 1;

      // Enter from bottom -> fully visible in mid band -> exit at top.
      const enterStart = vh * 0.92;
      const enterEnd = vh * 0.62;
      const exitStart = vh * 0.28;
      const exitEnd = vh * -0.08;

      const enterDenom = Math.max(1, enterStart - enterEnd);
      const exitDenom = Math.max(1, exitStart - exitEnd);

      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        const enter = clamp01((enterStart - rect.top) / enterDenom);
        const exit = clamp01((rect.bottom - exitEnd) / exitDenom);
        const progress = Math.min(enter, exit);
        const t = prefersReducedMotion ? 1 : ease(progress);
        node.style.setProperty("--t", `${t.toFixed(3)}`);
      }
    };

    const requestUpdate = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (rafId != null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  if (!items.length) return null;

  return (
    <div ref={rootRef} className={styles.timelineWrap} aria-label="Timeline">
      <ol className={styles.timeline}>
        {items.map((item, index) => {
          const isContentLeft = index % 2 === 1;

          return (
            <li
              key={`${item.when}-${item.label}`}
              className={styles.timelineItem}
              data-timeline-item
              data-side={isContentLeft ? "left" : "right"}
            >
              <div className={styles.timelineSlot}>
                {isContentLeft ? (
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineTitle}>{item.label}</div>
                    {item.note ? (
                      <div className={styles.timelineBody}>{item.note}</div>
                    ) : null}
                  </div>
                ) : (
                  <div className={styles.timelineOpposite}>{item.when}</div>
                )}
              </div>

              <div className={styles.timelineSeparator} aria-hidden="true">
                {index === 0 ? null : (
                  <span className={styles.timelineConnector} />
                )}
                <span
                  className={styles.timelineDot}
                  data-icon={item.icon ?? ""}
                  data-theme={item.dotTheme ?? ""}
                  data-multi={item.dotIcons?.length ? "true" : ""}
                >
                  {item.dotImage ? (
                    <Image
                      className={styles.timelineDotImg}
                      src={item.dotImage.src}
                      alt={item.dotImage.alt}
                      width={item.dotImage.width}
                      height={item.dotImage.height}
                    />
                  ) : item.dotIcons?.length ? (
                    <span
                      className={styles.timelineDotIcons}
                      aria-hidden="true"
                    >
                      {item.dotIcons.map((icon) => (
                        <span key={icon} data-icon={icon}>
                          <SkillLogo
                            icon={icon}
                            className={styles.timelineDotIcon}
                          />
                        </span>
                      ))}
                    </span>
                  ) : item.icon ? (
                    <SkillLogo
                      icon={item.icon}
                      className={styles.timelineDotIcon}
                    />
                  ) : null}
                </span>
                {index === items.length - 1 ? null : (
                  <span className={styles.timelineConnector} />
                )}
              </div>

              <div className={styles.timelineSlot}>
                {isContentLeft ? (
                  <div className={styles.timelineOpposite}>{item.when}</div>
                ) : (
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineTitle}>{item.label}</div>
                    {item.note ? (
                      <div className={styles.timelineBody}>{item.note}</div>
                    ) : null}
                  </div>
                )}
              </div>
            </li>
          );
        })}
        <li className={styles.timelineEnd} aria-hidden="true">
          more to learn, more to do ...
        </li>
      </ol>
    </div>
  );
}
