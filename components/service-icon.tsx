import { Droplets, Sparkles, Shield, Star, Car, LucideIcon } from 'lucide-react'

interface ServiceIconProps {
  icon?: string
  className?: string
}

const iconMap: Record<string, LucideIcon> = {
  droplets: Droplets,
  sparkles: Sparkles,
  shield: Shield,
  star: Star,
  car: Car,
}

export default function ServiceIcon({ icon, className = "h-12 w-12" }: ServiceIconProps) {
  const IconComponent = icon && iconMap[icon] ? iconMap[icon] : Droplets

  return <IconComponent className={className} />
}