import { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';
import { Button, RatingStars, Badge, cn } from './ui';

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
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-card rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 z-10 bg-background/50 backdrop-blur-md"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-muted relative aspect-square md:aspect-auto">
          {product.discountPercentage && (
            <Badge variant="destructive" className="absolute top-4 left-4 z-10 shadow-lg">
              -{product.discountPercentage}%
            </Badge>
          )}
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col overflow-y-auto max-h-[85vh]">
          <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            {product.category}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {product.name}
          </h2>
          
          <div className="flex items-center gap-4 mb-6">
            <RatingStars rating={product.rating} count={product.reviewCount} />
          </div>
          
          <div className="flex items-end gap-3 mb-6 pb-6 border-b border-border">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through mb-1">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-6 mb-8 flex-1">
            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3">Color</h4>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all",
                        selectedColor === color ? "border-primary scale-110" : "border-transparent"
                      )}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3">Size</h4>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium border transition-colors",
                        selectedSize === size 
                          ? "bg-primary text-primary-foreground border-primary" 
                          : "bg-background text-foreground border-border hover:border-primary"
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
              <h4 className="text-sm font-medium mb-3">Quantity</h4>
              <div className="flex items-center w-32 bg-background border border-border rounded-lg overflow-hidden">
                <button 
                  className="flex-1 py-2 hover:bg-muted text-foreground transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="flex-1 text-center font-medium py-2 border-x border-border">
                  {quantity}
                </span>
                <button 
                  className="flex-1 py-2 hover:bg-muted text-foreground transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-auto pt-4">
            <Button 
              size="lg" 
              className={cn("flex-1 transition-all", isAdded && "bg-green-600 hover:bg-green-700")}
              onClick={handleAddToCart}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className={cn("px-4", isWishlisted && "text-destructive border-destructive")}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
