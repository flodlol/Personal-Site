import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import styles from "../styles/pages/home.module.css";
import ProjectsSection from "./components/ProjectsSection";
import PastProjectsSection from "./components/PastProjectsSection";
import ContactSection from "./components/ContactSection";
import { heroSkills } from "./content/skills";
import { heroSkillTimeline } from "./content/skill-timeline";
import SkillLogo from "./components/SkillLogo";
import HeroTimeline from "./components/HeroTimeline";
import TypingName from "./components/TypingName";
import SiteStats from "./components/SiteStats";

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a
          className={styles.brand}
          href="#top"
          aria-label="flodlol, back to top"
        >
          <span className={styles.brandLogoFrame} aria-hidden="true">
            <Image
              className={styles.brandLogo}
              src="/flod-banner.png"
              alt=""
              width={4338}
              height={4050}
              priority
            />
          </span>
        </a>
        <nav className={styles.nav} aria-label="Primary">
          <a href="#current-projects">Projects</a>
          <a href="#timeline">Timeline</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero} id="top">
          <div className={styles.heroContent}>
            <div className={styles.heroLayout}>
              <div className={styles.heroCopy}>
                <h1 className={styles.heroTitle}>
                  Hi, I&apos;m{" "}
                  <TypingName
                    words={["Jonas", "flodlol"]}
                    typingMs={200}
                    deletingMs={140}
                    pauseMs={1800}
                  />
                </h1>

                <p className={styles.heroSubtitle}>
                  Industrial Engineering student at KU Leuven.
                  <br />I build webapps and tools on the side.
                  <br />Solo founder of{" "}
                  <a
                    className={styles.heroSubtitleLink}
                    href="https://study-track.app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Study-Track
                  </a>
                  .
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
        <PastProjectsSection />

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

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <Image
              className={styles.calypsoLogo}
              src="/calypso-logo.png"
              alt=""
              width={28}
              height={28}
            />
            <div className={styles.footerLeftText}>
              <span className={styles.footerText}>
                A Calypso Inc. production.
              </span>
              <span className={styles.footerText}>
                © {year} Jonas Meuleman. All rights reserved.
              </span>
            </div>
          </div>

          <div className={styles.footerRight}>
            <SiteStats />
            <span className={styles.footerText}>
              This project is open source, view it{" "}
              <a
                className={styles.footerLink}
                href="https://github.com/flodlol/Personal-Site"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
