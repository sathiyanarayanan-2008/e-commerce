import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem } from '../types';
import { useStore } from './StoreContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  moveToWishlist: (cartItemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  cartOriginalTotal: number;
  cartSavings: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { showToast, toggleWishlist, isInWishlist, navigateTo } = useStore();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product: Product, 
    quantity: number = 1, 
    selectedColor?: string, 
    selectedSize?: string
  ) => {
    const color = selectedColor || product.colors?.[0]?.name || 'Standard';
    const size = selectedSize || product.sizes?.[0] || 'Standard';
    const cartItemId = `${product.id}-${color}-${size}`.replace(/\s+/g, '-').toLowerCase();

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === cartItemId);
      if (existingIndex > -1) {
        return prev.map((item, idx) => 
          idx === existingIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      const newItem: CartItem = {
        id: cartItemId,
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        selectedColor: color,
        selectedSize: size,
        quantity
      };
      return [...prev, newItem];
    });

    showToast(`✓ ${product.name} added to your cart`, {
      type: 'success',
      actionLabel: 'View Cart',
      onAction: () => navigateTo('cart')
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from cart', { type: 'info' });
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => 
      prev.map(item => 
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const moveToWishlist = (cartItemId: string) => {
    const item = cart.find(c => c.id === cartItemId);
    if (!item) return;
    if (!isInWishlist(item.productId)) {
      toggleWishlist(item.productId);
    }
    removeFromCart(cartItemId);
    showToast(`Moved ${item.name} to Wishlist ❤️`, {
      actionLabel: 'View Wishlist',
      onAction: () => navigateTo('wishlist')
    });
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartOriginalTotal = cart.reduce((total, item) => total + ((item.originalPrice || item.price) * item.quantity), 0);
  const cartSavings = Math.max(0, cartOriginalTotal - cartTotal);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      moveToWishlist,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      cartTotal,
      cartOriginalTotal,
      cartSavings,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
