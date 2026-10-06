import { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Heart, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Check, 
  Tag
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';

export function CartPage() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    moveToWishlist, 
    cartTotal, 
    cartSavings, 
    clearCart 
  } = useCart();
  
  const { navigateTo, placeOrder, showToast } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('124, Linking Road, Bandra West, Mumbai, 400050');
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'NEXSTORE20' || promoCode.trim().toUpperCase() === 'STYLE10') {
      const discount = Math.round(cartTotal * 0.1);
      setPromoDiscount(discount);
      setPromoApplied(true);
      showToast('✓ Promo code applied! Saved an extra 10%', { type: 'success' });
    } else {
      showToast('Invalid promo code. Try "NEXSTORE20"', { type: 'error' });
    }
  };

  const deliveryFee = cartTotal > 999 || cartTotal === 0 ? 0 : 99;
  const grandTotal = Math.max(0, cartTotal - promoDiscount + deliveryFee);

  const handleProceedToCheckout = () => {
    setIsCheckoutStep(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmOrder = () => {
    const order = placeOrder(shippingAddress);
    clearCart();
    setOrderConfirmed(order);
    showToast('✓ Order placed successfully!', { type: 'success' });
  };

  if (orderConfirmed) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-sm">
          <Check className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Order Confirmed!</h1>
        <p className="text-slate-500 mb-6">
          Order #{orderConfirmed.id} has been registered. You will receive real-time SMS & email tracking updates.
        </p>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-left space-y-4 mb-8">
          <div className="flex justify-between text-xs font-bold text-slate-500 border-b pb-3">
            <span>Estimated Delivery:</span>
            <span className="text-emerald-600">{orderConfirmed.estimatedDelivery}</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-500 border-b pb-3">
            <span>Delivering To:</span>
            <span className="text-slate-900 dark:text-white">{orderConfirmed.deliveryAddress}</span>
          </div>
          <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-2">
            <span>Total Paid:</span>
            <span>₹{orderConfirmed.total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigateTo('orders')}
            className="px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs"
          >
            View All Orders
          </button>
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3.5 rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold text-xs shadow-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-xl text-center">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Your Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-8 leading-relaxed">
          Looks like you haven't added any products to your bag yet. Explore our fresh fashion and sports collections.
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
        
        {/* Header Breadcrumbs */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isCheckoutStep ? 'Checkout & Shipping' : 'Shopping Bag'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in your bag
            </p>
          </div>

          <button
            onClick={() => {
              if (isCheckoutStep) {
                setIsCheckoutStep(false);
              } else {
                navigateTo('shop');
              }
            }}
            className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-950 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isCheckoutStep ? 'Back to Bag' : 'Continue Shopping'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Items List OR Shipping Address Checkout */}
          <div className="lg:col-span-8 space-y-4">
            
            {isCheckoutStep ? (
              /* Checkout Details Form */
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
                    Shipping & Delivery Address
                  </h3>
                  <p className="text-xs text-slate-500">Enter where you'd like your parcel dispatched.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Street Address / Flat / Floor
                    </label>
                    <textarea 
                      rows={3}
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-medium border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">City</label>
                      <input 
                        type="text" 
                        defaultValue="Mumbai" 
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-medium border border-slate-200 dark:border-slate-700" 
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">PIN Code</label>
                      <input 
                        type="text" 
                        defaultValue="400050" 
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-medium border border-slate-200 dark:border-slate-700" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Payment Method</label>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-950 dark:border-white bg-slate-50 dark:bg-slate-800/80 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" defaultChecked className="accent-slate-950" />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">UPI / Cards / NetBanking / Razorpay</span>
                        </div>
                        <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md">Instant</span>
                      </label>
                      <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" className="accent-slate-950" />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">Cash on Delivery (COD)</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Check className="w-5 h-5" />
                  <span>Confirm Order & Pay ₹{grandTotal.toLocaleString('en-IN')}</span>
                </button>
              </div>
            ) : (
              /* Cart Item Cards */
              cart.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Thumbnail & Title Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-slate-800" 
                    />
                    
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        {item.brand}
                      </span>
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-1">
                        {item.name}
                      </h3>
                      
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                        <span>Color: <strong className="text-slate-800 dark:text-slate-200">{item.selectedColor}</strong></span>
                        <span>•</span>
                        <span>Size: <strong className="text-slate-800 dark:text-slate-200">{item.selectedSize}</strong></span>
                      </div>

                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-base font-black text-slate-950 dark:text-white">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{item.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Removal */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <div className="flex items-center w-28 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex-1 h-full hover:bg-slate-200 font-bold text-xs text-slate-700 dark:text-slate-200"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-black text-xs text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex-1 h-full hover:bg-slate-200 font-bold text-xs text-slate-700 dark:text-slate-200"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveToWishlist(item.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Move to Wishlist"
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Remove from Cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

          </div>

          {/* Right Column: Order Summary & Checkout Card */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            
            <h2 className="text-lg font-black text-slate-900 dark:text-white border-b border-slate-150 dark:border-slate-800 pb-3">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            {!isCheckoutStep && (
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Coupon: NEXSTORE20"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold uppercase tracking-wider outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white border border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-bold shadow-sm"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[11px] font-bold text-emerald-600">
                    ✓ Promo code active (-₹{promoDiscount.toLocaleString('en-IN')})
                  </p>
                )}
              </form>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {cartSavings > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Product Discount</span>
                  <span>-₹{cartSavings.toLocaleString('en-IN')}</span>
                </div>
              )}

              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{promoDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-500">
                <span>Standard Delivery</span>
                <span className="font-semibold text-emerald-600">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>

              <div className="h-px bg-slate-150 dark:border-slate-800 my-2" />

              <div className="flex justify-between text-base sm:text-lg font-black text-slate-900 dark:text-white">
                <span>Total Amount</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* CTA Button */}
            {!isCheckoutStep ? (
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 px-6 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold text-sm tracking-wide shadow-lg hover:bg-slate-800 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] transition-transform"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleConfirmOrder}
                className="w-full py-4 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>Place Order (₹{grandTotal.toLocaleString('en-IN')})</span>
              </button>
            )}

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe & Secure 256-bit Encrypted Checkout</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
