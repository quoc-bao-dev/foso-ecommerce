import { getRequestConfig } from "next-intl/server";
import { locales } from "./config";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) locale = "vi";
  return {
    messages: (await import(`./locales/${locale}.json`)).default,
    locale,
  };
});
