# Flow Design System — design.md

> Este arquivo é o contexto de design para ferramentas de IA (Claude Code, Stitch, Figma Make, etc.) ao gerar protótipos do Flow. Leia este arquivo antes de qualquer geração. Siga as regras exatamente como estão — não invente padrões, não substitua tokens por valores genéricos.

**DS Package:** `@ci-t-hyperx/flow-ds` v2 · **Figma:** `pnigiPYeQnFwQieRYcLmof` · **Stack:** React + Tailwind CSS 3 + Radix UI + CVA + `react-icons/tb`

**Documentos complementares:** [`ds-guidelines.md`](../system/ds-guidelines.md) (quando/por quê usar cada padrão — interação, posicionamento, ícones, escrita, CTAs) · [`ds-mapping.md`](../system/ds-mapping.md) (Figma nodes, status de gap, cobertura por produto)

---

## 1. Identidade Visual

Design **minimalista e funcional**: hierarquia por peso tipográfico e cor de fundo — não por bordas, sombras ou decoração. Clareza, consistência, confiança, eficiência.

---

## 2. Cores

### Paleta principal

| Token Tailwind | CSS Var | Hex | Uso |
|----------------|---------|-----|-----|
| `flow-indigo-800` | `--flow-indigo-800` | `#000050` | **Cor primária** — botões, textos de destaque, nav ativa |
| `flow-indigo-900` | `--flow-indigo-900` | `#00053c` | Hover do botão primário |
| `flow-indigo-700` | `--flow-indigo-700` | `#232766` | Textos secundários de ênfase |
| `flow-indigo-600` | `--flow-indigo-600` | `#3f4383` | Ícones de suporte, textos terciários |
| `flow-indigo-500` | `--flow-indigo-500` | `#5f649a` | Texto desabilitado |
| `flow-indigo-400` | `--flow-indigo-400` | `#9397bf` | Placeholder, texto inativo |
| `flow-indigo-200` | `--flow-indigo-200` | `#d8dee9` | Bordas de componentes |
| `flow-indigo-100` | `--flow-indigo-100` | `#eef1f7` | Hover bg, active state bg |
| `flow-indigo-50`  | `--flow-indigo-50`  | `#fcfdfe` | Background sutil |

| Token Tailwind | CSS Var | Hex | Uso |
|----------------|---------|-----|-----|
| `flow-rose-500` | `--flow-rose-500` | `#e6393a` | Botão brand (CI&T) |
| `flow-rose-400` | `--flow-rose-400` | `#fa5a50` | **Accent coral** — badges de destaque, tags |
| `flow-rose-200` | `--flow-rose-200` | `#ff9d8e` | Hover accent |
| `flow-rose-100` | `--flow-rose-100` | `#ffc8bc` | Background accent sutil |

### Cores semânticas (sempre usar em par: cor + bg)

| Semântica | Cor | Hex | Background | Hex bg | Contraste |
|-----------|-----|-----|------------|--------|-----------|
| success | `green-800` | `#166534` | `success-50` | `#f0fdf4` | ✅ 5.74:1 (era `#16a34a` = 3.15:1 ❌) |
| error | `red-700` | `#b91c1c` | `red-50` | `#fef2f2` | ✅ 6.1:1 (era `#dc2626` = 4.41:1 ❌) |
| warning | `amber-900` | `#92400e` | `warning-50` | `#fefce8` | ✅ 7.2:1 (era `#ca8a04` = 4.39:1 ❌) |
| info | `blue-700` | `#1d4ed8` | `info-50` | `#eff6ff` | ✅ 5.9:1 (era `#3b82f6` = 3.38:1 ❌) |
| brand | `brand-500` | `#ed1941` | `brand-50` | `#fffafb` | — |

### Category tag colors (portal — conteúdo)

Usar sempre inline style (não tokens Tailwind — são valores dinâmicos):

```
Development:   bg #fff7f5  text #cc2532   (4.9:1 ✅)
Design:        bg #fdf4ff  text #86198f   (5.5:1 ✅ — era #c026d3 = 3.9:1 ❌)
Quality:       bg #fff7ed  text #c2410c   (5.2:1 ✅ — era #ea580c = 3.8:1 ❌)
Refinement:    bg #fefce8  text #92400e   (7.2:1 ✅ — era #ca8a04 = 4.39:1 ❌)
Management:    bg #eff6ff  text #1d4ed8   (5.9:1 ✅ — era #2563eb = 4.7:1 ✅)
Data:          bg #ecfdf5  text #166534   (5.4:1 ✅ — era #059669 = 3.1:1 ❌)
People:        bg #fdf2f8  text #9d174d   (5.3:1 ✅ — era #db2777 = 3.7:1 ❌)
Training:      bg #eff6ff  text #0c4a6e   (7.1:1 ✅ — era #0891b2 = 3.6:1 ❌)
Community:     bg #f7fee7  text #3f6212   (5.8:1 ✅ — era #65a30d = 2.9:1 ❌)
General Use:   bg #f8fafc  text #475569   (4.8:1 ✅)
For You:       bg #fdf4ff  text #5b21b6   (7.2:1 ✅ — era #7c3aed = 4.5:1 ✅)
```

### Dark mode — paleta de superfícies

> **Fonte:** Figma DS `pnigiPYeQnFwQieRYcLmof`, página "Dark mode" (`3608:2294`). Tokens extraídos via inspeção de componentes — o scope `file_variables:read` não está disponível em personal access tokens do Figma (confirmado março 2026).

#### Tokens semânticos extraídos — coleção `3610`

