---
type: document
domain: platform
status: current
date: 2026-04-17
---

# PRD → Protótipo Navegável

Runbook de design assistido por IA. Executar em ordem. Cada etapa gera um artefato que alimenta a próxima.

---

## Fluxo geral

```
PRD  ←─────────────────────────────────── entrada padrão
Lo-fi wireframe aprovado  ←──────────────── entrada opcional (lo-fi-exploration.md Fase 4)
  └─ 1. Entender o problema real                    → 01-problem.md
  └─ 2. Mapear arquitetura da feature               → 02-feature-architecture.md
  └─ 3. Escolher shell correto                      → 03-shell-selection.md
  └─ 4. Buscar padrões existentes                   → 04-existing-patterns.md
  └─ 5. Gerar state matrix [craft: state-coverage]  → 05-state-matrix.md
  └─ 6. Gerar fluxo contínuo                        → 06-user-flow.md
  └─ 7. Criar protótipo [craft: todos os módulos]   → 07-prototype/
         ↑ opcional: lo-fi/[feature]/02-wireframe.html como guia de estrutura
  └─ 7b. Auto-crítica 5D [gate — score ≥ 3]         → score registrado
  └─ 8. Crítica heurística [craft + Nielsen]        → 08-critique.md
  └─ 9. Aplicar melhorias                           → 09-improvements.md
```

---

## Estrutura de saída

Todos os artefatos salvos em:

```
/docs/prototype/[nome-da-feature]/
  01-problem.md
  02-feature-architecture.md
  03-shell-selection.md
  04-existing-patterns.md
  05-state-matrix.md
  06-user-flow.md
  07-prototype/
  08-critique.md
  09-improvements.md
```

---

## Etapa 1 — Entender o problema real

**Input:** PRD da feature
**Output:** `01-problem.md`
**Dependências:** nenhuma

**Prompt:**
```
Analise esse PRD.

Retorne:
1. objetivo real do usuário (o que ele quer fazer, não o que o PRD pede)
2. objetivo do negócio
3. comportamento esperado do sistema
4. riscos de UX já identificáveis
5. classificação: nova feature / ajuste de feature existente / settings operacional

PRD: [colar aqui]
```

> Não avançar para a etapa 2 sem clareza do problema real.

---

## Etapa 2 — Mapear arquitetura da feature

**Input:** `01-problem.md`
**Output:** `02-feature-architecture.md`
**Dependências:** Etapa 1

**Prompt:**
```
Com base no problema identificado, classifique essa feature:

- tela global de settings
- fluxo dentro de produto existente
- nova área inteira no produto
- modal complementar a fluxo existente
- wizard temporário (multi-step com início e fim)

Explique:
- qual é a classificação e por quê
- qual é o impacto na navegação do produto
- quais áreas do produto ela toca ou quebra
```

> Erro clássico a evitar: misturar settings operacionais com fluxo de produto.

---

## Etapa 3 — Escolher shell obrigatório

**Input:** `02-feature-architecture.md`
**Output:** `03-shell-selection.md`
**Dependências:** Etapa 2

**Prompt:**
```
Com base na arquitetura da feature, escolha o shell correto entre os disponíveis:

- AppShell       → fluxo principal dentro de um produto
- SettingsShell  → configurações globais ou por produto
- ProductShell   → área nova de produto com navegação própria
- AdminShell     → área administrativa / gestão de plataforma
- WizardShell    → fluxo guiado com steps, início e conclusão definidos

Retorne:
- shell escolhido
- justificativa com base na arquitetura
- o que NÃO usar e por quê
```

> Nunca criar shell novo sem justificar e documentar. Reutilizar sempre que possível.

---

## Etapa 4 — Buscar padrões existentes

**Input:** `03-shell-selection.md` + codebase atual
**Output:** `04-existing-patterns.md`
**Dependências:** Etapa 3

**Prompt:**
```
Analise o projeto atual e liste o que já existe e pode ser reutilizado:

1. sidebars existentes (componente, localização no código)
2. páginas com layout similar ao que será construído
3. formulários similares (campos, validação, submit)
4. tabelas ou listas de dados similares
5. telas de settings similares

Para cada item, indique:
- onde está no projeto
- se pode ser reutilizado diretamente ou adaptado
- o que precisaria ser criado do zero
```

> Regra: Reuse first. Create later. Nunca criar componente novo se existe equivalente no projeto.

---

## Etapa 5 — Gerar state matrix

**Input:** `01-problem.md` + `06-user-flow.md` (quando disponível)
**Output:** `05-state-matrix.md`
**Dependências:** Etapas 1 e 2
**Craft:** [`state-coverage.md`](../craft/state-coverage.md) — thresholds de loading por duração, estados de IA, composição de empty state e error. Ler antes de gerar a matrix.

