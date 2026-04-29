import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApi } from '@/hooks/useApi'
import SEO from '@/components/seo/SEO'
import MarkdownRenderer from '@/components/ui/MarkdownRenderer'
import client from '@/api/client'

const formatDate = (iso) => {
  if (!iso) return ''
  return new Date(iso).toISOString().split('T')[0]
}

function CommentForm({ slug }) {
  const { t } = useTranslation()
  const [form, setForm] = useState({ author_name: '', author_email: '', content: '' })
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.author_name.trim() || !form.content.trim()) return
    setSubmitting(true)
    setStatus(null)
    try {
      await client.post(`/blog/articles/${slug}/comments/`, form)
      setStatus('success')
      setForm({ author_name: '', author_email: '', content: '' })
    } catch {
      setStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  if (status === 'success') {
    return (
      <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200 text-sm text-green-800">
        {t('blog.comment_sent')}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          name="author_name"
          value={form.author_name}
          onChange={handleChange}
          placeholder={t('blog.comment_name')}
          required
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
        />
        <input
          name="author_email"
          value={form.author_email}
          onChange={handleChange}
          placeholder={t('blog.comment_email')}
          type="email"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
        />
      </div>
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder={t('blog.comment_placeholder')}
        required
        rows={4}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 resize-none"
      />
      {status === 'error' && (
        <p className="text-xs text-red-600">{t('blog.comment_error')}</p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="px-5 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
      >
        {submitting ? t('common.loading') : t('blog.comment_submit')}
      </button>
    </form>
  )
}

function CommentsSection({ slug }) {
  const { t } = useTranslation()
  const { data: comments, loading } = useApi(`/blog/articles/${slug}/comments/`)

  return (
    <div className="mt-16 border-t border-gray-200 pt-10">
      <h2 className="text-lg font-bold mb-6">{t('blog.comments_title')}</h2>

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && (!comments || comments.length === 0) && (
        <p className="text-sm text-gray-500 italic mb-6">{t('blog.no_comments')}</p>
      )}

      {!loading && comments && comments.length > 0 && (
        <ul className="space-y-4 mb-8">
          {comments.map(c => (
            <li key={c.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <span className="font-semibold text-sm">{c.author_name}</span>
                <span className="text-xs text-gray-400 font-mono">{formatDate(c.created_at)}</span>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{c.content}</p>
            </li>
          ))}
        </ul>
      )}

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">{t('blog.leave_comment')}</h3>
        <p className="text-xs text-gray-500 mb-1">{t('blog.comment_moderation')}</p>
        <CommentForm slug={slug} />
      </div>
    </div>
  )
}

function RelatedArticles({ currentSlug }) {
  const { t } = useTranslation()
  const { data } = useApi('/blog/articles/', { page_size: 5, ordering: '-published_at' })
  const related = (data?.results ?? []).filter(a => a.slug !== currentSlug).slice(0, 3)

  if (related.length === 0) return null

  return (
    <div className="mt-12 border-t border-gray-200 pt-10">
      <h2 className="text-lg font-bold mb-5">{t('blog.related_title')}</h2>
      <ul className="space-y-3">
        {related.map(a => (
          <li key={a.slug}>
            <Link
              to={`/blog/${a.slug}`}
              className="flex gap-3 p-3 -mx-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              {a.cover_image ? (
                <img
                  src={a.cover_image}
                  alt={a.title}
                  className="w-16 h-16 object-cover rounded flex-shrink-0"
                  loading="lazy"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-gray-400 mb-1">{formatDate(a.published_at)}</p>
                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">{a.title}</h3>
                {a.reading_time > 0 && (
                  <p className="text-xs text-gray-400 mt-0.5">{a.reading_time} {t('blog.min_read')}</p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ArticleDetail() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const { data: article, loading, error } = useApi(`/blog/articles/${slug}/`)

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <p className="text-sm text-gray-500">{t('common.loading')}</p>
      </div>
    )
  }

  if (error || !article) {
    return (
      <>
        <SEO title="Article not found" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <p className="text-sm text-gray-700 mb-4">Article not found.</p>
          <Link to="/blog" className="text-blue-600 hover:underline text-sm">{t('blog.back')}</Link>
        </div>
      </>
    )
  }

  const { title, excerpt, content, cover_image, reading_time, published_at } = article

  const metaParts = [
    published_at ? formatDate(published_at) : null,
    reading_time > 0 ? `${reading_time} ${t('blog.min_read')}` : null,
  ].filter(Boolean)

  return (
    <>
      <SEO
        title={title}
        description={excerpt}
        url={`/blog/${slug}`}
        type="article"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">

        <Link to="/blog" className="text-sm text-blue-600 hover:underline block mb-8">
          {t('blog.back')}
        </Link>

        {cover_image && (
          <img
            src={cover_image}
            alt={title}
            className="w-full aspect-video object-cover rounded-lg mb-6"
            loading="lazy"
          />
        )}

        <h1 className="text-2xl font-bold mb-2">{title}</h1>

        {metaParts.length > 0 && (
          <p className="font-mono text-sm text-gray-500 mb-8">{metaParts.join(' · ')}</p>
        )}

        {content ? (
          <article>
            <MarkdownRenderer content={content} />
          </article>
        ) : (
          <p className="text-sm text-gray-500 italic">Content not available.</p>
        )}

        <RelatedArticles currentSlug={slug} />
        <CommentsSection slug={slug} />
      </div>
    </>
  )
}
