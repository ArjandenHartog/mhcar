import seoFields from './objects/seoFields'

export default {
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  __experimental_actions: [
    'create',
    'update',
    // Disable delete/duplicate to prevent multiple homepages
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
      description: 'De hoofdsectie bovenaan de homepage',
      fields: [
        {
          name: 'title',
          title: 'Hoofdtitel',
          type: 'string',
          description: 'Grote titel die de aandacht trekt'
        },
        {
          name: 'subtitle',
          title: 'Ondertitel',
          type: 'string',
          description: 'Ondersteunende tekst onder de hoofdtitel'
        },
        {
          name: 'description',
          title: 'Beschrijving',
          type: 'array',
          of: [{type: 'block'}],
          description: 'Uitgebreide beschrijving met opmaak'
        },
        {
          name: 'primaryButton',
          title: 'Primaire Knop',
          type: 'button'
        },
        {
          name: 'secondaryButton',
          title: 'Secundaire Knop',
          type: 'button'
        }
      ]
    },
    {
      name: 'servicesSection',
      title: 'Services Sectie',
      type: 'object',
      options: {
        collapsible: true
      },
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
        }
      ]
    },
    {
      name: 'aboutSection',
      title: 'Over Ons Sectie',
      type: 'object',
      options: {
        collapsible: true
      },
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
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description'
                }
              }
            }
          ]
        }
      ]
    },
    {
      name: 'showFeaturedServices',
      title: 'Toon Uitgelichte Services',
      type: 'boolean',
      description: 'Of uitgelichte services getoond moeten worden op de homepage',
      initialValue: true
    },
    {
      name: 'ctaSection',
      title: 'Call-to-Action Sectie',
      type: 'object',
      description: 'Oproep tot actie sectie onderaan de homepage',
      fields: [
        {
          name: 'title',
          title: 'Titel',
          type: 'string',
          description: 'Hoofdtitel van de CTA sectie'
        },
        {
          name: 'description',
          title: 'Beschrijving',
          type: 'text',
          description: 'Ondersteunende tekst voor de CTA'
        },
        {
          name: 'button',
          title: 'Knop',
          type: 'button',
          description: 'Primaire actieknop'
        }
      ]
    },
    // SEO instellingen
    seoFields
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