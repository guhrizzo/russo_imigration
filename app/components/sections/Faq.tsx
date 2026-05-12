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

                {/* CTA Premium */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="mt-16 relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-md"
                >
                    {/* Faixa de gradiente no topo */}
                    <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold-400/60 to-transparent" />
                    {/* Brilho de fundo */}
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-gold-400/8 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative flex flex-col items-center gap-6 px-8 py-12 text-center">
                        {/* Ícone WhatsApp com pulse */}
                        <div className="relative">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366]/15 border border-[#25D366]/30">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#25D366]">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                            </div>
                        </div>

                        {/* Texto */}
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-white">
                                Sua dúvida não foi respondida?
                            </h3>
                            <p className="text-slate-400 max-w-sm mx-auto leading-relaxed">
                                Fale agora com um de nossos especialistas em imigração e receba orientação personalizada.
                            </p>
                        </div>

                        {/* Divisor */}
                        <div className="w-16 h-px bg-gold-400/30" />

                        {/* Botão */}
                        <a
                            href={WA_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-white text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_-10px_rgba(37,211,102,0.4)]"
                            style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
                        >
                            {/* Shimmer */}
                            <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <svg viewBox="0 0 24 24" fill="currentColor" className="relative w-5 h-5 shrink-0">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            <span className="relative">Falar com Especialista</span>
                        </a>

                        {/* Microtexto de disponibilidade */}
                        <p className="flex items-center gap-1.5 text-xs text-slate-500">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                            Disponível agora · Resposta em minutos
                        </p>
                    </div>

                    {/* Faixa de gradiente no rodapé */}
                    <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                </motion.div>
            </div>
        </section>
    )
}