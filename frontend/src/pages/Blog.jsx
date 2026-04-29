import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '@/components/seo/SEO'
import { useApi } from '@/hooks/useApi'

function formatDate(isoDate) {
  if (!isoDate) return ''
  return new Date(isoDate).toISOString().split('T')[0]
}

function getInitials(title) {
  return title.split(' ').filter(w => w.length > 2).map(w => w[0]).slice(0, 3).join('').toUpperCase() || 'A'
}

export default function Blog() {
  const { t } = useTranslation()
  const { data, loading } = useApi('/blog/articles/', { page_size: 50, ordering: '-published_at' })
  const articles = data?.results ?? []

  return (
    <>
      <SEO title={`${t('blog.title')} — Ghislain Touré`} description={t('blog.subtitle')} url="/blog" />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <h1 className="text-3xl font-bold mb-3">{t('blog.title')}</h1>
        <p className="text-sm text-gray-600 mb-8">{t('blog.subtitle')}</p>

        {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

        {!loading && articles.length === 0 && (
          <p className="text-sm text-gray-500 italic">{t('blog.no_articles')}</p>
        )}

        {!loading && articles.length > 0 && (
          <ul className="space-y-4">
            {articles.map(a => (
              <li key={a.slug}>
                <Link
                  to={`/blog/${a.slug}`}
                  className="flex gap-4 p-3 -mx-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {a.cover_image ? (
                    <img
                      src={a.cover_image}
                      alt={a.title}
                      className="w-20 h-20 object-cover rounded flex-shrink-0"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-white opacity-30 font-mono">
                        {getInitials(a.title)}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-gray-500 mb-1">{formatDate(a.published_at)}</p>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{a.title}</h3>
                    {a.excerpt && (
                      <p className="text-xs text-gray-600 line-clamp-2">{a.excerpt}</p>
                    )}
                    {a.reading_time > 0 && (
                      <p className="text-xs text-gray-400 mt-1">{a.reading_time} {t('blog.min_read')}</p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
