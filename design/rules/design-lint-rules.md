---
title: "Design Lint Rules — Flow Platform"
type: reference
domain: platform
status: current
updated: 2026-05-22
---

# Design Lint Rules — Flow Platform

Regras checáveis para revisão de UI antes de PR ou entrega de protótipo. Usado pelo agente `design-system-linter` e como referência de revisão manual.

Complementa `ui-quality-bar.md` (guardrails de alto nível) e os módulos `craft/` (qualidade de UI). Este documento define **o que checar no código**, não apenas o que evitar.

---

## Como usar

| Quem usa | Quando usar | Como usar |
|----------|-------------|-----------|
| `design-system-linter` agent | Pré-PR, pós-build | Referência primária de lint |
| Revisão manual (Bru) | Code review, demos | Checklist de blocker/warning |
| `flow-prototype-builder` | Validação pré-entrega | Passo 2 do checklist |

Severidade:
- **BLOCKER** — bloqueia merge. Corrigir antes de qualquer revisão
- **WARNING** — deve corrigir; PR avança com justificativa documentada
- **SUGGESTION** — polimento; sem bloqueio

---

## 1. Componentes permitidos

### Stack obrigatória

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | React | 18.x |
| Build | Vite | latest |
| Tipos | TypeScript | 5.x |
| Estilo | Tailwind CSS | v3 — **NÃO v4** |
| Primitivos UI | Radix UI | latest |
| Ícones | react-icons/tb (Tabler) | latest |

### Ordem de decisão para novos componentes

1. **Radix UI** → sempre verificar primeiro (`@radix-ui/react-*`)
2. **Tailwind classes** → construir do zero se não existir em Radix
3. **Nova dependência** → nunca instalar sem aprovação explícita do usuário

Bibliotecas de componentes externas (shadcn/ui, MUI, Chakra, Ant Design, Mantine) **não são permitidas**.

### Radix primitivos em uso no projeto

| Componente | Import |
|-----------|--------|
| Select | `@radix-ui/react-select` |
| Dialog / Modal | `@radix-ui/react-dialog` |
| Tabs | `@radix-ui/react-tabs` |
| Dropdown Menu | `@radix-ui/react-dropdown-menu` |
| Popover | `@radix-ui/react-popover` |
| Tooltip | `@radix-ui/react-tooltip` |
| Checkbox | `@radix-ui/react-checkbox` |
| Switch | `@radix-ui/react-switch` |
| Separator | `@radix-ui/react-separator` |
| Avatar | `@radix-ui/react-avatar` |

---

## 2. Tokens semânticos

### Cores

| Token | Valor | Uso |
|-------|-------|-----|
| Primary / Navy | `#000050` | CTAs, links, estados ativos, accents primários |
| Secondary / Coral | `#fa5a50` | Accent secundário — **máx 2× por tela** |
| Background main | `#ffffff` | Fundo de página e cards |
| Background alt | `#f8f9fc` | Seções alternadas, hover de linha, fundo de input |
| Background warm | `#fafaf9` | Direção C (onboarding/empty states) |
| Sidebar bg | `#ffffff` | Sidebar — SEMPRE branca |
| Sidebar border | `#edf2f7` | `border-r` da sidebar |
| Active item | `#eef0f7` | Background de item ativo na nav |
| Hover item | `#eef0f7` | Hover de botões nav, linhas de tabela |
| Success | `#16a34a` | Texto e ícone |
| Success bg | `#f0fdf4` | Background de banner/badge de sucesso |
| Error | `#dc2626` | Texto e ícone |
| Error bg | `#fef2f2` | Background de banner/badge de erro |
| Warning | `#eab308` | Texto e ícone |
| Warning bg | `#fefce8` | Background de banner/badge de aviso |
| Info | `#3b82f6` | Texto e ícone |
| Info bg | `#eff6ff` | Background de banner/badge de info |
| Text primary | `#171923` | Texto principal |
| Text secondary | `#4a5568` | Texto de suporte |
| Text tertiary | `#718096` | Metadados, labels secundários |
| Border default | `#e2e8f0` | Bordas de card, dividers |
| Border strong | `#cbd5e0` | Bordas de input, separadores |

