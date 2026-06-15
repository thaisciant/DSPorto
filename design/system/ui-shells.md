---
title: UI Shells — Flow Platform
type: reference
domain: platform
status: current
updated: 2026-04-17
---

# UI Shells — Flow Platform

Inventário dos shells reais disponíveis para protótipos. Cada shell define estrutura de layout, navegação e contexto de uso.

> Regra: escolher o shell correto antes de gerar qualquer tela. Nunca criar shell novo sem documentar aqui.

---

## PortalShell

**Quando usar:** página inicial da plataforma, hub de acesso aos produtos, discovery de soluções.

**Estrutura:**
- Header fixo no topo (56px): logo Flow (esquerda) + search centralizado + create button + notificações + avatar (direita)
- Nav horizontal abaixo do header: categorias (For You, General Use, Management, Design…)
- Área de conteúdo: full-width, scroll livre, grid de cards

**Não tem:** sidebar lateral

**Referência no código:** `docs/prototype/testes/novo-portal-app/src/components/layout/Header.tsx`

**Exemplos no Flow:** `/` (home), Findr/Explore

---

## AppShell (ProductShell)

**Quando usar:** produto com navegação própria, fluxos dentro de um produto, views com contexto persistente.

**Estrutura:**
- Sidebar esquerda canônica: `w-[76px]`, `bg-white`, `border-r #edf2f7`
- Main area: `flex-1 flex flex-col overflow-hidden`
  - Header da view: `shrink-0`
  - Content: `flex-1 overflow-y-auto`
  - Footer (CTAs): `shrink-0` — **fixo, fora do scroll**

**Referência no código:** `docs/prototype/testes/aims-app/src/components/layout/Shell.tsx`

**Exemplos no Flow:** Chat, Steps, Ops/Metrics, Findr

---

## SettingsShell

**Quando usar:** configurações globais, configurações por produto, preferências do usuário.

**Estrutura:**
- Sidebar esquerda de settings: lista de seções com ícone + label
- Área de conteúdo à direita: formulários, toggles, listas configuráveis
- Sem footer fixo de CTA (salva inline ou por seção)

**Exemplos no Flow:** `/settings` (perfil, workspace, integrações, billing, API keys)

---

## WizardShell

**Quando usar:** fluxo guiado com início e fim definidos, onboarding, setup de feature, importação.

**Estrutura:**
- Stepper no topo ou lateral (indica steps e progresso)
- Área de conteúdo central (um step por vez)
- Footer fixo: botão Voltar (esquerda) + botão Avançar/Concluir (direita)
- Sem sidebar de navegação global

**Referência no código:** `docs/prototype/ops-csv-upload-app/` (6 steps), `docs/prototype/agentic-bus-sdlc/src/components/PipelineStepper.tsx`

**Exemplos no produto:** `ops-csv-upload-app`, qualquer setup wizard

---

## AdminShell

**Quando usar:** gestão de plataforma, área administrativa, backoffice.

**Estrutura:**
- Sidebar com navegação administrativa
- Área de conteúdo com tabelas, configurações de plataforma, gestão de usuários/tenants

**Nota:** não há protótipo de referência ainda. Usar AppShell como base até existir.

---

## Sidebar canônica — especificações

Todos os shells com sidebar usam a sidebar de `findr-bundles-app`.

**Arquivo:** `docs/prototype/findr-bundles-app/src/components/layout/Sidebar.tsx`

| Propriedade | Valor |
|-------------|-------|
| Largura | `w-[76px]` |
| Background | `bg-white` |
| Borda | `border-r border-[#edf2f7]` |
| Logo | Flow SVG 34×23px, container 76×76px |
| Botões | `w-[48px] h-[48px] rounded-lg` |
| Cor ativa | `bg-[#eef0f7] text-[#000050]` |
| Cor inativa | `text-[#000050] hover:bg-[#eef0f7]` |

**Nav top (gap-8):** Chat (`TbMessage`), Coders (`TbTerminal2`), Steps (`TbLayoutCards`), Maker (4-grid custom), Metrics (`TbChartPie`)

**Nav bottom (gap-8):** Findr (`TbTriangleSquareCircle`), News (`TbNews`), Help (`TbHelpSquareRounded`), Avatar (iniciais), Logout (`TbArrowBarToRight`)

### Mapeamento produto → item ativo

| Produto | Item ativo |
|---------|------------|
| Chat | `TbMessage` |
| Coders | `TbTerminal2` |
| Maker | 4-grid custom |
| Steps | `TbLayoutCards` |
| Ops / Metrics | `TbChartPie` |
| Findr | `TbTriangleSquareCircle` |

### Exceções — produtos SEM sidebar Flow

| Produto | Motivo |
|---------|--------|
| Coder | É uma IDE, não usa shell de navegação Flow |
| Agentic Bus | Produto novo, sem posicionamento na nav |
| AIMS | Produto independente com layout próprio |
