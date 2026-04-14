import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import QuizQuestion from './QuizQuestion'
import { useQuizQuestions, calculateQuizResult } from './data'
import { useLanguage } from '../../i18n/LanguageContext'
import type { QuizResultData } from './types'

interface QuizProps {
  onComplete: (result: QuizResultData, answers: Record<string, string>) => void
  onSkip: () => void
}

export default function Quiz({ onComplete, onSkip }: QuizProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const questionRef = useRef<HTMLDivElement>(null)
  const { t, lang } = useLanguage()

  const quizQuestions = useQuizQuestions()
  const totalSteps = quizQuestions.length
  const currentQuestion = quizQuestions[currentStep]
  const currentAnswer = answers[currentQuestion.id] || ''
  const progress = ((currentStep + 1) / totalSteps) * 100

  const animateTransition = (direction: 'forward' | 'back', callback: () => void) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !questionRef.current) {
      callback()
      return
    }

    const xOut = direction === 'forward' ? -30 : 30
    const xIn = direction === 'forward' ? 30 : -30

    const tl = gsap.timeline()
    tl.fromTo(questionRef.current, { opacity: 1, x: 0 }, { opacity: 0, x: xOut, duration: 0.2, ease: 'power2.in' })
    tl.call(callback)
    tl.fromTo(questionRef.current, { opacity: 0, x: xIn }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' })
  }

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
  }

  const handleNext = () => {
    if (!currentAnswer) return
    if (currentStep === totalSteps - 1) {
      const finalAnswers = { ...answers, [currentQuestion.id]: currentAnswer }
      const result = calculateQuizResult(finalAnswers, lang)
      onComplete(result, finalAnswers)
      return
    }
    animateTransition('forward', () => setCurrentStep((s) => s + 1))
  }

  const handleBack = () => {
    if (currentStep === 0) return
    animateTransition('back', () => setCurrentStep((s) => s - 1))
  }

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !questionRef.current) return
    gsap.fromTo(questionRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
  }, [])

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 sm:p-8 border border-[#EDEDEA] dark:border-white/10">
        {/* Progress bar */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[11px] font-medium tracking-wider uppercase text-[#999] dark:text-[#666]">
            {t('quizStep')} {currentStep + 1} {t('quizStepOf')} {totalSteps}
          </span>
          <div className="flex-1 ml-4 h-1 bg-[#EDEDEA] dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2563EB] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div ref={questionRef}>
          <QuizQuestion
            question={currentQuestion}
            selectedValue={currentAnswer}
            onSelect={handleSelect}
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`btn-outline py-2 px-4 text-sm cursor-pointer ${
              currentStep === 0 ? 'opacity-30 pointer-events-none' : ''
            }`}
          >
            <ArrowLeft size={14} />
            {t('quizBack')}
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!currentAnswer}
            className={`btn-primary py-2 px-5 text-sm cursor-pointer ${
              !currentAnswer ? 'opacity-30 pointer-events-none' : ''
            }`}
          >
            {currentStep === totalSteps - 1 ? t('quizEvaluate') : t('quizNext')}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Skip link */}
      <button
        type="button"
        onClick={onSkip}
        className="block mx-auto mt-5 text-xs text-[#999] dark:text-[#666] hover:text-[#555] dark:hover:text-[#999] transition-colors underline underline-offset-2 decoration-[#DDD] dark:decoration-[#333] cursor-pointer"
      >
        {t('quizSkip')}
      </button>
    </div>
  )
}
