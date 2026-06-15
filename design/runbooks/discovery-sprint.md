---
title: Discovery Sprint
type: runbook
domain: platform
status: draft
updated: 2026-05-08
---

# Discovery Sprint

> Ritual de discovery acelerado com IA — do problema à spec de design.
> Para features novas, revisões de fluxo e decisões de prioridade — antes de qualquer protótipo final.
> Atualizado por: Bruna Urbina · Maio 2026

---

## O que é este documento

Um ritual estruturado para transformar demandas em decisões de design — antes de qualquer protótipo final ou especificação técnica.

Este não é um processo que o Claude executa sozinho. É uma prática que o designer conduz com o Claude como par crítico: um designer de produto experiente que questiona, reframes hipóteses e não deixa "achismo" passar sem nome.

---

## Quando usar

Use o Discovery Sprint quando:
- Uma nova feature ou revisão de fluxo está sendo solicitada
- O time ainda não tem clareza sobre qual problema está resolvendo
- Existe pressão para ir direto ao protótipo sem entendimento do problema
- Você precisa de um artefato claro antes de qualquer reunião de requisitos

**Não use aqui.** Para descobertas de produto novo, área desconhecida ou decisão estratégica de alto risco, use o [`discovery-brief.md`](discovery-brief.md) — o processo completo com múltiplas fontes e artefatos formais.

---

## O papel do Claude neste processo

O Claude atua como **designer de produto experiente e par crítico** — não como executor de instruções.

**O Claude vai:**
- Questionar hipóteses vagas antes de aceitar: *"isso é uma observação ou uma hipótese de causa?"*
- Recusar avançar sem evidência mínima: *"que dado ou feedback nos diz que isso é real?"*
- Identificar quando o time está descrevendo solução em vez de problema
- Propor reframings: *"e se o problema real fosse X?"*
- Perguntar *"como você testaria isso?"* antes de aceitar qualquer hipótese
- Gerar alternativas — não apenas a variante óbvia
- Rastrear suposições ativas ao longo de todo o processo

**O Claude não vai:**
- Gerar fluxos ou protótipos sem pelo menos uma hipótese clara documentada
- Avançar de etapa se o mínimo não foi atingido
- Tratar "achismo" como hipótese

---

## Estrutura de saída

```
/docs/discovery/[time]/[feature]/
  01-problema.md
  02-hipoteses.md
  03-exploracao.md
  04-validacao.md
  05-spec.md
```

O `05-spec.md` é o documento de decisão de design — não um PRD. Ele registra o que foi aprendido, as decisões tomadas e as evidências que as sustentam.

Convenção:
```
[time]    = core-experiences | chat | maker | findr | ops | etc.
[feature] = kebab-case
```

---

## Fluxo

```
Problema → Hipóteses → Exploração → Validação → Spec
```

Cada etapa depende da anterior. Não pule etapas.

---

## Ritual de alinhamento inicial (30–45 min)

Antes de iniciar o processo, reúna o time por 30–45 minutos para responder três perguntas:

1. **Qual comportamento do usuário está nos preocupando?**
   Não "queremos um fluxo X" — qual sinal (dado, feedback, observação) indica que algo está errado?

2. **Quem é o usuário mais crítico afetado por isso?**
   Não um persona genérico — um perfil específico com contexto de uso real.

3. **Que hipóteses de problema estão em jogo?**
   Liste ao menos duas antes de sair da reunião.

Ao final deste ritual, você tem o insumo para iniciar a **Etapa 1**.

---

## Estrutura do prompt para IA em discovery

Use este padrão ao trazer qualquer contexto para o Claude neste processo:

```
Contexto:    [quem, qual produto, qual problema, quem é o usuário]
Objetivo:    [o que você quer — priorizar, sintetizar, questionar, gerar]
Formato:     [lista, tabela, hipóteses, roteiro, mapa de estados]
Restrições:  [limites — máx. 5 hipóteses, foco em risco de negócio, sem jargão técnico]
```

---

## Etapa 1 — Problema

> **Pergunta central:** O que está acontecendo hoje e por que isso importa?

### O que o designer traz

Descrição livre da demanda: quem pediu, o que foi pedido, contexto disponível, dados existentes (NPS, feedbacks, sessões, entrevistas, suporte).

### O que o Claude faz

- Reestrutura a demanda como frase de problema centrada em comportamento do usuário
- Separa problema aparente de sintoma: sinaliza se o que foi descrito é efeito, não causa
- Aponta o que está implícito e o que está vago
- Pergunta o que falta: *"que dado confirma que isso está acontecendo de verdade?"*
- Recusa solução disfarçada de problema: *"você descreveu o que quer construir, não o que o usuário enfrenta"*
- Lista lacunas de contexto explicitamente

### Saída — `01-problema.md`

```
- Origem da demanda
- Problema como comportamento do usuário (não solução)
- Evidências disponíveis
- Impacto observável ou mensurável
- O que ainda é suposição
- Lacunas que precisam ser respondidas antes de gerar hipóteses
```

