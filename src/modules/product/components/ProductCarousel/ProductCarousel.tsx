"use client";

import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Product } from "../../types";
import { ProductCard, ProductCardSkeleton } from "../ProductCard";

interface ProductCarouselProps {
  products: Product[];
  slidesPerView?: number;
  spaceBetween?: number;
  autoplay?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
  isLoading?: boolean;
}

const ProductCarousel = ({
  products,
  slidesPerView = 5,
  spaceBetween = 16,
  autoplay = true,
  showNavigation = true,
  showPagination = false,
  isLoading = false,
}: ProductCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1280: {
            slidesPerView: slidesPerView,
            spaceBetween: spaceBetween,
          },
        }}
        navigation={showNavigation}
        pagination={showPagination ? { clickable: true } : false}
        autoplay={
          autoplay ? { delay: 3000, disableOnInteraction: false } : false
        }
        loop={true}
        className="product-carousel"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {products?.map((product, index) => (
          <SwiperSlide key={product.name + index}>
            <ProductCard
              name={product.name}
              image={product.image}
              price={product.price}
              oldPrice={product.oldPrice}
              discount={product.discount}
              isSale={product.discount > 0}
            />
          </SwiperSlide>
        ))}
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index}>
              <ProductCardSkeleton />
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      {showNavigation && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-brand-100 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors swiper-button-prev-custom"
          >
            <IoIosArrowBack className="text-brand-800" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-brand-100 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors swiper-button-next-custom"
          >
            <IoIosArrowForward className="text-brand-800" />
          </button>
        </>
      )}

      <style jsx global>{`
        .product-carousel .swiper-button-next,
        .product-carousel .swiper-button-prev {
          display: none;
        }

        .product-carousel .swiper-pagination {
          bottom: 10px;
        }

        .product-carousel .swiper-pagination-bullet {
          background: #0373f3;
          opacity: 0.5;
        }

        .product-carousel .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default ProductCarousel;
