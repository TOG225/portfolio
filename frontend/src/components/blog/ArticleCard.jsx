import { Link } from 'react-router-dom'
import { Clock, BookOpen } from 'lucide-react'

const formatDate = (str) => {
  if (!str) return ''
  return new Date(str).toLocaleDateString('fr-FR', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export default function ArticleCard({ article }) {
  const {
    slug, title, excerpt, cover_image,
    tags = [], reading_time, published_at,
  } = article

  const visibleTags = tags.slice(0, 2)

  return (
    <Link
      to={`/blog/${slug}`}
      className="block bg-white rounded-xl border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200 overflow-hidden group"
    >
      {/* Cover */}
      <div className="relative h-44 bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
        {cover_image ? (
          <img src={cover_image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <BookOpen size={40} className="text-white/30" />
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3">

        {/* Tags */}
        {visibleTags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {visibleTags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: tag.color + '22', color: tag.color }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="font-bold text-primary text-base leading-snug group-hover:text-accent transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-grey-text line-clamp-3 leading-relaxed flex-1">
          {excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-400 pt-1 border-t border-gray-50">
          {published_at && (
            <span>{formatDate(published_at)}</span>
          )}
          {reading_time > 0 && (
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {reading_time} min
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
