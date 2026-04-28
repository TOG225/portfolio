import { Link } from 'react-router-dom'
import { useApi } from '@/hooks/useApi'

export default function FeaturedProjects() {
  const { data, loading } = useApi('/projects/projects/', { is_featured: 'true', page_size: 10 })
  const projects = data?.results ?? []

  return (
    <section className="max-w-2xl mx-auto px-6 py-8 border-t border-gray-200">
      <h2 className="text-xl font-bold mb-6">Projects</h2>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}

      {!loading && projects.length === 0 && (
        <p className="text-sm text-gray-600">
          More projects on the{' '}
          <Link to="/projects" className="text-blue-600 hover:underline">projects page →</Link>
        </p>
      )}

      {!loading && projects.length > 0 && (
        <ul className="space-y-6">
          {projects.map((p) => (
            <li key={p.slug}>
              <h3 className="font-semibold mb-1">{p.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-1">{p.description_short}</p>
              {p.tech_stack && p.tech_stack.length > 0 && (
                <p className="text-xs text-gray-500 mb-2">Stack : {p.tech_stack.join(', ')}</p>
              )}
              <div className="text-sm space-x-3">
                <Link to={`/projects/${p.slug}`} className="text-blue-600 hover:underline">Read more →</Link>
                {p.has_report && p.report_pdf_url && (
                  <a href={p.report_pdf_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">PDF</a>
                )}
                {p.github_url && (
                  <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 text-sm">
        <Link to="/projects" className="text-blue-600 hover:underline">See all projects →</Link>
      </div>
    </section>
  )
}
