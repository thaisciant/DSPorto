---
title: DS Mapping — Flow Design System × Produtos
type: document
domain: platform
status: current
updated: 2026-05-06
---

# DS Mapping — Flow Design System × Produtos

Conecta cada componente do Flow Design System ao produto real: onde usar, como adaptar e quando evitar — para manter consistência, reduzir retrabalho e acelerar decisões de design e front-end.

**DS principal:** `pnigiPYeQnFwQieRYcLmof` — Flow Design Language  
**Codebase:** `@ci-t-hyperx/flow-ds` v2.8.7  
**Code Connect mapeado:** `findr-bundles-app/src/figma.code-connect.ts`  
**Atualizado em:** 2026-05-06

---

## Legenda de status

| Símbolo | Significado |
|---------|-------------|
| ✅ | Match — DS → codebase → protótipo alinhados |
| ⚠️ | Gap parcial — existe mas com variante ou nome divergente |
| ⛔ | Ausente no DS — implementado localmente ou inexistente |

---

## 1. Ações e Interação

### Button

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | `button` / `Button` — node `115:2171` |
| **Codebase** | `Button` (Atom) |
| **Status** | ✅ Match |
| **Variantes DS** | Type: Primary, Secondary, Success, Destructive, Brand × Style: Filled, Outline, Ghost × Size: Medium, Large × State: Default, Hover, Disable, Loading |
| **Variantes React** | `primary` `secondary` `success` `outline` × size: `sm` `md` `lg` |
| **Onde usar** | CTAs principais (Findr, Ops, AIMS), footer de wizards, confirmações de dialog, headers de página |
| **Adaptações** | `sm` e `md` → DS `Size=Medium`; `lg` → DS `Size=Large`. `Brand` e `Ghost` disponíveis no codebase mas sem uso nos protótipos atuais |
| **Evitar** | Não usar `outline` como CTA principal. Não criar botão custom quando uma das 12 variantes cobre o caso |

### Icon Button

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | `icon button` — sem node mapeado |
| **Codebase** | `IconButton` (Atom) |
| **Status** | ⚠️ Gap de naming (lowercase no DS, PascalCase no código) |
| **Variantes** | Sizes: small, medium, large × States: default, hover, active, disabled |
| **Onde usar** | Toolbars, ações inline em cards, headers de seção |
| **Evitar** | Não usar `Button` com ícone no lugar de `IconButton` |

---

## 2. Dados e Exibição

### Badge

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | `Badge rounded` — node `679:3556` / `Badge new` — node `2442:2115` |
| **Codebase** | `Badge` (Atom) |
| **Status** | ⚠️ Gap nas variantes de maturidade |
| **Variantes DS** | Type: With label, Dot × Style: Light, Dark, Brand |
| **Variantes React** | `info` `warning` `success` `error` `outline` `updated` `poc` `beta` `stable` |
| **Onde usar** | Status de bundle/solution (Findr), estados de sistema, contadores, labels de maturidade |
| **Adaptações** | `poc` `beta` `stable` não existem no DS. Usar **Color Tag** (node `4424:1014`) ou criar variante no DS — são específicas do Findr |
| **Evitar** | Não usar Badge para representar contexto ou papel de usuário (ex: "Designer", "Dev") — Badge representa estado do sistema |

### Tag

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | `Tag` |
| **Codebase** | `Tag` (Atom) |
| **Status** | ✅ Match |
| **Variantes** | Default, Removable, Color-coded |
| **Onde usar** | Categorização e filtros no Findr, labels de engine |
| **Distinção com Badge** | Tag é interativa/removível. Badge é read-only. Não misturar |

### Avatar

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | `Avatar` |
| **Codebase** | `Avatar` (Atom) |
| **Status** | ✅ Match |
| **Variantes** | Default 40px, com status indicator, com initials fallback |
| **Onde usar** | Headers, listas de time, feeds de atividade, Avatar menu |
| **Nota** | Sidebar canônica usa Avatar com iniciais do criador do protótipo |

### Skeleton / Loading

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | `Loading` (componente único) |
| **Codebase** | `Loading` + `Skeleton` + `SkeletonWrapper` + `ShimmerText` (4 Atoms) |
| **Status** | ✅ Resolvido (expandido no codebase) |
| **Onde usar** | Listas de bundle/solution carregando, dashboards do AIMS, pipelines do Ops |
| **Adaptação** | Usar `Skeleton` para placeholders visuais, `Loading` para spinners. No DS Figma é componente único — qualquer representação é válida ao prototipar |
| **Evitar** | Não usar loading onde o estado pode ser empty state — dado ausente ≠ dado em carregamento |

