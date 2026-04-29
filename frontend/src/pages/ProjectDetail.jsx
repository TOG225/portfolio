import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApi } from '@/hooks/useApi'
import SEO from '@/components/seo/SEO'
import MarkdownRenderer from '@/components/ui/MarkdownRenderer'
import { Github, ExternalLink, Download } from 'lucide-react'

function getInitials(title) {
  return title.split(' ').filter(w => w.length > 2).map(w => w[0]).slice(0, 3).join('').toUpperCase() || 'P'
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const { data: project, loading, error } = useApi(`/projects/projects/${slug}/`)
  const isEn = i18n.language?.startsWith('en')
  const lastTab = localStorage.getItem('projects_last_tab') || 'academic'
  const backUrl = `/projects?tab=${lastTab}`

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-gray-500">{t('common.loading')}</p>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to={backUrl} className="text-blue-600 hover:underline text-sm">
          ← {isEn ? 'Back to projects' : 'Retour aux projets'}
        </Link>
        <p className="mt-4 text-gray-700">
          {isEn ? 'Project not found.' : 'Projet introuvable.'}
        </p>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={project.title}
        description={project.description_short}
        image={project.thumbnail}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <Link to="/projects" className="text-blue-600 hover:underline text-sm inline-block mb-6">
          ← {isEn ? 'Back to projects' : 'Retour aux projets'}
        </Link>

        {/* Cover image */}
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full aspect-video object-cover rounded-lg mb-8"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-video bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-6xl font-bold text-white opacity-30 font-mono">
              {getInitials(project.title)}
            </span>
          </div>
        )}

        {/* Title + meta */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{project.title}</h1>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 font-mono mb-6">
          {project.category && <span>{project.category.name}</span>}
          {project.category && project.date_realized && <span>·</span>}
          {project.date_realized && <span>{project.date_realized}</span>}
          {project.project_type && (
            <>
              <span>·</span>
              <span className="capitalize">
                {project.project_type === 'academic'
                  ? (isEn ? 'Academic' : 'Académique')
                  : (isEn ? 'Personal' : 'Personnel')}
              </span>
            </>
          )}
        </div>

        {/* Lead */}
        {project.description_short && (
          <p className="text-lg text-gray-700 mb-6 italic">{project.description_short}</p>
        )}

        {/* Tech stack */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="mb-8">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map(tech => (
                <span key={tech} className="text-xs font-mono px-2 py-1 bg-gray-100 text-gray-700 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-4 mb-8 text-sm">
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline">
              <Github size={16} /> GitHub
            </a>
          )}
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline">
              <ExternalLink size={16} /> {isEn ? 'Demo' : 'Démo'}
            </a>
          )}
          {project.report_pdf && (
            <a href={project.report_pdf} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline">
              <Download size={16} /> {isEn ? 'Download PDF' : 'Télécharger le PDF'}
            </a>
          )}
        </div>

        {/* Long description (Markdown) */}
        {project.description_long && (
          <div className="border-t border-gray-200 pt-8 mb-8">
            <MarkdownRenderer content={project.description_long} />
          </div>
        )}

        {/* PDF viewer pleine page */}
        {project.report_pdf && (
          <div className="border-t border-gray-200 pt-8 mt-8">
            <h2 className="text-xl font-bold mb-4">
              {isEn ? 'Full report' : 'Rapport complet'}
            </h2>
            <div className="w-full" style={{ height: '85vh' }}>
              <iframe
                src={project.report_pdf}
                title={`${project.title} - Report`}
                className="w-full h-full border border-gray-200 rounded-lg"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {isEn ? "PDF not displaying correctly? " : "Le PDF ne s'affiche pas correctement ? "}
              <a href={project.report_pdf} target="_blank" rel="noopener noreferrer"
                className="text-blue-600 hover:underline">
                {isEn ? 'Open in a new tab' : 'Ouvrir dans un nouvel onglet'}
              </a>
            </p>
          </div>
        )}

      </article>
    </>
  )
}
