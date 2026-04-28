import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, Linkedin } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import MarkdownRenderer from '@/components/ui/MarkdownRenderer'

const formatDate = (str) => {
  if (!str) return ''
  return new Date(str).toLocaleDateString('fr-FR', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export default function ArticleDetail() {
  const { slug } = useParams()
  const { data: article, loading, error } = useApi(`/blog/articles/${slug}/`)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-2xl font-bold text-primary mb-4">Article introuvable</p>
        <Link to="/blog" className="text-accent hover:underline text-sm">
          ← Retour au blog
        </Link>
      </div>
    )
  }

  const {
    title, excerpt, content, cover_image,
    tags = [], reading_time, published_at,
  } = article

  return (
    <div className="bg-white min-h-screen">

      {/* ── Cover ───────────────────────────────────── */}
      <div className="relative">
        {cover_image ? (
          <div className="h-64 sm:h-80 overflow-hidden">
            <img
              src={cover_image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
          </div>
        ) : (
          <div className="h-40 bg-gradient-to-br from-primary via-[#243d6e] to-accent" />
        )}
      </div>

      {/* ── Article ─────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-grey-text hover:text-primary text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={15} /> Retour au blog
        </Link>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: tag.color + '22', color: tag.color }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-primary leading-tight mb-4">
          {title}
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-grey-text text-base leading-relaxed mb-6 border-l-4 border-accent pl-4 italic">
            {excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400 mb-10 pb-6 border-b border-gray-100">
          {published_at && (
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {formatDate(published_at)}
            </span>
          )}
          {reading_time > 0 && (
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {reading_time} min de lecture
            </span>
          )}
        </div>

        {/* Content */}
        {content ? (
          <article>
            <MarkdownRenderer content={content} />
          </article>
        ) : (
          <p className="text-grey-text italic">Contenu non disponible.</p>
        )}

        {/* ── CTA LinkedIn ────────────────────────── */}
        <div className="mt-16 p-6 bg-blue-50 rounded-xl border border-blue-100 text-center">
          <p className="text-primary font-semibold mb-1">Cet article vous a été utile ?</p>
          <p className="text-grey-text text-sm mb-4">
            Connectez-vous sur LinkedIn pour échanger sur la cybersécurité.
          </p>
          <a
            href="https://www.linkedin.com/in/ghislain-toure"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#0077B5] text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#006097] transition-colors"
          >
            <Linkedin size={16} /> Me contacter sur LinkedIn
          </a>
        </div>

        {/* Back link bottom */}
        <div className="mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-grey-text hover:text-primary text-sm transition-colors"
          >
            <ArrowLeft size={15} /> Retour au blog
          </Link>
        </div>
      </div>
    </div>
  )
}
