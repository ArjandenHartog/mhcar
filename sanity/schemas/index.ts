// Object types
import seoFields from './objects/seoFields'
import buttonField from './objects/buttonField'

// Document types - Pages
import homePage from './homePage'
import aboutPage from './aboutPage'

// Document types - Content
import service from './service'
import impressie from './impressie'
import testimonial from './testimonial'
import faqItem from './faqItem'
import contentBlock from './contentBlock'
import booking from './booking'

// Document types - Settings
import siteSettings from './siteSettings'
import navigation from './navigation'

export const schemaTypes = [
  // Object types (must come first)
  seoFields,
  buttonField,
  
  // Pages
  homePage,
  aboutPage,
  
  // Content
  service,
  impressie,
  testimonial,
  faqItem,
  contentBlock,
  booking,
  
  // Settings
  siteSettings,
  navigation
]