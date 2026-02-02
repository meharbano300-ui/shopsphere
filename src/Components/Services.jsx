import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, MapPin, Menu, ChevronDown, Plus, Star, 
  ChevronLeft, ChevronRight, Heart, Share2, Truck, Shield, 
  Clock, CheckCircle, Filter, X,  LayoutGrid,  Microwave, CookingPot, Shirt, 
  Sparkles, Home, Trophy, Book, Gamepad2, Car, Dog ,ArrowRight
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, FaStore } from "react-icons/fa";
import { MousePointerClick, MessageSquare, Zap, Activity, Cpu, Music2, Radio, ShoppingBag, Smartphone, 
  Tv, Tags, MousePointer2 } from 'lucide-react';
import { FaSearch, FaShoppingCart, FaStar, FaStarHalfAlt, 
  FaTruck, FaHeart, FaMapMarkerAlt, FaChevronDown, FaHome,
  FaClock, FaCheckCircle, FaBoxOpen, FaInfoCircle, 
} from "react-icons/fa";
import { useNavigate , Link} from 'react-router-dom'; 
import LoginModal from "./LoginModal";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";


// Extended Mock Data with Real-like Images
const allProducts = [
  { 
    id: 1, 
    name: "Elevate Your Home with Advanced Electronics", 
    price: "8,055", 
    oldPrice: "11,189", 
    discount: "28%", 
    category: "Electronics", 
    subcategory: "Audio",
    rating: 4, 
    reviews: 1240,
    image: "images/categories/e1.jfif",
    delivery: "Tomorrow",
    stock: "In Stock",
    brand: "Crystala"
  },
    { 
    id: 2, 
    name: "Premium Tech for Your Daily Life", 
    price: "31,055", 
    oldPrice: "52,189", 
    discount: "22%", 
    category: "Electronics", 
    subcategory: "Wearables",
    rating: 4.5, 
    reviews: 6240,
    image: "images/categories/e2.jfif",
    delivery: "Only 2 Days ",
    stock: "In Stock",
    brand: "Wearables"
  },
  { 
    id: 3, 
    name: "Best Laptops | Work & Gaming | Powerful & Stylish Picks", 
    price: "56,055", 
    oldPrice: "59,189", 
    discount: "20%", 
    category: "Electronics", 
    subcategory: "Gaming",
    rating: 4.7, 
    reviews: 98840,
    image: "images/categories/s27.jfif",
    delivery: "Only 4 Days ",
    stock: "In Stock",
    brand: "Gaming"
  },
   { 
    id: 4, 
    name: "24 Inch Core I7 I9 Computer | smooth dark,", 
    price: "3,055", 
    oldPrice: "5,189", 
    discount: "12%", 
    category: "Electronics", 
    subcategory: "Computers",
    rating: 4.1, 
    reviews: 2440,
    image: "images/categories/s28.jfif",
    delivery: "Only 2 Days ",
    stock: "In Stock",
    brand: "Computers"
  },
   { 
    id: 5, 
    name: "Smart Solutions for Daily Living ", 
    price: "78,033", 
    oldPrice: "86,992", 
    discount: "28%", 
    category: "Appliances", 
    subcategory: "Ventilation",
    rating: 5, 
    reviews: 3492,
    image: "images/categories/s2.jfif",
    delivery: "5 days",
    stock: "Only 3 left",
    brand: "Ventilation"
  },
    { 
    id: 6, 
    name: "Upgrade Your Lifestyle With ShopSphere ", 
    price: "8,903", 
    oldPrice: "9,992", 
    discount: "20%", 
    category: "Appliances", 
    subcategory: "Washing Machine",
    rating: 5, 
    reviews: 9092,
    image: "images/categories/s3.jfif",
    delivery: "Only 7 Days",
    stock: "Only 3 left",
    brand: "Washing Machine"
  },
  { 
    id: 7, 
    name: "Non-Stick Granite Cookware Set | Modern Kitchen", 
    price: "12,903", 
    oldPrice: "29,992", 
    discount: "25%", 
    category: "Appliances", 
    subcategory: "Cookware",
    rating: 5, 
    reviews: 9092,
    image: "images/categories/s29.jfif",
    delivery: "1 days",
    stock: "Tomorrow",
    brand: "Cookware"
  },
  { 
    id: 8, 
    name: "Stainless Steel Stove Gap Cover (2 Pack)", 
    price: "2,000", 
    oldPrice: "6,992", 
    discount: "28%", 
    category: "Kitchen", 
    subcategory: "Cookware",
    rating: 5, 
    reviews: 25992,
    image: "images/categories/s1.jfif",
    delivery: "Only 2 Days",
    stock: "Only 3 left",
    brand: "KitchenPro"
  },
  { 
    id: 9, 
    name: "Thyme & Table 32-Piece Non-Stick Utensils", 
    price: "36,003", 
    oldPrice: "48,755", 
    discount: "20%", 
    category: "Kitchen", 
    subcategory: "Utensils",
    rating: 4.4, 
    reviews: 5767,
    image: "images/categories/s4.jfif",
    delivery: "Only 3 Days",
    stock: "In Stock",
    brand: "AMZCHEF"
  },
   { 
    id: 10, 
    name: "Wooden Kitchen Organizer Shelf: Rustic Spice Rack & Paper", 
    price: "47,003", 
    oldPrice: "58,755", 
    discount: "20%", 
    category: "Kitchen", 
    subcategory: "Storage",
    rating: 4.3, 
    reviews: 567,
    image: "images/categories/s30.jfif",
    delivery: "2 days",
    stock: "In Stock",
    brand: "AMZCHEF"
  },
  { 
    id: 11, 
    name: "Trendsetting Looks, Express Your Unique Self", 
    price: "6,628", 
    oldPrice: "7,551", 
    discount: "12%", 
    category: "Fashion", 
    subcategory: "Bags",
    rating: 3.9, 
    reviews: 3842,
    image: "images/categories/s5.jfif",
    delivery: "Only 4 Days",
    stock: "In Stock",
    brand: "PUREPLUS"
  },
    { 
    id: 12, 
    name: "Ladies Winter Trench Coat Double-Breasted ", 
    price: "27,938", 
    oldPrice: "46,981", 
    discount: "12%", 
    category: "Fashion", 
    subcategory: "Clothing",
    rating: 3.9, 
    reviews: 342,
    image: "images/categories/s6.jfif",
    delivery: "Tomorrow",
    stock: "In Stock",
    brand: "PUREPLUS"
  },
   { 
    id: 13, 
    name: "Mesh Upper Design With Platform And Wedge Sneakers  ", 
    price: "45,628", 
    oldPrice: "56,758", 
    discount: "12%", 
    category: "Fashion", 
    subcategory: "Shoes",
    rating: 3, 
    reviews: 342,
    image: "images/categories/s31.jfif",
    delivery: "Only 8 Days Left",
    stock: "In Stock",
    brand: "Shoes"
  },
    { 
    id: 14, 
    name: "Jewelry Set For Women Bowknot Shape Jewelry Set - 132-2 ", 
    price: "29,858", 
    oldPrice: "36,758", 
    discount: "15%", 
    category: "Fashion", 
    subcategory: "Accessories",
    rating: 3.9, 
    reviews: 5542,
    image: "images/categories/s32.jfif",
    delivery: "Only 8 Days Left",
    stock: "In Stock",
    brand: "Luxury"
  },
  { 
    id: 15, 
    name: "Aesthetic Makeup Collection Flatlay", 
    price: "16,007", 
    oldPrice: "17,904", 
    discount: "11%", 
    category: "Beauty", 
    subcategory: "Makeup Tools",
    rating: 5, 
    reviews: 95834,
    image: "images/categories/s7.jfif",
    delivery: "Only 3 Days",
    stock: "Only 5 left",
    brand: "Huda Beauty"
  },
    { 
    id: 16, 
    name: "Best Skin Care Products | Glow Up with Top Picks", 
    price: "16,007", 
    oldPrice: "17,904", 
    discount: "16%", 
    category: "Beauty", 
    subcategory: "Skincare",
    rating: 5, 
    reviews: 95834,
    image: "images/categories/s8.jfif",
    delivery: "Only 2 Days",
    stock: "Only 8 left",
    brand: "Beauty & Skin Care"
  },
      { 
    id: 17, 
    name: "Top Perfumes Under AED 100 That Smell Like Luxury", 
    price: "16,007", 
    oldPrice: "17,904", 
    discount: "13%", 
    category: "Beauty", 
    subcategory: "Fragrances",
    rating: 5, 
    reviews: 1234,
    image: "images/categories/s9.jfif",
    delivery: "Only 5 Days",
    stock: "In Stock",
    brand: "J'adore Dior"
  },
  { 
    id: 18, 
    name: "Transform Your Space: Farmhouse Luxury Bedding", 
    price: "99,870", 
    oldPrice: "95,000", 
    discount: "10%", 
    category: "Home", 
    subcategory: "Bedding",
    rating: 5, 
    reviews: 9467,
    image: "images/categories/s10.jfif",
    delivery: "Tomorrow",
    stock: "In Stock",
    brand: "Duvet"
  },
    { 
    id: 19, 
    name: "29 Black and White Minimalist Apartment Design", 
    price: "23,870", 
    oldPrice: "35,000", 
    discount: "10%", 
    category: "Home", 
    subcategory: "Furniture",
    rating: 5, 
    reviews: 4367,
    image: "images/categories/s11.jfif",
    delivery: "Only 2 Days",
    stock: "In Stock",
    brand: "Austin"
  },
   { 
    id: 20, 
    name: "26+ Luxury Dining Room Updates to Impress Your Guests", 
    price: "23,870", 
    oldPrice: "35,000", 
    discount: "10%", 
    category: "Home", 
    subcategory: "Decor",
    rating: 5, 
    reviews: 8967,
    image: "images/categories/s12.jfif",
    delivery: "Tomorrow",
    stock: "Only 2 Days",
    brand: "Crystal"
  },
  { 
    id: 21, 
    name: "Chris Hemsworth's reveals workout that got him in shape for Thor", 
    price: "12,500", 
    oldPrice: "15,000", 
    discount: "15%", 
    category: "Sports", 
    subcategory: "Fitness",
    rating: 4, 
    reviews: 2890,
    image: "images/categories/s13.jfif",
    delivery: "3 days",
    stock: "In Stock",
    brand: "Fitness"
  },
   { 
    id: 22, 
    name: "16+ Inspiring Outdoor Home Gym Ideas", 
    price: "85,990", 
    oldPrice: "99,857", 
    discount: "15%", 
    category: "Sports", 
    subcategory: "Outdoor",
    rating: 4.9, 
    reviews: 2890,
    image: "images/categories/s14.jfif",
    delivery: "7 days",
    stock: "Only 7 Days",
    brand: "Fitness_Worth"
  },
   { 
    id: 23, 
    name: "Comfortable & Stylish Gym Outfit Ideas", 
    price: "12,500", 
    oldPrice: "15,000", 
    discount: "15%", 
    category: "Sports", 
    subcategory: "Gym Gear",
    rating: 4, 
    reviews: 2890,
    image: "images/categories/s15.jfif",
    delivery: "Only 4 days",
    stock: "In Stock",
    brand: "Fitness"
  },
  { 
    id: 24, 
    name: "Best Women's Fiction Books - Elegant Design", 
    price: "4,500", 
    oldPrice: "6,000", 
    discount: "25%", 
    category: "Books", 
    subcategory: "Fiction",
    rating: 4.8, 
    reviews: 1567,
    image: "images/categories/s16.jfif",
    delivery: "Tomorrow",
    stock: "Only 2 left",
    brand: "Ultimate"
  },
   { 
    id: 25, 
    name: "Stop waiting for the perfect time, ⏳ Do It Today", 
    price: "2,760", 
    oldPrice: "6,000", 
    discount: "25%", 
    category: "Books", 
    subcategory: "Self-Help",
    rating: 4, 
    reviews: 98687,
    image: "images/categories/s17.jfif",
    delivery: "8 Days Left",
    stock: "Only 2 left",
    brand: "Darius Foroux,"
  },
   { 
    id: 26, 
    name: "Brain Quest Other | Everything You Need To Ace", 
    price: "43,500", 
    oldPrice: "64,000", 
    discount: "25%", 
    category: "Books", 
    subcategory: "Educational",
    rating: 4.5, 
    reviews: 1567,
    image: "images/categories/s18.jfif",
    delivery: "2 Days",
    stock: "Only 2 left",
    brand: "Education"
  },
  { 
    id: 27, 
    name: "Temu | Marvel Avengers: Iron Man Articulated Action Figure", 
    price: "19,900", 
    oldPrice: "22,000", 
    discount: "19%", 
    category: "Toys", 
    subcategory: "Action Figures",
    rating: 4.1, 
    reviews: 3456,
    image: "images/categories/s19.jfif",
    delivery: "Only 5 Days Left",
    stock: "In Stock",
    brand: "Action"
  },
    { 
    id: 28, 
    name: "Woodsy Village. 30x20 1014 jigsaw puzzle for kids", 
    price: "89,900", 
    oldPrice: "99,000", 
    discount: "23%", 
    category: "Toys", 
    subcategory: "Puzzles",
    rating: 4.2, 
    reviews: 3456,
    image: "images/categories/s20.jfif",
    delivery: "Tomorrow",
    stock: "In Stock",
    brand: "Puzzles"
  },
  { 
    id: 29, 
    name: "Custom Business Board Game Boards/Plates Manufacturer", 
    price: "56,900", 
    oldPrice: "67,000", 
    discount: "23%", 
    category: "Toys", 
    subcategory: "Board Games",
    rating: 4, 
    reviews: 3456,
    image: "images/categories/s21.jfif",
    delivery: "Only 5 Days Left",
    stock: "In Stock",
    brand: "Board Games"
  },
  { 
    id: 30, 
    name: "Rolls-Royce, Luxurious,Powerful, Prestigious, Exclusive,", 
    price: "34,800", 
    oldPrice: "45,500", 
    discount: "26%", 
    category: "Automotive", 
    subcategory: "Car Care",
    rating: 5, 
    reviews: 2345,
    image: "images/categories/s22.jfif",
    delivery: "Only 23 days",
    stock: "In Stock",
    brand: "Craftsmanship"
  },
    { 
    id: 31, 
    name: "inclusive cover, full leather car seat cushion, Driver's seat cover", 
    price: "99,9890", 
    oldPrice: "987,980", 
    discount: "26%", 
    category: "Automotive", 
    subcategory: "Accessories",
    rating: 5, 
    reviews: 2345,
    image: "images/categories/s23.jfif",
    delivery: "Only 7 days",
    stock: "In Stock",
    brand: "Rhinestone"
  },
   { 
    id: 32, 
    name: "Spanner Socket Set 1/4inch Screwdriver Ratchet Wrench Set Kit Car Repair Tools", 
    price: "45,9890", 
    oldPrice: "76,980", 
    discount: "20%", 
    category: "Automotive", 
    subcategory: "Tools",
    rating: 5, 
    reviews: 2345,
    image: "images/categories/s24.jfif",
    delivery: "Only 7 days",
    stock: "In Stock",
    brand: "Parácar"
  },
  { 
    id: 33, 
    name: "Ceramic & PP Automatic Cat Feeder with Large Capacity", 
    price: "245,000", 
    oldPrice: "275,000", 
    discount: "13%", 
    category: "Pet Supplies", 
    subcategory: "Pet Food",
    rating: 5, 
    reviews: 789,
    image: "images/categories/s25.jfif",
    delivery: "4 days ",
    stock: "Only 1 left",
    brand: "Ceramic"
  },
   { 
    id: 34, 
    name: "Modern Cat Desk Bed Attachment 360° Rotating Soft Faux", 
    price: "387,000", 
    oldPrice: "565,450", 
    discount: "31%", 
    category: "Pet Supplies", 
    subcategory: "Grooming",
    rating: 5, 
    reviews: 789,
    image: "images/categories/s26.jfif",
    delivery: "Only 4 days Left",
    stock: "Only 9 left",
    brand: "Ceramic"
  },
    { 
    id: 35, 
    name: "Smartphone 16 Pro Max 256 GB Desert T", 
    price: "4,055", 
    oldPrice: "5,189", 
    discount: "22%", 
    category: "Electronics", 
    subcategory: "Mobile",
    rating: 4.5, 
    reviews: 6240,
    image: "images/categories/s33.jfif",
    delivery: "Only 5 today ",
    stock: "In Stock",
    brand: "Mobile"
  },
   { 
    id: 36, 
    name: "Portable Air Conditioner 7000 BTU", 
    price: "18,903", 
    oldPrice: "19,992", 
    discount: "20%", 
    category: "Appliances", 
    subcategory: "AC",
    rating: 5, 
    reviews: 9092,
    image: "images/categories/s34.jfif",
    delivery: "1 days",
    stock: "Only 2 Days Left",
    brand: "YOPOWER"
  },
    { 
    id: 37, 
    name: "Freepik | All-in-One AI Creative Suite", 
    price: "5,000", 
    oldPrice: "6,992", 
    discount: "28%", 
    category: "Kitchen", 
    subcategory: "Small Appliances",
    rating: 5, 
    reviews: 2592,
    image: "images/categories/s35.jfif",
    delivery: "Today",
    stock: "Only 3 left",
    brand: "Small Appliances"
  },
    { 
    id: 38, 
    name: "Best Hair Treatments for Women: Restore Shine,", 
    price: "16,007", 
    oldPrice: "17,904", 
    discount: "11%", 
    category: "Beauty", 
    subcategory: "Hair Care",
    rating: 5, 
    reviews: 1234,
    image: "images/categories/s36.jfif",
    delivery: "3 Todays",
    stock: "In Stock",
    brand: "Hair Care"
  },
   { 
    id: 39, 
    name: "Eco-Friendly Lighting: LED Options for a Brighter Home", 
    price: "55,467", 
    oldPrice: "94,875", 
    discount: "11%", 
    category: "Home", 
    subcategory: "Lighting",
    rating: 5, 
    reviews: 8967,
    image: "images/categories/s37.jfif",
    delivery: "Tomorrow",
    stock: "Only 2 Days",
    brand: "Lighting"
  },
    { 
    id: 40, 
    name: "best quality sports equipment", 
    price: "12,500", 
    oldPrice: "15,000", 
    discount: "15%", 
    category: "Sports", 
    subcategory: "Team Sports",
    rating: 4, 
    reviews: 2890,
    image: "images/categories/s38.jfif",
    delivery: "Only 7 days",
    stock: "In Stock",
    brand: "Team Sports"
  },
  { 
    id: 41, 
    name: "📚 Explore Delightful Children's Stories! ", 
    price: "43,500", 
    oldPrice: "44,000", 
    discount: "25%", 
    category: "Books", 
    subcategory: "Children",
    rating: 4.5, 
    reviews: 1567,
    image: "images/categories/s39.jfif",
    delivery: "2 Days",
    stock: "Only 2 left",
    brand: "Children Books"
  },
   { 
    id: 42, 
    name: "🔥 TECHLY SHOP Electronics & Modern Gadgets Specialist ", 
    price: "3,785", 
    oldPrice: "5,189", 
    discount: "20%", 
    category: "Electronics", 
    subcategory: "Audio",
    rating: 4, 
    reviews: 1240,
    image: "images/categories/s41.jfif",
    delivery: "Tomorrow",
    stock: "In Stock",
    brand: "Audio"
  },
   { 
    id: 43, 
    name: "🔥 Luxury Tech Gift Ideas | Minimalist Phone & Wireless Accessories", 
    price: "13,785", 
    oldPrice: "15,189", 
    discount: "20%", 
    category: "Electronics", 
    subcategory: "Wearables",
    rating: 4, 
    reviews: 1240,
    image: "images/categories/s40.jfif",
    delivery: "Tomorrow",
    stock: "In Stock",
    brand: "Wearables"
  },
   { 
    id: 44, 
    name: "Electronics And Kitchen Appliances Shipping", 
    price: "8,903", 
    oldPrice: "9,992", 
    discount: "20%", 
    category: "Appliances", 
    subcategory: "Cookware",
    rating: 5, 
    reviews: 9092,
    image: "images/categories/s42.jfif",
    delivery: "Only 7 Days",
    stock: "Only 3 left",
    brand: "Appliances"
  },
];


