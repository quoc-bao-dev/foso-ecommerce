import fs from "fs";
import path from "path";

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  updatedAt: string;
  createdAt: string;
}

interface CategoryData {
  id: string;
  name: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  image: string;
  productCount: number;
  updatedAt: string;
  createdAt: string;
}

interface CategoriesResponse {
  categories: CategoryData[];
}

export class CategoryService {
  private readonly dataPath: string;

  constructor() {
    this.dataPath = path.join(process.cwd(), "src", "db", "categories.json");
  }

  private readCategories(): CategoryData[] {
    try {
      const data = fs.readFileSync(this.dataPath, "utf-8");
      const response: CategoriesResponse = JSON.parse(data);
      return response.categories;
    } catch (error) {
      console.error("Error reading categories data:", error);
      return [];
    }
  }

  private writeCategories(categories: CategoryData[]): void {
    try {
      const data: CategoriesResponse = { categories };
      fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing categories data:", error);
      throw new Error("Failed to save categories data");
    }
  }

  public transformCategory(
    category: CategoryData,
    lang: "vi" | "en"
  ): Category {
    return {
      id: category.id,
      name: category.name[lang],
      description: category.description[lang],
      image: category.image,
      productCount: category.productCount,
      updatedAt: category.updatedAt,
      createdAt: category.createdAt,
    };
  }

  getAllCategories(lang: "vi" | "en" = "vi"): Category[] {
    const categories = this.readCategories();
    return categories.map((category) => this.transformCategory(category, lang));
  }

  getCategoryById(id: string, lang: "vi" | "en" = "vi"): Category | null {
    const categories = this.readCategories();
    const category = categories.find((c) => c.id === id);
    return category ? this.transformCategory(category, lang) : null;
  }

  searchCategories(query: string, lang: "vi" | "en" = "vi"): Category[] {
    const categories = this.readCategories();
    const searchTerm = query.toLowerCase().trim();

    if (!searchTerm) return [];

    return categories
      .filter((category) => {
        const nameVi = category.name.vi.toLowerCase();
        const nameEn = category.name.en.toLowerCase();
        const descVi = category.description.vi.toLowerCase();
        const descEn = category.description.en.toLowerCase();

        return (
          nameVi.includes(searchTerm) ||
          nameEn.includes(searchTerm) ||
          descVi.includes(searchTerm) ||
          descEn.includes(searchTerm)
        );
      })
      .map((category) => this.transformCategory(category, lang));
  }

  createCategory(
    categoryData: Omit<CategoryData, "id" | "createdAt" | "updatedAt">
  ): Category {
    const categories = this.readCategories();
    const newCategory: CategoryData = {
      ...categoryData,
      id: (categories.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    categories.push(newCategory);
    this.writeCategories(categories);

    return this.transformCategory(newCategory, "vi");
  }

  updateCategory(
    id: string,
    updates: Partial<Omit<CategoryData, "id" | "createdAt">>
  ): Category | null {
    const categories = this.readCategories();
    const index = categories.findIndex((c) => c.id === id);

    if (index === -1) return null;

    categories[index] = {
      ...categories[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.writeCategories(categories);
    return this.transformCategory(categories[index], "vi");
  }

  deleteCategory(id: string): boolean {
    const categories = this.readCategories();
    const filteredCategories = categories.filter((c) => c.id !== id);

    if (filteredCategories.length === categories.length) {
      return false; // Category not found
    }

    this.writeCategories(filteredCategories);
    return true;
  }

  updateProductCount(categoryId: string, count: number): boolean {
    const categories = this.readCategories();
    const index = categories.findIndex((c) => c.id === categoryId);

    if (index === -1) return false;

    categories[index].productCount = count;
    categories[index].updatedAt = new Date().toISOString();

    this.writeCategories(categories);
    return true;
  }
}
