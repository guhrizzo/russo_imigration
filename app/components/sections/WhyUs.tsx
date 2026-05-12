'use client'

import { useEffect, useRef } from 'react'
import { ShieldCheck, Users, Scale, Globe, Lock, Clock, Handshake, Heart } from 'lucide-react'

const mainFeatures = [
  {
    icon: <ShieldCheck size={32} />,
    title: 'Experiência Comprovada',
    description: 'Anos de atuação e centenas de casos de sucesso. Conhecemos cada detalhe do processo imigratório.',
  },
  {
    icon: <Users size={32} />,
    title: 'Atendimento Personalizado',
    description: 'Cada caso é único. Nós ouvimos, entendemos e cuidamos de você com dedicação total.',
  },
  {
    icon: <Scale size={32} />,
    title: 'Estratégias Eficazes',
    description: 'Análise detalhada e planos estratégicos desenvolvidos especificamente para o seu caso.',
  },
  {
    icon: <Globe size={32} />,
    title: 'Foco em Resultados',
    description: 'Nosso compromisso é com o seu sucesso e tranquilidade em cada etapa da jornada.',
  },
]

const bottomFeatures = [
  { icon: <Lock size={20} />, title: 'Confidencial', description: 'Suas informações estão sempre protegidas com total sigilo.' },
  { icon: <Clock size={20} />, title: 'Eficiente', description: 'Agilidade e organização para o melhor caminho do seu caso.' },
  { icon: <Handshake size={20} />, title: 'Confiável', description: 'Transparência e compromisso que geram confiança genuína.' },
  { icon: <Heart size={20} />, title: 'Empático', description: 'Acolhimento e respeito em cada passo da sua jornada.' },
]

export default function WhyUs() {
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

  return (
    <section id="por-que-nos" ref={sectionRef} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-navy-800" />

      {/* Diagonal gold line decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rotate-45 border border-gold-400/5 rounded-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rotate-12 border border-gold-400/5 rounded-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-20">
          <p className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium mb-4">Nossa Diferença</p>
          <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-6 heading-underline">
            Por Que Escolher a Russo?
          </h2>
          <p className="max-w-xl mx-auto text-white/60 leading-relaxed font-light">
            Combinamos expertise jurídica, atendimento humanizado e estratégias eficazes para garantir
            o melhor resultado no seu processo de imigração.
          </p>
        </div>

        {/* Main 4 features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mainFeatures.map((feat, i) => (
            <div
              key={i}
              className="animate-on-scroll group text-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 mx-auto">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border border-gold-400/20 group-hover:border-gold-400/50 transition-colors" />
                {/* Inner filled */}
                <div className="w-14 h-14 rounded-full bg-gold-400/10 group-hover:bg-gold-400/20 transition-colors flex items-center justify-center text-gold-400">
                  {feat.icon}
                </div>
              </div>
              <h3 className="font-display text-lg text-white font-semibold mb-3">{feat.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>

        {/* Horizontal divider */}
        <div className="animate-on-scroll mb-16">
          <div className="relative">
            <div className="gold-line" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-navy-800 px-6">
              <span className="text-gold-400 text-xs tracking-[0.3em] uppercase">Estamos com Você em Cada Etapa</span>
            </div>
          </div>
        </div>

        {/* Bottom 4 features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bottomFeatures.map((feat, i) => (
            <div
              key={i}
              className="animate-on-scroll glass-card rounded-xl p-6 flex items-start gap-4 hover:border-gold-400/40 transition-colors group"
            >
              <div className="icon-circle shrink-0 w-10 h-10 text-gold-400 group-hover:bg-gold-400/20 transition-colors" style={{ minWidth: 40, height: 40 }}>
                {feat.icon}
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-1 tracking-wide">{feat.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
