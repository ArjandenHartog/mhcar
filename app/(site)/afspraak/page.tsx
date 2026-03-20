import AfspraakClient from './afspraak-client'
import { getServices, getSiteSettings } from '@/lib/sanity'

// Enable ISR with 60 second revalidation
export const revalidate = 60

export default async function AfspraakPage() {
  const [services, siteSettings] = await Promise.all([
    getServices(),
    getSiteSettings()
  ])

  // Convert services to package format for the form
  const packages = services.map(service => ({
    value: service.slug.current,
    label: `${service.name} (€${service.price})`,
    price: `€${service.price}`,
    duration: service.duration
  }))

  // Add a general consultation option if no specific services exist
  if (packages.length === 0) {
    packages.push({
      value: 'consultation',
      label: 'Vrijblijvende afspraak (prijsopgave na gesprek)',
      price: 'Gratis',
      duration: '30 min'
    })
  }

  return <AfspraakClient packages={packages} siteSettings={siteSettings} />
}