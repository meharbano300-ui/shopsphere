import React, { useState, useEffect, useCallback } from 'react';
import { FaTrash, FaArrowLeft, FaShoppingCart, FaPlus, FaMinus, FaHeart, FaRegHeart, FaTag,
  FaTruck, FaCcVisa, FaCcMastercard, FaPaypal, FaStar, FaHome, FaSearch, FaCheck, FaLock
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import {  FaHistory, FaShieldAlt,  FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebookF, FaInstagram,  FaTwitter, FaLinkedinIn, FaYoutube, FaStore } from "react-icons/fa";
import { MousePointerClick, MessageSquare, Zap, Activity, Cpu, Music2, Radio, ShoppingBag, Smartphone, 
  Tv, Tags, MousePointer2 } from 'lucide-react';
import { Truck,  Trash2, Plus, Minus, ArrowLeft,  CreditCard, RotateCcw, Lock as LockIcon,   
} from 'lucide-react';
import {FaStarHalfAlt, FaMapMarkerAlt, FaChevronDown, FaClock, FaCheckCircle, FaBoxOpen, FaInfoCircle
} from "react-icons/fa"; 
import LoginModal from "./LoginModal";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";
import { Search, ShoppingCart, User, MapPin, Star, Filter, Home,
  ArrowUpRight, Heart,  Clock, ShieldCheck, RefreshCcw, Calendar, Gift, Flame, Sparkles
} from "lucide-react";


const Cart_Page = () => {
 // login signup states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [savedForLater, setSavedForLater] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  // Promo codes with discounts
  const promoCodes = [
    { code: 'SAVE10', discount: 0.10, type: 'percentage', minPurchase: 5000 },
    { code: 'SHOP20', discount: 0.20, type: 'percentage', minPurchase: 10000 },
    { code: 'FREESHIP', discount: 2000, type: 'fixed', minPurchase: 15000 },
    { code: 'FLAT500', discount: 500, type: 'fixed', minPurchase: 3000 }
  ];

  //  **PERMANENT STORAGE: Load cart data from localStorage**
  useEffect(() => {
    console.log("🔄 Loading cart from PERMANENT storage...");
    const savedCart = localStorage.getItem('shopSphereCart');
    const savedLater = localStorage.getItem('shopSphereSaved');
    setTimeout(() => {
      try {
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          console.log("Loaded permanent cart items:", parsedCart.length);
          setCartItems(parsedCart);
        } else {
          console.log("📭 No cart items found - starting fresh");
        }
        
        if (savedLater) {
          setSavedForLater(JSON.parse(savedLater));
        }
      } catch (e) {
        console.error('Error loading permanent cart:', e);
        setCartItems([]);
        setSavedForLater([]);
      }
      setLoading(false);
    }, 300);
  }, []);


  //  **PERMANENT STORAGE: ALWAYS save cart state**
  useEffect(() => {
    if (!loading) {
      try {
        //  ALWAYS save to localStorage - NEVER clear automatically
        localStorage.setItem('shopSphereCart', JSON.stringify(cartItems));
        localStorage.setItem('shopSphereSaved', JSON.stringify(savedForLater));
        //  Extra backup in sessionStorage
        sessionStorage.setItem('shopSphereCartBackup', JSON.stringify(cartItems));
        console.log("💾 Saved cart items:", cartItems.length);
      } catch (e) {
        console.error('Error saving permanent cart:', e);
      }
    }
  }, [cartItems, savedForLater, loading]);


// 2. counter: number ko increase decreas krny ky liye function 
const updateQuantity = (index, delta) => {
  setCartItems(prev => {
    const newCart = [...prev];
    const item = { ...newCart[index] };
    const newQty = (item.quantity || 1) + delta;
    // Sirf 1 aur 10 ke darmiyan update hoga
    if (newQty >= 1 && newQty <= 10) {
      item.quantity = newQty;
      newCart[index] = item;
      return newCart;
    }
    // Agar 10 se upar jaye to warning
    if (newQty > 10) {
      showNotification("Max limit reached", "warning");
    }
    return prev; 
  });
};

  const removeItem = useCallback((index) => {
    const item = cartItems[index];
    //  STRONG CONFIRMATION for permanent removal
    const confirmDelete = window.confirm(
      `⚠️ PERMANENT REMOVAL WARNING\n\n` +
      `Item: ${item.title}\n` +
      `Price: PKR ${item.price.toLocaleString()}\n\n` +
      `Are you 100% sure you want to delete?`
    );
    
    if (confirmDelete) {
      setCartItems(prev => prev.filter((_, i) => i !== index));
      showNotification(`${item.title} PERMANENTLY removed from cart`, 'warning');
    }
  }, [cartItems]);

  const saveForLater = useCallback((index) => {
    const item = cartItems[index];
    setSavedForLater(prev => [...prev, { 
      ...item, 
      savedDate: new Date().toISOString(),
      originalQuantity: item.quantity || 1
    }]);
    
    setCartItems(prev => prev.filter((_, i) => i !== index));
    showNotification(`${item.title} saved for later`, 'success');
  }, [cartItems]);
  const moveToCart = useCallback((index) => {
    const item = savedForLater[index];
    setCartItems(prev => [...prev, { 
      ...item, 
      quantity: item.originalQuantity || 1,
      movedBackAt: new Date().toISOString()
    }]);
    setSavedForLater(prev => prev.filter((_, i) => i !== index));
    showNotification(`${item.title} moved to cart`, 'success');
  }, [savedForLater]);
  const removeSavedItem = useCallback((index) => {
    const item = savedForLater[index];
    const confirmDelete = window.confirm(
      `Remove "${item.title}" from saved items?\n\n` +
      `Saved items are also permanent.`
    );
    
    if (confirmDelete) {
      setSavedForLater(prev => prev.filter((_, i) => i !== index));
      showNotification(`${item.title} removed from saved items`, 'info');
    }
  }, [savedForLater]);
  const clearCart = useCallback(() => {
    if (cartItems.length === 0) return;
    //  ULTIMATE WARNING - PERMANENT CART CLEAR
    const confirmClear = window.confirm(
      '🚨 PERMANENT CART CLEAR WARNING 🚨\n\n' +
      `You have ${cartItems.length} items in your cart.\n\n` +
      '❌ Items CANNOT be recovered after this.\n\n' +
      'Type "DELETE ALL" to confirm permanent removal:'
    );
    
    // Extra security - user must type confirmation
    const userInput = prompt('Type "DELETE ALL" to confirm permanent removal of all items:');
    if (userInput === 'DELETE ALL') {
      setCartItems([]);
      showNotification('🚨 ALL ITEMS PERMANENTLY DELETED FROM CART', 'error');
      // Also clear from localStorage
      localStorage.removeItem('shopSphereCart');
    } else {
      showNotification('Cart clear cancelled', 'info');
    }
  }, [cartItems.length]);

  // ✨ PREMIUM NAVY & ORANGE NOTIFICATION STYLING
  const showNotification = useCallback((message, type) => {
    const notification = document.createElement('div');
    
    // Icon Logic
    const icons = {
      success: '⚡',
      error: '🚫',
      warning: '🔸',
      info: '🔷'
    };

    // Style configuration
    notification.style.cssText = `
      position: fixed;
      top: 30px;
      right: 30px;
      z-index: 10000;
      background: #0F172A;
      color: white;
      padding: 4px;
      border-radius: 20px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      transform: translateX(150%) scale(0.9);
      transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      display: flex;
      align-items: center;
      min-width: 320px;
      border: 1px solid rgba(249, 115, 22, 0.3);
      overflow: hidden;
    `;
    notification.innerHTML = `
      <div style="background: #F97316; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 16px; margin: 4px; font-size: 24px; box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);">
        ${icons[type] || '🔔'}
      </div>
      <div style="padding: 10px 15px; flex: 1;">
        <div style="font-family: 'Syncopate', sans-serif; font-size: 9px; font-weight: 900; color: #F97316; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 2px;">
          System Protocol
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700; color: #F1F5F9; line-height: 1.3;">
          ${message.replace('\n', '<br/>')}
        </div>
      </div>
      <div style="width: 4px; height: 40px; background: #F97316; border-radius: 10px; margin-right: 10px; opacity: 0.5;"></div>
    `;
    
    document.body.appendChild(notification);
    // Animate In
    setTimeout(() => {
      notification.style.transform = 'translateX(0) scale(1)';
    }, 10);
    // Animate Out and Remove
    setTimeout(() => {
      notification.style.transform = 'translateX(180%) rotate(5deg)';
      setTimeout(() => notification.remove(), 600);
    }, 3500);
  }, []);

  const calculateTotals = useCallback(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    let delivery = 0;
    if (cartItems.length > 0) {
      delivery = subtotal > 15000 ? 0 : 2000;
    }
    let promoDiscount = 0;
    if (appliedPromo) {
      if (appliedPromo.type === 'percentage') {
        promoDiscount = subtotal * appliedPromo.discount;
      } else {
        promoDiscount = appliedPromo.discount;
      }
    }
    const tax = subtotal * 0.05;
    const total = subtotal + delivery + tax - promoDiscount; 
    return { subtotal, delivery, promoDiscount, tax, total };
  }, [cartItems, appliedPromo]);
  const applyPromoCode = useCallback(() => {
    if (!promoCode.trim()) return;
    const promo = promoCodes.find(p => p.code === promoCode.toUpperCase());
    if (!promo) {
      showNotification('Invalid promo code', 'error');
      return;
    }
    const { subtotal } = calculateTotals();
    if (subtotal < promo.minPurchase) {
      showNotification(`Minimum purchase of PKR ${promo.minPurchase.toLocaleString()} required`, 'warning');
      return;
    }
    setAppliedPromo(promo);
    showNotification(`Promo code ${promo.code} applied!`, 'success');
    setPromoCode('');
    setShowPromoInput(false);
  }, [promoCode, promoCodes, calculateTotals]);

  const clearPromoCode = useCallback(() => {
    setAppliedPromo(null);
    showNotification('Promo code removed', 'info');
  }, []);

  //  PERMANENT CHECKOUT - ITEMS NEVER REMOVE
  const proceedToCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      showNotification('Your cart is empty!', 'warning');
      return;
    }
    setIsCheckingOut(true);
    
    //  **CRITICAL: Save cart IMMEDIATELY before checkout**
    try {
      // Force save to localStorage
      localStorage.setItem('shopSphereCart', JSON.stringify(cartItems));
      console.log("🔥 cart saved BEFORE checkout:", cartItems.length, "items");
      
      // Extra backup
      localStorage.setItem('shopSphereCart_CHECKOUT_BACKUP', JSON.stringify(cartItems));
      localStorage.setItem('shopSphereCart_LAST_CHECKOUT', new Date().toISOString());
    } catch (e) {
      console.error('Error saving permanent cart before checkout:', e);
    }
    
    showNotification(
      '🛒 Finalizing Your ShopSphere Order.',
      'success'
    );
    
    setTimeout(() => {
      navigate('/checkout');
      setIsCheckingOut(false);
    }, 1000);
  }, [cartItems, navigate]);

  //  **RESTORE FUNCTION - In case items somehow disappear**
  const restoreCart = useCallback(() => {
    const backup = localStorage.getItem('shopSphereCart_CHECKOUT_BACKUP');
    if (backup) {
      const backupItems = JSON.parse(backup);
      if (window.confirm(`Restore ${backupItems.length} items from backup?`)) {
        setCartItems(backupItems);
        showNotification(`🛒 ${backupItems.length} items restored from backup!`, 'success');
      }
    } else {
      showNotification('No backup found', 'info');
    }
  }, []);
  const { subtotal, delivery, promoDiscount, tax, total } = calculateTotals();
  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-16 bg-gray-200 rounded-xl"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
              <div className="h-96 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
     {/* HEADER section start here WITH GAPS */}
     <header className="bg-[#131921] sticky top-0 z-50 py-2 px-4 md:px-8 flex items-center gap-3 text-white shadow-xl transition-all">
      <motion.div 
        whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
         onClick={() => navigate('/')} 
        className="flex items-center gap-2 ms-3 cursor-pointer border border-transparent hover:border-white/20 p-1 rounded-sm transition-all"
         >
       <div className="bg-orange-400 p-1 rounded-md shadow-[0_0_10px_rgba(254,189,105,0.5)]">
       <Zap className="text-white text-xl" />
       </div>
      <span className="text-xl font-black uppercase font-sans italic text-white tracking-tight">
      Shop<span className="text-white drop-shadow-[0_0_5px_rgba(254,189,105,0.3)]">Sphere</span>
      </span>
      </motion.div>
     <div onClick={() => navigate('/')}
    className="hidden lg:flex flex-col items-start cursor-pointer group-hover:rotate-[-10deg] hover:text-[#febd69] transition-all border border-transparent p-1 px-2 rounded-sm transition-colors"
  >
      <div className="flex items-center gap-1 font-bold text-sm">
      <FaHome size={18} className="text-orange-400" /> Home
    </div>
  </div>
