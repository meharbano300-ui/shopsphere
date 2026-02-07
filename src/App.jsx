import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import './App.css';  
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';
import { ShoppingBag, LayoutGrid, Ticket, Smartphone, Share2, X,  } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPinterestP } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {Users,Tags, Headset, ShoppingCart, Truck, ShieldCheck, Heart, Clock,  Headphones,
   Award, Facebook, Twitter, Star, Instagram, Send, Play, Sparkles, ArrowUpRight, } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, FaStore } from "react-icons/fa";
import {  MousePointerClick, MessageSquare, Radio, Music2, Cpu, Activity, Zap   } from 'lucide-react';
import { FaSearch, FaShoppingCart, FaStar, FaStarHalfAlt, FaTruck, FaHeart, FaChevronDown,
  FaMapMarkerAlt, FaHome, FaClock, FaCheckCircle, FaBoxOpen, FaInfoCircle, } from "react-icons/fa";
import { FaHeadset, FaPaperPlane, FaTimes, FaCommentDots, FaShoppingBag, FaFire } from "react-icons/fa";
import { useSlider } from './useSlider'; 
import DealsModal from "./Components/DealsModal";
import Product_Listing from "./Components/Product_Listing";
import Product_Listing2 from "./Components/Product_Listing2";
import Product_Listing3 from "./Components/Product_Listing3";
import Product_Listing4 from "./Components/Product_Listing4";
import Product_Listing5 from "./Components/Product_Listing5";
import Product_Listing6 from "./Components/Product_Listing6";
import Product_Detail from "./Components/Product_Detail";
import Shop from "./Components/Shop";
import Cart_Page from "./Components/Cart_Page";
import LoginModal from "./Components/LoginModal"; 
import SignUp from "./Components/SignUp";
import UserProfile from "./Components/UserProfile";
import Checkout from "./Components/Checkout";
import Services from "./Components/Services";
import Categories from "./Components/Categories";
import PriceModal from "./Components/PriceModal";


// --- Advanced Live Content Data on evolution ---
const LIVE_ASSETS = [
  {
    id: 1,
    line1: "Inspiring",
    line2: "Audio Pro.",
    img: "/Images/bg-remov.png", // Aapki pehli image
    color: "text-blue-500",
    features: ["Spatial Audio", "80h Battery", "Pro-Tune"],
    tags: [
      { icon: <Music2 size={12}/>, label: "Hi-Res" }, 
      { icon: <ShieldCheck size={12}/>, label: "2Y Warranty" }
    ]
  },
];

// data for the real bar chart
const data = [
  { name: '20k', sales: 40 },
  { name: '40k', sales: 60 },
  { name: '60k', sales: 45 },
  { name: '80k', sales: 90 }, 
  { name: '100k', sales: 65 },
];

const CommurzLanding = ({ onOpenDeals }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDealsOpen, setIsDealsOpen] = useState(false); // Modal ki state
  const handleOpenDeals = () => {
    setIsDealsOpen(true); // Modal kholnay ka function
  };

// add to cart our notification ki states nilkul top pr 
const [cartItems, setCartItems] = useState([]); 
const [showNotif, setShowNotif] = useState(false); 
const [productName, setProductName] = useState("");
useEffect(() => {
  const savedCart = localStorage.getItem('shopSphereCart');
  if (savedCart) {
    setCartItems(JSON.parse(savedCart));
  }
}, []);


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

  
// login signup states
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [isLoginOpen, setIsLoginOpen] = useState(false);
const [isSignUpOpen, setIsSignUpOpen] = useState(false);


// add to cart karny kay lieye our counter kay lieye states our logic start 
const addToCart = (product) => {
  try {
    if (!product || !product.id) {
      console.error("Invalid product added to cart", product);
      return;
    }
    const savedData = localStorage.getItem('shopSphereCart');
    const existingCart = savedData ? JSON.parse(savedData) : [];
    const isItemInCart = existingCart.find(item => item.id === product.id);
    let updatedCart;
    if (isItemInCart) {
      updatedCart = existingCart.map(item => 
        item.id === product.id ? { ...item, quantity: (Number(item.quantity) || 1) + 1 } : item
      );
    } else {
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }
    localStorage.setItem('shopSphereCart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
    setProductName(product.name || "New Item");
    setShowNotif(true);
    setTimeout(() => {
      setShowNotif(false);
    }, 3000);

  } catch (error) {
    console.error("Cart crash avoided:", error);
  }
};
// add to cart karny kay lieye our counter kay lieye states our logic end


// states for sales message like notification on screen left bottom start here
const [show, setShow] = useState(true);
const [index, setIndex] = useState(0);
  const notifications = [
    { text: "🔥 High demand! 12 people are viewing this right now.", icon: <FaFire className="text-orange-600" />, color: "border-orange-200" },
    { text: "3 customers bought this product in last 1 hour!", icon: <FaShoppingBag className="text-orange-500" />, color: "border-orange-200" },
    { text: "🚚 Free Delivery applied on this order for next 2 hours!", icon: <FaClock className="text-indigo-500" />, color: "border-indigo-200" },
    { text: "⚡ Flash Deal: Extra 10% OFF if you order in 10 mins!", icon: <FaFire className="text-red-600" />, color: "border-red-300" },
    { text: "💰 Price Drop! This item is at its lowest price ever.", icon: <FaClock className="text-emerald-500" />, color: "border-emerald-200" },
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
  }, 5000); // Har message 5 seconds tak screen par rahega
  return () => clearTimeout(timer);
}, [index, show]); 
// states for sales message like notification on screen left bottom end here


// --- MESSAGING & help kay lieye states start ---
const [isChatOpen, setIsChatOpen] = useState(false);
const [message, setMessage] = useState("");
const [isTyping, setIsTyping] = useState(false); 
const [chatHistory, setChatHistory] = useState([
  { role: 'bot', text: 'Hi! I am ShopSphere AI. How can I help you today? You can ask about Prices, Delivery, or Returns.' }
]);
// --- MESSAGING & help kay lieye states end ---


 //  Auto-animation ke liye yeh effect bhi add kia
  const [currentSlide, setCurrentSlide] = useState(0); 
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % LIVE_ASSETS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);


function App() {
// App.js ke andar ye function aur state rakhi
const [cartItems, setCartItems] = useState(() => {
  const saved = localStorage.getItem('my_permanent_cart');
  return saved ? JSON.parse(saved) : [];
});

// Jab bhi cart badle, save ho jaye
useEffect(() => {
  localStorage.setItem('my_permanent_cart', JSON.stringify(cartItems));
}, [cartItems]);

// Add to Cart function jo hum har page ko pass karenge
const addToCart = (product) => {
  setCartItems((prev) => {
    const existing = prev.find(item => item.id === product.id);
    if (existing) {
      return prev.map(item => 
        item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
    }
    return [...prev, { ...product, quantity: 1 }];
  });
};


  const [isVisible3, setIsVisible3] = useState(true); 
  const sectionRef3 = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);


  // Auto-change logic (3 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % HERO_SLIDES.length); // Assuming reference from main slider logic
      setCurrentSlide((prev) => (prev + 1) % LIVE_ASSETS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
         <Route path="/Product_Detail" element={<Product_Detail/>} />
        <Route 
          path="/cart" 
          element={<Cart_Page cartItems={cartItems} onRemove={removeFromCart} />} 
        />
      </Routes>
    </Router>
  );
}

  const [selectedProductId, setSelectedProductId] = useState(null);
  // Slider text heading par 
  const headingSlides = [
    { line1: "Explore, shop, ", line2: "repeat again." },
     { line1: "Grow, your, ", line2: "brand faster." },
    { line1: "Smart solutions,", line2: "better sales." }
  ];
  const activeSlide = useSlider(headingSlides.length, 1500);
  const headSlides = [
    { line1: "Elevate Your" , highlight: "Lifestyle" },
    { line1: "Wear Trend Be ", highlight: "Trend" },
  ];
// 1. Pehle data array rakhein
const helloSlides = [
  { line1: "Elevate Daily Aesthetics" },
  { line1: "Shop Better Live Better" },
];
const activesSlide = useSlider(helloSlides.length, 2500);
// 1. Pehle data array rakhein
const newSlides = [
  { line1: "Something is  ", highlight: "Brewing" },
  { line1: "ShopSphere", highlight: "Evolutions" },
];
const newSlide = useSlider(newSlides.length, 2500);



// Solutions for shopsphere states aur ultra-fast non-stop logic
const [isVisible, setIsVisible] = React.useState(false);
const sectionRef = React.useRef(null);
React.useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      // 2% nazar aate hi trigger
      setIsVisible(entry.isIntersecting);
    },
    { threshold: 0.02 } 
  );
  if (sectionRef.current) observer.observe(sectionRef.current);
  return () => observer.disconnect();
}, []);

