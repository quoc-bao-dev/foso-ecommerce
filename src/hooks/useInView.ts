import { useEffect, useRef, useState, useCallback } from "react";

interface UseInViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  triggerOnce?: boolean;
  fallbackInView?: boolean;
}

interface UseInViewReturn {
  ref: React.RefObject<Element>;
  inView: boolean;
  entry: IntersectionObserverEntry | null;
  isIntersecting: boolean;
}

/**
 * Hook to detect when an element enters or leaves the viewport
 * @param options - Configuration options for the intersection observer
 * @returns Object containing ref, inView state, entry, and isIntersecting
 */
export function useInView(options: UseInViewOptions = {}): UseInViewReturn {
  const {
    threshold = 0,
    rootMargin = "0px",
    root = null,
    triggerOnce = false,
    fallbackInView = false,
  } = options;

  const [inView, setInView] = useState<boolean>(fallbackInView);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const ref = useRef<Element>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasTriggered = useRef<boolean>(false);

  const callback = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      const isElementInView = entry.isIntersecting;

      setEntry(entry);
      setIsIntersecting(isElementInView);

      if (triggerOnce && hasTriggered.current) {
        return;
      }

      if (isElementInView) {
        setInView(true);
        if (triggerOnce) {
          hasTriggered.current = true;
        }
      } else {
        setInView(false);
      }
    },
    [triggerOnce]
  );

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(callback, {
      threshold,
      rootMargin,
      root,
    });

    // Start observing
    observerRef.current.observe(element);

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, threshold, rootMargin, root]);

  // Reset trigger state when triggerOnce changes
  useEffect(() => {
    if (!triggerOnce) {
      hasTriggered.current = false;
    }
  }, [triggerOnce]);

  return {
    ref,
    inView,
    entry,
    isIntersecting,
  };
}

/**
 * Hook to detect when an element enters the viewport (one-time trigger)
 * @param options - Configuration options
 * @returns Object containing ref and inView state
 */
export function useInViewOnce(
  options: Omit<UseInViewOptions, "triggerOnce"> = {}
) {
  return useInView({ ...options, triggerOnce: true });
}

/**
 * Hook to detect when an element is fully visible in the viewport
 * @param options - Configuration options
 * @returns Object containing ref and inView state
 */
export function useFullyInView(
  options: Omit<UseInViewOptions, "threshold"> = {}
) {
  return useInView({ ...options, threshold: 1.0 });
}

/**
 * Hook to detect when an element is partially visible in the viewport
 * @param options - Configuration options
 * @returns Object containing ref and inView state
 */
export function usePartiallyInView(
  options: Omit<UseInViewOptions, "threshold"> = {}
) {
  return useInView({ ...options, threshold: 0.1 });
}