**Regra:** qualquer hex fora desta lista é um **WARNING**. Se não há token equivalente, documentar a exceção.

### Tipografia

| Token Tailwind | Tamanho | Pesos válidos | Uso |
|----------------|---------|---------------|-----|
| `text-xs` | 12px | 400, 500 | Labels, metadados, captions |
| `text-sm` | 14px | 400, 500, `font-[510]` | Body padrão, itens de lista |
| `text-base` | 16px | 400, 500 | Body expandido, parágrafos |
| `text-lg` | 18px | 500, 600 | Subheadings, títulos de card |
| `text-xl` | 20px | 600 | Section headings |
| `text-2xl` | 24px | 600, 700 | Page headings |
| `text-3xl` | 30px | 700 | Display — usar raramente |

Font: **Inter variable** — único permitido. Usar `font-[510]` para peso intermediário em labels de alto volume.

### Espaçamento

| Token | Valor | Contexto |
|-------|-------|----------|
| `gap-1` / `p-1` | 4px | Interno a componentes |
| `gap-2` / `p-2` | 8px | Entre elementos relacionados num mesmo card |
| `gap-4` / `p-4` | 16px | Padding de card, entre campos de formulário |
| `gap-6` / `p-6` | 24px | Separação entre seções de uma view |
| `gap-8` / `p-8` | 32px | Separação entre blocos distintos |
| `gap-12` / `p-12` | 48px | Separação entre seções de página |

---

## 3. Padrões proibidos

### BLOCKER — corrigir antes de qualquer revisão

| # | Padrão proibido | Detecção | Causa raiz |
|---|----------------|----------|------------|
| B1 | Sidebar escura | `bg-gray-900`, `bg-gray-800`, `bg-slate-800`, `bg-[#1f2937]` em elemento de sidebar | AI default de "sidebar = dark" |
| B2 | Ícones fora de Tabler | `from 'lucide-react'`, `from '@heroicons'`, `from 'phosphor-react'`, qualquer import de ícone não-`react-icons/tb` | AI usa Lucide por default |
| B3 | Border lateral + rounded | `border-l-4` ou `border-r-4` + qualquer `rounded-*` no mesmo elemento | Padrão Bootstrap que cria visual assimétrico inexistente no DS |
| B4 | Tooltip escuro | `bg-gray-900`, `bg-black`, `bg-gray-800` em contexto de tooltip | Tooltip Flow é `bg-white` |
| B5 | CTA dentro do scroll | `<Button>` ou `<button>` dentro de container com `overflow-y-auto` sem `footer shrink-0` | CTA some no scroll |
| B6 | Hardcoded hex fora do DS | Qualquer `#` não listado em Tokens semânticos — seção 2 | AI inventa cores |
| B7 | Copy genérica inventada | "Lorem ipsum", "Metric value", "Data placeholder", "N/A (placeholder)", nomes de pessoa inventados não-brasileiros | AI preenche com fixtures irreais |
| B8 | Tailwind v4 syntax | `theme()` em CSS, `@theme`, `@layer base { :root { --color-* } }` | Quebra build no projeto (usa v3) |

### WARNING — corrigir antes do merge

