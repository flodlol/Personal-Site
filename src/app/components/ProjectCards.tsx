"use client";

import { ArrowUpRight, X } from "@phosphor-icons/react";
import Image from "next/image";
import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import styles from "../../styles/pages/home.module.css";
import type { Project, ProjectModalContentBlock } from "../content/projects";
import RepoStars from "./RepoStars";

type NativeViewTransition = {
  finished: Promise<unknown>;
  ready?: Promise<unknown>;
};

type LightboxImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type TransitionDocument = {
  startViewTransition?: (update: () => void) => NativeViewTransition;
};

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function formatStack(stack?: Project["stack"]) {
  if (!stack) return null;
  return Array.isArray(stack) ? stack.join(" + ") : stack;
}

function formatLinkDomain(link: { href: string; label: string }) {
  try {
    const hostname = new URL(link.href).hostname.replace(/^www\./, "");
    return hostname === "github.com" ? "GitHub" : hostname;
  } catch {
    return link.label;
  }
}

function isSafeLinkHref(href: string) {
  if (href.startsWith("/")) return true;

  try {
    const url = new URL(href);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return href.startsWith("mailto:");
  }
}

function shouldUseNativeTransition() {
  const transitionDocument = document as unknown as TransitionDocument;
  return Boolean(
    transitionDocument.startViewTransition &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
}

function renderParagraphText(text: string) {
  const renderLinks = (chunk: string) => {
    const parts: React.ReactNode[] = [];
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null = null;

    while ((match = linkRegex.exec(chunk))) {
      const [fullMatch, label, href] = match;
      const startIndex = match.index;

      if (startIndex > lastIndex) {
        parts.push(chunk.slice(lastIndex, startIndex));
      }

      if (label && href && isSafeLinkHref(href)) {
        parts.push(
          <a
            key={`${href}-${startIndex}`}
            className={styles.modalInlineLink}
            href={href}
            target={href.startsWith("/") ? undefined : "_blank"}
            rel={href.startsWith("/") ? undefined : "noopener noreferrer"}
          >
            {label}
          </a>,
        );
      } else {
        parts.push(fullMatch);
      }

      lastIndex = startIndex + fullMatch.length;
    }

    if (lastIndex < chunk.length) {
      parts.push(chunk.slice(lastIndex));
    }

    return parts;
  };

  const nodes: React.ReactNode[] = [];
  const codeRegex = /`([^`]+)`/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null = null;

  while ((match = codeRegex.exec(text))) {
    const [fullMatch, code] = match;
    const startIndex = match.index;

    if (startIndex > lastIndex) {
      nodes.push(...renderLinks(text.slice(lastIndex, startIndex)));
    }

    nodes.push(
      <code key={`code-${startIndex}`} className={styles.inlineCode}>
        {code}
      </code>,
    );

    lastIndex = startIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(...renderLinks(text.slice(lastIndex)));
  }

  return nodes;
}

export default function ProjectCards({
  projects,
  compact = false,
  hideLogos = false,
}: {
  projects: Project[];
  compact?: boolean;
  hideLogos?: boolean;
}) {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [usesNativeTransition, setUsesNativeTransition] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const projectCardRefs = useRef(new Map<string, HTMLElement>());
  const transitionRunningRef = useRef(false);
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement | null>(null);
  const modalTitleId = useId();

  const openLightbox = useCallback(
    (image: LightboxImage, trigger: HTMLElement) => {
      lightboxTriggerRef.current = trigger;
      setLightboxImage(image);
    },
    [],
  );

  const closeLightbox = useCallback(() => {
    const trigger = lightboxTriggerRef.current;
    lightboxTriggerRef.current = null;
    setLightboxImage(null);
    window.requestAnimationFrame(() => trigger?.focus());
  }, []);

  const finishTransition = useCallback((card?: HTMLElement | null) => {
    card?.style.removeProperty("view-transition-name");
    document.documentElement.removeAttribute("data-project-transition");
    transitionRunningRef.current = false;
  }, []);

  const openModal = useCallback(
    (projectId: string, card: HTMLElement) => {
      if (transitionRunningRef.current) return;

      if (!shouldUseNativeTransition()) {
        setUsesNativeTransition(false);
        setOpenProjectId(projectId);
        return;
      }

      const transitionDocument = document as unknown as TransitionDocument;
      const startViewTransition =
        transitionDocument.startViewTransition?.bind(transitionDocument);

      if (!startViewTransition) {
        setOpenProjectId(projectId);
        return;
      }

      transitionRunningRef.current = true;
      document.documentElement.setAttribute("data-project-transition", "open");
      card.style.setProperty("view-transition-name", "project-detail");

      try {
        const transition = startViewTransition(() => {
          card.style.setProperty("view-transition-name", "none");
          flushSync(() => {
            setUsesNativeTransition(true);
            setOpenProjectId(projectId);
          });
        });

        // A skipped transition rejects `ready`; ignore it so it is not
        // reported as an unhandled rejection.
        transition.ready?.catch(() => {});
        transition.finished
          .catch(() => {})
          .finally(() => finishTransition(card));
      } catch {
        finishTransition(card);
        setUsesNativeTransition(false);
        setOpenProjectId(projectId);
      }
    },
    [finishTransition],
  );

  const closeModal = useCallback(() => {
    if (!openProjectId || transitionRunningRef.current) return;

    lightboxTriggerRef.current = null;
    setLightboxImage(null);

    const card = projectCardRefs.current.get(openProjectId) ?? null;

    if (!shouldUseNativeTransition()) {
      setOpenProjectId(null);
      setUsesNativeTransition(false);
      window.requestAnimationFrame(() => card?.focus());
      return;
    }

    const transitionDocument = document as unknown as TransitionDocument;
    const startViewTransition =
      transitionDocument.startViewTransition?.bind(transitionDocument);

    if (!startViewTransition) {
      setOpenProjectId(null);
      setUsesNativeTransition(false);
      window.requestAnimationFrame(() => card?.focus());
      return;
    }

    transitionRunningRef.current = true;
    document.documentElement.setAttribute("data-project-transition", "close");

    try {
      const transition = startViewTransition(() => {
        flushSync(() => {
          setOpenProjectId(null);
          setUsesNativeTransition(false);
        });
        card?.style.setProperty("view-transition-name", "project-detail");
      });

      transition.ready?.catch(() => {});
      transition.finished
        .catch(() => {})
        .finally(() => {
          finishTransition(card);
          card?.focus();
        });
    } catch {
      finishTransition(card);
      setOpenProjectId(null);
      setUsesNativeTransition(false);
      window.requestAnimationFrame(() => card?.focus());
    }
  }, [finishTransition, openProjectId]);

  useEffect(() => {
    if (!openProjectId) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (lightboxImage) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal, lightboxImage, openProjectId]);

  useEffect(() => {
    if (!lightboxImage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (event.key !== "Tab") return;

      event.preventDefault();
      lightboxCloseRef.current?.focus();
    };

    window.addEventListener("keydown", onKeyDown);
    lightboxCloseRef.current?.focus();

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeLightbox, lightboxImage]);

  const openProject = openProjectId
    ? (projects.find((project) => project.id === openProjectId) ?? null)
    : null;
  const openProjectModal = openProject?.modal ?? null;
  const openProjectStack = openProject ? formatStack(openProject.stack) : null;
  const openProjectIsActive = Boolean(
    openProject?.period && /\bnow\b/i.test(openProject.period),
  );
  const openProjectLinks =
    openProject?.links ?? (openProject?.link ? [openProject.link] : []);

  const renderModalBlock = (
    block: ProjectModalContentBlock,
    index: number,
    leadParagraphIndex: number | null,
  ): React.ReactNode => {
    switch (block.type) {
  

      case "image": {
        const image: LightboxImage = {
          src: block.src,
          alt: block.alt,
          width: block.width,
          height: block.height,
        };

        if (!block.browser) {
          return (
            <button
              key={index}
              type="button"
              className={`${styles.modalImageButton} ${styles.modalImageButtonBlock}`}
              onClick={(event) => openLightbox(image, event.currentTarget)}
              aria-label={`${block.alt} — view larger`}
            >
              <Image
                className={styles.modalScreenshot}
                src={block.src}
                alt=""
                width={block.width}
                height={block.height}
                sizes="(max-width: 768px) 100vw, 850px"
              />
            </button>
          );
        }

        return (
          <section key={index} className={styles["browser-window"]}>
            <div className={styles["browser-toolbar"]}>
              <div
                className={styles["browser-traffic-lights"]}
                aria-hidden="true"
              >
                <span
                  className={`${styles["browser-dot"]} ${styles["browser-dot-red"]}`}
                />
                <span
                  className={`${styles["browser-dot"]} ${styles["browser-dot-yellow"]}`}
                />
                <span
                  className={`${styles["browser-dot"]} ${styles["browser-dot-green"]}`}
                />
              </div>

              <div className={styles["browser-address"]}>
                {block.browser.url}
              </div>

              {block.browser.title ? (
                <div className={styles["browser-title"]}>
                  {block.browser.title}
                </div>
              ) : null}
            </div>

            <button
              type="button"
              className={`${styles["browser-content"]} ${styles.modalImageButton}`}
              onClick={(event) => openLightbox(image, event.currentTarget)}
              aria-label={`${block.alt} — view larger`}
            >
              <Image
                src={block.src}
                alt=""
                width={block.width}
                height={block.height}
                sizes="(max-width: 768px) 100vw, 850px"
              />
            </button>
          </section>
        );
      }

      case "reelGallery":
        return (
          <section key={index} className={styles.modalReelGallery}>
            {block.items.map((item) => (
              <a
                key={item.href}
                className={styles.modalReelCard}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.modalReelMedia}>
                  <Image
                    className={styles.modalReelThumbnail}
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 768px) 100vw, 26rem"
                  />
                  <span className={styles.modalReelBadge}>Instagram reel</span>
                </div>

                <div className={styles.modalReelBody}>
                  <div className={styles.modalReelStats}>
                    <span>
                      <strong>{item.likes}</strong> likes
                    </span>
                    <span>
                      <strong>{item.comments}</strong> comments
                    </span>
                    <span>
                      <strong>{item.views}</strong> views
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </section>
        );

      case "paragraph": {
        const paragraphText = block.text ?? "";
        const paragraphClassName =
          index === leadParagraphIndex ? styles.modalLead : undefined;

        return (
          <Fragment key={index}>
            {index === leadParagraphIndex
              ? openProjectLinks.slice(0, 1).map((link) => (
                  <a
                    key={`${link.href}-${link.label}-story`}
                    className={styles.modalStoryLink}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {formatLinkDomain(link)}
                    <ArrowUpRight
                      size={14}
                      weight="regular"
                      aria-hidden="true"
                    />
                  </a>
                ))
              : null}
            <p className={paragraphClassName}>
              {renderParagraphText(paragraphText)}
            </p>
          </Fragment>
        );
      }

      default:
        return null;
    }
  };

  return (
    <>
      <div
        className={`${styles.projects}${
          compact ? ` ${styles.projectsCompact}` : ""
        }`}
      >
        {projects.map((project, projectIndex) => {
          const isClickable = Boolean(project.modal);
          const stack = formatStack(project.stack);
          const primaryLink = project.link ?? project.links?.[0] ?? null;

          return (
            <article
              key={project.id}
              ref={(node) => {
                if (node) projectCardRefs.current.set(project.id, node);
                else projectCardRefs.current.delete(project.id);
              }}
              className={styles.projectCard}
              role={isClickable ? "button" : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onClick={
                isClickable
                  ? (event) => openModal(project.id, event.currentTarget)
                  : undefined
              }
              onKeyDown={
                isClickable
                  ? (event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openModal(project.id, event.currentTarget);
                      }
                    }
                  : undefined
              }
              aria-haspopup={isClickable ? "dialog" : undefined}
              aria-label={
                isClickable ? `Open ${project.title} details` : undefined
              }
            >
              <span className={styles.projectIndex} aria-hidden="true">
                {String(projectIndex + 1).padStart(2, "0")}
              </span>

              {isClickable ? (
                <span className={styles.projectOpenHint} aria-hidden="true">
                  <span>Take a look</span>
                  <ArrowUpRight size={15} weight="regular" />
                </span>
              ) : null}

              <div className={styles.projectCardMain}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                {project.period || stack ? (
                  <div className={styles.projectMeta}>
                    {project.period ? (
                      <span className={styles.projectMetaDate}>
                        {project.period}
                      </span>
                    ) : null}
                    {stack ? (
                      <span className={styles.projectMetaStack}>{stack}</span>
                    ) : null}
                  </div>
                ) : null}
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
                <div className={styles.projectLinkRow}>
                  {primaryLink ? (
                    <a
                      className={styles.projectLink}
                      href={primaryLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {primaryLink.label}
                      <ArrowUpRight
                        size={13}
                        weight="regular"
                        aria-hidden="true"
                      />
                    </a>
                  ) : null}
                  {project.repo ? (
                    <RepoStars repo={project.repo} />
                  ) : null}
                </div>
              </div>

              {project.logo && project.showLogoOnCard !== false && !hideLogos ? (
                <div className={styles.projectCardAside} aria-hidden="true">
                  <Image
                    className={styles.projectLogo}
                    src={project.logo.src}
                    alt={project.logo.alt}
                    width={project.logo.width}
                    height={project.logo.height}
                    data-dark-mark={project.logo.darkMark ? "true" : undefined}
                    sizes="(max-width: 768px) 200px, 240px"
                  />
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      {openProject && openProjectModal ? (
        <div
          className={styles.modalOverlay}
          data-native-transition={usesNativeTransition ? "true" : undefined}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            ref={modalRef}
            className={styles.modal}
            data-native-transition={usesNativeTransition ? "true" : undefined}
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            style={{ viewTransitionName: "project-detail" }}
          >
            <header className={styles.modalHeader}>
              <div className={styles.modalHeaderInner}>
                <div className={styles.modalHeaderMain}>
                  <span className={styles.modalHeaderTitle}>
                    {openProject.title}
                  </span>
                </div>

                <div className={styles.modalHeaderActions}>
                  {openProjectLinks.slice(0, 1).map((link) => (
                    <a
                      key={`${link.href}-${link.label}`}
                      className={styles.modalHeaderLink}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {formatLinkDomain(link)}
                      <ArrowUpRight
                        size={14}
                        weight="regular"
                        aria-hidden="true"
                      />
                    </a>
                  ))}

                  <button
                    ref={closeButtonRef}
                    type="button"
                    className={styles.modalClose}
                    onClick={closeModal}
                    aria-label="Close project"
                  >
                    <X size={18} weight="regular" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </header>

            <div className={styles.modalBody}>
              <section className={styles.modalIntro}>
                <div className={styles.modalIntroTitleRow}>
                  {openProject.logo && openProject.showLogoInModal !== false ? (
                    <Image
                      className={styles.modalLogo}
                      src={openProject.logo.src}
                      alt=""
                      width={144}
                      height={144}
                      data-dark-mark={
                        openProject.logo.darkMark ? "true" : undefined
                      }
                      aria-hidden="true"
                    />
                  ) : null}
                  <h3 className={styles.modalTitle} id={modalTitleId}>
                    {openProject.title}
                  </h3>
                </div>

                <p className={styles.modalDeck}>{openProject.description}</p>

                {openProject.period || openProjectStack ? (
                  <div className={styles.modalMeta}>
                    {openProject.period ? (
                      <span className={styles.modalDate}>
                        {openProject.period}
                      </span>
                    ) : null}
                    {openProjectStack ? (
                      <span className={styles.modalStack}>
                        {openProjectStack}
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </section>

              <div className={styles.modalStory}>
                <div className={styles.modalBodyInner}>
                {(() => {
                  const blocks = (
                    openProjectModal.content ??
                    openProjectModal.paragraphs?.map((text) => ({
                      type: "paragraph" as const,
                      text,
                    })) ??
                    []
                  ) as ProjectModalContentBlock[];
                  const paragraphBlockIndexes = blocks.reduce<number[]>(
                    (acc, block, index) => {
                      if (block.type === "paragraph") acc.push(index);
                      return acc;
                    },
                    [],
                  );
                  const leadParagraphIndex = paragraphBlockIndexes[0] ?? null;

                  return blocks.map((block, index) =>
                    renderModalBlock(block, index, leadParagraphIndex),
                  );
                })()}
                </div>
              </div>

              <footer className={styles.modalProjectFooter}>
                <p>
                  {openProjectIsActive
                    ? "Want the version that actually exists today?"
                    : "Want to poke around the actual thing?"}
                </p>
                <div className={styles.modalProjectLinks}>
                  {openProjectLinks.map((link) => {
                    const isGitHubLink = /github\.com/i.test(link.href);
                    const showStars = isGitHubLink && Boolean(openProject.repo);
                    return (
                      <a
                        key={`${link.href}-${link.label}-footer`}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                        {showStars ? (
                          <span className={styles.modalProjectLinkStars}>
                            <RepoStars
                              repo={openProject.repo as string}
                              className={styles.modalProjectLinkStarsBadge}
                            />
                          </span>
                        ) : null}
                        <ArrowUpRight
                          size={15}
                          weight="regular"
                          aria-hidden="true"
                        />
                      </a>
                    );
                  })}
                </div>
              </footer>
            </div>
          </div>
        </div>
      ) : null}

      {lightboxImage ? (
        <div
          className={styles.lightboxOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.alt}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <button
            ref={lightboxCloseRef}
            type="button"
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Close image"
          >
            <X size={18} weight="regular" aria-hidden="true" />
          </button>

          <figure className={styles.lightboxFigure}>
            <Image
              className={styles.lightboxImage}
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              width={lightboxImage.width}
              height={lightboxImage.height}
              sizes="100vw"
              quality={90}
              priority
            />
            <figcaption className={styles.lightboxCaption}>
              {lightboxImage.alt}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
