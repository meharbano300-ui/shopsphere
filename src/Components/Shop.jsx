import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User, MapPin, Star, Filter, Home,
  ArrowUpRight, Heart, Zap, Clock, ShieldCheck, RefreshCcw, Calendar, Gift, Flame, Sparkles
} from "lucide-react";
import Checkout from "./Checkout";

// Mock Data with Images for Slider 
const HERO_SLIDES = [
  { id: 1, title: "ULTIMATE FASHION", sub: "UP TO 70% OFF", bg: "bg-teal-900", img: "images/banner1.jpg", icon: "👕" },
    { id: 3, title: "PREMIUM DECOR", sub: "ELITE INTERIORS", bg: "bg-rose-900", img: "images/banner2.jfif", icon: "🛋️" },
  { id: 2, title: "NEXT-GEN Z", sub: "SMART LIVING", bg: "bg-indigo-900", img: "images/banner3.jfif", icon: "🎒" },

];
const CATEGORIES = [
  { name: "Bags", img: "images/bag3.jfif" }, 
  { name: "Lipstick", img: "images/z.jfif" }, 
  { name: "Shirts", img: "images/men.jfif" },
  { name: "Shoes", img: "images/shoe.jfif" }, 
  { name: "Caps", img: "images/cap.jpg" }, 
   { name: "Jewelry", img: "images/jewel.jfif" },
  { name: "Jeans", img: "images/jeans.jfif" },
  { name: "Glasses", img: "images/glassess.jfif" }, 
  { name: "Clothing", img: "images/women-shirt-2.jfif" }, 
    { name: "Jewelry", img: "images/img7.jfif" },
  { name: "Bags", img: "images/n.jfif" },
  { name: "Watch", img: "images/t.jfif" }, 
];

