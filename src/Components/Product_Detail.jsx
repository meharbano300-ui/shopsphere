import React, { useState, useEffect } from 'react';
import {FaArrowLeft, FaStar, FaTruck, FaShieldAlt, FaHeart, 
  FaShoppingCart, FaStarHalfAlt, FaSearch, FaMapMarkerAlt, 
  FaHome, FaChevronDown , 
} from "react-icons/fa";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoginModal from "./LoginModal";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, FaStore } from "react-icons/fa";
import { MousePointerClick, MessageSquare, Zap, Activity, Cpu, Music2, Radio, ShoppingBag, Smartphone, 
  Tv, Tags, MousePointer2, MapPin } from 'lucide-react';


//dummy chat bot kay lieye imports 
import { FaHeadset, FaPaperPlane, FaTimes, FaCommentDots
} from "react-icons/fa";
import { FaFire, FaShoppingBag, FaClock  } from 'react-icons/fa';


const Product_Detail = () => {
  // login signup states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
const [searchQuery, setSearchQuery] = useState("");

// --- MESSAGING & help kay lieye states start ---
const [isChatOpen, setIsChatOpen] = useState(false);
const [message, setMessage] = useState("");
const [isTyping, setIsTyping] = useState(false); // Typing indicator ke liye
const [chatHistory, setChatHistory] = useState([
  { role: 'bot', text: 'Hi! I am ShopSphere AI. How can I help you today? You can ask about Prices, Delivery, or Returns.' }
]);
// --- MESSAGING & help kay lieye states end ---


//second last footer icons wala section start 
const features = [
  { 
      title: 'Global Delivery', 
      sub: 'Next-gen logistics', 
      icon: 'https://cdn-icons-png.flaticon.com/512/9466/9466304.png', // 3D Delivery
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
      icon: 'https://cdn-icons-png.flaticon.com/512/9498/9498514.png', // 3D Support
      accent: 'from-orange-600 to-orange-400',
      shadow: 'group-hover:shadow-orange-200/50'
    },
  { 
    title: 'Pure Quality', 
    sub: 'Certified Excellence', 
    // Minimalist Diamond/Premium icon
    icon: 'https://cdn-icons-png.flaticon.com/512/12108/12108157.png', 
    accent: 'from-blue-800 to-blue-600',
    shadow: 'group-hover:shadow-blue-200/50'
  },
  { 
    title: 'Fluid Returns', 
    sub: '30-Day Ecosystem', 
    // Dynamic Exchange/Return icon
    icon: 'https://cdn-icons-png.flaticon.com/512/3502/3502154.png', 
    accent: 'from-orange-400 to-yellow-500',
    shadow: 'group-hover:shadow-orange-100/50'
  },
];
//second last footer icons wala section end 


  // State for Main Image - Initializing with current product image
  const [mainImage, setMainImage] = useState(product?.image);
  const [userReview, setUserReview] = useState("");
  const [reviewsList, setReviewsList] = useState([
    { name: "Samra Amir.", rating: 5, comment: "Amazing product, highly recommended!" },
  ]);
  

  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);


// more products: add to cart ki states start here:
const [cart, setCart] = useState([]);
const [notification, setNotification] = useState(null);
const [cartItems, setCartItems] = useState([]);
const [showNotif, setShowNotif] = useState(false);
const [productName, setProductName] = useState("");
const addToCart = (product) => {
  try {
    if (!product || !product.id) return;

    const savedData = localStorage.getItem('shopSphereCart');
    const existingCart = savedData ? JSON.parse(savedData) : [];
    // Title fix: Agar name hai to wo use kare warna title
    const finalTitle = product.name || product.title || "New Item";
    const isItemInCart = existingCart.find(item => item.id === product.id);
    let updatedCart;
    if (isItemInCart) {
      updatedCart = existingCart.map(item => 
        item.id === product.id ? { ...item, quantity: (Number(item.quantity) || 1) + 1 } : item
      );
    } else {
      updatedCart = [...existingCart, { ...product, quantity: 1, title: finalTitle, name: finalTitle }];
    }

    localStorage.setItem('shopSphereCart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
    setProductName(finalTitle);
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 1000);
  } catch (error) {
    console.error("Cart Logic Error:", error);
  }
};
// more products: add to cart ki states end here:


