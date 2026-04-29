import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApi } from '@/hooks/useApi'
import SEO from '@/components/seo/SEO'
import MarkdownRenderer from '@/components/ui/MarkdownRenderer'

const formatDate = (iso) => {
  if (!iso) return ''
  return new Date(iso).toISOString().split('T')[0]
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
      </div>
    </>
  )
}
