import { client } from '@/lib/sanity';
import HeroClient from './HeroClient';

// Функция для получения данных
async function getHeroData() {
  // Мы берем ПОСЛЕДНИЙ созданный документ типа hero
  // sort(_createdAt desc) гарантирует, что если создадут 2 hero, мы возьмем самый свежий
  const query = `*[_type == "hero"] | order(_createdAt desc)[0] {
    title,
    subtitle,
    images
  }`;
  
  const data = await client.fetch(query);
  return data;
}

export default async function Hero() {
  const data = await getHeroData();

  return <HeroClient data={data} />;
}