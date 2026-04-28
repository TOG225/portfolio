import { Award, ExternalLink } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import SectionTitle from '@/components/ui/SectionTitle'
import Spinner from '@/components/ui/Spinner'

const PLACEHOLDERS = [
  { id: 'p1', name: 'Cisco Ethical Hacker',               issuer: 'Cisco',        date: '2024' },
  { id: 'p2', name: 'CCNA: Introduction to Networks',      issuer: 'Cisco',        date: '2024' },
  { id: 'p3', name: 'Cybersecurity Analyst Professional',  issuer: 'IBM',          date: '2024' },
  { id: 'p4', name: 'Google Cybersecurity Certificate',    issuer: 'Google',       date: '2023' },
  { id: 'p5', name: 'SecNumacadémie',                      issuer: 'ANSSI',        date: '2023' },
  { id: 'p6', name: 'Practical Ethical Hacking',           issuer: 'TCM Security', date: '2024' },
  { id: 'p7', name: 'CompTIA Security+ (en cours)',         issuer: 'CompTIA',     date: '2025' },
]

function CertCard({ cert, isPlaceholder }) {
  return (
    <div className={`bg-white border rounded-xl p-5 flex flex-col items-center text-center gap-3 transition-shadow hover:shadow-md ${isPlaceholder ? 'border-gray-100 opacity-60' : 'border-gray-100'}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isPlaceholder ? 'bg-gray-50' : 'bg-accent/10'}`}>
        <Award size={22} className={isPlaceholder ? 'text-gray-300' : 'text-accent'} />
      </div>
      <div className="flex-1">
        <p className={`font-semibold text-sm leading-tight ${isPlaceholder ? 'text-gray-400' : 'text-primary'}`}>
          {cert.name}
        </p>
        <p className="text-xs text-grey-text italic mt-1">{cert.issuer}</p>
        <p className="text-xs text-gray-400 mt-1">{cert.date_obtained ?? cert.date}</p>
      </div>
      {cert.credential_url && (
        <a
          href={cert.credential_url}
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:text-primary transition-colors"
          title="Voir la certification"
        >
          <ExternalLink size={14} />
        </a>
      )}
    </div>
  )
}

export default function Certifications() {
  const { data, loading, error } = useApi('/certifications/certifications/', { page_size: 50 })
  const certs = data?.results ?? []
  const useReal = certs.length > 0
  const displayed = useReal ? certs : PLACEHOLDERS

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle subtitle="Certifications professionnelles et académiques">
          Certifications
        </SectionTitle>

        {loading && <Spinner />}
        {error   && <p className="text-red-500 text-sm">{error}</p>}

        {!loading && !error && (
          <>
            {!useReal && (
              <p className="text-xs text-gray-400 italic mb-6">
                Certifications en cours de saisie — aperçu prévu ci-dessous
              </p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {displayed.map((cert) => (
                <CertCard key={cert.id} cert={cert} isPlaceholder={!useReal} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
