import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const words = ["Performance", "Luxury", "Precision", "Innovation", "BMW M"];

  useEffect(() => {
    if (index === words.length - 1) return;
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1000 : 150);
    return () => clearTimeout(timeout);
  }, [index, words.length]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="fixed inset-0 z-[100] bg-bmw-black flex items-center justify-center"
    >
      <div className="relative h-20 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={words[index]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-white text-3xl md:text-5xl font-display font-bold uppercase tracking-tighter"
          >
            <span className="text-white/20 mr-4">M</span>
            {words[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      
      {/* Percentage or Progress Bar could go here */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-full h-1 bg-bmw-purple origin-left"
      />
    </motion.div>
  );
}
