import { useScrollReveal } from '../hooks/useScrollReveal'
import { ArrowRight, ScanSearch, Scale, Filter, Map, FileCheck } from 'lucide-react'

const deliverables = [
  {
    icon: ScanSearch,
    title: 'Strategischer Realitätscheck',
    text: 'Wo steht Ihr Unternehmen operativ? Welche Prozesse fressen am meisten Zeit, Geld und Nerven?',
  },
  {
    icon: Scale,
    title: 'Unabhängige Diagnose',
    text: 'Keine Verkaufsagenda. Wir analysieren neutral, was Sinn macht — und was nicht. Auch wenn das bedeutet: nichts tun.',
  },
  {
    icon: Filter,
    title: 'Filter gegen Fehlinvestitionen',
    text: 'Sie erfahren, welche Lösungen Sie nicht brauchen — bevor Sie Tausende Euro in das falsche Projekt stecken.',
  },
  {
    icon: Map,
    title: 'Priorisierte Roadmap',
    text: 'Ein klarer Fahrplan: Was zuerst, was später, was gar nicht. Auf Basis von ROI, Aufwand und Ihrem Geschäftsmodell.',
  },
  {
    icon: FileCheck,
    title: 'Entscheidungsgrundlage',
    text: 'Sie entscheiden danach selbst — ob mit Automiq, einem anderen Anbieter oder gar nicht. Die Analyse gehört Ihnen.',
  },
]

export default function AnalyseWertSection() {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const contentRef = useScrollReveal<HTMLDivElement>(0.1)

  const scrollToForm = () => {
    const el = document.getElementById('lead-form')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="py-24 sm:py-32 section-padding bg-white dark:bg-[#0D0D0D]" aria-labelledby="analyse-heading">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="mb-14">
          <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
            <div className="w-8 h-px bg-[#2563EB]" />
            Die Potenzialanalyse
          </div>
          <h2 id="analyse-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white mb-4">
            250 € für Klarheit — nicht für ein Gespräch.
          </h2>
          <p className="text-[clamp(0.95rem,1.1vw,1.1rem)] text-[#777] dark:text-[#999] leading-[1.8] max-w-3xl">
            Sie bezahlen nicht für ein Erstgespräch. Sie bezahlen dafür, dass Sie nach 90 Minuten wissen, wo in Ihrem Unternehmen wirklich Hebel liegen, was ignoriert werden kann und welche Investition sich tatsächlich lohnt.
          </p>
        </div>

        <div ref={contentRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {deliverables.map((d, i) => (
            <div
              key={d.title}
              className={`bg-[#F7F7F5] dark:bg-white/5 rounded-xl p-6 border border-[#EDEDEA] dark:border-white/10 ${
                i === deliverables.length - 1 && deliverables.length % 3 === 2 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#2563EB]/10 flex items-center justify-center mb-4">
                <d.icon size={18} className="text-[#2563EB]" />
              </div>
              <h3 className="font-heading text-[15px] font-semibold text-[#1A1A1A] dark:text-white mb-2">{d.title}</h3>
              <p className="text-sm text-[#777] dark:text-[#999] leading-relaxed">{d.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#F5F5F0] dark:bg-white/5 rounded-xl p-6 border border-[#EDEDEA] dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <p className="text-[15px] text-[#555] dark:text-[#AAA] leading-relaxed max-w-lg">
            <strong className="text-[#1A1A1A] dark:text-white">250 € sind kein Kostenpunkt</strong> — sondern ein kleiner Einsatz, um potenziell Tausende Euro an falschen Projekten, Tools oder Agenturleistungen zu vermeiden.
          </p>
          <button onClick={scrollToForm} className="btn-primary whitespace-nowrap cursor-pointer shrink-0">
            Jetzt Analyse buchen
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
