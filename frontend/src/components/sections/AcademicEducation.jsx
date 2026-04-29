import { useTranslation } from 'react-i18next'

export default function AcademicEducation() {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language?.startsWith('en')

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
      <h2 className="text-xl font-bold mb-6">{t('education.title')}</h2>

      <div className="space-y-6">

        <div>
          <div className="flex justify-between items-baseline mb-1 flex-wrap gap-x-2">
            <h3 className="font-semibold">HESTIM, Casablanca</h3>
            <span className="text-sm text-gray-500 italic whitespace-nowrap">2024–2027</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {isEn
              ? 'State Engineering Cycle — Computer Science, AI & Cybersecurity. Key courses: Advanced Networks, Pentest, Forensics, Cryptography, Cyber Threat Intelligence, Governance & Compliance.'
              : "Cycle Ingénieur d'État — Informatique, IA & Cybersécurité. Cours principaux : Réseaux avancés, Pentest, Forensique, Cryptographie, Cyber Threat Intelligence, Gouvernance & Conformité."
            }
          </p>
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-1 flex-wrap gap-x-2">
            <h3 className="font-semibold">HESTIM, Casablanca</h3>
            <span className="text-sm text-gray-500 italic whitespace-nowrap">2022–2024</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {isEn
              ? 'Integrated Preparatory Classes (Mathematics, Physics, Computer Science).'
              : 'Classes Préparatoires Intégrées (Mathématiques, Physique, Informatique).'
            }
          </p>
        </div>

        

      </div>
    </section>
  )
}
