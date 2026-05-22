import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function EstablishmentCertificate() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [certData, setCertData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Certificate data comes from URL params so you can generate a link for each property
  useEffect(() => {
    const property = searchParams.get('property')
    const issued = searchParams.get('issued')
    const expires = searchParams.get('expires')
    const certNumber = searchParams.get('cert')

    if (!property || !issued || !expires || !certNumber) {
      navigate('/')
      return
    }

    setCertData({ property, issued, expires, certNumber })
    setLoading(false)
  }, [])

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

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <div className="border-b border-neutral-900 px-6 md:px-12 py-5 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-gold" style={{ fontFamily: 'Georgia, serif' }}>
          RSI
        </a>
        <span className="text-xs tracking-widest uppercase text-gold font-sans">Establishment Certificate</span>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Certificate document */}
        <div className="border border-gold/40 bg-neutral-950 p-12 md:p-16 text-center relative">

          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/40" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/40" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/40" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/40" />

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
            className="text-3xl md:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {certData.property}
          </h1>

          <div className="w-32 h-px bg-gold mx-auto mb-6" />

          <p className="text-xs tracking-[0.25em] uppercase text-gray-500 font-sans mb-3">
            has achieved
          </p>

          <p className="font-serif text-2xl text-gold mb-3">
            RSI Establishment Certification
          </p>

          <p className="text-gray-400 text-sm max-w-md mx-auto mb-10 leading-relaxed">
            This property has demonstrated a verified commitment to the RSI standard of refined service, with a certified serving staff meeting the RSI threshold for Establishment Certification.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div>
              <p className="text-xs tracking-widest uppercase text-gold font-sans mb-1">Issued</p>
              <p className="text-sm text-white font-sans">{formatDate(certData.issued)}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-gold font-sans mb-1">Valid Through</p>
              <p className="text-sm text-white font-sans">{formatDate(certData.expires)}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-gold font-sans mb-1">Certificate No.</p>
              <p className="text-white font-sans" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>{certData.certNumber}</p>
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
          <a
            href="/"
            className="hover-lift border border-neutral-700 text-gray-400 text-xs tracking-widest uppercase font-sans px-10 py-4 text-center transition-colors hover:border-gold hover:text-gold"
          >
            Visit RSI
          </a>
        </div>

      </div>
    </div>
  )
}