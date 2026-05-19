import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [modules,       setModules]     = useState([])
  const [progress,      setProgress]    = useState([])
  const [profile,       setProfile]     = useState(null)
  const [loading,       setLoading]     = useState(true)
  const [certificate,   setCertificate] = useState(null)

  useEffect(() => {
    async function loadData() {
        const [{ data: modulesData }, { data: progressData }, { data: profileData }, { data: certData }] = await Promise.all([
          supabase.from('modules').select('*').order('number'),
          supabase.from('user_progress').select('*').eq('user_id', user.id),
          supabase.from('profiles').select('*').eq('id', user.id).single(),
          supabase.from('certificates').select('*').eq('user_id', user.id).order('issued_at', { ascending: false }).limit(1).maybeSingle()
        ])
        setModules(modulesData || [])
        setProgress(progressData || [])
        setProfile(profileData)
        setCertificate(certData)
        setLoading(false)
      }
    loadData()
  }, [user.id])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const getModuleStatus = (moduleId) => {
    const p = progress.find(p => p.module_id === moduleId)
    if (!p) return 'not_started'
    if (p.completed_at) return 'completed'
    return 'in_progress'
  }

  const completedCount = progress.filter(p => p.completed_at).length
  const allCompleted = completedCount === 6

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
        <div className="flex items-center gap-6">
          <a href="/" className="text-xs tracking-widest uppercase text-gray-500 hover:text-gold transition-colors font-sans hidden md:block">Home</a>
          <a href="/program" className="text-xs tracking-widest uppercase text-gray-500 hover:text-gold transition-colors font-sans hidden md:block">Program</a>
          <a href="/pricing" className="text-xs tracking-widest uppercase text-gray-500 hover:text-gold transition-colors font-sans hidden md:block">Pricing</a>
          <a href="/contact" className="text-xs tracking-widest uppercase text-gray-500 hover:text-gold transition-colors font-sans hidden md:block">Contact</a>
          <span className="text-neutral-700 hidden md:block">|</span>
          <span className="text-gray-500 text-xs font-sans hidden sm:block">{profile?.full_name || user.email}</span>
          <button
            onClick={handleSignOut}
            className="text-xs tracking-widest uppercase text-gray-500 hover:text-gold transition-colors font-sans"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-4xl mx-auto px-6 py-16">

       {/* Welcome */}
       <div className="mb-16 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-gold font-sans mb-3">
            Certified Service Professional Program
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-white mb-3">
            Welcome{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}.
          </h1>
          <div className="w-40 h-px bg-gold mx-auto mb-4" />
          <p className="text-gray-400 text-sm leading-relaxed max-w-lg mx-auto">
            Complete all six modules and pass the final exam to earn your RSI Certified Service Professional certificate.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs tracking-widest uppercase text-gray-500 font-sans">Your Progress</p>
            <p className="text-xs text-gold font-sans">{completedCount} of 6 modules complete</p>
          </div>
          <div className="w-full h-px bg-neutral-800">
            <div
              className="h-px bg-gold transition-all duration-700"
              style={{ width: `${(completedCount / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Modules */}
        <div className="flex flex-col gap-3 mb-12">
          {modules.map((mod) => {
            const status = getModuleStatus(mod.id)
            return (
              <button
                key={mod.id}
                onClick={() => navigate(`/module/${mod.id}`)}
                className="group flex items-center gap-6 border border-neutral-800 hover:border-gold/50 bg-neutral-950 px-6 py-5 text-left transition-all duration-200 hover-lift"
              >
                <span className="text-gold/30 font-serif text-2xl w-8 flex-shrink-0 group-hover:text-gold/60 transition-colors">
                  {String(mod.number).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="font-serif text-white text-base mb-0.5">{mod.title}</h3>
                    {mod.duration_minutes && (
                        <p className="text-xs text-gray-600 font-sans">{mod.duration_minutes} minutes</p>
                    )}
                </div>
                <div className="flex-shrink-0">
                  {status === 'completed' && (
                    <div className="w-6 h-6 rounded-full border border-gold flex items-center justify-center">
                      <svg className="w-3 h-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  {status === 'in_progress' && (
                    <div className="w-6 h-6 rounded-full border border-gold/40 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gold/40" />
                    </div>
                  )}
                  {status === 'not_started' && (
                    <div className="w-6 h-6 rounded-full border border-neutral-700 group-hover:border-gold/30 transition-colors" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Exam / Certificate CTA */}
        {certificate ? (
          <div className="border border-gold/30 bg-neutral-900/60 p-6 text-center">
            <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center mx-auto mb-4">
              <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xs tracking-widest uppercase text-gold font-sans mb-1">Certified</p>
            <h3 className="font-serif text-white text-xl mb-1">RSI Certified Service Professional</h3>
            <p className="text-gray-400 text-xs mb-5 font-sans">
              Valid through {new Date(certificate.expires_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <button
              onClick={() => navigate('/certificate')}
              className="hover-lift px-10 py-3 bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold transition-opacity"
            >
              View Certificate
            </button>
          </div>
        ) : (
          <div className={`border p-6 text-center ${allCompleted ? 'border-gold/30 bg-neutral-900/60' : 'border-neutral-800 bg-neutral-950 opacity-50'}`}>
            <p className="text-xs tracking-widest uppercase font-sans mb-2 ${allCompleted ? 'text-gold' : 'text-gray-600'}">
              Final Exam
            </p>
            <h3 className="font-serif text-white text-xl mb-2">RSI Certified Service Professional</h3>
            <p className="text-gray-400 text-sm mb-5">
              {allCompleted
                ? '40 questions — 80% to pass — 3 attempts included'
                : 'Complete all six modules to unlock the final exam'}
            </p>
            <button
              disabled={!allCompleted}
              onClick={() => navigate('/exam')}
              className="hover-lift px-10 py-3 bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
            >
              Begin Exam
            </button>
          </div>
        )}

      </div>
    </div>
  )
}