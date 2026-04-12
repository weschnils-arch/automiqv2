import type { LucideIcon } from 'lucide-react'

export type TabId = 'potenzialanalyse' | 'wachstumsprogramm'
export type ViewState = 'quiz' | 'result' | 'tabs'
export type Recommendation = 'potenzialanalyse' | 'operate' | 'expand' | 'lead'

export interface QuizOption {
  value: string
  label: string
  description?: string
  icon?: LucideIcon
  scores: {
    readiness: number
    complexity: number
    budget: number
  }
}

export interface QuizQuestionData {
  id: string
  question: string
  subtitle?: string
  options: QuizOption[]
}

export interface QuizResultData {
  recommendation: Recommendation
  headline: string
  description: string
  targetTab: TabId
}

export interface TimelineStep {
  number: string
  title: string
  description: string
  icon: LucideIcon
}

export interface PricingFeature {
  text: string
}

export interface PricingTierData {
  tier: string
  price: string
  period: string
  description: string
  features: PricingFeature[]
  recommended?: boolean
  ctaLabel: string
}
