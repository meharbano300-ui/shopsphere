import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { FaSearch, FaShoppingCart, FaHome, FaMapMarkerAlt, FaChevronDown, FaStarHalfAlt, 
  FaCreditCard, FaBox, FaUserCog, FaSignOutAlt, FaPlus, FaTrash, FaCheckCircle,
  FaEdit, FaStar, FaTruck, FaCreditCard as FaCard, FaPaypal, FaMobileAlt, FaInfoCircle,
  FaCamera, FaUser, FaEnvelope, FaPhone, FaLock, FaGift, FaShareAlt, FaClock, FaFire,
  FaReply, FaQuestionCircle, FaFilter, FaSortAmountDown, FaSortAmountUp, FaBoxOpen,
  FaArrowUp, FaHeart, FaBolt, FaShippingFast, FaExchangeAlt, FaUserFriends, FaHeadset,
  FaBell, FaCrown, FaShieldAlt, FaCoins, FaPercent, FaTicketAlt, FaWhatsapp, FaShoppingBag,
  FaCommentDots, FaPaperPlane, FaTimes, FaEllipsisV, FaCheck, FaRegCheckCircle,
  FaCalendar 
} from "react-icons/fa";
import {Heart, Eye, Ticket, User, X, Landmark, QrCode, ShieldCheck, UserPlus, Lock as LockIcon,
  ShoppingBag, Clock, Package, CheckCircle, CreditCard, MapPin,  RefreshCcw, LockKeyhole, 
  Star, Trash2, ChevronRight, Smartphone, Globe, Gift,  Plus, XCircle, Camera, LayoutDashboard, 
  RefreshCw, Share2, HelpCircle, MessageCircle, TrendingUp,  ArrowUpRight, LogOut, Palette,
  Award, Zap, Users, Crown, Sparkles, Target, Trophy, Bell,  Calendar, LifeBuoy,  BellRing, 
  MessageSquare, Send, ShoppingCart, Wallet, Tag, AlertCircle, Fingerprint,UserCheck,    
    Copy, Truck, Archive, RotateCcw, Shield, BadgeCheck, Smartphone as Phone,Settings,
  Mail, Map, Globe as World, Settings as Gear, Battery, Headphones, ArrowRight,Leaf, 
  MousePointerClick,   Activity, Cpu, Music2, Radio, Tv, Tags, MousePointer2  
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, FaStore } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUp from "./SignUp";


const UserProfile = ({ userName, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(null);
  const [showRateModal, setShowRateModal] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [rating, setRating] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hi! How can I help you today?", sender: "bot", time: "10:00 AM" },
    { id: 2, text: "I need help with my recent order", sender: "user", time: "10:02 AM" },
    { id: 3, text: "Sure! Please share your order ID", sender: "bot", time: "10:03 AM" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [floatingHelpPosition, setFloatingHelpPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const helpRef = useRef(null);
  const chatRef = useRef(null);
  
  
// transaction ki states 
const transactions = [
  { id: 'tr-001', date: '2026-01-15', description: 'Wireless Headphones', amount: -89.99, status: 'Completed' },
  { id: 'tr-002', date: '2026-01-10', description: 'Top-up Wallet', amount: 100.00, status: 'Completed' },
  { id: 'tr-003', date: '2026-01-05', description: 'Annual Subscription', amount: -49.99, status: 'Pending' },
  { id: 'tr-004', date: '2026-01-01', description: 'Grocery Shopping', amount: -67.50, status: 'Completed' }
];

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
    const [searchQuery, setSearchQuery] = useState("");
    const [savedForLater, setSavedForLater] = useState([]);
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [showPromoInput, setShowPromoInput] = useState(false);
    const [loading, setLoading] = useState(true);
    

// add to cart karny lieye states and logic, counter
    const [cartItems, setCartItems] = useState([]);
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


const [showNotif, setShowNotif] = useState(false);
const [productName, setProductName] = useState("");
const addToCart = (product) => {
  const existingCart = JSON.parse(localStorage.getItem('shopSphereCart')) || [];
  const updatedCart = [...existingCart, { ...product, quantity: 1 }];
  localStorage.setItem('shopSphereCart', JSON.stringify(updatedCart));
  setCartItems(updatedCart);
  window.dispatchEvent(new Event("cartUpdated"));
  // Notification Trigger
  setProductName(product.name || "Item");
  setShowNotif(true);
  // 3 seconds baad khud band ho jaye
  setTimeout(() => setShowNotif(false), 3000);
};


  // Permanent Storage States ... yaha say (_v2)likhny hum shipping cards par bio data add, delete kar sakty hain
  const [addresses, setAddresses] = useState(JSON.parse(localStorage.getItem('userAddresses')) || [
    {
      id: 1,
      name: "mehar Bano",
      phone: "+92 xxxxxxxxx",
      address: "House 123, Street 45, Sector G-8",
      city: "Islamabad",
      state: "Islamabad Capital Territory",
      zip: "44000",
      country: "Pakistan",
      isDefault: true,
      isPermanent: true
    }
  ]);
  const [payments, setPayments] = useState(JSON.parse(localStorage.getItem('userPayments')) || [
    {
      id: 1,
      cardName: "Samra Amir",
      cardNumber: "**** **** **** 4242",
      type: "Visa Card",
      expiry: "12/26",
      cvv: "***",
      isDefault: true,
      isPermanent: true
    }
  ]);


  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('userWishlist')) || [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      img: "images/Premium Wireless Headphones.jfif",
      addedDate: "2026-01-01",
      rating: 4.8,
      isPermanent: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      img: "images/Smart Fitness Watch.jfif",
      addedDate: "2026-01-15",
      rating: 4.5,
      isPermanent: true
    }
  ]);
  const [cartCount, setCartCount] = useState(0);
  const [userProfile, setUserProfile] = useState({
    name: "Samra Amir",
    email: "SamraAmir@gmail.com",
    phone: "+92 300 5688945",
    joinDate: "2026-01-12",
    avatar: "images/lip4.jfif",
    points: 1250,
    level: "Gold Member"
  });

  // Dummy Orders Data with ratings
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderId: "ORD-78945",
      date: "2026-01-15",
      status: "Delivered",
      items: [
        { 
          id: 101, 
          name: "Wireless Bluetooth Headphones", 
          price: 89.99, 
          quantity: 1, 
          image: "images/order1.jfif",
          rating: 4,
          review: "Great sound quality!"
        },
        { 
          id: 102, 
          name: "GRANDS PARFUMS DE LUXE", 
          price: 249.99, 
          quantity: 1, 
          image: "images/order2.jfif",
          rating: 5,
          review: "Excellent features"
        }
      ],
      total: 339.98,
      trackingId: "TRK-784512369",
      deliveryDate: "2026-01-20",
      paymentMethod: "Visa Card"
    },
    {
      id: 2,
      orderId: "ORD-78946",
      date: "2026-01-10",
      status: "Processing",
      items: [
        { 
          id: 103, 
          name: "Women's Flower Rhinestone", 
          price: 49.99, 
          quantity: 1, 
          image: "images/order3.jfif",
          rating: 0,
          review: ""
        }
      ],
      total: 49.99,
      trackingId: "TRK-784512370",
      deliveryDate: "2024-03-25",
      paymentMethod: "MasterCard"
    },
     {
      id: 3,
      orderId: "ORD-92346",
      date: "2026-01-10",
      status: "Cancelled",
      items: [
        { 
          id: 103, 
          name: "Women's Flower Rhinestone", 
          price: 49.99, 
          quantity: 1, 
          image: "images/order4.jfif",
          rating: 0,
          review: ""
        }
      ],
      total: 49.99,
      trackingId: "TRK-784512370",
      deliveryDate: "2026-01-23",
      paymentMethod: "MasterCard"
    }
  ]);

  
  // Refunds/Returns Data
  const [refunds, setRefunds] = useState([
    {
      id: 1,
      orderId: "ORD-78944",
      productName: "Wireless Earbuds",
      reason: "Product damaged",
      status: "Approved",
      amount: 59.99,
      date: "2026-01-03",
      refundMethod: "Original Payment",
      expectedDate: "2026-01-05"
    },
    {
      id: 2,
      orderId: "ORD-78943",
      productName: "USB-C Cable",
      reason: "Wrong item received",
      status: "Pending",
      amount: 19.99,
      date: "2026-01-08",
      refundMethod: "Store Credit",
      expectedDate: "2026-01-10"
    },
    {
      id: 3,
      orderId: "ORD-78942",
      productName: "Phone Case",
      reason: "Changed mind",
      status: "Rejected",
      amount: 29.99,
      date: "2026-01-12",
      refundMethod: "Original Payment",
      expectedDate: "N/A"
    }
  ]);

  // Popular Products
  const popularProducts = [
    { id: 1, name: "iPhone 15 Pro", price: 999, image: "images/popular1.jfif", rating: 4.8 },
    { id: 2, name: "Sony WH-1000XM5", price: 349, image: "images/popular2.jfif", rating: 4.7 },
    { id: 3, name: "MacBook Air M2", price: 1199, image: "images/popular3.jfif", rating: 4.9 },
    { id: 4, name: "Nike Air Max", price: 129, image: "images/popular4.jfif", rating: 4.5 },
    { id: 5, name: "Samsung 4K TV", price: 799, image: "images/popular5.jfif", rating: 4.6 },
    { id: 6, name: "Dyson Vacuum", price: 449, image: "images/popular6.jfif", rating: 4.4 },
    { id: 7, name: "Canon EOS R5", price: 3899, image: "images/popular7.jfif", rating: 4.8 },
    { id: 8, name: "Apple Watch Ultra", price: 799, image: "images/popular8.jfif", rating: 4.7 }
  ];

  // More products for wishlist section
  const moreProducts = [
    { id: 9, name: "PlayStation 5", price: 499, image: "images/wishlist1.jfif", rating: 4.9 },
    { id: 10, name: "Ladies Accessories", price: 299, image: "images/5.jfif", rating: 4.6 },
    { id: 11, name: "DJI Drone", price: 899, image: "images/wishlist3.jfif", rating: 4.7 },
    { id: 12, name: "Kindle Paperwhite", price: 139, image: "images/wishlist4.jfif", rating: 4.4 },
    { id: 13, name: "Elegant Ladies Bag ", price: 499, image: "images/bag2.jfif", rating: 4.9 },
    { id: 14, name: "Bose Speakers", price: 299, image: "images/wishlist2.jfif", rating: 4.6 },
    { id: 15, name: "Glasses For Youth", price: 899, image: "images/3.jfif", rating: 4.7 },
    { id: 16, name: "Smartphone Xiaomi 14 Pro ", price: 139, image: "images/7a.jfif", rating: 4.4 }
  ];

  // Auto messages for chat
  const autoMessages = [
    "Your order #ORD-78945 has been delivered!",
    "Flash sale starts in 1 hour! Get ready!",
    "New items added to your wishlist are now on sale!",
    "You've earned 50 loyalty points!",
    "Free shipping on orders above $50 today!"
  ];



