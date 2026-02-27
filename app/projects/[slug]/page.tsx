import { client, urlFor } from '@/lib/sanity'; // 🔥 ДОБАВИЛИ urlFor
import { notFound } from 'next/navigation';
import ProjectClient from '@/components/project/ProjectClient'; 
import type { Metadata } from 'next'; // 🔥 ДОБАВИЛИ тип для SEO

// 1. Функция получения данных (осталась без изменений)
async function getProject(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    ...,
    concept,
    description,
    "mainImageBlur": mainImage.asset->metadata.lqip, // 🔥 Тянем блюр-заглушку для главной
    gallery[] {
      "asset": asset->,
      "url": asset->url,
      "metadata": asset->metadata // 🔥 Тянем метаданные (включая блюр) для галереи
    }
  }`;
  const data = await client.fetch(query, { slug });
  return data;
}

// 🔥 2. НОВАЯ ФУНКЦИЯ ДЛЯ SEO И КРАСИВОГО ШЕРИНГА В МЕССЕНДЖЕРАХ
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  // Если проекта нет, отдаем базовый заголовок
  if (!project) {
    return {
      title: 'Project Not Found | SNP.ARCH',
    };
  }

  // Генерируем метаданные для конкретного проекта
  return {
    title: `${project.title} | SNP.ARCH`,
    description: project.concept || 'Эксклюзивный архитектурный проект от студии SNP.ARCH.',
    openGraph: {
      title: `${project.title} | SNP.ARCH`,
      description: project.concept || 'Эксклюзивный архитектурный проект от студии SNP.ARCH.',
      // Берем главную фотку проекта и обрезаем ее под идеальный размер для Telegram/WhatsApp (1200x630)
      images: project.mainImage ? [urlFor(project.mainImage).width(1200).height(630).fit('crop').url()] : [],
    },
  };
}

// 3. Основной компонент страницы (остался без изменений)
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; 
  const project = await getProject(slug);

  if (!project) {
    return notFound();
  }

  // Передаем данные в нашу красивую клиентскую часть с анимациями
  return <ProjectClient project={project} />;
}