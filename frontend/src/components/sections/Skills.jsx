import { useApi } from '@/hooks/useApi'
import SectionTitle from '@/components/ui/SectionTitle'
import Spinner from '@/components/ui/Spinner'

export default function Skills() {
  const { data, loading, error } = useApi('/skills/skill-categories/', { page_size: 20 })
  const categories = data?.results ?? []

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle subtitle="Technologies & outils maîtrisés">Compétences</SectionTitle>

        {loading && <Spinner />}
        {error  && <p className="text-red-500 text-sm">{error}</p>}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 gap-5">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Category header */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <h3 className="font-semibold text-primary text-sm uppercase tracking-wide">
                    {cat.name}
                  </h3>
                </div>

                {/* Skills */}
                {cat.skills.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">À venir</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="text-xs font-medium px-3 py-1 rounded-full text-primary"
                        style={{ backgroundColor: cat.color + '33' }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
