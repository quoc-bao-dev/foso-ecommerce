"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useDevice } from "@/hooks/useDevice";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function LanguageSwitcher() {
  const { currentLocale, switchLanguage } = useLanguage();
  const { isMobile } = useDevice();
  const t = useTranslations("common");
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLocale = currentLocale === "vi" ? "en" : "vi";
    switchLanguage(nextLocale, false); // Preserve current path
    setIsOpen(false);
  };

  const switchToLanguage = (locale: "vi" | "en") => {
    if (locale === currentLocale) return;
    switchLanguage(locale, true); // Preserve current path
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Dropdown Toggle */}
      <div
        className={`flex items-center gap-2 cursor-pointer rounded-lg p-2 hover:bg-gray-100 transition-colors ${
          isMobile ? "min-w-[56px]" : "min-w-[107px]"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={currentLocale === "vi" ? "/icon/vn.png" : "/icon/en.png"}
          alt={currentLocale === "vi" ? "vietnam" : "english"}
          className={`rounded-full object-cover ${
            isMobile ? "w-7 h-7" : "w-9 h-9"
          }`}
        />
        <span className={`font-medium ${isMobile ? "text-sm" : ""}`}>
          {currentLocale === "vi" ? "VI" : "EN"}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute min-w-[170px] top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={() => switchToLanguage("vi")}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                currentLocale === "vi" ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              <img
                src="/icon/vn.png"
                alt="vietnam"
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="font-medium text-sm truncate">Tiếng Việt</span>
              {currentLocale === "vi" && (
                <svg
                  className="w-4 h-4 ml-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={() => switchToLanguage("en")}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                currentLocale === "en" ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              <img
                src="/icon/en.png"
                alt="english"
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="font-medium text-sm ">English</span>
              {currentLocale === "en" && (
                <svg
                  className="w-4 h-4 ml-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
