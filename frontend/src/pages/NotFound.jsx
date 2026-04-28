import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-grey-text mb-8">Page introuvable</p>
      <Link
        to="/"
        className="bg-primary text-white font-semibold px-6 py-3 rounded hover:bg-accent transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  )
}
