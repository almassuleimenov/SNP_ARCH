import { client, urlFor } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
// ArrowLeft больше не нужен, я убрал его из импортов

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
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      
      {/* КНОПКУ "BACK" УБРАЛИ ПОЛНОСТЬЮ. ТЕПЕРЬ НАВИГАЦИЯ ЧЕРЕЗ ЛОГОТИП В NAVBAR. */}

      {/* HERO SECTION */}
      <section className="relative w-full h-screen">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {project.mainImage && (
            <Image
                src={urlFor(project.mainImage).url()}
                alt={project.title}
                fill
                className="object-cover"
                priority
                quality={100}
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

      {/* ГАЛЕРЕЯ */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="w-full py-10 px-6 md:px-20">
            <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-8">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12">
                {project.gallery.map((image: any, index: number) => (
                    <div key={index} className="relative aspect-[4/3] w-full overflow-hidden rounded-sm group">
                         <Image
                            src={urlFor(image).url()}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={90}
                        />
                    </div>
                ))}
            </div>
        </section>
      )}

      {/* FOOTER CALL TO ACTION */}
      {/* Кстати, если ты добавил глобальный <Footer /> в layout.tsx, 
          то этот блок можно тоже убрать, чтобы не дублировать "контакты" два раза подряд.
          Но если глобального футера нет, оставь как есть.
      */}
      <section className="border-t border-white/10 py-32 text-center bg-zinc-950 mt-20">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Interested?</p>
        <Link href="/#contact" className="text-5xl md:text-8xl font-serif italic hover:text-white text-gray-400 transition-colors">
            Start a Project
        </Link>
      </section>

    </main>
  );
}