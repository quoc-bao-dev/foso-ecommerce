"use client";

import { Container } from "@/components/layouts";
import { useI18n } from "@/hooks";
import { ProductCarousel } from "@/modules/product";
import { useProducts } from "@/services/product";

const HeroSection = () => {
  const { currentLocale } = useI18n();
  const { data: products, isLoading } = useProducts({
    limit: 6,
    lang: currentLocale,
  });

  return (
    <Container>
      {/* Banner */}
      <div className="h-[500px] rounded-t-2xl overflow-hidden hidden md:block">
        <div className="h-full w-full ">
          <img
            src="/image/hero-banner.png"
            alt="Hero Banner"
            className="w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
          />
        </div>
      </div>
      {/* Product Carousel */}
      <div className="bg-[#0a5adf] rounded-b-2xl rounded-t-2xl md:rounded-t-none p-12">
        <ProductCarousel
          products={products}
          slidesPerView={5}
          spaceBetween={16}
          autoplay={true}
          showNavigation={true}
          showPagination={false}
          isLoading={isLoading}
        />
      </div>
    </Container>
  );
};

export default HeroSection;