| Token | ID Figma | Light | Dark | Contraste dark (em `#1f2937`) |
|-------|----------|-------|------|-------------------------------|
| `text/primary` | 3610:6123 | `#000050` | `#f3f4f6` | ✅ 16.2:1 |
| `text/secondary` | 3610:6124 | `#3f4383` | `#eef1f7` | ✅ correto |
| `text/muted` | 3610:6099 | `#6b7280` | ~~`#6b7280`~~ → **`#9ca3af`** | ✅ **6.39:1** — fix aplicado nos protótipos (DS Figma pendente) |
| `text/label-muted` | 3610:6135 | `#6b7280` | ~~`#6b7280`~~ → **`#9ca3af`** | ✅ **6.39:1** — fix aplicado nos protótipos (DS Figma pendente) |
| `text/inverse` | 3610:6127 | `#ffffff` | `#000050` | — |
| `surface/default` | 3610:6129 | `#ffffff` | `#111827` | — |
| `surface/base` | 3610:6131 | `#fcfdfe` | `#1f2937` | — |
| `surface/secondary` | 3610:6128 | `#eef1f7` | `#374151` | — |

> ✅ `text/muted` e `text/label-muted` — fix aplicado nos protótipos: dark = `#9ca3af` (Gray 400, 6.39:1 em `#1f2937`). Atualização pendente no Figma DS (`CI-T-HyperX/flow-core-design-system`).

O dark mode usa **5 níveis de superfície** baseados no Tailwind Gray scale, mais um near-black customizado para o fundo de página:

| Nível | Hex | Tailwind Gray | Papel |
|-------|-----|---------------|-------|
| Page bg | `#171923` | — (custom near-black) | Fundo principal da aplicação — mais escuro de todos |
| Surface secundária | `#111827` | Gray 900 | Nav tabs, dropdowns, tooltips, painéis aninhados |
| Surface / card / header | `#1f2937` | Gray 800 | Cards, headers, sidebar, modais, panels |
| Hover / active / border | `#374151` | Gray 700 | Estados hover e active, bordas de componentes |
| Surface elevada | `#4b5563` | Gray 600 | Só em dropdowns com múltiplos níveis |

**Texto em dark mode:**

| Papel | Hex | Tailwind Gray | Uso |
|-------|-----|---------------|-----|
| Text primário | `#e5e7eb` | Gray 200 | Títulos, headings, labels principais |
| Text corpo | `#e2e8f0` | — (Chakra Gray 200) | Corpo de texto, descrições |
| Text nav accent | `#7b8fd4` | — (indigo claro) | Ícones e textos de nav inativos, links secundários |
| Text muted | `#9ca3af` | Gray 400 | Labels secundários, placeholders, textos de apoio em banners |
| Text muito muted | `#6b7280` | Gray 500 | ⚠️ Uso restrito — só em superfícies `#374151`+ (hover/active). Nunca em cards `#1f2937` ou banners semânticos |

**Cores semânticas em dark mode** — os ícones/textos semânticos não mudam, só os backgrounds ficam mais escuros:

| Semântica | Background dark | Border dark | Notas |
|-----------|----------------|-------------|-------|
| warning | `#431407` | `#78350f` | amber-950 — texto: `#fff7ed` (title), `#a8a29e` (desc) |
| info | `#0d1e3d` | `#1e3a5f` | |
| success | `#0a2318` | `#14532d` | |
| error | `#2d0a0a` | `#3f1111` | |

**Implementação com ThemeProvider:**

```tsx
// src/lib/theme.tsx — padrão canônico
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem('theme') as Theme) ?? 'light'
  )
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])
  // ...
}
```

**tailwind.config.js — obrigatório:**
```js
module.exports = {
  darkMode: ['class'],  // ← toggle via className="dark" no <html>
  // ...
}
```

**Tokens computados (padrão para Sidebar e componentes sem dark: classes):**

```tsx
const isDark    = theme === 'dark'
const surfaceBg = isDark ? '#1f2937' : '#ffffff'    // card / header / sidebar
const surfaceBdr = isDark ? '#374151' : '#edf2f7'   // border
const hoverBg   = isDark ? '#374151' : '#eef0f7'    // hover / active state
const textMain  = isDark ? '#e5e7eb' : '#000050'    // text primary
const textMuted = isDark ? '#9ca3af' : '#9397bf'    // text muted — Gray 400 em dark (6b7280 falha WCAG AA em superfícies escuras)
```

### ✅ Do · ❌ Don't — Dark mode

✅ Usar `dark:bg-[#1f2937]` para cards e headers (Gray 800)
✅ Usar `dark:bg-[#374151]` para hover e active states (Gray 700)
✅ Usar `dark:border-[#374151]` para todas as bordas (Gray 700)
✅ Usar `dark:bg-[#171923]` para o fundo de página
✅ Para componentes com inline `style={{}}`, computar cor via `isDark` boolean — `style={{ background: isDark ? '#1f2937' : '#fff' }}`
❌ Usar `#1a1f36`, `#252d42`, `#2a3146` — não são tokens do DS (blue-tinted, fora do Gray scale)
❌ Mesclar `dark:` Tailwind com inline `style={{ borderColor: '#edf2f7' }}` hardcoded — o inline sempre sobrescreve
❌ Inventar grays intermediários — usar os 5 níveis acima
❌ Usar `#6b7280` como texto secundário em dark mode — contraste 3.04:1 em `#1f2937` (falha WCAG AA). Usar `#9ca3af` (Gray 400) em cards, modais, banners e superfícies escuras

### Checklist de validação — dark mode

Usar antes de considerar dark mode implementado. Testar alternando o toggle e inspecionando o computed style no DevTools após a troca.

| Elemento | O que verificar | Token esperado |
|----------|----------------|----------------|
| Fundo de página | Muda de branco para near-black | `#171923` |
| Sidebar | Muda de `#f6f7fb` para dark surface | `#1f2937` |
| Header / topbar | Muda de navy `#000050` para dark surface | `#1f2937` ou `#111827` |
| Cards e modais | Fundo escurece | `#1f2937` |
| Texto principal | Clareia | `#e5e7eb` ou `#e2e8f0` |
| Texto secundário / muted | Clareia, mas não demais | `#9ca3af` — nunca `#6b7280` em card |
| Links | Muda de navy para azul claro | `#7b8fd4` |
| Bordas | Ficam visíveis no escuro | `#374151` |
| Hover / active states | Responsivos ao tema | `#374151` |
| Cores semânticas (banner, badge, status) | Background semântico dark aplicado | ver tokens por variante acima |

