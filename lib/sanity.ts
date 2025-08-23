import { client } from '@/sanity/lib/client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

export const urlFor = (source: { asset: { _ref: string; _type: string } }) => {
  return builder.image(source)
}

// Types
export interface SiteSettings {
  title: string
  description: string
  keywords: string
  siteUrl: string
  companyInfo: {
    name: string
    logo: string
    tagline: string
    description: string
    features: string[]
  }
  contact: {
    phones: Array<{name: string, number: string}>
    email: string
    address: string
  }
  businessHours: {
    weekdays: string
    sunday: string
    note: string
  }
  serviceAreas: string[]
  socialMedia: {
    instagram?: string
    facebook?: string
  }
  footer?: {
    creditText?: string
    creditLink?: string
    showCredit?: boolean
  }
}

export interface NavigationItem {
  label: string
  href: string
  order: number
}

export interface Navigation {
  title: string
  items: NavigationItem[]
}

export interface Service {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  shortDescription?: string
  price: number
  duration?: string
  included: string[]
  icon?: string
  popular?: boolean
  featured?: boolean
  category?: string
  order?: number
}

export interface HomePage {
  title: string
  hero: {
    title: string
    subtitle: string
    description: string
    primaryButton: {text: string, link: string}
    secondaryButton: {text: string, link: string}
  }
  servicesSection: {
    title: string
    description: string
    showFeaturedServices: boolean
  }
  aboutSection: {
    title: string
    description: unknown[]
    features: Array<{title: string, description: string}>
  }
  ctaSection: {
    title: string
    description: string
    button: {text: string, link: string}
  }
}

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

// Fetch functions
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings"][0] {
    title,
    description,
    keywords,
    siteUrl,
    companyInfo,
    contact,
    businessHours,
    serviceAreas,
    socialMedia,
    footer
  }`
  
  return await client.fetch(query)
}

export async function getNavigation(): Promise<Navigation | null> {
  const query = `*[_type == "navigation"][0] {
    title,
    "items": items[] | order(order asc) {
      label,
      href,
      order
    }
  }`
  
  return await client.fetch(query)
}

export async function getServices(featured?: boolean): Promise<Service[]> {
  const featuredFilter = featured ? ' && featured == true' : ''
  const query = `*[_type == "service"${featuredFilter}] | order(order asc, name asc) {
    _id,
    name,
    slug,
    description,
    shortDescription,
    price,
    duration,
    included,
    icon,
    popular,
    featured,
    category,
    order
  }`
  
  return await client.fetch(query)
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const query = `*[_type == "service" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    shortDescription,
    price,
    duration,
    included,
    icon,
    popular,
    featured,
    category,
    order
  }`
  
  return await client.fetch(query, { slug })
}

export async function getHomePage(): Promise<HomePage | null> {
  const query = `*[_type == "homePage"][0] {
    title,
    hero,
    servicesSection,
    aboutSection,
    ctaSection
  }`
  
  return await client.fetch(query)
}