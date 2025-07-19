import { useState, useRef } from "react";

interface UseHoverOptions {
  delay?: number;
}

export const useHover = (options: UseHoverOptions = {}) => {
  const { delay = 100 } = options;
  const [isHover, setIsHover] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setIsHover(false);
    }, delay);
  };

  return {
    isHover,
    handleMouseEnter,
    handleMouseLeave,
  };
};
