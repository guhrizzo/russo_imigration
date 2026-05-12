'use client'

import { useState, useEffect, useRef } from 'react'
import { Star, Plus, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
    {
        question: 'Quais tipos de visto vocês auxiliam a obter?',
        answer:
            'Assessoramos uma ampla variedade de vistos, incluindo pedidos de asilo, vistos de trabalho (H-1B, L-1, O-1), visto de investidor (EB-5), reagrupamento familiar (Green Card) e regularização de situações migratórias. Cada caso é analisado individualmente para identificar a melhor estratégia legal.',
    },
    {
        question: 'Qual é o tempo médio para regularizar minha situação?',
        answer:
            'O prazo varia significativamente conforme o tipo de processo. Pedidos de asilo podem ser concluídos em meses, enquanto Green Cards por vínculo familiar ou laboral costumam levar de 1 a 3 anos. Durante nossa consulta inicial, apresentamos uma estimativa realista para o seu caso específico.',
    },
    {
        question: 'Meus dados são tratados com confidencialidade?',
        answer:
            'Sim, 100%. Toda informação compartilhada conosco é protegida por rigorosos protocolos de privacidade. Nossos profissionais seguem um código de conduta ético e nunca divulgamos dados de clientes a terceiros. Sua segurança e tranquilidade são nossa prioridade.',
    },
    {
        question: 'Posso iniciar o processo mesmo estando no Brasil?',
        answer:
            'Sim. Atendemos clientes de qualquer localidade de forma totalmente remota. Realizamos consultas por videochamada, processamos documentos digitalmente e guiamos você em cada etapa antes mesmo de sua chegada aos Estados Unidos. O processo pode ser iniciado hoje mesmo.',
    },
    {
        question: 'Quais documentos são necessários para começar?',
        answer:
            'Os documentos básicos geralmente incluem passaporte válido, certidão de nascimento, comprovante de residência e, dependendo do tipo de processo, documentação profissional ou comprovantes de vínculos familiares. Em nossa primeira consulta, fornecemos uma lista detalhada e personalizada para o seu caso.',
    },
    {
        question: 'Como funciona o acompanhamento durante todo o processo?',
        answer:
            'Você terá um consultor dedicado disponível via WhatsApp, e-mail e videochamadas. Enviamos atualizações proativas a cada mudança de status, preparamos você para entrevistas com autoridades e revisamos toda a documentação antes de qualquer submissão. Nunca estará sozinho nessa jornada.',
    },
    
]

const WA_MESSAGE = encodeURIComponent('Olá! Gostaria de mais informações sobre os serviços de imigração.')
const WA_LINK = `https://wa.me/16893510277?text=${WA_MESSAGE}`

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0) 

    return (
        <section id="faq" className="relative bg-[#020617] py-24 px-6 overflow-hidden">
            {/* Background Decorativo Refinado */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-400/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full -ml-32 -mb-32 pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header Centralizado para melhor equilíbrio */}
                <div className="text-center mb-16 space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-gold-400/20 bg-gold-400/10 text-gold-400 text-[10px] tracking-[0.3em] font-bold uppercase"
                    >
                        <Star size={12} className="fill-gold-400" />
                        Suporte Especializado
                        <Star size={12} className="fill-gold-400" />
                    </motion.div>

                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
                        Tire suas <span className="text-transparent bg-clip-text bg-linear-to-r from-[#D4A84B] via-[#F0D080] to-[#C5943A]">Dúvidas</span>
                    </h2>
                    
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
                        Tudo o que você precisa saber para iniciar sua jornada rumo aos Estados Unidos com segurança jurídica.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="grid gap-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`group rounded-2xl border transition-all duration-500 ${
                                openIndex === i 
                                ? 'border-gold-400/40 bg-white/4 shadow-[0_10px_40px_-15px_rgba(212,168,75,0.1)]' 
                                : 'border-white/5 bg-white/2 hover:border-white/20'
                            }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between gap-4 px-6 py-6 text-left cursor-pointer"
                                aria-expanded={openIndex === i}
                            >
                                <span className={`text-lg font-medium transition-colors duration-300 ${
                                    openIndex === i ? 'text-gold-100' : 'text-slate-300'
                                }`}>
                                    {faq.question}
                                </span>

                                <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 ${
                                    openIndex === i ? 'border-gold-400 bg-gold-400 rotate-45' : 'border-white/10'
                                }`}>
                                    <Plus size={18} className={openIndex === i ? 'text-navy-950' : 'text-gold-400'} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="px-6 pb-6 text-slate-400 leading-relaxed font-light text-base border-t border-white/5 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Refinado */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 p-8 rounded-4xl bg-linear-to-b from-white/5 to-transparent border border-white/10 text-center backdrop-blur-sm"
                >
                    <h3 className="text-xl font-semibold text-white mb-2">Ainda precisa de ajuda?</h3>
                    <p className="text-slate-400 mb-8 max-w-md mx-auto">
                        Clique no botão abaixo para iniciar uma conversa direta com nossos especialistas no WhatsApp.
                    </p>
                    
                    <a
                        href={WA_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gold-400 hover:bg-gold-500 text-navy-950 font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-[0_20px_40px_-10px_rgba(212,168,75,0.3)]"
                    >
                        <MessageCircle size={20} className="fill-current" />
                        Falar com Especialista
                        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500" />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}