**Como inspecionar no DevTools (Chrome):**
1. Toggle dark mode na interface
2. Selecionar elemento com suspeita de cor fixa
3. Aba `Computed` → buscar `background-color`, `color`, `border-color`
4. Se o valor for hex hardcoded (não `var(--*)`) e não mudar entre os modos → violação

**Sinal de alerta:** qualquer elemento que mantém a mesma cor computada antes e depois do toggle é candidato a verificação. A cor `#000050` (navy) aparecendo em dark mode quase sempre indica ausência de dark token.

### ✅ Do · ❌ Don't — Cores (light mode)

✅ Usar tokens Tailwind (`text-flow-indigo-800`, `bg-flow-indigo-100`)
✅ Sempre parear cor semântica com seu background (`bg-success-50 text-success-600`)
✅ Usar `flow-indigo-800` para textos principais e nav
❌ Hardcode de hex como classe Tailwind — usar tokens nomeados
❌ Usar cores genéricas do Tailwind (blue-500, red-600) fora do contexto semântico
❌ Cor sem ícone para indicar estado (erro, sucesso, aviso)

---

### Links — tokens obrigatórios

| Contexto | Token DS | Hex | Contraste verificado |
|----------|----------|-----|----------------------|
| Light mode | `text-flow-indigo-800` | `#000050` | 14.5:1 em `#ffffff` ✅ · 14.2:1 em `#f6f7fb` ✅ |
| Dark mode | — | `#7b8fd4` | 5.8:1 em `#171923` ✅ · 4.9:1 em `#1f2937` ✅ |

**Regras:**

✅ Light: sempre `#000050` (navy primary) — distinguível de texto body `#171923` por saturação  
✅ Dark: sempre `#7b8fd4` — claramente lido como "link azul" no contexto escuro  
✅ Links em prosa (textos longos): adicionar `underline` para reforçar affordance além da cor  
✅ Ao usar `var(--link-color)` em HTML puro: definir nos dois blocos de variáveis (`:root` e `[data-theme="dark"]`)  
❌ `#fa5a50` (coral) como cor de link — coral é acento decorativo/alerta, não cor de navegação  
❌ Blue genérico do Tailwind (`blue-500`, `#3b82f6`) — fora do navy ramp do DS  
❌ Definir link color só em um modo — qualquer cor de link sem equivalente dark mode falha em dark

**Verificação rápida:**
```css
/* ✅ correto — cobre os dois modos */
:root          { --link-color: #000050; }
[data-theme="dark"] { --link-color: #7b8fd4; }
a { color: var(--link-color); }

/* ❌ errado — hardcoded, falha no dark mode */
a { color: #000050; }
```

---

## 3. Tipografia

**Fonte:** Inter (variable) — `font-sans`
**Import:** `@fontsource-variable/inter`

### Escala customizada

| Classe Tailwind | Tamanho | Peso | Line-height | Ratio | Uso |
|----------------|---------|------|-------------|-------|-----|
| `text-detail` | 12px | 400 | 16px | 1.33 | ⚠️ Só metadados/captions — nunca texto interativo |
| `text-body-sm` | 14px | 400 | 21px | 1.5 | Texto padrão de UI, listas, formulários |
| `text-body-md` | 16px | 400 | 24px | 1.5 | Corpo de texto, descrições |
| `text-body-lg` | 18px | 400 | 27px | 1.5 | Intro text, lead paragraphs |
| `text-heading-xs` | 18px | 700 | 27px | 1.5 | Subtítulos de seção |
| `text-heading-sm` | 20px | 700 | 28px | 1.4 | Títulos de card, modal |
| `text-heading-md` | 24px | 800 | 32px | 1.33 | Títulos de página |
| `text-heading-lg` | 30px | 800 | 40px | 1.33 | Hero / destaque de página |

> **WCAG SC 1.4.12 (text spacing):** line-height mínimo 1.5× para body text. A coluna Ratio mostra o valor real — body sizes acima respeitam. `text-detail` (1.33) é permitido apenas para texto não-interativo onde não há alternativa menor.

### Contraste obrigatório (WCAG AA)

| Contexto | Combinação | Ratio mínimo |
|----------|-----------|-------------|
| Texto normal (≤18px regular / ≤14px bold) | cor + fundo | **4.5:1** |
| Texto grande (>18px regular / >14px bold) | cor + fundo | **3:1** |
| Componentes UI, bordas de foco | estado visual | **3:1** |

Combinações aprovadas do DS:
- `#000050` sobre `#ffffff` → **13.5:1** ✅
- `#000050` sobre `#eef1f7` → **12.8:1** ✅
- `#5f649a` sobre `#ffffff` → **5.1:1** ✅ (apenas body-md+)
- `#9397bf` sobre `#ffffff` → **2.9:1** ❌ — **só usar com `text-detail` em contexto decorativo**
- `#fa5a50` sobre `#ffffff` → **3.4:1** — usar apenas em texto grande (>18px) ou ícones

### ✅ Do · ❌ Don't — Tipografia

✅ Usar a escala customizada (`text-heading-md`, `text-body-sm`)
✅ Sentence case: "Salvar alterações" (não "SALVAR ALTERAÇÕES")
✅ Hierarquia: heading > body > detail
✅ `text-detail` apenas para metadados não-interativos (timestamps, bylines)
❌ `text-xs`, `text-sm`, `text-base` — usar escala customizada
❌ ALL CAPS em labels de botão ou títulos
❌ `font-semibold` como peso padrão — usar `font-bold` (700) ou `font-extrabold` (800)
❌ `text-muted` (`#9397bf`) em texto de leitura — contraste insuficiente para WCAG AA

