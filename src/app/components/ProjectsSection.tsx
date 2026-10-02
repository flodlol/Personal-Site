import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import styles from "../../styles/pages/home.module.css";
import { currentProjects } from "../content/projects";
import ProjectCards from "./ProjectCards";

export default function ProjectsSection() {
  return (
    <section
      className={`${styles.section} ${styles.currentProjects}`}
      aria-labelledby="current-projects"
    >
      <div className={`${styles.sectionHeading} ${styles.sectionHeadingSplit}`}>
        <div>
          <h2 className={styles.sectionTitle} id="current-projects">
            Selected work
          </h2>
          <p className={styles.sectionText}>What I&apos;m building right now.</p>
        </div>
        <a className={styles.sectionHeadingLink} href="/projects">
          All projects
          <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
        </a>
      </div>
      <ProjectCards projects={currentProjects} />
    </section>
  );
}
