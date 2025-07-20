"use client";

import Link from "next/link";
import { useI18n } from "@/hooks";

const Breadcrumbs = () => {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-4">
      <Link href="/">
        <span className="text-text-disable text-sm">{t("home.link.home")}</span>
      </Link>
      <span className="text-text-disable">&gt;</span>
      <Link href="/">
        <span className="text-brand-700 text-sm">
          {t("home.link.products")}
        </span>
      </Link>
    </div>
  );
};

export default Breadcrumbs;
