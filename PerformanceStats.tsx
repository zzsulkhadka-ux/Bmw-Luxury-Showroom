import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/src/lib/utils';

const stats = [
  { label: 'Max Horsepower', value: '625', unit: 'HP', icon: '⚡' },
  { label: 'Acceleration', value: '3.2', unit: 'SEC', sub: '0-100 km/h' },
  { label: 'Top Speed', value: '305', unit: 'KM/H', icon: '🏁' },
  { label: 'Torque', value: '750', unit: 'NM', icon: '🌀' },
];

export default function PerformanceStats() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-[1px] w-8 bg-bmw-purple"></div>
            <span className="text-bmw-purple text-xs font-bold uppercase tracking-[0.3em]">Pure Engineering</span>
          </div>
          <h2 className="font-display font-light text-5xl md:text-7xl uppercase leading-[0.95] mb-8">
            The Heart of <br />
            <span className="font-black italic bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-bmw-purple">Precision</span>
          </h2>
          <p className="text-white/40 text-sm md:text-base font-light max-w-md leading-relaxed mb-12">
            Every component is a masterpiece. The M8 Competition Gran Coupe redefines high-end performance 
            with a drivetrain that adapts to your environment instantaneously.
          </p>
          <button className="text-[10px] uppercase tracking-[0.4em] font-bold py-4 px-8 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
            Technical Data
          </button>
        </div>

        <div className="w-full md:w-[400px] backdrop-blur-3xl bg-white/[0.03] border border-white/10 p-10 rounded-3xl">
          <div className="space-y-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-bmw-purple block mb-1 font-bold">
                  {stat.label}
                </span>
                <div className="text-5xl font-light flex items-baseline tracking-tighter">
                  <span>{stat.value}</span>
                  <span className="text-lg ml-2 font-bold text-white/50">{stat.unit}</span>
                </div>
                <div className="h-[1px] w-0 group-hover:w-full bg-bmw-purple transition-all duration-700 mt-2 opacity-50"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
