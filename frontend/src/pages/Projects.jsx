import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '@/components/seo/SEO'
import { useApi } from '@/hooks/useApi'

function getInitials(title) {
  return title.split(' ').filter(w => w.length > 2).map(w => w[0]).slice(0, 3).join('').toUpperCase() || 'P'
}

function ProjectCard({ project: p }) {
  return (
    <Link
      to={`/projects/${p.slug}`}
      className="group block border border-gray-200 rounded-lg overflow-hidden hover:border-blue-400 hover:shadow-md transition-all"
    >
      {p.thumbnail ? (
        <div className="aspect-video w-full bg-gray-100 overflow-hidden">
          <img
            src={p.thumbnail}
            alt={p.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
          <span className="text-3xl font-bold text-white opacity-30 font-mono">
            {getInitials(p.title)}
          </span>
        </div>
      )}
      <div className="p-4">
        {p.category && (
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">{p.category.name}</p>
        )}
        <h3 className="font-semibold text-base mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {p.title}
        </h3>
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{p.description_short}</p>
        {p.tech_stack && p.tech_stack.length > 0 && (
          <p className="text-xs text-gray-500 font-mono truncate">
            {p.tech_stack.slice(0, 4).join(' · ')}
          </p>
        )}
      </div>
    </Link>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  const [tab, setTab] = useState('academic')

  const params = useMemo(() => ({ project_type: tab, page_size: 50 }), [tab])
  const { data, loading } = useApi('/projects/projects/', params)
  const projects = useMemo(() => data?.results ?? [], [data])

  const grouped = useMemo(() => {
    if (tab !== 'academic') return null
    return projects.reduce((acc, p) => {
      const cat = p.category?.name ?? 'Autres'
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(p)
      return acc
    }, {})
  }, [projects, tab])

  return (
    <>
      <SEO
        title={`${t('projects.title')} — Ghislain Touré`}
        description="Projets cybersécurité académiques et personnels : pentest, SOC, MISP, forensique."
        url="/projects"
      />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <h1 className="text-3xl font-bold mb-6">{t('projects.title')}</h1>

        <div className="text-sm mb-8">
          <button
            onClick={() => setTab('academic')}
            className={tab === 'academic' ? 'font-semibold text-gray-900' : 'text-gray-600 hover:underline'}
          >
            {t('projects.tab_academic')}
          </button>
          <span className="mx-3 text-gray-300">·</span>
          <button
            onClick={() => setTab('personal')}
            className={tab === 'personal' ? 'font-semibold text-gray-900' : 'text-gray-600 hover:underline'}
          >
            {t('projects.tab_personal')}
          </button>
        </div>

        {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

        {!loading && projects.length === 0 && (
          <p className="text-sm text-gray-500 italic">{t('projects.no_projects')}</p>
        )}

        {!loading && tab === 'academic' && grouped && Object.keys(grouped).length > 0 && (
          <div className="space-y-12">
            {Object.entries(grouped).map(([catName, catProjects]) => (
              <div key={catName}>
                <h2 className="text-base font-bold uppercase tracking-wider text-gray-700 mb-4">
                  {catName}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catProjects.map(p => <ProjectCard key={p.slug} project={p} />)}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && tab === 'personal' && projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(p => <ProjectCard key={p.slug} project={p} />)}
          </div>
        )}
      </section>
    </>
  )
}
