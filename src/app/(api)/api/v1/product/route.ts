import { SortProduct } from "@/modules/product/store";
import { ProductService } from "@/server/product-service/productService";
import { NextRequest, NextResponse } from "next/server";

const productService = new ProductService();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = (searchParams.get("lang") || "vi") as "vi" | "en";
    const id = searchParams.get("id");
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const sort = searchParams.get("sort") as SortProduct;

    // Price filtering parameters
    const gtPrice = searchParams.get("gt_price");
    const ltPrice = searchParams.get("lt_price");
    const minPrice = gtPrice ? parseFloat(gtPrice) : undefined;
    const maxPrice = ltPrice ? parseFloat(ltPrice) : undefined;

    // Validate language parameter
    if (lang !== "vi" && lang !== "en") {
      return NextResponse.json(
        { error: 'Invalid language parameter. Use "vi" or "en"' },
        { status: 400 }
      );
    }

    // Validate pagination parameters
    if (page < 1) {
      return NextResponse.json(
        { error: "Page must be greater than 0" },
        { status: 400 }
      );
    }

    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "Limit must be between 1 and 100" },
        { status: 400 }
      );
    }

    let result;
    let total = 0;

    if (id) {
      // Get product by ID
      const product = productService.getProductById(id, lang);
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      result = product;
      total = 1;
    } else if (search) {
      // Search products with pagination, sorting and price filtering
      const searchResult = productService.searchProducts(search, lang);

      // Apply price filtering if provided
      let filteredProducts = searchResult;
      if (minPrice !== undefined || maxPrice !== undefined) {
        filteredProducts = productService.filterProductsByPrice(
          searchResult,
          minPrice,
          maxPrice
        );
      }

      total = filteredProducts.length;

      // Apply sorting if provided
      let sortedProducts = filteredProducts;
      if (sort) {
        sortedProducts = productService.sortProducts(filteredProducts, sort);
      }

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      result = sortedProducts.slice(startIndex, endIndex);
    } else if (categoryId) {
      // Get products by category ID with pagination, sorting and price filtering
      const categoryResult = productService.getProductsByCategory(
        categoryId,
        lang
      );

      // Apply price filtering if provided
      let filteredProducts = categoryResult;
      if (minPrice !== undefined || maxPrice !== undefined) {
        filteredProducts = productService.filterProductsByPrice(
          categoryResult,
          minPrice,
          maxPrice
        );
      }

      total = filteredProducts.length;

      // Apply sorting if provided
      let sortedProducts = filteredProducts;
      if (sort) {
        sortedProducts = productService.sortProducts(filteredProducts, sort);
      }

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      result = sortedProducts.slice(startIndex, endIndex);
    } else {
      // Get all products with pagination, sorting and price filtering
      const allProducts = productService.getAllProducts(lang);

      // Apply price filtering if provided
      let filteredProducts = allProducts;
      if (minPrice !== undefined || maxPrice !== undefined) {
        filteredProducts = productService.filterProductsByPrice(
          allProducts,
          minPrice,
          maxPrice
        );
      }

      total = filteredProducts.length;

      // Apply sorting if provided
      let sortedProducts = filteredProducts;
      if (sort) {
        sortedProducts = productService.sortProducts(filteredProducts, sort);
      }

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      result = sortedProducts.slice(startIndex, endIndex);
    }

    return NextResponse.json({
      success: true,
      data: result,
      lang,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    });
  } catch (error) {
    console.error("Product API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = (searchParams.get("lang") || "vi") as "vi" | "en";
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "name",
      "image",
      "price",
      "oldPrice",
      "discount",
      "category",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate name and category structure for multilingual support
    if (!body.name.vi || !body.name.en) {
      return NextResponse.json(
        { error: 'Name must have both "vi" and "en" properties' },
        { status: 400 }
      );
    }

    if (!body.category.vi || !body.category.en) {
      return NextResponse.json(
        { error: 'Category must have both "vi" and "en" properties' },
        { status: 400 }
      );
    }

    const newProduct = productService.createProduct(body);

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
        message: "Product created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = (searchParams.get("lang") || "vi") as "vi" | "en";
    const id = searchParams.get("id");
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const updatedProduct = productService.updateProduct(id, body);

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Product update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const deleted = productService.deleteProduct(id);

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Product deletion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
