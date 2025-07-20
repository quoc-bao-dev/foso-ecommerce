export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  quantity: number;
  unit?: string;
  brand?: string;
  category?: string;
  inStock?: boolean;
}
