import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import ProcessTimeline from './ProcessTimeline'
import BookingForm from './BookingForm'
import { useTimelineSteps } from './data'

interface PotenzialanalyseTabProps {
  quizAnswers?: Record<string, string>
}

export default function PotenzialanalyseTab({ quizAnswers }: PotenzialanalyseTabProps) {
  const [showForm, setShowForm] = useState(false)
  const { t } = useLanguage()
  const timelineSteps = useTimelineSteps()

  const deliverableKeys = ['potenzialD1', 'potenzialD2', 'potenzialD3'] as const

  return (
    <div>
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
        {/* Left — Product card */}
        <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-7 border border-[#EDEDEA] dark:border-white/10">
          <div className="font-mono text-[10px] font-medium tracking-wider uppercase text-[#2563EB] mb-3">
            {t('potenzialEntryLabel')}
          </div>

          <h3 className="font-heading text-2xl font-bold text-[#1A1A1A] dark:text-white mb-2">
            {t('potenzialTitle')}
          </h3>

          <div className="mb-4">
            <span className="font-heading text-4xl font-bold text-[#2563EB]">{t('potenzialPrice')}</span>
            <span className="text-sm text-[#999] ml-2">{t('potenzialPriceSuffix')}</span>
          </div>

          <p className="text-sm text-[#777] dark:text-[#999] leading-relaxed mb-6">
            {t('potenzialDesc')}
          </p>

          <ul className="space-y-3 mb-8">
            {deliverableKeys.map((key) => (
              <li key={key} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                <span className="text-sm text-[#555] dark:text-[#AAA]">{t(key)}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setShowForm(true)}
            className="btn-primary w-full justify-center cursor-pointer"
          >
            {t('potenzialCta')}
            <ArrowRight size={16} />
          </button>

          <p className="text-[11px] text-[#AAA] dark:text-[#666] text-center leading-relaxed mt-3">
            {t('potenzialDisclaimer')}
          </p>
        </div>

        {/* Right — Timeline */}
        <div className="hidden lg:block">
          <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-6">
            {t('potenzialTimelineLabel')}
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
