import Image from "next/image";
import styles from "../../styles/pages/home.module.css";
import SiteStats from "./SiteStats";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
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
            This project is open source on{" "}
            <a
              className={styles.footerLink}
              href="https://github.com/flodlol/Personal-Site"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Personal-Site source code on GitHub"
            >
              GitHub
            </a>
            .
          </span>
        </div>
      </div>
    </footer>
  );
}
