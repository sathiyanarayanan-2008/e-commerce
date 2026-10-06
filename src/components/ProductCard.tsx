import React from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist, navigateToProduct } = useStore();
  
  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateToProduct(product.id);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'Top Pick':
        return 'bg-amber-500 text-white';
      case 'New':
        return 'bg-emerald-600 text-white';
      case 'Sale':
        return 'bg-rose-600 text-white';
      case 'Trending':
        return 'bg-indigo-600 text-white';
      default:
        return 'bg-slate-900 text-white';
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden card-hover flex flex-col justify-between cursor-pointer select-none"
    >
      {/* Top Floating Elements: Badge & Wishlist Heart */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
        <div>
          {product.badge ? (
            <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-sm ${getBadgeStyle(product.badge)}`}>
              {product.badge}
            </span>
          ) : product.discountPercentage ? (
            <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-rose-600 text-white shadow-sm">
              {product.discountPercentage}% OFF
            </span>
          ) : null}
        </div>

        <button 
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 pointer-events-auto shadow-md ${
            isWishlisted 
              ? 'bg-rose-50 text-rose-600 ring-2 ring-rose-200 dark:bg-rose-950/60 dark:ring-rose-800' 
              : 'bg-white/90 dark:bg-slate-800/90 text-slate-400 hover:text-rose-500 hover:scale-110'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform ${isWishlisted ? 'fill-rose-500 scale-110' : ''}`} />
        </button>
      </div>

      {/* Image Showcase Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800/60">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 z-20 hidden md:block opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-950/90 hover:bg-slate-950 dark:bg-white/90 dark:hover:bg-white text-white dark:text-slate-950 text-xs font-bold tracking-wide backdrop-blur-md shadow-lg pointer-events-auto flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 gap-2">
        <div className="space-y-1">
          {/* Brand & Rating Row */}
          <div className="flex items-center justify-between gap-1 text-[11px] sm:text-xs text-slate-500">
            <span className="font-extrabold uppercase tracking-widest text-slate-700 dark:text-slate-300 truncate">
              {product.brand}
            </span>

            <div className="flex items-center gap-1 shrink-0 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md font-bold text-slate-800 dark:text-slate-200">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Price & Discount */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm sm:text-base font-black text-slate-950 dark:text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] sm:text-xs text-slate-400 line-through font-medium">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discountPercentage && (
              <span className="text-[10px] sm:text-[11px] font-extrabold text-rose-600 dark:text-rose-400">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Mobile Quick Add Icon */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white transition-colors"
            title="Add to cart"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
