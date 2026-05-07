import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Wireframe from './wireframe/Wireframe'
import Portfolio from './pages/Portfolio'
import ProjectDetail from './pages/ProjectDetail'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function MainLayout() {
  const { pathname } = useLocation()
  const isAdmin = pathname === '/admin'
  if (isAdmin) return <Routes><Route path="/admin" element={<Admin />} /></Routes>
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/"                   element={<Wireframe />} />
        <Route path="/portfolio"          element={<Portfolio />} />
        <Route path="/portfolio/:slug"    element={<ProjectDetail />} />
        <Route path="/services"           element={<Services />} />
        <Route path="/contact"            element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout />
    </BrowserRouter>
  )
}