---

## 3. Feedback e Notificações

### Snackbar

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | `Snackbar` — node `238:4108` |
| **Codebase** | `Snackbar` (Molecule) |
| **Status** | ✅ Match perfeito |
| **Variantes DS** | status: flow, warning, info, error, success × variant: subtle, solid |
| **Variantes React** | `success` `error` `info` |
| **Onde usar** | Confirmação de ação concluída, erros de sistema, feedbacks transitórios (auto-dismiss) |
| **Distinção com Banner** | Snackbar é transitório (auto-dismiss). Banner é persistente (dismiss manual) |
| **Evitar** | Não usar para mensagens que requerem ação do usuário — usar Dialog ou Banner |

### Banner

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | Não documentado no Figma |
| **Codebase** | `Banner` (Molecule) |
| **Status** | ⚠️ Presente no codebase e nos protótipos Ops, sem node mapeado no DS |
| **Onde usar** | Alertas persistentes (Ops CSV Upload, Team Size), avisos de configuração, estados que requerem atenção contínua |
| **Evitar** | Não usar Banner para feedbacks transitórios → usar Snackbar |

### Tooltip

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | `Tooltip` |
| **Codebase** | `Tooltip` (Atom, Radix-based) |
| **Status** | ✅ Match |
| **Variantes** | Top, Bottom, Left, Right |
| **Onde usar** | Botões icon-only (obrigatório para acessibilidade), texto truncado, informações complementares |
| **Evitar** | Não usar como substituto de label — label deve ser visível por padrão |

---

## 4. Formulários e Entrada

### Input

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | `input` — node `120:3248` / `Search` — node `208:6216` |
| **Codebase** | `Input` (Atom) |
| **Status** | ✅ Match |
| **States DS** | Default, Focused, Error, Success, Disabled, Only view, Completed |
| **Onde usar** | Formulários de criação (Findr Bundles, AIMS config), campos de busca |
| **Adaptação** | Input com ícone de busca → mapeia para DS `Search` (node `208:6216`), não para `input` base |

### TextArea

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | Não documentado |
| **Codebase** | `TextArea` (Atom) |
| **Status** | ⛔ Sem node no DS Figma |
| **Onde usar** | Campos de descrição longa, configurações de prompt no AIMS |

### Select / Dropdown

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | `Dropdown menu` |
| **Codebase** | `Dropdown` (Atom) + `DropdownSearchable` (Molecule) |
| **Status** | ✅ Match (com extensão searchable) |
| **Onde usar** | Seletores de filtro (Findr, Ops), configurações com opções fixas |
| **Adaptação (Radix)** | Adicionar `relative` no Trigger e `className="hidden"` nos ScrollButtons para evitar bugs de overflow |
| **MultiSelect** | Implementado localmente no `ops-csv-upload-app` — sem equivalente no DS. Candidato a Molecule |

### Switch

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | Não documentado |
| **Codebase** | `Switch` (Atom) |
| **Status** | ⚠️ Existe no codebase, sem node Figma |
| **Onde usar** | Toggles de configuração (AIMS settings, Ops preferences) |

---

## 5. Navegação

### Side Menu / Sidebar

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | `Side menu` — node `5016:1071` / `Sidebar item` — node `5016:1290` |
| **Codebase** | Produto-específico (não no DS compartilhado) |
| **Status** | ✅ Match no DS Figma — implementação produto-específica |
| **Regra canônica** | Usar SEMPRE a sidebar de `findr-bundles-app` como base em todos os protótipos Flow (exceto Coder, Agentic Bus e AIMS) |
| **Spec** | `w-[76px]`, `bg-white`, border `#edf2f7`. Item ativo: `bg-[#eef0f7]`. Botões: `w-[48px] h-[48px] rounded-lg text-[#000050]` |
| **Evitar** | Não recriar — copiar de `findr-bundles-app/src/components/layout/Sidebar.tsx`. Não usar no AIMS (shell próprio) |

### NavigationMenu / Nav Container

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | `Nav container` / `.nav container item` |
| **Codebase** | `NavigationMenu` (Atom, Radix-based) |
| **Status** | ✅ Match |
| **Onde usar** | Navegação interna de produto (tabs horizontais, sub-navegação) |

### Breadcrumb

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | Não documentado no DS principal |
| **Codebase** | `Breadcrumb` (Atom) |
| **Status** | ⚠️ Implementado nos protótipos, sem node mapeado no DS |
| **Onde usar** | Hierarquias de navegação profundas (Findr detail views, AIMS) |

---

## 6. Layout e Estrutura

