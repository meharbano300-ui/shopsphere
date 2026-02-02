import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaCheckCircle, FaTruck, FaCreditCard, 
  FaMoneyBillWave, FaLock, FaHome, FaSearch, 
  FaShoppingCart, FaStar, FaStarHalfAlt, FaHeart, 
  FaMapMarkerAlt, FaChevronDown, FaClock, FaBoxOpen, 
  FaInfoCircle, FaFacebookF, FaInstagram, FaTwitter, 
  FaLinkedinIn, FaYoutube, FaStore, FaUser, FaPhone,
  FaEnvelope, FaCity, FaGlobe, FaHome as FaHomeAddress,
  FaTag, FaShieldAlt, FaCalendarAlt, FaIdCard, FaShippingFast
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {MousePointerClick, MessageSquare, Zap, Activity, Cpu, MapPin,
  Music2, Radio, ShoppingBag, Smartphone, Tv, Tags, MousePointer2 
} from 'lucide-react';
import {FaBuilding, FaMapPin, FaMailBulk, FaClipboard, FaHistory, FaHeadset, FaPaperPlane, FaTimes, 
  FaArrowRight, FaCommentDots, FaCheck,    FaFingerprint, FaTicketAlt,
  FaUserShield,   FaFileInvoice, FaReceipt,FaBox
} from "react-icons/fa";
import { FaFire, FaShoppingBag,  } from 'react-icons/fa';
import LoginModal from "./LoginModal";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";


const Checkout_Page = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  const [cartItems, setCartItems] = useState([]);
  // search states here  
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);


//second last footer icons wala section start 
const features = [
  { 
      title: 'Global Delivery', 
      sub: 'Next-gen logistics', 
      icon: 'https://cdn-icons-png.flaticon.com/512/9466/9466304.png', 
      accent: 'from-orange-500 to-orange-300',
      shadow: 'group-hover:shadow-orange-200/50'
    },
  { 
    title: 'Quantum Shield', 
    sub: 'Secure transactions', 
    icon: 'https://cdn-icons-png.flaticon.com/512/2092/2092204.png', 
    accent: 'from-blue-900 to-blue-700',
    shadow: 'group-hover:shadow-blue-200/50'
  },
  { 
      title: 'Elite Support', 
      sub: '24/7 Virtual Concierge', 
      icon: 'https://cdn-icons-png.flaticon.com/512/9498/9498514.png', 
      accent: 'from-orange-600 to-orange-400',
      shadow: 'group-hover:shadow-orange-200/50'
    },
  { 
    title: 'Pure Quality', 
    sub: 'Certified Excellence', 
    icon: 'https://cdn-icons-png.flaticon.com/512/12108/12108157.png', 
    accent: 'from-blue-800 to-blue-600',
    shadow: 'group-hover:shadow-blue-200/50'
  },
  { 
    title: 'Fluid Returns', 
    sub: '30-Day Ecosystem', 
    icon: 'https://cdn-icons-png.flaticon.com/512/3502/3502154.png', 
    accent: 'from-orange-400 to-yellow-500',
    shadow: 'group-hover:shadow-orange-100/50'
  },
];
//second last footer icons wala section end 