### Mínimo para avançar

O problema deve ser formulado como comportamento do usuário — não como feature, não como solução.

❌ "Queremos melhorar o fluxo de onboarding."
✅ "Usuários abandonam o onboarding antes de concluir o cadastro — especialmente no passo 3."

---

## Etapa 2 — Hipóteses

> **Pergunta central:** O que acreditamos sobre causa, comportamento e oportunidade?

### O que o designer traz

Suas crenças sobre por que o problema existe — mesmo que ainda sejam "achismos" não formalizados.

### O que o Claude faz

- Formata cada crença no modelo padrão de hipótese
- Distingue hipóteses de **problema** e hipóteses de **solução** — e separa as duas listas
- Pergunta para cada hipótese: *"como você testaria isso?"* e *"que evidência já temos?"*
- Avalia o conjunto: impacto × evidência disponível
- Prioriza: alta importância + baixa evidência = testar primeiro
- Desafia: *"essa hipótese pressupõe que o usuário sabe X — isso foi validado?"*
- Registra suposições ativas — o que está sendo assumido sem validação

**Modelo obrigatório de hipótese:**

```
Acreditamos que [usuário X] tem dificuldade em [situação Y]
porque [motivo Z].
Se isso for verdade, [métrica ou comportamento observável] deve mudar.
```

**Exemplos:**
```
✅ Acreditamos que desenvolvedores júnior têm dificuldade em configurar o pipeline
   porque as opções avançadas aparecem antes das básicas.
   Se isso for verdade, o tempo médio para primeiro deploy bem-sucedido deve cair.

✅ Acreditamos que usuários não cadastram integração com Jira
   porque não entendem o benefício antes de completar o formulário.
   Se isso for verdade, a taxa de abandono no passo 1 deve diminuir com copy mais claro.
```

**Matriz de priorização:**

| Hipótese | Importância p/ negócio | Evidência disponível | Prioridade |
|----------|----------------------|---------------------|------------|
| H1 | alta | pouca | testar primeiro |
| H2 | média | muita | explorar depois |
| H3 | baixa | nenhuma | descartar por ora |

### Saída — `02-hipoteses.md`

```
- Lista de hipóteses no modelo padrão
- Classificação: problema / solução / comportamento
- Avaliação: impacto × evidência
- Hipóteses priorizadas (1–2 para esta sprint)
- Suposições ativas registradas
```

### Mínimo para avançar

Ao menos **2 hipóteses testáveis** no modelo padrão. Ao menos **1 marcada como prioridade** para a exploração.

---

## Etapa 3 — Exploração

> **Pergunta central:** Que alternativas merecem ser testadas?

### O que o designer traz

As hipóteses priorizadas da Etapa 2.

### O que o Claude faz

Para cada hipótese prioritária, o Claude gera material de exploração — **baixa fidelidade, foco em raciocínio, não em polimento**:

- **Variações de fluxo** — 2 ou 3 abordagens diferentes para o mesmo problema
- **Mapa de estados** — vazio, carregando, erro, sucesso, edge cases relevantes para a hipótese
- **Simulações de tabela ou lista** — diferentes configurações de colunas e dados para testar compreensão e tomada de decisão
- **Reframings de solução** — alternativas que o time provavelmente não considerou
- **Perguntas de teste** — o que cada variação revela se a hipótese for verdadeira ou falsa

Para cada artefato gerado, o Claude registra:
- Qual hipótese está testando
- O que confirma se a hipótese for verdadeira
- O que invalida se a hipótese for falsa

O Claude não vai gerar um único fluxo "correto". O objetivo é criar material para pensar — não para implementar.

**Quando a hipótese envolve estrutura, layout ou arquitetura de informação**, executar a **Fase 3 do [`lo-fi-exploration.md`](lo-fi-exploration.md)** para gerar um wireframe HTML navegável como artefato de exploração. O arquivo `02-wireframe.html` resultante entra em `03-exploracao.md` como artefato adicional — e pode ser levado diretamente à Etapa 7 do `prd-ao-prototipo.md` se a estrutura for aprovada.

### Saída — `03-exploracao.md`

```
- Artefatos gerados por hipótese
- Para cada artefato: hipótese testada, o que confirma, o que invalida
- Alternativas descartadas e por quê
- Perguntas abertas que a exploração revelou
- [opcional] 02-wireframe.html — se exploração lo-fi foi executada
```

### Mínimo para avançar

Ao menos **2 alternativas exploradas**, cada uma mapeada a uma hipótese.

---

## Etapa 4 — Validação

> **Pergunta central:** O que aprendemos com usuários, stakeholders ou dados?

### O que o designer traz

Os artefatos da Etapa 3 levados a alguma forma de validação: entrevista, walkthrough, análise de feedback existente, fake door, teste com usuário real, revisão com stakeholder.

### O que o Claude faz

