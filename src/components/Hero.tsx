import { useEffect, useRef, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'

const SplineRobot = lazy(() => import('./ui/SplineRobot'))

export default function Hero() {
  const labelRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .fromTo(headlineRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
      .fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .fromTo(benefitsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2')
  }, [])

  const scrollToForm = () => {
    const el = document.getElementById('lead-form')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const benefits = [
    { title: 'Mehr Umsatz', text: 'KI-gestützte Produktberatung und Lead-Qualifizierung steigern Ihre Conversion Rates um bis zu 60%.' },
    { title: 'Weniger Kosten', text: 'Automatisieren Sie 80% Ihrer Support-Anfragen und sparen Sie bis zu 60% Personalkosten.' },
    { title: '24/7 Verfügbarkeit', text: 'Ihre Kunden erhalten jederzeit erstklassigen Service – auch am Wochenende und nachts.' },
    { title: 'Zukunftssicher', text: 'Machen Sie Ihr Unternehmen immun gegen Fachkräftemangel und steigern Sie Ihre Wettbewerbsfähigkeit.' },
  ]

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-[40px]">
      {/* 3D Robot — right side, contained to hero */}
      <div className="absolute top-0 right-[-10%] bottom-0 w-[65%] z-0 hidden lg:block">
        <Suspense fallback={null}>
          <SplineRobot />
        </Suspense>
      </div>

      {/* Content — on top, pointer-events pass through to robot */}
      <div className="relative z-10 section-padding pt-24 pb-20 pointer-events-none">
        <div className="max-w-7xl mx-auto">
          <div className="lg:max-w-[55%]">
            <div ref={labelRef} className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#999] dark:text-[#666] mb-8 flex items-center gap-4">
              <div className="w-10 h-px bg-[#2563EB]" />
              AI-Potenzialanalyse für KMU
            </div>

            <h1
              ref={headlineRef}
              className="font-heading text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#1A1A1A] dark:text-white mb-5"
            >
              Skalieren Sie Ihr Business, ohne neue Mitarbeiter einzustellen: Die <span className="text-[#2563EB]">AI-Revolution</span> für KMU ist jetzt!
            </h1>

            <p ref={subRef} className="text-[clamp(0.95rem,1.1vw,1.15rem)] text-[#777] dark:text-[#999] leading-relaxed max-w-xl mb-8">
              Entdecken Sie in nur 90 Minuten, wie Künstliche Intelligenz Ihre Prozesse automatisiert, Kosten senkt und den Umsatz steigert – mit unserer exklusiven AI-Potenzialanalyse.
            </p>

            <div ref={benefitsRef} className="grid grid-cols-2 gap-4 mb-10">
              {benefits.map((b) => (
                <div key={b.title} className="bg-white/80 dark:bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-[#EDEDEA] dark:border-white/10">
                  <h3 className="font-heading text-sm font-semibold text-[#1A1A1A] dark:text-white mb-1">{b.title}</h3>
                  <p className="text-xs text-[#888] leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>

            <div ref={ctaRef} className="flex flex-wrap gap-4 pointer-events-auto">
              <button onClick={scrollToForm} className="btn-primary cursor-pointer">
                Jetzt Analyse buchen
                <ArrowRight size={16} />
              </button>
              <a href="#solution" className="btn-outline backdrop-blur-sm">So funktioniert's</a>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom divider — right to left fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to left, #2563EB, transparent)' }} aria-hidden="true" />
    </section>
  )
}
