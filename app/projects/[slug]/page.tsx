import { client, urlFor } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Consultation from '@/components/home/Consultation';

async function getProject(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    ...,
    concept,
    description,
    gallery
  }`;
  const data = await client.fetch(query, { slug });
  return data;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; 
  const project = await getProject(slug);

  if (!project) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#C8A97E] selection:text-black">
      
      {/* HERO SECTION - МАКСИМАЛЬНОЕ КАЧЕСТВО */}
      <section className="relative w-full h-screen">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {project.mainImage && (
            <Image
                // 🔥 1. ФИКС КАЧЕСТВА:
                // Мы просим Sanity дать картинку шириной 3840px (4K)
                // Если оригинал меньше, он отдаст оригинал. Если больше — ужмет до 4K (чтобы не грузить 50мб).
                src={urlFor(project.mainImage).width(3840).url()} 
                alt={project.title}
                fill
                className="object-cover"
                priority // Грузим в первую очередь
                quality={100} // Максимальное качество Next.js
                sizes="100vw"
            />
        )}
        <div className="absolute bottom-0 left-0 p-6 md:p-20 z-20 w-full">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase mb-6">
                {project.title}
            </h1>
            <div className="flex flex-wrap gap-8 md:gap-16 text-sm md:text-base uppercase tracking-widest text-gray-300 border-t border-white/30 pt-6">
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
            </div>
        </div>
      </section>

      {/* DESCRIPTION SECTION */}
      <section className="w-full py-20 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
         <div>
            <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-6">The Concept</h3>
            <p className="text-2xl md:text-4xl font-serif italic text-white leading-tight">
               {project.concept ? `«${project.concept}»` : "«Architecture should speak of its time and place, but yearn for timelessness.»"}
            </p>
         </div>

         <div className="text-gray-400 font-light leading-relaxed text-lg whitespace-pre-wrap">
            {project.description ? project.description : "Full description coming soon."}
         </div>
      </section>

      {/* ГАЛЕРЕЯ - ЖУРНАЛЬНАЯ ВЕРСТКА */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="w-full py-10 px-6 md:px-20">
            <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-16">Gallery</h3>
            
            {/* 🔥 2. ФИКС СЕТКИ: ДЕЛАЕМ КАК НА ГЛАВНОЙ (СДВИГ + ПРОПОРЦИИ) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                {project.gallery.map((image: any, index: number) => {
                    
                    // Логика пропорций (Горизонт / Вертикаль / Квадрат)
                    const aspectRatios = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-square'];
                    const currentAspect = aspectRatios[index % 3];
                    
                    // Логика сдвига (Правая колонка ниже)
                    const isRightColumn = index % 2 !== 0;

                    return (
                        <div 
                            key={index} 
                            className={`relative w-full group ${isRightColumn ? 'md:mt-32' : ''}`}
                        >
                             <div className={`relative overflow-hidden w-full bg-zinc-900 ${currentAspect}`}>
                                <Image
                                    // Для галереи просим ширину 1200px (хватит с головой для пол-экрана)
                                    src={urlFor(image).width(1200).url()}
                                    alt={`Gallery image ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    quality={95}
                                />
                                {/* Оверлей для красоты */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                             </div>
                        </div>
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