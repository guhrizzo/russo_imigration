'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useLanguage } from '@/app/i18n/LanguageContext'

const WA_MESSAGE = encodeURIComponent('Olá! Gostaria de mais informações sobre os serviços de imigração.')

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

  const contactItems = [
    { icon: <Phone size={16} />, label: t('contact.phone_label'), value: t('contact.phone_value') },
    { icon: <Mail size={16} />, label: t('contact.email_label'), value: t('contact.email_value') },
    { icon: <MapPin size={16} />, label: t('contact.location_label'), value: t('contact.location_value') },
  ]

  return (
    <section id="contato" ref={sectionRef} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-navy-900" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="animate-on-scroll text-center mb-20">
          <p className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium mb-4">{t('contact.section_label')}</p>
          <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-6 heading-underline">
            {t('contact.title')}
          </h2>
          <p className="max-w-xl mx-auto text-white/60 leading-relaxed font-light">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: contact info */}
          <div className="animate-on-scroll lg:col-span-2 space-y-6">
            {/* WhatsApp CTA card */}
            <div
              className="relative rounded-2xl p-8 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0E1E35 0%, #152844 100%)', border: '1px solid rgba(212,168,75,0.3)' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-30">
                <svg viewBox="0 0 130 130" fill="none">
                  <path d="M0 0 Q65 0 130 65" stroke="#D4A84B" strokeWidth="1" fill="none" />
                  <path d="M0 0 Q45 0 90 45" stroke="#D4A84B" strokeWidth="0.5" fill="none" />
                </svg>
              </div>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: '#25D366' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>

              <h3 className="font-display text-xl text-white font-semibold mb-2">{t('contact.whatsapp_title')}</h3>
              <p className="text-white/55 text-sm mb-5">{t('contact.whatsapp_description')}</p>

              <a
                href={`https://wa.me/16893510277?text=${WA_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold w-full justify-center"
              >
                {t('contact.whatsapp_button')}
              </a>
            </div>

            {/* Contact details */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="icon-circle shrink-0 text-gold-400" style={{ width: 36, height: 36 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wide">{item.label}</div>
                    <div className="text-white text-sm font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="animate-on-scroll lg:col-span-3">
            <div className="glass-card rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'linear-gradient(135deg, #D4A84B, #F0D080)' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#050D1F">
                      <polyline points="20 6 9 17 4 12" strokeWidth="2.5" stroke="#050D1F" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl text-white font-semibold mb-2">{t('contact.form_success_title')}</h3>
                  <p className="text-white/60">{t('contact.form_success_description')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">{t('contact.form_name_label')}</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-colors"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        onFocus={(e) => e.target.style.borderColor = 'rgba(212,168,75,0.5)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        placeholder={t('contact.form_name_placeholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">{t('contact.form_phone_label')}</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-colors"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        onFocus={(e) => e.target.style.borderColor = 'rgba(212,168,75,0.5)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        placeholder={t('contact.form_phone_placeholder')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">{t('contact.form_email_label')}</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(212,168,75,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      placeholder={t('contact.form_email_placeholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">{t('contact.form_message_label')}</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none resize-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(212,168,75,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      placeholder={t('contact.form_message_placeholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed transition-opacity cursor-pointer"
                  >
                    <Send size={16} />
                    {loading ? 'Enviando...' : t('contact.form_submit')}
                  </button>

                  {error && (
                    <p className="text-red-400 text-xs text-center">{error}</p>
                  )}

                  <p className="text-white/30 text-xs text-center">
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