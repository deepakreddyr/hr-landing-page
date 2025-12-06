// hooks/useFadeInOnScroll.ts
"use client";

import { useRef, useEffect, useState } from 'react';

// Options for the Intersection Observer
interface Options {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Hook to trigger an animation or visibility change when a component enters the viewport.
 * @param options Observer options (e.g., { threshold: 0.1 } to trigger when 10% visible)
 * @returns [ref, isVisible] - The ref to attach to the element, and a state indicating visibility.
 */
export const useFadeInOnScroll = (options: Options = { threshold: 0.1 }) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    // If it has been visible, we don't need the observer anymore
    if (hasBeenVisible) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        setHasBeenVisible(true); // Stop observing after it has been seen once
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // Ensure cleanup if the component unmounts before being observed
        observer.unobserve(ref.current);
      }
    };
  }, [options, hasBeenVisible]);

  return [ref, isVisible] as const;
};