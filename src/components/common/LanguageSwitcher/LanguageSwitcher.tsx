"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "next-intl";

export function LanguageSwitcher() {
  const { currentLocale, setLanguage } = useLanguage();
  const t = useTranslations("common");

  const toggleLanguage = () => {
    const nextLocale = currentLocale === "vi" ? "en" : "vi";
    setLanguage(nextLocale);
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer min-w-[68px]"
      onClick={toggleLanguage}
    >
      <img
        src={currentLocale === "vi" ? "/icon/vn.png" : "/icon/en.png"}
        alt={currentLocale === "vi" ? "vietnam" : "english"}
        className="w-9 h-9 rounded-full object-cover"
      />
      <span className="font-medium">
        {currentLocale === "vi" ? "VI" : "EN"}
      </span>
    </div>
  );
}
