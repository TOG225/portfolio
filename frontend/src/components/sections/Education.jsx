export default function Education() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-8 border-t border-gray-200">
      <h2 className="text-xl font-bold mb-6">Education</h2>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-baseline mb-1 flex-wrap gap-x-2">
            <h3 className="font-semibold">HESTIM, Casablanca</h3>
            <span className="text-sm text-gray-500 italic whitespace-nowrap">2024–2027</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Cycle Ingénieur d'État — Informatique, IA & Cybersécurité.
            Cours principaux : Réseaux avancés, Pentest, Forensique,
            Cryptographie, Cyber Threat Intelligence, Gouvernance & Conformité.
          </p>
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-1 flex-wrap gap-x-2">
            <h3 className="font-semibold">HESTIM, Casablanca</h3>
            <span className="text-sm text-gray-500 italic whitespace-nowrap">2022–2024</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Classes Préparatoires Intégrées (Mathématiques, Physique, Informatique).
          </p>
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-1 flex-wrap gap-x-2">
            <h3 className="font-semibold">Baccalauréat Série D (Scientifique)</h3>
            <span className="text-sm text-gray-500 italic whitespace-nowrap">2020</span>
          </div>
        </div>
      </div>
    </section>
  )
}
