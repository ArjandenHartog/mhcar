import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Award, Clock, Heart } from "lucide-react"

export default function OverOns() {
  return (
    <div className="py-12 bg-black min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 border-b border-gold">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 logo-font">OVER ONS</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Passie voor perfectie in auto detailing
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Onze Verhaal</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-300 mb-6">
                MH Car Cleaning is ontstaan uit een gezamenlijke passie voor auto's en perfectie. 
                Max en Henri hebben hun krachten gebundeld om de beste auto detailing service 
                in Opheusden en omgeving te bieden.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                Met jarenlange ervaring en een oog voor detail zorgen wij ervoor dat uw auto 
                er niet alleen schoon uitziet, maar ook optimaal wordt beschermd tegen de 
                elementen. Van een grondige interieur reiniging tot professionele coating - 
                wij behandelen elke auto met de zorg die hij verdient.
              </p>
              <p className="text-lg text-gray-300">
                Ons doel is simpel: uw auto laten stralen alsof hij net van de showroom komt. 
                Wij gebruiken alleen de beste producten en technieken om dit resultaat te bereiken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Onze Waarden</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Wat ons drijft om elke dag het beste van onszelf te geven
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow bg-black border-neutral-700">
              <CardHeader>
                <Award className="h-12 w-12 text-gold mx-auto mb-4" />
                <CardTitle className="text-white">Kwaliteit</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Wij streven naar perfectie in elke service die wij leveren
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-black border-neutral-700">
              <CardHeader>
                <Clock className="h-12 w-12 text-gold mx-auto mb-4" />
                <CardTitle className="text-white">Betrouwbaarheid</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Op tijd, zoals afgesproken, met consistente resultaten
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-black border-neutral-700">
              <CardHeader>
                <Heart className="h-12 w-12 text-gold mx-auto mb-4" />
                <CardTitle className="text-white">Passie</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Liefde voor auto's en trots op ons vakmanschap
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-black border-neutral-700">
              <CardHeader>
                <Users className="h-12 w-12 text-gold mx-auto mb-4" />
                <CardTitle className="text-white">Persoonlijk</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Elke klant wordt behandeld als familie
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ons Team</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Maak kennis met de experts achter MH Car Cleaning
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Card className="text-center bg-neutral-900 border-neutral-700">
              <CardHeader>
                <div className="w-32 h-32 bg-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-black">M</span>
                </div>
                <CardTitle className="text-2xl text-white">Max</CardTitle>
                <CardDescription className="text-gray-300">Medeoprichter & Detailing Specialist</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Met een passie voor perfectie en jarenlange ervaring in auto detailing, 
                  zorgt Max ervoor dat elke auto de beste behandeling krijgt.
                </p>
                <p className="text-gold font-semibold">
                  <a href="tel:0613063822" className="hover:underline">0613063822</a>
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-neutral-900 border-neutral-700">
              <CardHeader>
                <div className="w-32 h-32 bg-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-black">H</span>
                </div>
                <CardTitle className="text-2xl text-white">Henri</CardTitle>
                <CardDescription className="text-gray-300">Medeoprichter & Coating Expert</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Henri is gespecialiseerd in beschermende coatings en zorgt ervoor dat 
                  uw auto optimaal wordt beschermd tegen weersinvloeden.
                </p>
                <p className="text-gold font-semibold">
                  <a href="tel:0643645299" className="hover:underline">0643645299</a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-900 border-t border-gold">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Klaar om uw auto te laten stralen?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Neem contact met ons op voor een afspraak of vraag naar onze mogelijkheden.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:0613063822" 
              className="bg-gold text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-200"
            >
              Bel Max: 0613063822
            </a>
            <a 
              href="tel:0643645299" 
              className="bg-gold text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-200"
            >
              Bel Henri: 0643645299
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}