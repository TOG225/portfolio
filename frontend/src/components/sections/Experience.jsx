import { useTranslation } from 'react-i18next'

export default function Experience() {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language?.startsWith('en')

  return (
    <section className="max-w-2xl mx-auto px-6 py-8 border-t border-gray-200">
      <h2 className="text-xl font-bold mb-6">{t('experience.title')}</h2>

      <div className="space-y-8">

        <div>
          <div className="flex justify-between items-baseline mb-1 flex-wrap gap-x-2">
            <h3 className="font-semibold">Cybersecurity IAM Developer</h3>
            <span className="text-sm text-gray-500 italic whitespace-nowrap">2026</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
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
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 leading-relaxed">
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
          <div className="flex justify-between items-baseline mb-1 flex-wrap gap-x-2">
            <h3 className="font-semibold">
              {isEn ? 'Full Stack Web Developer — Internship' : 'Développeur Web Full Stack — Stage'}
            </h3>
            <span className="text-sm text-gray-500 italic whitespace-nowrap">
              {isEn ? 'Apr–Jul 2025' : 'Avr–Juil 2025'}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            DABO Academy — {isEn ? 'France (remote)' : 'France (télétravail)'}
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 leading-relaxed">
            {isEn ? (
              <>
                <li>Development of a complete e-commerce platform: Stripe integration, dashboards, training modules and blog.</li>
                <li>Implementation of authentication and access control systems (JWT, sessions, bcrypt hashing).</li>
                <li>Full autonomy in remote work with on-time delivery.</li>
              </>
            ) : (
              <>
                <li>Développement d'une plateforme e-commerce complète : intégration Stripe, dashboards, modules formations et blog.</li>
                <li>Mise en place de systèmes d'authentification et contrôle d'accès sécurisés (JWT, sessions, hashing bcrypt).</li>
                <li>Autonomie totale en télétravail avec livraison dans les délais.</li>
              </>
            )}
          </ul>
        </div>

      </div>
    </section>
  )
}
