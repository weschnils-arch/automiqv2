import { useScrollReveal } from '../hooks/useScrollReveal'
import { Check, X } from 'lucide-react'

const fitFor = [
  'Sie führen ein Service-Unternehmen mit 5–15 Mitarbeitern',
  'Sie sind operativ eingebunden und haben keine Zeit für Recherche',
  'Wachstum erzeugt bei Ihnen mehr Chaos statt mehr Gewinn',
  'Sie wissen, dass Automatisierung wichtig wird — aber nicht, wo anfangen',
  'Sie wollen vermeiden, Geld in die falschen Tools oder Projekte zu stecken',
  'Sie suchen Orientierung, keine Verkaufsgespräche',
]

const notFor = [
  'Ihr Unternehmen hat bereits eine klare Digitalstrategie und interne Kapazitäten',
  'Sie suchen nur ein einzelnes Tool und wissen genau, welches',
  'Sie wollen keine 250 € investieren, bevor Sie eine Entscheidung treffen',
  'Sie erwarten eine fertige Lösung nach dem Erstgespräch',
]

export default function FitSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className="py-24 sm:py-32 section-padding" aria-labelledby="fit-heading">
      <div className="max-w-5xl mx-auto">
        <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
          <div className="w-8 h-px bg-[#2563EB]" />
          Ist das der richtige Schritt für Sie?
        </div>
        <h2 id="fit-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white mb-12">
          Für wen die Potenzialanalyse gemacht ist — und für wen nicht.
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* For */}
          <div className="bg-white dark:bg-white/5 rounded-2xl p-7 border border-[#EDEDEA] dark:border-white/10">
            <h3 className="font-heading text-lg font-bold text-[#1A1A1A] dark:text-white mb-6">Ideal für Sie, wenn:</h3>
            <ul className="space-y-4">
              {fitFor.map((item) => (
                <li key={item} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#2563EB]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-[#2563EB]" />
                  </div>
                  <span className="text-sm text-[#555] dark:text-[#AAA] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not for */}
          <div className="bg-white dark:bg-white/5 rounded-2xl p-7 border border-[#EDEDEA] dark:border-white/10">
            <h3 className="font-heading text-lg font-bold text-[#1A1A1A] dark:text-white mb-6">Eher nicht, wenn:</h3>
            <ul className="space-y-4">
              {notFor.map((item) => (
                <li key={item} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1A1A1A]/5 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <X size={12} className="text-[#999]" />
                  </div>
                  <span className="text-sm text-[#555] dark:text-[#AAA] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
