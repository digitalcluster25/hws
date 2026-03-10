import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Wireframe from './wireframe/Wireframe'
import Portfolio from './pages/Portfolio'
import ProjectDetail from './pages/ProjectDetail'
import Services from './pages/Services'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
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
