import { LocalizedText } from "@/modules/shared";

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  category: string;
  updatedAt: string;
  createdAt: string;
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
