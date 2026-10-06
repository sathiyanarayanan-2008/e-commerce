import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Liquid Frosted Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Sliding Liquid Glass Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full h-full liquid-glass-card-strong shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 relative border-l border-white/20 dark:border-white/10">
          
          {/* Specular edge light */}
          <div className="liquid-glass-specular-border pointer-events-none" />
          <div className="liquid-glass-edge-light pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 dark:border-white/5 relative z-10">
            <h2 className="text-xl font-bold flex items-center gap-2.5 text-foreground">
              <div className="w-9 h-9 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary-dark dark:text-secondary shadow-inner">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span>Your Cart</span>
              {cart.length > 0 && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full liquid-glass-badge">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
              )}
            </h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 border border-white/20 dark:border-white/10 transition-colors text-foreground"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 relative z-10">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-5 px-6">
                <div className="w-20 h-20 rounded-3xl liquid-glass-card flex items-center justify-center text-muted-foreground shadow-lg">
                  <ShoppingBag className="w-10 h-10 text-secondary-dark dark:text-secondary opacity-80" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-foreground">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Explore our premium collections and add your favorite items.
                  </p>
                </div>
                <button 
                  className="px-6 py-2.5 rounded-2xl liquid-glass-btn text-sm font-semibold"
                  onClick={() => setIsCartOpen(false)}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  className="relative p-3.5 rounded-2xl liquid-glass-card-subtle flex gap-4 items-center group transition-all hover:border-white/40 dark:hover:border-white/20"
                >
                  {/* Product thumbnail with glass edge */}
                  <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-900/60 overflow-hidden flex-shrink-0 relative border border-white/20 dark:border-white/10 shadow-sm">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-20 py-0.5">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-semibold text-xs sm:text-sm text-foreground line-clamp-1 leading-snug">
                          {item.name}
                        </h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-rose-500 transition-colors p-1 -mr-1 -mt-1"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-secondary-dark dark:text-secondary mt-0.5">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    
                    {/* Glass Quantity Controls */}
                    <div className="flex items-center w-24 h-7 rounded-xl liquid-glass-badge border border-white/20 dark:border-white/10 overflow-hidden">
                      <button 
                        className="flex-1 h-full hover:bg-white/40 dark:hover:bg-white/10 text-foreground transition-colors text-xs font-bold"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-xs border-x border-white/10 dark:border-white/5 text-foreground">
                        {item.quantity}
                      </span>
                      <button 
                        className="flex-1 h-full hover:bg-white/40 dark:hover:bg-white/10 text-foreground transition-colors text-xs font-bold"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="border-t border-white/10 dark:border-white/5 p-5 sm:p-6 liquid-glass-card-strong relative z-10 space-y-4">
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-500 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Free Express
                  </span>
                </div>
                <div className="h-px bg-white/10 dark:bg-white/5 w-full my-2" />
                <div className="flex justify-between text-base sm:text-lg font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-dark dark:from-white dark:to-secondary">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <button 
                className="w-full py-3.5 px-6 rounded-2xl liquid-glass-btn text-sm font-semibold flex items-center justify-center gap-2 group cursor-pointer shadow-xl"
              >
                {/* Continuous sheen sweep */}
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-sheen-sweep pointer-events-none" />
                <span className="relative z-10 flex items-center">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary-dark dark:text-secondary" />
                <span>256-bit SSL Encrypted & Guaranteed Safe Checkout</span>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
