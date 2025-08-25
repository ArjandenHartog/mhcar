export default {
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  __experimental_actions: [
    'create',
    'update',
    // 'delete', 'duplicate'
  ],
  fields: [
    {
      name: 'title',
      title: 'Pagina Titel',
      type: 'string',
      initialValue: 'Homepage'
    },
    {
      name: 'hero',
      title: 'Hero Sectie',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Hoofdtitel',
          type: 'string'
        },
        {
          name: 'subtitle',
          title: 'Ondertitel',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Beschrijving',
          type: 'array',
          of: [{type: 'block'}],
          description: 'Uitgebreide hero beschrijving met opmaak'
        },
        {
          name: 'primaryButton',
          title: 'Primaire Knop',
          type: 'object',
          fields: [
            {name: 'text', title: 'Tekst', type: 'string'},
            {name: 'link', title: 'Link', type: 'string'}
          ]
        },
        {
          name: 'secondaryButton',
          title: 'Secundaire Knop',
          type: 'object',
          fields: [
            {name: 'text', title: 'Tekst', type: 'string'},
            {name: 'link', title: 'Link', type: 'string'}
          ]
        }
      ]
    },
    {
      name: 'servicesSection',
      title: 'Services Sectie',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Sectie Titel',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Beschrijving',
          type: 'text'
        },
        {
          name: 'showFeaturedServices',
          title: 'Toon Uitgelichte Services',
          type: 'boolean',
          description: 'Automatisch services tonen die als "featured" gemarkeerd zijn'
        }
      ]
    },
    {
      name: 'aboutSection',
      title: 'Over Ons Sectie',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Sectie Titel',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Beschrijving',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'features',
          title: 'Kenmerken',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'title', title: 'Titel', type: 'string'},
                {name: 'description', title: 'Beschrijving', type: 'string'}
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'ctaSection',
      title: 'Call-to-Action Sectie',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titel',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Beschrijving',
          type: 'text'
        },
        {
          name: 'button',
          title: 'Knop',
          type: 'object',
          fields: [
            {name: 'text', title: 'Tekst', type: 'string'},
            {name: 'link', title: 'Link', type: 'string'}
          ]
        }
      ]
    },
    {
      name: 'seoSettings',
      title: 'SEO Instellingen',
      type: 'object',
      fields: [
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
          name: 'keywords',
          title: 'Zoekwoorden',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags'
          }
        }
      ]
    },
    {
      name: 'trustSignals',
      title: 'Vertrouwenssignalen',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Sectie Titel',
          type: 'string'
        },
        {
          name: 'items',
          title: 'Vertrouwenssignalen',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'title', title: 'Titel', type: 'string'},
                {name: 'value', title: 'Waarde', type: 'string'},
                {name: 'description', title: 'Beschrijving', type: 'string'},
                {name: 'icon', title: 'Icon', type: 'string', description: 'Lucide icon naam'}
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'testimonialSection',
      title: 'Klantreview Sectie',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Sectie Titel',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Beschrijving',
          type: 'text'
        },
        {
          name: 'showFeaturedTestimonials',
          title: 'Toon Uitgelichte Reviews',
          type: 'boolean',
          description: 'Automatisch uitgelichte reviews tonen'
        }
      ]
    },
    {
      name: 'locationSection',
      title: 'Locatie Sectie',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Sectie Titel',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Beschrijving',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'serviceAreas',
          title: 'Werkgebied',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Lijst van plaatsen waar service wordt aangeboden'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      heroTitle: 'hero.title'
    },
    prepare(selection: any) {
      const {title, heroTitle} = selection
      return {
        title: title || 'Homepage',
        subtitle: heroTitle || 'Geen hero titel'
      }
    }
  }
}