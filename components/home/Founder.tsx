'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Founder() {
  return (
    <section className="bg-zinc-950 text-white py-20 md:py-32 px-6 md:px-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
        
        {/* ФОТОГРАФИЯ (Левая колонка) */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 relative aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 rounded-lg"
        >
            {/* Если нет фотки, пока будет серый квадрат, потом закинешь founder.jpg */}
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/founder.png')" }}
            />
        </motion.div>

        {/* ТЕКСТ И ЦИТАТА (Правая колонка) */}
        <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-7 flex flex-col justify-center"
        >
            <h3 className="text-gray-500 uppercase tracking-widest text-xs mb-8 flex items-center gap-4">
                <div className="w-8 h-[1px] bg-gray-500" />
                Главный архитектор
            </h3>
            
            <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-snug text-gray-200 mb-10">
                <span className="font-serif italic text-white">«Мы не просто возводим стены.</span> Мы создаем сценарии жизни. Каждый наш проект — это баланс между эстетикой, функцией и характером его владельца».
            </p>

            <div className="flex flex-col gap-1">
                {/* Впиши имя брата */}
                <h4 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">
                    Suleimenov Nurdaulet
                </h4>
                <p className="text-gray-400 font-light">
                    Основатель и Lead Architect в SNP.ARCH
                </p>
            </div>
        </motion.div>

      </div>
    </section>
  );
}