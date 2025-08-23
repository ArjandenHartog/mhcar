import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'impressie',
  title: 'Impressie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'images',
      title: 'Afbeeldingen',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Beschrijving van de afbeelding voor toegankelijkheid',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error('Voeg minimaal één afbeelding toe'),
    }),
    defineField({
      name: 'category',
      title: 'Categorie',
      type: 'string',
      options: {
        list: [
          { title: 'Exterieur Detailing', value: 'exterieur' },
          { title: 'Interieur Detailing', value: 'interieur' },
          { title: 'Coating', value: 'coating' },
          { title: 'Volledig Pakket', value: 'volledig' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Uitgelicht',
      type: 'boolean',
      description: 'Toon dit project als uitgelicht op de homepage',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Gepubliceerd op',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      category: 'category',
    },
    prepare(selection) {
      const { title, media, category } = selection
      return {
        title,
        subtitle: category,
        media,
      }
    },
  },
})