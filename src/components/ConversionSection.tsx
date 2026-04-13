import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Quiz from './conversion/Quiz'
import FreebieForm from './conversion/FreebieForm'
import ProductTabs from './conversion/ProductTabs'
import type { ViewState, TabId, QuizResultData } from './conversion/types'

interface ConversionSectionProps {
  isDark?: boolean
}

export default function ConversionSection({}: ConversionSectionProps) {
  const [view, setView] = useState<ViewState>('quiz')
  const [activeTab, setActiveTab] = useState<TabId>('potenzialanalyse')
  const [quizResult, setQuizResult] = useState<QuizResultData | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})

  const sectionRef = useScrollReveal<HTMLElement>()
  const viewRef = useRef<HTMLDivElement>(null)

  const animateViewChange = (callback: () => void) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !viewRef.current) {
      callback()
      return
    }
    const tl = gsap.timeline()
    tl.fromTo(viewRef.current, { opacity: 1 }, { opacity: 0, duration: 0.2, ease: 'power2.in' })
    tl.call(callback)
    tl.fromTo(viewRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })
  }

  const handleQuizComplete = (result: QuizResultData, answers: Record<string, string>) => {
    setQuizResult(result)
    setQuizAnswers(answers)
    animateViewChange(() => setView('freebie'))
  }

  const handleSkip = () => {
    animateViewChange(() => setView('tabs'))
  }

  const handleFreebieComplete = (tab: TabId) => {
    setActiveTab(tab)
    animateViewChange(() => setView('tabs'))
  }

  // Scroll to top of section when view changes
  useEffect(() => {
    if (view === 'freebie' || view === 'tabs') {
      const el = document.getElementById('lead-form')
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 300)
      }
    }
  }, [view])

  return (
    <section ref={sectionRef} id="lead-form" className="py-24 sm:py-32 section-padding bg-white dark:bg-[#0D0D0D]" aria-labelledby="conversion-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[#2563EB]" />
            Ihr nächster Schritt
            <div className="w-8 h-px bg-[#2563EB]" />
          </div>
          <h2 id="conversion-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white mb-4">
            {view === 'quiz' && 'Finden Sie heraus, welcher Weg zu Ihnen passt.'}
            {view === 'freebie' && 'Ihre kostenlose KI-Analyse.'}
            {view === 'tabs' && 'Wählen Sie den passenden Einstieg.'}
          </h2>
          {view === 'quiz' && (
            <p className="text-[clamp(0.95rem,1.1vw,1.1rem)] text-[#777] dark:text-[#999] leading-[1.8] max-w-2xl mx-auto">
              5 kurze Fragen — dann erhalten Sie eine kostenlose PDF-Analyse mit 3 konkreten Hebeln für Ihr Unternehmen.
            </p>
          )}
        </div>

        <div ref={viewRef}>
          {view === 'quiz' && (
            <Quiz onComplete={handleQuizComplete} onSkip={handleSkip} />
          )}
          {view === 'freebie' && quizResult && (
            <FreebieForm
              answers={quizAnswers}
              result={quizResult}
              onContinue={handleFreebieComplete}
            />
          )}
          {view === 'tabs' && (
            <ProductTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              quizAnswers={quizAnswers}
            />
          )}
        </div>
      </div>
    </section>
  )
}
