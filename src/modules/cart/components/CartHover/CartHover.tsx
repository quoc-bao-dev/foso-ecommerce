import { ProductCard } from "@/modules/product";

const CartHover = () => {
  return (
    <div className="shadow-lg shadow-[#0375F329] rounded-lg">
      <ProductCard
        name="Product Name"
        image="https://via.placeholder.com/150"
        price={100000}
        oldPrice={150000}
        discount={10}
      />
    </div>
  );
};

export default CartHover;
