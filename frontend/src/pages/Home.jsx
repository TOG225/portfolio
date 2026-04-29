import SEO             from '@/components/seo/SEO'
import Hero             from '@/components/sections/Hero'
import WorkExperience   from '@/components/sections/WorkExperience'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import AcademicEducation from '@/components/sections/AcademicEducation'
import Certifications   from '@/components/sections/Certifications'
import CtfExperience    from '@/components/sections/CtfExperience'
import TryHackMeProfile from '@/components/sections/TryHackMeProfile'

export default function Home() {
  return (
    <>
      <SEO
        description="Portfolio cybersécurité d'un étudiant ingénieur HESTIM. Projets pentest, SOC, MISP, forensique, automatisation."
        url="/"
      />
      <Hero />
      <WorkExperience />
      <FeaturedProjects />
      <AcademicEducation />
      <Certifications />
      <CtfExperience />
      <TryHackMeProfile />
    </>
  )
}