<div className="hidden lg:flex items-center gap-2 cursor-pointer group">
  <MapPin size={20} className="text-orange-400 shrink-0" />
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
      className="w-full h-full p-4 rounded-l-md text-white bg-white/10 border-2 border-orange-400 focus:border-[#febd69] focus:bg-[#131921] transition-all text-sm outline-none shadow-inner" 
      placeholder="Search for products, brands and more..." 
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button className="bg-orange-400 h-full px-5 rounded-r-md text-[#131921] hover:bg-[#f8b154] transition-all shadow-lg active:scale-95">
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
    {/* mobile responsive menues bany ky lieye dropdown*/}
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

  <div onClick={() => navigate('/cart')} className="flex items-center gap-2 md:-translate-x-5 transform cursor-pointer relative hover:text-[#febd69] transition-all border border-transparent p-1 px-2 rounded-sm group">
    <div className="relative">
      <FaShoppingCart className="text-2xl group-hover:rotate-[-1deg] transition-transform" />
      <span className="absolute -top-2 -right-3 bg-[#f08804] rounded-full text-[10px] px-1 py-0.5 font-bold text-black border-2 border-[#131921] shadow-lg animate-bounce">
        {cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}
      </span>
    </div>
    <span className="font-bold hidden sm:block self-end mb-1">Cart</span>
  </div>
