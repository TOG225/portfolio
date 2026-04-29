import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageToggle } from './LanguageToggle'

const linkClass = ({ isActive }) =>
  `hover:underline transition-colors ${isActive ? 'font-semibold text-gray-900' : 'text-gray-600'}`

export default function Navbar() {
  const { t } = useTranslation()

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50" role="navigation">
      <div className="max-w-2xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="font-mono text-sm font-bold text-gray-900 hover:text-gray-700">
          0xGhislain
        </Link>
        <div className="flex gap-6 text-sm items-center">
          <NavLink to="/" end className={linkClass}>{t('navbar.home')}</NavLink>
          <NavLink to="/projects" className={linkClass}>{t('navbar.projects')}</NavLink>
          <NavLink to="/blog" className={linkClass}>{t('navbar.blog')}</NavLink>
          <NavLink to="/ctf" className={linkClass}>{t('navbar.ctf')}</NavLink>
          <NavLink to="/contact" className={linkClass}>{t('navbar.contact')}</NavLink>
          <LanguageToggle />
        </div>
      </div>
    </nav>
  )
}
