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
    { label: t('navbar.servicos'), href: '#servicos' },
    { label: t('navbar.notary'), href: '#notary' },
    { label: t('navbar.por_que_nos'), href: '#por-que-nos' },
    { label: t('navbar.depoimentos'), href: '#depoimentos' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-scrolled py-3' : 'py-4'
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between gap-4">

        {/* Logo */}
        <a href="#inicio" className="logo-link flex items-center gap-3 shrink-0">
          <img
            src="/logo-russo-imigration.png"
            alt="Russo Immigration"
            className="h-16 w-auto object-contain"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-5">
          {navLinks.map((link) => (
            <a 
            key = { link.href }
              href = { link.href }
              className = "nav-link whitespace-nowrap text-[13px]"
            >
            { link.label }
            </a>
          ))}
      </nav>

       {/* Right side: phone + CTA + flags */}
       <div className="hidden xl:flex items-center gap-3 shrink-0">
         {/* Phone number */}
         <a
           href="tel:+16893510277"
           className="flex items-center gap-1.5 text-[13px] font-medium text-white/80 hover:text-[#c9a84c] transition-colors whitespace-nowrap"
           aria-label="Ligue para nós"
         >
           <Phone size={14} className="shrink-0" />
           +1 (689) 351-0277
         </a>
         <a
           href={`https://wa.me/16893510277?text=${WA_MESSAGE}`}
           target="_blank"
           rel="noopener noreferrer"
           className="btn-gold px-5 py-2 rounded-full text-sm whitespace-nowrap"
         >
           {t('navbar.speak_with_us')}
         </a>
         {/* Flag switcher */}
         <div className="flag-switcher">
           {flags.map((f) => (
             <button
               key={f.lang}
               onClick={() => setLanguage(f.lang)}
               className={`flag-item transition-opacity ${language === f.lang ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
               aria-label={`Mudar para ${f.label}`}
             >
               <span className="flag-emoji">{f.emoji}</span>
               <span className="flag-tooltip">{f.label}</span>
             </button>
           ))}
         </div>
       </div>

      {/* Mobile toggle */}
      <button
        className="xl:hidden nav-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div >

    {/* Mobile menu */ }
  {
    menuOpen && (
      <div className="xl:hidden mt-3 mx-4 rounded-2xl glass-card p-6">
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link-mobile"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          {/* Flags mobile */}
          <div className="flag-switcher-mobile">
            {flags.map((f) => (
              <button
                key={f.lang}
                onClick={() => setLanguage(f.lang)}
                className={`flag-item-mobile transition-opacity ${language === f.lang ? 'opacity-100' : 'opacity-60'}`}
                aria-label={`Mudar para ${f.label}`}
              >
                <span className="flag-emoji-mobile">{f.emoji}</span>
                <span className="flag-label-mobile">{f.label}</span>
              </button>
            ))}
          </div>
          {/* Phone mobile */}
          <a
            href="tel:+16893510277"
            className="flex items-center justify-center gap-2 text-sm font-medium text-white/80 hover:text-[#c9a84c] transition-colors py-2"
            aria-label="Ligue para nós"
          >
            <Phone size={15} className="shrink-0" />
            +1 (689) 351-0277
          </a>
          <a
            href={`https://wa.me/16893510277?text=${WA_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-5 py-3 rounded-full text-sm text-center mt-2"
          >
            {t('navbar.speak_with_us_whatsapp')}
          </a>
        </nav>
      </div >
    )
  }
    </header >
  )
}