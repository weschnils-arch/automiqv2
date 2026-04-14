import { useScrollReveal } from '../hooks/useScrollReveal'
import { ArrowRight, ScanSearch, Scale, Filter, Map, FileCheck } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function AnalyseWertSection() {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const contentRef = useScrollReveal<HTMLDivElement>(0.1)
  const { t } = useLanguage()

  const deliverables = [
    { icon: ScanSearch, titleKey: 'analyseD1Title' as const, textKey: 'analyseD1Text' as const },
    { icon: Scale, titleKey: 'analyseD2Title' as const, textKey: 'analyseD2Text' as const },
    { icon: Filter, titleKey: 'analyseD3Title' as const, textKey: 'analyseD3Text' as const },
    { icon: Map, titleKey: 'analyseD4Title' as const, textKey: 'analyseD4Text' as const },
    { icon: FileCheck, titleKey: 'analyseD5Title' as const, textKey: 'analyseD5Text' as const },
  ]

  const scrollToForm = () => {
    const el = document.getElementById('lead-form')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="py-24 sm:py-32 section-padding bg-white dark:bg-[#0D0D0D]" aria-labelledby="analyse-heading">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="mb-14">
          <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
            <div className="w-8 h-px bg-[#2563EB]" />
            {t('analyseLabel')}
          </div>
          <h2 id="analyse-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white mb-4">
            {t('analyseHeading')}
          </h2>
          <p className="text-[clamp(0.95rem,1.1vw,1.1rem)] text-[#777] dark:text-[#999] leading-[1.8] max-w-3xl">
            {t('analyseSub')}
          </p>
        </div>

        <div ref={contentRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {deliverables.map((d, i) => (
            <div
              key={d.titleKey}
              className={`bg-[#F7F7F5] dark:bg-white/5 rounded-xl p-6 border border-[#EDEDEA] dark:border-white/10 ${
                i === deliverables.length - 1 && deliverables.length % 3 === 2 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#2563EB]/10 flex items-center justify-center mb-4">
                <d.icon size={18} className="text-[#2563EB]" />
              </div>
              <h3 className="font-heading text-[15px] font-semibold text-[#1A1A1A] dark:text-white mb-2">{t(d.titleKey)}</h3>
              <p className="text-sm text-[#777] dark:text-[#999] leading-relaxed">{t(d.textKey)}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#F5F5F0] dark:bg-white/5 rounded-xl p-6 border border-[#EDEDEA] dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <p className="text-[15px] text-[#555] dark:text-[#AAA] leading-relaxed max-w-lg">
            <strong className="text-[#1A1A1A] dark:text-white">{t('analyseCostStrong')}</strong>{t('analyseCostText')}
          </p>
          <button onClick={scrollToForm} className="btn-primary whitespace-nowrap cursor-pointer shrink-0">
            {t('analyseBookCta')}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
