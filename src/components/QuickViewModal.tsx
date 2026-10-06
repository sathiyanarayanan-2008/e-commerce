import { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, Check, Sparkles, ShieldCheck } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';
import { RatingStars, cn } from './ui';

export function QuickViewModal({ product, onClose }: { product: Product, onClose: () => void }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
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
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Liquid Frosted Backdrop with Ambient Vignette */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Liquid Glass Modal Window (Dribbble reference style) */}
      <div className="relative w-full max-w-4xl liquid-glass-card-strong rounded-[28px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-modal-entry z-10 border border-white/30 dark:border-white/12 my-auto">
        
        {/* Specular rim border & top edge sheen reflection */}
        <div className="liquid-glass-specular-border pointer-events-none" />
        <div className="liquid-glass-edge-light pointer-events-none" />

        {/* Floating Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full liquid-glass-badge hover:scale-110 active:scale-95 transition-all text-foreground border border-white/30 dark:border-white/15 shadow-lg group"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
        </button>

        {/* Left Side: Product Image Showcase */}
        <div className="w-full md:w-1/2 relative bg-slate-900/5 dark:bg-slate-950/40 p-4 md:p-6 flex flex-col justify-center items-center">
          {/* Glass Badges */}
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
            {product.discountPercentage && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/90 text-white backdrop-blur-md shadow-lg border border-white/20">
                -{product.discountPercentage}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-secondary text-slate-950 backdrop-blur-md shadow-lg border border-white/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                NEW ARRIVAL
              </span>
            )}
          </div>

          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-xl bg-background/50">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Subtle glass reflection gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right Side: Product Details & Controls */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] relative z-10">
          <div>
            {/* Category Chip */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass-badge text-xs font-bold text-secondary-dark dark:text-secondary uppercase tracking-wider mb-3">
              <span>{product.category}</span>
            </div>
            
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3 leading-tight">
              {product.name}
            </h2>
            
            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <RatingStars rating={product.rating} count={product.reviewCount} />
              <span className="text-xs text-muted-foreground font-medium">Verified Reviews</span>
            </div>
            
            {/* Price section */}
            <div className="flex items-baseline gap-3 mb-6 pb-5 border-b border-white/10 dark:border-white/5">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary-dark to-secondary dark:from-white dark:via-secondary dark:to-secondary-dark">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-muted-foreground line-through font-semibold">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Selectable Options */}
            <div className="space-y-5 mb-6">
              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                    Select Finish / Color: <span className="text-foreground capitalize">{selectedColor}</span>
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-all p-0.5 relative",
                          selectedColor === color 
                            ? "border-secondary ring-2 ring-secondary/40 scale-110" 
                            : "border-transparent opacity-80 hover:opacity-100 hover:scale-105"
                        )}
                        style={{ backgroundColor: color }}
                        title={color}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                    Select Size: <span className="text-foreground">{selectedSize}</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "min-w-[42px] h-10 px-3 rounded-xl flex items-center justify-center text-xs font-bold transition-all",
                          selectedSize === size 
                            ? "liquid-glass-btn text-white shadow-md scale-105" 
                            : "liquid-glass-badge text-foreground hover:border-secondary/50"
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
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">Quantity</h4>
                <div className="flex items-center w-32 h-10 rounded-xl liquid-glass-badge border border-white/20 dark:border-white/10 overflow-hidden shadow-sm">
                  <button 
                    className="flex-1 h-full hover:bg-white/40 dark:hover:bg-white/10 text-foreground transition-colors font-bold text-sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-sm border-x border-white/10 dark:border-white/5 text-foreground">
                    {quantity}
                  </span>
                  <button 
                    className="flex-1 h-full hover:bg-white/40 dark:hover:bg-white/10 text-foreground transition-colors font-bold text-sm"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/10 dark:border-white/5 flex gap-3">
            <button 
              className={cn(
                "flex-1 py-3.5 px-6 rounded-2xl liquid-glass-btn text-sm font-semibold flex items-center justify-center gap-2 group cursor-pointer shadow-xl transition-all duration-300",
                isAdded && "!bg-emerald-600 !text-white"
              )}
              onClick={handleAddToCart}
            >
              {/* Shimmer sweep line */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] animate-sheen-sweep pointer-events-none" />
              <span className="relative z-10 flex items-center">
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 mr-1.5" />
                    Added to Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart • ${(product.price * quantity).toFixed(2)}
                  </>
                )}
              </span>
            </button>
            
            <button 
              onClick={() => toggleWishlist(product.id)}
              className={cn(
                "p-3.5 rounded-2xl liquid-glass-badge hover:scale-105 active:scale-95 transition-all text-foreground border border-white/30 dark:border-white/15 shadow-lg",
                isWishlisted && "text-rose-500 border-rose-500/40 bg-rose-500/10"
              )}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
            </button>
          </div>

          {/* Security badge note */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary-dark dark:text-secondary" />
            <span>Complimentary 30-Day Returns & 2-Year Warranty</span>
          </div>

        </div>
      </div>
    </div>
  );
}
