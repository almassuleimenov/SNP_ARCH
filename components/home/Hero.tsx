'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Instagram } from 'lucide-react';

const SLIDES = [
  { id: 1, src: '/images/C8.jpg', alt: 'Main Facade' },
  { id: 2, src: '/images/C2.jpg', alt: 'Pool Area' },
  { id: 3, src: '/images/C7.jpg', alt: 'Aerial View' },
  { id: 4, src: '/images/C1.jpg', alt: 'Garden View' },
  { id: 5, src: '/images/C3.jpg', alt: 'Courtyard' },
  { id: 6, src: '/images/C4.jpg', alt: 'Driveway' },
  { id: 7, src: '/images/C5.jpg', alt: 'Building Perspective' },
  { id: 8, src: '/images/C6.jpg', alt: 'Entrance Detail' },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      
      {/* BACKGROUND SLIDER */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${SLIDES[currentSlide].src}')` }} 
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CONTENT UI */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-8 md:px-20 md:py-16">
        
        {/* TOP BAR */}
        <div className="flex justify-between items-start border-b border-white/10 pb-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-1"
          >
            <span className="text-3xl font-bold tracking-tighter">SNP.ARCH</span>
            <span className="text-[10px] tracking-[0.4em] uppercase text-gray-400">Architecture & Design</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="hidden md:flex flex-col items-end gap-1 text-sm font-light text-gray-300"
          >
            <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-white" />
                <a href='https://2gis.kz/almaty/geo/9430047375085700/76.956587,43.227737' target="_blank" rel="noopener noreferrer">Almaty, Kazakhstan</a>
            </div>
            <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <Instagram className="w-4 h-4" />
                <a href="https://www.instagram.com/snp.arch/" target="_blank" rel="noopener noreferrer">@snp.arch</a>
            </div>
          </motion.div>
        </div>

        {/* CENTER TITLE */}
        <div className="flex flex-col gap-2">
            <div className="overflow-hidden">
                <motion.h1 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 1, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none text-white drop-shadow-2xl"
                >
                    WHITE HOUSE
                </motion.h1>
            </div>
            <div className="overflow-hidden flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                
                {/* 👇 ВОТ ЗДЕСЬ БЫЛА ОШИБКА. Я УБРАЛ ЛИШНИЙ ВНУТРЕННИЙ ТЕГ <h2> */}
                <motion.h2 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    className="text-4xl md:text-6xl font-light italic text-gray-200 font-serif"
                >
                    Club House
                </motion.h2>

                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: 100 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="h-[1px] bg-white/50 hidden md:block"
                />
            </div>
        </div>

        {/* BOTTOM INFO & NAVIGATION */}
        <div className="flex justify-between items-end">
            <div className="flex gap-2">
                {SLIDES.map((slide, index) => (
                    <div 
                        key={slide.id}
                        onClick={() => handleSlideChange(index)}
                        className={`h-[2px] rounded-full transition-all duration-500 cursor-pointer hover:h-[4px] hover:bg-white ${
                            index === currentSlide ? 'w-12 bg-white' : 'w-4 bg-white/30 hover:w-6'
                        }`}
                    />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}