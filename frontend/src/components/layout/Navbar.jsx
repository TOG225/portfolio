import { Link, NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `hover:underline transition-colors ${isActive ? 'font-semibold text-gray-900' : 'text-gray-600'}`

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50" role="navigation" aria-label="Navigation principale">
      <div className="max-w-2xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="font-mono text-sm font-bold text-gray-900 hover:text-gray-700">
          0xGhislain
        </Link>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/projects" className={linkClass}>Projects</NavLink>
          <NavLink to="/blog" className={linkClass}>Writings</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </div>
      </div>
    </nav>
  )
}
