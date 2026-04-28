import SEO            from '@/components/seo/SEO'
import Hero             from '@/components/sections/Hero'
import Education        from '@/components/sections/Education'
import Experience       from '@/components/sections/Experience'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import Writings         from '@/components/sections/Writings'
import Certifications   from '@/components/sections/Certifications'
import Skills           from '@/components/sections/Skills'

export default function Home() {
  return (
    <>
      <SEO
        title="Ghislain Touré — Portfolio Cybersécurité"
        description="Portfolio cybersécurité d'un étudiant ingénieur HESTIM. Projets pentest, SOC, MISP, forensique, automatisation."
        url="/"
      />
      <Hero />
      <Education />
      <Experience />
      <FeaturedProjects />
      <Writings />
      <Certifications />
      <Skills />
    </>
  )
}
