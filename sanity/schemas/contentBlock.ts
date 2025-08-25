export default {
  name: 'contentBlock',
  title: 'Content Blok',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Blok Titel',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'identifier',
      title: 'Identifier',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Unieke identifier om dit blok in de code te kunnen gebruiken'
    },
    {
      name: 'category',
      title: 'Categorie',
      type: 'string',
      options: {
        list: [
          {title: 'Homepage Content', value: 'homepage'},
          {title: 'Service Teksten', value: 'services'},
          {title: 'Over Ons', value: 'about'},
          {title: 'Contact', value: 'contact'},
          {title: 'SEO Teksten', value: 'seo'},
          {title: 'Footer Content', value: 'footer'},
          {title: 'Algemeen', value: 'general'}
        ]
      }
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'shortDescription',
      title: 'Korte Beschrijving',
      type: 'text',
      description: 'Korte samenvatting van dit content blok'
    },
    {
      name: 'context',
      title: 'Context',
      type: 'string',
      description: 'Waar wordt dit content blok gebruikt? (voor referentie)',
      options: {
        list: [
          {title: 'Homepage Hero', value: 'homepage-hero'},
          {title: 'Homepage Over Ons', value: 'homepage-about'},
          {title: 'Service Detail Pagina', value: 'service-detail'},
          {title: 'Over Ons Pagina', value: 'about-page'},
          {title: 'Contact Pagina', value: 'contact-page'},
          {title: 'Footer', value: 'footer'},
          {title: 'SEO Landing Page', value: 'seo-landing'},
          {title: 'Blog/Nieuws', value: 'blog'}
        ]
      }
    },
    {
      name: 'active',
      title: 'Actief',
      type: 'boolean',
      initialValue: true,
      description: 'Of dit content blok actief is'
    },
    {
      name: 'lastUpdated',
      title: 'Laatst Bijgewerkt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true
    },
    {
      name: 'targetAudience',
      title: 'Doelgroep',
      type: 'string',
      options: {
        list: [
          {title: 'Alle Bezoekers', value: 'all'},
          {title: 'Potentiële Klanten', value: 'prospects'},
          {title: 'Bestaande Klanten', value: 'customers'},
          {title: 'Lokale Klanten', value: 'local'},
          {title: 'Auto Eigenaren', value: 'car-owners'}
        ]
      }
    },
    {
      name: 'relatedKeywords',
      title: 'Gerelateerde Zoekwoorden',
      type: 'array',
      of: [{type: 'string'}],
      description: 'SEO zoekwoorden gerelateerd aan dit content',
      options: {
        layout: 'tags'
      }
    }
  ],
  orderings: [
    {
      title: 'Categorie',
      name: 'categoryOrder',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'title', direction: 'asc'}
      ]
    },
    {
      title: 'Laatst Bijgewerkt',
      name: 'lastUpdated',
      by: [
        {field: 'lastUpdated', direction: 'desc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      context: 'context',
      active: 'active'
    },
    prepare(selection: any) {
      const {title, category, context, active} = selection
      const status = active ? '✅' : '❌'
      const categoryLabels: { [key: string]: string } = {
        homepage: 'Homepage',
        services: 'Services',
        about: 'Over Ons',
        contact: 'Contact',
        seo: 'SEO',
        footer: 'Footer',
        general: 'Algemeen'
      }
      
      const contextLabels: { [key: string]: string } = {
        'homepage-hero': 'Homepage Hero',
        'homepage-about': 'Homepage Over Ons',
        'service-detail': 'Service Detail',
        'about-page': 'Over Ons Pagina',
        'contact-page': 'Contact Pagina',
        'footer': 'Footer',
        'seo-landing': 'SEO Landing',
        'blog': 'Blog/Nieuws'
      }
      
      return {
        title: `${title} ${status}`,
        subtitle: `${categoryLabels[category] || category}${context ? ` • ${contextLabels[context] || context}` : ''}`
      }
    }
  }
}