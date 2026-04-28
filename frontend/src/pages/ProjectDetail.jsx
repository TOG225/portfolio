import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
  const { slug } = useParams()
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-2">Projet : {slug}</h1>
      <p className="text-grey-text">Détail du projet — disponible à l'étape 6.</p>
    </div>
  )
}
