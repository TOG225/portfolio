import { Link } from 'react-router-dom'
import SEO from '@/components/seo/SEO'
import { useApi } from '@/hooks/useApi'

const formatDate = (iso) => {
  if (!iso) return ''
  return new Date(iso).toISOString().split('T')[0]
}

export default function Blog() {
  const { data, loading } = useApi('/blog/articles/', { page_size: 50, ordering: '-published_at' })
  const articles = data?.results ?? []

  return (
    <>
      <SEO
        title="Writings — Ghislain Touré"
        description="Articles techniques cybersécurité : pentest, SOC, threat intelligence, forensique."
        url="/blog"
      />
      <section className="max-w-2xl mx-auto px-6 pt-20 pb-12">
        <h1 className="text-3xl font-bold mb-6">Writings</h1>
        <p className="text-sm text-gray-600 mb-8">
          Notes techniques, retours d'expérience et veille cybersécurité.
        </p>

        {loading && <p className="text-sm text-gray-500">Loading...</p>}
        {!loading && articles.length === 0 && (
          <p className="text-sm text-gray-500 italic">No writings yet.</p>
        )}
        {!loading && articles.length > 0 && (
          <ul className="space-y-3">
            {articles.map((a) => (
              <li key={a.slug} className="text-sm">
                <span className="font-mono text-gray-500">{formatDate(a.published_at)}</span>
                <span className="mx-2 text-gray-400">—</span>
                <Link to={`/blog/${a.slug}`} className="text-blue-600 hover:underline">{a.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
