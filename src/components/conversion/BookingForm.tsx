import { useState, useEffect, useRef, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'

interface BookingFormProps {
  product: 'potenzialanalyse' | 'operate' | 'expand' | 'lead'
  quizAnswers?: Record<string, string>
}

const ctaLabels: Record<string, string> = {
  potenzialanalyse: 'Potenzialanalyse für 250 € buchen',
  operate: 'Beratungsgespräch vereinbaren',
  expand: 'Beratungsgespräch vereinbaren',
  lead: 'Beratungsgespräch vereinbaren',
}

export default function BookingForm({ product, quizAnswers }: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !formRef.current) return
    gsap.fromTo(formRef.current, { opacity: 0, height: 0 }, { opacity: 1, height: 'auto', duration: 0.5, ease: 'power3.out' })
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const sizeMap: Record<string, string> = {
    '1-4': '1-4',
    '5-15': '5-15',
    '16-50': '16-50',
    '50+': '50+',
  }

  const painMap: Record<string, string> = {
    'bottleneck': 'zu-viel-admin',
    'manual': 'zu-viel-admin',
    'growth-chaos': 'wachstum-chaos',
    'orientation': 'keine-uebersicht',
    'bad-roi': 'fehlentscheidung-angst',
  }

  const defaultSize = quizAnswers?.['company-size'] ? sizeMap[quizAnswers['company-size']] || '' : ''
  const defaultPain = quizAnswers?.['pain-point'] ? painMap[quizAnswers['pain-point']] || '' : ''

  return (
    <div ref={formRef} className="overflow-hidden">
      <div className="bg-[#FAFAF7] dark:bg-white/5 rounded-2xl p-6 sm:p-8 border border-[#EDEDEA] dark:border-white/10 mt-6">
        {submitted ? (
          <div className="text-center py-8">
            <p className="font-heading text-xl font-bold text-[#1A1A1A] dark:text-white mb-2">Anfrage erhalten.</p>
            <p className="text-sm text-[#777] dark:text-[#999]">Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor={`name-${product}`} className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">Name *</label>
              <input type="text" id={`name-${product}`} name="name" required className="input-field" placeholder="Ihr vollständiger Name" />
            </div>
            <div>
              <label htmlFor={`email-${product}`} className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">E-Mail *</label>
              <input type="email" id={`email-${product}`} name="email" required className="input-field" placeholder="max@unternehmen.de" />
            </div>
            <div>
              <label htmlFor={`phone-${product}`} className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">
                Telefon <span className="text-[#BBB] dark:text-[#555]">(optional)</span>
              </label>
              <input type="tel" id={`phone-${product}`} name="phone" className="input-field" placeholder="+43 660 123 4567" />
            </div>
            <div>
              <label htmlFor={`size-${product}`} className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">Unternehmensgröße *</label>
              <select id={`size-${product}`} name="companySize" required className="input-field cursor-pointer appearance-none" defaultValue={defaultSize}>
                <option value="">Bitte wählen</option>
                <option value="1-4">1–4 Mitarbeiter</option>
                <option value="5-15">5–15 Mitarbeiter</option>
                <option value="16-50">16–50 Mitarbeiter</option>
                <option value="50+">50+ Mitarbeiter</option>
              </select>
            </div>
            <div>
              <label htmlFor={`pain-${product}`} className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">Größte operative Herausforderung *</label>
              <select id={`pain-${product}`} name="painPoint" required className="input-field cursor-pointer appearance-none" defaultValue={defaultPain}>
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
              {ctaLabels[product]}
              <ArrowRight size={16} />
            </button>

            <p className="text-[11px] text-[#AAA] dark:text-[#666] text-center leading-relaxed">
              Keine versteckten Kosten. Ihre Daten werden vertraulich behandelt.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
