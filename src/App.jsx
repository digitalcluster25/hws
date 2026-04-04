import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Wireframe from './wireframe/Wireframe'
import Portfolio from './pages/Portfolio'
import ProjectDetail from './pages/ProjectDetail'
import Services from './pages/Services'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/"                   element={<Wireframe />} />
        <Route path="/portfolio"          element={<Portfolio />} />
        <Route path="/portfolio/:slug"    element={<ProjectDetail />} />
        <Route path="/services"           element={<Services />} />
        <Route path="/contact"            element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
