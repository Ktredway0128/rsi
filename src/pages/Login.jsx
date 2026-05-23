import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ full_name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (mode === 'signup') {
      if (form.password.length < 8) {
        setError('Password must be at least 8 characters')
        setLoading(false)
        return
      }
      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match')
        setLoading(false)
        return
      }

      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { full_name: form.full_name }
        }
      })
      if (error) { setError(error.message); setLoading(false); return }

      await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: form.full_name,
        email: form.email,
      })

      navigate('/dashboard')

    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      })
      if (error) { setError(error.message); setLoading(false); return }
      navigate('/dashboard')
    }

    setLoading(false)
  }

  const inputBase = "bg-neutral-900 border border-neutral-700 focus:border-gold focus:ring-1 focus:ring-gold/20 text-white placeholder-gray-600 rounded-sm px-4 py-3 text-sm font-sans outline-none transition-all duration-200 w-full"

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <a href="/">
            <h1
              className="text-4xl font-bold text-gold leading-none"
              style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.01em' }}
            >
              RSI
            </h1>
            <div className="w-24 h-px bg-gold opacity-70 mx-auto my-2" />
            <p className="text-xs tracking-widest text-gold font-light uppercase">
              Refined Service Institute
            </p>
          </a>
        </div>

        {/* Card */}
        <div className="border border-neutral-800 bg-neutral-950 p-8">
          <h2 className="font-serif text-2xl text-white mb-1">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            {mode === 'login' ? 'Sign in to access your certification program.' : 'Begin your RSI certification.'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'signup' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs tracking-widest uppercase text-gray-400 font-sans">Full Name</label>
                <input
                  name="full_name"
                  type="text"
                  placeholder="Jane Smith"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  className={inputBase}
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-widest uppercase text-gray-400 font-sans">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="jane@thegrandhotel.com"
                value={form.email}
                onChange={handleChange}
                required
                className={inputBase}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-widest uppercase text-gray-400 font-sans">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className={inputBase}
              />
            </div>

            {mode === 'signup' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs tracking-widest uppercase text-gray-400 font-sans">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className={inputBase}
                />
              </div>
            )}

            {error && (
              <p className="text-red-400 text-xs font-sans">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="hover-lift mt-2 bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold px-10 py-4 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-gray-600 text-xs mt-6 font-sans">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null) }}
              className="text-gold hover:underline"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

      </div>
    </div>
  )
}