import { useState } from 'react'
import PricingCard from './PricingCard'
import BookingForm from './BookingForm'
import { pricingTiers } from './data'

interface WachstumsprogrammTabProps {
  quizAnswers?: Record<string, string>
}

export default function WachstumsprogrammTab({ quizAnswers }: WachstumsprogrammTabProps) {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  return (
    <div>
      <p className="text-[clamp(0.95rem,1.1vw,1.1rem)] text-[#777] dark:text-[#999] leading-[1.8] mb-10 max-w-2xl">
        Nach der Potenzialanalyse geht es weiter. Festes Team. Laufend neue Use Cases. Monatliche Ergebnisberichte. Ihr Unternehmen wird systematisch effizienter — nicht als Projekt, sondern als Standard.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {pricingTiers.map((tier) => (
          <PricingCard
            key={tier.tier}
            {...tier}
            onCta={() => setSelectedProduct(tier.tier.toLowerCase())}
          />
        ))}
      </div>

      {/* Booking form — slides in below */}
      {selectedProduct && (
        <BookingForm
          product={selectedProduct as 'operate' | 'expand' | 'lead'}
          quizAnswers={quizAnswers}
        />
      )}
    </div>
  )
}
