import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaStar, FaStarHalfAlt, 
  FaTruck, FaHeart, FaMapMarkerAlt, FaChevronDown, FaHome,
  FaClock, FaCheckCircle, FaBoxOpen, FaInfoCircle
} from "react-icons/fa";
import { FaHeadset, FaPaperPlane, FaTimes, FaCommentDots
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import { FaFire, FaShoppingBag,  } from 'react-icons/fa';
import LoginModal from "./LoginModal";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, FaStore } from "react-icons/fa";
import { MousePointerClick, MessageSquare, Zap, Activity, Cpu, Music2, Radio, ShoppingBag, Smartphone, 
  Tv, Tags, MousePointer2, MapPin } from 'lucide-react';


const Product_Listing = () => {
  // login signup states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [timeLeft, setTimeLeft] = useState({ hours: 12, mins: 45, secs: 30 });
  const [showNotification, setShowNotification] = useState(false); // Notification state
  const navigate = useNavigate();


// MESSAGING & help kay lieye states start ---
const [isChatOpen, setIsChatOpen] = useState(false);
const [message, setMessage] = useState("");
const [isTyping, setIsTyping] = useState(false); 
const [chatHistory, setChatHistory] = useState([
  { role: 'bot', text: 'Hi! I am ShopSphere AI. How can I help you today? You can ask about Prices, Delivery, or Returns.' }
]);
// MESSAGING & help kay lieye states end 


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


// states for sales message like notification on screen left bottom start here
const [show, setShow] = useState(true);
const [index, setIndex] = useState(0);
  const notifications = [
     { text: "🛡️ 7-Day Easy Return policy available on this product.", icon: <FaShoppingBag className="text-blue-600" />, color: "border-blue-200" }, 
     { text: "📦 Only 2 units left! Don't miss out on this deal.", icon: <FaClock className="text-amber-600" />, color: "border-amber-200" },
     { text: "⭐ Top Rated: This is a best-selling item this week.", icon: <FaShoppingBag className="text-purple-500" />, color: "border-purple-200" },
     { text: "🎁 Surprise gift included for the next 5 lucky buyers!", icon: <FaFire className="text-pink-500" />, color: "border-pink-200" },
   
  ];
const nextNotification = () => {
  setShow(false);
  setTimeout(() => {
    setIndex((prev) => (prev + 1) % notifications.length);
    setShow(true);
  }, 100); 
};
// Yeh effect loop ko non-stop chalaye rakhta hai
useEffect(() => {
  const timer = setTimeout(() => {
    nextNotification();
  }, 5000); 
  return () => clearTimeout(timer);
}, [index, show]); 
// states for sales message like notification on screen left bottom end here


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

  const products = [
    { 
      id: 80, 
      title: "✧🌹͡ꦿ•*☆ Rolex Watch | ❀ 𝓣𝓲𝓶𝓮𝓵𝓮𝓼𝓼 𝓔𝓵𝓮𝓰𝓪𝓷𝓬𝓮 ~ ❀", 
      price: 27997, 
      oldPrice: 41997,
      rating: 4.3,
      reviews: "4,302",
      image: "images/Watch/1.jfif", 
         // yaha par image gallery ki images ayain gee sari 
        gallery: [
      "images/Watch/1a.jfif",     
      "images/Watch/1b.jfif",      
      "images/Watch/1c.jfif",     
      "images/Watch/1d.jfif" ,      
       "images/Watch/1e.jfif" 
    ],
      boughtPastMonth: "6K+",
      delivery: "Tue, Jan 20",
      colors: ["#1e3a8a", "#cc9d0d", "#1e8465", "#935e756", ],
      discount: "33%",
      stock: 12
    },
    { 
      id: 81, 
      title: "✧🌹͡ꦿ•*☆ Omega Watch | ❀ 𝓛𝓾𝔁𝓾𝓻𝔂 𝓦𝓪𝓽𝓬𝓱𝓮𝓼~ ❀", 
      price: 324797, 
      oldPrice: 397597,
      rating: 4.8,
      reviews: "1,250",
      image: "images/Watch/2.jfif", 
        gallery: [
      "images/Watch/2a.jfif",     
      "images/Watch/2b.jfif",      
      "images/Watch/2c.jfif",     
      "images/Watch/2d.jfif" ,      
       "images/Watch/2e.jfif" 
    ],
      boughtPastMonth: "500k+",
      delivery: "Tue, Jan 20",
      colors: ["#2d2d2d", "#b4b4b4", "#132978", "#84b4b4"],
      discount: "18%",
      stock: 5
    },
    { 
      id: 82, 
      title: "✧🌹͡ꦿ•*☆ Patek Philippe Watch | ❀ 𝓒𝓵𝓪𝓼𝓼𝓲𝓬 𝓣𝓲𝓶𝓮𝓹𝓲𝓮𝓬𝓮 ~ ❀", 
      price: 36195, 
      oldPrice: 45000,
      rating: 4.5,
      reviews: "2,189",
      image: "images/Watch/3.jfif", 
    gallery: [
      "images/Watch/3a.jfif",     
      "images/Watch/3b.jfif",      
      "images/Watch/3c.jfif",     
      "images/Watch/3d.jfif" ,      
       "images/Watch/3e.jfif" 
    ],
      boughtPastMonth: "2K+",
      delivery: "Wed, Jan 21",
      colors: ["#839299", "#84b4b4", "#1e8a8a"],
      discount: "20%",
      stock: 65
    },
    { 
      id: 83, 
      title: "✧🌹͡ꦿ•*☆ Tag Heuer Watch | ❀ 𝓟𝓻𝓮𝓶𝓲𝓾𝓶 𝓒𝓸𝓵𝓵𝓮𝓬𝓽𝓲𝓸𝓷 ~ ❀", 
      price: 465097, 
      oldPrice: 864997,
      rating: 4.3,
      reviews: "9,902",
      image: "images/Watch/4.jfif", 
        gallery: [
      "images/Watch/4a.jfif",     
      "images/Watch/4b.jfif",      
      "images/Watch/4c.jfif",     
      "images/Watch/4d.jfif" ,      
       "images/Watch/4e.jfif" 
    ],
      boughtPastMonth: "87K+",
      delivery: "wede, feb 20",
      colors: ["#1e3a8a", "#cc9d0d", "#b4b4b4", "#378951", ],
      discount: "89%",
      stock: 68
    },
    { 
      id: 84, 
      title: "✧🌹͡ꦿ•*☆ Cartier Watch | ❀ 𝓢𝓶𝓪𝓻𝓽 𝓦𝓻𝓲𝓼𝓽𝔀𝓪𝓽𝓬𝓱 ~ ❀", 
      price: 35797, 
      oldPrice: 857597,
      rating: 4.8,
      reviews: "90,50",
      image: "images/Watch/5.jfif", 
        gallery: [
      "images/Watch/5a.jfif",     
      "images/Watch/5b.jfif",      
      "images/Watch/5c.jfif",     
      "images/Watch/5d.jfif" ,      
       "images/Watch/5e.jfif" 
    ],
      boughtPastMonth: "870+",
      delivery: "Fri, novn 30",
      colors: ["#2d2d2d", "#b4b4b4", "#132978", "#84b4b4"],
      discount: "76%",
      stock: 54
    },
    { 
      id: 85, 
      title: "✧🌹͡ꦿ•*☆ Seiko Watch | ❀ 𝓟𝓻𝓮𝓶𝓲𝓾𝓶 𝓒𝓸𝓵𝓵𝓮𝓬𝓽𝓲𝓸𝓷 ~ ❀", 
      price: 84795, 
      oldPrice: 756200,
      rating: 4.1,
      reviews: "8,189",
      image: "images/Watch/6.jfif", 
    gallery: [
      "images/Watch/6a.jfif",     
      "images/Watch/6b.jfif",      
      "images/Watch/6c.jfif",     
      "images/Watch/6d.jfif" ,      
       "images/Watch/6e.jfif" 
    ],
      boughtPastMonth: "76K+",
      delivery: "mon, jul 22",
      colors: ["#839299", "#84b4b4", "#1e8a8a"],
      discount: "10%",
      stock: 10
    },
    { 
      id: 86, 
      title: "✧🌹͡ꦿ•*☆ Casio Watch | ❀ 𝓛𝓾𝔁𝓾𝓻𝔂 𝓦𝓪𝓽𝓬𝓱𝓮𝓼 ~ ❀", 
      price: 65297, 
      oldPrice: 98997,
      rating: 3.3,
      reviews: "657,302",
      image: "images/Watch/7.jfif", 
        gallery: [
      "images/Watch/7a.jfif",     
      "images/Watch/7b.jfif",      
      "images/Watch/7c.jfif",     
      "images/Watch/7d.jfif" ,      
       "images/Watch/7e.jfif" 
    ],
      boughtPastMonth: "35K+",
      delivery: "Thur, jun 10",
      colors: ["#1e3a8a", "#cc9d0d", "#b4b4b4", "#378951", ],
      discount: "23%",
      stock: 45
    },
    { 
      id: 87, 
      title: "✧🌹͡ꦿ•*☆ Tissot Watch | ❀ 𝓒𝓵𝓪𝓼𝓼𝓲𝓬 𝓣𝓲𝓶𝓮𝓹𝓲𝓮𝓬𝓮 ~ ❀", 
      price: 44797, 
      oldPrice: 97597,
      rating: 2.8,
      reviews: "765,0",
      image: "images/Watch/8.jfif", 
        gallery: [
      "images/Watch/8a.jfif",     
      "images/Watch/8b.jfif",      
      "images/Watch/8c.jfif",     
      "images/Watch/8d.jfif" ,      
       "images/Watch/8e.jfif" 
    ],
      boughtPastMonth: "1290+",
      delivery: "Tues, Dec 12",
      colors: ["#2d2d2d", "#b4b4b4", "#132978", "#84b4b4"],
      discount: "25%",
      stock: 80
    },
    { 
      id: 88, 
      title: "✧🌹͡ꦿ•*☆ Audemars Piguet Watch | ❀ 𝓣𝓲𝓶𝓮𝓵𝓮𝓼𝓼 𝓔𝓵𝓮𝓰𝓪𝓷𝓬𝓮 ~ ❀", 
      price: 12097, 
      oldPrice: 4500,
      rating: 4.4,
      reviews: "8,099",
      image: "images/Watch/9.jfif", 
    gallery: [
      "images/Watch/9a.jfif",     
      "images/Watch/9b.jfif",      
      "images/Watch/9c.jfif",     
      "images/Watch/9d.jfif" ,      
       "images/Watch/9e.jfif" 
    ],
      boughtPastMonth: "345K+",
      delivery: "Sat, April 16",
      colors: ["#839299", "#84b4b4", "#1e8a8a"],
      discount: "25%",
      stock: 25
    },
    { 
      id: 89, 
      title: "✧🌹͡ꦿ•*☆ Hublot Watch | ❀ 𝓒𝓵𝓪𝓼𝓼𝓲𝓬 𝓣𝓲𝓶𝓮𝓹𝓲𝓮𝓬𝓮 ~ ❀", 
      price: 8997, 
      oldPrice: 997,
      rating: 4.0,
      reviews: "87,02",
      image: "images/Watch/10.jfif", 
        gallery: [
      "images/Watch/10a.jfif",     
      "images/Watch/10b.jfif",      
      "images/Watch/10c.jfif",     
      "images/Watch/10d.jfif" ,      
       "images/Watch/10e.jfif" 
    ],
      boughtPastMonth: "39K+",
      delivery: "Tue, Dec 3",
      colors: ["#1e3a8a", "#cc9d0d", "#b4b4b4", "#378951", ],
      discount: "84%",
      stock: 9
    },
    { 
      id: 90, 
      title: "✧🌹͡ꦿ•*☆ Citizen Watch | ❀ 𝓢𝓶𝓪𝓻𝓽 𝓦𝓻𝓲𝓼𝓽𝔀𝓪𝓽𝓬𝓱 ~ ❀", 
      price: 12547, 
      oldPrice: 2437,
      rating: 4.9,
      reviews: "62,680",
      image: "images/Watch/11.jfif", 
        gallery: [
      "images/Watch/11a.jfif",     
      "images/Watch/11b.jfif",      
      "images/Watch/11c.jfif",     
      "images/Watch/11d.jfif" ,      
       "images/Watch/11e.jfif" 
    ],
      boughtPastMonth: "800+",
      delivery: "Tues, May 5",
      colors: ["#2d2d2d", "#b4b4b4", "#132978", "#84b4b4"],
      discount: "45%",
      stock: 7
    },
    { 
      id: 91, 
      title: "✧🌹͡ꦿ•*☆ Longines Watch | ❀ 𝓟𝓻𝓮𝓶𝓲𝓾𝓶 𝓒𝓸𝓵𝓵𝓮𝓬𝓽𝓲𝓸𝓷 ~ ❀", 
      price: 1295, 
      oldPrice: 4900,
      rating: 3.5,
      reviews: "546,09",
      image: "images/Watch/12.jfif", 
    gallery: [
      "images/Watch/12a.jfif",     
      "images/Watch/12b.jfif",      
      "images/Watch/12c.jfif",     
      "images/Watch/12d.jfif" ,      
       "images/Watch/12e.jfif" 
    ],
      boughtPastMonth: "34K+",
      delivery: "Wed, March 31",
      colors: ["#839299", "#84b4b4", "#1e8a8a"],
      discount: "29%",
      stock: 26
    },
    { 
      id: 92, 
      title: "✧🌹͡ꦿ•*☆ Rado Watch | ❀ 𝓛𝓾𝔁𝓾𝓻𝔂 𝓦𝓪𝓽𝓬𝓱𝓮𝓼 ~ ❀", 
      price: 6547, 
      oldPrice: 23997,
      rating: 4.1,
      reviews: "12,872",
      image: "images/Watch/13.jfif", 
        gallery: [
      "images/Watch/13a.jfif",     
      "images/Watch/13b.jfif",      
      "images/Watch/13c.jfif",     
      "images/Watch/13d.jfif" ,      
       "images/Watch/13e.jfif" 
    ],
      boughtPastMonth: "87K+",
      delivery: "Mon, August 14",
      colors: ["#1e3a8a", "#cc9d0d", "#b4b4b4", "#378951", ],
      discount: "19%",
      stock: 75
    },
    { 
      id: 93, 
      title: "✧🌹͡ꦿ•*☆ IWC Schaffhausen Watch | ❀ 𝓒𝓵𝓪𝓼𝓼𝓲𝓬 𝓣𝓲𝓶𝓮𝓹𝓲𝓮𝓬𝓮 ~ ❀", 
      price: 87397, 
      oldPrice: 37597,
      rating: 2.8,
      reviews: "91,250",
      image: "images/Watch/14.jfif", 
        gallery: [
      "images/Watch/14a.jfif",     
      "images/Watch/14b.jfif",      
      "images/Watch/14c.jfif",     
      "images/Watch/14d.jfif" ,      
       "images/Watch/14e.jfif" 
    ],
      boughtPastMonth: "35+",
      delivery: "Fri, Oct 30",
      colors: ["#2d2d2d", "#b4b4b4", "#132978", "#84b4b4"],
      discount: "22%",
      stock: 5
    },
    { 
      id: 94, 
      title: "✧🌹͡ꦿ•*☆ Breitling Watch | ❀ 𝓣𝓲𝓶𝓮𝓵𝓮𝓼𝓼 𝓔𝓵𝓮𝓰𝓪𝓷𝓬𝓮 ~ ❀", 
      price: 2985, 
      oldPrice: 45000,
      rating: 4.5,
      reviews: "2,189",
      image: "images/Watch/15.jfif", 
    gallery: [
      "images/Watch/15a.jfif",     
      "images/Watch/15b.jfif",      
      "images/Watch/15c.jfif",     
      "images/Watch/15d.jfif" ,      
       "images/Watch/15e.jfif" 
    ],
      boughtPastMonth: "69K+",
      delivery: "Thur, Nov 21",
      colors: ["#839299", "#84b4b4", "#1e8a8a"],
      discount: "27%",
      stock: 15
    },
  ];
  {/**iss jaga par main apni marzi say images ko increase decrease kar sakti hun  */}

  const filteredProducts = products
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      return 0;
    });

  const handleAddToCart = (product) => {
    const savedCart = JSON.parse(localStorage.getItem('shopSphereCart') || "[]");
    const existingItemIndex = savedCart.findIndex(item => item.id === product.id);
    let newCart;
    if (existingItemIndex !== -1) {
      newCart = [...savedCart];
      newCart[existingItemIndex].quantity = (newCart[existingItemIndex].quantity || 1) + 1;
    } else {
      newCart = [...savedCart, { ...product, quantity: 1 }];
    }
    setCartItems(newCart);
    localStorage.setItem('shopSphereCart', JSON.stringify(newCart));
    
    //  Notification show karny ky lieye
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); 
  };
  const handleProduct_Detail = (product) => {
    navigate('/product_detail', { state: { product } });
  };


  return (
    <div className="min-h-screen bg-[#f3f3f3] font-sans text-[#0f1111] overflow-x-hidden">
      {/* NEW RIGHT TOP NOTIFICATION  */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.5, rotateY: 90 }}
            animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, x: 100, scale: 0.5 }}
            className="fixed top-13 right-5 z-[100] bg-[#232f3e]/95 backdrop-blur-md text-white px-7 py-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-l-4 border-[#febd69] flex items-center gap-5"
          >
            <div className="bg-[#febd69] rounded-full p-2 shadow-[0_0_15px_#febd69]">
              <FaCheckCircle className="text-[#131921] size-5" />
            </div>
            <div>
              <p className="font-bold text-sm tracking-wide">Added to Cart!</p>
              <p className="text-[11px] text-gray-300">Your item is ready for checkout.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

