---
title: "Craft — Anti-AI-Slop Rules"
type: craft
domain: platform
status: current
updated: 2026-05-22
craft.id: anti-ai-slop
craft.applies-to: all
---

# Anti-AI-Slop — Flow Platform

Regras concretas e checáveis que distinguem "desenhado por alguém que entende o produto" de "output padrão de LLM". As regras P0 bloqueiam entrega — não são preferências estéticas, são regressões.

> Inspirado no `craft/anti-ai-slop.md` do Open Design, reescrito para o contexto Flow Platform. As regras P0 são específicas do stack (React + Tailwind + Radix + react-icons/tb).

---

## Os sete pecados capitais (P0 — bloqueia entrega)

### 1. Sidebar escura
`bg-gray-900`, `bg-[#1f2937]`, `bg-slate-800` ou qualquer dark background na sidebar.

A sidebar do Flow é **sempre branca**: `bg-white border-r border-[#edf2f7]`. Sidebar escura é o sinal mais imediato de que o agente ignorou o DS.

**Fix:** `w-[76px] bg-white border-r border-[#edf2f7] flex flex-col`

---

### 2. Biblioteca de ícones errada
Import de `lucide-react`, `@heroicons/react`, `react-feather`, ou qualquer pacote que não seja `react-icons/tb`.

**Fix:** `import { TbX, TbPlus, TbSearch } from 'react-icons/tb'`

Regras adicionais de ícone:
- `TbBrandJira` não existe → usar `TbCode`
- Verificar qualquer `TbBrand*` antes de usar — muitos não existem
- Ícones de produto na sidebar são reservados: `TbMessage` (Chat), `TbTerminal2` (Coders), `TbLayoutCards` (Steps), `TbChartPie` (Ops), `TbTriangleSquareCircle` (Findr) — nunca reusar para outros fins

---

### 3. Border lateral + border-radius no mesmo container
`border-l-4 rounded-lg`, `border-r-2 rounded-xl` — o "tile de dashboard de IA".

Cria assimetria visual inexistente no DS Flow. Banners e cards usam `rounded-2xl` com fundo preenchido — sem borda lateral colorida.

**Fix:** Escolher um ou outro. Se precisar de destaque, usar fundo semântico (`bg-[#f0fdf4]`, `bg-[#fef2f2]`) com `rounded-2xl`.

---

### 4. Tooltip dark
`bg-gray-800`, `bg-slate-800`, `bg-[#1e293b]` em tooltips.

O DS Flow define tooltip como **white/card**: `bg-white text-[#171923] rounded-lg shadow-md text-sm` no modo claro. Nenhuma arrow. Tooltip dark é um anti-padrão.

**Fix:**
```jsx
<div className="bg-white text-[#171923] rounded-lg shadow-md px-3 py-2 text-sm">
  {content}
</div>
```

---

### 5. CTA dentro do scroll container
Botões de ação primária ou footer de wizard dentro do `overflow-y-auto`.

O usuário faz scroll e o CTA desaparece. Regra inegociável: CTAs ficam no `footer shrink-0` fora do scroll.

**Fix:**
```
flex flex-col overflow-hidden
  → flex-1 overflow-y-auto   ← scroll aqui
  → footer shrink-0           ← CTAs aqui, nunca no scroll
```

---

### 6. Valores hexadecimais hardcoded fora dos tokens do DS
Mais de 5 hex values raw no CSS fora do `:root` ou fora das variáveis Tailwind configuradas.

Tokens DS do Flow:
| Role | Valor |
|------|-------|
| Primary (navy) | `#000050` |
| Secondary (coral) | `#fa5a50` |
| Success text | `#166534` |
| Error text | `#b91c1c` |
| Warning text | `#92400e` |
| Info text | `#1d4ed8` |
| Border default | `#f0f0f5` |
| Sidebar border | `#edf2f7` |
| Sidebar item active | `#eef0f7` |

Charts têm paleta própria permitida: `#6366f1`, `#10b981`, `#f59e0b`, `#f43f5e`, `#0ea5e9`, `#8b5cf6`.

**Cor fora dessas listas = invenção.** Usar as classes Tailwind do projeto ou os tokens acima.

---

### 7. Labels genéricos e métricas inventadas
`"Metric A"`, `"User 1"`, `"Feature X"`, `"10× mais rápido"`, `"99.9% de uptime"`, `lorem ipsum`.

Cada palavra/número deve ser específico ao produto e ao contexto do protótipo. Placeholder honesto é melhor que dado inventado.

**Fix:** Usar nomes reais de produto, ou placeholder explícito como `[nome do bundle]`, `[taxa de adoção]` — nunca inventar números de impacto sem fonte.

---

## Soft tells (P1 — deve corrigir)

- **Coral `#fa5a50` (accent) usado mais de 2× por tela** — accent é para CTA primário e estado ativo; não para decoração
- **Navy `#000050` como background de seção** — primary é para texto e logo, não para fundos grandes
- **App abrindo direto num wizard ou formulário** — deve começar no estado `'entry'` ou `'setup'`, nunca direto no passo 2
- **Múltiplos scroll containers na mesma tela** — um único `overflow-y-auto` por view
- **Wrapper sem `max-w-[1100px] mx-auto`** — conteúdo principal precisa de max-width centrado
- **Mais de 1 CTA primário por contexto** — um por tela, no máximo 2 por seção
- **Ação destrutiva misturada com ações funcionais sem separação visual**

## Tells de polimento (P2 — melhoria)

- **Seções sem espaçamento diferenciado** — espaçamento uniforme destrói hierarquia
- **Heading como único vetor de hierarquia** — usar spacing e weight também
- **Background decorativo sem função** — blobs, waves, gradientes decorativos não têm lugar no Flow (enterprise, não marketing)
- **Foco visível removido** (`outline-none` sem substituição por `ring-*`)

---

## Como adicionar alma sem quebrar as regras

A fórmula é **~80% padrão + ~20% escolha distintiva**. O 20% mora em:

- **Um movimento tipográfico** — tamanho ou peso inesperado num heading, uso intencional do Inter variable no peso 510 (entre regular e medium)
- **Microcopy específico** — "Publicar bundle" bate "Confirmar". "Nenhum bundle ainda. Crie o primeiro." bate "Sem dados."
- **Uma microinteração que o usuário vai lembrar** — botão que move 2px no press, número que conta ao carregar, transição de estado com fade preciso
- **Um detalhe que só faz sentido pra quem usa o produto** — badge de status com terminologia do Flow, shortcut hint num campo de busca, label que reflete o modelo mental do desenvolvedor

Se alguém de fora consegue identificar que é Flow ao ver o screenshot — tem alma. Se parece um template genérico — foi entregue antes da hora.
