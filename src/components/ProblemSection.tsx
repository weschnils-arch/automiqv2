import { useScrollReveal } from '../hooks/useScrollReveal'

export default function ProblemSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className="py-24 sm:py-32 section-padding" aria-labelledby="problem-heading">
      <div className="max-w-3xl mx-auto">
        <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-4 flex items-center gap-3">
          <div className="w-8 h-px bg-[#2563EB]" />
          Die Realität
        </div>
        <h2 id="problem-heading" className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A] dark:text-white mb-6">
          Kennen Sie diese Herausforderungen in Ihrem Business?
        </h2>
        <p className="text-[clamp(0.95rem,1.1vw,1.1rem)] text-[#777] dark:text-[#999] leading-[1.8]">
          Viele KMU kämpfen mit steigenden Betriebskosten, dem akuten Fachkräftemangel und dem Druck, im digitalen Zeitalter wettbewerbsfähig zu bleiben. Manuelle Prozesse fressen wertvolle Zeit und Ressourcen, während Ihre Konkurrenz bereits auf Künstliche Intelligenz setzt. Die Folge: Umsatzpotenziale bleiben ungenutzt, Kunden sind unzufrieden und Ihr Team ist überlastet.
        </p>
      </div>
    </section>
  )
}
