'use client'

import { useEffect, useRef } from 'react'
import { Star, Quote } from 'lucide-react'
import { useLanguage } from '@/app/i18n/LanguageContext'

export default function Testimonials() {
  const { t, tRaw } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  const testimonials = (tRaw('testimonials.testimonials') as unknown as any[]).map((testimonial: any) => ({
    ...testimonial,
    stars: 5,
    initials: testimonial.name.split(' ').map((n: string) => n[0]).join(''),
  }))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="depoimentos" ref={sectionRef} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,75,0.3), transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="animate-on-scroll text-center mb-20">
          <p className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium mb-4">{t('testimonials.section_label')}</p>
          <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-6 heading-underline">
            {t('testimonials.title')}
          </h2>
          <p className="max-w-xl mx-auto text-white/60 leading-relaxed font-light">
            {t('testimonials.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t_item: any, i: number) => (
            <div
              key={i}
              className="animate-on-scroll glass-card rounded-2xl p-7 hover:border-gold-400/30 transition-colors relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-gold-400/15">
                <Quote size={32} fill="currentColor" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t_item.stars }).map((_: any, j: number) => (
                  <Star key={j} size={14} className="text-gold-400 fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/65 text-sm leading-relaxed mb-6 italic">"{t_item.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-navy-950 shrink-0"
                  style={{ background: 'linear-gradient(135deg, #D4A84B, #F0D080)' }}
                >
                  {t_item.initials}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{t_item.name}</div>
                  <div className="text-white/40 text-xs">{t_item.origin}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
