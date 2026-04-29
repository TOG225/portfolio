import { useTranslation } from 'react-i18next'
import SEO from '@/components/seo/SEO'
import CtfExperience from '@/components/sections/CtfExperience'
import TryHackMeProfile from '@/components/sections/TryHackMeProfile'

export default function CTF() {
  const { t } = useTranslation()

  return (
    <>
      <SEO
        title={t('ctf.title')}
        description="Expérience CTF, compétitions de cybersécurité et profils plateformes."
        url="/ctf"
      />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-4">
        <h1 className="text-3xl font-bold mb-2">{t('ctf.title')}</h1>
      </section>
      <CtfExperience />
      <TryHackMeProfile />
    </>
  )
}
