'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import Consultation from '@/components/home/Consultation';

export default function ProjectClient({ project }: { project: any }) {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#C8A97E] selection:text-black">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* 🔥 1. ДОБАВЛЕНО: Теневая подушка сверху для Navbar, чтобы он всегда читался */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black/90 via-black/40 to-transparent z-20 pointer-events-none" />
        
        {/* Оригинальный оверлей для всей картинки */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        {project.mainImage && (
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0"
            >
                <Image
                    src={urlFor(project.mainImage).width(3840).url()} 
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority 
                    quality={100} 
                    sizes="100vw"
                />
            </motion.div>
        )}
        
        <div className="absolute bottom-0 left-0 p-6 md:p-20 z-20 w-full">
            <div className="overflow-hidden mb-6">
                <motion.h1 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                    className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase"
                >
                    {project.title}
                </motion.h1>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-8 md:gap-16 text-sm md:text-base uppercase tracking-widest text-gray-300 border-t border-white/30 pt-6"
            >
                <div>
                    <span className="block text-gray-500 text-xs mb-1">Location</span>
                    {project.location}
                </div>
                <div>
                    <span className="block text-gray-500 text-xs mb-1">Year</span>
                    {project.year}
                </div>
                <div>
                    <span className="block text-gray-500 text-xs mb-1">Type</span>
                    {project.category}
                </div>
            </motion.div>
        </div>
      </section>

      {/* DESCRIPTION SECTION */}
      <section className="w-full py-20 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
         <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
         >
            <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-6">The Concept</h3>
            <p className="text-2xl md:text-4xl font-serif italic text-white leading-tight">
               {project.concept ? `«${project.concept}»` : "«Architecture should speak of its time and place, but yearn for timelessness.»"}
            </p>
         </motion.div>

         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 font-light leading-relaxed text-lg whitespace-pre-wrap"
         >
            {project.description ? project.description : "Full description coming soon."}
         </motion.div>
      </section>

      {/* ГАЛЕРЕЯ */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="w-full py-10 px-6 md:px-20">
            <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xs text-gray-500 uppercase tracking-widest mb-16"
            >
                Gallery
            </motion.h3>
            
            {/* 🔥 2. ИСПРАВЛЕНО: gap-y-12 для мобилок, чтобы не было огромных дыр */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-24">
                {project.gallery.map((image: any, index: number) => {
                    
                    const aspectRatios = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-square'];
                    const currentAspect = aspectRatios[index % 3];
                    const isRightColumn = index % 2 !== 0;

                    return (
                        <motion.div 
                            key={index} 
                            // Анимация выплывания снизу для КАЖДОЙ картинки
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className={`relative w-full group ${isRightColumn ? 'md:mt-32' : ''}`}
                        >
                             <div className={`relative overflow-hidden w-full bg-zinc-900 ${currentAspect}`}>
                                <Image
                                    src={urlFor(image).width(1200).url()}
                                    alt={`Gallery image ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    quality={95}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                             </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
      )}

      {/* ФОРМА КОНСУЛЬТАЦИИ */}
      <Consultation />

    </main>
  );
}