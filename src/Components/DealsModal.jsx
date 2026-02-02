import React, { useState, useEffect } from 'react';
import { X, Clock, Tag, Gift, ShoppingBag, Truck, Shield, ChevronRight, Star, Flame, TrendingUp, Zap, Users, Home, Baby, Heart, Sparkles } from 'lucide-react';

const DealsModal = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 23, minutes: 59, seconds: 59 });
  const [activeTab, setActiveTab] = useState('all'); // State for filtering
  const [rotation, setRotation] = useState({ sec: 0, min: 0, hr: 0 });

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      const now = new Date();
      setRotation({
        sec: now.getSeconds() * 6,
        min: now.getMinutes() * 6,
        hr: (now.getHours() % 12) * 30 + now.getMinutes() * 0.5
      });
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { ...prev, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  // CATEGORIES DEFINITION
  const categories = [
    { id: 'all', label: 'All ', icon: <Tag size={18} /> },
    { id: 'men', label: 'Men Brand', icon: <Users size={18} /> },
    { id: 'women', label: 'Women Brands', icon: <Heart size={18} /> },
    { id: 'electronics', label: 'Electronics', icon: <Zap size={18} /> },
    { id: 'home', label: 'Home & Living', icon: <Home size={18} /> },
    { id: 'beauty', label: 'Beauty', icon: <Sparkles size={18} /> },
    { id: 'baby', label: 'Baby & Kids', icon: <Baby size={18} /> },
  ];

  // ALL PRODUCTS DATA
  const allDeals = [
     { id: 1, brand: "Nova", productImage: "images/logos/nova.jfif", category: "men", discount: "BOGO", timeLeft: "08:45:00", description: "Hourglass Fit: Premium Stretch", color: "bg-stone-100", price: "23,999", rating: 4.4, sold: 456, status: "new", originalPrice: "55,998" },
     { id: 2, brand: "Prada", productImage: "images/logos/prada.jfif", category: "home", discount: "31% OFF", timeLeft: "05:20:00", description: "Saffiano Lux: Handcrafted Crossbody", color: "bg-indigo-50", price: "24,999", rating: 4.6, sold: 120, status: "popular", originalPrice: "32,999" },
     { id: 3, brand: "Duri Luxe", productImage: "images/logos/duri.jfif", category: "baby", discount: "25% OFF", timeLeft: "05:20:00", description: "Enchanting Floral Symphony", color: "bg-indigo-50", price: "67,999", rating: 4.7, sold: 120, status: "popular", originalPrice: "92,999" },
    { id: 4, brand: "Giles", productImage: "images/logos/giles.jfif", category: "men", discount: "BOGO", timeLeft: "08:45:00", description: "Parisian Elite: Signature Leather", color: "bg-stone-100", price: "21,999", rating: 4.1, sold: 456, status: "new", originalPrice: "52,998" },
    { id: 5, brand: "Gucci", productImage: "images/logos/Gucci.jfif", category: "beauty", discount: "30% OFF", timeLeft: "05:20:00", description: "Dior Perfumes Collections", color: "bg-indigo-50", price: "34,999", rating: 4.9, sold: 120, status: "popular", originalPrice: "87,999" },
    { id: 6, brand: "Provi", productImage: "images/logos/provi.jfif", category: "women", discount: "29% OFF", timeLeft: "05:20:00", description: "Provi Fine Jewelry", color: "bg-indigo-50", price: "93,999", rating: 5.0, sold: 120, status: "popular", originalPrice: "99,999" },
    { id: 7, brand: "Polo Ralph", productImage: "images/logos/polo.jfif", category: "men", discount: "BOGO", timeLeft: "08:45:00", description: "Classic Mesh Polo", color: "bg-stone-100", price: "43,999", rating: 4.3, sold: 456, status: "new", originalPrice: "58,998" },
    { id: 8, brand: "Dior", productImage: "images/logos/dior.jfif", category: "beauty", discount: "15% OFF", timeLeft: "05:20:00", description: "Dior Perfumes Collections", color: "bg-indigo-50", price: "15,999", rating: 4.6, sold: 120, status: "popular", originalPrice: "32,999" },
    { id: 9, brand: "Adidas", productImage: "images/logos/Adidas.jfif", category: "beauty", discount: "35% OFF", timeLeft: "05:20:00", description: "Adidas Luxury Collections", color: "bg-indigo-50", price: "37,999", rating: 3.6, sold: 120, status: "popular", originalPrice: "43,999" },
    { id: 10, brand: "Samsung", productImage: "images/logos/Samsung.jfif", category: "electronics", discount: "12% OFF", timeLeft: "05:20:00", description: "Cutting-edge display technology", color: "bg-indigo-50", price: "75,999", rating: 3.9, sold: 120, status: "popular", originalPrice: "87,999" },
    { id: 11, brand: "Gul Ahmed", productImage: "images/logos/gul.jfif", category: "women", discount: "25% OFF", timeLeft: "05:20:00", description: "Timeless Prints, Unmatched Quality", color: "bg-indigo-50", price: "36,999", rating: 4.9, sold: 120, status: "popular", originalPrice: "48,999" },
    { id: 12, brand: "Roarmo", productImage: "images/logos/Roarmo.jfif", category: "home", discount: "20% OFF", timeLeft: "05:20:00", description: "Heavyweight Comfort for the Bold", color: "bg-indigo-50", price: "24,999", rating: 4.8, sold: 120, status: "popular", originalPrice: "56,999" },
     { id: 13, brand: "Nike", productImage: "images/logos/Nike.jfif", category: "men", discount: "50% OFF", timeLeft: "04:30:00", description: "Air Max Jordan series", color: "bg-blue-50", price: "80,500", rating: 4.8, sold: 245, status: "trending", originalPrice: "90,000" },
    { id: 14, brand: "Apple", productImage: "images/logos/Apple.jfif", category: "electronics", discount: "15% OFF", timeLeft: "02:15:00", description: "iPhone, MacBook gadgets", color: "bg-slate-100", price: "1,24,900", rating: 4.7, sold: 89, status: "ending", originalPrice: "1,46,900" },
    { id: 15, brand: "Zara", productImage: "images/logos/Zara.jfif", category: "women", discount: "BOGO", timeLeft: "08:45:00", description: "luxury Premium Suits", color: "bg-stone-100", price: "38,999", rating: 4.2, sold: 456, status: "new", originalPrice: "50,998" },
    
  ];
  // FILTER LOGIC: Ye line decide karti hai ke kya dikhana hai
  const filteredDeals = activeTab === 'all' 
    ? allDeals 
    : allDeals.filter(deal => deal.category === activeTab);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-navy-900/95 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#f4f7f6] w-full h-full flex flex-col overflow-hidden shadow-2xl">
        {/* HEADER */}
        <div className="bg-[#001f3f] px-9 py-4 text-white flex flex-col md:flex-row justify-between items-center gap-6 border-b-4 border-orange-500 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500 rounded-2xl animate-pulse">
              <Tag className="text-navy-900" size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black italic tracking-tighter">TODAY'S FLASH DEALS</h2>
              <p className="text-orange-400 font-medium flex items-center gap-2">
                <Shield size={16} /> Verified Authentic Offers
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="relative w-16 h-16 border-2 border-orange-500 rounded-full bg-navy-900">
                <div className="absolute top-1/2 left-1/2 w-1 h-5 bg-white origin-bottom -translate-x-1/2 -translate-y-full rounded-full" style={{transform: `translateX(-50%) rotate(${rotation.hr}deg)`}} />
                <div className="absolute top-1/2 left-1/2 w-0.5 h-6 bg-orange-400 origin-bottom -translate-x-1/2 -translate-y-full rounded-full" style={{transform: `translateX(-50%) rotate(${rotation.min}deg)`}} />
                <div className="absolute top-1/2 left-1/2 w-[1px] h-7 bg-red-500 origin-bottom -translate-x-1/2 -translate-y-full" style={{transform: `translateX(-50%) rotate(${rotation.sec}deg)`}} />
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-orange-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
              </div>
             <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-orange-400 font-bold mb-1">Offer Expires In</p>
                <div className="flex gap-1 font-mono">
                    <span className="bg-navy-900 px-2 py-1 rounded border border-orange-500/30 text-xl font-black">{timeLeft.hours.toString().padStart(2, '0')}h</span>
                    <span className="text-orange-500 text-xl pt-1">:</span>
                    <span className="bg-navy-900 px-2 py-1 rounded border border-orange-500/30 text-xl font-black">{timeLeft.minutes.toString().padStart(2, '0')}m</span>
                    <span className="text-orange-500 text-xl pt-1">:</span>
                    <span className="bg-navy-900 px-2 py-1 rounded border border-orange-500/30 text-xl font-black text-orange-500">{timeLeft.seconds.toString().padStart(2, '0')}s</span>
                </div>
               </div>
              <button onClick={onClose} className="p-2 hover:bg-red-500 rounded-full transition-all group">
              <X size={28} className="group-hover:rotate-90 duration-300" />
            </button>
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar with activeTab logic */}
          <aside className="custom-scrollbar w-70 bg-white border-r border-gray-200 hidden lg:flex flex-col p-8 overflow-y-auto shrink-0 shadow-inner">
            <h3 className="text-navy-900 font-black uppercase text-xs tracking-[0.2em] mb-8 opacity-50 border-b pb-4">Department Store</h3>
            <div className="space-y-3">
              {categories.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black transition-all transform hover:scale-105 ${activeTab === cat.id ? 'bg-[#001f3f] text-white shadow-xl translate-x-2' : 'text-gray-600 hover:bg-orange-50 hover:text-navy-900'}`}
                >
                  <span className={`${activeTab === cat.id ? 'text-orange-500' : 'text-navy-700'}`}>{cat.icon}</span>
                  <span className="text-sm tracking-tight">{cat.label}</span>
                  {activeTab === cat.id && <ChevronRight size={16} className="ml-auto text-orange-500" />}
                </button>
              ))}
            </div>
            <div className="mt-auto pt-10 space-y-4">
              <div className="p-6 bg-gradient-to-br from-orange-500 to-orange-700 rounded-[1rem] text-white shadow-lg relative overflow-hidden group">
                <Truck className="absolute -right-4 -bottom-4 size-24 opacity-20 group-hover:scale-110" />
                <p className="font-black text-xl leading-tight relative z-10">FREE SHIPPING</p>
                <p className="text-xs font-bold opacity-90 mt-1 relative z-10">Orders over ₹999</p>
              </div>
            </div>
          </aside>
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-7 bg-[#f4f7f6]">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h1 className="text-5xl font-black text-navy-900 tracking-tighter uppercase">
                  {categories.find(c => c.id === activeTab)?.label} Deals
                </h1>
                <div className="h-1.5 w-32 bg-orange-500 mt-4 rounded-[7px]"></div>
              </div>
            </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
         {filteredDeals.length > 0 ? (
      filteredDeals.map((deal) => (
      <div key={deal.id} className="group bg-white rounded-[7px] border border-gray-100 shadow-sm hover:shadow-[0_20px_60px_rgba(0,31,63,0.2)] transition-all duration-500 flex flex-col h-full relative overflow-hidden">
        <div className={`absolute top-2 left-0 z-20 px-3 py-1 rounded-[5px] text-[10px] font-black uppercase tracking-widest ${deal.status === 'ending' ? 'bg-red-600 text-white' : 'bg-orange-600 text-white'}`}>
          {deal.status}
          </div>
          <div className="h-45 relative overflow-hidden bg-gray-100">
          <img src={deal.productImage} alt={deal.description} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute bottom-2 text-[10px] right-0 bg-orange-600 text-white font-black px-3 py-1 rounded-[5px] shadow-2xl transform  z-20">{deal.discount}</div>
         </div>
        <div className="p-4 flex flex-col flex-1">
          <div className=" text-[10px] font-black text-orange-600 uppercase tracking-widest">{deal.brand}</div> 
          {/* Title with Overflow Hidden */}
          <h4 className="text-[15px] font-black  text-navy-600 leading-tight h-[2rem] overflow-hidden truncate line-clamp-2">
            {deal.description}
            </h4>
          <div className="mt-0">
            <div className="flex items-end justify-between mb-2 ">
              <div>
                <p className="text-gray-400 text-xs font-bold line-through">₹{deal.originalPrice}</p>
                <p className="text-[24px] font-black text-navy-900">₹{deal.price}</p>
              </div>
              {/* Countdown Timer / Clock Section */}
              <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[11px] font-black text-navy-900 tabular-nums">
                  {deal.timeLeft || "00:00:00"}
                </span>
              </div>
            </div>
            <a href="/Checkout" ><button className="w-full bg-navy-900 shadow-[0_10px_20px_rgba(0,31,63,0.2)] hover:shadow-none text-orange-400 py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-orange-600 hover:text-white transition-all">
              Claim Deal Now
            </button></a>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="col-span-full py-20 text-center">
      <p className="text-2xl font-black text-gray-300">No Deals Found in this Category</p>
    </div>
  )}
</div>
      </main>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #001f3f30; border-radius: 10px; }
        main::-webkit-scrollbar { width: 6px; }
        main::-webkit-scrollbar-thumb { background: #001f3f30; border-radius: 10px; }
        main::-webkit-scrollbar-thumb:hover { background: #f97316; }
      `}</style>
    </div>
  );
};

export default DealsModal;
