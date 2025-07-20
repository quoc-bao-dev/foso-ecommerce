import {
  preloadProductById,
  generateProductPaths,
} from "@/utils/staticGeneration";
import { notFound } from "next/navigation";

// Generate static params for all products
export async function generateStaticParams() {
  const viPaths = await generateProductPaths("vi");
  const enPaths = await generateProductPaths("en");
  return [...viPaths, ...enPaths];
}

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string; lang: "vi" | "en" }>;
}) => {
  const { id, lang } = await params;
  // Pre-load product data for static generation
  const product = await preloadProductById(id, lang);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="mb-4">
            <span className="text-2xl font-semibold text-red-600">
              {product.price.toLocaleString()} VNĐ
            </span>
            {product.oldPrice > product.price && (
              <span className="text-lg text-gray-500 line-through ml-2">
                {product.oldPrice.toLocaleString()} VNĐ
              </span>
            )}
          </div>

          {product.discount > 0 && (
            <div className="mb-4">
              <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                -{product.discount}%
              </span>
            </div>
          )}

          <div className="mb-4">
            <p className="text-gray-600">Category: {product.category}</p>
            {product.rating && (
              <p className="text-gray-600">Rating: {product.rating}/5</p>
            )}
            {product.salesCount && (
              <p className="text-gray-600">Sales: {product.salesCount}</p>
            )}
          </div>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