// states: Jab bhi product change ho (Page naya khule), main image update ho jaye
  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) setMainImage(product.image);
    const savedCart = localStorage.getItem('shopSphereCart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#eaeded]">
        <h2 className="text-2xl font-bold mb-4">Opps! Product Not Found</h2>
        <button onClick={() => navigate('/')} className="bg-[#ffd814] px-6 py-2 rounded-full font-bold shadow-md">
          Back to Shopping
        </button>
      </div>
    );
  }


  //  default image gallery 
  // Agar aapke product data mein "images" ka array hai to wo uthayega, werna yeh images use honge 
  const galleryImages = product.gallery || [
    product.image, 
    "images/img7.jfif",
    "images/lip6.jfif",
    "images/r.jfif",
    "images/n.jfif",
    "images/u.jfif",
    ,
  ];

  const handleAddToCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('shopSphereCart') || "[]");
    const existingItemIndex = savedCart.findIndex(item => item.id === product.id);
    let newCart;
    if (existingItemIndex !== -1) {
      newCart = [...savedCart];
      newCart[existingItemIndex].quantity += quantity;
    } else {
      newCart = [...savedCart, { ...product, quantity: quantity }];
    }
    setCartItems(newCart);
    localStorage.setItem('shopSphereCart', JSON.stringify(newCart));
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // yeh states buy now kay function par hain yani product_detail page par agar user add to cart karta hai 
  // tabhi buy now kar sakay gaaa werna tab tak buy now karky checkout waly page par nahi jaa sakta hai .. yeh logic hain inn states ki 
