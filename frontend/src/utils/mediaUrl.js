/**
 * URLs médias Django renvoient souvent une URL absolue du backend.
 * Pour l’iframe PDF et les images, utiliser /media/... sur l’origine courante
 * (proxy Vite en dev, Nginx en prod) évite blocages navigateur / en-têtes.
 */
export function sameOriginMediaUrl(url) {
  if (!url) return null
  if (typeof url !== 'string') return url
  if (url.startsWith('/media/')) return url
  try {
    const u = new URL(url)
    if (u.pathname.startsWith('/media/')) {
      return `${u.pathname}${u.search}${u.hash}`
    }
  } catch {
    /* ignore */
  }
  return url
}
