export default function Hero() {
  return (
    <section className="max-w-2xl mx-auto px-6 pt-20 pb-12">
      <h1 className="text-3xl font-bold mb-2">About Me</h1>
      <p className="text-lg font-mono text-gray-500 mb-6">0xGhislain</p>

      <p className="text-base text-gray-800 leading-relaxed mb-6">
        Étudiant en deuxième année du cycle ingénieur en Informatique, IA & Cybersécurité à HESTIM
        Casablanca. Orienté sécurité offensive (pentest) et SOC analyst, je m'intéresse
        particulièrement à la threat intelligence avec MISP, à l'automatisation d'infrastructures
        défensives (Ansible, Terraform) et aux frameworks de gouvernance NIST 2.0.
      </p>

      <p className="text-base text-gray-800 leading-relaxed mb-8">
        Actuellement à la recherche d'un stage PFA pour mettre en pratique ces compétences sur des
        projets concrets.
      </p>

      <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <a href="/cv.pdf" className="text-blue-600 hover:underline">→ CV</a>
        <span className="text-gray-300">·</span>
        <a href="https://github.com/TOG225" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
        <span className="text-gray-300">·</span>
        <a href="https://linkedin.com/in/oklin-ghislain-toure" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
        <span className="text-gray-300">·</span>
        <a href="mailto:o.ghislain@hestim.ma" className="text-blue-600 hover:underline">Email</a>
      </nav>
    </section>
  )
}
