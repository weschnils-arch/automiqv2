import {
  UserRound, Clock, TrendingDown, HelpCircle, CircleDollarSign,
  ScanSearch, Route, Scale,
} from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import type { Lang } from '../../i18n/translations'
import { translations } from '../../i18n/translations'
import type { QuizQuestionData, QuizResultData, TimelineStep, PricingTierData } from './types'

function tl(key: keyof typeof translations, lang: Lang): string {
  return translations[key][lang]
}

export function useQuizQuestions(): QuizQuestionData[] {
  const { lang } = useLanguage()
  return getQuizQuestions(lang)
}

function getQuizQuestions(lang: Lang): QuizQuestionData[] {
  return [
    {
      id: 'company-size',
      question: tl('quizQ1', lang),
      subtitle: tl('quizQ1Sub', lang),
      options: [
        { value: '1-4', label: tl('quizQ1O1Label', lang), description: tl('quizQ1O1Desc', lang), scores: { readiness: 0, complexity: 0, budget: 0 } },
        { value: '5-15', label: tl('quizQ1O2Label', lang), description: tl('quizQ1O2Desc', lang), scores: { readiness: 1, complexity: 1, budget: 1 } },
        { value: '16-50', label: tl('quizQ1O3Label', lang), description: tl('quizQ1O3Desc', lang), scores: { readiness: 1, complexity: 2, budget: 2 } },
        { value: '50+', label: tl('quizQ1O4Label', lang), description: tl('quizQ1O4Desc', lang), scores: { readiness: 2, complexity: 2, budget: 2 } },
      ],
    },
    {
      id: 'pain-point',
      question: tl('quizQ2', lang),
      subtitle: tl('quizQ2Sub', lang),
      options: [
        { value: 'bottleneck', label: tl('quizQ2O1Label', lang), description: tl('quizQ2O1Desc', lang), icon: UserRound, scores: { readiness: 1, complexity: 1, budget: 0 } },
        { value: 'manual', label: tl('quizQ2O2Label', lang), description: tl('quizQ2O2Desc', lang), icon: Clock, scores: { readiness: 1, complexity: 1, budget: 1 } },
        { value: 'growth-chaos', label: tl('quizQ2O3Label', lang), description: tl('quizQ2O3Desc', lang), icon: TrendingDown, scores: { readiness: 1, complexity: 2, budget: 1 } },
        { value: 'orientation', label: tl('quizQ2O4Label', lang), description: tl('quizQ2O4Desc', lang), icon: HelpCircle, scores: { readiness: 0, complexity: 0, budget: 0 } },
        { value: 'bad-roi', label: tl('quizQ2O5Label', lang), description: tl('quizQ2O5Desc', lang), icon: CircleDollarSign, scores: { readiness: 2, complexity: 1, budget: 1 } },
      ],
    },
    {
      id: 'ai-maturity',
      question: tl('quizQ3', lang),
      subtitle: tl('quizQ3Sub', lang),
      options: [
        { value: 'none', label: tl('quizQ3O1Label', lang), scores: { readiness: 0, complexity: 0, budget: 0 } },
        { value: 'some', label: tl('quizQ3O2Label', lang), scores: { readiness: 1, complexity: 1, budget: 0 } },
        { value: 'strategy-needed', label: tl('quizQ3O3Label', lang), scores: { readiness: 2, complexity: 1, budget: 1 } },
        { value: 'scale', label: tl('quizQ3O4Label', lang), scores: { readiness: 2, complexity: 2, budget: 2 } },
      ],
    },
    {
      id: 'goal',
      question: tl('quizQ4', lang),
      options: [
        { value: 'clarity', label: tl('quizQ4O1Label', lang), description: tl('quizQ4O1Desc', lang), scores: { readiness: 0, complexity: 0, budget: 0 } },
        { value: 'first-automation', label: tl('quizQ4O2Label', lang), description: tl('quizQ4O2Desc', lang), scores: { readiness: 1, complexity: 1, budget: 1 } },
        { value: 'multi-area', label: tl('quizQ4O3Label', lang), description: tl('quizQ4O3Desc', lang), scores: { readiness: 2, complexity: 2, budget: 2 } },
        { value: 'scale-wide', label: tl('quizQ4O4Label', lang), description: tl('quizQ4O4Desc', lang), scores: { readiness: 2, complexity: 2, budget: 2 } },
      ],
    },
    {
      id: 'budget',
      question: tl('quizQ5', lang),
      subtitle: tl('quizQ5Sub', lang),
      options: [
        { value: 'under-500', label: tl('quizQ5O1Label', lang), scores: { readiness: 0, complexity: 0, budget: 0 } },
        { value: '500-5k', label: tl('quizQ5O2Label', lang), scores: { readiness: 0, complexity: 0, budget: 1 } },
        { value: '5k-15k', label: tl('quizQ5O3Label', lang), scores: { readiness: 0, complexity: 0, budget: 2 } },
        { value: 'over-15k', label: tl('quizQ5O4Label', lang), scores: { readiness: 0, complexity: 0, budget: 3 } },
      ],
    },
  ]
}

