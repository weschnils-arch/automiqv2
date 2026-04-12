import { Check } from 'lucide-react'
import type { PricingTierData } from './types'

interface PricingCardProps extends PricingTierData {
  onCta: () => void
}

export default function PricingCard({ tier, price, period, description, features, recommended, ctaLabel, onCta }: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-7 border flex flex-col ${
        recommended
          ? 'border-[#2563EB] bg-white dark:bg-white/[0.07]'
          : 'border-[#EDEDEA] dark:border-white/10 bg-white/80 dark:bg-white/5'
      }`}
    >
      {recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
          Empfohlen
        </div>
      )}

      <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-3">
        {tier}
      </div>

      <div className="mb-2">
        <span className="font-heading text-3xl font-bold text-[#1A1A1A] dark:text-white">€ {price}</span>
        <span className="text-sm text-[#999] ml-1">{period}</span>
      </div>

      <p className="text-sm text-[#777] dark:text-[#999] mb-6">{description}</p>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((f) => (
          <li key={f.text} className="flex gap-3">
            <div className="w-5 h-5 rounded-full bg-[#2563EB]/10 flex items-center justify-center shrink-0 mt-0.5">
              <Check size={12} className="text-[#2563EB]" />
            </div>
            <span className="text-sm text-[#555] dark:text-[#AAA] leading-relaxed">{f.text}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onCta}
        className={`w-full justify-center cursor-pointer ${recommended ? 'btn-primary' : 'btn-outline'}`}
      >
        {ctaLabel}
      </button>
    </div>
  )
}
