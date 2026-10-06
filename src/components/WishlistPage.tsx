import { Heart, ShoppingBag, Trash2, ArrowLeft, Star } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useCart } from '../contexts/CartContext';
import type { Product } from '../types';

export function WishlistPage() {
  const { wishlist, getProductById, toggleWishlist, navigateTo, navigateToProduct } = useStore();
  const { addToCart } = useCart();

  const wishlistProducts = wishlist
    .map(id => getProductById(id))
    .filter((p): p is Product => Boolean(p));

  const handleMoveToCart = (product: Product) => {
    addToCart(product, 1);
    toggleWishlist(product.id);
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-xl text-center">
        <div className="w-20 h-20 rounded-3xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 mx-auto flex items-center justify-center mb-6">
          <Heart className="w-10 h-10 fill-rose-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Your Wishlist is Empty</h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-8 leading-relaxed">
          Explore products you love and click the heart icon to save them for later.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-4 rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-transform"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8 md:py-14">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              My Wishlist ❤️
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {wishlistProducts.length} saved {wishlistProducts.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-950 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {wishlistProducts.map(product => (
            <div 
              key={product.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between group"
            >
              <div 
                className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
                onClick={() => navigateToProduct(product.id)}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-rose-600 shadow-md hover:scale-110 transition-transform"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    <span>{product.brand}</span>
                    <div className="flex items-center gap-1 text-slate-700 dark:text-slate-200">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <h3 
                    onClick={() => navigateToProduct(product.id)}
                    className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1 hover:text-rose-600 cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-base font-black text-slate-950 dark:text-white">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleMoveToCart(product)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-800 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
