import { Button } from "@/components/ui/button"
import { getServices, getSiteSettings } from '@/lib/sanity'
import PakkettenClient from './pakketten-client'
import { extractPlainText } from '@/lib/utils/text'

// Enable ISR with 60 second revalidation
export const revalidate = 60

export default async function PakkettenPage() {
  const [services, siteSettings] = await Promise.all([
    getServices(),
    getSiteSettings()
  ])

  // Process services to ensure description is always a string
  const processedServices = services.map(service => ({
    ...service,
    description: extractPlainText(service.description)
  }))
  
  const contactInfo = siteSettings?.contact

  return (
    <div className="py-12 bg-black min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 logo-font">
            ONZE PAKKETTEN
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Kies het pakket dat bij uw auto en wensen past
          </p>
        </div>
      </div>

      {services.length > 0 ? (
        <>
          <PakkettenClient services={processedServices} />
          
          {/* Contact Section */}
          {contactInfo && (
            <section className="py-16 bg-neutral-900">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Vragen over onze pakketten?
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Neem contact met ons op voor advies op maat of een prijsopgave.
                </p>
                
                {contactInfo.phones && contactInfo.phones.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    {contactInfo.phones.map((phone, index) => (
                      <Button key={index} asChild size="lg" className="bg-gold text-black hover:bg-yellow-600">
                        <a href={`tel:${phone.number}`}>
                          Bel {phone.name}: {phone.number}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}

                {contactInfo.email && (
                  <Button asChild variant="outline" size="lg" className="border-gold text-gold hover:bg-gold hover:text-black">
                    <a href={`mailto:${contactInfo.email}`}>
                      E-mail: {contactInfo.email}
                    </a>
                  </Button>
                )}
              </div>
            </section>
          )}

          {/* Disclaimer */}
          <section className="py-8 bg-black border-t border-neutral-800">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <p className="text-sm text-gray-400">
                * Prijzen zijn indicatief en kunnen variëren afhankelijk van de grootte en staat van uw auto. 
                Neem contact op voor een exacte prijsopgave.
              </p>
            </div>
          </section>
        </>
      ) : (
        // No services available
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">
              Pakketten worden binnenkort toegevoegd
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Onze service pakketten zijn in ontwikkeling. 
              Neem contact met ons op voor informatie over onze beschikbare services.
            </p>
            
            {contactInfo?.phones && contactInfo.phones.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {contactInfo.phones.map((phone, index) => (
                  <Button key={index} asChild size="lg" className="bg-gold text-black hover:bg-yellow-600">
                    <a href={`tel:${phone.number}`}>
                      Bel {phone.name}: {phone.number}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}