import styles from "../../styles/pages/home.module.css";
import { currentProjects } from "../content/projects";
import ProjectCards from "./ProjectCards";

export default function ProjectsSection() {
  return (
    <section
      className={`${styles.section} ${styles.currentProjects}`}
      aria-labelledby="current-projects"
    >
      <div className={styles.sectionHeading}>
        <div>
          <h2 className={styles.sectionTitle} id="current-projects">
            Selected work
          </h2>
          <p className={styles.sectionText}>Things I&apos;m working on now.</p>
        </div>
      </div>
      <ProjectCards projects={currentProjects} />
    </section>
  );
}