const INITIAL_PRODUCTS = [
   { id: 1, cat: "Fashion", name: "Beautiful Lipstick Makeup Tips", price: 24.10, rating: 4.7, stock: 5, total: 30, img: "images/z.jfif" },
   { id: 2, cat: "Clothing", name: "Urban-Zen Oversized Tee", price: 67.80, rating: 4.9, stock: 12, total: 30, img: "images/q.jfif" },
   { id: 3, cat: "Apparel", name: "Metro-Swift Sling Pouch", price: 83.00, rating: 5.0, stock: 16, total: 30, img: "images/n.jfif" },
   { id: 4, cat: "Apparel", name: "Lunar-Phase Chrono Watch", price: 30.00, rating: 4.9, stock: 16, total: 30, img: "images/i.jfif" },
   { id: 5, cat: "Fashion", name: "Vintage-Wash Graphic Crew", price: 205.00, rating: 4.4, stock: 8, total: 20, img: "images/e.jfif" },
  
 { id: 6, cat: "Fashion", name: "Stellar-Link Gold Bracelet", price: 294.10, rating: 5.0, stock: 5, total: 30, img: "images/u.jfif" },
 { id: 7, cat: "GLASSESS", name: "Horizon-HD Polarized Aviators", price: 795.80, rating: 4.9, stock: 12, total: 30, img: "images/v.jfif" },
 { id: 8, cat: "WALKERS", name: "Swift-Lite Gym Trainers", price: 265.80, rating: 4.1, stock: 12, total: 30, img: "images/y.jfif" },
 { id: 9, cat: "Apparel", name: "Zen-Stretch Lounge Pants", price: 980.00, rating: 3.5, stock: 16, total: 30, img: "images/d.jfif" },
 { id: 10, cat: "Clothing", name: "Thermo-Guard Quilted Vest", price: 120.80, rating: 2.9, stock: 12, total: 30, img: "images/x.jfif" },

  { id:11, cat: "Fashion", name: " Urban-Flex Denim Jacket", price: 659.10, rating: 4.7, stock: 5, total: 30, img: "images/a.jfif" },
  { id: 12, cat: "BAGS", name: "Nomad-Pro Waterproof Tote", price: 368.00, rating: 5.0, stock: 35, total: 50, img: "images/h.jfif" },
  { id: 13, cat: "Apparel", name: "Signature Tailored Chinos", price: 465.00, rating: 1.8, stock: 35, total: 50, img: "images/c.jfif" },
  { id: 14, cat: "GLASSESS", name: "Street-Icon Snapback Cap", price: 237.00, rating: 3.9, stock: 8, total: 20, img: "images/w.jfif" },
  { id: 15, cat: "CLOTHING", name: "manti Business Pack", price: 465.00, rating: 4.2, stock: 8, total: 20, img: "images/j.jfif" },


  { id: 16, cat: "SHOE", name: " Cloud-Stride Urban Sneakers", price: 76.10, rating: 4.4, stock: 5, total: 30, img: "images/f.jfif" },
  { id: 17, cat: "PERFUME", name: "Luxury Perfume Bottle with", price: 68.80, rating: 4.0, stock: 12, total: 30, img: "images/dd.jfif" },
  { id: 18, cat: "TEWELRY", name: "Elegant Rhinestone Jewelry", price: 23.00, rating: 5.0, stock: 8, total: 20, img: "images/cc.jfif" },
   { id: 19, cat: "Apparel", name: "Premium Crewneck Tee", price: 402.00, rating: 4.4, stock: 16, total: 30, img: "images/fourth.jfif" },
  { id: 20, cat: "Travel", name: "Anti-Theft Business Pack", price: 760.00, rating: 5.0, stock: 8, total: 20, img: "images/bussines_pack.jfif" },


 { id: 21, cat: "WEARING CAP", name: "Edge-Distressed Trucker Cap", price: 230.10, rating: 4.7, stock: 5, total: 30, img: "images/k.jfif" },
 { id: 22, cat: "WLAKERS SHOES", name: "Nova-Light Breathable Mesh", price: 347.80, rating: 4.1, stock: 12, total: 30, img: "images/l.jfif" },
 { id: 23, cat: "TRAVEL BAGS", name: "Jetstream Expandable Cabin Bag", price: 659.80, rating: 2.9, stock: 12, total: 30, img: "images/m.jfif" },
 { id: 24, cat: "FOOTWEAR", name: "Midnight Royal Embellished Heels", price: 546.80, rating: 2.4, stock: 12, total: 30, img: "images/bb.jfif" },
 { id: 25, cat: "cLOTHING", name: "Women's Elegant Vintage Floral", price: 92.00, rating: 3.5, stock: 8, total: 20, img: "images/o.png" },


  { id: 26, cat: "Fashion", name: "Aero-Fit Performance Polo", price: 70.10, rating: 4.5, stock: 5, total: 30, img: "images/p.jfif" },
  { id: 27, cat: "Shoes", name: "Air Mesh Athletic Walkers", price: 40.00, rating: 3.9, stock: 35, total: 50, img: "images/walkers.jfif" },
  { id: 28, cat: "WEARING", name: "Chrono-Max Titanium Watch", price: 20.00, rating: 5.0, stock: 8, total: 20, img: "images/t.jfif" },
  { id: 29, cat: "Clothing", name: "Midnight-Satin Evening Shirt", price: 15.80, rating: 4.9, stock: 12, total: 30, img: "images/r.jfif" },
  { id: 30, cat: "LEATHER BAG", name: "Vogue-Strap Leather Crossbody", price: 380.80, rating: 4.8, stock: 12, total: 30, img: "images/s.jfif" },


  { id: 31, cat: "CLOTHING", name: "Oxford Slim-Fit Shirt", price: 40.10, rating: 4.7, stock: 5, total: 30, img: "images/men1.jfif" },
 { id: 32, cat: "FASHION", name: "Unbelievable Verragio Engagement Rings", price: 305.80, rating: 4.1, stock: 12, total: 30, img: "images/aa.jfif" },
 { id: 33, cat: "SHOE", name: "Hydro-Shield Elegant HAT", price: 870.80, rating: 4.2, stock: 12, total: 30, img: "images/g.jfif" },
  { id: 34, cat: "CLOTHING", name: "Eco-Smart Hoodie Pro", price: 3985.80, rating: 5.9, stock: 12, total: 30, img: "images/Hoodie.jfif" },
  { id: 35, cat: "Clothing", name: "Aero-Loft Performance Tee", price: 746.80, rating: 3.9, stock: 12, total: 30, img: "images/b.jpg" },

];

