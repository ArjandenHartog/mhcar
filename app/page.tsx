import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Star, Droplets, Sparkles, Shield } from "lucide-react"
import LocationMap from "@/components/location-map"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black text-white py-20 border-b border-gold">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 logo-font">
              MH CAR CLEANING
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Wij maken uw auto grondig schoon, zowel van de binnenkant als de buitenkant!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold text-black hover:bg-yellow-600">
                <Link href="/afspraak">Afspraak Maken</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-gold text-gold hover-bg-gold hover-text-black">
                <Link href="/pakketten">Bekijk Pakketten</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Onze Services</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Service is alleen op afspraak mogelijk, dit kan door contact met ons op te nemen.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow bg-black border-neutral-700">
              <CardHeader>
                <Droplets className="h-12 w-12 text-gold mx-auto mb-4" />
                <CardTitle className="text-white">Exterieur Detailing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gold mb-2">€80,-</p>
                <CardDescription className="text-gray-300">
                  Grondige reiniging van de buitenkant van uw auto
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-black border-neutral-700">
              <CardHeader>
                <Shield className="h-12 w-12 text-gold mx-auto mb-4" />
                <CardTitle className="text-white">Exterieur + Coating</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gold mb-2">€100,-</p>
                <CardDescription className="text-gray-300">
                  Exterieur detailing inclusief beschermende coating
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-black border-neutral-700">
              <CardHeader>
                <Sparkles className="h-12 w-12 text-gold mx-auto mb-4" />
                <CardTitle className="text-white">Interieur Detailing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gold mb-2">€80,-</p>
                <CardDescription className="text-gray-300">
                  Professionele reiniging van het interieur
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-black border-2 border-gold">
              <CardHeader>
                <Star className="h-12 w-12 text-gold mx-auto mb-4" />
                <CardTitle className="text-white">Volledig Pakket</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gold mb-2">€150,-</p>
                <CardDescription className="text-gray-300">
                  Complete service inclusief coating
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-400">
              *Let op: tarieven kunnen wisselend zijn per auto, afhankelijk van de grootte van de auto.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Contact</h2>
            <p className="text-lg text-gray-300">
              Neem bij het maken van een afspraak of bij vragen contact met ons op
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center bg-neutral-900 border-neutral-700">
              <CardHeader>
                <Phone className="h-8 w-8 text-gold mx-auto mb-2" />
                <CardTitle className="text-white">Telefoon</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-300"><strong>Max:</strong> <a href="tel:0613063822" className="text-gold hover:underline">0613063822</a></p>
                <p className="text-gray-300"><strong>Henri:</strong> <a href="tel:0643645299" className="text-gold hover:underline">0643645299</a></p>
              </CardContent>
            </Card>

            <Card className="text-center bg-neutral-900 border-neutral-700">
              <CardHeader>
                <Mail className="h-8 w-8 text-gold mx-auto mb-2" />
                <CardTitle className="text-white">E-mail</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <a href="mailto:CarCleaningOpheusden@gmail.com" className="text-gold hover:underline">
                    CarCleaningOpheusden@gmail.com
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-neutral-900 border-neutral-700">
              <CardHeader>
                <MapPin className="h-8 w-8 text-gold mx-auto mb-2" />
                <CardTitle className="text-white">Locatie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Opheusden</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <LocationMap />
    </div>
  )
}