// Solutions of shopsphere Animation Variants 
const containerVariants = {
  hidden: { opacity: 1 }, // Hidden state mein bhi text nazar aayega
  visible: {
    opacity: 1,
    transition: { 
     
    }
  }
};
const itemVariants = {
  hidden: { x: 0, opacity: 1 }, 
  visible: { 
    x: [0, -5, 5, 0], 
    opacity: 1, 
    transition: { 

    }
  }
};


  //  categories section kay lieye states 
  const [selectedCategory, setSelectedCategory] = React.useState('Collection');
  const [selectedType, setSelectedType] = React.useState('All');
  const categories = [
    { id: 1, name: 'Collection',  count: 90 },
    { id: 2, name: 'Women',  count: 45 },
    { id: 3, name: 'Men', count: 38 },
    { id: 4, name: 'Child',  count: 32 },
    { id: 5, name: 'Young', count: 28 },
  ];
  
  // Clothing types
  const clothingTypes = ['All', 'Shirt', 'Pant', 'Jeans', 'Winter', 'T-Shirt', 'Summer', 'Jacket', 'Sweater', 'Dress', 'Skirt', 'Shorts',  ];
  // Product data based on selected category and type
  const productsData = {
     Collection: [
       { id: 1, name: 'Elegant Women Top', price: 119.99, oldPrice: 139.99, rating: 4.9, image: '/Images/ten.jfif', type: 'Jacket' },
        { id: 2, name: 'Summer Casual T-Shirt', price: 24.99, oldPrice: 34.99, rating: 4.3, image: '/Images/features/Summer Polo1.jfif', type: 'T-Shirt' },
        { id: 3, name: 'Women Casual Skirt', price: 55.00, oldPrice: 90.00, rating: 4.7, image: '/Images/eigth.jfif', type: 'Skirt' },
       { id: 4, name: 'Party Wear Dress', price: 35.00, oldPrice: 55.00, rating: 4.7, image: '/Images/nine.jfif', type: 'Skirt' },
       { id: 5, name: 'Classic Elegant Shirt', price: 45.50, oldPrice: 59.99, rating: 4.5, image: '/Images/features/4.jfif', type: 'Shirt' },
      { id: 6, name: 'Winter Wool Sweater', price: 65.00, oldPrice: 85.00, rating: 4.9, image: '/Images/three.jfif', type: 'Sweater' },
      { id: 7, name: 'Elegant Floral Dress', price: 89.99, oldPrice: 129.99, rating: 4.8, image: '/Images/download (12).jfif', type: 'Dress' },
      { id: 8, name: 'Elegant Ladies Dress ', price: 75.00, oldPrice: 95.00, rating: 4.7, image: '/Images/features/5.jfif', type: 'Shirt' },
       { id: 9, name: 'Leather Jacket', price: 129.99, oldPrice: 169.99, rating: 4.9, image: '/Images/five.jfif', type: 'Jacket' },
         { id: 10, name: 'Elegant Evening Skirt', price: 75.00, oldPrice: 95.00, rating: 4.7, image: '/Images/six.jfif', type: 'Skirt' },
       { id: 11, name: 'Designer Jeans', price: 79.99, oldPrice: 99.99, rating: 4.7, image: '/Images/q.jfif', type: 'Jeans' },
      { id: 12, name: 'Men Prince Coat', price: 55.00, oldPrice: 80.00, rating: 4.7, image: '/Images/eleven.jpg', type: 'Skirt' },
      
    ],
    Women: [
      { id: 13, name: 'Elegant women Dress', price: 89.99, oldPrice: 129.99, rating: 4.8, image: '/Images/features/nine.jfif', type: 'Dress' },
      { id: 14, name: 'Elegant Dress', price: 89.99, oldPrice: 129.99, rating: 4.8, image: '/Images/features/5.jfif', type: 'Dress' },
      { id: 15, name: 'Classic Shirt', price: 45.50, oldPrice: 59.99, rating: 4.5, image: '/Images/features/women-shirt-1.jfif', type: 'Shirt' },
      { id: 16, name: 'women wearing Shirt', price: 45.50, oldPrice: 59.99, rating: 4.5, image: '/Images/features/women-shirt-2.jfif', type: 'Shirt' },
      { id: 17, name: 'women classic Shirt', price: 45.50, oldPrice: 59.99, rating: 4.5, image: '/Images/features/women-shirt-3.jfif', type: 'Shirt' },
      { id: 18, name: 'Designer Jeans', price: 79.99, oldPrice: 99.99, rating: 4.7, image: '/Images/features/women-jeans-1.jfif', type: 'Jeans' },
      { id: 19, name: 'Designer Jeans', price: 79.99, oldPrice: 99.99, rating: 4.7, image: '/Images/features/women-jeans-2.jfif', type: 'Jeans' },
      { id: 20, name: 'Designer Jeans', price: 79.99, oldPrice: 99.99, rating: 4.7, image: '/Images/features/q.jfif', type: 'Jeans' },
      { id: 21, name: 'Summer Dress', price: 129.99, oldPrice: 169.99, rating: 4.9, image: '/Images/features/women-summer-1.jfif', type: 'summer' },
      { id: 22, name: 'Summer Collection', price: 65.00, oldPrice: 85.00, rating: 4.9, image: '/Images/features/women-summer-2.jfif', type: 'Summer' },
       { id: 23, name: 'Summer Dress', price: 129.99, oldPrice: 169.99, rating: 4.9, image: '/Images/features/women-summer-4.jfif', type: 'summer' },
      { id: 24, name: 'Casual T-Shirt', price: 24.99, oldPrice: 34.99, rating: 4.3, image: '/Images/features/women-tshirt-1.jfif', type: 'T-Shirt' },
      { id: 25, name: 'Casual T-Shirt', price: 24.99, oldPrice: 34.99, rating: 4.3, image: '/Images/features/women-tshirt-2.jfif', type: 'T-Shirt' },
      { id: 26, name: 'Casual T-Shirt', price: 24.99, oldPrice: 34.99, rating: 4.3, image: '/Images/features/women-tshirt-3.jfif', type: 'T-Shirt' },
      { id: 27, name: 'Casual T-Shirt', price: 24.99, oldPrice: 34.99, rating: 4.3, image: '/Images/features/women-tshirt-4.jfif', type: 'T-Shirt' },
      { id: 28, name: 'Casual T-Shirt', price: 24.99, oldPrice: 34.99, rating: 4.3, image: '/Images/features/women-tshirt-5.jfif', type: 'T-Shirt' },
       { id: 29, name: 'Formal Pants', price: 59.99, oldPrice: 79.99, rating: 4.6, image: '/Images/features/two.jfif', type: 'Pant' },
      { id: 30, name: 'Formal Pants', price: 59.99, oldPrice: 79.99, rating: 4.6, image: '/Images/features/jeans.jfif', type: 'Pant' },
      { id: 31, name: 'Formal Black Pants', price: 59.99, oldPrice: 79.99, rating: 4.6, image: '/Images/features/pants.jfif', type: 'Pant' },
      { id: 32, name: 'Formal Black Pants', price: 59.99, oldPrice: 79.99, rating: 4.6, image: '/Images/features/women-winter-1.jfif', type: 'Winter' },
      { id: 33, name: 'Formal Black Pants', price: 59.99, oldPrice: 79.99, rating: 4.6, image: '/Images/features/women-winter-2.jfif', type: 'Winter' },
      { id: 34, name: 'Leather Jacket', price: 129.99, oldPrice: 169.99, rating: 4.9, image: '/Images/features/jacket.jfif', type: 'Jacket' },
      { id: 35, name: 'Elegant Winter Sweater', price: 75.00, oldPrice: 95.00, rating: 4.7, image: '/Images/features/sweater.jfif', type: 'Sweater' },
      { id: 36, name: 'Elegant Ladies Skirt', price: 75.00, oldPrice: 95.00, rating: 4.7, image: '/Images/features/skirt.jfif', type: 'Skirt' },
      
    ],
    Men: [
      { id: 37, name: 'Jents Jacket', price: 199.99, oldPrice: 249.99, rating: 4.9, image: '/Images/features/men-jacket.jfif', type: 'Jacket' },
      { id: 39, name: 'Casual Denim Jeans', price: 69.99, oldPrice: 89.99, rating: 4.6, image: '/Images/features/men-jeans1.jfif', type: 'Jeans' },
      { id: 40, name: 'Men T-Shirt Collection', price: 29.99, oldPrice: 39.99, rating: 4.4, image: '/Images/features/men-tshirt.jfif', type: 'T-Shirt' },
      { id: 41, name: 'Men T-Shirt Collection', price: 149.99, oldPrice: 199.99, rating: 4.9, image: '/Images/features/men-tshirt1.jfif', type: 'T-Shirt' },
      { id: 42, name: 'Formal Dress Shirt', price: 49.99, oldPrice: 64.99, rating: 4.7, image: '/Images/features/men-shirt.jfif', type: 'Shirt' },
      { id: 43, name: 'Winter Hoodie', price: 59.99, oldPrice: 79.99, rating: 4.8, image: '/Images/features/men-sweater.jfif', type: 'Sweater' },
      { id: 44, name: 'Casual Chino Pants', price: 54.99, oldPrice: 69.99, rating: 4.5, image: '/Images/features/men-pant.jfif', type: 'Pant' },
      { id: 45, name: 'Summer Shorts', price: 34.99, oldPrice: 44.99, rating: 4.3, image: '/Images/features/shorts.jfif', type: 'Shorts' },
      { id: 46, name: 'Jents Bomber Shirt', price: 149.99, oldPrice: 199.99, rating: 4.9, image: '/Images/features/shirt.jfif', type: 'Shirt' },
      { id: 47, name: 'Summer Shirts', price: 59.99, oldPrice: 79.99, rating: 4.8, image: '/Images/features/men-shirt1.jfif', type: 'Shirt' },
      { id: 48, name: 'Casual Winter Dress', price: 54.99, oldPrice: 69.99, rating: 4.5, image: '/Images/features/men-winter.jfif', type: 'Winter' },
      { id: 49, name: 'Men Winter Collection', price: 34.99, oldPrice: 44.99, rating: 4.3, image: '/Images/features/men-winter1.jfif', type: 'Winter' },
    
    ],
    Child: [
      { id: 50, name: 'Kids Cotton T-Shirt', price: 19.99, oldPrice: 29.99, rating: 4.6, image: '/Images/features/Kids Cotton T-Shirt.jfif', type: 'T-Shirt' },
      { id: 51, name: 'Children`s Jeans', price: 34.99, oldPrice: 44.99, rating: 4.5, image: '/Images/features/Children Jeans.jfif', type: 'Jeans' },
      { id: 52, name: 'Winter Jacket for Kids', price: 49.99, oldPrice: 64.99, rating: 4.8, image: '/Images/features/Winter Jacket for Kids.jfif', type: 'Jacket' },
      { id: 53, name: 'School Uniform Shirt', price: 24.99, oldPrice: 34.99, rating: 4.4, image: '/Images/features/School Uniform Shirt.jfif', type: 'Shirt' },
      { id: 54, name: 'Kids Summer Dress', price: 29.99, oldPrice: 39.99, rating: 4.7, image: '/Images/features/Kids Summer Dress.jfif', type: 'Dress' },
      { id: 55, name: 'Children Pants', price: 27.99, oldPrice: 37.99, rating: 4.5, image: '/Images/features/Children Pants.jfif', type: 'Pant' },
      { id: 56, name: 'Kids Sweater', price: 32.99, oldPrice: 42.99, rating: 4.6, image: '/Images/features/Kids Sweater.jfif', type: 'Sweater' },
      { id: 57, name: 'Play Shorts', price: 21.99, oldPrice: 29.99, rating: 4.3, image: '/Images/features/Play Shorts.jfif', type: 'Shorts' },
      { id: 58, name: 'Kids Summer Dress', price: 29.99, oldPrice: 39.99, rating: 4.7, image: '/Images/features/Kids Summer Dress1.jfif', type: 'Summer' },
      { id: 59, name: 'Children Pants Collection', price: 27.99, oldPrice: 37.99, rating: 4.5, image: '/Images/features/Children Pants1.jfif', type: 'Pant' },
      { id: 60, name: 'Children Pants Collection', price: 32.99, oldPrice: 42.99, rating: 4.6, image: '/Images/features/Children Pants2.jfif', type: 'Sweater' },
      { id: 61, name: 'Child Winter', price: 21.99, oldPrice: 29.99, rating: 4.3, image: '/Images/features/Child Winter.jfif', type: 'Winter' },
    ],
    Young: [
      { id: 62, name: 'Elegant Burgundy Plaid Wool Maxi Dress', price: 44.99, oldPrice: 59.99, rating: 4.7, image: '/Images/features/1.jfif', type: 'Summer' },
      { id: 63, name: 'Big Sale Women Retro Plaid Long Dress', price: 69.99, oldPrice: 89.99, rating: 4.8, image: '/Images/features/2.jfif', type: 'Dress' },
      { id: 64, name: 'Graphic T-Shirt', price: 26.99, oldPrice: 36.99, rating: 4.5, image: '/Images/features/Graphic T-Shirt.jfif', type: 'T-Shirt' },
      { id: 65, name: 'Skinny Jeans', price: 59.99, oldPrice: 79.99, rating: 4.6, image: '/Images/features/Skinny Jeans.jfif', type: 'Jeans' },
      { id: 66, name: 'Casual Shirt', price: 39.99, oldPrice: 54.99, rating: 4.4, image: '/Images/features/Casual Shirt.jfif', type: 'Shirt' },
      { id: 67, name: 'Youth Winter Coat', price: 79.99, oldPrice: 99.99, rating: 4.8, image: '/Images/features/Youth Winter Coat.jfif', type: 'Jacket' },
      { id: 68, name: 'Training Pants', price: 34.99, oldPrice: 44.99, rating: 4.5, image: '/Images/features/Training Pants.jfif', type: 'Pant' },
      { id: 69, name: 'Summer Polo', price: 31.99, oldPrice: 41.99, rating: 4.4, image: '/Images/features/Summer Polo.jfif', type: 'Shirt' },
      { id: 70, name: 'Casual Shirt', price: 39.99, oldPrice: 54.99, rating: 4.4, image: '/Images/features/Casual Shirt1.jfif', type: 'Shirt' },
      { id: 71, name: 'Youth Winter Coat', price: 79.99, oldPrice: 99.99, rating: 4.8, image: '/Images/features/Youth Winter Coat1.jfif', type: 'Jacket' },
      { id: 72, name: 'Training Pants', price: 34.99, oldPrice: 44.99, rating: 4.5, image: '/Images/features/Training Pants1.jfif', type: 'Pant' },
      { id: 73, name: 'Summer Polo', price: 31.99, oldPrice: 41.99, rating: 4.4, image: '/Images/features/Summer Polo1.jfif', type: 'Shirt' },
    
    ],
  };
  // Filter products based on selected category and type
  const filteredProducts = productsData[selectedCategory].filter(product => 
    selectedType === 'All' ? true : product.type === selectedType
  );



