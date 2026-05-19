'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { useLanguage, type Language } from '@/app/i18n/LanguageContext'

const WA_MESSAGE = encodeURIComponent('Olá! Gostaria de mais informações sobre os serviços de imigração.')

const flags = [
  { emoji: '🇧🇷', lang: 'pt-br' as Language, label: 'Português' },
  { emoji: '🇺🇸', lang: 'en' as Language, label: 'English' },
  { emoji: '🇪🇸', lang: 'es' as Language, label: 'Español' },
]

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: t('navbar.inicio'), href: '#inicio' },
    { label: t('navbar.sobre'), href: '#sobre' },
    //{ label: t('navbar.por_que_nos'), href: '#por-que-nos' },
    { label: t('navbar.servicos'), href: '#servicos' },
    { label: t('navbar.depoimentos'), href: '#depoimentos' },
    //{ label: t('navbar.notary'), href: '#notary' },
    //{ label: t('navbar.faq'), href: '#faq' },
    { label: t('navbar.contato'), href: '#contato' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#25466e] border-b border-[#2a3f52]">
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between lg:gap-8 h-24 lg:h-22 relative">

        {/* Logo */}
        <a href="#inicio" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity">
          <img
            src="/logo-russo-imigration.png"
            alt="Russo Immigration"
            className="h-20 lg:h-22 w-auto object-contain"
          />
        </a>

        {/* Desktop nav - centered */}
        <nav className="hidden lg:flex flex-wrap items-center gap-4 xl:gap-6 flex-1 justify-center">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: phone + CTA + flags */}
        <div className="hidden lg:flex items-center gap-6 shrink-0">
          {/* Phone number */}
          <a
            href="tel:+16893510277"
            className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap"
            aria-label="Ligue para nós"
          >
            <Phone size={16} className="shrink-0 text-[#d4af37]" />
            +1 (689) 351-0277
          </a>

          {/* CTA Button */}
          <a
            href={`https://wa.me/16893510277?text=${WA_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full bg-[#d4af37] text-[#3d546b] font-semibold text-sm hover:bg-[#e8c547] transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/30 whitespace-nowrap"
          >
            Fale Conosco
          </a>

          {/* Flag switcher */}
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/20">
            {flags.map((f) => (
              <button
                key={f.lang}
                onClick={() => setLanguage(f.lang)}
                className={`cursor-pointer text-lg transition-all duration-200 ${language === f.lang ? 'scale-125' : 'opacity-60 hover:opacity-100'}`}
                aria-label={`Mudar para ${f.label}`}
                title={f.label}
              >
                {f.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-[#d4af37] hover:text-white transition-colors absolute right-6"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#3d546b] border-t border-[#2a3f52] p-6 space-y-4">
          <nav className="flex flex-col gap-3 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="border-t border-[#2a3f52] pt-4 space-y-3">
            {/* Phone mobile */}
            <a
              href="tel:+16893510277"
              className="flex items-center justify-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors py-2"
              aria-label="Ligue para nós"
            >
              <Phone size={16} className="shrink-0 text-[#d4af37]" />
              +1 (689) 351-0277
            </a>

            {/* CTA mobile */}
            <a
              href={`https://wa.me/16893510277?text=${WA_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-3 rounded-full bg-[#d4af37] text-[#3d546b] font-semibold text-sm text-center hover:bg-[#e8c547] transition-all"
            >
              Fale Conosco
            </a>
          </div>

          {/* Flag switcher mobile */}
          <div className="flex items-center gap-4 pt-4 border-t border-[#2a3f52] justify-center">
            {flags.map((f) => (
              <button
                key={f.lang}
                onClick={() => {
                  setLanguage(f.lang)
                  setMenuOpen(false)
                }}
                className={`cursor-pointer text-xl transition-all ${language === f.lang ? 'scale-125' : 'opacity-60'}`}
                aria-label={`Mudar para ${f.label}`}
                title={f.label}
              >
                {f.emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}