//services se products userprofile par lanay kay lieye states start
const UserProfile = () => {
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    const loadWishlist = () => {
      console.log("Loading Wishlist..."); 
      const data = JSON.parse(localStorage.getItem('userWishlist')) || [];
      setWishlist(data);
    };
    loadWishlist(); 
    window.addEventListener('wishlistUpdated', loadWishlist);
    window.addEventListener('storage', loadWishlist);

    return () => {
      window.removeEventListener('wishlistUpdated', loadWishlist);
      window.removeEventListener('storage', loadWishlist);
    };
  }, []);
  return (
    <div>
      {wishlist.length > 0 ? (
        wishlist.map((item) => <div key={item.id}>{item.name}</div>)
      ) : (
        <p>Wishlist khali hai!</p>
      )}
    </div>
  );
};
// console
useEffect(() => {
  const loadWishlist = () => {
    const rawData = localStorage.getItem('userWishlist');
    console.log("LocalStorage Data:", rawData); 
    const data = JSON.parse(rawData) || [];
    setWishlist(data);
  };
  loadWishlist();
  window.addEventListener('wishlistUpdated', loadWishlist);
  return () => window.removeEventListener('wishlistUpdated', loadWishlist);
}, []);
//services se products userprofile par lanay kay lieye states end here


  // Sync Data on Load
  useEffect(() => {
    const syncData = () => {
      const savedWishlist = JSON.parse(localStorage.getItem('userWishlist')) || [];
      // Merge with permanent items
      const permanentItems = wishlist.filter(item => item.isPermanent);
      const mergedWishlist = [...permanentItems, ...savedWishlist.filter(item => !item.isPermanent)];
      setWishlist(mergedWishlist);
      const cart = JSON.parse(localStorage.getItem('shopSphereCart')) || [];
      setCartCount(cart.reduce((acc, item) => acc + (item.quantity || 1), 0));
    };
    syncData();
    window.addEventListener('storage', syncData);
    return () => window.removeEventListener('storage', syncData);
  }, []);

  // Floating help animation - only in bottom right corner
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingHelpPosition(prev => ({
        x: Math.min(Math.max(prev.x + (Math.random() - 0.5) * 10, window.innerWidth - 120), window.innerWidth - 80),
        y: Math.min(Math.max(prev.y + (Math.random() - 0.5) * 10, window.innerHeight - 120), window.innerHeight - 80)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto chat messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && !showChat) {
        const randomMessage = autoMessages[Math.floor(Math.random() * autoMessages.length)];
        const newBotMessage = {
          id: chatMessages.length + 1,
          text: randomMessage,
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, newBotMessage]);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [chatMessages, showChat]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatRef.current && showChat) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages, showChat]);
  // Filter and sort orders
  const filteredSortedOrders = () => {
    let filtered = [...orders];
    
    // Apply filter
    if (filterType === 'delivered') {
      filtered = filtered.filter(order => order.status === 'Delivered');
    } else if (filterType === 'processing') {
      filtered = filtered.filter(order => order.status === 'Processing');
    } else if (filterType === 'cancelled') {
      filtered = filtered.filter(order => order.status === 'Cancelled');
    }
    
    // Apply sort
    if (sortOrder === 'newest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOrder === 'oldest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOrder === 'price-high') {
      filtered.sort((a, b) => b.total - a.total);
    } else if (sortOrder === 'price-low') {
      filtered.sort((a, b) => a.total - b.total);
    }
    return filtered;
  };

  // --- Handlers ---
  const removeFromWishlist = (id) => {
    const itemToRemove = wishlist.find(item => item.id === id);
    if (itemToRemove?.isPermanent) {
      alert("This is a permanent demo item and cannot be removed.");
      return;
    }
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem('userWishlist', JSON.stringify(updated.filter(item => !item.isPermanent)));
  };

  const saveAddress = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAddr = {
      id: Date.now(),
      name: formData.get('name'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      zip: formData.get('zip'),
      country: formData.get('country'),
      isDefault: formData.get('default') === 'on',
      isPermanent: false
    };
    const updated = [...addresses, newAddr];
    setAddresses(updated);
    localStorage.setItem('userAddresses', JSON.stringify(updated));
    setShowAddressModal(false);
    e.target.reset();
    alert("Address saved successfully!");
  };

  const savePayment = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const cardNumber = formData.get('cardNumber');
    
    // Validate card number
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Please enter a valid 16-digit card number");
      return;
    }
    
    // Validate expiry date
    const expiry = formData.get('expiry');
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      alert("Please enter expiry date in MM/YY format");
      return;
    }
    
    // Validate CVV
    const cvv = formData.get('cvv');
    if (!/^\d{3,4}$/.test(cvv)) {
      alert("Please enter a valid CVV (3-4 digits)");
      return;
    }
    
    const newPay = {
      id: Date.now(),
      cardName: formData.get('cardName'),
      cardNumber: "**** **** **** " + cardNumber.slice(-4),
      type: formData.get('cardType'),
      expiry: expiry,
      cvv: "***",
      isDefault: formData.get('saveCard') === 'on',
      isPermanent: false
    };
    const updated = [...payments, newPay];
    setPayments(updated);
    localStorage.setItem('userPayments', JSON.stringify(updated));
    setShowPaymentModal(false);
    e.target.reset();
    alert("Payment method added successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
    onLogout();
  };

  const updateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProfile = {
      ...userProfile,
      name: formData.get('fullName') || userProfile.name,
      email: formData.get('email') || userProfile.email,
      phone: formData.get('phone') || userProfile.phone,
      avatar: selectedImage || userProfile.avatar
    };
    setUserProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setShowEditProfile(false);
    setSelectedImage(null);
    alert("Profile updated successfully!");
  };


// yeh section permanent shipping address ko rakhny ky lieye hai ... agar permant address ko delete krna hai 
// user profile se too inn states koo remove karky neechay comments waly states koo active karna hoga too permant shipping address remove ho jayain gay 
  
  const deleteAddress = (id) => {
    const addressToDelete = addresses.find(addr => addr.id === id);
    if (addressToDelete?.isPermanent) {
      alert("This is a permanent demo address and cannot be removed.");
      return;
    }
    if (addressToDelete?.isDefault) {
      alert("Cannot delete default address. Please set another address as default first.");
      return;
    }
    const updated = addresses.filter(addr => addr.id !== id);
    setAddresses(updated);
    localStorage.setItem('userAddresses', JSON.stringify(updated));
    alert("Address deleted successfully!");
  };
  const deletePayment = (id) => {
    const paymentToDelete = payments.find(pay => pay.id === id);
    if (paymentToDelete?.isPermanent) {
      alert("This is a permanent demo payment method and cannot be removed.");
      return;
    }
    if (paymentToDelete?.isDefault) {
      alert("Cannot delete default payment method. Please set another method as default first.");
      return;
    }
    const updated = payments.filter(pay => pay.id !== id);
    setPayments(updated);
    localStorage.setItem('userPayments', JSON.stringify(updated));
    alert("Payment method deleted successfully!");
  };