{/* SUB-HEADER /  timer bar start*/}
      <div className="bg-white/80 backdrop-blur-md px-8 py-3 shadow-md flex flex-wrap justify-between items-center border-b border-gray-200 sticky top-[60px] z-40">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/Shop')}
          className="flex items-center gap-3 bg-red-50 px-4 py-1.5 rounded-full border border-red-100 cursor-pointer shadow-sm hover:shadow-md transition-all group"
        >
          <div className="relative">
            <span className="bg-[#cc0c39] text-white px-3 py-1 rounded-full text-[10px] font-black tracking-tighter uppercase animate-pulse shadow-[0_0_10px_rgba(204,12,57,0.4)]">
              Flash Deal
            </span>
            <span className="absolute inset-0 bg-red-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity"></span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <FaClock className="text-[#cc0c39] group-hover:rotate-[360deg] transition-transform duration-700" /> 
              <span className="hidden sm:inline">Limited Time Offer:</span> Ends in
            </p>
            <div className="flex gap-1 items-center">
              {[
                { val: timeLeft.hours, unit: 'h' },
                { val: timeLeft.mins, unit: 'm' },
                { val: timeLeft.secs, unit: 's' }
              ].map((time, index) => (
                <React.Fragment key={index}>
                  <div className="bg-gradient-to-b from-[#232f3e] to-[#131921] text-[#febd69] px-2 py-0.5 rounded shadow-xl font-mono font-bold text-sm min-w-[32px] text-center border-b-2 border-orange-500">
                    {time.val.toString().padStart(2, '0')}
                    <span className="text-[10px] ml-0.5 text-white/50">{time.unit}</span>
                  </div>
                  {index < 2 && <span className="text-[#cc0c39] font-bold animate-ping">:</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="hidden lg:flex items-center text-[#007185] text-xs font-bold gap-1 ml-2 transition-all"
          >
            <Link to="/" >Shop all deals → </Link>
          </motion.span>
        </motion.div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Sort Products</span>
          <select 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 hover:border-[#febd69] transition-all outline-none cursor-pointer font-medium"
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>
{/* SUB-HEADER /  timer bar end*/}


{/**main body: all images section start here */}
      <main className="max-w-[1500px] mx-auto p-4 md:px-6">
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {filteredProducts.map((item, index) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0px 20px 40px rgba(0,0,0,0.08)",
                  transition: { duration: 0.2 }
                }}
                key={item.id} 
                className="flex flex-col lg:flex-row bg-white border border-gray-100 p-7 gap-8 rounded-2xl shadow-sm relative group overflow-hidden transition-all"
              >
              <div className="w-full lg:w-[260px] h-[300px] flex-shrink-0 relative bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden group/img">
               {/* Badges Section */}
             <div className="absolute top-3 z-10 space-y-2">
          {/* Save Discount Badge with Shine */}
          <motion.span 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="block bg-gradient-to-r from-[#cc0c39] via-[#eb1c4d] to-[#cc0c39] text-white text-[10px] font-black px-2.5 py-1.5 rounded-md shadow-[0_4px_15px_rgba(204,12,57,0.4)] uppercase tracking-tighter border-l-2 border-white/30"
           >
         SAVE {item.discount}
        </motion.span>

         {/* Stock Badge with Continuous Blinking/Glowing Effect */}
        <motion.span 
          animate={{ 
         scale: [1, 1.05, 1],
         opacity: [0.9, 1, 0.9],
          boxShadow: item.stock <= 5 
        ? ["0px 0px 0px rgba(239, 68, 68, 0)", "0px 0px 12px rgba(239, 68, 68, 0.6)", "0px 0px 0px rgba(239, 68, 68, 0)"]
        : ["0px 0px 0px rgba(245, 158, 11, 0)", "0px 0px 12px rgba(245, 158, 11, 0.4)", "0px 0px 0px rgba(245, 158, 11, 0)"]
           }}
          transition={{ 
          duration: 1.5, 
         repeat: Infinity, 
           ease: "easeInOut" 
          }}
        className={`block text-[9px] font-black px-2.5 py-1.5 rounded-md border backdrop-blur-sm transition-all text-center ${
         item.stock <= 5 
        ? "bg-white/90 text-red-600 border-red-200 shadow-red-100" 
        : "bg-white/90 text-orange-600 border-orange-200 shadow-orange-100"
         }`}
         >
       <span className="flex items-center justify-center gap-1">
      <span className={`h-1.5 w-1.5 rounded-full animate-ping ${item.stock <= 5 ? "bg-red-600" : "bg-orange-500"}`}></span>
      {item.stock > 0 ? `ONLY ${item.stock} LEFT` : "OUT OF STOCK"}
    </span>
  </motion.span>
</div>
           <motion.img 
             whileHover={{ scale: 1.1, rotate: 2 }} 
             transition={{ type: "spring", stiffness: 300 }}
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover  block transition-transform duration-500"
               />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
                <div className="flex-1 space-y-4">
                  <motion.h2 
                    className="text-xl font-bold text-[#131921] leading-tight hover:text-[#c45500] cursor-pointer transition-colors line-clamp-2"
                  >
                    {item.title}
                  </motion.h2>
                  <div className="flex items-center gap-3 bg-gray-50/80 w-fit px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                    <div className="flex text-[#ffa41c] text-sm drop-shadow-sm">
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                    </div>
                    <span className="text-gray-300 text-xs">|</span>
                    <span className="text-[#007185] font-bold text-xs hover:underline cursor-pointer">{item.reviews} Reviews</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-50">
                    <div className="space-y-3">
                      <p className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="p-1.5 bg-green-50 rounded-lg"><FaCheckCircle className="text-green-500 size-3.5" /></div> <span className="font-medium"><span className="font-bold text-gray-800">Original Brand</span> Warranty</span>
                      </p>
                      <p className="flex items-center gap-3 text-sm text-gray-600">
                         <div className="p-1.5 bg-blue-50 rounded-lg"><FaTruck className="text-blue-500 size-3.5" /></div> <span className="font-medium">Free Shipping to <span className="font-bold text-gray-800">Pakistan</span></span>
                      </p>
                      <p className="flex items-center gap-3 text-sm text-gray-600">
                         <div className="p-1.5 bg-purple-50 rounded-lg"><FaBoxOpen className="text-purple-500 size-3.5" /></div> <span className="font-medium">Recent Activity: <span className="font-bold text-gray-800">{item.boughtPastMonth}</span> bought</span>
                      </p>
                    </div>
                    <div className="flex flex-col justify-end">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Color Palette</p>
                      <div className="flex gap-2.5">
                        {item.colors.map((color, idx) => (
                          <motion.div 
                            key={idx} 
                            whileHover={{ scale: 1.3, rotate: 15, y: -2 }}
                            style={{ backgroundColor: color }} 
                            className="w-6 h-6 rounded-lg border-2 border-white shadow-md cursor-pointer ring-1 ring-gray-100"
                          />
                        ))}
                      </div></div>
                      </div>
                    <div className="flex flex-wrap gap-2 pt-4">
                    <motion.button 
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(247, 202, 0, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(item)}
                      className="relative overflow-hidden bg-gradient-to-b from-[#ffd814] to-[#f7ca00] py-2.5 px-6 rounded-xl text-sm font-bold shadow-md transition-all border border-[#f5d122] text-[#131921] flex items-center gap-2 group/btn"
                    >
                      <FaShoppingCart /> Add to Cart
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]"></div>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: "#e68f0e" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleProduct_Detail(item)}
                      className="bg-[#ffa41c] hover:bg-[#ffa41c] py-2.5 px-6 rounded-xl text-sm font-bold shadow-sm text-[#131921] transition-all"
                    >
                      Quick Preview
                    </motion.button>
                  </div>
                </div>
 {/**main body: right side par prices wala section start here */}
<div className="w-full lg:w-[270px] bg-gradient-to-br from-white to-gray-50 p-4 rounded-2xl border-l-4 border-l-[#febd69] shadow-[10px_10px_25px_-15px_rgba(0,0,0,0.1)] flex flex-col justify-between group/price relative overflow-hidden">
  <FaShoppingCart className="absolute -right-4 -bottom-4 text-gray-100 size-24 -rotate-12 group-hover/price:text-orange-50 transition-colors duration-500" />
  <div className="space-y-3 relative z-10">
    <div className="bg-white p-4 rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.05)] border border-orange-50 relative overflow-hidden group-hover/price:border-orange-200 transition-all">
      <div className="absolute top-0 right-0 w-18 h-18 bg-gradient-to-bl from-orange-200 to-transparent rounded-bl-full opacity-50"></div>
      <p className="text-[10px] font-black text-orange-500 tracking-[0.2em] mb-2 flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
        </span>
        BEST PRICE
      </p>
      <div className="flex items-start gap-0.5">
        {/* PKR ko superscript style mein thora upar kiya  */}
        <span className="text-[12px] font-black text-[#c45500] mt-1.5">PKR</span>
        <span className="text-3xl font-black text-[#131921] tracking-tighter drop-shadow-sm">
          {item.price.toLocaleString()}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <p className="text-[12px] text-gray-400 line-through decoration-red-400/60">PKR {item.oldPrice.toLocaleString()}</p>
        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
          -{item.discount}
        </span>
      </div>
    </div>
    {/* Delivery Details with Modern Icons */}
    <div className="space-y-1 px-1">
      <motion.div whileHover={{ x: 5 }} className="flex items-center justify-between group/row">
        <div className="flex items-center gap-2 text-gray-500">
          <div className="p-1.5 bg-green-50 rounded-lg group-hover/row:bg-green-500 group-hover/row:text-white transition-all">
            <FaTruck className="text-[11px]" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-tight">Delivery</span>
        </div>
        <span className="text-green-600 font-black text-[11px] animate-pulse">Fast & Free</span>
      </motion.div>
      <motion.div whileHover={{ x: 5 }} className="flex items-center justify-between group/row">
        <div className="flex items-center gap-2 text-gray-500">
          <div className="p-1.5 bg-blue-50 rounded-lg group-hover/row:bg-blue-500 group-hover/row:text-white transition-all">
            <FaClock className="text-[10px]" />
          </div>
          <span className="text-[12px] font-bold uppercase tracking-tight">Arrival</span>
        </div>
        <span className="text-gray-800 font-black text-[11px]">{item.delivery}</span>
      </motion.div>
    </div>
  </div>
  {/* Bottom Section: Buying Choices */}
  <div className="mt-3 pt-5 border-t border-dashed border-gray-200 space-y-4 relative z-10">
    <div className="flex items-center justify-between">
      <p className="text-[12px] font-black text-gray-400 flex items-center gap-1.5 uppercase tracking-widest">
        <FaInfoCircle className="text-blue-400" /> More Buying Options
      </p>
      <div className="h-[4px] w-12 bg-gradient-to-r from-blue-200 to-transparent"></div>
    </div>
    <motion.div 
      whileHover={{ 
        scale: 1.03,
        backgroundColor: "#fff",
        boxShadow: "0 10px 20px -10px rgba(0,0,0,0.1)"
      }}
      className="bg-gray-100/50 p-3 rounded-xl border border-transparent hover:border-orange-100 transition-all cursor-pointer group/choice"
    >
      <div className="flex items-center gap-2 mb-1">
        <FaBoxOpen className="text-orange-400 text-[13px]" />
        <p className="text-[10px] text-[#c45500] font-black italic group-hover/choice:not-italic transition-all">Used & Refurbished</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm font-black text-[#131921]">PKR {(item.price - 2000).toLocaleString()}</p>
        <FaChevronDown className="text-[8px] text-gray-400 group-hover/choice:translate-y-0.5 transition-transform" />
      </div>
    </motion.div>
  </div>
  {/* Glass Shine Effect on Hover */}
  <div className="absolute inset-0 translate-x-[-100%] group-hover/price:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none"></div>
  </div>
  {/**main body: right side par prices wala section end here */}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>{/**main body: all images section end here */}

{/* continous sales notification message on screen left bottom start here */}
<AnimatePresence mode="wait">
  {show && (
    <motion.div
      initial={{ opacity: 0, x: -30, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-5 left-10 z-[500] flex items-center gap-4 p-1 pr-6 bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-[2rem] min-w-[320px] group"
    >
      {/* Icon Section with Animated Ring */}
      <div className="relative shrink-0 p-1">
        <div className="w-14 h-14 bg-[#131921] rounded-[1.8rem] flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
          <FaShoppingBag className="text-[#febd69] text-xl" />
        </div>
        <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-green-500 border-4 border-white rounded-full">
           <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
        </div>
      </div>
      {/* Text Content */}
      <div className="flex flex-col py-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-[#febd69]/20 text-[#c48b32] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
            Trending Now
          </span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="text-[10px] text-gray-400 font-bold uppercase">Sargodha</span>
        </div>
        <h5 className="text-[13px] font-extrabold text-[#131921] leading-tight tracking-tight">
          {notifications[index].text}
        </h5>
        <p className="text-[11px] text-gray-500 font-medium mt-1 flex items-center gap-1">
          <FaFire className="text-orange-500 text-[10px]" />
          Verified by ShopSphere Security
        </p>
      </div>
      {/* Close Button */}
      <button 
        onClick={() => setShow(false)} 
        className="absolute top-4 right-4 text-gray-300 hover:text-[#131921] transition-colors"
      >
        <FaTimes size={10} />
      </button>
      {/* Animated Progress Bar at bottom */}
      <motion.div 
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 6, ease: "linear" }}
        className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#febd69] to-transparent"
      />
    </motion.div>
  )}
</AnimatePresence>
{/* continous sales notification message on screen left bottom end here */}


{/* chatbot SECTION: right bottom help and instant messaging start here */}
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
              <div className="bg-[#febd69] p-2 rounded-full text-[#131921]"><FaHeadset size={19} /></div>
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
{/* chatbot SECTION: right bottom help and instant messaging end here */}


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
{/* Main Footer Section Sleek */}
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
    {/* Newsletter side */}
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
export default Product_Listing;