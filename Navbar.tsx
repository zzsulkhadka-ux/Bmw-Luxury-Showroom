import { motion } from 'framer-motion';
import { Car, Menu, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-8 transition-all duration-300",
        isScrolled ? "bg-bmw-black/90 backdrop-blur-2xl py-6" : "bg-transparent"
      )}
    >
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
          <div className="w-6 h-6 border-2 border-bmw-purple rounded-full"></div>
        </div>
        <span className="font-display font-bold tracking-[0.3em] text-lg uppercase">BMW</span>
      </div>

      <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.3em] font-medium text-white/40">
        {['Models', 'Performance', 'Design', 'Experience'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:text-white transition-colors relative"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <button className="hidden sm:block px-6 py-2 border border-white/20 rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Find a Dealer
        </button>
        <button className="md:hidden text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.nav>
  );
}