**Prompt:**
```
Para essa feature, gere a matriz completa de estados por rota/tela.

Para cada rota, cubra obrigatoriamente:
- loading (requisição em andamento — indicador varia por duração, ver thresholds abaixo)
- empty (sem dados — headline + explicação + CTA de próximo passo)
- error (falha — causa + ação de recovery + input preservado)
- populated (caso principal com dados reais)
- edge (volume extremo, strings longas, campos opcionais ausentes)
- validation error (erro de input do usuário)
- server error (falha de API)
- permission denied (usuário sem acesso)
- destructive confirmation (ações irreversíveis: deletar, desativar, revogar)

Se a feature tem agente, chat ou automação de IA, adicionar:
- thinking (agente processando)
- generating (output em streaming)
- ai error (modelo falhou ou timeout)
- waiting for input (agente aguarda resposta)
- paused (usuário interrompeu geração)

Thresholds de loading por duração esperada:
0–300ms → nenhum indicador | 300ms–2s → spinner | 2–10s → skeleton | 10–30s → progress+cancel | 60s+ → error com retry

Formato: tabela por rota, com coluna para cada estado aplicável.
```

> Estados devem acontecer dentro do fluxo real da mesma tela. Não criar tabs de cenário ou rotas separadas por estado.

---

## Etapa 6 — Gerar fluxo contínuo

**Input:** `01-problem.md` + `05-state-matrix.md`
**Output:** `06-user-flow.md`
**Dependências:** Etapas 1 e 5

**Prompt:**
```
Monte a jornada contínua do usuário para essa feature, cobrindo:

1. entrada (de onde o usuário vem, qual é o trigger)
2. ação principal (o que ele faz no centro do fluxo)
3. feedback do sistema (o que acontece após a ação)
4. erro (o que aparece se algo falhar)
5. retry (como o usuário tenta novamente)
6. conclusão (quando e como o fluxo termina)

Use as rotas reais de navegação do produto.
Indique pontos de fricção ou decisões de UX em aberto.
```

---

## Etapa 7 — Criar protótipo

**Input:** `01-problem.md`, `02-feature-architecture.md`, `03-shell-selection.md`, `04-existing-patterns.md`, `05-state-matrix.md`, `06-user-flow.md`
**Input opcional:** `lo-fi/[feature]/02-wireframe.html` — se existe exploração lo-fi aprovada (ver [`lo-fi-exploration.md`](lo-fi-exploration.md)), leia o HTML antes de gerar qualquer tela para entender a estrutura proposta
**Output:** `07-prototype/` (app React navegável)
**Dependências:** Etapas 1–6

**Craft modules — ler antes de qualquer código (gate de entrada):**

| Módulo | Path | O que bloqueia |
|--------|------|----------------|
| `anti-ai-slop` | `1 - strategy/design/craft/anti-ai-slop.md` | P0s — entrega bloqueada se presentes |
| `state-coverage` | `1 - strategy/design/craft/state-coverage.md` | 5 estados obrigatórios + thresholds |
| `typography-hierarchy` | `1 - strategy/design/craft/typography-hierarchy.md` | Contrato de entry point e ritmo |
| `animation-discipline` | `1 - strategy/design/craft/animation-discipline.md` | Motion budget e reduced-motion |
| `accessibility-baseline` | `1 - strategy/design/craft/accessibility-baseline.md` | WCAG 2.2 AA floor — contraste, touch targets, foco, semântica |
| `laws-of-ux` | `1 - strategy/design/craft/laws-of-ux.md` | Leis cognitivas que fundamentam cada decisão de composição |

Executar `/screen-design-research` para cada tela — definir direção visual (A/B/C) antes de codar.
Consultar `1 - strategy/design/rules/design-lint-rules.md` para BLOCKERs que impedem entrega.

**Prompt:**
```
Use Claude Code para gerar o protótipo React com base nos artefatos das etapas anteriores.

Antes de gerar qualquer tela, leia:
- 01-problem.md
- 02-feature-architecture.md
- 03-shell-selection.md
- 04-existing-patterns.md
- 05-state-matrix.md
- 06-user-flow.md

Regras obrigatórias:
1. usar o shell definido na etapa 3
2. usar a sidebar canônica existente no projeto
3. reutilizar componentes listados na etapa 4
4. não criar "scenario tabs" — estados ficam no fluxo real
5. cada estado da matrix (etapa 5) deve ser acessível por rota real
6. loading, empty e error devem acontecer no fluxo, não em telas separadas
7. CTAs sempre no footer fixo — nunca dentro do scroll container
8. foco em continuidade espacial (o usuário não deve se perder)
9. usar tokens do DS do projeto

Stack:
- React + TypeScript + Vite
- Tailwind CSS v3 — NÃO v4
- Radix UI (primitivos)
- react-icons/tb (Tabler Icons — único permitido)
```

