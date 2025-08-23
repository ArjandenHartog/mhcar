'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Car } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-black shadow-lg sticky top-0 z-50 border-b border-gold">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-gold" />
            <span className="text-xl font-bold text-white logo-font">MH CAR CLEANING</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover-text-gold transition duration-200">
              Home
            </Link>
            <Link href="/over-ons" className="text-white hover-text-gold transition duration-200">
              Over Ons
            </Link>
            <Link href="/impressie" className="text-white hover-text-gold transition duration-200">
              Impressie
            </Link>
            <Link href="/afspraak" className="text-white hover-text-gold transition duration-200">
              Afspraak Maken
            </Link>
            <Link href="/pakketten" className="text-white hover-text-gold transition duration-200">
              Pakketten
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover-text-gold"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="text-white hover-text-gold py-2 px-4"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/over-ons" 
                className="text-white hover-text-gold py-2 px-4"
                onClick={() => setIsOpen(false)}
              >
                Over Ons
              </Link>
              <Link 
                href="/impressie" 
                className="text-white hover-text-gold py-2 px-4"
                onClick={() => setIsOpen(false)}
              >
                Impressie
              </Link>
              <Link 
                href="/afspraak" 
                className="text-white hover-text-gold py-2 px-4"
                onClick={() => setIsOpen(false)}
              >
                Afspraak Maken
              </Link>
              <Link 
                href="/pakketten" 
                className="text-white hover-text-gold py-2 px-4"
                onClick={() => setIsOpen(false)}
              >
                Pakketten
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}