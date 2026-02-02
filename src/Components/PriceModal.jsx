import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  PieChart, Pie, Cell, BarChart, Bar ,
} from 'recharts';
import {LayoutDashboard, ShoppingBag, Truck, MessageSquare, 
  DollarSign, MapPin, Settings, LogOut, ChevronDown, X, Menu,
  Bell, TrendingUp, TrendingDown, Package, Users, Tag,
  ShoppingCart, Calendar,
  CheckCircle, Clock, XCircle, ChevronRight, Search,
} from 'lucide-react';


// Sample Data
const revenueData = [
  { name: 'Jan', income: 65, outcome: 45 },
  { name: 'Feb', income: 78, outcome: 52 },
  { name: 'Mar', income: 90, outcome: 68 },
  { name: 'Apr', income: 81, outcome: 59 },
  { name: 'May', income: 56, outcome: 48 },
  { name: 'Jun', income: 100, outcome: 75 },
  { name: 'Jul', income: 93, outcome: 70 },
];

const statusData = [
  { name: 'Delivered', value: 68 },
  { name: 'Pending', value: 32 },
];
const COLORS = ['#FF9F43', '#1E293B'];

const recentOrders = [
  { id: '003518', customer: 'Samra Amir', date: '08 Jan 2026', amount: '$300', status: 'Delivered', statusColor: 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/20' },
  { id: '003568', customer: 'Saman Haider', date: '09 Jan 2026', amount: '$320', status: 'Pending', statusColor: 'bg-[#FF9F43]/20 text-[#FF9F43] border border-[#FF9F43]/20' },
  { id: '003592', customer: 'Zara Noor', date: '10 Jan 2026', amount: '$450', status: 'Delivered', statusColor: 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/20' },
  { id: '003615', customer: 'Mehar Bano', date: '11 Jan 2026', amount: '$275', status: 'On Hold', statusColor: 'bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/20' },
  { id: '003615', customer: 'Sehar AB', date: '11 Jan 2026', amount: '$275', status: 'Delivered', statusColor: 'bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/20' },
];

const trackingData = [
  { region: 'Islamabad', amount: '1,358,042', progress: 85 },
  { region: 'Sargodha', amount: '861,250', progress: 60 },
  { region: 'Lahore', amount: '657,802', progress: 45 },
  { region: 'Karachi', amount: '420,150', progress: 30 },
];

const PriceModal = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile Menu Toggle

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;
  const formatTime = (date) => date.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formatDate = (date) => date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const StatCard = ({ label, value, change, icon }) => (
    <div className="bg-[#1E293B] p-4 rounded-[5px] border border-white/5 relative overflow-hidden group hover:border-[#FF9F43]/40 transition-all duration-300">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#f59e4c] opacity-[0.03] rounded-full group-hover:opacity-[0.08] transition-opacity"></div>
      <div className="flex justify-between items-start mb-1">
        <div className="p-2 bg-[#0F172A] rounded-[5px] text-[#FF9F43]">{icon}</div>
        <div className="bg-[#FF9F43]/10 text-[#FF9F43] px-3 py-1 rounded-lg text-[10px] font-bold">{change}</div>
      </div>
      <div>
        <p className="text-slate-400 text-[8px] font-bold tracking-wider uppercase mb-1">{label}</p>
        <h4 className="text-[15px] font-black text-white">{value}</h4>
      </div>
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#FF9F43] to-transparent w-full opacity-20"></div>
    </div>
  );
  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-['Inter',sans-serif] relative overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { scrollbar-width: none; -ms-overflow-style: none; }
        *::-webkit-scrollbar { display: none; }
      `}</style>
      {/* MOBILE HEADER (Only visible on small screens) */}
      <div className="lg:hidden flex justify-between items-center p-4 bg-[#0F172A] border-b border-white/5 sticky top-0 z-[60]">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#FF9F43] rounded-xl flex items-center justify-center">
            <Package size={20} className="text-[#0F172A]" />
          </div>
          <h2 className="font-bold italic text-xl tracking-tight">Shop<span className="text-[#FF9F43]">Sphere</span></h2>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-[#1E293B] rounded-lg text-[#FF9F43]">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className="flex h-screen overflow-hidden">
        {/* LEFT SIDEBAR */}
        <div className={`fixed lg:relative z-50 w-72 h-full bg-[#0F172A] border-r border-white/5 transition-transform duration-300 transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <div className="px-8 mt-4 flex flex-col h-full">
            <div className="hidden lg:flex items-center gap-3 mb-8 mt-4">
              <div className="w-12 h-12 bg-[#FF9F43] rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(255,159,67,0.3)]">
                <Package size={22} className="text-[#0F172A]" />
              </div>
              <h2 className="font-bold italic text-[24px] tracking-tight text-white">Shop<span className="font-serif text-[#FF9F43]">Sphere</span></h2>
            </div>
            <nav className="flex-grow space-y-1">
              <NavItem icon={<LayoutDashboard size={19} />} label="OVERVIEW" active />
              <NavItem icon={<ShoppingBag size={19} />} label="SHIPMENT" />
              <NavItem icon={<Truck size={19} />} label="TRACKING" />
              <NavItem icon={<MessageSquare size={19} />} label="MESSAGES" notification={258} />
              <NavItem icon={<DollarSign size={19} />} label="REVENUE" />
            </nav>
            <div className="pt-6 border-t border-white/10 pb-8">
              <NavItem icon={<Settings size={20} />} label="SETTINGS" />
               <a href="/" > <button onClick={() => setIsOpen(false)} className="w-full flex items-center gap-4 p-5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                <LogOut  size={20} />
                <span className="text-sm font-bold tracking-wider uppercase">LOGOUT</span>
              </button></a>
            </div>
          </div>
        </div>
        {/* RIGHT CONTENT AREA */}
        <div className="flex-1 overflow-y-auto bg-[#0F172A]">
          <div className="px-4 lg:px-8 py-4 pb-20 lg:pb-8">
            {/* TOP BAR - Responsive Flex */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
              <div className="flex items-center gap-5 bg-[#1E293B] p-3 pr-8 rounded-[8px] border border-[#FF9F43]/10 w-full md:w-auto">
                <div className="relative w-14 h-14 bg-[#FF9F43] rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <div className="relative w-10 h-10 border-2 border-white/30 rounded-full flex items-center justify-center">
                    <div className="absolute w-[2px] h-3 bg-white rounded-full origin-bottom animate-[spin_60s_linear_infinite]" style={{ top: '20%' }}></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">{formatTime(currentTime).split(' ')[0]}</span>
                    <span className="text-sm font-bold text-[#FF9F43] uppercase ml-1">{formatTime(currentTime).split(' ')[1]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase mt-1">
                    <Calendar size={12} className="text-[#FF9F43]" /> {formatDate(currentTime)}
                  </div>
                </div>
              </div>
             <div className="flex items-center gap-1 w-full md:w-auto justify-between md:justify-end">
    {/* Launching Soon / Time Left Section */}
    <div className="flex items-center gap-4 bg-[#1E293B] p-3 pr-6 rounded-[5px] border border-white/5 shadow-xl">
      <div className="relative shrink-0">
       <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#FF9F43] to-[#aa650c] flex items-center justify-center border-2 border-[#FF9F43]/20 relative overflow-hidden">
        <svg className="w-5 h-5 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      {/* Small Notification Dot */}
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-800 rounded-full animate-ping"></div>
    </div>
    <div>
      <div className="text-[10px] font-bold text-[#FF9F43] uppercase tracking-[1.5px] leading-none">Launching In</div>
      <div className="text-sm font-extrabold text-white mt-1 flex items-center gap-1">
        23 <span className="text-[10px] text-gray-400 font-medium">Days Left</span>
      </div>
    </div>
  </div>
  {/* Close Button */}
  <a href="/" ><button 
    onClick={() => setIsOpen(false)} 
    className="w-16 h-16 shrink-0 rounded-[5px] bg-[#1E293B] border border-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-600/20 hover:text-orange-500 hover:border-orange-500/30 transition-all duration-300 group shadow-xl"
  >
    <X size={22} className="group-hover:rotate-90 transition-transform duration-300" />
  </button></a>
  </div>
       </div>
           {/* ANALYTICS OVERVIEW */}
            <div className="mb-2">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 mb-3">
                <div>
                  <h3 className="text-2xl md:text-3xl italic font-bold  text-white">
                    Price Drop <span className="font-serif font-bold italic text-[#FF9F43]">Analytic</span>
                  </h3>
                  <p className="text-slate-400 text-[11px] font-medium mt-1">Monitor your key metrics and performance</p>
                 </div>
                 <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="flex text-[10px] items-center gap-2 bg-[#1E293B] px-4 py-2 rounded-[5px] border border-white/5 font-bold text-slate-300 grow sm:grow-0">
                    <Calendar size={16} className="text-[#FF9F43]" /> TRACKING: <span className="text-white">THIS YEAR</span>
                  </div>
                  <button className="bg-[#FF9F43] text-[10px] text-[#0F172A] px-5 py-2 rounded-[5px] font-black uppercase tracking-wider grow sm:grow-0">Report</button>
                </div>
              </div>
              {/* STAT CARDS - Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                <StatCard label="BRAND ASSETS" value="$1,249.50" change="+5.4%" icon={<Tag size={20} />} />
                <StatCard label="LAUNCH STATUS" value="85% Ready" change="Live" icon={<Package size={20} />} />
                <StatCard label="CUSTOMERS" value="5,834" change="+11%" icon={<Users size={20} />} />
                <StatCard label="ORDERS" value="3,270" change="+20%" icon={<ShoppingCart size={20} />} />
                <StatCard label="TOTAL SALE" value="$1,249k" change="+2%" icon={<DollarSign size={20} />} />
              </div>
            </div>
            {/* CHARTS SECTION - Column on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-2">
              <div className="lg:col-span-2 bg-[#1E293B] rounded-[5px] p-4 md:p-6 border border-white/10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ">
                  <div>
                    <h4 className="font-bold  text-lg text-white">Revenue <span className="font-serif italic" >Analytics</span></h4>
                    <p className="text-slate-400 text-sm">Prices vs Sales this year</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium">
                    <span className="flex items-center gap-2 text-white"><div className="w-3 h-3 rounded-full bg-[#10b981]"></div> Prices</span>
                    <span className="flex items-center gap-2 text-white"><div className="w-3 h-3 rounded-full bg-[#FF9F43]"></div> Sales</span>
                  </div>
                </div>
                <div className="h-[250px] md:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorOutcome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FF9F43" stopOpacity={0.3}/><stop offset="95%" stopColor="#FF9F43" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af'}} tickFormatter={(v) => `$${v}k`} />
                      <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #374151', borderRadius: '8px', color: 'white' }} />
                      <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
                      <Area type="monotone" dataKey="outcome" stroke="#FF9F43" strokeWidth={2} fillOpacity={1} fill="url(#colorOutcome)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              {/* Status Card */}
              <div className="bg-[#1E293B] rounded-[5px] p-6 border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF9F43] opacity-[0.05] blur-[80px]"></div>
                <div className="flex justify-between items-start mb-5 relative z-10">
                  <div>
                    <h4 className="font-black text-xl text-white">Order <span className="font-serif italic text-[#FF9F43]">Status</span></h4>
                    <p className="text-slate-400 text-xs mt-1 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Live updates
                    </p>
                  </div>
                  <div className="text-[10px] font-black bg-[#FF9F43] text-[#0F172A] px-3 py-1 rounded-full uppercase">Today</div>
                </div>
               <div className="flex justify-center mb-5 relative">
         {/* chart start here  */}
        <div className="w-[200px] h-[200px] relative"> 
        <ResponsiveContainer width="100%" height="100%">
         <PieChart>
          <defs>
          <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF9F43" />
            <stop offset="100%" stopColor="#FF7A00" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <Pie 
          data={statusData} 
          innerRadius={75} // Size ke hisab se radius barha diya
          outerRadius={95} // Outer radius bhi barha diya
          paddingAngle={8} 
          dataKey="value" 
          stroke="none" 
          cornerRadius={12}
        >
          <Cell fill="url(#orangeGradient)" filter="url(#glow)" />
          <Cell fill="#2D3A4F" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    {/* pie chart*/}
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <div className="bg-white/5 backdrop-blur-md w-28 h-28 rounded-full border border-white/10 flex flex-col items-center justify-center shadow-2xl">
        <span className="text-3xl font-black text-white">68<span className="text-[#FF9F43] text-xl">%</span></span>
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Delivered</span>
      </div>
    </div>
  </div>
</div>
     <div className="grid grid-cols-3 gap-2 relative z-10">
                  {[{ label: 'Booked', val: '289', color: 'text-white' }, { label: 'Progress', val: '1,953', color: 'text-[#FF9F43]' }, { label: 'Canceled', val: '120', color: 'text-slate-500' }].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-2 text-center">
                      <div className={`text-sm font-black ${stat.color}`}>{stat.val}</div>
                      <div className="text-[8px] text-slate-400 font-bold uppercase mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* BOTTOM SECTION - Column on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              <div className="lg:col-span-2 bg-[#1E293B] rounded-[5px] p-6 border border-white/5 shadow-2xl overflow-hidden relative">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-black text-xl text-white">Recent <span className="font-serif text-[#FF9F43]">Orders</span></h4>
                  <button className="text-[#FF9F43] text-xs font-bold flex items-center gap-1">View All <ChevronRight size={14} /></button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-separate border-spacing-y-2 min-w-[600px]">
                    <thead>
                      <tr className="text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <th className="pb-2 px-4">Invoice</th><th className="pb-2 px-4">Customer</th><th className="pb-2 px-4">Date</th><th className="pb-2 px-4 text-right">Amount</th><th className="pb-2 px-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="group transition-all">
                          <td className="py-3 px-3 bg-white/[0.02] rounded-l-xl border-y border-l border-white/5 text-sm font-bold text-slate-300">#{order.id}</td>
                          <td className="py-3 bg-white/[0.02] border-y border-white/5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 ring-2 ring-[#FF9F43]/10">
                                <img src="images/Logos/duri.jfif" alt="user" className="w-full h-full object-cover" />
                              </div>
                              <span className="text-sm font-extrabold text-white">{order.customer}</span>
                            </div>
                          </td>
                          <td className="py-3 bg-white/[0.02] border-y border-white/5 text-xs text-slate-400">{order.date}</td>
                          <td className="py-3  bg-white/[0.02] border-y border-white/5 text-right text-sm font-black text-white">{order.amount}</td>
                          <td className="py-3 px-16 bg-white/[0.02] rounded-r-xl border-y border-r border-white/5 text-center">
                            <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wider ${order.statusColor} bg-opacity-20`}>{order.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Regional Tracking */}
              <div className="bg-[#1E293B] rounded-[5px] p-6 border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <h4 className="font-black text-xl text-white">Regional <span className="font-serif italic text-[#FF9F43]">Sales</span></h4>
                  <MapPin size={18} className="text-[#FF9F43]" />
                </div>
                <div className="space-y-5 relative z-10">
                  {trackingData.map((item) => (
                    <div key={item.region} className="group">
                      <div className="flex justify-between items-end mb-1">
                        <div><span className="text-[9px] font-black text-slate-500 uppercase block">Region</span><span className="text-sm font-extrabold text-white">{item.region}</span></div>
                        <div className="text-right"><span className="text-sm font-black text-white block">${item.amount}</span><span className="text-[10px] font-bold text-[#FF9F43]">{item.progress}%</span></div>
                      </div>
                      <div className="w-full bg-slate-800/50 rounded-full h-[5px] overflow-hidden p-[1px]">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#FF9F43] to-[#ff6b00] shadow-[0_0_10px_rgba(255,159,67,0.3)] transition-all duration-1000 ease-out" style={{ width: `${item.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                  <span>GLOBAL PERFORMANCE</span><span className="text-green-500">+12.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// NavItem Component
const NavItem = ({ icon, label, active = false, notification = null }) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
    active ? 'bg-[#FF9F43] text-[#0F172A]' : 'text-slate-400 hover:bg-white/5 hover:text-white'
  }`}>
    <div className={`p-2 rounded-lg ${active ? 'bg-[#0F172A]/20' : ''}`}>{icon}</div>
    <span className="text-sm font-bold truncate">{label}</span>
    {notification && (
      <span className="ml-auto bg-[#FF9F43] text-[#0F172A] text-[10px] font-bold px-1.5 py-0.5 rounded-full">{notification}</span>
    )}
  </div>
);

export default PriceModal;