export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  image: string;
  colors?: string[];
  sizes?: string[];
  isNew?: boolean;
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
  minPrice: number;
  maxPrice: number;
  minRating: number;
}
