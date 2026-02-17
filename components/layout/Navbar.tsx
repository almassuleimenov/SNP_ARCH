'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { name: 'Studio', href: '#studio' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // 🔥 1. УБИРАЕМ НАВБАР В АДМИНКЕ
  // Если ссылка начинается на /studio — просто ничего не возвращаем
  if (pathname && pathname.startsWith('/studio')) {
    return null;
  }

  const handleScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (href === '/') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
       const id = href.replace('#', '');
       const element = document.getElementById(id);
       if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
       }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[50] flex items-center justify-between px-6 py-6 md:px-20 text-white mix-blend-difference">
        
        {/* 🔥 2. ЛОГОТИП ПУСТОЙ (Как ты и просил) */}
        {/* Он работает как кнопка "Наверх", но текста внутри нет */}
        <Link 
            href="/" 
            onClick={(e) => handleScroll(e, '/')}
            className="w-10 h-10 z-50 hover:opacity-70 transition-opacity"
        >
            {/* ТУТ ПУСТО */}
        </Link>

        {/* ДЕСКТОП МЕНЮ */}
        <div className="hidden md:flex gap-10 text-xs font-medium tracking-widest uppercase">
            {LINKS.map((link) => (
                <a 
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="relative group overflow-hidden cursor-pointer"
                >
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                        {link.name}
                    </span>
                    <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-gray-300">
                        {link.name}
                    </span>
                </a>
            ))}
        </div>

        {/* МОБИЛЬНАЯ КНОПКА */}
        <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden z-50 p-2 focus:outline-none"
        >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
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