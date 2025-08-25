import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Settings (single instance)
      S.listItem()
        .title('Site Instellingen')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('site-settings')
        ),
      
      S.divider(),
      
      // Pages
      S.listItem()
        .title('Homepage')
        .schemaType('homePage')
        .child(S.documentTypeList('homePage').title('Homepage')),
      
      S.divider(),
      
      // Content
      S.listItem()
        .title('Services')
        .schemaType('service')
        .child(S.documentTypeList('service').title('Services')),
        
      S.listItem()
        .title('Testimonials')
        .schemaType('testimonial')
        .child(S.documentTypeList('testimonial').title('Testimonials')),
        
      S.listItem()
        .title('FAQ Items')
        .schemaType('faqItem')
        .child(S.documentTypeList('faqItem').title('FAQ Items')),
        
      S.divider(),
      
      // Other
      ...S.documentTypeListItems().filter(
        (listItem) => !['siteSettings', 'homePage', 'service', 'testimonial', 'faqItem'].includes(listItem.getId()!)
      ),
    ])
