import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import styles from "../styles/pages/home.module.css";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import { heroSkills } from "./content/skills";
import { heroSkillTimeline } from "./content/skill-timeline";
import SkillLogo from "./components/SkillLogo";
import HeroTimeline from "./components/HeroTimeline";
import HeroName from "./components/HeroName";
import LinkPreview from "./components/LinkPreview";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  return (
    <div className={styles.container}>
      <SiteHeader home />

      <main className={styles.main}>
        <section className={styles.hero} id="top">
          <div className={styles.heroContent}>
            <div className={styles.heroLayout}>
              <div className={styles.heroCopy}>
                <h1 className={styles.heroTitle}>
                  Hi, I&apos;m{" "}
                  <HeroName />
                </h1>

                <p className={styles.heroSubtitle}>
                  <strong className={styles.heroSubtitleStrong}>
                    Industrial Engineering
                  </strong>{" "}
                  student at{" "}
                  <LinkPreview
                    className={styles.heroSubtitleLink}
                    href="https://iiw.kuleuven.be/english/index.html"
                  >
                    KU Leuven
                  </LinkPreview>
                  , option{" "}
                  <strong className={styles.heroSubtitleStrong}>
                    Electromechanics
                  </strong>
                  .
                  <br />I build webapps and tools people actually use.
                </p>

                <p className={styles.heroBlurb}>
                  Solo founder of{" "}
                  <LinkPreview
                    className={styles.heroSubtitleLink}
                    href="https://study-track.app"
                    image="/study-track/og-home.png"
                  >
                    Study-Track
                  </LinkPreview>
                  , the study app that just crossed 10k users. I&apos;m the whole
                  team: product, engineering, support, and marketing. When
                  I&apos;m not shipping, I&apos;m writing code for fun, and
                  breaking things on purpose to learn how they work.
                </p>
                <span className={styles.srOnly}>
                  Jonas Meuleman, also known online as flodlol.
                </span>

                <div className={styles.heroActions}>
                  <a className={styles.heroPrimaryAction} href="#current-projects">
                    Browse projects
                  </a>
                  <a
                    className={styles.heroSecondaryAction}
                    href="https://github.com/flodlol"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub <ArrowUpRight size={15} weight="regular" aria-hidden="true" />
                  </a>
                </div>
              </div>

            </div>

            <div className={styles.heroSkills} aria-label="Skills">
              {heroSkills.map((group) => (
                <div key={group.label} className={styles.heroSkillGroup}>
                  <span className={styles.heroSkillLabel}>{group.label}</span>
                  <ul className={styles.heroSkillList}>
                    {group.items.map((item) => {
                      const content = (
                        <>
                          <SkillLogo
                            icon={item.icon}
                            className={styles.heroSkillIcon}
                          />
                          <span className={styles.heroSkillText}>
                            {item.label}
                          </span>
                        </>
                      );
                      return (
                        <li key={item.label} className={styles.heroSkillItem}>
                          {item.url ? (
                            <a
                              className={styles.heroSkillLink}
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {content}
                            </a>
                          ) : (
                            <span className={styles.heroSkillLink}>
                              {content}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProjectsSection />

        <section
          className={`${styles.section} ${styles.timelineSection}`}
          aria-labelledby="timeline"
        >
          <div className={styles.timelineLayout}>
            <div className={`${styles.sectionHeading} ${styles.timelineHeading}`}>
              <h2 className={styles.sectionTitle} id="timeline">
                How I got here
              </h2>
              <p className={styles.sectionText}>
                A short history of learning by building.
              </p>
            </div>
            <HeroTimeline items={heroSkillTimeline} />
          </div>
        </section>

        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
