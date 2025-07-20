import { useEffect, RefObject } from "react";

interface UseClickOutsideOptions {
  onOutsideClick?: () => void;
  onEscapeKey?: () => void;
  enabled?: boolean;
}

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  options: UseClickOutsideOptions = {}
) => {
  const { onOutsideClick, onEscapeKey, enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick?.();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscapeKey?.();
      }
    };

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    // Cleanup event listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [ref, onOutsideClick, onEscapeKey, enabled]);
};
