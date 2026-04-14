import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function TestimonialsSection() {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const cardsRef = useScrollReveal<HTMLDivElement>(0.1)
  const { t } = useLanguage()

  const testimonials = [
    { quoteKey: 'testimonial1Quote' as const, contextKey: 'testimonial1Context' as const, tagKey: 'testimonial1Tag' as const },
    { quoteKey: 'testimonial2Quote' as const, contextKey: 'testimonial2Context' as const, tagKey: 'testimonial2Tag' as const },
    { quoteKey: 'testimonial3Quote' as const, contextKey: 'testimonial3Context' as const, tagKey: 'testimonial3Tag' as const },
  ]

  return (
    <section className="py-24 sm:py-32 section-padding bg-white dark:bg-[#0D0D0D]" aria-labelledby="testimonials-heading">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="mb-14">
          <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
            <div className="w-8 h-px bg-[#2563EB]" />
            {t('testimonialsLabel')}
          </div>
          <h2 id="testimonials-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white">
            {t('testimonialsHeading')}
          </h2>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((tm) => (
            <div key={tm.tagKey} className="bg-[#F7F7F5] dark:bg-white/5 rounded-2xl p-7 border border-[#EDEDEA] dark:border-white/10 flex flex-col">
              <div className="font-mono text-[10px] font-medium tracking-wider uppercase text-[#2563EB] mb-4">{t(tm.tagKey)}</div>
              <p className="text-[15px] text-[#555] dark:text-[#AAA] leading-relaxed italic mb-6 flex-1">
                &ldquo;{t(tm.quoteKey)}&rdquo;
              </p>
              <p className="text-xs text-[#999] leading-relaxed">
                — {t(tm.contextKey)}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#BBB] dark:text-[#555] mt-6 text-center">
          {t('testimonialsDisclaimer')}
        </p>
      </div>
    </section>
  )
}
