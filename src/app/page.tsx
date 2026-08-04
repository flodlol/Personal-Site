import Image from "next/image";
import styles from "../styles/pages/home.module.css";
import ProjectsSection from "./components/ProjectsSection";
import PastProjectsSection from "./components/PastProjectsSection";
import ContactSection from "./components/ContactSection";
import { heroSkills } from "./content/skills";
import { heroSkillTimeline } from "./content/skill-timeline";
import SkillLogo from "./components/SkillLogo";
import HeroTimeline from "./components/HeroTimeline";
import TypingName from "./components/TypingName";

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
                </p>

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
                    GitHub <span aria-hidden="true">&#8599;</span>
                  </a>
                </div>
              </div>

            </div>

            <div className={styles.heroSkills} aria-label="Skills">
              {heroSkills.map((group) => (
                <div key={group.label} className={styles.heroSkillGroup}>
                  <span className={styles.heroSkillLabel}>{group.label}</span>
                  <ul className={styles.heroSkillList}>
                    {group.items.map((item) => (
                      <li key={item.label} className={styles.heroSkillItem}>
                        <SkillLogo
                          icon={item.icon}
                          className={styles.heroSkillIcon}
                        />
                        <span className={styles.heroSkillText}>
                          {item.label}
                        </span>
                      </li>
                    ))}
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
                © {year} Jonas. All rights reserved.
              </span>
            </div>
          </div>

          <div className={styles.footerRight}>
            <a
              className={styles.githubLink}
              href="https://github.com/flodlol"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className={styles.githubIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fill="currentColor"
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.11.81 2.235 0 1.615-.015 2.915-.015 3.31 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z"
                />
              </svg>
              <span>GitHub</span>
            </a>

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
