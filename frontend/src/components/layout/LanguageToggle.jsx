import { useTranslation } from 'react-i18next'

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const current = i18n.language?.startsWith('fr') ? 'fr' : 'en'

  return (
    <div className="text-xs flex items-center gap-1">
      <button
        onClick={() => i18n.changeLanguage('fr')}
        className={current === 'fr' ? 'font-bold text-gray-900' : 'text-gray-400 hover:text-gray-600'}
        aria-label="Français"
      >
        FR
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => i18n.changeLanguage('en')}
        className={current === 'en' ? 'font-bold text-gray-900' : 'text-gray-400 hover:text-gray-600'}
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}