</header>
{/* HEADER section end here WITH GAPS */}

    
 {/* Main Content: main body start here*/}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px- py-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            
            <div className="flex items-center gap-5">
          <div className="p-4 bg-[#131921] rounded-2xl shadow-lg  hover:rotate-0 transition-transform duration-500">
            <FaShoppingCart className="text-orange-400 text-2xl animate-pulse" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic uppercase">
              Shopping <span className="text-orange-500">CART</span>
            </h2>
            <p className="text-[10px] text-gray-400 font-bold tracking-[0.3em] uppercase mt-1">
              Verify your premium selection
            </p>
          </div>
          </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-3">
  {/* Restore Backup Button -  */}
  {cartItems.length === 0 && (
    <button 
      onClick={restoreCart}
      className="group relative flex items-center gap-3 px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-black rounded-2xl shadow-[0_10px_20px_rgba(59,130,246,0.1)] hover:bg-blue-600 hover:text-white transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-0"></div>
      <FaHistory className="relative z-10 animate-spin-slow" />
      <span className="relative z-10 uppercase tracking-widest text-xs italic">Restore Vault</span>
    </button>
  )}
  
  {/* Clear Cart Button */}
  {cartItems.length > 0 && (
    <button 
      onClick={clearCart}
      className="group flex items-center gap-2 px-3 py-3 bg-red-50 text-orange-500 font-black rounded-2xl border-2 border-transparent hover:border-red-600 hover:bg-red-600 hover:text-white hover:shadow-[0_15px_30px_rgba(220,38,38,0.2)] transition-all duration-500 shadow-sm"
    >
      <div className="p-1 bg-red-100 group-hover:bg-white/20 rounded-lg transition-colors">
        <FaTrash className="text-sm group-hover:rotate-12 transition-transform" />
      </div>
      <span className="uppercase tracking-widest text-xs italic">Purge Vault</span>
    </button>
  )}
  {/* Continue Shopping Button  */}
  <button 
    onClick={() => navigate('/Product_Listing')}
    className="relative group px-5 py-4 bg-[#131921] text-white font-black rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-orange-200"
  >
    {/* Shining Animation Layer */}
    <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-[1.2s] group-hover:left-full ease-in-out"></div>
    
    <div className="flex items-center gap-3 relative z-10">
      <span className="uppercase tracking-[0.2em] text-xs italic">Continue Mission</span>
      <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-500">
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
      </div>
    </div>
  </button>
