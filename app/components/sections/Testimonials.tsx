// components/Testimonials.tsx
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
    <section id="depoimentos" ref={sectionRef} className="relative py-20 overflow-hidden bg-white">
      <div className="bg-[#25466e] rounded-3xl mx-6 lg:mx-auto max-w-7xl overflow-hidden">
        <div className="p-12 lg:p-16 flex flex-col items-center">

          {/* Header */}
          <div className="animate-on-scroll text-center mb-12 w-full max-w-2xl">
            <p className="text-[#D4A84B] text-xs tracking-[0.3em] uppercase font-medium mb-4">
              {t('testimonials.section_label')}
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {t('testimonials.title')}
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              {t('testimonials.description')}
            </p>
          </div>

          {/* Cards */}
          <div className="animate-on-scroll w-full grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t_item: any, i: number) => (
              <div
                key={i}
                className="relative rounded-2xl p-6 border border-white/15 bg-white/5 hover:bg-white/10 hover:border-[#D4A84B]/30 transition-colors"
              >
                {/* Quote icon */}
                <div className="absolute top-5 right-5 text-[#D4A84B]/20">
                  <Quote size={28} fill="currentColor" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t_item.stars }).map((_: any, j: number) => (
                    <Star key={j} size={13} className="text-[#D4A84B] fill-current" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-white/65 text-sm leading-relaxed mb-5 italic">
                  "{t_item.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/15">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #D4A84B, #F0D080)',
                      color: '#25466e',
                    }}
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
      </div>
    </section>
  )
}