---

## 4. Espaçamento & Layout

**Base:** 4px | Escala Tailwind padrão (4/8/12/16/20/24/32/40/48px)

### Shell canônico (obrigatório em todos os protótipos)

```tsx
<div className="flex h-screen overflow-hidden">
  <Sidebar />  {/* w-[76px] flex-shrink-0 */}
  <div className="flex-1 flex flex-col overflow-hidden">
    <Header className="flex-shrink-0 border-b border-flow-indigo-100" />
    <main className="flex-1 overflow-y-auto">
      {/* conteúdo scrollável aqui */}
    </main>
    <footer className="flex-shrink-0 border-t border-flow-indigo-100 p-4">
      {/* CTAs principais SEMPRE aqui — nunca dentro do scroll */}
    </footer>
  </div>
</div>
```

### Dimensões fixas

| Elemento | Valor |
|----------|-------|
| Sidebar width | `76px` |
| Sidebar nav buttons | `48×48px` |
| Logo area | `76×76px` |
| Content max-width | `max-w-[1014px]` |
| Card padding | `p-5` (20px) ou `p-6` (24px) |
| Sidebar border | `1px solid #edf2f7` |

### ✅ Do · ❌ Don't — Layout

✅ CTAs sempre no `<footer>` fixo do shell
✅ `flex-shrink-0` em header e footer
✅ `flex-1 overflow-y-auto` no container de conteúdo
❌ CTAs dentro do scroll container
❌ Padding arbitrário (`px-[17px]`) — usar escala Tailwind
❌ Overflow no body/root — somente no container correto

---

## 5. Elevação & Profundidade

Hierarquia visual por **background shift** — sem bordas como separadores primários.

### Light mode

| Elemento | Estilo |
|----------|--------|
| Page background | `bg-white` ou `bg-[#f7fafc]` |
| Card padrão | `bg-white border border-[#edf2f7] rounded-xl` |
| Card hover | `+ hover:shadow-md hover:border-flow-indigo-200 hover:-translate-y-0.5 transition-all` |
| Menu / Popover | `bg-white rounded-2xl` + shadow |
| Modal overlay | `bg-black/40 backdrop-blur-sm` |
| Sidebar | `bg-[#f6f7fb] border-r border-[#edf2f7]` |
| Surface sutil (sidebar, fundo de seção, background de texto long-form) | `bg-[#f6f7fb]` |

> **`#f6f7fb` — surface/soft:** Tom ligeiramente mais tintado que o branco puro. Uso correto: sidebar, backgrounds de painéis de conteúdo denso, separação sutil de áreas sem usar borda. Contraste com texto primário `#000050`: **14.5:1** ✅. Não usar como card (cards são `bg-white` sobre fundo `#f6f7fb`).

### Dark mode

| Elemento | Light | Dark |
|----------|-------|------|
| Page background | `bg-[#f7fafc]` | `dark:bg-[#171923]` |
| Surface secundária (nav tabs, dropdowns) | `bg-[#fcfdfe]` | `dark:bg-[#111827]` |
| Card | `bg-white` | `dark:bg-[#1f2937]` |
| Sidebar / surface sutil | `bg-[#f6f7fb]` | `dark:bg-[#1f2937]` |
| Hover / active state | `bg-[#eef0f7]` | `dark:bg-[#374151]` |
| Border | `border-[#edf2f7]` | `dark:border-[#374151]` |
| Modal overlay | `bg-black/40 backdrop-blur-sm` | igual — não muda |
| Modal content | `bg-white` | `dark:bg-[#1f2937]` |

**Sombra para menus e popovers (igual nos dois modos):**
```css
box-shadow: 0 8px 24px -4px rgba(0,0,80,0.12), 0 2px 8px -2px rgba(0,0,0,0.06);
```

**Border em popovers — nunca usar inline style hardcoded:**
```tsx
// ✅ correto — responde ao tema
className="border border-[#edf2f7] dark:border-[#374151]"

// ❌ errado — nunca muda
style={{ border: '1px solid #edf2f7' }}
```

### ✅ Do · ❌ Don't — Elevação

✅ Usar background shift para hierarquia (`bg-flow-indigo-50` vs `bg-white`)
✅ Bordas como fallback de acessibilidade apenas
✅ Sombra somente em elementos flutuantes (menus, modais, tooltips)
❌ Sombras em cards estáticos
❌ Bordas como divisores de seção (usar gap/espaçamento)

---

## 6. Componentes

### Button

**Definição:** Para ações — não para navegação (usar `<a>` para links).

**Variantes:**

| Tipo | Preenchimento | Quando usar |
|------|--------------|-------------|
| `primary` | `filled` | Ação principal da página — 1 por fluxo |
| `secondary` | `filled` | Ação de suporte (cancel, back) |
| `brand` | `filled` | Ações com identidade CI&T |
| `error` / `destructive` | `filled` | Ações destrutivas com confirmação |
| `success` | `filled` | Confirmação de estado positivo |
| Qualquer | `outline` | Ação secundária com ênfase visual |
| Qualquer | `ghost` | Ação terciária, sem destaque |

**Tamanhos:** `large` → `h-12 px-6` · `medium` → `h-10 px-4`
**Shapes:** `default` → `rounded-lg` · `pill` → `rounded-full`
**States:** default, hover, loading (`isLoading` mostra spinner), disabled

**Tokens principais:**
```
primary bg:          #000050 (flow-indigo-800)
primary bg hover:    #00053c (flow-indigo-900)
primary bg disabled: #eef1f7 (flow-indigo-100)
secondary bg:        white
secondary bg hover:  #eef1f7 (flow-indigo-100)
brand bg:            #e6393a (flow-rose-500)
brand bg hover:      #b3142d (flow-rose-700)
```