return (
<div className="min-h-screen bg-white font-sans shadow-2xl text-[#1A3021] overflow-x-hidden"> 
 {/** add to cart ki notification premium styling start */}
  <AnimatePresence>
  {showNotif && (
    <motion.div 
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.95 }}
      className="fixed top-8 right-5 z-[999] group">
     <div className="relative overflow-hidden bg-[#131921]/95 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-5 min-w-[340px] max-w-[400px]">
      <div className="absolute -left-4 -top-4 w-20 h-20 bg-[#febd69]/10 blur-3xl rounded-full"></div>
        <div className="relative bg-gradient-to-br from-[#febd69] to-[#f39417] p-3 rounded-xl shadow-[0_0_20px_rgba(254,189,105,0.3)] shrink-0 animate-bounce-slow">
          <Zap size={22} className="text-[#131921] fill-[#131921]" />
        </div>
        <div className="flex flex-col gap-1 pr-6">
          <h4 className="text-[11px] text-[#febd69] font-black uppercase tracking-[0.2em] leading-none">
            Product! Added to Cart
          </h4>
          <p className="text-[15px] font-bold text-white leading-tight truncate max-w-[200px]">
            {productName}
          </p>
          <div className="flex items-center gap-2 ">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-[10px] text-gray-400 font-medium italic">Ready for checkout</span>
          </div>
          </div>
          <button 
          onClick={() => setShowNotif(false)} 
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg">
          <X size={18} strokeWidth={2.5} />
        </button>
        <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#febd69] to-orange-400 animate-progress-shrink origin-left w-full"></div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
{/** add to cart ki notification premium styling end */}


     {/** navbar say upper waly marquee ki coding */}
      <div className="relative flex overflow-x-hidden  bg-[#1A3021] py-1.5 text-white group">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[1, 2].map((_, index) => (
            <div key={index} className="flex items-center">
              <span className="mx-10 flex items-center gap-2 text-[12px]  font-semibold uppercase tracking-widest text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                Flash Sale: 50% OFF
              </span>
              <span className="mx-10 flex items-center gap-2 text-[12px]  font-semibold uppercase tracking-widest text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                Free Shipping Worldwide
              </span>
              <span className="mx-10 flex items-center gap-2 text-[12px]  font-semibold uppercase tracking-widest text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                Limited Time Offer
              </span>
            </div>  
          ))}
        </div>
      </div>
      {/* Top Discount Bar */}
      <div className="w-full bg-[#1A3021] text-white pb-2  text-center text-xs sm:text-sm flex items-center justify-center gap-2">
        <span className="opacity-70 flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Get a 25% Discount on All Products!
        </span>
        <a href="/Shop" className="font-bold underline flex items-center gap-1">Shop now</a>
      </div>
      <div className="max-w-[1400px] bg-gray-50 mx-auto px-4 md:px-8 lg:px-16  "> 
        
     
<nav className="bg-gray-50 text-[#1A3021] py-1 flex items-center justify-between rounded-lg relative">
  {/* LEFT: Logo */}
  <div className="flex items-center gap-1 cursor-pointer group shrink-0">
    <img src="/Images/log.png" alt="Logo" className="w-12 h-10 md:w-15.5 md:h-13 object-cover rounded-[15px] transition-all duration-500 group-hover:rotate-3 group-hover:scale-105" />
    <span className="text-md md:text-[23px] font-extrabold tracking-tighter font-serif italic text-[#063f12] leading-tight">ShopSphere</span>
  </div>
  {/* CENTER: Navigation (Desktop Only) */}
  <div className="hidden lg:flex items-center gap-6 text-[11px] font-black uppercase tracking-[1.2px] text-[#1A3021] ml-14">
    {/* Categories Dropdown */}
    <div className="relative group cursor-pointer py-1">
     <Link to="/Categories" > <span className="flex items-center gap-1.5 group-hover:text-emerald-700 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        Categories
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-700 transition-all duration-500 group-hover:w-full"></span>
      </span></Link> 
    </div>
    <a href="/Services" className="relative group hover:text-emerald-700 transition-colors flex items-center gap-1.5 py-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
      Services
      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-700 transition-all duration-500 group-hover:w-full"></span>
    </a>
    <a href="/PriceModal" className="relative group hover:text-emerald-700 transition-colors flex items-center gap-1.5 py-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 18V6"></path></svg>
      Pricing
      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-700 transition-all duration-500 group-hover:w-full"></span>
       </a>
        <a  href="#"  onClick={(e) => {
         e.preventDefault(); 
         setIsDealsOpen(true); 
         }}
         className="relative group hover:text-orange-600 transition-colors flex items-center gap-1.5 py-1 cursor-pointer"
        >
       <FaPinterestP className="text-red-600 animate-pulse text-[14px]" />
       Today's Deals
     <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-600 transition-all duration-500 group-hover:w-full"></span>
    </a>
  </div>


  {/* RIGHT: Actions */}
  <div className="flex items-center gap-2 ">
    {/* FLAGS SECTION (Visible on Mobile & Desktop) */}
    <div className="relative group flex items-center gap-1 cursor-pointer  py-1.5 rounded-lg hover:bg-emerald-100/30 transition-all">
      <img src="https://flagcdn.com/w20/pk.png"  alt="Pakistan" 
       className="w-5 h-3 object-cover rounded-[2px] shadow-sm" 
        />
       <span className="text-[12px] font-black uppercase">ur</span>
       <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="opacity-60 group-hover:rotate-180 transition-transform"><path d="M7 10l5 5 5-5H7z"/></svg>
       <div className="absolute top-[120%] right-0 w-44 bg-white shadow-2xl rounded-[5px] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-full transition-all duration-300 z-[110] border border-gray-100 overflow-hidden">
        <div className="px-4 py-2 text-[10px] font-black bg-gray-50 border-b text-gray-400 uppercase">Region</div>
        <div className="max-h-[220px] overflow-y-auto custom-scrollbar">
          {['pk', 'gb', 'de', 'tr', 'us', 'fr', 'ca', 'it'].map((code) => (
            <div key={code} className="px-4 py-2.5 hover:bg-emerald-50 flex items-center gap-3 text-xs font-bold transition-colors">
              <img src={`https://flagcdn.com/w20/${code}.png`} className="w-4 shadow-xs" alt={code} />
              <span className="uppercase tracking-widest">{code}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
   <DealsModal isOpen={isDealsOpen} onClose={() => setIsDealsOpen(false)} />
  
{/* accounts section desktop ky lieye */}
  <div className="hidden lg:block relative">
  <div 
    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
    className="flex flex-col items-start cursor-pointer border-2 pe-6 px-2 border-transparent rounded-xl transition-all duration-300 group">
    <span className="text-[7px] text-emerald-800 uppercase font-black tracking-[1px] leading-tight group-hover:text-emerald-600 transition-colors">WELCOME</span>
     <div className="flex items-center relative -top-0.5 gap-1.5 font-extrabold text-[11px] uppercase tracking-tight text-[#1A3021]">
     Account 
    <FaChevronDown 
     size={9} 
     className={`transition-transform duration-500 text-emerald-700 ${isDropdownOpen ? 'rotate-180' : ''}`} 
   />
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
              <div className="p-2 bg-gray-300 rounded-lg group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all">
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
    {/* Mobile Header */}
    <div className="font-black text-[12px] border-b pb-2 uppercase text-emerald-800">Menu</div>

    {/* Menu Links */}
    {[
      { label: 'Categories', path: '/Categories' },
      { label: 'Services', path: '/Services' },
      { label: 'Pricing',  action: () => setIsPriceModalOpen(true) },  // Modal Trigger
      { label: "Today's Deals", action: () => setIsDealsModalOpen(true) }, // Modal Trigger
      { label: 'Profile', path: '/UserProfile' }
    ].map((item) => (
      item.action ? (
        /* Modal Buttons */
        <button 
          key={item.label}
          onClick={item.action}
          className="w-full text-left block font-bold py-1 hover:text-emerald-700 cursor-pointer uppercase text-[11px] tracking-widest transition-colors outline-none"
        >
          {item.label}
        </button>
      ) : (
        /* Regular Page Links */
        <a 
          href={item.path} 
          key={item.label} 
          className="block font-bold py-1 hover:text-emerald-700 cursor-pointer uppercase text-[11px] tracking-widest transition-colors"
        >
          {item.label}
        </a>
      )
    ))}

    {/* Auth Buttons Section */}
    <div className="pt-2 space-y-2 border-t">
      <button 
        onClick={() => setIsLoginOpen(true)} 
        className="w-full bg-[#1A3021] text-white py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-900 transition-all active:scale-95"
      >
        Login In
      </button> 
      <button 
        onClick={() => setIsSignUpOpen(true)} 
        className="w-full bg-[#1A3021] text-white py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-900 transition-all active:scale-95"
      >
        Sign Up
      </button>
    </div>
</div>
      )}
    </div>
    {/* Modals */}
    {isLoginOpen && <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSwitchToSignUp={() => { setIsLoginOpen(false); setIsSignUpOpen(true); }} />}
    {isSignUpOpen && <SignUp isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} onSwitchToLogin={() => { setIsSignUpOpen(false); setIsLoginOpen(true); }} />}
  
  {/* CART (Visible on Mobile & Desktop) */}
   <Link to="/Cart_Page" ><div onClick={() => navigate('/Cart')} className="flex items-center gap-2 md:-translate-x-5 transform cursor-pointer relative hover:text-[#a8640a] transition-all border border-transparent px-2 rounded-sm group">
    <div className="relative">
      <FaShoppingCart className="text-2xl group-hover:rotate-[-1deg] transition-transform" />
      <span className="absolute -top-3 -right-3 bg-green-100 rounded-full text-[8px] px-1.5 py-1 font-bold text-black border-2 border-[#131921] shadow-lg animate-bounce">
        {cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}
      </span>
     </div>
    <span className="font-bold hidden sm:block self-end mb-1">Cart</span>
  </div></Link>
  </div>
