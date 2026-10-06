import { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, Check, Sparkles, ShieldCheck } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';
import { RatingStars, cn } from './ui';

export function QuickViewModal({ product, onClose }: { product: Product, onClose: () => void }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [isAdded, setIsAdded] = useState(false);
  
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Window */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[28px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200 z-10 border border-slate-200 dark:border-slate-800 my-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:scale-110 active:scale-95 transition-all text-slate-800 dark:text-slate-200 shadow-md group"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
        </button>

        {/* Left Side: Product Image Showcase */}
        <div className="w-full md:w-1/2 relative bg-slate-50 dark:bg-slate-800/40 p-4 md:p-6 flex flex-col justify-center items-center">
          {/* Badges */}
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
            {product.discountPercentage && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-md">
                -{product.discountPercentage}% OFF
              </span>
            )}
            {product.badge === 'New' && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                NEW ARRIVAL
              </span>
            )}
          </div>

          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-800">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side: Product Details & Controls */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] relative z-10">
          <div>
            {/* Category Chip */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-3">
              <span>{product.brand} • {product.category}</span>
            </div>
            
            {/* Title */}
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
              {product.name}
            </h2>
            
            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <RatingStars rating={product.rating} count={product.reviewCount} />
              <span className="text-xs text-slate-400 font-medium">Verified Reviews</span>
            </div>
            
            {/* Price section */}
            <div className="flex items-baseline gap-3 mb-5 pb-4 border-b border-slate-200 dark:border-slate-800">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-base text-slate-400 line-through font-semibold">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Selectable Options */}
            <div className="space-y-4 mb-6">
              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Finish / Color: <span className="text-slate-900 dark:text-white">{selectedColor}</span>
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map(color => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={cn(
                          "w-7 h-7 rounded-full border-2 transition-all p-0.5 relative",
                          selectedColor === color.name 
                            ? "border-slate-900 dark:border-white ring-2 ring-slate-900/20 scale-110" 
                            : "border-transparent opacity-80 hover:opacity-100 hover:scale-105"
                        )}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={`Select color ${color.name}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Size: <span className="text-slate-900 dark:text-white">{selectedSize}</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "min-w-[40px] h-9 px-3 rounded-xl flex items-center justify-center text-xs font-bold transition-all border",
                          selectedSize === size 
                            ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white shadow-sm" 
                            : "bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-400"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Quantity</h4>
                <div className="flex items-center w-28 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <button 
                    className="flex-1 h-full hover:bg-slate-200 font-bold text-xs"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-xs text-slate-900 dark:text-white">
                    {quantity}
                  </span>
                  <button 
                    className="flex-1 h-full hover:bg-slate-200 font-bold text-xs"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex gap-3">
            <button 
              className={cn(
                "flex-1 py-3 px-6 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:bg-slate-800 transition-all",
                isAdded && "!bg-emerald-600 !text-white"
              )}
              onClick={handleAddToCart}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  Added to Bag!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 mr-1" />
                  Add to Cart • ₹{(product.price * quantity).toLocaleString('en-IN')}
                </>
              )}
            </button>
            
            <button 
              onClick={() => toggleWishlist(product.id)}
              className={cn(
                "p-3 rounded-2xl border transition-all text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700",
                isWishlisted && "text-rose-500 border-rose-200 bg-rose-50"
              )}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>30-Day Easy Returns Guarantee</span>
          </div>

        </div>
      </div>
    </div>
  );
}
