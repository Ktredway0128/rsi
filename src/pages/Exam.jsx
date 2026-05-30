import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const DEV_MODE = true

export default function Exam() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState('intro') // 'intro' | 'exam' | 'result'
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [attemptNumber, setAttemptNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function loadExamData() {
      const { data: attempts } = await supabase
        .from('exam_attempts')
        .select('*')
        .eq('user_id', user.id)
        .order('attempt_number', { ascending: false })

      if (attempts?.length > 0) {
        setAttemptNumber(attempts[0].attempt_number + 1)
        // If they already passed, redirect to dashboard
        if (attempts.some(a => a.passed)) {
          navigate('/dashboard')
          return
        }
      }

      // Load 40 random questions
      const { data: allQuestions } = await supabase
        .from('exam_questions')
        .select('*')

      if (allQuestions) {
        const shuffled = allQuestions.sort(() => Math.random() - 0.5)
        setQuestions(shuffled.slice(0, 40))
      }

      setLoading(false)
    }
    loadExamData()
  }, [user.id])

  const handleSubmit = async () => {
    setSubmitting(true)

    let correct = 0
    questions.forEach(q => {
      if (answers[q.id] === q.correct_answer) correct++
    })

    const score = Math.round((correct / questions.length) * 100)
    const passed = score >= 80

    await supabase.from('exam_attempts').insert({
      user_id: user.id,
      attempt_number: attemptNumber,
      score,
      passed,
    })

    if (passed) {
      const expiresAt = new Date()
      expiresAt.setFullYear(expiresAt.getFullYear() + 1)
      const certNumber = `RSI-${Date.now()}-${user.id.slice(0, 8).toUpperCase()}`

      await supabase.from('certificates').insert({
        user_id: user.id,
        expires_at: expiresAt.toISOString(),
        certificate_number: certNumber,
      })

      await supabase.from('profiles').update({
        certified_at: new Date().toISOString(),
        certificate_expires_at: expiresAt.toISOString(),
      }).eq('id', user.id)
    }

    // If failed and no attempts remaining, reset everything
    if (!passed && attemptNumber >= 3) {
      await supabase.from('user_progress').delete().eq('user_id', user.id)
      await supabase.from('exam_attempts').delete().eq('user_id', user.id)
      setResult({ score, passed, correct, total: questions.length, reset: true })
    } else {
      setResult({ score, passed, correct, total: questions.length, reset: false })
    }

    setStep('result')
    setSubmitting(false)
  }

  const attemptsRemaining = 3 - (attemptNumber - 1)

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

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
        <span className="text-xs tracking-widest uppercase text-gold font-sans">Final Exam</span>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* ── INTRO ── */}
        {step === 'intro' && (
          <div className="text-center">
            <p className="text-xs tracking-[0.25em] uppercase text-gold font-sans mb-3">RSI Certification</p>
            <h1 className="font-serif text-3xl md:text-4xl text-white mb-3">Final Exam</h1>
            <div className="w-16 h-px bg-gold mx-auto mb-8" />

            <div className="border border-neutral-800 bg-neutral-950 p-8 mb-8 text-left">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="border-l-2 border-gold pl-4">
                  <p className="text-xs tracking-widest uppercase text-gold font-sans mb-1">Questions</p>
                  <p className="font-serif text-white text-2xl">40</p>
                </div>
                <div className="border-l-2 border-gold pl-4">
                  <p className="text-xs tracking-widest uppercase text-gold font-sans mb-1">To Pass</p>
                  <p className="font-serif text-white text-2xl">80%</p>
                </div>
                <div className="border-l-2 border-gold pl-4">
                  <p className="text-xs tracking-widest uppercase text-gold font-sans mb-1">Attempts</p>
                  <p className="font-serif text-white text-2xl">{attemptsRemaining} remaining</p>
                </div>
                <div className="border-l-2 border-gold pl-4">
                  <p className="text-xs tracking-widest uppercase text-gold font-sans mb-1">Certificate</p>
                  <p className="font-serif text-white text-2xl">1 Year</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Questions are drawn randomly from across all six modules. Each attempt presents a different set of questions. Take your time — read each question carefully before selecting your answer.
              </p>
            </div>

            {attemptsRemaining === 0 ? (
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-4">You have used all three attempts. Please contact RSI to discuss your options.</p>
                <a href="/contact" className="hover-lift inline-block border border-gold text-gold text-xs tracking-widest uppercase font-sans px-10 py-4 transition-colors hover:bg-gold hover:text-black">
                  Contact RSI
                </a>
              </div>
            ) : (
              <button
                onClick={() => setStep('exam')}
                className="hover-lift bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold px-12 py-4"
              >
                Begin Exam
              </button>
            )}
          </div>
        )}

        {/* ── EXAM ── */}
        {step === 'exam' && (
          <div>
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-gold font-sans mb-1">Final Exam</p>
                <h2 className="font-serif text-2xl text-white">RSI Certified Service Professional</h2>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600 font-sans">{Object.keys(answers).length} of 40 answered</p>
                <div className="w-32 h-px bg-neutral-800 mt-1">
                  <div
                    className="h-px bg-gold transition-all duration-300"
                    style={{ width: `${(Object.keys(answers).length / 40) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 mb-12">
              {questions.map((q, qi) => (
                <div key={q.id} className="border border-neutral-800 p-6">
                  <p className="font-serif text-white text-base mb-5">
                    <span className="text-gold mr-2">{qi + 1}.</span>{q.question}
                  </p>
                  <div className="flex flex-col gap-3">
                    {['A', 'B', 'C', 'D'].map((letter) => {
                      const val = q[`option_${letter.toLowerCase()}`]
                      const selected = answers[q.id] === letter
                      return (
                        <button
                          key={letter}
                          onClick={() => setAnswers(prev => ({ ...prev, [q.id]: letter }))}
                          className={`flex items-start gap-3 px-4 py-3 border text-left transition-all text-sm font-sans ${
                            selected
                              ? 'border-gold bg-gold/10 text-white'
                              : 'border-neutral-700 text-gray-400 hover:border-gold/40 hover:text-white'
                          }`}
                        >
                          <span className={`flex-shrink-0 w-5 h-5 border rounded-full flex items-center justify-center text-xs ${selected ? 'border-gold text-gold' : 'border-neutral-600'}`}>
                            {letter}
                          </span>
                          {val}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-900 pt-8 text-center">
              <p className="text-gray-600 text-xs font-sans mb-4">
                {Object.keys(answers).length < 40
                  ? `${40 - Object.keys(answers).length} questions remaining`
                  : 'All questions answered — ready to submit'
                }
              </p>
              <button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length < 40 || submitting}
                className="hover-lift bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold px-12 py-4 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Exam'}
              </button>
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {step === 'result' && result && (
          <div className="text-center">
            {result.passed ? (
              <>
                <div className="w-20 h-20 rounded-full border border-gold flex items-center justify-center mx-auto mb-6">
                  <svg className="w-9 h-9 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-xs tracking-[0.25em] uppercase text-gold font-sans mb-3">Congratulations</p>
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">You Are Certified</h2>
                <div className="w-16 h-px bg-gold mx-auto mb-6" />
                <p className="text-gray-400 text-sm mb-2">
                  Score: <span className="text-white font-serif text-lg">{result.score}%</span>
                </p>
                <p className="text-gray-400 text-sm mb-10">
                  {result.correct} of {result.total} correct — RSI Certified Service Professional
                </p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="hover-lift bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold px-12 py-4"
                >
                  View Certificate
                </button>
              </>
            ) : (
              <>
                <div className="w-20 h-20 rounded-full border border-neutral-600 flex items-center justify-center mx-auto mb-6">
                  <span className="font-serif text-gray-400 text-2xl">{result.score}%</span>
                </div>
                <p className="text-xs tracking-[0.25em] uppercase text-gray-500 font-sans mb-3">Not Quite</p>
                <h2 className="font-serif text-3xl text-white mb-3">80% Required to Pass</h2>
                <div className="w-16 h-px bg-neutral-700 mx-auto mb-6" />
                <p className="text-gray-400 text-sm mb-2">
                  Score: <span className="text-white font-serif text-lg">{result.score}%</span> — {result.correct} of {result.total} correct
                </p>
                <p className="text-gray-400 text-sm mb-10">
                  {attemptsRemaining - 1 > 0
                    ? `You have ${attemptsRemaining - 1} attempt${attemptsRemaining - 1 === 1 ? '' : 's'} remaining. Review the modules and try again.`
                    : 'Your progress has been reset. Complete the program again to unlock the exam.'
                  }
                </p>
                {attemptsRemaining - 1 > 0 ? (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="hover-lift border border-gold text-gold text-xs tracking-widest uppercase font-sans px-10 py-4 transition-colors hover:bg-gold hover:text-black"
                    >
                      Review Modules
                    </button>
                    <button
                      onClick={() => {
                        setAnswers({})
                        setAttemptNumber(prev => prev + 1)
                        const shuffled = [...questions].sort(() => Math.random() - 0.5)
                        setQuestions(shuffled)
                        setStep('intro')
                      }}
                      className="hover-lift bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold px-10 py-4"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="hover-lift bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold px-12 py-4"
                  >
                    Return to Dashboard
                  </button>
                )}
              </>
            )}
          </div>
        )}

      </div>
    </div>
  )
}