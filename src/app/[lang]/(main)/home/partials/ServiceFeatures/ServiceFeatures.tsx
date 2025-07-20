"use client";

import { Container } from "@/components/layouts";
import { useI18n } from "@/hooks";

const ServiceFeatures = () => {
  const { t } = useI18n();

  const FEATURES = [
    {
      icon: "/icon/delivery.png",
      title: t("home.serviceFeatures.freeShipping.title"),
      description: t("home.serviceFeatures.freeShipping.description"),
    },
    {
      icon: "/icon/support.png",
      title: t("home.serviceFeatures.support247.title"),
      description: t("home.serviceFeatures.support247.description"),
    },
    {
      icon: "/icon/truck.png",
      title: t("home.serviceFeatures.fastDelivery.title"),
      description: t("home.serviceFeatures.fastDelivery.description"),
    },
    {
      icon: "/icon/return.png",
      title: t("home.serviceFeatures.return30Days.title"),
      description: t("home.serviceFeatures.return30Days.description"),
    },
  ];
  return (
    <Container>
      <div className="bg-gray-100 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl px-[11px] h-[101px] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 h-full">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-12 h-12"
                />

                <div className="">
                  <h3 className="text-base font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ServiceFeatures;
