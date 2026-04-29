import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApi } from '@/hooks/useApi'

function getInitials(title) {
  return title.split(' ').filter(w => w.length > 2).map(w => w[0]).slice(0, 3).join('').toUpperCase() || 'P'
}

export default function FeaturedProjects() {
  const { t } = useTranslation()
  const { data, loading } = useApi('/projects/projects/', { ordering: '-date_realized', page_size: 4 })
  const projects = data?.results || []

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
      <h2 className="text-xl font-bold mb-6">{t('projects.title')}</h2>

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && projects.length === 0 && (
        <p className="text-sm text-gray-500 italic">{t('projects.no_projects')}</p>
      )}

      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map(p => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              className="group flex gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-gray-50 transition-all"
            >
              {p.thumbnail ? (
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded flex-shrink-0"
                  loading="lazy"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white opacity-30 font-mono">
                    {getInitials(p.title)}
                  </span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                {p.category && (
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-mono truncate">
                    {p.category.name}
                  </p>
                )}
                <h3 className="font-semibold text-sm mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                  {p.description_short}
                </p>
                {p.tech_stack && p.tech_stack.length > 0 && (
                  <p className="text-xs text-gray-400 font-mono truncate">
                    {p.tech_stack.slice(0, 3).join(' · ')}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-6 text-sm">
        <Link to="/projects" className="text-blue-600 hover:underline">
          {t('projects.see_all')}
        </Link>
      </div>
    </section>
  )
}