{/**  
const deleteAddress = (id) => {
  // 1. Pehle state se delete karein
  const updatedAddresses = addresses.filter(addr => addr.id !== id);
  setAddresses(updatedAddresses);

  // 2. PHIR LocalStorage ko update karein taaki refresh par wapis na aaye
  localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
};
 */} 


  const addToCartFromOrder = (item) => {
    const cart = JSON.parse(localStorage.getItem('shopSphereCart')) || [];
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem('shopSphereCart', JSON.stringify(cart));
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    alert(`${item.name} added to cart!`);
  };

  const rateProduct = (orderId, itemId, rating, review) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          items: order.items.map(item => 
            item.id === itemId ? { ...item, rating, review } : item
          )
        };
      }
      return order;
    }));
    setShowRateModal(null);
    alert("Thank you for your rating!");
  };
  const cancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: 'Cancelled' } : order
      ));
      alert("Order cancelled successfully!");
    }
  };

  const requestRefund = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const newRefund = {
        id: Date.now(),
        orderId: order.orderId,
        productName: order.items[0].name,
        reason: "Changed mind",
        status: "Pending",
        amount: order.total,
        date: new Date().toISOString().split('T')[0],
        refundMethod: "Original Payment",
        expectedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
      setRefunds(prev => [...prev, newRefund]);
      alert("Refund request submitted successfully!");
    }
  };

  const inviteFriend = () => {
    const referralLink = `https://shopsphere.com/invite/${userProfile.name.replace(/\s+/g, '')}123`;
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard! Share with your friends.");
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const userMsg = {
      id: chatMessages.length + 1,
      text: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, userMsg]);
    setNewMessage("");
    
    // Auto reply after 1 second
    setTimeout(() => {
      const botReplies = [
        "Thanks for your message! How else can I assist you?",
        "I understand. Let me check that for you.",
        "Is there anything specific you'd like to know?",
        "Our team will get back to you shortly.",
        "Would you like me to connect you with a specialist?"
      ];
      
      const botMsg = {
        id: chatMessages.length + 2,
        text: botReplies[Math.floor(Math.random() * botReplies.length)],
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }; 
      setChatMessages(prev => [...prev, botMsg]);
    }, 1000);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const addNewDemoProduct = () => {
    const productNames = [
      "Wireless Gaming Mouse",
      "4K Action Camera",
      "Noise Cancelling Earbuds",
      "Smart Home Speaker",
      "Fitness Tracker Band",
      "Portable Charger 20000mAh",
      "Bluetooth Keyboard",
      "Gaming Monitor 144Hz"
    ];
    
    const randomProduct = productNames[Math.floor(Math.random() * productNames.length)];
    const randomPrice = Math.floor(Math.random() * 500) + 50;
    const randomImage = popularProducts[Math.floor(Math.random() * popularProducts.length)].image;
    
    const newItem = {
      id: Date.now(),
      name: randomProduct,
      price: randomPrice,
      img: randomImage,
      addedDate: new Date().toISOString().split('T')[0],
      isPermanent: false
    };
    
    const updated = [...wishlist, newItem];
    setWishlist(updated);
    localStorage.setItem('userWishlist', JSON.stringify(updated.filter(item => !item.isPermanent)));
    alert(`${randomProduct} added to wishlist!`);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const triggerImageUpload = () => {
    fileInputRef.current.click();
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans text-[#1A1A1A]">
   {/** add to cart ki notofication ki setting start */}
    {showNotif && (
    <div className="fixed top-20 right-5 z-[100] animate-in fade-in slide-in-from-right-4 duration-300">
    <div className="bg-[#131921] border-l-4 border-[#febd69] text-white p-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-[300px]">
      <div className="bg-[#febd69] p-2 rounded-full">
        <Zap size={18} className="text-[#131921]" />
      </div>
      <div>
        <p className="text-[10px] text-[#febd69] font-black uppercase tracking-widest">Added to Cart</p>
        <p className="text-sm font-bold">{productName}</p>
      </div>
      <button onClick={() => setShowNotif(false)} className="ml-auto opacity-50 hover:opacity-100">
        <X size={16} />
      </button>
    </div>
  </div>
)}
{/** add to cart ki notofication ki setting end */}


{/* HEADER section start here WITH GAPS */}
     <header className="bg-[#131921] sticky top-0 z-50 py-3 px-4 md:px-9 flex items-center gap-3 text-white shadow-xl transition-all">
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
    <div className="overflow-hidden flex items-center gap-2 cursor-pointer group">
              <MapPin size={20} className="text-orange-300" />
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 leading-none">Deliver to</span>
                <span className="text-xs font-black group-hover:underline">Pakistan</span>
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
      <FaShoppingCart className="text-2xl group-hover:rotate-[-10deg] transition-transform" />
      <span className="absolute -top-2 -right-3 bg-[#febd69] rounded-full text-[9px] px-1.5 py-1 font-bold text-black border-2 border-[#131921] shadow-lg animate-bounce">
        {cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}
      </span>
    </div>
    <span className="font-bold hidden sm:block self-end mb-1">Cart</span>
  </div>
</header>
{/* HEADER section end here WITH GAPS */}


 <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-5"> 
        {/*  LEFT sidebar start here */}
        <motion.aside 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-80 flex-shrink-0 space-y-4"
        >     
  <div className="bg-white rounded-[1rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100 flex flex-col h-auto min-h-[800px]">
  {/* User Profile Header: Dark Style */}
  <div className="p-4 bg-[#131921] text-white relative overflow-hidden group">
    {/* Animated Background Gradients */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff9900]/10 rounded-full blur-3xl -translate-y-12 translate-x-12 group-hover:bg-[#ff9900]/20 transition-all duration-700" />
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl translate-y-8 -translate-x-8" />
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="relative mb-4 group/avatar">
        <motion.div 
          whileHover={{ rotate: 10, scale: 1.05 }}
          className="relative z-10"
        >
          <img 
            src='images/lip4.jfif'
            alt="Avatar" 
            className="w-24 h-24 rounded-[2rem] object-cover border-4 border-[#131921] ring-2 ring-[#febd69] shadow-2xl transition-all" 
          />
        </motion.div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="hidden" 
        />
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={triggerImageUpload}
          className="absolute -bottom-2 -right-2 bg-[#ff9900] p-2.5 rounded-2xl text-[#131921] shadow-xl hover:bg-[#febd69] transition-colors z-20 border-4 border-[#131921]"
        >
          <Camera size={14} strokeWidth={3} />
        </motion.button>
      </div>
      <h2 className="font-black text-xl tracking-tight mb-1">{userProfile.name}</h2>
      <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full backdrop-blur-md border border-white/10">
        <Crown className="text-[#febd69]" size={14} strokeWidth={2.5} />
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#febd69]">{userProfile.level}</p>
      </div>
      <p className="text-[11px] mt-4 text-gray-400 font-medium opacity-60 tracking-wide">{userProfile.email}</p>
    </div>
  </div>

  {/* Navigation: Clean & Tactile */}
  <nav className="flex-1 p-6 space-y-2 bg-gradient-to-b from-white to-gray-50/50">
    {[
      { name: 'Overview', icon: <LayoutDashboard size={18} /> },
      { name: 'Orders', icon: <Package size={18} /> },
      { name: 'Payment', icon: <CreditCard size={18} /> },
      { name: 'Shipping address', icon: <MapPin size={18} /> },
      { name: 'Wish List', icon: <Heart size={18} /> },
      { name: 'Returns/Refunds', icon: <RotateCcw size={18} /> },
      { name: 'Invite Friends', icon: <UserPlus size={18} /> },
      { name: 'Settings', icon: <Settings size={18} /> }
    ].map((tab, index) => {
      const isActive = activeTab === tab.name;
      return (
        <motion.button 
          key={tab.name}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.03 }}
          onClick={() => setActiveTab(tab.name)}
          whileHover={{ x: 8 }}
          whileTap={{ scale: 0.98 }}
          className={`
            w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm transition-all duration-500 group
            ${isActive 
              ? 'bg-[#131921] text-white shadow-xl shadow-gray-200' 
              : 'text-gray-500 hover:text-gray-900 hover:bg-white hover:shadow-md'
            }
          `}
        >
          <div className="flex items-center gap-4">
            <span className={`transition-colors duration-300 ${isActive ? 'text-[#ff9900]' : 'text-gray-400 group-hover:text-gray-900'}`}>
              {tab.icon}
            </span>
            <span className={`tracking-tight ${isActive ? 'font-bold' : 'font-semibold'}`}>
              {tab.name}
            </span>
          </div>
          {isActive && (
            <motion.div layoutId="activePill" className="w-1.5 h-1.5 rounded-full bg-[#ff9900]" />
          )}
        </motion.button>
      );
    })}
  </nav>
  {/* Logout Section */}
  <div className="p-6 border-t border-gray-100 bg-gray-50/30">
    <motion.button 
      whileHover={{ x: 5, color: "#dc2626" }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLogout} 
      className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm text-gray-400 font-bold transition-all"
    >
      <LogOut size={18} />
      <span>Sign Out</span>
    </motion.button>
  </div>
</div>  
      {/* REAL QR CODE SCANNER with animation */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="text-yellow-500" size={16} />
              <p className="text-xs font-bold text-gray-400 uppercase">Shop on App</p>
              <Sparkles className="text-yellow-500" size={16} />
            </div>
   <div className="bg-[#F0F2F5] p-4 rounded-3xl inline-block border-2 border-white shadow-inner">
     <QRCodeSVG
      value={`https://shopsphere.com/download-app?ref=${userProfile.name}`}
      size={150}
      bgColor={"#F0F2F5"}
      fgColor={"#131921"}
      level={"H"} 
      includeMargin={false}
      imageSettings={{
      src: "/logo-small.png", 
      x: undefined,
      y: undefined,
      height: 24,
      width: 24,
      excavate: true,
      }}
     /></div>
      <p className="text-xs text-gray-600 mt-3 font-medium">Scan to download</p>
      <p className="text-[10px] text-gray-500 mt-1 italic">Get 15% off on first app order</p>
       </motion.div>

{/* LOYALTY POINTS CARD - ULTRA PREMIUM */}
<motion.div 
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.4 }}
  className="relative group overflow-hidden bg-[#131921] rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)] text-white border border-white/5"
>
  {/* Background Animated Glows */}
  <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] group-hover:bg-purple-600/30 transition-all duration-700" />
  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />

  <div className="relative z-10">
    <div className="flex items-start justify-between mb-10">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#ff9900] animate-pulse" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Premium Membership</p>
        </div>
        <h3 className="text-4xl font-black tracking-tighter italic">
          {userProfile.points.toLocaleString()} <span className="text-[#ff9900] not-italic text-lg ml-1">PTS</span>
        </h3>
      </div>
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          filter: ["drop-shadow(0 0 0px #ff9900)", "drop-shadow(0 0 15px #ff9900)", "drop-shadow(0 0 0px #ff9900)"]
        }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="bg-white/5 p-4 rounded-3xl backdrop-blur-xl border border-white/10"
      >
        <Trophy size={32} className="text-[#febd69]" />
      </motion.div>
    </div>
    {/* Progress Bar Section */}
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Level</p>
          <p className="text-sm font-black text-white italic">GOLD ELITE</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Next Tier</p>
          <p className="text-sm font-black text-[#febd69] italic">PLATINUM</p>
        </div>
      </div>
      <div className="relative">
        <div className="w-full bg-white/5 rounded-full h-4 overflow-hidden border border-white/5">
          {/* Progress Fill */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(userProfile.points % 1000) / 10}%` }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="relative h-full bg-gradient-to-r from-[#ff9900] via-[#febd69] to-[#ff9900] rounded-full"
          >
            {/* Shimmer Effect on Progress */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full animate-[shimmer_2s_infinite]" />
          </motion.div>
        </div>
        {/* Glow point at the end of progress */}
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-[#ff9900] rounded-full blur-md"
          style={{ left: `calc(${(userProfile.points % 1000) / 10}% - 12px)` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap text-[#febd69]">
          <Zap size={19} fill="currentColor" />
          <p className="text-[11px] p-2 font-black uppercase tracking-widest">
            {(1000 - (userProfile.points % 1000))} Points win to go
          </p>
        </div>
        <motion.button 
          whileHover={{ x: 5 }}
          className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
        >
          Redeem Rewards <ChevronRight size={14} />
        </motion.button>
      </div>
    </div>
  </div>
  {/* Aesthetic Card Number / Member ID (Visual only) */}
  <div className="absolute bottom-4 right-8 opacity-10 font-mono text-xs tracking-[0.5em] select-none">
    SAMRA-MEMB-{userProfile.name.substring(0,3).toUpperCase()}-2026
  </div>
</motion.div>
 </motion.aside>
        {/* main content area: overview wali tab start here   */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
            >
              
              {/* TAB: first overview */}
              {activeTab === 'Overview' && (
                <div className="space-y-2">
                 {/* ULTRA-FUTURISTIC 3D STATS SECTION */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
  {[
    { 
      title: 'Total Orders', 
      value: orders.length, 
      icon: <ShoppingBag size={32} />,
      color: 'from-blue-600 to-cyan-400',
      glow: 'shadow-blue-500/40',
      sub: 'Items Shipped'
    },
    { 
      title: 'Wishlist', 
      value: wishlist.length, 
      icon: <Heart size={32} />,
      color: 'from-rose-600 to-pink-400',
      glow: 'shadow-rose-500/40',
      sub: 'Saved for later'
    },
    { 
      title: 'Coupons', 
      value: 5, 
      icon: <Ticket size={32} />,
      color: 'from-amber-500 to-orange-400',
      glow: 'shadow-orange-500/40',
      sub: 'Ready to use'
    },
    { 
      title: 'Trust Score', 
      value: '98%', 
      icon: <ShieldCheck size={32} />,
      color: 'from-emerald-600 to-teal-400',
      glow: 'shadow-emerald-500/40',
      sub: 'Verified User'
    }
  ].map((stat, index) => (
    <motion.div
      key={stat.title}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", damping: 15 }}
      whileHover={{ y: -15, rotateX: 5, rotateY: -5 }}
      className="relative group cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      {/* The "Main Slab" of the Card */}
      <div className={`
        relative h-48 bg-white rounded-[2.5rem] p-6 
        border-b-[8px] border-black/5
        shadow-[20px_20px_60px_#d1d1d1,-20px_-20px_60px_#ffffff]
        group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]
        transition-all duration-500 flex flex-col justify-between
        overflow-hidden
      `}>
        
        {/* Background Gradient Circle */}
        <div className={`
          absolute -right-6 -bottom-6 w-32 h-32 bg-gradient-to-br ${stat.color} 
          rounded-full blur-2xl opacity-10 group-hover:opacity-40 transition-opacity duration-500
        `} />

        {/* Content Top: Icon & Value */}
        <div className="flex justify-between items-start relative z-10">
          <div className="space-y-1">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
               {stat.title}
             </p>
             <h4 className="text-4xl font-black text-gray-900 tracking-tighter">
               {stat.value}
             </h4>
          </div>
          {/* Floating Floating Icon */}
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className={`
              p-3 rounded-2xl shadow-2xl bg-gradient-to-br ${stat.color} 
              text-white ${stat.glow} group-hover:scale-110 transition-transform
            `}
          >
            {stat.icon}
          </motion.div>
        </div>
        {/* Content Bottom: Subtitle & Progress Link */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[10px] font-bold text-gray-400 italic">
            {stat.sub}
          </span>
          <div className="w-8 h-1 bg-gray-100 rounded-full overflow-hidden">
             <motion.div 
               initial={{ x: "-100%" }}
               whileInView={{ x: "0%" }}
               className={`h-full bg-gradient-to-r ${stat.color}`} 
             />
          </div>
        </div>
        {/* Abstract "Glass" Highlight */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
      </div>
      {/* Shadow Bottom (Creates 3D depth) */}
      <div className="absolute inset-x-10 -bottom-2 h-4 bg-black/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  ))}
</div>
 {/* overview tab: Recent Orders section Style start here*/}
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
  className="bg-white p-8 rounded-[1rem] shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden"
>
  {/* Subtle Background Pattern */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl opacity-50 -mr-16 -mt-16"></div>
  <div className="flex items-center justify-between mb-5 relative z-10">
    <div>
      <h3 className="font-black text-2xl tracking-tight text-gray-900 flex items-center gap-3 italic uppercase">
        <span className="bg-[#0F172A] p-2 rounded-lg shadow-lg">
          <ShoppingBag size={20} className="text-orange-500" />
        </span>
        Recent <span className="text-orange-500 not-italic">Orders</span>
      </h3>
      <div className="h-1 w-12 bg-orange-500 mt-1 rounded-full"></div>
    </div>
    <motion.button 
      whileHover={{ scale: 1.05, x: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setActiveTab('Orders')} 
      className="group text-xs font-black tracking-widest tracking-widest uppercase text-rose-500 hover:bg-rose-500 hover:text-white transition-colors flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100"
    >
      View All 
      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
    </motion.button>
  </div>
  <div className="space-y-3 relative z-10">
    {orders.slice(0, 2).map((order, index) => (
      <motion.div 
        key={order.id}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: index * 0.15 }}
        whileHover={{ y: -4, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
        className="flex items-center justify-between p-3 bg-gray-50/50 border border-gray-100 rounded-2xl hover:border-orange-200 hover:bg-white transition-all group cursor-pointer"
        onClick={() => setShowOrderDetails(order)}
      >
        <div className="flex items-center gap-5">
          {/* Status Icon with Animation */}
          <div className="relative">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className={`p-4 rounded-2xl shadow-sm ${
                order.status === 'Delivered' 
                ? 'bg-green-50 text-green-600 border border-green-100' 
                : 'bg-blue-50 text-blue-600 border border-blue-100'
              }`}
            >
              {order.status === 'Delivered' ? <CheckCircle size={24} /> : <Clock size={24} />}
            </motion.div>
            {/* Small active dot */}
            <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
          </div>
          <div>
            <p className="font-black text-gray-900 text-sm tracking-tight uppercase">
              Order #{order.orderId.replace('#', '')}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{order.date}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className={`text-[10px] font-black uppercase tracking-tighter ${
                order.status === 'Delivered' ? 'text-green-600' : 'text-blue-600'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total</span>
             <p className="font-black text-xl text-[#0F172A] italic tracking-tighter">
               <span className="text-xs text-orange-500 not-italic mr-1">$</span>
               {order.total}
             </p>
             <p className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md mt-1 italic">
               {order.items.length} {order.items.length === 1 ? 'ITEM' : 'ITEMS'}
             </p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>
{/* overview tab Recent Orders section  Style end here*/}


{/* overview tab:  Wishlist section end here */}
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
  className="bg-white p-8  rounded-[1rem] shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden"
>
  {/* Header Section */}
  <div className="flex items-center justify-between mb-5 relative z-10">
    <div>
      <h3 className="font-black text-2xl tracking-tight text-gray-900 flex items-center gap-3 italic uppercase">
        <span className="bg-rose-50 p-2.5 rounded-2xl shadow-sm">
          <Heart size={22} className="text-rose-500 fill-rose-500" />
        </span>
        Saved <span className="text-rose-500 not-italic">Items</span>
      </h3>
      <div className="h-1 w-10 bg-rose-500 mt-1 rounded-full"></div>
    </div>
    <motion.button 
      whileHover={{ scale: 1.05, x: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setActiveTab('Wish List')} 
      className="group text-[10px]  font-black tracking-widest uppercase text-rose-500 hover:bg-rose-500 hover:text-white transition-all px-5 py-2.5 rounded-[14px] border-2 border-rose-100 flex items-center gap-2"
    >
      Explore All 
      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
    </motion.button>
  </div>
  {/* Grid Layout */}
  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
    {wishlist.slice(0, 5).map((p, index) => (
      <motion.div 
        key={p.id}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.1, type: "spring" }}
        whileHover={{ y: -12 }}
        className="group relative bg-gray-50/50 rounded-[1rem]  border border-gray-100 hover:border-rose-200 hover:bg-white transition-all duration-500"
      >
        {/* Product Image Container */}
        <div className="relative aspect-square   overflow-hidden rounded-[1rem] bg-white shadow-inner">
           <motion.img 
              whileHover={{ scale: 1.1 }}
              src={p.img || p.image || 'https://via.placeholder.com/150'} 
              className="w-full aspect-square object-cover rounded-[7px] mb-2" 
              alt={p.name}
            />
          {/* Action Overlays */}
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: '#ef4444', color: '#fff' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => removeFromWishlist(p.id)} 
              className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg text-rose-500 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-rose-50"
            >
              <Trash2 size={16}/>
            </motion.button>
          </div>
          {p.isPermanent && (
            <div className="absolute bottom-2 left-2 bg-[#0F172A] text-white text-[8px] font-black px-3 py-1 rounded-lg uppercase tracking-widest opacity-90">
              Featured
            </div>
          )}
        </div>
        {/* Content Details */}
        <div className="px-1 mt-4">
          <h4 className="font-black text-gray-800 text-[11px] px-2 uppercase tracking-tight truncate mb-1">
            {p.name}
          </h4>
          <div className="flex items-center justify-between px-2 pb-1">
            <p className="text-rose-600 font-black text-lg tracking-tighter italic">
              <span className="text-[10px] not-italic mr-0.5">$</span>
              {p.price}
            </p>
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg border border-gray-100 shadow-sm">
              <Star size={10} className="text-yellow-400 fill-yellow-400" />
              <span className="text-[10px] font-black text-gray-700">{p.rating || 4.5}</span>
            </div>
          </div>
        </div>
        {/* Hover Effect Background Glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-rose-50/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.8rem]"></div>
      </motion.div>
    ))}
    {/* Empty State */}
    {wishlist.length === 0 && (
      <div className="col-span-4 py-16 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-100">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Heart className="mx-auto text-gray-200 mb-4" size={60} strokeWidth={1} />
        </motion.div>
        <h4 className="font-black text-gray-400 uppercase tracking-widest text-sm">Your Heart is Empty</h4>
        <p className="text-xs text-gray-400 mt-2 italic font-medium">Save items you love to see them here.</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-6 px-8 py-3 bg-[#0F172A] text-white text-[10px] font-black rounded-full hover:bg-rose-500 transition-all shadow-xl tracking-[0.2em]"
        >
          GO SHOPPING
        </button>
      </div>
    )}
  </div>
</motion.div>
 {/* overview tab:  Wishlist section end here */}


 {/* overview tab:  Products section  */}
<motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.7 }}
  className="bg-white p-8 rounded-[1rem] shadow-2xl shadow-gray-200/60 border border-gray-100 relative overflow-hidden"
>
  {/* Header Section */}
  <div className="flex items-center justify-between mb-5 relative z-10">
    <div>
      <h3 className="font-black text-2xl tracking-tight text-gray-900 flex items-center gap-3 italic uppercase">
        <span className="bg-amber-100 p-2.5 rounded-2xl shadow-inner">
          <Zap size={24} className="text-amber-600 fill-amber-500 animate-pulse" />
        </span>
        Trending <span className="text-amber-600 not-italic">Now</span>
      </h3>
      <div className="h-1.5 w-16 bg-gradient-to-r from-amber-500 to-orange-500 mt-2 rounded-full"></div>
    </div>
    <motion.button 
      whileHover={{ scale: 1.05, x: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/')} 
      className="group text-[10px] font-black tracking-[0.2em] tracking-widest uppercase text-rose-500 px-6 py-3 rounded-[13px] border border-gray-100 hover:bg-[#0F172A] hover:text-white transition-all duration-500 flex items-center gap-2"
    >
      View More 
      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
    </motion.button>
  </div>
  {/* Product Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
    {popularProducts.map((product, index) => (
      <motion.div 
        key={product.id}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 * index, type: "spring", stiffness: 80 }}
        whileHover={{ y: -15 }}
        className="group relative bg-white border border-gray-100 rounded-[1rem]  hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-gray-50 shadow-inner">
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            src={product.image} 
            className="w-full h-full object-cover mix-blend-multiply group-hover:mix-blend-normal transition-all" 
            alt={product.name} 
          />
          {/* Top Badge: Hot/New */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 rounded-[8px] border border-gray-100 shadow-sm">
             <span className="text-[8px] font-black uppercase tracking-tighter text-amber-600">Popular</span>
          </div>
          {/* Quick Action Overlay (Appears on Hover) */}
          <div className="absolute inset-x-0 bottom-4 px-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
             <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(product)}
                className="w-full bg-[#0F172A] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl"
              >
                <ShoppingBag size={14} className="text-amber-500" />
                Quick Add
              </motion.button>
          </div>
        </div>
        {/* Product Info */}
        <div className="mt-3 px-1">
          <div className="flex justify-between items-start gap-2 px-1  ">
            <h4 className="font-black text-gray-800 text-xs uppercase tracking-tight leading-tight line-clamp-2 min-h-[2rem]">
              {product.name}
            </h4>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
               <Star size={10} className="text-amber-500 fill-amber-500" />
               <span className="text-[10px] font-black text-amber-700">{product.rating}</span>
            </div>
          </div> 
          <div className="flex items-center gap-2 px-1 pb-2">
            <span className="text-xl font-black text-gray-900 tracking-tighter italic">
              <span className="text-xs text-amber-600  not-italic mr-0.5">$</span>
              {product.price}
            </span>
            <span className="text-[11px] text-gray-400   line-through font-bold opacity-50">
               ${(product.price * 1.2).toFixed(2)}
            </span>
          </div>
        </div>
        {/* Decorative corner element */}
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-transparent to-amber-50/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </motion.div>
    ))}
  </div>
  {/* Background Decorative Pattern */}
  <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
