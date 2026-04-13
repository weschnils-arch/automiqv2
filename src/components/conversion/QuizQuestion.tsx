import type { QuizQuestionData } from './types'

interface QuizQuestionProps {
  question: QuizQuestionData
  selectedValue: string
  onSelect: (value: string) => void
}

export default function QuizQuestion({ question, selectedValue, onSelect }: QuizQuestionProps) {
  return (
    <div>
      <h3 className="font-heading text-xl font-bold text-[#1A1A1A] dark:text-white mb-2">
        {question.question}
      </h3>
      {question.subtitle && (
        <p className="text-sm text-[#777] dark:text-[#999] mb-6">{question.subtitle}</p>
      )}
      {!question.subtitle && <div className="mb-6" />}

      <div className="grid sm:grid-cols-2 gap-3">
        {question.options.map((option) => {
          const isSelected = selectedValue === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`text-left rounded-xl p-5 border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#2563EB] bg-[#2563EB]/5 dark:bg-[#2563EB]/10'
                  : 'border-[#EDEDEA] dark:border-white/10 bg-[#F7F7F5] dark:bg-white/5 hover:border-[#2563EB]/30'
              }`}
            >
              <div className="flex gap-3 items-start">
                {option.icon && (
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#2563EB]/15' : 'bg-[#2563EB]/10'
                  }`}>
                    <option.icon size={18} className="text-[#2563EB]" />
                  </div>
                )}
                <div>
                  <p className={`font-heading text-sm font-semibold mb-0.5 ${
                    isSelected ? 'text-[#2563EB]' : 'text-[#1A1A1A] dark:text-white'
                  }`}>
                    {option.label}
                  </p>
                  {option.description && (
                    <p className="text-xs text-[#888] dark:text-[#777] leading-relaxed">{option.description}</p>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
