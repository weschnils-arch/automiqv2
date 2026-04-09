import { useLenis } from './hooks/useLenis'
import { useTheme } from './hooks/useTheme'
import UrgencyBar from './components/UrgencyBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import SolutionSection from './components/SolutionSection'
import TestimonialsSection from './components/TestimonialsSection'
import LeadForm from './components/LeadForm'
import Footer from './components/Footer'

export default function App() {
  useLenis()
  const { isDark, toggle } = useTheme()

  return (
    <>
      <a
        href="#lead-form"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#1A1A1A] focus:text-white focus:rounded-lg"
      >
        Zum Formular springen
      </a>

      <UrgencyBar />
      <Navbar isDark={isDark} onToggleTheme={toggle} />

      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <TestimonialsSection />
        <LeadForm isDark={isDark} />
      </main>

      <Footer />
    </>
  )
}
