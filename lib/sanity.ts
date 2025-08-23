import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ktpg5qcd',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN, // Only if you want to update content with the client
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: { asset: { _ref: string; _type: string } }) => {
  return builder.image(source)
}

// Types
export interface Project {
  _id: string
  _createdAt: string
  title: string
  description: string
  images: { alt?: string; asset: { _ref: string; _type: string } }[]
  slug: {
    current: string
  }
}

export interface Booking {
  _id: string
  _createdAt: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  package: string
  message?: string
}