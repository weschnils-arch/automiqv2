import {
  UserRound, Clock, TrendingDown, HelpCircle, CircleDollarSign,
  ScanSearch, Route, Scale,
} from 'lucide-react'
import type { QuizQuestionData, QuizResultData, TimelineStep, PricingTierData } from './types'

export const quizQuestions: QuizQuestionData[] = [
  {
    id: 'company-size',
    question: 'Wie viele Mitarbeiter hat Ihr Unternehmen?',
    subtitle: 'Damit wir einschätzen können, welche Lösung zu Ihrer Struktur passt.',
    options: [
      { value: '1-4', label: '1–4 Mitarbeiter', description: 'Kleinstunternehmen / Einzelunternehmer', scores: { readiness: 0, complexity: 0, budget: 0 } },
      { value: '5-15', label: '5–15 Mitarbeiter', description: 'Kleines Team, operative Engpässe spürbar', scores: { readiness: 1, complexity: 1, budget: 1 } },
      { value: '16-50', label: '16–50 Mitarbeiter', description: 'Wachsend, Prozesse werden komplexer', scores: { readiness: 1, complexity: 2, budget: 2 } },
      { value: '50+', label: '50+ Mitarbeiter', description: 'Etabliertes Unternehmen mit mehreren Abteilungen', scores: { readiness: 2, complexity: 2, budget: 2 } },
    ],
  },
  {
    id: 'pain-point',
    question: 'Was ist Ihre größte operative Herausforderung?',
    subtitle: 'Wählen Sie den Punkt, der Sie am meisten beschäftigt.',
    options: [
      { value: 'bottleneck', label: 'Zu viel hängt an mir persönlich', description: 'Ohne mich steht der Laden still', icon: UserRound, scores: { readiness: 1, complexity: 1, budget: 0 } },
      { value: 'manual', label: 'Manuelle Prozesse fressen Zeit', description: 'Admin, Angebote, Kundenkommunikation', icon: Clock, scores: { readiness: 1, complexity: 1, budget: 1 } },
      { value: 'growth-chaos', label: 'Wachstum erzeugt mehr Chaos', description: 'Mehr Kunden, aber auch mehr Reibung', icon: TrendingDown, scores: { readiness: 1, complexity: 2, budget: 1 } },
      { value: 'orientation', label: 'Wir wissen nicht, wo anfangen', description: 'Der Markt ist unübersichtlich', icon: HelpCircle, scores: { readiness: 0, complexity: 0, budget: 0 } },
      { value: 'bad-roi', label: 'Bereits investiert, kein klarer ROI', description: 'Tools gekauft, aber ohne Wirkung', icon: CircleDollarSign, scores: { readiness: 2, complexity: 1, budget: 1 } },
    ],
  },
  {
    id: 'ai-maturity',
    question: 'Haben Sie bereits Automatisierungs- oder KI-Lösungen im Einsatz?',
    subtitle: 'Kein richtig oder falsch — wir passen unsere Empfehlung an Ihren Stand an.',
    options: [
      { value: 'none', label: 'Nein, wir stehen ganz am Anfang', scores: { readiness: 0, complexity: 0, budget: 0 } },
      { value: 'some', label: 'Einzelne Tools, aber nichts Systematisches', scores: { readiness: 1, complexity: 1, budget: 0 } },
      { value: 'strategy-needed', label: 'Ja, aber wir brauchen eine bessere Strategie', scores: { readiness: 2, complexity: 1, budget: 1 } },
      { value: 'scale', label: 'Ja, und wir wollen jetzt skalieren', scores: { readiness: 2, complexity: 2, budget: 2 } },
    ],
  },
  {
    id: 'goal',
    question: 'Was ist Ihr Ziel für die nächsten 6 Monate?',
    options: [
      { value: 'clarity', label: 'Klarheit gewinnen', description: 'Verstehen, wo die echten Hebel liegen', scores: { readiness: 0, complexity: 0, budget: 0 } },
      { value: 'first-automation', label: 'Erste Prozesse automatisieren', description: 'Gezielt einen Engpass lösen', scores: { readiness: 1, complexity: 1, budget: 1 } },
      { value: 'multi-area', label: 'Mehrere Bereiche transformieren', description: 'Gleichzeitig an mehreren Stellen ansetzen', scores: { readiness: 2, complexity: 2, budget: 2 } },
      { value: 'scale-wide', label: 'Unternehmensweit skalieren', description: 'KI als Standard, nicht als Projekt', scores: { readiness: 2, complexity: 2, budget: 2 } },
    ],
  },
  {
    id: 'budget',
    question: 'Wie hoch schätzen Sie Ihr monatliches Budget für externe Beratung?',
    subtitle: 'Eine grobe Einschätzung reicht — wir finden die passende Lösung.',
    options: [
      { value: 'under-500', label: 'Unter 500 €', scores: { readiness: 0, complexity: 0, budget: 0 } },
      { value: '500-5k', label: '500 – 5.000 €', scores: { readiness: 0, complexity: 0, budget: 1 } },
      { value: '5k-15k', label: '5.000 – 15.000 €', scores: { readiness: 0, complexity: 0, budget: 2 } },
      { value: 'over-15k', label: 'Über 15.000 €', scores: { readiness: 0, complexity: 0, budget: 3 } },
    ],
  },
]

