// sanity/schemaTypes/hero.ts

export default {
  name: 'hero',
  title: 'Home Hero Slider',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Main Title (e.g. WHITE HOUSE)',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle (e.g. Club House)',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Slider Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
    },
  ],
}