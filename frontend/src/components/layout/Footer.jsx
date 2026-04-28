export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm text-grey-text">
          © 2026 Ghislain Touré · Portfolio Cybersécurité
        </p>
        <div className="flex justify-center gap-6 mt-2">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-500 hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-500 hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:toureoklin2@gmail.com"
            className="text-sm text-gray-500 hover:text-accent transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
