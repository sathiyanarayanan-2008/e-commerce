import { Package, ArrowLeft, CheckCircle, Truck } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

export function OrdersPage() {
  const { orders, navigateTo, navigateToProduct } = useStore();

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-xl text-center">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center mb-6">
          <Package className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No Orders Placed Yet</h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-8 leading-relaxed">
          Once you complete a purchase, your tracked orders and shipment receipts will show up here.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-4 rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-transform"
        >
          Start Shopping
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
              My Orders & Shipments
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
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

        {/* Orders List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {orders.map((order) => (
            <div 
              key={order.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm p-6 sm:p-8 space-y-6"
            >
              {/* Top Order Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order ID</span>
                  <p className="text-base font-extrabold text-slate-900 dark:text-white">{order.id}</p>
                  <p className="text-xs text-slate-400">Placed on {order.date}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{order.status}</span>
                  </span>
                  <span className="text-base font-black text-slate-900 dark:text-white ml-2">
                    ₹{order.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Delivery Timeline Progress */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>{order.estimatedDelivery}</span>
                </div>
                <div className="text-slate-500 text-[11px] truncate">
                  Shipping To: {order.deliveryAddress}
                </div>
              </div>

              {/* Items in Order */}
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-xl object-cover bg-slate-100 dark:bg-slate-800 shrink-0" 
                      />
                      <div>
                        <span className="text-[10px] font-black uppercase text-slate-400">{item.brand}</span>
                        <h4 
                          onClick={() => navigateToProduct(item.productId)}
                          className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-rose-600 cursor-pointer line-clamp-1"
                        >
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-500">
                          Qty: {item.quantity} • Size: {item.selectedSize} • Color: {item.selectedColor}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-black text-sm text-slate-900 dark:text-white">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
