import { cn } from "@/utils/clients";

type ProductCardProps = {
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  isSale?: boolean;
  className?: string;
};

const ProductCard = ({
  name,
  image,
  price,
  oldPrice,
  discount,
  isSale,
  className,
}: ProductCardProps) => {
  return (
    <div
      className={cn(
        `bg-white rounded-xl p-6 flex flex-col items-start min-w-[220px] shadow hover:shadow-lg transition ${className}`
      )}
    >
      <div className="w-full flex justify-center mb-2">
        <img
          src={image}
          alt={name}
          className="w-full aspect-square object-contain"
        />
      </div>
      {isSale && (
        <div className="rounded-full bg-gradient-to-r from-warning-light to-warning-main h-[25px] flex items-center justify-center gap-1.5 px-2.5 mb-2">
          <img src="/icon/fire.png" alt="fire" className="w-4 h-4" />
          <span className="text-xs font-semibold text-error-darker">
            Giá cực sốc
          </span>
        </div>
      )}
      <div className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 min-h-[40px]">
        {name}
      </div>
      <div className="font-bold text-lg text-[#B71D18] mb-1">
        {price.toLocaleString()} đ
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gray-400 line-through text-xs">
          {oldPrice.toLocaleString()} đ
        </span>
        <span className="text-[#B71D18] text-xs font-semibold">
          -{discount}%
        </span>
      </div>
      <button className="w-full bg-brand-50 text-[#0a5adf] font-semibold rounded-lg py-2 mt-auto hover:bg-[#d0e3fa] transition">
        Mua ngay
      </button>
    </div>
  );
};

export default ProductCard;
