import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '@/components/seo/SEO'
import { useApi } from '@/hooks/useApi'
import Pagination from '@/components/ui/Pagination'

function formatDate(isoDate) {
  if (!isoDate) return ''
  return new Date(isoDate).toISOString().split('T')[0]
}

function getInitials(title) {
  return title.split(' ').filter(w => w.length > 2).map(w => w[0]).slice(0, 3).join('').toUpperCase() || 'A'
}

export default function Blog() {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim())
      setPage(1)
    }, 350)
    return () => clearTimeout(timer)
  }, [searchInput])

  const params = useMemo(() => {
    const p = { page, page_size: pageSize, ordering: '-published_at' }
    if (debouncedSearch) p.search = debouncedSearch
    return p
  }, [page, pageSize, debouncedSearch])

  const { data, loading } = useApi('/blog/articles/', params)
  const articles = data?.results ?? []
  const count = data?.count ?? 0

  const clearSearch = () => { setSearchInput(''); setDebouncedSearch(''); setPage(1) }

  return (
    <>
      <SEO title={t('blog.title')} description={t('blog.subtitle')} url="/blog" />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <h1 className="text-3xl font-bold mb-3">{t('blog.title')}</h1>
        <p className="text-sm text-gray-600 mb-6">{t('blog.subtitle')}</p>

        {/* Barre de recherche */}
        <div className="relative mb-8">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder={t('blog.search_placeholder')}
            className="w-full pl-9 pr-9 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-blue-400 transition-colors"
          />
          {searchInput && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Effacer la recherche"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Info résultats de recherche */}
        {debouncedSearch && !loading && (
          <p className="text-xs text-gray-500 mb-4">
            {count === 0
              ? t('blog.search_no_results', { query: debouncedSearch })
              : t('blog.search_results', { count, query: debouncedSearch })}
          </p>
        )}

        {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

        {!loading && articles.length === 0 && !debouncedSearch && (
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

        <Pagination
          count={count}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1) }}
        />
      </section>
    </>
  )
}
