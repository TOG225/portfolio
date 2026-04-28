import { Link } from 'react-router-dom'
import { Download, ChevronDown, Linkedin } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary via-[#243d6e] to-[#1a3560] text-white min-h-[80vh] flex items-center">
      <div className="max-w-6xl mx-auto px-4 py-16 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* ── Gauche — texte ─────────────────────── */}
          <div>
            <span className="inline-block text-blue-300 text-sm font-medium tracking-widest uppercase mb-5">
              Étudiant Ingénieur · 2ᵉ année
            </span>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-3">
              Ghislain Touré
            </h1>

            <p className="text-[#5B9BD5] text-xl font-semibold mb-5">
              Pentest · SOC Analyst · NIST 2.0
            </p>

            <p className="text-blue-100 text-base leading-relaxed mb-8 max-w-md">
              Je transforme les vulnérabilités en apprentissages et les architectures
              en défenses solides.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="flex items-center gap-2 bg-white text-primary font-semibold px-5 py-3 rounded-lg hover:bg-blue-50 transition-colors text-sm"
              >
                <Download size={15} />
                Télécharger CV
              </a>
              <Link
                to="/projects"
                className="flex items-center gap-2 border border-white/60 text-white font-semibold px-5 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors text-sm"
              >
                Mes projets
                <ChevronDown size={15} />
              </Link>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-blue-400/60 text-blue-200 font-semibold px-5 py-3 rounded-lg hover:border-white hover:text-white transition-colors text-sm"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
            </div>
          </div>

          {/* ── Droite — avatar placeholder ────────── */}
          <div className="flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-accent to-[#4a9fd8] flex items-center justify-center shadow-2xl border-4 border-white/10 select-none">
                 <img
  src="C:\Users\dell\projets\portfolio\frontend\public\photo.png"
  alt="Ghislain Touré"
  className="w-80 h-80 rounded-full object-cover shadow-xl"
/>          
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
