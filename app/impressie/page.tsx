import { client } from '@/sanity/lib/client'
import { urlFor } from '@/lib/sanity'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'

// Revalidate elke 60 seconden
export const revalidate = 60

interface Project {
  _id: string
  _createdAt: string
  title: string
  description: string
  images: { alt?: string; asset: { _ref: string; _type: string } }[]
  slug: {
    current: string
  }
  category: string
  featured: boolean
  publishedAt: string
}

async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "impressie"] | order(publishedAt desc) {
    _id,
    _createdAt,
    title,
    description,
    images,
    slug,
    category,
    featured,
    publishedAt
  }`
  
  try {
    // Check if Sanity is properly configured
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ktpg5qcd'
    if (projectId === 'your-project-id') {
      console.log('Sanity not configured, returning empty array')
      return []
    }
    
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function Impressie() {
  const projects = await getProjects()

  const categoryLabels = {
    exterieur: 'Exterieur Detailing',
    interieur: 'Interieur Detailing', 
    coating: 'Coating',
    volledig: 'Volledig Pakket'
  }

  return (
    <div className="py-12 bg-black min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 border-b border-gold">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 logo-font">IMPRESSIE</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Bekijk onze uitgevoerde projecten en laat u inspireren
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-white mb-4">
                Binnenkort beschikbaar
              </h2>
              <p className="text-gray-300">
                We werken hard aan het toevoegen van onze projecten. 
                Kom binnenkort terug voor een overzicht van onze mooiste resultaten!
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Onze Projecten</h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Elke auto krijgt de aandacht die hij verdient
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <Card key={project._id} className="overflow-hidden hover:shadow-lg transition-shadow bg-neutral-900 border-neutral-700">
                    {project.images && project.images.length > 0 && (
                      <div className="aspect-video relative">
                        <Image
                          src={urlFor(project.images[0]).width(800).height(450).url()}
                          alt={project.images[0].alt || project.title}
                          fill
                          className="object-cover"
                          unoptimized={false}
                          priority={false}
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-gold text-black px-3 py-1 rounded-full text-sm font-medium">
                            {categoryLabels[project.category as keyof typeof categoryLabels] || project.category}
                          </span>
                        </div>
                        {project.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                              Uitgelicht
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                      {project.description && (
                        <p className="text-gray-300 mb-4">{project.description}</p>
                      )}
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>
                          {categoryLabels[project.category as keyof typeof categoryLabels] || project.category}
                        </span>
                        <span>
                          {new Date(project.publishedAt || project._createdAt).toLocaleDateString('nl-NL')}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-900 border-t border-gold">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Wilt u ook zo&apos;n resultaat?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Maak een afspraak en laat uw auto ook stralen!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/afspraak" 
              className="bg-gold text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-200"
            >
              Afspraak Maken
            </a>
            <a 
              href="/pakketten" 
              className="border-2 border-gold text-gold px-8 py-3 rounded-lg font-semibold hover-bg-gold hover-text-black transition duration-200"
            >
              Bekijk Pakketten
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}