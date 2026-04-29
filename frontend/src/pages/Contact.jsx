import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SEO from '@/components/seo/SEO'
import api from '@/api/client'

export default function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      await api.post('/contact/', formData)
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '', website: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err?.response?.data?.error || 'Erreur, réessayez plus tard.')
    }
  }

  return (
    <>
      <SEO
        title={`${t('contact.title')} — Ghislain Touré`}
        description="Contactez Ghislain Touré, étudiant ingénieur en cybersécurité."
        url="/contact"
      />
      <section className="max-w-2xl mx-auto px-6 pt-20 pb-12">
        <h1 className="text-3xl font-bold mb-6">{t('contact.title')}</h1>
        <p className="text-base text-gray-800 leading-relaxed mb-8">{t('contact.intro')}</p>

        <div className="mb-12">
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-semibold inline-block w-28 text-gray-700">{t('contact.email')}</span>
              <a href="mailto:o.ghislain@hestim.ma" className="text-blue-600 hover:underline">o.ghislain@hestim.ma</a>
            </li>
            <li>
              <span className="font-semibold inline-block w-28 text-gray-700">{t('contact.linkedin')}</span>
              <a href="https://linkedin.com/in/oklin-ghislain-toure" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">oklin-ghislain-toure</a>
            </li>
            <li>
              <span className="font-semibold inline-block w-28 text-gray-700">{t('contact.github')}</span>
              <a href="https://github.com/TOG225" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TOG225</a>
            </li>
            <li>
              <span className="font-semibold inline-block w-28 text-gray-700">{t('contact.location')}</span>
              <span className="text-gray-700">Casablanca, Maroc</span>
            </li>
          </ul>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold mb-4">{t('contact.form_title')}</h2>

          {status === 'success' && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800">
              {t('contact.form_success')}
            </div>
          )}

          {status === 'error' && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
              aria-hidden="true"
            />

            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                {t('contact.form_name')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={100}
                disabled={status === 'sending'}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                {t('contact.form_email')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status === 'sending'}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1">
                {t('contact.form_subject')}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                maxLength={200}
                disabled={status === 'sending'}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                {t('contact.form_message')} *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={5000}
                rows={6}
                disabled={status === 'sending'}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-y"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.message.length} / 5000</p>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-6 py-2 bg-blue-600 text-white rounded text-sm font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'sending' ? t('contact.form_sending') : t('contact.form_submit')}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
