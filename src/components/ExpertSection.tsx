import { useScrollReveal } from '../hooks/useScrollReveal'
import { Users, Bot, Handshake } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function ExpertSection() {
  const ref = useScrollReveal<HTMLElement>()
  const { t } = useLanguage()

  const stats = [
    { icon: Users, valueKey: 'expertStat1Value' as const, labelKey: 'expertStat1Label' as const },
    { icon: Bot, valueKey: 'expertStat2Value' as const, labelKey: 'expertStat2Label' as const },
    { icon: Handshake, valueKey: 'expertStat3Value' as const, labelKey: 'expertStat3Label' as const },
  ]

  return (
    <section ref={ref} className="py-24 sm:py-32 section-padding" aria-labelledby="expert-heading">
      <div className="max-w-5xl mx-auto">
        <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
          <div className="w-8 h-px bg-[#2563EB]" />
          {t('expertLabel')}
        </div>

        <div className="grid md:grid-cols-[280px_1fr] gap-10 items-start mt-8">
          {/* Photo */}
          <div className="rounded-2xl overflow-hidden border border-[#EDEDEA] dark:border-white/10">
            <img
              src="/michael.webp"
              alt="Michael Christian Zarre"
              className="w-full aspect-[3/4] object-cover object-top"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div>
            <h2 id="expert-heading" className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white mb-1">
              Michael Christian Zarre
            </h2>
            <p className="font-mono text-[11px] font-medium tracking-wider uppercase text-[#2563EB] mb-5">
              {t('expertRole')}
            </p>

            <p className="text-[15px] text-[#555] dark:text-[#AAA] leading-relaxed mb-8">
              {t('expertBio')}
            </p>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.labelKey} className="bg-[#F7F7F5] dark:bg-white/5 rounded-xl p-4 border border-[#EDEDEA] dark:border-white/10">
                  <s.icon size={18} className="text-[#2563EB] mb-2" />
                  <div className="font-heading text-base font-bold text-[#1A1A1A] dark:text-white mb-1">{t(s.valueKey)}</div>
                  <div className="text-[11px] text-[#999] dark:text-[#666] leading-snug">{t(s.labelKey)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
