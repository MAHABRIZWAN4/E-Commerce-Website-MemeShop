import { type SchemaTypeDefinition } from 'sanity'
import { product } from '../my-schemas/productSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product],
}
