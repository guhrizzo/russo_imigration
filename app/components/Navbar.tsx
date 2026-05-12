'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Por Que Nós', href: '#por-que-nos' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
]

const flags = [
  { emoji: '🇧🇷', label: 'Português' },
  { emoji: '🇺🇸', label: 'English' },
  { emoji: '🇪🇸', label: 'Español' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-scrolled py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#inicio" className="logo-link flex items-center gap-3">
          <div className="logo-circle w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
            RS
          </div>
          <div className="hidden sm:block">
            <div className="font-display text-white font-semibold text-lg leading-none tracking-widest">RUSSO</div>
            <div className="text-[10px] tracking-[0.3em] font-light" style={{ color: 'var(--gold-400)' }}>IMMIGRATION</div>
          </div>
        </a>

        {/* Desktop nav + flags */}
        <div className="hidden lg:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Flag switcher */}
          <div className="flag-switcher">
            {flags.map((f) => (
              <div key={f.label} className="flag-item">
                <span className="flag-emoji">{f.emoji}</span>
                <span className="flag-tooltip">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+16893510277" className="nav-phone flex items-center gap-2 text-sm">
            <Phone size={14} />
            <span>+1 (689) 351-0277</span>
          </a>
          <a
            href="https://wa.me/16893510277"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-5 py-2 rounded-full text-sm"
          >
            Fale Conosco
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden mt-3 mx-4 rounded-2xl glass-card p-6">
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
                <div key={f.label} className="flag-item-mobile">
                  <span className="flag-emoji-mobile">{f.emoji}</span>
                  <span className="flag-label-mobile">{f.label}</span>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/16893510277"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-5 py-3 rounded-full text-sm text-center mt-2"
            >
              Fale Conosco pelo WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}