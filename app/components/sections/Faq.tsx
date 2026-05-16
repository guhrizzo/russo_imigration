'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus } from 'lucide-react'
import { useLanguage } from '@/app/i18n/LanguageContext'

export default function FAQ() {
    const { t, tRaw } = useLanguage()
    const [openIndex, setOpenIndex] = useState<number | null>(null)
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

    const faqs = (tRaw('faq.faqs') as unknown as any[])

    return (
        <section ref={sectionRef} className="relative bg-white py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Grid 2 colunas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* ESQUERDA - Título e Imagem */}
                    <div className="animate-on-scroll space-y-8">
                        {/* Label */}
                        <div className="text-sm font-semibold text-slate-600 tracking-wide uppercase">
                            {t('faq.section_label')}
                        </div>

                        {/* Título */}
                        <h2 className="font-display text-5xl lg:text-6xl font-bold text-[#1e3a5f] leading-tight">
                            Perguntas<br />Frequentes
                        </h2>
                    </div>

                    {/* DIREITA - FAQ Items */}
                    <div className="animate-on-scroll space-y-4">
                        {faqs.map((faq: any, i: number) => (
                            <div key={i} className={`border-b border-slate-200 pb-4 last:border-b-0 overflow-hidden transition-all duration-500 ease-in-out`}>
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex items-start justify-between gap-4 py-4 text-left group cursor-pointer"
                                    aria-expanded={openIndex === i}
                                >
                                    <span className="text-lg font-medium text-[#1e3a5f] flex-1 leading-snug group-hover:text-blue-600 transition-colors">
                                        {faq.question}
                                    </span>

                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#1e3a5f] shrink-0 bg-white group-hover:bg-slate-50 transition-colors cursor-pointer">
                                        <Plus 
                                            size={20} 
                                            className="text-[#1e3a5f] transition-transform duration-500"
                                            style={{
                                                transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)'
                                            }}
                                        />
                                    </div>
                                </button>

                                {/* Resposta expandida com animação suave */}
                                <div 
                                    className="overflow-hidden transition-all duration-500 ease-in-out"
                                    style={{
                                        maxHeight: openIndex === i ? '500px' : '0px',
                                        opacity: openIndex === i ? 1 : 0,
                                    }}
                                >
                                    <div className="pl-4 pb-4 text-base text-slate-600 leading-relaxed text-justify">
                                        {faq.answer}
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