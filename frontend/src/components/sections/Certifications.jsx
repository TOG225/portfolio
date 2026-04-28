import { useApi } from '@/hooks/useApi'

const FALLBACK_CERTS = [
  { id: 1,  name: 'Cisco Ethical Hacker',          issuer: 'Cisco'       },
  { id: 2,  name: 'Gestion de Projet',              issuer: ''            },
  { id: 3,  name: 'SecNum Académie',                issuer: 'ANSSI'       },
  { id: 4,  name: 'Networking Basics',              issuer: 'Cisco'       },
  { id: 5,  name: 'Intro to Cybersecurity',         issuer: 'Cisco'       },
  { id: 6,  name: 'Linux Essentials V2',            issuer: 'Cisco'       },
  { id: 7,  name: 'Support & Sécurité des Réseaux', issuer: 'Cisco'       },
  { id: 8,  name: 'Défense du Réseau',              issuer: 'Cisco'       },
  { id: 9,  name: 'Linux Commands',                 issuer: 'IBM/Coursera'},
  { id: 10, name: 'Shell Scripting',                issuer: 'Coursera'    },
]

export default function Certifications() {
  const { data, loading } = useApi('/certifications/certifications/', { page_size: 50 })
  const certifications = data?.results?.length > 0 ? data.results : FALLBACK_CERTS

  return (
    <section className="max-w-2xl mx-auto px-6 py-8 border-t border-gray-200">
      <h2 className="text-xl font-bold mb-6">Certifications</h2>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}

      {!loading && (
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          {certifications.map((c) => (
            <li key={c.id}>
              <span className="font-medium">{c.name}</span>
              {c.issuer && <span className="text-gray-500"> — {c.issuer}</span>}
              {c.credential_url && (
                <a
                  href={c.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-2 text-xs"
                >
                  (verify)
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
