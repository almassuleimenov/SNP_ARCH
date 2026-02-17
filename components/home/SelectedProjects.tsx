'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { client, urlFor } from '@/lib/sanity'; 
import Link from 'next/link';
import Image from 'next/image';

interface Project {
  _id: string;
  title: string;
  category: string;
  year: string;
  location: string;
  mainImage: any;
  slug: { current: string };
}

export default function SelectedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      // Берем 6 проектов для красоты сетки
      const query = `*[_type == "project"] | order(_createdAt asc)[0...6]{
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
      
      {/* ЗАГОЛОВОК */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
        <div>
           <h2 className="text-4xl md:text-6xl font-serif italic mb-2 text-gray-400">
             Selected
           </h2>
           <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">Works</h2>
        </div>
        
        {/* Кнопку "View All" убрали, как ты просил */}
      </div>

      {/* 🔥 АСИММЕТРИЧНАЯ СЕТКА */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
        {projects.map((project, index) => (
           <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>

    </section>
  );
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
    // 🔥 МАГИЯ ПРОПОРЦИЙ:
    // Мы меняем высоту фото в зависимости от очередности, чтобы было динамично.
    // 0: Горизонтальное (4/3)
    // 1: Вертикальное (3/4) - модно для архитектуры
    // 2: Квадрат (1/1)
    const aspectRatios = [
        'aspect-[4/3]', // Классика
        'aspect-[3/4]', // Портрет (Высокое)
        'aspect-square', // Квадрат
    ];
    
    // Выбираем пропорцию по кругу
    const currentAspect = aspectRatios[index % 3];

    // 🔥 МАГИЯ СДВИГА:
    // Если это правая колонка (нечетный индекс), мы опускаем её вниз (margin-top).
    // Это ломает скучную сетку.
    const isRightColumn = index % 2 !== 0;

    return (
        <Link 
            href={`/projects/${project.slug?.current}`} 
            className={`block w-full group ${isRightColumn ? 'md:mt-32' : ''}`} // Сдвиг правой колонки
        >
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full"
            >
                {/* КАРТИНКА С ДИНАМИЧЕСКОЙ ПРОПОРЦИЕЙ */}
                <div className={`relative overflow-hidden w-full mb-6 bg-zinc-900 ${currentAspect}`}>
                    
                    {/* Оверлей */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                    
                    {project.mainImage && (
                        <Image
                            src={urlFor(project.mainImage).url()}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw" // Оптимизация: грузим только половину ширины экрана
                            quality={95}
                        />
                    )}
                    
                    {/* Кнопка по центру */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-100">
                        <div className="bg-white/10 backdrop-blur-md rounded-full w-20 h-20 flex items-center justify-center border border-white/20">
                            <ArrowUpRight className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>

                {/* ИНФО */}
                <div className="flex flex-col gap-2 border-l border-white/20 pl-6 group-hover:border-white transition-colors duration-500">
                    <h3 className="text-3xl md:text-4xl font-serif italic text-white group-hover:text-gray-300 transition-colors">
                        {project.title}
                    </h3>
                    <div className="flex gap-4 text-xs uppercase tracking-widest text-gray-500">
                        <span>{project.category}</span>
                        <span>•</span>
                        <span>{project.year}</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}