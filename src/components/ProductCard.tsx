import { useRef } from 'react';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';
import { RatingStars, cn } from './ui';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);
  
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
  };

  return (
    <div 
      ref={cardRef}
      className="group relative rounded-3xl liquid-glass-card overflow-hidden transition-all duration-300 ease-out preserve-3d flex flex-col justify-between"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Specular border & top edge sheen */}
      <div className="liquid-glass-specular-border pointer-events-none" />
      <div className="liquid-glass-edge-light pointer-events-none" />

      {/* Badges (Top Left) */}
      <div className="absolute top-3.5 left-3.5 z-20 flex flex-col gap-1.5 translate-z-20 pointer-events-none">
        {product.discountPercentage && (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/90 text-white backdrop-blur-md shadow-md border border-white/20">
            -{product.discountPercentage}%
          </span>
        )}
        {product.isNew && (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-secondary text-slate-950 backdrop-blur-md shadow-md border border-white/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            NEW
          </span>
        )}
      </div>

      {/* Wishlist Button (Top Right) */}
      <button 
        onClick={() => toggleWishlist(product.id)}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className={cn(
          "absolute top-3.5 right-3.5 z-20 p-2.5 rounded-full backdrop-blur-xl transition-all duration-300 translate-z-20 border shadow-md hover:scale-110",
          isWishlisted 
            ? "bg-rose-500/20 border-rose-500/40 text-rose-500" 
            : "bg-white/40 dark:bg-black/30 border-white/30 dark:border-white/10 text-muted-foreground hover:text-foreground"
        )}
      >
        <Heart className={cn("w-4 h-4 transition-transform", isWishlisted && "fill-current scale-110")} />
      </button>

      {/* Image Container with Liquid Glass Frame */}
      <div className="relative aspect-square overflow-hidden rounded-t-[22px] bg-slate-100 dark:bg-slate-900/60 m-2 mb-0">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />
        
        {/* Hover frosted backdrop overlay */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 backdrop-blur-[3px] p-4">
          <button 
            type="button"
            className="p-3 rounded-2xl liquid-glass-btn-outline text-foreground font-medium shadow-xl translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => onQuickView(product)}
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button 
            type="button"
            className="flex-1 py-3 px-4 rounded-2xl liquid-glass-btn text-xs sm:text-sm font-semibold shadow-xl translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => addToCart(product)}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4 sm:p-5 flex flex-col gap-2 translate-z-10 flex-1 justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-secondary-dark dark:text-secondary uppercase tracking-widest">
              {product.category}
            </span>
            <RatingStars rating={product.rating} count={product.reviewCount} />
          </div>
          
          <h3 className="font-semibold text-base text-foreground line-clamp-1 group-hover:text-secondary-dark dark:group-hover:text-secondary transition-colors">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-white/10 dark:border-white/5">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through font-medium">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="sm:hidden p-2 rounded-xl bg-secondary/15 text-secondary-dark dark:text-secondary border border-secondary/30 hover:bg-secondary/25 transition-colors"
            title="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