const handleBuyNow = () => {
  // 1. LocalStorage se check karein ke kya ye product pehle se cart mein hai
  const savedCart = JSON.parse(localStorage.getItem('shopSphereCart') || "[]");
  const isAlreadyInCart = savedCart.some(item => item.id === product.id);

  if (!isAlreadyInCart) {
    // 2. Agar cart mein nahi hai, to sirf Warning Notification dikhaye ga 
    const notification = document.createElement('div');
    notification.className = 'fixed top-24 right-5 z-[100] bg-orange-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border-b-4 border-orange-800 animate-bounce font-bold italic';
    notification.innerHTML = `
      <div class="bg-white/20 p-2 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div>
        <p class="text-sm uppercase tracking-tighter">Action Required</p>
        <p class="text-[11px] opacity-90">Please "Add to Cart" before Proceeding to Checkout</p>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
      setTimeout(() => notification.remove(), 500);
    }, 3000);

    return; // Function yahin ruk jayega, checkout par nahi jayega
  }
  // 3. Agar product cart mein mil gaya, to direct Checkout par le jaye gaa
  navigate('/checkout');
};
// buy now function states end here 


// sybmit review waly section ki states 
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if(userReview.trim()) {
      setReviewsList([{ name: "Guest User", rating: 5, comment: userReview }, ...reviewsList]);
      setUserReview("");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] font-sans text-[#0f1111]  overflow-x-hidden">
      
       {/* HEADER section start here WITH GAPS */}
        <header className="bg-[#131921] sticky top-0 z-50 py-2 px-4 md:px-6 flex items-center gap-3 text-white shadow-xl transition-all">
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
       className="hidden lg:flex flex-col items-start cursor-pointer group-hover:rotate-[-10deg] hover:text-[#febd69] transition-all border border-transparent p-1 px-2 rounded-sm transition-colors"
  >
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
      <span className="absolute -top-2 -right-4 bg-[#febd69] rounded-full text-[9px] px-1.5 py-1 font-bold text-black border-2 border-[#131921] shadow-lg animate-bounce">
        {cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}
      </span>
    </div>
    <span className="font-bold hidden sm:block self-end mb-1">Cart</span>
  </div>
</header>
{/* HEADER section end here WITH GAPS */}


{/** main body: start here */}
    <div className="max-w-[1400px]  mx-auto mt-4 px-4 ">
       <div className="flex flex-col lg:flex-row gap-11 bg-white p-6 rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-gray-200">
         {/* 1. main Image Section */}
  <div className="lg:w-1/3 flex flex-col gap-4">
  <div className="relative border border-gray-200 rounded-md overflow-hidden bg-[#f7f7f7] flex justify-center items-center h-[450px] w-full group">
    {/* BADGES START*/}
    <div className="absolute top-3 left-0 z-10 flex flex-col gap-2">
      {/* Discount Badge */}
      <span className="bg-[#cc0c39] text-white text-[12px] font-bold px-3 py-2 rounded-sm shadow-sm">
        {product.discount} Discount
      </span>
      {/* Items Left Badge */}
      <span className="bg-white text-[#B12704] border border-[#B12704] text-[11px] font-bold px-3 py-2 rounded-sm shadow-sm">
        Only 5 left in stock
      </span>
    </div>
    {/*  Bagdes end  */}

    <motion.img 
      whileHover={{ scale: 1.90 }} 
      transition={{ type: "spring", stiffness: 900 }}
      key={mainImage}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      src={mainImage} 
      alt={product.title} 
      className="w-full h-full object-cover block transition-transform duration-500"
    />
  </div>
  {/* Thumbnails Gallery / image gallery*/}
  <div className="flex gap-5 justify-center ">
    {galleryImages.map((img, i) => (
      <div 
        key={i} 
        onClick={() => setMainImage(img)}
        className={`w-16 h-16 border rounded-md cursor-pointer transition-all overflow-hidden bg-white ${
          mainImage === img ? 'border-[#f08804] border-2 shadow-md scale-105' : 'border-gray-300 hover:border-orange-500'
        }`}
      >
        <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
      </div>
    ))}
  </div>
</div>
       {/* 2. Middle Content Section  */}
          <div className="lg:w-1/3 space-y-4">
            <h1 className="text-2xl font-semibold leading-7 hover:text-[#007185] cursor-default transition-colors">{product.title}</h1>
            <div className="flex items-center gap-2 group cursor-pointer">
               <div className="flex text-[#ffa41c] text-sm group-hover:scale-110 transition-transform"><FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt /></div>
               <span className="text-[#007185] text-sm font-medium hover:underline">{product.reviews} ratings</span>
            </div>
            <p className="text-sm text-gray-600">Brand: <span className="text-[#007185] hover:underline cursor-pointer">ShopSphere Certified</span></p>
            <hr className="border-gray-200" />
            <div className="space-y-1">
              <div className="flex items-baseline gap-1 animate-pulse">
                <span className="text-sm font-medium">PKR</span>
                <span className="text-3xl font-medium text-[#B12704]">{product.price.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-500">List Price: <span className="line-through">PKR {product.oldPrice?.toLocaleString()}</span> <span className="text-[#cc0c39] ml-2 font-bold">({product.discount} Off)</span></p>
              <p className="text-sm flex items-center gap-1"><FaTruck className="text-gray-400" /> No Import Fees Deposit & FREE Shipping to Pakistan</p>
            </div>
            <div className="space-y-3 pt-2 bg-gray-50 p-4 rounded-lg border-l-4 border-[#febd69]">
              <p className="text-sm font-bold">About this item</p>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
                <li className="hover:translate-x-1 transition-transform cursor-default">Professional Grade Hardware with {product.title.split('|')[0]} technology.</li>
                <li className="hover:translate-x-1 transition-transform cursor-default">Certified for high performance and durability.</li>
                <li className="hover:translate-x-1 transition-transform cursor-default">Comes with international warranty and support.</li>
              </ul>
            </div>
          </div>
          {/* 3. Action Section & REVIEW BOX */}
          <div className="lg:w-1/4 space-y-2">
            <div className="border border-gray-300 rounded-lg p-4 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-medium">PKR</span>
                <span className="text-2xl font-medium">{(product.price * quantity).toLocaleString()}</span>
              </div>
              <p className="text-sm">FREE delivery <span className="font-bold">Wednesday, Jan 21</span>. Order within 12 hrs.</p>
              <div className="flex items-center gap-2 text-green-700 font-bold"><FaShieldAlt className="animate-bounce" /> In Stock</div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">Quantity:</span>
                  <select value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className="bg-[#f0f2f2] border border-gray-300 rounded-md px-3 py-1 text-sm shadow-sm outline-none hover:bg-gray-200 transition-colors">
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleAddToCart} className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-2.5 rounded-full text-sm font-bold shadow-sm transition-all border border-[#f5d122]">Add to Cart</motion.button>
                <motion.button whileTap={{ scale: 0.95 }}  onClick={handleBuyNow} 
                className="w-full bg-[#ffa41c] hover:bg-[#fa8900] py-2.5 rounded-full text-sm font-bold shadow-sm transition-all border border-[#f08804]"
               >Buy Now </motion.button>
              </div>
            </div>
            <div className="border border-gray-300 rounded-lg p-4 space-y-4 bg-white shadow-sm">
              <h3 className="font-bold text-lg border-b pb-2">Customer Reviews</h3>
              <div className="flex justify-between items-center text-sm">
                <div className="flex text-[#ffa41c]"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                <span className="text-gray-500">4.8 out of 5</span>
              </div>
              <div className="space-y-2">
                {[5, 4, 3].map(star => (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-8">{star} star</span>
                    <div className="flex-grow bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#ffa41c] h-full" style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : '5%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleReviewSubmit} className="pt-2">
                <textarea 
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  placeholder="Write your review here..."
                  className="w-full border rounded-md p-2 text-sm outline-none focus:border-orange-500 h-20 resize-none"
                />
                <button type="submit" className="mt-2 w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md py-1 text-sm font-medium transition-colors">
                  Submit Review
                </button>
              </form>
              <div className="mt-4 space-y-4 max-h-40 overflow-y-auto">
                {reviewsList.map((r, idx) => (
                  <div key={idx} className="border-b pb-2">
                    <p className="text-xs font-bold">{r.name}</p>
                    <p className="text-[11px] text-gray-600 italic">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  <div className=" text-left  p-8 mt-1 bg-white relative ">
  <div className="absolute top-0 -translate-x-1/2 w-full max-w-4xl h-54 bg-[radial-gradient(circle,rgba(255,107,0,0.08)_0%,rgba(0,31,63,0.05)_50%,transparent_100%)] blur-3xl -z-10"></div>
  <motion.div
    initial={{ opacity: 0, letterSpacing: "-0.05em" }}
    whileInView={{ opacity: 1, letterSpacing: "normal" }}
    viewport={{ once: true }}
    transition={{ duration: 1, ease: "circOut" }}
  >
    <h1 className="text-5xl md:text-4xl font-[1000] text-[#001F3F] mb-2 leading-[0.95] tracking-[-0.04em] font-sans italic uppercase">
       <span className="relative left-5 inline-block text-transparent bg-clip-text bg-gradient-to-br from-[#011b35] via-[#013161] to-orange-600">
        More Products 
        <motion.span 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute -bottom-2 left-0 h-[6px] bg-[#db9539] rounded-full"
        ></motion.span>
      </span>
    </h1>
  </motion.div>
</div>
{/* --- ADVANCED PREMIUM CATEGORIES GRID (Clean Styled Version) --- */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 font-sans bg-[#ffffff]  px-10">
  {[
    { id: 1, name: "Women's Fashion", image: "images/categories/pro3.jfif", discount: "20%",  iconImg: "https://cdn-icons-png.flaticon.com/512/3531/3531821.png" },
    { id: 2, name: "Home Decor", image: "images/categories/pro1.jfif", discount: "25%", iconImg: "https://cdn-icons-png.flaticon.com/512/3724/3724720.png" },
    { id: 3, name: "Men's Fashion", image: "images/categories/pro5.jfif", discount: "15%", iconImg: "https://cdn-icons-png.flaticon.com/512/3531/3531744.png" },
    { id: 4, name: "Kid's Fashion", image: "images/categories/pro10.jfif", discount: "30%", iconImg: "https://cdn-icons-png.flaticon.com/512/2641/2641642.png" },
    { id: 5, name: "Electronics", image: "images/categories/pro8.jfif", discount: "10%", iconImg: "https://cdn-icons-png.flaticon.com/512/3113/3113858.png" },
    { id: 6, name: "Women's Fashion", image: "images/categories/pro4.jfif", discount: "20%", iconImg: "https://cdn-icons-png.flaticon.com/512/3531/3531821.png" },
    { id: 7, name: "Home Decor", image: "images/categories/pro2.jfif", discount: "25%", iconImg: "https://cdn-icons-png.flaticon.com/512/3724/3724720.png" },
    { id: 8, name: "Men's Fashion", image: "images/categories/pro6.jfif", discount: "15%", iconImg: "https://cdn-icons-png.flaticon.com/512/3531/3531744.png" },
    { id: 9, name: "Kid's Fashion", image: "images/categories/pro11.jfif", discount: "30%", iconImg: "https://cdn-icons-png.flaticon.com/512/3081/3081913.png" },
    { id: 10, name: "Electronics", image: "images/categories/pro9.jfif", discount: "10%", iconImg: "https://cdn-icons-png.flaticon.com/512/3113/3113858.png" },
      { id: 6, name: "Women's Fashion", image: "images/categories/pro13.jfif", discount: "20%", iconImg: "https://cdn-icons-png.flaticon.com/512/3531/3531821.png" },
    { id: 7, name: "Home Decor", image: "images/categories/pro16.jfif", discount: "25%", iconImg: "https://cdn-icons-png.flaticon.com/512/3724/3724720.png" },
    { id: 8, name: "Men's Fashion", image: "images/categories/pro14.jfif", discount: "15%", iconImg: "https://cdn-icons-png.flaticon.com/512/3531/3531744.png" },
    { id: 9, name: "Kid's Fashion", image: "images/categories/pro17.jfif", discount: "30%", iconImg: "https://cdn-icons-png.flaticon.com/512/3081/3081913.png" },
    { id: 10, name: "Electronics", image: "images/categories/pro15.jfif", discount: "10%", iconImg: "https://cdn-icons-png.flaticon.com/512/3113/3113858.png" },
  ].map((category, index) => (
    <div
      key={category.id}
      className="group relative h-[420px] transition-all mt-12  duration-700 ease-in-out"
    >
      {/* LAYER 1 & 2: BACKGROUNDS */}
      <div className="absolute inset-x-4 inset-y-0 border border-gray-200 rounded-[3rem_1rem] -z-30 group-hover:scale-105 group-hover:border-[#d98d39]/30 transition-all duration-500"></div>
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-[4rem_1rem_4rem_1rem] group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 -z-20 border border-white/50"></div>
      
      {/* MAIN IMAGE BOX */}
      <div className="relative h-47 w-full px-2 -mt-6 group/img">
        <div className="relative h-full w-full overflow-hidden bg-[#1d242c] rounded-[2rem_0.5rem_2rem_0.5rem] group-hover/img:rounded-[0.5rem_2rem_0.5rem_2rem] shadow-xl transition-all duration-700">
          <img 
            src={category.image} 
            className="w-full h-full object-cover opacity-90 group-hover/img:opacity-100 group-hover/img:scale-110 group-hover/img:rotate-1 transition-all duration-[1.2s]" 
            alt={category.name} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1d242c]/60 via-transparent to-transparent opacity-80 group-hover/img:opacity-20 transition-opacity"></div>
        </div>
        {/* INDEX COUNTER */}
        <div className="absolute top-8 left-6 mix-blend-difference overflow-hidden">
            <p className="text-white text-[12px] font-black opacity-80 tracking-[0.2em] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              #{index + 1}
            </p>
        </div>
      </div>
      {/* FLOATING REAL ICON IMAGE */}
      <div className="absolute top-[9rem] left-4 z-30 transform -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500">
        <div className="w-12.5 h-12.5 bg-[#1d242c] p-3 rounded-2xl flex items-center justify-center border-b-4 border-r-4 border-[#dba053] shadow-lg">
          <img src={category.iconImg} alt="icon" className="w-full h-full object-contain filter invert" style={{ brightness: '2' }} />
        </div>
      </div>
      {/* CONTENT AREA */}
      <div className="relative mt-12 px-8">
        <div className="flex items-center gap-2 mb-1">
           <span className="w-8 h-[1px] bg-[#b36b18]"></span>
           <span className="text-[9px] font-black tracking-[0.3em] text-[#b36b18] uppercase">Series // 2026</span>
        </div> 
        <h3 className="text-[20px] font-[1000] text-[#1d242c] uppercase leading-[0.9] tracking-tighter mb-2 break-words group-hover:translate-x-2 transition-transform duration-500">
          {category.name.split(' ')[0]} <br/>
          <span className="text-[16px] font-thin opacity-40 ml-4 italic lowercase">{category.name.split(' ')[1] || 'Edition'}</span>
        </h3>
        {/* PRICE TAG */}
        <div className="absolute -top-12 right-6 text-right py-2 px-3 rounded-lg backdrop-blur-sm ">
            <p className="text-[10px] font-bold text-gray-400 line-through leading-none">$999</p>
            <p className="text-[20px] font-[1000] text-[#1d242c] tracking-tighter leading-none">
              <span className="text-[12px] font-bold text-[#b36b18] align-top mt-1">$</span>876
            </p>
        </div>
        {/* REAL IMAGE AVATARS */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex -space-x-3">
            {[
              "images/c.jfif",
              "images/d.jfif",
              "images/e.jfif"
            ].map((url, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-md transition-transform hover:scale-110 hover:z-20">
                  <img src={url} alt="buyer" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.15em] border-l border-gray-200 pl-3">Premium Choice</p>
     </div>
    

{/* more products:  ka add to cart ka button with notification coding and styling  start here */}
<div className={`fixed top-13 right-6 z-[9999] transition-all duration-300 ease-out transform ${showNotif ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-10 opacity-0 scale-90 pointer-events-none'}`}>
  <div className="bg-[#1d242c]/95 backdrop-blur-xl border-b-4 border-[#d98d39] text-white px-5 py-4 rounded-2xl  flex items-center gap-4 min-w-[300px] relative overflow-hidden">
    {/* Animated Background Glow */}
    <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#d98d39]/10 rounded-full blur-2xl"></div>
    {/* Success Icon with Pulse Effect */}
    <div className="relative flex-shrink-0">
      <div className="absolute inset-0 bg-[#d98d39] rounded-full blur-md opacity-30 animate-pulse"></div>
      <div className="relative bg-[#d98d39] p-2 rounded-full shadow-lg">
        <svg className="w-5 h-5 text-[#1d242c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
    {/* Content Section */}
      <div className="flex flex-col pr-4">
       <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#d98d39] mb-1 italic">
        Success Added
        </span>
        <span className="text-[14px] font-bold text-white leading-tight tracking-tight">
        {productName}
      </span>
    </div>
    {/* Rapid Progress Timer Bar */}
    <div className="absolute bottom-0 left-0 h-[3px] bg-white/10 w-full">
      <div 
        className={`h-full bg-[#d98d39] transition-all duration-[1000ms] ease-linear ${showNotif ? 'w-full' : 'w-0'}`}
      ></div>
    </div>
  </div>
</div>
{/*   BUTTON (Keep this INSIDE the map loop) */}
<div className="group/btn relative w-full cursor-pointer mt-4">
  <div 
    onClick={() => addToCart({
      id: category.id,
      name: category.name,   // Cart page recognition
      title: category.name,  // Title ko as category likha to name add hua hai 
      image: category.image,
      price: 149,
      discount: category.discount
    })}
    className="w-full h-12 bg-[#1d242c] rounded-xl flex items-center justify-between px-4 transition-all duration-500 group-hover/btn:bg-[#b36b18] group-hover/btn:rounded-[2rem] shadow-xl active:scale-95 overflow-hidden border border-white/5"
  >
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 bg-white/20 rounded-full blur-sm opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
        <svg className="w-4 h-4 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <span className="text-white text-[11px] font-black uppercase tracking-widest">
        Quick Add 
      </span>
    </div>
    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover/btn:bg-white group-hover/btn:rotate-[360deg] transition-all duration-700">
      <svg className="w-3.5 h-3.5 text-white group-hover/btn:text-[#b36b18]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
      </svg>
    </div>
  </div>
</div>
{/* add to cart ka button with notification coding and styling  end here */}

 </div>
    {/* BACKGROUND DECORATIVE NUMBER */}
      <span className="absolute top-70 right-0 text-9xl font-[1000] select-none pointer-events-none transition-all duration-700 text-transparent opacity-10 group-hover:opacity-20 group-hover:-translate-y-4"
        style={{ WebkitTextStroke: '2px #1d242c' }}>
        0{index + 1}
      </span>
    </div>
  ))}
