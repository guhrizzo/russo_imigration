'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/app/i18n/LanguageContext'

interface FeatureItem {
  title: string
  description: string
}

interface ServiceCard {
  id: string
  title: string
  description: string
  features: FeatureItem[]
  image: string
  imageAlt: string
  imagePosition: 'left' | 'right'
  buttonText: string
  buttonHref?: string
}

interface ServicesProps {
  cards?: ServiceCard[]
  useDictionary?: boolean
}

const WA_MESSAGE = encodeURIComponent('Olá! Gostaria de conhecer melhor os serviços da Russo Immigration e entender como vocês podem ajudar no meu caso.')

export default function Services({
  cards: externalCards,
  useDictionary = true
}: ServicesProps = {}) {
  const { t, tRaw, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())

  /**
   * Construir cards 100% a partir do dicionário i18n
   */
  const buildCardsFromDictionary = (): ServiceCard[] => {
    try {
      const servicesData = tRaw('services.services') as any[]

      console.log('🌍 Language:', language)
      console.log('📋 servicesData:', servicesData)

      if (!servicesData || !Array.isArray(servicesData)) {
        console.warn('❌ No services data found in dictionary')
        return []
      }

      const images = ['/img-05.png', '/img-06.png', '/img-07.png']

      const allCards: ServiceCard[] = servicesData.map((service: any, index: number) => ({
        id: `service-card-${index}`,
        title: service.title,
        description: service.description,
        features: service.features || [],
        image: images[index % images.length],
        imageAlt: service.title,
        imagePosition: index % 2 === 0 ? 'left' : 'right',
        buttonText: t('services.learn_more') || 'Saiba Mais',
        buttonHref: '#contact',
      }))

      console.log('✅ Created', allCards.length, 'service cards from dictionary')
      return allCards

    } catch (error) {
      console.error('❌ Error loading cards from dictionary:', error)
      return []
    }
  }

  const cardSections = useMemo(() => {
    if (externalCards) {
      console.log('📌 Using external cards prop')
      return externalCards
    }
    return useDictionary ? buildCardsFromDictionary() : []
  }, [language, externalCards, useDictionary])

  if (cardSections.length === 0) {
    console.warn('⚠️  No cards to display')
    return null
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = entry.target.getAttribute('data-card-id')
          if (entry.isIntersecting && cardId) {
            setVisibleCards(prev => new Set(prev).add(cardId))
          }
        })
      },
      { threshold: 0.15 }
    )

    const cards = sectionRef.current?.querySelectorAll('[data-card-id]')
    cards?.forEach((card: any) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  const sectionTitle = t('services.title')
  const sectionLabel = t('services.section_label')
  const sectionDescription = t('services.description')

  return (
    <section id="servicos" ref={sectionRef} className="relative py-32 overflow-hidden bg-navy-900">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold-400/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20 text-center">
          {sectionLabel && (
            <p className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-2">
              {sectionLabel}
            </p>
          )}
          {sectionTitle && (
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {sectionTitle}
            </h2>
          )}
          {sectionDescription && (
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              {sectionDescription}
            </p>
          )}
        </div>

        {/* Cards Section */}
        <div className="space-y-16">
          {cardSections.map((card, idx) => {
            const isVisible = visibleCards.has(card.id)
            const isImageRight = card.imagePosition === 'right'

            return (
              <div
                key={card.id}
                data-card-id={card.id}
                className={`group opacity-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-16'
                  }`}
              >
                {/* Card Container */}
                <div className="relative rounded-3xl overflow-hidden bg-linear-gradient-to-br from-navy-800/50 to-navy-900/30 backdrop-blur-xl border border-gold-400/20 group-hover:border-gold-400/40 transition-all duration-500 shadow-2xl">

                  {/* Active state gradient */}
                  <div className="absolute inset-0 bg-linear-to-br from-gold-400/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Grid Layout */}
                  <div className={`relative z-10 grid lg:grid-cols-2 gap-8 items-start p-10 md:p-16`}>

                    {/* Content Side */}
                    <div className={`flex flex-col gap-8 ${isImageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                      {/* Card Number */}
                      <div className="flex items-center gap-3">
                        <p className="text-gold-400 text-sm font-light tracking-[0.2em]">
                          /{String(idx + 1).padStart(3, '0')}
                        </p>
                      </div>

                      {/* Title */}
                      <h2 className="font-display text-3xl md:text-4xl xl:text-5xl text-white font-bold leading-tight tracking-tight group-hover:text-gold-400 transition-colors duration-300">
                        {card.title}
                      </h2>

                      {/* Description */}
                      {card.description && (
                        <p className="text-white/70 text-base md:text-lg leading-relaxed font-light max-w-xl">
                          {card.description}
                        </p>
                      )}

                      {/* CTA Button */}
                      <div>
                        <a
                          href={`https://wa.me/16893510277?text=${WA_MESSAGE}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn inline-flex items-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-gold-400 to-gold-500 text-navy-900 font-semibold text-base md:text-lg hover:shadow-2xl hover:shadow-gold-400/50 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                        >
                          <span>{card.buttonText}</span>
                          <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </a>
                      </div>
                    </div>

                    {/* Image Side */}
                    <div className={`relative ${isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="relative aspect-4/3 rounded-2xl overflow-hidden group/img">
                        {/* Image container */}
                        <div className="relative w-full h-full bg-linear-gradient-to-br from-gold-400/10 to-blue-500/10">
                          <Image
                            src={card.image}
                            alt={card.imageAlt}
                            fill
                            className="object-cover group-hover/img:scale-110 transition-transform duration-700"
                            priority={idx === 0}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                          />
                        </div>

                        {/* Overlay gradient on hover */}
                        <div className="absolute inset-0 bg-linear-to-t from-navy-900/50 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />

                        {/* Badge floating */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-linear-to-br from-gold-400 to-gold-300 flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-navy-950 font-bold text-lg"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </div>

                        {/* Shine effect */}
                        <div className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500"
                          style={{
                            background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                            pointerEvents: 'none'
                          }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  )
}