import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'

const SOCIAL = [
  { icon: Linkedin, href: 'https://linkedin.com',      label: 'LinkedIn' },
  { icon: Github,   href: 'https://github.com/TOG225', label: 'GitHub'   },
  { icon: Mail,     href: 'mailto:o.ghislain@hestim.ma', label: 'Email'  },
  { icon: Phone,    href: 'tel:+212773125353',          label: 'Téléphone' },
]

const QUICK_LINKS = [
  { label: 'Projets', to: '/projects', anchor: false },
  { label: 'Blog',    to: '/blog',     anchor: false },
  { label: 'Contact', to: '/#contact', anchor: true  },
  { label: 'CV',      to: '#',         anchor: true  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t-4 border-accent mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">

        <div className="grid md:grid-cols-3 gap-10 mb-10">

          {/* Col 1 — Brand */}
          <div>
            <p className="text-2xl font-bold text-primary mb-2">GT.</p>
            <p className="text-sm text-grey-text mb-5 leading-relaxed">
              Étudiant Ingénieur Cybersécurité<br />HESTIM · Casablanca, Maroc
            </p>
            <div className="flex gap-3">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-accent hover:text-accent transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick links */}
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  {l.anchor ? (
                    <a href={l.to} className="text-sm text-grey-text hover:text-accent transition-colors">
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to} className="text-sm text-grey-text hover:text-accent transition-colors">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
              Contact
            </p>
            <ul className="space-y-2.5 text-sm text-grey-text">
              <li>📍 Casablanca, Maroc</li>
              <li>
                <a href="mailto:o.ghislain@hestim.ma" className="hover:text-accent transition-colors">
                  o.ghislain@hestim.ma
                </a>
              </li>
              <li>
                <a href="tel:+212773125353" className="hover:text-accent transition-colors">
                  +212 773 125 353
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-400">
            © 2026 Ghislain Touré · Construit avec React, Django &amp; 🤍
          </p>
        </div>

      </div>
    </footer>
  )
}
