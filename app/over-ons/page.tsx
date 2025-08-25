import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Award, Clock, Heart } from "lucide-react"
import { getAboutPage, getSiteSettings } from '@/lib/sanity'
import { extractPlainText } from '@/lib/utils/text'

// Enable ISR with 60 second revalidation
export const revalidate = 60

export default async function OverOns() {
  const [aboutPage, siteSettings] = await Promise.all([
    getAboutPage(),
    getSiteSettings()
  ])
  const hero = aboutPage?.hero || {
    title: "OVER ONS", 
    subtitle: siteSettings?.companyInfo?.tagline || "Passie voor perfectie in auto detailing",
    description: siteSettings?.companyInfo?.description ? [{ _type: 'block', children: [{ text: siteSettings.companyInfo.description }] }] : []
  }
  
  return (
    <div className="py-12 bg-black min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 border-b border-gold">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 logo-font">
            {hero.title}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            {hero.subtitle}
          </p>
          {hero.description && hero.description.length > 0 && (
            <div className="text-lg text-gray-300 mt-4 max-w-4xl mx-auto">
              {extractPlainText(hero.description)}
            </div>
          )}
        </div>
      </section>

      {/* Story Section */}
      {aboutPage?.story && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                {aboutPage.story.title}
              </h2>
              <div className="prose prose-lg max-w-none text-lg text-gray-300">
                {extractPlainText(aboutPage.story.content)}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      {aboutPage?.values && (
        <section className="py-20 bg-neutral-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                {aboutPage.values.title}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aboutPage.values.items.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-black border-neutral-700">
                  <CardHeader>
                    {value.icon === 'award' && <Award className="h-12 w-12 text-gold mx-auto mb-4" />}
                    {value.icon === 'clock' && <Clock className="h-12 w-12 text-gold mx-auto mb-4" />}
                    {value.icon === 'heart' && <Heart className="h-12 w-12 text-gold mx-auto mb-4" />}
                    {value.icon === 'users' && <Users className="h-12 w-12 text-gold mx-auto mb-4" />}
                    <CardTitle className="text-white">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {aboutPage?.team && (
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                {aboutPage.team.title}
              </h2>
              {aboutPage.team.description && (
                <div className="text-lg text-gray-300 max-w-2xl mx-auto">
                  {extractPlainText(aboutPage.team.description)}
                </div>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {aboutPage.team.members.map((member, index) => (
                <Card key={index} className="text-center bg-neutral-900 border-neutral-700">
                  <CardHeader>
                    <div className="w-32 h-32 bg-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-4xl font-bold text-black">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <CardTitle className="text-2xl text-white">{member.name}</CardTitle>
                    <CardDescription className="text-gray-300">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      {member.bio}
                    </p>
                    {member.phone && (
                      <p className="text-gold font-semibold">
                        <a href={`tel:${member.phone}`} className="hover:underline">
                          {member.phone}
                        </a>
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-neutral-900 border-t border-gold">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Klaar om uw auto te laten stralen?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Neem contact met ons op voor een afspraak of vraag naar onze mogelijkheden.
          </p>
          {siteSettings?.contact?.phones && siteSettings.contact.phones.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {siteSettings.contact.phones.map((phone, index) => (
                <a 
                  key={index}
                  href={`tel:${phone.number}`} 
                  className="bg-gold text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-200"
                >
                  Bel {phone.name}: {phone.number}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}