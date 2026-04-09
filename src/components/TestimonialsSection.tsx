import { useScrollReveal } from '../hooks/useScrollReveal'

const testimonials = [
  {
    quote: 'Dank der Potenzialanalyse haben wir erkannt, wo AI uns wirklich hilft. Die Implementierung war einfacher als gedacht und wir sparen jetzt Tausende Euro im Monat!',
    name: 'Thomas Weber',
    role: 'Geschäftsführer, E-Commerce Unternehmen',
  },
  {
    quote: 'Ich war skeptisch, aber die Ergebnisse sprechen für sich. Unsere Kunden lieben den 24/7 Support und mein Team kann sich endlich auf das Wesentliche konzentrieren.',
    name: 'Anna Schmidt',
    role: 'Head of Customer Service',
  },
]

export default function TestimonialsSection() {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const cardsRef = useScrollReveal<HTMLDivElement>(0.1)

  return (
    <section className="py-24 sm:py-32 section-padding" aria-labelledby="testimonials-heading">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="mb-14">
          <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
            <div className="w-8 h-px bg-[#2563EB]" />
            Kundenstimmen
          </div>
          <h2 id="testimonials-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white">
            Was unsere Kunden sagen: Echte Ergebnisse, echte Transformation
          </h2>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-[#EDEDEA] dark:border-white/10">
              <p className="text-[15px] text-[#555] dark:text-[#AAA] leading-relaxed italic mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1A1A1A] dark:bg-white/10 flex items-center justify-center font-heading text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-[#1A1A1A] dark:text-white">{t.name}</p>
                  <p className="text-xs text-[#999]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