| # | Padrão | Detecção | Motivo |
|---|--------|----------|--------|
| W1 | Mais de 2 accents coral | `#fa5a50` ou `text-red-500` equivalente aparecendo > 2× como accent decorativo | Poluição visual, perde significado semântico |
| W2 | Cor semântica para contexto não-semântico | `text-red-500`/`bg-red-*` em elemento que não é erro/alerta | Viola heurística de correspondência com mundo real |
| W3 | Empty state sem CTA | Container de empty state sem elemento interativo de próximo passo | Empty state incompleto — ver `state-coverage.md` |
| W4 | Spinner sem timeout | `animate-spin` sem lógica de timeout associada | Spinner roda indefinidamente em falha |
| W5 | Formulário sem blur validation | `onChange` para validação no primeiro keystroke | Feedback prematuro — ver `state-coverage.md` |
| W6 | Wrapper sem max-width | View principal sem `max-w-[1100px] mx-auto` ou equivalente | Conteúdo estica para larguras absurdas |
| W7 | `wrapper px-8` ausente | View sem `px-8 py-7` no container principal | Layout apertado ou alinhado à direita |
| W8 | Absoluto/fixed sem Portal | `position: absolute/fixed` em modal/dropdown sem Radix Portal | Z-index conflicts em contextos aninhados |
| W9 | Step de escala tipográfica < 1.25× | Dois níveis adjacentes com `text-sm` / `text-base` sem diferença de peso/espaçamento | Hierarquia plana — ver `typography-hierarchy.md` |
| W10 | Avatar com iniciais incorretas | Iniciais no sidebar que não são do criador do protótipo | Inconsistência com regra de personalização da sidebar |

### SUGGESTION — polimento

| # | Padrão | Por que melhorar |
|---|--------|-----------------|
| S1 | Escada de peso graduada | regular → medium → semibold → bold — cada nível 1 step mais pesado parece default, não autoral. Peso deve saltar. |
| S2 | Gap uniforme entre todas as seções | Todo espaçamento idêntico não carrega informação de hierarquia |
| S3 | Cor como único sinal de estado | Estado de erro só com cor vermelha, sem ícone + label — falha para daltônicos |
| S4 | CTA com label genérico | "Salvar", "Confirmar", "OK" sem contexto — preferir verbos de ação específicos ("Publicar bundle", "Aprovar revisão") |
| S5 | `ease` nativo em transições | `transition ease-in-out` — muito suave. Preferir `cubic-bezier(0.23, 1, 0.32, 1)` |
| S6 | Ausência de `prefers-reduced-motion` | Animações com `translate`/`scale`/`rotate` sem override em `@media (prefers-reduced-motion: reduce)` |
| S7 | > 3 níveis tipográficos visíveis acima do fold | Colapsar ou rebaixar antes de adicionar quarto nível |

---

## 4. Exemplos bons e ruins

### Sidebar

```tsx
// ❌ BLOCKER — sidebar escura
<aside className="w-[76px] bg-gray-900 border-r border-gray-700 flex flex-col">

// ✅ CORRETO
<aside className="w-[76px] bg-white border-r border-[#edf2f7] flex flex-col">
```

### Ícones

```tsx
// ❌ BLOCKER — biblioteca errada
import { Settings, Home, Bell } from 'lucide-react'

// ✅ CORRETO
import { TbSettings, TbHome, TbBell } from 'react-icons/tb'
```

### Tooltip

```tsx
// ❌ BLOCKER — tooltip escuro (padrão Radix não customizado)
<TooltipContent className="bg-gray-900 text-white text-xs rounded px-2 py-1">

// ✅ CORRETO
<TooltipContent className="bg-white text-[#171923] text-sm rounded-lg shadow-md px-3 py-2 border border-[#e2e8f0]">
```

### CTA placement

```tsx
// ❌ BLOCKER — CTA dentro do scroll
<div className="flex-1 overflow-y-auto px-6 py-4">
  <FormFields />
  <Button>Publicar bundle</Button>  {/* desaparece no scroll */}
</div>

// ✅ CORRETO
<div className="flex-1 overflow-y-auto px-6 py-4">
  <FormFields />
</div>
<footer className="shrink-0 border-t border-[#e2e8f0] px-6 py-4 flex justify-end gap-3">
  <Button variant="outline">Cancelar</Button>
  <Button>Publicar bundle</Button>
</footer>
```

### Border lateral em banners

