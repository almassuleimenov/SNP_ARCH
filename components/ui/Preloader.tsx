'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Блокируем скролл при загрузке
    document.body.style.overflow = 'hidden';

    // 2. Таймер на 2 секунды (имитация загрузки)
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto'; // Разблокируем скролл
      window.scrollTo(0, 0); // Возвращаем наверх
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
            // Анимация ухода шторки вверх
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
        >
            <div className="flex flex-col items-center gap-4 w-64 md:w-96">
                {/* ЛОГОТИП (Появляется плавно) */}
                <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl md:text-5xl font-bold tracking-tighter"
                >
                    SNP.ARCH
                </motion.h1>

                {/* ЛИНИЯ ЗАГРУЗКИ (Растет от 0 до 100%) */}
                <div className="h-[1px] w-full bg-white/20 overflow-hidden relative mt-4">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="h-full bg-white absolute top-0 left-0"
                    />
                </div>
                
                {/* Проценты или статус (опционально) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-[10px] uppercase tracking-widest text-gray-500 mt-2"
                >
                    Loading Experience...
                </motion.div>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}