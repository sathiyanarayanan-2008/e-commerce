import { useState } from 'react';
import { useStore } from '../contexts/StoreContext';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';
import type { Product, SortOption } from '../types';
import { Filter, Layers, ArrowUpDown } from 'lucide-react';

export function ProductGrid({ onOpenMobileFilters }: { onOpenMobileFilters: () => void }) {
  const { filteredProducts, sortOption, setSortOption } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="flex-1 min-w-0">
      {/* Liquid Glass Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 p-4 rounded-2xl liquid-glass-card-subtle">
        <div className="flex items-center gap-3">
          <button 
            type="button"
            className="md:hidden inline-flex items-center px-4 py-2 rounded-xl liquid-glass-btn-outline text-sm font-medium text-foreground gap-2 cursor-pointer"
            onClick={onOpenMobileFilters}
          >
            <Filter className="w-4 h-4 text-secondary-dark dark:text-secondary" />
            <span>Filters</span>
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl liquid-glass-badge">
            <Layers className="w-3.5 h-3.5 text-secondary-dark dark:text-secondary" />
            <span className="text-xs sm:text-sm font-semibold text-foreground/80">
              Showing <span className="text-secondary-dark dark:text-secondary font-bold">{filteredProducts.length}</span> products
            </span>
          </div>
        </div>
        
        {/* Sort selector */}
        <div className="flex items-center space-x-2.5">
          <label htmlFor="sort" className="text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort by:
          </label>
          <div className="relative">
            <select 
              id="sort"
              className="liquid-glass-input rounded-xl px-3.5 py-2 text-xs sm:text-sm text-foreground focus:outline-none appearance-none pr-8 cursor-pointer font-medium"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
            >
              <option value="recommended" className="bg-background text-foreground">Recommended</option>
              <option value="price-low" className="bg-background text-foreground">Price: Low to High</option>
              <option value="price-high" className="bg-background text-foreground">Price: High to Low</option>
              <option value="rating" className="bg-background text-foreground">Highest Rated</option>
              <option value="newest" className="bg-background text-foreground">Newest Arrivals</option>
              <option value="discount" className="bg-background text-foreground">Biggest Discount</option>
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={setSelectedProduct} 
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center rounded-3xl liquid-glass-card">
          <div className="w-20 h-20 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-5 text-secondary-dark dark:text-secondary shadow-lg">
            <Filter className="w-9 h-9" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed mb-6">
            We couldn't find anything matching your selected filters. Try widening your price range, choosing another category, or resetting filters.
          </p>
        </div>
      )}

      {/* Liquid Glass Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}
