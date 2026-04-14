import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function SolutionSection() {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const stepsRef = useScrollReveal<HTMLDivElement>(0.1)
  const { t } = useLanguage()

  const steps = [
    { num: '01', titleKey: 'solution1Title' as const, textKey: 'solution1Text' as const },
    { num: '02', titleKey: 'solution2Title' as const, textKey: 'solution2Text' as const },
    { num: '03', titleKey: 'solution3Title' as const, textKey: 'solution3Text' as const },
    { num: '04', titleKey: 'solution4Title' as const, textKey: 'solution4Text' as const },
  ]

  return (
    <section id="solution" className="py-24 sm:py-32 section-padding bg-white dark:bg-[#0D0D0D]" aria-labelledby="solution-heading">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="mb-14">
          <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
            <div className="w-8 h-px bg-[#2563EB]" />
            {t('solutionLabel')}
          </div>
          <h2 id="solution-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white mb-4">
            {t('solutionHeading')}
          </h2>
          <p className="text-[clamp(0.95rem,1.1vw,1.1rem)] text-[#777] dark:text-[#999] leading-[1.8] max-w-3xl">
            {t('solutionSub')}
          </p>
        </div>

        <div ref={stepsRef}>
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`grid sm:grid-cols-[80px_1fr] gap-6 py-10 ${
                i < steps.length - 1 ? 'border-b border-[#EDEDEA] dark:border-[#222]' : ''
              }`}
            >
              <div className="font-mono text-4xl font-bold text-[#2563EB]/20">{step.num}</div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-[#1A1A1A] dark:text-white mb-3">{t(step.titleKey)}</h3>
                <p className="text-sm text-[#777] dark:text-[#999] leading-relaxed max-w-lg">{t(step.textKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
