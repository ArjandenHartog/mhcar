export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Service Naam',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Beschrijving',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Uitgebreide beschrijving met opmaak'
    },
    {
      name: 'shortDescription',
      title: 'Korte Beschrijving',
      type: 'string',
      description: 'Voor gebruik in cards en previews'
    },
    {
      name: 'seoTitle',
      title: 'SEO Titel',
      type: 'string',
      description: 'Titel voor zoekmachines (max 60 tekens)',
      validation: (Rule: any) => Rule.max(60)
    },
    {
      name: 'seoDescription',
      title: 'SEO Beschrijving',
      type: 'text',
      description: 'Beschrijving voor zoekmachines (max 160 tekens)',
      validation: (Rule: any) => Rule.max(160)
    },
    {
      name: 'price',
      title: 'Prijs (€)',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive()
    },
    {
      name: 'duration',
      title: 'Duur',
      type: 'string',
      description: 'bijv. "2-3 uur"'
    },
    {
      name: 'included',
      title: 'Inbegrepen Services',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Lijst van wat er allemaal bij deze service hoort'
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon naam (bijv. "droplets", "sparkles")',
      options: {
        list: [
          {title: 'Droplets (Water)', value: 'droplets'},
          {title: 'Sparkles (Glans)', value: 'sparkles'},
          {title: 'Shield (Bescherming)', value: 'shield'},
          {title: 'Star (Premium)', value: 'star'},
          {title: 'Car', value: 'car'},
        ]
      }
    },
    {
      name: 'popular',
      title: 'Populair',
      type: 'boolean',
      description: 'Markeer als populaire service'
    },
    {
      name: 'featured',
      title: 'Uitgelicht',
      type: 'boolean',
      description: 'Toon op homepage'
    },
    {
      name: 'category',
      title: 'Categorie',
      type: 'string',
      options: {
        list: [
          {title: 'Exterieur', value: 'exterieur'},
          {title: 'Interieur', value: 'interieur'},
          {title: 'Volledig Pakket', value: 'volledig'},
          {title: 'Coating', value: 'coating'},
          {title: 'Custom', value: 'custom'}
        ]
      }
    },
    {
      name: 'order',
      title: 'Volgorde',
      type: 'number',
      description: 'Volgorde waarin services getoond worden'
    },
    {
      name: 'detailedContent',
      title: 'Gedetailleerde Content',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Uitgebreide informatie over deze service voor de service detail pagina'
    },
    {
      name: 'processSteps',
      title: 'Proces Stappen',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Stap Titel', type: 'string'},
            {name: 'description', title: 'Beschrijving', type: 'text'},
            {name: 'duration', title: 'Duur', type: 'string'}
          ]
        }
      ],
      description: 'Stap-voor-stap beschrijving van het proces'
    },
    {
      name: 'beforeAfterImages',
      title: 'Voor & Na Foto\'s',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'faq',
      title: 'Veelgestelde Vragen',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', title: 'Vraag', type: 'string'},
            {name: 'answer', title: 'Antwoord', type: 'text'}
          ]
        }
      ]
    },
    {
      name: 'targetKeywords',
      title: 'Doelzoekwoorden',
      type: 'array',
      of: [{type: 'string'}],
      description: 'SEO zoekwoorden voor deze service',
      options: {
        layout: 'tags'
      }
    }
  ],
  orderings: [
    {
      title: 'Volgorde',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'},
        {field: 'name', direction: 'asc'}
      ]
    },
    {
      title: 'Prijs (laag naar hoog)',
      name: 'priceAsc',
      by: [
        {field: 'price', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
      duration: 'duration',
      popular: 'popular'
    },
    prepare(selection: any) {
      const {title, price, duration, popular} = selection
      return {
        title: title + (popular ? ' ⭐' : ''),
        subtitle: `€${price} • ${duration || 'Duur onbekend'}`
      }
    }
  }
}