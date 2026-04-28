import { useApi } from '@/hooks/useApi'

export default function Skills() {
  const { data, loading } = useApi('/skills/skill-categories/', { page_size: 20 })
  const categories = data?.results ?? []

  return (
    <section className="max-w-2xl mx-auto px-6 py-8 border-t border-gray-200">
      <h2 className="text-xl font-bold mb-6">Skills</h2>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {!loading && categories.length === 0 && (
        <p className="text-sm text-gray-500 italic">No skills yet.</p>
      )}
      {!loading && categories.length > 0 && (
        <div className="space-y-2 text-sm">
          {categories.map((cat) => {
            const skills = cat.skills ?? []
            if (skills.length === 0) return null
            return (
              <div key={cat.id}>
                <span className="font-semibold">{cat.name} : </span>
                <span className="text-gray-700">{skills.map((s) => s.name).join(', ')}</span>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
