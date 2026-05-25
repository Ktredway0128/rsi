import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const inputBase = "bg-neutral-900 border border-neutral-700 focus:border-gold focus:ring-1 focus:ring-gold/20 text-white placeholder-gray-600 rounded-sm px-4 py-3 text-sm font-sans outline-none transition-all duration-200 w-full"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) { setError(error.message); setLoading(false); return }
    setDone(true)
    setLoading(false)
    setTimeout(() => navigate('/dashboard'), 2000)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        <div className="text-center mb-10">
          <a href="/">
            <h1 className="text-4xl font-bold text-gold leading-none" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.01em' }}>RSI</h1>
            <div className="w-24 h-px bg-gold opacity-70 mx-auto my-2" />
            <p className="text-xs tracking-widest text-gold font-light uppercase">Refined Service Institute</p>
          </a>
        </div>

        <div className="border border-neutral-800 bg-neutral-950 p-8">
          {done ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mx-auto mb-4">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-serif text-lg mb-2">Password updated</p>
              <p className="text-gray-400 text-sm">Redirecting you to your dashboard...</p>
            </div>
          ) : (
            <>
              <h2 className="font-serif text-2xl text-white mb-1">Set new password</h2>
              <p className="text-gray-500 text-sm mb-8">Choose a new password for your RSI account.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-gray-400 font-sans">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={inputBase}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-gray-400 font-sans">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={inputBase}
                  />
                </div>

                {error && <p className="text-red-400 text-xs font-sans">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="hover-lift mt-2 bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold px-10 py-4 transition-opacity disabled:opacity-50"
                >
                  {loading ? 'Please wait...' : 'Update Password'}
                </button>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  )
}