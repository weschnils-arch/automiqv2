import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function DifferentiationSection() {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const tableRef = useScrollReveal<HTMLDivElement>(0.1)
  const { t } = useLanguage()

  const comparisons = [
    { agencyKey: 'diffAgency1' as const, automiqKey: 'diffAutomiq1' as const },
    { agencyKey: 'diffAgency2' as const, automiqKey: 'diffAutomiq2' as const },
    { agencyKey: 'diffAgency3' as const, automiqKey: 'diffAutomiq3' as const },
    { agencyKey: 'diffAgency4' as const, automiqKey: 'diffAutomiq4' as const },
    { agencyKey: 'diffAgency5' as const, automiqKey: 'diffAutomiq5' as const },
    { agencyKey: 'diffAgency6' as const, automiqKey: 'diffAutomiq6' as const },
  ]

  return (
    <section id="differenzierung" className="py-24 sm:py-32 section-padding" aria-labelledby="diff-heading">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="mb-14">
          <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
            <div className="w-8 h-px bg-[#2563EB]" />
            {t('diffLabel')}
          </div>
          <h2 id="diff-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white mb-4">
            {t('diffHeading')}
          </h2>
          <p className="text-[clamp(0.95rem,1.1vw,1.1rem)] text-[#777] dark:text-[#999] leading-[1.8] max-w-3xl">
            {t('diffSub')}
          </p>
        </div>

        <div ref={tableRef} className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Header */}
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="font-heading text-xs font-bold tracking-wide uppercase text-[#999] dark:text-[#666] px-5">
                {t('diffHeaderAgency')}
              </div>
              <div className="font-heading text-xs font-bold tracking-wide uppercase text-[#2563EB] px-5">
                {t('diffHeaderAutomiq')}
              </div>
            </div>

            {/* Rows */}
            {comparisons.map((c, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 gap-4 ${
                  i % 2 === 0 ? 'bg-[#F5F5F0] dark:bg-white/[0.03]' : ''
                }`}
              >
                <div className="px-5 py-4 text-sm text-[#777] dark:text-[#999] leading-relaxed">
                  {t(c.agencyKey)}
                </div>
                <div className="px-5 py-4 text-sm text-[#1A1A1A] dark:text-white leading-relaxed font-medium">
                  {t(c.automiqKey)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-[#F5F5F0] dark:bg-white/5 rounded-xl p-6 border border-[#EDEDEA] dark:border-white/10">
          <p className="text-[15px] text-[#555] dark:text-[#AAA] leading-relaxed">
            <strong className="text-[#1A1A1A] dark:text-white">{t('diffBottomStrong')}</strong>{t('diffBottomText')}
          </p>
        </div>
      </div>
    </section>
  )
}
