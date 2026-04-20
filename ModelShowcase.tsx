import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const models = [
  {
    name: 'BMW M2 Coupe',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2715&auto=format&fit=crop',
    price: 'Starting at $63,200',
    desc: 'Compact dimensions, powerful lines.'
  },
  {
    name: 'BMW M4 Competition',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2669&auto=format&fit=crop',
    price: 'Starting at $82,200',
    desc: 'Pure driving dynamics.'
  },
  {
    name: 'BMW M8 Gran Coupe',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2670&auto=format&fit=crop',
    price: 'Starting at $138,800',
    desc: 'Luxury meets absolute performance.'
  }
];

export default function ModelShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <section id="models" ref={containerRef} className="py-32 overflow-hidden">
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
        <h2 className="font-display font-bold text-5xl md:text-8xl uppercase tracking-tighter leading-none mb-4">
          Choose Your <span className="text-gradient-purple">Weapon</span>
        </h2>
        <div className="h-[1px] w-full bg-white/10" />
      </div>

      <div className="flex gap-8 px-6 md:px-12 scroll-hide">
        {models.map((model, idx) => (
          <motion.div
            key={model.name}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="min-w-[300px] md:min-w-[700px] group relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-video"
          >
            <img 
              src={model.image} 
              alt={model.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 bg-linear-to-t from-bmw-black via-bmw-black/20 to-transparent">
              <span className="text-bmw-purple font-bold tracking-[0.2em] text-xs uppercase mb-2 block">
                {model.price}
              </span>
              <h3 className="text-3xl md:text-5xl font-display font-bold uppercase mb-4 group-hover:text-bmw-purple transition-colors">
                {model.name}
              </h3>
              <p className="text-white/60 text-sm md:text-lg font-light max-w-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                {model.desc}
              </p>
              
              <button className="mt-8 px-6 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                Configure Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
