import impressie from './impressie'
import booking from './booking'
import siteSettings from './siteSettings'
import navigation from './navigation'
import service from './service'
import homePage from './homePage'
import aboutPage from './aboutPage'
import faqItem from './faqItem'
import testimonial from './testimonial'
import contentBlock from './contentBlock'

export const schemaTypes = [
  // Core content
  homePage,
  aboutPage,
  service,
  
  // Content types
  impressie,
  contentBlock,
  
  // Interactive content
  testimonial,
  faqItem,
  booking,
  
  // Settings
  siteSettings,
  navigation
]