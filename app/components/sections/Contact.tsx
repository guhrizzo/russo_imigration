// components/Contact.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { useLanguage } from '@/app/i18n/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError('Ocorreu um erro. Tente novamente ou fale pelo WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contato" ref={sectionRef} className="relative py-20 overflow-hidden bg-white">
      <div className="bg-[#25466e] rounded-3xl mx-6 lg:mx-auto max-w-7xl overflow-hidden">
        <div className="p-12 lg:p-16 flex flex-col items-center">

          <div className="animate-on-scroll w-full max-w-2xl">
            <div className="space-y-8">
              {/* Header — centralizado */}
              <div className="text-center">
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {t('contact.title')}
                </h2>
                <p className="text-white/70 text-base leading-relaxed">
                  {t('contact.description')}
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center mx-auto mb-4">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                      <polyline points="20 6 9 17 4 12" strokeWidth="2.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-2xl text-white font-semibold mb-2">
                    {t('contact.form_success_title')}
                  </h3>
                  <p className="text-white/70">{t('contact.form_success_description')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#D4A84B] text-sm font-semibold mb-2">
                        {t('contact.form_name_label')}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg text-slate-900 text-sm border-0 outline-none bg-white placeholder-slate-500"
                        placeholder={t('contact.form_name_placeholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-[#D4A84B] text-sm font-semibold mb-2">
                        {t('contact.form_phone_label')}
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg text-slate-900 text-sm border-0 outline-none bg-white placeholder-slate-500"
                        placeholder={t('contact.form_phone_placeholder')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#D4A84B] text-sm font-semibold mb-2">
                      {t('contact.form_email_label')}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg text-slate-900 text-sm border-0 outline-none bg-white placeholder-slate-500"
                      placeholder={t('contact.form_email_placeholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-[#D4A84B] text-sm font-semibold mb-2">
                      {t('contact.form_message_label')}
                    </label>
                    <textarea
                      required
                      rows={8}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg text-slate-900 text-sm border-0 outline-none bg-white resize-none placeholder-slate-500"
                      placeholder={t('contact.form_message_placeholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-linear-to-r from-[#D4A84B] to-[#F0D080] hover:from-[#c9992e] hover:to-[#e8c966] text-[#050D1F] font-bold py-3 rounded-lg text-base transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send size={18} />
                    {loading ? 'Enviando...' : t('contact.form_submit')}
                  </button>

                  {error && (
                    <p className="text-red-300 text-xs text-center">{error}</p>
                  )}

                  <p className="text-white/40 text-xs text-center">
                    {t('contact.form_confidentiality')}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}