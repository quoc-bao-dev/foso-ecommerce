import { LocalizedText } from "@/modules/shared";

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  category: string;
  brand?: string;
  unit?: string;
  inStock?: boolean;
  updatedAt: string;
  createdAt: string;
  salesCount?: number;
  isFeatured?: boolean;
  rating?: number;
  viewCount?: number;
};

// Product types based on API documentation

export interface ProductData {
  name: LocalizedText;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  category: LocalizedText;
}

export interface ProductUpdateData {
  name?: LocalizedText;
  image?: string;
  price?: number;
  oldPrice?: number;
  discount?: number;
  category?: LocalizedText;
}

export interface ProductFilters {
  id?: string;
  category?: string;
  categoryId?: string;
  search?: string;
  lang?: "vi" | "en";
  page?: number;
  limit?: number;
  sort?:
    | "newest"
    | "oldest"
    | "price-asc"
    | "price-desc"
    | "best-seller"
    | "featured"
    | "relevant";
  gtPrice?: number;
  ltPrice?: number;
}

export interface ProductResponse {
  success: boolean;
  data: Product[];
  lang: string;
  total: number;
}

export interface ProductPaginationResponse extends ProductResponse {
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface SingleProductResponse {
  success: boolean;
  data: Product;
  lang: string;
}

export interface ProductError {
  error: string;
}
