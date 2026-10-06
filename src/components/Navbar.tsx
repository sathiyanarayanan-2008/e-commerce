import { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  User, 
  Moon, 
  Sun, 
  Package, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { cartCount, setIsCartOpen } = useCart();
  const { 
    products, 
    wishlist, 
    filters, 
    setFilters, 
    navigateTo, 
    navigateToProduct, 
    activeView,
    orders 
  } = useStore();
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, openLogin, logout } = useAuth();
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search autocomplete on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchDropdownRef.current && 
        !searchDropdownRef.current.contains(e.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter autocomplete suggestions based on query
  const searchSuggestions = (filters.searchQuery || '').trim().toLowerCase();
  const matchedProducts = searchSuggestions ? products.filter(p => 
    p.name.toLowerCase().includes(searchSuggestions) ||
    p.brand.toLowerCase().includes(searchSuggestions) ||
    p.category.toLowerCase().includes(searchSuggestions)
  ).slice(0, 5) : [];

  const handleSelectNavCategory = (category: string | null, gender?: string) => {
    setFilters(prev => ({
      ...prev,
      category: category,
      gender: gender || null,
      searchQuery: ''
    }));
    navigateTo('shop');
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Men', onClick: () => handleSelectNavCategory(null, 'Men') },
    { label: 'Women', onClick: () => handleSelectNavCategory(null, 'Women') },
    { label: 'Kids', onClick: () => handleSelectNavCategory(null, 'Kids') },
    { label: 'Sports', onClick: () => handleSelectNavCategory('Sports') },
    { label: 'Shoes', onClick: () => handleSelectNavCategory('Shoes') },
    { label: 'Clothing', onClick: () => handleSelectNavCategory('Clothing') },
    { label: 'New Arrivals', badge: 'New', onClick: () => handleSelectNavCategory('New Arrivals') },
    { label: 'Deals', badge: 'Sale', isSpecial: true, onClick: () => {
      setFilters(prev => ({ ...prev, discountOnly: true, category: null, gender: null }));
      navigateTo('shop');
    }}
  ];

  return (
    <header 
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800' 
          : 'bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/60'
      }`}
    >
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="flex h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
        <span>Free Express Delivery on orders above ₹999 • Easy 7-Day Returns</span>
      </div>

      <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-4">
        
        {/* Left Section: Mobile Menu Button & Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button 
            onClick={() => navigateTo('shop')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center font-black text-lg tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                NEXSTORE
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
                SPORT & FASHION
              </span>
            </div>
          </button>
        </div>

        {/* Center Section: Dynamic Search Bar with Autocomplete Dropdown */}
        <div className="flex-1 max-w-xl mx-2 md:mx-6 relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Search Nike, Adidas, shoes, hoodies, sports..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all border border-transparent focus:bg-white dark:focus:bg-slate-850 focus:border-slate-300 dark:focus:border-slate-700"
              value={filters.searchQuery}
              onChange={(e) => {
                setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsSearchOpen(false);
                  navigateTo('shop');
                }
              }}
            />
            {filters.searchQuery && (
              <button 
                onClick={() => {
                  setFilters(prev => ({ ...prev, searchQuery: '' }));
                  setIsSearchOpen(false);
                }}
                className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Suggestion Dropdown */}
          {isSearchOpen && filters.searchQuery.trim().length > 0 && (
            <div 
              ref={searchDropdownRef}
              className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 p-2 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Matching Products</span>
                <span className="text-slate-500 font-normal">{matchedProducts.length} found</span>
              </div>

              {matchedProducts.length > 0 ? (
                <div className="space-y-1">
                  {matchedProducts.map(prod => (
                    <button
                      key={prod.id}
                      onClick={() => {
                        navigateToProduct(prod.id);
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-center gap-3 transition-colors group"
                    >
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="w-11 h-11 rounded-lg object-cover bg-slate-100" 
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{prod.brand}</p>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                          {prod.name}
                        </p>
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                  
                  <button
                    onClick={() => {
                      navigateTo('shop');
                      setIsSearchOpen(false);
                    }}
                    className="w-full mt-1 pt-2 border-t border-slate-100 dark:border-slate-800 text-center py-2 text-xs font-bold text-slate-900 dark:text-white hover:text-rose-600 flex items-center justify-center gap-1.5"
                  >
                    <span>View all matching results</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="py-6 px-4 text-center">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">No products found</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Try searching for "Nike", "Adidas", "Shoes", or "Hoodie"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Section: Orders, Wishlist, Cart, Profile */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* Orders History Icon Button */}
          <button 
            onClick={() => navigateTo('orders')}
            className={`p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative text-slate-700 dark:text-slate-200 ${
              activeView === 'orders' ? 'bg-slate-100 dark:bg-slate-800 text-slate-950 font-bold' : ''
            }`}
            title="My Orders"
            aria-label="View orders"
          >
            <Package className="w-5 h-5" />
            {orders.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {/* Wishlist Icon Button with Badge */}
          <button 
            onClick={() => navigateTo('wishlist')}
            className={`p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative text-slate-700 dark:text-slate-200 group ${
              activeView === 'wishlist' ? 'bg-slate-100 dark:bg-slate-800' : ''
            }`}
            title="Wishlist"
            aria-label="View wishlist"
          >
            <Heart className="w-5 h-5 group-hover:text-rose-500 transition-colors" />
            {wishlist.length > 0 && (
              <span className="absolute 0 top-1 right-1 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Icon Button with Badge */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative text-slate-700 dark:text-slate-200 group"
            title="Shopping Cart"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute 0 top-1 right-1 min-w-[18px] h-[18px] px-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-extrabold flex items-center justify-center rounded-full shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Theme Toggle Button */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* User Account Profile */}
          <div className="relative">
            <button 
              onClick={() => {
                if (isAuthenticated) {
                  setIsUserMenuOpen(!isUserMenuOpen);
                } else {
                  openLogin('login');
                }
              }}
              className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
              title={isAuthenticated ? user?.name : 'Sign In'}
              aria-label="User profile"
            >
              <User className="w-5 h-5" />
              {isAuthenticated && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 absolute top-1 right-1" />
              )}
            </button>

            {/* Profile Dropdown */}
            {isAuthenticated && isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{user?.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      navigateTo('orders');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl flex items-center gap-2"
                  >
                    <Package className="w-4 h-4 text-slate-400" />
                    <span>My Orders ({orders.length})</span>
                  </button>
                  <button
                    onClick={() => {
                      navigateTo('wishlist');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4 text-slate-400" />
                    <span>My Wishlist ({wishlist.length})</span>
                  </button>
                </div>
                <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Desktop Secondary Navigation Bar */}
      <nav className="hidden md:flex border-t border-slate-100 dark:border-slate-800/80 px-4 md:px-6">
        <div className="container mx-auto flex items-center space-x-1 sm:space-x-3 py-2 overflow-x-auto no-scrollbar">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.onClick}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                link.isSpecial 
                  ? 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold' 
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  link.badge === 'Sale' 
                    ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}>
                  {link.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.onClick}
                className="text-left px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 flex items-center justify-between text-slate-800 dark:text-slate-200"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (isAuthenticated) {
                  logout();
                } else {
                  openLogin('login');
                }
              }}
              className="text-xs font-bold text-slate-900 dark:text-white"
            >
              {isAuthenticated ? `Signed in as ${user?.name} (Sign Out)` : 'Sign In / Register'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
