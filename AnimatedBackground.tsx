import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#050505]">
      {/* Background Atmosphere */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#9333EA] opacity-20 blur-[150px] rounded-full"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#4C1D95] opacity-30 blur-[120px] rounded-full"
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] mix-blend-overlay" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_#050505_100%] opacity-60" />
    </div>
  );
}
