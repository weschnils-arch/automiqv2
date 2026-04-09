import { useScrollReveal } from '../hooks/useScrollReveal'

const steps = [
  {
    num: '01',
    title: 'Ihre Potenzialanalyse (90 Min.)',
    text: 'Wir analysieren Ihre aktuellen Workflows und identifizieren die größten Hebel für AI-Automatisierung in Ihrem Unternehmen. Sie erhalten einen konkreten Fahrplan mit messbaren KPIs.',
  },
  {
    num: '02',
    title: 'Maßgeschneiderte Empfehlung',
    text: 'Basierend auf der Analyse präsentieren wir Ihnen die optimale AI-Lösung – oft mit Qualimero, dem führenden Anbieter für digitale Mitarbeiter, der perfekt zu Ihren Bedürfnissen passt.',
  },
  {
    num: '03',
    title: 'Implementierung & Skalierung',
    text: 'Wir begleiten Sie bei der nahtlosen Integration der AI-Lösung und stellen sicher, dass Sie sofort von den Vorteilen profitieren. Ihr Business wächst, Ihre Kosten sinken, Ihr Team wird entlastet.',
  },
]

export default function SolutionSection() {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const stepsRef = useScrollReveal<HTMLDivElement>(0.1)

  return (
    <section id="solution" className="py-24 sm:py-32 section-padding bg-white dark:bg-[#0D0D0D]" aria-labelledby="solution-heading">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="mb-14">
          <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
            <div className="w-8 h-px bg-[#2563EB]" />
            Ihr Weg
          </div>
          <h2 id="solution-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white">
            Der einfache Weg zu Ihrem AI-Vorsprung: In 3 Schritten zur Transformation
          </h2>
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
                <h3 className="font-heading text-xl font-semibold text-[#1A1A1A] dark:text-white mb-3">{step.title}</h3>
                <p className="text-sm text-[#777] dark:text-[#999] leading-relaxed max-w-lg">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
