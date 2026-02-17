'use client';

import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

export default function About() {
  return (
    <section id="studio" className="bg-zinc-950 text-white py-20 md:py-32 overflow-hidden">
      
      {/* 1. RUNNING LINE (MARQUEE) */}
      <div className="w-full border-y border-white/10 py-6 mb-20">
        <Marquee autoFill speed={50} gradient={false}>
          <div className="flex items-center gap-12 mx-6">
            <span className="text-4xl md:text-6xl font-serif italic opacity-50">Architecture</span>
            <div className="w-2 h-2 rounded-full bg-white/30" />
            <span className="text-4xl md:text-6xl font-light uppercase tracking-tighter">Interior Design</span>
            <div className="w-2 h-2 rounded-full bg-white/30" />
            <span className="text-4xl md:text-6xl font-serif italic opacity-50">Landscape</span>
            <div className="w-2 h-2 rounded-full bg-white/30" />
            <span className="text-4xl md:text-6xl font-light uppercase tracking-tighter">Urban Planning</span>
            <div className="w-2 h-2 rounded-full bg-white/30" />
          </div>
        </Marquee>
      </div>

      {/* 2. THE MANIFESTO */}
      {/* Было: container mx-auto. СТАЛО: w-full */}
      <div className="w-full px-6 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Left Column: Title */}
        <div className="md:col-span-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
                    The Philosophy
                </h3>
                <div className="w-12 h-[1px] bg-white/30" />
            </motion.div>
        </div>

        {/* Right Column: Big Text */}
        <div className="md:col-span-8">
            <motion.p 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl md:text-4xl leading-[1.4] font-light text-gray-200"
            >
                <span className="text-white font-serif italic">SNP.ARCH</span> is not just about building walls. 
                We craft <span className="text-white font-medium">living scenarios</span>. 
                Merging brute concrete with organic nature, we create spaces that breathe, inspire, and stand the test of time.
            </motion.p>

            {/* Stats / Details */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 border-t border-white/10 pt-8">
                <StatItem number="10+" label="Years Experience" delay={0.4} />
                <StatItem number="50+" label="Completed Projects" delay={0.5} />
                <StatItem number="100%" label="Unique Approach" delay={0.6} />
            </div>
        </div>

      </div>
    </section>
  );
}

// Вспомогательный компонент для цифр
function StatItem({ number, label, delay }: { number: string, label: string, delay: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay }}
            className="flex flex-col"
        >
            <span className="text-3xl md:text-4xl font-bold font-serif">{number}</span>
            <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">{label}</span>
        </motion.div>
    )
}