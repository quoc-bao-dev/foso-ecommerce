import { NextRequest, NextResponse } from "next/server";
import { CategoryService } from "@/server/category-service/categoryService";

const categoryService = new CategoryService();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = (searchParams.get("lang") || "vi") as "vi" | "en";
    const id = searchParams.get("id");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

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
      // Get category by ID
      const category = categoryService.getCategoryById(id, lang);
      if (!category) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }
      result = category;
      total = 1;
    } else if (search) {
      // Search categories with pagination
      const searchResult = categoryService.searchCategories(search, lang);
      total = searchResult.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      result = searchResult.slice(startIndex, endIndex);
    } else {
      // Get all categories with pagination
      const allCategories = categoryService.getAllCategories(lang);
      total = allCategories.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      result = allCategories.slice(startIndex, endIndex);
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
    console.error("Category API error:", error);
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
    const requiredFields = ["name", "description", "image"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate name and description structure for multilingual support
    if (!body.name.vi || !body.name.en) {
      return NextResponse.json(
        { error: 'Name must have both "vi" and "en" properties' },
        { status: 400 }
      );
    }

    if (!body.description.vi || !body.description.en) {
      return NextResponse.json(
        { error: 'Description must have both "vi" and "en" properties' },
        { status: 400 }
      );
    }

    const newCategory = categoryService.createCategory({
      ...body,
      productCount: body.productCount || 0,
    });

    return NextResponse.json(
      {
        success: true,
        data: newCategory,
        message: "Category created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Category creation error:", error);
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
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    const updatedCategory = categoryService.updateCategory(id, body);

    if (!updatedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedCategory,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Category update error:", error);
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
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    const deleted = categoryService.deleteCategory(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Category deletion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
