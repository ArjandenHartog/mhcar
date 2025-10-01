import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin } from "lucide-react"
import LocationMap from "@/components/location-map"
import { getHomePage, getServices, getSiteSettings } from '@/lib/sanity'
import { client } from '@/sanity/lib/client'
import ServiceIcon from '@/components/service-icon'
import { extractPlainText } from '@/lib/utils/text'
import ProjectsCarousel from '@/components/projects-carousel'

// Enable ISR with 60 second revalidation
export const revalidate = 60

async function getFeaturedProjects() {
  const query = `*[_type == "impressie"] | order(publishedAt desc)[0...6] {
    _id,
    title,
    description,
    images,
    slug,
    category
  }`

  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function Home() {
  const [homePage, allServices, siteSettings, featuredProjects] = await Promise.all([
    getHomePage(),
    getServices(), // Get all services
    getSiteSettings(),
    getFeaturedProjects()
  ])

  // Get content from Sanity or use company info as fallback
  const hero = {
    title: homePage?.hero?.title || siteSettings?.companyInfo?.logo || "MH CAR CLEANING",
    subtitle: homePage?.hero?.subtitle || siteSettings?.companyInfo?.tagline || "Professionele Auto Detailing Service",
    description: homePage?.hero?.description || siteSettings?.companyInfo?.description || "Wij maken uw auto grondig schoon met premium producten en professionele technieken.",
    primaryButton: homePage?.hero?.primaryButton || { text: "Afspraak Maken", link: "/afspraak" },
    secondaryButton: homePage?.hero?.secondaryButton || { text: "Bekijk Pakketten", link: "/pakketten" }
  }
  
  const servicesSection = homePage?.servicesSection || {
    title: "Onze Services",
    description: "Service is alleen op afspraak mogelijk, dit kan door contact met ons op te nemen."
  }
  const aboutSection = homePage?.aboutSection

  // Use services from Sanity - if none exist, show message instead
  const services = allServices

  const contactInfo = siteSettings?.contact
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black text-white py-20 border-b border-gold">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 logo-font">
              {hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto">
              {hero.subtitle}
            </p>
            <p className="text-lg mb-8 max-w-4xl mx-auto text-gray-300">
              {extractPlainText(hero.description)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold text-black hover:bg-yellow-600">
                <Link href={hero.primaryButton.link}>{hero.primaryButton.text}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-gold text-gold hover-bg-gold hover-text-black">
                <Link href={hero.secondaryButton.link}>{hero.secondaryButton.text}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{servicesSection.title}</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {servicesSection.description}
            </p>
          </div>
          
          {services && services.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <Card 
                  key={service._id}
                  className={`text-center hover:shadow-lg transition-shadow bg-black ${
                    service.popular ? 'border-2 border-gold' : 'border-neutral-700'
                  }`}
                >
                  <CardHeader>
                    <ServiceIcon 
                      icon={service.icon} 
                      className="h-12 w-12 text-gold mx-auto mb-4" 
                    />
                    <CardTitle className="text-white">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-gold mb-2">€{service.price},-</p>
                    <CardDescription className="text-gray-300">
                      {service.shortDescription || extractPlainText(service.description)}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-300 mb-4">Services worden momenteel toegevoegd.</p>
              <p className="text-gray-400">Neem contact op voor meer informatie over onze diensten.</p>
            </div>
          )}
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-400">
              *Let op: tarieven kunnen wisselend zijn per auto, afhankelijk van de grootte van de auto.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      {aboutSection && (
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  {aboutSection.title}
                </h2>
                <div className="text-lg text-gray-300 mb-8">
                  {extractPlainText(aboutSection.description)}
                </div>
              </div>
              
              {aboutSection.features && aboutSection.features.length > 0 && (
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  {aboutSection.features.map((feature: {title: string, description: string}, index: number) => (
                    <div key={index} className="text-center">
                      <h3 className="text-xl font-bold text-gold mb-4">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Projects Carousel */}
      <ProjectsCarousel projects={featuredProjects} />

      {/* Contact Section */}
      {contactInfo && (
        <section className="py-20 bg-black border-t border-gold">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Contact</h2>
              <p className="text-lg text-gray-300">
                Neem bij het maken van een afspraak of bij vragen contact met ons op
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {contactInfo.phones && contactInfo.phones.length > 0 && (
                <Card className="text-center bg-neutral-900 border-neutral-700">
                  <CardHeader>
                    <Phone className="h-8 w-8 text-gold mx-auto mb-2" />
                    <CardTitle className="text-white">Telefoon</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {contactInfo.phones.map((phone, index) => (
                      <p key={index} className="text-gray-300">
                        <strong>{phone.name}:</strong>{' '}
                        <a href={`tel:${phone.number}`} className="text-gold hover:underline">
                          {phone.number}
                        </a>
                      </p>
                    ))}
                  </CardContent>
                </Card>
              )}

              {contactInfo.email && (
                <Card className="text-center bg-neutral-900 border-neutral-700">
                  <CardHeader>
                    <Mail className="h-8 w-8 text-gold mx-auto mb-2" />
                    <CardTitle className="text-white">E-mail</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="break-words">
                      <a href={`mailto:${contactInfo.email}`} className="text-gold hover:underline break-all">
                        {contactInfo.email}
                      </a>
                    </p>
                  </CardContent>
                </Card>
              )}

              {contactInfo.address && (
                <Card className="text-center bg-neutral-900 border-neutral-700">
                  <CardHeader>
                    <MapPin className="h-8 w-8 text-gold mx-auto mb-2" />
                    <CardTitle className="text-white">Locatie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{contactInfo.address}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Location Section */}
      <LocationMap />
    </div>
  )
}
