'use client'

import { useEffect, useRef } from 'react'
import { Target, Eye, Heart } from 'lucide-react'
import { useLanguage } from '@/app/i18n/LanguageContext'

function renderBold(text: string) {
  return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part
  )
}

export default function About() {
  const { t, tRaw } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  const values = [
    {
      icon: <Target size={24} />,
      title: t('about.mission'),
      text: t('about.mission_text'),
    },
    {
      icon: <Eye size={24} />,
      title: t('about.vision'),
      text: t('about.vision_text'),
    },
    {
      icon: <Heart size={24} />,
      title: t('about.values'),
      text: t('about.values_text'),
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="sobre" ref={sectionRef} className="relative py-28 overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="animate-on-scroll text-center mb-20">
          <p className="text-divus-yellow text-xs tracking-[0.3em] uppercase font-medium mb-4">{t('about.section_label')}</p>
          <h2 className="font-jakarta text-4xl md:text-5xl text-divus-yellow font-bold mb-6">
            {t('about.title')}
          </h2>
          <p className="max-w-2xl mx-auto text-divus-darklime text-lg leading-relaxed font-light">
            {t('about.description')}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: visual */}
          <div className="animate-on-scroll relative">
            <div className="relative rounded-2xl overflow-hidden aspect-4/5 bg-gradient-to-br from-divus-blue to-divus-blue-light flex items-center justify-center border border-divus-yellow/20">
              {/* Placeholder visual - replace with actual image */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, rgba(30,53,35,0.95) 0%, rgba(38,75,56,0.8) 100%)'
              }} />

              {/* Decorative elements inside the card */}
              <div className="relative z-10 text-center p-12">
                <img
                  src="/logo-russo-imigration.png"
                  alt="Russo Immigration"
                  className="h-64 w-auto object-contain mx-auto mb-6"
                />
                <div className="w-full h-px bg-gradient-to-r from-transparent via-divus-yellow/50 to-transparent mb-8" />
                <p className="text-divus-darklime text-sm italic font-instrument">
                  "{t('about.section_label')}<br />{t('hero.tagline')}"
                </p>
              </div>

              {/* Divus yellow corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-divus-yellow/60" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-divus-yellow/60" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-divus-yellow/60" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-divus-yellow/60" />
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -right-6 bg-divus-blue/90 backdrop-blur-md rounded-lg p-5 border border-divus-yellow/30 shadow-2xl shadow-divus-yellow/20">
              <div className="text-3xl font-jakarta font-bold text-divus-yellow mb-1">500+</div>
              <div className="text-divus-darklime text-sm">{t('about.transformed_lives')}</div>
            </div>
          </div>

          {/* Right: text */}
          <div className="animate-on-scroll">
            <h3 className="font-jakarta text-3xl text-divus-yellow font-semibold mb-6">
              {t('about.partner_title')}
            </h3>
            <div className="space-y-5 text-divus-darklime leading-relaxed">
              <p>{t('about.text1')}</p>
              <p>{t('about.text2')}</p>
              <p>{renderBold(t('about.text3'))}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {(tRaw('about.tags') as unknown as string[])?.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-lg text-xs tracking-widest uppercase border border-divus-yellow/40 text-divus-yellow font-medium bg-divus-yellow/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Mission / Vision / Values */}
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((item, i) => (
            <div
              key={i}
              className="animate-on-scroll bg-gradient-to-br from-divus-blue to-divus-blue-light rounded-lg p-8 hover:border-divus-yellow/60 transition-all group border border-divus-yellow/20 hover:shadow-lg hover:shadow-divus-yellow/20"
            >
              <div className="w-14 h-14 rounded-lg mb-5 group-hover:bg-divus-yellow/20 transition-colors text-divus-yellow flex items-center justify-center bg-divus-yellow/10">
                {item.icon}
              </div>
              <h4 className="font-jakarta text-lg text-divus-white font-semibold mb-3">{item.title}</h4>
              <p className="text-divus-darklime text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}