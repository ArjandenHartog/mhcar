'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTouchSwipe } from '@/hooks/use-touch-swipe'

interface ProjectImageCarouselProps {
  images: { alt?: string; asset: { _ref: string; _type: string } }[]
  title: string
  className?: string
}

export default function ProjectImageCarousel({ 
  images, 
  title, 
  className = '' 
}: ProjectImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  // Als er maar één afbeelding is, toon gewoon die afbeelding
  if (images.length === 1) {
    return (
      <div className={`aspect-video relative ${className}`}>
        <Image
          src={urlFor(images[0]).width(800).height(450).url()}
          alt={images[0].alt || title}
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    )
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index)
  }

  // Touch/swipe functionaliteit
  const { onTouchStart, onTouchMove, onTouchEnd } = useTouchSwipe({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
    threshold: 50
  })

  // Keyboard navigatie
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious()
    } else if (e.key === 'ArrowRight') {
      goToNext()
    }
  }

  return (
    <div 
      className={`aspect-video relative group ${className}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="img"
      aria-label={`Afbeelding carousel voor ${title}`}
    >
      {/* Hoofdafbeelding */}
      <Image
        src={urlFor(images[currentImageIndex]).width(800).height(450).url()}
        alt={images[currentImageIndex].alt || title}
        fill
        className="object-cover transition-opacity duration-300"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Navigatie knoppen - alleen zichtbaar bij hover */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
        aria-label="Vorige afbeelding"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
        aria-label="Volgende afbeelding"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Indicatoren */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentImageIndex 
                ? 'bg-gold scale-110' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ga naar afbeelding ${index + 1}`}
          />
        ))}
      </div>

      {/* Afbeelding teller */}
      <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
        {currentImageIndex + 1} / {images.length}
      </div>
    </div>
  )
}
