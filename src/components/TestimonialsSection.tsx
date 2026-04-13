import { useScrollReveal } from '../hooks/useScrollReveal'

const testimonials = [
  {
    quote: 'Wir wollten eigentlich direkt einen Chatbot bauen lassen. Nach der Analyse war klar: Der Engpass liegt woanders. Das hat uns wahrscheinlich 15.000 € gespart.',
    context: 'Geschäftsführer, Service-Unternehmen mit 12 Mitarbeitern',
    tag: 'Fehlinvestition vermieden',
  },
  {
    quote: 'Zum ersten Mal hatte ich das Gefühl, dass mir jemand ehrlich sagt, was Sinn macht — und was nicht. Keine Verkaufsshow, sondern echte Substanz.',
    context: 'Inhaberin, Handwerksbetrieb mit 8 Mitarbeitern',
    tag: 'Unabhängige Beratung',
  },
  {
    quote: 'Nach 90 Minuten wusste ich mehr über die operativen Hebel meines Unternehmens als nach drei Agentur-Pitches. Jetzt arbeiten wir gezielt an den richtigen Stellen.',
    context: 'Geschäftsführer, Dienstleistungsunternehmen',
    tag: 'Klarheit gewonnen',
  },
]

export default function TestimonialsSection() {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const cardsRef = useScrollReveal<HTMLDivElement>(0.1)

  return (
    <section className="py-24 sm:py-32 section-padding bg-white dark:bg-[#0D0D0D]" aria-labelledby="testimonials-heading">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="mb-14">
          <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
            <div className="w-8 h-px bg-[#2563EB]" />
            Das sagen Unternehmer nach der Analyse
          </div>
          <h2 id="testimonials-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white">
            Typische Erfahrungen aus Gesprächen mit Geschäftsführern
          </h2>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.tag} className="bg-[#F7F7F5] dark:bg-white/5 rounded-2xl p-7 border border-[#EDEDEA] dark:border-white/10 flex flex-col">
              <div className="font-mono text-[10px] font-medium tracking-wider uppercase text-[#2563EB] mb-4">{t.tag}</div>
              <p className="text-[15px] text-[#555] dark:text-[#AAA] leading-relaxed italic mb-6 flex-1">
                &bdquo;{t.quote}&ldquo;
              </p>
              <p className="text-xs text-[#999] leading-relaxed">
                — {t.context}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#BBB] dark:text-[#555] mt-6 text-center">
          Aussagen basieren auf typischen Gesprächsmustern mit Geschäftsführern kleiner Service-Unternehmen.
        </p>
      </div>
    </section>
  )
}
