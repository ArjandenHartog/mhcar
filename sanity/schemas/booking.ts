import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'booking',
  title: 'Afspraak',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naam',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Telefoonnummer',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Tijd',
      type: 'string',
      options: {
        list: [
          { title: '09:00', value: '09:00' },
          { title: '10:00', value: '10:00' },
          { title: '11:00', value: '11:00' },
          { title: '13:00', value: '13:00' },
          { title: '14:00', value: '14:00' },
          { title: '15:00', value: '15:00' },
          { title: '16:00', value: '16:00' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'package',
      title: 'Pakket',
      type: 'string',
      options: {
        list: [
          { title: 'Exterieur Detailing (€80)', value: 'exterieur' },
          { title: 'Exterieur + Coating (€100)', value: 'exterieur-coating' },
          { title: 'Interieur Detailing (€80)', value: 'interieur' },
          { title: 'Volledig Pakket (€150)', value: 'volledig' },
          { title: 'Custom Pakket', value: 'custom' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'carBrand',
      title: 'Automerk',
      type: 'string',
    }),
    defineField({
      name: 'carModel',
      title: 'Automodel',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Bericht/Opmerkingen',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Nieuw', value: 'new' },
          { title: 'Bevestigd', value: 'confirmed' },
          { title: 'Voltooid', value: 'completed' },
          { title: 'Geannuleerd', value: 'cancelled' },
        ],
      },
      initialValue: 'new',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Aangemaakt op',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      date: 'date',
      time: 'time',
      package: 'package',
      status: 'status',
    },
    prepare(selection) {
      const { name, date, time, package: pkg, status } = selection
      return {
        title: `${name} - ${date} ${time}`,
        subtitle: `${pkg} (${status})`,
      }
    },
  },
  orderings: [
    {
      title: 'Datum (nieuwste eerst)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Datum (oudste eerst)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
})