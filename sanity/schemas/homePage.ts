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
          type: 'text'
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