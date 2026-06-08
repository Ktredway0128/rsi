import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

// const DEV_MODE = true

export default function ModuleViewer() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const DEV_MODE = user?.email === 'kyletredway@gmail.com'

  const [module, setModule] = useState(null)
  const [sections, setSections] = useState([])
  const [questions, setQuestions] = useState([])
  const [exercise, setExercise] = useState(null)
  const [scenarios, setScenarios] = useState([])
  const [loading, setLoading] = useState(true)

  // UI state
  const [step, setStep] = useState('content')
  const [answers, setAnswers] = useState({})
  const [checkpointResult, setCheckpointResult] = useState(null)
  const [reflection, setReflection] = useState('')
  const [reflectionTimer, setReflectionTimer] = useState(DEV_MODE ? 0 : 210)
  const [reflectionStarted, setReflectionStarted] = useState(false)
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false)
  const [openedScenarios, setOpenedScenarios] = useState({}) // which scenarios have been clicked open
  const [revealedScenarios, setRevealedScenarios] = useState({}) // which RSI responses have been revealed
  const [scenarioTimers, setScenarioTimers] = useState({})
  const [activeScenarioId, setActiveScenarioId] = useState(null) // which scenario timer is running
  const [contentTimer, setContentTimer] = useState(DEV_MODE ? 0 : 600)

  useEffect(() => {
    async function loadModule() {
      const [{ data: mod }, { data: secs }, { data: qs }, { data: ex }] = await Promise.all([
        supabase.from('modules').select('*').eq('id', id).single(),
        supabase.from('sections').select('*').eq('module_id', id).order('order_index'),
        supabase.from('checkpoint_questions').select('*').eq('module_id', id).order('order_index'),
        supabase.from('exercises').select('*').eq('module_id', id).single(),
      ])
      setModule(mod)
      setSections(secs || [])
      setQuestions(qs || [])
      setExercise(ex)

      if (ex) {
        const { data: scens } = await supabase
          .from('exercise_scenarios')
          .select('*')
          .eq('exercise_id', ex.id)
          .order('order_index')
        setScenarios(scens || [])

        const timers = {}
        scens?.forEach(s => { timers[s.id] = DEV_MODE ? 0 : s.min_seconds })
        setScenarioTimers(timers)
      }

      setLoading(false)
    }
    loadModule()
  }, [id])

  // Reflection timer countdown
  useEffect(() => {
    if (step !== 'exercise' || !reflectionStarted || reflectionTimer <= 0) return
    const interval = setInterval(() => {
      setReflectionTimer(prev => {
        if (prev <= 1) { clearInterval(interval); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [step, reflectionStarted, reflectionTimer])

  // Active scenario timer countdown
  useEffect(() => {
    if (!activeScenarioId || scenarioTimers[activeScenarioId] <= 0) return
    const interval = setInterval(() => {
      setScenarioTimers(prev => {
        const next = { ...prev, [activeScenarioId]: Math.max(0, prev[activeScenarioId] - 1) }
        if (next[activeScenarioId] === 0) clearInterval(interval)
        return next
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [activeScenarioId])

  // Content timer countdown
  useEffect(() => {
    if (step !== 'content' || contentTimer <= 0) return
    const interval = setInterval(() => {
      setContentTimer(prev => {
        if (prev <= 1) { clearInterval(interval); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [step, contentTimer])

  const handleCheckpointSubmit = () => {
    let correct = 0
    questions.forEach(q => {
      if (answers[q.id] === q.correct_answer) correct++
    })
    const passed = correct === questions.length
    setCheckpointResult({ correct, total: questions.length, passed })
  }

  const handleCheckpointContinue = async () => {
    if (checkpointResult?.passed) {
      setStep('exercise')
      setReflectionStarted(true)
    } else {
      setAnswers({})
      setCheckpointResult(null)
    }
  }

  const handleOpenScenario = (scenarioId) => {
    setOpenedScenarios(prev => ({ ...prev, [scenarioId]: true }))
    setActiveScenarioId(scenarioId)
  }

  const handleRevealResponse = (scenarioId, idx) => {
    setRevealedScenarios(prev => ({ ...prev, [scenarioId]: true }))
    setActiveScenarioId(null)
  }

  const canRevealScenario = (scenarioId) => {
    return DEV_MODE || scenarioTimers[scenarioId] <= 0
  }

  // A scenario's arrow is visible if it's the first one, or the previous one has been revealed
  const isScenarioVisible = (idx) => {
    if (idx === 0) return true
    const prevScenario = scenarios[idx - 1]
    return revealedScenarios[prevScenario.id] === true
  }

  const allScenariosRevealed = scenarios.length > 0 && scenarios.every(s => revealedScenarios[s.id])

  const canSubmitReflection = () => {
    return reflectionSubmitted && allScenariosRevealed
  }

  const handleCompleteModule = async () => {
    await supabase.from('user_progress').upsert({
      user_id: user.id,
      module_id: id,
      completed_at: new Date().toISOString(),
      checkpoint_passed: true,
      exercise_completed: true,
    })
    setStep('complete')
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
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
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-500 hover:text-gold transition-colors text-xs tracking-widest uppercase font-sans"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Dashboard
        </button>
        <span className="text-xs tracking-widest uppercase text-gold font-sans">
          Module {module?.number}
        </span>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* ── CONTENT STEP ── */}
        {step === 'content' && (
          <div>
            <div className="relative w-full h-64 md:h-80 mb-12 overflow-hidden rounded-sm">
              <img
                src={`/modules/images/module-${module?.number}.png`}
                alt={module?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-40" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="text-xs tracking-[0.25em] uppercase text-gold font-sans mb-2">
                  Module {module?.number}
                </p>
                <h1 className="font-serif text-3xl md:text-4xl text-white leading-tight">{module?.title}</h1>
                <div className="w-32 h-px bg-gold mt-3" />
              </div>
            </div>

            {sections.map((section, idx) => (
              <div key={section.id} className="mb-12">
                {module?.number === 2 && idx === 3 && (
                  <div className="mb-8 overflow-hidden rounded-sm">
                    <video autoPlay muted loop playsInline className="w-full object-cover" src="/modules/videos/module-2.mp4" />
                  </div>
                )}
                {module?.number === 5 && idx === 3 && (
                  <div className="mb-8 overflow-hidden rounded-sm">
                    <video autoPlay muted loop playsInline className="w-full object-cover" src="/modules/videos/module-5.mp4" />
                  </div>
                )}
                <h2 className="font-serif text-xl text-white mb-4">{section.title}</h2>
                <div className="text-gray-400 text-base leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}

            <div className="border-t border-neutral-900 pt-12 text-center">
              {contentTimer > 0 && (
                <p className="text-gray-600 text-xs font-sans mb-4">
                  Continue available in {formatTime(contentTimer)}
                </p>
              )}
              <button
                onClick={() => setStep('checkpoint')}
                disabled={contentTimer > 0}
                className="hover-lift bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold px-12 py-4 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Continue to Checkpoint
              </button>
            </div>
          </div>
        )}

        {/* ── CHECKPOINT STEP ── */}
        {step === 'checkpoint' && (
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-gold font-sans mb-3">Checkpoint</p>
            <h2 className="font-serif text-3xl text-white mb-3">Module {module?.number} Check</h2>
            <div className="w-16 h-px bg-gold mb-4" />
            <p className="text-gray-400 text-sm mb-12">Answer all three questions correctly to continue.</p>

            {!checkpointResult ? (
              <div className="flex flex-col gap-8">
                {questions.map((q, qi) => (
                  <div key={q.id} className="border border-neutral-800 p-6">
                    <p className="font-serif text-white text-lg mb-5">
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
                <div className="text-center">
                  <button
                    onClick={handleCheckpointSubmit}
                    disabled={Object.keys(answers).length < questions.length}
                    className="hover-lift bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold px-12 py-4 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Submit Answers
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center border border-neutral-800 p-10">
                {checkpointResult.passed ? (
                  <>
                    <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mx-auto mb-4">
                      <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-2xl text-white mb-2">All Correct</h3>
                    <div className="w-10 h-px bg-gold mx-auto mb-4" />
                    <p className="text-gray-400 text-sm mb-8">Well done. Continue to the module exercise.</p>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full border border-neutral-600 flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-400 font-serif">{checkpointResult.correct}/{checkpointResult.total}</span>
                    </div>
                    <h3 className="font-serif text-2xl text-white mb-2">Not Quite</h3>
                    <div className="w-10 h-px bg-neutral-700 mx-auto mb-4" />
                    <p className="text-gray-400 text-sm mb-8">You need all three correct to continue. Review the module and try again.</p>
                  </>
                )}
                <button
                  onClick={handleCheckpointContinue}
                  className="hover-lift bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold px-12 py-4"
                >
                  {checkpointResult.passed ? 'Continue to Exercise' : 'Try Again'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── EXERCISE STEP ── */}
        {step === 'exercise' && exercise && (
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-gold font-sans mb-3">Exercise</p>
            <h2 className="font-serif text-3xl text-white mb-3">Reflection & At The Table</h2>
            <div className="w-16 h-px bg-gold mb-12" />

            {/* Reflection */}
            <div className="mb-16">
              <div className="border-l-2 border-gold pl-5 mb-6">
                <p className="text-xs tracking-widest uppercase text-gold font-sans mb-2">Reflection</p>
                <p className="text-white font-serif text-lg leading-relaxed">{exercise.scenario_prompt}</p>
              </div>

              {!reflectionSubmitted ? (
                <>
                  <textarea
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    rows={6}
                    placeholder="Write your response here..."
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-gold focus:ring-1 focus:ring-gold/20 text-white placeholder-gray-600 rounded-sm px-4 py-3 text-sm font-sans outline-none transition-all duration-200 resize-none"
                  />
                  <div className="flex items-center justify-between mt-2 mb-6">
                    <span className={`text-xs font-sans ${reflection.length >= 100 ? 'text-gold' : 'text-gray-600'}`}>
                      {reflection.length} / 100 characters minimum
                    </span>
                    {reflectionTimer > 0 && (
                      <span className="text-xs font-sans text-gray-600">
                        {formatTime(reflectionTimer)} remaining
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setReflectionSubmitted(true)}
                    disabled={reflection.length < 100 || reflectionTimer > 0}
                    className="hover-lift bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold px-10 py-4 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Submit Reflection
                  </button>
                </>
              ) : (
                <div className="border border-neutral-800 bg-neutral-900/40 px-6 py-4">
                  <p className="text-xs tracking-widest uppercase text-gold font-sans mb-2">Your Reflection</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{reflection}</p>
                </div>
              )}
            </div>

            {/* Scenarios — only visible after reflection is submitted */}
            {reflectionSubmitted && (
              <div className="flex flex-col gap-6 mb-12">
                <div className="flex items-center justify-between">
                  <p className="text-xs tracking-widest uppercase text-gold font-sans">At The Table — Service Scenarios</p>
                  <p className="text-xs text-gray-600 font-sans">{scenarios.length} Scenarios</p>
                </div>

                {scenarios.map((scenario, idx) => (
                  <div key={scenario.id}>
                    {isScenarioVisible(idx) && !openedScenarios[scenario.id] && (
                      <button
                        onClick={() => handleOpenScenario(scenario.id)}
                        className="w-full flex items-center justify-between border border-neutral-800 hover:border-gold/40 px-6 py-4 transition-all text-left group"
                      >
                        <span className="text-xs tracking-widest uppercase text-gray-400 group-hover:text-white font-sans transition-colors">
                          Scenario {idx + 1}
                        </span>
                        <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                    )}

                    {openedScenarios[scenario.id] && (
                      <div className="border border-neutral-800 p-6">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-xs tracking-widest uppercase text-gray-500 font-sans">Scenario {idx + 1}</p>
                          {activeScenarioId === scenario.id && scenarioTimers[scenario.id] > 0 && (
                            <span className="text-xs text-gray-600 font-sans">
                              {formatTime(scenarioTimers[scenario.id])} remaining
                            </span>
                          )}
                        </div>
                        <p className="text-white leading-relaxed mb-5 font-serif">{scenario.scenario}</p>
                        {!revealedScenarios[scenario.id] ? (
                          <button
                            onClick={() => canRevealScenario(scenario.id) && handleRevealResponse(scenario.id, idx)}
                            disabled={!canRevealScenario(scenario.id)}
                            className={`flex items-center gap-2 text-xs tracking-widest uppercase font-sans transition-colors ${
                              canRevealScenario(scenario.id)
                                ? 'text-gold hover:text-gold/70 cursor-pointer'
                                : 'text-gray-600 cursor-not-allowed'
                            }`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            {canRevealScenario(scenario.id)
                              ? 'Reveal RSI Response'
                              : `Available in ${formatTime(scenarioTimers[scenario.id])}`
                            }
                          </button>
                        ) : (
                          <div className="border-t border-neutral-800 pt-5">
                            <p className="text-xs tracking-widest uppercase text-gold font-sans mb-3">RSI Response</p>
                            <p className="text-gray-400 leading-relaxed">{scenario.rsi_response}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Complete Module — always visible, grayed until all scenarios revealed */}
            <div className="text-center">
              <button
                onClick={handleCompleteModule}
                disabled={!canSubmitReflection()}
                className="hover-lift bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold px-12 py-4 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Complete Module
              </button>
              {!canSubmitReflection() && (
                <p className="text-gray-600 text-xs mt-3 font-sans">
                  {reflection.length < 100
                    ? 'Write at least 100 characters to continue'
                    : reflectionTimer > 0
                    ? `Reflection timer: ${formatTime(reflectionTimer)} remaining`
                    : 'Complete all scenarios to continue'
                  }
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── COMPLETE STEP ── */}
        {step === 'complete' && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full border border-gold flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xs tracking-[0.25em] uppercase text-gold font-sans mb-3">Module Complete</p>
            <h2 className="font-serif text-3xl text-white mb-3">{module?.title}</h2>
            <div className="w-16 h-px bg-gold mx-auto mb-6" />
            <p className="text-gray-400 text-sm mb-10">
              You have completed this module. Return to your dashboard to continue the program.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="hover-lift bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold px-12 py-4"
            >
              Back to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  )
}