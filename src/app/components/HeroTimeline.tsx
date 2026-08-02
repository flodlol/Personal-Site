import Image from "next/image";
import {
  ArrowUpRight,
  BracketsCurly,
  Stack,
} from "@phosphor-icons/react/dist/ssr";
import styles from "../../styles/pages/home.module.css";
import type { SkillTimelineItem } from "../content/skill-timeline";
import SkillLogo from "./SkillLogo";

const fallbackIcons = {
  code: BracketsCurly,
  projects: Stack,
};

export default function HeroTimeline({
  items,
}: {
  items: SkillTimelineItem[];
}) {
  if (!items.length) return null;

  return (
    <div className={styles.timelineWrap} aria-label="Timeline">
      <ol className={styles.timeline}>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          const isContentLeft = index % 2 === 1;
          const FallbackIcon = item.fallbackIcon
            ? fallbackIcons[item.fallbackIcon]
            : null;

          return (
            <li
              key={`${item.when}-${item.label}`}
              className={styles.timelineItem}
              data-current={isCurrent ? "true" : undefined}
              data-side={isContentLeft ? "left" : "right"}
              data-gap={item.gapAfter}
            >
              <time className={styles.timelineWhen}>{item.when}</time>

              <div className={styles.timelineTrack} aria-hidden="true">
                <span
                  className={styles.timelineNode}
                  data-icon={item.icon ?? ""}
                  data-theme={item.dotTheme ?? ""}
                  data-multi={item.dotIcons?.length ? "true" : ""}
                >
                  {item.dotImage ? (
                    <Image
                      className={styles.timelineNodeImg}
                      src={item.dotImage.src}
                      alt={item.dotImage.alt}
                      width={item.dotImage.width}
                      height={item.dotImage.height}
                    />
                  ) : item.dotIcons?.length ? (
                    <span className={styles.timelineNodeIcons}>
                      {item.dotIcons.map((icon) => (
                        <span key={icon} data-icon={icon}>
                          <SkillLogo
                            icon={icon}
                            className={styles.timelineNodeIcon}
                          />
                        </span>
                      ))}
                    </span>
                  ) : item.icon ? (
                    <SkillLogo
                      icon={item.icon}
                      className={styles.timelineNodeIcon}
                    />
                  ) : FallbackIcon ? (
                    <FallbackIcon
                      className={styles.timelineNodeIcon}
                      weight="regular"
                    />
                  ) : null}
                </span>
              </div>

              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>{item.label}</h3>
                {item.note ? (
                  <p className={styles.timelineBody}>{item.note}</p>
                ) : null}
              </div>
            </li>
          );
        })}

        <li
          className={`${styles.timelineItem} ${styles.timelineFuture}`}
          data-side="left"
        >
          <span className={styles.timelineWhen}>Future</span>

          <div className={styles.timelineTrack} aria-hidden="true">
            <span
              className={`${styles.timelineNode} ${styles.timelineFutureNode}`}
            >
              <ArrowUpRight
                className={styles.timelineNodeIcon}
                weight="regular"
              />
            </span>
          </div>

          <blockquote
            className={`${styles.timelineContent} ${styles.timelineFutureQuote}`}
          >
            “Still figuring it out.”
          </blockquote>
        </li>
      </ol>
    </div>
  );
}
