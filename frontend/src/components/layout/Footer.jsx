import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-gray-500 text-center">
        © 2026 0xL@toure 
      </div>
    </footer>
  )
}
