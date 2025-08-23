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
            <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto">
              Professionele Auto Detailing Service in Opheusden en Omgeving
            </p>
            <p className="text-lg mb-8 max-w-4xl mx-auto text-gray-300">
              Wij maken uw auto grondig schoon met premium producten en professionele technieken. Van exterieur detailing tot interieur reiniging en beschermende coatings - uw auto verdient de beste zorg.
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

      {/* About & SEO Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Waarom Kiezen voor MH Car Cleaning?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Al jaren de vertrouwde auto detailing specialist in Opheusden en omgeving
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">Professionele Auto Detailing</h3>
                <p className="text-gray-300 mb-4">
                  Bij MH Car Cleaning bent u verzekerd van professionele auto detailing services. Onze ervaren specialisten 
                  gebruiken uitsluitend premium producten en moderne technieken om uw voertuig de allerbeste zorg te geven.
                </p>
                <p className="text-gray-300">
                  Of het nu gaat om een grondige exterieur reiniging, diepgaande interieur detailing of beschermende coating services - 
                  wij zorgen ervoor dat uw auto er weer als nieuw uitziet.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">Lokale Service in Opheusden</h3>
                <p className="text-gray-300 mb-4">
                  Als lokale auto detailing specialist bedienen wij Opheusden en de gehele omgeving, waaronder Wageningen, 
                  Rhenen, Kesteren en Elst. Onze centrale ligging maakt ons goed bereikbaar voor autoliefhebbers uit de hele regio.
                </p>
                <p className="text-gray-300">
                  Service op afspraak zorgt ervoor dat u altijd persoonlijke aandacht krijgt en uw auto de tijd en zorg krijgt die het verdient.
                </p>
              </div>
            </div>

            <div className="bg-neutral-900 rounded-lg p-8 mb-12">
              <h3 className="text-2xl font-bold text-gold mb-6 text-center">Onze Specialiteiten</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-2">Exterieur Detailing</h4>
                  <p className="text-gray-300 text-sm">Grondige reiniging van lak, velgen, ramen en alle exterieur onderdelen</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-2">Interieur Reiniging</h4>
                  <p className="text-gray-300 text-sm">Diepgaande reiniging van stoelen, dashboard, tapijt en alle interieur oppervlakken</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-2">Coating Services</h4>
                  <p className="text-gray-300 text-sm">Beschermende coatings voor langdurige glans en bescherming tegen invloeden</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-2">Custom Pakketten</h4>
                  <p className="text-gray-300 text-sm">Op maat gemaakte servicepakketten voor uw specifieke wensen en budget</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Werkgebied & Service</h3>
              <p className="text-gray-300 mb-6">
                Wij bedienen auto-eigenaren in Opheusden, Wageningen, Rhenen, Kesteren, Elst, Herveld, Randwijk en de gehele Betuwe. 
                Onze professionele auto detailing services zijn beschikbaar op afspraak, zodat u altijd verzekerd bent van persoonlijke aandacht 
                en de beste service voor uw voertuig.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gold">
                <span>Opheusden</span>
                <span>•</span>
                <span>Wageningen</span>
                <span>•</span>
                <span>Rhenen</span>
                <span>•</span>
                <span>Kesteren</span>
                <span>•</span>
                <span>Elst</span>
                <span>•</span>
                <span>Betuwe</span>
              </div>
            </div>
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
