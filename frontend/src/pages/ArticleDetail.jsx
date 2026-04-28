import { useParams } from 'react-router-dom'

export default function ArticleDetail() {
  const { slug } = useParams()
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-2">Article : {slug}</h1>
      <p className="text-grey-text">Contenu de l'article — disponible à l'étape 6.</p>
    </div>
  )
}
