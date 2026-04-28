import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import client from '@/api/client'

export default function Home() {
  const [apiStatus, setApiStatus] = useState({ loading: true, count: null, error: null })

  useEffect(() => {
    client
      .get('/projects/projects/')
      .then((res) => setApiStatus({ loading: false, count: res.data.count, error: null }))
      .catch(() => setApiStatus({ loading: false, count: null, error: 'Impossible de joindre l\'API' }))
  }, [])

  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-primary text-white py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-3">
            Ghislain Touré
          </h1>
          <p className="text-xl text-blue-200 mb-1">Étudiant en Cybersécurité</p>
          <p className="text-blue-300 text-sm mb-10">HESTIM · Casablanca</p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="bg-white text-primary font-semibold px-6 py-3 rounded hover:bg-blue-50 transition-colors"
            >
              Télécharger le CV
            </a>
            <Link
              to="/projects"
              className="border border-white text-white font-semibold px-6 py-3 rounded hover:bg-white hover:text-primary transition-colors"
            >
              Voir les projets
            </Link>
            <a
              href="mailto:toureoklin2@gmail.com"
              className="border border-blue-300 text-blue-200 font-semibold px-6 py-3 rounded hover:border-white hover:text-white transition-colors"
            >
              Me contacter
            </a>
          </div>
        </div>
      </section>

      {/* ── API status banner ────────────────────────── */}
      <section className="py-3 px-4 text-center border-b border-gray-200">
        {apiStatus.loading && (
          <p className="text-sm text-gray-400">Connexion à l'API Django…</p>
        )}
        {!apiStatus.loading && apiStatus.error && (
          <p className="text-sm text-red-600 font-medium">
            ❌ {apiStatus.error}
          </p>
        )}
        {!apiStatus.loading && apiStatus.count !== null && (
          <p className="text-sm text-green-700 font-medium">
            ✅ API connectée — {apiStatus.count} projet{apiStatus.count !== 1 ? 's' : ''} en base
          </p>
        )}
      </section>

      {/* ── Placeholder ──────────────────────────────── */}
      <section className="py-20 px-4 text-center">
        <p className="text-lg font-medium text-gray-500">
          Portfolio en construction — bientôt disponible
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Prochaines sections : À propos · Compétences · Certifications · Contact
        </p>
      </section>

    </div>
  )
}
