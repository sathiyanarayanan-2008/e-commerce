import { useState } from 'react';
import { useStore } from '../contexts/StoreContext';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';
import type { Product, SortOption } from '../types';
import { Filter } from 'lucide-react';
import { Button } from './ui';

export function ProductGrid({ onOpenMobileFilters }: { onOpenMobileFilters: () => void }) {
  const { filteredProducts, sortOption, setSortOption } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="flex-1 min-w-0">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="md:hidden" 
            onClick={onOpenMobileFilters}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <p className="text-sm text-muted-foreground font-medium">
            Showing <span className="text-foreground">{filteredProducts.length}</span> products
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <label htmlFor="sort" className="text-sm font-medium text-muted-foreground whitespace-nowrap">Sort by:</label>
          <select 
            id="sort"
            className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none pr-8 cursor-pointer relative"
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
        </div>
      </div>

      {/* Grid */}
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
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <Filter className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No products found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't find anything matching your current filters. Try adjusting your search or clearing filters.
          </p>
        </div>
      )}

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}
