import { Mail, Phone, Linkedin, Github } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import FadeIn from '@/components/ui/FadeIn'

const CONTACTS = [
  {
    icon: Mail, label: 'Email',
    value: 'o.ghislain@hestim.ma',
    href: 'mailto:o.ghislain@hestim.ma',
  },
  {
    icon: Phone, label: 'Téléphone',
    value: '+212 773 125 353',
    href: 'tel:+212773125353',
  },
  {
    icon: Linkedin, label: 'LinkedIn',
    value: 'oklin-ghislain-touré',
    href: 'https://linkedin.com',
    external: true,
  },
  {
    icon: Github, label: 'GitHub',
    value: 'TOG225',
    href: 'https://github.com/TOG225',
    external: true,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <FadeIn direction="up">
          <SectionTitle subtitle="Disponible pour un stage PFA">Contact</SectionTitle>
        </FadeIn>

        <FadeIn direction="up" delay={0.05}>
          <p className="text-grey-text mb-10 max-w-xl leading-relaxed">
            Une question, une opportunité de stage, ou juste discuter cybersécurité ?
            N'hésitez pas à me contacter !
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTACTS.map(({ icon: Icon, label, value, href, external }, i) => (
              <FadeIn key={label} direction="left" delay={i * 0.07}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-accent hover:shadow-md transition-all group h-full"
                  aria-label={label}
                >
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-grey-text uppercase tracking-wide">{label}</p>
                    <p className="text-sm font-semibold text-primary mt-0.5 truncate">{value}</p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>

          {/* Form */}
          <FadeIn direction="right" delay={0.1}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4"
            >
              <div>
                <label htmlFor="contact-name" className="text-xs font-medium text-grey-text uppercase tracking-wide block mb-1">
                  Nom
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Votre nom"
                  autoComplete="name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-xs font-medium text-grey-text uppercase tracking-wide block mb-1">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="votre@email.com"
                  autoComplete="email"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="contact-message" className="text-xs font-medium text-grey-text uppercase tracking-wide block mb-1">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Votre message…"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white font-semibold py-3 rounded-lg hover:bg-accent active:scale-95 transition-all text-sm"
              >
                Envoyer le message
              </button>
            </form>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
