import { useTranslation } from 'react-i18next'
import { useApi } from '@/hooks/useApi'

const POSITION_ICONS = { 1: '🥇', 2: '🥈', 3: '🥉' }

export default function CtfExperience() {
  const { t } = useTranslation()
  const { data, loading } = useApi('/ctf/events/', { page_size: 20 })
  const events = data?.results ?? []

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
      <h2 className="text-xl font-bold mb-6"> {t('ctf.title')}</h2>

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && events.length === 0 && (
        <p className="text-sm text-gray-500 italic">{t('ctf.no_events')}</p>
      )}

      {!loading && events.length > 0 && (
        <ul className="space-y-5">
          {events.map((event) => (
            <li key={event.id}>
              <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                <span className="text-lg">{POSITION_ICONS[event.position] ?? '🎯'}</span>
                <h3 className="font-semibold">
                  {event.event_url ? (
                    <a href={event.event_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {event.name}
                    </a>
                  ) : event.name}
                </h3>
                {event.position_display && (
                  <span className="text-sm text-gray-500">— {event.position_display}</span>
                )}
                <span className="text-xs text-gray-400 ml-auto">{event.year}</span>
              </div>

              {event.team_name && (
                <p className="text-sm text-gray-700 ml-7">
                  {t('ctf.with_team')} <strong>{event.team_name}</strong>
                  {event.category && <> · {event.category}</>}
                </p>
              )}

              {event.prize_amount && (
                <p className="text-sm text-gray-600 ml-7">
                  {t('ctf.prize')} : <strong>{event.prize_amount}</strong>
                </p>
              )}

              {event.description && (
                <p className="text-sm text-gray-500 ml-7 mt-1 italic">{event.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
