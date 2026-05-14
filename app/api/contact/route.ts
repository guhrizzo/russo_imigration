import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'Formulário de Contato <clube.gustavorizzo.net.br>',
      to: 'admin@russoimmigration.com',
      replyTo: email,
      subject: `Nova mensagem de ${name}`,
      html: `
        <h2>Nova mensagem pelo site</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone || '—'}</p>
        <hr/>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Falha ao enviar email.' }, { status: 500 })
  }
}