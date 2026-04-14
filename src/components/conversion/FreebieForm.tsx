import { useState, useRef, useEffect, type FormEvent } from 'react'
import { Download, FileText, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { generateFreebiesPDF } from './pdfGenerator'
import { useLanguage } from '../../i18n/LanguageContext'
import type { QuizResultData, TabId } from './types'

interface FreebieFormProps {
  answers: Record<string, string>
  result: QuizResultData
  onContinue: (tab: TabId) => void
}

export default function FreebieForm({ answers, result, onContinue }: FreebieFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [downloaded, setDownloaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { t, lang } = useLanguage()

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !cardRef.current) return
    gsap.fromTo(cardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    generateFreebiesPDF(answers, { name, email, company }, lang)
    setDownloaded(true)
  }

  return (
    <div className="max-w-lg mx-auto" ref={cardRef}>
      <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-8 border border-[#EDEDEA] dark:border-white/10">
        {!downloaded ? (
          <>
            <div className="w-14 h-14 rounded-full bg-[#2563EB]/10 flex items-center justify-center mx-auto mb-5">
              <FileText size={28} className="text-[#2563EB]" />
            </div>

            <div className="font-mono text-[11px] font-medium tracking-wider uppercase text-[#999] dark:text-[#666] mb-3 text-center">
              {t('freebieLabel')}
            </div>

            <h3 className="font-heading text-xl font-bold text-[#1A1A1A] dark:text-white mb-3 text-center">
              {t('freebieHeading')}
            </h3>

            <p className="text-sm text-[#777] dark:text-[#999] leading-relaxed mb-6 text-center">
              {t('freebieSub')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="freebie-name" className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">
                  {t('freebieNameLabel')}
                </label>
                <input
                  type="text"
                  id="freebie-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  placeholder={t('freebieNamePlaceholder')}
                />
              </div>
              <div>
                <label htmlFor="freebie-email" className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">
                  {t('freebieEmailLabel')}
                </label>
                <input
                  type="email"
                  id="freebie-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder={t('freebieEmailPlaceholder')}
                />
              </div>
              <div>
                <label htmlFor="freebie-company" className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">
                  {t('freebieCompanyLabel')}
                </label>
                <input
                  type="text"
                  id="freebie-company"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="input-field"
                  placeholder={t('freebieCompanyPlaceholder')}
                />
              </div>

              <button type="submit" className="btn-primary w-full justify-center cursor-pointer mt-2">
                <Download size={16} />
                {t('freebieDownloadCta')}
              </button>

              <p className="text-[11px] text-[#AAA] dark:text-[#666] text-center leading-relaxed">
                {t('freebiePrivacy')}
              </p>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
              <Download size={28} className="text-green-600" />
            </div>

            <h3 className="font-heading text-xl font-bold text-[#1A1A1A] dark:text-white mb-3">
              {t('freebieDownloadedHeading')}
            </h3>

            <p className="text-sm text-[#777] dark:text-[#999] leading-relaxed mb-6">
              {t('freebieDownloadedText')}
            </p>

            <div className="bg-[#F5F5F0] dark:bg-white/5 rounded-xl p-5 border border-[#EDEDEA] dark:border-white/10 mb-6">
              <div className="font-mono text-[10px] font-medium tracking-wider uppercase text-[#2563EB] mb-2">
                {t('freebieRecommendation')}
              </div>
              <h4 className="font-heading text-base font-bold text-[#1A1A1A] dark:text-white mb-2">
                {result.headline}
              </h4>
              <p className="text-xs text-[#777] dark:text-[#999] leading-relaxed">
                {result.description}
              </p>
            </div>

            <button
              onClick={() => onContinue(result.targetTab)}
              className="btn-primary cursor-pointer mx-auto"
            >
              {t('resultViewOffer')}
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
