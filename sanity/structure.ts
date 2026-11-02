import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('MH Car Cleaning CMS')
    .items([
      // Pages
      S.listItem()
        .title('Paginas')
        .child(
          S.list()
            .title('Pagina\'s')
            .items([
              S.listItem()
                .title('Homepage')
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('homepage')
                ),
              S.listItem()
                .title('Over Ons Pagina')
                .child(
                  S.document()
                    .schemaType('aboutPage')  
                    .documentId('about-page')
                )
            ])
        ),

      S.divider(),

      // Content
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items([
              S.documentTypeListItem('service').title('Services'),
              S.documentTypeListItem('impressie').title('Portfolio/Impressies'),
              S.documentTypeListItem('testimonial').title('Klantreviews'),
              S.documentTypeListItem('faqItem').title('Veelgestelde Vragen'),
              S.documentTypeListItem('contentBlock').title('Content Blokken'),
            ])
        ),

      S.divider(),

      // Bookings
      S.documentTypeListItem('booking').title('Boekingen'),

      S.divider(),

      // Settings
      S.listItem()
        .title('Instellingen')
        .child(
          S.list()
            .title('Instellingen')
            .items([
              S.listItem()
                .title('Site Instellingen')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('site-settings')
                ),
              S.documentTypeListItem('navigation').title('Navigatie')
            ])
        )
    ])
