import { useEffect, useRef } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import gsap from 'gsap'
import { useLanguage } from '../../i18n/LanguageContext'
import type { QuizResultData, TabId } from './types'

interface QuizResultProps {
  result: QuizResultData
  onContinue: (tab: TabId) => void
}

export default function QuizResult({ result, onContinue }: QuizResultProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !cardRef.current) return
    gsap.fromTo(cardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
  }, [])

  return (
    <div className="max-w-lg mx-auto" ref={cardRef}>
      <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-8 border border-[#EDEDEA] dark:border-white/10 text-center">
        <div className="w-14 h-14 rounded-full bg-[#2563EB]/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={28} className="text-[#2563EB]" />
        </div>

        <div className="font-mono text-[11px] font-medium tracking-wider uppercase text-[#999] dark:text-[#666] mb-3">
          {t('resultLabel')}
        </div>

        <h3 className="font-heading text-xl font-bold text-[#1A1A1A] dark:text-white mb-3">
          {result.headline}
        </h3>

        <p className="text-sm text-[#777] dark:text-[#999] leading-relaxed mb-8">
          {result.description}
        </p>

        <button
          onClick={() => onContinue(result.targetTab)}
          className="btn-primary cursor-pointer mx-auto"
        >
          {t('resultViewOffer')}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
