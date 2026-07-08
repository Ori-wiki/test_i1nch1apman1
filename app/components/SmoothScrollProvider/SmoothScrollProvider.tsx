'use client';

import { useEffect, useRef, useState } from 'react';
import Scrollbar from 'smooth-scrollbar';
import styles from './SmoothScrollProvider.module.scss';

declare global {
  interface Window {
    scrollbarInstance?: Scrollbar;
    nativeScrollContainer?: HTMLDivElement;
    nativeScrollEnabled?: boolean;
  }
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [useNativeScroll, setUseNativeScroll] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const handleChange = () => setUseNativeScroll(media.matches);

    handleChange();
    media.addEventListener('change', handleChange);
    window.addEventListener('resize', handleChange);
    window.addEventListener('orientationchange', handleChange);

    return () => {
      media.removeEventListener('change', handleChange);
      window.removeEventListener('resize', handleChange);
      window.removeEventListener('orientationchange', handleChange);
    };
  }, []);

  useEffect(() => {
    if (useNativeScroll === null) return;

    if (useNativeScroll) {
      window.nativeScrollEnabled = true;
      window.nativeScrollContainer = undefined;
      window.scrollbarInstance = undefined;

      const container = scrollContainerRef.current;
      if (!container) {
        return () => {
          window.nativeScrollEnabled = undefined;
          window.nativeScrollContainer = undefined;
        };
      }

      const existingScrollbar = Scrollbar.get(container);

      if (existingScrollbar) {
        existingScrollbar.destroy();
      }

      return () => {
        window.nativeScrollEnabled = undefined;
        window.nativeScrollContainer = undefined;
      };
    }

    const container = scrollContainerRef.current;
    if (!container) return;

    window.nativeScrollEnabled = false;

    const scrollbar = Scrollbar.init(container, {
      damping: 0.025,
      alwaysShowTracks: false,
      continuousScrolling: false,
      delegateTo: document,
      renderByPixels: true,
      thumbMinSize: 48,
    });

    window.scrollbarInstance = scrollbar;

    const updateScrollbar = () => {
      requestAnimationFrame(() => {
        scrollbar.update();
      });
    };

    const resizeObserver = new ResizeObserver(updateScrollbar);
    resizeObserver.observe(container);

    const contentEl = contentRef.current;
    if (contentEl) {
      resizeObserver.observe(contentEl);
    }

    window.addEventListener('load', updateScrollbar);
    window.addEventListener('resize', updateScrollbar);
    window.addEventListener('orientationchange', updateScrollbar);

    updateScrollbar();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('load', updateScrollbar);
      window.removeEventListener('resize', updateScrollbar);
      window.removeEventListener('orientationchange', updateScrollbar);

      if (Scrollbar.get(container)) {
        Scrollbar.destroy(container);
        window.scrollbarInstance = undefined;
      }
    };
  }, [useNativeScroll]);

  return (
    <div
      ref={scrollContainerRef}
      className={`${styles.viewport} ${useNativeScroll ? styles.nativeViewport : ''}`}
    >
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
    </div>
  );
}