</div>


{/** add to cart  notification ki coding wala section start here  */}
{showNotification && (
  <div className="fixed top-15 right-5 z-[100] animate-in fade-in slide-in-from-right-10 duration-500">
    <div className="relative group">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-2xl blur opacity-25"></div>
      
      {/* Main Notification Box */}
      <div className="relative flex items-center gap-4 bg-[#131921] text-white px-10 py-3 rounded-2xl shadow-2xl border border-gray-800">
        <div className="flex-shrink-0 w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        {/* Text Content */}
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] mb-0.5">
            System Update
          </span>
          <span className="text-sm font-bold italic tracking-tight">
            Asset Secured in Vault!
          </span>
        </div>
        {/* Progress Bar notification k undr */}
        <div className="absolute bottom-0 left-0 h-1 bg-orange-500 rounded-full animate-shrink" style={{ width: '100%', animation: 'shrink 3s linear forwards' }}></div>
      </div>
    </div>
  </div>
)}
{/** add to cart notification ki coding wala section end here  */}


{/* chatbot section: help and instant messaging start here*/}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-4">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.8 }}
              className="bg-white w-[320px] h-[450px] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-gray-100 flex flex-col overflow-hidden"
            >
              <div className="bg-[#232f3e] p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="bg-[#febd69] p-2 rounded-full text-[#131921]"><FaHeadset size={18} /></div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#232f3e] rounded-full"></span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">ShopSphere Support</h4>
                    <p className="text-[10px] text-gray-400">{isTyping ? 'Typing...' : 'Online | Samra Reply'}</p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="hover:text-red-400 transition-colors"><FaTimes /></button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-[#febd69] text-[#131921] font-medium rounded-tr-none' 
                        : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={sendMessage} className="p-3 bg-white border-t flex gap-2">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about price, delivery, etc..." 
                  className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-xs outline-none focus:ring-1 focus:ring-[#febd69]"
                />
                <button type="submit" className="bg-[#131921] text-[#febd69] p-2.5 rounded-full hover:scale-105 transition-all">
                  <FaPaperPlane size={14} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        {/** chatbot button coding start here  */}
          <div className="flex flex-col gap-3">
             <div className="relative group">
               <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#131921] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-gray-700">
                   How can we help?
                </span>
                <motion.button 
                 whileHover={{ scale: 1.1, rotate: 5 }}
                 whileTap={{ scale: 0.9 }}
                 onClick={() => {
                   // Tidio Open Logic
                   if (window.tidioChatApi) {
                     window.tidioChatApi.open();
                   } else {
                     console.log("Tidio is still loading...");
                   }
                 }}
                 className="bg-[#131921] text-[#febd69] w-16 h-16 rounded-full flex items-center justify-center shadow-2xl relative border-2 border-[#febd69]/20" >
                 {/* iski logic simple hai, Tidio khulega click par */}
                 <FaCommentDots size={24} />
                 <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white animate-bounce">1</span>
               </motion.button>
             </div>
           </div>
           {/** chatbot button coding start here  */}
      </div>
{/* chatbot section: help and instant messaging end here*/}
      

 {/**footer section start here */}
 <footer className="w-full font-sans ">
   <div className="relative bg-[#ffffff] px-3 py-15  overflow-hidden  md:-translate-y- transform">
   {/* Dynamic Background Elements */}
   <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem]   rounded-full blur-[120px] pointer-events-none"></div>
   <div className="absolute bottom-[-10%] right-[-5%] w-[40rem] h-[40rem]  rounded-full blur-[120px] pointer-events-none"></div>
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
 {/* Main Footer Section start here */}
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

export default Product_Detail;