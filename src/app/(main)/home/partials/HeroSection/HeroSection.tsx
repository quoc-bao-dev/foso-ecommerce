import { Container } from "@/components/layouts";
import { Product, ProductCarousel } from "@/modules/product";

const products: Product[] = [
  {
    id: "1",
    name: "Lọc gió động cơ Air Filter – Chevrolet Colorado, Tr...",
    image: "/image/logo.png",
    price: 299000,
    oldPrice: 329000,
    discount: 10,
  },
  {
    id: "2",
    name: "Lọc gió động cơ Air Filter – Chevrolet Colorado, Tr...",
    image: "/image/logo.png",
    price: 299000,
    oldPrice: 329000,
    discount: 10,
  },
  {
    id: "3",
    name: "Lọc gió động cơ Air Filter – Chevrolet Colorado, Tr...",
    image: "/image/logo.png",
    price: 299000,
    oldPrice: 329000,
    discount: 10,
  },
  {
    id: "4",
    name: "Lọc gió động cơ Air Filter – Chevrolet Colorado, Tr...",
    image: "/image/logo.png",
    price: 299000,
    oldPrice: 329000,
    discount: 10,
  },
  {
    id: "5",
    name: "Lọc gió động cơ Air Filter – Chevrolet Colorado, Tr...",
    image: "/image/logo.png",
    price: 299000,
    oldPrice: 329000,
    discount: 10,
  },
  {
    id: "6",
    name: "Lọc gió động cơ Air Filter – Chevrolet Colorado, Tr...",
    image: "/image/logo.png",
    price: 299000,
    oldPrice: 329000,
    discount: 10,
  },
  {
    id: "7",
    name: "Lọc gió động cơ Air Filter – Chevrolet Colorado, Tr...",
    image: "/image/logo.png",
    price: 299000,
    oldPrice: 329000,
    discount: 10,
  },
];

const HeroSection = () => {
  return (
    <Container>
      {/* Banner */}
      <div className="h-[500px] rounded-t-2xl overflow-hidden">
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
      <div className="bg-[#0a5adf] rounded-b-2xl p-12">
        <ProductCarousel
          products={products}
          slidesPerView={5}
          spaceBetween={16}
          autoplay={true}
          showNavigation={true}
          showPagination={false}
        />
      </div>
    </Container>
  );
};

export default HeroSection;
