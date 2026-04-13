import { useState, useRef, useEffect, type FormEvent } from 'react'
import { Download, FileText, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { generateFreebiesPDF } from './pdfGenerator'
import type { QuizResultData, TabId } from './types'

interface FreebieFormProps {
  answers: Record<string, string>
  result: QuizResultData
  onContinue: (tab: TabId) => void
}

export default function FreebieForm({ answers, result, onContinue }: FreebieFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [downloaded, setDownloaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !cardRef.current) return
    gsap.fromTo(cardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    generateFreebiesPDF(answers, { name, email, company })
    setDownloaded(true)
  }

  return (
    <div className="max-w-lg mx-auto" ref={cardRef}>
      <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-8 border border-[#EDEDEA] dark:border-white/10">
        {!downloaded ? (
          <>
            <div className="w-14 h-14 rounded-full bg-[#2563EB]/10 flex items-center justify-center mx-auto mb-5">
              <FileText size={28} className="text-[#2563EB]" />
            </div>

            <div className="font-mono text-[11px] font-medium tracking-wider uppercase text-[#999] dark:text-[#666] mb-3 text-center">
              Ihre kostenlose Analyse ist fertig
            </div>

            <h3 className="font-heading text-xl font-bold text-[#1A1A1A] dark:text-white mb-3 text-center">
              3 konkrete KI-Hebel für Ihr Unternehmen
            </h3>

            <p className="text-sm text-[#777] dark:text-[#999] leading-relaxed mb-6 text-center">
              Basierend auf Ihren Angaben haben wir eine individuelle PDF mit konkreten Tools und Tipps erstellt, die Sie sofort umsetzen können.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="freebie-name" className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  id="freebie-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  placeholder="Ihr vollständiger Name"
                />
              </div>
              <div>
                <label htmlFor="freebie-email" className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="freebie-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="max@unternehmen.de"
                />
              </div>
              <div>
                <label htmlFor="freebie-company" className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">
                  Unternehmen *
                </label>
                <input
                  type="text"
                  id="freebie-company"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="input-field"
                  placeholder="Firmenname"
                />
              </div>

              <button type="submit" className="btn-primary w-full justify-center cursor-pointer mt-2">
                <Download size={16} />
                Kostenlose Analyse herunterladen
              </button>

              <p className="text-[11px] text-[#AAA] dark:text-[#666] text-center leading-relaxed">
                Kein Spam. Ihre Daten werden nur für die Kontaktaufnahme verwendet.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
              <Download size={28} className="text-green-600" />
            </div>

            <h3 className="font-heading text-xl font-bold text-[#1A1A1A] dark:text-white mb-3">
              PDF wurde heruntergeladen!
            </h3>

            <p className="text-sm text-[#777] dark:text-[#999] leading-relaxed mb-6">
              Schauen Sie sich die 3 Hebel in Ruhe an. Für eine tiefgehende Analyse mit einem Experten empfehlen wir die KI-Potenzialanalyse.
            </p>

            <div className="bg-[#F5F5F0] dark:bg-white/5 rounded-xl p-5 border border-[#EDEDEA] dark:border-white/10 mb-6">
              <div className="font-mono text-[10px] font-medium tracking-wider uppercase text-[#2563EB] mb-2">
                Unsere Empfehlung
              </div>
              <h4 className="font-heading text-base font-bold text-[#1A1A1A] dark:text-white mb-2">
                {result.headline}
              </h4>
              <p className="text-xs text-[#777] dark:text-[#999] leading-relaxed">
                {result.description}
              </p>
            </div>

            <button
              onClick={() => onContinue(result.targetTab)}
              className="btn-primary cursor-pointer mx-auto"
            >
              Angebot ansehen
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
