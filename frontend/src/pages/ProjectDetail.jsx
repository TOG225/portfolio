import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApi } from '@/hooks/useApi'
import SEO from '@/components/seo/SEO'
import MarkdownRenderer from '@/components/ui/MarkdownRenderer'
import PDFViewer from '@/components/ui/PDFViewer'

const formatDate = (str) => {
  if (!str) return ''
  return new Date(str).toISOString().split('T')[0]
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const { data: project, loading, error } = useApi(`/projects/projects/${slug}/`)

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-6 pt-20">
        <p className="text-sm text-gray-500">{t('common.loading')}</p>
      </div>
    )
  }

  if (error || !project) {
    return (
      <>
        <SEO title="Project not found" />
        <div className="max-w-2xl mx-auto px-6 pt-20">
          <p className="text-sm text-gray-700 mb-4">Project not found.</p>
          <Link to="/projects" className="text-blue-600 hover:underline text-sm">{t('common.back')}</Link>
        </div>
      </>
    )
  }

  const {
    title, description_short, description_long,
    category, tech_stack = [],
    github_url, date_realized,
    has_report, report_pdf_url,
  } = project

  const metaParts = [
    category?.name,
    date_realized ? formatDate(date_realized) : null,
    tech_stack.length > 0 ? tech_stack.join(', ') : null,
  ].filter(Boolean)

  return (
    <>
      <SEO
        title={title}
        description={description_short}
        url={`/projects/${slug}`}
        type="article"
      />
      <div className="max-w-2xl mx-auto px-6 pt-16 pb-16">

        <Link to="/projects" className="text-sm text-blue-600 hover:underline block mb-8">
          {t('common.back')}
        </Link>

        <h1 className="text-2xl font-bold mb-2">{title}</h1>

        {metaParts.length > 0 && (
          <p className="text-sm text-gray-500 mb-6">{metaParts.join(' · ')}</p>
        )}

        {(github_url || (has_report && report_pdf_url)) && (
          <div className="text-sm mb-8 space-x-4">
            {github_url && (
              <a href={github_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                GitHub →
              </a>
            )}
            {has_report && report_pdf_url && (
              <a href={report_pdf_url} download className="text-blue-600 hover:underline">
                Download report
              </a>
            )}
          </div>
        )}

        {description_short && (
          <p className="text-base text-gray-800 leading-relaxed mb-8">{description_short}</p>
        )}

        {description_long && (
          <article className="mb-10">
            <MarkdownRenderer content={description_long} />
          </article>
        )}

        {has_report && report_pdf_url && (
          <div className="mt-10">
            <h2 className="text-base font-bold mb-4">Report</h2>
            <PDFViewer pdfUrl={report_pdf_url} fileName={`rapport-${slug}.pdf`} />
          </div>
        )}
      </div>
    </>
  )
}
