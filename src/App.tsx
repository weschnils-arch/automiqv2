import { useLenis } from './hooks/useLenis'
import { useTheme } from './hooks/useTheme'
import { useLanguage } from './i18n/LanguageContext'
import UrgencyBar from './components/UrgencyBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import AnalyseWertSection from './components/AnalyseWertSection'
import DifferentiationSection from './components/DifferentiationSection'
import SolutionSection from './components/SolutionSection'
import FitSection from './components/FitSection'
import TestimonialsSection from './components/TestimonialsSection'
import ExpertSection from './components/ExpertSection'
import FAQSection from './components/FAQSection'
import ConversionSection from './components/ConversionSection'
import Footer from './components/Footer'

export default function App() {
  useLenis()
  const { isDark, toggle } = useTheme()
  const { t } = useLanguage()

  return (
    <>
      <a
        href="#lead-form"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#1A1A1A] focus:text-white focus:rounded-lg"
      >
        {t('skipToForm')}
      </a>

      <UrgencyBar />
      <Navbar isDark={isDark} onToggleTheme={toggle} />

      <main>
        <Hero />
        <TestimonialsSection />
        <ProblemSection />
        <AnalyseWertSection />
        <DifferentiationSection />
        <SolutionSection />
        <ExpertSection />
        <FitSection />
        <FAQSection />
        <ConversionSection isDark={isDark} />
      </main>

      <Footer />
    </>
  )
}
