export default {
  name: 'testimonial',
  title: 'Klantreview',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Klant Naam',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'location',
      title: 'Locatie',
      type: 'string',
      description: 'bijv. "Opheusden" of "Wageningen"'
    },
    {
      name: 'review',
      title: 'Review Tekst',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(5),
      options: {
        list: [
          {title: '1 Ster', value: 1},
          {title: '2 Sterren', value: 2},
          {title: '3 Sterren', value: 3},
          {title: '4 Sterren', value: 4},
          {title: '5 Sterren', value: 5}
        ]
      }
    },
    {
      name: 'service',
      title: 'Service',
      type: 'string',
      description: 'Welke service heeft de klant gebruikt?',
      options: {
        list: [
          {title: 'Exterieur Detailing', value: 'exterieur'},
          {title: 'Interieur Detailing', value: 'interieur'},
          {title: 'Volledig Pakket', value: 'volledig'},
          {title: 'Coating Services', value: 'coating'},
          {title: 'Custom Pakket', value: 'custom'}
        ]
      }
    },
    {
      name: 'carBrand',
      title: 'Auto Merk',
      type: 'string',
      description: 'bijv. "BMW", "Mercedes", "Audi"'
    },
    {
      name: 'carModel',
      title: 'Auto Model',
      type: 'string',
      description: 'bijv. "3-serie", "C-klasse", "A4"'
    },
    {
      name: 'featured',
      title: 'Uitgelicht',
      type: 'boolean',
      description: 'Toon prominenter op de website'
    },
    {
      name: 'approved',
      title: 'Goedgekeurd',
      type: 'boolean',
      description: 'Review is goedgekeurd voor publicatie',
      initialValue: false
    },
    {
      name: 'dateReceived',
      title: 'Datum Ontvangen',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0]
    },
    {
      name: 'source',
      title: 'Bron',
      type: 'string',
      options: {
        list: [
          {title: 'Website', value: 'website'},
          {title: 'Google Reviews', value: 'google'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'Mond-tot-mond', value: 'referral'},
          {title: 'E-mail', value: 'email'}
        ]
      }
    },
    {
      name: 'beforeAfterImages',
      title: 'Voor & Na Foto\'s',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }
  ],
  orderings: [
    {
      title: 'Nieuwste eerst',
      name: 'dateDesc',
      by: [
        {field: 'dateReceived', direction: 'desc'}
      ]
    },
    {
      title: 'Hoogste rating',
      name: 'ratingDesc',
      by: [
        {field: 'rating', direction: 'desc'},
        {field: 'dateReceived', direction: 'desc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      rating: 'rating',
      service: 'service',
      approved: 'approved',
      featured: 'featured',
      location: 'location'
    },
    prepare(selection: any) {
      const {title, rating, service, approved, featured, location} = selection
      const stars = `${rating || 0} sterren`
      const status = approved ? '(Goedgekeurd)' : '(Wachtend)'
      const featuredIcon = featured ? ' (Uitgelicht)' : ''
      const locationText = location ? ` (${location})` : ''
      
      return {
        title: `${title}${locationText} ${status}${featuredIcon}`,
        subtitle: `${stars} • ${service || 'Geen service'}`
      }
    }
  }
}