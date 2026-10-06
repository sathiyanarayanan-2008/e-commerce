import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Moon, Sun, User, Sparkles } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlist, filters, setFilters } = useStore();
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, openLogin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'liquid-glass-navbar scrolled py-2' 
          : 'bg-background/20 backdrop-blur-md border-b border-white/10 dark:border-white/5 py-3'
      }`}
    >
      {/* Specular top-edge light beam */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 border border-white/20 dark:border-white/10 transition-all text-foreground"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Logo */}
        <div className="flex-1 md:flex-none flex justify-center md:justify-start">
          <a href="/" className="flex items-center space-x-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-primary via-primary-light to-secondary flex items-center justify-center transform transition-transform group-hover:scale-105 shadow-md shadow-secondary/10">
              <span className="text-white font-extrabold text-lg leading-none tracking-tight">N</span>
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-secondary-dark dark:to-secondary">
                NexStore
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <a 
            href="#" 
            className="px-3.5 py-1.5 rounded-full text-sm font-medium text-foreground/80 hover:text-foreground nav-glass-hover"
          >
            Home
          </a>
          <a 
            href="#shop" 
            className="px-3.5 py-1.5 rounded-full text-sm font-medium text-foreground/80 hover:text-foreground nav-glass-hover"
          >
            Shop
          </a>
          <a 
            href="#categories" 
            className="px-3.5 py-1.5 rounded-full text-sm font-medium text-foreground/80 hover:text-foreground nav-glass-hover"
          >
            Categories
          </a>
          <a 
            href="#deals" 
            className="px-3.5 py-1.5 rounded-full text-sm font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 nav-glass-hover flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Deals
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Search Pill */}
          <div className="hidden lg:flex items-center relative">
            <Search className="w-4 h-4 absolute left-3.5 text-muted-foreground pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search products..."
              className="pl-9 pr-4 py-2 w-60 rounded-full liquid-glass-input text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:w-72 transition-all duration-300"
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            />
          </div>

          <button 
            className="lg:hidden p-2 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 border border-white/20 dark:border-white/10 transition-all text-foreground"
            onClick={() => {
              const el = document.getElementById('mobile-search');
              if (el) el.focus();
            }}
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Toggle Button */}
          <button 
            className="p-2 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 border border-white/20 dark:border-white/10 transition-all text-foreground hover:rotate-12 duration-200"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* User Account Button & Dropdown */}
          <div className="relative hidden sm:block">
            <button 
              className={`p-2 rounded-xl relative transition-all border ${
                isAuthenticated 
                  ? 'bg-secondary/15 border-secondary/30 text-secondary-dark dark:text-secondary' 
                  : 'bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 border-white/20 dark:border-white/10 text-foreground'
              }`}
              onClick={() => {
                if (isAuthenticated) {
                  setIsUserMenuOpen(!isUserMenuOpen);
                } else {
                  openLogin('login');
                }
              }}
              title={isAuthenticated ? user?.name : 'Sign In'}
              aria-label="User account"
            >
              <User className="w-4 h-4" />
              {isAuthenticated && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
              )}
            </button>

            {/* Logged in User Dropdown (Liquid Glass Micro-card) */}
            {isAuthenticated && isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 rounded-2xl p-3 liquid-glass-card-strong shadow-2xl z-50 animate-modal-entry">
                <div className="px-2.5 py-2 border-b border-white/15 dark:border-white/10">
                  <p className="text-xs font-semibold text-foreground truncate">{user?.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{user?.email}</p>
                </div>
                <div className="mt-2 space-y-1">
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-2 text-xs text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors font-medium flex items-center justify-between"
                  >
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button 
            className="p-2 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 border border-white/20 dark:border-white/10 transition-all relative text-foreground group"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4 group-hover:text-rose-500 group-hover:scale-110 transition-all" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-md shadow-rose-500/30">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button 
            className="p-2 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 border border-white/20 dark:border-white/10 transition-all relative text-foreground group" 
            onClick={() => setIsCartOpen(true)}
            aria-label="View shopping cart"
          >
            <ShoppingBag className="w-4 h-4 group-hover:text-secondary-dark dark:group-hover:text-secondary group-hover:scale-110 transition-all" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-secondary-dark to-secondary text-primary dark:text-slate-950 text-[10px] font-extrabold flex items-center justify-center rounded-full shadow-md shadow-secondary/30 animate-cart-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Liquid Glass Drawer Dropdown) */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 border-t border-white/15 dark:border-white/10 liquid-glass-card shadow-2xl py-4' : 'max-h-0 py-0'}`}>
        <div className="px-4 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground pointer-events-none" />
            <input 
              id="mobile-search"
              type="text" 
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 rounded-xl liquid-glass-input text-sm text-foreground focus:outline-none"
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            />
          </div>
          <nav className="flex flex-col space-y-1.5">
            <a 
              href="#" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 font-medium rounded-xl hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
            >
              Home
            </a>
            <a 
              href="#shop" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 font-medium rounded-xl hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
            >
              Shop
            </a>
            <a 
              href="#categories" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 font-medium rounded-xl hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
            >
              Categories
            </a>
            <a 
              href="#deals" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 font-medium text-rose-500 rounded-xl hover:bg-rose-500/10 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              Deals
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (isAuthenticated) {
                  logout();
                } else {
                  openLogin('login');
                }
              }}
              className="text-left px-3 py-2 font-medium text-secondary-dark dark:text-secondary hover:bg-white/40 dark:hover:bg-white/10 rounded-xl transition-colors flex items-center justify-between"
            >
              <span>{isAuthenticated ? `Signed in as ${user?.name} (Sign Out)` : 'Sign In / Account'}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
