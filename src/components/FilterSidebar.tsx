import { useStore } from '../contexts/StoreContext';
import { SlidersHorizontal, X, RotateCcw, Check, Star } from 'lucide-react';

interface FilterSidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export function FilterSidebar({ isMobileOpen, setIsMobileOpen }: FilterSidebarProps) {
  const { filters, setFilters, categories, brands } = useStore();

  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL', '7', '8', '9', '10', '11'];
  const availableColors = [
    { name: 'Black', hex: '#0f172a' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Red', hex: '#e11d48' },
    { name: 'Blue', hex: '#2563eb' },
    { name: 'Green', hex: '#16a34a' },
    { name: 'Grey', hex: '#64748b' },
    { name: 'Camel', hex: '#d97706' }
  ];

  const handleClearAll = () => {
    setFilters(prev => ({
      ...prev,
      category: null,
      brand: null,
      gender: null,
      minPrice: 0,
      maxPrice: 80000,
      minRating: 0,
      selectedSizes: [],
      selectedColors: [],
      inStockOnly: false,
      discountOnly: false,
      searchQuery: ''
    }));
  };

  const toggleSize = (size: string) => {
    setFilters(prev => ({
      ...prev,
      selectedSizes: prev.selectedSizes.includes(size)
        ? prev.selectedSizes.filter(s => s !== size)
        : [...prev.selectedSizes, size]
    }));
  };

  const toggleColor = (colorName: string) => {
    setFilters(prev => ({
      ...prev,
      selectedColors: prev.selectedColors.includes(colorName)
        ? prev.selectedColors.filter(c => c !== colorName)
        : [...prev.selectedColors, colorName]
    }));
  };

  const FilterContent = () => (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-900 dark:text-white" />
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Filters
          </h2>
        </div>

        <button 
          onClick={handleClearAll}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Category</h3>
        <div className="space-y-1 max-h-48 overflow-y-auto no-scrollbar pr-1">
          <button
            onClick={() => setFilters(prev => ({ ...prev, category: null }))}
            className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
              filters.category === null 
                ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' 
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilters(prev => ({ ...prev, category: cat === prev.category ? null : cat }))}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                filters.category === cat 
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{cat}</span>
              {filters.category === cat && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Brand</h3>
        <div className="space-y-1 max-h-48 overflow-y-auto no-scrollbar pr-1">
          <button
            onClick={() => setFilters(prev => ({ ...prev, brand: null }))}
            className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
              filters.brand === null 
                ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' 
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>All Brands</span>
          </button>
          {brands.map(brand => (
            <button
              key={brand}
              onClick={() => setFilters(prev => ({ ...prev, brand: brand === prev.brand ? null : brand }))}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                filters.brand === brand 
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{brand}</span>
              {filters.brand === brand && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Price Range</h3>
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            Up to ₹{filters.maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <input 
          type="range"
          min="1000"
          max="80000"
          step="1000"
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-slate-950 dark:accent-white cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
        />
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
          <span>₹1,000</span>
          <span>₹80,000</span>
        </div>
      </div>

      {/* Size Filter */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Sizes</h3>
        <div className="flex flex-wrap gap-1.5">
          {availableSizes.map(size => {
            const isSelected = filters.selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`min-w-[34px] h-8 px-2 rounded-lg text-xs font-bold border transition-all ${
                  isSelected 
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white shadow-sm' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {availableColors.map(color => {
            const isSelected = filters.selectedColors.includes(color.name);
            return (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                title={color.name}
                className={`w-6 h-6 rounded-full border-2 transition-all relative ${
                  isSelected ? 'scale-125 ring-2 ring-slate-950 dark:ring-white border-white' : 'border-slate-300 dark:border-slate-600 hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            );
          })}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Minimum Rating</h3>
        <div className="space-y-1">
          {[4, 3, 2].map(r => (
            <button
              key={r}
              onClick={() => setFilters(prev => ({ ...prev, minRating: prev.minRating === r ? 0 : r }))}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                filters.minRating === r 
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span>{r} Stars & Above</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
              {filters.minRating === r && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Availability & Discount Toggles */}
      <div className="space-y-2 pt-2 border-t border-slate-150 dark:border-slate-800">
        <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">In Stock Only</span>
          <input 
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
            className="w-4 h-4 rounded text-slate-950 dark:text-white focus:ring-slate-950 accent-slate-950 dark:accent-white"
          />
        </label>

        <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Discounted Items Only</span>
          <input 
            type="checkbox"
            checked={filters.discountOnly}
            onChange={(e) => setFilters(prev => ({ ...prev, discountOnly: e.target.checked }))}
            className="w-4 h-4 rounded text-slate-950 dark:text-white focus:ring-slate-950 accent-slate-950 dark:accent-white"
          />
        </label>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-28 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Bottom Sheet / Modal */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Bottom Sheet Drawer */}
          <div className="relative bg-white dark:bg-slate-900 rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 z-10 animate-in slide-in-from-bottom duration-300 shadow-2xl border-t border-slate-200 dark:border-slate-800">
            <div className="w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-4" />
            
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-slate-950 dark:text-white">Filters</h2>
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterContent />

            <div className="sticky bottom-0 pt-4 mt-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-3">
              <button
                onClick={handleClearAll}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
