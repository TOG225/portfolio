import { Link } from 'react-router-dom'
import SEO from '@/components/seo/SEO'

const SUGGESTIONS = [
  { to: '/',         label: 'Home',     desc: 'Retour à la page principale' },
  { to: '/projects', label: 'Projects', desc: 'Découvrir mes réalisations'  },
  { to: '/blog',     label: 'Writings', desc: 'Articles et veille sécu'     },
]

export default function NotFound() {
  return (
    <>
      <SEO title="Page introuvable" description="Cette page n'existe pas." />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">

        <p className="text-xs font-mono text-gray-400 mb-2">404</p>
        <h1 className="text-3xl font-bold mb-4">Page introuvable</h1>
        <p className="text-sm text-gray-600 mb-10 leading-relaxed">
          La page que vous cherchez a peut-être été déplacée ou n'existe pas.
        </p>

        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Vous cherchez peut-être…
        </p>
        <ul className="space-y-2 text-sm mb-10">
          {SUGGESTIONS.map(({ to, label, desc }) => (
            <li key={to}>
              <Link to={to} className="text-blue-600 hover:underline">{label}</Link>
              <span className="text-gray-400 ml-2">— {desc}</span>
            </li>
          ))}
        </ul>

        <Link to="/" className="text-sm text-blue-600 hover:underline">← Retourner à l'accueil</Link>
      </div>
    </>
  )
}
