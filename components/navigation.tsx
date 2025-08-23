import Link from 'next/link'
import { Car } from 'lucide-react'
import { getNavigation, getSiteSettings } from '@/lib/sanity'
import NavigationClient from './navigation-client'

export default async function Navigation() {
  const [navigation, settings] = await Promise.all([
    getNavigation(),
    getSiteSettings()
  ])

  // Fallback navigation items
  const defaultNavItems = [
    { label: 'Home', href: '/', order: 1 },
    { label: 'Over Ons', href: '/over-ons', order: 2 },
    { label: 'Impressie', href: '/impressie', order: 3 },
    { label: 'Afspraak Maken', href: '/afspraak', order: 4 },
    { label: 'Pakketten', href: '/pakketten', order: 5 },
  ]

  const navItems = navigation?.items || defaultNavItems
  const companyLogo = settings?.companyInfo.logo || "MH CAR CLEANING"

  return (
    <nav className="bg-black shadow-lg sticky top-0 z-50 border-b border-gold">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-gold" />
            <span className="text-xl font-bold text-white logo-font">{companyLogo}</span>
          </Link>
          
          <NavigationClient items={navItems} />
        </div>
      </div>
    </nav>
  )
}