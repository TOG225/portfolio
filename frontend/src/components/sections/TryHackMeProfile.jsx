import { useTranslation } from 'react-i18next'
import { useApi } from '@/hooks/useApi'

const PLATFORM_INFO = {
  tryhackme:   { name: 'TryHackMe',               icon: '🎯' },
  hackthebox:  { name: 'HackTheBox',               icon: '⬢'  },
  rootme:      { name: 'Root-Me',                  icon: '🇫🇷' },
  portswigger: { name: 'PortSwigger Web Security', icon: '🕷️' },
  vulnhub:     { name: 'VulnHub',                  icon: '💾' },
  pwncollege:  { name: 'pwn.college',              icon: '🎓' },
}

export default function TryHackMeProfile() {
  const { t } = useTranslation()
  const { data, loading } = useApi('/ctf/platforms/')
  const platforms = data?.results ?? []

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
      <h2 className="text-xl font-bold mb-6">{t('ctf.platforms_title')}</h2>

      {loading && <p className="text-sm text-gray-500">{t('common.loading')}</p>}

      {!loading && platforms.length === 0 && (
        <p className="text-sm text-gray-500 italic">{t('ctf.no_events')}</p>
      )}

      {!loading && platforms.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {platforms.map((p) => {
            const info = PLATFORM_INFO[p.platform] ?? { name: p.platform_display, icon: '🎮' }
            return (
              <a
                key={p.id}
                href={p.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{info.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900">{info.name}</div>
                    <div className="text-xs text-gray-500 truncate">@{p.username}</div>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                      {p.rank && <span className="text-gray-700 font-medium">{p.rank}</span>}
                      {p.rooms_completed > 0 && <span className="text-gray-500">{p.rooms_completed} rooms</span>}
                      {p.streak_days > 0 && <span className="text-gray-500">🔥 {p.streak_days}j</span>}
                      {p.points > 0 && <span className="text-gray-500">{p.points} pts</span>}
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      )}
    </section>
  )
}
