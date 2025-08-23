import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, ExternalLink } from "lucide-react"

export default function LocationMap() {
  return (
    <section className="py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Onze Locatie</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Bezoek ons in Opheusden voor professionele auto detailing
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Map */}
          <Card className="bg-black border-neutral-700 overflow-hidden h-full">
            <CardContent className="p-0 h-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2431.9999999999995!2d5.5960335!3d51.9333382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xab03563387717c27%3A0xdc364934eb38ad18!2sMH%20Car%20Cleaning%20Opheusden!5e0!3m2!1sen!2snl!4v1693234567890!5m2!1sen!2snl"
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[400px]"
              />
            </CardContent>
          </Card>

          {/* Location Info */}
          <Card className="bg-black border-neutral-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <MapPin className="h-6 w-6 text-gold" />
                MH Car Cleaning Opheusden
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-bold text-gold mb-2">Adres</h4>
                <p className="text-gray-300">Opheusden</p>
              </div>
              
              <div>
                <h4 className="font-bold text-gold mb-2">Contact</h4>
                <div className="space-y-1 text-gray-300">
                  <p><strong>Max:</strong> <a href="tel:0613063822" className="text-gold hover:underline">0613063822</a></p>
                  <p><strong>Henri:</strong> <a href="tel:0643645299" className="text-gold hover:underline">0643645299</a></p>
                  <p><strong>Email:</strong> <a href="mailto:CarCleaningOpheusden@gmail.com" className="text-gold hover:underline">CarCleaningOpheusden@gmail.com</a></p>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gold mb-2">Service</h4>
                <p className="text-gray-300 text-sm">Alleen op afspraak mogelijk</p>
              </div>
              
              <div className="pt-4 border-t border-neutral-700">
                <a 
                  href="https://maps.app.goo.gl/cxyPEog564wHfrKz6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-200"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in Google Maps
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}