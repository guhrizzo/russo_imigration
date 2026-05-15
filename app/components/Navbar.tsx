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
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: t('navbar.inicio'), href: '#inicio' },
    { label: t('navbar.sobre'), href: '#sobre' },
    { label: t('navbar.por_que_nos'), href: '#por-que-nos' },
    { label: t('navbar.servicos'), href: '#servicos' },
    { label: t('navbar.depoimentos'), href: '#depoimentos' },
    { label: t('navbar.notary'), href: '#notary' },
    { label: t('navbar.faq'), href: '#faq' },
    { label: t('navbar.contato'), href: '#contato' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-divus-dark/95 backdrop-blur-md border-b border-divus-yellow/10 py-3' : 'py-4'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between gap-4">

        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity">
          <img
            src="/logo-russo-imigration.png"
            alt="Russo Immigration"
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-divus-yellow transition-colors relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-divus-yellow transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right side: phone + CTA + flags */}
        <div className="hidden xl:flex items-center gap-6 shrink-0">
          {/* Phone number */}
          <a
            href="tel:+16893510277"
            className="flex items-center gap-2 text-sm font-medium text-divus-yellow hover:text-divus-lime transition-colors whitespace-nowrap"
            aria-label="Ligue para nós"
          >
            <Phone size={16} className="shrink-0" />
            +1 (689) 351-0277
          </a>
          <a
            href={`https://wa.me/16893510277?text=${WA_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-lg bg-divus-yellow text-divus-dark font-semibold text-sm hover:bg-divus-lime transition-all duration-300 hover:shadow-lg hover:shadow-divus-yellow/30"
          >
            {t('navbar.speak_with_us')}
          </a>
          {/* Flag switcher */}
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-divus-yellow/20">
            {flags.map((f) => (
              <button
                key={f.lang}
                onClick={() => setLanguage(f.lang)}
                className={`text-lg transition-all duration-200 ${language === f.lang ? 'scale-125' : 'opacity-60 hover:opacity-100'}`}
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
          className="xl:hidden text-divus-yellow hover:text-divus-lime transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="xl:hidden mt-4 mx-4 rounded-lg bg-divus-blue/90 backdrop-blur-md border border-divus-yellow/20 p-6">
          <nav className="flex flex-col gap-3 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-divus-yellow transition-colors py-2 border-b border-divus-yellow/10"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Flags mobile */}
          <div className="flex items-center gap-4 py-3 border-y border-divus-yellow/10 mb-4">
            {flags.map((f) => (
              <button
                key={f.lang}
                onClick={() => setLanguage(f.lang)}
                className={`text-2xl transition-all ${language === f.lang ? 'scale-125' : 'opacity-60'}`}
                aria-label={`Mudar para ${f.label}`}
                title={f.label}
              >
                {f.emoji}
              </button>
            ))}
          </div>

          {/* Phone mobile */}
          <a
            href="tel:+16893510277"
            className="flex items-center justify-center gap-2 text-sm font-medium text-divus-yellow hover:text-divus-lime transition-colors py-3"
            aria-label="Ligue para nós"
          >
            <Phone size={16} className="shrink-0" />
            +1 (689) 351-0277
          </a>
          <a
            href={`https://wa.me/16893510277?text=${WA_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-6 py-3 rounded-lg bg-divus-yellow text-divus-dark font-semibold text-sm text-center mt-3 hover:bg-divus-lime transition-all"
          >
            {t('navbar.speak_with_us_whatsapp')}
          </a>
        </div>
      )}
    </header>
  )
}