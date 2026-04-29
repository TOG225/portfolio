import { useState } from 'react'
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

/**
 * URL utilisable dans <img src>.
 * En dev : si l’API renvoie http://localhost:8000/media/..., on utilise /media/... pour passer
 * par le proxy Vite (évite soucis cross-origin / réseau entre :5173 et :8000).
 */
function resolveMediaUrl(url) {
  if (!url) return null

  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      const parsed = new URL(url)
      if (import.meta.env.DEV && parsed.pathname.startsWith('/media/')) {
        return `${parsed.pathname}${parsed.search}${parsed.hash}`
      }
    } catch {
      /* ignore */
    }
    return url
  }

  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
  const origin = apiBase.replace(/\/api\/?$/, '')
  return `${origin}${url.startsWith('/') ? '' : '/'}${url}`
}

function CertificationBadge({ cert }) {
  const rawLogo =
    cert.logo_url ||
    (cert.logo && typeof cert.logo === 'string' ? cert.logo : null)
  const logoSrc = resolveMediaUrl(rawLogo)
  const [imgFailed, setImgFailed] = useState(false)

  if (logoSrc && !imgFailed) {
    return (
      <img
        key={logoSrc}
        src={logoSrc}
        alt=""
        className="w-10 h-10 mx-auto mb-2 object-contain"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
      />
    )
  }

  return <div className="text-3xl mb-2">{getEmoji(cert.issuer)}</div>
}

export default function Certifications() {
  const { t } = useTranslation()
  const { data, loading } = useApi('/certifications/certifications/', { page_size: 50 })
  const certs = (data?.results && data.results.length > 0) ? data.results : FALLBACK_CERTS

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
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
                <CertificationBadge cert={cert} />
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
