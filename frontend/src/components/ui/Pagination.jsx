const PAGE_SIZES = [5, 10, 15, 20]

function getPageNumbers(page, totalPages) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
  if (page <= 4) return [1, 2, 3, 4, 5, '...', totalPages]
  if (page >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  return [1, '...', page - 1, page, page + 1, '...', totalPages]
}

export default function Pagination({ count, page, pageSize, onPageChange, onPageSizeChange }) {
  const totalPages = Math.ceil(count / pageSize)
  if (!count || totalPages <= 0) return null

  const pageNumbers = getPageNumbers(page, totalPages)

  return (
    <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">

      {/* Sélecteur nombre par page + total */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Afficher :</span>
          <div className="flex gap-1">
            {PAGE_SIZES.map(size => (
              <button
                key={size}
                onClick={() => { onPageSizeChange(size); onPageChange(1) }}
                className={`w-9 py-1 rounded border text-xs font-medium transition-colors ${
                  pageSize === size
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <span className="text-xs text-gray-500">
          {count} résultat{count > 1 ? 's' : ''}
          {totalPages > 1 && ` · page ${page}/${totalPages}`}
        </span>
      </div>

      {/* Navigation pages */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="px-3 py-1.5 rounded border border-gray-300 text-xs text-gray-600 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ←
          </button>

          {pageNumbers.map((p, i) =>
            p === '...' ? (
              <span key={`e${i}`} className="px-2 py-1.5 text-xs text-gray-400">…</span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-8 py-1.5 rounded border text-xs font-medium transition-colors ${
                  page === p
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700'
                }`}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="px-3 py-1.5 rounded border border-gray-300 text-xs text-gray-600 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}
