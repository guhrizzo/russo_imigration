// components/Services.tsx
'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { ArrowRight } from 'lucide-react'
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
  imageSide: string
  buttonText: string
  buttonHref?: string
}

interface ServicesProps {
  cards?: ServiceCard[]
  useDictionary?: boolean
}

const WA_MESSAGE = encodeURIComponent('Olá! Gostaria de conhecer melhor os serviços e entender como vocês podem ajudar no meu caso.')

export default function Services({
  cards: externalCards,
  useDictionary = true,
}: ServicesProps = {}) {
  const { t, tRaw, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())

  const buildCardsFromDictionary = (): ServiceCard[] => {
    try {
      const servicesData = tRaw('services.services') as any[]
      if (!servicesData || !Array.isArray(servicesData)) return []

      const images = ['/img-05.png', '/img-06.png', '/img-07.png']

      return servicesData.map((service: any, index: number) => ({
        id: `service-card-${index}`,
        title: service.title,
        description: service.description,
        features: service.features || [],
        image: images[index % images.length],
        imageAlt: service.title,
        imageSide: index % 2 === 0 ? 'left' : 'right',
        buttonText: t('services.learn_more') || 'Saiba Mais',
        buttonHref: '#contact',
      }))
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

  const sectionTitle = t('services.title')
  const sectionLabel = t('services.section_label')
  const sectionDescription = t('services.description')

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      style={{ background: '#25466e' }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        {(sectionLabel || sectionTitle || sectionDescription) && (
          <div className="animate-on-scroll text-center mb-16">
            {sectionLabel && (
              <p className="text-white/50 text-xs tracking-[0.3em] uppercase font-medium mb-4">
                {sectionLabel}
              </p>
            )}
            {sectionTitle && (
              <h2 className="font-display text-4xl lg:text-6xl font-bold text-white mb-5 leading-tight">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="text-white/65 text-base leading-relaxed max-w-2xl mx-auto">
                {sectionDescription}
              </p>
            )}
          </div>
        )}

        {/* Cards */}
        <div className="space-y-8">
          {cardSections.map((card, idx) => {
            const isVisible = visibleCards.has(card.id)
            const isImageLeft = (card as any).imageSide === 'left'

            return (
              <div
                key={card.id}
                data-card-id={card.id}
                className={`grid grid-cols-1 lg:grid-cols-2 items-center gap-8 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Card branco com conteúdo */}
                <div
                  className={`bg-white rounded-2xl p-8 lg:p-10 flex flex-col justify-between gap-6 h-full ${
                    isImageLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="space-y-4">
                    <p className="text-[#25466e]/40 text-xs tracking-[0.2em] font-medium">
                      /{String(idx + 1).padStart(3, '0')}
                    </p>
                    <h3 className="font-display text-2xl lg:text-3xl font-bold text-[#25466e] leading-tight">
                      {card.title}
                    </h3>
                    {card.description && (
                      <p className="text-[#25466e]/60 text-sm leading-relaxed">
                        {card.description}
                      </p>
                    )}
                  </div>

                  <a
                    href={`https://wa.me/16893510277?text=${WA_MESSAGE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-[#25466e] transition-all hover:brightness-95 self-start"
                    style={{ background: 'linear-gradient(135deg, #D4A84B, #F0D080)' }}
                  >
                    <span>{card.buttonText}</span>
                    <ArrowRight size={15} />
                  </a>
                </div>

                {/* Imagem separada */}
                <div
                  className={`relative rounded-xl overflow-hidden h-80 w-full ${
                    isImageLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}