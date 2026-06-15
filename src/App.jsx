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
import Terms from './pages/Terms'
import Success from './pages/Success'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )
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
        <Route path="/success" element={<Success />} />

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
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App