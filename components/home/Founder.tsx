'use client';

import { motion } from 'framer-motion';

export default function Founder() {
  return (
    <section className="bg-zinc-950 text-white py-16 md:py-32 px-6 md:px-20 border-t border-white/10">
      
      {/* GRID: 1 колонка на моб, 12 на ПК */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-center">
        
        {/* --- ФОТОГРАФИЯ --- */}
        {/* Mobile: Квадрат (aspect-square), Desktop: Портрет (aspect-[3/4]) */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full relative aspect-square md:aspect-[3/4] md:col-span-5 overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
        >
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/founder.png')" }}
            />
        </motion.div>

        {/* --- ТЕКСТ --- */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-7 flex flex-col justify-center"
        >
            {/* Маленький заголовок */}
            <h3 className="text-gray-500 uppercase tracking-widest text-xs mb-6 md:mb-8 flex items-center gap-4">
                <div className="w-8 h-[1px] bg-gray-500" />
                Главный архитектор
            </h3>
            
            {/* Цитата */}
            <blockquote className="mb-10">
                <p className="text-xl md:text-3xl lg:text-4xl font-light leading-snug text-gray-300">
                    {/* Serif шрифт для акцента */}
                    <span className="block font-serif italic text-white text-3xl md:text-5xl mb-4">
                    «Мы не просто возводим стены,
                    </span>
                    Мы создаем сценарии жизни. Каждый наш проект — это баланс между эстетикой, функцией и характером его владельца».
                </p>
            </blockquote>

            {/* Имя и Должность */}
            <div className="flex flex-col gap-1 border-l-2 border-white/20 pl-6">
                <h4 className="text-xl md:text-3xl font-bold uppercase tracking-tight text-white">
                    Suleimenov Nurdaulet
                </h4>
                <p className="text-sm md:text-base text-gray-400 font-light tracking-wide">
                    Основатель и Lead Architect в SNP.ARCH
                </p>
            </div>
        </motion.div>

      </div>
    </section>
  );
}