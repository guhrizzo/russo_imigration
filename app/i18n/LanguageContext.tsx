'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import pt_br from './translations/pt-br.json'
import en from './translations/en.json'
import es from './translations/es.json'

export type Language = 'pt-br' | 'en' | 'es'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, defaultValue?: string) => string
  tRaw: (key: string) => any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, any> = {
  'pt-br': pt_br,
  'en': en,
  'es': es,
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt-br')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('language') as Language | null
    if (stored && Object.keys(translations).includes(stored)) {
      setLanguageState(stored)
    } else {
      const browserLang = navigator.language.split('-')[0]
      const detectedLang: Language =
        browserLang === 'pt' ? 'pt-br' :
        browserLang === 'en' ? 'en' :
        browserLang === 'es' ? 'es' :
        'pt-br'
      setLanguageState(detectedLang)
    }
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string, defaultValue: string = key): string => {
    const keys = key.split('.')
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return defaultValue
      }
    }

    return typeof value === 'string' ? value : defaultValue
  }

  const tRaw = (key: string): any => {
    const keys = key.split('.')
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return null
      }
    }

    return value
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tRaw }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage deve ser usado dentro de um LanguageProvider')
  }
  return context
}