---

## Etapa 7b — Auto-crítica 5 dimensões (gate obrigatório)

**Input:** `07-prototype/` (build concluído)
**Output:** score registrado antes de avançar
**Dependências:** Etapa 7

Após o build, executar o gate do `flow-prototype-builder` antes de avançar para a Etapa 8. Qualquer dimensão com score < 3 bloqueia — corrigir e re-avaliar antes de continuar.

| Dimensão | O que verifica |
|----------|---------------|
| **Hierarchy** | Entry point dominante por tela, pelo menos 2 vetores de hierarquia ativos, variação de espaçamento entre seções |
| **Execution** | Tokens corretos, sidebar branca, Tabler icons, nenhum padrão proibido do `design-lint-rules.md`; a11y básica: labels em inputs, `:focus-visible` presente, contraste ≥ 4.5:1 body |
| **States** | 5 estados presentes (loading, empty, error, populated, edge) + thresholds de loading corretos |
| **Specificity** | Sem copy filler, CTAs com verbo de ação específico, erro com causa + recovery |
| **Restraint** | Accent ≤ 2×, 1 CTA primário por tela, sem componentes ou métricas inventados |

Score 1–5 por dimensão. Formato de entrega obrigatório:
`Auto-crítica: Hierarchy 4 · Execution 5 · States 3 · Specificity 4 · Restraint 5`

---

## Etapa 8 — Crítica heurística

**Input:** `07-prototype/` + score da auto-crítica (Etapa 7b)
**Output:** `08-critique.md`
**Dependências:** Etapas 7 e 7b
**Craft:** [`state-coverage.md`](../craft/state-coverage.md) · [`typography-hierarchy.md`](../craft/typography-hierarchy.md) · [`anti-ai-slop.md`](../craft/anti-ai-slop.md) · [`accessibility-baseline.md`](../craft/accessibility-baseline.md) · [`laws-of-ux.md`](../craft/laws-of-ux.md)
**Protocolo:** [`ux-review-protocol.md`](ux-review-protocol.md) — referência completa das 10 heurísticas e perspectiva HCD

**Prompt:**
```
Critique esse protótipo como UX specialist sênior usando as 10 heurísticas de Nielsen como estrutura de avaliação.
Cada problema encontrado deve ser mapeado a uma heurística específica.

Antes das heurísticas, avalie as 3 dimensões HCD (IDEO):
- Desejabilidade: o design faz o usuário querer usar?
- Confiança: o usuário entende o que o sistema está fazendo — especialmente em features de IA?
- Autonomia: o usuário sente que está no controle ou que o sistema age por ele?

As 10 heurísticas (mapear cada problema a pelo menos uma):
H1 — Visibilidade do status do sistema
H2 — Correspondência com o mundo real
H3 — Controle e liberdade do usuário
H4 — Consistência e padrões
H5 — Prevenção de erros
H6 — Reconhecimento em vez de memorização
H7 — Flexibilidade e eficiência de uso
H8 — Design estético e minimalista
H9 — Reconhecimento, diagnóstico e recuperação de erros
H10 — Ajuda e documentação

Avalie também:
- Estados ausentes ou mal representados (ver state-coverage.md — 5 estados obrigatórios)
- Hierarquia tipográfica legível (ver typography-hierarchy.md — 1 entry point dominante)
- BLOCKERs do design-lint-rules.md visíveis no protótipo
- Para cada problema encontrado, identificar a lei cognitiva subjacente quando aplicável (ver `laws-of-ux.md`) — ela fundamenta a severidade. Ex: "H8 violado por 7 opções primárias visíveis = Hick's Law + Choice Overload."

Para cada problema:
- Heurística violada (H1–H10)
- Localização (tela / componente / estado)
- Descrição do problema
- Severidade: crítica / alta / média / baixa
- Recomendação de correção

Output obrigatório:
1. Tabela completa de problemas
2. Top 3 prioridades explicitadas
3. Perspectiva HCD (desejabilidade / confiança / autonomia)
4. O que está funcionando — não pular esta seção
```

> Pode ser delegado ao agente `ux-heuristic-critic` para execução estruturada com o `ux-review-protocol.md`.

---

## Etapa 9 — Aplicar melhorias

**Input:** `07-prototype/` + `08-critique.md`
**Output:** `09-improvements.md` + protótipo atualizado
**Dependências:** Etapas 7 e 8

**Prompt:**
```
Aplique as melhorias identificadas em 08-critique.md no protótipo.

Restrições:
- não refazer do zero
- não quebrar estrutura, rotas ou componentes existentes
- aplicar apenas as correções listadas, por ordem de severidade
- documentar cada mudança aplicada em 09-improvements.md
```
