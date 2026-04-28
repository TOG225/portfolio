import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const components = {
  h1: ({ children })   => <h1 className="text-3xl font-bold text-primary mt-8 mb-4 border-b border-gray-200 pb-2">{children}</h1>,
  h2: ({ children })   => <h2 className="text-2xl font-bold text-primary mt-6 mb-3">{children}</h2>,
  h3: ({ children })   => <h3 className="text-xl font-semibold text-primary mt-5 mb-2">{children}</h3>,
  h4: ({ children })   => <h4 className="text-lg font-semibold text-primary mt-4 mb-2">{children}</h4>,
  p:  ({ children })   => <p className="text-grey-text leading-relaxed mb-4">{children}</p>,
  ul: ({ children })   => <ul className="list-disc list-inside mb-4 space-y-1.5 text-grey-text ml-2">{children}</ul>,
  ol: ({ children })   => <ol className="list-decimal list-inside mb-4 space-y-1.5 text-grey-text ml-2">{children}</ol>,
  li: ({ children })   => <li className="leading-relaxed">{children}</li>,
  a:  ({ href, children }) => (
    <a href={href} className="text-accent hover:text-primary hover:underline transition-colors"
      target="_blank" rel="noreferrer">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
  em:     ({ children }) => <em className="italic text-grey-text">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent pl-4 py-1 bg-blue-50 rounded-r-lg mb-4 italic text-grey-text">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-900 text-green-300 p-4 rounded-xl overflow-x-auto mb-4 text-sm leading-relaxed font-mono">
      {children}
    </pre>
  ),
  code: ({ children, className }) => {
    if (className) {
      return <code className={`font-mono ${className}`}>{children}</code>
    }
    return (
      <code className="bg-gray-100 text-primary px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    )
  },
  img: ({ src, alt }) => (
    <img src={src} alt={alt ?? ''} className="max-w-full rounded-xl my-4 shadow-md" loading="lazy" />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="bg-gray-100 px-4 py-2 text-left font-semibold text-primary border border-gray-200">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 border border-gray-200 text-grey-text">{children}</td>
  ),
  hr: () => <hr className="border-gray-200 my-8" />,
}

export default function MarkdownRenderer({ content }) {
  if (!content) return null
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  )
}
