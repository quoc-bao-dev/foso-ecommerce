// Category types based on API documentation

import { LocalizedText } from "@/modules/shared";

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  updatedAt: string;
  createdAt: string;
}

export interface CategoryData {
  name: LocalizedText;
  description: LocalizedText;
  image: string;
  productCount?: number;
}

export interface CategoryUpdateData {
  name?: LocalizedText;
  description?: LocalizedText;
  image?: string;
  productCount?: number;
}

export interface CategoryFilters {
  id?: string;
  search?: string;
  lang?: "vi" | "en";
  page?: number;
  limit?: number;
}

export interface CategoryResponse {
  success: boolean;
  data: Category[];
  lang: string;
  total: number;
}

export interface SingleCategoryResponse {
  success: boolean;
  data: Category;
  lang: string;
}

export interface CategoryError {
  error: string;
}
