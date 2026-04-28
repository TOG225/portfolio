import { Link } from 'react-router-dom'
import { useApi } from '@/hooks/useApi'

const formatDate = (iso) => {
  if (!iso) return ''
  return new Date(iso).toISOString().split('T')[0]
}

export default function Writings() {
  const { data, loading } = useApi('/blog/articles/', { page_size: 10, ordering: '-published_at' })
  const articles = data?.results ?? []

  return (
    <section className="max-w-2xl mx-auto px-6 py-8 border-t border-gray-200">
      <h2 className="text-xl font-bold mb-6">Writings</h2>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {!loading && articles.length === 0 && (
        <p className="text-sm text-gray-500 italic">No writings yet.</p>
      )}
      {!loading && articles.length > 0 && (
        <ul className="space-y-2">
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
  )
}
