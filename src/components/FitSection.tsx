import { useScrollReveal } from '../hooks/useScrollReveal'
import { Check, X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function FitSection() {
  const ref = useScrollReveal<HTMLElement>()
  const { t } = useLanguage()

  const fitForKeys = ['fitFor1', 'fitFor2', 'fitFor3', 'fitFor4', 'fitFor5', 'fitFor6'] as const
  const notForKeys = ['notFor1', 'notFor2', 'notFor3', 'notFor4'] as const

  return (
    <section ref={ref} className="py-24 sm:py-32 section-padding" aria-labelledby="fit-heading">
      <div className="max-w-5xl mx-auto">
        <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
          <div className="w-8 h-px bg-[#2563EB]" />
          {t('fitLabel')}
        </div>
        <h2 id="fit-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white mb-12">
          {t('fitHeading')}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* For */}
          <div className="bg-white dark:bg-white/5 rounded-2xl p-7 border border-[#EDEDEA] dark:border-white/10">
            <h3 className="font-heading text-lg font-bold text-[#1A1A1A] dark:text-white mb-6">{t('fitForTitle')}</h3>
            <ul className="space-y-4">
              {fitForKeys.map((key) => (
                <li key={key} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#2563EB]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-[#2563EB]" />
                  </div>
                  <span className="text-sm text-[#555] dark:text-[#AAA] leading-relaxed">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not for */}
          <div className="bg-white dark:bg-white/5 rounded-2xl p-7 border border-[#EDEDEA] dark:border-white/10">
            <h3 className="font-heading text-lg font-bold text-[#1A1A1A] dark:text-white mb-6">{t('fitNotForTitle')}</h3>
            <ul className="space-y-4">
              {notForKeys.map((key) => (
                <li key={key} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1A1A1A]/5 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <X size={12} className="text-[#999]" />
                  </div>
                  <span className="text-sm text-[#555] dark:text-[#AAA] leading-relaxed">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
