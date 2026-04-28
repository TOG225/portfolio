import SEO from '@/components/seo/SEO'

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact — Ghislain Touré"
        description="Contactez Ghislain Touré, étudiant ingénieur en cybersécurité à HESTIM Casablanca."
        url="/contact"
      />
      <section className="max-w-2xl mx-auto px-6 pt-20 pb-12">
        <h1 className="text-3xl font-bold mb-6">Contact</h1>
        <p className="text-base text-gray-800 leading-relaxed mb-8">
          N'hésitez pas à me contacter pour toute opportunité de stage,
          collaboration technique, ou simplement pour discuter cybersécurité.
        </p>
        <ul className="space-y-3 text-sm">
          <li>
            <span className="font-semibold inline-block w-24">Email</span>
            <a href="mailto:o.ghislain@hestim.ma" className="text-blue-600 hover:underline">
              o.ghislain@hestim.ma
            </a>
          </li>
          <li>
            <span className="font-semibold inline-block w-24">LinkedIn</span>
            <a
              href="https://linkedin.com/in/oklin-ghislain-toure"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              oklin-ghislain-toure
            </a>
          </li>
          <li>
            <span className="font-semibold inline-block w-24">GitHub</span>
            <a
              href="https://github.com/TOG225"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              TOG225
            </a>
          </li>
          <li>
            <span className="font-semibold inline-block w-24">Localisation</span>
            <span className="text-gray-700">Casablanca, Maroc</span>
          </li>
        </ul>
      </section>
    </>
  )
}
