import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function FreeGuide() {
  const [form, setForm] = useState({ name: '', email: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/.netlify/functions/send-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputBase = "bg-neutral-900 border border-neutral-700 focus:border-gold focus:ring-1 focus:ring-gold/20 text-white placeholder-gray-600 rounded-sm px-4 py-3 text-sm font-sans outline-none transition-all duration-200 w-full"

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="relative min-h-screen flex items-center justify-center px-6">

        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gold/10" />

        <div className="relative z-10 w-full max-w-lg text-center">

          {status === 'success' ? (
            <div className="flex flex-col items-center gap-6">
              <div className="w-12 h-px bg-gold mx-auto" />
              <p className="text-xs tracking-widest uppercase text-gold font-sans">Check Your Inbox</p>
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                Your guide is on its way.
              </h1>
              <p className="text-gray-400 text-base leading-relaxed">
                We sent <span className="text-white">{form.email}</span> the language guide. Check your inbox — and your spam folder if you don't see it within a minute.
              </p>
              <div className="w-12 h-px bg-gold mx-auto" />
            </div>
          ) : (
            <>
              <div className="mb-10">
                <p className="text-xs tracking-widest uppercase text-gold font-sans mb-4">Free Download</p>
                <h1
                  className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  10 Phrases Every Server Should Stop Saying
                </h1>
                <div className="w-12 h-px bg-gold mx-auto my-6" />
                <p className="text-gray-400 text-base leading-relaxed">
                  A one-page language guide for front-of-house staff. The wrong phrases, the right replacements, and why it matters. Ready to print and post.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-gray-400 font-sans">First Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Alex"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className={inputBase}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-gray-400 font-sans">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@yourrestaurant.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={inputBase}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-2 bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold px-10 py-4 transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Me the One-Sheet'}
                </button>

                {status === 'error' && (
                  <p className="text-red-400 text-xs font-sans text-center">
                    Something went wrong. Please try again or email us at hello@refinedserviceinstitute.com
                  </p>
                )}

                <p className="text-xs text-gray-600 font-sans text-center leading-relaxed">
                  No spam. Just the guide and a short follow-up about RSI. Unsubscribe anytime.
                </p>
              </form>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}