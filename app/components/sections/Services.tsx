'use client'

import { useEffect, useRef } from 'react'
import { FileText, Scale, Globe, ShieldCheck, Clock, Users2 } from 'lucide-react'
import { useLanguage } from '@/app/i18n/LanguageContext'

const WA_MESSAGE = encodeURIComponent('Olá! Gostaria de conhecer melhor os serviços da Russo Immigration e entender como vocês podem ajudar no meu caso.')

const iconMap: Record<number, React.ReactNode> = {
  0: <FileText size={28} />,
  1: <Scale size={28} />,
  2: <Globe size={28} />,
  3: <ShieldCheck size={28} />,
  4: <Clock size={28} />,
  5: <Users2 size={28} />,
}

export default function Services() {
  const { t ,tRaw  } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  const services = (tRaw('services.services') as any[]).map((service: any, i: number) => ({
  ...service,
  icon: iconMap[i],
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
    <section id="servicos" ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-950" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #1C3258 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-20">
          <p className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium mb-4">{t('services.section_label')}</p>
          <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-6 heading-underline">
            {t('services.title')}
          </h2>
          <p className="max-w-xl mx-auto text-white/60 leading-relaxed font-light">
            {t('services.description')}
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: any, i: number) => (
            <div
              key={i}
              className={`animate-on-scroll relative glass-card rounded-2xl p-8 hover:border-gold-400/40 transition-all duration-300 group cursor-pointer
                ${i === 0 ? 'border-gold-400/40 md:col-span-2 lg:col-span-1' : ''}`}
            >
              {service.badge && (
                <div className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                  style={{ background: 'linear-gradient(135deg, #D4A84B, #F0D080)', color: '#050D1F' }}>
                  {service.badge}
                </div>
              )}

              <div className="icon-circle mb-6 group-hover:bg-gold-400/15 transition-colors text-gold-400">
                {service.icon}
              </div>

              <h3 className="font-display text-xl text-white font-semibold mb-3">{service.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-6">{service.description}</p>

              <ul className="space-y-2">
                {service.features.map((feat: string, j: number) => (
                  <li key={j} className="flex items-center gap-2 text-xs text-white/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400/60 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="animate-on-scroll mt-16 relative rounded-3xl overflow-hidden p-10 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(28,50,88,0.9) 0%, rgba(14,30,53,0.95) 100%)', border: '1px solid rgba(212,168,75,0.25)' }}>
          {/* Gold corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold-400/30" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold-400/30" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold-400/30" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold-400/30" />

          <p className="text-gold-400 text-xs tracking-[0.3em] uppercase mb-4">{t('services.cta_label')}</p>
          <h3 className="font-display text-3xl text-white font-bold mb-4">
            {t('services.cta_title')}
          </h3>
          <p className="text-white/60 mb-8 max-w-lg mx-auto font-light">
            {t('services.cta_description')}
          </p>
           <a
             href={`https://wa.me/16893510277?text=${WA_MESSAGE}`}
             target="_blank"
             rel="noopener noreferrer"
             className="btn-gold inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-semibold"
           >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t('services.cta_button')}
          </a>
        </div>
      </div>
    </section>
  )
}
