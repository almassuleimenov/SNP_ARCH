'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// 1. ПРАВИЛЬНЫЙ МАССИВ ДАННЫХ
// Обрати внимание: cols: "md:col-span-..." работает только на Desktop (md)
const PROJECTS = [
  {
    id: 1,
    title: "Townhouse",
    category: "Residential Complex",
    year: "2026",
    location: "Almaty, KZ",
    src: "/images/COL3.PNG",
    cols: "md:col-span-1", // На ПК занимает 1 колонку
  },
  {
    id: 2,
    title: "LimitlessIdentity",
    category: "Modern Villa",
    year: "2025",
    location: "Almaty, KZ",
    src: "/images/limitidentity.jpg",
    cols: "md:col-span-1",
  },
  {
    id: 3,
    title: "CROWN RESIDENCE",
    category: "Private Residence",
    year: "2026",
    location: "Almaty, KZ",
    src: "/images/COL2.jpg",
    cols: "md:col-span-2", // На ПК растянется на всю ширину (2 колонки)
  },
  {
    id: 4,
    title: "Modern Townhouses",
    category: "Architecture",
    year: "2025",
    location: "Astana, KZ",
    src: "/images/townhouse.jpg",
    cols: "md:col-span-1",
  },
  {
    id: 5,
    title: "Lounge Interior",
    category: "Interior Design",
    year: "2024",
    location: "Private Villa",
    src: "/images/B1.jpg",
    cols: "md:col-span-1",
  },
];

export default function SelectedProjects() {
  return (
    <section id="projects" className="bg-black text-white py-20 md:py-32 px-6 md:px-20 border-t border-white/10">
      
      {/* ЗАГОЛОВОК СЕКЦИИ */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-6">
        <div>
           <h2 className="text-4xl md:text-6xl font-serif italic mb-2 text-gray-400">
             Selected
           </h2>
           <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">Works</h2>
        </div>
        
        <div className="group flex items-center gap-2 text-sm uppercase tracking-widest border-b border-white/30 pb-1 cursor-pointer hover:border-white transition-colors">
           <span>View All Projects</span>
           <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* СЕТКА ПРОЕКТОВ */}
      {/* Mobile: 1 колонка, Desktop: 2 колонки */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {PROJECTS.map((project, index) => (
           <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

    </section>
  );
}

// ОТДЕЛЬНЫЙ КОМПОНЕНТ КАРТОЧКИ
function ProjectCard({ project, index }: { project: any, index: number }) {
    return (
        <motion.div
            data-cursor="view"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }} // Чуть ускорил анимацию
            // Здесь применяем md:col-span-2, если он есть в данных
            className={`group relative cursor-pointer w-full ${project.cols}`}
        >
            {/* КОНТЕЙНЕР КАРТИНКИ */}
            {/* aspect-square = Квадрат на мобилке (крупно) */}
            {/* md:aspect-[4/3] = Прямоугольник на ПК */}
            <div className="relative overflow-hidden aspect-square md:aspect-[4/3] w-full mb-5 rounded-sm">
                
                {/* Затемнение при наведении */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
                
                {/* Сама картинка (Zoom эффект) */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url('${project.src}')` }}
                />
                
                {/* Иконка стрелки по центру (появляется при наведении) */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-white/10 backdrop-blur-md rounded-full p-4 border border-white/20">
                        <ArrowUpRight className="w-8 h-8 text-white" />
                    </div>
                </div>
            </div>

            {/* ТЕКСТ ПОД КАРТИНКОЙ */}
            <div className="flex justify-between items-start border-t border-white/20 pt-4 group-hover:border-white transition-colors duration-500">
                <div>
                    <h3 className="text-2xl md:text-3xl font-medium mb-1 group-hover:text-gray-300 transition-colors font-serif">
                        {project.title}
                    </h3>
                    <span className="text-xs md:text-sm text-gray-500 uppercase tracking-widest font-sans">
                        {project.category}
                    </span>
                </div>
                
                {/* На мобилке скрываем локацию и год для чистоты, или можно оставить */}
                <div className="text-right hidden md:block">
                    <div className="text-sm text-gray-400">{project.location}</div>
                    <div className="text-sm text-gray-500 font-mono">{project.year}</div>
                </div>
            </div>
        </motion.div>
    )
}