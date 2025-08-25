import seoFields from './objects/seoFields'

export default {
  name: 'aboutPage',
  title: 'Over Ons Pagina',
  type: 'document',
  __experimental_actions: [
    'create',
    'update',
    // Disable delete/duplicate to prevent multiple about pages
  ],
  fields: [
    {
      name: 'title',
      title: 'Pagina Titel',
      type: 'string',
      initialValue: 'Over MH Car Cleaning'
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
          of: [{type: 'block'}]
        },
        {
          name: 'image',
          title: 'Hero Afbeelding',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'story',
      title: 'Ons Verhaal',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Sectie Titel',
          type: 'string'
        },
        {
          name: 'content',
          title: 'Verhaal Content',
          type: 'array',
          of: [{type: 'block'}],
          description: 'Uitgebreide tekst over het bedrijf en de historie'
        }
      ]
    },
    {
      name: 'mission',
      title: 'Onze Missie',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Sectie Titel',
          type: 'string'
        },
        {
          name: 'content',
          title: 'Missie Content',
          type: 'array',
          of: [{type: 'block'}]
        }
      ]
    },
    {
      name: 'team',
      title: 'Ons Team',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Sectie Titel',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Team Beschrijving',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'members',
          title: 'Team Leden',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'name', title: 'Naam', type: 'string'},
                {name: 'role', title: 'Functie', type: 'string'},
                {name: 'bio', title: 'Biografie', type: 'text'},
                {name: 'phone', title: 'Telefoon', type: 'string'},
                {name: 'email', title: 'E-mail', type: 'string'},
                {
                  name: 'image',
                  title: 'Foto',
                  type: 'image',
                  options: {
                    hotspot: true
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'values',
      title: 'Onze Waarden',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Sectie Titel',
          type: 'string'
        },
        {
          name: 'items',
          title: 'Waarden',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'title', title: 'Waarde Titel', type: 'string'},
                {name: 'description', title: 'Beschrijving', type: 'text'},
                {name: 'icon', title: 'Icon', type: 'string', description: 'Lucide icon naam'}
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'experience',
      title: 'Ervaring & Expertise',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Sectie Titel',
          type: 'string'
        },
        {
          name: 'content',
          title: 'Ervaring Content',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'highlights',
          title: 'Hoogtepunten',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'title', title: 'Titel', type: 'string'},
                {name: 'description', title: 'Beschrijving', type: 'text'}
              ]
            }
          ]
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
    prepare(selection: {title?: string, heroTitle?: string}) {
      const {title, heroTitle} = selection
      return {
        title: title || 'Over Ons Pagina',
        subtitle: heroTitle || 'Geen hero titel'
      }
    }
  }
}