import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Portfolio Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название проекта',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Уникальная ссылка (Slug)',
      type: 'slug',
      options: {
        source: 'title', // Sanity сам создаст slug из названия (Townhouse -> townhouse)
        maxLength: 96,
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'string', // Например: "Residential Complex"
    }),
    defineField({
      name: 'year',
      title: 'Год',
      type: 'string', // "2026"
    }),
    defineField({
      name: 'location',
      title: 'Локация',
      type: 'string', // "Almaty, KZ"
    }),
    defineField({
      name: 'mainImage',
      title: 'Фотография',
      type: 'image',
      options: {
        hotspot: true, // Позволяет выбирать центр фото
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'cols',
      title: 'Размер в сетке',
      type: 'string',
      options: {
        list: [
          { title: 'Обычный (1 колонка)', value: 'md:col-span-1' },
          { title: 'Широкий (2 колонки)', value: 'md:col-span-2' },
        ],
      },
      initialValue: 'md:col-span-1',
    }),
    defineField({
      name: 'concept',
      title: 'Концепт (Цитата)',
      description: 'Короткая красивая фраза или идея проекта (отображается крупно курсивом)',
      type: 'text', // text удобнее string, так как можно делать переносы
      rows: 3,
    }),

    defineField({
      name: 'description',
      title: 'Полное описание',
      description: 'Основной текст про проект. Используйте Enter для абзацев.',
      type: 'text',
      rows: 10,
    }),
    // ... другие поля (mainImage, slug и т.д.) ...
    defineField({
      name: 'gallery',
      title: 'Галерея (Дополнительные фото)',
      type: 'array', // Это массив (список)
      of: [{ type: 'image' }], // Внутри массива лежат картинки
      options: {
        layout: 'grid', // Красивое отображение в админке
      },
    }),
  ],
})