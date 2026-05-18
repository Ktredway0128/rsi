import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Program from './pages/Program'
import About from './pages/About'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/program" element={<Program />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App