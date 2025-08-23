'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import type { NavigationItem } from '@/lib/sanity'

interface NavigationClientProps {
  items: NavigationItem[]
}

export default function NavigationClient({ items }: NavigationClientProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="hidden md:flex items-center space-x-8">
        {items.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className="text-white hover-text-gold transition duration-200"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover-text-gold"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-black border-b border-gold pb-4">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col space-y-2">
                {items.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className="text-white hover-text-gold py-2 px-4"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}