"use client";

import { useLanguage } from "@/contexts";
import { useTranslations } from "next-intl";

export function useI18n() {
  const t = useTranslations("common");
  const { currentLocale, setLanguage, availableLocales } = useLanguage();

  return {
    t,
    currentLocale,
    setLanguage,
    availableLocales,
  };
}
