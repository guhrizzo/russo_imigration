// app/not-found.tsx
'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full opacity-40 blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full opacity-30 blur-3xl -ml-48 -mb-48" />
      </div>

      {/* Header com navegação */}
      <header className="relative z-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            <Home size={18} />
            <span>Home</span>
          </Link>
          <div className="text-xs text-gray-400 font-medium">404</div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full text-center">
          {/* Animated 404 */}
          <div className={`mb-8 transition-all duration-700 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative inline-block">
              <h1 className="text-9xl lg:text-10xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-blue-400">
                404
              </h1>
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-blue-400 opacity-10 blur-3xl -z-10" />
            </div>
          </div>
          {/* Text content */}
          <div className={`mb-12 space-y-4 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Página não encontrada
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-md mx-auto">
              Desculpe, a página que você está procurando não existe ou foi movida. Vamos ajudá-lo a voltar ao caminho certo.
            </p>
          </div>
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white transition-all hover:brightness-110 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
            >
              <Home size={18} />
              Voltar ao início
            </Link>
            <Link
              href="/#servicos"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-blue-600 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
            >
              <span>Explorar serviços</span>
              <ArrowLeft size={18} className="rotate-180" />
            </Link>
          </div>

          {/* Help section */}
          <div className={`bg-gray-50 rounded-2xl p-8 border border-gray-200 transition-all duration-700 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Precisa de ajuda?</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">→</span>
                  Navegação
                </h4>
                <p className="text-sm text-gray-600">
                  Use o menu principal para acessar nossos serviços de imigração e consultoria.
                </p>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">→</span>
                  Contato
                </h4>
                <p className="text-sm text-gray-600">
                  Fale com nosso time via WhatsApp para esclarecer suas dúvidas.
                </p>
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div className={`mt-16 flex flex-wrap gap-6 justify-center text-sm transition-all duration-700 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <Link href="/#servicos" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Serviços
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/#notary" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Notary Public
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/#contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </main>

      {/* Decorative floating elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-20 animate-pulse" />
      <div className="absolute top-1/4 right-20 w-32 h-32 border-2 border-blue-100 rounded-3xl opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }} />
    </div>
  )
}