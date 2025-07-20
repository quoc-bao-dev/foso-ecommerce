# Category API Usage Guide

## Base URL

```
/api/v1/category
```

## Language Support

Use the `?lang` parameter to specify the language:

- `?lang=vi` (default) - Vietnamese
- `?lang=en` - English

## Endpoints

### 1. Get All Categories

```http
GET /api/v1/category
GET /api/v1/category?lang=en
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Áo thun",
      "description": "Các loại áo thun nam nữ với nhiều kiểu dáng và màu sắc đa dạng",
      "image": "/images/categories/tshirts.jpg",
      "productCount": 15,
      "updatedAt": "2024-01-15T10:30:00Z",
      "createdAt": "2024-01-10T09:00:00Z"
    }
  ],
  "lang": "vi",
  "total": 8
}
```

### 2. Get Category by ID

```http
GET /api/v1/category?id=1
GET /api/v1/category?id=1&lang=en
```

### 3. Search Categories

```http
GET /api/v1/category?search=áo thun
GET /api/v1/category?search=shoes&lang=en
GET /api/v1/category?search=thời trang
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Áo thun",
      "description": "Các loại áo thun nam nữ với nhiều kiểu dáng và màu sắc đa dạng",
      "image": "/images/categories/tshirts.jpg",
      "productCount": 15,
      "updatedAt": "2024-01-15T10:30:00Z",
      "createdAt": "2024-01-10T09:00:00Z"
    }
  ],
  "lang": "vi",
  "total": 1
}
```

**Search Features:**

- Searches in both category names and descriptions
- Case-insensitive search
- Supports both Vietnamese and English text
- Returns categories matching any part of the search term

### 4. Create New Category

```http
POST /api/v1/category
POST /api/v1/category?lang=en
```

**Request Body:**

```json
{
  "name": {
    "vi": "Áo len",
    "en": "Sweaters"
  },
  "description": {
    "vi": "Áo len nam nữ với chất liệu ấm áp và thiết kế thời trang",
    "en": "Men's and women's sweaters with warm material and fashionable design"
  },
  "image": "/images/categories/sweaters.jpg",
  "productCount": 0
}
```

### 5. Update Category

```http
PUT /api/v1/category?id=1
PUT /api/v1/category?id=1&lang=en
```

**Request Body:**

```json
{
  "productCount": 20,
  "description": {
    "vi": "Áo thun nam nữ với nhiều kiểu dáng và màu sắc đa dạng, phù hợp cho mọi lứa tuổi",
    "en": "Men's and women's t-shirts with diverse styles and colors, suitable for all ages"
  }
}
```

### 6. Delete Category

```http
DELETE /api/v1/category?id=1
```

## Error Responses

### 400 Bad Request

```json
{
  "error": "Invalid language parameter. Use \"vi\" or \"en\""
}
```

### 404 Not Found

```json
{
  "error": "Category not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error"
}
```

## Data Structure

### Category Type

```typescript
{
  id: string;
  name: string; // Localized based on lang parameter
  description: string; // Localized based on lang parameter
  image: string;
  productCount: number;
  updatedAt: string;
  createdAt: string;
}
```

### Category Data (for creation/update)

```typescript
{
  name: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  image: string;
  productCount?: number;  // Optional, defaults to 0
}
```

## Examples

### cURL Examples

1. Get all categories in Vietnamese:

```bash
curl "http://localhost:3000/api/v1/category"
```

2. Get all categories in English:

```bash
curl "http://localhost:3000/api/v1/category?lang=en"
```

3. Get category by ID:

```bash
curl "http://localhost:3000/api/v1/category?id=1&lang=en"
```

4. Search categories:

```bash
# Search in Vietnamese
curl "http://localhost:3000/api/v1/category?search=áo thun"

# Search in English
curl "http://localhost:3000/api/v1/category?search=shoes&lang=en"

# Search for fashion
curl "http://localhost:3000/api/v1/category?search=thời trang"
```

5. Create new category:

```bash
curl -X POST "http://localhost:3000/api/v1/category" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {
      "vi": "Áo len",
      "en": "Sweaters"
    },
    "description": {
      "vi": "Áo len nam nữ với chất liệu ấm áp và thiết kế thời trang",
      "en": "Men'\''s and women'\''s sweaters with warm material and fashionable design"
    },
    "image": "/images/categories/sweaters.jpg",
    "productCount": 0
  }'
```

6. Update category:

```bash
curl -X PUT "http://localhost:3000/api/v1/category?id=1" \
  -H "Content-Type: application/json" \
  -d '{
    "productCount": 20,
    "description": {
      "vi": "Áo thun nam nữ với nhiều kiểu dáng và màu sắc đa dạng, phù hợp cho mọi lứa tuổi",
      "en": "Men'\''s and women'\''s t-shirts with diverse styles and colors, suitable for all ages"
    }
  }'
```

7. Delete category:

```bash
curl -X DELETE "http://localhost:3000/api/v1/category?id=1"
```

## Special Features

### Product Count Management

The category API includes a `productCount` field that tracks how many products belong to each category. This can be useful for:

- Displaying category statistics
- Filtering categories by popularity
- Managing category hierarchies

### Multilingual Support

All text fields (name, description) support both Vietnamese and English:

- When creating/updating, provide both language versions
- When retrieving, specify the desired language with `?lang=`
- Search works across both languages simultaneously

### Image Management

Each category has an associated image path that can be used for:

- Category thumbnails
- Category banners
- Visual category navigation
