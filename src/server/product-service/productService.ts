import { Product } from "@/modules/product/types/types";
import fs from "fs";
import path from "path";

type SortProduct =
  | "newest"
  | "oldest"
  | "price-asc"
  | "price-desc"
  | "best-seller"
  | "featured"
  | "relevant";

interface ProductData {
  id: string;
  name: {
    vi: string;
    en: string;
  };
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  category: {
    vi: string;
    en: string;
  };
  categoryId: string;
  updatedAt: string;
  createdAt: string;
  salesCount?: number;
  isFeatured?: boolean;
  rating?: number;
  viewCount?: number;
}

interface ProductsResponse {
  products: ProductData[];
}

export class ProductService {
  private readonly dataPath: string;

  constructor() {
    this.dataPath = path.join(process.cwd(), "src", "db", "products.json");
  }

  private readProducts(): ProductData[] {
    try {
      const data = fs.readFileSync(this.dataPath, "utf-8");
      const response: ProductsResponse = JSON.parse(data);
      return response.products;
    } catch (error) {
      console.error("Error reading products data:", error);
      return [];
    }
  }

  private writeProducts(products: ProductData[]): void {
    try {
      const data: ProductsResponse = { products };
      fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing products data:", error);
      throw new Error("Failed to save products data");
    }
  }

  public transformProduct(product: ProductData, lang: "vi" | "en"): Product {
    return {
      id: product.id,
      name: product.name[lang],
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice,
      discount: product.discount,
      category: product.category[lang],
      updatedAt: product.updatedAt,
      createdAt: product.createdAt,
      salesCount: product.salesCount || 0,
      isFeatured: product.isFeatured || false,
      rating: product.rating || 0,
      viewCount: product.viewCount || 0,
    };
  }

  getAllProducts(lang: "vi" | "en" = "vi"): Product[] {
    const products = this.readProducts();
    return products.map((product) => this.transformProduct(product, lang));
  }

  getProductById(id: string, lang: "vi" | "en" = "vi"): Product | null {
    const products = this.readProducts();
    const product = products.find((p) => p.id === id);
    return product ? this.transformProduct(product, lang) : null;
  }

  getProductsByCategory(
    categoryId: string,
    lang: "vi" | "en" = "vi"
  ): Product[] {
    const products = this.readProducts();
    return products
      .filter((product) => product.categoryId === categoryId)
      .map((product) => this.transformProduct(product, lang));
  }

  searchProducts(query: string, lang: "vi" | "en" = "vi"): Product[] {
    const products = this.readProducts();
    const searchTerm = query.toLowerCase().trim();

    if (!searchTerm) return [];

    return products
      .filter((product) => {
        const nameVi = product.name.vi.toLowerCase();
        const nameEn = product.name.en.toLowerCase();
        const categoryVi = product.category.vi.toLowerCase();
        const categoryEn = product.category.en.toLowerCase();

        return (
          nameVi.includes(searchTerm) ||
          nameEn.includes(searchTerm) ||
          categoryVi.includes(searchTerm) ||
          categoryEn.includes(searchTerm)
        );
      })
      .map((product) => this.transformProduct(product, lang));
  }

  sortProducts(products: Product[], sort: SortProduct): Product[] {
    switch (sort) {
      case "newest":
        return products.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      case "oldest":
        return products.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

      case "price-asc":
        return products.sort((a, b) => a.price - b.price);

      case "price-desc":
        return products.sort((a, b) => b.price - a.price);

      case "best-seller":
        return products.sort(
          (a, b) => (b.salesCount || 0) - (a.salesCount || 0)
        );

      case "featured":
        return products.sort((a, b) => {
          // Sắp xếp theo featured trước, sau đó theo rating
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });

      case "relevant":
        return products.sort((a, b) => {
          // Sắp xếp theo tổng điểm liên quan (rating + viewCount + salesCount)
          const scoreA =
            (a.rating || 0) * 0.4 +
            (a.viewCount || 0) * 0.3 +
            (a.salesCount || 0) * 0.3;
          const scoreB =
            (b.rating || 0) * 0.4 +
            (b.viewCount || 0) * 0.3 +
            (b.salesCount || 0) * 0.3;
          return scoreB - scoreA;
        });

      default:
        return products;
    }
  }

  createProduct(
    productData: Omit<ProductData, "id" | "createdAt" | "updatedAt">
  ): Product {
    const products = this.readProducts();
    const newProduct: ProductData = {
      ...productData,
      id: (products.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    products.push(newProduct);
    this.writeProducts(products);

    return this.transformProduct(newProduct, "vi");
  }

  updateProduct(
    id: string,
    updates: Partial<Omit<ProductData, "id" | "createdAt">>
  ): Product | null {
    const products = this.readProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.writeProducts(products);
    return this.transformProduct(products[index], "vi");
  }

  deleteProduct(id: string): boolean {
    const products = this.readProducts();
    const filteredProducts = products.filter((p) => p.id !== id);

    if (filteredProducts.length === products.length) {
      return false;
    }

    this.writeProducts(filteredProducts);
    return true;
  }

  filterProductsByPrice(
    products: Product[],
    minPrice?: number,
    maxPrice?: number
  ): Product[] {
    return products.filter((product) => {
      const price = product.price;

      // Filter by minimum price (gt_)
      if (minPrice !== undefined && price <= minPrice) {
        return false;
      }

      // Filter by maximum price (lt_)
      if (maxPrice !== undefined && price >= maxPrice) {
        return false;
      }

      return true;
    });
  }
}
