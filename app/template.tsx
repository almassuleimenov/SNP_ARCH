'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      // Начальное состояние: страница невидима и чуть смещена вниз
      initial={{ opacity: 0, y: 10 }}
      // Конечное состояние: страница проявляется и встает на место
      animate={{ opacity: 1, y: 0 }}
      // Настройки анимации для "дорогого" ощущения
      transition={{ 
        duration: 0.6, 
        ease: [0.33, 1, 0.68, 1] // Плавный выезд (Bezier curve)
      }}
    >
      {children}
    </motion.div>
  );
}