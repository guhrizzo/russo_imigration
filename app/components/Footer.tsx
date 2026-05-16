'use client'

import { useLanguage } from '@/app/i18n/LanguageContext'

export default function Footer() {
  const year = new Date().getFullYear()
  const { t, tRaw } = useLanguage()

  const navItems = tRaw('footer.nav_items') as Array<{ label: string; href: string }>

  // Dividir os itens em 3 colunas
  const itemsPerColumn = Math.ceil(navItems.length / 3)
  const column1 = navItems.slice(0, itemsPerColumn)
  const column2 = navItems.slice(itemsPerColumn, itemsPerColumn * 2)
  const column3 = navItems.slice(itemsPerColumn * 2)

  return (
    <footer className="relative bg-divus-blue text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Main content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          
          {/* Left - Brand & Contact */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img
                src="/logo-russo-imigration.png"
                alt="Russo Immigration"
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* Office info */}
            <div className="space-y-3">
              <div>
                <h4 className="text-divus-yellow font-semibold text-sm mb-1">{t('footer.office')}</h4>
                <p className="text-divus-darklime text-xs leading-relaxed">
                  {t('footer.address')}
                </p>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-divus-yellow font-semibold text-sm mb-2">{t('footer.contact')}:</h4>
                <ul className="space-y-1 text-xs">
                  <li>
                    <a href={`tel:${t('footer.phone')}`} className="text-divus-darklime hover:text-divus-yellow transition-colors">
                      {t('footer.phone')}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${t('footer.email')}`} className="text-divus-darklime hover:text-divus-yellow transition-colors">
                      {t('footer.email')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right - Navigation in 3 columns */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-3 gap-8">
              
              {/* Column 1 */}
              <div>
                <h4 className="text-divus-yellow font-semibold text-sm mb-4">{t('footer.navigation')}</h4>
                <ul className="space-y-2">
                  {column1.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-divus-darklime hover:text-divus-yellow text-sm transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2 */}
              <div>
                <h4 className="text-divus-yellow font-semibold text-sm mb-4">{t('footer.services')}</h4>
                <ul className="space-y-2">
                  {column2.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-divus-darklime hover:text-divus-yellow text-sm transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3 */}
              <div>
                <h4 className="text-divus-yellow font-semibold text-sm mb-4">{t('footer.legal_info')}</h4>
                <ul className="space-y-2">
                  {column3.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-divus-darklime hover:text-divus-yellow text-sm transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-divus-yellow/20">
          <p className="text-divus-darklime text-xs">
            {t('footer.copyright').replace('{year}', year.toString())}
          </p>
          <a href="#inicio" className="text-divus-darklime hover:text-divus-yellow text-xs transition-colors font-medium">
            ↑ {t('footer.back_to_top')}
          </a>
        </div>
      </div>
    </footer>
  )
}