</div>
</div>
<div className="grid lg:grid-cols-3 gap-4 bg-white">      
 {/* Cart Items - Left Column */}
<div className="lg:col-span-2 space-y-8 font-sans">
  {/* Main Container */}
  <div className="bg-white rounded-[0.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
    {/* Dynamic Header Section */}
    <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
       <div className="flex items-center gap-5">
      <div className="relative group ps-5">
      <div className="absolute -inset-1  rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
     <div className="relative  group-hover:rotate-200 transition-all duration-500 ">
     <FaLock className="text-orange-500 text-2xl animate-pulse" />
    </div>
  </div>
  <div>
    <h2 className="text-[21px] font-black text-gray-900 tracking-tighter italic uppercase flex items-center gap-2">
      MY <span className="text-orange-500 drop-shadow-sm">Vault</span>
      <div className="w-2 h-2 bg-green-600 rounded-full animate-ping"></div>
    </h2>
    <p className="text-[8px] font-bold text-gray-400 tracking-[0.4em] uppercase -mt-1">
      Secure Storage
    </p>
  </div>
</div> 
     <div className="flex items-center gap-3">
          <div className="group flex flex-col items-end">
            <div className="px-5 py-2 bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] border border-orange-100 text-[#131921] rounded-2xl text-sm font-black italic">
              {cartItems.length} Units Reserved
            </div>
          </div>
        </div>
      </div>
    </div>
    {cartItems.length === 0 ? (
      /* Empty State */
      <div className="p-24 text-center">
        <div className="relative w-48 h-48 mx-auto mb-10">
          <div className="absolute inset-0 bg-orange-100 rounded-[3rem] rotate-12 animate-pulse opacity-30"></div>
          <div className="relative w-full h-full rounded-[3rem] bg-gradient-to-br from-gray-50 to-white flex items-center justify-center border-2 border-dashed border-orange-200 shadow-2xl">
            <FaShoppingCart className="text-orange-200 text-7xl -rotate-12" />
          </div>
        </div>
        <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase italic">Your Vault is Empty</h3>
        <div className="flex justify-center">
          <button 
            onClick={() => navigate('/Product_Listing')}
            className="px-12 py-5 bg-[#131921] text-white font-black rounded-2xl shadow-2xl hover:bg-orange-600 hover:-translate-y-2 transition-all duration-500 uppercase tracking-widest text-xs"
          >
            Deploy Shopping Drone
          </button>
        </div>
      </div>
    ) : (
      /* Cart Items List */
      <div className="divide-y divide-gray-200 ">
        {cartItems.map((item, index) => (
          <div key={item.id || index} className="p-5 mb-5 transition-all duration-500 group bg-white hover:bg-gray-50/30">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10"> 
              {/* Image Section  */}
              <div className="relative shrink-0">
                <div className="absolute -inset-2 bg-gradient-to-tr from-gray-100 to-gray-200 rounded-[1rem] blur opacity-20 group-hover:opacity-100 transition duration-700"></div>
                <div className="relative overflow-hidden rounded-[1.0rem] bg-white border border-gray-100 shadow-xl">
                  <img 
                    src={item.image || 'images/cute.jfif'} 
                    className="w-40 h-40 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    alt={item.title}
                  />
                </div>
              </div>
              {/* Product Info Section */}
              <div className="flex-grow space-y-5">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2">
                    {/* Title with 2-line clamp */}
                    <h3 className="font-black text-gray-800 text-[21px] tracking-tighter leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-5">
                      <div className="flex items-center bg-black/5 px-3 py-1 rounded-full">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} size={10} className={i < (item.rating || 4) ? 'text-orange-400' : 'text-gray-200'} />
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <FaUserFriends className="text-orange-500 text-[13px]" /> Authenticated Review
                      </span>
                    </div>
                  </div>  
                  {/* Stylish Delete Button */}
                  <button 
                    onClick={() => removeItem(index)}
                    className="group/del relative p-4  hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-2xl transition-all duration-300  overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-red-500 translate-y-full group-hover/del:translate-y-0 transition-transform duration-300 opacity-10"></div>
                    <FaTrash size={18} className="relative z-10 transform group-hover/del:rotate-1 transition-transform" />
                  </button>
                </div>
                {/* Status Badges */}
                <div className="flex flex-wrap gap-1">
                  <span className="px-4 py-1.5 bg-[#131921] text-white text-[9px] font-black rounded-lg italic tracking-widest shadow-lg">
                    ORIGINAL SHIPMENT
                  </span>
                  <span className="px-4 py-1.5 bg-green-50 text-green-600 text-[9px] font-black rounded-lg border border-green-100 uppercase">
                    In Stock
                  </span>
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[9px] font-black rounded-lg border border-blue-100 uppercase flex items-center gap-2">
                    <FaShieldAlt /> Warranty Active
                  </span>
                </div>
                {/* Pricing & Controls */}
                <div className="flex flex-wrap items-center justify-between gap-6 pt-2 border-t border-gray-50">
                  <div className="flex items-center gap-7">
                    <div className="flex items-center bg-white rounded-[13px] p-1 border border-gray-100 shadow-xl">
                      <button 
                        onClick={() => updateQuantity(index, -1)}
                        className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-900 rounded-xl hover:bg-orange-500 hover:text-white transition-all disabled:opacity-10"
                        disabled={(item.quantity || 1) <= 1}
                      >
                        <FaMinus size={10} />
                      </button>
                      <span className="px-4 font-black text-[#131921] text-xl tabular-nums italic">
                        {item.quantity || 1}
                      </span>
                      <button 
                        onClick={(e) => {e.stopPropagation(); updateQuantity(index, 1); }}
                        className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-900 rounded-xl hover:bg-orange-500 hover:text-white transition-all"
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[26px] font-black text-gray-900 tracking-tighter italic">
                        <small className="text-sm font-bold not-italic mr-1 text-orange-500 uppercase">PKR</small>
                        {(item.price * (item.quantity || 1)).toLocaleString()}
                      </div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subtotal Asset</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => saveForLater(index)}
                    className="group flex items-center gap-2 p-2 rounded-[10px] bg-white border-2 border-gray-50 text-gray-400 font-black text-[12px] uppercase tracking-widest hover:border-orange-500 hover:text-orange-500 transition-all duration-500 shadow-sm"
                  >
                    <FaRegHeart className="group-hover:fill-current group-hover:scale-125 transition-transform" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

{/* Order Summary - Right Column */}
<div className="lg:col-span-1">
  <div className="sticky top-24 space-y-6 font-sans">
    {/* Order summary card */}
    <div className="bg-white rounded-[10px] shadow-2xl border border-gray-100 overflow-hidden transform transition-all hover:shadow-orange-100">
      <div className="p-7 bg-gradient-to-br from-[#131921] via-[#232f3e] to-[#131921] relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl"></div>
        
        <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
          <FaShoppingCart className="text-orange-400 mt-2 animate-bounce" />
          <span className="uppercase italic">Order Summary</span>
        </h2>
        <p className="text-gray-400 text-xs font-medium tracking-[0.2em] mt-2 ml-9 uppercase">
          Finalize Your Purchase
        </p>
      </div>
      <div className="p-8 space-y-5">
        {/* Price breakdown */}
        <div className="space-y-3 border-b border-dashed border-gray-200 pb-5">
          <div className="flex justify-between items-center group">
            <span className="text-gray-500 font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              Subtotal <small className="text-gray-400 italic font-normal">({cartItems.length} items)</small>
            </span>
            <span className="font-bold text-gray-800 text-lg tabular-nums">
              PKR {subtotal.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              Shipping Fee
            </span>
            <span className={`font-black ${delivery === 0 ? 'text-green-500 bg-green-50 px-3 py-1 rounded-full text-xs animate-pulse' : 'text-gray-800'}`}>
              {delivery === 0 ? 'FREE DELIVERY' : `PKR ${delivery.toLocaleString()}`}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              Govt. Estimated Tax
            </span>
            <span className="font-bold text-gray-800 tabular-nums">
              PKR {tax.toLocaleString()}
            </span>
          </div>
          {/* Promo code Section */}
          <div className="mt-6">
            {appliedPromo ? (
              <div className="flex justify-between items-center bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-100 shadow-sm animate-fadeIn">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-500 p-2 rounded-lg shadow-lg shadow-green-200">
                    <FaTag className="text-white text-sm" />
                  </div>
                  <div>
                    <div className="font-black text-green-700 text-sm uppercase tracking-wider">{appliedPromo.code}</div>
                    <div className="text-[10px] text-green-600 font-bold">
                      {appliedPromo.type === 'percentage' ? `${appliedPromo.discount * 100}% DISCOUNT APPLIED` : `PKR ${appliedPromo.discount} FLAT OFF`}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={clearPromoCode}
                  className="text-xs font-black text-red-400 hover:text-red-600 underline decoration-2 underline-offset-4 transition-all"
                >
                  REMOVE
                </button>
              </div>
            ) : showPromoInput ? (
              <div className="space-y-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="COUPON CODE"
                    className="flex-grow px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none font-bold text-sm uppercase placeholder:text-gray-300 transition-all"
                  />
                  <button 
                    onClick={applyPromoCode}
                    className="px-6 py-3 bg-[#131921] text-white font-black rounded-xl hover:bg-orange-500 transition-colors text-xs tracking-widest"
                  >
                    APPLY
                  </button>
                </div>
                <button 
                  onClick={() => setShowPromoInput(false)}
                  className="text-[10px] font-bold text-gray-400 hover:text-gray-600 px-2 uppercase tracking-tighter"
                >
                  Close Input ×
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowPromoInput(true)}
                className="group flex items-center justify-between w-full p-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-orange-400 hover:text-orange-500 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <FaTag className="group-hover:rotate-12 transition-transform" />
                  <span className="font-black text-sm uppercase tracking-widest">Have a Promo Code?</span>
                </div>
                <span className="text-xl font-light">+</span>
              </button>
            )}
          </div>
        </div>
        {/* Total Section */}
        <div className="py-2">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Total Payable</div>
              <div className="text-4xl font-black text-[#131921] tracking-tighter tabular-nums italic">
                <small className="text-lg font-bold not-italic mr-1">PKR</small>
                {total.toLocaleString()}
              </div>
            </div>
            {promoDiscount > 0 && (
              <div className="text-right pb-1">
                <div className="bg-orange-100 text-orange-600 text-[10px] font-black px-2 py-1 rounded-md mb-1 uppercase tracking-tighter animate-bounce">
                  Big Saving!
                </div>
                <div className="text-sm font-bold text-green-600 italic">
                  -PKR {promoDiscount.toLocaleString()}
                </div>
              </div>
            )}
          </div>
          <p className="text-[10px] text-gray-400 mt-3 italic font-medium">Prices are inclusive of all local taxes and service charges.</p>
        </div>
        {/* Shining Checkout button */}
        <button 
          onClick={proceedToCheckout}
          disabled={cartItems.length === 0 || isCheckingOut}
          className={`animate-shine w-full py-5 rounded-2xl font-black text-xl uppercase tracking-[0.15em] transition-all relative overflow-hidden ${
            cartItems.length === 0 || isCheckingOut
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#FFD200] via-[#F7941E] to-[#FFD200] text-[#131921] shadow-[0_10px_30px_rgba(247,148,30,0.3)] hover:shadow-[0_15px_40px_rgba(247,148,30,0.4)] hover:-translate-y-1 active:scale-95'
          }`}
        >
          {isCheckingOut ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="w-6 h-6 border-4 border-[#131921] border-t-transparent rounded-full animate-spin"></div>
              <span className="italic">Verifying...</span>
            </div>
          ) : (
            <span className="drop-shadow-sm">Secure Checkout</span>
          )}
        </button> 
        {/* Permanent Storage Notice */}
        <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-start gap-3">
          <div className="bg-white p-1.5 rounded-lg shadow-sm">
             <span className="text-blue-500 text-sm font-bold">🛡️</span>
          </div>
          <div>
            <span className="block text-xs font-black text-blue-800 uppercase tracking-tighter">Vault Protection Active</span>
            <span className="text-[10px] text-blue-600 font-medium leading-tight">
              Your items are permanently saved in ShopSphere vault. They will remain even after checkout.
            </span>
          </div>
        </div>
        {/* Payment methods - Professional Banking Cards */}
        <div className="pt-6 border-t border-gray-100">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] text-center mb-5">Supported Payment Gateways</p>
          <div className="grid grid-cols-4 gap-3 px-2  hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {/* 4 Banking images placeholders as requested */}
            <div className="h-8  border border-white flex items-center justify-center p-1">
              <img src="images/Icons/Visa_logo.svg" alt="Visa" className="h-full" />
            </div>
            <div className="h-8 border border-white flex items-center justify-center p-1">
              <img src="images/Icons/Mastercard-logo.svg" alt="Mastercard" className="h-full" />
            </div>
            <div className="h-8  border border-white flex items-center justify-center p-1">
              <img src="images/Icons/PayPal.svg" alt="Paypal" className="h-full" />
            </div>
            <div className="h-8  border border-white flex items-center justify-center p-1">
              <img src="images/Icons/strip.svg" alt="Stripe" className="h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 </div>
 </div>
 {/** main section end here */}
 {/* Mobile bottom checkout bar */}
{cartItems.length > 0 && (
  <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1)] p-5 z-50 rounded-t-[2.5rem]">
    <div className="flex justify-between items-center max-w-md mx-auto">
      <div className="flex flex-col">
        {/* Item count with premium tracking */}
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
          Cart ({cartItems.length})
        </span>
        <div className="flex flex-col leading-none">
          {/* Price with negative skew for style */}
          <div className="text-2xl font-black text-slate-900 tracking-tighter -skew-x-6">
            <span className="text-xs mr-1 italic text-emerald-500">PKR</span>
            {total.toLocaleString()}
          </div>
          {/* Discount badge with bounce animation */}
          {promoDiscount > 0 && (
            <div className="flex items-center gap-1 mt-1.5">
               <span className="text-[9px] font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                -PKR {promoDiscount.toLocaleString()}
              </span>
            </div>
          )}
        </div>
        {/* Storage status with icon */}
        <div className="text-[9px] text-blue-500 mt-2 font-black uppercase tracking-widest flex items-center gap-1 opacity-80">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
          Cloud Sync Active
        </div>
      </div>
      <motion.button 
        whileTap={{ scale: 0.92 }}
        onClick={proceedToCheckout}
        disabled={isCheckingOut}
        className="relative group overflow-hidden px-10 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.15em] rounded-2xl shadow-xl shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <span className="relative z-10">
          {isCheckingOut ? 'Wait...' : 'Checkout Now'}
        </span>
        {/* Subtle gradient overlay on button */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </motion.button>
    </div>
  </div>
)}
{/* FUTURISTIC STACKED-GLASS TRUST BADGES */}
<div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mt-20 px-3 md:px-16">
  {[
    { icon: <ShieldCheck size={28} />, title: "Secure Vault", desc: "Military Grade", color: "from-blue-500 to-cyan-400" },
    { icon: <Truck size={28} />, title: "Swift Drop", desc: "48h Dispatch", color: "from-orange-500 to-yellow-400" },
    { icon: <RotateCcw size={28} />, title: "7-Day Recall", desc: "Instant Refund", color: "from-emerald-500 to-teal-400" },
    { icon: <LockIcon size={28} />, title: "Privacy Pro", desc: "Data Encrypted", color: "from-purple-500 to-pink-400" },
    { icon: <Star size={28} />, title: "Elite Grade", desc: "Verified Assets", color: "from-amber-500 to-orange-400" }
    ].map((badge, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className="group relative"
    >
      {/* 1. THE REAR LAYER (Jo Image mein right aur bottom se dikh raha hai) */}
      <div className="absolute top-4 left-4 w-full h-full bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/20 shadow-lg transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
      <div className="relative h-full bg-white backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 flex flex-col items-center text-center gap-5 shadow-[15px_15px_40px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 overflow-hidden">  
        <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br ${badge.color}`} />
        {/* Icon Container with Custom Shape */}
        <div className="relative">
          <div className={`absolute inset-0 rounded-2xl blur-md opacity-30 bg-gradient-to-br ${badge.color}`} />
          <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-white shadow-lg transform group-hover:rotate-[15deg] transition-all duration-500`}>
            {badge.icon}
          </div>
        </div>
        {/* Text Details */}
        <div className="space-y-1.5 z-10">
          <h4 className="font-black text-gray-900 text-[11px] uppercase tracking-[0.15em] italic">
            {badge.title}
          </h4>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
            {badge.desc}
          </p>
        </div>
        {/* The Animated Line (Bottom) */}
        <div className="w-full mt-2 h-1 bg-gray-50 rounded-full overflow-hidden">
           <motion.div 
             initial={{ width: "0%" }}
             whileInView={{ width: "40%" }}
             transition={{ duration: 1, delay: 0.5 }}
             className={`h-full rounded-full bg-gradient-to-r ${badge.color}`}
           />
        </div>
        {/* Decorative Corner Notch (Image Detail) */}
        <div className={`absolute bottom-0 right-0 w-8 h-8 opacity-10 bg-gradient-to-tl ${badge.color} rounded-tl-full`} />
      </div>
    </motion.div>
  ))}
