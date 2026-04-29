import { useTranslation } from 'react-i18next'
import { useApi } from '@/hooks/useApi'

const FALLBACK_CERTS = [
  { id: 1,  name: 'Ethical Hacker',    issuer: 'Cisco'        },
  { id: 2,  name: 'Gestion de Projet', issuer: ''             },
  { id: 3,  name: 'SecNum Académie',   issuer: 'ANSSI'        },
  { id: 4,  name: 'Networking Basics', issuer: 'Cisco'        },
  { id: 5,  name: 'Intro Cybersecurity', issuer: 'Cisco'      },
  { id: 6,  name: 'Linux Essentials',  issuer: 'Cisco'        },
  { id: 7,  name: 'Sécurité Réseaux',  issuer: 'Cisco'        },
  { id: 8,  name: 'Défense du Réseau', issuer: 'Cisco'        },
  { id: 9,  name: 'Linux Commands',    issuer: 'IBM/Coursera'  },
  { id: 10, name: 'Shell Scripting',   issuer: 'Coursera'     },
]

const ISSUER_EMOJI = {
  'Cisco':       '🌐',
  'IBM':         '💼',
  'IBM/Coursera':'💻',
  'ANSSI':       '🇫🇷',
  'ISC2':        '🔐',
  'Coursera':    '🎓',
}

function getEmoji(issuer) {
  return ISSUER_EMOJI[issuer] || '📜'
}

export default function Certifications() {
  const { t } = useTranslation()
  const { data, loading } = useApi('/certifications/certifications/', { page_size: 50 })
  const certs = (data?.results && data.results.length > 0) ? data.results : FALLBACK_CERTS

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
      <h2 className="text-xl font-bold mb-6">{t('certifications.title')}</h2>

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {certs.map(cert => {
            const Wrapper = cert.credential_url ? 'a' : 'div'
            const props = cert.credential_url
              ? { href: cert.credential_url, target: '_blank', rel: 'noopener noreferrer' }
              : {}
            return (
              <Wrapper
                key={cert.id}
                {...props}
                className="block border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-sm transition-all text-center"
              >
                <div className="text-3xl mb-2">{getEmoji(cert.issuer)}</div>
                <div className="text-xs font-semibold text-gray-900 leading-tight mb-1">{cert.name}</div>
                {cert.issuer && (
                  <div className="text-xs text-gray-500">{cert.issuer}</div>
                )}
              </Wrapper>
            )
          })}
        </div>
      )}
    </section>
  )
}
