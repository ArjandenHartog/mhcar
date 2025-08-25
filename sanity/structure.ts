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
      
      // Only reference schemas we know exist
      ...S.documentTypeListItems().filter(
        (listItem) => !['siteSettings'].includes(listItem.getId()!)
      ),
    ])
