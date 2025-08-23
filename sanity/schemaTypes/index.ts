import { type SchemaTypeDefinition } from 'sanity'
import impressie from '../schemas/impressie'
import booking from '../schemas/booking'
import siteSettings from '../schemas/siteSettings'
import navigation from '../schemas/navigation'
import service from '../schemas/service'
import homePage from '../schemas/homePage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    impressie, 
    booking, 
    siteSettings, 
    navigation, 
    service, 
    homePage
  ],
}
