import type { Metadata } from "next";
import Link from "next/link";
import { CaretRight, House } from "@phosphor-icons/react/dist/ssr";
import styles from "../../styles/pages/home.module.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ProjectCards from "../components/ProjectCards";
import SkillLogo from "../components/SkillLogo";
import {
  currentProjects,
  pastProjects,
  smallerPythonProjects,
} from "../content/projects";

export const metadata: Metadata = {
  title: "All projects | Jonas",
  description:
    "Every project by Jonas Meuleman (flodlol): Study-Track, Hand-Outs, Statics NVM, Clowbie, Tag-Timeline and a few Python tools.",
};

export default function ProjectsPage() {
  return (
    <div className={styles.container}>
      <SiteHeader active="projects" />

      <main className={styles.main}>
        <section className={styles.pageHero}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <ol className={styles.breadcrumbsList}>
              <li className={styles.breadcrumbItem}>
                <Link className={styles.breadcrumbLink} href="/">
                  <House size={15} weight="regular" aria-hidden="true" />
                  Home
                </Link>
              </li>
              <li className={styles.breadcrumbItem} aria-current="page">
                <CaretRight
                  className={styles.breadcrumbSeparator}
                  size={13}
                  weight="bold"
                  aria-hidden="true"
                />
                <span className={styles.breadcrumbCurrent}>Projects</span>
              </li>
            </ol>
          </nav>

          <h1 className={styles.pageTitle}>All projects</h1>
          <p className={styles.pageText}>
            Every project I&apos;ve built, from the products I run today
            <br />
            to the experiments that taught me something.
          </p>
        </section>

        <section
          className={styles.projectsArchiveSection}
          aria-labelledby="current-projects"
        >
          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle} id="current-projects">
              Current
            </h2>
            <p className={styles.sectionText}>
              What I&apos;m building and running right now.
            </p>
          </div>
          <ProjectCards projects={currentProjects} />
        </section>

        <section
          className={styles.projectsArchiveSection}
          aria-labelledby="past-projects"
        >
          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle} id="past-projects">
              Past projects
            </h2>
            <p className={styles.sectionText}>
              Things I shipped and learned from.
            </p>
          </div>
          <ProjectCards projects={pastProjects} hideLogos />

          <details className={styles.pythonProjectsSection}>
            <summary className={styles.pythonProjectsSummary}>
              <span className={styles.pythonProjectsSummaryContent}>
                <SkillLogo
                  icon="python"
                  className={styles.pythonProjectsInlineIcon}
                />
                <span className={styles.pythonProjectsTitle}>
                  Smaller Python Projects
                </span>
              </span>
              <svg
                className={styles.pythonProjectsChevron}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5.25 7.75L10 12.5l4.75-4.75"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>
            <div className={styles.pythonProjectsBody}>
              <ProjectCards projects={smallerPythonProjects} compact hideLogos />
            </div>
          </details>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
