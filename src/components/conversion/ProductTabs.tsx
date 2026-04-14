import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useLanguage } from '../../i18n/LanguageContext'
import PotenzialanalyseTab from './PotenzialanalyseTab'
import WachstumsprogrammTab from './WachstumsprogrammTab'
import type { TabId } from './types'

interface ProductTabsProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  quizAnswers?: Record<string, string>
}

export default function ProductTabs({ activeTab, onTabChange, quizAnswers }: ProductTabsProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const prevTab = useRef(activeTab)
  const { t } = useLanguage()

  const tabs: { id: TabId; labelKey: 'tabPotenzialanalyse' | 'tabWachstumsprogramm' }[] = [
    { id: 'potenzialanalyse', labelKey: 'tabPotenzialanalyse' },
    { id: 'wachstumsprogramm', labelKey: 'tabWachstumsprogramm' },
  ]

  useEffect(() => {
    if (prevTab.current === activeTab) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReduced && contentRef.current) {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
    }
    prevTab.current = activeTab
  }, [activeTab])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !contentRef.current) return
    gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
  }, [])

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex justify-center mb-10">
        <div className="bg-[#F0F0EB] dark:bg-white/5 rounded-full p-1 inline-flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`font-heading text-sm font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-white/10 text-[#1A1A1A] dark:text-white shadow-sm'
                  : 'text-[#999] dark:text-[#666] hover:text-[#555] dark:hover:text-[#999]'
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div ref={contentRef}>
        {activeTab === 'potenzialanalyse' && (
          <PotenzialanalyseTab quizAnswers={quizAnswers} />
        )}
        {activeTab === 'wachstumsprogramm' && (
          <WachstumsprogrammTab quizAnswers={quizAnswers} />
        )}
      </div>
    </div>
  )
}
