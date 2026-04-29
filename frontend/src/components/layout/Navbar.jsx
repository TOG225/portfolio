import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { LanguageToggle } from './LanguageToggle'

const linkClass = ({ isActive }) =>
  `hover:underline transition-colors ${isActive ? 'font-semibold text-gray-900' : 'text-gray-600'}`

export default function Navbar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => { setIsOpen(false) }, [location])

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50" role="navigation">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="font-mono text-sm font-bold text-gray-900 hover:text-gray-700">
          0xGhislain
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6 text-sm items-center">
          <NavLink to="/" end className={linkClass}>{t('navbar.home')}</NavLink>
          <NavLink to="/projects" className={linkClass}>{t('navbar.projects')}</NavLink>
          <NavLink to="/blog" className={linkClass}>{t('navbar.blog')}</NavLink>
          <NavLink to="/ctf" className={linkClass}>{t('navbar.ctf')}</NavLink>
          <NavLink to="/contact" className={linkClass}>{t('navbar.contact')}</NavLink>
          <LanguageToggle />
        </div>

        {/* Mobile burger */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="text-gray-700 hover:text-gray-900"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 flex flex-col gap-3 text-sm">
            <NavLink to="/" end className={linkClass}>{t('navbar.home')}</NavLink>
            <NavLink to="/projects" className={linkClass}>{t('navbar.projects')}</NavLink>
            <NavLink to="/blog" className={linkClass}>{t('navbar.blog')}</NavLink>
            <NavLink to="/ctf" className={linkClass}>{t('navbar.ctf')}</NavLink>
            <NavLink to="/contact" className={linkClass}>{t('navbar.contact')}</NavLink>
          </div>
        </div>
      )}
    </nav>
  )
}
