import { useState, useMemo } from 'react'
import { useApi } from '@/hooks/useApi'
import ProjectCard from '@/components/projects/ProjectCard'
import SectionTitle from '@/components/ui/SectionTitle'
import Spinner from '@/components/ui/Spinner'

/* ─────────────────────────────────────────────
   Sub-component: onglet Académiques
   Stratégie : 1 appel catégories + 1 appel projets academic,
   puis regroupement côté client.
───────────────────────────────────────────── */
function AcademicTab() {
  const { data: catData, loading: catLoading } = useApi('/projects/categories/', { page_size: 20 })
  const { data: projData, loading: projLoading } = useApi('/projects/projects/', {
    project_type: 'academic',
    page_size: 100,
  })

  const loading    = catLoading || projLoading
  const categories = catData?.results  ?? []
  const projects   = projData?.results ?? []

  const byCategory = useMemo(() => {
    const map = {}
    projects.forEach((p) => {
      const slug = p.category?.slug ?? '__none__'
      if (!map[slug]) map[slug] = []
      map[slug].push(p)
    })
    return map
  }, [projects])

  if (loading) return <Spinner />

  return (
    <div className="space-y-14">
      {categories.map((cat) => {
        const catProjects = byCategory[cat.slug] ?? []
        return (
          <div key={cat.id}>
            {/* Category header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-accent rounded-full" />
              <h2 className="text-lg font-bold text-primary uppercase tracking-wide">
                {cat.name}
              </h2>
              <span className="text-xs text-grey-text bg-gray-100 px-2.5 py-0.5 rounded-full">
                {catProjects.length} projet{catProjects.length !== 1 ? 's' : ''}
              </span>
            </div>

            {catProjects.length === 0 ? (
              <p className="text-sm text-gray-400 italic ml-4">
                Aucun projet pour l'instant
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Sub-component: onglet Personnels
───────────────────────────────────────────── */
function PersonalTab() {
  const { data, loading, error } = useApi('/projects/projects/', {
    project_type: 'personal',
    page_size: 100,
  })
  const projects = data?.results ?? []

  if (loading) return <Spinner />
  if (error)   return <p className="text-red-500 text-sm">{error}</p>

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 text-grey-text">
        <p className="text-5xl mb-4">🚀</p>
        <p className="text-xl font-semibold mb-2">Bientôt disponible</p>
        <p className="text-sm text-gray-400">Des projets personnels seront ajoutés prochainement.</p>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Page principale
───────────────────────────────────────────── */
const TABS = [
  { id: 'academic', label: '🎓 Académiques' },
  { id: 'personal', label: '🚀 Personnels'  },
]

export default function Projects() {
  const [activeTab, setActiveTab] = useState('academic')

  return (
    <div className="min-h-screen bg-white">

      {/* Page header */}
      <div className="bg-gray-50 border-b border-gray-200 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Mes réalisations académiques et personnelles">
            Projets
          </SectionTitle>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="max-w-6xl mx-auto flex gap-2 py-3">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-gray-100 text-grey-text hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {activeTab === 'academic' ? <AcademicTab /> : <PersonalTab />}
      </div>

    </div>
  )
}
