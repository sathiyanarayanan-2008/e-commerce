import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

function App() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <section id="shop" className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="flex flex-col md:flex-row gap-8">
            <FilterSidebar 
              isMobileOpen={isMobileFiltersOpen} 
              setIsMobileOpen={setIsMobileFiltersOpen} 
            />
            <ProductGrid 
              onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
            />
          </div>
        </section>
      </main>
      
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default App;
