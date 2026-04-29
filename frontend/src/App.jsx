import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar      from '@/components/layout/Navbar'
import Footer      from '@/components/layout/Footer'
import ScrollToTop from '@/components/utils/ScrollToTop'
import SkipLink    from '@/components/utils/SkipLink'
import Home        from '@/pages/Home'
import NotFound    from '@/pages/NotFound'

const Projects      = lazy(() => import('@/pages/Projects'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const Blog          = lazy(() => import('@/pages/Blog'))
const ArticleDetail = lazy(() => import('@/pages/ArticleDetail'))
const Contact       = lazy(() => import('@/pages/Contact'))
const CTF           = lazy(() => import('@/pages/CTF'))

function PageLoader() {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-20">
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <SkipLink />
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white">
          <Navbar />
          <main id="main-content" className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/"                element={<Home />} />
                <Route path="/projects"        element={<Projects />} />
                <Route path="/projects/:slug"  element={<ProjectDetail />} />
                <Route path="/blog"            element={<Blog />} />
                <Route path="/blog/:slug"      element={<ArticleDetail />} />
                <Route path="/contact"         element={<Contact />} />
                <Route path="/ctf"            element={<CTF />} />
                <Route path="*"               element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}
