// components/WhyUsSection.tsx
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
  useDictionary = true,
}: WhyUsSectionProps = {}) {
  const { t, tRaw, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())

  const buildCardsFromDictionary = (): CardData[] => {
    try {
      const whyUsData = tRaw('why_us') as any
      if (!whyUsData) return []

      const topFeatures = whyUsData.features || []
      const bottomFeatures = whyUsData.bottom_features || []

      if (!Array.isArray(topFeatures) || topFeatures.length === 0) return []

      const allCards: CardData[] = []

      for (let i = 0; i < topFeatures.length; i += 2) {
        const pair = [topFeatures[i], topFeatures[i + 1]].filter(Boolean)
        allCards.push({
          id: `dict-card-top-${Math.floor(i / 2)}`,
          title: topFeatures[i].title,
          description: pair.map((f) => f.description).join(' '),
          features: pair,
          image: `/img-0${(Math.floor(i / 2) % 4) + 1}.png`,
          imageAlt: topFeatures[i].title,
          imagePosition: Math.floor(i / 2) % 2 === 0 ? 'left' : 'right',
          buttonText: t('contact.whatsapp_button') || t('navbar.speak_with_us') || 'Fale Conosco',
          buttonHref: '#contact',
        })
      }

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

      return allCards
    } catch {
      return []
    }
  }

  const cardSections = useMemo(() => {
    if (externalCards) return externalCards
    return useDictionary ? buildCardsFromDictionary() : []
  }, [language, externalCards, useDictionary])

  useEffect(() => {
    const observerCards = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = entry.target.getAttribute('data-card-id')
          if (entry.isIntersecting && cardId) {
            setVisibleCards((prev) => new Set(prev).add(cardId))
          }
        })
      },
      { threshold: 0.1 }
    )

    const observerScroll = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )

    const cards = sectionRef.current?.querySelectorAll('[data-card-id]')
    cards?.forEach((card: any) => observerCards.observe(card))

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observerScroll.observe(el))

    return () => {
      observerCards.disconnect()
      observerScroll.disconnect()
    }
  }, [cardSections])

  if (cardSections.length === 0) return null

  const sectionTitle = t('why_us.title')
  const sectionLabel = t('why_us.section_label')
  const sectionDescription = t('why_us.description')

  return (
    <section id="por-que-nos" ref={sectionRef} className="relative py-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        {(sectionLabel || sectionTitle || sectionDescription) && (
          <div className="animate-on-scroll text-center mb-16">
            {sectionLabel && (
              <p className="text-[#25466e] text-xs tracking-[0.3em] uppercase font-medium mb-4">
                {sectionLabel}
              </p>
            )}
            {sectionTitle && (
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-[#25466e] mb-4 leading-tight">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="text-[#25466e]/70 text-base leading-relaxed max-w-2xl mx-auto">
                {sectionDescription}
              </p>
            )}
          </div>
        )}

        {/* Cards */}
        <div className="space-y-10">
          {cardSections.map((card, idx) => {
            const isVisible = visibleCards.has(card.id)
            const isImageRight = card.imagePosition === 'right'

            return (
              <div
                key={card.id}
                data-card-id={card.id}
                className={`bg-[#25466e] rounded-3xl overflow-hidden transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="grid lg:grid-cols-2 items-stretch min-h-[400px]">

                  {/* Content */}
                  <div
                    className={`flex flex-col justify-between p-10 lg:p-12 ${
                      isImageRight ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div>
                      <p className="text-[#D4A84B] text-xs tracking-[0.3em] uppercase font-medium mb-3">
                        {String(idx + 1).padStart(2, '0')}
                      </p>
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                        {card.title}
                      </h3>
                      {card.description && (
                        <p className="text-white/65 text-sm leading-relaxed mb-7">
                          {card.description}
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    {card.features && card.features.length > 0 && (
                      <div className="space-y-3 mb-8">
                        {card.features.map((feature, fi) => (
                          <div key={fi} className="flex gap-3 items-start">
                            <CheckCircle2 size={18} className="text-[#D4A84B] shrink-0 mt-0.5" />
                            <div>
                              <p className="text-white font-semibold text-sm leading-tight mb-0.5">
                                {feature.title}
                              </p>
                              <p className="text-white/55 text-xs leading-relaxed">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Badges — grid compacto, sem descrição longa */}
                    {card.badges && card.badges.length > 0 && (
                      <div className="grid sm:grid-cols-2 gap-3 mb-8">
                        {card.badges.map((badge, bi) => (
                          <div
                            key={bi}
                            className="rounded-xl p-4 border border-white/15 bg-white/5 hover:border-[#D4A84B]/30 transition-colors flex items-center gap-3"
                          >
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                              style={{ background: 'linear-gradient(135deg, #D4A84B, #F0D080)' }}
                            >
                              <span className="text-[#25466e] text-xs font-bold">{badge.icon}</span>
                            </div>
                            <span className="text-white font-semibold text-sm">{badge.title}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <a
                      href={card.buttonHref || '#'}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-[#25466e] transition-all hover:brightness-95 self-start"
                      style={{ background: 'linear-gradient(135deg, #D4A84B, #F0D080)' }}
                    >
                      <span>{card.buttonText}</span>
                      <ArrowRight size={15} />
                    </a>
                  </div>

                  {/* Image */}
                  <div
                    className={`relative min-h-72 lg:min-h-0 ${
                      isImageRight ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      className="object-cover"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-[#25466e]/20" />
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}