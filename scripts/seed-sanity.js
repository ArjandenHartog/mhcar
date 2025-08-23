const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

console.log('🔧 Checking environment...')
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET) 
console.log('Token length:', process.env.SANITY_API_TOKEN ? process.env.SANITY_API_TOKEN.length : 'NO TOKEN')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ktpg5qcd',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
})

const siteSettingsData = {
  _type: 'siteSettings',
  _id: 'site-settings',
  title: "MH Car Cleaning - Professionele Auto Detailing Opheusden | Exterieur & Interieur Reiniging",
  description: "Premium auto detailing service in Opheusden en omgeving. Professionele exterieur reiniging, interieur detailing, coating services en volledige autopakketten. Ervaren specialisten, kwalitatieve producten, scherpe prijzen vanaf €80. Bel voor afspraak!",
  keywords: "auto detailing, car cleaning, autopoeteren, interieur reiniging, exterieur detailing, auto coating, Opheusden, Wageningen, Rhenen, auto schoonmaken, professioneel",
  siteUrl: "https://www.mhcarcleaning.nl",
  companyInfo: {
    name: "MH Car Cleaning",
    logo: "MH CAR CLEANING",
    tagline: "Professionele Auto Detailing Service in Opheusden en Omgeving",
    description: "Professionele auto detailing service in Opheusden. Wij maken uw auto grondig schoon, zowel van binnen als van buiten!",
    features: [
      "Premium producten & technieken",
      "Ervaren specialisten",
      "Service op afspraak", 
      "Scherpe prijzen vanaf €80",
      "Betuwe & omgeving"
    ]
  },
  contact: {
    phones: [
      { name: "Max", number: "0613063822" },
      { name: "Henri", number: "0643645299" }
    ],
    email: "CarCleaningOpheusden@gmail.com",
    address: "Opheusden, Nederland"
  },
  businessHours: {
    weekdays: "Ma - Za: 09:00 - 17:00",
    sunday: "Zondag: Gesloten",
    note: "Afspraken op maat mogelijk"
  },
  serviceAreas: [
    "Opheusden",
    "Wageningen", 
    "Rhenen",
    "Kesteren",
    "Elst",
    "Betuwe"
  ],
  socialMedia: {
    instagram: "#",
    facebook: "#"
  },
  footer: {
    creditText: "Made by Arjan",
    creditLink: "https://arjandenhartog.com",
    showCredit: true
  }
}

const navigationData = {
  _type: 'navigation',
  _id: 'main-navigation',
  title: "Hoofd Navigatie",
  items: [
    { label: "Home", href: "/", order: 1 },
    { label: "Over Ons", href: "/over-ons", order: 2 },
    { label: "Impressie", href: "/impressie", order: 3 },
    { label: "Afspraak Maken", href: "/afspraak", order: 4 },
    { label: "Pakketten", href: "/pakketten", order: 5 }
  ]
}