const AmazonAdvancedDeals = () =>   {    // login signup states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [timeLeft, setTimeLeft] = useState({ hours: 12, mins: 45, secs: 30 });
  const [showNotification, setShowNotification] = useState(false); 
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 500000 });
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const scrollRef = useRef(null);


// add to cart our notification ki states start here 
const [cartItems, setCartItems] = useState([]); 
const [showNotif, setShowNotif] = useState(false); 
const [productName, setProductName] = useState("");
useEffect(() => {
  const savedCart = localStorage.getItem('shopSphereCart');
  if (savedCart) {
    setCartItems(JSON.parse(savedCart));
  }
}, []);
// add to cart our notification ki states end here


const [notification, setNotification] = useState({ show: false, message: "", type: "" });
// Services Page par addToWishlist function ki states start here
const addToWishlist = (product) => {
  const savedWishlist = JSON.parse(localStorage.getItem('userWishlist')) || [];
  const isExist = savedWishlist.find(item => (item.id || item.name) === (product.id || product.name));
  if (!isExist) {
    const updatedWishlist = [...savedWishlist, product];
    localStorage.setItem('userWishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event("wishlistUpdated")); 
    
    // Custom Notification Show Karein
    setNotification({ show: true, message: "Product Added to Wishlist!", type: "success" });
  } else {
    setNotification({ show: true, message: "Already in Your Wishlist!", type: "error" });
  }
  // 3 Seconds baad notification ko khud hi hide kar dein
  setTimeout(() => {
    setNotification({ show: false, message: "", type: "" });
  }, 3000);
};
// Services Page par addToWishlist function ki states end here


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
// Jab bhi cart badle, save ho jaye
useEffect(() => {
  localStorage.setItem('my_permanent_cart', JSON.stringify(cartItems));
}, [cartItems]);


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
        item.id === product.id 
          ? { ...item, quantity: (Number(item.quantity) || 1) + 1 } 
          : item
      );
    } else {
      // --- product with description ky lieye ---
      const productToAdd = {
        id: product.id,
        title: product.title || product.name || "Untitled Item",
        image: product.image || (product.images && product.images[0]),
        category: product.category,
        rating: product.rating,
        discount: product.discount,
        quantity: 1,
        price: Number(product.price) || 0, 
        oldPrice: Number(product.oldPrice || product.originalPrice) || 0, 
        displayPrice: product.price?.toLocaleString(), 
        currency: product.currency || "$", 
      };
      updatedCart = [...existingCart, productToAdd];
    }
    localStorage.setItem('shopSphereCart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
    setProductName(product.title || product.name || "Product Added");
    setShowNotif(true);
    setTimeout(() => {
      setShowNotif(false);
    }, 3000);
  } catch (error) {
    console.error("Cart crash avoided:", error);
  }
};
// add to cart karny kay lieye our counter kay lieye states our logic end


