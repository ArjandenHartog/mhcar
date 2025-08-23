import { type SchemaTypeDefinition } from 'sanity'
import impressie from '../schemas/impressie'
import booking from '../schemas/booking'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [impressie, booking],
}
