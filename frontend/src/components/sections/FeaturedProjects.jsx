import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import SectionTitle from '@/components/ui/SectionTitle'
import ProjectCard from '@/components/projects/ProjectCard'

export default function FeaturedProjects() {
  const { data, loading } = useApi('/projects/projects/', {
    is_featured: 'true',
    page_size: 3,
  })
  const projects = data?.results ?? []

  if (loading || projects.length === 0) return null

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle subtitle="Sélection de mes meilleurs travaux">
          Projets en vedette
        </SectionTitle>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-accent font-semibold hover:text-primary transition-colors text-sm"
          >
            Voir tous les projets <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
