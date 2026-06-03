import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const navigate                                      = useNavigate()
  const [mode, setMode]                               = useState('login') // 'login' | 'signup' | 'forgot'
  const [form, setForm]                               = useState({ full_name: '', email: '', password: '', confirmPassword: '', access_code: '' })
  const [error, setError]                             = useState(null)
  const [loading, setLoading]                         = useState(false)
  const [resetSent, setResetSent]                     = useState(false)
  const [showPassword, setShowPassword]               = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)   
  const [signupComplete, setSignupComplete]           = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (mode === 'forgot') {
      const { error } = await supabase.auth.resetPasswordForEmail(form.email, {
        redirectTo: 'https://refinedserviceinstitute.com/reset-password',
      })
      if (error) { setError(error.message); setLoading(false); return }
      setResetSent(true)
      setLoading(false)
      return
    }

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

      // Validate access code
      const { data: codeData, error: codeError } = await supabase
      .from('access_codes')
      .select('*')
      .eq('code', form.access_code.trim().toUpperCase())
      .single()

      if (codeError || !codeData) {
      setError('Invalid access code. Please check with your property manager.')
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
      
      setSignupComplete(true)
      setLoading(false)
      return

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
            {mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create your account' : 'Reset your password'}
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            {mode === 'login' ? 'Sign in to access your certification program.' : mode === 'signup' ? 'Begin your RSI certification.' : 'Enter your email and we\'ll send you a reset link.'}
          </p>

          {/* Forgot password success state */}
          {mode === 'forgot' && resetSent ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mx-auto mb-4">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-serif text-lg mb-2">Check your email</p>
              <p className="text-gray-400 text-sm mb-6">We sent a password reset link to {form.email}</p>
              <button
                onClick={() => { setMode('login'); setResetSent(false); setForm({ full_name: '', email: '', password: '', confirmPassword: '' }) }}
                className="text-gold text-xs tracking-widest uppercase hover:underline font-sans"
              >
                Back to sign in
              </button>
            </div>
          ) : signupComplete ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mx-auto mb-4">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-serif text-lg mb-2">Check your email</p>
              <p className="text-gray-400 text-sm mb-6">We sent a confirmation link to {form.email}. Click it to activate your account and access the program.</p>
              <button
                onClick={() => { setMode('login'); setSignupComplete(false); setForm({ full_name: '', email: '', password: '', confirmPassword: '', access_code: '' }) }}
                className="text-gold text-xs tracking-widest uppercase hover:underline font-sans"
              >
                Back to sign in
              </button>
            </div>
          ) : (
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

              {mode !== 'forgot' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-gray-400 font-sans">Password</label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className={inputBase}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'signup' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-gray-400 font-sans">Confirm Password</label>
                  <div className="relative">
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      className={inputBase}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(prev => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold transition-colors"
                    >
                      {showConfirmPassword ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'signup' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-gray-400 font-sans">
                    Access Code
                    <span className="ml-2 text-gold normal-case tracking-normal text-xs">— Provided by your property</span>
                  </label>
                  <input
                    name="access_code"
                    type="text"
                    placeholder="Provided by your property"
                    value={form.access_code}
                    onChange={handleChange}
                    required
                    className={inputBase}
                  />
                </div>
              )}

              {mode === 'login' && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setError(null) }}
                    className="text-xs text-gray-500 hover:text-gold transition-colors font-sans"
                  >
                    Forgot password?
                  </button>
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
                {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
              </button>
            </form>
          )}

          {!resetSent && (
            <p className="text-center text-gray-600 text-xs mt-6 font-sans">
              {mode === 'login' ? "Don't have an account? " : mode === 'signup' ? 'Already have an account? ' : 'Remember your password? '}
              <button
                onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null) }}
                className="text-gold hover:underline"
              >
                {mode === 'login' ? 'Sign up' : mode === 'forgot' ? 'Sign in' : 'Sign in'}
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  )
}