```tsx
// ❌ BLOCKER — border-l + rounded no mesmo elemento
<div className="border-l-4 border-blue-500 rounded-lg bg-blue-50 p-4">

// ✅ CORRETO — sem borda lateral, usa fundo preenchido
<div className="rounded-2xl bg-[#eff6ff] p-4 flex items-start gap-3">
  <TbInfoCircle className="text-[#3b82f6] shrink-0 mt-0.5" size={16} />
  <p className="text-sm text-[#1e40af]">Mensagem informativa</p>
</div>
```

### Layout wrapper

```tsx
// ❌ WARNING — sem max-width, conteúdo estica
<div className="p-4">

// ✅ CORRETO
<div className="px-8 py-7">
  <div className="max-w-[1100px] mx-auto">
    {/* conteúdo */}
  </div>
</div>
```

### Empty state

```tsx
// ❌ WARNING — empty state sem CTA
<div className="text-center py-12">
  <p className="text-sm text-gray-500">Nenhum bundle encontrado.</p>
</div>

// ✅ CORRETO
<div className="text-center py-12 flex flex-col items-center gap-4">
  <TbPackage size={40} className="text-[#cbd5e0]" />
  <div>
    <p className="text-sm font-medium text-[#171923]">Nenhum bundle criado ainda</p>
    <p className="text-sm text-[#718096] mt-1">Crie o primeiro para distribuir recursos ao seu time.</p>
  </div>
  <Button size="sm">Criar bundle</Button>
</div>
```

### Escada de peso (suggestion)

```tsx
// ❌ SUGGESTION — escada graduada, parece default
<h1 className="text-3xl font-bold">Título</h1>
<h2 className="text-2xl font-semibold">Seção</h2>
<h3 className="text-xl font-medium">Subseção</h3>
<p className="text-base font-normal">Corpo</p>

// ✅ PREFERÍVEL — salto de peso, não escada
<h1 className="text-2xl font-bold tracking-tight">Título</h1>
<h2 className="text-sm font-semibold uppercase tracking-wider text-[#718096]">Seção</h2>
<p className="text-sm text-[#4a5568]">Corpo</p>
```

---

## 5. Acessibilidade

Complementa [`accessibility-baseline.md`](../craft/accessibility-baseline.md) (craft module). Os itens abaixo são checáveis no código — para as regras completas de WCAG 2.2 AA, contexto e exceções, ler o craft module.

### BLOCKER — corrigir antes de qualquer revisão

| # | Padrão proibido | Detecção | Causa raiz |
|---|----------------|----------|------------|
| B9 | Focus outline removido sem substituição | `outline: none` ou `outline: 0` em seletor `:focus` sem `:focus-visible` correspondente | Triple failure: 1.4.11, 2.4.7, 2.4.13 |
| B10 | Imagem de conteúdo sem `alt` | `<img>` sem atributo `alt` (ou com `alt` ausente em SVG de dados) | Falha 1.1.1 Level A |
| B11 | Botão icon-only sem label acessível | `<button>` com ícone único sem `aria-label` ou `title` | Falha 4.1.2 Level A — AT anuncia "button" sem nome |
| B12 | `tabindex` positivo | Qualquer `tabindex="1"` ou superior | Reordena tab order contra o DOM — quase sempre piora |

### WARNING — corrigir antes do merge

| # | Padrão | Detecção | Motivo |
|---|--------|----------|--------|
| W11 | Touch target primário < 44×44 | Ação primária com `h-*` e `w-*` totalizando < 44×44 CSS px | AAA é 44×44 — para ações primárias, comprometer AAA é WARNING |
| W12 | Contraste insuficiente | Corpo em hex com relação < 4.5:1 vs fundo; UI component < 3:1 | Falha WCAG 2.2 AA — usar Figma Contrast Checker ou browser DevTools |
| W13 | Placeholder como único label | `<input placeholder="...">` sem `<label>` associado | Placeholder some ao digitar — falha 1.3.1 e 3.3.2 |
| W14 | `<div>` clicável sem role/tabindex | `onClick` em `<div>` ou `<span>` sem `role="button"` e `tabindex="0"` | Não focusable, não keyboard-operable — falha 2.1.1 |

