'use client'

import { FiInstagram } from 'react-icons/fi'
import { useLanguage } from '@/app/i18n/LanguageContext'

export default function Footer() {
  const year = new Date().getFullYear()
  const { t, tRaw } = useLanguage()

  const navItems = tRaw('footer.nav_items') as Array<{ label: string; href: string }>

  return (
    <footer className="relative bg-[#25466e]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Main content */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 mb-12">
          
          {/* Left - Logo and Social */}
          <div className="flex flex-col items-start gap-4 shrink-0">
            <img
              src="/logo-russo-imigration.png"
              alt="Russo Immigration"
              className="h-24 w-auto object-contain"
            />
            {/* Social - Instagram */}
            <a
              href="https://www.instagram.com/russoimmigration?igsh=MWFpZHcwbmI2eTVtcQ%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors duration-200 pl-9"
              aria-label="Russo Immigration Instagram"
            >
              <FiInstagram size={24} />
            </a>
          </div>

          {/* Right - Navigation */}
          <nav className="flex-1">
            <ul className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
              {navItems.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200 whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-white/40 text-xs">
            <p>
              {t('footer.copyright').replace('{year}', year.toString())}
            </p>
            <span className="hidden sm:inline text-white/20">•</span>
            <p>
              {t('footer.developed_by')} {' '}
              <a
                href="https://www.instagram.com/xfassessoria/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200 underline"
              >
                X FAMILY
              </a>
            </p>
          </div>
          <a 
            href="#inicio" 
            className="text-white/60 hover:text-white text-xs transition-colors duration-200 underline"
          >
            {t('footer.back_to_top')}
          </a>
        </div>
      </div>
    </footer>
  )
}