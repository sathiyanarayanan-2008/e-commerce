import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Moon, Sun, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui';

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
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Logo */}
        <div className="flex-1 md:flex-none flex justify-center md:justify-start">
          <a href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center transform transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-xl leading-none">N</span>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">NexStore</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
          <a href="#shop" className="text-sm font-medium hover:text-primary transition-colors">Shop</a>
          <a href="#categories" className="text-sm font-medium hover:text-primary transition-colors">Categories</a>
          <a href="#deals" className="text-sm font-medium hover:text-primary transition-colors text-destructive">Deals</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-1 sm:space-x-3">
          <div className="hidden lg:flex items-center relative mr-2">
            <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search products..."
              className="pl-9 pr-4 py-2 w-64 rounded-full border border-border bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            />
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => {
              const el = document.getElementById('mobile-search');
              if (el) el.focus();
            }}
          >
            <Search className="w-5 h-5" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          <div className="relative hidden sm:block">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`relative group ${isAuthenticated ? 'text-secondary-dark dark:text-secondary' : ''}`}
              onClick={() => {
                if (isAuthenticated) {
                  setIsUserMenuOpen(!isUserMenuOpen);
                } else {
                  openLogin('login');
                }
              }}
              title={isAuthenticated ? user?.name : 'Sign In'}
            >
              <User className="w-5 h-5" />
              {isAuthenticated && (
                <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-background" />
              )}
            </Button>

            {/* Logged in User Dropdown (Liquid Glass Micro-card) */}
            {isAuthenticated && isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl p-3 liquid-glass-card shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-2 py-1.5 border-b border-border/40">
                  <p className="text-xs font-semibold text-foreground truncate">{user?.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{user?.email}</p>
                </div>
                <div className="mt-2 space-y-1">
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 text-xs text-destructive hover:bg-destructive/10 rounded-lg transition-colors font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          <Button variant="ghost" size="icon" className="relative group">
            <Heart className="w-5 h-5 group-hover:text-destructive transition-colors" />
            {wishlist.length > 0 && (
              <span className="absolute 1 top-1 right-1 w-4 h-4 bg-destructive text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </Button>

          <Button variant="ghost" size="icon" className="relative group" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag className="w-5 h-5 group-hover:text-primary transition-colors" />
            {cartCount > 0 && (
              <span className="absolute 1 top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'}`}>
        <div className="px-4 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            <input 
              id="mobile-search"
              type="text" 
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            />
          </div>
          <nav className="flex flex-col space-y-2">
            <a href="#" className="px-2 py-2 font-medium hover:bg-muted rounded-md transition-colors">Home</a>
            <a href="#shop" className="px-2 py-2 font-medium hover:bg-muted rounded-md transition-colors">Shop</a>
            <a href="#categories" className="px-2 py-2 font-medium hover:bg-muted rounded-md transition-colors">Categories</a>
            <a href="#deals" className="px-2 py-2 font-medium hover:bg-muted rounded-md transition-colors text-destructive">Deals</a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (isAuthenticated) {
                  logout();
                } else {
                  openLogin('login');
                }
              }}
              className="text-left px-2 py-2 font-medium text-secondary-dark dark:text-secondary hover:bg-muted rounded-md transition-colors flex items-center justify-between"
            >
              <span>{isAuthenticated ? `Signed in as ${user?.name} (Sign Out)` : 'Sign In / Account'}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
