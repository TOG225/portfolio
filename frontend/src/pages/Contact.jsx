import { useTranslation } from 'react-i18next'
import SEO from '@/components/seo/SEO'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <>
      <SEO
        title={t('contact.title')}
        description="Contactez Ghislain Touré, étudiant ingénieur en cybersécurité."
        url="/contact"
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <h1 className="text-3xl font-bold mb-6">{t('contact.title')}</h1>
        <p className="text-base text-gray-800 leading-relaxed mb-8">{t('contact.intro')}</p>

        <div className="mb-12">
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-semibold inline-block w-28 text-gray-700">{t('contact.email')}</span>
              <a href="mailto:o.ghislain@hestim.ma" className="text-blue-600 hover:underline">o.ghislain@hestim.ma</a>
            </li>
            <li>
              <span className="font-semibold inline-block w-28 text-gray-700">{t('contact.linkedin')}</span>
              <a href="https://linkedin.com/in/oklin-ghislain-toure" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">oklin-ghislain-toure</a>
            </li>
            <li>
              <span className="font-semibold inline-block w-28 text-gray-700">{t('contact.github')}</span>
              <a href="https://github.com/TOG225" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TOG225</a>
            </li>
            <li>
              <span className="font-semibold inline-block w-28 text-gray-700">{t('contact.location')}</span>
              <span className="text-gray-700">Casablanca, Maroc</span>
            </li>
          </ul>
        </div>

      </section>
    </>
  )
}
