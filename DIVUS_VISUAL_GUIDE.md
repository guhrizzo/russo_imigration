# Divus Design Implementation - Guia Visual

## 🎨 Paleta de Cores

### Cores Principais
```
🟫 Divus Dark        #070707  - Fundo escuro principal
🟩 Divus Blue        #1E3523  - Cor primária (azul escuro)
🟩 Divus Blue Light  #264B38  - Variação clara do azul
🟨 Divus Yellow      #EAFE45  - Cor de destaque (amarelo vibrante)
🟩 Divus Lime        #C4E545  - Variação do lime
⬜ Divus White       #FFFFFF  - Branco puro
🟩 Divus DarkLime    #A8D546  - Verde escuro para textos
🟨 Divus Gold        #F4B843  - Dourado complementar
```

---

## 📝 Tipografia

### Font Stack
```
Títulos:    Plus Jakarta Sans (400, 500, 600, 700, 800)
Corpo:      Plus Jakarta Sans (400, 500, 600)
Alternativa: Instrument Sans (400, 500, 600, 700)
Citações:   Newsreader (400, italic)
```

### Hierarquia
```
h1  -> font-jakarta text-6xl font-bold
h2  -> font-jakarta text-5xl font-semibold
h3  -> font-jakarta text-3xl font-semibold
h4  -> font-jakarta text-lg font-semibold
p   -> font-jakarta text-base leading-relaxed
```

---

## 🧩 Componentes Principais

### 1. Navbar
```
┌─────────────────────────────────────────────────────────┐
│ Logo    Navigation Links      Phone      CTA      Flags │
│                           +1(689) 351-0277  Fale Conosco │
└─────────────────────────────────────────────────────────┘

Cores:
- Background: rgba(7, 7, 7, 0.95) quando scrollado
- Texto: #FFFFFF com hover #EAFE45
- Botão CTA: #EAFE45 com texto #070707
- Border: rgba(234, 254, 69, 0.1)
```

### 2. Hero Section
```
┌────────────────────────────────────────────┐
│  [Video Background com Overlay Divus]      │
│                                            │
│      ✨ BEM-VINDOS À DIVUS                 │
│      Consultoria Estratégica para          │
│      sua Imigração Legal nos EUA           │
│                                            │
│      [Quero fazer uma consulta] [Saiba +]  │
│                                            │
│      [500+ Cases] [100% Confidencial] ...  │
│                                            │
│                    ⬇️                      │
└────────────────────────────────────────────┘

Cores:
- Overlay: linear-gradient(to bottom, rgba(7,7,7,0.8), rgba(30,53,35,0.6))
- Título: #FFFFFF
- Highlight: #EAFE45
- Botão Primário: #EAFE45 com hover #C4E545
- Stats: bg-divus-blue/40 com border #EAFE45/10
```

### 3. About Section
```
┌────────────────────────────────────────────┐
│  SOMOS A DIVUS LEGAL GROUP                 │
│                                            │
│  [Image Left]         [Text Right]         │
│                                            │
│  ┌─────────┐  ┌──────────┐  ┌─────────┐   │
│  │ Missão  │  │ Visão    │  │ Valores │   │
│  └─────────┘  └──────────┘  └─────────┘   │
└────────────────────────────────────────────┘

Cores:
- Background: #FFFFFF
- Texto principal: #1E3523
- Highlight: #EAFE45
- Cards: bg-gradient-to-br from-divus-blue to-divus-blue-light
- Border: rgba(234, 254, 69, 0.2)
- Hover Shadow: rgba(234, 254, 69, 0.2)
```

### 4. Mission Cards
```
┌──────────────────────────┐
│  🎯 Título              │
│                          │
│  Descrição do item...   │
│                          │
│  ✓ Ponto 1              │
│  ✓ Ponto 2              │
│  ✓ Ponto 3              │
└──────────────────────────┘

Cores:
- Background: linear-gradient(135deg, #1E3523, #264B38)
- Título: #EAFE45
- Texto: #A8D546
- Border: rgba(234, 254, 69, 0.1)
- Hover: border-color rgba(234, 254, 69, 0.3)
- Icons: #EAFE45
```

