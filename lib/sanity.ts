import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// 👇 ИМПОРТИРУЕМ настройки из твоего готового файла (вместо хардкода)
import { apiVersion, dataset, projectId } from '@/sanity/env'

export const client = createClient({
  projectId, // Берется из .env само
  dataset,   // Берется из .env само
  apiVersion,
  useCdn: true, // true - быстро (кэш), false - свежие данные (медленнее)
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}