"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import styles from "../../styles/pages/home.module.css";
import type { Project } from "../content/projects";
import ModalCarousel from "./ModalCarousel";

function formatStack(stack?: Project["stack"]) {
  if (!stack) return null;
  return Array.isArray(stack) ? stack.join(" · ") : stack;
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

function isGifImage(src: string) {
  return src.toLowerCase().endsWith(".gif");
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
  variant = "default",
}: {
  projects: Project[];
  variant?: "default" | "design";
}) {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const modalTitleId = useId();

  useEffect(() => {
    if (!openProjectId) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenProjectId(null);
    };

    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openProjectId]);

  const openModal = (projectId: string) => setOpenProjectId(projectId);
  const closeModal = () => setOpenProjectId(null);

  const openProject = openProjectId
    ? projects.find((p) => p.id === openProjectId) ?? null
    : null;
  const openProjectModal = openProject?.modal ?? null;
  const openProjectStack = openProject ? formatStack(openProject.stack) : null;

  return (
    <>
      <div className={styles.projects}>
        {projects.map((project) => {
          const isClickable = Boolean(project.modal);
          const stack = formatStack(project.stack);
          const primaryLink = project.link ?? project.links?.[0] ?? null;

          if (variant === "design") {
            const thumbnail = project.thumbnail ?? project.logo ?? null;

            return (
              <article
                key={project.id}
                className={styles.projectCardDesign}
                role={isClickable ? "button" : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onClick={isClickable ? () => openModal(project.id) : undefined}
                onKeyDown={
                  isClickable
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          openModal(project.id);
                        }
                      }
                    : undefined
                }
                aria-label={
                  isClickable ? `Open ${project.title} details` : undefined
                }
              >
                {thumbnail ? (
                  <Image
                    className={styles.projectThumbnail}
                    src={thumbnail.src}
                    alt={thumbnail.alt}
                    width={thumbnail.width}
                    height={thumbnail.height}
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                ) : (
                  <div className={styles.projectThumbnailPlaceholder} />
                )}
                <div className={styles.projectDesignInfo}>
                  <h3 className={styles.projectDesignTitle}>{project.title}</h3>
                  {project.period || stack ? (
                    <div className={styles.projectDesignMeta}>
                      {project.period ? (
                        <span className={styles.projectDesignDate}>
                          {project.period}
                        </span>
                      ) : null}
                      {stack ? (
                        <span className={styles.projectDesignStack}>{stack}</span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          }

          return (
            <article
              key={project.id}
              className={styles.projectCard}
              role={isClickable ? "button" : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onClick={isClickable ? () => openModal(project.id) : undefined}
              onKeyDown={
                isClickable
                  ? (event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openModal(project.id);
                      }
                    }
                  : undefined
              }
              aria-label={isClickable ? `Open ${project.title} details` : undefined}
            >
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
                      <span className={styles.projectMetaStack}>
                        {stack}
                      </span>
                    ) : null}
                  </div>
                ) : null}
                <p className={styles.projectDescription}>{project.description}</p>
                {primaryLink ? (
                  <a
                    className={styles.projectLink}
                    href={primaryLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {primaryLink.label}
                  </a>
                ) : null}
              </div>

              {project.logo && project.showLogoOnCard !== false ? (
                <div className={styles.projectCardAside} aria-hidden="true">
                  <Image
                    className={styles.projectLogo}
                    src={project.logo.src}
                    alt={project.logo.alt}
                    width={project.logo.width}
                    height={project.logo.height}
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
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderInner}>
                <div className={styles.modalHeaderMain}>
                  {openProject.logo && openProject.showLogoInModal !== false ? (
                    <Image
                      className={styles.modalLogo}
                      src={openProject.logo.src}
                      alt=""
                      width={96}
                      height={96}
                      aria-hidden="true"
                    />
                  ) : null}

                  <div>
                    <h3 className={styles.modalTitle} id={modalTitleId}>
                      {openProject.title}
                    </h3>
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
                  </div>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  className={styles.modalClose}
                  onClick={closeModal}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalBodyInner}>
                {(() => {
                  const baseBlocks =
                    openProjectModal.content ??
                    (openProjectModal.paragraphs?.map((text) => ({
                      type: "paragraph" as const,
                      text,
                    })) ??
                      []);

                  const blocks =
                    openProjectModal.content || !openProjectModal.screenshot
                      ? baseBlocks
                      : (() => {
                          const screenshotBlock = {
                            type: "image" as const,
                            ...openProjectModal.screenshot,
                          };

                          const firstParagraphIndex = baseBlocks.findIndex(
                            (block) => block.type === "paragraph",
                          );

                          if (firstParagraphIndex === -1) {
                            return [screenshotBlock, ...baseBlocks];
                          }

                          return [
                            ...baseBlocks.slice(0, firstParagraphIndex + 1),
                            screenshotBlock,
                            ...baseBlocks.slice(firstParagraphIndex + 1),
                          ];
                        })();

                  const paragraphBlockIndexes = blocks.reduce<number[]>(
                    (acc, block, index) => {
                      if (block.type === "paragraph") acc.push(index);
                      return acc;
                    },
                    [],
                  );
                  const leadParagraphIndex =
                    paragraphBlockIndexes.length > 0
                      ? paragraphBlockIndexes[0]
                      : null;
                  const mutedParagraphIndex =
                    paragraphBlockIndexes.length > 0
                      ? paragraphBlockIndexes[paragraphBlockIndexes.length - 1]
                      : null;

                  return blocks.map((block, index) => {
                    if (block.type === "image") {
                      return (
                        <Image
                          key={index}
                          className={styles.modalScreenshot}
                          src={block.src}
                          alt={block.alt}
                          width={block.width}
                          height={block.height}
                          unoptimized={isGifImage(block.src)}
                          sizes="(max-width: 768px) 92vw, 720px"
                        />
                      );
                    }

                    if (block.type === "imageRow") {
                      return (
                        <div key={index} className={styles.modalImageRow}>
                          {block.images.map((image) => (
                            <Image
                              key={image.src}
                              className={styles.modalScreenshot}
                              src={image.src}
                              alt={image.alt}
                              width={image.width}
                              height={image.height}
                              unoptimized={isGifImage(image.src)}
                              sizes="(max-width: 640px) 92vw, 340px"
                            />
                          ))}
                        </div>
                      );
                    }

                    if (block.type === "sectionTitle") {
                      return (
                        <h4 key={index} className={styles.modalSectionTitle}>
                          {block.text}
                        </h4>
                      );
                    }

                    if (block.type === "list") {
                      const ListTag = block.ordered ? "ol" : "ul";

                      return (
                        <ListTag key={index} className={styles.modalList}>
                          {block.items.map((item, itemIndex) => (
                            <li key={`${index}-${itemIndex}`}>
                              {renderParagraphText(item)}
                            </li>
                          ))}
                        </ListTag>
                      );
                    }

                    if (block.type === "carousel") {
                      return (
                        <ModalCarousel key={index} label={block.label} images={block.images} />
                      );
                    }

                    if (block.type === "embed") {
                      return (
                        <a
                          key={index}
                          className={styles.modalEmbed}
                          href={block.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className={styles.modalEmbedImage}
                            src={block.imgSrc}
                            alt={block.alt}
                            width={block.width}
                            height={block.height}
                            loading="lazy"
                          />
                        </a>
                      );
                    }

                    const paragraphClassName =
                      index === leadParagraphIndex
                        ? styles.modalLead
                        : index === mutedParagraphIndex
                          ? styles.modalMuted
                          : undefined;

                    return (
                      <p key={index} className={paragraphClassName}>
                        {renderParagraphText(block.text)}
                      </p>
                    );
                  });
                })()}
              </div>
            </div>

            <div className={styles.modalFooter}>
              <div className={styles.modalFooterInner}>
                {(() => {
                  const links =
                    openProject.links ?? (openProject.link ? [openProject.link] : []);

                  if (links.length === 0) return null;

                  return (
                    <div className={styles.modalLinks}>
                      {links.map((link) => (
                        <a
                          key={`${link.href}-${link.label}`}
                          className={styles.modalLink}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                          <svg
                            className={styles.externalIcon}
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path
                              fill="currentColor"
                              d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"
                            />
                          </svg>
                        </a>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
