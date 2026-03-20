'use client'

import { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, Clock, User } from "lucide-react"
import { format } from "date-fns"
import { nl } from "date-fns/locale"
import type { SiteSettings } from '@/lib/sanity'

interface Package {
  value: string
  label: string
  price: string
  duration?: string
}

interface AfspraakClientProps {
  packages: Package[]
  siteSettings: SiteSettings | null
}

export default function AfspraakClient({ packages, siteSettings }: AfspraakClientProps) {
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    time: '',
    package: '',
    carBrand: '',
    carModel: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const timeSlots = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !formData.time || !formData.name || !formData.email || !formData.phone || !formData.package) {
      alert('Vul alle verplichte velden in')
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: format(date, 'yyyy-MM-dd'),
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          time: '',
          package: '',
          carBrand: '',
          carModel: '',
          message: ''
        })
        setDate(undefined)
      } else {
        alert('Er is een fout opgetreden. Probeer het opnieuw.')
      }
    } catch {
      alert('Er is een fout opgetreden. Probeer het opnieuw.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <div className="py-20 bg-black min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gold rounded-full mx-auto mb-4 flex items-center justify-center">
              <CalendarDays className="h-8 w-8 text-black" />
            </div>
            <CardTitle className="text-2xl text-white">Afspraak Aangevraagd!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-300 mb-6">
              Bedankt voor uw afspraak aanvraag. Wij nemen binnen 24 uur contact met u op 
              om de afspraak te bevestigen.
            </p>
            {siteSettings?.contact && (
              <div className="space-y-2">
                {siteSettings.contact.phones && siteSettings.contact.phones.map((phone, index) => (
                  <p key={index} className="text-gold">
                    {phone.name}: <a href={`tel:${phone.number}`} className="hover:underline">{phone.number}</a>
                  </p>
                ))}
                {siteSettings.contact.email && (
                  <p className="text-gold">
                    <a href={`mailto:${siteSettings.contact.email}`} className="hover:underline">
                      {siteSettings.contact.email}
                    </a>
                  </p>
                )}
              </div>
            )}
            <Button 
              onClick={() => setSubmitted(false)}
              className="mt-6 bg-gold text-black hover:bg-yellow-600"
            >
              Nieuwe Afspraak
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="py-12 bg-black min-h-screen">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 logo-font">
            AFSPRAAK MAKEN
          </h1>
          <p className="text-xl text-gray-300">
            Plan uw auto detailing sessie
          </p>
          <p className="text-lg max-w-4xl mx-auto text-gray-300">
            {siteSettings?.companyInfo?.description || 
             'Professionele auto detailing services. Kies uw gewenste datum, tijd en servicepakket.'}
          </p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="max-w-4xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Kies een datum
              </CardTitle>
              <CardDescription className="text-gray-400">
                Selecteer uw gewenste datum voor de service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date() || date.getDay() === 0}
                locale={nl}
                className="rounded-md border border-neutral-600 bg-black text-white"
              />
              
              {date && (
                <div className="mt-6">
                  <Label htmlFor="time" className="text-white">Tijd *</Label>
                  <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                    <SelectTrigger className="mt-2 bg-black border-neutral-600 text-white">
                      <SelectValue placeholder="Selecteer tijd" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-neutral-600 text-white">
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time} className="hover:bg-neutral-800">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {time}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Details Section */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-5 w-5" />
                Uw gegevens
              </CardTitle>
              <CardDescription className="text-gray-400">
                Vul uw contactgegevens in
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Naam *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1 bg-black border-neutral-600 text-white"
                  placeholder="Uw volledige naam"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-1 bg-black border-neutral-600 text-white"
                  placeholder="uw.email@voorbeeld.nl"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white">Telefoon *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="mt-1 bg-black border-neutral-600 text-white"
                  placeholder="06 12345678"
                  required
                />
              </div>

              <div>
                <Label htmlFor="package" className="text-white">Service pakket *</Label>
                <Select value={formData.package} onValueChange={(value) => handleInputChange('package', value)}>
                  <SelectTrigger className="mt-1 bg-black border-neutral-600 text-white">
                    <SelectValue placeholder="Kies een pakket" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-neutral-600 text-white">
                    {packages.map((pkg) => (
                      <SelectItem 
                        key={pkg.value} 
                        value={pkg.value}
                        className="hover:bg-neutral-800"
                      >
                        <div>
                          <div>{pkg.label}</div>
                          <div className="text-sm text-gray-400">
                            {pkg.price} {pkg.duration && `• ${pkg.duration}`}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="carBrand" className="text-white">Auto merk</Label>
                  <Input
                    id="carBrand"
                    type="text"
                    value={formData.carBrand}
                    onChange={(e) => handleInputChange('carBrand', e.target.value)}
                    className="mt-1 bg-black border-neutral-600 text-white"
                    placeholder="BMW, Mercedes, enz."
                  />
                </div>
                <div>
                  <Label htmlFor="carModel" className="text-white">Model</Label>
                  <Input
                    id="carModel"
                    type="text"
                    value={formData.carModel}
                    onChange={(e) => handleInputChange('carModel', e.target.value)}
                    className="mt-1 bg-black border-neutral-600 text-white"
                    placeholder="3-serie, C-klasse, enz."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-white">Bijzonderheden</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="mt-1 bg-black border-neutral-600 text-white"
                  placeholder="Eventuele bijzondere wensen of opmerkingen..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting || !date || !formData.time || !formData.name || !formData.email || !formData.phone || !formData.package}
            className="bg-gold text-black hover:bg-yellow-600 px-8 py-3 text-lg font-semibold"
          >
            {isSubmitting ? 'Bezig met versturen...' : 'Afspraak Aanvragen'}
          </Button>
          <p className="text-sm text-gray-400 mt-4">
            * Wij nemen binnen 24 uur contact op voor bevestiging
          </p>
        </div>
      </div>
    </div>
  )
}