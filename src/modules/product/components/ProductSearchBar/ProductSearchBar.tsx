"use client";

import { useClickOutside, useHover, useI18n } from "@/hooks";
import { useDevice } from "@/hooks/useDevice";
import useDebounce from "@/hooks/useDebounce";
import { useRef, useState } from "react";
import { ProductSearchResult } from "../ProductSearchResult";

const ProductSearchBar = () => {
  const { t } = useI18n();
  const { isMobile, isTablet } = useDevice();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const { isHover, handleMouseEnter, handleMouseLeave } = useHover({
    delay: 200,
  });
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 300);

  const handleKeywordChange = (keyword: string) => {
    setKeyword(keyword);
    handleMouseEnter();
  };

  const handleEnterOverlay = () => {
    if (isHover) {
      handleMouseEnter();
    }
  };

  useClickOutside(searchBarRef, {
    onOutsideClick: handleMouseLeave,
    onEscapeKey: handleMouseLeave,
    enabled: isHover,
  });

  return (
    <div
      ref={searchBarRef}
      className={`relative flex items-center w-full max-w-2xl rounded-full border-2 border-brand-500 pr-2 pl-5 ${
        isMobile ? "h-[48px]" : isTablet ? "h-[56px]" : "h-[64px]"
      }`}
      onMouseEnter={handleEnterOverlay}
      onClick={handleMouseEnter}
    >
      <input
        type="text"
        placeholder={t("auth.search")}
        className={`flex-1 outline-none bg-transparent ${
          isMobile ? "text-base" : "text-lg"
        }`}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      />

      <button className={`${isMobile ? "mr-3" : "mr-6"}`}>
        <img
          src="/icon/camera.png"
          alt="search"
          className={`${isMobile ? "w-5 h-5" : "w-7 h-7"}`}
        />
      </button>
      <button
        className={`bg-brand-500 rounded-full flex items-center justify-center ${
          isMobile
            ? "w-[56px] h-[36px]"
            : isTablet
            ? "w-[64px] h-[40px]"
            : "w-[76px] h-[48px]"
        }`}
      >
        <img
          src="/icon/search.png"
          alt="search"
          className={`${isMobile ? "w-5 h-5" : "w-7 h-7"}`}
        />
      </button>

      {isHover && (
        <div className="absolute mt-1 top-full right-0 left-0 w-full bg-white rounded-b-2xl shadow-lg z-50">
          <ProductSearchResult
            keyword={debouncedKeyword}
            onKeywordChange={handleKeywordChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductSearchBar;
