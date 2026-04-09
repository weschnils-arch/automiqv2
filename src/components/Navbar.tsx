import { useEffect, useRef, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import gsap from 'gsap'

interface NavbarProps {
  isDark: boolean
  onToggleTheme: () => void
}

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReduced && navRef.current) {
      gsap.fromTo(navRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.1, ease: 'power2.out' })
    }
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    const el = document.getElementById('lead-form')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-[40px] left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FAFAF7]/90 dark:bg-[#0A0A0A]/90 backdrop-blur-lg border-b border-[#EDEDEA] dark:border-[#222]'
          : 'bg-transparent'
      }`}
    >
      <div className="section-padding h-[64px] flex items-center justify-between max-w-[1400px] mx-auto">
        <a href="#" className="font-heading text-xl font-bold tracking-tight text-[#1A1A1A] dark:text-white" aria-label="Automiq Home">
          autom<span className="text-[#2563EB]">i</span>q
        </a>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#999] hover:text-[#1A1A1A] dark:hover:text-white hover:bg-[#F0F0EB] dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={scrollToForm} className="btn-primary py-2 px-5 text-sm cursor-pointer">
            Analyse buchen
          </button>
        </div>
      </div>
    </nav>
  )
}
