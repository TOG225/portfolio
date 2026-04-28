import Hero             from '@/components/sections/Hero'
import About            from '@/components/sections/About'
import Skills           from '@/components/sections/Skills'
import Certifications   from '@/components/sections/Certifications'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import Contact          from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Certifications />
      <FeaturedProjects />
      <Contact />
    </>
  )
}
