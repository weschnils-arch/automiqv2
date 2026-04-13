import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const faqs = [
  {
    question: 'Was genau bekomme ich für 250 €?',
    answer: 'Eine 90-minütige strategische Analyse Ihrer operativen Abläufe plus einen schriftlichen Audit-Bericht mit priorisierter Roadmap. Sie wissen danach, wo die echten Hebel liegen, was sich automatisieren lässt und was Sie getrost ignorieren können.',
  },
  {
    question: 'Warum kostet die Analyse etwas, wenn andere ein kostenloses Erstgespräch anbieten?',
    answer: 'Ein kostenloses Erstgespräch hat fast immer eine Verkaufsagenda — es geht darum, Ihnen ein Projekt oder Tool zu verkaufen. Unsere Analyse ist ein eigenständiges Beratungsprodukt mit echtem Wert. Sie bekommen unabhängige Diagnose, keine Verkaufsshow.',
  },
  {
    question: 'Muss ich danach mit Automiq zusammenarbeiten?',
    answer: 'Nein. Die Analyse gehört Ihnen — Sie können sie mit jedem Anbieter umsetzen oder auch gar nicht. Es gibt keine Verpflichtung, kein Abo und keinen versteckten Haken.',
  },
  {
    question: 'Für welche Unternehmen ist die Analyse gedacht?',
    answer: 'Für Unternehmen mit ca. 5–50 Mitarbeitern, deren Inhaber oder Geschäftsführer operativ eingebunden sind und wissen, dass Automatisierung wichtig wird — aber nicht, wo anfangen.',
  },
  {
    question: 'Was passiert, wenn die Analyse ergibt, dass ich noch nichts automatisieren sollte?',
    answer: 'Dann sagen wir Ihnen genau das. Wir haben kein Interesse, Ihnen etwas zu verkaufen, das keinen Hebel hat. Klarheit bedeutet manchmal auch: Jetzt ist nicht der richtige Zeitpunkt.',
  },
  {
    question: 'Wie läuft der Termin ab?',
    answer: 'Kurzes Vorgespräch (15 Min.) zur Vorbereitung, dann 90 Minuten strukturierte Analyse Ihrer Prozesse, Engpässe und Potenziale. Im Anschluss erhalten Sie einen schriftlichen Bericht mit konkreter Priorisierung.',
  },
  {
    question: 'Brauche ich technisches Vorwissen?',
    answer: 'Nein. Wir sprechen Ihre Sprache — Geschäftsprozesse, nicht Technik. Sie müssen nichts über KI oder Automatisierung wissen. Genau dafür sind wir da.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const headingRef = useScrollReveal<HTMLDivElement>()
  const contentRef = useScrollReveal<HTMLDivElement>(0.1)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className="py-24 sm:py-32 section-padding bg-white dark:bg-[#0D0D0D]" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <div ref={headingRef} className="mb-14">
          <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
            <div className="w-8 h-px bg-[#2563EB]" />
            Häufige Fragen
          </div>
          <h2 id="faq-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white">
            Alles, was Sie vor der Buchung wissen sollten.
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
                  {faq.question}
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
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
