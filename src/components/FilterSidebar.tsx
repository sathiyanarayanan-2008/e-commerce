import { useStore } from '../contexts/StoreContext';
import { SlidersHorizontal, X, RotateCcw, Star } from 'lucide-react';

export function FilterSidebar({ isMobileOpen, setIsMobileOpen }: { isMobileOpen: boolean, setIsMobileOpen: (v: boolean) => void }) {
  const { filters, setFilters, categories } = useStore();

  const handleClear = () => {
    setFilters(prev => ({
      ...prev,
      category: null,
      minPrice: 0,
      maxPrice: 1000,
      minRating: 0
    }));
    setIsMobileOpen(false);
  };

  const SidebarContent = () => (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 dark:border-white/5">
        <h2 className="text-lg font-bold flex items-center gap-2.5 text-foreground">
          <div className="w-8 h-8 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary-dark dark:text-secondary">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <span>Filters</span>
        </h2>
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 text-foreground transition-colors"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="font-bold uppercase text-[11px] tracking-wider text-muted-foreground flex items-center justify-between">
          <span>Category</span>
          {filters.category && (
            <span className="text-[10px] text-secondary-dark dark:text-secondary font-semibold normal-case">Selected</span>
          )}
        </h3>
        <div className="space-y-1.5">
          <button
            onClick={() => setFilters(prev => ({ ...prev, category: null }))}
            className={`w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-between ${
              filters.category === null 
                ? 'liquid-glass-btn text-white shadow-md' 
                : 'hover:bg-white/40 dark:hover:bg-white/5 text-foreground/80 hover:text-foreground'
            }`}
          >
            <span>All Categories</span>
            {filters.category === null && (
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-sm shadow-secondary" />
            )}
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilters(prev => ({ ...prev, category: cat }))}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                filters.category === cat 
                  ? 'liquid-glass-btn text-white shadow-md' 
                  : 'hover:bg-white/40 dark:hover:bg-white/5 text-foreground/80 hover:text-foreground'
              }`}
            >
              <span>{cat}</span>
              {filters.category === cat && (
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-sm shadow-secondary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold uppercase text-[11px] tracking-wider text-muted-foreground">Price Range</h3>
          <span className="text-xs font-bold text-secondary-dark dark:text-secondary">Up to ${filters.maxPrice}</span>
        </div>
        <div className="space-y-3 px-1">
          <input 
            type="range" 
            min="0" 
            max="1000" 
            step="10"
            value={filters.maxPrice}
            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
          />
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span className="px-2 py-1 rounded-lg liquid-glass-badge">$0</span>
            <span className="px-2 py-1 rounded-lg liquid-glass-badge text-foreground font-bold">${filters.maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-3">
        <h3 className="font-bold uppercase text-[11px] tracking-wider text-muted-foreground">Minimum Rating</h3>
        <div className="space-y-1.5">
          {[4, 3, 2, 1].map(rating => (
            <label 
              key={rating} 
              className={`flex items-center space-x-3 px-3 py-2 rounded-xl cursor-pointer transition-all ${
                filters.minRating === rating 
                  ? 'bg-secondary/15 border border-secondary/30 text-secondary-dark dark:text-secondary' 
                  : 'hover:bg-white/40 dark:hover:bg-white/5 text-foreground/80'
              }`}
            >
              <input 
                type="radio" 
                name="rating" 
                checked={filters.minRating === rating}
                onChange={() => setFilters(prev => ({ ...prev, minRating: rating }))}
                className="w-4 h-4 text-cyan-400 bg-transparent border-slate-300 dark:border-slate-600 focus:ring-cyan-400 rounded-full"
              />
              <span className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                <span className="font-bold">{rating}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-muted-foreground">& Up</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button 
        type="button"
        className="w-full py-2.5 px-4 rounded-xl liquid-glass-btn-outline text-xs sm:text-sm font-semibold text-foreground flex items-center justify-center gap-2 cursor-pointer mt-4" 
        onClick={handleClear}
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Filters</span>
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar with Liquid Glass Card */}
      <aside className="hidden md:block w-72 flex-shrink-0">
        <div className="sticky top-28 p-5 rounded-3xl liquid-glass-card-subtle shadow-xl">
          <div className="liquid-glass-specular-border pointer-events-none" />
          <div className="liquid-glass-edge-light pointer-events-none" />
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Drawer with Liquid Glass Surface */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 md:hidden ${isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" 
          onClick={() => setIsMobileOpen(false)} 
        />
        <div className={`absolute top-0 left-0 bottom-0 w-[85%] max-w-sm liquid-glass-card-strong p-6 shadow-2xl overflow-y-auto transform transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="liquid-glass-specular-border pointer-events-none" />
          <div className="liquid-glass-edge-light pointer-events-none" />
          <SidebarContent />
        </div>
      </div>
    </>
  );
}
