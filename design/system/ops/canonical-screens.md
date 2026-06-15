---
title: Canonical Screens — Flow Ops
type: reference
domain: ops
status: current
updated: 2026-05-21
---

# Canonical Screens — Flow Ops

Inventário de telas canônicas do Flow Ops. Verificar este inventário antes de criar qualquer tela nova.

> **Regra:** Reuse first. Create later. Toda tela nova deve ser justificada contra este inventário.

---

## Dashboard de Métricas

**Shell:** `OpsDashboardShell`

**Protótipos de referência:**
- `2 - plan/ops/flow-efficiency/design/prototype/ops-flow-efficiency/src/views/DashboardView.tsx`
- `2 - plan/ops/wip-aging/design/prototype/ops-work-item-age/src/views/DashboardView.tsx`
- `2 - plan/ops/cfd-flow-distribution/design/prototype/ops-cfd-flow-distribution/src/views/DashboardView.tsx`
- `2 - plan/ops/points-type/design/prototype/ops-points-type/src/views/DashboardView.tsx`

**Anatomia:**
- Left Metrics Nav com a métrica ativa selecionada
- Área principal com charts (Recharts), KPIs e tabelas de suporte
- Filter Bar lateral direita com filtros contextuais (Team, Project, Period)
- Topbar com timestamp "Last updated at…"

