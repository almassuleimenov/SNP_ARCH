'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { client, urlFor } from '@/lib/sanity'; 
import Link from 'next/link';
import Image from 'next/image'; // 👈 1. ОБЯЗАТЕЛЬНЫЙ ИМПОРТ

interface Project {
  _id: string;
  title: string;
  category: string;
  year: string;
  location: string;
  mainImage: any;
  cols: string; 
  slug: { current: string };
}

export default function SelectedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const query = `*[_type == "project"] | order(_createdAt asc){
        ...,
        slug
      }`;
      const data = await client.fetch(query);
      setProjects(data);
    };

    fetchProjects();
  }, []);

  if (!projects.length) return null;

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, index) => (
           <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>

    </section>
  );
}

// ОТДЕЛЬНЫЙ КОМПОНЕНТ КАРТОЧКИ
function ProjectCard({ project, index }: { project: Project, index: number }) {
    return (
        <Link 
            href={`/projects/${project.slug?.current}`} 
            className={`block w-full ${project.cols || 'md:col-span-1'}`}
        >
            <motion.div
                data-cursor="view"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative cursor-pointer w-full"
            >
                {/* КОНТЕЙНЕР КАРТИНКИ */}
                <div className="relative overflow-hidden aspect-square md:aspect-[4/3] w-full mb-5 rounded-sm">
                    
                    {/* Затемнение */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
                    
                    {/* 👇 2. ИСПРАВЛЕНИЕ: ЗАМЕНИЛИ ФОН НА <Image /> */}
                    {project.mainImage && (
                        <Image
                            src={urlFor(project.mainImage).url()}
                            alt={project.title}
                            fill // Растягивает картинку на весь блок
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 90vw" // Говорим браузеру: "Грузи большую картинку!"
                            quality={100} // Максимальное качество
                        />
                    )}
                    
                    {/* Иконка */}
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
                    
                    <div className="text-right hidden md:block">
                        <div className="text-sm text-gray-400">{project.location}</div>
                        <div className="text-sm text-gray-500 font-mono">{project.year}</div>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}