**Antes da validação** (se o designer pedir):
- Gera roteiro de entrevista baseado nas hipóteses priorizadas
- Sugere o tipo de teste mais adequado por hipótese:
  - `protótipo` — valida usabilidade com usuários reais
  - `fake door` — mede intenção antes de construir
  - `walkthrough` — valida compreensão de fluxo com stakeholder
  - `análise de feedback` — usa dados existentes para confirmar padrão
- Prepara script de síntese para análise posterior

**Depois da validação:**
- Organiza achados por hipótese: confirmada / invalidada / inconclusiva
- Identifica padrões entre fontes
- Atualiza suposições ativas — o que mudou, o que continua em aberto
- Registra conflitos entre o que usuários dizem e o que os dados mostram
- Pergunta: *"que decisão de design isso habilita?"*

### Saída — `04-validacao.md`

```
- Método de validação utilizado
- Achados por hipótese (confirmada / invalidada / inconclusiva)
- Padrões identificados
- Decisões habilitadas pelo aprendizado
- Suposições que continuam ativas
- O que ainda precisa ser validado (se houver)
```

### Mínimo para avançar

Ao menos **1 forma de validação** realizada. O aprendizado deve ser registrado como *"confirmamos X"*, *"invalidamos Y"* ou *"Y continua inconclusivo"* — nunca apenas *"fizemos uma entrevista"*.

---

## Etapa 5 — Spec

> **Pergunta central:** O que será implementado, por que foi escolhido e o que ficou em aberto?

### O que o designer traz

Todo o material produzido nas etapas anteriores.

### O que o Claude faz

Gera o Design Spec como **documento de decisão** — não como ordem de execução. Cada seção deve ser derivável dos artefatos anteriores. Se faltar dado, registra como `[a definir]`.

O Claude questiona ativamente durante a geração:
- *"Essa regra está apoiada em evidência ou ainda é suposição?"*
- *"Esse comportamento atual foi mantido por quê? Qual decisão o justifica?"*
- *"Esse edge case foi discutido ou é novo?"*

### Saída — `05-spec.md`

**Estrutura obrigatória:**

---

#### Problema resolvido

O que o usuário enfrentava, com evidência direta dos artefatos de contexto e validação.

---

#### Hipóteses consideradas

Lista de todas as hipóteses avaliadas — confirmadas, descartadas e por quê. Cada descarte deve ter justificativa baseada em evidência ou decisão consciente.

---

#### Comportamentos do sistema atual

O que será **mantido** / **alterado** / **eliminado** — com justificativa para cada decisão.
Nenhum comportamento deve permanecer sem que alguém tenha perguntado: *"isso está aqui por quê?"*

---

#### Fluxo principal escolhido

Sequência numerada do comportamento do sistema. Foco no que o sistema faz — não no UI.

---

#### Regras e edge cases

Comportamentos em cada estado relevante: vazio, erro, carregando, sucesso, edge cases identificados durante a exploração.

---

#### Evidência que sustentou as decisões

Referências diretas ao que foi aprendido na validação. Sem evidência → marcar como `[suposição ativa]`.

---

#### O que ainda está em aberto

Decisões não tomadas, dependências externas, perguntas sem resposta, suposições que seguem ativas e precisam ser validadas antes ou durante o desenvolvimento.

---

### Mínimo para concluir

Cada decisão de design deve ter evidência registrada ou ser explicitamente marcada como `[suposição ativa — validar antes do desenvolvimento]`.

---

## Rastreamento de suposições ativas

Em todas as etapas, o Claude mantém uma lista de suposições ativas — o que está sendo assumido sem validação. Esta lista é carregada de uma etapa para a próxima e transferida para a seção "O que ainda está em aberto" do `05-spec.md`.

**Formato:**

| Suposição | Etapa em que surgiu | Status |
|-----------|-------------------|--------|
| "O usuário sabe que pode editar esse campo" | Etapa 1 | aberta |
| "Usuários avançados preferem densidade de informação" | Etapa 2 | invalidada em Etapa 4 |
| "O fluxo atual é seguido linearmente" | Etapa 3 | aberta |

---

## Resumo

| # | Etapa | Pergunta central | Saída | Mínimo para avançar |
|---|-------|-----------------|-------|---------------------|
| 1 | Problema | O que está acontecendo e por que importa? | `01-problema.md` | Problema como comportamento do usuário |
| 2 | Hipóteses | O que acreditamos sobre causa e oportunidade? | `02-hipoteses.md` | 2 hipóteses testáveis + 1 priorizada |
| 3 | Exploração | Que alternativas merecem ser testadas? | `03-exploracao.md` | 2 alternativas mapeadas a hipóteses |
| 4 | Validação | O que aprendemos? | `04-validacao.md` | 1 forma de validação + aprendizado registrado |
| 5 | Spec | O que será implementado e por quê? | `05-spec.md` | Cada decisão com evidência ou suposição marcada |
