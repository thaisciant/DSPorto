---
title: Canonical Screens — Flow Platform
type: reference
domain: platform
status: current
updated: 2026-04-17
---

# Canonical Screens — Flow Platform

Inventário de telas canônicas existentes nos protótipos. Usar como referência antes de criar novas telas.

> Regra: Reuse first. Create later. Verificar este inventário antes de criar qualquer tela nova.

---

## Portal / Hub

**Protótipo:** `docs/prototype/testes/novo-portal-app/`
- Home com grid de cards de produto
- Header com search centralizado + categorias horizontais

**Quando reutilizar:** qualquer hub de acesso, página inicial de produto, discovery

---

## Dashboard / Métricas

**Protótipo:** `docs/prototype/testes/aims-app/` — `DashboardOps`, `PerformanceView`, `AIImpactView`
- Dashboard com cards de métricas (KPIs)
- Estados cobertos: default, loading, empty, stale-warning, stale-critical, error, no-insights
- Drilldown: `/ops/drilldown/:metric` com versão loading

**Quando reutilizar:** qualquer tela de dados agregados, métricas de produto, observabilidade

---

## Lista / Tabela de dados

**Protótipo:** `docs/prototype/testes/aims-app/` — `TeamsList`, `TeamDetails`
- Lista com itens clicáveis e detalhe lateral

**Quando reutilizar:** listagens de entidades (times, projetos, bundles, integrações)

---

## Setup Wizard

**Protótipo:** `docs/prototype/testes/aims-app/` — `SetupView` (intent → wizard steps 1–4 → ready)
**Protótipo:** `docs/prototype/ops-csv-upload-app/` — wizard CSV 6 steps + ProjectSetupView

- Entry: tela de intenção antes de entrar no wizard
- Steps progressivos com stepper
- Ready/conclusão com pré-condições

**Quando reutilizar:** qualquer onboarding, configuração inicial, importação de dados

---

## Pipeline / Processo Linear

**Protótipo:** `docs/prototype/agentic-bus-sdlc/` — `PipelineStepper`
- 7 fases lineares com status por fase
- Visualização de progresso de pipeline

**Quando reutilizar:** SDLC, pipeline de deploy, fluxo de aprovação multi-step

---

## Browse / Catálogo

**Protótipo:** `docs/prototype/findr-bundles-app/`
- Shell Findr com sidebar + área de browse
- Cards de bundle com ações

**Quando reutilizar:** catálogo de soluções, marketplace interno, biblioteca de assets

---

## Settings

**Referência:** Flow app em produção (`/settings`)
- Sidebar de seções (Profile, Workspace, Integrations, Billing, API Keys)
- Formulários por seção
- Sem footer de CTA global (salva por seção)

**Quando reutilizar:** configurações de produto, preferências por usuário/tenant

---

## Process Monitor

**Protótipo:** `docs/prototype/testes/aims-app/` — `ProcessMonitor`
- Estados: default, error, running
- Monitoramento de processos em andamento

---

## Action Center (Overlay)

**Protótipo:** `docs/prototype/testes/aims-app/` — `ActionCenter`
- Drawer lateral overlay ativado via URL `?panel=action-center`
- Lista de ações/alertas pendentes com badge de contagem na sidebar
- Fechamento remove parâmetro da URL

**Quando reutilizar:** notificações, fila de aprovação, alertas contextuais

---

## Estados obrigatórios por tela

Para cada tela principal, cobrir:

| Estado | Descrição |
|--------|-----------|
| `default` | Estado inicial com dados |
| `loading` | Requisição em andamento (skeleton ou spinner) |
| `empty` | Sem dados para exibir (zero state com CTA) |
| `error` | Falha de API ou sistema |
| `success` | Ação concluída (toast, banner ou estado inline) |
| `validation-error` | Erro de input do usuário (inline, próximo ao campo) |
| `permission-denied` | Usuário sem acesso (tela de bloqueio com contexto) |
| `destructive-confirm` | Ação irreversível (modal de confirmação explícita) |
