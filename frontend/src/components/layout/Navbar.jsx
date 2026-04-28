import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { to: '/',        label: 'Accueil', end: true },
  { to: '/projects', label: 'Projets' },
  { to: '/blog',    label: 'Blog' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        <Link to="/" className="text-2xl font-bold text-primary tracking-tight">
          GT.
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-accent' : 'text-gray-600 hover:text-primary'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href="#"
            className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded hover:bg-accent transition-colors"
          >
            CV ↓
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-gray-600 hover:text-primary"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm font-medium py-1 ${isActive ? 'text-accent' : 'text-gray-600'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a href="#" className="text-sm font-semibold text-primary">CV ↓</a>
        </div>
      )}
    </nav>
  )
}
