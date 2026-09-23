import { useStore } from '../contexts/StoreContext';
import { Button } from './ui';
import { SlidersHorizontal, X } from 'lucide-react';

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
    <div className="space-y-8 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </h2>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="font-semibold uppercase text-xs tracking-wider text-muted-foreground">Category</h3>
        <div className="space-y-2">
          <button
            onClick={() => setFilters(prev => ({ ...prev, category: null }))}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              filters.category === null ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-muted'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilters(prev => ({ ...prev, category: cat }))}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                filters.category === cat ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-semibold uppercase text-xs tracking-wider text-muted-foreground">Price Range</h3>
        <div className="space-y-4">
          <input 
            type="range" 
            min="0" 
            max="1000" 
            step="10"
            value={filters.maxPrice}
            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="w-full accent-primary"
          />
          <div className="flex items-center justify-between text-sm font-medium">
            <span>$0</span>
            <span className="text-primary">${filters.maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-4">
        <h3 className="font-semibold uppercase text-xs tracking-wider text-muted-foreground">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="radio" 
                name="rating" 
                checked={filters.minRating === rating}
                onChange={() => setFilters(prev => ({ ...prev, minRating: rating }))}
                className="w-4 h-4 text-primary bg-background border-border focus:ring-primary focus:ring-2 rounded-full"
              />
              <span className="text-sm group-hover:text-primary transition-colors">{rating} Stars & Up</span>
            </label>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full mt-8" onClick={handleClear}>
        Clear Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0 border-r border-border pr-8">
        <div className="sticky top-24">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-50 transition-transform duration-300 md:hidden ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
        <div className="absolute top-0 left-0 bottom-0 w-[80%] max-w-sm bg-background border-r border-border p-6 shadow-2xl overflow-y-auto">
          <SidebarContent />
        </div>
      </div>
    </>
  );
}
