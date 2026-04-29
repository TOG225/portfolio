import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '@/components/seo/SEO'
import { useApi } from '@/hooks/useApi'

function ProjectListItem({ project: p }) {
  const { t } = useTranslation()
  return (
    <li>
      <h3 className="font-semibold mb-1">{p.title}</h3>
      <p className="text-sm text-gray-700 leading-relaxed mb-1">{p.description_short}</p>
      {p.tech_stack && p.tech_stack.length > 0 && (
        <p className="text-xs text-gray-500 mb-2">Stack : {p.tech_stack.join(', ')}</p>
      )}
      <div className="text-sm space-x-3">
        <Link to={`/projects/${p.slug}`} className="text-blue-600 hover:underline">{t('projects.read_more')} →</Link>
        {p.has_report && p.report_pdf_url && (
          <a href={p.report_pdf_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">PDF</a>
        )}
        {p.github_url && (
          <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
        )}
      </div>
    </li>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  const [tab, setTab] = useState('academic')

  const params = useMemo(() => ({ project_type: tab, page_size: 50 }), [tab])
  const { data, loading } = useApi('/projects/projects/', params)
  const projects = data?.results ?? []

  const grouped = useMemo(() => {
    if (tab !== 'academic') return {}
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
      <section className="max-w-2xl mx-auto px-6 pt-20 pb-12">
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

        {!loading && tab === 'academic' && Object.keys(grouped).length > 0 && (
          <div className="space-y-10">
            {Object.entries(grouped).map(([catName, catProjects]) => (
              <div key={catName}>
                <h2 className="text-base font-bold uppercase tracking-wider text-gray-700 mb-4">
                  {catName}
                </h2>
                <ul className="space-y-6">
                  {catProjects.map((p) => <ProjectListItem key={p.slug} project={p} />)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {!loading && tab === 'personal' && projects.length > 0 && (
          <ul className="space-y-6">
            {projects.map((p) => <ProjectListItem key={p.slug} project={p} />)}
          </ul>
        )}
      </section>
    </>
  )
}
