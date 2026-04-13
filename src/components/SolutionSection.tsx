import { useScrollReveal } from '../hooks/useScrollReveal'

const steps = [
  {
    num: '01',
    title: 'Kostenloses KI-Quick-Audit',
    text: 'Kurzes Quiz zu Ihrem Unternehmen — in 2 Minuten erhalten Sie eine individuelle PDF-Analyse mit 3 konkreten Hebeln, die Sie sofort umsetzen können. Inklusive kostenloser Tools und Tipps.',
  },
  {
    num: '02',
    title: 'Die Potenzialanalyse (90 Min.)',
    text: 'Gemeinsam analysieren wir Ihre operativen Abläufe: Wo verlieren Sie Zeit? Wo liegt verstecktes Potenzial? Welche Prozesse lassen sich sinnvoll automatisieren — und welche nicht? Kein Tool-Pitch, sondern echte Diagnose.',
  },
  {
    num: '03',
    title: 'Ihr Audit-Bericht & Roadmap',
    text: 'Sie erhalten einen schriftlichen Bericht mit klarer Priorisierung: Was sich zuerst lohnt, was warten kann, was Sie ignorieren sollten. Inklusive Kostenrahmen und realistischer Einschätzung.',
  },
  {
    num: '04',
    title: 'Umsetzung — optional, nicht Pflicht',
    text: 'Wenn Sie möchten, begleiten wir die Umsetzung. Wenn nicht, haben Sie trotzdem eine fundierte Entscheidungsgrundlage — für jeden Anbieter.',
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
            So läuft es ab
          </div>
          <h2 id="solution-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white mb-4">
            Vom Erstgespräch zur Klarheit — in vier konkreten Schritten.
          </h2>
          <p className="text-[clamp(0.95rem,1.1vw,1.1rem)] text-[#777] dark:text-[#999] leading-[1.8] max-w-3xl">
            Kein Verkaufsgespräch. Kein Tool-Pitch. Sondern ein strukturierter Prozess, der Ihnen echte Orientierung gibt.
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
