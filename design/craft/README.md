---
title: "Craft — Regras universais de qualidade de UI"
type: reference
domain: platform
status: current
updated: 2026-05-22
---

# Craft — Flow Platform

Regras de craft são módulos independentes de qualidade de UI que se aplicam acima e além do design system. Elas não definem tokens ou componentes — definem **comportamento**, **disciplina** e **o que distingue UI desenhada com intenção de UI gerada por default**.

Inspirado no sistema `craft/` do Open Design (open-source). Adaptado ao contexto Flow Platform (B2B, desktop-first, ferramenta de trabalho).

---

## Módulos disponíveis

| Arquivo | ID | Aplica-se a | O que cobre |
|---------|-----|-------------|------------|
| [`anti-ai-slop.md`](anti-ai-slop.md) | `anti-ai-slop` | Todos | 7 pecados capitais de UI gerada por IA + soft tells + como adicionar alma |
| [`typography-hierarchy.md`](typography-hierarchy.md) | `typography-hierarchy` | Todos | Contrato de hierarquia tipográfica: entry points, ritmo, vetores, violações controladas |
| [`state-coverage.md`](state-coverage.md) | `state-coverage` | Qualquer surface com dados | 5 estados obrigatórios, thresholds de loading, estados de IA, composição de empty/error |
| [`animation-discipline.md`](animation-discipline.md) | `animation-discipline` | Qualquer UI com motion | Quando animar, durações por categoria, curva vs spring, reduced-motion |

---

## Como usar em skills e agentes

Skills e agentes declaram quais módulos precisam no frontmatter ou no início do prompt:

```
craft.requires: [anti-ai-slop, state-coverage]
```

O agente deve ler os arquivos declarados **antes** de gerar qualquer UI. A injeção é seletiva — uma skill que precisa só de hierarquia tipográfica não paga o custo de ler os outros.

**Uso explícito no prompt de geração:**

```
Antes de gerar esta tela, leia:
- 1 - strategy/design/craft/anti-ai-slop.md
- 1 - strategy/design/craft/state-coverage.md

Os P0 de anti-ai-slop bloqueiam entrega. Os 5 estados de state-coverage são obrigatórios.
```

---

## Quando usar cada módulo

| Contexto | Módulos recomendados |
|----------|---------------------|
| Qualquer protótipo Flow | `anti-ai-slop` + `state-coverage` |
| Dashboard / tabela de dados | `anti-ai-slop` + `state-coverage` + `typography-hierarchy` |
| Wizard / formulário multi-step | `anti-ai-slop` + `state-coverage` |
| View com animações ou transições | `anti-ai-slop` + `animation-discipline` |
| Review de qualidade (ui-critic) | Todos os módulos |

---

## Relação com outros documentos

| Documento | Relação |
|-----------|---------|
| [`ui-quality-bar.md`](../rules/ui-quality-bar.md) | Guardrails de alto nível (hierarquia, ações, estados, navegação, copy, consistência). Craft aprofunda os guardrails com regras checáveis |
| [`ds-guidelines.md`](../system/ds-guidelines.md) | Tokens, grid, posicionamento, interação. Craft opera acima do DS |
| [`design-system-linter`](~/.claude/agents/design-system-linter.md) | Agente de lint que usa os módulos craft como checklist de revisão |
| [`flow-prototype-builder`](~/.claude/skills/flow-prototype-builder/) | Skill de geração de protótipos — deve declarar `craft.requires` |

---

## Princípio geral

Craft não substitui julgamento — fornece **ancoragem**. As regras P0 são inegociáveis. As P1 são defaults fortes com exceções documentadas. As P2 são metas de polimento.

Quando uma regra parece conflitar com o brief, a regra P0 vence. Quando uma P1 conflita, documentar a exceção e justificar.
