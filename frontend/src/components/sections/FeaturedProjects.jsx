import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApi } from '@/hooks/useApi'

export default function FeaturedProjects() {
  const { t } = useTranslation()
  const { data: featuredData, loading: loadingFeatured } = useApi('/projects/projects/', { is_featured: 'true', page_size: 1 })
  const { data: allData, loading: loadingAll } = useApi('/projects/projects/', { page_size: 6 })

  const featured = featuredData?.results?.[0] || null
  const allProjects = (allData?.results || []).filter(p => p.id !== featured?.id).slice(0, 4)

  const initials = (title) =>
    title.split(' ').filter(w => w.length > 2).map(w => w[0]).slice(0, 3).join('').toUpperCase()

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
      <h2 className="text-xl font-bold mb-6">{t('projects.title')}</h2>

      {(loadingFeatured || loadingAll) && (
        <p className="text-sm text-gray-500">{t('common.loading')}</p>
      )}

      {!loadingFeatured && featured && (
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">
            ⭐ {t('projects.featured_title')}
          </p>
          <Link
            to={`/projects/${featured.slug}`}
            className="block border border-gray-200 rounded-lg overflow-hidden hover:border-blue-400 hover:shadow-md transition-all"
          >
            {featured.thumbnail ? (
              <div className="aspect-video w-full bg-gray-100 overflow-hidden">
                <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ) : (
              <div className="aspect-video w-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <span className="text-5xl font-bold text-white opacity-30 font-mono">
                  {initials(featured.title)}
                </span>
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-base mb-1">{featured.title}</h3>
              <p className="text-sm text-gray-700 mb-2 line-clamp-2">{featured.description_short}</p>
              {featured.tech_stack?.length > 0 && (
                <p className="text-xs text-gray-500 font-mono">
                  {featured.tech_stack.slice(0, 5).join(' · ')}
                </p>
              )}
            </div>
          </Link>
        </div>
      )}

      {!loadingAll && allProjects.length > 0 && (
        <>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">
            {t('projects.all_title')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allProjects.map(p => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className="block border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <h4 className="font-semibold text-sm mb-1">{p.title}</h4>
                <p className="text-xs text-gray-700 mb-2 line-clamp-2">{p.description_short}</p>
                {p.tech_stack?.length > 0 && (
                  <p className="text-xs text-gray-400 font-mono truncate">
                    {p.tech_stack.slice(0, 3).join(' · ')}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </>
      )}

      {!loadingFeatured && !loadingAll && !featured && allProjects.length === 0 && (
        <p className="text-sm text-gray-500 italic">{t('projects.no_projects')}</p>
      )}

      <div className="mt-6 text-sm">
        <Link to="/projects" className="text-blue-600 hover:underline">
          {t('projects.see_all')}
        </Link>
      </div>
    </section>
  )
}
