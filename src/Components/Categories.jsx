import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import { FaSearch, FaShoppingCart, FaStar, FaStarHalfAlt, 
  FaTruck, FaHeart, FaMapMarkerAlt, FaChevronDown, FaHome,
  FaClock, FaCheckCircle, FaBoxOpen, FaInfoCircle,
} from "react-icons/fa";
import { Search, Filter, Star, TrendingUp, Package, ShieldCheck,CreditCard,
  ShoppingBag, Heart, Award, Zap, ChevronRight,ArrowRight,RefreshCcw,
  Grid, List, ArrowUpDown, X, Menu, Sparkles, ArrowDown, LayoutGrid,Box,
  Clock, Shield, Truck, RefreshCw, ChevronLeft, ChevronRight as ChevronRightIcon,
  ShoppingCart, Tag, Percent, DollarSign, Truck as TruckIcon, Globe, Smartphone,
  Headphones, Camera, Home, Shirt, Baby, BookOpen, Car, PawPrint, MapPin
} from 'lucide-react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, FaStore } from "react-icons/fa";


const EcommerceCategoriesPage = () => {
  // 1. Cart States
  const [showNotif, setShowNotif] = useState(false);
  const [productName, setProductName] = useState("");

  // 2. Add To Cart Logic
  const addToCart = (clickedItem) => {
    if (!clickedItem) return;
    const savedCart = localStorage.getItem('shopSphereCart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    const existingItem = cart.find(item => item.id === clickedItem.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(item => 
        item.id === clickedItem.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...clickedItem, quantity: 1 }];
    }
    localStorage.setItem('shopSphereCart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    setProductName(clickedItem.name || clickedItem.title || "Product");
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 3000);
  };
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      id: 1,
      image: "/Images/ban1.jfif",
      title: "Elevate Digital Lifestyle",
      subtitle: "Innovative gadgets for your modern home.",
      btnText: "Explore More",
    },
    {
      id: 2,
      image: "/Images/ban2.jfif",
      title: "Next-Gen Trends ",
      subtitle: "Sustainability meets high-end design.",
      btnText: "View Trends",
    },
    {
      id: 3,
      image: "/Images/ban3.jfif",
      title: "Future of Fashion",
      subtitle: "Elevate your lifestyle with ShopSphere.",
      btnText: "Shop Now",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  // login signup states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeLeft, setTimeLeft] = useState({ hours: 12, mins: 45, secs: 30 });
  const [showNotification, setShowNotification] = useState(false); // Notification state
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Countdown Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        return { hours: prev.hours - 1, mins: 59, secs: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const savedCart = localStorage.getItem('shopSphereCart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // Enhanced categories data with more details
  const initialCategories = [
    { 
      id: 1, 
      name: "Women's Fashion", 
      icon: <Shirt size={28} />, 
      products: 1245, 
      color: "from-pink-500 to-rose-500",
      trending: true, 
      discount: "30% OFF",
      subCategories: ["Dresses", "Tops", "Bottoms", "Outerwear", "Activewear", "Lingerie"],
      tags: ["New Arrivals", "Summer Collection", "Premium"],
      rating: 4.7,
      image: "/Images/categories/cat1.jfif"
    },
    { 
      id: 2, 
      name: "Men's Fashion", 
      icon: <Shirt size={28} />, 
      products: 987, 
      color: "from-blue-500 to-cyan-500",
      trending: true, 
      discount: "20% OFF",
      subCategories: ["Shirts", "Pants", "Suits", "Casual Wear", "Formal Wear", "Accessories"],
      tags: ["Best Sellers", "Limited Edition", "Trending"],
      rating: 4.5,
      image: "/Images/categories/cat13.jfif"
    },
    { 
      id: 3, 
      name: "Kids Toys", 
      icon: <Baby size={28} />, 
      products: 756, 
      color: "from-yellow-400 to-orange-500",
      trending: false, 
      discount: "15% OFF",
      subCategories: ["Baby Clothing", "Toys", "Educational", "Outdoor", "Board Games"],
      tags: ["Educational", "Safe", "Popular"],
      rating: 4.8,
      image: "/Images/categories/cat15.jfif"
    },
    { 
      id: 4, 
      name: "Electronics Gadgets", 
      icon: <Smartphone size={28} />, 
      products: 2310, 
      color: "from-indigo-500 to-purple-600",
      trending: true, 
      discount: "40% OFF",
      subCategories: ["Mobile Phones", "Laptops", "Audio", "Gaming", "Smart Home"],
      tags: ["Latest Tech", "Gaming", "Smart Devices"],
      rating: 4.6,
      image: "/Images/categories/cat11.jfif"
    },
    { 
      id: 5, 
      name: "Home Decor", 
      icon: <Home size={28} />, 
      products: 654, 
      color: "from-emerald-500 to-green-600",
      trending: false, 
      discount: "55% OFF",
      subCategories: ["Furniture", "Lighting", "Wall Decor", "Kitchen", "Bath"],
      tags: ["Modern", "Minimalist", "Luxury"],
      rating: 4.4,
      image: "/Images/categories/cat9.jfif"
    },
    { 
      id: 6, 
      name: "Beauty Health", 
      icon: <Award size={28} />, 
      products: 1200, 
      color: "from-rose-500 to-pink-600",
      trending: true, 
      discount: "Buy 1 Get 1",
      subCategories: ["Skincare", "Makeup", "Fragrances", "Wellness", "Hair Care"],
      tags: ["Organic", "Cruelty-Free", "Premium"],
      rating: 4.9,
      image: "/Images/categories/cat7.jfif"
    },
    { 
      id: 7, 
      name: "Sports Fitness", 
      icon: <Award size={28} />, 
      products: 543, 
      color: "from-orange-500 to-red-600",
      trending: false, 
      discount: "30% OFF",
      subCategories: ["Gym Equipment", "Sportswear", "Supplements", "Outdoor Gear"],
      tags: ["Professional", "Home Workout", "Performance", "Gym", "Yoga", ],
      rating: 4.7,
      image: "/Images/categories/cat16.jfif"
    },
     { 
      id: 9, 
      name: "Groceries Harvest", 
      icon: <ShoppingCart size={28} />, 
      products: 1500, 
      color: "from-lime-500 to-green-500",
      trending: false, 
      discount: "38% OFF",
      subCategories: ["Fresh Produce", "Dairy", "Snacks", "Beverages", "Frozen"],
      tags: ["New Arrivals", "Summer Collection", "Premium"],
      rating: 4.8,
      image: "/Images/categories/cat5.jfif"
    },
    { 
      id: 8, 
      name: "Women Fashion", 
      icon: <ShoppingCart size={28} />, 
      products: 1500, 
      color: "from-lime-500 to-green-500",
      trending: false, 
      discount: "Daily Deals",
      subCategories: ["Fresh Produce", "Dairy", "Snacks", "Beverages", "Frozen"],
      tags: ["Gym Equipment", "Sportswear", "Supplements", "Outdoor Gear"],
      rating: 4.8,
      image: "/Images/categories/cat3.jfif"
    },
           { 
      id: 10, 
      name: "Men's Fashion", 
      icon: <Shirt size={28} />, 
      products: 987, 
      color: "from-blue-500 to-cyan-500",
      trending: true, 
      discount: "20% OFF",
      subCategories: ["Shirts", "Pants", "Suits", "Casual Wear", "Formal Wear", "Accessories"],
      tags: ["Best Sellers", "Limited Edition", "Trending"],
      rating: 4.5,
      image: "/Images/categories/cat14.jfif"
    },    
        { 
      id: 11, 
      name: "Groceries Pantry", 
      icon: <ShoppingCart size={28} />, 
      products: 1500, 
      color: "from-lime-500 to-green-500",
      trending: false, 
      discount: "30% OFF",
      subCategories: ["Fresh Produce", "Dairy", "Snacks", "Beverages", "Frozen"],
      tags: ["Fresh", "Organic", "Local"],
      rating: 4.8,
      image: "/Images/categories/cat6.jfif"
    },
    { 
      id: 12, 
      name: "Electronics Digital", 
      icon: <ShoppingCart size={28} />, 
      products: 1500, 
      color: "from-lime-500 to-green-500",
      trending: false, 
      discount: "25% OFF",
       subCategories: ["Mobile Phones", "Laptops", "Audio", "Gaming", "Smart Home"],
      tags: ["Latest Tech", "Gaming", "Smart Devices"],
      rating: 4.8,
      image: "/Images/categories/cat12.jfif"
    },
  ];

  // State management
  const [categories, setCategories] = useState(initialCategories);
  const [filteredCategories, setFilteredCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [activeFilters, setActiveFilters] = useState({
    trending: false,
    discount: false,
    highRating: false
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const sliderRef = useRef(null);

  // Enhanced Slider Content with Images
  const sliderContent = [
    {
      id: 1,
      title: "Summer Collection 2026",
      subtitle: "Discover the latest trends in fashion with up to 70% OFF",
      buttonText: "Shop Now",
      bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      textPosition: "left",
      buttonPosition: "right"
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  // Enhanced slider auto-rotation with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
        setTimeout(() => setIsAnimating(false), 500);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Advanced filtering and sorting
  useEffect(() => {
    let result = [...categories];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.subCategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase())) ||
        category.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    // Apply advanced filters
    if (activeFilters.trending) {
      result = result.filter(category => category.trending);
    }
    if (activeFilters.discount) {
      result = result.filter(category => category.discount);
    }
    if (activeFilters.highRating) {
      result = result.filter(category => category.rating >= 4.5);
    } 
    // Apply sorting
    switch(sortBy) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'products-high':
        result.sort((a, b) => b.products - a.products);
        break;
      case 'products-low':
        result.sort((a, b) => a.products - b.products);
        break;
      case 'rating-high':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => {
          const aDiscount = parseInt(a.discount) || 0;
          const bDiscount = parseInt(b.discount) || 0;
          return bDiscount - aDiscount;
        });
        break;
      default:
        break;
    }
    
    setFilteredCategories(result);
  }, [categories, searchTerm, sortBy, activeFilters]);
  // Handle slider navigation
  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };
  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + sliderContent.length) % sliderContent.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Handle filter toggle
  const toggleFilter = (filterName) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  // Reset all filters
  const resetAllFilters = () => {
    setSearchTerm('');
    setSortBy('default');
    setActiveFilters({
      trending: false,
      discount: false,
      highRating: false
    });
    setSelectedCategory(null);
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            className={`${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} transition-transform duration-200 hover:scale-110`} 
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
   <div className="min-h-screen bg-gradient-to-b from-white ">     
     {/* HEADER section start here WITH GAPS */}
      <header className="bg-[#131921] sticky top-0 z-50 py-3  md:px-6 flex items-center gap-2 text-white shadow-xl transition-all">
        <motion.div 
          whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 ms-3 cursor-pointer border border-transparent hover:border-white/20 p-1 rounded-sm transition-all"
        >
          <div className="bg-[#febd69] p-1 rounded-md shadow-[0_0_10px_rgba(254,189,105,0.5)]">
            <FaHome className="text-[#131921] text-xl" />
          </div>
          <span className="text-xl font-black text-white tracking-tight">
            Shop<span className="text-[#febd69] drop-shadow-[0_0_5px_rgba(254,189,105,0.3)]">Sphere</span>
          </span>
        </motion.div>
        <div onClick={() => navigate('/')}
          className="hidden lg:flex flex-col items-start cursor-pointer group-hover:rotate-[-10deg] hover:text-[#febd69] transition-all border border-transparent p-1 px-2 rounded-sm transition-colors">
          <div className="flex items-center gap-1 font-bold text-sm">
            <FaHome size={18} className="text-[#febd69]" /> Home
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 cursor-pointer group">
          <MapPin size={20} className="text-orange-300 shrink-0" />
          <div className="flex flex-col items-start justify-center">
            <span className="text-[10px] text-gray-400 leading-tight">Deliver to</span>
            <span className="text-xs font-black text-white hover:text-orange-500 transition-colors leading-tight">
              Pakistan
            </span>
          </div>
        </div>
        {/* SEARCH BAR */}
        <div className="flex-grow flex items-center h-10 group min-w-[150px] relative">
          <input 
            type="text" 
            className="w-full h-full p-4 rounded-l-md text-white bg-white/10 border-2 border-[#dba053] focus:border-[#febd69] focus:bg-[#131921] transition-all text-sm outline-none shadow-inner" 
            placeholder="Search for products, brands and more..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-[#febd69] h-full px-5 rounded-r-md text-[#131921] hover:bg-[#f3a847] transition-all shadow-lg active:scale-95">
            <FaSearch size={18} />
          </button>
        </div>
        {/* Header main Accounts section desktop+mobil ky lieye start here*/}  
        <div className="hidden lg:block relative">
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
            className="flex flex-col items-start cursor-pointer border-2 border-transparent  p-1 px-4 rounded-xl transition-all duration-300 group"
          >
            <span className="text-[8px] text-gray-400 uppercase font-black tracking-[1px] leading-tight hover:text-[#febd69] transition-colors">WELCOME</span>
            <div className="flex items-center gap-1.5 font-black text-[11px] hover:text-[#febd69] uppercase tracking-tighter text-[#f3f3f3]">
              Account 
              <FaChevronDown size={9} className={`transition-transform duration-500 text-emerald-50 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
          </div>
          <AnimatePresence>
            {isDropdownOpen && (
              <>
                {/* Click outside to close */}
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 15 }} 
                  animate={{ opacity: 1, scale: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.95, y: 15 }} 
                  className="absolute top-[115%] right-0 w-72 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl border border-gray-100 z-50 overflow-hidden"
                >
                  {/* Header Section */}
                  <div className="p-4 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 border-b border-gray-200 text-center">
                    <button 
                      onClick={() => { setIsLoginOpen(true); setIsDropdownOpen(false); }} 
                      className="w-full bg-[#1A3021] hover:bg-emerald-800 text-white py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-emerald-900/20 active:scale-95 transition-all duration-300 mb-3"
                    >
                      Sign In
                    </button>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                      New Customer? <span onClick={() => { setIsSignUpOpen(true); setIsDropdownOpen(false); }} className="text-emerald-700 hover:underline cursor-pointer">Start here.</span>
                    </p>
                  </div>
                  {/* Links Section */}
                  <div className="p-3 bg-white">
                    <Link 
                      to="/UserProfile" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-emerald-50 rounded-xl transition-all duration-200 group/item"
                    >
                      <div className="p-2 bg-gray-400 rounded-lg group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black text-gray-800 uppercase tracking-tight">My Profile</span>
                        <span className="text-[9px] text-gray-400 font-bold">Manage settings</span>
                      </div>
                    </Link>
                    <div 
                      onClick={() => { setIsSignUpOpen(true); setIsDropdownOpen(false); }} 
                      className="flex items-center gap-4 px-4 py-3 hover:bg-blue-50 rounded-xl transition-all duration-200 group/item cursor-pointer border-t border-gray-50 mt-1"
                    >
                      <div className="p-2 bg-blue-200 text-blue-600 rounded-lg group-hover/item:bg-blue-600 group-hover/item:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black text-blue-700 uppercase tracking-tight">Create Account</span>
                        <span className="text-[9px] text-blue-400 font-bold">Join ShopSphere</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        {/* mobile responsive menues banany ky lieye dropdown*/}
        <div className="lg:hidden relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="p-2 hover:bg-emerald-100/30 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white shadow-2xl rounded-xl border z-50 p-4 space-y-4">
              <Link 
                to="/UserProfile" 
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-4 px-4 py-3 hover:bg-emerald-50 rounded-xl transition-all duration-200 group/item"
              >
                <div className="p-2 bg-gray-700 rounded-lg group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-gray-800 uppercase tracking-tight">My Profile</span>
                  <span className="text-[9px] text-gray-400 font-bold">Manage settings</span>
                </div>
              </Link>
              <button onClick={() => setIsLoginOpen(true)} className="w-full bg-[#1A3021] text-white py-2 rounded-lg text-[10px] font-black uppercase tracking-widest">Login In</button>
              <button onClick={() => setIsSignUpOpen(true)} className="w-full bg-[#1A3021] text-white py-2 rounded-lg text-[10px] font-black uppercase tracking-widest">Sign Up</button>
            </div>
          )}
        </div>
        {/* Signup login kay Modals jinn ki wajha sy page par modals open hoty hain */}
        {isLoginOpen && <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSwitchToSignUp={() => { setIsLoginOpen(false); setIsSignUpOpen(true); }} />}
        {isSignUpOpen && <SignUp isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} onSwitchToLogin={() => { setIsSignUpOpen(false); setIsLoginOpen(true); }} />}
        {/* Accounts section desktop+mobil ky lieye end here*/}
        
        {/**Add to cart button */}
        <div onClick={() => navigate('/cart')} className="flex items-center gap-2 md:-translate-x-5 transform cursor-pointer relative hover:text-[#febd69] transition-all border border-transparent p-1 px-2 rounded-sm group">
          <div className="relative">
            <ShoppingCart className="text-2xl group-hover:rotate-[-1deg] transition-transform" />
            <span className="absolute -top-2 -right-3 bg-[#febd69] rounded-full text-[9px] px-1.5 py-1 font-bold text-black border-2 border-[#131921] shadow-lg animate-category-bounce">
              {cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}
            </span>
          </div>
          <span className="font-bold hidden sm:block self-end mb-1">Cart</span>
        </div>
      </header>
{/* HEADER section end here WITH GAPS */}
      
     
{/** main slider section start here  */}
<main className="max-w-[1400px] mx-auto">
  <div className="relative w-full h-[700px] md:h-[500px] lg:h-[460px] overflow-hidden bg-[#1d242c] shadow-2xl group">
    {/* Background Decorative Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-[60%] h-[60%] bg-[#febd69]/5 blur-[120px] rounded-full"></div>
    <div className="relative h-full w-full flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-20 pt-12 lg:pt-0">
      {/* LEFT CONTENT */}
      <div className="z-20 flex flex-col justify-center items-center lg:items-start lg:w-[45%] text-center lg:text-left mb-12 lg:mb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#febd69] text-black text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest w-fit mb-4"
        >
          Explore Categories
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div key={currentIndex} className="flex flex-col items-center lg:items-start">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="text-white text-4xl md:text-6xl lg:text-[83px] font-black leading-[0.9]"
            >
              Next-
              <span className="text-[#febd69]">Gen</span> <span className="text-[#febd69]/50 italic lowercase font-serif">Trends</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-xs md:text-sm lg:text-base max-w-xs md:max-w-sm font-medium leading-relaxed pt-4"
            >
              "{slides[currentIndex].subtitle || 'Premium curated collection for the modern lifestyle'}"
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Link to="/Services"> 
                <button className="mt-6 lg:mt-7 bg-[#febd69] hover:bg-white text-black px-7 py-2.5 lg:px-9 lg:py-3 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-xl text-sm lg:text-base">
                  {slides[currentIndex].btnText}
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* CENTER & RIGHT: Symmetrical Stacked Cards */}
      <div className="relative w-full lg:w-[55%] h-[350px] md:h-full flex items-center justify-center">
        {/* Floating Discount Badge */}
        <motion.div 
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          key={`badge-${currentIndex}`}
          className="absolute right-2 md:right-10 lg:right-10 top-[5%] lg:top-[60%] z-40 flex flex-col items-center scale-75 md:scale-90 lg:scale-100"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 bg-[#febd69] rounded-full flex items-center justify-center shadow-2xl mb-2">
            <span className="text-black font-black text-xl md:text-2xl">%</span>
          </div>
          <div className="bg-white p-3 md:p-4 rounded-2xl shadow-2xl border border-gray-100 text-center min-w-[120px] md:min-w-[140px]">
            <p className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase mb-1">Limited Offer</p>
            <p className="text-sm md:text-lg font-black text-black leading-none">Up to 40% Off</p>
          </div>
        </motion.div>
        {/* Symmetry Logic for 5 Cards (2 Left - 1 Center - 2 Right) */}
        <div className="relative w-full flex justify-center items-center h-full">
          <AnimatePresence mode="popLayout">
            {[-3, -2, -1, 4, 3, 2, 1, 0].map((offset) => { 
              const index = (currentIndex + offset + slides.length) % slides.length;
              const absOffset = Math.abs(offset);
              return (
                <motion.div
                  key={`${index}-${offset}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1 - (absOffset * 0.25), 
                    x: offset * (window.innerWidth < 768 ? 40 : 85), // Responsive gap
                    scale: 1 - (absOffset * 0.15),
                    zIndex: 10 - absOffset,
                    rotateY: offset * 25, // Adding a slight 3D effect like the image
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 30 }}
                  className="absolute"
                  style={{ perspective: "1000px" }}
                >
                  <div className="relative w-[180px] h-[260px] md:w-[220px] md:h-[320px] rounded-[2rem] md:rounded-[2.5rem] px-4 md:px-6 bg-white/10 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
                    <div className="flex justify-between items-center py-3">
                        <span className="bg-black/40 backdrop-blur-md text-white text-[8px] md:text-[10px] px-2 md:px-3 py-1 rounded-full border border-white/10 font-bold">Featured</span>
                        <span className="text-white/50 text-[8px] md:text-[10px] font-mono">2026</span>
                    </div>
                    <img 
                      src={slides[index].image} 
                      className="w-full h-[65%] md:h-[70%] object-cover rounded-[1.5rem] md:rounded-[2.5rem] shadow-inner"
                      alt="category"
                    />
                     <div className="mt-auto pb-4 md:pb-6 text-center">
                        <p className="text-white/40 text-[7px] md:text-[9px] font-mono tracking-tighter truncate uppercase">
                            {slides[index].title} / DROP_01
                        </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
    {/* Controls */}
    <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 lg:left-24 lg:translate-x-0 z-50 flex items-center gap-8">
      <div className="flex gap-2">
          {slides.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${currentIndex === i ? 'w-8 bg-[#febd69]' : 'w-2 bg-white/20'}`} />
          ))}
      </div>
    </div>
  </div>
</main>
    {/* Main Content with Entrance Animation */}
     <main className="container mx-auto px-4 md:px-6 lg:px-8 animate-category-fadeIn">
      {/* --- SECTION 1: ULTRA-MODERN HEADER --- */}
   <div className="mb-20 text-center relative pt-10">
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-[radial-gradient(circle,rgba(255,107,0,0.08)_0%,rgba(0,31,63,0.05)_50%,transparent_100%)] blur-3xl -z-10"></div>
  <motion.div
    initial={{ opacity: 0, letterSpacing: "-0.05em" }}
    whileInView={{ opacity: 1, letterSpacing: "normal" }}
    viewport={{ once: true }}
    transition={{ duration: 1, ease: "circOut" }}
  >
    <span className="inline-block px-4 py-1.5 mb-6 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">
      Premium Collection 2026
    </span>
    <h1 className="text-5xl md:text-7xl font-[1000] text-[#001F3F] mb-8 leading-[0.95] tracking-[-0.04em] font-sans italic uppercase">
      Discover <br />
      <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-br from-[#011b35] via-[#013161] to-orange-600">
        Amazing Categories
        <motion.span 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute -bottom-2 left-0 h-[6px] bg-[#db9539] rounded-full"
        ></motion.span>
      </span>
    </h1>
    <p className="text-gray-400 max-w-xl mx-auto font-medium text-base md:text-[14px] leading-relaxed font-sans uppercase tracking-widest opacity-80">
      Elevate your lifestyle with our <span className="text-[#001F3F] font-black">exclusive<br/> selection</span> of high-end essentials.
    </p>
  </motion.div>
</div>
{/* --- SECTION 2: LUXURY STATS GRID --- */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-15 ">
  {[
    { label: "Total Categories", value: categories.length, icon: <Grid size={20} />, suffix: "+" },
    { label: "Total Products", value: categories.reduce((sum, cat) => sum + cat.products, 0).toLocaleString(), icon: <Package size={20} />, suffix: "" },
    { label: "Trending Now", value: categories.filter(c => c.trending).length, icon: <TrendingUp size={20} />, suffix: " Active" },
    { label: "Avg. Rating", value: (categories.reduce((sum, cat) => sum + cat.rating, 0) / categories.length).toFixed(1), icon: <Star size={20} />, suffix: "/5.0" }
  ].map((stat, index) => (
    <motion.div 
      key={index}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -12 }}
      className="relative group"
    >
      <div className="relative  border-b-4 border-r-4 border-[#b67016] bg-[#1d242c] shadow-2xl group  rounded-br-[4rem] rounded-tl-[4rem] p-10 h-full transition-all duration-500 group-hover:bg-[#ffffff]  group-hover:border-[#db9539] group-hover:shadow-[20px_20px_0px_rgba(255,107,0,0.1)]">
        {/* Floating Icon Wrapper */}
        <div className="absolute -top-6 -left-2 bg-[#db9539]   text-black p-4 rounded-2xl shadow-xl transform group-hover:scale-110 group-hover:bg-white group-hover:text-[#db9539] transition-all duration-500">
          {stat.icon}
        </div>
        <div className="mt-4">
          <div className="flex items-baseline gap-1">
            <h3 className="text-5xl font-[1000] text-[#ffffff] tracking-tighter group-hover:text-[#1d242c] transition-colors duration-500">
              {stat.value}
            </h3>
            <span className="text-[#db9539] font-bold text-lg">{stat.suffix}</span>
          </div>
          <div className="mt-2 flex flex-col">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] group-hover:text-orange-200 transition-colors duration-500">
              {stat.label}
            </span>
            {/* Minimalist Deco Line */}
            <div className="w-8 h-[2px] bg-[#db9539] mt-4 group-hover:w-full transition-all duration-700"></div>
          </div>
        </div>
        {/* Background Number Decal (Decorative) */}
        <span className="absolute bottom-4 right-8 text-8xl font-black text-gray-50 opacity-[0.03] pointer-events-none group-hover:text-white group-hover:opacity-[0.05] transition-all">
          0{index + 1}
        </span>
      </div>
    </motion.div>
  ))}
</div>


{/* Search and Filter Section - Premium Dashboard Design */}
<div className="relative mb-15 px-4 md:px-6">
  {/* Theme Based Ambient Glows */}
  <div className="absolute top-0 left-10 w-48 h-48 bg-[#d98d39]/10 blur-[80px] -z-10"></div>
  <div className="absolute bottom-0 right-10 w-48 h-48 bg-[#1a1f26]/10 blur-[80px] -z-10"></div>
  <div className="bg-white/95 backdrop-blur-3xl rounded-br-[2rem] rounded-tl-[2rem] p-5 lg:p-8 shadow-[0_40px_100px_-30px_rgba(26,31,38,0.2)] border border-gray-100">
    {/* TOP ROW: CLOCK & SEARCH & CONTROLS */}
    <div className="flex flex-col lg:flex-row items-center gap-2">
      {/* 1. REAL WORKING CLOCK - Image Styled */}
      <div className="flex items-center gap-2 bg-[#1a1f26] py-2 px-3 pr-9 rounded-[2rem] shadow-lg group hover:scale-105 transition-transform duration-500">
        <div className="w-12 h-12 bg-[#d98d39] rounded-[1.4rem] flex items-center justify-center text-[#1a1f26] shadow-inner relative overflow-hidden">
           <Clock size={24} strokeWidth={2.5} className="z-10 animate-pulse" />
           <div className="absolute inset-0 bg-white/10 translate-y-6 group-hover:translate-y-0 transition-transform duration-700"></div>
        </div>
        <div className="flex flex-col ">
          <span className="text-white font-black  text-lg tracking-tighter leading-none">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
          <span className="text-[#d98d39] text-[9px] font-black uppercase tracking-[0.3em]">Live Terminal</span>
        </div>
      </div>
      {/* 2. SEARCH BAR - Image Contrast Styled */}
      <div className="relative w-full lg:w-[35%] group">
        <div className="absolute -inset-[3px] bg-gradient-to-r from-[#d98d39] to-[#1a1f26] rounded-[2.2rem] opacity-0 group-focus-within:opacity-100 blur-[3px] transition-opacity duration-500 -z-10"></div>
        <div className="relative flex items-center bg-gray-50 rounded-[1.8rem] overflow-hidden border border-gray-200 group-focus-within:border-transparent group-focus-within:bg-white transition-all duration-300 shadow-sm">
          <div className="pl-6 pr-4  flex items-center justify-center border-r border-gray-200 group-focus-within:border-[#d98d39]/20 transition-colors">
            <Search 
              className="text-[#1a1f26]/40 group-focus-within:text-[#d98d39] group-focus-within:scale-110 transition-all duration-300" 
              size={20} 
              strokeWidth={3} 
            />
          </div>
          <input
            type="text"
            placeholder="EXPLORE COLLECTIONS.."
            className="w-full pl-4 pr-12 py-5 bg-transparent outline-none font-black text-[#1a1f26] tracking-[0.2em] placeholder:text-gray-300 placeholder:font-bold uppercase text-[11px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-4 flex items-center gap-2">
            {searchTerm ? (
              <button 
                onClick={() => setSearchTerm('')} 
                className="p-2 bg-gray-200 hover:bg-[#d98d39] hover:text-white rounded-xl transition-all duration-300"
              >
                <X size={14} strokeWidth={4} />
              </button>
            ) : (
              <div className="flex gap-1 pr-2 ">
                 <div className="w-2 h-2 rounded-full bg-[#94540b] animate-bounce"></div>
                 <div className="w-2 h-2 rounded-full bg-[#1a1f26] animate-bounce"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 3. SORTING & CONTROLS - Precise Sequence */}
      <div className="flex items-center gap-2 w-full lg:w-auto ml-auto">
        {/* Sort Select */}
        <div className="relative flex-1 lg:flex-none">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full lg:w-[180px] appearance-none bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4.5 pr-10 outline-none font-black text-[#1a1f26] uppercase tracking-tighter text-[10px] cursor-pointer hover:bg-white hover:border-[#d98d39] transition-all shadow-sm"
          >
            <option value="default">SORT BY</option>
            <option value="name-asc">A-Z ORDER</option>
            <option value="products-high">STOCK LVL</option>
            <option value="rating-high">RATING</option>
          </select>
          <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#d98d39] pointer-events-none" size={14} strokeWidth={3} />
        </div>
        {/* View Toggles - Dark Slate Theme */}
        <div className="flex bg-[#1a1f26] p-1 rounded-2xl shadow-xl">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-3.5 rounded-xl transition-all duration-500 ${viewMode === 'grid' ? 'bg-[#d98d39] text-[#1a1f26] shadow-lg ' : 'text-gray-500 hover:text-white'}`}
          >
            <Grid size={20} strokeWidth={3} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-3.5 rounded-xl transition-all duration-500 ${viewMode === 'list' ? 'bg-[#d98d39] text-[#1a1f26] shadow-lg ' : 'text-gray-500 hover:text-white'}`}
          >
            <List size={20} strokeWidth={3} />
          </button>
        </div>
        {/* Reset Button */}
        <button 
          onClick={resetAllFilters}
          className="p-4.5 rounded-2xl bg-[#d98d39] text-white hover:bg-[#1a1f26] transition-all duration-500 shadow-lg shadow-[#d98d39]/20 group/reset"
        >
          <RefreshCw size={20} strokeWidth={3} className="group-hover/reset:rotate-180 transition-transform duration-700" />
        </button>
      </div>
    </div>
    {/* QUICK FILTERS ROW */}
    <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-6">
      <div className="flex items-center gap-3 mr-2">
         <div className="w-2 h-2 rounded-full bg-[#8b500d] animate-ping"></div>
         <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] italic">Refine results</span>
      </div>
      {[
        { key: 'trending', label: 'TRENDING', icon: <TrendingUp size={12} strokeWidth={3} />, activeClass: 'bg-[#1a1f26] text-white' },
        { key: 'discount', label: 'ON SALE', icon: <Percent size={12} strokeWidth={3} />, activeClass: 'bg-[#d98d39] text-[#1a1f26]' },
        { key: 'highRating', label: 'TOP RATED', icon: <Star size={12} strokeWidth={3} />, activeClass: 'bg-amber-400 text-black' }
      ].map((filter) => (
        <button 
          key={filter.key}
          onClick={() => toggleFilter(filter.key)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all font-black text-[10px] tracking-widest border-2 ${
            activeFilters[filter.key] 
              ? `${filter.activeClass} border-transparent shadow-xl scale-110` 
              : 'bg-white text-[#1a1f26] border-gray-100 hover:border-[#d98d39]/30 hover:shadow-md'
          }`}
        >
          {filter.icon}
          <span>{filter.label}</span>
        </button>
      ))}  
      {/* Dynamic Result Counter */}
      <div className="ml-auto bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
        <span className="text-[10px] font-[1000] text-[#1a1f26] uppercase tracking-widest">
            Matched Items: <span className="text-[#d98d39] font-mono text-xs">{filteredCategories.length}</span>
        </span>
      </div>
    </div>
  </div>
