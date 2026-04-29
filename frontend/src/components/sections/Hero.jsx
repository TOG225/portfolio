import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      <h1 className="text-3xl font-bold mb-2">{t('hero.title')}</h1>
      <p className="text-lg font-mono text-gray-500 mb-6">0xL@toure</p>

      <p className="text-base text-gray-800 leading-relaxed mb-6">
        {t('hero.bio_p1')}
      </p>

      <p className="text-base text-gray-800 leading-relaxed mb-8">
        {t('hero.bio_p2')}
      </p>

      <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <a href="/cv.pdf" className="text-blue-600 hover:underline">{t('hero.cv')}</a>
        <span className="text-gray-300">·</span>
        <a href="https://github.com/TOG225" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
        <span className="text-gray-300">·</span>
        <a href="https://linkedin.com/in/oklin-ghislain-toure" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
        <span className="text-gray-300">·</span>
        <a href="mailto:o.ghislain@hestim.ma" className="text-blue-600 hover:underline">Email</a>
      </nav>
    </section>
  )
}
