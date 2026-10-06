import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

export function Hero() {
  const { navigateToProduct, setFilters } = useStore();

  const handleShopNow = () => {
    const el = document.getElementById('shop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreShoes = () => {
    setFilters(prev => ({ ...prev, category: 'Shoes' }));
    handleShopNow();
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 py-10 md:py-16 border-b border-slate-150 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Main Banner Card */}
        <div className="relative rounded-3xl md:rounded-[36px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
          
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100/90 via-white/40 to-transparent dark:from-slate-900/95 dark:via-slate-900/80 dark:to-transparent z-10 pointer-events-none" />
          
          <div className="relative z-20 flex flex-col-reverse lg:flex-row items-center justify-between p-6 sm:p-10 lg:p-16 gap-8 lg:gap-12">
            
            {/* Left Content Column */}
            <div className="flex-1 max-w-xl text-center lg:text-left space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>NEW SEASON 2026</span>
                <span className="w-1 h-1 rounded-full bg-slate-400" />
                <span className="text-rose-600 dark:text-rose-400 font-extrabold">UP TO 35% OFF</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.08]">
                Elevate Your <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500">
                  Everyday Style
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Discover the latest drop in performance sportswear, luxury streetwear, and iconic sneakers engineered with cutting-edge comfort.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={handleShopNow}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold text-sm tracking-wide hover:bg-slate-800 dark:hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg group cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleExploreShoes}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm tracking-wide border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 hover:border-slate-300 transition-all cursor-pointer"
                >
                  Explore Footwear
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">100% Authentic Brands</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Fast Express Delivery</span>
                </div>
              </div>

            </div>

            {/* Right Featured Product Card Showcase */}
            <div className="flex-1 w-full max-w-lg lg:max-w-none relative flex justify-center">
              
              <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
                onClick={() => navigateToProduct('nike-air-max')}
              >
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop" 
                  alt="Nike Air Max 270"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />

                {/* Floating Product Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-600">Featured Sneaker</span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Nike Air Max 270 React</h3>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-base font-extrabold text-slate-950 dark:text-white">₹8,499</span>
                      <span className="text-xs text-slate-400 line-through">₹11,999</span>
                      <span className="text-xs font-bold text-emerald-600">29% OFF</span>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 text-white backdrop-blur-md text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                  <span>Trending Pick</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
