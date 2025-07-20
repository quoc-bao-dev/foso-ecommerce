import { useLanguage } from "@/contexts";

export const useLocateLink = () => {
  const { currentLocale } = useLanguage();

  const getLocalizedPath = (path: string) => {
    return `/${currentLocale}${path}`;
  };

  return getLocalizedPath;
};
