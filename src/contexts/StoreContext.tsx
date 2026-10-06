import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import type { Product, FilterState, SortOption, Review, Order } from '../types';
import { products as initialProducts } from '../data/products';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
  actionLabel?: string;
  onAction?: () => void;
}

export type ActiveView = 'shop' | 'product' | 'cart' | 'wishlist' | 'orders';

interface StoreContextType {
  products: Product[];
  filteredProducts: Product[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  sortOption: SortOption;
  setSortOption: React.Dispatch<React.SetStateAction<SortOption>>;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  categories: string[];
  brands: string[];
  
  // Product Details & Routing
  activeView: ActiveView;
  activeProductId: string | null;
  navigateToProduct: (productId: string) => void;
  navigateTo: (view: ActiveView, productId?: string) => void;
  getProductById: (productId: string) => Product | undefined;
  
  // Reviews
  addReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
  
  // Recently Viewed
  recentlyViewedIds: string[];
  addToRecentlyViewed: (productId: string) => void;
  
  // Orders
  orders: Order[];
  placeOrder: (shippingAddress: string) => Order;
  
  // Toast notification
  toast: ToastMessage | null;
  showToast: (message: string, options?: { type?: 'success' | 'info' | 'error'; actionLabel?: string; onAction?: () => void }) => void;
  hideToast: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const initialFilters: FilterState = {
  searchQuery: '',
  category: null,
  brand: null,
  gender: null,
  minPrice: 0,
  maxPrice: 80000,
  minRating: 0,
  selectedSizes: [],
  selectedColors: [],
  inStockOnly: false,
  discountOnly: false,
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nexstore_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialProducts;
      }
    }
    return initialProducts;
  });

  const [sortOption, setSortOption] = useState<SortOption>('recommended');
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Active view & product routing
  const [activeView, setActiveView] = useState<ActiveView>('shop');
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : ['nike-air-max', 'zara-oversized-structured-blazer'];
  });

  // Recently Viewed
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('recently_viewed');
    return saved ? JSON.parse(saved) : ['nike-air-max', 'adidas-ultraboost-light'];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nexstore_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Toast
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('recently_viewed', JSON.stringify(recentlyViewedIds));
  }, [recentlyViewedIds]);

  useEffect(() => {
    localStorage.setItem('nexstore_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nexstore_products', JSON.stringify(products));
  }, [products]);

  // Handle URL hash changes for robust client-side routing
  const parseHash = useCallback(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/product/')) {
      const id = hash.replace('#/product/', '').trim();
      if (id) {
        setActiveView('product');
        setActiveProductId(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    if (hash === '#/cart') {
      setActiveView('cart');
      setActiveProductId(null);
      return;
    }
    if (hash === '#/wishlist') {
      setActiveView('wishlist');
      setActiveProductId(null);
      return;
    }
    if (hash === '#/orders') {
      setActiveView('orders');
      setActiveProductId(null);
      return;
    }
    // Default shop
    setActiveView('shop');
    setActiveProductId(null);
  }, []);

  useEffect(() => {
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, [parseHash]);

  const navigateTo = (view: ActiveView, productId?: string) => {
    if (view === 'product' && productId) {
      window.location.hash = `#/product/${productId}`;
      setActiveView('product');
      setActiveProductId(productId);
      addToRecentlyViewed(productId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'cart') {
      window.location.hash = '#/cart';
      setActiveView('cart');
      setActiveProductId(null);
    } else if (view === 'wishlist') {
      window.location.hash = '#/wishlist';
      setActiveView('wishlist');
      setActiveProductId(null);
    } else if (view === 'orders') {
      window.location.hash = '#/orders';
      setActiveView('orders');
      setActiveProductId(null);
    } else {
      window.location.hash = '#/';
      setActiveView('shop');
      setActiveProductId(null);
    }
  };

  const navigateToProduct = (productId: string) => {
    navigateTo('product', productId);
  };

  const addToRecentlyViewed = (productId: string) => {
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  };

  const getProductById = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    const prod = getProductById(productId);
    setWishlist(prev => 
      exists ? prev.filter(id => id !== productId) : [...prev, productId]
    );

    if (!exists && prod) {
      showToast(`Added ${prod.name} to your Wishlist ❤️`, {
        actionLabel: 'View Wishlist',
        onAction: () => navigateTo('wishlist')
      });
    } else if (prod) {
      showToast(`Removed from Wishlist`, { type: 'info' });
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const addReview = (productId: string, newReview: Omit<Review, 'id' | 'date'>) => {
    const reviewWithMeta: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: 'Just now'
    };

    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      const updatedReviews = [reviewWithMeta, ...(p.reviews || [])];
      const newRating = Number((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1));
      return {
        ...p,
        reviews: updatedReviews,
        reviewCount: updatedReviews.length,
        rating: newRating
      };
    }));

    showToast('✓ Review submitted successfully! Thank you for your feedback.', { type: 'success' });
  };

  const showToast = (message: string, options?: { type?: 'success' | 'info' | 'error'; actionLabel?: string; onAction?: () => void }) => {
    const id = String(Date.now());
    setToast({
      id,
      message,
      type: options?.type || 'success',
      actionLabel: options?.actionLabel,
      onAction: options?.onAction
    });

    setTimeout(() => {
      setToast(curr => curr?.id === id ? null : curr);
    }, 4000);
  };

  const hideToast = () => setToast(null);

  const placeOrder = (shippingAddress: string): Order => {
    const cartSaved = localStorage.getItem('cart');
    const cartItems = cartSaved ? JSON.parse(cartSaved) : [];
    
    const total = cartItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
    
    const deliveryDateObj = new Date();
    deliveryDateObj.setDate(deliveryDateObj.getDate() + 4);
    const formattedDelivery = deliveryDateObj.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

    const newOrder: Order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: cartItems.map((c: any) => ({
        productId: c.productId || c.id,
        name: c.name,
        brand: c.brand,
        image: c.image,
        price: c.price,
        quantity: c.quantity,
        selectedSize: c.selectedSize || 'Standard',
        selectedColor: c.selectedColor || 'Default'
      })),
      total,
      status: 'Confirmed',
      deliveryAddress: shippingAddress || '124, Linking Road, Bandra West, Mumbai, 400050',
      estimatedDelivery: `Delivery by ${formattedDelivery}`
    };

    setOrders(prev => [newOrder, ...prev]);
    localStorage.removeItem('cart');
    return newOrder;
  };

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, [products]);

  const brands = useMemo(() => {
    return Array.from(new Set(products.map(p => p.brand)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (filters.category && filters.category !== 'All') {
      if (filters.category === 'New Arrivals') {
        result = result.filter(p => p.badge === 'New');
      } else {
        result = result.filter(p => p.category === filters.category);
      }
    }

    // Brand
    if (filters.brand) {
      result = result.filter(p => p.brand === filters.brand);
    }

    // Gender
    if (filters.gender) {
      result = result.filter(p => p.gender === filters.gender || p.gender === 'Unisex');
    }

    // Price range
    result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);

    // Rating
    if (filters.minRating > 0) {
      result = result.filter(p => p.rating >= filters.minRating);
    }

    // Sizes
    if (filters.selectedSizes.length > 0) {
      result = result.filter(p => 
        p.sizes && p.sizes.some(s => filters.selectedSizes.includes(s))
      );
    }

    // Colors
    if (filters.selectedColors.length > 0) {
      result = result.filter(p => 
        p.colors && p.colors.some(c => filters.selectedColors.some(sc => c.name.toLowerCase().includes(sc.toLowerCase())))
      );
    }

    // In Stock only
    if (filters.inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Discount only
    if (filters.discountOnly) {
      result = result.filter(p => (p.discountPercentage || 0) > 0);
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
        result.sort((a, b) => (a.badge === 'New' ? -1 : b.badge === 'New' ? 1 : 0));
        break;
      default:
        // 'recommended' - top picks first
        result.sort((a, b) => (a.badge === 'Top Pick' ? -1 : b.badge === 'Top Pick' ? 1 : 0));
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
      isInWishlist,
      categories,
      brands,
      
      activeView,
      activeProductId,
      navigateToProduct,
      navigateTo,
      getProductById,
      
      addReview,
      recentlyViewedIds,
      addToRecentlyViewed,
      
      orders,
      placeOrder,
      
      toast,
      showToast,
      hideToast
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
