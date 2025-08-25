'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import type { Service } from '@/lib/sanity'
import { extractPlainText } from '@/lib/utils/text'

interface PakkettenClientProps {
  services: Service[]
}

export default function PakkettenClient({ services }: PakkettenClientProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const calculateCustomPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s._id === serviceId)
      return total + (service?.price || 0)
    }, 0)
  }

  return (
    <section className="py-20 bg-neutral-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Stel Uw Eigen Pakket Samen</h2>
          <p className="text-lg text-gray-300">
            Kies alleen de services die u nodig heeft
          </p>
        </div>
        
        <Card className="bg-black border-neutral-700">
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
                  key={service._id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedServices.includes(service._id)
                      ? 'border-gold bg-gold/10'
                      : 'border-neutral-600 hover:border-gold/50'
                  }`}
                  onClick={() => toggleService(service._id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{service.name}</h4>
                    <span className="text-gold font-bold">€{service.price},-</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{extractPlainText(service.description)}</p>
                  {service.duration && (
                    <p className="text-xs text-gray-500">{service.duration}</p>
                  )}
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
                    const service = services.find(s => s._id === serviceId)
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
  )
}