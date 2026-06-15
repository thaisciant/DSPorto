---
title: UI Shells — Flow Ops
type: reference
domain: ops
status: current
updated: 2026-05-21
---

# UI Shells — Flow Ops

Inventário dos shells disponíveis para protótipos do Flow Ops. Escolher o shell correto antes de criar qualquer tela. Nunca criar shell novo sem documentar aqui.

> **Dependência:** todos os shells do Ops herdam a **Flow Sidebar** (76px) documentada em `1 - strategy/design/system/ui-shells.md`.

---

## OpsAppShell

**Quando usar:** qualquer página do Ops que não seja dashboard de métricas — BCP Calculator, Project Setup, Project List, Team Size, Process Monitor.

**Estrutura:**

```
┌────────────────────────────────────────────────────┐
│ Flow Sidebar (76px) │ OPS Topbar (h-14)             │
│                     ├──────────────────────────────│
│                     │ Conteúdo full-width            │
│                     │ (scroll livre)                 │
└────────────────────────────────────────────────────┘
```

**OPS Topbar — especificações:**

| Elemento | Valor |
|----------|-------|
| Altura | `h-[76px]` — alinhado com a área do logo na Flow Sidebar |
| Background | `bg-white` |
| Borda | `border-b border-neutral-200` |
| Padding | `px-6` |
| Título | `font-extrabold text-[24px] text-[#00053c]` (DM Sans) |
| Back arrow | `TbArrowLeft` — aparece quando há navegação de retorno |
| Menu de navegação | `TbGridDots` — hover reveal → OpsMenu |

**OpsMenu (clique no TbGridDots):**

Popover card que abre ao clicar no `TbGridDots`. Estado gerenciado localmente no Topbar.

| Elemento | Valor |
|----------|-------|
| Card | `bg-white border border-[#e5e7eb] rounded-2xl shadow-lg w-[280px]` |
| Padding interno | `p-3`, itens `px-4 py-[10px] rounded-[10px]` |
| Item ativo | `bg-[#000050] text-white font-bold` |
| Item inativo | `text-[#000050] font-bold hover:bg-[#eef1f7]` |
| Ícone por item | `size={20}` |
| Seção "Settings" | Label `font-bold text-[14px] text-[#000050]` com `pt-3 pb-1 px-4` |
| Fechar | Backdrop invisible `fixed inset-0` captura o clique fora |

Nav principal:

| Item | Ícone |
|------|-------|
| Dashboard | `TbPresentationAnalytics` |
| Process Monitor | `TbHeartRateMonitor` |
| Portfolio Governance | `TbScale` |
| BCP Calculator | `TbCalculator` |

Seção Settings:

| Item | Ícone |
|------|-------|
| Project Setup | `TbBuildingCog` |
| Team Setup | `TbUsersGroup` |

**Referência no código:** `2 - plan/ops/bcp-calculator/design/prototype/ops-bcp-calculator-app/Fluxo Completo/src/components/layout/AppShell.tsx`

**Exemplos no Ops:** BCP Calculator, Project List, Add Project, Team Size, Process Monitor

---

## OpsDashboardShell

**Quando usar:** dashboards de métricas operacionais — qualquer tela com charts, indicadores e filtros contextuais.

**Estrutura:**

```
┌────────────────────────────────────────────────────────────────┐
│ Flow Sidebar (76px) │ OPS Topbar (h-14)                        │
│                     ├──────────────────┬────────────┬─────────│
│                     │ Left Metrics Nav │ Main Area  │ Filter  │
│                     │ (~220px)         │ (flex-1)   │ Bar     │
│                     │                 │            │ (~280px)│
│                     │ Lista de        │ Charts /   │         │
│                     │ métricas        │ KPIs /     │ Filtros │
│                     │ disponíveis     │ Dashboards │ ativos  │
└────────────────────────────────────────────────────────────────┘
```

**Topbar (OpsDashboardShell) — diferença em relação ao OpsAppShell:**

| Elemento | Valor |
|----------|-------|
| Timestamp | `TbCalendarStats` + "Last updated at **{data}**." + "Auto-updates every 6 hours." |
| Posição | Alinhado à direita, antes do `TbGridDots` |
| "Last updated at" | `text-[13px] text-[#6B7280]` |
| Data/hora | `font-semibold text-[#00053c]` inline no mesmo `<span>` |
| Sublinha | `text-[11px] text-[#9CA3AF]` |
| `TbGridDots` | Toggle do Left Metrics Nav — `h-9 w-9 rounded-xl` |

**Left Metrics Nav — especificações:**

