import { type SchemaTypeDefinition } from 'sanity'
import project from './project' // <-- 1. Импортируем наш файл

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project], // <-- 2. Добавляем в список
}