### Dialog / Modal

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | `dialog/dialog` — node `580:249` |
| **Codebase** | `Dialog` (Atom, Radix-based) |
| **Status** | ✅ Match |
| **Nota DS** | Componente único no DS (sem variantes de tamanho documentadas) |
| **Onde usar** | Confirmações de ação crítica, formulários inline, review de bundle |
| **Evitar** | Não usar para feedback transitório → Snackbar. Não usar para painéis de detalhe → Sheet |

### Sheet / Slide Panel

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | Não documentado |
| **Codebase** | `Sheet` (Atom) |
| **Status** | ⚠️ Presente no codebase, sem node no DS. Alta relevância para AIMS |
| **Onde usar** | Detalhes de bundle/solution sem sair do contexto, companion sidebar, painéis de configuração no AIMS |

### Card / CardButton

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | `Product Card` / `CTA Card` |
| **Codebase** | `Card` + `CardButton` (Atoms) |
| **Status** | ✅ Match (base genérica — Product Card e CTA Card compostos no app) |
| **Onde usar** | Cards de bundle/solution no Findr, cards de produto no portal, CTAs de onboarding |

### Table

| Campo | Detalhe |
|-------|---------|
| **DS (Figma)** | Referenciado no Style Guide (tipografia table) |
| **Codebase** | `Table` (Atom) + `Pagination` (Molecule) |
| **Status** | ✅ Resolvido |
| **Onde usar** | Listagens do Ops, dados tabulares no AIMS, histórico de instalações |

---

## 7. Componentes Específicos de Produto (fora do DS)

| Componente | Produto | Status | Recomendação |
|------------|---------|--------|--------------|
| `WizardShell` + `Stepper` | Ops CSV Upload | ⛔ Produto-específico | Candidato a Molecule se o padrão se repetir em outros wizards |
| `CsvDropzone` | Ops CSV Upload | ⛔ Produto-específico | Manter local — muito específico para promover |
| `DevModeDrawer` | Todos os protótipos | ⛔ Protótipo only | Não promover — artefato de design, não de produto |
| `Maturidade / Maturity` | Ops, AIMS | ⛔ Produto-específico | Avaliar promoção ao DS com i18n (renomear para `Maturity`) |
| `AiButton` | AIMS | ⚠️ No codebase, sem Figma | Alta prioridade para documentar no DS — relevância crescente |
| `Prompt` | Chat, Steps, AIMS | ⚠️ No codebase, sem Figma | Alta prioridade — componente central para produtos de IA |

---

## 8. Gaps Críticos — Em Aberto

| Gap | Severidade | Impacto | Recomendação |
|-----|-----------|---------|--------------|
| **Empty State** | Alta | Findr (lista vazia), Ops (sem dados), AIMS (sem métricas) | Criar `EmptyState` Atom: ilustração + mensagem + CTA opcional |
| **Error State** | Alta | Falhas de API em todos os produtos | Criar `ErrorState` Atom para erros de sistema e boundaries |
| **Badge variantes maturidade** | Média | Findr — poc/beta/stable | Criar variante no DS ou usar Color Tag (node `4424:1014`) |
| **MultiSelect** | Média | Ops CSV Upload | Promover como Molecule no DS |
| **Banner sem node Figma** | Baixa | Ops | Documentar `Banner` no arquivo Figma do DS |
| **AiButton sem node Figma** | Média | AIMS | Documentar no DS — componente central para IA |

---

## 9. Cobertura por Produto

| Produto | Cobertos pelo DS | Implementados localmente | Gaps críticos |
|---------|-----------------|--------------------------|---------------|
| **Findr Bundles** | Button, Badge, Input, Dialog, Snackbar, Sidebar, Tooltip, Card, Breadcrumb | Badge (maturidade), DevModeDrawer, ReviewDialog | Empty State, Badge poc/beta/stable |
| **Ops CSV Upload** | Button, Badge, Snackbar, Banner, Sidebar | WizardShell, Stepper, CsvDropzone, MultiSelect, DevModeDrawer | Empty State, Error State |
| **Ops Team Size** | Button, Badge, Snackbar, Banner, Tooltip, Skeleton, Sidebar | DevModeDrawer | Empty State, Error State |
| **AIMS** | Button, Badge, Input, Dialog, Snackbar, Card, Table, Sheet | AiButton (?), Prompt (?), shell próprio | Layout/nav indefinidos, AiButton e Prompt sem Figma |

---

*Referências: [`component-inventory.md`](component-inventory.md) · [`design-system.md`](design-system.md) · Code Connect: `findr-bundles-app/src/figma.code-connect.ts`*
