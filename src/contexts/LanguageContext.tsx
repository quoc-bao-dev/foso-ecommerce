"use client";

import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface LanguageContextType {
  currentLocale: Locale;
  switchLanguage: (locale: Locale, preservePath?: boolean) => void;
  availableLocales: Locale[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Extract locale from pathname
    const pathSegments = pathname.split("/");
    const localeFromPath = pathSegments[1];

    if (locales.includes(localeFromPath as Locale)) {
      setCurrentLocale(localeFromPath as Locale);
    } else {
      setCurrentLocale(defaultLocale);
    }
  }, [pathname]);

  const setLanguage = (locale: Locale, preservePath: boolean = true) => {
    setCurrentLocale(locale);

    // Update URL to reflect new locale
    const pathSegments = pathname.split("/");
    if (locales.includes(pathSegments[1] as Locale)) {
      pathSegments[1] = locale;
    } else {
      pathSegments.splice(1, 0, locale);
    }

    const newPath = pathSegments.join("/");
    if (preservePath) {
      router.push(newPath);
    } else {
      router.push(`/${locale}`);
    }
  };

  const value: LanguageContextType = {
    currentLocale,
    switchLanguage: setLanguage,
    availableLocales: [...locales],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
