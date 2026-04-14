import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const headingRef = useScrollReveal<HTMLDivElement>()
  const contentRef = useScrollReveal<HTMLDivElement>(0.1)
  const { t } = useLanguage()

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  const faqs = [
    { qKey: 'faq1Q' as const, aKey: 'faq1A' as const },
    { qKey: 'faq2Q' as const, aKey: 'faq2A' as const },
    { qKey: 'faq3Q' as const, aKey: 'faq3A' as const },
    { qKey: 'faq4Q' as const, aKey: 'faq4A' as const },
    { qKey: 'faq5Q' as const, aKey: 'faq5A' as const },
    { qKey: 'faq6Q' as const, aKey: 'faq6A' as const },
    { qKey: 'faq7Q' as const, aKey: 'faq7A' as const },
  ]

  return (
    <section className="py-24 sm:py-32 section-padding bg-white dark:bg-[#0D0D0D]" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <div ref={headingRef} className="mb-14">
          <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
            <div className="w-8 h-px bg-[#2563EB]" />
            {t('faqLabel')}
          </div>
          <h2 id="faq-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white">
            {t('faqHeading')}
          </h2>
        </div>

        <div ref={contentRef} className="space-y-0">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border-b border-[#EDEDEA] dark:border-[#222] ${i === 0 ? 'border-t' : ''}`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
              >
                <span className="font-heading text-[15px] font-semibold text-[#1A1A1A] dark:text-white pr-4 group-hover:text-[#2563EB] transition-colors">
                  {t(faq.qKey)}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-[#999] shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-[300px] pb-5' : 'max-h-0'
                }`}
              >
                <p className="text-sm text-[#777] dark:text-[#999] leading-relaxed pr-8">
                  {t(faq.aKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
