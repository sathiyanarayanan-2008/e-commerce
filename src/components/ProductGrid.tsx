import { useStore } from '../contexts/StoreContext';
import { ProductCard } from './ProductCard';
import type { SortOption } from '../types';
import { Filter, ArrowUpDown, X, Sparkles } from 'lucide-react';

export function ProductGrid({ onOpenMobileFilters }: { onOpenMobileFilters: () => void }) {
  const { filteredProducts, sortOption, setSortOption, filters, setFilters } = useStore();

  const handleClearFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [key]: key === 'selectedSizes' || key === 'selectedColors' ? [] : key === 'minPrice' ? 0 : key === 'maxPrice' ? 80000 : null
    }));
  };

  const hasActiveFilters = Boolean(
    filters.category || 
    filters.brand || 
    filters.gender || 
    filters.minRating > 0 || 
    filters.selectedSizes.length > 0 || 
    filters.selectedColors.length > 0 || 
    filters.inStockOnly || 
    filters.discountOnly ||
    filters.searchQuery
  );

  return (
    <div className="flex-1 min-w-0">
      
      {/* Product Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left: Mobile Filters button & count */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={onOpenMobileFilters}
            className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition-colors"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
            Showing <span className="font-extrabold text-slate-900 dark:text-white">{filteredProducts.length}</span> items
          </p>
        </div>

        {/* Right: Sort Dropdown */}
        <div className="flex items-center space-x-2.5">
          <label htmlFor="sort" className="text-xs font-bold text-slate-500 whitespace-nowrap flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort by:</span>
          </label>
          <div className="relative">
            <select 
              id="sort"
              className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white pr-8 cursor-pointer border border-transparent"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
              <option value="discount">Biggest Discount</option>
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-bold text-slate-400">Active Filters:</span>
          
          {filters.category && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
              Category: {filters.category}
              <button onClick={() => handleClearFilter('category')} className="hover:text-rose-500">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.brand && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
              Brand: {filters.brand}
              <button onClick={() => handleClearFilter('brand')} className="hover:text-rose-500">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.gender && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
              Gender: {filters.gender}
              <button onClick={() => handleClearFilter('gender')} className="hover:text-rose-500">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
              Search: "{filters.searchQuery}"
              <button onClick={() => handleClearFilter('searchQuery')} className="hover:text-rose-500">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={() => setFilters(prev => ({
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
            }))}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 underline ml-1 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Product Grid: 4 per row desktop, 2-3 tablet, 2 per row mobile */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 sm:p-16 text-center border border-slate-200/80 dark:border-slate-800 shadow-sm max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 mx-auto flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No products found</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
            We couldn't find any items matching your selected criteria. Try resetting your filters or adjusting your search term.
          </p>
          <button
            onClick={() => setFilters(prev => ({
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
            }))}
            className="px-6 py-3 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold shadow-md cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
}
