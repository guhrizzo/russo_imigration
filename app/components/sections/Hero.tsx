'use client'

import { useEffect, useRef } from 'react'
import { ChevronDown, Shield, Star, Users } from 'lucide-react'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* ── VIDEO BACKGROUND ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/usa_poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/usa_better_30fps.mp4" type="video/mp4" />
      </video>

      {/* ── GRADIENT OVERLAYS sobre o vídeo ── */}

      {/* Camada base escura para legibilidade */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(5,12,28,0.72) 0%, rgba(5,12,28,0.55) 50%, rgba(5,12,28,0.80) 100%)',
        }}
      />

      {/* Gradiente azul-marinho lateral esquerdo */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to right, rgba(10,22,50,0.6) 0%, transparent 60%)',
        }}
      />

      {/* Brilho dourado top-center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full"
        style={{
          zIndex: 2,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(212,168,75,0.15) 0%, transparent 70%)',
        }}
      />

      {/* ── DECORAÇÕES (arcos dourados) ── */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none" style={{ zIndex: 2 }}>
        <svg viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 Q130 0 260 130" stroke="rgba(212,168,75,0.35)" strokeWidth="1.5" fill="none" />
          <path d="M0 0 Q90 0 180 90" stroke="rgba(212,168,75,0.18)" strokeWidth="1" fill="none" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none rotate-180" style={{ zIndex: 2 }}>
        <svg viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 Q130 0 260 130" stroke="rgba(212,168,75,0.35)" strokeWidth="1.5" fill="none" />
          <path d="M0 0 Q90 0 180 90" stroke="rgba(212,168,75,0.18)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* ── CONTENT ── */}
      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 text-center" style={{ zIndex: 10 }}>
        {/* Badge */}
        <div className="animate-on-scroll inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400 text-xs tracking-[0.2em] font-medium uppercase mb-10">
          <Star size={12} fill="currentColor" />
          Novos Começos. Futuros Extraordinários.
          <Star size={12} fill="currentColor" />
        </div>

        {/* Main heading */}
        <h1 className="animate-on-scroll font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6">
          Sua Vida Legal<br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #D4A84B 0%, #F0D080 50%, #C5943A 100%)' }}
          >
            nos Estados Unidos
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-on-scroll max-w-2xl mx-auto text-white/65 text-lg md:text-xl leading-relaxed mb-12 font-light">
          Assessoria especializada em imigração. Atendimento personalizado para o seu processo de
          asilo, visto e legalização. Estamos com você em cada etapa da jornada.
        </p>

        {/* CTA buttons */}
        <div className="animate-on-scroll flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="https://wa.me/16893510277"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-8 py-4 rounded-full text-base font-semibold flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Fale Conosco Agora
          </a>
          <a
            href="#sobre"
            className="btn-outline-gold px-8 py-4 rounded-full text-base font-medium flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Conheça Nossa História
          </a>
        </div>

        {/* Stats */}
        <div className="animate-on-scroll grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { icon: <Users size={18} />, value: '500+', label: 'Casos de Sucesso' },
            { icon: <Shield size={18} />, value: '100%', label: 'Sigilo Garantido' },
            { icon: <Star size={18} fill="currentColor" />, value: '5★', label: 'Avaliação dos Clientes' },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="text-gold-400">{stat.icon}</div>
              <div className="text-left">
                <div className="text-white font-display font-bold text-xl">{stat.value}</div>
                <div className="text-white/50 text-xs tracking-wide">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#sobre"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold-400/50 hover:text-gold-400 transition-colors"
        style={{ zIndex: 10, animation: 'float 2s ease-in-out infinite' }}
      >
        <ChevronDown size={24} />
      </a>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 gold-line" style={{ zIndex: 10 }} />
    </section>
  )
}