</nav>
{/** navbar end here */}



  {/* MAIN SECTION - Reduced Bottom Space */}
   <main className="pt-10 pb-0 h-fit">
    <div className="grid grid-cols-12 gap-7 items-start h-fit">
        {/* Left Column */}
            <div className="col-span-12 lg:col-span-6 pt-6">
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-80 rounded-[6px] text-[#1A3021] bg-white w-fit px-3 pt-1 h-6 block  ">
                #1 ECOMMERCE PLATFORM 2026
              </span>
              <div className="relative h-[110px] lg:h-[130px] overflow-hidden mb-3  text-5xl md:text-6xl font-serif italic text-[#1A2421] leading-tight animate-reveal-up delay-100">
                {headingSlides.map((slide, index) => (
                  <h1 key={index} className={`absolute inset-0 text-5xl lg:text-6xl font-bold leading-[1] transition-all duration-1000 ease-in-out transform ${index === activeSlide ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
                    {slide.line1}<br />{slide.line2}
                  </h1>
                ))}
              </div>
              <p className="text-[15px] text-bold opacity-90 mb-7 leading-[1.4]  text-4xl ">
                Experience the future of online shopping with high-quality <br/> products . 
                Join our community of 1M+ happy customers.
              </p>
              <Link to="/Shop"><button className="bg-[#1A3021] rounded-[30px] text-white px-7 py-3 font-semibold text-lg hover:scale-105 transition-transform  font-serif italic text-[#1A2421] leading-tight animate-reveal-up delay-100">
                Shop Now
              </button></Link>
            </div>
            {/* Right Column: Shoe Card */}
            <div className="col-span-12 lg:col-span-4  ">
              <div className="bg-white rounded-[15px] p-5 shadow-sm max-w-[275px] ml-auto translate-y-7 lg:translate-x-17  shadow-[0px_20px_50px_rgba(0,0,0,0.1)]">
                <div className="bg-[#bbe989] rounded-[15px] aspect-[4/3] flex items-center justify-center relative overflow-hidden mb-3">
                  <img src="/Images/main_image.png" alt="Shoe" className="w-3/4 object-contain -rotate-3 drop-shadow-2xl transition-transform duration-900 hover:scale-150 cursor-pointer" />
                  </div>
                  <div className="flex justify-between items-end">
                   <div>
                    <h3 className="text-base font-bold mb-0.5 opacity-80 leading-tight">Nike Zoom Overpower</h3>
                    <p className="text-[20px] font-bold">$45.00</p>
                  </div>
                  <span className="bg-[#1A3021] text-white text-[9px] px-2.5 py-1 rounded-full flex items-center gap-1 mb-1 whitespace-nowrap">✓ Paid</span>
                </div>
              </div>
            </div>
            {/* Product List Card */}
            <div className="hidden lg:block lg:col-span-2">
              <div className="bg-white rounded-[15px] p-6 shadow-2xl border border-gray-100 translate-x-11 scale-95 origin-left w-[220px] mt-15 group">
                <div className="space-y-5">
                  <div className="flex justify-between text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                    <span>Product</span><span>Price</span>
                  </div>
                  {[
                    {n: 'Classic Watch', p: '$120', img: '/Images/img4.jfif'},
                    {n: 'T-Shirt', p: '$8.0', img: '/Images/w.jfif'},
                    {n: 'Clothes', p: '$8.0', img: '/Images/ten.jfif'},
                    {n: 'Bag', p: '$12', img: '/Images/ba.jfif'}, 
                    {n: 'Summer Dress', p: '$45.0', img: '/Images/women-summer-4.jfif'},
                    {n: 'Slim Blazer', p: '$85.0', img: '/Images/women-tshirt-8.jfif'},
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center group/item cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-100 transition-transform group-hover/item:scale-110">
                          <img src={item.img} alt={item.n} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-bold text-gray-800">{item.n}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-800">{item.p}</span>
                    </div>
                  ))}      
                </div>
              </div>
            </div>
            {/* Modal girl: Bottom Row - adjusted Transforms to prevent extra bottom space */}
            <div className="col-span-12 lg:col-span-2 h-[310px] lg:-translate-y-33">
              <div className="rounded-l-0 rounded-r-[20px] overflow-hidden h-full shadow-sm">
                <img src="/Images/girl.jfif" alt="Model" className="w-full h-full object-cover transition-transform duration-900 hover:scale-140 cursor-pointer" />
              </div>
            </div>      
   {/** chart section start here */}         
  <div className="col-span-12 lg:col-span-3 relative z-10 lg:-translate-y-40 lg:-ml-4 transition-transform duration-900 hover:scale-105 cursor-pointer">
  <div className="bg-white rounded-[16px] p-5 shadow-xl h-[320px] flex flex-col">
    <div className="flex justify-between items-start mb-6">
      <div>
        <p className="text-xs font-bold opacity-40 uppercase mb-1">Total Sales</p>
        <h2 className="text-[32px] font-bold">$243.89</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-[#D9FFB0] text-[10px] font-bold px-2 py-0.5 rounded-[10px] flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-top">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg> 12%
          </span>
          <span className="text-[10px] opacity-40 font-bold">vs last year</span>
        </div>
      </div>
      <button className="text-[10px] border border-gray-200 px-4 py-1.5 rounded-[10px] font-bold hover:bg-gray-50">View report</button>
    </div>
{/* Chart Section - Layout aur Hover fix */}
<div className="w-full" style={{ height: "200px", minHeight: "160px", position: "relative" }}> 
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 10, right: 6, left: -15, bottom: 0 }}>
      {/* 1. Hover ke liye Tooltip lazmi hai */}
      <Tooltip 
        cursor={{ fill: 'rgba(26, 48, 33, 0.05)' }} // Hover par bar ka background color
        contentStyle={{ borderRadius: '7px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
      />
      <XAxis dataKey="name" hide />
      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af'}} />
      <ReferenceLine 
        y={41} 
        stroke="#e5e7eb" 
        strokeDasharray="3 3" 
        label={{ position: 'left', value: 'Avg 41%', fill: '#1A3021', fontSize: 10, fontWeight: 'bold'}} 
      />
      <Bar dataKey="sales" fill="#f3f4f6" radius={[4, 4, 0, 0]} barSize={35} isAnimationActive={true} />
      {/* Main Bar (Dark Green) - Iska dataKey check karein agar ye alag hai */}
      <Bar dataKey="sales" fill="#1A3021" radius={[4, 4, 0, 0]} barSize={35} />
    </BarChart>
  </ResponsiveContainer>
  </div>
  </div>
</div>
         {/**social icons section start here */}
           <div className="col-span-12 lg:col-span-3 w-[260px] flex flex-col gap-1 h-auto lg:-translate-y-45 lg:-ml-5 ">
              <div className="bg-white rounded-[16px] p-3 mb-1 flex items-center justify-between shadow-sm border border-gray-100 ">
                <div className="flex -space-x-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-[#79B93C] border-2 border-white flex items-center justify-center p-2 shadow-md z-40 transition-transform duration-900 hover:scale-150 cursor-pointer">
                    <img src="https://cdn.worldvectorlogo.com/logos/shopify.svg" className="w-full h-full brightness-0 invert " alt="Shopify" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#FF5A00] border-2 border-white flex items-center justify-center p-2 shadow-md z-30 transition-transform duration-900 hover:scale-150 cursor-pointer">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current"><path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9z" /></svg>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#000000] border-2 border-white flex items-center justify-center shadow-md z-20 transition-transform duration-900 hover:scale-150 cursor-pointer">
                    <span className="text-white font-bold text-3xl italic mb-2 leading-none">a</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#E6005C] border-2 border-white flex items-center justify-center shadow-md z-10 transition-transform duration-900 hover:scale-150 cursor-pointer">
                    <span className="text-white font-black text-2xl italic tracking-tighter ml-0.5">!b</span>
                  </div>
                </div>
                <p className="text-[10px] font-bold leading-[1.2] opacity-80 me-2 uppercase tracking-tighter text-gray-800">
                  Partnering with<br/>many e-commerce
                </p>
              </div>
              <div className="bg-gradient-to-b from-[#1A3021] via-[#2D5A3C] to-[#4B8B2B] rounded-[20px] p-7 flex flex-col items-center justify-center text-center text-white flex-grow h-[320px] transition-transform duration-900 hover:scale-105 cursor-pointer shadow-lg shadow-gray-900/50">
              <h2 className="text-7xl font-medium mb-2 font-serif italic text-[#1A2421] leading-tight animate-reveal-up delay-100 text-[#D9FFB0] transition-transform duration-900 hover:scale-130 cursor-pointer"> 50x</h2>
              <p className="text-[13px] text-white opacity-80 font-semibold tracking-tight transition-transform duration-900 hover:scale-130 cursor-pointer">New customer every week</p>
            </div>
            </div>
           {/**social icons section end here */}
           {/**shopping girl right side */}
            <div className="col-span-12 lg:col-span-3 lg:-translate-y-44 lg:-ml- relative group">
              <div className="relative col-span-12 lg:col-span-3 lg:-translate-x-43 lg:-translate-y-6">
                <div className="rounded-[20px] overflow-hidden h-[360px] relative border-9 border-white shadow-2xl transition-transform duration-300">
                  <img src="/Images/img2.jfif" alt="Working girl" className="w-full h-full object-cover rounded-[15px] transition-transform duration-900 hover:scale-120 cursor-pointer" />
                </div>
              </div>
              <div className="absolute top-1/2 -translate-y- -right-41 w-45 sm:w-60 p-6 hidden lg:block bg-white rounded-xl shadow-xl border border-gray-100 z-10 transition-transform duration-300 group-hover:scale-105">
                <h3 className="text-[#1a1a1a] font-bold text-[18px] mb-1">Sales comparison</h3>
                <div className="flex gap-2 mb-4 text-[10px] font-medium">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#1B4D3E]"></div>
                    <span className="text-gray-500">Shopify</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#A3E635]"></div>
                    <span className="text-gray-500">Tokopedia</span>
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-[10px] font-bold text-gray-700 mb-1">iOS</p>
                    <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-[#1B4D3E] transition-all duration-700 ease-in-out w-[60%] group-hover:w-[85%]"></div>
                      <div className="h-full bg-[#A3E635] transition-all duration-700 ease-in-out w-[10%] group-hover:w-[15%]"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-700 mb-1">Laptop</p>
                    <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-[#1B4D3E] transition-all duration-700 ease-in-out w-[40%] group-hover:w-[70%]"></div>
                      <div className="h-full bg-[#A3E635] transition-all duration-700 ease-in-out w-[20%] group-hover:w-[30%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div> 
  
{/** features products section start here */}
<div className="relative">
  {/* --- BEAUTIFUL TOAST MESSAGE (Top Right) --- */}
  <div id="wishlist-toast" className="fixed top-5 right-5 z-[9999] hidden animate-bounce">
    <div className="bg-[#1A3021] text-white px-6 py-4 rounded-xl shadow-2xl border-l-4 border-[#22C55E] flex items-center gap-3">
      <div className="bg-[#22C55E] rounded-full p-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <p id="toast-text" className="font-bold text-sm tracking-wide"></p>
    </div>
  </div>
  <section className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 py-8 bg-white md:-translate-y-35 transform">
  {/* Header Section with Word-Split Direction Animation */}
  <div className="mb-10 text-center select-none px-4">
  <style>{`
    @keyframes slideFromLeft {
      0% { transform: translateX(-50px); opacity: 0; filter: blur(10px); }
      100% { transform: translateX(0); opacity: 1; filter: blur(0); }
    }
    @keyframes slideFromRight {
      0% { transform: translateX(50px); opacity: 0; filter: blur(10px); }
      100% { transform: translateX(0); opacity: 1; filter: blur(0); }
    }
    /* Desktop ke liye bari animation */
    @media (min-width: 1024px) {
      @keyframes slideFromLeft {
        0% { transform: translateX(-150px); opacity: 0; filter: blur(10px); }
        100% { transform: translateX(0); opacity: 1; filter: blur(0); }
      }
      @keyframes slideFromRight {
        0% { transform: translateX(150px); opacity: 0; filter: blur(10px); }
        100% { transform: translateX(0); opacity: 1; filter: blur(0); }
      }
    }
    @keyframes fadeOutDown {
      0% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(20px); }
    }
    .animate-word-left { 
      animation: slideFromLeft 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
    }
    .animate-word-right { 
      animation: slideFromRight 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
    }
    .animate-slide-exit { 
      animation: fadeOutDown 2.5s ease-in forwards; 
    }
    .font-premium-serif { font-family: 'Georgia', serif; font-style: italic; }
    .font-premium-sans { font-family: 'Inter', system-ui, sans-serif; font-weight: 900; }
  `}</style>
  
  <span className="text-emerald-800 text-[10px]  font-black tracking-[0.3em] sm:tracking-[0.5em] uppercase opacity-60 block ">
    Winter / Summer 2026
  </span>
  {/* Height optimized for mobile  and desktop (lg:h-[110px]) */}
  <div className="relative h-[90px] sm:h-[110px] lg:h-[90px] overflow-hidden flex items-center justify-center">
    {helloSlides && helloSlides.length > 0 && helloSlides.map((slide, index) => {
      const isActive = index === activesSlide;
      const l1 = slide?.line1 || "";
      const l2 = slide?.line2 || "";
      const line1Words = l1.split(" ");
      const line2Words = l2.split(" ");
       return (
        <div 
          key={index} 
          className={`absolute inset-0 flex flex-col font-serif italic items-center justify-center transition-all
            ${isActive ? "z-10" : "z-0 animate-slide-exit opacity-0 pointer-events-none"}`}
        >
          {/* Line 1: Text scales from 2xl (mobile) to 5xl (desktop) */}
          <div className="flex gap-2 sm:gap-3 text-2xl sm:text-4xl lg:text-5xl font-serif italic font-bold text-[#1A2421] leading-none whitespace-nowrap">
            <span className={isActive ? "animate-word-left" : "opacity-0"}>
              {line1Words.slice(0, 1).join(" ")}
            </span>
            <span className={isActive ? "animate-word-right" : "opacity-0"}>
              {line1Words.slice(1).join(" ")}
            </span>
          </div>
          {/* Line 2: Smaller on mobile to prevent overflow */}
          <div className="flex gap-2 sm:gap-3 text-xl sm:text-3xl lg:text-5xl font-serif italic text-[#1A3021] uppercase mt-1 sm:mt-2 tracking-tighter sm:tracking-[-0.04em] whitespace-nowrap">
            <span className={isActive ? "animate-word-left" : "opacity-0"}>
              {line2Words.slice(0, 2).join(" ")}
            </span>
            <span className={isActive ? "animate-word-right" : "opacity-0"}>
              {line2Words.slice(2).join(" ")}
            </span>
          </div>
        </div>
      );
    })}
  </div>
  <div className="w-16 sm:w-20 h-[2px] sm:h-[3px] bg-[#122017] mx-auto  rounded-full opacity-20"></div>
</div>
 <div className="grid grid-cols-12 gap-7">
      {/* LEFT SIDE: Featured Magazine Card */}
      <div className="col-span-12 lg:col-span-4 relative group overflow-hidden rounded-[5px] shadow-lg h-[380px] lg:h-auto">
        <img src="/Images/img1.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-120" alt="Main Feature" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A3021] via-transparent to-transparent opacity-90"></div>
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <h3 className="text-2xl font-extrabold mb-2 leading-tight">Exclusive ShopSphere <br/>Accessories</h3>
          <Link to="/Shop" ><button className="border-b-2 border-white pb-1 text-sm font-bold hover:text-[#22C55E] transition-all">Explore Now</button></Link>
        </div>
      </div>
{/* RIGHT SIDE: Compact Product Grid */}
<div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
  {[
    { id: 1, name: "Accessories for Ladies", price: "4299", old: "5399", img: "/Images/img7.jfif", link: "/Product_Listing" },
    { id: 2, name: "Luxury Perfume Bottle with Nova-Light", price: "6150", old: "8250", img: "/Images/perfu.jfif", link: "/Product_Listing2" },
    { id: 3, name: "Metro-Swift Sling Pouch", price: "6954", old: "8680", img: "/Images/img8.jfif", link: "/Product_Listing3" },
    { id: 4, name: "Gen-Z Smartphone Categoriesx", price: "6679", old: "8999", img: "/Images/mobii.jfif", link: "/Product_Listing4" },
    { id: 5, name: "Premium Watch Series 7", price: "2210", old: "3650", img: "/Images/4cc.jpg", link: "/Product_Listing5" },
    { id: 6, name: "Beautiful Makeup Tips", price: "8750", old: "9990", img: "/Images/lip6.jfif", link: "/Product_Listing6" },
  ].map((p) => (
    <div key={p.id} className="bg-white rounded-[5px] border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col relative overflow-hidden h-fit">
      <div className="relative aspect-[4/4.5] overflow-hidden bg-gray-50">
        
        {/* --- DISCOUNT BADGE --- */}
        <div className="absolute top-4 left-0.5 z-20 bg-[#ffffff] text-black text-[9px] font-black px-4 py-1.5  shadow-xl">
          35% OFF
        </div>      
 
 <img src={p.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={p.name} />
    {/* Dancing Buttons Overlay  */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <Link to={p.link}>
            <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#1A3021] shadow-xl hover:bg-[#10612d] hover:text-white transition-all transform animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
            </button>
           </Link>
           <button 
            onClick={() => {
              const currentWishlist = JSON.parse(localStorage.getItem('userWishlist')) || [];
              const toast = document.getElementById('wishlist-toast');
              const toastText = document.getElementById('toast-text');
              if(!currentWishlist.find(item => item.id === p.id)) {
                const newWishlist = [...currentWishlist, p];
                localStorage.setItem('userWishlist', JSON.stringify(newWishlist));
                window.dispatchEvent(new Event("storage"));
                
                toastText.innerText = `${p.name} added to Wishlist!`;
                toast.classList.remove('hidden');
                setTimeout(() => toast.classList.add('hidden'), 3000);
              } else {
                toastText.innerText = "Already in Wishlist";
                toast.classList.remove('hidden');
                setTimeout(() => toast.classList.add('hidden'), 3000);
              }
            }}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#1A3021] shadow-xl hover:bg-[#bd0c0c] hover:text-white transition-all transform animate-bounce"
          >
            <svg xmlns="http://www.w3.org/2000/center" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
        </div> 
      </div>
      {/* --- PREMIUM INFO SECTION --- */}
      <div className="p-3 bg-white">
        {/* Choti Heading with Hover */}
        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[2px] mb-1 group-hover:text-[#10612d] transition-colors duration-300">
          Exclusive Edition
        </p>   
        <h3 className="text-[14.5px] font-bold text-[#1A3021] line-clamp-1 group-hover:tracking-wide transition-all duration-300">
          {p.name}
        </h3>
        <div className="flex items-end justify-between mb-1">
          <div className="relative flex-col">
            <span className="text-[18px] font-black text-[#10612d] leading-none">
              ${p.price}
            </span>
             <span className="text-[14px] text-gray-400 line-through ms-1 font-medium leading-none mb-1">
              ${p.old}
            </span>
           </div> 
           <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#facc15" stroke="none"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <span className="text-[14px] text-[#1A3021] font-bold ml-1">4.9</span>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
</div>
  </section>
</div>
{/** features products section end here */}



{/* Premium Luxury Categories & Filter Section start here*/}
<section className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-24 py-5 bg-[#fcfcfc] overflow-hidden selection:bg-emerald-100  md:-translate-y-31 transform">
 {/* Header Section */}
    <div className="mb-9 text-center">
      <span className="text-emerald-800 text-[10px] transform font-black italic tracking-[0.3rem] uppercase opacity-70 transition-all duration-1000   px-4  rounded-[10px]">
        ShopSphere Collection
       </span>
       <div className="relative h-[110px] lg:h-[70px] overflow-hidden mb-1 mt-4 font-serif italic text-[#1A2421] leading-tight">
        {headSlides.map((slide, index) => (
        <h1 key={index} className={`absolute inset-0 text-5xl lg:text-5xl font-bold leading-[1] transition-all duration-1000 ease-in-out transform ${index === activesSlide ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
        {slide.line1} <span className="text-emerald-500">{slide.highlight}</span>
          </h1>
        ))}
      </div>
      <div className="w-17 h-2 mx-auto mt-6"></div>
    </div>
  <div className="flex flex-col lg:flex-row gap-12 items-stretch lg:h-[900px] md:-translate-y-8 transform overflow-hidden">
    {/* Left Side - Luxury Sidebar */}
    <div className="lg:w-1/5 flex flex-col h-full border-r border-gray-300  pr-7">
      <div className="flex flex-col h-full">
        <h3 className="text-[20px] font-black text-gray-700 uppercase tracking-widest mb-10">Categories</h3>
        <div className="flex-grow overflow-y-auto no-scrollbar  space-y-6">
          {categories.map((category) => (  
            <button
              key={category.id} onClick={() => setSelectedCategory(category.name)}
              className="w-full group flex items-center gap-3 p-1  text-left transition-all duration-500" >
              <div className={`relative w-16 h-16 rounded-full overflow-hidden border-2 mt-1 transition-all duration-500 ${selectedCategory === category.name ? 'border-emerald-700 scale-110 shadow-xl' : 'border-transparent grayscale group-hover:grayscale-0'}`}>
                <img 
                  src={
                    category.name.toLowerCase() === 'collection' ? '/Images/img2.jfif' :
                    category.name.toLowerCase() === 'men' ? '/Images/men.jfif' :
                    category.name.toLowerCase() === 'women' ? '/Images/women.jfif' :
                    category.name.toLowerCase() === 'child' ? '/Images/child.jfif' :
                    category.name.toLowerCase() === 'young' ? '/Images/wom.jfif' :
                    `https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200` 
                  } 
                  alt={category.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold text-gray-500  uppercase tracking-wide transition-colors ${selectedCategory === category.name ? 'text-[#1A3021]' : 'text-gray-500 group-hover:text-black'}`}>
                  {category.name}
                </span>
                <span className="text-[11px] text-gray-500 font-medium">{category.count} Styles</span>
              </div>
            </button>
          ))}
        </div>
        {/* Minimalist Size Selector */}
        <div className="mt-12 pt-8 border-t border-gray-500">
          <p className="text-[11px] font-black text-gray-600 uppercase tracking-tighter mb-5">Select Size</p>
          <div className="flex flex-wrap gap-2">
            {['S', 'M', 'L', 'XL','XXL', 'XS'].map(size => (
              <button key={size} className="w-11 h-11 rounded-full border border-gray-700 text-[10px] font-bold hover:bg-black hover:text-white transition-all">
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
    {/* Right Side - Product Grid */}
    <div className="lg:w-4/5 flex flex-col h-full overflow-hidden">
      {/* Minimal Filter Bar */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex gap-8 overflow-x-auto no-scrollbar py-2">
          {clothingTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all relative pb-2 ${selectedType === type ? 
                         'text-[#133b0b] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#133b0b]' : 'text-gray-400 hover:text-black'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      {/* Premium Grid */}
      <div className="flex-grow overflow-y-auto overflow-x-hidden pr-4 custom-scrollbar pb-10 scroll-smooth will-change-scroll">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-12">
          {filteredProducts.map(product => (
            <div key={product.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative aspect-[3/3] w-full overflow-hidden bg-[#F2F2F2] rounded-sm transition-shadow duration-700 hover:shadow-2xl">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-all duration-500" />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-white text-black px-4 py-3 text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-black hover:text-white transition-all active:scale-90"
                  >
                    Quick Add +
                  </button>
                </div>
                {product.oldPrice && (
                  <span className="absolute top-4 left-1 text-[9px] font-black bg-white text-black px-3 py-1 uppercase">
                    Sale 25%
                  </span>
                )}
              </div>        
              {/* Info Area */}
              <div className="mt-3">
                <h4 className="text-[15px] font-bold text-[#1A3021] tracking-tight">{product.name}</h4>
               <div className="flex items-center gap-1">
               {[...Array(5)].map((_, i) => (
              <svg 
               key={i} 
               className={`w-4 h-4 ${
               i < Math.floor(product.rating) 
               ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300 fill-gray-300'    
                }`} 
                viewBox="0 0 24 24"
                 >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                 ))}
                 <span className="text-[10px] font-bold ml-1 text-gray-600">({product.rating})</span>
                 </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[17px] font-black text-[#205530]">${product.price.toFixed(2)}</span>
                  {product.oldPrice && <span className="text-[12px] text-semibold font-black text-red-400 line-through">${product.oldPrice.toFixed(2)}</span>}
                  <button  onClick={() => addToCart(product)}
                   className="text-[#1A3021] hover:text-red-600 transition-transform hover:scale-110 active:scale-90 ms-auto duration-200"
                  >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" > <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                 </svg>
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
{/* Premium Luxury Categories & Filter Section end here*/}



{/** shopsphere evolution yani coming soon section start here */}
<div className="bg-[#ffffff] max-w-[1500px] mx-auto px-6 md:px-100 lg:px-19 py-9  px-4 md:px-20 flex flex-col items-center  overflow-x-hidden font-['Plus_Jakarta_Sans'] md:-translate-y-35 transform">
  {/* Header Section */}
<div className="mb-8 md:mb-10 w-full max-w-[1500px] mx-auto text-center px-4">
  <span className="block text-emerald-900 text-[9px] sm:text-[10px] font-semibold transform italic tracking-[0.2rem] sm:tracking-[0.3rem] uppercase opacity-70 transition-all duration-1000 px-4">
    ShopSphere Crafted 2026
  </span>
  {/* Height responsive rakhi hai taake mobile par text wrap hone se cut na jaye */}
  <div className="relative h-[80px] sm:h-[110px] w-full overflow-hidden text-center">
    {newSlides.map((slide, index) => (
      <h1 
        key={index} 
        className={`absolute inset-0 text-3xl sm:text-5xl font-bold font-serif italic mt-4 sm:mt-6 transition-all duration-1000 ease-in-out transform 
          ${index === newSlide ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
      >
        {slide.line1} <span className="text-emerald-500">{slide.highlight}</span>
      </h1>
    ))}
  </div>
  <p className="max-w-[800px] mx-auto mt-2 text-[12px] sm:text-[15px] leading-relaxed sm:leading-snug italic text-gray-600 tracking-wide text-center px-2">
    <span className="block text-gray-500">
      Experience a seamless of innovation and style where every click brings the future to your doorstep.
    </span>
    {/* Mobile par spacing behtar karne ke liye mt-1 add kiya hai */}
    <span className="block text-gray-500 mt-1 sm:mt-0">
      Join the evolution of digital commerce and redefine the way you shop for excellence.
    </span>
  </p>
  <div className="w-17 h-2 mx-auto"></div>
</div>

{/* Main Compact Canvas */}
  <div className="bg-[#f8f8f8] mb-30 w-full max-w-7xl py-7 px-10 border border-white/50 animate-in fade-in duration-1000">
    <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-5 gap-3 h-auto md:h-[580px]">
      <div className="col-span-1 md:col-span-9 md:row-span-4 bg-white  p-6 md:p-12 flex flex-col justify-between relative overflow-hidden group hover:shadow-2xl transition-all duration-700 border border-white min-h-[500px] md:min-h-0">
        {/* Animated Background Glow (Dynamic Color) */}
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-100 rounded-full blur-[120px] pointer-events-none" 
        />
<div className="relative z-20">
{/* Professional Launching Clock - Refined Aesthetic Version */}
<div className="flex flex-wrap items-center gap-6 mb-10">
  <div className="bg-emerald-50/50 backdrop-blur-sm border border-emerald-100/80 px-5 py-2 rounded-2xl flex items-center gap-4 shadow-sm">
    <div className="flex flex-col items-center">
      <span className="text-[18px] font-black text-emerald-900 font-mono leading-none">14</span>
      <span className="text-[8px] text-emerald-700/60 font-black uppercase tracking-widest mt-1">Days</span>
      </div>
    {/* Elegant Separator */}
    <div className="w-[1.5px] h-8 bg-emerald-200/50 rounded-full" />
    {/* Time Display */}
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <span className="text-[16px] font-black text-emerald-800 font-mono tracking-wider">08</span>
        <span className="text-emerald-400 animate-pulse font-bold">:</span>
        <span className="text-[16px] font-black text-emerald-800 font-mono tracking-wider">45</span>
        <span className="text-emerald-400 animate-pulse font-bold">:</span>
        <span className="text-[16px] font-black text-emerald-800 font-mono tracking-wider">22</span>
      </div>
      <span className="text-[7px] text-emerald-700/50 uppercase font-black tracking-[0.1rem] mt-0.5">Time to Launch</span>
    </div>
  </div>
{/* Refined Aesthetic Status Badge */}
<motion.div 
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="bg-gradient-to-r from-emerald-50/80 to-teal-50/50 border border-emerald-100/60 px-4 py-2 rounded-full hidden md:flex items-center gap-3 shadow-[0_2px_10px_-3px_rgba(16,185,129,0.1)] backdrop-blur-md cursor-default"
>
  {/* Live Indicator with Dual Glow */}
  <div className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
     </div>
      {/* Badge Text with Spacing */}
       <span className="text-[9px] font-black text-emerald-800/80 uppercase tracking-[0.2rem] flex items-center gap-1">
       Early Access 
       <span className="text-emerald-500 font-black italic">Live</span>
      </span>
      {/* Tiny Accent Arrow */}
       <svg  xmlns="http://www.w3.org/2000/svg"  width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"  strokeLinejoin="round" 
       className="text-emerald-600 ml-1 opacity-70"
       >
     <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
   </motion.div>
</div>       
{/** yeh inspiring audio pro wal section hai */}
  <AnimatePresence mode="wait">
  <motion.div
    key={currentSlide}
    className="flex flex-col"
  >
    {/* Converging Text Animation - Fixed for Line 1 and Line 2 */}
    <motion.h2 
      initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: 50, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-4xl md:text-6xl font-serif italic text-[#1A2421] leading-[1.1] mb-8"
    >
      {/* Line 1 - Inspiring */}
      <span className="block">
        {LIVE_ASSETS[currentSlide]?.line1}
      </span>
      {/* Line 2 - Audio Pro. (With Color) */}
      <span className={`block ${LIVE_ASSETS[currentSlide]?.color || "text-black"}`}>
        {LIVE_ASSETS[currentSlide]?.line2}
      </span>
    </motion.h2>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-2 gap-6 max-w-sm"
    >
      {LIVE_ASSETS[currentSlide]?.features?.slice(0, 2).map((feat, idx) => (
        <div key={idx} className="group/item">
          <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Feature 0{idx + 1}
          </p>
          <h4 className="text-[12px] font-bold text-slate-800 uppercase tracking-tighter group-hover/item:text-blue-600 transition-colors">
            {feat}
          </h4>
          <div className="w-6 h-[2px] bg-slate-200 mt-2 group-hover/item:w-full transition-all duration-500" />
        </div>
      ))}
    </motion.div>
  </motion.div>
</AnimatePresence>
 </div>

 <div className="flex items-center gap-2 relative z-10 mt-10">
  {/* Compact & Light Premium Button */}
  <button className="relative overflow-hidden bg-emerald-50 text-emerald-800 px-7 py-3 rounded-full text-[10px] font-bold tracking-[0.1rem] flex items-center gap-2 border border-emerald-100 shadow-sm group transition-all duration-300 hover:bg-emerald-100 active:scale-95">
    <span className="relative z-10">
      SECURE ACCESS
    </span>
    <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
  </button>
  {/* Compact Social Media Icons - Button ke bilkul sath */}
  <div className="flex items-center  ">
    {[
      { icon: <Instagram size={14} />, link: "#" },
      { icon: <Twitter size={14} />, link: "#" },
      { icon: <Facebook size={14} />, link: "#" }
    ].map((social, index) => (
      <a 
        key={index} 
        href={social.link} 
        className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
      >
        {social.icon}
      </a>
    ))}
  </div>
  {/* Minimal Pagination - Agar space bache toh */}
  <div className="hidden lg:flex gap-1.5 ml-auto">
    {LIVE_ASSETS.map((_, i) => (
      <div key={i} className={`h-1 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-6 bg-emerald-400' : 'w-1.5 bg-gray-200'}`} />
    ))}
  </div>
</div>
       {/* LIVE IMAGE CONVERGING CONTAINER */}
        <div className="absolute right-[-5%] md:right-[-2%] bottom-0 w-[60%] h-[90%] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ x: 100, opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
              exit={{ x: -100, opacity: 0, scale: 1.1, rotate: -5 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <img 
                src={LIVE_ASSETS[currentSlide].img} 
                className="h-[390px] w-[290px] object-contain drop-shadow-[0_50px_60px_rgba(0,0,0,0.15)]" 
                alt="Product"
              /> 
              {/* Floating Dynamic Tech Tags around Image */}
              {LIVE_ASSETS[currentSlide].tags.map((tag, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute ${i === 0 ? 'top-1/4 -left-12' : 'bottom-1/3 -right-4'} hidden md:flex items-center gap-3 bg-white/80 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-white/50 z-20`}
                >
                  <div className="p-2 bg-slate-900 text-white rounded-xl shadow-lg">{tag.icon}</div>
                  <div className="flex flex-col pr-3">
                    <span className="text-[7px] font-black text-gray-400 uppercase">Spec Detail</span>
                    <span className="text-[11px] font-black text-slate-800 tracking-tighter">{tag.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
{/* 2. Colors - Sleek Premium Palette */}
<div className="col-span-1 md:col-span-3 md:row-span-1   bg-white p-6 flex flex-col justify-center border border-gray-100  hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-700 group">
  <div className="flex items-center justify-between mb-1 ">
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1rem] mb-1">Signature Finishes</p>
    </div>
    <div className="h-2.5 w-2.5 rounded-full bg-emerald-600 animate-pulse " />
  </div>
  <div className="relative flex items-center justify-around rounded-[7px] bg-gradient-to-b ps-2 from-slate-50 to-white   py-2 border border-slate-100/50 shadow-inner">
    {['bg-blue-600', 'bg-orange-400', 'bg-lime-400', 'bg-emerald-500', 'bg-rose-500', 'bg-zinc-800'].map((color, i) => (
      <div key={i} className="relative group/color flex flex-col items-center">
        {/* Color Circle */}
        <div 
          className={`w-4 h-4 md:w-7 md:h-7 rounded-full ${color} cursor-pointer 
          transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          hover:scale-[1.3] hover:-translate-y-2 shadow-lg ms-[-8px] 
          ring-4 ring-white group-hover/color:ring-emerald-50`} 
        />
        {/* Glow Effect under the circle */}
        <div className={`absolute -bottom-1 w-4 h-1 blur-md opacity-0 group-hover/color:opacity-100 transition-opacity duration-500 ${color.replace('bg-', 'text-')} opacity-40`} /> 
        {/* Tooltip on Hover */}
        <span className="absolute -top-8 scale-0 group-hover/color:scale-100 transition-transform duration-300 text-[8px] font-black text-slate-400 uppercase tracking-tighter bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">
          Finish {i+1}
        </span>
      </div>
    ))}
  </div>
</div>
{/* 3. X-Bud Card - Dark Luxury */}
          

{/* 3. X-Bud Card - Compact Edition */}
<div className="col-span-1 md:col-span-3 md:row-span-2 bg-gradient-to-br from-white to-emerald-50/40 p-9 flex flex-col justify-between group cursor-pointer hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.15)] transition-all duration-700 border border-emerald-100/50 relative overflow-hidden min-h-0"> 
  {/* Soft Background Decor */}
  <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-200/20 blur-[50px] rounded-full group-hover:bg-emerald-300/30 transition-all duration-1000" />
  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-100/20 blur-[40px] rounded-full" />
  {/* Top Section: Navigation & Rating */}
  <div className="z-10 flex justify-between items-start">
    <div className="w-12 h-12 rounded-xl bg-white md:-translate-y-3 md:-translate-x-3 shadow-sm border border-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 group-hover:text-white transition-all duration-500">
      <Cpu className="w-6 h-6 text-indigo-500" /> 
      </div>
     <div className="flex flex-col items-end gap-1">
      <span className="px-2 py-0.5 bg-white/80 backdrop-blur-md border border-emerald-100 rounded-[5px] text-[7px] font-black text-emerald-700 uppercase tracking-widest shadow-sm">
        Premium Audio
      </span>
      <div className="flex gap-0.5 mt-0.5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-emerald-400 opacity-60" />
        ))}
      </div>
    </div>
  </div>
{/* Middle Section: Scaled Down Image */}
  
  <div className="relative z-10 flex justify-center items-center py-2 my-auto">
    <div className="absolute w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-1000" />
     <img 
      src="/Images/airpod.png" 
      className="w-35 h-35 object-contain  ms-28 md:-translate-y-2  transform drop-shadow-[0_15px_25px_rgba(0,0,0,0.08)] group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
      alt="X-Bud"
    />
  </div>
  <div>
      <h3 className="font-serif italic text-[#1A2421]  md:-translate-x-3 md:-translate-y-25 transform text-xl leading-[1.3rem]">
        Aura<br/>
        <span className="text-emerald-800">Sound</span>
      </h3>
      <p className="text-[9px] text-gray-400 font-bold md:-translate-x-3 md:-translate-y-23 uppercase tracking-[0.2em]  flex items-center gap-1">
        <span className="w-3 h-[1px] bg-emerald-200" /> X-Bud Elite
      </p>
    </div>
  {/* Decorative subtle grid overlay */}
  <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
</div>

     {/* 4. Surface Audio - Immersive */}
      <div className="col-span-1 md:col-span-3 md:row-span-3 bg-white  relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl transition-all h-[250px] md:h-auto border border-gray-100">
        <img src="/Images/3d.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt="Surface" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
        <div className="absolute bottom-6 left-6 text-white ">
          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 block">Professional Grade</span>
          <h3 className="font-serif italic text-2xl leading-tight">Master Studio<br/>Precision</h3>
        </div>
      </div>
      {/* 5. Mini Products - Gallery Style */}
      <div className="col-span-1 md:col-span-3 md:row-span-2 bg-gradient-to-br from-white to-emerald-50/30  p-6 flex flex-col justify-between hover:shadow-xl transition-all border border-gray-50 shadow-sm">
        <div className="flex justify-between items-center">
          <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Ecosystem</h4>
         <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
        </div>
        <div className="flex gap-1 justify-between ">
          {["/Images/pod1.jfif", "/Images/bag2.jfif", "/Images/img5.jfif", "/Images/bag4.jfif", "/Images/img10.jfif"].map((img, i) => (
            <img key={i} src={img} className="w-11 h-9 rounded-xl object-cover hover:ring-2 ring-blue-500 transition-all cursor-pointer shadow-md" alt="item" />
          ))}
        </div>
      </div>
{/* 6. TECH ARCHITECTURE CARD (Replaced Downloads) */}
<div className="col-span-1 md:col-span-2 md:row-span-2 bg-[#f8fafc]  p-4 flex flex-col justify-between relative border border-slate-200 shadow-inner overflow-hidden group">
  {/* Moving Scan Line Animation (Tech Look) */}
  <motion.div 
    animate={{ translateY: [-100, 200] }}
    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    className="absolute inset-x-0 h-[40px] bg-gradient-to-b from-indigo-500/10 to-transparent z-0 pointer-events-none"
  />
  <div className="relative z-10 flex flex-col h-full justify-between">
    {/* Top Tag */}
    <div className="flex justify-between items-center md:-translate-y-1 transform">
      <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm">
        <Cpu className="w-4 h-4 text-indigo-500" />
      </div>
      <span className="text-[7px] font-black bg-indigo-600 text-white px-2 py-1 rounded-md uppercase tracking-widest">v.2.0</span>
    </div>
    {/* Center Stats */}
    <div className="space-y-3">
      <div className="space-y-1">
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Audio Latency</p>
        <div className="flex items-end gap-1">
          <span className="text-1xl font-black text-slate-900 leading-none">0.02</span>
          <span className="text-[10px] font-bold text-indigo-600 mb-0.5">ms</span>
        </div>
      </div> 
      {/* Mini Visual Bars */}
      <div className="flex gap-1 h-8 items-end">
        {[50, 80, 55, 120, 95, 80].map((h, i) => (
          <motion.div 
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.1, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
            className="flex-1 bg-indigo-300 rounded-t-sm group-hover:bg-indigo-500 transition-colors"
          />
        ))}
      </div>
    </div>
  </div>
</div>
{/* 7. NEURAL ENGINE REVEAL - COMPACT LIGHT GLASS CARD */}
<div className="col-span-1 md:col-span-4 md:row-span-2 bg-white  p-5 flex relative group cursor-pointer hover:shadow-xl transition-all duration-500 border border-gray-100 shadow-sm overflow-hidden">
  {/* Soft Ambient Background Pattern */}
  <div className="absolute inset-0 opacity-40 pointer-events-none">
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl" />
  </div>
  {/* Left Side Content  */}
  <div className="flex-1 flex flex-col justify-between z-10 md:-translate-y-2 transform">
    <div className="space-y-2">
      <div className="bg-indigo-50 border border-indigo-100 text-indigo-600 w-fit px-2 py-1 rounded-lg flex items-center gap-1.5">
        <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" />
        <span className="text-[8px] font-black uppercase tracking-widest">Neural v.4</span>
      </div>   
      <h3 className="text-1xl font-bold text-slate-800 leading-[0.9] ">
        Spatial 
        <span className="text-indigo-500 ps-1 font-serif italic leading-[0.9]">Immersion</span>
      </h3>
      <p className="text-[7px] text-slate-500 font-bold m-0 uppercase tracking-widest leading-[0.9]">Advanced Interface</p>
    </div>
    {/* Compact Rating Badge */}
    <div className="flex items-center gap-2 mt-2 bg-slate-50 w-fit p-1.5 rounded-[5px] border border-slate-100">
      <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg shadow-sm">
        <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
        <span className="text-[10px] font-black text-slate-700">4.9</span>
        </div>
        <div className="flex flex-col pr-1">
        <span className="text-[6px] font-black text-slate-400 uppercase leading-none">Status</span>
        <span className="text-[8px] font-bold text-emerald-500 uppercase leading-none mt-0.5">Elite</span>
      </div>
    </div>
  </div>
  {/* Right Side Visuals - Now with Days Left Widget */}
  <div className="relative flex-1 flex flex-col items-end justify-between py-1  md:-translate-y-3 transform">  
    {/* NEW: Days Left Widget (Fills the top right space) */}
    <div className="rounded-[7px] border-2 border-gray-200 bg-indigo-50 text-indigo-600 rounded-[4px] shadow-xl me-4 py-2 px-3 shadow-lg flex flex-col items-center group-hover:bg-indigo-200  transition-colors duration-500">
      <span className="relative text-[11px] font-black font-mono leading-none">09 Days Left</span>
      </div>
    {/* Visual Image Container - Scaled Down */}
    <div className="relative w-40 h-12 flex items-center justify-center  mt-3">
      {/* Soft Glow */}
      <div className="absolute inset-0 bg-indigo-100/50 blur-2xl rounded-full" />
      <img 
        src="/Images/glass.png" 
        className="w-28 h-28 object-contain z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700" 
        alt="Neural Engine" 
      />
      {/* Mini Micro-Waveform */}
      <div className="absolute -bottom-1 right-0 flex gap-0.5 h-6 items-end ">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [4, 15, 7] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
            className="w-0.5 bg-indigo-400 rounded-full"
          />
        ))}
      </div>
    </div>
  </div>
</div>
    </div>
  </div>
</div>
{/** shopsphere evolution yani coming soon section end here */}



{/*  Luxury solution for shopspere section start here with frame motion*/}
 <section className="relative w-full  px-6 md:px-12 lg:px-19 bg-white  md:-translate-y-50 transform">
      {/* Main Card Container  */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-7 bg-[#f8f8f8] p-6 md:p-5 lg:p-15 relative overflow-hidden min-h-fit">
        {/* Left Side: Visual Elements */}
        <div className="relative w-full md:w-1/2 flex justify-center lg:justify-start items-center pl-10 lg:pl-20">
          <div className="absolute top-1/4 -translate-y-1/2 -left-1 w-32 md:w-60 h-56 bg-[#1E3A2B] rounded-[30px] z-0" />
          {/* Image Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-[260px] h-[300px] md:w-[320px] md:h-[380px] rounded-t-full rounded-b-[180px] overflow-hidden shadow-xl border-4 border-white/20"
          >
            <img src="/Images/shop3.jfif" 
              alt="ShopSphere Team" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          {/* Bottom Right Circle */}
          <div className="absolute bottom-1 right-6 md:right-3 w-28 h-28 md:w-32 md:h-32 bg-[#9bf2fc] rounded-full z-20 shadow-md" />
        </div>
        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 z-10 mt-6 md:mt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >  
            <div ref={sectionRef} className="relative space-y-2 overflow-hidden md:-translate-y-1 transform">
              <div className="overflow-hidden">
                <h4 className={`text-emerald-800 text-[10px] transform font-black tracking-[0.4em] uppercase opacity-70 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  Trusted / Since 1990
                </h4>
              </div>
              <div className="relative flex flex-col text-left text-4xl md:text-6xl font-bold ">
                <h2 className={`font-serif italic text-[#1A2421] leading-tight  transition-all duration-[1500ms] ease-out transform-gpu 
                  ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-32 opacity-0'}`}>
                  Solutions For
                  </h2>
                  <span className={`font-sans italic font-black text-[#1A3021]  md:-translate-y-2 transform transition-all duration-[1500ms] ease-out transform-gpu 
                  ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-32 opacity-0'}`}>
                  ShopSphere
                </span>
              </div>
            </div>
            <motion.p variants={itemVariants} className="text-gray-700 text-sm  italic md:text-base leading-snug my-4 max-w-md">
              Empowering your e-commerce journey with scalable solutions. From inventory 
              automation to global logistics, we optimize every touchpoint.
              </motion.p>
           <Link to="/Shop" ><motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.02, backgroundColor: '#000' }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#1E3A2B] text-white px-7 py-2.5 rounded-full font-bold text-xs tracking-wide shadow-lg transition-all"
            >
              Shop With Us
            </motion.button></Link>
             <motion.div variants={itemVariants} className="mt-6 flex gap-6 items-center border-t border-black/10 pt-5">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/50 rounded-lg">
                  <Users size={18} className="text-[#1E3A2B]" />
                </div>
                <div>
                  <p className="text-lg font-bold text-black leading-none">99%</p>
                  <p className="text-[10px] uppercase tracking-wider text-gray-600 font-medium">Satisfaction</p>
                </div>
              </div>
              <div className="w-[1px] h-8 bg-black/10" />
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/50 rounded-lg">
                  <Headset size={18} className="text-[#1E3A2B]" />
                </div>
                <div>
                  <p className="text-lg font-bold text-black leading-none">24/7</p>
                  <p className="text-[10px] uppercase tracking-wider text-gray-600 font-medium">Expert Help</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
 {/*  Luxury solution for shopspere section end here*/}


{/** Professional Promotional Section - Compact Height & Enhanced Hover */}
<section className="w-full px-4 md:px-16 lg:px-19 font-sans mb-5 bg-white relative z-10 overflow-visible md:-translate-y-24 transform">
<div className="max-w-7xl mx-auto border-[4px] border-[#0dfca0] px-9 py-7  w-full bg-white relative ">  
{/* Main Container - Jo items ko ek line mein laye ga */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-5 w-full border border-gray-100 rounded-xl overflow-hidden shadow-sm">
  {[
    { 
      title: 'Shop Sale', 
      icon: 'https://cdn-icons-png.flaticon.com/512/3687/3687399.png', 
      desc: 'Product-based discounts in all categories.', 
      type: 'Margin optimized', 
      useCase: 'Seasonal sales & clearances', 
      color: 'bg-[#6cfaa7]' 
    },
    { 
      title: 'Category Sale', 
      icon: 'https://cdn-icons-png.flaticon.com/512/10553/10553310.png', 
      desc: 'Discounts in one specific category.', 
      type: 'Margin optimized', 
      useCase: 'Overstocked categories', 
      color: 'bg-[#6cfaa7]' 
    },
    { 
      title: 'Vouchers', 
      icon: 'https://cdn-icons-png.flaticon.com/512/10309/10309324.png', 
      desc: 'Voucher code discounts on all products.', 
      type: 'Flat discount', 
      useCase: 'Nurture customer relations', 
      color: 'bg-[#6cfaa7]' 
    },
    { 
      title: 'App Sales', 
      icon: 'https://cdn-icons-png.flaticon.com/512/11545/11545084.png', 
      desc: 'Exclusive product promotion on the app.', 
      type: 'Margin optimized', 
      useCase: 'Increase brand loyalty', 
      color: 'bg-[#82eefa]' 
    },
    { 
      title: 'Engagement Sales', 
      icon: 'https://cdn-icons-png.flaticon.com/512/10200/10200147.png', 
      desc: 'Voted category on social media.', 
      type: 'Flat discount', 
      useCase: 'Incentivize customer loyalty', 
      color: 'bg-[#82eefa]' 
    },
  ].map((item, index) => (
    <div key={index} className="flex flex-col relative group border-r border-gray-100 last:border-r-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 bg-white cursor-pointer overflow-hidden z-10 hover:z-20">
      <div className={`${item.color} text-black font-black py-3 px-2 text-center text-[10px] uppercase tracking-[0.2em] transition-all duration-300`}>
        {item.title}
        </div>
      <div className="flex justify-center py-5 group-hover:bg-gray-50/50 transition-all duration-300">
        <div className={`bg-gradient-to-br ${index < 3 ? 'from-[#1cf18a] to-[#6cfaa7]' : 'from-[#22e9ff] to-[#00b8d4]'} w-18 h-18 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 p-4`}>
          <img src={item.icon} alt={item.title} className="w-full h-full object-contain grayscale brightness-0" />
        </div>
      </div>
      <div className="p-4 text-[11px] min-h-[100px] border-y border-gray-50 flex flex-col justify-center">
        <p className="text-gray-700 leading-snug text-center">
          <strong className="text-gray-900 font-extrabold block mb-1 uppercase text-[9px]">{item.title}</strong> 
          {item.desc}
        </p>
      </div>
      <div className="py-3 text-[8px] text-center font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 group-hover:text-black">
        {item.type}
       </div>
      <div className="bg-[#fff9c4] p-5 text-[10px] min-h-[90px] flex items-center justify-center text-center font-bold text-gray-900 leading-tight group-hover:bg-[#fff176] transition-colors">
        {item.useCase}
      </div>
    </div>
  ))}
</div>
 {/* Black Recommendation Framework */}
    <div className="absolute bottom-[10px] left-[10px]  w-[39.5%]  hidden lg:block z-40 pointer-events-none">
      <div className="relative">
        <div className="absolute -top-[80px] left-0  w-full h-[100px] border-[3px] border-black rounded-[2px] z-0">
          <div className="absolute -left-[60px] top-1/2 -rotate-90 origin-center bg-white">
            <span className="px-1 pe-1 ps-11  py-1 text-[10px]  font-black uppercase tracking-tighter text-black whitespace-nowrap">
              Best use case:
            </span>
          </div>
        </div>
        <div className="mt-8 flex justify-center relative z-50">
          <div className="bg-black text-white text-[11px] font-black uppercase px-14 py-2 tracking-[0.3em] rounded-sm shadow-2xl pointer-events-auto hover:bg-gray-800 transition-all cursor-pointer">
            Recommendation
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


{/* continous sales notification message on screen left bottom start here */}
<AnimatePresence mode="wait">
  {show && (
    <motion.div
      initial={{ opacity: 0, x: -30, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-5 left-10 z-[500] flex items-center gap-4  pr-6 bg-white backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-[2.5rem] min-w-[320px] group"
    >
      {/* Icon Section with Animated Ring */}
      <div className="relative shrink-0 p-1">
        <div className="w-14 h-14 bg-[#131921] rounded-[1.8rem] flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
          <FaShoppingBag className="text-[#febd69] text-xl" />
        </div>
        <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-green-600 border-4 border-white rounded-full">
           <span className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-75"></span>
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
        className="absolute bottom-0 left-8 right-8 h-[3px] bg-gradient-to-r from-transparent via-[#f1b565] to-transparent"
      />
    </motion.div>
  )}
</AnimatePresence>
{/* continous sales notification message on screen left bottom end here */}


{/* chatbot SECTION: right bottom help and instant messaging start here */}
<div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-4">
  {/* CSS to hide original Tidio button  */}
  <style>{`#tidio-chat-bubble { display: none !important; }`}</style>

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
        {/* iski maine logic simple hai, Tidio khulega click par */}
        <FaCommentDots size={24} />
        <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white animate-bounce">1</span>
      </motion.button>
    </div>
  </div>
</div>
{/* chatbot SECTION end here */}



<footer className="w-full font-sans">
  {/** second last footer section start here */}
  <div className="relative bg-[#ffffff] py-11 overflow-hidden  md:-translate-y-13 transform">
  {/* Dynamic Background Elements */}
  <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem]  rounded-full blur-[120px] pointer-events-none"></div>
  <div className="absolute bottom-[-10%] right-[-5%] w-[40rem] h-[40rem]  rounded-full blur-[120px] pointer-events-none"></div>

  <div className="max-w-[90rem] mx-auto px-6 md:px-18 relative z-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
      {features.map((feature, index) => (
        /* Main Wrapper */
        <div key={index} className="relative group cursor-pointer">
          <div className={`absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[2.2rem] bg-gradient-to-br ${feature.accent} opacity-20 transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:opacity-30`}></div>
          {/* THE MAIN FRONT CARD */}
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
{/** second last footer section end here */}



{/* Main Footer Section with Dark Green & Sleek */}
<div className="bg-[#05271e] text-white pt-12 pb-6 font-sans">
  <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-10">
    {/* Brand Column */}
    <div className="md:col-span-3 space-y-4">
      <div className="flex items-center gap-2">
        {/* Logo Icon Added */}
        <img src="/Images/log.png" className="w-10 h-10 md:w-14 md:h-16 object-cover rounded-[15px] transition-all duration-500 group-hover:rotate-3 group-hover:scale-105 " />
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

export default CommurzLanding;
