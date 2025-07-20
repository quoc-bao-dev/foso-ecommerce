"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useDevice } from "@/hooks/useDevice";
import { useTranslations } from "next-intl";

export function LanguageSwitcher() {
  const { currentLocale, setLanguage } = useLanguage();
  const { isMobile, isTablet } = useDevice();
  const t = useTranslations("common");

  const toggleLanguage = () => {
    const nextLocale = currentLocale === "vi" ? "en" : "vi";
    setLanguage(nextLocale);
  };

  return (
    <div
      className={`flex items-center gap-2 cursor-pointer ${
        isMobile ? "min-w-[56px]" : "min-w-[68px]"
      }`}
      onClick={toggleLanguage}
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
    </div>
  );
}
