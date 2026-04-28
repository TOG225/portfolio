import { Helmet } from 'react-helmet-async'

const SITE_NAME  = 'Ghislain Touré — Portfolio Cybersécurité'
const DEFAULT_DESC = 'Étudiant ingénieur en cybersécurité à HESTIM Casablanca, spécialisé en pentest, SOC et gouvernance NIST 2.0.'
const SITE_URL   = 'https://ghislain-toure.dev'

export default function SEO({ title, description, image, type = 'website', url, jsonLd }) {
  const fullTitle = title ? `${title} | Ghislain Touré` : SITE_NAME
  const desc      = description ?? DEFAULT_DESC
  const canonical = url ? `${SITE_URL}${url}` : SITE_URL
  const ogImage   = image ?? `${SITE_URL}/og-cover.png`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description"        content={desc} />
      <link rel="canonical"           href={canonical} />

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type"        content={type} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:locale"      content="fr_FR" />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image"       content={ogImage} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}
