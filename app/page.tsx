import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import Stats from '@/components/sections/Stats'
import Testimonials from '@/components/sections/Testimonials'
import CTA from '@/components/sections/CTA'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <CTA />
    </div>
  )
}

