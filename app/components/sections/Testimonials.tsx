'use client'

import { useEffect, useRef } from 'react'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Carlos Mendes',
    origin: 'Miami, Florida',
    initials: 'CM',
    stars: 5,
    text: 'A equipe da Russo Immigration foi incrível! Me guiaram em cada passo do processo de asilo com total profissionalismo e empatia. Hoje estou legalizado e com uma nova vida nos EUA.',
  },
  {
    name: 'Ana Paula Santos',
    origin: 'New York, New York',
    initials: 'AS',
    stars: 5,
    text: 'Tinha muito medo do processo, mas a Russo me deu segurança desde o início. Documentação, audiência, tudo acompanhado de perto. Resultado: aprovado! Sou muito grata.',
  },
  {
    name: 'Roberto Ferreira',
    origin: 'Los Angeles, California',
    initials: 'RF',
    stars: 5,
    text: 'Profissionalismo e atenção acima de tudo. Foram transparentes em tudo, nunca me deixaram sem informação. O processo demorou, mas eles estiveram presentes do início ao fim.',
  },
  {
    name: 'Juliana Costa',
    origin: 'Chicago, Illinois',
    initials: 'JC',
    stars: 5,
    text: 'Recomendo de olhos fechados! A Russo entendeu minha situação, criou uma estratégia personalizada e o resultado foi positivo. Atendimento humano e eficiente como esperava.',
  },
  {
    name: 'Marcos Lima',
    origin: 'Houston, Texas',
    initials: 'ML',
    stars: 5,
    text: 'Confiei na Russo depois de pesquisar muito. Melhor decisão que tomei. Equipe séria, rápida e que realmente se importa com o cliente. Processo concluído com sucesso!',
  },
  {
    name: 'Fernanda Oliveira',
    origin: 'Orlando, Florida',
    initials: 'FO',
    stars: 5,
    text: 'Excelente assessoria! Me senti segura e amparada durante todo o processo. A Russo transformou um momento de angústia em esperança real. Hoje tenho meu status legal nos EUA.',
  },
]

export default function Testimonials() {
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
    <section id="depoimentos" ref={sectionRef} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,75,0.3), transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="animate-on-scroll text-center mb-20">
          <p className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium mb-4">Histórias Reais</p>
          <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-6 heading-underline">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="max-w-xl mx-auto text-white/60 leading-relaxed font-light">
            Centenas de famílias já realizaram o sonho de uma vida legal nos EUA com a Russo Immigration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
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
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} className="text-gold-400 fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/65 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-navy-950 shrink-0"
                  style={{ background: 'linear-gradient(135deg, #D4A84B, #F0D080)' }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.origin}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
