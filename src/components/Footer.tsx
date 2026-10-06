import { Mail, MapPin, Phone, ShieldCheck, Truck, RefreshCw, Send } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

export function Footer() {
  const { setFilters, navigateTo } = useStore();

  const handleCategoryClick = (cat: string) => {
    setFilters(prev => ({ ...prev, category: cat, searchQuery: '' }));
    navigateTo('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20">
      
      {/* Value Proposition Highlights */}
      <div className="border-b border-slate-150 dark:border-slate-800 py-8 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Free Express Shipping</p>
                <p className="text-[11px] text-slate-500">On all prepaid orders above ₹999</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">7-Day Easy Returns</p>
                <p className="text-[11px] text-slate-500">Hassle-free size exchange & refund</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">100% Original Products</p>
                <p className="text-[11px] text-slate-500">Direct from certified global brands</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center font-black text-lg">
                N
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                NEXSTORE
              </span>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-sm">
              Curating premium athletic footwear, performance streetwear, and luxury fashion essentials for individuals who demand uncompromising style and speed.
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Bandra Kurla Complex, Mumbai, MH 400051</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>+91 (022) 8000-NEXS (Mon - Sat, 9am - 8pm)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>concierge@nexstore.com</span>
              </p>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Featured Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li>
                <button onClick={() => handleCategoryClick('Shoes')} className="hover:text-slate-900 dark:hover:text-white">
                  Running Shoes & Sneakers
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Clothing')} className="hover:text-slate-900 dark:hover:text-white">
                  Hoodies, Tees & Trackpants
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Sports')} className="hover:text-slate-900 dark:hover:text-white">
                  Performance Baselayers
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Watches')} className="hover:text-slate-900 dark:hover:text-white">
                  Smartwatches & GPS Trackers
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Bags')} className="hover:text-slate-900 dark:hover:text-white">
                  Training Duffels & Daypacks
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li><a href="#" className="hover:text-slate-900 dark:hover:text-white">Track Order Status</a></li>
              <li><a href="#" className="hover:text-slate-900 dark:hover:text-white">Returns & Exchanges Policy</a></li>
              <li><a href="#" className="hover:text-slate-900 dark:hover:text-white">Shipping Fees & Timelines</a></li>
              <li><a href="#" className="hover:text-slate-900 dark:hover:text-white">Authenticity Guarantee</a></li>
              <li><a href="#" className="hover:text-slate-900 dark:hover:text-white">FAQs & Help Support</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Stay In The Loop
            </h4>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Sign up for private sneaker drops, seasonal discounts, and member perks.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="flex gap-2">
                <input 
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white border border-transparent"
                />
                <button 
                  type="submit"
                  className="p-2.5 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 shrink-0 hover:bg-slate-800"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Strip: Copyright & Accepted Payments */}
        <div className="border-t border-slate-150 dark:border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 NexStore India Private Limited. All rights reserved.</p>
          <div className="flex items-center space-x-2">
            {['UPI', 'Visa', 'Mastercard', 'RuPay', 'NetBanking', 'COD'].map((method) => (
              <span key={method} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
