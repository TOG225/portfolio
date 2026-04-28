import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar      from '@/components/layout/Navbar'
import Footer      from '@/components/layout/Footer'
import ScrollToTop from '@/components/utils/ScrollToTop'
import Home          from '@/pages/Home'
import Projects      from '@/pages/Projects'
import ProjectDetail from '@/pages/ProjectDetail'
import Blog          from '@/pages/Blog'
import ArticleDetail from '@/pages/ArticleDetail'
import NotFound      from '@/pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"                element={<Home />} />
            <Route path="/projects"        element={<Projects />} />
            <Route path="/projects/:slug"  element={<ProjectDetail />} />
            <Route path="/blog"            element={<Blog />} />
            <Route path="/blog/:slug"      element={<ArticleDetail />} />
            <Route path="*"               element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
