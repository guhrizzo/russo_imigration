'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/app/i18n/LanguageContext'

interface FeatureItem {
  title: string
  description: string
}

interface CardData {
  id: string
  title: string
  description: string
  features: FeatureItem[]
  image: string
  imageAlt: string
  imagePosition: 'left' | 'right'
  buttonText: string
  buttonHref?: string
  badges?: Array<{
    icon: string
    title: string
    description: string
  }>
}

interface WhyUsSectionProps {
  cards?: CardData[]
  useDictionary?: boolean
}

export default function WhyUsSection({ 
  cards: externalCards,
  useDictionary = true
}: WhyUsSectionProps = {}) {
  const { t, tRaw, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())

  /**
   * Construir cards 100% a partir do dicionário i18n
   * Sem conteúdo estático - tudo vem do dicionário
   */
  const buildCardsFromDictionary = (): CardData[] => {
    try {
      const whyUsData = tRaw('why_us') as any
      
      console.log('🌍 Language:', language)
      console.log('📋 whyUsData:', whyUsData)
      
      if (!whyUsData) {
        console.warn('❌ No why_us data found in dictionary')
        return []
      }

      // Extrair arrays do dicionário
      const topFeatures = whyUsData.features || []
      const bottomFeatures = whyUsData.bottom_features || []
      
      if (!Array.isArray(topFeatures) || topFeatures.length === 0) {
        console.warn('❌ No valid features array found')
        return []
      }

      console.log('✅ Found features:', topFeatures.length)
      console.log('✅ Found bottom_features:', bottomFeatures.length)

      const allCards: CardData[] = []

      // CARD 1-2: Agrupar top features em pares
      for (let i = 0; i < topFeatures.length; i += 2) {
        const pair = [topFeatures[i], topFeatures[i + 1]].filter(Boolean)
        
        allCards.push({
          id: `dict-card-top-${Math.floor(i / 2)}`,
          title: topFeatures[i].title,
          description: pair.map(f => f.description).join(' '),
          features: pair,
          image: `/img-0${((Math.floor(i / 2)) % 4) + 1}.png`,
          imageAlt: topFeatures[i].title,
          imagePosition: Math.floor(i / 2) % 2 === 0 ? 'left' : 'right',
          buttonText: t('contact.whatsapp_button') || t('navbar.speak_with_us') || 'Fale Conosco',
          buttonHref: '#contact',
        })
      }

      // CARD FINAL: bottom_features com badges
      if (bottomFeatures.length > 0) {
        allCards.push({
          id: 'dict-card-bottom',
          title: whyUsData.divider || 'Nossos Valores',
          description: bottomFeatures.map((f: any) => f.description).join(' '),
          features: bottomFeatures,
          image: '/img-04.png',
          imageAlt: whyUsData.divider || 'Nossos Valores',
          imagePosition: 'right',
          buttonText: t('contact.whatsapp_button') || t('navbar.speak_with_us') || 'Fale Conosco',
          buttonHref: '#contact',
          badges: bottomFeatures.map((f: any) => ({
            icon: '✓',
            title: f.title,
            description: f.description,
          })),
        })
      }

      console.log('✅ Created', allCards.length, 'cards from dictionary')
      return allCards

    } catch (error) {
      console.error('❌ Error loading cards from dictionary:', error)
      return []
    }
  }

  // useMemo para recalcular quando idioma mudar
  const cardSections = useMemo(() => {
    if (externalCards) {
      console.log('📌 Using external cards prop')
      return externalCards
    }
    return useDictionary ? buildCardsFromDictionary() : []
  }, [language, externalCards, useDictionary])

  // Se não houver cards, não renderizar nada
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

  // Puxar título e descrição do dicionário
  const sectionTitle = t('why_us.title')
  const sectionLabel = t('why_us.section_label')
  const sectionDescription = t('why_us.description')

  return (
    <section id="por-que-nos" ref={sectionRef} className="relative py-32 overflow-hidden bg-navy-900">
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
                className={`group opacity-0 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'translate-y-16'
                }`}
              >
                {/* Card Container */}
                <div className="relative rounded-3xl overflow-hidden bg-linear-gradient-to-br from-navy-800/50 to-navy-900/30 backdrop-blur-xl border border-gold-400/20 group-hover:border-gold-400/40 transition-all duration-500 shadow-2xl">
                  
                  {/* Active state gradient */}
                  <div className="absolute inset-0 bg-linear-to-br from-gold-400/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Grid Layout */}
                  <div className={`relative z-10 grid lg:grid-cols-2 gap-12 items-stretch p-10 md:p-16`}>
                    
                    {/* Content Side */}
                    <div className={`flex flex-col justify-between ${isImageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                      {/* Header */}
                      <div>
                        {/* Title */}
                        <h2 className="font-display text-3xl md:text-4xl xl:text-5xl text-white font-bold mb-6 leading-tight tracking-tight">
                          {card.title}
                        </h2>

                        {/* Description */}
                        {card.description && (
                          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 font-light max-w-xl">
                            {card.description}
                          </p>
                        )}
                      </div>

                      {/* Features List */}
                      {card.features && card.features.length > 0 && (
                        <div className="space-y-4 mb-12">
                          {card.features.map((feature, featureIdx) => (
                            <div 
                              key={featureIdx}
                              className="flex gap-4 items-start group/item opacity-0 animate-fade-in-up"
                              style={{ animationDelay: `${isVisible ? featureIdx * 100 : 0}ms` }}
                            >
                              {/* Checkmark */}
                              <div className="shrink-0 mt-1">
                                <CheckCircle2 size={24} className="text-gold-400 shrink-0" />
                              </div>
                              
                              <div className="flex-1">
                                <p className="text-white font-semibold text-base leading-tight mb-1">
                                  {feature.title}
                                </p>
                                <p className="text-white/60 text-sm leading-relaxed font-light">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Badges (if provided) */}
                      {card.badges && card.badges.length > 0 && (
                        <div className="grid sm:grid-cols-2 gap-4 mb-12">
                          {card.badges.map((badge, badgeIdx) => (
                            <div
                              key={badgeIdx}
                              className="relative rounded-2xl p-6 bg-linear-gradient-to-br from-navy-800/60 to-navy-900/40 border border-gold-400/20 group-hover/badge:border-gold-400/40 transition-all duration-300 opacity-0 animate-fade-in-up"
                              style={{ animationDelay: `${isVisible ? (card.features.length + badgeIdx) * 100 : 0}ms` }}
                            >
                              <div className="flex items-start gap-3 group-hover/badge:gap-4 transition-all">
                                <span className="text-3xl shrink-0">{badge.icon}</span>
                                <div>
                                  <h4 className="text-white font-semibold text-base mb-1">
                                    {badge.title}
                                  </h4>
                                  <p className="text-white/60 text-sm leading-relaxed font-light">
                                    {badge.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CTA Button */}
                      <div>
                        <a
                          href={card.buttonHref || '#'}
                          className="group/btn inline-flex items-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-gold-400 to-gold-500 text-navy-900 font-semibold text-base md:text-lg hover:shadow-2xl hover:shadow-gold-400/50 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                        >
                          <span>{card.buttonText}</span>
                          <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </a>
                      </div>
                    </div>

                    {/* Image Side */}
                    <div className={`relative ${isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="relative h-full min-h-96 rounded-2xl overflow-hidden group/img">
                        {/* Image container with loading state */}
                        <div className="relative w-full h-full bg-linear-gradient-to-br from-gold-400/10 to-blue-500/10">
                          <Image
                            src={card.image}
                            alt={card.imageAlt}
                            fill
                            className="object-cover group-hover/img:scale-110 transition-transform duration-700"
                            priority={idx === 0}
                          />
                        </div>

                        {/* Overlay gradient on hover */}
                        <div className="absolute inset-0 bg-linear-to-t from-navy-900/50 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />

                        {/* Border gradient */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-linear-to-br from-gold-400/30 via-gold-400/10 to-gold-400/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none" />
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