// search bar ki logic and states start here
const [searchTerm, setSearchTerm] = useState("");
const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'All' || product.subcategory === selectedSubcategory;
    const priceStr = String(product.price || "0").replace(/,/g, '');
    const numericPrice = parseFloat(priceStr);
    const matchesPrice = numericPrice >= priceFilter.min && numericPrice <= priceFilter.max;
    // Rating Match (Safe Check)
    const matchesRating = (product.rating || 0) >= ratingFilter;
    // maine ?. use kiya hai taake agar description na ho to crash na ho
    const name = product.name?.toLowerCase() || "";
    const description = product.description?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    const matchesSearch = name.includes(search) || description.includes(search);
    return matchesCategory && matchesSubcategory && matchesPrice && matchesRating && matchesSearch;
});
// search bar ki logic and states end here


// --- Pagination Logic Start here---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; 
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  // Jab filter badle to page 1 par wapis le jao
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts.length]);
// --- Pagination Logic end here---
 

    const categories = [
    { name: "All", icon: <LayoutGrid size={16} />, count: allProducts.length },
    { name: "Electronics", icon: <Smartphone size={16} />, count: allProducts.filter(p => p.category === "Electronics").length },
    { name: "Appliances", icon: <Microwave size={16} />, count: allProducts.filter(p => p.category === "Appliances").length },
    { name: "Kitchen", icon: <CookingPot size={16} />, count: allProducts.filter(p => p.category === "Kitchen").length },
    { name: "Fashion", icon: <Shirt size={16} />, count: allProducts.filter(p => p.category === "Fashion").length },
    { name: "Beauty", icon: <Sparkles size={16} />, count: allProducts.filter(p => p.category === "Beauty").length },
    { name: "Home", icon: <Home size={16} />, count: allProducts.filter(p => p.category === "Home").length },
    { name: "Sports", icon: <Trophy size={16} />, count: allProducts.filter(p => p.category === "Sports").length },
    { name: "Books", icon: <Book size={16} />, count: allProducts.filter(p => p.category === "Books").length },
    { name: "Toys", icon: <Gamepad2 size={16} />, count: allProducts.filter(p => p.category === "Toys").length },
    { name: "Automotive", icon: <Car size={16} />, count: allProducts.filter(p => p.category === "Automotive").length },
    { name: "Pet Supplies", icon: <Dog size={16} />, count: allProducts.filter(p => p.category === "Pet Supplies").length },
];
  
