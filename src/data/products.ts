import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'nike-air-max',
    name: 'Nike Air Max 270 React',
    brand: 'Nike',
    category: 'Shoes',
    gender: 'Men',
    description: 'Elevate your everyday stride with the Nike Air Max 270. Featuring Nike’s biggest heel Air unit yet, this sneaker delivers supreme cushioning and a futuristic aesthetic tailored for streetwear culture.',
    price: 8499,
    originalPrice: 11999,
    discountPercentage: 29,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Infrared Crimson', hex: '#e11d48' },
      { name: 'Triple Black', hex: '#0f172a' },
      { name: 'Pure White', hex: '#f8fafc' },
      { name: 'Hyper Royal', hex: '#2563eb' }
    ],
    sizes: ['6', '7', '8', '9', '10', '11'],
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    stockCount: 6,
    badge: 'Top Pick',
    specifications: {
      'Brand': 'Nike',
      'Model': 'Air Max 270 React',
      'Upper Material': 'Engineered Mesh & Synthetic Knit',
      'Midsole': 'Nike React Foam with 270 Max Air Unit',
      'Outsole': 'Solid Rubber Traction Pods',
      'Closure': 'Asymmetrical Speed Lace-Up',
      'Weight': '320g (Size 9)',
      'Country of Origin': 'Vietnam'
    },
    features: [
      'Large volume Max Air heel unit provides responsive shock absorption',
      'Nike React technology delivers an extremely smooth, lightweight ride',
      'Bootie construction contours snugly around the foot for sock-like security',
      'Full rubber coverage on outsole adds durable grip across wet and dry surfaces'
    ],
    material: 'Breathable engineered textile with welded synthetic overlays',
    careInstructions: 'Wipe clean with a damp cloth or soft sponge. Air dry away from direct heat.',
    reviews: [
      {
        id: 'r1',
        userName: 'Aarav Sharma',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: '14 May 2026',
        comment: 'Unbelievably comfortable sneaker! Walked over 15,000 steps across Mumbai in a single day without any foot fatigue. The red and black accent looks striking.',
        helpfulCount: 18,
        verifiedPurchase: true
      },
      {
        id: 'r2',
        userName: 'Rohan Mehta',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: '28 Apr 2026',
        comment: '100% authentic product. Fits true to size. Cushioning in the heel is second to none.',
        helpfulCount: 9,
        verifiedPurchase: true
      },
      {
        id: 'r3',
        userName: 'Priya Verma',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop',
        rating: 4,
        date: '10 Apr 2026',
        comment: 'Looks premium and classy with athletic sweatpants or slim denims. Slightly snug near the toe box initially but breaks in within two days.',
        helpfulCount: 4,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'adidas-ultraboost-light',
    name: 'Adidas Ultraboost Light Running Shoes',
    brand: 'Adidas',
    category: 'Shoes',
    gender: 'Men',
    description: 'Experience epic energy return with the lightest Ultraboost yet. Crafted with 30% lighter BOOST foam and foot-hugging PRIMEKNIT+ textile, this performance runner effortlessly balances distance stamina with street luxury.',
    price: 13999,
    originalPrice: 17999,
    discountPercentage: 22,
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Core Black / Solar Red', hex: '#111827' },
      { name: 'Cloud White', hex: '#f1f5f9' },
      { name: 'Lucid Cyan', hex: '#06b6d4' }
    ],
    sizes: ['7', '8', '9', '10', '11'],
    rating: 4.9,
    reviewCount: 68,
    inStock: true,
    stockCount: 8,
    badge: 'Top Pick',
    specifications: {
      'Brand': 'Adidas',
      'Series': 'Ultraboost Light',
      'Upper': 'PRIMEKNIT+ Forged Textile',
      'Midsole': 'Light BOOST cushioning',
      'Outsole': 'Continental™ Better Rubber',
      'Drop': '10 mm (heel: 30 mm / forefoot: 20 mm)',
      'Weight': '293g (Size 9)'
    },
    features: [
      '30% lighter Light BOOST material generates maximum energy bounce',
      'Linear Energy Point system increases forefoot bending stiffness',
      'Continental™ Natural Rubber outsole guarantees grip in all weather conditions',
      'Upper contains a minimum of 50% recycled Parley Ocean Plastic'
    ],
    material: 'PRIMEKNIT+ textile upper with TPU midfoot cage',
    careInstructions: 'Spot clean with mild detergent. Do not machine wash or tumble dry.',
    reviews: [
      {
        id: 'r4',
        userName: 'Vikram Joshi',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: '02 June 2026',
        comment: 'Best running shoe I have owned. Ran 10km marathon on Sunday and legs felt completely fresh. Worth every rupee.',
        helpfulCount: 22,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'nike-club-fleece-hoodie',
    name: 'Nike Sportswear Club Fleece Pullover Hoodie',
    brand: 'Nike',
    category: 'Clothing',
    gender: 'Men',
    description: 'A closet staple, the Nike Sportswear Club Fleece Hoodie combines classic athletic style with the soft comfort of brushed-back fleece. Featuring an adjustable drawstring hood and kangaroo pouch pocket.',
    price: 3795,
    originalPrice: 4495,
    discountPercentage: 15,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Dark Heather Grey', hex: '#64748b' },
      { name: 'Midnight Obsidian', hex: '#0f172a' },
      { name: 'Burgundy Crimson', hex: '#881337' },
      { name: 'Olive Green', hex: '#3f6212' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviewCount: 94,
    inStock: true,
    stockCount: 14,
    badge: 'New',
    specifications: {
      'Brand': 'Nike',
      'Fit': 'Standard relaxed athletic fit',
      'Fabric': '80% Cotton / 20% Polyester',
      'Hood Lining': '100% Ring-Spun Cotton',
      'Pockets': 'Front Kangaroo Pouch',
      'Cuffs & Hem': 'Ribbed stretch binding'
    },
    features: [
      'Fleece is brushed on the inside for an extra soft, plush feel',
      'Drawstring hood allows customizable coverage against cold weather',
      'Embroidered Futura chest logo adds signature heritage athletic styling'
    ],
    material: '80% Cotton, 20% Polyester premium brushed fleece',
    careInstructions: 'Machine wash warm with like colors. Tumble dry medium.',
    reviews: [
      {
        id: 'r5',
        userName: 'Tanmay Kapoor',
        rating: 5,
        date: '18 May 2026',
        comment: 'Super warm and premium fleece. The fit is slightly relaxed which gives it a modern streetwear silhouette.',
        helpfulCount: 7,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'zara-oversized-structured-blazer',
    name: 'Zara Tailored Oversized Structured Blazer',
    brand: 'Zara',
    category: 'Clothing',
    gender: 'Women',
    description: 'Modern luxury tailoring redefined. Featuring strong peak lapels, pronounced structured shoulders, flap welt pockets, and a clean double-breasted button closure that commands attention.',
    price: 6990,
    originalPrice: 8990,
    discountPercentage: 22,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Alabaster Camel', hex: '#d97706' },
      { name: 'Onyx Black', hex: '#09090b' },
      { name: 'Cream Chalk', hex: '#fdfbf7' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewCount: 36,
    inStock: true,
    stockCount: 5,
    badge: 'Trending',
    specifications: {
      'Brand': 'Zara',
      'Cut': 'Structured Oversized Silhouette',
      'Lining': '100% Viscose Satin',
      'Closure': 'Tortoiseshell double-breasted buttons',
      'Pockets': 'Interior chest pocket and two flap pockets'
    },
    features: [
      'Architectural shoulder pads elevate posture and silhouette',
      'Full inner satin lining ensures smooth layering over knits or silks',
      'Crease-resistant blend keeps you looking sharp all day'
    ],
    material: '64% Polyester, 32% Viscose, 4% Elastane',
    careInstructions: 'Dry clean only. Do not wash or bleach.',
    reviews: [
      {
        id: 'r6',
        userName: 'Ananya Singhania',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: '21 May 2026',
        comment: 'Feels like high-end designer couture. The silhouette is immaculate and falls beautifully.',
        helpfulCount: 15,
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'puma-deviate-nitro-elite',
    name: 'Puma Deviate Nitro 2 Carbon Running Shoes',
    brand: 'Puma',
    category: 'Sports',
    gender: 'Men',
    description: 'The pinnacle of distance running technology. Engineered with a full-length composite INNOPLATE carbon fiber plate and nitrogen-infused NITRO Elite foam for maximum propulsion and record-breaking speeds.',
    price: 10499,
    originalPrice: 14999,
    discountPercentage: 30,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Nitro Electric Lime', hex: '#84cc16' },
      { name: 'Ultra Orange', hex: '#ea580c' },
      { name: 'Puma Black', hex: '#18181b' }
    ],
    sizes: ['7', '8', '9', '10', '11'],
    rating: 4.8,
    reviewCount: 31,
    inStock: true,
    stockCount: 4,
    badge: 'Sale',
    specifications: {
      'Brand': 'Puma',
      'Plate': 'INNOPLATE Carbon Fiber Composite',
      'Foam': 'NITRO Elite Nitrogen Infused PEBA',
      'Outsole': 'PUMAGRIP LT High-Traction Rubber',
      'Drop': '6 mm',
      'Weight': '214g'
    },
    features: [
      'Carbon composite INNOPLATE acts as a lever for maximum energy transfer at toe-off',
      'NITRO Elite foam provides supreme responsiveness at featherlight weight',
      'PUMAGRIP rubber formula delivers 31.6% more traction on wet asphalt'
    ],
    material: 'Monocrystalline breathable engineered mesh',
    careInstructions: 'Clean with damp cloth and mild soap. Air dry naturally.',
    reviews: []
  },
  {
    id: 'under-armour-heatgear-compression',
    name: 'Under Armour HeatGear Sonic Compression Tee',
    brand: 'Under Armour',
    category: 'Sports',
    gender: 'Men',
    description: 'Our original performance baselayer: the layer you put on first and take off last. It’s tight to wick sweat and quick-drying to keep you cool, dry, and hyper-focused during high intensity workouts.',
    price: 2499,
    originalPrice: 3299,
    discountPercentage: 24,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#18181b' },
      { name: 'Academy Blue', hex: '#1e3a8a' },
      { name: 'Mod Gray', hex: '#94a3b8' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.6,
    reviewCount: 58,
    inStock: true,
    stockCount: 19,
    badge: 'Trending',
    specifications: {
      'Brand': 'Under Armour',
      'Fit': 'Ultra-tight, second-skin compression fit',
      'Technology': 'HeatGear® 4-Way Stretch Fabric',
      'Panels': 'Strategic ergonomic mesh ventilation',
      'Anti-Odor': 'Microbial odor resistance treatment'
    },
    features: [
      'Super-light HeatGear® fabric delivers superior coverage without weighing you down',
      'Strategic mesh underarm and back panels for targeted airflow ventilation',
      '4-way stretch material moves better in every workout direction'
    ],
    material: '84% Polyester / 16% Elastane',
    careInstructions: 'Machine wash cold with like colors. Do not use softeners.',
    reviews: []
  },
  {
    id: 'levis-501-original-fit-jeans',
    name: "Levi's 501 Original Fit Selvedge Jeans",
    brand: "Levi's",
    category: 'Clothing',
    gender: 'Men',
    description: 'The blueprint for all jeans: the original 501® since 1873. Features an iconic straight leg cut, signature button fly, and heavy authentic rigid denim that shapes uniquely to your body over time.',
    price: 4299,
    originalPrice: 5999,
    discountPercentage: 28,
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Authentic Indigo Stonewash', hex: '#1d4ed8' },
      { name: 'Rinsed Black Denim', hex: '#0f172a' },
      { name: 'Bleached Light Wash', hex: '#93c5fd' }
    ],
    sizes: ['30', '32', '34', '36', '38'],
    rating: 4.8,
    reviewCount: 112,
    inStock: true,
    stockCount: 11,
    badge: 'Top Pick',
    specifications: {
      'Brand': "Levi's",
      'Model': '501® Original Fit',
      'Rise': 'Regular Mid-Rise (11.25")',
      'Leg Opening': 'Classic Straight Leg (16")',
      'Closure': 'Signature Metal Button Fly',
      'Fabric Weight': '14 oz Heavyweight Denim'
    },
    features: [
      'Non-stretch 100% cotton denim molds to your lifestyle and develops unique fades',
      'Copper rivets reinforce pressure points for decades of wear',
      'Classic 5-pocket styling and authentic Two-Horse leather back patch'
    ],
    material: '100% Cotton Heavy Denim',
    careInstructions: 'Wash inside out in cold water every 10 wears to preserve authentic fades.',
    reviews: []
  },
  {
    id: 'garmin-forerunner-265-gps-watch',
    name: 'Garmin Forerunner 265 AMOLED GPS Sports Watch',
    brand: 'Garmin',
    category: 'Watches',
    gender: 'Unisex',
    description: 'Train brilliantly with a brilliant 1.3" AMOLED touchscreen display. Equipped with advanced running dynamics, training readiness scoring, VO2 max tracking, wrist-based heart rate, and 13 days of battery life.',
    price: 38990,
    originalPrice: 45990,
    discountPercentage: 15,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Whitestone / Tidal Blue', hex: '#38bdf8' },
      { name: 'Black / Slate Gray', hex: '#18181b' },
      { name: 'Aqua Spark', hex: '#06b6d4' }
    ],
    sizes: ['42mm', '46mm'],
    rating: 4.9,
    reviewCount: 27,
    inStock: true,
    stockCount: 3,
    badge: 'Top Pick',
    specifications: {
      'Brand': 'Garmin',
      'Display': '1.3" Colorful AMOLED Touchscreen',
      'Lens Material': 'Corning® Gorilla® Glass 3',
      'Battery Life': 'Up to 13 Days in Smartwatch Mode / 20 hrs GPS',
      'Water Rating': '5 ATM (50 Meters)',
      'Connectivity': 'Bluetooth®, ANT+®, Wi-Fi®'
    },
    features: [
      'Morning Report provides sleep score, HRV status, recovery outlook, and workout forecast',
      'Multiband GNSS satellite positioning for pinpoint pacing accuracy in dense cities or forests',
      'Built-in music storage for offline Spotify® and Amazon Music playback without phone'
    ],
    material: 'Fiber-reinforced polymer bezel with silicone quick-release strap',
    careInstructions: 'Rinse with fresh water after ocean/pool swimming and wipe dry.',
    reviews: []
  },
  {
    id: 'apple-watch-ultra-alpine-loop',
    name: 'Apple Watch Ultra Titanium with Alpine Loop',
    brand: 'Apple',
    category: 'Watches',
    gender: 'Unisex',
    description: 'The most rugged and capable Apple Watch ever. Designed for endurance athletes, outdoor adventurers, and water explorers with a 49mm aerospace-grade titanium case, precision dual-frequency GPS, and up to 36 hours of battery life.',
    price: 74900,
    originalPrice: 89900,
    discountPercentage: 17,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Orange Alpine', hex: '#f97316' },
      { name: 'Starlight Alpine', hex: '#f1f5f9' },
      { name: 'Green Alpine', hex: '#15803d' }
    ],
    sizes: ['49mm'],
    rating: 4.9,
    reviewCount: 88,
    inStock: true,
    stockCount: 4,
    badge: 'Trending',
    specifications: {
      'Brand': 'Apple',
      'Case': '49mm Aerospace-Grade Titanium',
      'Display': 'Always-On Retina up to 2000 nits brightness',
      'Water Resistance': '100m water resistant / EN13319 dive computer certified',
      'Siren': '86-decibel Emergency Siren audible up to 180 meters'
    },
    features: [
      'Customizable Action button gives instant tactile control for workout intervals',
      'Precision dual-frequency GPS (L1 and L5) delivers incredible route accuracy',
      'Red night mode face preserves night vision during nocturnal expeditions'
    ],
    material: 'Grade 5 Titanium casing with Sapphire crystal front face',
    careInstructions: 'Wipe clean with a nonabrasive cloth.',
    reviews: []
  },
  {
    id: 'nike-brasilia-training-duffel-bag',
    name: 'Nike Brasilia 9.5 Training Duffel Bag (60L)',
    brand: 'Nike',
    category: 'Bags',
    gender: 'Unisex',
    description: 'Spacious, resilient, and ready for intense training sessions or weekend getaways. Features a ventilated exterior shoe compartment that keeps dirty trainers separated from your clean apparel.',
    price: 2795,
    originalPrice: 3495,
    discountPercentage: 20,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#0f172a' },
      { name: 'Iron Gray / Volt', hex: '#475569' },
      { name: 'Game Royal Blue', hex: '#1d4ed8' }
    ],
    sizes: ['Medium (60L)'],
    rating: 4.7,
    reviewCount: 45,
    inStock: true,
    stockCount: 16,
    badge: 'Sale',
    specifications: {
      'Brand': 'Nike',
      'Capacity': '60 Liters',
      'Dimensions': '64cm L x 30cm W x 30cm H',
      'Base': 'Water-resistant coated reinforced bottom',
      'Straps': 'Padded adjustable shoulder strap & dual haul handles'
    },
    features: [
      'Zippered main compartment secures your training essentials',
      'Internal zippered stash pocket keeps cash, cards, and phone safe',
      'Ventilated side compartment isolates gym shoes or damp gear from fresh clothing'
    ],
    material: '100% Recycled Durable Polyester',
    careInstructions: 'Spot clean only.',
    reviews: []
  },
  {
    id: 'ray-ban-aviator-classic-sunglasses',
    name: 'Ray-Ban Aviator Classic Gold G-15 Sunglasses',
    brand: 'Ray-Ban',
    category: 'Accessories',
    gender: 'Unisex',
    description: 'Originally created for U.S. aviators in 1937, Ray-Ban Aviator Classic sunglasses are a timeless cultural icon. Combines handsome gold metal styling with legendary crystal green G-15 lenses that offer 100% UV protection.',
    price: 9590,
    originalPrice: 11990,
    discountPercentage: 20,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Arista Gold / G-15 Green', hex: '#d97706' },
      { name: 'Gunmetal / Polarized Grey', hex: '#475569' },
      { name: 'Silver / Mirror Blue', hex: '#38bdf8' }
    ],
    sizes: ['Standard (58mm)', 'Large (62mm)'],
    rating: 4.8,
    reviewCount: 76,
    inStock: true,
    stockCount: 8,
    badge: 'Top Pick',
    specifications: {
      'Brand': 'Ray-Ban',
      'Frame': 'High-Grade Metal Alloy Gold Finish',
      'Lenses': 'Classic G-15 Mineral Glass',
      'UV Protection': '100% UVA & UVB Filters',
      'Case': 'Includes signature leather case & microfiber cloth'
    },
    features: [
      'Absorbs 85% of visible light and blocks out almost all blue light for natural color perception',
      'Slim ergonomic temple tips for non-slip comfort behind the ears',
      'Adjustable soft nose pads offer personalized snug fit'
    ],
    material: 'Monel metal frame with tempered mineral glass lenses',
    careInstructions: 'Clean with the provided microfiber cloth using dedicated optical lens spray.',
    reviews: []
  },
  {
    id: 'new-balance-574-core-sneakers',
    name: 'New Balance 574 Core Suede Lifestyle Sneakers',
    brand: 'New Balance',
    category: 'Shoes',
    gender: 'Unisex',
    description: 'The most New Balance shoe ever. The 574 was built to be a reliable shoe that could do a lot of different things well rather than as a platform for revolutionary technology. Unpretentious, versatile, and enduringly stylish.',
    price: 7499,
    originalPrice: 9999,
    discountPercentage: 25,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Heritage Grey', hex: '#94a3b8' },
      { name: 'Navy Blue', hex: '#1e3a8a' },
      { name: 'Burgundy Red', hex: '#991b1b' }
    ],
    sizes: ['6', '7', '8', '9', '10', '11'],
    rating: 4.7,
    reviewCount: 52,
    inStock: true,
    stockCount: 7,
    badge: 'Trending',
    specifications: {
      'Brand': 'New Balance',
      'Model': '574 Core',
      'Cushioning': 'ENCAP Midsole Cushioning',
      'Upper': 'Suede and Mesh Hybrid',
      'Outsole': 'Durable Lugged Rubber Outsole'
    },
    features: [
      'ENCAP midsole cushioning combines lightweight foam with durable polyurethane rim',
      'Spacious rounded toe box guarantees all-day relaxed toe splay',
      'Iconic reflective N side logo enhances visibility at dusk'
    ],
    material: 'Premium pigskin suede and breathable mesh',
    careInstructions: 'Brush with suede sponge or brass wire suede brush. Do not submerge in water.',
    reviews: []
  },
  {
    id: 'adidas-tiro-training-trackpants',
    name: 'Adidas Tiro 23 League Athletic Track Pants',
    brand: 'Adidas',
    category: 'Clothing',
    gender: 'Men',
    description: 'Born on the soccer pitch, adopted by streets around the world. These track pants feature moisture-absorbing AEROREADY tech, ankle zips for fast on/off over boots, and signature 3-Stripes running down the legs.',
    price: 3299,
    originalPrice: 4299,
    discountPercentage: 23,
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Black with White Stripes', hex: '#0f172a' },
      { name: 'Navy with White Stripes', hex: '#1e3a8a' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewCount: 63,
    inStock: true,
    stockCount: 15,
    badge: 'New',
    specifications: {
      'Brand': 'Adidas',
      'Fit': 'Slim tapered athletic fit with mid-rise waist',
      'Waistband': 'Elastic waist with internal drawcord',
      'Pockets': 'Zippered side seam pockets'
    },
    features: [
      'AEROREADY technology channels perspiration away from skin for rapid evaporation',
      'Ankle zips make changing quick even when wearing athletic footwear',
      'Engineered knee mesh panels promote airflow during intense sprints'
    ],
    material: '100% Recycled Polyester doubleknit',
    careInstructions: 'Machine wash warm inside out with like colors.',
    reviews: []
  },
  {
    id: 'puma-phase-backpack',
    name: 'Puma Phase Modern Everyday Backpack',
    brand: 'Puma',
    category: 'Bags',
    gender: 'Unisex',
    description: 'A daypack that holds everything you need for class, gym, or work. Equipped with two-way zip opening, a mesh side pocket for your water bottle, and padded adjustable shoulder straps for ergonomic comfort.',
    price: 1499,
    originalPrice: 2199,
    discountPercentage: 31,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Jet Black', hex: '#09090b' },
      { name: 'Peacoat Navy', hex: '#1e3a8a' },
      { name: 'High Risk Red', hex: '#dc2626' }
    ],
    sizes: ['22L Standard'],
    rating: 4.6,
    reviewCount: 39,
    inStock: true,
    stockCount: 20,
    badge: 'Sale',
    specifications: {
      'Brand': 'Puma',
      'Volume': '22 Liters',
      'Dimensions': '44cm x 30cm x 14cm',
      'Back Panel': 'Padded ergonomic back cushioning'
    },
    features: [
      'Two-way zipper on main compartment for easy access',
      'Reflective loop on front panel for added low-light safety',
      'Mesh side pocket easily accommodates standard 1-liter bottles'
    ],
    material: 'Dura-coated 100% Polyester with PU backing',
    careInstructions: 'Wipe with damp cloth as needed.',
    reviews: []
  },
  {
    id: 'nike-aerobill-running-cap',
    name: 'Nike Dri-FIT AeroBill Featherlight Running Cap',
    brand: 'Nike',
    category: 'Accessories',
    gender: 'Unisex',
    description: 'Keep the sun and sweat out of your eyes. The Nike AeroBill Featherlight Cap combines proprietary sweat-wicking technology with strategically placed perforations for optimal breathability on long sun-drenched runs.',
    price: 1695,
    originalPrice: 1995,
    discountPercentage: 15,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Pure White / Black Swoosh', hex: '#f8fafc' },
      { name: 'Black / White Swoosh', hex: '#0f172a' }
    ],
    sizes: ['One Size (Adjustable)'],
    rating: 4.7,
    reviewCount: 48,
    inStock: true,
    stockCount: 12,
    badge: 'New',
    specifications: {
      'Brand': 'Nike',
      'Tech': 'Nike AeroBill & Dri-FIT Moisture Management',
      'Closure': 'Adjustable hook-and-loop rear tab with pull ring'
    },
    features: [
      'AeroBill technology combines breathability with sweat-wicking comfort',
      'Perforations along crown panels accelerate heat release',
      'Reflective elements keep you visible during early morning or night miles'
    ],
    material: '100% Recycled Polyester',
    careInstructions: 'Hand wash cold. Line dry.',
    reviews: []
  },
  {
    id: 'under-armour-hustle-pro-backpack',
    name: 'Under Armour Hustle Pro Storm Backpack',
    brand: 'Under Armour',
    category: 'Bags',
    gender: 'Unisex',
    description: 'Built with UA Storm water-resistant finish to fight off bad weather. Includes a soft-lined sleeve that holds up to a 15" MacBook Pro, dual water-repellent valuables pockets, and LEVELED™ strap system for balanced weight distribution.',
    price: 4599,
    originalPrice: 5999,
    discountPercentage: 23,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Castlerock Grey / Black', hex: '#475569' },
      { name: 'Blackout', hex: '#09090b' }
    ],
    sizes: ['31.5L Pro'],
    rating: 4.8,
    reviewCount: 34,
    inStock: true,
    stockCount: 6,
    badge: 'Top Pick',
    specifications: {
      'Brand': 'Under Armour',
      'Waterproofing': 'UA Storm Technology',
      'Laptop Sleeve': 'Soft-lined up to 15" screen size',
      'Capacity': '31.5 Liters'
    },
    features: [
      'UA Storm technology repels water without sacrificing fabric breathability',
      'LEVELED™ strap system guides you to ensure straps are adjusted evenly',
      'Breathable air-mesh back panel for total comfort and support'
    ],
    material: '100% Polyester Ballistic Weave',
    careInstructions: 'Spot clean with mild detergent.',
    reviews: []
  }
];

export const categoriesList = [
  {
    id: 'Clothing',
    name: 'Clothing',
    tagline: 'Hoodies, Tees, Trackpants',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'Shoes',
    name: 'Shoes',
    tagline: 'Sneakers, Running, Trainers',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'Sports',
    name: 'Sports',
    tagline: 'Performance Gear & Runners',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'Accessories',
    name: 'Accessories',
    tagline: 'Caps, Eyewear, Socks',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'Watches',
    name: 'Watches',
    tagline: 'Smart & GPS Running Watches',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'Bags',
    name: 'Bags',
    tagline: 'Gym Duffels, Daypacks',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'New Arrivals',
    name: 'New Arrivals',
    tagline: 'Just Dropped Collection',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=500&auto=format&fit=crop'
  }
];
