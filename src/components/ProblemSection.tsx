import { useScrollReveal } from '../hooks/useScrollReveal'
import { UserRound, FileQuestion, TrendingDown, Clock, HelpCircle, CircleDollarSign } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function ProblemSection() {
  const ref = useScrollReveal<HTMLElement>()
  const { t } = useLanguage()

  const painPoints = [
    { icon: UserRound, headlineKey: 'pain1Headline' as const, textKey: 'pain1Text' as const },
    { icon: FileQuestion, headlineKey: 'pain2Headline' as const, textKey: 'pain2Text' as const },
    { icon: TrendingDown, headlineKey: 'pain3Headline' as const, textKey: 'pain3Text' as const },
    { icon: Clock, headlineKey: 'pain4Headline' as const, textKey: 'pain4Text' as const },
    { icon: HelpCircle, headlineKey: 'pain5Headline' as const, textKey: 'pain5Text' as const },
    { icon: CircleDollarSign, headlineKey: 'pain6Headline' as const, textKey: 'pain6Text' as const },
  ]

  return (
    <section ref={ref} className="py-24 sm:py-32 section-padding" aria-labelledby="problem-heading">
      <div className="max-w-5xl mx-auto">
        <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
          <div className="w-8 h-px bg-[#2563EB]" />
          {t('problemLabel')}
        </div>
        <h2 id="problem-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white mb-4">
          {t('problemHeading')}
        </h2>
        <p className="text-[clamp(0.95rem,1.1vw,1.1rem)] text-[#777] dark:text-[#999] leading-[1.8] mb-12 max-w-3xl">
          {t('problemSub')}
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {painPoints.map((p) => (
            <div key={p.headlineKey} className="bg-white/80 dark:bg-white/5 rounded-xl p-6 border border-[#EDEDEA] dark:border-white/10 flex gap-4">
              <div className="w-9 h-9 rounded-lg bg-[#2563EB]/10 flex items-center justify-center shrink-0">
                <p.icon size={18} className="text-[#2563EB]" />
              </div>
              <div>
                <h3 className="font-heading text-[15px] font-semibold text-[#1A1A1A] dark:text-white mb-2">{t(p.headlineKey)}</h3>
                <p className="text-sm text-[#777] dark:text-[#999] leading-relaxed">{t(p.textKey)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#F5F5F0] dark:bg-white/5 rounded-xl p-6 border border-[#EDEDEA] dark:border-white/10">
          <p className="text-[15px] text-[#555] dark:text-[#AAA] leading-relaxed italic">
            &ldquo;{t('problemQuote')}&rdquo;
          </p>
          <p className="text-xs text-[#999] mt-2">{t('problemQuoteAttr')}</p>
        </div>
      </div>
    </section>
  )
}
