export default {
  name: 'siteSettings',
  title: 'Site Instellingen',
  type: 'document',
  __experimental_actions: [
    'create',
    'update',
    // 'delete', 'duplicate'  // Disable delete to prevent accidental removal
  ],
  fields: [
    {
      name: 'title',
      title: 'Site Titel',
      type: 'string',
      description: 'Wordt gebruikt als page title en in metadata'
    },
    {
      name: 'description',
      title: 'Site Beschrijving',
      type: 'text',
      description: 'Korte beschrijving voor SEO en social media'
    },
    {
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'string',
      description: 'Komma-gescheiden keywords voor SEO'
    },
    {
      name: 'siteUrl',
      title: 'Website URL',
      type: 'url',
      description: 'Hoofddoel URL van de website'
    },
    {
      name: 'companyInfo',
      title: 'Bedrijfsinformatie',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Bedrijfsnaam',
          type: 'string'
        },
        {
          name: 'logo',
          title: 'Logo',
          type: 'string',
          description: 'Logo tekst (bijv. "MH CAR CLEANING")'
        },
        {
          name: 'tagline',
          title: 'Tagline',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Bedrijfsbeschrijving',
          type: 'text'
        },
        {
          name: 'features',
          title: 'Kernpunten',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Korte punten die het bedrijf uitlichten'
        }
      ]
    },
    {
      name: 'contact',
      title: 'Contactgegevens',
      type: 'object',
      fields: [
        {
          name: 'phones',
          title: 'Telefoonnummers',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {name: 'name', title: 'Naam', type: 'string'},
              {name: 'number', title: 'Nummer', type: 'string'}
            ]
          }]
        },
        {
          name: 'email',
          title: 'E-mailadres',
          type: 'string'
        },
        {
          name: 'address',
          title: 'Adres',
          type: 'string'
        }
      ]
    },
    {
      name: 'businessHours',
      title: 'Openingstijden',
      type: 'object',
      fields: [
        {
          name: 'weekdays',
          title: 'Weekdagen',
          type: 'string',
          description: 'bijv. "Ma - Za: 09:00 - 17:00"'
        },
        {
          name: 'sunday',
          title: 'Zondag',
          type: 'string',
          description: 'bijv. "Gesloten"'
        },
        {
          name: 'note',
          title: 'Opmerking',
          type: 'string',
          description: 'Extra info over afspraken'
        }
      ]
    },
    {
      name: 'serviceAreas',
      title: 'Werkgebied',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Plaatsen waar service wordt geboden'
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url'
        },
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url'
        }
      ]
    },
    {
      name: 'footer',
      title: 'Footer Instellingen',
      type: 'object',
      fields: [
        {
          name: 'creditText',
          title: 'Credit Tekst',
          type: 'string',
          description: 'bijv. "Made by Arjan"',
          initialValue: 'Made by Arjan'
        },
        {
          name: 'creditLink',
          title: 'Credit Link',
          type: 'url',
          description: 'Link naar de maker van de website',
          initialValue: 'https://arjandenhartog.com'
        },
        {
          name: 'showCredit',
          title: 'Toon Credit',
          type: 'boolean',
          description: 'Of de credit tekst getoond moet worden',
          initialValue: true
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'companyInfo.name',
      subtitle: 'title'
    }
  }
}