</motion.div>
 </div>
  )}
{/* main content area: overview wali tab end here   */}


{/*  oreder tab - Premium Dashboard Style start here */}
{activeTab === 'Orders' && (
  <div className="space-y-8 pb-10">
    {/* Header Section */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center ms-3 gap-6 mb-8">
      <div>
        <motion.h2 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-3xl font-black text-gray-900 tracking-tighter italic uppercase flex items-center gap-3"
        >
          My <span className="text-orange-500 not-italic">Orders</span>
          <span className="text-xs not-italic bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-bold tracking-widest">
            {orders.length} TOTAL
          </span>
        </motion.h2>
        <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Manage your recent purchases and tracking</p>
      </div>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowFilter(!showFilter)}
        className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg ${
          showFilter ? 'bg-[#0F172A] text-white' : 'bg-white text-gray-900 border border-gray-100 hover:bg-gray-50'
        }`}
      >
        <FaFilter className={showFilter ? 'text-orange-500' : 'text-gray-400'} /> 
        {showFilter ? 'Close Filters' : 'Filter & Sort'}
      </motion.button>
    </div>
    {/* Filter & Sort Panel - Glass Effect */}
    <AnimatePresence>
      {showFilter && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gray-50/50 backdrop-blur-md p-8 rounded-[1rem] border border-gray-100 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Status Category</h4>
              <div className="flex flex-wrap gap-">
                {['all', 'delivered', 'processing', 'cancelled'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterType(status)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      filterType === status 
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' 
                      : 'bg-white text-gray-500 border border-gray-200 hover:border-orange-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Sort Analytics</h4>
              <div className="flex flex-wrap ">
                {['newest', 'oldest', 'price-high', 'price-low'].map(sort => (
                  <button
                    key={sort}
                    onClick={() => setSortOrder(sort)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      sortOrder === sort 
                      ? 'bg-[#0F172A] text-white shadow-lg' 
                      : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-900'
                    }`}
                  >
                    {sort.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
  </AnimatePresence>
    

    {/* Orders List */}
    <div className="space-y-2">
      {filteredSortedOrders().map((order, index) => (
        <motion.div 
          key={order.id}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="group bg-white rounded-[1rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden hover:border-orange-200 transition-all duration-500"
        >
          {/* Order Header - Modern Stripe */}
          <div className="px-8 py-5 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-inner ${
                  order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {order.status === 'Delivered' ? <CheckCircle size={32} /> : <Clock size={32} />}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-50 px-3 py-1 rounded-lg">
                      {order.status}
                    </span>
                    <p className="font-black text-xl text-gray-900 tracking-tighter italic uppercase">{order.orderId}</p>
                  </div>
                  <p className="text-[12px] font-bold text-gray-400 mt-1 uppercase tracking-tight">Purchase Date: {order.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-8 lg:text-right">
                <div className="hidden sm:block">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tracking ID</p>
                  <p className="font-bold text-gray-700 text-sm font-mono">{order.trackingId}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">Amount Paid</p>
                  <p className="text-3xl font-black text-[#0F172A] tracking-tighter italic">${order.total}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Order Items Section */}
          <div className="px-8 py-4">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px flex-1 bg-gray-100"></div>
              <span className="text-[11px] font-black text-gray-300 uppercase tracking-[0.3em]">Items In Package ({order.items.length})</span>
              <div className="h-px flex-1 bg-gray-100"></div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {order.items.map(item => (
                <motion.div 
                  key={item.id}
                  whileHover={{ x: 10 }}
                  className="flex flex-col sm:flex-row items-center gap-6 p-4 border border-gray-50 rounded-[1rem] bg-gray-50/30 hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all duration-300"
                >
                  <img src={item.image} className="w-24 h-24 object-cover rounded-2xl shadow-md border-2 border-white" alt={item.name} />
                  <div className="flex-1 text-center sm:text-left">
                    <h5 className="font-black text-gray-900 uppercase text-sm tracking-tight">{item.name}</h5>
                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 mt-2">
                      <p className="text-[11px] font-black text-gray-400 uppercase">Qty: <span className="text-gray-900">{item.quantity}</span></p>
                      <p className="font-black text-orange-600 italic tracking-tighter">${item.price}</p>
                    </div>

                    {/* Mini Item Actions */}
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCartFromOrder(item)}
                        className="px-4 py-2 bg-[#0F172A] text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-orange-500 transition-colors shadow-lg"
                      >
                        Buy Again
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowRateModal({ orderId: order.id, itemId: item.id, itemName: item.name })}
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-gray-900 transition-colors"
                      >
                        Rate Product
                      </motion.button>
                    </div>
                  </div>
                  {/* Rating Display if already rated */}
                  {item.rating > 0 && (
                    <div className="bg-green-50 px-4 py-3 rounded-2xl border border-green-100 min-w-[140px]">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < item.rating ? "text-green-500 fill-green-500" : "text-gray-200"} />
                        ))}
                      </div>
                      <p className="text-[9px] font-black text-green-700 uppercase tracking-tighter">Verified Review</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div> 
            {/* Footer Order Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between mt-10 pt-8 border-t border-dashed border-gray-200">
              <div className="flex items-center gap-3">
                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: '#fef2f2' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => cancelOrder(order.id)}
                  className="px-6 py-4 text-red-500 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] border border-red-100"
                >
                  Cancel Shipment
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => requestRefund(order.id)}
                  className="px-6 py-4 text-gray-400 hover:text-gray-900 rounded-2xl  text-[11px] font-black uppercase tracking-[0.15em]"
                >
                  Request Refund
                </motion.button>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowOrderDetails(order)}
                className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-[1.2rem] text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-orange-100 flex items-center justify-center gap-3"
              >
                Full Order Details <ArrowRight size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
)}
{/** order tab:  end here */}


{/* payment tab section:  start here */}
{activeTab === 'Payment' && (
  <div className="max-w-7xl mx-auto space-y-12 ">
    
    {/* 1. TOP STATS (Glassmorphism Cards) */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
      {[
        { label: 'Total Balance', value: '$12,450.00', icon: <Zap size={20} className="text-yellow-400" />, trend: '+12.5%' },
        { label: 'Monthly Spend', value: '$3,120.50', icon: <ArrowUpRight size={20} className="text-red-400" />, trend: '-2.1%' },
        { label: 'Saved This Month', value: '$840.00', icon: <Star size={20} className="text-green-400" />, trend: '+5.0%' },
        { label: 'Trust Score', value: '98%', icon: <ShieldCheck size={20} className="text-blue-400" />, trend: 'Stable' },
      ].map((stat, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -5 }}
          className="bg-white px-2 py-6 rounded-[1rem] border border-gray-100 shadow-xl shadow-gray-200/40 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shadow-inner">
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-gray-800 tracking-tighter">{stat.value}</p>
            </div>
          </div>
          <span className={`text-[9px] font-black px-2 py-1 rounded-lg ${stat.trend.includes('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {stat.trend}
          </span>
        </motion.div>
      ))}
    </div>
    {/* 2. CARDS VAULT (Full Width Horizontal Scroll) */}
    <div className="space-y-6">
      <div className="flex justify-between items-center px-4">
        <h2 className="text-3xl font-black text-gray-900 italic tracking-tighter">DIGITAL <span className="text-blue-600">VAULT</span></h2>
        <motion.button 
          onClick={() => setShowPaymentModal(true)}
          className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all"
        >
          Add New Method
        </motion.button>
      </div>
      <div className="flex gap-7 overflow-x-auto  pb-8 no-scrollbar snap-x">
        {payments.map((pay, index) => (
          <motion.div
            key={`pay-${pay.id || index}`}
            whileHover={{ scale: 1.02, rotateY: -10 }}
            className={`relative min-w-[400px] h-[250px] rounded-[1rem] px-10 py-7 snap-center shadow-2xl ${
              pay.type === 'Visa Card' 
              ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-black' 
              : 'bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800'
            }`}
          >
            {/* Holographic Chip & Icon */}
            <div className="flex justify-between items-start mb-8">
              <div className="w-14 h-10 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-lg shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,black_3px)]"></div>
              </div>
              <div className="text-right text-white">
                <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Premium</p>
                <p className="font-bold italic text-lg">{pay.type}</p>
              </div>
            </div>
            <p className="text-2xl font-mono text-white tracking-[0.3em] mb-8 drop-shadow-lg">
              •••• •••• •••• {pay.cardNumber.slice(-4)}
            </p>
            <div className="flex justify-between items-end text-white">
              <div>
                <p className="text-[9px] font-black uppercase opacity-50 mb-1">Asset Holder</p>
                <p className="font-bold text-sm tracking-widest uppercase">{pay.cardName}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black uppercase opacity-50 mb-1">Expires</p>
                <p className="font-bold text-sm">{pay.expiry}</p>
              </div>
            </div>
          </motion.div>
        ))}
        {/* Placeholder for "Add" */}
        <div 
          onClick={() => setShowPaymentModal(true)}
          className="min-w-[400px] h-[250px] border-4 border-dashed border-blue-200 rounded-[1rem] flex flex-col items-center justify-center cursor-pointer hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-blue-300 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
            <Plus size={32} />
          </div>
          <p className="mt-4 font-black text-gray-400 text-[10px] uppercase tracking-widest">Connect New Asset</p>
        </div>
      </div>
    </div>
    {/* 3. MIDDLE SECTION: ANALYTICS & RECENT ACTIVITY (Balanced Grid) */}
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="bg-white rounded-[1rem] p-10 border border-gray-100 shadow-2xl shadow-gray-200/50">
        <div className="flex justify-between items-center mb-10">
          <h3 className="font-black text-xl italic uppercase tracking-tighter">Live <span className="text-blue-600">Activity</span></h3>
          <button className="bg-gray-50 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-100 transition-all">Export PDF</button>
        </div>
        <div className="space-y-6">
          {(transactions || []).map((trans, index) => (
            <motion.div 
              key={`activity-item-${trans.id || index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${trans.amount > 0 ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-900 group-hover:bg-black group-hover:text-white transition-all duration-500'}`}>
                  {trans.amount > 0 ? <ArrowUpRight size={22} /> : <ShoppingBag size={22} />}
                </div>
                <div>
                  <p className="font-black text-xs uppercase text-gray-800 tracking-tight">{trans.description}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{trans.date} • {trans.status}</p>
                </div>
              </div>
              <p className={`text-lg font-black italic tracking-tighter ${trans.amount > 0 ? 'text-green-500' : 'text-gray-900'}`}>
                {trans.amount > 0 ? '+' : '-'}${Math.abs(trans.amount).toFixed(2)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Financial Analytics Chart Placeholder */}
      <div className="bg-white rounded-[1rem] p-10 border border-gray-100 shadow-2xl shadow-gray-200/50 flex flex-col">
        <h3 className="font-black text-xl italic uppercase tracking-tighter mb-10">Spend <span className="text-blue-600">Analytics</span></h3>
        <div className="flex-1 flex flex-col justify-center items-center">
            {/* Visual Bars for Chart */}
            <div className="flex items-end gap-4 h-48 w-full px-4">
              {[60, 40, 90, 70, 50, 80, 100].map((h, i) => (
                <motion.div 
                  key={i} 
                  initial={{ height: 0 }} 
                  whileInView={{ height: `${h}%` }}
                  className={`flex-1 rounded-t-xl transition-all duration-1000 ${i === 6 ? 'bg-blue-600' : 'bg-gray-200 group-hover:bg-blue-200'}`}
                />
              ))}
            </div>
            <div className="flex justify-between w-full mt-4 px-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
        </div>
        <div className="mt-8 p-6 bg-blue-50 rounded-[1rem] flex items-center justify-between">
           <div>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Current Limit</p>
              <p className="text-xl font-black text-gray-900">$5,000 / <span className="text-gray-400 text-sm">$10,000</span></p>
           </div>
           <button className="bg-blue-600 text-white p-3 rounded-xl shadow-lg shadow-blue-200"><Settings size={20} /></button>
        </div>
      </div>
    </div>
    {/* 4. NEW BOTTOM SECTION: SUBSCRIPTIONS & OFFERS */}
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Active Subscriptions */}
      <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-slate-800 rounded-[1rem] p-10 text-white overflow-hidden relative">
        <ShieldCheck size={150} className="absolute -right-10 -bottom-10 opacity-5 rotate-12" />
        <h3 className="font-black text-xl italic uppercase tracking-tighter mb-8">Active <span className="text-blue-400">Plans</span></h3>
        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          {[
            { name: 'Netflix Premium', next: 'April 12', price: '$19.99', icon: 'N' },
            { name: 'Adobe Creative Cloud', next: 'April 15', price: '$52.99', icon: 'A' },
          ].map((sub, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-3xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-black">{sub.icon}</div>
                <div>
                   <p className="font-bold text-sm uppercase">{sub.name}</p>
                   <p className="text-[9px] font-black text-blue-400 tracking-widest uppercase">Next: {sub.next}</p>
                </div>
              </div>
              <p className="font-black text-lg italic">{sub.price}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Secure Card Control */}
      <div className="bg-white rounded-[1rem] p-10 border border-gray-100 shadow-2xl flex flex-col justify-between">
        <h3 className="font-black text-lg italic uppercase tracking-tighter">Security <span className="text-red-500">Center</span></h3>
        <div className="space-y-4 my-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <span className="text-xs font-black uppercase text-gray-600 tracking-widest">Online Payments</span>
            <div className="w-10 h-5 bg-blue-600 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div></div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <span className="text-xs font-black uppercase text-gray-600 tracking-widest">ATM Withdrawals</span>
            <div className="w-10 h-5 bg-gray-300 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div></div>
          </div>
        </div>
        <button className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Freeze All Cards</button>
      </div>
    </div>
  </div>
)}
{/* payment tab section:  end here */}


{/* SHIPPING TAB SECTION -  start here  */}
 {activeTab === 'Shipping address' && (
  <div className="max-w-6xl mx-auto space-y-4">
    {/* Header Section with Glass Effect */}
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative overflow-hidden bg-gradient-to-r from-[#131921] to-[#232f3e] p-8 rounded-[1rem] shadow-2xl text-white"
    >
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">
            Delivery <span className="text-[#febd69] not-italic">Hub</span>
          </h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mt-1">Manage your global shipping destinations</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddressModal(true)} 
          className="bg-[#febd69] text-[#131921] px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-orange-500/20 flex items-center gap-3"
        >
          <Plus size={18} strokeWidth={3} /> Add New Destination
        </motion.button>
      </div>
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
    </motion.div>
    {/* Address Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
      {addresses.map((addr, index) => (
        <motion.div
          key={`addr-${addr.id || index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className={`relative bg-white rounded-[1rem] p-8 border-2 transition-all duration-500 group shadow-sm ${
            addr.isDefault ? 'border-[#febd69] shadow-orange-100' : 'border-gray-50 hover:border-blue-200'
          }`}
        >
          {/* Top Label Bar */}
          <div className="flex justify-between items-start ">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${
                addr.isDefault ? 'bg-orange-50 text-orange-500' : 'bg-gray-50 text-gray-400'
              }`}>
                <MapPin size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-black text-gray-900 uppercase text-sm tracking-tight">{addr.name}</h3>
                <div className="flex gap-2 mt-1">
                  {addr.isDefault && (
                    <span className="bg-orange-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-md tracking-tighter">Default</span>
                  )}
                  <span className="bg-gray-100 text-gray-500 text-[8px] font-black uppercase px-2 py-0.5 rounded-md tracking-tighter">Office</span>
                </div>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.2, rotate: 90 }}
              onClick={() => deleteAddress(addr.id)}
              className="p-2 text-gray-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </motion.button>
          </div>
          {/* Address Details */}
          <div className="space-y-3 border-l-2 border-gray-100 pl-6 ml-6 py-2">
            <p className="text-gray-800 font-bold text-base leading-snug">{addr.address}</p>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
              {addr.city}, {addr.state} • {addr.zip}
            </p>
            <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] tracking-widest pt-2">
              <Phone size={14} className="text-blue-500" /> {addr.phone}
            </div>
          </div>
          {/* Action Footer */}
          <div className="flex gap-3 mt-8">
            <button className="flex-1 py-3 rounded-xl border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all">
              Edit Details
            </button>
            {!addr.isDefault && (
              <button 
                onClick={() => {/* logic to set default */}}
                className="flex-1 py-3 rounded-xl bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 shadow-lg transition-all"
              >
                Make Primary
              </button>
            )}
          </div>
        </motion.div>
      ))}
      {/* Add New - Ultra Modern Placeholder */}
      <motion.div 
        onClick={() => setShowAddressModal(true)}
        whileHover={{ scale: 1.02, borderColor: '#3b82f6', backgroundColor: '#f8faff' }}
        className="h-full min-h-[250px] border-2 border-dashed border-blue-300 rounded-[1rem] flex flex-col items-center justify-center p-8 cursor-pointer group transition-all"
      >
        <div className="w-20 h-20 bg-blue-300 rounded-[2rem] flex items-center justify-center group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-500">
           <Plus size={32} className="text-white group-hover:text-blue-500" />
        </div>
        <p className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-400 mt-6 group-hover:text-blue-600">Register New Route</p>
      </motion.div>
    </div>
<div className="lg:col-span-2 bg-white rounded-[1rem] p-10 shadow-2xl shadow-gray-200/50 border border-gray-50">
  <h3 className="font-black text-xl italic uppercase tracking-tighter mb-8 flex items-center gap-3">
    <ShieldCheck className="text-green-500" /> Delivery <span className="text-blue-600">Protocol</span>
  </h3>
  <div className="grid md:grid-cols-2 gap-6">
    {[
      { title: 'Safe-Drop Enabled', desc: 'Leave at front porch if absent', icon: <Package size={20} /> },
      { title: 'Contactless Verification', desc: 'Digital signature required', icon: <Fingerprint size={20} /> },
      { title: 'Weekend Delivery', desc: 'Active for all primary addresses', icon: <Calendar size={20} /> },
      { title: 'Call on Arrival', desc: 'Auto-dial 5 mins before drop', icon: <Bell size={20} /> },
      { title: 'Real-time Tracking', desc: 'Live GPS updates on dispatch', icon: <Truck size={20} /> },
      { title: 'Multi-Point Drop', desc: 'Route optimization active', icon: <MapPin size={20} /> },
    ].map((item, i) => (
      <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 cursor-pointer group">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
          {item.icon}
        </div>
        <div>
          <p className="font-black text-[11px] uppercase tracking-tight text-gray-800">{item.title}</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</div>
     <div className="grid md:grid-cols-2 gap-6">
     {/* Quick Location Tip Box */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[1rem] p-10 text-white relative overflow-hidden">
        <Zap size={150} className="absolute -right-10 -bottom-10 opacity-10 rotate-12" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Prime Service</p>
        <h4 className="text-2xl font-black italic uppercase leading-none mb-4">Express <br/> Network <br/> Active</h4>
        <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest leading-relaxed">Your current primary address qualifies for 12-hour ultra-fast delivery.</p>
        <button className="mt-8 bg-white text-blue-900 px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-[0.2em]">Check Coverage</button>
      </div>
      {/* Rewards Status Box */}
     <div className="bg-gradient-to-br from-amber-400 to-orange-700 rounded-[1rem] p-10 text-white relative overflow-hidden">
    <Trophy size={150} className="absolute -right-10 -bottom-10 opacity-10 -rotate-12" />
    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Elite Member</p>
    <h4 className="text-2xl font-black italic uppercase leading-none mb-4">Golden <br/> Points <br/> Unlocked</h4>
   <p className="text-[10px] font-bold text-amber-100 uppercase tracking-widest leading-relaxed">You have 2,500 pending credits ready to be used on your next big purchase.</p>
   <button className="mt-8 bg-white text-orange-900 px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-[0.2em]">Redeem Now</button>
</div>
      </div>
  </div>
)}


{/* wishlist tab: start here */}
{activeTab === 'Wish List' && (
  <div className="space-y-8">
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
    >
      <div className="relative overflow-hidden mb-5 bg-gradient-to-br from-gray-50 to-blue-50/30 p-8 rounded-[1rem] border border-white/50 shadow-2xl backdrop-blur-md">
        {/* Header Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 15 }}
              className="p-4 bg-white rounded-2xl shadow-lg"
            >
              <Heart className="text-red-500 fill-red-400" size={32} />
            </motion.div>
            <div>
              <h3 className="text-3xl font-serif font-black tracking-tight text-gray-900 leading-none">
                My <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">Wishlist</span>
              </h3>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mt-2">
                {wishlist.length} Items Reserved
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={addNewDemoProduct}
              className="group relative overflow-hidden flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-emerald-200"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Plus size={16} strokeWidth={3} /> Add Demo
              </span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')} 
              className="group relative overflow-hidden flex items-center gap-2 px-6 py-3 bg-[#131921] text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-gray-400"
            >
              <span className="relative z-10 flex items-center gap-2">
                <ShoppingBag size={16} /> Continue Shopping
              </span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
            </motion.button>
          </div>
        </div>
      </div>
      {/* Main Wishlist Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {wishlist.map((p, index) => (
          <motion.div 
            key={p.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ y: -15, scale: 1.05 }}
            className="group border border-gray-100 shadow-xl rounded-[7px] relative bg-white transition-all duration-500"
          >
            <motion.button 
              onClick={() => removeFromWishlist(p.id)} 
              className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors bg-white p-1.5 rounded-full shadow-lg z-10"
            >
              <FaTrash size={14}/>
            </motion.button>

            <motion.img 
              whileHover={{ scale: 1.1 }}
              src={p.img || p.image || 'https://via.placeholder.com/150'} 
              className="w-full aspect-square object-cover rounded-[7px] mb-2" 
              alt={p.name}
            />
            <h4 className="font-bold text-sm mb-1 truncate px-2">{p.name}</h4>
            <div className="flex items-center justify-between px-2 ">
              <p className="text-red-600 font-black ">${p.price}</p>
              <button 
                className="bg-gradient-to-r from-[#febd69] to-[#ff9900] p-2 rounded-[7px] text-[#131921]"
                onClick={() => addToCart(p)}
              >
                <FaShoppingCart size={14}/>
              </button>
            </div>
            <p className="text-xs text-gray-500 px-2 pb-2">
              Added: {p.addedDate || new Date().toLocaleDateString()}
            </p>
          </motion.div>
        ))}
      </div>
      {/* Empty Wishlist State */}
      {wishlist.length === 0 && (
        <div className="text-center py-16">
          <Heart className="mx-auto text-gray-300 mb-3" size={64} />
          <p className="text-gray-500 text-lg">Your wishlist is empty</p>
        </div>
      )}
      {/* Popular Products Section (You Might Also Like) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 pt-10 border-t border-gray-200"
      >
        <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-7">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
            You Might
          </span> 
          <span className="ml-2 text-gray-900">Also Like</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {moreProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="rounded-[7px] p-3 shadow-xl bg-white border border-transparent hover:border-[#febd69] transition-all duration-300"
            >
              <motion.img 
                whileHover={{ scale: 1.05 }}
                src={product.image || product.img} 
                className="w-full aspect-square object-cover rounded-lg" 
                alt={product.name} 
              />
              <h4 className="font-bold text-sm mt-2 mb-1 truncate">{product.name}</h4>
              <div className="flex items-center justify-between">
                <p className="text-red-600 font-black">${product.price}</p>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs">{product.rating}</span>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const newItem = {
                    id: Date.now() + index,
                    name: product.name,
                    price: product.price,
                    img: product.image || product.img,
                    addedDate: new Date().toISOString().split('T')[0],
                    isPermanent: false
                  };
                  const updated = [...wishlist, newItem];
                  setWishlist(updated);
                  localStorage.setItem('userWishlist', JSON.stringify(updated.filter(item => !item.isPermanent)));
                  alert(`${product.name} added to wishlist!`);
                }}
                className="w-full mt-3 bg-gradient-to-r from-[#131921] to-[#232f3e] text-white py-2 rounded-lg text-sm font-medium hover:from-[#febd69] hover:to-[#ff9900] hover:text-[#131921] transition-all duration-300"
              >
                Add to Wishlist
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  </div>
)}


 {/* RETURNS/REFUNDS TAB:  - dashboard start here  */}
{activeTab === 'Returns/Refunds' && (
  <div className="max-w-6xl mx-auto space-y-10 pb-16">
    {/* Header Section with Glass Shimmer */}
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative overflow-hidden bg-white p-10 rounded-[1rem] shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8"
    >
      <div className="relative z-10">
        <h2 className="text-4xl font-black tracking-tighter text-gray-900 uppercase italic">
          Returns <span className="text-blue-600 not-italic">&</span> Refunds
        </h2>
        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-2 ml-1">
          Resolution Center • Track your requests
        </p>
      </div>
      <motion.button 
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (orders.length > 0) {
            requestRefund(orders[0].id);
          } else {
            alert("No orders available for refund");
          }
        }}
        className="group relative overflow-hidden flex items-center gap-3 bg-[#131921] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-gray-900/20"
      >
        <span className="relative z-10 flex items-center gap-2">
          <RefreshCcw size={18} strokeWidth={3} className="group-hover:rotate-180 transition-transform duration-700" /> 
          New Return Request
        </span>
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer" />
      </motion.button>
    </motion.div>

    {/* Stats Grid - Ultra Modern */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: 'Total Returns', value: refunds.length, icon: <RotateCcw size={24}/>, color: 'blue' },
        { label: 'Approved', value: refunds.filter(r => r.status === 'Approved').length, icon: <CheckCircle size={24}/>, color: 'emerald' },
        { label: 'Pending', value: refunds.filter(r => r.status === 'Pending').length, icon: <Clock size={24}/>, color: 'orange' },
        { label: 'Rejected', value: refunds.filter(r => r.status === 'Rejected').length, icon: <XCircle size={24}/>, color: 'red' }
      ].map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-[1rem] border border-gray-100 shadow-sm text-center group transition-all hover:shadow-xl"
        >
          <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 flex items-center justify-center mx-auto mb-4 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
            {stat.icon}
          </div>
          <p className="text-3xl font-black text-gray-900 tracking-tighter">{stat.value}</p>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
    {/* Refund List */}
    <div className="space-y-6">
      {refunds.map((refund, index) => (
        <motion.div
          key={refund.id}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="group bg-white p-8 rounded-[1rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row justify-between gap-8 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  refund.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                  refund.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {refund.status}
                </span>
                <span className="text-gray-300 font-bold text-sm tracking-widest">#{refund.orderId}</span>
              </div>
              
              <h4 className="text-xl font-black text-gray-900 mb-1 leading-tight uppercase tracking-tighter">{refund.productName}</h4>
              <div className="flex flex-wrap gap-y-2 gap-x-6 mt-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={14} /> <span className="text-xs font-bold uppercase tracking-tighter">Requested: {refund.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <CreditCard size={14} /> <span className="text-xs font-bold uppercase tracking-tighter">Method: {refund.refundMethod}</span>
                </div>
              </div>
            </div>
            <div className="lg:text-right flex flex-row lg:flex-col justify-between items-center lg:items-end">
              <div>
                <p className="text-4xl font-black text-gray-900 tracking-tighter">${refund.amount}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Settlement Amount</p>
              </div>
              <p className="mt-4 text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg uppercase tracking-tighter">
                Expected: {refund.expectedDate}
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="text-sm font-bold text-gray-600 italic">
              <span className="text-gray-400 not-italic uppercase text-[10px] mr-2 tracking-widest">Reason:</span> 
              "{refund.reason}"
            </p>
            <div className="flex gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all"
              >
                Track Journey
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-[#131921] text-white rounded-xl text-[10px] font-black uppercase tracking-widest"
              >
                Support Hub
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
    {/* Premium Return Policy Card */}
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bg-gradient-to-br from-blue-600 to-indigo-900 p-1 rounded-[1rem] shadow-2xl shadow-blue-200"
    >
      <div className="bg-white/95 backdrop-blur-xl p-10 rounded-[2.4rem] space-y-6">
        <h3 className="font-black text-2xl text-gray-900 uppercase tracking-tighter flex items-center gap-3">
          <ShieldCheck className="text-blue-600" size={28} /> 
          Protection <span className="text-blue-600">Policy</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
          {[
            '30-Day Luxury Return Window',
            'Complimentary Prime Pickup',
            'Instant Credit Processing',
            '24/7 Priority Support Access'
          ].map((text) => (
            <div key={text} className="flex items-center gap-3 group">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-600 group-hover:scale-150 transition-transform" />
              <p className="text-sm font-bold text-gray-600 uppercase tracking-tight">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
)}

{/* TAB: INVITE FRIENDS - PREMIUM REDESIGN */}
{activeTab === 'Invite Friends' && (
  <div className="space-y-8 animate-in fade-in duration-500">
    
    {/* Hero Card: Clean & Impactful */}
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative bg-white p-10 rounded-[1rem] shadow-xl shadow-gray-100 border border-gray-100 text-center overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl" />
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="w-24 h-24 bg-gradient-to-br from-[#febd69] to-[#ff9900] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3"
      >
        <Users className="text-[#131921]" size={44} />
      </motion.div>
      <h3 className="text-gray font-black text-2xl mb-6 italic  tracking-tighter" style={{ fontFamily: "'Kanit', sans-serif" }}>
      Invite Friends, <span className="text-[#ff9900] uppercase">Earn</span> Rewards
      </h3>
      <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
        Share the joy of shopping! For every friend who makes their first purchase, 
        we'll drop <span className="font-bold text-[#ff9900]">$10.00</span> into your wallet.
      </p>
    </motion.div>
    {/* Steps: Minimal & Aesthetic */}
    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          step: 1,
          title: 'Share Link',
          desc: 'Copy and send your unique invite link to your friends.',
          icon: <Share2 className="text-blue-600" size={28} />,
          bg: 'bg-blue-50/50'
        },
        {
          step: 2,
          title: 'Friends Join',
          desc: 'Your friends sign up and explore our latest collections.',
          icon: <UserPlus className="text-emerald-600" size={28} />,
          bg: 'bg-emerald-50/50'
        },
        {
          step: 3,
          title: 'Get Rewarded',
          desc: 'Receive $10 credit as soon as their first order arrives.',
          icon: <Gift className="text-purple-600" size={28} />,
          bg: 'bg-purple-50/50'
        }
      ].map((item, index) => (
        <motion.div
          key={item.step}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center"
        >
          <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
            {item.icon}
          </div>
          <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
            Step 0{item.step}
          </div>
          <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
   </div>
    
   {/* Referral Stats: Professional Dashboard Look */}
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white p-8 rounded-[1rem] border border-gray-100 shadow-xl shadow-gray-100"
    >
      <div className="flex items-center justify-between mb-8">
         <h3 className="text-gray font-black text-2xl mb-6 italic uppercase tracking-tighter" style={{ fontFamily: "'Kanit', sans-serif" }}>
          Your <span className="text-[#ff9900]">Referral</span> Progress
           </h3>
        <div className="px-4 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
          Active Campaign
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Invites', value: '12', color: 'text-blue-600' },
          { label: 'Successful', value: '08', color: 'text-emerald-600' },
          { label: 'Total Earned', value: '$80', color: 'text-gray-900' },
          { label: 'Pending', value: '$20', color: 'text-orange-600' }
        ].map((stat, index) => (
          <div key={stat.label} className="p-4 rounded-2xl bg-gray-50/50 border border-gray-50 text-center">
            <p className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</p>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Share Section: Elegant Glass Effect */}
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-r from-[#131921] to-[#232f3e] p-1 rounded-[1rem] shadow-2xl"
    >
      <div className="bg-white/5 backdrop-blur-sm p-10 rounded-[2.4rem] text-center">
             <h3 className="text-white font-black text-2xl mb-6 italic uppercase tracking-tighter" style={{ fontFamily: "'Kanit', sans-serif" }}>
              Your Personal <span className="text-[#ff9900]">Invitation</span> Link
            </h3>
        <div className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto">
          <div className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 flex items-center justify-center">
            <span className="font-mono text-blue-300 text-sm truncate">
              shopsphere.com/invite/{userProfile.name.split(' ')[0].toLowerCase()}123
            </span>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={inviteFriend}
            className="group relative overflow-hidden bg-[#ff9900] text-[#131921] px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
          >
            <Copy size={18} />
            <span>Copy Link</span>
            {/* Shimmer Effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
          </motion.button>
        </div>
        <p className="mt-6 text-gray-400 text-xs tracking-wide">
          Share via: <span className="text-gray-300 hover:text-white cursor-pointer px-2 transition-colors">WhatsApp</span> • 
          <span className="text-gray-300 hover:text-white cursor-pointer px-2 transition-colors">Email</span> • 
          <span className="text-gray-300 hover:text-white cursor-pointer px-2 transition-colors">Twitter</span>
        </p>
      </div>
</motion.div>
    
{/* New Community Impact Section */}
<div className="grid md:grid-cols-2 gap-8">
  {/* Top Referrers Leaderboard */}
  <motion.div 
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    className="bg-white p-8 rounded-[1rem] border border-gray-100 shadow-xl shadow-gray-100/50"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
        <Trophy size={20} />
      </div>
      <h3 className="font-black text-lg uppercase tracking-tight">Top Influencers</h3>
    </div>
    <div className="space-y-4">
      {[
        { name: "Samra Amir", invites: 42, reward: "$420" },
        { name: "Saman Haider", invites: 38, reward: "$380" },
        { name: "Mehar Bano", invites: 29, reward: "$290" }
      ].map((user, i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
          <div className="flex items-center gap-3">
            <span className="font-black text-gray-300 text-sm italic">#0{i + 1}</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold">
              {user.name.charAt(0)}
            </div>
            <p className="text-sm font-bold text-gray-800">{user.name}</p>
          </div>
          <p className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+{user.reward}</p>
        </div>
      ))}
    </div>
  </motion.div>

  {/* Referral FAQ / Pro Tip Box */}
  <motion.div 
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-[1rem] border border-blue-100 flex flex-col justify-between"
  >
    <div>
      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 mb-6">
        <Zap size={24} fill="currentColor" />
      </div>
      <h3 className="font-black text-xl text-blue-900 leading-tight mb-4">
        Boost Your <br /> Earnings!
      </h3>
      <p className="text-sm text-blue-700/80 leading-relaxed font-medium">
        Pro Tip: Users who share their link on <span className="font-bold underline">WhatsApp Status</span> get 3x more successful signups than those who use email.
      </p>
    </div>
    
    <button className="mt-8 flex items-center justify-between bg-blue-600 text-white p-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25">
      View All Perks
      <ArrowRight size={16} />
    </button>
  </motion.div>
</div>
  </div>
)}
{/** invite friend tab end here */}


{/*  SETTINGS TAB:-  start here*/}
{activeTab === 'Settings' && ( 
  <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {/* Profile Overview Card */}
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-[1rem] shadow-2xl shadow-gray-100 border border-gray-100 overflow-hidden"
    >
      <div className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Account Settings</h2>
            <p className="text-gray-500 mt-1 font-medium">Manage your public profile and private security.</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowEditProfile(true)} 
            className="flex items-center gap-3 px-8 py-4 bg-[#131921] text-white rounded-2xl font-bold shadow-xl shadow-gray-200 hover:bg-black transition-all"
          >
            <UserPlus size={20} className="text-[#febd69]" /> 
            Edit Personal Info
          </motion.button>
        </div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {[
            { label: 'Full Name', value: userProfile.name, icon: <User size={20} /> },
            { label: 'Email Address', value: userProfile.email, icon: <Mail size={20} /> },
            { label: 'Phone Number', value: userProfile.phone, icon: <Phone size={20} /> },
            { label: 'Member Since', value: userProfile.joinDate, icon: <Calendar size={20} /> }
          ].map((info, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ x: 5 }}
              className="group p-5 bg-gray-50/50 rounded-2xl border border-transparent hover:border-[#febd69]/30 hover:bg-white transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-gray-400 group-hover:text-[#ff9900] transition-colors">
                  {info.icon}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none">
                    {info.label}
                  </label>
                  <p className="font-bold text-gray-800 mt-1 text-lg">{info.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Verified Status Card */}
          <div className="md:col-span-2 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <ShieldCheck className="text-emerald-500" size={28} />
              </div>
              <div>
                <p className="font-black text-emerald-900 uppercase tracking-tighter">Verified Identity</p>
                <p className="text-emerald-700/70 text-sm font-medium">Your account is fully secured and verified.</p>
              </div>
            </div>
            <div className="hidden md:block px-4 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
              Level 3 Security
            </div>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Security Section */}
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white p-10 rounded-[1rem] shadow-xl shadow-gray-100 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
              <LockKeyhole size={22} />
            </div>
            <h3 className="font-black text-xl text-gray-900 uppercase tracking-tighter">Security & Privacy</h3>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Two-Factor Auth', desc: 'Secure your login with 2FA', enabled: true },
              { title: 'Login Notifications', desc: 'Alerts on new device logins', enabled: true },
              { title: 'Privacy Mode', desc: 'Hide activity from public', enabled: false }
            ].map((setting, idx) => (
              <div key={idx} className="flex items-center justify-between p-6 rounded-2xl border border-gray-50 hover:bg-gray-50/50 transition-colors">
                <div>
                  <p className="font-bold text-gray-800">{setting.title}</p>
                  <p className="text-xs text-gray-500 font-medium">{setting.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={setting.enabled} />
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ff9900]"></div>
                </label>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Danger Zone Sidebar */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-red-50/50 p-8 rounded-[1rem] border border-red-100 flex flex-col justify-between"
      >
        <div>
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 mb-6 shadow-sm">
            <Trash2 size={24} />
          </div>
          <h3 className="font-black text-lg text-red-900 uppercase tracking-tighter mb-2">Danger Zone</h3>
          <p className="text-red-700/60 text-sm font-medium leading-relaxed">
            Deleting your account will permanently remove all your order history and earned rewards.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 w-full py-4 bg-white border-2 border-red-200 text-red-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm"
        >
          Terminate Account
        </motion.button>
      </motion.div>
    </div>
    {/* New Settings Extension: Notifications & Display */}
 <div className="grid md:grid-cols-2 gap-8 mt-8">
  {/* Box 1: Notification Channels */}
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="bg-white p-8 rounded-[1rem] shadow-xl shadow-gray-100 border border-gray-100"
  >
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
        <BellRing size={22} />
      </div>
      <h3 className="font-black text-xl text-gray-900 uppercase tracking-tighter">Notification Hub</h3>
    </div>
    <div className="space-y-5">
      {[
        { label: 'Email Alerts', sub: 'Weekly newsletters & offers', active: true },
        { label: 'SMS Updates', sub: 'Direct order status on phone', active: false },
        { label: 'Desktop Push', sub: 'Real-time web notifications', active: true }
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between group cursor-pointer">
          <div>
            <p className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{item.label}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.sub}</p>
          </div>
          <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-gray-300'}`} />
        </div>
      ))}
    </div>
    <button className="mt-8 w-full py-3 bg-gray-50 text-gray-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all">
      Configure Channels
    </button>
  </motion.div>

  {/* Box 2: Appearance & Localization */}
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="bg-gradient-to-br from-[#131921] to-[#232f3e] p-8 rounded-[1rem] text-white overflow-hidden relative"
  >
    {/* Decorative background icon */}
    <Globe size={120} className="absolute -right-8 -bottom-8 opacity-10 rotate-12" />
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[#febd69]">
        <Palette size={22} />
      </div>
      <h3 className="font-black text-xl uppercase tracking-tighter">System Display</h3>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-all">
        <p className="text-[9px] font-black text-[#febd69] uppercase mb-1">Language</p>
        <p className="font-bold text-sm">English (US)</p>
      </div>
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-all">
        <p className="text-[9px] font-black text-[#febd69] uppercase mb-1">Currency</p>
        <p className="font-bold text-sm">USD ($)</p>
      </div>
      <div className="col-span-2 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
        <div>
          <p className="text-[9px] font-black text-[#febd69] uppercase mb-1">Appearance</p>
          <p className="font-bold text-sm">Adaptive Light Mode</p>
        </div>
        <button className="px-4 py-2 bg-[#febd69] text-[#131921] rounded-lg font-black text-[9px] uppercase">Switch</button>
      </div>
    </div>
  </motion.div>
</div>
  </div>  
)} {/*  SETTINGS TAB:-  end here*/}
 </motion.div>
   </AnimatePresence>
   </main>
    </div>


     {/* --- MODALS --- */}
      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative"
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Add New Card</h3>
                  <X className="cursor-pointer text-gray-400 hover:text-black" onClick={() => setShowPaymentModal(false)} />
                </div>
              </div>
              <form onSubmit={savePayment} className="p-8 space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Card Type</label>
                  <select name="cardType" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#febd69] focus:border-transparent">
                    <option value="">Select Card Type</option>
                    <option value="Visa Card">Visa Card</option>
                    <option value="MasterCard">MasterCard</option>
                    <option value="Debit Card">Debit Card</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Name on Card</label>
                  <input 
                    name="cardName" 
                    required 
                    placeholder="Samra Amir" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#febd69] focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Card Number</label>
                  <input 
                    name="cardNumber" 
                    required 
                    placeholder="1234 5678 9012 3456" 
                    maxLength="16" 
                    type="text" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#febd69] focus:border-transparent" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Expiry Date</label>
                    <input 
                      name="expiry" 
                      required 
                      placeholder="MM/YY" 
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#febd69] focus:border-transparent" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">CVV</label>
                    <input 
                      name="cvv" 
                      required 
                      placeholder="123" 
                      maxLength="4" 
                      type="password" 
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#febd69] focus:border-transparent" 
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="saveCard" defaultChecked className="w-4 h-4 accent-[#febd69]" />
                  <label htmlFor="saveCard" className="text-sm text-gray-700">Save this card for future purchases</label>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-gradient-to-r from-[#131921] to-[#232f3e] text-white py-3 rounded-lg font-bold hover:from-[#febd69] hover:to-[#ff9900] hover:text-[#131921] transition-all">
                    Add Card
                  </button>
                  <button type="button" onClick={() => setShowPaymentModal(false)} className="flex-1 border border-gray-300 py-3 rounded-lg font-bold hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
        {/* Shipping Address Modal */}
        {showAddressModal && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Add New Shipping Address</h3>
                  <X className="cursor-pointer text-gray-400 hover:text-black" onClick={() => setShowAddressModal(false)} />
                </div>
              </div>
              <form onSubmit={saveAddress} className="p-8 overflow-y-auto space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-800">Country/Region</label>
                  <select name="country" required className="w-full p-3 border rounded-md text-sm outline-none focus:border-black">
                    <option value="Pakistan">Pakistan</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="UAE">United Arab Emirates</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-800">Contact Information</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="name" required placeholder="Full Name*" className="w-full p-3 border rounded-md text-sm outline-none focus:border-black" />
                    <div className="flex">
                      <select className="p-3 border border-r-0 rounded-l-md bg-gray-50 text-sm text-gray-600">
                        <option>+92</option>
                        <option>+1</option>
                        <option>+44</option>
                        <option>+61</option>
                      </select>
                      <input name="phone" required placeholder="Mobile Number*" className="w-full p-3 border rounded-r-md text-sm outline-none focus:border-black" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-800">Address</label>
                  <div className="grid grid-cols-1 gap-4">
                    <input name="address" required placeholder="Street Address, House No, Building*" className="w-full p-3 border rounded-md text-sm outline-none focus:border-black" />
                    <input placeholder="Apartment, Suite, Unit (Optional)" className="w-full p-3 border rounded-md text-sm outline-none focus:border-black" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-bold text-gray-800 mb-2 block">City*</label>
                    <input name="city" required placeholder="City" className="w-full p-3 border rounded-md text-sm outline-none focus:border-black" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-800 mb-2 block">State/Province*</label>
                    <input name="state" required placeholder="State" className="w-full p-3 border rounded-md text-sm outline-none focus:border-black" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-800 mb-2 block">ZIP/Postal Code*</label>
                    <input name="zip" required placeholder="ZIP Code" className="w-full p-3 border rounded-md text-sm outline-none focus:border-black" />
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" id="default" name="default" className="w-5 h-5 accent-red-600" />
                  <label htmlFor="default" className="text-sm text-gray-700">Set as default shipping address</label>
                </div>
                <div className="flex flex-col md:flex-row gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-gradient-to-r from-[#131921] to-[#232f3e] text-white py-3 rounded-full font-bold hover:from-[#febd69] hover:to-[#ff9900] hover:text-[#131921] transition-all">
                    Save Address
                  </button>
                  <button type="button" onClick={() => setShowAddressModal(false)} className="flex-1 border border-gray-300 py-3 rounded-full font-bold hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Edit Profile Modal */}
        {showEditProfile && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative"
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Edit Profile</h3>
                  <X className="cursor-pointer text-gray-400 hover:text-black" onClick={() => setShowEditProfile(false)} />
                </div>
              </div>
              <form onSubmit={updateProfile} className="p-8 space-y-6">
                <div className="flex flex-col items-center mb-6">
                  <img 
                    src={selectedImage || userProfile.avatar} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full border-4 border-[#febd69] mb-4"
                  />
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  <button 
                    type="button"
                    onClick={triggerImageUpload}
                    className="text-sm text-[#131921] font-medium hover:text-[#febd69]"
                  >
                    Change Photo
                  </button>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name</label>
                  <input 
                    name="fullName" 
                    defaultValue={userProfile.name}
                    placeholder="Full Name" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#febd69] focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
                  <input 
                    name="email" 
                    type="email"
                    defaultValue={userProfile.email}
                    placeholder="Email" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#febd69] focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
                  <input 
                    name="phone" 
                    defaultValue={userProfile.phone}
                    placeholder="Phone Number" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#febd69] focus:border-transparent" 
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-gradient-to-r from-[#131921] to-[#232f3e] text-white py-3 rounded-lg font-bold hover:from-[#febd69] hover:to-[#ff9900] hover:text-[#131921] transition-all">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => setShowEditProfile(false)} className="flex-1 border border-gray-300 py-3 rounded-lg font-bold hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
        {/* Rating Modal */}
        {showRateModal && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Rate {showRateModal.itemName}</h3>
                <X className="cursor-pointer text-gray-400 hover:text-black" onClick={() => setShowRateModal(null)} />
              </div>
              
              <div className="text-center mb-6">
                <div className="flex justify-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-3xl"
                    >
                      {star <= rating ? '⭐' : '☆'}
                    </button>
                  ))}
                </div>
                <p className="text-gray-600">Select {rating} star{rating !== 1 ? 's' : ''}</p>
              </div>
              
              <textarea 
                placeholder="Write your review (optional)"
                className="w-full p-3 border rounded-lg mb-6 h-32 focus:ring-2 focus:ring-[#febd69] focus:border-transparent"
              />
              
              <div className="flex gap-4">
                <button 
                  onClick={() => rateProduct(showRateModal.orderId, showRateModal.itemId, rating, "Great product!")}
                  className="flex-1 bg-gradient-to-r from-[#131921] to-[#232f3e] text-white py-3 rounded-lg font-bold hover:from-[#febd69] hover:to-[#ff9900] hover:text-[#131921] transition-all"
                >
                  Submit Rating
                </button>
                <button 
                  onClick={() => setShowRateModal(null)}
                  className="flex-1 border border-gray-300 py-3 rounded-lg font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Order Details Modal */}
        {showOrderDetails && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b sticky top-0 bg-white z-10">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Order Details - {showOrderDetails.orderId}</h3>
                  <X className="cursor-pointer text-gray-400 hover:text-black" onClick={() => setShowOrderDetails(null)} />
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-xl">
                      <h4 className="font-bold mb-2">Shipping Address</h4>
                      <p className="text-gray-600">Samra Amir</p>
                      <p className="text-gray-600">House 123, Street 45, Sector G-8</p>
                      <p className="text-gray-600">Islamabad, Pakistan - 44000</p>
                      <p className="text-gray-600 mt-2">+92 300 1234567</p>
                    </div>
                    
                    <div className="p-4 border rounded-xl">
                      <h4 className="font-bold mb-2">Payment Method</h4>
                      <p className="text-gray-600">{showOrderDetails.paymentMethod}</p>
                      <p className="text-gray-600">Total: ${showOrderDetails.total}</p>
                    </div>
                  </div> 
                  <div className="space-y-4">
                    <div className="p-4 border rounded-xl">
                      <h4 className="font-bold mb-2">Order Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal:</span>
                          <span>${showOrderDetails.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping:</span>
                          <span>$0.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax:</span>
                          <span>${(showOrderDetails.total * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span>${(showOrderDetails.total * 1.1).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-xl">
                      <h4 className="font-bold mb-2">Delivery Info</h4>
                      <p className="text-gray-600">Tracking ID: {showOrderDetails.trackingId}</p>
                      <p className="text-gray-600">Expected Delivery: {showOrderDetails.deliveryDate}</p>
                      <p className="text-gray-600">Status: {showOrderDetails.status}</p>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-6">
                  <h4 className="font-bold text-lg mb-4">Order Items</h4>
                  <div className="space-y-4">
                    {showOrderDetails.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-xl">
                        <img src={item.image} className="w-16 h-16 object-cover rounded-lg" alt={item.name} />
                        <div className="flex-1">
                          <h5 className="font-bold">{item.name}</h5>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                          <p className="font-bold">${item.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                          {item.rating > 0 && (
                            <div className="flex items-center gap-1 mt-2 justify-end">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i}
                                  size={14}
                                  className={i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                  <button 
                    onClick={() => setShowOrderDetails(null)}
                    className="px-6 py-3 border rounded-lg font-bold hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      setShowOrderDetails(null);
                      alert("Order details printed!");
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-[#131921] to-[#232f3e] text-white rounded-lg font-bold hover:from-[#febd69] hover:to-[#ff9900] hover:text-[#131921]"
                  >
                    Print Invoice
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

  {/* help button: COMPLETELY STABLE FLOATING HELP BUTTON */}
     <motion.button
     initial={{ scale: 0, opacity: 0, y: 20 }}
     animate={{ scale: 1, opacity: 1, y: 0 }}
     transition={{ 
     type: "spring", 
     stiffness: 260, 
     damping: 20 
     }}
     whileHover={{ 
     scale: 1.1,
     backgroundColor: "#febd69" 
     }}
     whileTap={{ scale: 0.95 }}
     onClick={() => setShowHelp(true)}
    className="fixed bottom-10 right-8 z-[100] w-14 h-14 bg-[#ff9900] rounded-2xl shadow-[0_10px_30px_rgba(255,153,0,0.3)] flex items-center justify-center text-[#131921] border-b-4 border-black/10 transition-all cursor-pointer"
     >
     <HelpCircle size={24} strokeWidth={2.5} />
     <div className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full border-2 border-[#ff9900]" />
   </motion.button>

  {/* HELP MODAL - PREMIUM REDESIGN */}
{showHelp && (
  <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
    {/* Animated Backdrop */}
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowHelp(false)}
      className="absolute inset-0 bg-[#131921]/60 backdrop-blur-md"
    />

    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="bg-white rounded-[3rem] w-full max-w-lg shadow-[0_30px_100px_rgba(0,0,0,0.3)] relative overflow-hidden"
    >
      {/* Decorative Top Bar */}
      <div className="h-2 bg-gradient-to-r from-[#febd69] via-[#ff9900] to-[#febd69]" />
      
      <div className="p-8">
        <div className="text-center mb-7">
          <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#ff9900]">
            <HelpCircle size={40} strokeWidth={1.5} />
          </div>
          <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">
            Support <span className="text-orange-500 not-italic font-bold">Center</span>
          </h3>
          <p className="text-gray-500 text-sm font-medium mt-2">How can our team assist you today?</p>
        </div>

        <div className="space-y-2">
          {[
            { 
              title: 'Live Chat Support', 
              desc: 'Instant response from our AI & team', 
              icon: <MessageSquare size={22} />, 
              color: 'text-blue-600', 
              bg: 'bg-blue-50',
              action: () => { setShowHelp(false); setShowChat(true); } 
            },
            { 
              title: 'Express Call', 
              desc: '+92 300 123 4567 (Toll Free)', 
              icon: <Phone size={22} />, 
              color: 'text-emerald-600', 
              bg: 'bg-emerald-50',
              action: () => window.open('tel:+923001234567') 
            },
            { 
              title: 'Email Concierge', 
              desc: 'Expected response: < 2 hours', 
              icon: <Mail size={22} />, 
              color: 'text-red-600', 
              bg: 'bg-red-50',
              action: () => window.open('mailto:support@shopsphere.com') 
            },
            { 
              title: 'Knowledge Base', 
              desc: 'Self-service guides and FAQs', 
              icon: <LifeBuoy size={22} />, 
              color: 'text-purple-600', 
              bg: 'bg-purple-50',
              action: () => console.log('Redirecting to FAQ...')
            }
          ].map((item, idx) => (
            <motion.button 
              key={idx}
              whileHover={{ x: 10, backgroundColor: 'rgba(249, 250, 251, 1)' }}
              whileTap={{ scale: 0.98 }}
              onClick={item.action}
              className="w-full p-5 border border-gray-100 rounded-[1.5rem] text-left transition-all flex items-center gap-5 group"
            >
              <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{item.title}</p>
                <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
              </div>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-orange-500 transition-colors" />
            </motion.button>
          ))}
        </div>
        <button 
          onClick={() => setShowHelp(false)}
          className="w-full mt-10  text-gray-400 font-black text-xs uppercase tracking-[0.3em] hover:text-red-500 transition-colors"
        >
          Dismiss
        </button>
      </div>
    </motion.div>
  </div>
)}

{/* CHAT TRIGGER BUTTON - PREMIUM DESIGN */}
<div className="fixed bottom-28 right-8 z-[500]">
  {/* The Badge (Unread Counter) with Glow */}
  {chatMessages.filter(m => m.sender === 'bot').length > 0 && (
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -top-1 -right-1 z-10 w-6 h-6 bg-[#ff9900] text-[#131921] text-[10px] font-black rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,153,0,0.5)] border-2 border-white"
    >
      {chatMessages.filter(m => m.sender === 'bot').length}
    </motion.div>
  )}
  {/* Notification Ripple Effect (Sirf tab jab naya message ho) */}
  <span className="absolute inset-0 rounded-2xl bg-[#ff9900] animate-ping opacity-20" />

  <motion.button
    initial={{ scale: 0, y: 50 }}
    animate={{ scale: 1, y: 0 }}
    whileHover={{ 
      scale: 1.1, 
      y: -5,
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)" 
    }}
    whileTap={{ scale: 0.9 }}
    onClick={() => setShowChat(!showChat)}
    className={`
      relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500
      ${showChat 
        ? 'bg-[#ff9900] text-[#131921] rotate-90' 
        : 'bg-[#131921] text-white shadow-2xl shadow-black/20'
      }
      border-b-4 border-black/20
    `}
  >
    {/* Dynamic Icon Switching */}
    <div className="relative">
      {showChat ? (
        <X size={28} strokeWidth={3} />
      ) : (
        <div className="relative">
          <MessageSquare size={28} strokeWidth={2.5} />
          {/* Animated Dot inside icon */}
          <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-1 right-0 w-2 h-2 bg-[#ff9900] rounded-full"
          />
        </div>
      )}
    </div>
    {/* Glossy Overlay */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
  </motion.button>
  {/* Tooltip on Hover */}
  <div className="absolute right-20 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#131921] text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
    Support
  </div>
</div>

   {/* dummy CHAT MODAL - PREMIUM DESIGN */}
{showChat && (
  <motion.div 
    initial={{ opacity: 0, y: 100, scale: 0.8, filter: "blur(10px)" }}
    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: 100, scale: 0.8 }}
    className="fixed bottom-24 right-6 z-[500] w-[350px] h-[500px] bg-white rounded-[1rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden flex flex-col"
  >
    {/* Header: Dynamic Gradient */}
    <div className="bg-[#131921] p-4 text-white relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
      
      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#febd69] to-[#ff9900] flex items-center justify-center shadow-lg">
              <MessageSquare className="text-[#131921]" size={24} />
            </div>
            {/* Online Pulse Indicator */}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-[#131921] rounded-full shadow-sm animate-pulse" />
          </div>
          <div>
            <h3 className="font-black text-lg tracking-tight leading-none">ShopSphere <span className="text-[#febd69]">AI</span></h3>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-400 mt-1.5">Samra Online</p>
          </div>
        </div>
        
        <motion.button 
          whileHover={{ rotate: 90, backgroundColor: "rgba(255,255,255,0.1)" }}
          onClick={() => setShowChat(false)} 
          className="p-2 rounded-xl transition-colors"
        >
          <X size={20} />
        </motion.button>
      </div>
    </div>
    {/* Messages Area */}
    <div 
      ref={chatRef} 
      className="flex-1 p-6 overflow-y-auto bg-gray-50/50 space-y-6 scrollbar-hide"
      style={{ scrollBehavior: 'smooth' }}
    >
      <div className="text-center mb-8">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          Today
        </span>
      </div>

      {chatMessages.map((msg, idx) => (
        <motion.div
          key={msg.id || idx}
          initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`max-w-[80%] group`}>
            <div className={`
              p-4 rounded-[1.5rem] text-sm font-medium shadow-sm leading-relaxed
              ${msg.sender === 'user' 
                ? 'bg-[#131921] text-white rounded-br-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}
            `}>
              {msg.text}
            </div>
            <p className={`text-[10px] font-bold mt-2 text-gray-400 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              {msg.time} {msg.sender === 'user' && '• Read'}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
    {/* Input Area: Clean & Modern */}
    <div className="p-6 bg-white border-t border-gray-50">
      <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-100 focus-within:border-[#ff9900] focus-within:bg-white transition-all shadow-inner">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 bg-transparent px-3 py-2 text-sm font-medium outline-none text-gray-800 placeholder:text-gray-400"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={sendMessage}
          disabled={!newMessage.trim()}
          className={`
            w-11 h-11 flex items-center justify-center rounded-xl transition-all shadow-lg
            ${newMessage.trim() 
              ? 'bg-[#ff9900] text-[#131921] shadow-orange-500/20' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}
          `}
        >
          <Send size={18} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  </motion.div>
)}
</AnimatePresence>


{/**footer section start here */}
<footer className="w-full font-sans">
  <div className="relative bg-[#fcfdfe] py-18  overflow-hidden  md:-translate-y- transform">
  {/* Dynamic Background Elements */}
  <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-gradient-to-br from-orange-100/30 to-transparent rounded-full blur-[120px] pointer-events-none"></div>
  <div className="absolute bottom-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-gradient-to-tl from-blue-100/40 to-transparent rounded-full blur-[120px] pointer-events-none"></div>
  <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {features.map((feature, index) => (
        /* Main Wrapper */
        <div key={index} className="relative group cursor-pointer">
          {/* FIX: THE 3D BOX LAYER (Ab yeh refresh par gayab nahi hoga) */}
          <div className={`absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[2.2rem] bg-gradient-to-br ${feature.accent} opacity-20 transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:opacity-30`}></div>
          {/* THE MAIN FRONT CARD */}
          <div className="relative z-10 p-6 rounded-[2.2rem] bg-white border-2 border-slate-100 transition-all duration-500 
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

export default UserProfile;

