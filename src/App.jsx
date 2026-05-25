import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Program from './pages/Program'
import About from './pages/About'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ModuleViewer from './pages/ModuleViewer'
import { useAuth } from './context/AuthContext'
import Exam from './pages/Exam'
import Certificate from './pages/Certificate'
import EstablishmentCertificate from './pages/EstablishmentCertificate'
import ResetPassword from './pages/ResetPassword'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/program" element={<Program />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/module/:id" element={
          <ProtectedRoute>
            <ModuleViewer />
          </ProtectedRoute>
        } />
        <Route path="/exam" element={
          <ProtectedRoute>
            <Exam />
          </ProtectedRoute>
        } />
        <Route path="/certificate" element={
          <ProtectedRoute>
            <Certificate />
          </ProtectedRoute>
        } />
        <Route path="/establishment-certificate" element={<EstablishmentCertificate />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App