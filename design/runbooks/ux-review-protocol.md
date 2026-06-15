---
title: "UX Review Protocol — Flow Platform"
type: runbook
domain: platform
status: current
updated: 2026-05-22
---

# UX Review Protocol

> Protocolo de revisão de UX baseado nas 10 heurísticas de Nielsen, perspectiva HCD da IDEO e cognitive walkthrough.
> Executar após build, antes de revisão com stakeholders ou antes do ship.
> Pode ser executado manualmente ou delegado ao agente `ux-heuristic-critic`.

---

## Quando usar

| Contexto | Usar este protocolo |
|----------|---------------------|
| Após geração de protótipo | Sempre — antes de qualquer revisão |
| Antes de apresentação com stakeholders | Sim |
| Revisão de fluxo existente com mudança significativa | Sim |
| Revisão de componente isolado | Parcial — Fases 3 e 5 apenas |
| Code review de UI (tokens, lint) | Não — usar `design-system-linter` |

**Este protocolo avalia experiência — não código.** Para lint de código, tokens e padrões proibidos, usar `design-lint-rules.md` e o agente `design-system-linter`.

---

## Fase 1 — Contexto de avaliação

Antes de avaliar qualquer tela, responda:

```
Tela / fluxo avaliado: [nome]
Usuário-alvo: [perfil específico — não persona genérica]
Tarefa principal: [o que o usuário veio fazer]
Estado de entrada: [de onde o usuário vem]
Critério de sucesso: [quando a tarefa está concluída]
Versão avaliada: [URL, branch ou path do protótipo]
```

O contexto não é burocracia — sem ele, a avaliação julga a tela pelo que parece, não pelo que deve fazer.

---

## Fase 2 — Cognitive Walkthrough

Percorra a tarefa principal **como o usuário**, passo a passo. Para cada ação:

| Pergunta | Resposta |
|----------|----------|
| O usuário sabe o que precisa fazer aqui? | sim / não / parcial |
| O controle que executa a ação está visível? | sim / não / oculto |
| O controle comunica que é clicável/interativo? | sim / não |
| Após executar, o sistema confirma que deu certo? | sim / não / ambíguo |
| Se deu errado, o usuário sabe o que fazer? | sim / não |

**Mapear cada ruptura** — onde o walkthrough "tranca" é onde a heurística mais importante está sendo violada.

---

## Fase 3 — Avaliação por heurística (Nielsen)

Para cada heurística, classificar o estado atual e listar os problemas encontrados.

> **Eixo cognitivo:** para cada problema encontrado, identificar a lei cognitiva subjacente via [`laws-of-ux.md`](../craft/laws-of-ux.md). Ela fundamenta a severidade — "H8 violado por 7 opções primárias visíveis = Hick's Law + Choice Overload."

### H1 — Visibilidade do status do sistema
> O sistema informa o usuário sobre o que está acontecendo, em tempo hábil.

**O que verificar:**
- Loading states presentes e com indicador adequado ao tempo (ver `state-coverage.md`)
- Ações de IA com feedback de progresso ("Processando…", cursor de geração)
- Confirmações de ação executada (toast, banner inline, mudança visual imediata)
- Spinner com timeout definido — nunca indefinido

**Erros comuns:** ação executada sem feedback, loading sem indicador, IA gerando sem sinalização.

---

### H2 — Correspondência com o mundo real
> O sistema fala a língua do usuário — palavras, frases, conceitos familiares ao seu contexto.

**O que verificar:**
- Terminologia do produto vs. jargão técnico ou interno
- Labels de ação descrevem o resultado, não a mecânica ("Publicar bundle" vs "Submit")
- Ícones com significado cultural correto para o público
- Ordenação e agrupamento reflete modelo mental do usuário, não estrutura do sistema

**Erros comuns:** labels genéricos ("Salvar", "Confirmar"), CTA sem contexto, metáforas técnicas expostas ao usuário.

---

### H3 — Controle e liberdade do usuário
> O usuário pode sair de estados indesejados sem consequências.

**O que verificar:**
- Toda ação destrutiva tem confirmação antes de executar
- Wizard tem "Voltar" em todos os steps sem perder dados
- Modal/sheet tem caminho de saída claro (X, Cancelar, ESC)
- Ações de IA podem ser interrompidas ("Parar geração")
- Erros de formulário não limpam os campos preenchidos

**Erros comuns:** wizard sem "Voltar", destruição sem confirmação, geração de IA sem cancelamento.

---

### H4 — Consistência e padrões
> Mesmos conceitos, mesmas palavras, mesmos comportamentos em toda a interface.

