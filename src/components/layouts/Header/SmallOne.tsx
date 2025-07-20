"use client";

import { Container } from "../Container";
import { useI18n } from "@/hooks";

const SmallOne = () => {
  const { t } = useI18n();

  const discountText = t("smallHeader.discountCode");
  const highlightCode = t("smallHeader.discountCodeHighlight");

  // Replace NEWBIE with highlighted version
  const highlightedDiscountText = discountText.replace(
    highlightCode,
    `<span class="text-[#FACA4A]">${highlightCode}</span>`
  );

  return (
    <div className="h-6 bg-gradient-to-l from-[#0D57C6] via-[#37CFFF] to-[#0D57C6] ">
      <Container className="h-full">
        <div className="flex item-center justify-between h-full text-white">
          <div className="flex items-center gap-2 ">
            <img src="/icon/discount.png" alt="percent" className="w-4 h-4" />
            <p
              className="text-xs text-white"
              dangerouslySetInnerHTML={{ __html: highlightedDiscountText }}
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <img src="/icon/phone.png" alt="phone" className="w-4 h-4" />
              <p className="text-xs text-white ">{t("smallHeader.hotline")}</p>
            </div>
            <div className="flex items-center gap-2">
              <img src="/icon/app.png" alt="app" className="w-4 h-4" />
              <p className="text-xs text-white ">
                {t("smallHeader.downloadApp")}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SmallOne;
