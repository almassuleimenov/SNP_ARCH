'use client';

import { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false); // 🔥 1. Состояние скролла
  const pathname = usePathname();

  // УБИРАЕМ НАВБАР В АДМИНКЕ
  if (pathname && pathname.startsWith('/studio')) {
    return null;
  }

  // 🔥 2. СЛЕЖИМ ЗА СКРОЛЛОМ
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Если прокрутили > 50px — включаем фон
      } else {
        setIsScrolled(false); // Если наверху — убираем фон
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
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
      {/* 🔥 3. ДИНАМИЧЕСКИЕ КЛАССЫ */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[50] flex items-center justify-between px-6 md:px-20 text-white transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' // КОГДА СКРОЛЛИМ: Темное стекло, меньше отступы
            : 'bg-transparent py-6 border-transparent' // КОГДА НАВЕРХУ: Полная прозрачность, больше воздуха
        }`}
      >
        
        {/* ЛОГОТИП (Пустой, как ты просил, работает как кнопка "Наверх") */}
        <Link 
            href="/" 
            onClick={(e) => handleLinkClick(e, '/')}
            className="text-xl md:text-2xl font-bold tracking-tighter uppercase z-50 hover:opacity-70 transition-opacity"
        >
            {/* Если хочешь вернуть текст, напиши тут SNP.ARCH */}
            {/* Сейчас тут пусто, как ты просил */}
             SNP.ARCH
        </Link>

        {/* ДЕСКТОП МЕНЮ */}
        {/* mix-blend-difference включаем ТОЛЬКО наверху, чтобы на белых фото текст стал черным */}
        <div className={`hidden md:flex gap-10 text-xs font-medium tracking-widest uppercase transition-colors ${!isScrolled ? 'mix-blend-difference' : ''}`}>
            {LINKS.map((link) => (
                <Link 
                    key={link.name}
                    href={`/${link.href}`}
                    onClick={(e) => handleLinkClick(e, link.href)}
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
            className={`md:hidden z-50 p-2 focus:outline-none ${!isScrolled ? 'mix-blend-difference' : ''}`}
        >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </nav>

      {/* MOBILE MENU (Без изменений) */}
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
                    href={`/${link.href}`}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="block"
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