const servicesData = [
  {
    _type: 'service',
    _id: 'exterieur-detailing',
    name: 'Exterieur Detailing',
    slug: { _type: 'slug', current: 'exterieur-detailing' },
    description: 'Grondige reiniging van de buitenkant van uw auto',
    shortDescription: 'Grondige reiniging van de buitenkant van uw auto',
    price: 80,
    duration: '2-3 uur',
    included: [
      'Hand wash met premium shampoo',
      'Velgen reiniging',
      'Banden behandeling',
      'Glas reiniging binnen en buiten',
      'Kunststof verzorging',
      'Droogdoeken afwerking'
    ],
    icon: 'droplets',
    popular: false,
    featured: true,
    category: 'exterieur',
    order: 1
  },
  {
    _type: 'service',
    _id: 'interieur-detailing',
    name: 'Interieur Detailing',
    slug: { _type: 'slug', current: 'interieur-detailing' },
    description: 'Professionele reiniging van het interieur',
    shortDescription: 'Professionele reiniging van het interieur',
    price: 80,
    duration: '2-3 uur',
    included: [
      'Stofzuigen van alle oppervlakken',
      'Leder/stof reiniging',
      'Dashboard behandeling',
      'Ramen reiniging van binnen',
      'Deurpanelen verzorging',
      'Geur neutralisatie'
    ],
    icon: 'sparkles',
    popular: false,
    featured: true,
    category: 'interieur',
    order: 2
  },
  {
    _type: 'service',
    _id: 'coating-services',
    name: 'Coating Services',
    slug: { _type: 'slug', current: 'coating-services' },
    description: 'Beschermende coating voor langdurige glans',
    shortDescription: 'Beschermende coating voor langdurige glans',
    price: 50,
    duration: '1 uur',
    included: [
      'Keramische coating applicatie',
      'UV bescherming',
      'Waterafstotende eigenschap',
      '6 maanden garantie',
      'Glans verbetering',
      'Makkelijker onderhoud'
    ],
    icon: 'shield',
    popular: false,
    featured: true,
    category: 'coating',
    order: 3
  },
  {
    _type: 'service',
    _id: 'volledig-pakket',
    name: 'Volledig Pakket',
    slug: { _type: 'slug', current: 'volledig-pakket' },
    description: 'Complete behandeling van uw auto',
    shortDescription: 'Complete behandeling van uw auto',
    price: 150,
    duration: '4-5 uur',
    included: [
      'Alle exterieur services',
      'Alle interieur services',
      'Beschermende coating',
      'Premium afwerking',
      'Kwaliteitscontrole'
    ],
    icon: 'star',
    popular: true,
    featured: true,
    category: 'volledig',
    order: 4
  }
]

const homePageData = {
  _type: 'homePage',
  _id: 'homepage',
  title: 'Homepage',
  hero: {
    title: "MH CAR CLEANING",
    subtitle: "Professionele Auto Detailing Service in Opheusden en Omgeving",
    description: "Wij maken uw auto grondig schoon met premium producten en professionele technieken. Van exterieur detailing tot interieur reiniging en beschermende coatings - uw auto verdient de beste zorg.",
    primaryButton: {
      text: "Afspraak Maken",
      link: "/afspraak"
    },
    secondaryButton: {
      text: "Bekijk Pakketten", 
      link: "/pakketten"
    }
  },
  servicesSection: {
    title: "Onze Services",
    description: "Service is alleen op afspraak mogelijk, dit kan door contact met ons op te nemen.",
    showFeaturedServices: true
  },
  aboutSection: {
    title: "Waarom Kiezen voor MH Car Cleaning?",
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Al jaren de vertrouwde auto detailing specialist in Opheusden en omgeving'
          }
        ]
      }
    ],
    features: [
      {
        title: "Professionele Auto Detailing",
        description: "Ervaren specialisten met premium producten en moderne technieken"
      },
      {
        title: "Lokale Service in Opheusden", 
        description: "Centraal gelegen voor de hele regio Betuwe"
      }
    ]
  },
  ctaSection: {
    title: "Klaar voor een Afspraak?",
    description: "Neem contact met ons op voor professionele auto detailing",
    button: {
      text: "Maak een Afspraak",
      link: "/afspraak"
    }
  }
}

async function seedSanity() {
  console.log('🌱 Seeding Sanity with existing content...')
  
  try {
    // Create site settings
    console.log('📝 Creating site settings...')
    await client.createOrReplace(siteSettingsData)
    
    // Create navigation
    console.log('🧭 Creating navigation...')
    await client.createOrReplace(navigationData)
    
    // Create services
    console.log('🚗 Creating services...')
    for (const service of servicesData) {
      await client.createOrReplace(service)
    }
    
    // Create homepage
    console.log('🏠 Creating homepage...')
    await client.createOrReplace(homePageData)
    
    console.log('✅ Successfully seeded Sanity!')
    console.log('🎉 Je kunt nu naar je Sanity Studio en alle content aanpassen!')
    
  } catch (error) {
    console.error('❌ Error seeding Sanity:', error)
  }
}

seedSanity()