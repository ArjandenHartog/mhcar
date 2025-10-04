'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { useCallback, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useTouchSwipe } from '@/hooks/use-touch-swipe'

interface Project {
  _id: string
  title: string
  description: string
  images: { alt?: string; asset: { _ref: string; _type: string } }[]
  slug: {
    current: string
  }
  category: string
}

interface ProjectsCarouselProps {
  projects: Project[]
}

// Component voor afbeeldingen carousel binnen elk project
function ProjectImagesCarousel({ 
  images, 
  title 
}: { 
  images: { alt?: string; asset: { _ref: string; _type: string } }[]
  title: string 
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  // Als er maar één afbeelding is, toon gewoon die afbeelding
  if (images.length === 1) {
    return (
      <div className="aspect-video relative">
        <Image
          src={urlFor(images[0]).width(600).height(400).url()}
          alt={images[0].alt || title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="eager"
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
      goToNext()
    } else if (e.key === 'ArrowRight') {
      goToPrevious()
    }
  }

  return (
    <div 
      className="aspect-video relative group"
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
        src={urlFor(images[currentImageIndex]).width(600).height(400).url()}
        alt={images[currentImageIndex].alt || title}
        fill
        className="object-cover transition-opacity duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="eager"
      />

      {/* Navigatie knoppen - alleen zichtbaar bij hover */}
      <button
        onClick={goToPrevious}
        className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
        aria-label="Vorige afbeelding"
      >
        <ChevronLeft className="h-3 w-3" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
        aria-label="Volgende afbeelding"
      >
        <ChevronRight className="h-3 w-3" />
      </button>

      {/* Indicatoren */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex space-x-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              index === currentImageIndex 
                ? 'bg-gold scale-110' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ga naar afbeelding ${index + 1}`}
          />
        ))}
      </div>

      {/* Afbeelding teller */}
      <div className="absolute top-1 right-1 bg-black/50 text-white px-1.5 py-0.5 rounded text-xs">
        {currentImageIndex + 1}/{images.length}
      </div>
    </div>
  )
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const categoryLabels: Record<string, string> = {
    exterieur: 'Exterieur Detailing',
    interieur: 'Interieur Detailing',
    coating: 'Coating',
    volledig: 'Volledig Pakket'
  }

  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-black border-t border-gold">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Onze Projecten
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Bekijk enkele van onze recent uitgevoerde projecten
          </p>
        </div>

        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <div className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-700 hover:border-gold transition-colors h-full">
                    {project.images && project.images.length > 0 && (
                      <div className="relative">
                        <ProjectImagesCarousel 
                          images={project.images}
                          title={project.title}
                        />
                        <div className="absolute top-3 right-3 z-10">
                          <span className="bg-gold text-black px-3 py-1 rounded-full text-xs font-medium">
                            {categoryLabels[project.category] || project.category}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {projects.length > 3 && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-gold text-black p-3 rounded-full hover:bg-yellow-600 transition-colors shadow-lg z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-gold text-black p-3 rounded-full hover:bg-yellow-600 transition-colors shadow-lg z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/impressie"
            className="inline-block bg-gold text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-200"
          >
            Bekijk Alle Projecten
          </Link>
        </div>
      </div>
    </section>
  )
}
