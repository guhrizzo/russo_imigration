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
    <section id="sobre" ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-900" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A84B' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="animate-on-scroll text-center mb-20">
          <p className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium mb-4">{t('about.section_label')}</p>
          <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-6 heading-underline">
            {t('about.title')}
          </h2>
          <p className="max-w-2xl mx-auto text-white/60 text-lg leading-relaxed font-light">
            {t('about.description')}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: visual */}
          <div className="animate-on-scroll relative">
            <div className="relative rounded-3xl overflow-hidden aspect-4/5 glass-card flex items-center justify-center">
              {/* Placeholder visual - replace with actual image */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, rgba(14,30,53,0.9) 0%, rgba(28,50,88,0.7) 100%)'
              }} />

              {/* Decorative elements inside the card */}
              <div className="relative z-10 text-center p-12">
                <img
                  src="/logo-russo-imigration.png"
                  alt="Russo Immigration"
                  className="h-64 w-auto object-contain mx-auto mb-6"
                />
                <div className="gold-line w-full mb-8" />
                <p className="text-white/50 text-sm italic font-display">
                  "{t('about.section_label')}<br />{t('hero.tagline')}"
                </p>
              </div>

              {/* Gold corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold-400/40" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold-400/40" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold-400/40" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold-400/40" />
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-5 border border-gold-400/20 shadow-2xl">
              <div className="text-3xl font-display font-bold text-gold-400 mb-1">500+</div>
              <div className="text-white/60 text-sm">{t('about.transformed_lives')}</div>
            </div>
          </div>

          {/* Right: text */}
          <div className="animate-on-scroll">
            <h3 className="font-display text-3xl text-white font-semibold mb-6 heading-underline-left">
              {t('about.partner_title')}
            </h3>
            <div className="space-y-5 text-white/65 leading-relaxed">
              <p>{t('about.text1')}</p>
              <p>{t('about.text2')}</p>
              <p>{renderBold(t('about.text3'))}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {(tRaw('about.tags') as unknown as string[])?.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-xs tracking-widest uppercase border border-gold-400/30 text-gold-400 font-medium"
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
              className="animate-on-scroll glass-card rounded-2xl p-8 hover:border-gold-400/40 transition-colors group"
            >
              <div className="icon-circle mb-5 group-hover:bg-gold-400/15 transition-colors text-gold-400">
                {item.icon}
              </div>
              <h4 className="font-display text-lg text-white font-semibold mb-3">{item.title}</h4>
              <p className="text-white/55 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}