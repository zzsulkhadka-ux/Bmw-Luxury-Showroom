import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ModelShowcase from './components/ModelShowcase';
import PerformanceStats from './components/PerformanceStats';
import AnimatedBackground from './components/AnimatedBackground';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Car3DViewer from './components/Car3DViewer';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Instagram, Twitter, Facebook, Youtube, ChevronUp } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [is3DOpen, setIs3DOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      <Car3DViewer isOpen={is3DOpen} onClose={() => setIs3DOpen(false)} />
      
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />
      
      <main>
        <Hero onLaunch3D={() => setIs3DOpen(true)} />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative aspect-square rounded-3xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2670&auto=format&fit=crop" 
                  alt="BMW M-Series Detail"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-bmw-purple/20 mix-blend-overlay group-hover:bg-transparent transition-all duration-500" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="font-serif italic text-bmw-purple text-xl mb-4 block">Crafted Excellence</span>
              <h2 className="font-display font-bold text-5xl md:text-7xl uppercase leading-none mb-8">
                Attention to <br /> Every <span className="text-gradient-purple">Pixel</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed font-light mb-8">
                Inside the new M-Series, luxury isn't just a promise—it's a sensory experience. 
                From the finest Merino leather to the bespoke digital interface, every element is designed 
                to harmonize with the driver.
              </p>
              <ul className="space-y-4">
                {['M Carbon Bucket Seats', 'Live Cockpit Professional', 'High-Fidelity Audio'].map(item => (
                  <li key={item} className="flex items-center gap-4 text-sm font-semibold uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-bmw-purple" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <PerformanceStats />
        <ModelShowcase />

        {/* Call to Action */}
        <section className="py-32 px-6 md:px-12 text-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <h2 className="font-display font-bold text-6xl md:text-9xl uppercase tracking-tighter mb-8 italic">
              Drive the <br /><span className="text-gradient-purple">Future</span>
            </h2>
            <p className="text-white/50 text-xl md:text-2xl font-light mb-12">
              Your next adventure starts with a single click. Book your private viewing today.
            </p>
            <button className="px-12 py-6 bg-bmw-purple hover:bg-bmw-purple-dark text-white rounded-full font-bold text-lg uppercase tracking-widest transition-all scale-110 shadow-2xl shadow-bmw-purple/20">
              Find a Dealer
            </button>
          </motion.div>
          {/* Decorative background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-1 bg-bmw-purple/20 blur-3xl rounded-full" />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 px-6 md:px-12 bg-bmw-black border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="md:col-span-2">
             <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-bmw-purple rounded-full" />
              <span className="font-display font-bold text-2xl tracking-tighter uppercase">
                BMW <span className="text-bmw-purple">M</span> Power
              </span>
            </div>
            <p className="max-w-xs text-white/40 text-sm leading-relaxed mb-8">
              Pushing boundaries since 1972. The most powerful letter in the world continues its legacy.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <motion.a 
                  key={i}
                  whileHover={{ y: -5, color: '#9333ea' }}
                  href="#" 
                  className="p-3 bg-white/5 rounded-full text-white/60"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-white mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-white/40">
              {['Electric', 'SUV', 'Convertible', 'Coupe', 'Sedan'].map(item => (
                <li key={item}><a href="#" className="hover:text-bmw-purple transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-white mb-6">Contact</h4>
            <p className="text-sm text-white/40 mb-4">Customer Support 24/7</p>
            <p className="text-xl font-display font-bold text-bmw-purple">1-800-BMW-MPOWER</p>
            <p className="text-sm text-white/40 mt-8">Munich, Germany</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.4em] text-white/20">
          <p>© 2026 BMW M-SERIES. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
            <a href="#" className="hover:text-white transition-colors">Legal Memo</a>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group hover:text-white transition-colors"
          >
            Back to Top
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </footer>
    </div>
  );
}