// promo code ky lieye states
  const [showPromo, setShowPromo] = useState(false);   
  // Form States
  const [formData, setFormData] = useState({
    fullName: "", 
    phone: "", 
    email: "",
    city: "", 
    address: "", 
    postalCode: "",
    paymentMethod: "cod",
    saveInfo: false
  });
  // Payment method options
  const paymentMethods = [
    { id: 'cod', name: 'Cash on Delivery', icon: <FaMoneyBillWave className="text-green-600" />, color: 'green' },
    { id: 'card', name: 'Credit/Debit Card', icon: <FaCreditCard className="text-blue-600" />, color: 'blue' },
    { id: 'bank', name: 'Bank Transfer', icon: <FaIdCard className="text-purple-600" />, color: 'purple' },
    { id: 'easypaisa', name: 'EasyPaisa', icon: <FaPhone className="text-teal-600" />, color: 'teal' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("shopSphereCart");
    if (saved) setCartItems(JSON.parse(saved));
    else navigate("/cart"); 
  }, [navigate]);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const delivery = subtotal > 15000 ? 0 : 2000; 
  const shippingFee = 2000;
  const tax = subtotal * 0.05;
  const total = subtotal + shippingFee + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };
  const handlePlaceOrder = () => {
    setStep(3);
    localStorage.removeItem("shopSphereCart"); 
    window.dispatchEvent(new Event("storage"));
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans ">
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

 {/*  CHECKOUT CONTENT  */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Progress Steps header kay neechay steps */}
        <div className="mb-10">
          <div className="flex items-center justify-center mb-6">
            <div className={`flex items-center ${step >= 1 ? 'text-orange-500' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>
                {step > 1 ? <FaCheckCircle size={18} /> : <span className="font-bold">1</span>}
              </div>
              <div className="ml-3">
                <p className="font-bold text-sm">Shipping</p>
                <p className="text-xs">Address details</p>
              </div>
            </div>
            <div className={`w-32 h-1 mx-4 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-orange-500' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>
                {step > 2 ? <FaCheckCircle size={18} /> : <span className="font-bold">2</span>}
              </div>
              <div className="ml-3">
                <p className="font-bold text-sm">Payment</p>
                <p className="text-xs">Choose payment</p>
              </div>
            </div>
            <div className={`w-32 h-1 mx-4 ${step >= 3 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${step >= 3 ? 'text-orange-500' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>
                <span className="font-bold">3</span>
              </div>
              <div className="ml-3">
                <p className="font-bold text-sm">Confirmation</p>
                <p className="text-xs">Review order</p>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {step < 3 ? (
            <motion.div 
              key="checkout"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid lg:grid-cols-12 gap-4"
            >           
  {/* Left Side:  Shipping Form */}
<div className="lg:col-span-8 space-y-3">
  <motion.div 
    className="relative bg-gradient-to-br from-white via-white to-gray-50/80 backdrop-blur-xl rounded-[17px] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] border border-white/60 overflow-hidden"
    whileHover={{ y: -4, transition: { duration: 0.3 } }}
  >
    {/* Animated Accent Line */}
    <div className={`absolute top-0 left-0 w-2 h-full ${step === 1 ? 'bg-gradient-to-b from-orange-500 to-amber-500' : 'bg-gradient-to-b from-green-500 to-emerald-500'} transition-all duration-700`} />
    <div className="p-6 md:p-8">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-12 p-2 font-jakarta">
      {/* Left Side: Icon & Titles */}
     <div className="flex items-center gap-6 group">
     <div className="relative">
      <div className="absolute -inset-2 bg-orange-500/20 rounded-2xl blur-xl group-hover:bg-orange-500/40 transition-all duration-500"></div>
      <motion.div 
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 0, scale: 1 }}
        className="relative bg-gradient-to-br from-slate-900 via-black to-slate-800 p-4 rounded-2xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] border border-white/10"
      >
        <FaTruck className="text-orange-500 text-2xl drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
      </motion.div>
    </div>
    <div className="space-y-1">
      <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight font-syncopate">
        SHIPPING <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600 drop-shadow-sm">DETAILS</span>
      </h2>
      <div className="flex items-center gap-2">
        <span className="h-[2px] w-8 bg-orange-500 rounded-full"></span>
        <p className="text-slate-400 text-[11px] font-bold tracking-[0.25em] uppercase">
          Delivery Logistics
        </p>
       </div>
      </div>
      <div className=" flex h-4 w-4 relative top-[-10px] left-[-10px]">
      <span className="animate-ping absolute   inline-flex h-full w-full rounded-full bg-emerald-400 opacity-55"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
    </div>
  </div>
  {/* Right Side: Blinking Edit Button */}
  {step === 2 && (
    <motion.button 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px -5px rgba(249, 115, 22, 0.2)" }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setStep(1)} 
      className="animate-blink relative group flex items-center gap-3 px-6 py-3 bg-white border border-orange-100 rounded-[15px] text-orange-600 shadow-sm overflow-hidden"
    >
  {/* Inner Hover Slide Effect */}
   <div className="absolute inset-0 w-0 bg-orange-50 group-hover:w-full transition-all duration-300 ease-out"></div>
      <span className="relative z-10 flex items-center gap-2 font-black text-[11px] uppercase tracking-widest">
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
        Edit Info
      </span>
      {/* Small Notification Dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
      </span>
    </motion.button>
  )}
</div>
      {step === 1 ? (
        <div className="space-y-6">
          {/* Row 1: Name & Phone */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="group space-y-2">
              <label className="flex items-center gap-2 font-bold font-extrabold tracking-tight leading-tight font-syncopate text-xs text-gray-500 uppercase tracking-wider ml-1">
                <FaUser size={12} className="text-orange-500" /> Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 group-focus-within:text-orange-500 transition-colors">
                  <FaUser />
                </div>
                <input 
                  type="text" 
                  name="fullName" 
                  placeholder="FULL NAME" 
                  onChange={handleInputChange} 
                  value={formData.fullName}
                  className="flex items-center gap-2 text-slate-400 font-bold tracking-tight leading-tight  text-xs uppercase tracking-wider  w-full pl-12 pr-10 py-4  border border-slate-100 border border-slate-200  rounded-[10px]  outline-none focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 transition-all appearance-none cursor-pointer shadow-sm hover:border-slate-300"
                />
              </div>
            </div>
            <div className="group space-y-2">
              <label className="flex items-center gap-2 font-bold font-extrabold tracking-tight leading-tight font-syncopate text-xs text-gray-500 uppercase tracking-wider ml-1">
                <FaPhone size={12} className="text-orange-500" /> Phone Number
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 group-focus-within:text-orange-500 transition-colors">
                  <FaPhone />
                </div>
                <input 
                  type="text" 
                  name="phone" 
                  placeholder="+92 XXXXXXX" 
                  onChange={handleInputChange} 
                  value={formData.phone}
                  className="flex items-center gap-2 text-slate-400 font-bold tracking-tight leading-tight  text-xs uppercase tracking-wider  w-full pl-12 pr-10 py-4  border border-slate-100 border border-slate-200  rounded-[10px] outline-none focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 transition-all appearance-none cursor-pointer shadow-sm hover:border-slate-300"
                />
              </div>
            </div>
          </div>
          {/* Email */}
          <div className="group space-y-2">
            <label className="flex items-center gap-2 font-bold font-extrabold tracking-tight leading-tight font-syncopate text-xs text-gray-500 uppercase tracking-wider ml-1">
              <FaEnvelope size={12} className="text-orange-500" /> Email Address
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 group-focus-within:text-orange-500 transition-colors">
                <FaEnvelope />
              </div>
              <input 
                type="email" 
                name="email" 
                placeholder="Email@example.com" 
                onChange={handleInputChange} 
                value={formData.email}
                className="flex items-center gap-2 text-slate-400 font-bold tracking-tight leading-tight  text-xs uppercase tracking-wider  w-full pl-12 pr-10 py-4  border border-slate-100 border border-slate-200  rounded-[10px] outline-none focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 transition-all appearance-none cursor-pointer shadow-sm hover:border-slate-300"
              />
            </div>
          </div>
          {/* Location Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="font-bold font-extrabold tracking-tight leading-tight font-syncopate text-xs text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-2">
                <FaGlobe size={12} className="text-orange-500" /> Country
              </label>
             <div className="space-y-2 group">
  <div className="relative">
    {/* Left Icon (Globe) */}
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 group-focus-within:scale-110 transition-all duration-300 z-10 pointer-events-none">
      <FaGlobe />
    </div>
    <select 
      name="country" 
      onChange={handleInputChange} 
      value={formData.country}
      // Dynamic Color: Agar value khali hai toh gray color, warna dark text
      className={`flex items-center gap-2 font-bold tracking-tight leading-tight  text-xs uppercase tracking-wider  w-full pl-12 pr-10 py-4  border border-slate-100 border border-slate-200  rounded-[10px]  outline-none focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 transition-all appearance-none cursor-pointer shadow-sm hover:border-slate-300 ${
        formData.country === "" ? "text-gray-200" : "text-gray-300"
      }`}
    >
      {/* Placeholder Option */}
      <option value="Country" className="">Select Country</option>
      <option value="Pakistan" className="font-bold text-slate-700">🇵🇰 Pakistan</option>
      <option value="USA" className="font-bold text-slate-700">🇺🇸 America</option>
      <option value="UAE" className="font-bold text-slate-700">🇦🇪 Dubai (UAE)</option>
      <option value="India" className="font-bold text-slate-700">🇮🇳 India</option>
      <option value="Germany" className="font-bold text-slate-700">🇩🇪 Germany</option>
      <option value="Turkey" className="font-bold text-slate-700">🇹🇷 Turkey</option>
    </select>
    {/* Right Custom Arrow Icon */}
    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-400 pointer-events-none transition-transform group-focus-within:rotate-180 duration-300">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  </div>
</div>
    </div>
         <div className="space-y-2">
              <label className="font-bold font-extrabold tracking-tight leading-tight font-syncopate text-xs text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-2">
                <FaMapMarkerAlt size={12} className="text-orange-500" /> State
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300">
                  <FaMapMarkerAlt />
                </div>
                <input 
                  type="text" 
                  name="state" 
                  placeholder="STATE" 
                  onChange={handleInputChange} 
                  value={formData.state}
                  className="flex items-center gap-2 text-slate-400 font-bold tracking-tight leading-tight  text-xs uppercase tracking-wider  w-full pl-12 pr-10 py-4  border border-slate-100 border border-slate-200  rounded-[10px]  outline-none focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 transition-all appearance-none cursor-pointer shadow-sm hover:border-slate-300 "
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-bold font-extrabold tracking-tight leading-tight font-syncopate text-xs text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-2">
                <FaCity size={12} className="text-orange-500" /> City
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300">
                  <FaCity />
                </div>
                <input 
                  type="text" 
                  name="city" 
                  placeholder="CITY" 
                  onChange={handleInputChange} 
                  value={formData.city}
                  className="flex items-center gap-2 text-slate-400 font-bold tracking-tight leading-tight  text-xs uppercase tracking-wider  w-full pl-12 pr-10 py-4  border border-slate-100 border border-slate-200  rounded-[10px]  outline-none focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 transition-all appearance-none cursor-pointer shadow-sm hover:border-slate-300"
                />
              </div>
            </div>
          </div>
          {/* Address Row */}
          <div className="grid md:grid-cols-4 gap-5">
            <div className="md:col-span-1 space-y-2">
              <label className="font-bold font-extrabold tracking-tight leading-tight font-syncopate text-xs text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-2">
                <FaMailBulk size={12} className="text-orange-500" /> ZIP Code
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300">
                  <FaMailBulk />
                </div>
                <input 
                  type="text" 
                  name="postalCode" 
                  placeholder="CITY CODE" 
                  onChange={handleInputChange} 
                  value={formData.postalCode}
                  className="flex items-center gap-2 text-slate-400 font-bold tracking-tight leading-tight  text-xs uppercase tracking-wider  w-full pl-12 pr-10 py-4  border border-slate-100 border border-slate-200  rounded-[10px] outline-none focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 transition-all appearance-none cursor-pointer shadow-sm hover:border-slate-300"
                />
              </div>
            </div>
            <div className="md:col-span-3 space-y-2">
              <label className="flex items-center gap-2 font-bold font-extrabold tracking-tight leading-tight font-syncopate text-xs text-gray-500 uppercase tracking-wider ml-1">
                <FaMapMarkerAlt size={12} className="text-orange-500" /> Complete Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-4 text-gray-300">
                  <FaMapMarkerAlt />
                </div>
                <input 
                  type="text" 
                  name="address" 
                  placeholder="House #123, Street #4, Sector G" 
                  onChange={handleInputChange} 
                  value={formData.address}
                  className="flex items-center gap-2 text-slate-400 font-bold tracking-tight leading-tight  text-xs uppercase tracking-wider  w-full pl-12 pr-10 py-4 border border-slate-200  rounded-[10px] border border-gray-500  outline-none focus:bg-white focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 transition-all appearance-none cursor-pointer shadow-sm hover:border-slate-300"
                />
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="group space-y-2">
            <label className="font-bold font-extrabold tracking-tight leading-tight font-syncopate text-xs text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-2">
              <FaClipboard size={12} className="text-orange-500" /> Special Instructions
            </label>
            <div className="relative">
              <div className="absolute left-4 top-4 text-gray-300">
                <FaClipboard />
              </div>
              <textarea 
                name="description" 
                rows="2" 
                placeholder="Any delivery notes or special instructions..."
                onChange={handleInputChange} 
                value={formData.description}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none font-medium text-gray-700 placeholder:text-gray-300 shadow-sm hover:border-gray-300"
              ></textarea>
            </div>
          </div>
      {/* Dynamic Button: Orange to Black  */}
            <motion.button 
            whileHover={{ scale: 1.02, translateY: -2 }}
             whileTap={{ scale: 0.98 }}
             disabled={!formData.fullName || !formData.address || !formData.phone}
            onClick={() => setStep(2)} 
            className={`relative group w-full py-5 rounded-2xl font-syncopate text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-4 overflow-hidden transition-all duration-700 shadow-2xl
            ${!formData.fullName || !formData.address || !formData.phone 
            ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-orange-500/30' // Detail se pehle Orange
           : 'bg-gradient-to-r from-slate-900 via-gray-800 to-black text-white shadow-black/40' 
             }`}
             >
           <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
           <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-full transition-all duration-1000 ease-in-out"></div>
  
            <span className="relative z-10 flex items-center gap-3 font-black">
            {!formData.fullName || !formData.address || !formData.phone 
            ? 'Fill Details to Continue' 
            : 'Proceed to Payment'
             }
             <FaArrowRight className={`transition-transform duration-300 group-hover:translate-x-2 ${
            !formData.fullName || !formData.address || !formData.phone ? 'text-white' : 'text-orange-400'
             }`} />
             </span>
            {formData.fullName && formData.address && formData.phone && (
             <motion.div 
             initial={{ scale: 0 }} 
             animate={{ scale: 1 }} 
             className="absolute right-6 bg-green-500 p-1 rounded-full text-[8px]"
              >
            <FaCheck className="text-white" />
           </motion.div>
            )}
          </motion.button>
        </div>
      ) : (

        /* Step 2: Compact Confirmation Card */
        <motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-5 md:p-6 rounded-[1rem] text-white shadow-2xl border border-white/10 overflow-hidden font-jakarta"
>
  {/* Multi-Icon Background Pattern */}
  <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
    <FaShippingFast size={180} className="absolute -top-10 -right-10 rotate-12" />
    <FaGlobe size={120} className="absolute top-1/2 -left-10 -translate-y-1/2 " />
    <FaShieldAlt size={100} className="absolute -bottom-8 right-20 rotate-5" />
    <div className="absolute top-20 left-1/4 w-32 h-32 bg-orange-500/20 blur-[80px] rounded-full"></div>
   </div>
  <div className="relative z-10">
    {/* Header Section */}
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-5 border-b border-white/10 pb-5">
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="absolute inset-0 bg-orange-500 blur-lg opacity-40 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-orange-500 to-amber-600 p-4 rounded-2xl shadow-2xl transform ">
            <FaCheck className="text-white text-2xl" />
          </div>
        </div>
        <div>
          <h3 className="font-syncopate text-xl font-black tracking-tighter text-white uppercase leading-none">
            Shipping <span className="text-orange-400 text-xl">Confirmed</span>
          </h3>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">Order Batch #9921-A</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="flex items-center gap-2 text-[10px] bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/20 font-black uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
          Verified Address
        </span>
      </div>
    </div>
    {/* Content Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Personal Info */}
      <div className="space-y-6">
        <div>
          <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">Receiver Name</p>
          <p className="text-2xl font-black font-syncopate tracking-tight text-white/90">
            {formData.fullName}
          </p>
        </div>
        <div className="flex flex-wrap gap-1">
          <div className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-xl border border-white/5 group hover:bg-white/10 transition-colors">
            <FaPhone className="text-orange-400 text-xs" />
            <span className="text-sm font-bold tracking-tight text-slate-200">{formData.phone}</span>
          </div>
          <div className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-xl border border-white/5 group hover:bg-white/10 transition-colors">
            <FaEnvelope className="text-orange-400 text-xs" />
            <span className="text-sm font-bold tracking-tight text-slate-200">{formData.email}</span>
          </div>
        </div>
      </div>
      {/* Address Details */}
      <div className="relative group">
        <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-3 flex items-center gap-2">
          <FaGlobe className="text-[10px]" /> Destination details
        </p>
        <div className="p-3 bg-gradient-to-br from-white/5 to-transparent rounded-[1rem] border border-white/10 shadow-inner group-hover:border-orange-500/30 transition-all duration-500">
          <p className="text-sm font-bold leading-relaxed text-slate-300 font-jakarta">
            {formData.address}
            <span className="block mt-2 text-white/90 text-base">
              {formData.city}, {formData.state}
            </span>
            <span className="block mt-1 text-orange-400/80 uppercase text-[11px] tracking-widest">
              {formData.country} — {formData.postalCode}
            </span>
          </p>
        </div>
      </div>
    </div>
    {/* Special Instructions Footer */}
    {formData.description && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 flex items-start gap-4 text-sm text-amber-200/80 bg-gradient-to-r from-amber-500/10 to-transparent p-4 rounded-2xl border-l-4 border-amber-500/50 italic font-medium"
      >
        <FaInfoCircle className="mt-1 flex-shrink-0 text-amber-400" />
        <div className="flex flex-col">
          <span className="not-italic text-[9px] font-black uppercase tracking-widest text-amber-500">Notes for Courier:</span>
          "{formData.description}"
        </div>
      </motion.div>
    )}
  </div>
</motion.div>
)}

     {/*bank card Methods Icons  */}
      {step === 1 && (
      <div className="mt-2 pt-6  relative">
    
     {/* Security Shield Badge */}
   <div className="flex justify-center mb-4 ">
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="group flex items-center gap-3 px-5 py-1  rounded-full hover:shadow-emerald-500/10 transition-all duration-500"
  >
    {/* Animated Shield Icon */}
    <div className="relative ">
      <div className="absolute -inset-1 bg-emerald-400/20 rounded-full blur group-hover:bg-emerald-400/40 transition-all"></div>
      <FaShieldAlt className="relative text-emerald-600 text-lg group-hover:scale-110 transition-transform duration-300" />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.15em] leading-none font-jakarta">
        Secure Payment Transaction
      </span>
    </div>
  </motion.div>
   </div>
    <div className="flex flex-wrap justify-center gap-6 items-center">
      {[
        { name: 'Visa', url: 'images/Icons/Visa_logo.svg' },
        { name: 'Mastercard', url: 'images/Icons/Mastercard-logo.svg' },
        { name: 'Amex', url: 'images/Icons/strip.svg' },
        { name: 'PayPal', url: 'images/Icons/PayPal.svg' },
        { name: 'ApplePay', url: 'images/Icons/mastercard-6.svg' }
      ].map((method) => (
        <motion.div 
          key={method.name} 
          whileHover={{ y: -5, scale: 1.1 }}
          className="group relative w-16 h-10 flex items-center justify-center p-2 transition-all duration-300 hover:border-orange-200 hover:shadow-orange-500/10 hover:bg-white"
        >
          {/* Brand Image */}
          <img 
            src={method.url} 
            alt={method.name} 
            className={`max-w-full max-h-full object-contain filter transition-all duration-300 ${
              method.name === 'ApplePay' || method.name === 'Amex' ? ' group-hover:grayscale-0' : ''
            }`}
          />
          {/* Subtle Glow on Hover */}
          <div className="absolute inset-0 bg-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </motion.div>
      ))}
    </div>
    {/* Security Note */}
    <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 font-bold text-[9px] uppercase tracking-widest">
      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
      End-to-End Encrypted & Secure
    </div>
  </div>
)}
    </div>
  </motion.div>

{/* Payment Method - Compact Design */}
{step === 2 && (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative bg-gradient-to-br from-white via-white to-gray-50/80 backdrop-blur-xl rounded-[20px] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] border border-white/60 overflow-hidden font-jakarta"
  >
    {/* Animated Accent */}
    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-cyan-500"></div>
    <div className="p-6 md:p-10">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-gradient-to-br from-[#131921] to-gray-900 p-3.5 rounded-xl  hover:rotate-0 transition-transform duration-400 shadow-lg">
          <FaCreditCard className="text-blue-400 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight leading-none font-syncopate uppercase">
            Payment <span className="text-blue-500">Method</span>
          </h2>
          <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase mt-1 font-jakarta">
            Secure Payment Options
          </p>
        </div>
      </div>
      {/* Compact Payment Options */}
      <div className="space-y-2 mb-6">
        {paymentMethods.map((method) => (
          <motion.label 
            key={method.id}
            whileHover={{ scale: 1.01, x: 5 }}
            whileTap={{ scale: 0.99 }}
            className={`relative flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all duration-300 group font-jakarta
              ${formData.paymentMethod === method.id 
                ? `border-blue-500 bg-blue-50/50 shadow-[0_5px_20px_-5px_rgba(59,130,246,0.2)]` 
                : 'border-gray-200 hover:border-blue-300 bg-white'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg transition-all duration-300
                ${formData.paymentMethod === method.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100'}`}>
                {method.icon}
              </div>
              <div>
                <div className={`font-extrabold text-sm tracking-tight ${formData.paymentMethod === method.id ? 'text-gray-800' : 'text-gray-600'}`}>
                  {method.name}
                </div>
                <p className="text-[11px] font-semibold text-gray-400 mt-0.5 tracking-tight">
                  {method.id === 'cod' && 'Pay when item arrives'}
                  {method.id === 'card' && 'Credit/Debit Card'}
                  {method.id === 'bank' && 'Bank Transfer'}
                  {method.id === 'easypaisa' && 'Mobile Payment'}
                </p>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <input 
                type="radio" 
                name="paymentMethod" 
                value={method.id} 
                checked={formData.paymentMethod === method.id}
                onChange={handleInputChange}
                className="sr-only" 
              />
              <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center
                ${formData.paymentMethod === method.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300 group-hover:border-blue-400'}`}>
                {formData.paymentMethod === method.id && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </div>
            </div>
          </motion.label>
        ))}
      </div>
      {/* Security Badges - Compact */}
      <div className="bg-gradient-to-br from-gray-900 to-[#131921] p-5 rounded-[10px] border border-white/10 mb-8 shadow-lg font-jakarta">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1.5 h-6 bg-green-500 rounded-[5px]"></div>
          <h3 className="font-extrabold text-white text-sm tracking-wider uppercase">Secure Payment</h3>
        </div>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-jakarta">
  {[
    { icon: <FaLock size={14} />, text: "SSL Secure", color: "text-green-400" },
     { icon: <FaFingerprint size={14} />, text: "Biometric", color: "text-orange-400" },
    { icon: <FaShieldAlt size={14} />, text: "PCI DSS", color: "text-blue-400" },
    { icon: <FaCheckCircle size={14} />, text: "Verified", color: "text-emerald-400" },
    { icon: <FaUserShield size={14} />, text: "Privacy", color: "text-purple-400" },
    { icon: <FaCreditCard size={14} />, text: "3D Secure", color: "text-cyan-400" },
    { icon: <FaClock size={14} />, text: "24/7 Monitoring", color: "text-rose-400" },
    { icon: <FaFileInvoice size={14} />, text: "Authentic", color: "text-amber-400" }
  ].map((badge, idx) => (
    <motion.div 
      key={idx} 
      whileHover={{ y: -2, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
      className="flex items-center gap-2.5 p-3 rounded-[5px] bg-white/5 border border-white/5 transition-all duration-300"
    >
      <div className={`${badge.color} drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]`}>
        {badge.icon}
      </div>
      <span className="text-[9px] font-black text-gray-300 tracking-widest uppercase leading-none">
        {badge.text}
      </span>
    </motion.div>
  ))}
</div>
     </div>
      {/* Place Order Button */}
      <motion.button 
        whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePlaceOrder}
        className="relative group w-full bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white py-5 rounded-xl overflow-hidden transition-all duration-500 shadow-lg font-syncopate"
      >
        <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-full transition-all duration-700 ease-in-out"></div>
        <span className="relative z-10 flex items-center justify-center gap-3 font-bold text-[11px] tracking-[0.2em]">
          <FaLock className="text-blue-400" /> 
          Complete Order • PKR {total.toLocaleString()}
        </span>
      </motion.button>
      <p className="text-center text-gray-400 text-[9px] font-bold mt-4 flex items-center justify-center gap-2 opacity-70 font-jakarta uppercase tracking-widest">
        <FaShieldAlt size={10} className="text-green-500" /> 
        100% Secure & Encrypted Payment
      </p>
    </div>
  </motion.div>
  )}
</div>

{/* Order Summary - Premium Light Theme */}
<div className="lg:col-span-4">
  <div className="bg-white rounded-[1rem] shadow-2xl border border-gray-100 sticky top-24 overflow-hidden">
    {/* Dark Header Section */}
    <div className="p-8 bg-[#0F172A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="relative z-10 flex items-center gap-4">
        <div className="bg-orange-500 p-2.5 rounded-lg shadow-lg shadow-orange-500/20">
          <FaReceipt className="text-white text-xl" />
        </div>
        <div>
          <h3 className="font-black text-2xl tracking-tight text-white uppercase italic">
            Order <span className="text-orange-500 italic">Logistics</span>
          </h3>
          <p className="text-gray-400 text-[10px] font-bold tracking-[0.15em] uppercase">
           YOUR ORDER REVIEW
          </p>
        </div>
      </div>
    </div>
    <div className="p-8">
      <div className="space-y-4">
        {/* CART ITEMS SECTION (IMAGE + TITLE + RATING + PRICE)  */}
        <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar space-y-3 mb-5">
          {cartItems.map((item, index) => (
            <div key={index} className="flex gap-4 bg-gray-50/50 p-2 rounded-2xl border border-gray-100 group hover:border-orange-200 transition-colors items-start"> 
              {/* Left: Image with Quantity Badge */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[11px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-md z-20">
                  {item.quantity || 1}
                </span>
              </div>
              {/* Right: Title (Top) and Rating/Price (Bottom) */}
              <div className="flex flex-col justify-between flex-1 min-w-0 min-h-[80px]">
                <div>
                  <h4 className="font-black text-gray-800 text-[13px] leading-tight uppercase tracking-tight line-clamp-2">
                    {item.name}
                    {item.title}
                  </h4>
                </div>
                {/* Bottom Row: Rating & Price */}
                <div className="flex justify-between items-end ">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4].map((star) => (
                      <span key={star} className="text-yellow-400 text-[16px]">★</span>
                    ))}
                    <span className="text-gray-300 text-[16px]">★</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-gray-900 text-[14px] tracking-tight">
                      PKR {item.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* --- END CART ITEMS SECTION --- */}


       {/* --- PROMO SECTION --- */}
        <div className="py-2">
          <div 
            onClick={() => setShowPromo(!showPromo)}
            className={`group cursor-pointer border-2 border-dashed rounded-2xl p-4 flex items-center justify-between transition-all ${showPromo ? 'border-orange-500 bg-orange-50/30' : 'border-gray-200 hover:border-orange-400'}`}
          >
            <div className="flex items-center gap-3">
              <FaTicketAlt className={`transition-transform duration-300 rotate-[-45deg] ${showPromo ? 'text-orange-600 scale-110' : 'text-gray-400 group-hover:text-orange-500'}`} />
              <span className={`font-black text-xs uppercase tracking-widest transition-colors ${showPromo ? 'text-orange-700' : 'text-gray-400 group-hover:text-orange-600'}`}>
                {showPromo ? 'Entering Promo Code...' : 'Have a promo code?'}
              </span>
            </div>
            <span className={`text-xl font-light transition-transform duration-300 ${showPromo ? 'rotate-45 text-orange-600' : 'text-gray-300'}`}>+</span>
          </div>
          <AnimatePresence>
            {showPromo && (
              <motion.div 
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="ENTER CODE"
                    className="flex-1 bg-gray-50 border-2 border-gray-100 p-3 rounded-xl text-xs font-black tracking-widest focus:border-orange-500 outline-none transition-all uppercase"
                  />
                  <button className="px-6 bg-[#0F172A] text-white text-[10px] font-black rounded-xl hover:bg-orange-600 transition-colors shadow-lg">
                    APPLY
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Total Payable Section */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em] mb-1">Total Payable</p>
          <div className="flex items-baseline gap-2">
             <span className="text-gray-900 font-black text-xl italic uppercase">PKR</span>
             <h2 className="text-5xl font-black text-gray-900 leading-none tracking-tighter italic">
                {total.toLocaleString()}
             </h2>
          </div>
          <p className="text-[10px] text-gray-400 mt-4 italic font-medium">Prices are inclusive of all local taxes and service charges.</p>
        </div>
        {/* Arrival Card */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 mt-2">
          <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100">
            <FaClock className="text-orange-500" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Est. Delivery Arrival</p>
            <p className="text-sm font-black text-gray-800">
               {new Date(Date.now() + 5*24*60*60*1000).toLocaleDateString('en-PK', { weekday: 'long', day: 'numeric', month: 'short' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</motion.div>
 ) : (
             
   /* order confirmed: step 3 */
    <motion.div 
       initial={{ opacity: 0, scale: 0.8 }} 
       animate={{ opacity: 1, scale: 1 }}
       className="max-w-[550px] mx-auto"
            >
   {/* Order Confirmed Section */}
  <div className="bg-white rounded-[15px] text-center shadow-1xl border-2 border-gray-100 overflow-hidden font-jakarta">
  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white relative">
    {/* Background Decorative Icon */}
    <FaCheckCircle className="absolute top-5 right-5 text-white/10 text-9xl rotate-12" />
    <div className="bg-white/20 backdrop-blur-md w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/40 shadow-inner">
      <FaCheckCircle className="text-white text-6xl drop-shadow-lg" />
    </div>
    <h1 className="text-4xl font-black mb-2 font-syncopate tracking-tighter italic uppercase skew-x-[-10deg]">
      Order Confirmed! 
    </h1>
    <p className="text-white/90 text-sm font-bold tracking-widest uppercase opacity-70">
      Thank you for your purchase
    </p>
  </div>
  <div className="p-4">
    <div className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-[12px] p-4 mb-4 border-2 border-dashed border-green-200/60 relative">
      <h3 className="font-black text-gray-400 text-[10px] uppercase tracking-[0.5em] mb-6 flex items-center justify-center gap-3">
        <FaBoxOpen className="text-green-600 text-lg" /> Receipt Details
      </h3>
      <div className="space-y-2">
        <p className="flex justify-between items-center border-b border-green-100 pb-2">
          <span className="text-[10px] font-black text-semibold text-gray-400 uppercase tracking-tighter">Order ID</span> 
          <span className="font-mono font-bold text-gray-800 bg-white px-3 py-1 rounded-lg shadow-sm text-xs">
            #{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </span>
        </p>
        <p className="flex justify-between items-center border-b border-green-100 pb-2">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Customer</span> 
          <span className="font-black text-gray-700 text-lg italic tracking-tight">{formData.fullName}</span>
        </p>
        <p className="flex justify-between items-center border-b border-green-100 pb-2">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Total Paid</span> 
          <span className="font-black text-3xl text-green-600 tracking-tighter">
            <span className="text-xs mr-1">PKR</span>{total.toLocaleString()}
          </span>
        </p>
        <p className="flex justify-between items-center border-b border-green-100 pb-2">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter italic">Method</span> 
          <span className="font-bold text-orange-400 text-xs  px-3 py-1  uppercase">
            {formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment'}
          </span>
        </p>
        <p className="flex justify-between items-center">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Estimated Arrival</span> 
          <span className="font-black text-blue-600 text-xs flex items-center gap-2">
            <FaTruck className="text-[10px]" />
            {new Date(Date.now() + 5*24*60*60*1000).toLocaleDateString('en-PK', { weekday: 'short', day: 'numeric', month: 'short' })}
          </span>
        </p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3 mb-4">
      <div className="bg-blue-50/50 p-4 rounded-[12px] border border-blue-100 hover:bg-blue-50 transition-colors group cursor-pointer">
        <FaTruck className="text-blue-500 text-2xl mx-auto mb-2 group-hover:translate-x-2 transition-transform" />
        <h4 className="font-black text-[10px] uppercase text-blue-700 tracking-[0.2em]">Track Order</h4>
        <p className="text-[9px] font-bold text-blue-400 mt-1 uppercase">Live Status</p>
      </div>
      <div className="bg-orange-50/50 p-4 rounded-[12px] border border-orange-100 hover:bg-orange-50 transition-colors group cursor-pointer">
        <FaPhone className="text-orange-500 text-2xl mx-auto mb-2 group-hover:rotate-12 transition-transform" />
        <h4 className="font-black text-[10px] uppercase text-orange-700 tracking-[0.2em]">Support</h4>
        <p className="text-[9px] font-bold text-orange-400 mt-1 uppercase">+92 300 1234567</p>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row gap-3">
      <motion.button 
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/Product_Listing")} 
        className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-5 rounded-[15px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-200 transition-all"
      >
        Continue Shopping
      </motion.button>
      <motion.button 
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/")} 
        className="flex-1 bg-gray-900 text-white py-5 rounded-[15px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-gray-300 transition-all border border-gray-700"
      >
        Finish Orders
      </motion.button>
    </div>
    <p className="text-gray-500 text-[11px] mt-7 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
      <span className="w-8 h-[1px] bg-gray-200"></span>
      Sent to: <span className="text-gray-800 underline decoration-green-400 underline-offset-4">{formData.email}</span>
      <span className="w-8 h-[1px] bg-gray-200"></span>
    </p>
  </div>
</div>
</motion.div> 
 )}
</AnimatePresence>
 </div>


{/**footer section start here */}
<footer className="w-full font-sans">
  <div className="relative bg-[#ffffff] py-18   overflow-hidden  md:-translate-y- transform">
  {/* Dynamic Background Elements */}
  <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-gradient-to-br from-orange-100/30 to-transparent rounded-full blur-[120px] pointer-events-none"></div>
  <div className="absolute bottom-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-gradient-to-tl from-blue-100/40 to-transparent rounded-full blur-[120px] pointer-events-none"></div>
  <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="relative group cursor-pointer">
          <div className={`absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[2.2rem] bg-gradient-to-br ${feature.accent} opacity-20 transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:opacity-30`}></div>
          <div className="relative z-10 p-4 rounded-[2.2rem] bg-white border-2 border-slate-100 transition-all duration-500 
                        group-hover:-translate-x-1 group-hover:-translate-y-1 active:translate-x-1 active:translate-y-1
                        shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col items-center sm:items-start space-y-5">
              
              {/* Icon Section */}
              <div className="relative">
                <div className={`absolute -inset-2 rounded-full bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-10 blur-xl transition-all duration-700`}></div>
                <div className="relative w-18 h-18 flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden transition-all duration-500 group-hover:bg-white group-hover:rotate-3">
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/80 to-transparent"></div>
                  <img 
                    src={feature.icon} 
                    className="w-10 h-10 object-contain z-10 transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110" 
                    alt={feature.title}
                  />
                </div>
              </div>
              {/* Typography Section */}
              <div className="space-y-2 text-center sm:text-left">
                <h4 className="font-black text-[#001d3d] text-[13px] md:text-[14px] uppercase tracking-widest transition-colors duration-300 group-hover:text-orange-600">
                  {feature.title}
                </h4>
                <div className="flex flex-col">
                  <p className="text-slate-400 text-[10px] md:text-[11px] font-bold leading-tight group-hover:text-slate-600 transition-colors">
                    {feature.sub}
                  </p>
                  {/* Progress Line */}
                  <div className="w-10 h-[3px] bg-slate-100 rounded-full mt-3 overflow-hidden">
                    <div className={`h-full w-0 group-hover:w-full bg-gradient-to-r ${feature.accent} transition-all duration-700`}></div>
                  </div>
                </div>
              </div>
              {/* Decorative "Plus" sign */}
              <div className="absolute top-4 right-4 text-slate-200 group-hover:text-orange-300 transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
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
    {/* Newsletter (Width automatically reduced due to col-span-3) */}
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
export default Checkout_Page;