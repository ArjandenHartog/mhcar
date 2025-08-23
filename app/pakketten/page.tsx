'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Droplets, Sparkles, Shield, ArrowRight } from "lucide-react"

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: string
  included: string[]
  popular?: boolean
}

export default function PakkettenPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const services: Service[] = [
    {
      id: 'exterieur',
      name: 'Exterieur Detailing',
      description: 'Grondige reiniging van de buitenkant van uw auto',
      price: 80,
      duration: '2-3 uur',
      included: [
        'Hand wash met premium shampoo',
        'Velgen reiniging',
        'Banden behandeling',
        'Glas reiniging binnen en buiten',
        'Kunststof verzorging',
        'Droogdoeken afwerking'
      ]
    },
    {
      id: 'interieur',
      name: 'Interieur Detailing',
      description: 'Professionele reiniging van het interieur',
      price: 80,
      duration: '2-3 uur',
      included: [
        'Stofzuigen van alle oppervlakken',
        'Leder/stof reiniging',
        'Dashboard behandeling',
        'Ramen reiniging van binnen',
        'Deurpanelen verzorging',
        'Geur neutralisatie'
      ]
    },
    {
      id: 'coating',
      name: 'Beschermende Coating',
      description: 'Langdurige bescherming voor uw auto',
      price: 50,
      duration: '1 uur',
      included: [
        'Keramische coating applicatie',
        'UV bescherming',
        'Waterafstotende eigenschap',
        '6 maanden garantie',
        'Glans verbetering',
        'Makkelijker onderhoud'
      ]
    }
  ]

  const packages = [
    {
      id: 'basic-exterieur',
      name: 'Exterieur Pakket',
      services: ['exterieur'],
      originalPrice: 80,
      price: 80,
      description: 'Perfect voor een grondige buitenreiniging',
      icon: Droplets,
      popular: false
    },
    {
      id: 'basic-interieur',
      name: 'Interieur Pakket',
      services: ['interieur'],
      originalPrice: 80,
      price: 80,
      description: 'Uw interieur weer als nieuw',
      icon: Sparkles,
      popular: false
    },
    {
      id: 'exterieur-coating',
      name: 'Exterieur + Coating',
      services: ['exterieur', 'coating'],
      originalPrice: 130,
      price: 100,
      description: 'Reiniging met langdurige bescherming',
      icon: Shield,
      popular: true
    },
    {
      id: 'complete',
      name: 'Volledig Pakket',
      services: ['exterieur', 'interieur', 'coating'],
      originalPrice: 210,
      price: 150,
      description: 'De complete behandeling voor uw auto',
      icon: Star,
      popular: true
    }
  ]

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const calculateCustomPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId)
      return total + (service?.price || 0)
    }, 0)
  }

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

      {/* Package Selection */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Onze Pakketten</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Professionele auto detailing services met transparante prijzen
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {packages.map((pkg) => {
              const IconComponent = pkg.icon
              const includedServices = services.filter(service => pkg.services.includes(service.id))
              
              return (
                <Card 
                  key={pkg.id} 
                  className={`text-center hover:shadow-lg transition-all duration-300 bg-neutral-900 ${
                    pkg.popular 
                      ? 'border-2 border-gold ring-2 ring-gold/20' 
                      : 'border-neutral-700 hover:border-gold/50'
                  }`}
                >
                  {pkg.popular && (
                    <div className="bg-gold text-black text-sm font-bold py-2 px-4 text-center">
                      POPULAIR
                    </div>
                  )}
                  <CardHeader>
                    <IconComponent className={`h-12 w-12 mx-auto mb-4 ${pkg.popular ? 'text-gold' : 'text-gold'}`} />
                    <CardTitle className="text-white">{pkg.name}</CardTitle>
                    <CardDescription className="text-gray-300">{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        {pkg.originalPrice > pkg.price && (
                          <span className="text-lg text-gray-500 line-through">€{pkg.originalPrice},-</span>
                        )}
                        <span className="text-3xl font-bold text-gold">€{pkg.price},-</span>
                      </div>
                      {pkg.originalPrice > pkg.price && (
                        <Badge className="bg-gold text-black mt-2">
                          Bespaar €{pkg.originalPrice - pkg.price},-
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {includedServices.map((service) => (
                        <div key={service.id} className="text-left">
                          <p className="font-medium text-white">{service.name}</p>
                          <p className="text-sm text-gray-400">{service.duration}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      asChild 
                      className={`w-full ${
                        pkg.popular 
                          ? 'bg-gold text-black hover:bg-yellow-600' 
                          : 'bg-neutral-800 text-white hover-bg-gold hover-text-black'
                      }`}
                    >
                      <Link href="/afspraak">Boek Nu</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Service Details</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Wat is er precies inbegrepen bij elke service?
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="bg-black border-neutral-700">
                <CardHeader>
                  <CardTitle className="text-white">{service.name}</CardTitle>
                  <CardDescription className="text-gray-300">{service.description}</CardDescription>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>€{service.price},-</span>
                    <span>•</span>
                    <span>{service.duration}</span>
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
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Stel Uw Eigen Pakket Samen</h2>
            <p className="text-lg text-gray-300">
              Kies alleen de services die u nodig heeft
            </p>
          </div>
          
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-white">Custom Pakket Configurator</CardTitle>
              <CardDescription className="text-gray-300">
                Selecteer de gewenste services en zie direct de prijs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedServices.includes(service.id)
                        ? 'border-gold bg-gold/10'
                        : 'border-neutral-600 hover:border-gold/50'
                    }`}
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{service.name}</h4>
                      <span className="text-gold font-bold">€{service.price},-</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{service.description}</p>
                    <p className="text-xs text-gray-500">{service.duration}</p>
                  </div>
                ))}
              </div>
              
              {selectedServices.length > 0 && (
                <div className="border-t border-neutral-600 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-white">Geselecteerde Services:</h4>
                    <span className="text-2xl font-bold text-gold">€{calculateCustomPrice()},-</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedServices.map(serviceId => {
                      const service = services.find(s => s.id === serviceId)
                      return (
                        <Badge key={serviceId} variant="secondary" className="bg-gold text-black">
                          {service?.name}
                        </Badge>
                      )
                    })}
                  </div>
                  <Button 
                    asChild 
                    className="w-full bg-gold text-black hover:bg-yellow-600"
                  >
                    <Link href="/afspraak">
                      Boek Custom Pakket - €{calculateCustomPrice()},-
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

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
                  <a 
                    href="tel:0613063822" 
                    className="bg-gold text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition duration-200"
                  >
                    Bel Max: 0613063822
                  </a>
                  <a 
                    href="tel:0643645299" 
                    className="bg-gold text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition duration-200"
                  >
                    Bel Henri: 0643645299
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}