**✅ Do · ❌ Don't**

✅ 1 botão `primary` por página ou fluxo
✅ Rótulos verbais curtos: "Salvar", "Instalar", "Publicar"
✅ Sentence case: "Salvar alterações" (não "SALVAR")
✅ Ícone à esquerda alinhado ao texto (`gap-2`)
✅ `aria-label` quando o texto não é autoexplicativo
❌ Botão para navegação — usar `<a>` ou `<Link>`
❌ Múltiplos botões `primary` na mesma área
❌ ALL CAPS em labels
❌ Botão destrutivo sem confirmação (Dialog)

---

### Badge

**Variantes:**

| Variante | Bg | Text | Uso |
|----------|----|------|-----|
| `primary` | `#000050` | white | Status principal, categoria primária |
| `secondary` | `#eef1f7` | `#00053c` | Status secundário |
| `brand` | `#e6393a` | white | Branding CI&T |
| `gray` | gray-500 | white | Status neutro |
| `error` | red-50 | red-600 | Estado de erro |
| `outline` | transparent | `#000050` | Categoria, tag outline |

**Formas:** `rounded-md` (padrão, 6px) · `rounded-full` (prop `rounded={true}`)
**Dot indicator:** sem label — `h-[6px] w-[6px]` (status online/offline)
**Base:** `inline-flex items-center gap-1 text-xs font-semibold px-2 py-1`

**Dark mode — variantes obrigatórias (auditoria março 2026):**

> O Badge não tem dark mode no DS Figma — em protótipos, implementar dark mode manualmente via `dark:` classes.

| Variante | Dark bg | Dark text | Dark border | Contraste |
|----------|---------|-----------|-------------|-----------|
| `default` | `#374151` | `#e2e8f0` | — | 11.0:1 ✅ |
| `success` | `#0a2318` | `#4ade80` | `#14532d` | 8.2:1 ✅ |
| `error` | `#2d0a0a` | `#f87171` | `#3f1111` | 7.8:1 ✅ |
| `warning` | `#2a1f00` | `#facc15` | `#3d2f00` | 10.6:1 ✅ |
| `info` | `#0d1e3d` | `#60a5fa` | `#1e3a5f` | 6.1:1 ✅ |
| `muted` | `#374151` | `#9ca3af` | — | 5.2:1 ✅ |

⚠️ **Falhas de contraste em light mode (DS):** `error` 4.41:1, `success` 3.15:1, `info` 3.38:1, `muted` 4.39:1 — todos abaixo do mínimo WCAG AA (4.5:1). Reporte em `CI-T-HyperX/flow-core-design-system`.

**✅ Do · ❌ Don't**

✅ Usar para status (poc/beta/stable), maturity, categoria de conteúdo
✅ Combinar com ícone de 14px quando necessário (`gap-1`)
✅ Sempre implementar dark mode em protótipos (DS não tem — usar tabela acima)
❌ Usar badge como botão clicável
❌ Badge primário em texto longo (mais de 3 palavras)
❌ Usar as variantes semânticas (`error`, `success`, `info`) sem dark mode em telas com suporte a dark theme

---

### Input / TextArea

**Base:** `rounded-md border border-gray-300 bg-white px-3 py-2 text-body-sm`

**Estados:**
```
default:   border-gray-300
focus:     border-gray-400 + ring-2 ring-gray-400/30
error:     border-red-600 + ring-2 ring-red-600/20
success:   border-green-600
disabled:  opacity-50 cursor-not-allowed bg-gray-50
```

**Icon support:**
```tsx
<div className="relative">
  <TbSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
  <input className="pl-9 ..." />
</div>
```

**HelperText:** `<p className="text-detail mt-1 text-[var(--input-text-error)]">Mensagem de erro</p>`

---

### Switch

**Definição:** Comunica estado persistente (on/off). **Diferente do Toggle Button**, que comunica ação.

**Anatomia:** Track (trilho) + Thumb (círculo deslizante) + Label (obrigatório)