export function calculateQuizResult(answers: Record<string, string>): QuizResultData {
  let readiness = 0
  let complexity = 0
  let budget = 0

  for (const q of quizQuestions) {
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
      headline: 'Lead — Unternehmensweite KI-Transformation',
      description: 'Ihr Unternehmen ist bereit für eine umfassende KI-Strategie. Mit einem dedizierten Team, C-Level Sparring und unbegrenzten Automatisierungen skalieren wir Ihr Unternehmen systematisch.',
      targetTab: 'wachstumsprogramm',
    }
  }
  if (budget >= 4 && (readiness >= 4 || complexity >= 4)) {
    return {
      recommendation: 'expand',
      headline: 'Expand — Mehrere Bereiche gleichzeitig transformieren',
      description: 'Sie sind über den Einstieg hinaus. Mit wöchentlichen Strategie-Sessions und 3–5 parallelen Automatisierungen bringen wir Ihr Unternehmen auf das nächste Level.',
      targetTab: 'wachstumsprogramm',
    }
  }
  if (budget >= 2 && readiness >= 3) {
    return {
      recommendation: 'operate',
      headline: 'Operate — Strukturierter Einstieg in die Automatisierung',
      description: 'Sie wissen, dass Handlungsbedarf besteht, und sind bereit, systematisch anzufangen. Mit einem Kernprozess starten, Ergebnisse messen, dann erweitern.',
      targetTab: 'wachstumsprogramm',
    }
  }

  return {
    recommendation: 'potenzialanalyse',
    headline: 'Potenzialanalyse — Erst Klarheit, dann Umsetzung',
    description: 'Der intelligenteste erste Schritt: In 90 Minuten analysieren wir, wo die echten Hebel in Ihrem Unternehmen liegen — bevor Sie Geld in die falsche Richtung investieren.',
    targetTab: 'potenzialanalyse',
  }
}

export const timelineSteps: TimelineStep[] = [
  {
    number: '01',
    title: 'Analysieren',
    description: '90 Min. strukturierte Diagnose Ihrer Engpässe und Potenziale.',
    icon: ScanSearch,
  },
  {
    number: '02',
    title: 'Roadmap',
    description: 'Schriftlicher Audit-Bericht mit klarer Priorisierung und Kostenrahmen.',
    icon: Route,
  },
  {
    number: '03',
    title: 'Entscheiden',
    description: 'Sie entscheiden selbst — ob mit uns, einem anderen Anbieter oder gar nicht.',
    icon: Scale,
  },
]

export const pricingTiers: PricingTierData[] = [
  {
    tier: 'Operate',
    price: '1.990',
    period: '/ Monat',
    description: 'Ihr Einstieg in systematische Automatisierung',
    features: [
      { text: 'Dedizierter KI-Berater' },
      { text: '1 Kernprozess-Automatisierung' },
      { text: 'Monatliches Strategie-Review' },
      { text: 'Implementierung & Monitoring' },
      { text: '~2–3 neue Use Cases / Quartal' },
    ],
    ctaLabel: 'Beratungsgespräch vereinbaren',
  },
  {
    tier: 'Expand',
    price: '4.990',
    period: '/ Monat',
    description: 'Mehrere Bereiche gleichzeitig transformieren',
    recommended: true,
    features: [
      { text: 'Alles aus Operate' },
      { text: '3–5 parallele Automatisierungen' },
      { text: 'Wöchentliche Strategie-Sessions' },
      { text: 'KI-Agenten & Workflow-Design' },
      { text: 'Team-Schulungen' },
      { text: '~5–8 neue Use Cases / Quartal' },
    ],
    ctaLabel: 'Beratungsgespräch vereinbaren',
  },
  {
    tier: 'Lead',
    price: '9.990',
    period: '/ Monat',
    description: 'Unternehmensweite KI-Strategie & Skalierung',
    features: [
      { text: 'Alles aus Expand' },
      { text: 'Unbegrenzte Automatisierungen' },
      { text: 'C-Level Sparringspartner' },
      { text: 'Custom KI-Lösungen & Agenten' },
      { text: 'Dediziertes Team & Change Management' },
      { text: '~10+ neue Use Cases / Quartal' },
    ],
    ctaLabel: 'Beratungsgespräch vereinbaren',
  },
]
