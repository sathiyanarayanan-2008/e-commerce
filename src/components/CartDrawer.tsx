import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui';

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
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full h-full bg-background shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Your Cart
            </h2>
            <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground">Your cart is empty</h3>
                <p className="text-muted-foreground">Looks like you haven't added any products to your cart yet.</p>
                <Button className="mt-4" onClick={() => setIsCartOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 group bg-card p-3 rounded-xl border border-border">
                  {/* Image */}
                  <div className="w-24 h-24 rounded-lg bg-muted overflow-hidden flex-shrink-0 relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-primary mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    
                    {/* Quantity */}
                    <div className="flex items-center w-28 bg-background border border-border rounded-md overflow-hidden mt-2">
                      <button 
                        className="flex-1 py-1 hover:bg-muted text-foreground transition-colors text-sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-medium py-1 border-x border-border text-sm">
                        {item.quantity}
                      </span>
                      <button 
                        className="flex-1 py-1 hover:bg-muted text-foreground transition-colors text-sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-border p-4 sm:p-6 bg-card/50">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="h-px bg-border w-full"></div>
                <div className="flex justify-between text-lg font-bold text-foreground">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Button size="lg" className="w-full">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
