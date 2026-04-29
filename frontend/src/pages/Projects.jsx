import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '@/components/seo/SEO'
import { useApi } from '@/hooks/useApi'
import Pagination from '@/components/ui/Pagination'

function getInitials(title) {
  return title.split(' ').filter(w => w.length > 2).map(w => w[0]).slice(0, 3).join('').toUpperCase() || 'P'
}

function ProjectCard({ project: p }) {
  return (
    <Link
      to={`/projects/${p.slug}`}
      className="flex gap-4 p-3 -mx-3 rounded-lg hover:bg-gray-50 transition-colors group"
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
        <div className="flex flex-wrap gap-x-2 text-xs text-gray-500 mb-1">
          {p.category && (
            <span className="font-mono uppercase tracking-wider">{p.category.name}</span>
          )}
          {p.category && p.date_realized && <span>·</span>}
          {p.date_realized && <span className="font-mono">{p.date_realized}</span>}
        </div>
        <h3 className="font-semibold text-sm sm:text-base mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {p.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2">{p.description_short}</p>
        {p.tech_stack && p.tech_stack.length > 0 && (
          <p className="text-xs text-gray-400 font-mono truncate">
            {p.tech_stack.slice(0, 5).join(' · ')}
          </p>
        )}
      </div>
    </Link>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'academic'
  const [activeCategory, setActiveCategory] = useState(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => { localStorage.setItem('projects_last_tab', tab) }, [tab])

  const params = useMemo(() => {
    if (activeCategory) return { project_type: tab, page_size: 50 }
    return { project_type: tab, page, page_size: pageSize }
  }, [tab, page, pageSize, activeCategory])

  const { data, loading } = useApi('/projects/projects/', params)
  const projects = useMemo(() => data?.results ?? [], [data])
  const count = data?.count ?? 0

  const categories = useMemo(() => {
    const seen = {}
    projects.forEach(p => { if (p.category) seen[p.category.name] = p.category })
    return Object.values(seen)
  }, [projects])

  const filtered = useMemo(() => {
    if (!activeCategory) return projects
    return projects.filter(p => p.category?.name === activeCategory)
  }, [projects, activeCategory])

  const grouped = useMemo(() => {
    if (activeCategory) return null
    return filtered.reduce((acc, p) => {
      const cat = p.category?.name ?? 'Autres'
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(p)
      return acc
    }, {})
  }, [filtered, activeCategory])

  const handleTabChange = (newTab) => {
    setSearchParams({ tab: newTab })
    setActiveCategory(null)
    setPage(1)
  }

  const handleCategoryChange = (catName) => {
    setActiveCategory(activeCategory === catName ? null : catName)
    setPage(1)
  }

  return (
    <>
      <SEO
        title={t('projects.title')}
        description="Projets cybersécurité académiques et personnels : pentest, SOC, MISP, forensique."
        url="/projects"
      />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <h1 className="text-3xl font-bold mb-6">{t('projects.title')}</h1>

        {/* Tabs */}
        <div className="text-sm mb-5">
          <button
            onClick={() => handleTabChange('academic')}
            className={tab === 'academic' ? 'font-semibold text-gray-900' : 'text-gray-600 hover:underline'}
          >
            {t('projects.tab_academic')}
          </button>
          <span className="mx-3 text-gray-300">·</span>
          <button
            onClick={() => handleTabChange('personal')}
            className={tab === 'personal' ? 'font-semibold text-gray-900' : 'text-gray-600 hover:underline'}
          >
            {t('projects.tab_personal')}
          </button>
        </div>

        {/* Filtres catégorie dynamiques */}
        {!loading && categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => { setActiveCategory(null); setPage(1) }}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                !activeCategory
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
            >
              Tous
            </button>
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => handleCategoryChange(cat.name)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  activeCategory === cat.name
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

        {!loading && filtered.length === 0 && (
          <p className="text-sm text-gray-500 italic">{t('projects.no_projects')}</p>
        )}

        {/* Groupé par catégorie (pas de filtre actif) */}
        {!loading && grouped && Object.keys(grouped).length > 0 && (
          <div className="space-y-10">
            {Object.entries(grouped).map(([catName, catProjects]) => (
              <div key={catName}>
                <h2 className="text-base font-bold uppercase tracking-wider text-gray-700 mb-3">
                  {catName}
                </h2>
                <ul className="space-y-1">
                  {catProjects.map(p => (
                    <li key={p.slug}><ProjectCard project={p} /></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Liste plate quand un filtre catégorie est actif */}
        {!loading && !grouped && filtered.length > 0 && (
          <ul className="space-y-1">
            {filtered.map(p => (
              <li key={p.slug}><ProjectCard project={p} /></li>
            ))}
          </ul>
        )}

        {/* Pagination — uniquement sans filtre catégorie actif */}
        {!activeCategory && (
          <Pagination
            count={count}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={(s) => { setPageSize(s); setPage(1) }}
          />
        )}
      </section>
    </>
  )
}
