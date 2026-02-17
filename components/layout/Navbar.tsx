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

  // УБИРАЕМ НАВБАР В АДМИНКЕ
  if (pathname && pathname.startsWith('/studio')) {
    return null;
  }

  // 🔥 ИСПРАВЛЕННАЯ ФУНКЦИЯ СКРОЛЛА
  const handleScroll = (e: React.MouseEvent, href: string) => {
    // 1. ЛОГИКА ДЛЯ ЛОГОТИПА ('/')
    if (href === '/') {
        // Если мы УЖЕ на главной — просто плавно скроллим вверх
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // Если мы НЕ на главной (например, в проекте) — 
        // мы НИЧЕГО не делаем (не вызываем preventDefault).
        // Link сам перекинет нас на главную страницу.
        return;
    }

    // 2. ЛОГИКА ДЛЯ ЯКОРЕЙ (#studio, #projects...)
    // Если мы на главной — скроллим к секции
    if (pathname === '/') {
        e.preventDefault(); // Блокируем стандартный переход, чтобы был плавный скролл
        setIsOpen(false);
        
        const id = href.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    // Если мы НЕ на главной — Link сам перекинет нас на главную к нужному якорю (/#studio)
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[50] flex items-center justify-between px-6 py-6 md:px-20 text-white mix-blend-difference">
        
        {/* ЛОГОТИП */}
        <Link 
            href="/" 
            onClick={(e) => handleScroll(e, '/')}
            className="text-xl md:text-2xl font-bold tracking-tighter uppercase z-50 hover:opacity-70 transition-opacity"
        >
            SNP.ARCH
        </Link>

        {/* ДЕСКТОП МЕНЮ */}
        <div className="hidden md:flex gap-10 text-xs font-medium tracking-widest uppercase">
            {LINKS.map((link) => (
                <Link 
                    key={link.name}
                    href={`/${link.href}`} // Добавляем слэш, чтобы работало и с других страниц (/#studio)
                    onClick={(e) => handleScroll(e, link.href)}
                    className="relative group overflow-hidden cursor-pointer"
                >
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                        {link.name}
                    </span>
                    <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-gray-300">
                        {link.name}
                    </span>
                </Link>
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
                <Link
                    key={link.name}
                    href={`/${link.href}`} // Тоже добавляем слэш для надежности
                    onClick={(e) => handleScroll(e, link.href)}
                    className="block" // Обертка для motion
                >
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index + 0.3 }}
                        className="text-5xl font-serif italic hover:text-gray-400 transition-colors cursor-pointer block"
                    >
                        {link.name}
                    </motion.span>
                </Link>
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