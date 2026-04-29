import { useTranslation } from 'react-i18next'

/**
 * Section Expérience professionnelle (sans logos entreprises).
 * Renommé depuis Experience.jsx pour éviter un bundle JS mis en cache avec l’ancienne version.
 */
export default function WorkExperience() {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language?.startsWith('en')

  return (
    <section
      id="experience"
      className="experience-plain max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200 [&_img]:hidden"
    >
      <h2 className="text-xl font-bold mb-6">{t('experience.title')}</h2>

      <div className="space-y-8">

        <div>
          <div className="mb-2">
            <div className="flex justify-between items-baseline flex-wrap gap-x-2">
              <h3 className="font-semibold">Cybersecurity IAM Developer</h3>
              <span className="text-sm text-gray-500 italic whitespace-nowrap">2026</span>
            </div>
            <p className="text-sm text-gray-600">
              <a
                href="https://www.theforage.com/simulations/tata/cybersecurity-iam-developer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Tata Consultancy Services (TCS)
              </a>
              {' — Forage Virtual Job Simulation'}
            </p>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 leading-relaxed mt-2">
            {isEn ? (
              <>
                <li>Assessment of IAM (Identity & Access Management) maturity at TechCorp Enterprises.</li>
                <li>Design of customized IAM solutions aligned with business processes and security objectives.</li>
                <li>Planning the deployment of an IAM platform with integration management and secure access.</li>
              </>
            ) : (
              <>
                <li>Évaluation de la maturité IAM (Identity & Access Management) chez TechCorp Enterprises.</li>
                <li>Conception de solutions IAM personnalisées alignées sur les processus métiers et les objectifs sécurité.</li>
                <li>Planification du déploiement d'une plateforme IAM avec gestion de l'intégration et des accès sécurisés.</li>
              </>
            )}
          </ul>
        </div>

        <div>
          <div className="mb-2">
            <div className="flex justify-between items-baseline flex-wrap gap-x-2">
              <h3 className="font-semibold">
                {isEn ? 'Full Stack Web Developer — Internship' : 'Développeur Web Full Stack — Stage'}
              </h3>
              <span className="text-sm text-gray-500 italic whitespace-nowrap">
                {isEn ? 'Apr–Jul 2025' : 'Avr–Juil 2025'}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              DABO Academy — {isEn ? 'France (remote)' : 'France (télétravail)'}
            </p>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 leading-relaxed mt-2">
            {isEn ? (
              <>
                <li>Development of a complete e-commerce platform: Django REST Framework APIs, Stripe integration, dashboards, training modules and blog.</li>
                <li>Implementation of authentication and access control systems (JWT, sessions, bcrypt hashing).</li>
                <li>Full autonomy in remote work with on-time delivery.</li>
              </>
            ) : (
              <>
                <li>Développement d'une plateforme e-commerce complète : APIs Django REST Framework, intégration Stripe, dashboards, modules formations et blog.</li>
                <li>Mise en place de systèmes d'authentication et contrôle d'accès sécurisés (JWT, sessions, hashing bcrypt).</li>
                <li>Autonomie totale en télétravail avec livraison dans les délais.</li>
              </>
            )}
          </ul>
        </div>

      </div>
    </section>
  )
}
