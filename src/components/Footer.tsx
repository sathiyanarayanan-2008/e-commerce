import { Mail, MapPin, Phone, Globe, Send, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/15 dark:border-white/5 liquid-glass-card-subtle">
      {/* Specular edge highlight */}
      <div className="liquid-glass-edge-light pointer-events-none" />

      {/* Trust Badges Strip */}
      <div className="border-b border-white/10 dark:border-white/5 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-4 p-3 rounded-2xl liquid-glass-badge">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary-dark dark:text-secondary shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Free Worldwide Shipping</p>
                <p className="text-xs text-muted-foreground">On all orders over $99</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-4 p-3 rounded-2xl liquid-glass-badge">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary-dark dark:text-secondary shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">100% Secure Checkout</p>
                <p className="text-xs text-muted-foreground">Encrypted SSL protection</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-4 p-3 rounded-2xl liquid-glass-badge">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary-dark dark:text-secondary shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">30-Day Easy Returns</p>
                <p className="text-xs text-muted-foreground">Guaranteed refund policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <a href="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary via-primary-light to-secondary flex items-center justify-center shadow-md">
                <span className="text-white font-extrabold text-lg leading-none">N</span>
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-secondary-dark dark:to-secondary">
                NexStore
              </span>
            </a>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Crafted for modern living. We deliver high-precision electronics, designer lifestyle goods, and curated daily essentials.
            </p>
            <div className="flex space-x-2.5 pt-2">
              {['Twitter', 'Instagram', 'GitHub', 'LinkedIn'].map((platform, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-9 h-9 rounded-xl liquid-glass-badge flex items-center justify-center text-muted-foreground hover:text-secondary-dark dark:hover:text-secondary transition-colors"
                  aria-label={platform}
                >
                  <Globe className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground hover:translate-x-1 inline-block transition-transform">Home</a></li>
              <li><a href="#shop" className="hover:text-foreground hover:translate-x-1 inline-block transition-transform">Shop</a></li>
              <li><a href="#categories" className="hover:text-foreground hover:translate-x-1 inline-block transition-transform">Categories</a></li>
              <li><a href="#deals" className="hover:text-rose-500 hover:translate-x-1 inline-block transition-transform">Deals & Offers</a></li>
              <li><a href="#about" className="hover:text-foreground hover:translate-x-1 inline-block transition-transform">About Our Brand</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-foreground mb-4">Customer Care</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground hover:translate-x-1 inline-block transition-transform">Track Your Order</a></li>
              <li><a href="#" className="hover:text-foreground hover:translate-x-1 inline-block transition-transform">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-foreground hover:translate-x-1 inline-block transition-transform">Shipping Information</a></li>
              <li><a href="#" className="hover:text-foreground hover:translate-x-1 inline-block transition-transform">Help Center / FAQs</a></li>
              <li><a href="#" className="hover:text-foreground hover:translate-x-1 inline-block transition-transform">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-foreground mb-4">Stay Connected</h3>
            <ul className="space-y-2 text-xs text-muted-foreground mb-4">
              <li className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-secondary-dark dark:text-secondary shrink-0" />
                <span>San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-secondary-dark dark:text-secondary shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-secondary-dark dark:text-secondary shrink-0" />
                <span>concierge@nexstore.com</span>
              </li>
            </ul>
            
            <div className="pt-2">
              <p className="text-xs font-semibold text-foreground mb-2">Subscribe for private drops & offers</p>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-3.5 py-2.5 rounded-xl liquid-glass-input text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                />
                <button 
                  type="submit" 
                  className="p-2.5 rounded-xl liquid-glass-btn text-white flex items-center justify-center cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 dark:border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 NexStore Inc. Encased in Liquid Glass design system.</p>
          <div className="flex items-center space-x-2">
            {['Visa', 'Mastercard', 'Apple Pay', 'PayPal', 'Amex'].map((brand) => (
              <span key={brand} className="px-2.5 py-1 rounded-lg liquid-glass-badge text-[10px] font-bold text-foreground/80">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
