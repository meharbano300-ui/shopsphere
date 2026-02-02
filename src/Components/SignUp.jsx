import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, User, Mail, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const SignUp = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: '', name: '', email: '', password: ''
  });

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
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Background Overlay with heavy blur */}
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
            backgroundImage: `url('images/img.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Close Button with Rotation Effect */}
          <motion.button 
            whileHover={{ rotate: 180, scale: 1.1, backgroundColor: "rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose} 
            className="absolute top-6 right-6 z-50 p-2 bg-white/20 backdrop-blur-md text-white rounded-[10px] transition-colors border border-white/40 shadow-xl"
          >
            <X size={24} />
          </motion.button>

          {/* right side yani form animated Glass container */}
          <div className="w-full md:w-[48%] ml-auto relative z-10 h-full flex items-center justify-center p-6 lg:p-10">
            <motion.div 
              className="w-full bg-white/10 backdrop-blur-[40px] py-9 border border-white/20 p-8 rounded-[13px] shadow-2xl relative overflow-hidden group"
            >
              {/* Animated Decorative Light (Top Left) */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/20 rounded-full blur-[80px] group-hover:bg-orange-500/40 transition-all duration-700" />
              <div className="mb-8 relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-orange-400 mb-2"
                >
                  <Sparkles size={18} />
                  <span className="text-[11px] uppercase tracking-[4px] font-semibold">New Experience</span>
                </motion.div>
                <h2 className="text-4xl font-black text-white leading-none drop-shadow-lg">
                  Join <span className="text-orange-500">ShopSphere</span>
                </h2>
                <p className="text-white/70 mt-3 text-sm font-medium italic">Create an account to unlock exclusive deals.</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); step === 1 ? setStep(2) : onSwitchToLogin(); }} className="space-y-5">
                {step === 1 ? (
                  <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <motion.div variants={itemVariants} className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 group-focus-within:text-orange-400 group-focus-within:scale-110 transition-all" size={18} />
                      <input 
                        required type="tel" placeholder="Your Phone Number"
                        className="w-full bg-white/22 border border-white/30 pl-12 pr-4 py-4 rounded-2xl text-white placeholder:text-white/83 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all hover:bg-white/10 shadow-inner"
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </motion.div>
                    <motion.button 
                      whileHover={{ scale: 1.03, boxShadow: "0 20px 40px -10px rgba(249, 115, 22, 0.5)" }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full bg-gradient-to-r from-orange-600 to-orange-400 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all relative overflow-hidden group"
                    >
                      <span className="relative z-10 uppercase tracking-wider">Verify OTP</span>
                      <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                      {/* Shimmer Effect */}
                      <motion.div 
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent w-1/2 -skew-x-12"
                      />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div key="step2" variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 ">
                    {[
                      { icon: User, placeholder: "Full Name", type: "text" },
                      { icon: Mail, placeholder: "Email Address", type: "email" },
                      { icon: Lock, placeholder: "Password", type: "password" }
                    ].map((input, idx) => (
                      <motion.div key={idx} variants={itemVariants} className="relative group">
                        <input.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/90 group-focus-within:text-orange-400 transition-all" size={18} />
                        <input required type={input.type} placeholder={input.placeholder} className="w-full bg-white/22 border border-white/20 pl-12 pr-4 py-3.5 rounded-2xl text-white placeholder:text-white/78 focus:ring-2 focus:ring-orange-400 outline-none transition-all hover:bg-white/10" />
                      </motion.div>
                    ))}
                    <motion.button 
                      whileHover={{ scale: 1.03, boxShadow: "0 20px 40px -10px rgba(34, 197, 94, 0.5)" }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full bg-gradient-to-r from-green-800 to-green-400 text-white py-4 rounded-2xl font-black shadow-xl mt-2 tracking-widest uppercase"
                    >
                     Sign Up Now
                    </motion.button>
                  </motion.div>
                )}
              </form>
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-white/70 text-sm font-medium">
                  Already a member? 
                  <button onClick={onSwitchToLogin} className="text-orange-400 font-black ml-2 hover:text-orange-300 transition-all underline underline-offset-8 decoration-orange-500/30 hover:decoration-orange-500">
                    LOGIN NOW
                  </button>
                </p>
              </div>
              {/* Secure Badge with Pulse Animation */}
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-5 flex items-center justify-center gap-2 text-[12px] text-white/70 uppercase tracking-[4px] font-bold"
              >
                <ShieldCheck size={14} className="text-green-400" />
                SSL Encrypted
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default SignUp;