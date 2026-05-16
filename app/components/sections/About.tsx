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
      icon: <Target size={20} />,
      title: t('about.mission'),
      text: t('about.mission_text'),
    },
    {
      icon: <Eye size={20} />,
      title: t('about.vision'),
      text: t('about.vision_text'),
    },
    {
      icon: <Heart size={20} />,
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
    <section id="sobre" ref={sectionRef} className="relative py-24 overflow-hidden bg-[#25466e]">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Top banner image */}
        <div className="animate-on-scroll mb-16 rounded-2xl overflow-hidden h-64 border border-white/10 max-w-7xl mx-auto">
          <img
            src="/usa.jpg"
            alt="Divus Legal Group"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main content - 2 columns */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left column - Text */}
          <div className="animate-on-scroll space-y-8">
            <div className="space-y-4">
              <h2 className="font-jakarta text-4xl lg:text-5xl text-white font-bold leading-tight">
                {t('about.title')}
              </h2>
              <p className="text-white/70 text-base leading-relaxed">
                {t('about.description')}
              </p>
            </div>

            <div className="space-y-5 text-white/70 text-sm leading-relaxed">
              <p>
                {t('about.text1')}
              </p>
              <p>
                {t('about.text2')}
              </p>
              <p>
                {t('about.text3')}
              </p>
            </div>


          </div>

          {/* Right column - Cards stacked */}
          <div className="space-y-4">
            {values.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll bg-[#1a2f45]/80 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/70 shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-jakarta text-white font-semibold mb-2 text-base">
                      {item.title}
                    </h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}