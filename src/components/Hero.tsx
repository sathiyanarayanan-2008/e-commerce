import React from 'react';
import { Button } from './ui';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-muted/50 rounded-full px-4 py-1.5 border border-border backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-secondary-dark" />
              <span className="text-sm font-medium">New Collection Available</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Discover Products <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                You'll Love
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Explore our curated selection of premium electronics, fashion, and everyday essentials designed for the modern lifestyle.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="w-full sm:w-auto text-base group">
                Explore Collection
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base bg-background/50 backdrop-blur-sm">
                View Deals
              </Button>
            </div>
            
            <div className="pt-8 flex items-center justify-center lg:justify-start space-x-8 text-sm font-medium text-muted-foreground">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-foreground">50k+</span>
                <span>Happy Customers</span>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-foreground">1k+</span>
                <span>Premium Products</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-lg lg:max-w-none perspective-1000">
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square transform-style-3d hover:-translate-y-2 transition-all duration-700 hover:rotate-y-12">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-3xl border border-border/50 backdrop-blur-3xl overflow-hidden shadow-2xl">
                {/* Decorative 3D elements inside */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_50%)]" />
                <img 
                  src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop" 
                  alt="Premium Products"
                  className="w-full h-full object-cover rounded-3xl mix-blend-overlay opacity-80"
                />
                
                {/* Floating Badge */}
                <div className="absolute top-8 right-8 bg-background/80 backdrop-blur-md border border-border p-4 rounded-xl shadow-lg translate-z-20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <StarIcon className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">4.9/5 Rating</p>
                      <p className="text-xs text-muted-foreground">From 2k+ reviews</p>
                    </div>
                  </div>
                </div>

                {/* Floating Badge 2 */}
                <div className="absolute bottom-12 left-8 bg-background/80 backdrop-blur-md border border-border p-3 rounded-xl shadow-lg translate-z-30">
                  <p className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Best Sellers 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
