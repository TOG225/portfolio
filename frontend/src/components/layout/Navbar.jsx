import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Download } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Accueil', to: '/',        end: true,  anchor: false },
  { label: 'Projets', to: '/projects', end: false, anchor: false },
  { label: 'Blog',    to: '/blog',     end: false, anchor: false },
  { label: 'Contact', to: '/#contact', end: false, anchor: true  },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'border-b border-gray-100'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary tracking-tight flex-shrink-0">
          GT.
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) =>
            l.anchor ? (
              <a
                key={l.label}
                href={l.to}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors pb-0.5 border-b-2 ${
                    isActive
                      ? 'text-accent border-accent'
                      : 'text-gray-600 border-transparent hover:text-primary hover:border-gray-300'
                  }`
                }
              >
                {l.label}
              </NavLink>
            )
          )}
        </div>

        {/* CTA + burger */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden md:flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-accent transition-colors"
          >
            <Download size={14} />
            CV
          </a>
          <button
            className="md:hidden p-1 text-gray-600 hover:text-primary"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((l) =>
            l.anchor ? (
              <a
                key={l.label}
                href={l.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-gray-700 py-1"
              >
                {l.label}
              </a>
            ) : (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium py-1 ${isActive ? 'text-accent' : 'text-gray-700'}`
                }
              >
                {l.label}
              </NavLink>
            )
          )}
          <a
            href="#"
            className="mt-1 flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-accent transition-colors"
          >
            <Download size={14} /> Télécharger CV
          </a>
        </div>
      )}
    </nav>
  )
}
