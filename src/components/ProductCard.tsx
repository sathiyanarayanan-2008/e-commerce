import { useRef } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';
import { Badge, Button, RatingStars, cn } from './ui';

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
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div 
      ref={cardRef}
      className="group relative bg-card rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 ease-out preserve-3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out' }}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2 translate-z-20">
        {product.discountPercentage && (
          <Badge variant="destructive" className="shadow-md">
            -{product.discountPercentage}%
          </Badge>
        )}
        {product.isNew && (
          <Badge className="bg-secondary text-secondary-foreground shadow-md">
            NEW
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={() => toggleWishlist(product.id)}
        className={cn(
          "absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md bg-background/50 border border-border shadow-sm transition-all duration-300 translate-z-20 hover:scale-110",
          isWishlisted ? "text-destructive" : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
      </button>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-muted">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
          <Button 
            variant="secondary" 
            size="icon" 
            className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 shadow-lg"
            onClick={() => onQuickView(product)}
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </Button>
          <Button 
            className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 shadow-lg"
            onClick={() => addToCart(product)}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2 translate-z-10 bg-card rounded-b-2xl">
        <div className="text-xs font-semibold text-primary uppercase tracking-wider">
          {product.category}
        </div>
        
        <h3 className="font-bold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <RatingStars rating={product.rating} count={product.reviewCount} />
        
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
