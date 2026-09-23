import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import type { Product, FilterState, SortOption } from '../types';
import { products as initialProducts } from '../data/products';

interface StoreContextType {
  products: Product[];
  filteredProducts: Product[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  sortOption: SortOption;
  setSortOption: React.Dispatch<React.SetStateAction<SortOption>>;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  categories: string[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products] = useState<Product[]>(initialProducts);
  const [sortOption, setSortOption] = useState<SortOption>('recommended');
  
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: null,
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }

    // Price filter
    result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);

    // Rating filter
    if (filters.minRating > 0) {
      result = result.filter(p => p.rating >= filters.minRating);
    }

    // Sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
        break;
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      default:
        // recommended (default order)
        break;
    }

    return result;
  }, [products, filters, sortOption]);

  return (
    <StoreContext.Provider value={{
      products,
      filteredProducts,
      filters,
      setFilters,
      sortOption,
      setSortOption,
      wishlist,
      toggleWishlist,
      categories
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
