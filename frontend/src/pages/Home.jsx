import SEO             from '@/components/seo/SEO'
import Hero             from '@/components/sections/Hero'
import Experience       from '@/components/sections/Experience'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import Education        from '@/components/sections/Education'
import Certifications   from '@/components/sections/Certifications'
import CtfExperience    from '@/components/sections/CtfExperience'
import TryHackMeProfile from '@/components/sections/TryHackMeProfile'

export default function Home() {
  return (
    <>
      <SEO
        title="Ghislain Touré — Portfolio Cybersécurité"
        description="Portfolio cybersécurité d'un étudiant ingénieur HESTIM. Projets pentest, SOC, MISP, forensique, automatisation."
        url="/"
      />
      <Hero />
      <Experience />
      <FeaturedProjects />
      <Education />
      <Certifications />
      <CtfExperience />
      <TryHackMeProfile />
    </>
  )
}
