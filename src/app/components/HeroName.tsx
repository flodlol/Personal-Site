"use client";

import { useState } from "react";
import styles from "../../styles/pages/home.module.css";

export default function HeroName() {
  const [hasWaved, setHasWaved] = useState(false);

  const handleEnter = () => {
    if (!hasWaved) setHasWaved(true);
  };

  return (
    <span
      className={styles.typingName}
      tabIndex={0}
      onMouseEnter={handleEnter}
      onFocus={handleEnter}
    >
      Jonas
      <span
        className={styles.wave}
        aria-hidden="true"
        data-waved={hasWaved ? "true" : "false"}
      >
        <span className={styles.waveInner}>👋</span>
      </span>
    </span>
  );
}