// Need a static version for score calculation (scores don't depend on language)
const staticQuizQuestions = getQuizQuestions('de')

export function calculateQuizResult(answers: Record<string, string>, lang: Lang): QuizResultData {
  let readiness = 0
  let complexity = 0
  let budget = 0

  for (const q of staticQuizQuestions) {
    const answer = answers[q.id]
    const option = q.options.find((o) => o.value === answer)
    if (option) {
      readiness += option.scores.readiness
      complexity += option.scores.complexity
      budget += option.scores.budget
    }
  }

  if (budget >= 6 && complexity >= 6) {
    return {
      recommendation: 'lead',
      headline: tl('resultLeadHeadline', lang),
      description: tl('resultLeadDesc', lang),
      targetTab: 'wachstumsprogramm',
    }
  }
  if (budget >= 4 && (readiness >= 4 || complexity >= 4)) {
    return {
      recommendation: 'expand',
      headline: tl('resultExpandHeadline', lang),
      description: tl('resultExpandDesc', lang),
      targetTab: 'wachstumsprogramm',
    }
  }
  if (budget >= 2 && readiness >= 3) {
    return {
      recommendation: 'operate',
      headline: tl('resultOperateHeadline', lang),
      description: tl('resultOperateDesc', lang),
      targetTab: 'wachstumsprogramm',
    }
  }

  return {
    recommendation: 'potenzialanalyse',
    headline: tl('resultAnalyseHeadline', lang),
    description: tl('resultAnalyseDesc', lang),
    targetTab: 'potenzialanalyse',
  }
}

export function useTimelineSteps(): TimelineStep[] {
  const { lang } = useLanguage()
  return [
    {
      number: '01',
      title: tl('timeline1Title', lang),
      description: tl('timeline1Desc', lang),
      icon: ScanSearch,
    },
    {
      number: '02',
      title: tl('timeline2Title', lang),
      description: tl('timeline2Desc', lang),
      icon: Route,
    },
    {
      number: '03',
      title: tl('timeline3Title', lang),
      description: tl('timeline3Desc', lang),
      icon: Scale,
    },
  ]
}

export function usePricingTiers(): PricingTierData[] {
  const { lang } = useLanguage()
  return [
    {
      tier: 'Operate',
      price: '1.990',
      period: tl('pricingPeriod', lang),
      description: tl('pricingOperateDesc', lang),
      features: [
        { text: tl('pricingFeatureDedicated', lang) },
        { text: tl('pricingFeature1Core', lang) },
        { text: tl('pricingFeatureMonthlyReview', lang) },
        { text: tl('pricingFeatureImplementation', lang) },
        { text: tl('pricingFeature2to3', lang) },
      ],
      ctaLabel: tl('pricingCtaBook', lang),
    },
    {
      tier: 'Expand',
      price: '4.990',
      period: tl('pricingPeriod', lang),
      description: tl('pricingExpandDesc', lang),
      recommended: true,
      features: [
        { text: tl('pricingFeatureAllOperate', lang) },
        { text: tl('pricingFeature3to5', lang) },
        { text: tl('pricingFeatureWeekly', lang) },
        { text: tl('pricingFeatureAgents', lang) },
        { text: tl('pricingFeatureTraining', lang) },
        { text: tl('pricingFeature5to8', lang) },
      ],
      ctaLabel: tl('pricingCtaBook', lang),
    },
    {
      tier: 'Lead',
      price: '9.990',
      period: tl('pricingPeriod', lang),
      description: tl('pricingLeadDesc', lang),
      features: [
        { text: tl('pricingFeatureAllExpand', lang) },
        { text: tl('pricingFeatureUnlimited', lang) },
        { text: tl('pricingFeatureCLevel', lang) },
        { text: tl('pricingFeatureCustom', lang) },
        { text: tl('pricingFeatureTeam', lang) },
        { text: tl('pricingFeature10plus', lang) },
      ],
      ctaLabel: tl('pricingCtaBook', lang),
    },
  ]
}
