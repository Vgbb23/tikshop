export interface CartItem {
  id: string;
  cartId: string; // Unique ID for the item in the cart (since same product can have different variations)
  name: string;
  currentPrice: number;
  originalPrice: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  selected: boolean;
}

export interface ProductData {
  id: string;
  name: string;
  currentPrice: number;
  originalPrice: number;
  images: string[];
}
