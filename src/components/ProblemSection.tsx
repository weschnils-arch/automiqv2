import { useScrollReveal } from '../hooks/useScrollReveal'
import { UserRound, FileQuestion, TrendingDown, Clock, HelpCircle, CircleDollarSign } from 'lucide-react'

const painPoints = [
  {
    icon: UserRound,
    headline: 'Zu viel hängt an einzelnen Personen',
    text: 'Der Inhaber ist Flaschenhals für jede Entscheidung. Ohne Sie steht der Laden still.',
  },
  {
    icon: FileQuestion,
    headline: 'Prozesse leben in den Köpfen',
    text: 'Nichts ist dokumentiert. Teams arbeiten mit Zuruf statt System. Neue Mitarbeiter brauchen Monate.',
  },
  {
    icon: TrendingDown,
    headline: 'Wachstum erzeugt mehr Chaos',
    text: 'Mehr Kunden bedeuten nicht mehr Gewinn — sondern mehr Admin, mehr Abstimmung, mehr Reibung.',
  },
  {
    icon: Clock,
    headline: 'Backoffice frisst die Marge',
    text: 'Anfragen, Angebote, Kundenkommunikation — manuelle Abläufe kosten Stunden pro Woche, die Sie nicht haben.',
  },
  {
    icon: HelpCircle,
    headline: 'Keiner weiß, wo KI wirklich hilft',
    text: 'Der Markt ist unübersichtlich. Tools gibt es hunderte — aber welche passen zu Ihrem Betrieb? Und welche sind Geldverschwendung?',
  },
  {
    icon: CircleDollarSign,
    headline: 'Falsche Investitionen drohen',
    text: 'Ohne Diagnose kaufen Unternehmen zu früh die falsche Lösung — und zahlen doppelt: erst für das Tool, dann für die Korrektur.',
  },
]

export default function ProblemSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className="py-24 sm:py-32 section-padding" aria-labelledby="problem-heading">
      <div className="max-w-5xl mx-auto">
        <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
          <div className="w-8 h-px bg-[#2563EB]" />
          Die Realität
        </div>
        <h2 id="problem-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white mb-4">
          Während Sie im Tagesgeschäft feststecken, automatisiert Ihre Konkurrenz bereits.
        </h2>
        <p className="text-[clamp(0.95rem,1.1vw,1.1rem)] text-[#777] dark:text-[#999] leading-[1.8] mb-12 max-w-3xl">
          Sie kennen das: Mehr Kunden, mehr Umsatz — aber auch mehr Chaos, mehr Admin, mehr operative Überlastung. Der Betrieb wächst, aber die Systeme halten nicht mit. Und die Frage, ob und wo Automatisierung sinnvoll ist, bleibt ohne Antwort.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {painPoints.map((p) => (
            <div key={p.headline} className="bg-white/80 dark:bg-white/5 rounded-xl p-6 border border-[#EDEDEA] dark:border-white/10 flex gap-4">
              <div className="w-9 h-9 rounded-lg bg-[#2563EB]/10 flex items-center justify-center shrink-0">
                <p.icon size={18} className="text-[#2563EB]" />
              </div>
              <div>
                <h3 className="font-heading text-[15px] font-semibold text-[#1A1A1A] dark:text-white mb-2">{p.headline}</h3>
                <p className="text-sm text-[#777] dark:text-[#999] leading-relaxed">{p.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#F5F5F0] dark:bg-white/5 rounded-xl p-6 border border-[#EDEDEA] dark:border-white/10">
          <p className="text-[15px] text-[#555] dark:text-[#AAA] leading-relaxed italic">
            &bdquo;Wenn ich das weiter ignoriere, kostet mich das Geld, Zeit und Wettbewerbsfähigkeit.&ldquo;
          </p>
          <p className="text-xs text-[#999] mt-2">— Der Moment, in dem die meisten unserer Kunden zu uns kommen.</p>
        </div>
      </div>
    </section>
  )
}
