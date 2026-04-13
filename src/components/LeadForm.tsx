import { useState, lazy, Suspense, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const RotatingGlobe = lazy(() => import('./ui/RotatingGlobe'))

interface LeadFormProps {
  isDark?: boolean
}

export default function LeadForm({ isDark = false }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useScrollReveal<HTMLElement>()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section ref={sectionRef} id="lead-form" className="py-24 sm:py-32 section-padding" aria-labelledby="form-heading">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Globe + copy */}
          <div>
            <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
              <div className="w-8 h-px bg-[#2563EB]" />
              Der nächste Schritt
            </div>
            <h2 id="form-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white mb-5">
              Klarheit beginnt mit einer Entscheidung.
            </h2>
            <p className="text-[#777] dark:text-[#999] text-[clamp(0.9rem,1vw,1.05rem)] leading-relaxed mb-6 max-w-md">
              In 90 Minuten wissen Sie, wo die echten Hebel in Ihrem Unternehmen liegen — und was Sie getrost ignorieren können. Keine Verkaufsshow. Kein Tool-Pitch. Nur strategische Klarheit.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                <p className="text-sm text-[#555] dark:text-[#AAA]">Welche Prozesse sich zuerst lohnen</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                <p className="text-sm text-[#555] dark:text-[#AAA]">Wo Sie aktuell Zeit und Marge verlieren</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                <p className="text-sm text-[#555] dark:text-[#AAA]">Was kurzfristig realistisch umsetzbar ist</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                <p className="text-sm text-[#555] dark:text-[#AAA]">Welche Lösungen Sie nicht brauchen</p>
              </div>
            </div>

            {/* Globe */}
            <div className="hidden lg:block h-[300px] rounded-2xl overflow-hidden">
              <Suspense fallback={<div className="w-full h-full bg-[#F5F5F0] dark:bg-[#111] rounded-2xl" />}>
                <RotatingGlobe isDark={isDark} />
              </Suspense>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-[#F7F7F5] dark:bg-white/5 rounded-2xl p-6 sm:p-8 border border-[#EDEDEA] dark:border-white/10">
            {submitted ? (
              <div className="text-center py-8">
                <p className="font-heading text-xl font-bold text-[#1A1A1A] dark:text-white mb-2">Anfrage erhalten.</p>
                <p className="text-sm text-[#777] dark:text-[#999]">Wir melden uns innerhalb von 24 Stunden, um Ihren Termin zu koordinieren.</p>
              </div>
            ) : (
              <>
                <h3 className="font-heading text-lg font-bold text-[#1A1A1A] dark:text-white mb-1">
                  KI Potentialanalyse Starten
                </h3>
                <p className="text-sm text-[#999] mb-5">90 Minuten strategische Diagnose für Ihr Unternehmen.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">Name *</label>
                    <input type="text" id="name" name="name" required className="input-field" placeholder="Ihr vollständiger Name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">E-Mail *</label>
                    <input type="email" id="email" name="email" required className="input-field" placeholder="max@unternehmen.de" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">
                      Telefon <span className="text-[#BBB] dark:text-[#555]">(optional)</span>
                    </label>
                    <input type="tel" id="phone" name="phone" className="input-field" placeholder="+43 660 123 4567" />
                  </div>
                  <div>
                    <label htmlFor="company-size" className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">Unternehmensgröße *</label>
                    <select id="company-size" name="companySize" required className="input-field cursor-pointer appearance-none">
                      <option value="">Bitte wählen</option>
                      <option value="1-4">1–4 Mitarbeiter</option>
                      <option value="5-15">5–15 Mitarbeiter</option>
                      <option value="16-50">16–50 Mitarbeiter</option>
                      <option value="50+">50+ Mitarbeiter</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pain-point" className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">Größte operative Herausforderung *</label>
                    <select id="pain-point" name="painPoint" required className="input-field cursor-pointer appearance-none">
                      <option value="">Bitte wählen</option>
                      <option value="zu-viel-admin">Zu viel Admin & manuelle Prozesse</option>
                      <option value="wachstum-chaos">Wachstum erzeugt mehr Chaos</option>
                      <option value="keine-uebersicht">Keine Übersicht, wo Automatisierung Sinn macht</option>
                      <option value="fachkraeftemangel">Fachkräftemangel & Überlastung</option>
                      <option value="fehlentscheidung-angst">Angst vor falscher Investition</option>
                      <option value="sonstiges">Sonstiges</option>
                    </select>
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center mt-2 cursor-pointer">
                    Potenzialanalyse für 250 € buchen
                    <ArrowRight size={16} />
                  </button>

                  <p className="text-[11px] text-[#AAA] dark:text-[#666] text-center leading-relaxed">
                    Keine versteckten Kosten. Sie erhalten eine fundierte Analyse mit echtem Wert — unabhängig davon, ob Sie danach mit uns zusammenarbeiten.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
