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
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-gold-400/50 flex items-center justify-center text-gold-400 font-display font-bold text-lg group-hover:border-gold-400 transition-colors">
            RS
          </div>
          <div className="hidden sm:block">
            <div className="font-display text-white font-semibold text-lg leading-none tracking-widest">RUSSO</div>
            <div className="text-gold-400 text-[10px] tracking-[0.3em] font-light">IMMIGRATION</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 hover:text-gold-400 transition-colors tracking-wide font-light"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
           <a
             href="tel:+16893510277"
             className="flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors"
           >
             <Phone size={14} />
             <span className="tracking-wide">+1 (689) 351-0277</span>
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

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-white/80 hover:text-gold-400 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden mt-3 mx-4 rounded-2xl glass-card p-6 animate-fade-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-gold-400 transition-colors py-2 border-b border-white/5 text-sm tracking-wide"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
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
