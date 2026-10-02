import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/pages/home.module.css";

export default function SiteHeader({
  home = false,
  active,
}: {
  home?: boolean;
  active?: "projects";
}) {
  const section = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <header className={styles.header}>
      <a
        className={styles.brand}
        href={home ? "#top" : "/"}
        aria-label="flodlol, back to home"
      >
        <span className={styles.brandLogoFrame} aria-hidden="true">
          <Image
            className={styles.brandLogo}
            src="/flod-banner-header.webp"
            alt=""
            width={256}
            height={239}
            unoptimized
            priority
          />
        </span>
      </a>
      <nav className={styles.nav} aria-label="Primary">
        <Link
          href="/projects"
          data-active={active === "projects" ? "true" : undefined}
          aria-current={active === "projects" ? "page" : undefined}
        >
          Projects
        </Link>
        <a href={section("timeline")}>Timeline</a>
        <a href={section("contact")}>Contact</a>
      </nav>
    </header>
  );
}
