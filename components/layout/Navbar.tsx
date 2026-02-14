'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const LINKS = [
  { name: 'Home', href: '/' },       // Наверх
  { name: 'Studio', href: '#studio' }, // К секции About
  { name: 'Projects', href: '#projects' }, // К сетке проектов
  { name: 'Visit', href: '#location' }, // К карте
  { name: 'Contact', href: '#contact' },   // В самый низ
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Функция плавного скролла
  const handleScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsOpen(false); // Закрываем мобильное меню при клике

    if (href === '/') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
       // Убираем решетку (#) чтобы получить чистый ID
       const id = href.replace('#', '');
       const element = document.getElementById(id);
       if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
       }
    }
  };

  return (
    <>
      {/* --- UPPER BAR (Виден всегда) --- */}
      <nav className="fixed top-0 left-0 right-0 z-[50] flex items-center justify-between px-6 py-6 md:px-12 mix-blend-difference text-white">
        
        {/* ЛОГОТИП */}
        <Link 
            href="/" 
            onClick={(e) => handleScroll(e, '/')}
            className="text-xl md:text-2xl font-bold tracking-tighter uppercase z-50 hover:opacity-70 transition-opacity"
        >
            SNP.ARCH
        </Link>

        {/* ДЕСКТОП МЕНЮ (Скрыто на мобилках) */}
        <div className="hidden md:flex gap-10 text-xs font-medium tracking-widest uppercase">
            {LINKS.slice(1).map((link) => ( // slice(1) чтобы убрать Home из меню (он в логотипе)
                <a 
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="relative group overflow-hidden cursor-pointer"
                >
                    {/* Эффект при наведении: слово уезжает вверх, снизу выезжает такое же */}
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                        {link.name}
                    </span>
                    <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-gray-300">
                        {link.name}
                    </span>
                </a>
            ))}
        </div>

        {/* МОБИЛЬНАЯ КНОПКА (BURGER) */}
        <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden z-50 p-2 focus:outline-none"
        >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </nav>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} // "Тяжелая" архитектурная анимация
            className="fixed inset-0 z-[40] bg-zinc-950 text-white flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {LINKS.map((link, index) => (
                <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 0.3 }}
                    className="text-5xl font-serif italic hover:text-gray-400 transition-colors cursor-pointer"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Декор внизу мобильного меню */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-10 text-[10px] text-gray-500 uppercase tracking-[0.3em]"
            >
                Almaty • Est. 2026
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}