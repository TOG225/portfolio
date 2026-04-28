import SectionTitle from '@/components/ui/SectionTitle'

const STATS = [
  { value: '10+',  label: 'Projets réalisés' },
  { value: '10',   label: 'Certifications' },
  { value: '2 ans', label: 'Cycle ingénieur' },
]

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle subtitle="Qui suis-je ?">À propos</SectionTitle>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Bio */}
          <div className="space-y-4 text-grey-text leading-relaxed text-base">
            <p>
              Étudiant en deuxième année du cycle ingénieur en Informatique, IA &amp;
              Cybersécurité à{' '}
              <strong className="text-primary">HESTIM Casablanca</strong>, je me
              spécialise dans la sécurité offensive et la défense des systèmes
              d'information.
            </p>
            <p>
              Mon approche : combiner pentest, SOC et gouvernance NIST 2.0 pour
              comprendre les deux faces de la cybersécurité. Actuellement à la
              recherche d'un{' '}
              <strong className="text-primary">stage PFA</strong>.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-gray-50 border border-accent/20 rounded-xl p-5 text-center hover:border-accent/50 transition-colors"
              >
                <p className="text-3xl font-bold text-primary mb-1">{s.value}</p>
                <p className="text-xs text-grey-text leading-tight">{s.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
