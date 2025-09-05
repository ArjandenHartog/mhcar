export default {
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Vraag',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'answer',
      title: 'Antwoord',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'category',
      title: 'Categorie',
      type: 'string',
      options: {
        list: [
          {title: 'Algemeen', value: 'general'},
          {title: 'Services', value: 'services'},
          {title: 'Prijzen', value: 'pricing'},
          {title: 'Afspraken', value: 'appointments'},
          {title: 'Technisch', value: 'technical'}
        ]
      }
    },
    {
      name: 'order',
      title: 'Volgorde',
      type: 'number',
      description: 'Volgorde waarin FAQ items getoond worden'
    },
    {
      name: 'featured',
      title: 'Uitgelicht',
      type: 'boolean',
      description: 'Toon prominenter op de website'
    }
  ],
  orderings: [
    {
      title: 'Volgorde',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'},
        {field: 'question', direction: 'asc'}
      ]
    },
    {
      title: 'Categorie',
      name: 'categoryOrder',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'question',
      category: 'category',
      featured: 'featured'
    },
    prepare(selection: any) {
      const {title, category, featured} = selection
      const categoryLabels: { [key: string]: string } = {
        general: 'Algemeen',
        services: 'Services',
        pricing: 'Prijzen',
        appointments: 'Afspraken',
        technical: 'Technisch'
      }
      return {
        title: title + (featured ? ' (Uitgelicht)' : ''),
        subtitle: categoryLabels[category] || category
      }
    }
  }
}