> **Cores de charts:** obrigatoriamente classes Tailwind CSS ou hex values do DS Flow. Ver [`ds-guidelines.md`](../ds-guidelines.md#10-visualização-de-dados-charts) para paleta e sequência de séries.

**Estados obrigatórios:** `default` · `loading` (skeleton) · `empty` · `error` · `stale-warning`

**Quando reutilizar:** qualquer nova métrica operacional (Cycle Time, Quality, Productivity)

### Padrão: MetricTitle (título + ícone da métrica)

Obrigatório no header da área principal de todo dashboard de métrica.

```tsx
<div className="flex gap-[6px] items-start">
  <h1 className="font-['DM_Sans'] font-bold text-[20px] text-[#000050] leading-[1.2] whitespace-nowrap">
    {metricLabel}
  </h1>
  <MetricIcon size={24} className="shrink-0 text-[#000050] mt-px" />
</div>
```

| Propriedade | Valor |
|-------------|-------|
| Container | `flex gap-[6px] items-start` |
| Fonte | `font-['DM_Sans'] font-bold text-[20px] text-[#000050] leading-[1.2] whitespace-nowrap` |
| Ícone | Tabler icon canônico da métrica (ver lista em `ui-shells.md`), `size={24}`, `mt-px` |
| Cor do ícone | `text-[#000050]` |

**Referência Figma:** `Data-Viz-Nativo` → node `9366:7728`

---

## Calculadora / Módulo de Cálculo

**Shell:** `OpsAppShell`

**Protótipo de referência:**
- `2 - plan/ops/bcp-calculator/design/prototype/ops-bcp-calculator-app/Fluxo Completo/src/views/MainViewV2.tsx`

**Anatomia:**
- Page title + subtitle no topo
- Link "Settings" no canto superior direito do conteúdo
- Tabs horizontais (ex: From Provider / From Spreadsheet)
- Área de filtros (date pickers + selects + botão Filter)
- Disclaimer/helper text abaixo dos filtros
- Tabs de resultado (ex: Issues for Calculation / History + badge de contagem)
- Tabela de resultados ou empty state

**Estados obrigatórios:** `default` · `loading` · `empty` · `error` · `success` (snackbar após cálculo)

**Quando reutilizar:** qualquer módulo de cálculo ou análise sobre issues

---

## Lista de Entidades

**Shell:** `OpsAppShell`

**Protótipos de referência:**
- `2 - plan/ops/csv-upload/design/prototype/ops-csv-upload-app/src/views/v1/ProjectsListView.tsx`
- `2 - plan/ops/points-type/design/prototype/ops-points-type/src/views/ProjectListView.tsx`

**Anatomia:**
- Back arrow na Topbar
- Page title
- Tabela DS com colunas sortáveis e filtráveis
- Botão "Add [Entity]" no canto superior direito da tabela
- Paginação no rodapé da tabela
- Ícones de ação por linha (editar `TbEdit`, sync `TbRefresh`)

**Estados obrigatórios:** `default` · `loading` · `empty` (zero state com CTA)

**Quando reutilizar:** Project Setup list, Team list, qualquer listagem de entidades configuráveis

---

## Formulário de Setup / Edição

**Shell:** `OpsAppShell`

**Protótipos de referência:**
- `2 - plan/ops/csv-upload/design/prototype/ops-csv-upload-app/src/views/v1/ProjectSetupView.tsx`
- `2 - plan/ops/csv-upload/design/prototype/ops-csv-upload-app/src/views/v1/EditProjectView.tsx`

**Anatomia:**
- Back arrow na Topbar
- Page title (ex: "Add Project")
- Card de formulário com seções (ex: Project Setup, Configure Workflow)
- Campos: radio buttons, selects, multi-selects, dropzones
- Footer fixo fora do scroll: botão Cancel (ghost) + botão Save (primary)

**Estados obrigatórios:** `default` · `loading` (submit) · `error` (validação inline) · `success` (snackbar + redirect)

**Quando reutilizar:** criação ou edição de qualquer entidade configurável (projeto, time, integração)

---

## Configuração com Sub-tabs

**Shell:** `OpsAppShell`

**Protótipo de referência:**
- `2 - plan/ops/team-size/design/prototype/ops-team-size-app/src/views/TeamSizeView.tsx`

**Anatomia:**
- Back arrow na Topbar
- Page title
- Tab bar horizontal (ex: Team Size / Members)
- Linha de filtros inline acima da tabela (Provider, Connector, Project Key, Team, Period, Goals)
- Botão "Save" alinhado à direita dos filtros
- Tabela DS com resultados filtrados

**Estados obrigatórios:** `default` · `loading` · `empty`

**Quando reutilizar:** settings de módulo com múltiplas seções relacionadas (Team Size + Members, Issues + History)

---

## Monitor / Log

**Shell:** `OpsAppShell`

**Protótipo de referência:** a ser criado (referência atual: produto em produção)

**Anatomia:**
- Back arrow na Topbar
- Page title (ex: "Process Monitor")
- Tabela DS com colunas: Provider, Project Key, Process, Start Date, Status
- Badge de status por linha (Failed, Success, Running)
- Paginação no rodapé

**Estados obrigatórios:** `default` · `loading` · `empty` · `error` (linha com status Failed + detalhes no hover)

**Quando reutilizar:** histórico de execuções, logs de sync, audit trail

---

## Regras visuais de charts

Aplicam-se a todos os dashboards de métricas (Recharts ou qualquer biblioteca de visualização).

### Labels inline no gráfico

```css
color: #4B5563;
font-size: 12px;
font-weight: 400;
line-height: 16px;
```

Em Tailwind: `text-xs leading-4 text-[#4B5563]`

### Tooltips de charts e KPIs

```css
color: #6B7280;
text-align: center;
font-size: 12px;
font-weight: 400;
line-height: 16px;
```

Em Tailwind: `text-xs leading-4 text-[#6B7280] text-center` no `Tooltip.Content`

| Elemento | Estilo |
|----------|--------|
| Título dentro do tooltip | `font-semibold text-[#000050]` |
| Destaques em negrito | `text-[#000050]` |
| Seta (arrow) | **Proibido** — DS Flow usa só card arredondado, sem seta |
| Tooltip sem título | Quando o contexto é autoexplicativo (ex: tooltip do título de um gráfico) |

### Cores de charts

Obrigatoriamente classes Tailwind CSS ou hex values do DS Flow — sem valores hexadecimais arbitrários. Ver sequência canônica de séries e cores semânticas em [`ds-guidelines.md`](../ds-guidelines.md#10-visualização-de-dados-charts).

---

## Estados obrigatórios por tela

Para cada tela nova, cobrir:

| Estado | Descrição |
|--------|-----------|
| `default` | Estado inicial com dados |
| `loading` | Requisição em andamento (skeleton ou spinner) |
| `empty` | Sem dados (zero state com CTA contextual) |
| `error` | Falha de API ou sistema |
| `success` | Ação concluída (snackbar ou banner inline) |
| `validation-error` | Erro de input (inline, próximo ao campo) |
| `destructive-confirm` | Ação irreversível (modal de confirmação explícita) |