const ShopSphere = () => {
  const [cartCount, setCartCount] = useState(() => {
    // Load cart count from localStorage on initial render
    const savedCart = localStorage.getItem('shopsphere_cart');
    return savedCart ? JSON.parse(savedCart).length : 0;
  });
  const [currentHero, setCurrentHero] = useState(0);
  const [activeTab, setActiveTab] = useState("Flash Deals");
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [timeLeft, setTimeLeft] = useState({ d: 4, h: 2, m: 45, s: 59 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([]);

  // Load cart from localStorage on component mount
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('shopsphere_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Load wishlist from localStorage on component mount
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('shopsphere_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopsphere_cart', JSON.stringify(cartItems));
    setCartCount(cartItems.length);
  }, [cartItems]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopsphere_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const clock = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return { ...prev, d: prev.d - 1, h: 23, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  // Handle Add to Cart function with quantity tracking
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      // Check if product already exists in cart
      const existingItemIndex = prev.findIndex(item => item.id === product.id);
      if (existingItemIndex >= 0) {
        // If exists, increase quantity
        const updatedCart = [...prev];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: (updatedCart[existingItemIndex].quantity || 1) + 1
        };
        return updatedCart;
      } else {
        // If new, add with quantity 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  

    // Add notification
    const notification = {
      id: Date.now(),
      message: `${product.name} added to cart!`,
      type: 'cart'
    };
    setNotifications(prev => [...prev, notification]);
    // Remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 3000);
  };

  // Handle Add to Wishlist function
  const handleAddToWishlist = (product) => {
    // Check if product is already in wishlist
    if (!wishlistItems.some(item => item.id === product.id)) {
      setWishlistItems(prev => [...prev, product]);
      
      // Add notification
      const notification = {
        id: Date.now(),
        message: `${product.name} added to wishlist!`,
        type: 'wishlist'
      };
      setNotifications(prev => [...prev, notification]);
      // Remove notification after 3 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 3000);
    }
  };
  const handleSort = (type) => {
    const sorted = [...products].sort((a, b) => 
      type === "low" ? a.price - b.price : b.price - a.price
    );
    setProducts(sorted);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans overflow-x-hidden">
      {/* Notifications */}
      <div className="fixed top-17 right-4 z-[1000] space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`p-4 rounded-lg shadow-lg ${
                notification.type === 'cart' 
                  ? 'bg-green-300 text-green-800 border-l-8 border-green-900' 
                  : 'bg-blue-200 text-blue-800  border-l-7 border-blue-900'
              }`}
            >
              <div className="flex items-center gap-2">
                {notification.type === 'cart' ? <ShoppingCart size={16} /> : <Heart size={16} />}
                <span className="font-bold text-sm">{notification.message}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

  {/*  HEADER section start here */}
    <header className="bg-[#131921] text-white sticky top-0 z-[100] shadow-2xl">
        <div className="max-w-[1600px] mx-auto px-10 py-4 flex items-center gap-6">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-orange-500 p-1.5 rounded-lg rotate-12 group-hover:rotate-0 transition-transform">
              <Zap size={24} className="fill-white text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter italic">SHOPSPHERE</h1>
          </motion.div>
          {/* New Home & Location Icons */}
          <div className="hidden lg:flex items-center gap-6 border-l border-white/20 pl-6">
            <div className="flex items-center gap-2 cursor-pointer hover:text-orange-400 transition-colors">
              <Home size={20} />
              <a href="/"><span className="text-xs font-black uppercase tracking-tight">Home</span></a>
            </div>
            <div className="flex items-center gap-2 cursor-pointer group">
              <MapPin size={20} className="text-orange-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 leading-none">Deliver to</span>
                <span className="text-xs font-black group-hover:underline">Pakistan</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex h-11 relative">
            <input type="text" placeholder="Search premium products..." className="flex-1 px-4 border border-orange-300 text-gray outline-none rounded-l-md" />
            <button className="bg-orange-400 hover:bg-orange-500  px-6 rounded-r-md transition-colors text-black font-bold flex items-center gap-2">
              <Search size={20} />
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-center bg-white/5 px-4 py-1 rounded-[5px] border border-white/10">
              <span className="text-[10px] text-orange-400 font-bold uppercase tracking-tighter">Live Time</span>
              <span className="text-sm font-mono font-bold">{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="relative cursor-pointer p-2 hover:bg-white/10 rounded-full">
               <motion.span key={cartCount} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-orange-500 text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </motion.span>
              <a href="/Cart_Page"><ShoppingCart size={28} /></a>
            </div>
            <a href="/UserProfile"><User size={28} className="cursor-pointer hover:text-orange-400" /></a>
          </div>
        </div>
      </header>

      {/* 2. CONVERGING HERO SLIDER */}
      <section className="relative h-[550px] bg-black overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentHero} 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 z-0">
              <img src={HERO_SLIDES[currentHero].img} className="w-full h-full object-cover opacity-60" alt="bg" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
            </div>
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center max-w-4xl px-6">
                <motion.div 
                  initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                  className="flex items-center justify-center gap-2 mb-4"
                >
                  <Zap size={20} className="text-yellow-300 fill-yellow-300" />
                  <span className="uppercase tracking-[0.4em] font-bold text-xs text-white/80">Premium Experience</span>
                </motion.div>
                <motion.h2 
                  initial={{ scale: 1.5, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-6xl md:text-8xl font-black leading-none text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                >
                  {HERO_SLIDES[currentHero].title}
                </motion.h2>
                <motion.p 
                  initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                  className="text-xl mt-4 text-white/90 font-light"
                >
                  {HERO_SLIDES[currentHero].sub}
                </motion.p>
                <a href="/Services"><motion.button 
                  whileHover={{ scale: 1.1 }} 
                  className="mt-8 bg-white text-black px-10 py-3 rounded-full font-black flex items-center gap-3 mx-auto transition-all text-sm"
                >
                  SHOP MORE <ArrowUpRight size={18} />
                </motion.button></a>
              </div>
            </div>
            <motion.div 
              initial={{ scale: 0, opacity: 0 }} 
              animate={{ scale: 1, opacity: 0.2 }} 
              transition={{ duration: 1.2 }}
              className="absolute right-10 bottom-10 text-[300px] pointer-events-none select-none hidden md:block"
            >
              {HERO_SLIDES[currentHero].icon}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </section>

    {/* 3. DUAL BOXES (Categories & Tabs) start here */}
      <div className="max-w-[1400px] mx-auto px-10 -mt-16 relative z-50 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-8 rounded-[5px] shadow-2xl border border-gray-100 overflow-hidden">
          <h3 className="text-xl font-black italic mb-6">SHOP BY CATEGORIES</h3>
          <div className="flex overflow-hidden">
            <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="flex whitespace-nowrap">
              {[...CATEGORIES, ...CATEGORIES].map((cat, i) => (
                <div key={i} className="flex flex-col items-center gap-3 min-w-[90px] group">
                  <div className="w-16 h-16 bg-gray-100 rounded-[5px] flex items-center justify-center overflow-hidden group-hover:bg-orange-100 transition-colors">
                    {/* Fixed Image Tag for Categories */}
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-black text-gray-600 uppercase">{cat.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[5px] shadow-2xl border border-gray-100">
          <div className="flex gap-8 border-b mb-6">
            {[{ id: "Flash Deals", icon: <Flame size={14}/> }, { id: "New Arrivals", icon: <Sparkles size={14}/> }, { id: "75% Discount", icon: <Zap size={14}/> }, ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`pb-4 text-xs font-black flex items-center gap-2 relative ${activeTab === tab.id ? 'text-orange-500' : 'text-gray-400'}`}>
                {tab.icon} {tab.id} {activeTab === tab.id && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500" />}
              </button>
            ))}
          </div>
          <div className="p-3 bg-orange-50 rounded-xl mb-4"><p className="text-xs font-black">🔥 Trending: {activeTab} ending soon!</p></div>
          <a href="/Checkout" ><motion.button whileTap={{ scale: 0.95 }} className="w-full bg-black text-white py-4 rounded-xl font-black text-sm">PURCHASE NOW</motion.button></a>
        </div>
      </div>
   {/* 3. DUAL BOXES (Categories & Tabs) end here */}


  {/* 4. FLASH SALE section start here*/}
      <section className="max-w-[1400px] mx-auto px-10 py-15">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-5 bg-white p-10  rounded-[5px] shadow-xl border border-gray-100">
          <div className="space-y-6 flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-3 bg-red-50 text-red-600 px-6 py-2 rounded-[6px] font-black border border-red-100 animate-bounce">
              <Zap size={20} className="fill-red-600" />
              <span className="tracking-[0.2em] text-xs uppercase">Limited Time Offer</span>
            </div>
            <h3 className="text-6xl font-black tracking-tighter text-gray-900">FLASH DEALS</h3>
            <div className="flex items-center gap-4 justify-center md:justify-start">
               <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-[6px] flex items-center gap-2 border border-orange-200">
                  <Calendar size={18} />
                  <span className="font-black text-sm italic">{timeLeft.d} DAYS REMAINING</span>
               </div>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-gray-50 rounded-[1.8rem] border shadow-inner">
            {[ { val: timeLeft.h, label: "Hours" }, { val: timeLeft.m, label: "Mins" }, { val: timeLeft.s, label: "Secs" } ].map((time, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-20 h-24 bg-gray-900 text-white flex items-center justify-center rounded-[2.0rem] text-4xl font-black shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.span key={time.val} initial={{ y: 20 }} animate={{ y: 0 }}>{time.val.toString().padStart(2, '0')}</motion.span>
                </div>
                <span className="text-[10px] font-black text-gray-400 mt-3 uppercase tracking-widest">{time.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-4 bg-gray-900 text-white p-7 rounded-[1.8rem] min-w-[200px]">
            <Clock size={35} className="text-orange-400 animate-pulse" />
            <div className="text-center">
               <p className="text-[11px] opacity-60 font-bold">SHOP CLOCK</p>
               <p className="text-2xl font-mono font-black">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </div>
{/* 4. FLASH SALE section end here*/}


{/* title& sort by section start here*/}
    <div className="flex justify-between items-center mb-8 px-2">
       <div>
           <h4 className="text-2xl font-black italic text-gray-800">OUR PREMIUM COLLECTION</h4>
           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Selected for your lifestyle</p>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-[0.4rem] shadow-sm border">
                <Filter size={16} className="text-orange-500" />
                <select onChange={(e) => handleSort(e.target.value)} className="bg-transparent outline-none text-xs font-black cursor-pointer">
                    <option value="featured">Featured Categories</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                     <option value="Alphabets">Price: A to Z</option>
                </select>
            </div>
        </div>
 {/* title& sort by section end here*/}


 {/* Collection & Grid images section start here*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 ">
          {products.map((p) => (
            <motion.div key={p.id} layout whileHover={{ y: -10 }} className="bg-white rounded-[0.3rem] mt-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all group relative">
              <div className="relative aspect-square bg-[#F8F9FA] rounded-[0.3rem]  flex items-center justify-center mb-4 overflow-hidden">
                {/* Fixed Image Tag for Products */}
                <motion.img 
                  src={p.img} 
                  alt={p.name}
                  whileHover={{ scale: 1.1 }} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0  bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => handleAddToWishlist(p)} className="bg-white text-black px-4 py-2 rounded-[3px] shadow-2xl font-black text-[10px]">ADD TO WISHLIST</button>
                </div>
              </div>
              <div className="space-y px-3  ">
                <div className="flex justify-between items-center text-[9px] font-black text-orange-500 uppercase">
                  <span>{p.cat}</span>
                  <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded">
                    <Star size={11} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-black">{p.rating}</span>
                  </div>
                </div>
                <h4 className="font-bold text-sm text-gray-800 line-clamp-1 group-hover:text-orange-500  transition-colors">{p.name}</h4>
                <div className="flex items-center justify-between pt-2 mb-4">
                  <span className="text-xl font-black text-gray-900">${p.price.toFixed(2)}</span>
                  <motion.button whileTap={{ scale: 0.8 }} onClick={() => handleAddToCart(p)} className="bg-gray-900 text-white p-2 rounded-[8px] group-hover:bg-orange-500 transition-all shadow-lg">
                    <ShoppingCart size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
{/* Collection & Grid images section end here*/}


{/* 5. TRUST BADGES section start here*/}
       <div className="px-10">
       <h4 className="text-2xl font-black italic text-gray-800">Your Trust is Our Commitment</h4>
       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Trust is Our Top Priority</p>
        </div>
     <div className="max-w-[1400px] mx-auto px-10 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
  {[
    { icon: <ShieldCheck size={24}/>, title: "Secure Payment", desc: "100% Encrypted" },
    { icon: <RefreshCcw size={24}/>, title: "Free Returns", desc: "30-day guarantee" },
    { icon: <Zap size={24} className="text-green-500"/>, title: "Express Shipping", desc: "24-48 hours" },
    { icon: <User size={24}/>, title: "24/7 Support", desc: "Always online" },
     { icon: <Gift size={24}/>, title: "Premium Packing", desc: "Luxury gift boxes" },
    { icon: <ShieldCheck size={24} className="text-green-500"/>, title: "Quality Assured", desc: "Multi-step inspection" },
    { icon: <Sparkles size={24}/>, title: "Eco-Friendly", desc: "Sustainable materials" },
    { icon: <ShieldCheck size={24}/>, title: "Global Warranty", desc: "1-year protection" },
  ].map((item, i) => (
    <motion.div 
      key={i} 
      whileHover={{ y: -5 }}
      className="flex items-center gap-3 bg-white p-5 rounded-[5px] border border-gray-100 shadow-sm hover:shadow-md transition-all"
    >
      <div className="text-orange-500 bg-orange-50 p-2.5 rounded-xl">
        {item.icon}
      </div>
      <div>
        <h5 className="font-black text-[13px] uppercase tracking-tight">{item.title}</h5>
        <p className="text-[12px] text-gray-400 font-bold">{item.desc}</p>
      </div>
    </motion.div>
  ))}
</div>
 {/* 5. TRUST BADGES section end here*/}
      <footer className="bg-[#131921] mt-15 pt-16 pb-10 text-white text-center">
        <h2 className="text-3xl font-black italic tracking-tighter mb-4 underline decoration-orange-500 underline-offset-8">SHOPSPHERE</h2>
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.5em]">© 2026 SHOPSPHERE GLOBAL INC.</p>
      </footer>
    </div>
  );
};
export default ShopSphere;