const subcategories = {
    "All": ["All"],
    "Electronics": ["All", "Audio", "Wearables", "Gaming",  "Computers", "Mobile"],
    "Appliances": ["All", "Cookware", "Ventilation", "Washing Machine", "AC"],
    "Kitchen": ["All", "Cookware", "Utensils", "Storage", "Small Appliances"],
    "Fashion": ["All", "Bags", "Clothing", "Shoes", "Accessories"],
    "Beauty": ["All", "Makeup Tools", "Skincare", "Fragrances", "Hair Care"],
    "Home": ["All", "Bedding", "Furniture", "Decor", "Lighting"],
    "Sports": ["All", "Fitness", "Outdoor", "Gym Gear", "Team Sports"],
    "Books": ["All", "Fiction", "Self-Help", "Educational", "Children"],
    "Toys": ["All", "Action Figures", "Puzzles", "Board Games", "Remote Control"],
    "Automotive": ["All", "Car Care", "Accessories", "Tools"],
    "Pet Supplies": ["All", "Pet Food", "Grooming", "Toys",],
};


// Scroll Logic
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') current.scrollLeft -= 300;
    else current.scrollLeft += 300;
  };
  const getCurrentSubcategories = () => {
    return subcategories[selectedCategory] || ["All"];
  };

  // Price ranges
  const priceRanges = [
    { label: "Under PKR 2,500", min: 0, max: 2500 },
    { label: "PKR 2,500 to 5,000", min: 2500, max: 5000 },
    { label: "PKR 5,000 to 10,000", min: 5000, max: 10000 },
    { label: "PKR 10,000 to 25,000", min: 10000, max: 25000 },
    { label: "PKR 25,000 & Above", min: 25000, max: 500000 }
  ];

  return (
    <div className="bg-[#eaeded] min-h-screen font-sans text-sm  ">
   {/** add to cart ki notification premium styling start */}
  <AnimatePresence>
  {showNotif && (
    <motion.div 
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.95 }}
      className="fixed top-15 right-5 z-[999] group"
    >
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


{/* HEADER section start here WITH GAPS */}
      <header className="bg-[#131921] sticky top-0 z-50 py-2  md:px-2 flex items-center gap-3 text-white shadow-xl transition-all">
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
{/* Search Bar Update working main ... start here*/}
<div className="flex flex-grow items-center max-w-2xl h-10 rounded-md overflow-hidden bg-white/10 mx-2 md:mx-4 border-2 border-transparent focus-within:border-[#f08804] min-w-0">
  <input 
    type="text" 
    className="flex-grow px-3 h-full text-gray border-2 border-[#dba053] outline-none min-w-0 w-full" 
    placeholder="Search ShopSphere.pk"
    value={searchTerm} 
    onChange={(e) => setSearchTerm(e.target.value)} 
  />
  <button className="bg-[#febd69] px-3 md:px-5 h-full hover:bg-[#f3a847] text-black transition-colors flex-shrink-0">
    <Search size={22} />
  </button>
</div>
{/* Search Bar Update working main ... end here*/}

  
{/* Header main Accounts section desktop+mobil ky lieye start here*/}  
   <div className="hidden lg:block relative">
  <div 
    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
    className="flex flex-col items-start cursor-pointer border-2 border-transparent  p-1 px-3 rounded-xl transition-all duration-300 group"
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
      <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="p-2  hover:bg-emerald-100/30 rounded-lg">
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
      <span className="absolute -top-2 -right-4 bg-[#febd69] rounded-full text-[9px] px-1.5 py-1 font-bold text-black border-2 border-[#131921] shadow-lg animate-bounce">
      {cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}
      </span>
    </div>
    <span className="font-bold hidden sm:block self-end mb-1">Cart</span>
  </div>
</header>
{/* HEADER section end here WITH GAPS */}


{/*  3rd Header & Category Bar  */}
<div className="relative bg-white shadow-sm border-b border-gray-100">
  {/* Top Dark Bar amazon style*/}
  <div className="bg-[#232f3e] text-white flex items-center px-4 py-2 gap-4 text-[13px] font-medium overflow-x-auto no-scrollbar shadow-inner">
    <button className="flex items-center gap-1.5 hover:ring-1 hover:ring-white/50 px-2 py-1 rounded-sm transition-all whitespace-nowrap group">
      <Menu size={18} className="group-hover:scale-110 transition-transform" />
      <span className="font-bold">All</span>
    </button> 
    {/* Navigation Links */}
    <div className="flex items-center gap-2">
      {[
        "Today's Deals", "Customer Service", "Registry", "Gift Cards",  "Electronics",
        "Prime", "Fashion", "Home & Kitchen"
      ].map((item) => (
        <button key={item}
          className="px-2.5 py-1 text-gray-200 hover:text-white hover:ring-1 hover:ring-white/50 rounded-sm transition-all whitespace-nowrap"
        >
          {item}
        </button>
      ))}
    </div>
  </div>

  {/* Main Category Bar with Scroll Controls */}
  <div className="flex items-center px-4   bg-gradient-to-b from-white to-gray-50/50 relative">
    {/* Left Scroll Button */}
    <button 
      onClick={() => scroll('left')} 
      className="p-2.5 hover:bg-white hover:text-orange-600 rounded-full shadow-md z-10 bg-white border border-gray-100 transition-all active:scale-90 group hidden sm:block"
    >
      <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
    </button>
    {/* Category List */}
    <div 
      ref={scrollRef} 
      className="flex overflow-x-auto whitespace-nowrap p-2 scroll-smooth no-scrollbar grow mx-2"
    >
      {categories.map(cat => (
        <button 
          key={cat.name}
          onClick={() => {
            setSelectedCategory(cat.name);
            setSelectedSubcategory('All');
          }}
          className={`flex items-center gap-2.5 text-sm px-5 py-1.5 rounded-[7px] transition-all duration-300 relative group ${
            selectedCategory === cat.name 
              ? 'bg-white text-orange-500 shadow-[0_4px_15px_rgba(255,165,0,0.15)] border border-orange-100' 
              : 'text-gray-600 hover:bg-white hover:shadow-sm hover:text-orange-500 border border-transparent'
          }`}
        >
          <span className="text-xl group-hover:scale-125 transition-transform duration-300">{cat.icon}</span>
          <span className={`font-semibold tracking-tight ${selectedCategory === cat.name ? 'opacity-100' : 'opacity-80'}`}>
            {cat.name}
          </span>
          {cat.count > 0 && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md transition-colors ${
              selectedCategory === cat.name ? 'bg-orange-100 text-orange-500' : 'bg-gray-100 text-gray-500'
            }`}>
              {cat.count}
            </span>
          )} 
          {/* Active Bottom Indicator */}
          {selectedCategory === cat.name && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-orange-400 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.5)]"></div>
          )}
        </button>
      ))}
    </div>
    {/* Right Scroll Button */}
    <button 
      onClick={() => scroll('right')} 
      className="p-2.5 hover:bg-white hover:text-orange-600 rounded-full shadow-md z-10 bg-white border border-gray-100 transition-all active:scale-90 group hidden sm:block"
    >
      <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
    </button>
  </div>
</div>
{/* Subcategories Bar (Floating Pills Style)  */}
{selectedCategory !== 'All' && (
  <div className="bg-white/60 backdrop-blur-sm border-b py-3 px-6 overflow-hidden">
    <div className="max-w-[1400px] mx-auto flex items-center gap-4">
      <div className="flex items-center gap-2 text-gray-400">
        <span className="text-[11px] font-black uppercase tracking-[0.1em] whitespace-nowrap">
          Filter by:
        </span>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {getCurrentSubcategories().map(sub => (
          <button
            key={sub}
            onClick={() => setSelectedSubcategory(sub)}
            className={`px-5 py-2 text-xs font-bold rounded-[7px] whitespace-nowrap transition-all duration-300 transform active:scale-95 ${
              selectedSubcategory === sub
                ? 'bg-[#1a202c] text-white shadow-lg ring-4 ring-gray-100'
                : 'bg-white text-gray-600 hover:text-orange-600 hover:border-orange-200 border border-gray-100 shadow-sm'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>
    </div>
  </div>
)}


{/* Main Content -- main body */}
 <div className="flex max-w-[1800px] mx-auto pb-9 bg-white px-2 gap-3">
 <aside className="w-64 flex-shrink-0 hidden rounded-[7px] lg:block mt-5 bg-white/80 backdrop-blur-xl p-6 h-fit shadow-[0_8px_30px_rgb(0,0,0,0.2)] sticky top-24  border border-gray-100 custom-scrollbar transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
  {/* Header Section */}
  <div className="flex items-center justify-between mb-8">
    <h3 className="font-extrabold text-xl flex items-center gap-2 text-gray-900 tracking-tight">
      <div className="p-2 bg-orange-100 rounded-xl text-orange-500">
        <Filter size={20} strokeWidth={2.5} />
      </div>
      Filters
    </h3>
    <button 
      onClick={() => {
        setPriceFilter({ min: 0, max: 500000 });
        setRatingFilter(0);
      }}
      className="text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-orange-600 transition-colors bg-blue-50 hover:bg-orange-50 px-3 py-1.5 rounded-lg"
    >
      Clear all
    </button>
  </div>
  {/* Department Filter */}
  <section className="mb-8 pb-6 border-b border-gray-100/80">
    <h4 className="font-black text-xs uppercase tracking-[0.15em] mb-5 text-gray-400">Department</h4>
    <ul className="space-y-3 text-gray-700">
      {categories.filter(c => c.name !== "All").map(d => (
        <li 
          key={d.name} 
          onClick={() => setSelectedCategory(d.name)}
          className="flex items-center justify-between cursor-pointer group transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 border-2 rounded-get-6 transition-all duration-300 flex items-center justify-center ${
              selectedCategory === d.name 
              ? 'bg-orange-500 border-orange-500 shadow-[0_4px_10px_rgba(249,115,22,0.3)]' 
              : 'border-gray-200 group-hover:border-orange-300'
            }`}>
              {selectedCategory === d.name && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
            </div>
            <span className={`text-sm font-medium transition-colors ${selectedCategory === d.name ? 'text-orange-600 font-bold' : 'group-hover:text-orange-600'}`}>
              {d.name}
            </span>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all duration-300 ${
            selectedCategory === d.name 
            ? 'bg-orange-100 text-orange-600' 
            : 'bg-gray-50 text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-400'
          }`}>
            {d.count}
          </span>
        </li>
      ))}
    </ul>
  </section>
  {/* Price Filter */}
  <section className="mb-8 pb-6 border-b border-gray-100/80">
    <h4 className="font-black text-xs uppercase tracking-[0.15em] mb-5 text-gray-400">Price Range</h4>
    <div className="space-y-2">
      {priceRanges.map(range => (
        <div 
          key={range.label}
          onClick={() => setPriceFilter(range)}
          className={`flex items-center gap-3 cursor-pointer p-2 rounded-xl transition-all duration-300 border ${
            priceFilter.min === range.min && priceFilter.max === range.max 
            ? 'bg-orange-50 border-orange-100 text-orange-600 shadow-sm' 
            : 'border-transparent hover:bg-gray-50'
          }`}
        >
          <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all ${
            priceFilter.min === range.min && priceFilter.max === range.max 
            ? 'bg-orange-500 border-orange-500' 
            : 'border-gray-200'
          }`}>
            {priceFilter.min === range.min && priceFilter.max === range.max && (
              <div className="w-2 h-2 bg-white rounded-full"></div>
            )}
          </div>
          <span className="text-sm font-medium">{range.label}</span>
        </div>
      ))}
    </div>
    <div className="mt-6 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-2 top-1.5 text-[10px] text-gray-400 font-bold">$</span>
          <input 
            type="number" 
            placeholder="Min" 
            className="w-full border-none bg-white rounded-lg pl-5 pr-2 py-1.5 text-xs focus:ring-2 focus:ring-orange-500 shadow-sm"
            value={priceFilter.min}
            onChange={(e) => setPriceFilter({...priceFilter, min: parseInt(e.target.value) || 0})}
          />
        </div>
        <span className="text-gray-300 font-bold">/</span>
        <div className="relative flex-1">
          <span className="absolute left-2 top-1.5 text-[10px] text-gray-400 font-bold">$</span>
          <input 
            type="number" 
            placeholder="Max" 
            className="w-full border-none bg-white rounded-lg pl-5 pr-2 py-1.5 text-xs focus:ring-2 focus:ring-orange-500 shadow-sm"
            value={priceFilter.max}
            onChange={(e) => setPriceFilter({...priceFilter, max: parseInt(e.target.value) || 500000})}
          />
        </div>
        <button 
          onClick={() => setPriceFilter({ min: 0, max: 500000 })}
          className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all shadow-md active:scale-95"
        >
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  </section>
  {/* Rating Filter */}
  <section className="mb-8 pb-6 border-b border-gray-100/80">
    <h4 className="font-black text-xs uppercase tracking-[0.15em] mb-5 text-gray-400">Customer Review</h4>
    <div className="space-y-2">
      {[4, 3, 2, 1].map(s => (
        <div 
          key={s}
          onClick={() => setRatingFilter(s)}
          className={`flex items-center gap-3 cursor-pointer p-2 rounded-xl transition-all duration-300 ${
            ratingFilter === s ? 'bg-orange-50 shadow-sm' : 'hover:bg-gray-50'
          }`}
        >
          <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all ${
            ratingFilter === s ? 'bg-orange-500 border-orange-500' : 'border-gray-200'
          }`}>
            {ratingFilter === s && (
              <div className="w-2 h-2 bg-white rounded-full"></div>
            )}
          </div>
          <div className="flex items-center gap-1">
            {[...Array(s)].map((_, i) => (
              <Star key={i} size={14} fill="#f59e0b" className="text-yellow-500" />
            ))}
            {[...Array(5 - s)].map((_, i) => (
              <Star key={i} size={14} className="text-gray-200" />
            ))}
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-tighter ${ratingFilter === s ? 'text-orange-600' : 'text-gray-400'}`}>& Up</span>
        </div>
      ))}
    </div>
  </section>
  {/* Delivery Options */}
  <section>
    <h4 className="font-black text-xs uppercase tracking-[0.15em] mb-5 text-gray-400">Logistics</h4>
    <div className="space-y-3">
      {[
        { label: "Get It by Tomorrow", icon: <Truck size={16} />, color: "text-green-600", bg: "bg-green-50" },
        { label: "Free Shipping", icon: <Shield size={16} />, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Amazon Prime", icon: <CheckCircle size={16} />, color: "text-indigo-600", bg: "bg-indigo-50" }
      ].map((opt, i) => (
        <label key={i} className="flex items-center gap-3 cursor-pointer group p-1">
          <div className="relative flex items-center">
            <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-lg checked:bg-orange-500 checked:border-orange-500 transition-all cursor-pointer" />
            <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-1">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-600 group-hover:text-orange-600 transition-colors">{opt.label}</span>
          <div className={`ml-auto p-1.5 rounded-lg ${opt.bg} ${opt.color}`}>
            {opt.icon}
          </div>
        </label>
      ))}
    </div>
  </section>
</aside>

{/* Mobile Filters Button */}
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-[#232f3e] text-white p-4 rounded-full shadow-2xl flex items-center gap-2"
          >
            <Filter size={24} />
            <span className="font-bold">Filters</span>
            {(selectedCategory !== 'All' || ratingFilter > 0 || priceFilter.min > 0 || priceFilter.max < 500000) && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                !
              </span>
            )}
          </button>
        </div>
        {/* Mobile Filters Sidebar */}
        {showFilters && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-5 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X size={24} />
                </button>
              </div>
              {/* Mobile filter content would go here */}
            </div>
          </div>
       )}


{/* --- main grid section start here --- */}
<main className="grow px-3 py-4 bg-[#fbfbfc]">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3">
    {currentProducts.map((product) => (
      <div 
        key={product.id} 
        className="group relative bg-white rounded-xl  mt-2 transition-all duration-300 hover:shadow-xl border border-gray-100 flex flex-col h-full"
      >
        {/* Image Showcase Section - Height Adjusted & No Spacing */}
        <div className="relative h-50 w-full rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          {/* Action Buttons - Fixed Top Right (No Hover Delay) */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
            <button 
              onClick={() => addToWishlist(product)}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-rose-500 hover:text-white transition-all active:scale-90 text-gray-600"
            >
              <Heart size={16} fill={product.isWishlisted ? "currentColor" : "none"} />
            </button>
 {/* --- CUSTOM notification UI ki coding --- */}
{notification.show && (
  <div className={`fixed top-16 right-5 z-[100] animate-bounce-in flex items-center gap-3 px-6 py-4 rounded-2xl  border-l-8 transition-all duration-500 ${
    notification.type === 'success' 
    ? 'bg-emerald-900 border-emerald-400 text-white' 
    : 'bg-rose-900 border-rose-400 text-white'
  }`}>
    <div className="bg-white/20 p-1 rounded-full">
      {notification.type === 'success' ? <Heart size={18} fill="white" /> : <X size={18} />}
    </div>
    <p className="text-sm font-black uppercase tracking-widest">{notification.message}</p>
  </div>
)}


{/** add to cart karny ky lieye button ki coding start here */}
<button 
  onClick={() => {
    const currentPrice = Number(product.price) || 0;
    const originalPrice = Number(product.oldPrice || product.originalPrice) || 0;
    const discountAmount = originalPrice > currentPrice ? originalPrice - currentPrice : 0;
    addToCart({
      ...product,
      id: product.id || product._id,
      title: product.title || product.name,
      price: currentPrice,          
      oldPrice: originalPrice,      
      currency: "$",                
      discountValue: product.discount, 
      savings: discountAmount,      
      image: product.image || (product.images && product.images[0]),
      quantity: 1
    });
  }}
  className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-emerald-500 hover:text-white transition-all active:scale-90 text-gray-600">
  <Plus size={16} />
</button>
{/** add to cart karny ky lieye button coding end here */}
</div>


{/**attractive bagde styling strt */}
 <div className="absolute top-2 left-1 z-20">
  <div className="relative group flex items-center">
    <div className="absolute inset-0 border border-[#D4AF37] translate-x-1 translate-y-1 rounded-sm transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
    <div className="relative bg-zinc-950 px-3 py-1.5 border border-[#D4AF37] flex items-center gap-2">
      <div className="absolute top-0 left-0 w-1 h-1 bg-[#D4AF37]" />
      <div className="absolute bottom-0 right-0 w-1 h-1 bg-[#D4AF37]" />
      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#D4AF37]">
        Special
      </span>
      <div className="w-px h-3 bg-[#D4AF37]/30" />
      <div className="flex items-baseline gap-1">
        <span className="text-xs font-black text-white leading-none">
          {product.discount}
        </span>
        <span className="text-[7px] font-bold text-[#D4AF37] uppercase">
          OFF
        </span>
      </div>
    </div>
  </div>
</div>
{/**attractive bagde styling end here*/}
</div>


{/* Content Section - High-End Layout */}
<div className="flex flex-col gap-1 font-sans py-2 px-1 relative overflow-hidden">
  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
    {product.brand}
  </span>
  {/* Product Title - Using a Clean Serif-style or Sharp Sans */}
  <h2 className="text-[16px] font-bold text-slate-900 leading-[1.2] tracking-tight mb-1 font-serif">
    {product.name}
  </h2>
  {/* Rating Row - Clean & Compact */}
  <div className="flex items-center gap-1.5">
    <div className="flex items-center bg-slate-50 px-1.5 rounded border border-slate-100">
       <span className="text-[12px] font-black text-slate-800 mr-1">{product.rating}.0</span>
       <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            size={10} 
            className={star <= product.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} 
          />
        ))}
      </div>
    </div>
    <span className="text-blue-600 text-[12px] font-bold hover:underline cursor-pointer">
      ({product.reviews.toLocaleString()} reviews)
    </span>
  </div>
  {/* Price Section - "Floating" & Layered Look */}
  <div className="relative mt-1 mb-1 h-12">
    <span className="absolute -top-1 left-0 text-[10px] text-slate-400 italic">
      was <span className="line-through">PKR {product.oldPrice?.toLocaleString()}</span>
    </span>
    <div className="flex items-center gap-1 absolute bottom-1">
      <span className="text-[12px] font-black text-emerald-600 self-end mb-1">PKR</span>
      <span className="text-[30px] font-black text-slate-900 tracking-tighter leading-none">
        {product.price.toLocaleString()}
      </span>
      {/* Sale Tag - Positioned next to price with a glow */}
      <div className="ml-3 bg-emerald-500  text-white px-2.5 py-1 rounded-bl-xl rounded-tr-xl shadow-sm shadow-emerald-200">
        <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
          <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span>
          Sale
        </span>
      </div>
    </div>
  </div>
  {/* Delivery Info - Grounded with a subtle background */}
  <div className="mt-1 flex items-center ">
    <div className="flex items-center gap-2  bg-slate-50 w-full py-1.5 px-2 rounded-lg border-l-4 border-emerald-500">
      <Truck size={14} className="text-slate-700" />
      <p className="text-[12px] text-slate-600 font-medium">
        Get it <span className="font-black text-slate-900 capitalize">{product.delivery}</span>
      </p>
    </div>
  </div>
</div>
 </div>
    ))}
</div>


{/* --- Pagination Controls --- */}
{filteredProducts.length > itemsPerPage && (
  <div className="mt-12 flex justify-center pb-10">
    <div className="inline-flex items-center p-1.5 bg-gray-900 rounded-full shadow-lg">
      {/* Back Button */}
      <button 
        onClick={() => {
          setCurrentPage(prev => Math.max(prev - 1, 1));
          window.scrollTo({ top: 0, behavior: 'smooth' }); // Page badal kar upar jaye
        }}
        disabled={currentPage === 1}
        className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'text-white hover:bg-gray-800'}`}
      >
        <ChevronLeft size={18} />
      </button>
      {/* Number Buttons */}
      <div className="flex gap-1 px-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`w-8 h-8 rounded-full font-bold text-[11px] transition-all ${
              page === currentPage ? 'bg-emerald-500 text-white' : 'text-white/40 hover:text-white'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      {/* Next Button */}
      <button 
        onClick={() => {
          setCurrentPage(prev => Math.min(prev + 1, totalPages));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'text-white hover:bg-gray-800'}`}
      >
        <ChevronRight size={18} />
      </button>

    </div>
  </div>
)}
</main></div>


{/* CSS for hiding scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        * { box-sizing: border-box; }
      `}} />    
{/**footer section start here */}
    <footer className="w-full font-sans">
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
export default AmazonAdvancedDeals;