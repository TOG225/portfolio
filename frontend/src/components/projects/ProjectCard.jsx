import { Link } from 'react-router-dom'
import { Github, FileText, ArrowRight } from 'lucide-react'

function TechTag({ name }) {
  return (
    <span className="text-xs bg-blue-50 text-accent font-medium px-2 py-0.5 rounded">
      {name}
    </span>
  )
}

export default function ProjectCard({ project }) {
  const {
    title, slug, description_short, category,
    thumbnail, tech_stack = [],
    github_url, has_report, is_featured,
  } = project

  const initials = title
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase()

  const visibleStack = tech_stack.slice(0, 4)
  const extraStack   = tech_stack.length - 4

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden">

      {/* Thumbnail */}
      <div className="relative h-40 bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
        {thumbnail
          ? <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
          : <span className="text-white/30 text-5xl font-bold select-none">{initials}</span>
        }

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
          {is_featured && (
            <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
              ★
            </span>
          )}
          {category && (
            <span className="bg-white/90 backdrop-blur text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
              {category.name}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-bold text-primary text-base leading-snug">{title}</h3>

        <p className="text-sm text-grey-text line-clamp-2 flex-1 leading-relaxed">
          {description_short}
        </p>

        {/* Stack tags */}
        {visibleStack.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {visibleStack.map((t) => <TechTag key={t} name={t} />)}
            {extraStack > 0 && (
              <span className="text-xs text-gray-400 self-center">+{extraStack}</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-gray-50">
          <Link
            to={`/projects/${slug}`}
            className="flex-1 flex items-center justify-center gap-1 bg-primary text-white text-xs font-semibold py-2 rounded-lg hover:bg-accent transition-colors"
          >
            Voir détails <ArrowRight size={12} />
          </Link>
          {has_report && (
            <button
              title="Télécharger le rapport PDF"
              className="flex items-center gap-1 border border-accent text-accent text-xs font-semibold px-3 py-2 rounded-lg hover:bg-accent hover:text-white transition-colors"
            >
              <FileText size={12} /> PDF
            </button>
          )}
          {github_url && (
            <a
              href={github_url}
              target="_blank"
              rel="noreferrer"
              title="Voir sur GitHub"
              className="flex items-center px-3 py-2 border border-gray-200 text-grey-text rounded-lg hover:border-primary hover:text-primary transition-colors"
            >
              <Github size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
