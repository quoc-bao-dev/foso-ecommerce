# Product API Usage Guide

## Base URL

```
/api/v1/product
```

## Language Support

Use the `?lang` parameter to specify the language:

- `?lang=vi` (default) - Vietnamese
- `?lang=en` - English

## Endpoints

### 1. Get All Products

```http
GET /api/v1/product
GET /api/v1/product?lang=en
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Áo thun nam basic",
      "image": "/images/products/tshirt-1.jpg",
      "price": 299000,
      "oldPrice": 399000,
      "discount": 25,
      "category": "Áo thun",
      "updatedAt": "2024-01-15T10:30:00Z",
      "createdAt": "2024-01-10T09:00:00Z"
    }
  ],
  "lang": "vi",
  "total": 5
}
```

### 2. Get Product by ID

```http
GET /api/v1/product?id=1
GET /api/v1/product?id=1&lang=en
```

### 3. Get Products by Category

```http
GET /api/v1/product?category=áo thun
GET /api/v1/product?category=t-shirts&lang=en
```

### 4. Search Products

```http
GET /api/v1/product?search=áo thun
GET /api/v1/product?search=shirt&lang=en
GET /api/v1/product?search=jeans
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Áo thun nam basic",
      "image": "/images/products/tshirt-1.jpg",
      "price": 299000,
      "oldPrice": 399000,
      "discount": 25,
      "category": "Áo thun",
      "updatedAt": "2024-01-15T10:30:00Z",
      "createdAt": "2024-01-10T09:00:00Z"
    }
  ],
  "lang": "vi",
  "total": 1
}
```

**Search Features:**

- Searches in both product names and categories
- Case-insensitive search
- Supports both Vietnamese and English text
- Returns products matching any part of the search term

### 5. Create New Product

```http
POST /api/v1/product
POST /api/v1/product?lang=en
```

**Request Body:**

```json
{
  "name": {
    "vi": "Áo sơ mi nam",
    "en": "Men's shirt"
  },
  "image": "/images/products/shirt-1.jpg",
  "price": 450000,
  "oldPrice": 550000,
  "discount": 18,
  "category": {
    "vi": "Áo sơ mi",
    "en": "Shirts"
  }
}
```

### 6. Update Product

```http
PUT /api/v1/product?id=1
PUT /api/v1/product?id=1&lang=en
```

**Request Body:**

```json
{
  "price": 420000,
  "discount": 20
}
```

### 7. Delete Product

```http
DELETE /api/v1/product?id=1
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
  "error": "Product not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error"
}
```

## Data Structure

### Product Type

```typescript
{
  id: string;
  name: string; // Localized based on lang parameter
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  category: string; // Localized based on lang parameter
  updatedAt: string;
  createdAt: string;
}
```

### Product Data (for creation/update)

```typescript
{
  name: {
    vi: string;
    en: string;
  }
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  category: {
    vi: string;
    en: string;
  }
}
```

## Examples

### cURL Examples

1. Get all products in Vietnamese:

```bash
curl "http://localhost:3000/api/v1/product"
```

2. Get all products in English:

```bash
curl "http://localhost:3000/api/v1/product?lang=en"
```

3. Get product by ID:

```bash
curl "http://localhost:3000/api/v1/product?id=1&lang=en"
```

4. Search products:

```bash
# Search in Vietnamese
curl "http://localhost:3000/api/v1/product?search=áo thun"

# Search in English
curl "http://localhost:3000/api/v1/product?search=shirt&lang=en"

# Search for jeans
curl "http://localhost:3000/api/v1/product?search=jeans"
```

5. Create new product:

```bash
curl -X POST "http://localhost:3000/api/v1/product" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {
      "vi": "Áo sơ mi nam",
      "en": "Men'\''s shirt"
    },
    "image": "/images/products/shirt-1.jpg",
    "price": 450000,
    "oldPrice": 550000,
    "discount": 18,
    "category": {
      "vi": "Áo sơ mi",
      "en": "Shirts"
    }
  }'
```

6. Update product:

```bash
curl -X PUT "http://localhost:3000/api/v1/product?id=1" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 420000,
    "discount": 20
  }'
```

7. Delete product:

```bash
curl -X DELETE "http://localhost:3000/api/v1/product?id=1"
```