**O que verificar:**
- Mesmo CTA para mesma ação em telas diferentes
- Toast em posição consistente entre telas
- Ícone representa o mesmo conceito em todo o produto
- Hierarquia tipográfica consistente entre screens do mesmo produto
- Sidebar ativa o item correto conforme mapeamento de produto

**Erros comuns:** "Salvar" em uma tela, "Gravar" em outra; toast em posição variável; ícone com duplo significado.

---

### H5 — Prevenção de erros
> Prevenir o problema antes que ele ocorra é melhor que boa recuperação.

**O que verificar:**
- Formulário bloqueia submit se campo obrigatório vazio
- Ação destrutiva irreversível tem confirmação com descrição do impacto
- Campo com formato específico tem máscara ou hint antes do erro
- Validação no blur — não no primeiro keystroke (ver `state-coverage.md`)
- Limite de caracteres visível antes de ser atingido

**Erros comuns:** submit sem validação, deletar sem confirmar impacto, hint aparecer só depois do erro.

---

### H6 — Reconhecimento em vez de memorização
> O usuário não deve precisar lembrar informação de uma parte para usar em outra.

**O que verificar:**
- Contexto da tarefa atual visível na tela sem precisar navegar para trás
- Dados relevantes para uma decisão aparecem junto à decisão
- Itens recentes ou frequentes acessíveis sem busca
- Wizard mostra o estado atual antes de pedir a próxima informação

**Erros comuns:** "confirmar" sem mostrar o que será confirmado, formulário longo sem resumo do progresso, breadcrumb ausente em fluxo profundo.

---

### H7 — Flexibilidade e eficiência de uso
> Atalhos para usuários experientes que não atrapalham iniciantes.

**O que verificar:**
- Ações críticas acessíveis via teclado além do mouse
- Filtros e busca disponíveis onde há volume de dados
- Ações em lote para operações repetitivas
- Estado anterior preservado ao retornar de um subfluxo

**Erros comuns:** tabela sem filtro quando há > 20 itens, ação que exige 5 cliques para usuário frequente, foco retorna para início após ação inline.

---

### H8 — Design estético e minimalista
> Cada elemento visual compete por atenção. Remover o que não serve a tarefa.

**O que verificar:**
- Apenas 1 elemento dominante por seção
- Informação terciária progressivamente revelada (tooltip, collapse, drill-down)
- Cor usada para significado, não decoração
- Máx. 2× accent coral por tela
- Ausência de ornamentos, gradientes, animações decorativas
- Copy sem padding verbal ("Clique aqui para…", "Por favor, insira…")

**Erros comuns:** dashboard com 6 KPIs de igual peso, badges decorativos sem estado, animação de entrada em lista operacional.

---

### H9 — Reconhecimento, diagnóstico e recuperação de erros
> Mensagens de erro em linguagem clara, com causa e solução.

**O que verificar:**
- Mensagem diz o que aconteceu (não "Algo deu errado")
- Mensagem diz por quê, quando conhecível
- Mensagem diz o que o usuário pode fazer (retry, alternativa, suporte)
- Retry com backoff exponencial após 3 tentativas (ver `state-coverage.md`)
- Input preservado após falha de submit
- Error ID copiável após 3 retries falhos

**Erros comuns:** "Error 500", "Tente novamente" sem contexto, campos limpados após erro de servidor.

---

### H10 — Ajuda e documentação
> Mesmo o melhor design às vezes precisa de suporte.

**O que verificar:**
- Tooltips disponíveis para conceitos não óbvios para o usuário-alvo
- Empty states explicam o que o usuário deve fazer (não "Sem dados")
- Mensagem de erro aponta para documentação ou suporte quando recuperação é complexa
- Wizard tem contexto do "por quê" de cada passo, não só o "o quê"

**Erros comuns:** empty state sem CTA, tooltip ausente em métricas calculadas, wizard sem contexto de valor por passo.

---

## Fase 4 — Perspectiva HCD (IDEO)

Três perguntas que enquadram a experiência além das heurísticas:

| Dimensão | Pergunta | Resposta |
|----------|----------|----------|
| **Desejabilidade** | O usuário vai querer usar isso — por que sim ou por que não? | |
| **Confiança** | O usuário vai confiar no que o sistema está fazendo — especialmente em features de IA? | |
| **Autonomia** | O usuário sente que está no controle ou que o sistema está fazendo coisas por ele? | |

**Para features com IA/agentes, avaliar adicionalmente:**
- O sistema deixa claro quando está processando com IA vs. executando ação determinística?
- O usuário pode verificar o resultado antes de confirmar?
- Existe caminho de saída se a IA gerar resultado errado?
- O vocabulário da feature usa "IA" como jargão ou como descrição de comportamento?

