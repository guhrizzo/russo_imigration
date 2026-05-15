'use client'

import { useEffect, useRef } from 'react'
import { PenLine, FileBadge, IdCard, Globe, FileText, Info } from 'lucide-react'
import { useLanguage } from '@/app/i18n/LanguageContext'

const WA_MESSAGE = encodeURIComponent('Olá! Preciso de ajuda com notarização de documentos para o meu processo de imigração. Gostaria de agendar uma consulta.')

export default function NotaryPublic() {
  const { t, tRaw } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

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

  const services = [
    {
      icon: <PenLine size={22} />,
      title: t('notary.service1_title'),
      text: t('notary.service1_text'),
    },
    {
      icon: <FileBadge size={22} />,
      title: t('notary.service2_title'),
      text: t('notary.service2_text'),
    },
    {
      icon: <IdCard size={22} />,
      title: t('notary.service3_title'),
      text: t('notary.service3_text'),
    },
    {
      icon: <Globe size={22} />,
      title: t('notary.service4_title'),
      text: t('notary.service4_text'),
    },
  ]

  return (
    <section id="notary" ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-900" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A84B' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-16">
          <p className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium mb-4">
            {t('notary.section_label')}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-6 heading-underline">
            Notary Public
          </h2>
          <p className="max-w-2xl mx-auto text-white/60 text-lg leading-relaxed font-light">
            {t('notary.description')}
          </p>
        </div>

        {/* Services grid */}
        <div className="animate-on-scroll grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {services.map((item, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-7 hover:border-gold-400/40 transition-colors group relative"
            >
              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold-400/30" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-gold-400/30" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-gold-400/30" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-gold-400/30" />

              <div className="icon-circle mb-5 group-hover:bg-gold-400/15 transition-colors text-gold-400">
                {item.icon}
              </div>
              <h4 className="font-display text-base text-white font-semibold mb-3">{item.title}</h4>
              <p className="text-white/55 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Info boxes */}
        <div className="animate-on-scroll grid md:grid-cols-2 gap-5 mb-12">
          <div className="glass-card rounded-2xl p-7">
            <h4 className="font-display text-gold-400 text-sm font-semibold mb-5 flex items-center gap-2">
              <FileText size={16} />
              {t('notary.docs_title')}
            </h4>
            <ul className="space-y-2">
              {(tRaw('notary.docs_list') as unknown as string[])?.map((item: string, i: number) => (
                <li key={i} className="text-white/60 text-sm flex items-start gap-2 pb-2 border-b border-white/20 last:border-none">
                  <span className="text-gold-400 mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-7">
            <h4 className="font-display text-gold-400 text-sm font-semibold mb-5 flex items-center gap-2">
              <Info size={16} />
              {t('notary.why_title')}
            </h4>
            <ul className="space-y-2">
              {(tRaw('notary.why_list') as unknown as string[])?.map((item: string, i: number) => (
                <li key={i} className="text-white/60 text-sm flex items-start gap-2 pb-2 border-b border-white/20 last:border-none">
                  <span className="text-gold-400 mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gold divider */}
        <div className="gold-line mb-10" />

        {/* CTA */}
        <div className="animate-on-scroll text-center">
          <p className="text-white/50 text-sm mb-5">{t('notary.cta_text')}</p>
          <a
            href={`https://wa.me/16893510277?text=${WA_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t('notary.cta_button')}
          </a>
        </div>
      </div>
    </section>
  )
}