</div>
{/* --- ADVANCED PREMIUM CATEGORIES GRID --- */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 font-sans bg-[#ffffff] py-12 gap-y-16 gap-x-4 px-4">
  {filteredCategories.map((category, index) => (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-[480px] transition-all duration-700 ease-in-out"
    >
      {/* --- LAYER 1: THE UNDERLAY STROKE (Decorative) --- */}
      <div className="absolute inset-x-4 inset-y-0 border border-gray-200 rounded-[3rem_1rem] -z-30 group-hover:scale-105 group-hover:border-[#d98d39]/30 transition-all duration-500"></div>
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-[4rem_1rem_4rem_1rem] group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 -z-20 border border-white/50"></div>
      {/* --- ARCHITECTURAL IMAGE BOX --- */}
      <div className="relative h-56 w-full px-4 -mt-6 group/img">
        {/* 1. Main Image Container with Dynamic Radius */}
        <div className="relative h-full w-full overflow-hidden bg-[#1d242c] rounded-[2rem_0.5rem_2rem_0.5rem] group-hover/img:rounded-[0.5rem_2rem_0.5rem_2rem] shadow-xl transition-all duration-700">
          <img 
            src={category.image} 
            className="w-full h-full object-cover opacity-90 group-hover/img:opacity-100 group-hover/img:scale-110 group-hover/img:rotate-1 transition-all duration-[1.2s] ease-[cubic-bezier(0.22, 1, 0.36, 1)]" 
            alt="" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1d242c]/60 via-transparent to-transparent opacity-80 group-hover/img:opacity-20 transition-opacity"></div>
        </div>
        {/* 3. Floating "Get Offer" Badge  */}
        <div className="absolute -top-2 -right-2 w-16 h-16 bg-[#d98d39] backdrop-blur-md rounded-full flex flex-col items-center justify-center border-b-4 border-[#1d242c] shadow-xl transform rotate-12 group-hover/img:rotate-0 group-hover/img:scale-110 transition-all duration-500 z-10">
          <span className="text-[9px] font-black text-[#1d242c] uppercase tracking-tighter">Save</span>
          <span className="text-[11px] font-[1000] text-[#1d242c] leading-none">{category.discount}</span>
        </div>
        {/* 5. Minimalist Image Counter */}
        <div className="absolute top-8 left-6 mix-blend-difference overflow-hidden">
           <p className="text-white text-[12px] font-black opacity-80 tracking-[0.2em] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500">
             #{index + 1}
           </p>
        </div>
      </div>
      {/* 2. Floating Icon (Positioned for "Interaction") */}
      <div className="absolute top-[12rem] left-6 z-30 transform -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500">
        <div className="w-14 h-14 bg-[#1d242c] text-[#d98d39] rounded-2xl flex items-center justify-center border-b-4 border-r-4 border-[#d98d39] shadow-lg">
          <span className="transform group-hover:scale-110 transition-transform">{category.icon}</span>
        </div>
      </div>
      {/* 3. Scattered Content Area */}
      <div className="relative mt-14 px-8">
        <div className="flex items-center gap-2 mb-2">
           <span className="w-8 h-[1px] bg-[#b36b18]"></span>
           <span className="text-[9px] font-black tracking-[0.3em] text-[#b36b18] uppercase">
             Series // 2026
           </span>
        </div>
        <h3 className="text-[24px] font-[1000] text-[#1d242c] uppercase leading-[0.9] tracking-tighter mb-2 break-words group-hover:translate-x-2 transition-transform duration-500">
          {category.name.split(' ')[0]} <br/>
          <span className="text-[18px] font-thin opacity-40 ml-10 italic lowercase tracking-normal">{category.name.split(' ')[1] || 'Edition'}</span>
        </h3>
        {/* Pricing Badge (Redesigned) */}
        <div className="absolute -top-12 right-6 text-right bg-white/50 py-2 px-3 rounded-lg backdrop-blur-sm border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 line-through leading-none">$450</p>
            <p className="text-[22px] font-[1000] text-[#1d242c] tracking-tighter leading-none">
              <span className="text-[12px] font-bold text-[#b36b18] align-top mt-1">$</span>149
            </p>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex -space-x-3">
          {[
              "/Images/x.jfif",
              "/Images/r.jfif",
              "/Images/u.jfif"
            ].map((url, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all duration-300 shadow-md">
                  <img src={url} alt={`Buyer ${i}`} className="w-full h-full object-cover" />
              </div>
          ))}
          </div>
          <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.15em] border-l border-gray-200 pl-3">
            Premium Choice
          </p>
        </div>
        <button 
          onClick={() => {
            setSelectedCategory(category);
            setTimeout(() => document.getElementById('details-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
          }}
          className="group/btn relative w-full"
        >
          <div className="w-[200px] h-12 bg-[#1d242c]  rounded-xl flex items-center justify-between px-6 transition-all duration-500 group-hover/btn:bg-[#b36b18] group-hover/btn:rounded-[2rem] shadow-xl overflow-hidden">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
              Discover Works
            </span>
            <div className="relative flex items-center justify-center w-9 h-8">
              <div className="absolute inset-0 bg-white/10 rounded-full group-hover/btn:scale-[3] group-hover/btn:bg-white/20 transition-all duration-700"></div>
              <ArrowRight size={18} className="text-white relative z-10" />
            </div>
          </div>
        </button>
      </div>
      {/* Background Decorative Number (Advanced Stroke Text) */}
      <span className="absolute top-95 right-0 text-9xl font-[1000] select-none pointer-events-none transition-all duration-700
        text-transparent opacity-10 group-hover:opacity-20 group-hover:-translate-y-4"
        style={{ WebkitTextStroke: '2px #1d242c' }}>
        0{index + 1}
      </span>
    </motion.div>
  ))}
</div>
{/* --- detailed box section ... click on explor button--- */}
<div id="details-section" className="scroll-mt-24 px-4">
  <AnimatePresence>
    {selectedCategory && (
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-[1rem] shadow-[0_80px_150px_-30px_rgba(0,31,63,0.2)] border border-orange-50 overflow-hidden mb-20 relative"
      >
        <div className="flex flex-col lg:flex-row"> 
          {/* LEFT PANEL: PRODUCT VISUALS */}
          <div className="lg:w-[45%] bg-[#1d242c] px-16 py-15 text-white relative  flex flex-col justify-between overflow-hidden">
            <button onClick={() => setSelectedCategory(null)} className="absolute top-10 left-10 p-4 bg-white/10 hover:bg-[#b36b18] rounded-3xl transition-all z-30">
              <X size={24} />
            </button>
            <div className="relative z-10">
              <span className="bg-[#b36b18] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 mt-10 inline-block shadow-xl">Flash Deal</span>
              <h2 className="text-6xl font-[1000] uppercase tracking-tighter leading-[0.85] mb-9">{selectedCategory.name}</h2>
              <div className="flex items-center gap-6 mb-10">
                 <div className="flex flex-col">
                    <span className="text-[#b36b18] font-black text-4xl tracking-tighter">$149.00</span>
                    <span className="text-gray-400 line-through text-sm font-bold opacity-60">$299.00</span>
                 </div>
                 <div className="h-12 w-[1px] bg-white/20"></div>
                 <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-[#b36b18]">
                        <Star size={14} fill="currentColor" />
                        <span className="text-white font-black text-3xl tracking-tighter">{selectedCategory.rating}</span>
                    </div>
                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Global Reviews</span>
                 </div>
              </div>
              {/* LIVE TIMER */}
              <div className="flex gap-3">
                {[ {l:'Days', v:'02'}, {l:'Hrs', v:'14'}, {l:'Min', v:'55'} ].map(t => (
                  <div key={t.l} className="bg-white/10 backdrop-blur-xl p-4 rounded-[2rem] border border-white/10 w-20 text-center shadow-2xl">
                    <p className="text-2xl font-black text-[#b36b18] ">{t.v}</p>
                    <p className="text-[8px] font-black uppercase text-gray-400">{t.l}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* DECORATIVE IMAGE BACKGROUND - Opacity Adjusted for better visibility */}
            <div className="absolute inset-0 z-0">
              <img src={selectedCategory.image} className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-[2s]" alt="" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1d242c] via-[#001F3F]/60 to-transparent"></div>
            </div>
          </div>
          {/* RIGHT PANEL: DETAILS & SHOPPING */}
          <div className="lg:w-[55%] px-16 py-13 bg-white flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-12"> 
              {/* Performance Metrics - Moved to TOP as requested */}
              <div className="space-y-10">
                <div className="bg-gray-50 p-8 rounded-[1rem] border border-gray-100 shadow-sm">
                  <h4 className="text-[#1d242c] font-black text-[11px] tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                    <Truck size={16} className="text-[#b36b18] " /> Delivery Logistics
                  </h4>
                  <div className="space-y-5">
                    {[
                      {label: 'Stock Status', value: '88% Available', icon: <Package size={14}/>, color: 'bg-green-500'},
                      {label: 'Dispatch', value: '24 Hours', icon: <Clock size={14}/>},
                      {label: 'Shipping', value: 'Free Global', icon: <RefreshCcw size={14}/>},
                    ].map(item => (
                      <div key={item.label} className="space-y-2">
                         <div className="flex justify-between items-center text-[10px] font-black uppercase">
                            <span className="text-gray-400 flex items-center gap-2">{item.icon} {item.label}</span>
                            <span className="text-[#1d242c]">{item.value}</span>
                         </div>
                         {item.color && <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color} w-[88%]`}></div>
                         </div>}
                      </div>
                    ))}
                  </div>
                </div>
           </div>


 {/* Sub Categories List - Moved below for Logistics */}
<div className="">
  <h4 className="text-[#1d242c] font-black text-[11px] tracking-[0.3em] uppercase mb-4 flex items-center gap-2 italic">
    <LayoutGrid size={16} className="text-[#b36b18] " /> Related Collections
  </h4>
  {/* Yahan grid-cols-2 ya grid-cols-3 use karein boxes ko side-by-side karne ke liye */}
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
    {selectedCategory.subCategories?.map((sub, i) => (
      <div 
        key={i} 
        className="group flex items-center p-3 bg-white hover:bg-orange-50 rounded-2xl border border-gray-100 hover:border-orange-200 transition-all cursor-pointer shadow-sm"
      >
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-[#1d242c] transition-colors shrink-0">
            <Box size={14} className="text-[#1d242c] group-hover:text-white" />
        </div>
        <span className="font-bold text-[#1d242c] text-[10px] uppercase tracking-tighter leading-tight line-clamp-1">
          {sub}
        </span>
      </div>
    ))}
  </div>
</div>
 </div>
       {/* NEW ADDITION: TRUST BADGES */}
            <div className="mt-7 flex gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#1d242c]">
                   <ShieldCheck size={16} /> 100% Secure
                </div>
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#1d242c]">
                   <CreditCard size={16} /> Instant Pay
                </div>
            </div>
            {/* ACTION FOOTER - Reduced Height & Optimized */}
            <div className="mt-2 pt-2 border-t border-gray-100 flex flex-col sm:flex-row gap-2">
              {/*  ADD TO CART BUTTON WITH FUNCTIONALITY */}
              <button 
                onClick={() => addToCart({
                  id: selectedCategory.id,
                  name: selectedCategory.name,
                  price: 149.00,
                  image: selectedCategory.image,
                  title: selectedCategory.name
                })} 
                className="flex-[2] bg-[#b36b18] hover:bg-[#1d242c] text-white p-4 rounded-[1rem] flex items-center justify-between group transition-all duration-700 shadow-2xl shadow-orange-600/20"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-2 rounded-2xl group-hover:rotate-[360deg] transition-all duration-700">
                    <ShoppingCart size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-orange-200 uppercase tracking-widest leading-none mb-1">Finish Order</p>
                    <p className="text-xl font-[1000] uppercase tracking-tighter">Add To Cart</p>
                  </div>
                </div>
                <ArrowRight size={20} className="mr-2 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-[#1d242c] hover:text-white text-[#1d242c] p-5 rounded-[1rem] font-black uppercase text-[10px] tracking-[0.2em] transition-all border border-gray-200 shadow-sm">
                Compare Gear
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
{/* Add to Cart Notification ki styling start*/}
{showNotif && (
  <div className="fixed top-15 right-4 md:right-5 z-50 animate-in slide-in-from-right-full duration-300">
    <div className="flex items-center gap-4 bg-white border-l-6 border-green-500 p-4 rounded-lg shadow-2xl min-w-[300px]">
      {/* Icon Section */}
      <div className="bg-green-100 p-2 rounded-full">
        <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      {/* Text Section */}
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-gray-900 leading-none">
          Success!
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-medium text-green-700">{productName}</span> Added To Cart!
        </p>
      </div>
    </div>
  </div>
)}
{/** notification ki styling end */}


{/* Enhanced Features Section with Hover Effects */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20 px-3 mt-5 font-sans">
  {[
    { 
      icon: <TruckIcon size={32} />, 
      title: "Fast Shipping", 
      tag: "Logistic // 01",
      description: "Nationwide delivery with real-time tracking.",
      accent: "text-orange-600"
    },
    { 
      icon: <Shield size={32} />, 
      title: "Secure Pay", 
      tag: "Protection // 02",
      description: "Advanced encryption & fraud protection tech.",
      accent: "text-blue-500"
    },
    { 
      icon: <Clock size={32} />, 
      title: "24/7 Support", 
      tag: "Available // 03",
      description: "Round-the-clock expert human assistance.",
      accent: "text-emerald-500"
    }
   ].map((feature, index) => (
    <div 
      key={index}
      className="group relative bg-white rounded-[3rem_0.5rem_3rem_0.5rem] p-8 border-2 border-gray-100 hover:border-[#1d242c] transition-all duration-700 overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,31,63,0.15)]"
    >
      {/* Background Decorative Text */}
      <span className="absolute -right-0.5 -top- text-8xl font-[1000] text-gray-100 group-hover:text-orange-50 transition-colors select-none">
        0{index + 1}
      </span>
      {/* Floating Tag */}
      <span className="inline-block text-[9px] font-black tracking-[0.3em] text-[#b36b18] uppercase mb-6 italic">
        {feature.tag}
      </span>
      {/* Icon with Asymmetric Shape */}
      <div className={`w-16 h-16 rounded-2xl bg-[#1d242c] flex items-center justify-center mb-7 transform  group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
        <div className="text-white">
            {feature.icon}
        </div>
      </div>
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-[1000] text-[#1d242c] uppercase tracking-tighter leading-none ">
          {feature.title.split(' ')[0]} <br/>
          <span className="text-lg font-light opacity-50 italic">{feature.title.split(' ')[1]}</span>
        </h3>
        <p className="text-gray-400 text-xs font-bold leading-relaxed max-w-[200px] group-hover:text-[#1d242c] transition-colors">
          {feature.description}
        </p>
      </div>
      {/* Interactive Bottom Bar */}
      <div className="mt-7 flex items-center justify-between">
          <div className="h-[2px] w-12 bg-[#a75e0c] group-hover:w-full transition-all duration-700"></div>
        <ArrowRight size={16} className="text-[#a75e0c] opacity-0 group-hover:opacity-100 ml-4 transition-all" />
      </div>
      {/* Hover Background Accent */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-600/20 rounded-tl-[5rem] translate-x-1 translate-y-9 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
    </div>
  ))}
</div>
 </main>

  {/**footer section start here */}
    <footer className="w-full font-sans">
      {/* Main Footer Section start here */}
      <div className="bg-[#10161f] text-white pt-12 pb-6 font-sans">
        <div className="max-w-7xl mx-auto px-8 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              {/* Logo Icon Added */}
              <Zap className="text-white text-2xl" />
              <span className="text-2xl font-black italic tracking-tighter text-emerald-50">ShopSphere</span>
            </div>
            <p className="text-emerald-100/50 text-xs leading-relaxed max-w-xs">
              Premium essentials delivered to your <br/> doorstep.  Join our family today.
            </p>
            {/* Social Icons Updated */}
            <div className="flex gap-4">
              {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube].map((Icon, i) => (
                <div key={i} className="cursor-pointer text-white hover:text-[#febd69] transition-all hover:-translate-y-1">
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Sections  */}
          <div className="md:col-span-6 grid grid-cols-3 gap-20">
            {/* Shop Menu */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase mb-4 border-b border-white/10 pb-1">Our Shop</h4>
              <ul className="space-y-2 text-emerald-100/50 text-xs">
                {['New Arrivals', 'Best Sellers', 'Discounted'].map(link => (
                  <li key={link} className="relative w-fit group cursor-pointer hover:text-white transition-all">
                    {link}
                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#febd69] group-hover:w-full transition-all duration-300"></span>
                  </li>
                ))}
              </ul>
            </div>
            {/*  Company Menu  */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase mb-4 border-b border-white/10 pb-1">Company</h4>
              <ul className="space-y-2 text-emerald-100/50 text-xs">
                {['About Us', 'Our Story', 'Careers'].map(link => (
                  <li key={link} className="relative w-fit group cursor-pointer hover:text-white transition-all">
                    {link}
                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#febd69] group-hover:w-full transition-all duration-300"></span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Help Menu */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase mb-4 border-b border-white/10 pb-1">Help</h4>
              <ul className="space-y-2 text-emerald-100/50 text-xs">
                {['Track Order', 'Shipping Policy', 'Contact Us'].map(link => (
                  <li key={link} className="relative w-fit group cursor-pointer hover:text-white transition-all">
                    {link}
                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#febd69] group-hover:w-full transition-all duration-300"></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Newsletter (Width automatically reduced due to col-span-3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-bold text-white text-xs uppercase border-b border-white/10 pb-1">Newsletter</h4>
            <div className="relative flex items-center bg-white/5 rounded-lg border border-white/10 overflow-hidden">
              <input type="email" placeholder="Email" className="bg-transparent px-4 py-2 text-xs outline-none w-full" />
              <button className="bg-[#f3a949] text-[#022c22] px-4 py-2 text-[10px] font-black uppercase hover:bg-white transition-all">Go</button>
            </div>
          </div>
        </div>
        {/* Center Copyright */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col items-center">
          <p className="text-emerald-100/30 text-[9px] uppercase tracking-[0.5em]">
            © 2026 ShopSphere E Commerce Store, All Rights Reserved
          </p>
        </div>
      </div>
      </footer>
    </div>
  );
};

// Enhanced CSS animations with unique names for this page
const styles = `
  @keyframes category-fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes category-slideIn {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes category-slideUp {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes category-slideRight {
    from { opacity: 0; transform: translateX(-100px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes category-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes category-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes category-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-category-fadeIn {
    animation: category-fadeIn 1s ease-out;
  }
  
  .animate-category-slideIn {
    animation: category-slideIn 0.8s ease-out;
  }
  
  .animate-category-slideUp {
    animation: category-slideUp 0.6s ease-out;
  }
  
  .animate-category-slideRight {
    animation: category-slideRight 0.6s ease-out;
  }
  
  .animate-category-pulse {
    animation: category-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  .animate-category-bounce {
    animation: category-bounce 1s infinite;
  }
  
  .animate-category-spin {
    animation: category-spin 1s linear infinite;
  }
  
  /* Custom scrollbar for this page */
  .category-scrollbar::-webkit-scrollbar {
    width: 10px;
  }
  
  .category-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 5px;
  }
  
  .category-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
    border-radius: 5px;
  }
  
  .category-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #2563eb, #7c3aed);
  }
  
  /* Selection color for this page */
  .category-page ::selection {
    background-color: rgba(59, 130, 246, 0.3);
    color: #1f2937;
  }
  
  /* Smooth transitions for this page */
  .category-page * {
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
`;
// Add styles to document head
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default EcommerceCategoriesPage;
