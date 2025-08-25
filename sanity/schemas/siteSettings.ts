export default {
  name: 'siteSettings',
  title: 'Site Instellingen',
  type: 'document',
  __experimental_actions: [
    'update',
    // Disable create, delete, duplicate to prevent multiple instances
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
    },
    {
      name: 'businessDetails',
      title: 'Bedrijfsdetails',
      type: 'object',
      fields: [
        {
          name: 'foundedYear',
          title: 'Oprichtingsjaar',
          type: 'number',
          description: 'Jaar waarin het bedrijf is opgericht'
        },
        {
          name: 'experience',
          title: 'Ervaring (jaren)',
          type: 'number',
          description: 'Aantal jaar ervaring in auto detailing'
        },
        {
          name: 'teamSize',
          title: 'Team Grootte',
          type: 'number',
          description: 'Aantal medewerkers'
        },
        {
          name: 'kvkNumber',
          title: 'KvK Nummer',
          type: 'string',
          description: 'Kamer van Koophandel nummer'
        },
        {
          name: 'btw',
          title: 'BTW Nummer',
          type: 'string',
          description: 'BTW identificatienummer'
        },
        {
          name: 'insurance',
          title: 'Verzekering',
          type: 'object',
          fields: [
            {name: 'company', title: 'Verzekeraar', type: 'string'},
            {name: 'policyNumber', title: 'Polisnummer', type: 'string'},
            {name: 'coverage', title: 'Dekking', type: 'text'}
          ]
        }
      ]
    },
    {
      name: 'defaultSEO',
      title: 'Standaard SEO',
      type: 'object',
      fields: [
        {
          name: 'defaultTitle',
          title: 'Standaard Titel Template',
          type: 'string',
          description: 'Template voor pagina titels, gebruik %s voor pagina naam',
          initialValue: '%s | MH Car Cleaning - Auto Detailing Opheusden'
        },
        {
          name: 'robotsTxt',
          title: 'Robots.txt Instructies',
          type: 'text',
          description: 'Extra instructies voor zoekmachine crawlers'
        },
        {
          name: 'structuredData',
          title: 'Gestructureerde Data',
          type: 'object',
          fields: [
            {
              name: 'businessType',
              title: 'Bedrijfstype',
              type: 'string',
              options: {
                list: [
                  {title: 'AutoRepair', value: 'AutoRepair'},
                  {title: 'LocalBusiness', value: 'LocalBusiness'},
                  {title: 'Service', value: 'Service'}
                ]
              },
              initialValue: 'AutoRepair'
            },
            {
              name: 'priceRange',
              title: 'Prijsklasse',
              type: 'string',
              description: 'bijv. "€€" of "80-300"'
            }
          ]
        }
      ]
    },
    {
      name: 'contentSettings',
      title: 'Content Instellingen',
      type: 'object',
      fields: [
        {
          name: 'brandVoice',
          title: 'Merk Tone of Voice',
          type: 'object',
          fields: [
            {
              name: 'description',
              title: 'Beschrijving',
              type: 'text',
              description: 'Hoe communiceert het merk? (professioneel, vriendelijk, etc.)'
            },
            {
              name: 'keywords',
              title: 'Merk Keywords',
              type: 'array',
              of: [{type: 'string'}],
              description: 'Woorden die het merk karakteriseren'
            }
          ]
        },
        {
          name: 'standardTexts',
          title: 'Standaard Teksten',
          type: 'object',
          fields: [
            {
              name: 'disclaimer',
              title: 'Disclaimer',
              type: 'text',
              description: 'Algemene disclaimer tekst'
            },
            {
              name: 'privacyNotice',
              title: 'Privacy Notice',
              type: 'text',
              description: 'Korte privacy melding'
            },
            {
              name: 'serviceArea',
              title: 'Werkgebied Tekst',
              type: 'text',
              description: 'Standaard tekst over het werkgebied'
            }
          ]
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