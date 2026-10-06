import { ArrowRight, Sparkles, Star, ShieldCheck, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background ambient liquid spots specific to hero depth */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[15%] right-[5%] w-[42vw] h-[42vw] max-w-[550px] max-h-[550px] rounded-full bg-secondary/20 dark:bg-secondary/15 blur-[90px] animate-liquid-ambient-1" />
        <div className="absolute top-[25%] -left-[10%] w-[38vw] h-[38vw] max-w-[500px] max-h-[500px] rounded-full bg-primary/20 dark:bg-primary-light/30 blur-[90px] animate-liquid-ambient-2" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-10">
          
          {/* Hero Left Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            {/* Liquid Glass Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full liquid-glass-badge animate-float-badge cursor-default">
              <span className="flex h-2 w-2 rounded-full bg-secondary animate-ping" />
              <Sparkles className="w-4 h-4 text-secondary-dark dark:text-secondary" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-foreground/90">
                Next-Gen Collection Live Now
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
              Discover Products <br className="hidden lg:block" />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary-dark to-secondary dark:from-white dark:via-secondary dark:to-secondary-dark">
                You'll Love
                {/* Underline glow */}
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-secondary-dark/0 via-secondary/70 to-secondary-dark/0 rounded-full blur-[1px]" />
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Explore our curated selection of premium electronics, fashion, and lifestyle essentials encased in modern precision engineering.
            </p>
            
            {/* Liquid Glass CTA Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a 
                href="#shop"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-2xl liquid-glass-btn text-base font-semibold group cursor-pointer"
              >
                {/* Shimmer sweep line */}
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] animate-sheen-sweep pointer-events-none" />
                <span className="relative z-10 flex items-center">
                  Explore Collection
                  <ArrowRight className="ml-2.5 w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </a>

              <a 
                href="#deals"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-2xl liquid-glass-btn-outline text-base font-semibold text-foreground group cursor-pointer"
              >
                <Zap className="mr-2 w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                <span>View Deals</span>
              </a>
            </div>
            
            {/* Glass Stat Chips */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl liquid-glass-card-subtle">
                <div className="w-9 h-9 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary-dark dark:text-secondary">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground leading-tight">50k+</p>
                  <p className="text-[11px] text-muted-foreground font-medium">Happy Clients</p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl liquid-glass-card-subtle">
                <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-white/10 flex items-center justify-center text-primary dark:text-white">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground leading-tight">100%</p>
                  <p className="text-[11px] text-muted-foreground font-medium">Verified Authentic</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right 3D Showcase */}
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none perspective-1000">
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square transform-style-3d hover:-translate-y-2 transition-all duration-700">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/20 via-primary/10 to-secondary/30 rounded-[32px] blur-2xl opacity-70 pointer-events-none" />

              {/* Main Liquid Glass Showcase Panel */}
              <div className="relative w-full h-full rounded-3xl liquid-glass-card-strong overflow-hidden p-3 flex flex-col justify-between shadow-2xl">
                
                {/* Specular border and edge light */}
                <div className="liquid-glass-specular-border" />
                <div className="liquid-glass-edge-light" />

                {/* Inner image container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900/10 dark:bg-slate-950/40">
                  <img 
                    src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop" 
                    alt="Premium Products Showcase"
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
                  />
                  {/* Subtle glass reflection overlay across photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-white/10 pointer-events-none" />
                </div>
                
                {/* Floating Rating Glass Card (Top-Right) */}
                <div className="absolute top-6 right-6 p-3.5 rounded-2xl liquid-glass-card shadow-2xl translate-z-20 animate-glass-float">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shadow-inner">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">4.9 / 5 Rating</p>
                      <p className="text-[11px] text-muted-foreground font-medium">Over 2,400 Reviews</p>
                    </div>
                  </div>
                </div>

                {/* Floating Best Sellers Badge (Bottom-Left) */}
                <div className="absolute bottom-6 left-6 p-3 rounded-2xl liquid-glass-card shadow-xl translate-z-30">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-secondary-dark dark:text-secondary animate-spin" style={{ animationDuration: '6s' }} />
                    <p className="text-xs sm:text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary-dark to-secondary dark:from-white dark:to-secondary">
                      Curated 2026 Collection
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
