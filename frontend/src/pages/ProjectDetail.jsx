import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Github, FileText, Calendar, Tag, Star } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import MarkdownRenderer from '@/components/ui/MarkdownRenderer'
import PDFViewer from '@/components/ui/PDFViewer'

const TYPE_LABEL = { academic: 'Académique', personal: 'Personnel' }

export default function ProjectDetail() {
  const { slug } = useParams()
  const { data: project, loading, error } = useApi(`/projects/projects/${slug}/`)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-2xl font-bold text-primary mb-4">Projet introuvable</p>
        <Link to="/projects" className="text-accent hover:underline text-sm">
          ← Retour aux projets
        </Link>
      </div>
    )
  }

  const {
    title, description_short, description_long,
    category, project_type, tech_stack = [],
    is_featured, github_url, date_realized,
    thumbnail_url, has_report, report_pdf_url,
  } = project

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero banner ─────────────────────────────── */}
      <div className="bg-gradient-to-br from-primary via-[#243d6e] to-accent text-white py-16">
        <div className="max-w-5xl mx-auto px-4">

          {/* Breadcrumb */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={15} /> Tous les projets
          </Link>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {is_featured && (
              <span className="inline-flex items-center gap-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full">
                <Star size={11} fill="currentColor" /> En vedette
              </span>
            )}
            {category && (
              <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {category.name}
              </span>
            )}
            {project_type && (
              <span className="bg-white/10 text-white/80 text-xs font-medium px-2.5 py-1 rounded-full">
                {TYPE_LABEL[project_type] ?? project_type}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">{title}</h1>
          <p className="text-white/80 text-base max-w-2xl leading-relaxed">{description_short}</p>

          {/* Meta */}
          <div className="flex flex-wrap gap-5 mt-6 text-sm text-white/70">
            {date_realized && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {new Date(date_realized).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
              </span>
            )}
            {tech_stack.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Tag size={14} /> {tech_stack.join(', ')}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-8">
            {github_url && (
              <a
                href={github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Github size={16} /> Voir sur GitHub
              </a>
            )}
            {has_report && report_pdf_url && (
              <a
                href={report_pdf_url}
                download
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors border border-white/30"
              >
                <FileText size={16} /> Télécharger le rapport
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-12 grid lg:grid-cols-[1fr_280px] gap-10">

        {/* Main column */}
        <div>
          {/* Thumbnail */}
          {thumbnail_url && (
            <img
              src={thumbnail_url}
              alt={title}
              className="w-full rounded-xl shadow-md mb-8 object-cover max-h-64"
            />
          )}

          {/* Tech stack chips */}
          {tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {tech_stack.map((t) => (
                <span key={t} className="bg-blue-50 text-accent text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Long description */}
          {description_long ? (
            <article className="prose-custom">
              <MarkdownRenderer content={description_long} />
            </article>
          ) : (
            <p className="text-grey-text italic">Aucune description détaillée disponible.</p>
          )}

          {/* PDF report inline viewer */}
          {has_report && report_pdf_url && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <FileText size={20} /> Rapport du projet
              </h2>
              <PDFViewer pdfUrl={report_pdf_url} fileName={`rapport-${slug}.pdf`} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-4">Infos</h3>
            <dl className="space-y-3 text-sm">
              {category && (
                <div>
                  <dt className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">Catégorie</dt>
                  <dd className="text-grey-text font-medium">{category.name}</dd>
                </div>
              )}
              {project_type && (
                <div>
                  <dt className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">Type</dt>
                  <dd className="text-grey-text font-medium">{TYPE_LABEL[project_type] ?? project_type}</dd>
                </div>
              )}
              {date_realized && (
                <div>
                  <dt className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">Réalisé en</dt>
                  <dd className="text-grey-text font-medium">
                    {new Date(date_realized).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {(github_url || (has_report && report_pdf_url)) && (
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-4">Liens</h3>
              <div className="flex flex-col gap-2">
                {github_url && (
                  <a
                    href={github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-accent hover:text-primary font-medium transition-colors"
                  >
                    <Github size={15} /> GitHub
                  </a>
                )}
                {has_report && report_pdf_url && (
                  <a
                    href={report_pdf_url}
                    download
                    className="flex items-center gap-2 text-sm text-accent hover:text-primary font-medium transition-colors"
                  >
                    <FileText size={15} /> Rapport PDF
                  </a>
                )}
              </div>
            </div>
          )}

          <Link
            to="/projects"
            className="flex items-center gap-2 text-sm text-grey-text hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} /> Retour aux projets
          </Link>
        </aside>
      </div>
    </div>
  )
}
