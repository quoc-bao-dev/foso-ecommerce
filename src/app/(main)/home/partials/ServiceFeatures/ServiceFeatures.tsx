"use client";

import { Container } from "@/components/layouts";
import { FaShippingFast, FaHeadset, FaTruck, FaBox } from "react-icons/fa";

const FEATURES = [
  {
    icon: "/icon/delivery.png",
    title: "Miễn phí vận chuyển",
    description: "Với hoá đơn từ 1 triệu",
  },
  {
    icon: "/icon/support.png",
    title: "Hỗ trợ 24/7",
    description: "Đội ngũ CSKH tận tình sẵn sàng lắng nghe và phục vụ tận tâm",
  },
  {
    icon: "/icon/truck.png",
    title: "Giao hàng nhanh 2h",
    description: "Trong vòng bán kính 10km nội thành TP HCM",
  },
  {
    icon: "/icon/return.png",
    title: "30 ngày đổi trả",
    description:
      "Hoàn tiền 100% nếu phát sinh lỗi từ NSX hoặc đơn vị vận chuyển",
  },
];

const ServiceFeatures = () => {
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