---

## 6. Tabela consolidada de severidade

| Código | Descrição curta | Severidade | Seção |
|--------|----------------|------------|-------|
| B1 | Sidebar escura | BLOCKER | 3 |
| B2 | Ícone fora de Tabler | BLOCKER | 3 |
| B3 | `border-l/r` + `rounded-*` | BLOCKER | 3 |
| B4 | Tooltip escuro | BLOCKER | 3 |
| B5 | CTA dentro do scroll | BLOCKER | 3 |
| B6 | Hex fora do DS | BLOCKER | 3 |
| B7 | Copy genérica/inventada | BLOCKER | 3 |
| B8 | Tailwind v4 syntax | BLOCKER | 3 |
| W1 | > 2 accents coral | WARNING | 3 |
| W2 | Cor semântica fora de contexto | WARNING | 3 |
| W3 | Empty state sem CTA | WARNING | 3 |
| W4 | Spinner sem timeout | WARNING | 3 |
| W5 | Validação no keystroke, não no blur | WARNING | 3 |
| W6 | View sem max-width | WARNING | 3 |
| W7 | View sem `px-8 py-7` | WARNING | 3 |
| W8 | Modal/dropdown sem Portal | WARNING | 3 |
| W9 | Escala tipográfica < 1.25× sem compensação | WARNING | 3 |
| W10 | Iniciais do avatar incorretas | WARNING | 3 |
| S1 | Escada de peso graduada | SUGGESTION | 3 |
| S2 | Gap uniforme entre seções | SUGGESTION | 3 |
| S3 | Cor como único sinal de estado | SUGGESTION | 3 |
| S4 | Label de CTA genérico | SUGGESTION | 3 |
| S5 | `ease` nativo em vez de cubic-bezier | SUGGESTION | 3 |
| S6 | `transform` sem `prefers-reduced-motion` | SUGGESTION | 3 |
| S7 | > 3 níveis tipográficos acima do fold | SUGGESTION | 3 |
| B9 | Focus outline removido sem substituição | BLOCKER | 5 |
| B10 | Imagem de conteúdo sem `alt` | BLOCKER | 5 |
| B11 | Botão icon-only sem `aria-label` | BLOCKER | 5 |
| B12 | `tabindex` positivo | BLOCKER | 5 |
| W11 | Touch target primário < 44×44 | WARNING | 5 |
| W12 | Contraste insuficiente | WARNING | 5 |
| W13 | Placeholder como único label | WARNING | 5 |
| W14 | `<div>` clicável sem role/tabindex | WARNING | 5 |

---

## Relação com outros documentos

| Documento | Relação |
|-----------|---------|
| [`ui-quality-bar.md`](ui-quality-bar.md) | Guardrails de alto nível — este documento os torna checáveis no código |
| [`craft/anti-ai-slop.md`](../craft/anti-ai-slop.md) | P0/P1/P2 de qualidade de UI — BLOCKER deste doc = P0 do anti-ai-slop |
| [`craft/state-coverage.md`](../craft/state-coverage.md) | W3 (empty sem CTA), W4 (spinner sem timeout), W5 (validação) referem este módulo |
| [`craft/typography-hierarchy.md`](../craft/typography-hierarchy.md) | W9 e S1/S2/S7 referem este módulo |
| [`design-system-linter`](~/.claude/agents/design-system-linter.md) | Agente que usa este documento como referência primária de lint |
| [`flow-prototype-builder`](~/.claude/skills/flow-prototype-builder/SKILL.md) | Skill de build — usa este documento no Passo 2 da validação pré-entrega |
| [`craft/accessibility-baseline.md`](../craft/accessibility-baseline.md) | B9–B12 e W11–W14 referem este módulo — regras completas de WCAG 2.2 AA |
