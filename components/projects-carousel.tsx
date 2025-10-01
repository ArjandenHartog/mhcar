'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

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
                      <div className="aspect-video relative">
                        <Image
                          src={urlFor(project.images[0]).width(600).height(400).url()}
                          alt={project.images[0].alt || project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-3 right-3">
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