</div>

{/**footer section start here */}
<footer className="w-full font-sans mt-20">
{/* Main Footer Section (Dark Green & Sleek) */}
<div className="bg-[#131921] text-white pt-12 pb-6 font-sans">
  <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-10">
    {/* Brand Column */}
    <div className="md:col-span-3 space-y-4">
      <div className="flex items-center gap-2">
        {/* Logo Icon Added */}
        <Zap className="text-white text-2xl" />
        <span className="text-2xl font-black italic tracking-tighter text-emerald-50">ShopSphere</span>
      </div>
      <p className="text-emerald-100/50 text-xs leading-relaxed max-w-xs">
        Premium essentials delivered to your <br/> doorstep.  Join our family today.
      </p>
      {/* Social Icons Updated to 5 */}
      <div className="flex gap-4">
        {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube].map((Icon, i) => (
          <div key={i} className="cursor-pointer text-white hover:text-[#febd69] transition-all hover:-translate-y-1">
            <Icon size={16} />
          </div>
        ))}
      </div>
    </div>
    {/* Navigation Sections (Now 3 Columns for Better Balance) */}
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
      {/* NEW: Company Menu Added */}
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
    {/* Newsletter */}
    <div className="md:col-span-3 space-y-4">
      <h4 className="font-bold text-white text-xs uppercase border-b border-white/10 pb-1">Newsletter</h4>
      <div className="relative flex items-center bg-white/5 rounded-lg border border-white/10 overflow-hidden">
        <input type="email" placeholder="Email" className="bg-transparent px-4 py-2 text-xs outline-none w-full" />
        <button className="bg-[#febd69] text-[#022c22] px-4 py-2 text-[10px] font-black uppercase hover:bg-white transition-all">Go</button>
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
export default Cart_Page;