### 5. Buttons

**Primary Button**
```
┌──────────────────────┐
│  Quero fazer uma     │
│  consulta gratuita   │
└──────────────────────┘

Cores:
- Background: #EAFE45
- Texto: #070707
- Font: font-semibold
- Hover: bg-divus-lime com shadow-lg shadow-divus-yellow/30
- Border-radius: rounded-lg
```

**Secondary Button**
```
┌──────────────────────┐
│  Saiba mais histórias│
└──────────────────────┘

Cores:
- Border: 2px solid #EAFE45
- Texto: #EAFE45
- Hover: bg-divus-yellow/10
- Transition: smooth 300ms
```

---

## 🎭 Efeitos e Animações

### Gradient Borders
```css
.gradient-border {
  position: relative;
  background: linear-gradient(135deg, #1E3523, #264B38);
  border-radius: 16px;
}

.gradient-border::before {
  background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent 60%);
}
```

### Hover Effects
```css
.hover\:text-divus-yellow:hover {
  color: #EAFE45;
  transition: all 300ms ease;
}

.hover\:shadow-lg {
  box-shadow: 0 10px 30px rgba(234, 254, 69, 0.2);
}
```

### Smooth Transitions
```css
transition: all 300ms ease;
transition: color 300ms ease;
transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 📱 Responsividade

### Breakpoints
```
Mobile:      < 640px  (sm)
Tablet:      640px    (md)
Desktop:     1024px   (lg)
Wide:        1280px   (xl)
```

### Adaptações
- Navbar: Menu colapsável em mobile
- Hero: Texto responsivo com clamp()
- About: Grid 1 coluna em mobile, 2 em desktop
- Cards: Stack verticalmente em mobile

---

## ✅ Checklist de Implementação

- [x] Cores Divus configuradas
- [x] Fontes Google importadas
- [x] Navbar atualizada
- [x] Hero section redesenhada
- [x] About section modernizada
- [x] Botões com novo design
- [x] Build compilado com sucesso
- [ ] Services section atualizada
- [ ] WhyUs section modernizada
- [ ] Testimonials com novo design
- [ ] FAQ atualizado
- [ ] Contact form atualizado
- [ ] Footer modernizado

---

## 🚀 Próximas Melhorias

1. **Animações**
   - Scroll animations com Framer Motion
   - Parallax effects
   - SVG animations

2. **Componentes**
   - Modal customizado Divus
   - Toast notifications
   - Dropdowns com tema

3. **Performance**
   - Image optimization
   - Font subsetting
   - CSS minification

4. **Acessibilidade**
   - ARIA labels
   - Keyboard navigation
   - Focus states

---

## 📚 Referências de Código

### Usando cores
```tsx
<div className="bg-divus-blue text-divus-yellow">
  Content
</div>
```

### Usando fontes
```tsx
<h1 className="font-jakarta text-4xl font-bold">
  Título
</h1>

<h2 className="font-instrument text-2xl">
  Subtítulo
</h2>
```

### Criando cards
```tsx
<div className="bg-gradient-to-br from-divus-blue to-divus-blue-light rounded-lg p-8 border border-divus-yellow/20 hover:shadow-lg hover:shadow-divus-yellow/20 transition-all">
  <h3 className="text-divus-yellow font-jakarta">Título</h3>
  <p className="text-divus-darklime">Descrição</p>
</div>
```

### Criando botões
```tsx
<button className="px-8 py-4 rounded-lg bg-divus-yellow text-divus-dark font-semibold hover:bg-divus-lime transition-all duration-300 hover:shadow-lg hover:shadow-divus-yellow/30">
  Clique aqui
</button>
```

---

## 🎯 Resumo Visual

| Elemento | Cor | Exemplo |
|----------|-----|---------|
| Background | #070707 | Página |
| Primário | #1E3523 | Cards, Hero |
| Destaque | #EAFE45 | Botões, Títulos |
| Texto | #FFFFFF | Corpo de texto |
| Secundário | #A8D546 | Textos descritivos |

---

*Documento gerado para guiar a implementação do design Divus Legal Group*
