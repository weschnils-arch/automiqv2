import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import ProcessTimeline from './ProcessTimeline'
import BookingForm from './BookingForm'
import { timelineSteps } from './data'

interface PotenzialanalyseTabProps {
  quizAnswers?: Record<string, string>
}

const deliverables = [
  'Strategischer Realitätscheck Ihrer operativen Abläufe',
  'Priorisierte Roadmap mit konkretem Fahrplan',
  'Unabhängige Entscheidungsgrundlage — gehört Ihnen',
]

export default function PotenzialanalyseTab({ quizAnswers }: PotenzialanalyseTabProps) {
  const [showForm, setShowForm] = useState(false)

  return (
    <div>
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
        {/* Left — Product card */}
        <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-7 border border-[#EDEDEA] dark:border-white/10">
          <div className="font-mono text-[10px] font-medium tracking-wider uppercase text-[#2563EB] mb-3">
            Einstiegsprodukt
          </div>

          <h3 className="font-heading text-2xl font-bold text-[#1A1A1A] dark:text-white mb-2">
            Potenzialanalyse
          </h3>

          <div className="mb-4">
            <span className="font-heading text-4xl font-bold text-[#2563EB]">250 €</span>
            <span className="text-sm text-[#999] ml-2">einmalig</span>
          </div>

          <p className="text-sm text-[#777] dark:text-[#999] leading-relaxed mb-6">
            In 90 Minuten analysieren wir, wo die echten Hebel in Ihrem Unternehmen liegen — bevor Sie Geld in die falsche Richtung investieren.
          </p>

          <ul className="space-y-3 mb-8">
            {deliverables.map((d) => (
              <li key={d} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                <span className="text-sm text-[#555] dark:text-[#AAA]">{d}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setShowForm(true)}
            className="btn-primary w-full justify-center cursor-pointer"
          >
            KI Potentialanalyse Starten
            <ArrowRight size={16} />
          </button>

          <p className="text-[11px] text-[#AAA] dark:text-[#666] text-center leading-relaxed mt-3">
            Keine versteckten Kosten. Die Analyse gehört Ihnen — unabhängig davon, ob Sie danach mit uns zusammenarbeiten.
          </p>
        </div>

        {/* Right — Timeline */}
        <div className="hidden lg:block">
          <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-6">
            Ablauf in 3 Schritten
          </div>
          <ProcessTimeline steps={timelineSteps} />
        </div>
      </div>

      {/* Booking form — slides in below */}
      {showForm && (
        <BookingForm product="potenzialanalyse" quizAnswers={quizAnswers} />
      )}
    </div>
  )
}
