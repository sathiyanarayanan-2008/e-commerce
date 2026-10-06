import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Check, 
  RotateCcw, 
  ShieldCheck, 
  ChevronDown, 
  ThumbsUp, 
  Ruler, 
  Share2, 
  ArrowLeft,
  Zap
} from 'lucide-react';
import type { Product } from '../types';
import { useStore } from '../contexts/StoreContext';
import { useCart } from '../contexts/CartContext';
import { ProductCard } from './ProductCard';

interface ProductDetailsPageProps {
  productId: string;
}

export function ProductDetailsPage({ productId }: ProductDetailsPageProps) {
  const { 
    getProductById, 
    products, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo, 
    addReview, 
    recentlyViewedIds,
    showToast 
  } = useStore();
  
  const { addToCart, setIsCartOpen } = useCart();
  
  const product = getProductById(productId);

  // States
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [pinCode, setPinCode] = useState('');
  const [pinCodeStatus, setPinCodeStatus] = useState<string | null>(null);
  const [isFullscreenImageOpen, setIsFullscreenImageOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  
  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    description: true,
    specifications: true,
    features: false,
    shipping: false
  });

  // Review submission state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Sync selected color and size when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0]?.name || '');
      setSelectedSize(product.sizes?.[0] || '');
      setSelectedImageIndex(0);
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [productId, product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Product Not Found</h2>
        <p className="text-slate-500 mb-6">The requested product could not be located in our catalog.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-3 rounded-xl bg-slate-950 text-white font-bold text-xs"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const toggleAccordion = (section: string) => {
    setOpenAccordions(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setIsCartOpen(true);
  };

  const handleCheckPinCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinCode.trim() || pinCode.length < 6) {
      setPinCodeStatus('Please enter a valid 6-digit PIN code');
      return;
    }
    setPinCodeStatus('✓ Express Delivery available • Estimated delivery in 2-3 business days');
  };

  const handleShareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on NexStore!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', { type: 'info' });
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      showToast('Please provide your name and review comment.', { type: 'error' });
      return;
    }

    addReview(product.id, {
      userName: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      helpfulCount: 0,
      verifiedPurchase: true
    });

    setReviewName('');
    setReviewComment('');
    setIsWriteReviewOpen(false);
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  // Recently viewed products
  const recentlyViewed = recentlyViewedIds
    .filter(id => id !== product.id)
    .map(id => getProductById(id))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 4);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-6 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Navigation Breadcrumbs & Back Button */}
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Products</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareProduct}
              className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-slate-950 dark:hover:text-white shadow-sm transition-colors"
              title="Share Product"
              aria-label="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Product Layout: Multi-column Desktop, Stacked Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 bg-white dark:bg-slate-900 p-5 sm:p-8 lg:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          
          {/* =========================================================
              LEFT COLUMN: Product Image Gallery
              ========================================================= */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 sm:gap-6">
            
            {/* Thumbnails Row / Column */}
            <div className="flex md:flex-col gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-0 md:w-20 shrink-0">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImageIndex === idx 
                      ? 'border-slate-950 dark:border-white shadow-md scale-102 ring-2 ring-slate-950/20 dark:ring-white/20' 
                      : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100 hover:border-slate-400'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image Showcase */}
            <div className="flex-1 relative aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 group">
              <img 
                src={images[selectedImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-zoom-in"
                onClick={() => setIsFullscreenImageOpen(true)}
              />

              {/* Prev / Next Buttons */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 shadow-lg hover:scale-110 active:scale-95 transition-all opacity-80 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 shadow-lg hover:scale-110 active:scale-95 transition-all opacity-80 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Fullscreen Trigger */}
              <button
                onClick={() => setIsFullscreenImageOpen(true)}
                className="absolute top-4 right-4 p-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 shadow-md hover:scale-110 transition-transform opacity-80 group-hover:opacity-100"
                title="Fullscreen Image"
                aria-label="View fullscreen image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-slate-950 text-white shadow-md">
                    {product.badge}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-600 text-white shadow-md">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* =========================================================
              RIGHT COLUMN: Product Info & Actions
              ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Brand & Category */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                  {product.brand} • {product.category}
                </span>

                {/* Rating Badge */}
                <a 
                  href="#reviews"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 text-xs font-bold hover:underline"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviewCount} reviews)</span>
                </a>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pb-4 border-b border-slate-150 dark:border-slate-800">
                <span className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-base sm:text-lg text-slate-400 line-through font-semibold">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="text-xs sm:text-sm font-extrabold text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40">
                    {product.discountPercentage}% OFF
                  </span>
                )}
                <span className="text-[11px] text-slate-400 ml-auto font-medium">Inclusive of all taxes</span>
              </div>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-extrabold">
                    <span className="uppercase tracking-wider text-slate-400">Color:</span>
                    <span className="text-slate-900 dark:text-white">{selectedColor}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map(color => {
                      const isSelected = selectedColor === color.name;
                      return (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-9 h-9 rounded-full border-2 transition-all p-0.5 relative ${
                            isSelected 
                              ? 'border-slate-950 dark:border-white scale-110 shadow-md ring-2 ring-slate-950/20 dark:ring-white/20' 
                              : 'border-transparent opacity-85 hover:opacity-100 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                          aria-label={`Select color ${color.name}`}
                        >
                          {isSelected && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <Check className={`w-4 h-4 ${color.hex === '#ffffff' || color.hex === '#f8fafc' ? 'text-slate-950' : 'text-white'}`} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between text-xs font-extrabold">
                    <span className="uppercase tracking-wider text-slate-400">Select Size:</span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-rose-600 hover:text-rose-700 dark:text-rose-400 flex items-center gap-1 cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[44px] h-11 px-3.5 rounded-xl text-xs font-bold border transition-all ${
                            isSelected
                              ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white shadow-md scale-105'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Stock Status */}
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Quantity
                  </span>
                  <div className="flex items-center w-32 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex-1 h-full hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-sm text-slate-800 dark:text-slate-200 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-black text-sm text-slate-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex-1 h-full hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-sm text-slate-800 dark:text-slate-200 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                    <Check className="w-3.5 h-3.5" />
                    <span>In Stock</span>
                  </div>
                  {product.stockCount && (
                    <p className="text-[11px] text-rose-500 font-bold mt-1">
                      Only {product.stockCount} left in warehouse
                    </p>
                  )}
                </div>
              </div>

              {/* Delivery PIN Code Checker */}
              <div className="pt-3 border-t border-slate-150 dark:border-slate-800">
                <form onSubmit={handleCheckPinCode} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-extrabold text-slate-400">
                    <span>Delivery Options</span>
                    <span className="text-emerald-600 font-bold">Free above ₹999</span>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="Enter 6-digit PIN code"
                      maxLength={6}
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white border border-transparent"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-bold shadow-sm hover:bg-slate-800"
                    >
                      Check
                    </button>
                  </div>
                  {pinCodeStatus && (
                    <p className={`text-[11px] font-semibold mt-1 ${pinCodeStatus.startsWith('✓') ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {pinCodeStatus}
                    </p>
                  )}
                </form>
              </div>

              {/* Action Buttons: Add to Cart, Buy Now, Wishlist */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold text-sm tracking-wide shadow-lg hover:bg-slate-800 dark:hover:bg-slate-100 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm tracking-wide shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Buy Now</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-center shadow-sm ${
                    isWishlisted 
                      ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:border-rose-900' 
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600 text-rose-600 scale-110' : ''}`} />
                </button>
              </div>

              {/* Guarantee Strip */}
              <div className="pt-4 grid grid-cols-2 gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <RotateCcw className="w-4 h-4 text-slate-700 dark:text-slate-300 shrink-0" />
                  <span>7 Days Easy Return</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Original Brand</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* =========================================================
            PRODUCT DETAILS ACCORDIONS (Description, Specs, Features)
            ========================================================= */}
        <div className="mt-12 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          
          {/* Description Accordion */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <button
              onClick={() => toggleAccordion('description')}
              className="w-full flex items-center justify-between text-left py-2 font-black text-lg text-slate-900 dark:text-white"
            >
              <span>Product Description</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openAccordions.description ? 'rotate-180' : ''}`} />
            </button>
            {openAccordions.description && (
              <div className="pt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 animate-in fade-in duration-200">
                <p>{product.description}</p>
                {product.material && (
                  <p><strong className="text-slate-900 dark:text-white">Material:</strong> {product.material}</p>
                )}
                {product.careInstructions && (
                  <p><strong className="text-slate-900 dark:text-white">Care Instructions:</strong> {product.careInstructions}</p>
                )}
              </div>
            )}
          </div>

          {/* Specifications Accordion */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <button
              onClick={() => toggleAccordion('specifications')}
              className="w-full flex items-center justify-between text-left py-2 font-black text-lg text-slate-900 dark:text-white"
            >
              <span>Technical Specifications</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openAccordions.specifications ? 'rotate-180' : ''}`} />
            </button>
            {openAccordions.specifications && (
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in duration-200">
                {Object.entries(product.specifications || {}).map(([key, val]) => (
                  <div key={key} className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                    <span className="font-bold text-slate-500">{key}</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-right ml-2">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Key Features Accordion */}
          {product.features && product.features.length > 0 && (
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <button
                onClick={() => toggleAccordion('features')}
                className="w-full flex items-center justify-between text-left py-2 font-black text-lg text-slate-900 dark:text-white"
              >
                <span>Key Features & Technology</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openAccordions.features ? 'rotate-180' : ''}`} />
              </button>
              {openAccordions.features && (
                <ul className="pt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc list-inside animate-in fade-in duration-200">
                  {product.features.map((feat, i) => (
                    <li key={i} className="leading-relaxed">{feat}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Shipping & Returns Accordion */}
          <div className="pb-2">
            <button
              onClick={() => toggleAccordion('shipping')}
              className="w-full flex items-center justify-between text-left py-2 font-black text-lg text-slate-900 dark:text-white"
            >
              <span>Shipping, Exchanges & Return Policy</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openAccordions.shipping ? 'rotate-180' : ''}`} />
            </button>
            {openAccordions.shipping && (
              <div className="pt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 animate-in fade-in duration-200">
                <p>• <strong>Free Express Shipping:</strong> Orders over ₹999 qualify for zero-cost delivery across all serviceable PIN codes in India.</p>
                <p>• <strong>7-Day Hassle-Free Returns:</strong> Try at home with peace of mind. Unused items with original tags and packaging are eligible for full refund or instant size exchange.</p>
                <p>• <strong>Authenticity Guarantee:</strong> Directly sourced from certified brand distributors with tamper-proof security seals.</p>
              </div>
            )}
          </div>

        </div>

        {/* =========================================================
            REVIEWS SECTION
            ========================================================= */}
        <section id="reviews" className="mt-12 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">Customer Reviews</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{product.rating} out of 5</span>
                <span className="text-xs text-slate-500">({product.reviewCount} total ratings)</span>
              </div>
            </div>

            <button
              onClick={() => setIsWriteReviewOpen(true)}
              className="px-5 py-3 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-bold shadow-md hover:bg-slate-800"
            >
              Write a Review
            </button>
          </div>

          {/* Rating Breakdown Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-b border-slate-200 dark:border-slate-800">
            <div className="space-y-2 max-w-sm">
              {[
                { star: 5, pct: '74%' },
                { star: 4, pct: '18%' },
                { star: 3, pct: '5%' },
                { star: 2, pct: '2%' },
                { star: 1, pct: '1%' }
              ].map(row => (
                <div key={row.star} className="flex items-center gap-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span className="w-10">{row.star} Star</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: row.pct }} />
                  </div>
                  <span className="w-8 text-right text-slate-400">{row.pct}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Reviewed by Verified Buyers</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                100% of our reviews come from verified accounts with confirmed product deliveries. Real experiences from runners, athletes, and style lovers.
              </p>
            </div>
          </div>

          {/* Individual Reviews List */}
          <div className="pt-8 space-y-6">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map(rev => (
                <div key={rev.id} className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 text-xs">
                        {rev.avatar ? (
                          <img src={rev.avatar} alt={rev.userName} className="w-full h-full object-cover" />
                        ) : (
                          rev.userName.charAt(0)
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{rev.userName}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded-md">
                              ✓ Verified Buyer
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-slate-400">{rev.date}</p>
                      </div>
                    </div>

                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {rev.comment}
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <button className="text-[11px] font-semibold text-slate-500 hover:text-slate-950 dark:hover:text-white flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      <span>Helpful ({rev.helpfulCount})</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 text-center py-6">
                Be the first to review this product! Click "Write a Review" above.
              </p>
            )}
          </div>
        </section>

        {/* =========================================================
            RELATED PRODUCTS ("You May Also Like")
            ========================================================= */}
        {relatedProducts.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </section>
        )}

        {/* =========================================================
            RECENTLY VIEWED SECTION
            ========================================================= */}
        {recentlyViewed.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-black text-slate-950 dark:text-white mb-6">
              Recently Viewed
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {recentlyViewed.map(rv => (
                <ProductCard key={rv.id} product={rv} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* =========================================================
          FULLSCREEN IMAGE VIEWER MODAL
          ========================================================= */}
      {isFullscreenImageOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button 
            onClick={() => setIsFullscreenImageOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close fullscreen view"
          >
            <X className="w-6 h-6" />
          </button>

          <img 
            src={images[selectedImageIndex]} 
            alt={product.name}
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl" 
          />
        </div>
      )}

      {/* =========================================================
          SIZE GUIDE MODAL
          ========================================================= */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Ruler className="w-5 h-5 text-rose-600" />
                <span>Size Guide & Fit Chart</span>
              </h3>
              <button onClick={() => setIsSizeGuideOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              <p className="mb-4">Measure around your body while standing straight. All dimensions are in centimeters (cm).</p>
              
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold">
                    <th className="py-2">Size</th>
                    <th className="py-2">Chest / Foot</th>
                    <th className="py-2">Waist</th>
                    <th className="py-2">Fit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr><td className="py-2 font-bold">S / 7</td><td>88-96 cm</td><td>73-81 cm</td><td>Regular</td></tr>
                  <tr><td className="py-2 font-bold">M / 8</td><td>96-104 cm</td><td>81-89 cm</td><td>Regular</td></tr>
                  <tr><td className="py-2 font-bold">L / 9</td><td>104-112 cm</td><td>89-97 cm</td><td>Relaxed</td></tr>
                  <tr><td className="py-2 font-bold">XL / 10</td><td>112-124 cm</td><td>97-109 cm</td><td>Comfort</td></tr>
                  <tr><td className="py-2 font-bold">XXL / 11</td><td>124-136 cm</td><td>109-121 cm</td><td>Oversized</td></tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full py-3 rounded-xl bg-slate-950 text-white font-bold text-xs mt-2"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          WRITE A REVIEW MODAL
          ========================================================= */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Review {product.name}
              </h3>
              <button onClick={() => setIsWriteReviewOpen(false)} className="p-1 rounded-full text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 pt-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Your Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 transition-transform hover:scale-125"
                    >
                      <Star className={`w-6 h-6 ${star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Your Full Name
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-slate-900 dark:focus:ring-white border border-transparent outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Your Feedback
                </label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Describe comfort, fit, material quality, and real-life performance..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-slate-900 dark:focus:ring-white border border-transparent outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWriteReviewOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold shadow-md"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MOBILE STICKY BOTTOM ACTION BAR (Touch-first mobile experience)
          ========================================================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 px-4 border-t border-slate-200 dark:border-slate-800 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Total</span>
          <span className="text-base font-black text-slate-900 dark:text-white">
            ₹{(product.price * quantity).toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-[260px]">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
          
          <button
            onClick={handleBuyNow}
            className="flex-1 py-3 px-3 rounded-xl bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md active:scale-95 transition-transform"
          >
            <span>Buy Now</span>
          </button>
        </div>
      </div>

    </div>
  );
}
