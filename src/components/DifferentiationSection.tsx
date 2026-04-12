import { useScrollReveal } from '../hooks/useScrollReveal'

const comparisons = [
  {
    agency: 'Kostenloses Erstgespräch mit Verkaufsagenda',
    automiq: 'Bezahlte Analyse mit eigenständigem Wert',
  },
  {
    agency: 'Verkauft häufig eine Lösung aus dem eigenen Sortiment',
    automiq: 'Startet mit einer unabhängigen Diagnose',
  },
  {
    agency: 'Fokus auf Tools, Setups und technische Umsetzung',
    automiq: 'Fokus auf Engpässe, Prozesse, ROI und Priorisierung',
  },
  {
    agency: 'Setzt voraus, dass der Kunde weiß, was er will',
    automiq: 'Hilft dem Kunden zuerst zu verstehen, was überhaupt Sinn macht',
  },
  {
    agency: 'Liefert oft ein isoliertes Tool',
    automiq: 'Liefert Roadmap, Orientierung und Entscheidungsgrundlage',
  },
  {
    agency: 'Verdient an Umsetzung',
    automiq: 'Schafft zuerst Klarheit, ob und was umgesetzt werden sollte',
  },
]

export default function DifferentiationSection() {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const tableRef = useScrollReveal<HTMLDivElement>(0.1)

  return (
    <section id="differenzierung" className="py-24 sm:py-32 section-padding" aria-labelledby="diff-heading">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="mb-14">
          <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
            <div className="w-8 h-px bg-[#2563EB]" />
            Warum nicht einfach eine Agency?
          </div>
          <h2 id="diff-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white mb-4">
            Ein kostenloses Agenturgespräch verkauft Ihnen meist eine Lösung. Wir zeigen Ihnen zuerst, was Ihr Unternehmen wirklich braucht.
          </h2>
          <p className="text-[clamp(0.95rem,1.1vw,1.1rem)] text-[#777] dark:text-[#999] leading-[1.8] max-w-3xl">
            Viele Unternehmen fragen sich: Warum soll ich 250 € für eine Analyse bezahlen, wenn mir eine Agency ein kostenloses Erstgespräch anbietet? Die Antwort ist einfach: Weil ein kostenloses Gespräch selten unabhängig ist.
          </p>
        </div>

        <div ref={tableRef} className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Header */}
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="font-heading text-xs font-bold tracking-wide uppercase text-[#999] dark:text-[#666] px-5">
                Klassische AI-Agency
              </div>
              <div className="font-heading text-xs font-bold tracking-wide uppercase text-[#2563EB] px-5">
                Automiq AI Consulting
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
                  {c.agency}
                </div>
                <div className="px-5 py-4 text-sm text-[#1A1A1A] dark:text-white leading-relaxed font-medium">
                  {c.automiq}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-[#F5F5F0] dark:bg-white/5 rounded-xl p-6 border border-[#EDEDEA] dark:border-white/10">
          <p className="text-[15px] text-[#555] dark:text-[#AAA] leading-relaxed">
            <strong className="text-[#1A1A1A] dark:text-white">Kleine Unternehmen kaufen zu oft zu früh eine Lösung — und zu spät Klarheit.</strong> Automiq setzt genau dort an: Bevor Geld in die falsche Richtung fließt. Bevor ein Chatbot gekauft wird, der niemand braucht. Bevor technische Arbeit eingekauft wird, ohne zu wissen, ob dort überhaupt der größte Hebel liegt.
          </p>
        </div>
      </div>
    </section>
  )
}
