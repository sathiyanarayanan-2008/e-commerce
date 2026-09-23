import { Mail, MapPin, Phone, Globe } from 'lucide-react';
import { Button } from './ui';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-xl leading-none">N</span>
              </div>
              <span className="font-bold text-xl tracking-tight">NexStore</span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We provide the highest quality products with a seamless shopping experience. Discover our curated collection designed for your lifestyle.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#shop" className="hover:text-primary transition-colors">Shop</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#blog" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Customer Service</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Help Center / FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>123 Commerce St, Suite 100<br/>San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>support@nexstore.com</span>
              </li>
            </ul>
            
            <div className="pt-4">
              <h4 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-background border border-border rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button className="rounded-l-none rounded-r-md px-4">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 NexStore. All rights reserved.</p>
          <div className="flex space-x-4">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
