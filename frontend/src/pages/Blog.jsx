import { useState, useMemo } from 'react'
import { BookOpen } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import SectionTitle from '@/components/ui/SectionTitle'
import ArticleCard from '@/components/blog/ArticleCard'

export default function Blog() {
  const [activeTag, setActiveTag] = useState(null)

  const { data: tagsData } = useApi('/blog/tags/', { page_size: 50 })
  const tags = tagsData?.results ?? []

  const params = useMemo(() => {
    const p = { page_size: 50, ordering: '-published_at' }
    if (activeTag) p.tags = activeTag
    return p
  }, [activeTag])

  const { data, loading } = useApi('/blog/articles/', params)
  const articles = data?.results ?? []

  return (
    <div className="bg-white min-h-screen">

      {/* ── Header ──────────────────────────────────── */}
      <div className="bg-gradient-to-br from-primary via-[#243d6e] to-accent text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">Blog & Veille</h1>
          <p className="text-white/80 text-base max-w-xl mx-auto">
            Articles techniques, analyses de vulnérabilités et veille en cybersécurité.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* ── Tag filter bar ───────────────────────── */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            <button
              onClick={() => setActiveTag(null)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                activeTag === null
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-grey-text border-gray-200 hover:border-accent hover:text-accent'
              }`}
            >
              Tous
            </button>
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setActiveTag(activeTag === tag.slug ? null : tag.slug)}
                className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors"
                style={
                  activeTag === tag.slug
                    ? { backgroundColor: tag.color, color: '#fff', borderColor: tag.color }
                    : { backgroundColor: tag.color + '22', color: tag.color, borderColor: tag.color + '44' }
                }
              >
                {tag.name}
              </button>
            ))}
          </div>
        )}

        {/* ── Articles grid ────────────────────────── */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <BookOpen size={48} className="text-gray-200" />
            <p className="text-grey-text font-medium">
              {activeTag ? 'Aucun article pour ce tag.' : 'Aucun article publié pour le moment.'}
            </p>
            {activeTag && (
              <button
                onClick={() => setActiveTag(null)}
                className="text-sm text-accent hover:underline"
              >
                Voir tous les articles
              </button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
