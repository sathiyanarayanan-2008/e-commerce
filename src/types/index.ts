export interface Review {
  id: string;
  userName: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
  verifiedPurchase: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Clothing' | 'Shoes' | 'Accessories' | 'Sports' | 'Watches' | 'Bags' | string;
  gender?: 'Men' | 'Women' | 'Kids' | 'Unisex';
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  image: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  badge?: 'Top Pick' | 'New' | 'Sale' | 'Trending';
  specifications: Record<string, string>;
  features: string[];
  material?: string;
  careInstructions?: string;
  reviews?: Review[];
}

export type SortOption =
  | 'recommended'
  | 'price-low'
  | 'price-high'
  | 'rating'
  | 'newest'
  | 'discount';

export interface FilterState {
  searchQuery: string;
  category: string | null;
  brand: string | null;
  gender: string | null;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  selectedSizes: string[];
  selectedColors: string[];
  inStockOnly: boolean;
  discountOnly: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  deliveryAddress: string;
  estimatedDelivery: string;
}
