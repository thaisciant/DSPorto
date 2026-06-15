---
title: "Craft — State Coverage"
type: craft
domain: platform
status: current
updated: 2026-05-22
craft.id: state-coverage
craft.applies-to: all
---

# State Coverage — Flow Platform

Regras universais sobre quais estados todo surface interativo deve renderizar. O `design-system.md` decide como cada estado *parece*; este arquivo decide quais estados devem *existir* e o que devem conter.

A falha mais frequente de UI gerada por IA é entregar apenas o estado populado.

> Baseado no `craft/state-coverage.md` do Open Design + Guardrail 3 do `ui-quality-bar.md` Flow. Complementa, não substitui, as regras existentes.

---

## Os cinco estados obrigatórios

Todo surface que busca, transforma ou aceita dados deve renderizar os cinco.

| Estado | Disparado quando | Deve conter |
|--------|-----------------|-------------|
| **Loading** | Dados em trânsito | Skeleton, spinner ou shell — + fallback "demorando mais que o esperado" após 15s |
| **Empty** | Sem registros ainda, ou query retornou vazio | Headline, explicação objetiva, CTA de próximo passo |
| **Error** | Fetch falhou, erro de servidor, rejeição de validação | Causa em linguagem clara, ação de recovery, input do usuário preservado |
| **Populated** | Dados presentes, caso principal | O estado para o qual o design foi feito |
| **Edge** | Volume extremo, strings longas, campos opcionais ausentes, conteúdo parcial | Layout que não quebra |

**Matriz de teste edge.** Cenários concretos que o surface deve sobreviver:

| Tipo de tela | Cenário edge |
|-------------|-------------|
| Dashboard / tabela | 10.000+ linhas, todas colunas numéricas, sort + filter aplicados |
| Card / lista | Título com 200 chars, avatar ausente, CTA secundário ausente |
| Formulário | Todos os campos opcionais vazios, todos obrigatórios no max length |
| Resultados de busca | Query de 1 char, query só com chars especiais, 1.000+ resultados |
| Detail view | Todos os metadados opcionais ausentes |

---

## Thresholds de loading

Escolher o indicador pela duração esperada — não pelo que está disponível na biblioteca.

| Duração | Indicador |
|---------|-----------|
| 0–300ms | Nenhum. Renderizar síncronamente — usuário não percebe o atraso |
| 300ms–2s | Spinner sutil ou skeleton |
| 2–10s | Skeleton que espelha o layout esperado, ou spinner com label ("Carregando métricas…") |
| 10–30s | Progress bar determinada com opção de cancelar |
| 30–60s | Progress bar + aviso de "demorando mais que o esperado" (que já apareceu aos 15s — não repetir) |
| 60s+ | Parar animação. Mostrar erro com retry, cancelar ou continuar |

**Nunca deixar spinner rodando indefinidamente.** Todo request deve ter timeout.

---

## Estados de formulário

Formulários adicionam três estados sobre os cinco.

| Estado | Disparado quando | Comportamento |
|--------|-----------------|---------------|
| **Untouched** | Campo ainda não teve foco | Estilo default, sem mensagens de validação |
| **Dirty (válido)** | Usuário digitou e campo passa na validação | Helper text persiste, sem cor de sucesso |
| **Submitted-pending** | Submit clicado, aguardando servidor | Botão entra em loading state, campos bloqueiam para re-submit |

**Timing de validação:** validar **no blur**, não no primeiro keystroke. Para campos com validação live (ex: disponibilidade de nome), validar a cada keystroke *somente após o primeiro blur*. Remover a mensagem de erro assim que o input se tornar válido.

---

## Estados de IA (Flow-específico)

Surfaces com agentes, chat ou automações adicionam estados próprios.

| Estado | Disparado quando | Deve mostrar |
|--------|-----------------|--------------|
| **Thinking** | Agente processando, ainda sem output | Animação de "thinking" + label "Processando…" |
| **Generating** | Agente emitindo resposta em streaming | Texto sendo renderizado progressivamente, animação de cursor |
| **AI Error** | Modelo falhou ou timeout | Snackbar `error` + "Tentar novamente" + opção de cancelar |
| **Waiting for input** | Agente aguardando resposta do usuário | Campo ativo, nenhum loader |
| **Paused** | Usuário interrompeu geração | Botão "Continuar" disponível, output parcial visível |

