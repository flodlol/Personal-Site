"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import styles from "../../styles/pages/home.module.css";

type CarouselImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

function clampIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return Math.max(0, Math.min(length - 1, index));
}

export default function ModalCarousel({
  label,
  images,
}: {
  label: string;
  images: CarouselImage[];
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const trackId = useId();
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;

      const width = track.clientWidth;
      if (!width) return;

      const nextIndex = clampIndex(index, images.length);
      track.scrollTo({ left: nextIndex * width, behavior: "smooth" });
      setActiveIndex(nextIndex);
    },
    [images.length],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const width = track.clientWidth;
        if (!width) return;
        const nextIndex = clampIndex(Math.round(track.scrollLeft / width), images.length);
        setActiveIndex(nextIndex);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className={styles.modalCarousel} aria-roledescription="carousel" aria-label={label}>
      <div ref={trackRef} id={trackId} className={styles.modalCarouselTrack}>
        {images.map((image) => (
          <div key={image.src} className={styles.modalCarouselSlide}>
            <Image
              className={styles.modalScreenshot}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 768px) 92vw, 720px"
            />
          </div>
        ))}
      </div>

      {images.length > 1 ? (
        <>
          <div className={styles.modalCarouselButtons}>
            <button
              type="button"
              className={styles.modalCarouselButton}
              aria-controls={trackId}
              aria-label="Previous slide"
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.modalCarouselButton}
              aria-controls={trackId}
              aria-label="Next slide"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === images.length - 1}
            >
              ›
            </button>
          </div>

          <div className={styles.modalCarouselDots}>
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={`${styles.modalCarouselDot}${
                  index === activeIndex ? ` ${styles.modalCarouselDotActive}` : ""
                }`}
                aria-controls={trackId}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => scrollToIndex(index)}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
