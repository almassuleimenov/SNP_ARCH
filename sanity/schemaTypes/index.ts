import { type SchemaTypeDefinition } from 'sanity'

// 👇 1. Импортируй свои файлы
import project from './project' 
import hero from './hero' // 👈 ДОБАВЬ ЭТУ СТРОКУ

export const schema: { types: SchemaTypeDefinition[] } = {
  // 👇 2. Добавь hero внутрь массива
  types: [project, hero], 
}