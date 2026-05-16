// components/NotaryPublic.tsx
'use client'

import { useEffect, useRef } from 'react'
import { Check } from 'lucide-react'
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

  const docsList = (tRaw('notary.docs_list') as unknown as string[]) || [
    'Passaportes e documentos de identidade',
    'Certificados e diplomas',
    'Documentos de imóvel',
    'Procurações e contratos',
  ]

  const whyList = (tRaw('notary.why_list') as unknown as string[]) || [
    'Certificação reconhecida internacionalmente',
    'Processamento ágil e seguro',
    'Suporte em português',
  ]

  return (
    <section id="notary" ref={sectionRef} className="relative py-20 overflow-hidden bg-white">
      <div className="mx-6 lg:mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-[#e5e7eb]">
          
          {/* Coluna esquerda - Conteúdo */}
          <div className="animate-on-scroll bg-white p-12 lg:p-16 flex flex-col justify-center opacity-0 visible:opacity-100 transition-opacity duration-700">
            <p className="text-xs tracking-[0.3em] uppercase font-medium mb-4 text-[#6b7280]">
              {t('notary.section_label') || 'Certificação Profissional'}
            </p>
            
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[#111827] mb-6 leading-tight">
              Notary Public
            </h2>
            
            <p className="text-base text-[#6b7280] leading-relaxed mb-8">
              {t('notary.description') || 'Documentação legal autenticada para processos de imigração internacionais com compliance e segurança garantidos.'}
            </p>

            {/* Checklist de benefícios */}
            <div className="space-y-4 mb-10">
              {whyList.map((item: string, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={16} className="text-blue-600" />
                  </div>
                  <span className="text-[#111827] text-base leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href={`https://wa.me/16893510277?text=${WA_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-bold text-sm text-white transition-all hover:brightness-110 w-fit"
              style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
            >
              {t('notary.cta_button') || 'Agendar Consulta'}
            </a>
          </div>

          {/* Coluna direita - Documentos */}
          <div className="animate-on-scroll bg-[#f9fafb] p-12 lg:p-16 flex flex-col opacity-0 visible:opacity-100 transition-opacity duration-700 delay-100">
            <h3 className="text-lg font-bold text-[#111827] mb-8">
              {t('notary.docs_title') || 'Documentos Aceitos'}
            </h3>

            <div className="space-y-4 flex-grow">
              {docsList.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-3 pb-4 border-b border-[#e5e7eb] last:border-none">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-[#111827] text-base">{item}</span>
                </div>
              ))}
            </div>

            {/* Info box */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-900">
                <span className="font-bold">Processamento rápido:</span> Atendimento especializado com segurança garantida e suporte em português.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}