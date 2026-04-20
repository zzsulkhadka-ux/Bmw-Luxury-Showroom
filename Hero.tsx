import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Play, Globe } from 'lucide-react';
import { useRef } from 'react';

export default function Hero({ onLaunch3D }: { onLaunch3D?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-bmw-black">
      {/* Massive Background Typography */}
      <motion.div 
        style={{ y: bgTextY, opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span className="text-[30rem] md:text-[45rem] font-black italic text-white/[0.02] leading-none tracking-tighter">
          M8
        </span>
      </motion.div>

      {/* Left Vertical Rail */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-24 py-12 border-l border-white/10 z-20">
        <span className="rotate-180 [writing-mode:vertical-lr] text-[10px] uppercase tracking-[0.5em] text-bmw-purple font-bold">
          PERFORMANCE FIRST
        </span>
        <div className="w-[1px] h-32 bg-linear-to-b from-bmw-purple to-transparent"></div>
      </div>

      {/* Background Car Image */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-1"
      >
        <img 
          src="https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2670&auto=format&fit=crop" 
          alt="BMW M5"
          className="w-full h-full object-cover brightness-[0.4]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-b from-bmw-black/40 via-transparent to-bmw-black" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-24 flex flex-col items-start text-left">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: textY, opacity }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="h-[1px] w-12 bg-bmw-purple"></div>
            <span className="font-sans font-bold text-bmw-purple text-xs tracking-[0.3em] uppercase">
              Luxury Reimagined
            </span>
          </div>
          
          <h1 className="font-display font-light text-6xl md:text-8xl leading-[0.9] tracking-tighter uppercase mb-8 text-white">
            BMW M8 <br />
            <span className="font-black italic text-gradient-purple">COMPETITION</span>
          </h1>
          
          <p className="text-white/40 text-sm md:text-base font-light mb-12 max-w-md leading-relaxed">
            Engineered to dominate. A masterpiece of precision and power, the M8 Competition Gran Coupe redefines the limits of high-end performance.
          </p>

          <div className="flex flex-wrap items-center gap-8">
            <motion.button
              onClick={onLaunch3D}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-bmw-purple hover:text-white transition-all duration-300 shadow-2xl shadow-white/5"
            >
              Launch 3D Studio
              <Globe className="w-4 h-4" />
            </motion.button>
            
            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-bmw-purple transition-colors">
                <Play className="w-5 h-5 text-white fill-white group-hover:text-bmw-purple group-hover:fill-bmw-purple transition-all" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold group-hover:text-bmw-purple transition-colors">Play Reel</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar Info (HUD style) */}
      <div className="absolute bottom-0 w-full px-12 py-10 hidden md:flex justify-between items-end border-t border-white/5 z-20 pointer-events-none">
        <div className="flex gap-16">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Current Edition</p>
            <p className="text-xs font-bold">Marina Bay Blue Metallic</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Interior Luxury</p>
            <p className="text-xs font-bold">Sakhir Orange Full Merino</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-[10px] tracking-widest flex items-center gap-3 text-white/40">
            <span>NEXT MODEL</span>
            <span className="font-bold text-white uppercase">M4 COUPE</span>
            <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer hover:border-bmw-purple transition-colors group">
              <ArrowRight className="w-4 h-4 rotate-[-45deg] group-hover:text-bmw-purple transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-32 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
