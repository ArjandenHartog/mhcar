'use client'

import { useEffect } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Hide navigation and footer for admin pages
    const nav = document.querySelector('nav')
    const footer = document.querySelector('footer')
    const main = document.querySelector('main')
    
    if (nav) nav.style.display = 'none'
    if (footer) footer.style.display = 'none'
    if (main) main.style.minHeight = '100vh'

    // Cleanup function to restore when leaving admin
    return () => {
      if (nav) nav.style.display = ''
      if (footer) footer.style.display = ''
      if (main) main.style.minHeight = ''
    }
  }, [])

  return <div className="min-h-screen">{children}</div>
}