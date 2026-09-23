import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Moon, Sun, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlist, filters, setFilters } = useStore();
  const { theme, setTheme } = useTheme();

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

          <Button variant="ghost" size="icon" className="relative group hidden sm:flex">
            <User className="w-5 h-5" />
          </Button>

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
          </nav>
        </div>
      </div>
    </header>
  );
}
