import { categoriesList } from '../data/products';
import { useStore } from '../contexts/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CategorySection() {
  const { filters, setFilters, navigateTo } = useStore();

  const handleSelectCategory = (categoryName: string) => {
    setFilters(prev => ({
      ...prev,
      category: categoryName === filters.category ? null : categoryName,
      searchQuery: ''
    }));
    navigateTo('shop');
    
    // Smooth scroll to product grid
    const el = document.getElementById('shop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 md:py-14 bg-white dark:bg-slate-900 border-b border-slate-150 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <div>
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-extrabold uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Collections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
              Shop By Category
            </h2>
          </div>

          <button 
            onClick={() => {
              setFilters(prev => ({ ...prev, category: null, searchQuery: '' }));
              navigateTo('shop');
            }}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Horizontal Category Cards - Scrollable on mobile */}
        <div className="flex gap-4 md:gap-5 overflow-x-auto no-scrollbar pb-3 pt-1 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth">
          {categoriesList.map((cat) => {
            const isSelected = filters.category === cat.name;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.name)}
                className={`flex-shrink-0 w-36 sm:w-44 md:w-48 text-left rounded-2xl md:rounded-3xl p-2.5 sm:p-3 transition-all duration-300 group cursor-pointer border ${
                  isSelected 
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white shadow-xl scale-[1.02]' 
                    : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border-slate-200/80 dark:border-slate-700/80 hover:shadow-lg hover:border-slate-300'
                }`}
              >
                {/* Category Image */}
                <div className="w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden mb-3 relative bg-slate-200 dark:bg-slate-700">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors ${isSelected ? 'bg-black/5' : ''}`} />
                </div>

                {/* Category Info */}
                <div className="px-1 pb-1">
                  <h3 className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                    isSelected ? 'text-white dark:text-slate-950' : 'text-slate-900 dark:text-white'
                  }`}>
                    {cat.name}
                  </h3>
                  <p className={`text-[10px] sm:text-[11px] truncate mt-0.5 ${
                    isSelected ? 'text-slate-300 dark:text-slate-600 font-medium' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {cat.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
