export const buttonField = {
  name: 'button',
  title: 'Knop',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Tekst',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'Interne link (bijv. /diensten) of externe URL',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'style',
      title: 'Stijl',
      type: 'string',
      options: {
        list: [
          {title: 'Primair (geel)', value: 'primary'},
          {title: 'Secundair (outline)', value: 'secondary'},
          {title: 'Tekst link', value: 'link'}
        ]
      },
      initialValue: 'primary'
    }
  ],
  preview: {
    select: {
      text: 'text',
      link: 'link',
      style: 'style'
    },
    prepare({text, link, style}: any) {
      return {
        title: text || 'Geen tekst',
        subtitle: `${link || 'Geen link'} (${style || 'primary'})`
      }
    }
  }
}

export default buttonField