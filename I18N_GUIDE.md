# Guia de Internacionalização (i18n)

Seu site agora está configurado com suporte a 3 idiomas: **Português (pt-br)**, **Inglês (en)** e **Espanhol (es)**.

## Estrutura de Arquivos

```
app/
├── i18n/
│   ├── LanguageContext.tsx      # Contexto e hook de gerenciamento de idioma
│   └── translations/
│       ├── pt-br.json           # Traduções em Português
│       ├── en.json              # Traduções em Inglês
│       └── es.json              # Traduções em Espanhol
```

## Como Usar

### 1. Usando o Hook `useLanguage`

Em qualquer componente client (`use client`), você pode usar o hook `useLanguage()`:

```tsx
'use client'

import { useLanguage } from '@/app/i18n/LanguageContext'

export default function MyComponent() {
  const { t, language, setLanguage } = useLanguage()

  return (
    <div>
      <h1>{t('navbar.title')}</h1>
      <p>Idioma atual: {language}</p>
      <button onClick={() => setLanguage('pt-br')}>Português</button>
      <button onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('es')}>Español</button>
    </div>
  )
}
```

### 2. Função `t()` - Tradução

A função `t()` obtém as strings de tradução baseado na chave fornecida:

```tsx
// Usar com ponto para acessar propriedades aninhadas
t('navbar.inicio')           // "Início" (pt-br), "Home" (en), "Inicio" (es)
t('hero.description')         // Retorna a descrição do hero
t('services.cta_button')      // Retorna o texto do botão
```

### 3. Propriedades Disponíveis do Hook

- **`language`** - Idioma atual ('pt-br' | 'en' | 'es')
- **`setLanguage(lang)`** - Função para mudar o idioma
- **`t(key, defaultValue?)`** - Função para obter traduções

## Adicionando Novas Traduções

### 1. Abra o arquivo de tradução (ex: `pt-br.json`)

2. Adicione a nova chave com seu valor:

```json
{
  "navbar": {
    "novo_item": "Meu Novo Item"
  }
}
```

3. Repita em **todos os 3 arquivos** (pt-br.json, en.json, es.json):

```json
{
  "navbar": {
    "novo_item": "My New Item"
  }
}
```

```json
{
  "navbar": {
    "novo_item": "Mi Nuevo Elemento"
  }
}
```

4. Use no seu componente:

```tsx
const { t } = useLanguage()
return <div>{t('navbar.novo_item')}</div>
```

## Detecção Automática de Idioma

O sistema detecta automaticamente o idioma do navegador na primeira visita:
- Se o navegador está em Português → pt-br
- Se o navegador está em Inglês → en
- Se o navegador está em Espanhol → es
- Caso contrário → Português (padrão)

A preferência do usuário é salva em `localStorage`, então não muda quando ele volta.

## Perseverando Idioma

O idioma é salvo automaticamente em `localStorage` com a chave `language`, então a preferência persiste entre visitas.

## Estrutura de Traduções Atual

### Seções disponíveis:
- **navbar** - Navegação
- **hero** - Seção hero
- **about** - Seção sobre
- **services** - Serviços
- **why_us** - Por que nós
- **testimonials** - Depoimentos
- **contact** - Contato
- **faq** - Perguntas frequentes
- **footer** - Rodapé

## Exemplo Prático

Para adicionar um novo texto na seção de contato:

**pt-br.json:**
```json
{
  "contact": {
    "success_message": "Seu formulário foi enviado com sucesso!"
  }
}
```

**en.json:**
```json
{
  "contact": {
    "success_message": "Your form has been submitted successfully!"
  }
}
```

**es.json:**
```json
{
  "contact": {
    "success_message": "¡Tu formulario ha sido enviado con éxito!"
  }
}
```

No componente:
```tsx
const { t } = useLanguage()
return <p>{t('contact.success_message')}</p>
```

## Atualizando o Seletor de Idioma

O seletor de idioma já está implementado na **Navbar** (`app/components/Navbar.tsx`) com bandeiras dos 3 países. Clique nas bandeiras para mudar o idioma!

## Boas Práticas

1. ✅ Sempre manter as mesmas chaves em todos os 3 idiomas
2. ✅ Usar nomes de chave descritivos (ex: `navbar.speak_with_us` em vez de `navbar.btn1`)
3. ✅ Agrupar traduções por seção usando objetos aninhados
4. ✅ Manter a estrutura consistente entre os arquivos
5. ❌ Não traduzir direto no JSX (sempre use o hook `t()`)

## Troubleshooting

### "useLanguage deve ser usado dentro de um LanguageProvider"

Certifique-se de que:
1. O componente tem `'use client'` no topo
2. O componente está sendo renderizado dentro de um `<LanguageProvider>`
3. O `<LanguageProvider>` está envolvendo tudo no layout.tsx

### Idioma não persiste entre página e página

Limpe o localStorage com `localStorage.removeItem('language')` ou limpe o cache do navegador.

### Texto em branco ao carregar

É normal na primeira visita enquanto o idioma está sendo detectado. O sistema mostra os componentes rapidamente assim que o idioma é definido.