Regras adicionais:
- Sempre oferecer "Parar geração" durante outputs longos
- Nunca executar ação automaticamente sem confirmação explícita (ex: não criar card no Jira sem o usuário clicar)
- Distinguir visualmente: mensagem do usuário / resposta do agente / ação do sistema

---

## Composição do estado empty

Empty não é ausência de estado — é um estado com trabalho a fazer.

| Tipo | Composição |
|------|-----------|
| **First-use empty** | Headline + valor explicativo + CTA primário. O empty é o momento de onboarding |
| **No-results empty** | Ecoar a query, sugerir alternativas — nunca deixar blank verdadeiro |
| **Cleared empty** | Phrasing celebratório, próxima ação opcional |
| **Error-as-empty** | Nunca. Erro é estado próprio com informação de recovery — não colapsar em empty |

Exemplos Flow:
- ✅ `"Nenhum bundle criado ainda. Crie o primeiro para distribuir recursos ao seu time."`
- ❌ `"No data"` / `"Sem resultados"` sem contexto ou ação

---

## Composição do estado de erro

Todo erro deve responder três perguntas, nesta ordem:

1. **O que aconteceu.** `"Não foi possível publicar o bundle."` — não `"Algo deu errado."`
2. **Por quê, se conhecível.** `"Verifique sua conexão."` ou `"O nome já existe."`
3. **O que o usuário pode fazer.** Botão de retry, caminho alternativo, ou link de suporte.

**Preservar o input do usuário** após falha de submit. O formulário não pode limpar os campos.

Severidade por scope:

| Nível | Scope | Padrão Flow |
|-------|-------|-------------|
| **Field-level** | Campo individual | Borda vermelha + mensagem inline + foco move para o campo |
| **Form-level** | Formulário inteiro | Banner de erro no topo + marcadores por campo |
| **Section-level** | Seção da view | Painel inline com retry, seções vizinhas ainda funcionais |
| **Page-level** | View completa | Estado de erro full com ilustração + CTA de recovery |
| **App-level** | Funcionalidade crítica perdida | Banner persistente ou modal |

**Disciplina de retry:**
- Primeiro retry: imediato
- Segundo e terceiro: backoff exponencial (2s, 4s, 8s)
- Após 3 retries falhos: substituir "Tentar novamente" por "Contatar suporte" + error ID copiável
- Mostrar "Última tentativa: Xs atrás" após o primeiro retry

---

## ARIA e focus em mudanças de estado

| Mudança | ARIA | Ação de foco |
|---------|------|-------------|
| Erro inline no submit | `role="alert"` na mensagem | Mover foco para o primeiro campo com erro |
| Toast / confirmação não urgente | `role="status"` (polite live region) | Não mover foco |
| Erro crítico ou confirmação destrutiva | `role="alertdialog"` (assertive) | Mover foco para o dialog |
| Loading começa | `role="status"` anunciando "Carregando…" | Não mover foco para o spinner |
| Loading termina, conteúdo aparece | — | Mover foco para o conteúdo carregado se a ação foi iniciada pelo usuário |

Live region containers devem existir no DOM antes do conteúdo ser injetado.

---

## Erros comuns a detectar no lint

- Surface renderiza só o estado populado — loading, empty, error e edge ausentes
- Empty state é um blank literal ou `"Sem dados"` sem headline, explicação ou ação
- Mensagem de erro diz `"Algo deu errado"` sem causa ou recovery
- Spinner sem timeout — roda indefinidamente em requests lentos ou com falha
- Submit limpa campos do formulário em caso de falha de validação
- Validação inline dispara no primeiro keystroke em vez de no blur
- Loading full-page substitui o chrome quando apenas uma seção está carregando
- Toast aparece em posição diferente de toasts anteriores na mesma tela
- Cor como único sinal de estado de erro — sem ícone, sem label de texto
- Toast auto-dismiss não pode ser pausado no hover ou focus (viola WCAG 2.2.1)
