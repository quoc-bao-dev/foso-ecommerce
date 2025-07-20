import { locales } from "@/i18n/config";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function LocaleLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const messages = await getMessages({ locale: lang });

  return (
    <NextIntlClientProvider messages={messages} locale={lang}>
      {children}
    </NextIntlClientProvider>
  );
}
