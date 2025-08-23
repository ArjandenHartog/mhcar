export default {
  name: 'navigation',
  title: 'Navigatie',
  type: 'document',
  __experimental_actions: [
    'create',
    'update',
    // 'delete', 'duplicate'
  ],
  fields: [
    {
      name: 'title',
      title: 'Navigatie Naam',
      type: 'string',
      description: 'bijv. "Hoofd Navigatie"'
    },
    {
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Tekst die getoond wordt in het menu'
            },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'URL of pad (bijv. "/over-ons")'
            },
            {
              name: 'order',
              title: 'Volgorde',
              type: 'number',
              description: 'Volgorde in het menu (laagste eerst)'
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href'
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'items.0.label'
    },
    prepare(selection: any) {
      const {title, subtitle} = selection
      return {
        title: title,
        subtitle: subtitle ? `Begint met: ${subtitle}` : 'Geen items'
      }
    }
  }
}