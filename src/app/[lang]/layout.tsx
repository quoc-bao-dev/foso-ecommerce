import { locales } from "@/i18n/config";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { LanguageProvider } from "@/contexts/LanguageContext";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const messages = await getMessages({ locale: lang });

  return (
    <NextIntlClientProvider messages={messages} locale={lang}>
      <LanguageProvider>{children}</LanguageProvider>
    </NextIntlClientProvider>
  );
}
