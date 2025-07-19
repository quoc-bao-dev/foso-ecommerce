"use client";

import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

const ButtonScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12  text-brand-800 border border-brand-800 rounded-full shadow-lg hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all duration-300 z-50 flex items-center justify-center hover:scale-110"
          aria-label="Scroll to top"
        >
          <IoIosArrowUp className="text-2xl" />
        </button>
      )}
    </>
  );
};

export default ButtonScrollToTop;
