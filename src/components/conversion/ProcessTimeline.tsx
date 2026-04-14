import { useLanguage } from '../../i18n/LanguageContext'
import type { TimelineStep } from './types'

interface ProcessTimelineProps {
  steps: TimelineStep[]
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-0">
      {steps.map((step, i) => (
        <div key={step.number} className="flex gap-4">
          {/* Left: circle + line */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border-2 border-[#2563EB] flex items-center justify-center shrink-0 bg-white dark:bg-[#0D0D0D]">
              <step.icon size={16} className="text-[#2563EB]" />
            </div>
            {i < steps.length - 1 && (
              <div className="w-px h-full min-h-[40px] bg-[#EDEDEA] dark:bg-white/10" />
            )}
          </div>

          {/* Right: text */}
          <div className="pb-8">
            <div className="font-mono text-[10px] font-medium tracking-wider uppercase text-[#999] dark:text-[#666] mb-1">
              {t('timelineStep')} {step.number}
            </div>
            <h4 className="font-heading text-[15px] font-semibold text-[#1A1A1A] dark:text-white mb-1">
              {step.title}
            </h4>
            <p className="text-sm text-[#777] dark:text-[#999] leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