| Elemento | Valor |
|----------|-------|
| Tipo | Card flutuante (não painel fixo com border-r) |
| Largura | `w-[217px]` expandido · `w-[80px]` colapsado |
| Padding | `px-4 py-6` expandido · `px-[16px] py-6` colapsado |
| Margem | `m-4` (flutua dentro do layout) |
| Background | `bg-[#eef1f7]` |
| Borda | `border border-[#e5e7eb]` |
| Border radius | `rounded-[14px]` |
| Sombra | `drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]` |
| Collapse toggle | `TbArrowBarLeft` (expandido) · `TbArrowBarRight` (colapsado) |
| **Card item ativo** | `bg-[#000050] text-white` |
| **Card item habilitado** | `bg-white text-[#000050] hover:bg-[#eef1f7]` |
| **Card item desabilitado** | `bg-white text-[#000050] opacity-60 cursor-not-allowed` |
| Cards | `h-12 rounded-[14px] border border-[#e5e7eb] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]` |
| Ícone por card | `size={24}`, `shrink-0` |
| Label por card | `font-bold text-[16px] leading-[1.2]` (DM Sans) · oculto quando colapsado |
| Tooltip (colapsado) | Radix Tooltip · side `right` · `bg-white border border-[#e5e7eb] text-xs text-[#6B7280] rounded-lg` |
| Conteúdo | Lista canônica de métricas — ver tabela abaixo |

**Left Metrics Nav — lista canônica (ordem obrigatória):**

| # | Label | Ícone (react-icons/tb) |
|---|-------|------------------------|
| 1 | Productivity | `TbChartHistogram` |
| 2 | Throughput | `TbChartInfographic` |
| 3 | Cycle Time | `TbChartDots3` |
| 4 | WIP/Aging | `TbHourglass` |
| 5 | CFD & Flow Distribution | `TbChartAreaLine` |
| 6 | Flow Efficiency | `TbChartBar` |
| 7 | Story Maturity | `TbStars` |
| 8 | Quality | `TbChartArrowsVertical` |

Fonte canônica: `2 - plan/ops/cfd-flow-distribution/design/prototype/ops-cfd-flow-distribution/src/components/layout/MetricsNav.tsx`

**Right Filter Bar — especificações:**

| Elemento | Valor |
|----------|-------|
| Largura | `~280px`, fixo ou colapsável |
| Background | `bg-white` |
| Borda | `border-l border-[#E9ECEF]` |
| Conteúdo | Filtros contextuais da métrica ativa (Team, Project, Period, etc.) |

**Main Area:**

- `flex-1`, scroll vertical livre
- Background: `bg-[#F9FAFB]`
- Padding interno: `p-6`
- Contém: charts, KPIs, tabelas de suporte

**Exemplos no Ops:** Flow Efficiency, WIP Aging, CFD — Flow Distribution, Productivity Trend

> Protótipo de referência canônico: `2 - plan/ops/cfd-flow-distribution/design/prototype/ops-cfd-flow-distribution/src/components/layout/`

---

## Favicon — padrão obrigatório

Todo protótipo OPS deve usar o ícone do Flow Ops como favicon — nunca o default do Vite (`vite.svg`) ou ícones inline.

| Item | Valor |
|------|-------|
| Arquivo canônico | `1 - strategy/design/system/ops/favicon.svg` |
| Formato | SVG — 3 segmentos de donut chart, cor `#000050` |
| Como aplicar | 1. Copiar `favicon.svg` para `public/` do protótipo<br>2. `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` no `<head>` do `index.html` |

```html
<!-- index.html — obrigatório em todo protótipo OPS -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

Protótipos já configurados: BCP Calculator, CFD, CSV Upload, Flow Efficiency, Points Type, Quality, WIP Aging.

---

## Regras gerais

- **Sidebar Flow** é sempre herdada — nunca recriar em protótipos OPS
- **Topbar OPS** é a mesma em ambos os shells — não criar variações
- **Back arrow** aparece em qualquer view que tenha retorno (Add Project, Edit Project, Process Monitor, Team Size)
- **Footer fixo** (Cancel + Save) é padrão de formulários — não faz parte do shell, é responsabilidade da view

### Largura do conteúdo (obrigatório em todos os shells)

| Camada | Valor |
|--------|-------|
| **Main div** | `width: 100%` — ocupa todo o espaço disponível após a sidebar |
| **Conteúdo interno** | `max-w-screen-2xl mx-auto` — limite de 1536px em resoluções maiores |
| **Card principal de conteúdo** | `border border-[#E9ECEF]` — sem sombra |

Não usar `max-w-5xl`, `max-w-7xl` ou outros valores fixos sem decisão de design explícita.
