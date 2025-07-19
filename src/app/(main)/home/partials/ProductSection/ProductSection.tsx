import { Container } from "@/components/layouts";
import {
  Product,
  ProductCard,
  ProductFilter,
  ProductSortBar,
} from "@/modules/product";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Sản phẩm 1",
    price: 100000,
    image: "/images/product-1.png",
    oldPrice: 100000,
    discount: 10,
  },
  {
    id: "2",
    name: "Sản phẩm 2",
    price: 100000,
    image: "/images/product-2.png",
    oldPrice: 100000,
    discount: 10,
  },
  {
    id: "3",
    name: "Sản phẩm 3",
    price: 100000,
    image: "/images/product-3.png",
    oldPrice: 100000,
    discount: 10,
  },
  {
    id: "4",
    name: "Sản phẩm 4",
    price: 100000,
    image: "/images/product-4.png",
    oldPrice: 100000,
    discount: 10,
  },
  {
    id: "5",
    name: "Sản phẩm 5",
    price: 100000,
    image: "/images/product-5.png",
    oldPrice: 100000,
    discount: 10,
  },
  {
    id: "6",
    name: "Sản phẩm 6",
    price: 100000,
    image: "/images/product-6.png",
    oldPrice: 100000,
    discount: 10,
  },
];

const ProductSection = () => {
  return (
    <Container>
      <div className="flex gap-5">
        {/* filter */}
        <div className="w-[315px]">
          <div className="h-fit sticky top-[30px]">
            <ProductFilter />
          </div>
        </div>
        {/* product list */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Danh sách sản phẩm</h2>
            <ProductSortBar />
          </div>
          <div className="pt-5 grid grid-cols-4 gap-5">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                isSale={product.discount > 0}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductSection;
