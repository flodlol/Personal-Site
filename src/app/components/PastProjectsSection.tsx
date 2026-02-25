import styles from "../../styles/pages/home.module.css";
import {
  designProjects,
  pastProjects,
  smallerPythonProjects,
} from "../content/projects";
import ProjectCards from "./ProjectCards";
import SkillLogo from "./SkillLogo";

export default function PastProjectsSection() {
  return (
    <section className={styles.section} aria-labelledby="past-projects">
      <h2 className={styles.sectionTitle} id="past-projects">
        Past / Other projects
      </h2>
      <p className={styles.sectionText}>
        A few older things I&apos;ve built and learned from.
      </p>

      <ProjectCards projects={pastProjects} />

      <details className={styles.pythonProjectsSection}>
        <summary className={styles.pythonProjectsSummary}>
          <span className={styles.pythonProjectsSummaryContent}>
            <span className={styles.pythonProjectsIcon} aria-hidden="true">
              <SkillLogo
                icon="python"
                className={styles.pythonProjectsIconMark}
              />
            </span>
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
          <ProjectCards projects={smallerPythonProjects} />
        </div>
      </details>

      <div className={styles.pastDesign}>
        <h3 className={styles.subsectionTitle}>Design</h3>
        <ProjectCards projects={designProjects} variant="design" />
      </div>
    </section>
  );
}
