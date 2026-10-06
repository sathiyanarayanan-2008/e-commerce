import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';

export function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    moveToWishlist,
    cartTotal 
  } = useCart();

  const { navigateTo } = useStore();

  if (!isCartOpen) return null;

  const handleGoToCartPage = () => {
    setIsCartOpen(false);
    navigateTo('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 relative border-l border-slate-200 dark:border-slate-800">
          
          {/* Header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-150 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-black text-slate-950 dark:text-white">
                Your Bag
              </h2>
              {cart.length > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {cart.length}
                </span>
              )}
            </div>

            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 px-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Your bag is empty</h3>
                  <p className="text-xs text-slate-500 mt-1">Explore our latest drops and performance sportswear.</p>
                </div>
                <button 
                  className="px-6 py-2.5 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold"
                  onClick={() => setIsCartOpen(false)}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex gap-3.5 items-center group"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-xl object-cover bg-white dark:bg-slate-700 shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-black uppercase text-slate-400">{item.brand}</span>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => moveToWishlist(item.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                          title="Move to Wishlist"
                        >
                          <Heart className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                      {item.name}
                    </h4>
                    
                    <p className="text-[11px] text-slate-400">
                      {item.selectedSize} • {item.selectedColor}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center w-20 h-6 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 overflow-hidden text-xs">
                        <button 
                          className="flex-1 h-full hover:bg-slate-100 font-bold"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-bold">{item.quantity}</span>
                        <button 
                          className="flex-1 h-full hover:bg-slate-100 font-bold"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="border-t border-slate-150 dark:border-slate-800 p-5 sm:p-6 bg-white dark:bg-slate-900 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900 dark:text-white">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="h-px bg-slate-150 dark:border-slate-800 my-2" />
                <div className="flex justify-between text-base font-black text-slate-900 dark:text-white">
                  <span>Estimated Total</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <button 
                  onClick={handleGoToCartPage}
                  className="w-full py-3.5 px-4 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:bg-slate-800"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Secure Checkout Guarantee</span>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
