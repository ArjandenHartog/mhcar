export const seoFields = {
  name: 'seo',
  title: 'SEO Instellingen',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true
  },
  fields: [
    {
      name: 'title',
      title: 'SEO Titel',
      type: 'string',
      description: 'Titel voor zoekmachines (max 60 tekens). Laat leeg om automatische titel te gebruiken.',
      validation: (Rule: any) => Rule.max(60)
    },
    {
      name: 'description',
      title: 'SEO Beschrijving',
      type: 'text',
      description: 'Beschrijving voor zoekmachines (max 160 tekens). Laat leeg om automatische beschrijving te gebruiken.',
      validation: (Rule: any) => Rule.max(160)
    },
    {
      name: 'keywords',
      title: 'Zoekwoorden',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      description: 'Extra zoekwoorden voor deze pagina'
    },
    {
      name: 'noIndex',
      title: 'Niet indexeren',
      type: 'boolean',
      description: 'Voorkom dat zoekmachines deze pagina indexeren',
      initialValue: false
    }
  ]
}

export default seoFields