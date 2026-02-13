'use client';

import { motion } from 'framer-motion';

export default function Location() {
  return (
    <section id="location" className="bg-zinc-950 text-white py-20 md:py-32 px-6 md:px-20 border-t border-white/10">
      
      {/* HEADER СЕКЦИИ */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-4xl md:text-6xl font-serif italic mb-2 text-gray-400">Visit</h2>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">Our Studio</h2>
        </motion.div>
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-sm tracking-widest uppercase md:text-right"
        >
            мкр. Самал-3, 15к1<br />
            Алматы, Казахстан
        </motion.div>
      </div>

      {/* ТВОЯ КАРТА */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        // Твой код: скругленные углы, тень и высота!
        className="w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl relative border border-white/10"
      >
        <iframe 
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A7833634bbe1ea355f65f8ca88bc8ca03cf4ac06f968c9e5a4ab1c9827bd79c1e&amp;source=constructor" 
          width="100%" 
          height="100%" 
          frameBorder="0"
          title="Офис компании SNP.ARCH"
          loading="lazy"
          // ФИШКА: Делаем Яндекс.Карту темной (инверсия цветов + поворот оттенка), чтобы она вписалась в черный сайт!
          className="border-none filter invert-[90%] hue-rotate-180 contrast-125"
        ></iframe>
      </motion.div>

    </section>
  );
}