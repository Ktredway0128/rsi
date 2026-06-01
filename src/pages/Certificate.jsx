import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function Certificate() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [certificate, setCertificate] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCertificate() {
      const { data: cert, error: certError } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user.id)
        .order('issued_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      const { data: prof } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setCertificate(cert)
      setProfile(prof)
      setLoading(false)
    }
    loadCertificate()
  }, [user.id])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!certificate) {
    navigate('/dashboard')
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <div className="border-b border-neutral-900 px-6 md:px-12 py-5 flex items-center justify-between">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-500 hover:text-gold transition-colors text-xs tracking-widest uppercase font-sans"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Dashboard
        </button>
        <span className="text-xs tracking-widest uppercase text-gold font-sans">Your Certificate</span>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Certificate document */}
        <div className="border border-gold/40 bg-neutral-950 p-12 md:p-16 text-center relative">

          {/* Logo */}
          <div className="mb-10">
            <h2
              className="text-4xl font-bold text-gold leading-none"
              style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.01em' }}
            >
              RSI
            </h2>
            <div className="w-24 h-px bg-gold opacity-70 mx-auto my-2" />
            <p className="text-xs tracking-widest text-gold font-light uppercase">
              Refined Service Institute
            </p>
          </div>

          <p className="text-xs tracking-[0.25em] uppercase text-gray-500 font-sans mb-6">
            This certifies that
          </p>

          <h1
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {profile?.full_name || user.email}
          </h1>

          <div className="w-32 h-px bg-gold mx-auto mb-6" />

          <p className="text-xs tracking-[0.25em] uppercase text-gray-500 font-sans mb-3">
            has successfully completed the
          </p>

          <p className="font-serif text-xl text-white mb-8">
            Certified Service Professional Program
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div>
              <p className="text-xs tracking-widest uppercase text-gold font-sans mb-1">Issued</p>
              <p className="text-sm text-white font-sans">{formatDate(certificate.issued_at)}</p>
            </div>
            
            <div>
              <p className="text-xs tracking-widest uppercase text-gold font-sans mb-1">Certificate No.</p>
              <p className="text-sm text-white font-sans" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>{certificate.certificate_number}</p>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8">
            <p className="text-xs text-gray-600 font-sans italic" style={{ fontFamily: 'Georgia, serif' }}>
              Restoring the standard of service.
            </p>
          </div>

        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => window.print()}
            className="hover-lift border border-gold text-gold text-xs tracking-widest uppercase font-sans px-10 py-4 transition-colors hover:bg-gold hover:text-black"
          >
            Print Certificate
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="hover-lift border border-neutral-700 text-gray-400 text-xs tracking-widest uppercase font-sans px-10 py-4 transition-colors hover:border-gold hover:text-gold"
          >
            Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  )
}