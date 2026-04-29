import SectionTitle from '@/components/ui/SectionTitle'
import FadeIn from '@/components/ui/FadeIn'

const STATS = [
  { value: '10+',  label: 'Projets réalisés' },
  { value: '10',   label: 'Certifications' },
  { value: '2 ans', label: 'Cycle ingénieur' },
]

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <FadeIn direction="up">
          <SectionTitle subtitle="Qui suis-je ?">À propos</SectionTitle>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Bio */}
          <FadeIn direction="left" delay={0.1}>
            <div className="space-y-4 text-grey-text leading-relaxed text-base">
              <p>
                Étudiant en cycle ingénieur en Informatique, IA &amp; Cybersécurité
                à <strong className="text-primary">HESTIM Casablanca</strong>, je me
                spécialise en sécurité offensive (pentest) et en analyse SOC.
              </p>
              <p>
                Mon approche combine pratique terrain sur{' '}
                <strong className="text-primary">TryHackMe</strong>, threat
                intelligence avec MISP, automatisation défensive (Ansible,
                Terraform) et gouvernance NIST 2.0.
              </p>
            </div>
          </FadeIn>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {STATS.map((s, i) => (
              <FadeIn key={s.label} direction="up" delay={0.15 + i * 0.08}>
                <div className="bg-gray-50 border border-accent/20 rounded-xl p-5 text-center hover:border-accent/50 hover:shadow-sm transition-all">
                  <p className="text-3xl font-bold text-primary mb-1">{s.value}</p>
                  <p className="text-xs text-grey-text leading-tight">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
