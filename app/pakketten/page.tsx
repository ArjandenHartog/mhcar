import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight } from "lucide-react"
import { getServices, getSiteSettings } from '@/lib/sanity'
import ServiceIcon from '@/components/service-icon'
import PakkettenClient from './pakketten-client'

export default async function PakkettenPage() {
  const [services, siteSettings] = await Promise.all([
    getServices(),
    getSiteSettings()
  ])

  // Fallback services if none exist in Sanity
  const fallbackServices = [
    {
      _id: 'exterieur',
      name: 'Exterieur Detailing',
      slug: { current: 'exterieur' },
      description: 'Grondige reiniging van de buitenkant van uw auto',
      price: 80,
      duration: '2-3 uur',
      icon: 'droplets',
      included: [
        'Hand wash met premium shampoo',
        'Velgen reiniging', 
        'Banden behandeling',
        'Glas reiniging binnen en buiten',
        'Kunststof verzorging',
        'Droogdoeken afwerking'
      ],
      category: 'exterieur'
    },
    {
      _id: 'interieur',
      name: 'Interieur Detailing',
      slug: { current: 'interieur' },
      description: 'Professionele reiniging van het interieur',
      price: 80,
      duration: '2-3 uur',
      icon: 'sparkles',
      included: [
        'Stofzuigen van alle oppervlakken',
        'Leder/stof reiniging',
        'Dashboard behandeling',
        'Ramen reiniging van binnen',
        'Deurpanelen verzorging',
        'Geur neutralisatie'
      ],
      category: 'interieur'
    },
    {
      _id: 'coating',
      name: 'Beschermende Coating',
      slug: { current: 'coating' },
      description: 'Langdurige bescherming voor uw auto',
      price: 50,
      duration: '1 uur',
      icon: 'shield',
      included: [
        'Keramische coating applicatie',
        'UV bescherming',
        'Waterafstotende eigenschap',
        '6 maanden garantie',
        'Glans verbetering',
        'Makkelijker onderhoud'
      ],
      category: 'coating'
    },
    {
      _id: 'volledig',
      name: 'Volledig Pakket',
      slug: { current: 'volledig' },
      description: 'Complete behandeling van uw auto',
      price: 150,
      duration: '4-5 uur',
      icon: 'star',
      popular: true,
      included: [
        'Alle exterieur services',
        'Alle interieur services',
        'Beschermende coating',
        'Premium afwerking',
        'Kwaliteitscontrole'
      ],
      category: 'volledig'
    }
  ]

  const activeServices = services.length > 0 ? services : fallbackServices
  const contactInfo = siteSettings?.contact || {
    phones: [
      { name: "Max", number: "0613063822" },
      { name: "Henri", number: "0643645299" }
    ]
  }

  // Group services by category for better organization
  const popularServices = activeServices.filter(service => service.popular)
  const regularServices = activeServices.filter(service => !service.popular)

  return (
    <div className="py-12 bg-black min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 border-b border-gold">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 logo-font">PAKKETTEN</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Kies het pakket dat perfect bij uw behoeften past
          </p>
        </div>
      </section>

      {/* Popular Services */}
      {popularServices.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Populaire Pakketten</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Onze meest gekozen services voor optimale resultaten
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularServices.map((service) => (
                <Card 
                  key={service._id}
                  className="text-center hover:shadow-lg transition-all duration-300 bg-neutral-900 border-2 border-gold ring-2 ring-gold/20"
                >
                  <div className="bg-gold text-black text-sm font-bold py-2 px-4 text-center">
                    POPULAIR
                  </div>
                  <CardHeader>
                    <ServiceIcon 
                      icon={service.icon} 
                      className="h-12 w-12 mx-auto mb-4 text-gold" 
                    />
                    <CardTitle className="text-white">{service.name}</CardTitle>
                    <CardDescription className="text-gray-300">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-gold">€{service.price},-</span>
                      {service.duration && (
                        <p className="text-sm text-gray-400 mt-1">{service.duration}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <ul className="space-y-1">
                        {service.included.slice(0, 4).map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-left text-gray-300">
                            <Check className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                        {service.included.length > 4 && (
                          <li className="text-sm text-gray-400">+ {service.included.length - 4} meer...</li>
                        )}
                      </ul>
                    </div>
                    
                    <Button 
                      asChild 
                      className="w-full bg-gold text-black hover:bg-yellow-600"
                    >
                      <Link href="/afspraak">Boek Nu</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Services */}
      <section className={`py-20 ${popularServices.length > 0 ? 'bg-neutral-900' : ''}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {popularServices.length > 0 ? 'Alle Services' : 'Onze Pakketten'}
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Professionele auto detailing services met transparante prijzen
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {regularServices.map((service) => (
              <Card 
                key={service._id}
                className="text-center hover:shadow-lg transition-all duration-300 bg-black border-neutral-700 hover:border-gold/50"
              >
                <CardHeader>
                  <ServiceIcon 
                    icon={service.icon} 
                    className="h-12 w-12 mx-auto mb-4 text-gold" 
                  />
                  <CardTitle className="text-white">{service.name}</CardTitle>
                  <CardDescription className="text-gray-300">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-gold">€{service.price},-</span>
                    {service.duration && (
                      <p className="text-sm text-gray-400 mt-1">{service.duration}</p>
                    )}
                  </div>
                  
                  <Button 
                    asChild 
                    className="w-full bg-neutral-800 text-white hover-bg-gold hover-text-black"
                  >
                    <Link href="/afspraak">Boek Nu</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Service Details</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Wat is er precies inbegrepen bij elke service?
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {activeServices.map((service) => (
              <Card key={service._id} className="bg-neutral-900 border-neutral-700">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <ServiceIcon 
                      icon={service.icon} 
                      className="h-8 w-8 text-gold" 
                    />
                    <div>
                      <CardTitle className="text-white text-left">{service.name}</CardTitle>
                      {service.popular && (
                        <Badge className="bg-gold text-black text-xs">POPULAIR</Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-gray-300">{service.description}</CardDescription>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="text-gold font-bold">€{service.price},-</span>
                    {service.duration && (
                      <>
                        <span>•</span>
                        <span>{service.duration}</span>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <Check className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Package Builder */}
      <PakkettenClient services={activeServices} />

      {/* Additional Info */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Card className="bg-black border-gold">
            <CardHeader>
              <CardTitle className="text-white">Belangrijk om te Weten</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-bold text-gold mb-2">Prijzen</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Tarieven kunnen variëren per auto</li>
                    <li>• Afhankelijk van grootte en staat</li>
                    <li>• Definitieve prijs na inspectie</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gold mb-2">Service</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Alleen op afspraak mogelijk</li>
                    <li>• Professionele producten</li>
                    <li>• Ervaren specialisten</li>
                  </ul>
                </div>
              </div>
              <div className="pt-4 border-t border-neutral-700">
                <p className="text-gray-300 mb-4">
                  Heeft u vragen over onze pakketten of wilt u advies op maat?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {contactInfo.phones.map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${phone.number}`}
                      className="bg-gold text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition duration-200"
                    >
                      Bel {phone.name}: {phone.number}
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}