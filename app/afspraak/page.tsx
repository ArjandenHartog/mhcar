'use client'

import { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, Clock, User, Phone, Car } from "lucide-react"
import { format } from "date-fns"
import { nl } from "date-fns/locale"
import { cn } from "@/lib/utils"

export default function AfspraakPage() {
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

  const packages = [
    { value: 'exterieur', label: 'Exterieur Detailing (€80)', price: '€80' },
    { value: 'exterieur-coating', label: 'Exterieur + Coating (€100)', price: '€100' },
    { value: 'interieur', label: 'Interieur Detailing (€80)', price: '€80' },
    { value: 'volledig', label: 'Volledig Pakket (€150)', price: '€150' },
    { value: 'custom', label: 'Custom Pakket', price: 'Op maat' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !formData.time || !formData.name || !formData.email || !formData.phone || !formData.package) {
      alert('Vul alle verplichte velden in')
      return
    }

    setIsSubmitting(true)

    try {
      const bookingData = {
        _type: 'booking',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: format(date, 'yyyy-MM-dd'),
        time: formData.time,
        package: formData.package,
        carBrand: formData.carBrand,
        carModel: formData.carModel,
        message: formData.message,
        status: 'new'
      }

      console.log('Sending booking data:', bookingData)

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })

      console.log('Response status:', response.status)
      
      const responseData = await response.json()
      console.log('Response data:', responseData)

      if (response.ok && responseData.success) {
        setSubmitted(true)
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
        const errorMessage = responseData.error || 'Er ging iets mis bij het versturen van uw afspraak'
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      const errorMessage = error instanceof Error ? error.message : 'Er ging iets mis bij het versturen van uw afspraak'
      alert(errorMessage + '. Neem telefonisch contact op: Max (0613063822) of Henri (0643645299)')
    }

    setIsSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="py-12 bg-black min-h-screen">
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Card className="bg-neutral-900 border-gold">
              <CardHeader>
                <div className="w-16 h-16 bg-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CalendarDays className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-2xl text-white">Afspraak Verzonden!</CardTitle>
                <CardDescription className="text-gray-300">
                  Bedankt voor uw afspraakverzoek. Wij nemen zo snel mogelijk contact met u op om de afspraak te bevestigen.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  U ontvangt binnenkort een bevestiging op het opgegeven e-mailadres.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => setSubmitted(false)} 
                    className="bg-gold text-black hover:bg-yellow-600"
                  >
                    Nieuwe Afspraak
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-gold text-gold hover-bg-gold hover-text-black"
                    onClick={() => window.location.href = '/'}
                  >
                    Naar Homepage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="py-12 bg-black min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 border-b border-gold">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 logo-font">AFSPRAAK MAKEN</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Plan uw auto detailing service op een moment dat u uitkomt
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Date Selection */}
              <Card className="bg-neutral-900 border-neutral-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <CalendarDays className="h-5 w-5 text-gold" />
                    Kies een Datum
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Selecteer de gewenste datum voor uw afspraak
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-600">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      locale={nl}
                      className="w-full text-white"
                      captionLayout="dropdown"
                    />
                  </div>
                  {date && (
                    <p className="mt-4 text-sm text-gold">
                      Geselecteerd: {format(date, 'EEEE d MMMM yyyy', { locale: nl })}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Time Selection */}
              <Card className="bg-neutral-900 border-neutral-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Clock className="h-5 w-5 text-gold" />
                    Kies een Tijd
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Beschikbare tijdsloten
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={formData.time === time ? "default" : "outline"}
                        className={
                          formData.time === time 
                            ? "bg-gold text-black hover:bg-yellow-600" 
                            : "border-gold text-gold hover:bg-gold hover:text-black transition-colors"
                        }
                        onClick={() => setFormData({ ...formData, time })}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Personal Information */}
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <User className="h-5 w-5 text-gold" />
                  Persoonlijke Gegevens
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Naam *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-black border-neutral-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-black border-neutral-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Telefoonnummer *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="bg-black border-neutral-600 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Selection */}
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Car className="h-5 w-5 text-gold" />
                  Service & Auto Gegevens
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="package" className="text-white">Gewenst Pakket *</Label>
                  <Select value={formData.package} onValueChange={(value) => setFormData({ ...formData, package: value })}>
                    <SelectTrigger className="bg-black border-neutral-600 text-white data-[placeholder]:text-gray-400">
                      <SelectValue placeholder="Selecteer een pakket" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-neutral-600 text-white">
                      {packages.map((pkg) => (
                        <SelectItem 
                          key={pkg.value} 
                          value={pkg.value} 
                          className="text-white hover:bg-neutral-700 focus:bg-neutral-700 data-[highlighted]:bg-neutral-700"
                        >
                          {pkg.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="carBrand" className="text-white">Automerk</Label>
                    <Input
                      id="carBrand"
                      type="text"
                      placeholder="bijv. BMW, Mercedes, Audi"
                      value={formData.carBrand}
                      onChange={(e) => setFormData({ ...formData, carBrand: e.target.value })}
                      className="bg-black border-neutral-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="carModel" className="text-white">Automodel</Label>
                    <Input
                      id="carModel"
                      type="text"
                      placeholder="bijv. 3-serie, C-klasse, A4"
                      value={formData.carModel}
                      onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                      className="bg-black border-neutral-600 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Opmerkingen</Label>
                  <Textarea
                    id="message"
                    placeholder="Eventuele specifieke wensen of opmerkingen..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-black border-neutral-600 text-white"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting || !date || !formData.time || !formData.name || !formData.email || !formData.phone || !formData.package}
                className="bg-gold text-black hover:bg-yellow-600 px-8 py-3 text-lg"
              >
                {isSubmitting ? 'Verzenden...' : 'Afspraak Versturen'}
              </Button>
            </div>
          </form>

          {/* Contact Info */}
          <Card className="mt-12 bg-neutral-900 border-gold">
            <CardHeader>
              <CardTitle className="text-center text-white">Of neem direct contact op</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:0613063822" 
                  className="flex items-center justify-center gap-2 bg-black text-gold border border-gold px-6 py-3 rounded-lg hover-bg-gold hover-text-black transition duration-200"
                >
                  <Phone className="h-4 w-4" />
                  Max: 0613063822
                </a>
                <a 
                  href="tel:0643645299" 
                  className="flex items-center justify-center gap-2 bg-black text-gold border border-gold px-6 py-3 rounded-lg hover-bg-gold hover-text-black transition duration-200"
                >
                  <Phone className="h-4 w-4" />
                  Henri: 0643645299
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}