**Estados:**
- Off (default): track `flow-indigo-300` (#c4c9e6), thumb branco, esquerda
- On: track `flow-indigo-800` (#000050), thumb branco, direita
- Disabled: track `flow-indigo-100`, thumb `flow-indigo-200`

**Acessibilidade obrigatória:**
```html
<button role="switch" aria-checked="true|false" aria-label="Ativar notificações">
```
Área mínima: 40×40px. Label sempre presente.

**✅ Do · ❌ Don't**

✅ Apenas para configurações persistentes (ativar modo escuro, habilitar notificações)
✅ Feedback imediato — sem confirmação
✅ Label descritivo sempre visível ao lado
❌ Para ações únicas — usar Button
❌ Switch sem label visível
❌ Esconder delay de processamento — usar loading inline

---

### Snackbar (Toast)

**Posição:** `fixed top-4 right-4 z-50`
**Animação:** `slide-up` (0.2s ease-out)
**Auto-dismiss:** 4000ms (desabilitar se tiver action button)

**Variantes:** success (verde), error (vermelho), info (azul), warning (amarelo)
**Estrutura:** ícone 24px + título bold + descrição opcional + botão fechar (ou action)
**Width:** `w-[400px]` · **Shape:** `rounded-2xl`

**✅ Do · ❌ Don't**

✅ Para feedback de ações do usuário (salvo, erro, copiado)
✅ Sempre ícone + cor + texto (nunca só cor)
❌ Mensagens longas (mais de 2 linhas)
❌ Empilhar mais de 3 snackbars simultâneos
❌ Substituir Banner (que é inline e persistente)

---

### Banner

**Uso:** Alerta contextual inline na página — persistente. Diferente do Snackbar (flutuante, temporário).

**Variantes:** info, warning, error, success, primary
**Quando usar:** modo beta, configuração pendente obrigatória, aviso de limite

#### Dark mode — tokens por variante

##### Warning (amber-950)

O banner warning em dark mode usa a família amber-950, não o gray neutro. Cores de texto e CTA devem pertencer à mesma família semântica do background.

| Elemento | Token dark | Hex | Referência |
|----------|-----------|-----|------------|
| Background | amber-950 | `#431407` | `dark:bg-[#431407]` |
| Border | amber-800 | `#78350f` | `dark:border-[#78350f]` |
| Icon | amber-200 | `#fde68a` | `dark:text-[#fde68a]` |
| Title | warm-white | `#fff7ed` | `dark:text-[#fff7ed]` |
| Description | stone-400 | `#a8a29e` | `dark:text-[#a8a29e]` |
| CTA label | warm-white | `#fff7ed` | `dark:text-[#fff7ed]` |
| Dismiss (×) | stone-400 | `#a8a29e` | `dark:text-[#a8a29e]` |
| Ghost CTA hover | amber-800 | `#78350f` | `dark:hover:bg-[#78350f]` |

> **Regra: CTA segue a cor do título.** Em banners semânticos, o label do CTA deve usar a mesma cor do título (`#fff7ed`) — não uma cor de acento separada. Criar uma cor de destaque diferente para o CTA quebra a hierarquia visual ao tornar a ação mais saliente do que a mensagem em si.

##### Info (blue-950)

| Elemento | Token dark | Hex |
|----------|-----------|-----|
| Background | `#0d1e3d` | `dark:bg-[#0d1e3d]` |
| Border | `#1e3a5f` | `dark:border-[#1e3a5f]` |
| Icon | `#60a5fa` | `dark:text-[#60a5fa]` |
| Title | `#e2e8f0` | `dark:text-[#e2e8f0]` |
| Description | `#9ca3af` | `dark:text-[#9ca3af]` |

##### Success (green-950)

| Elemento | Token dark | Hex |
|----------|-----------|-----|
| Background | `#0a2318` | `dark:bg-[#0a2318]` |
| Border | `#14532d` | `dark:border-[#14532d]` |
| Icon / CTA | `#4ade80` | `dark:text-[#4ade80]` |
| Title | `#e2e8f0` | `dark:text-[#e2e8f0]` |
| Description | `#9ca3af` | `dark:text-[#9ca3af]` |

**Estrutura obrigatória do Banner:**

```tsx
// ✅ correto — rounded-2xl em TODOS os cantos + fundo preenchido, sem borda lateral
<div className="rounded-2xl overflow-hidden flex items-center justify-between p-4 gap-x-3 bg-amber-950 border border-amber-800">
  ...
</div>

// ❌ errado — borda lateral + border-radius cria visual assimétrico
<div style={{ borderLeft: '4px solid #eab308', borderRadius: '0 8px 8px 0' }}>
  ...
</div>
```

**✅ Do · ❌ Don't**

✅ Para contexto persistente que o usuário deve notar antes de agir
✅ Usar a família semântica do banner para todos os elementos (fundo + ícone + texto + CTA)
✅ CTA usa a cor do título — nunca um acento separado
✅ `rounded-2xl` em **todos** os cantos + fundo preenchido com token semântico
❌ Como substituto do Snackbar para feedback de ação
❌ Texto neutro (`#e2e8f0`, `#9ca3af`) em banner warning dark mode — usar família amber
❌ CTA com cor de acento diferente do título (cria falsa hierarquia)
❌ **`border-left` (ou `border-right`) + `border-radius` no mesmo container** — cria visual assimétrico (reto de um lado, arredondado do outro) que não existe no DS. Banner usa `rounded-2xl` + fundo preenchido sem nenhuma borda lateral.

---

### Dialog / Sheet

**Dialog** (Radix `Dialog`): Modal centrado com overlay. Para confirmações e formulários curtos.
**Sheet** (Radix `Sheet`): Painel lateral deslizante. Para edição inline sem fechar o fluxo principal.

**Dialog obrigatório:** sempre `aria-labelledby`, fechar com Escape, focus trap automático (Radix)

```tsx
// Dialog tokens
overlay:   bg-black/40 backdrop-blur-sm
content:   bg-white rounded-xl shadow-2xl p-6 max-w-md w-full
```

**✅ Do · ❌ Don't**

✅ Dialog para ações destrutivas (com botão de confirmação `error`)
✅ Sheet para formulários maiores ou contexto complementar
❌ Criar modal customizado sem Radix — perde focus trap e acessibilidade
❌ Abrir Dialog dentro de Dialog

---

### Tabs

**Style:** underline, sem background
**Container:** `flex gap-0 border-b border-gray-200`

```
active:   border-b-2 border-flow-indigo-800 text-flow-indigo-800 font-medium
inactive: border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300
base:     px-4 py-3 text-body-sm transition-colors -mb-px
```

---

### Skeleton / Loading

| Situação | Componente | Motivo |
|----------|-----------|--------|
| Carregamento inicial de conteúdo | `Skeleton` | Mostra estrutura antes do dado |
| Ação em progresso (botão) | `isLoading` prop | Inline, não bloqueia UI |
| Upload/processamento longo | Spinner + texto de status | Comunica progresso |

**✅ Do · ❌ Don't**

✅ Skeleton com mesma forma do conteúdo que substituirá
✅ Animação `shimmer` no skeleton (2s linear infinite)
❌ Spinner de página inteira para carregamento de lista
❌ Loading sem indicação de progresso para operações > 3s

---

## 7. Sidebar Canônica

> **Regra:** Usar esta especificação em todos os protótipos Flow. Não recriar do zero.
> **Referência:** `docs/prototype/findr-bundles-app/src/components/layout/Sidebar.tsx`

```tsx
<aside
  className="w-[76px] flex-shrink-0 flex flex-col h-full transition-colors duration-200"
  style={{ background: sidebarBg, borderRight: `1px solid ${sidebarBdr}` }}
>
  {/* Logo — 76×76px */}
  <div
    className="w-[76px] h-[76px] flex items-center justify-center flex-shrink-0"
    style={{ borderBottom: `1px solid ${sidebarBdr}` }}
  >
    <img
      src={flowLogo}
      width={34} height={23}
      alt="Flow"
      style={{ filter: isDark ? 'brightness(0) invert(1)' : 'none' }}
    />
  </div>

  {/* Nav */}
  <div className="flex flex-col flex-1 px-[14px] pt-[20px] pb-[20px]">
    <nav className="flex flex-col gap-[8px]">
      {/* top nav items */}
    </nav>
    <div className="flex-1" />
    <div className="flex flex-col gap-[8px] relative">
      {/* bottom nav items */}
    </div>
  </div>
</aside>
```

**Tokens computados da sidebar — obrigatório com ThemeProvider:**
```tsx
const { theme } = useTheme()
const isDark     = theme === 'dark'
const sidebarBg  = isDark ? '#1f2937' : '#f6f7fb'   // Gray 800 / surface-soft
const sidebarBdr = isDark ? '#374151' : '#edf2f7'   // Gray 700 / flow-indigo-50
const iconColor  = isDark ? '#e5e7eb' : '#000050'   // Gray 200 / flow-indigo-800
const hoverBg    = isDark ? '#374151' : '#eef0f7'   // Gray 700 / flow-indigo-100
const activeBg   = isDark ? '#374151' : '#eef0f7'
const avatarBg   = isDark ? '#374151' : '#eef0f7'
const avatarColor = isDark ? '#e5e7eb' : '#000050'
```

> **Por que inline style e não `dark:` classes?**
> Bordas e backgrounds da sidebar são aplicados via `style={}` porque a sidebar usa `borderRight` e `borderBottom` que não têm equivalente direto em Tailwind. Misturar `dark:` com `style={{}}` causa bugs — o inline sempre vence. Use tokens computados.

**Nav button — hover via onMouseEnter/Leave (não Tailwind `hover:`):**
```tsx
<button
  style={{ color: iconColor }}
  className="w-[48px] h-[48px] rounded-lg flex items-center justify-center transition-colors duration-200"
  onMouseEnter={e => { e.currentTarget.style.background = hoverBg }}
  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
>
  <TbMessage size={24} />
</button>
```

**Botão ativo (estado selecionado):**
```tsx
<button
  style={{ color: iconColor, background: isActive ? activeBg : 'transparent' }}
  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = hoverBg }}
  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
>
```

**Theme toggle — ícone indica modo atual:**
```tsx
// Moon = está em dark, clica para ir para light
// Sun  = está em light, clica para ir para dark
{isDark ? <TbMoon size={24} /> : <TbSun size={24} />}
```

### Mapeamento engine → item ativo

| Engine | Ícone | Nav |
|--------|-------|-----|
| Chat | `TbMessage` | top |
| Coders | `TbTerminal2` | top |
| Steps / Backlog | `TbLayoutCards` | top |
| Maker | `<IconMaker />` (SVG 4-squares) | top |
| Ops / Metrics | `TbChartPie` | top |
| Findr | `TbTriangleSquareCircle` | bottom |

**Bottom nav sempre inclui:** Findr · News (`TbNews`) · Help (`TbHelpSquareRounded`) · Avatar (iniciais) · Logout (`TbArrowBarToRight`)

**Avatar:** iniciais do criador do protótipo (ex: "BU" para Bruna Urbina)
**Iniciais:** `w-[40px] h-[40px] rounded-full bg-[#eef0f7] text-[#000050] text-sm font-bold`

### Exceções

| Engine | Sidebar? | Motivo |
|--------|----------|--------|
| Coder | ❌ | É uma IDE — shell próprio |
| Agentic Bus | ❌ | Produto novo, sem posicionamento na nav |
| AIMS | ⚠️ | Incerto — perguntar antes |

---

## 8. Ícones

**Biblioteca única:** Tabler Icons via `react-icons/tb`
**Import:** `import { TbMessage, TbPackage } from 'react-icons/tb'`
**❌ Nunca usar:** `lucide-react` ou qualquer outra biblioteca

### Tamanhos por contexto

| Contexto | Size |
|----------|------|
| Inline texto, badges, tags | `16` |
| UI padrão (listas, inputs) | `16` |
| Cards, descrições | `20` |
| Sidebar, headers, botões grandes | `24` |

### Ícones do Flow (custom)

Usar como SVG importado ou componente local:
- `FlowLogo`, `FlowColorful`, `FlowFull`, `FlowFullColorful`

### Integrações

```
GitHub:      svg icon do portal
Jira:        svg icon do portal
Bitbucket:   svg icon do portal
Azure DevOps: svg icon
BigQuery:    svg icon
```

### ⚠️ Ícones que NÃO existem no Tabler

Verificar antes de usar qualquer `TbBrand*`:
- `TbBrandJira` → **não existe** → usar `TbCode`
- Sempre verificar no site tabler-icons.io antes de usar

---

## 9. Padrões de Interface (do Portal ao Vivo)

### Homepage (Portal)
```
Layout: sidebar 76px + conteúdo
Header: título hero h1 + contexto (squad/engine selector)
Seções: label da seção + link "More solutions" à direita + grid 2-col de cards
```

### Solution Card
```tsx
<a href="/our-solutions/details/{id}" className="block bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-flow-indigo-200 hover:-translate-y-0.5 transition-all">
  {/* topo: engine icon + category badge */}
  {/* título: font-bold text-heading-sm text-flow-indigo-800 */}
  {/* descrição: text-body-sm text-gray-500 line-clamp-2 */}
  {/* rodapé: "By @author" + metric (likes/rating) */}
</a>
```

### Chat Engine
```
sidebar conversas 320px (agrupadas por data) + área central
empty state: sugestões de prompt como chips rounded-full
input bottom: textarea + attach + "@ MCP Tools" chip
```

### Steps (Backlog Refiner)
```
topo: input de prompt grande (rounded-xl, full width)
tabs: Featured / Created by me / Favorite
grid 3-col: cards com category badge + MOST USED indicator + 3-dots menu
```

### Ops (Flow Ops)
```
left sidebar 240px: lista de métricas com ícones, active bg navy rounded-lg
conteúdo central: chart area
painel filtros 280px: Start Date, End Date, Project, Team, Issue Type (select)
```

### Settings
```
sidebar interna 2 níveis: seção uppercase + sub-items
conteúdo: título + busca + grid 2-col de integration cards
integration card: logo + nome + lista de capabilities + botão Authorize full width
```

---

## 10. Estados & Feedback

| Estado | Componente | Comportamento |
|--------|-----------|---------------|
| Loading de conteúdo | `Skeleton` | Placeholder com shimmer, mesma forma do conteúdo |
| Ação em progresso | Button `isLoading` | Spinner inline, texto oculto, desabilitado |
| Sucesso de ação | Snackbar `success` | Auto-dismiss 4s, top-right |
| Erro de ação | Snackbar `error` | Auto-dismiss ou com retry button |
| Erro persistente de página | Banner `error` | Inline, não fecha sozinho |
| Empty state | Frame + dashed border | `border-dashed border-gray-200 rounded-xl p-10 text-center` + ícone + mensagem + CTA opcional |
| AI baixa confiança | Badge + Tooltip | Indicar incerteza — não esconder |
| AI processando | `thinking` animation | Pulse nos dots, com texto "Processing..." |

---

## 11. Animações

| Nome | Duração | Uso |
|------|---------|-----|
| `slide-up` | 0.2s ease-out | modais, snackbars |
| `fade-in` | 0.15s ease-out | overlays |
| `shimmer` | 2s linear ∞ | skeletons |
| `slide-in-right` | 0.25s cubic-bezier | sheets |
| `thinking` | 0.5s ease-out ∞ | AI processing |
| `accordion-down/up` | 0.2s ease-out | acordeões |

---

## 12. Acessibilidade

| Regra | Especificação |
|-------|--------------|
| Contraste mínimo | 4.5:1 texto/fundo — WCAG AA |
| Focus ring | `focus-visible:ring-2 ring-offset-2 ring-flow-indigo-800` |
| Área mínima de toque | `40×40px` |
| Icon-only buttons | Sempre `aria-label` ou `title` |
| Feedback de estado | Nunca só cor — sempre cor + ícone + texto |
| Formulários | Labels sempre presentes — nunca só placeholder |

**Usar Radix obrigatoriamente para:**
Dialog, Sheet, Tooltip, Select, Tabs, Accordion, Switch, Checkbox, Radio, Slider, Popover, NavigationMenu

**Não criar** versões customizadas desses componentes — perdem focus management e ARIA automático.

---

## 13. Do's & Don'ts — Resumo

| Categoria | ✅ Fazer | ❌ Evitar |
|-----------|---------|---------|
| **Cores** | Tokens Tailwind nomeados (`text-flow-indigo-800`) | Hex inline em classes, cores genéricas fora de contexto |
| **Tipografia** | Escala customizada, sentence case | `text-sm`/`text-base`, ALL CAPS em labels |
| **Botões** | 1 primary por fluxo, rótulos verbais | Botão para navegação, múltiplos primários |
| **Layout** | CTAs no footer fixo do shell | CTAs dentro do scroll container |
| **Ícones** | `react-icons/tb`, tamanho por contexto | `lucide-react`, ícone único para todos os contextos |
| **Sidebar** | Usar canônica como base (Sidebar.tsx) | Recriar sidebar do zero por protótipo |
| **Modais** | Radix Dialog/Sheet | Modal customizado sem Radix |
| **Feedback** | Cor + ícone + texto | Só cor como indicador de estado |
| **Switch** | Somente estado persistente, com label | Ação única, sem label visível |
| **Cards** | `hover:shadow-md hover:-translate-y-0.5` | Sombra estática em cards passivos |

---

## 14. Token Quick Reference

```
/* Layout */
sidebar-width:    76px
nav-btn:          48×48px  rounded-lg
logo-area:        76×76px
sidebar-border:   #edf2f7
active-nav-bg:    #eef0f7   (flow-indigo-100)
content-max-w:    1014px
card-padding:     p-5 (20px) | p-6 (24px)
border-radius:    8px (rounded-lg) padrão
                  full (pill/avatar/snackbar)

/* Cores */
primary:          #000050   flow-indigo-800
primary-hover:    #00053c   flow-indigo-900
primary-light:    #eef1f7   flow-indigo-100
accent-coral:     #fa5a50   flow-rose-400
brand-red:        #e6393a   flow-rose-500
success:          #166534   green-800    (WCAG AA 5.74:1 em #f0fdf4 ✅)
error:            #b91c1c   red-700      (WCAG AA 6.1:1 em #fef2f2 ✅)
warning:          #92400e   amber-900    (WCAG AA 7.2:1 em #fefce8 ✅)
info:             #1d4ed8   blue-700     (WCAG AA 5.9:1 em #eff6ff ✅)

/* Text */
text-primary:     #000050   (flow-indigo-800)
text-secondary:   #232766   (flow-indigo-700)
text-tertiary:    #5f649a   (flow-indigo-500)
text-muted:       #9397bf   (flow-indigo-400)
text-body:        #171923   (near black)

/* Shadows */
card-hover:       shadow-md
menu/popover:     0 8px 24px -4px rgba(0,0,80,0.12), 0 2px 8px -2px rgba(0,0,0,0.06)
modal-overlay:    bg-black/40 backdrop-blur-sm
```
