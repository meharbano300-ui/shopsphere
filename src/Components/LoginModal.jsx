import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, ShieldCheck, Sparkles, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 


  const LoginModal = ({ isOpen, onClose, onLoginSuccess, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); 

  // Animation Variants 
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 40 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 300, staggerChildren: 0.1 }
    },
    exit: { opacity: 0, scale: 0.8, y: 40, transition: { duration: 0.3 } }
  };
  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };


  const handleLogin = (e) => {
    e.preventDefault();
    // 1. Success Signal 
    if (onLoginSuccess) {
      onLoginSuccess(formData.email.split('@')[0] || "User");
    }
    // 2. Modal ko band karna
    onClose(); 
    
    // 3. REDIRECT TO USERPROFILE (Immediate)
    navigate('/UserProfile');
  };
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Background Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xl"
        />

        {/* Main Modal Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-[950px] h-[620px] rounded-[15px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] flex border border-white/30"
          style={{
            backgroundImage: `url('images/imgg.png')`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Close Button */}
          <motion.button 
            whileHover={{ rotate: 180, scale: 1.1, backgroundColor: "rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose} 
            className="absolute top-6 right-6 z-50 p-2 bg-white/20 backdrop-blur-md text-white rounded-[10px] transition-colors border border-white/40 shadow-xl"
          >
            <X size={24} />
          </motion.button>

          {/* Right Side Form */}
          <div className="w-full md:w-[48%] ml-auto relative z-10 h-full flex items-center justify-center p-6 lg:p-10">
            <motion.div 
              className="w-full bg-white/10 backdrop-blur-[40px] py-9 border border-white/20 p-8 rounded-[13px] shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/20 rounded-full blur-[80px] group-hover:bg-orange-500/40 transition-all duration-700" />
              <div className="mb-8 relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-orange-400 mb-2"
                >
                  <Sparkles size={18} />
                  <span className="text-[11px] uppercase tracking-[4px] font-bold">Welcome Back</span>
                </motion.div>
                <h2 className="text-4xl font-black text-white leading-none drop-shadow-lg">
                  User <span className="text-orange-500">Login</span>
                </h2>
                <p className="text-white/70 mt-3 text-sm font-medium italic">Login to access your personalized dashboard.</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-5">
                <motion.div variants={itemVariants} className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 group-focus-within:text-orange-400 group-focus-within:scale-110 transition-all" size={18} />
                  <input 
                    required 
                    type="email" 
                    placeholder="Email Address"
                    className="w-full bg-white/20 border border-white/30 pl-12 pr-4 py-4 rounded-2xl text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all hover:bg-white/10 shadow-inner"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 group-focus-within:text-orange-400 group-focus-within:scale-110 transition-all" size={18} />
                  <input 
                    required 
                    type="password" 
                    placeholder="Password"
                    className="w-full bg-white/20 border border-white/30 pl-12 pr-4 py-4 rounded-2xl text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all hover:bg-white/10 shadow-inner"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </motion.div>
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.03, boxShadow: "0 20px 40px -10px rgba(249, 115, 22, 0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-400 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10 uppercase tracking-wider">Login Now</span>
                  <LogIn size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                  
                  <motion.div 
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent w-1/2 -skew-x-12"
                  />
                </motion.button>
              </form>
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-white/70 text-sm font-medium">
                  New here? 
                  <button 
                    type="button"
                    onClick={onSwitchToSignup} 
                    className="text-orange-400 font-black ml-2 hover:text-orange-300 transition-all underline underline-offset-8 decoration-orange-500/30 hover:decoration-orange-500"
                  >
                    CREATE ACCOUNT
                  </button>
                </p>
              </div>
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-5 flex items-center justify-center gap-2 text-[12px] text-white/70 uppercase tracking-[4px] font-bold"
              >
                <ShieldCheck size={14} className="text-green-400" />
                Secure Access
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default LoginModal;