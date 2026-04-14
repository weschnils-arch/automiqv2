import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLanguage } from '../i18n/LanguageContext'

export default function UrgencyBar() {
  const barRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !barRef.current) return
    gsap.fromTo(barRef.current, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
  }, [])

  return (
    <div ref={barRef} className="fixed top-0 left-0 right-0 z-50 h-[40px] flex items-center justify-center bg-[#1A1A1A]">
      <p className="font-mono text-[11px] sm:text-xs font-medium tracking-wider text-white/90 uppercase px-4 text-center">
        <span className="hidden sm:inline">{t('urgencyDesktop')} <span className="font-bold text-white">{t('urgencyDesktopCta')}</span></span>
        <span className="sm:hidden">{t('urgencyMobile')} <span className="font-bold text-white">{t('urgencyMobileCta')}</span></span>
      </p>
    </div>
  )
}
