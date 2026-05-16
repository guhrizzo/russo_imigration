'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/app/i18n/LanguageContext'

const WA_MESSAGE = encodeURIComponent('Olá! Gostaria de uma consulta gratuita para iniciar meu processo de imigração nos EUA.')

export default function Hero() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

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

    // Garantir que o vídeo toque
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log('Autoplay bloqueado, vídeo será iniciado ao interagir')
      })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Fundo sólido enquanto o vídeo não carrega */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 0, backgroundColor: '#070707' }}
      />

      {/* VIDEO BACKGROUND */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/usa_poster.jpg"
        onLoadedData={() => setVideoReady(true)}
        onPlay={() => setVideoReady(true)}
        onError={() => {
          console.error('Erro ao carregar vídeo')
          setVideoReady(true) // Mostrar mesmo se houver erro
        }}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{
          zIndex: 1,
          opacity: videoReady ? 1 : 0,
        }}
      >
        <source src="/usa_better_30fps.mp4" type="video/mp4" />
      </video>

      {/* GRADIENT OVERLAY - Leve */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 60%)',
        }}
      />

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 py-32 flex items-center min-h-screen" style={{ zIndex: 10 }}>
        
        {/* Left side - Text content */}
        <div className="w-full lg:w-1/2 space-y-8">
          
          {/* Tagline */}
          <div className="animate-on-scroll inline-flex items-center gap-2 text-white/80 text-sm font-medium uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
            {t('hero.tagline')}
          </div>

          {/* Title */}
          <h1 className="animate-on-scroll font-jakarta text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.2] space-y-2">
            <div>Consultoria Estratégica para</div>
            <div>
              <span className="italic text-white/90">sua Imigração Legal nos Estados Unidos</span>
            </div>
          </h1>

          {/* Description */}
          <p className="animate-on-scroll text-white/70 text-lg leading-relaxed max-w-2xl font-light">
            {t('hero.description')}
          </p>

          {/* CTA Button */}
          <div className="animate-on-scroll flex items-center gap-3">
            <a
              href={`https://wa.me/16893510277?text=${WA_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-[#2c4a7c] text-white font-semibold text-base flex items-center gap-3 hover:bg-[#3d5a8c] transition-all duration-300 border border-[#3d5a8c] hover:shadow-lg"
            >
              Quero fazer uma consulta gratuita
              <span className="text-[#d4af37]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>

        </div>

        {/* Right side - Spacer for background image */}
        <div className="hidden lg:block w-1/2" />
        
      </div>

      {/* Scroll indicator */}
      <a
        href="#sobre"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/60 transition-colors"
        style={{ zIndex: 10, animation: 'float 2s ease-in-out infinite' }}
      >
        <ChevronDown size={24} />
      </a>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#d4af37]/50 to-transparent" style={{ zIndex: 10 }} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </section>
  )
}