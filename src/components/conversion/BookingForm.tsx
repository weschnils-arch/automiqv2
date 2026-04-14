import { useState, useEffect, useRef, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { useLanguage } from '../../i18n/LanguageContext'

interface BookingFormProps {
  product: 'potenzialanalyse' | 'operate' | 'expand' | 'lead'
  quizAnswers?: Record<string, string>
}

export default function BookingForm({ product, quizAnswers }: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !formRef.current) return
    gsap.fromTo(formRef.current, { opacity: 0, height: 0 }, { opacity: 1, height: 'auto', duration: 0.5, ease: 'power3.out' })
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const sizeMap: Record<string, string> = {
    '1-4': '1-4',
    '5-15': '5-15',
    '16-50': '16-50',
    '50+': '50+',
  }

  const painMap: Record<string, string> = {
    'bottleneck': 'zu-viel-admin',
    'manual': 'zu-viel-admin',
    'growth-chaos': 'wachstum-chaos',
    'orientation': 'keine-uebersicht',
    'bad-roi': 'fehlentscheidung-angst',
  }

  const defaultSize = quizAnswers?.['company-size'] ? sizeMap[quizAnswers['company-size']] || '' : ''
  const defaultPain = quizAnswers?.['pain-point'] ? painMap[quizAnswers['pain-point']] || '' : ''

  const ctaLabel = product === 'potenzialanalyse' ? t('bookingCtaPotenzialanalyse') : t('bookingCtaConsultation')

  return (
    <div ref={formRef} className="overflow-hidden">
      <div className="bg-[#F7F7F5] dark:bg-white/5 rounded-2xl p-6 sm:p-8 border border-[#EDEDEA] dark:border-white/10 mt-6">
        {submitted ? (
          <div className="text-center py-8">
            <p className="font-heading text-xl font-bold text-[#1A1A1A] dark:text-white mb-2">{t('bookingSubmitted')}</p>
            <p className="text-sm text-[#777] dark:text-[#999]">{t('bookingSubmittedSub')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor={`name-${product}`} className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">{t('bookingNameLabel')}</label>
              <input type="text" id={`name-${product}`} name="name" required className="input-field" placeholder={t('bookingNamePlaceholder')} />
            </div>
            <div>
              <label htmlFor={`email-${product}`} className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">{t('bookingEmailLabel')}</label>
              <input type="email" id={`email-${product}`} name="email" required className="input-field" placeholder={t('bookingEmailPlaceholder')} />
            </div>
            <div>
              <label htmlFor={`phone-${product}`} className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">
                {t('bookingPhoneLabel')} <span className="text-[#BBB] dark:text-[#555]">{t('bookingPhoneOptional')}</span>
              </label>
              <input type="tel" id={`phone-${product}`} name="phone" className="input-field" placeholder={t('bookingPhonePlaceholder')} />
            </div>
            <div>
              <label htmlFor={`size-${product}`} className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">{t('bookingSizeLabel')}</label>
              <select id={`size-${product}`} name="companySize" required className="input-field cursor-pointer appearance-none" defaultValue={defaultSize}>
                <option value="">{t('bookingSizePlaceholder')}</option>
                <option value="1-4">{t('bookingSize1')}</option>
                <option value="5-15">{t('bookingSize2')}</option>
                <option value="16-50">{t('bookingSize3')}</option>
                <option value="50+">{t('bookingSize4')}</option>
              </select>
            </div>
            <div>
              <label htmlFor={`pain-${product}`} className="block text-xs font-medium text-[#777] dark:text-[#999] mb-1.5">{t('bookingPainLabel')}</label>
              <select id={`pain-${product}`} name="painPoint" required className="input-field cursor-pointer appearance-none" defaultValue={defaultPain}>
                <option value="">{t('bookingPainPlaceholder')}</option>
                <option value="zu-viel-admin">{t('bookingPain1')}</option>
                <option value="wachstum-chaos">{t('bookingPain2')}</option>
                <option value="keine-uebersicht">{t('bookingPain3')}</option>
                <option value="fachkraeftemangel">{t('bookingPain4')}</option>
                <option value="fehlentscheidung-angst">{t('bookingPain5')}</option>
                <option value="sonstiges">{t('bookingPain6')}</option>
              </select>
            </div>

            <button type="submit" className="btn-primary w-full justify-center mt-2 cursor-pointer">
              {ctaLabel}
              <ArrowRight size={16} />
            </button>

            <p className="text-[11px] text-[#AAA] dark:text-[#666] text-center leading-relaxed">
              {t('bookingPrivacy')}
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