---

## Fase 5 — Craft modules check

Referência rápida dos módulos ativos. Para lint completo, usar o agente `design-system-linter`.

| Módulo | O que checar |
|--------|-------------|
| `anti-ai-slop.md` | P0s presentes: sidebar escura, ícone errado, border-l+rounded, tooltip escuro, CTA no scroll, hex fora do DS |
| `state-coverage.md` | 5 estados presentes: loading, empty, error, populated, edge |
| `typography-hierarchy.md` | 1 elemento dominante por seção, pelo menos 2 vetores de hierarquia ativos |
| `animation-discipline.md` | Sem "delight theater", transições ≤ 300ms, reduced-motion respeitado |
| `accessibility-baseline.md` | Labels em inputs, `:focus-visible` presente, contraste ≥ 4.5:1 body / 3:1 UI, touch targets ≥ 24×24 CSS px |
| `laws-of-ux.md` | Cada problema mapeado a uma lei cognitiva — fundamenta a severidade da violação heurística |

---

## Fase 6 — Output: Critique Document

Gerar `critique-[tela]-[data].md` com:

```markdown
## Critique — [Nome da tela] — [data]

**Contexto:** [quem, o quê, de onde]
**Avaliador:** [quem avaliou]

### Resumo executivo
[2–3 frases: o que está funcionando + o que bloqueia a entrega]

### Problemas por heurística

| # | Heurística violada | Localização | Descrição | Severidade | Recomendação |
|---|-------------------|-------------|-----------|------------|--------------|
| 1 | H1 — Visibilidade | Loading state | Spinner sem timeout — roda indefinidamente | Crítica | Adicionar timeout 60s + error state |
| 2 | H8 — Minimalismo | Header | 4 badges decorativos sem estado semântico | Média | Remover ou substituir por indicadores de estado |

### Top 3 prioridades
1. [problema mais crítico — bloqueia uso]
2. [problema de alta frequência — afeta maioria dos fluxos]
3. [problema de confiança — afeta percepção do sistema]

### Perspectiva HCD
- **Desejabilidade:** [avaliação]
- **Confiança:** [avaliação]
- **Autonomia:** [avaliação]

### O que está funcionando
[pontos fortes — hierarquia, estados, copy, fluxo]

### Craft modules — resultado
- anti-ai-slop P0s: [passou / falhou — listar os que falharam]
- state-coverage: [5 estados presentes / ausentes — listar]
- typography-hierarchy: [passou / falhou]
- animation-discipline: [passou / falhou]
- accessibility-baseline: [passou / falhou — listar violações B9–B12 / W11–W14]
- laws-of-ux: [leis identificadas por problema — ex: H8 = Hick's Law + Choice Overload]
```

---

## Escala de severidade

| Nível | Definição | Ação |
|-------|-----------|------|
| **Crítica** | Bloqueia a tarefa principal — o usuário não consegue completar o fluxo | Corrigir antes de qualquer revisão |
| **Alta** | Cria confusão significativa ou perda de confiança no sistema | Corrigir antes do ship |
| **Média** | Friction notável, mas o usuário consegue contornar | Corrigir no próximo ciclo |
| **Baixa** | Polimento — melhora a experiência mas não impede uso | Backlog de qualidade |

---

## Relação com outros documentos

| Documento | Relação |
|-----------|---------|
| [`design-lint-rules.md`](design-lint-rules.md) | Lint de código e tokens — complementar a este protocolo |
| [`craft/state-coverage.md`](../craft/state-coverage.md) | Referência para H1, H3, H9 |
| [`craft/anti-ai-slop.md`](../craft/anti-ai-slop.md) | Referência para H8 e Fase 5 |
| [`craft/typography-hierarchy.md`](../craft/typography-hierarchy.md) | Referência para H8 |
| [`ui-quality-bar.md`](ui-quality-bar.md) | Guardrails de alto nível — este protocolo os operacionaliza |
| [`ux-heuristic-critic`](~/.claude/agents/ux-heuristic-critic.md) | Agente que executa este protocolo de forma assistida |
| [`prd-ao-prototipo.md`](prd-ao-prototipo.md) | Etapa 8 usa este protocolo como estrutura de critique |
| [`craft/accessibility-baseline.md`](../craft/accessibility-baseline.md) | Referência para checagem de WCAG 2.2 AA na Fase 5 |
| [`craft/laws-of-ux.md`](../craft/laws-of-ux.md) | Eixo cognitivo — fundamenta severidade de cada violação heurística na Fase 3 |
