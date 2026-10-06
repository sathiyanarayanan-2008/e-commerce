import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { LoginModal } from './components/LoginModal';
import { Footer } from './components/Footer';

function App() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-secondary/30 selection:text-secondary-dark dark:selection:text-secondary overflow-x-hidden">
      {/* ==============================================================
          AMBIENT LIQUID MESH / LIGHT ORBS
          These fluid, floating orbs refract through all glass surfaces
          ============================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Top-Right Orb - Cyan Glow */}
        <div 
          className="absolute -top-[10%] -right-[10%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full animate-liquid-ambient-1 opacity-60 dark:opacity-35"
          style={{
            background: 'radial-gradient(circle, rgba(0, 242, 254, 0.45) 0%, rgba(79, 172, 254, 0.2) 45%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />

        {/* Center-Left Orb - Electric Blue / Indigo Glow */}
        <div 
          className="absolute top-[35%] -left-[12%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full animate-liquid-ambient-2 opacity-50 dark:opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(10, 25, 47, 0.25) 0%, rgba(79, 172, 254, 0.35) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Bottom-Right Orb - Violet / Aqua Pulse */}
        <div 
          className="absolute -bottom-[10%] right-[15%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full animate-liquid-ambient-3 opacity-55 dark:opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(0, 242, 254, 0.35) 0%, rgba(147, 51, 234, 0.18) 50%, transparent 70%)',
            filter: 'blur(75px)',
          }}
        />
        
        {/* Subtle grid pattern overlay for extra glass depth */}
        <div 
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 242, 254, 0.5) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Main Content Layer (Above ambient background) */}
      <div className="relative z-10 flex flex-col flex-1">
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
        <LoginModal />
      </div>
    </div>
  );
}

export default App;
