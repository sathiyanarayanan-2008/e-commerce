import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { CartPage } from './components/CartPage';
import { WishlistPage } from './components/WishlistPage';
import { OrdersPage } from './components/OrdersPage';
import { CartDrawer } from './components/CartDrawer';
import { LoginModal } from './components/LoginModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { useStore } from './contexts/StoreContext';

function App() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const { activeView, activeProductId } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-rose-500/20 selection:text-rose-600">
      <Navbar />

      <main className="flex-1">
        {activeView === 'product' && activeProductId ? (
          /* Dedicated Product Details Page */
          <ProductDetailsPage productId={activeProductId} />
        ) : activeView === 'cart' ? (
          /* Dedicated Cart & Checkout Page */
          <CartPage />
        ) : activeView === 'wishlist' ? (
          /* Dedicated Wishlist Page */
          <WishlistPage />
        ) : activeView === 'orders' ? (
          /* Dedicated Orders History Page */
          <OrdersPage />
        ) : (
          /* Default Main Store Front */
          <>
            <Hero />
            
            <CategorySection />

            <section id="shop" className="container mx-auto px-4 md:px-6 py-10 md:py-16">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <FilterSidebar 
                  isMobileOpen={isMobileFiltersOpen} 
                  setIsMobileOpen={setIsMobileFiltersOpen} 
                />
                
                <ProductGrid 
                  onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
                />
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
      <CartDrawer />
      <LoginModal />
      <Toast />
    </div>
  );
}

export default App;
