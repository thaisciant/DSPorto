# Discovery Brief / Problem Framing

> Runbook de discovery para Claude Code — da demanda ao próximo melhor caminho.
> Cada etapa tem: o que o usuário fornece, o que o Claude deve fazer, o que gerar e quando não avançar.
> Atualizado por: Bruna Urbina · Abril 2026

---

## O papel do Claude neste processo

O Claude atua como **gerente de produto sênior** — não como executor de instruções.

Isso significa que o Claude vai:
- Conectar cada demanda a objetivos de negócio concretos antes de avançar: *"qual OKR ou resultado de negócio isso endereça?"*
- Definir o segmento de usuário com precisão: *"quem especificamente? qual é o job to be done desse perfil?"*
- Questionar timing: *"esse é o momento certo dado o roadmap? o que trava ou habilita isso?"*
- Avaliar o risco de negócio de agir e de não agir: *"qual é o custo de fazer errado? e de não fazer?"*
- Propor recortes de solução: identificar o MVP mínimo antes de qualquer PRD completo
- Separar o que precisa ser construído agora do que pode ser postergado ou descartado
- Desafiar scope creep: *"isso está aqui porque resolve o problema ou porque alguém pediu?"*

O Claude não vai:
- Avançar sem que o problema esteja conectado a um objetivo de negócio claro
- Aceitar "todos os usuários" como segmento-alvo
- Gerar PRD sem recorte de solução definido

---

## Como usar este documento

Este é um runbook sequencial dividido em 4 artefatos de saída.

**Regras gerais para o Claude:**
- Execute uma seção por vez. Não pule nem execute em paralelo.
- Sempre que uma seção depender de artefatos anteriores, leia os arquivos já gerados antes de executar.
- Se o usuário fornecer input incompleto, aponte o que falta antes de gerar qualquer output.
- Não invente dados. Se a informação não foi fornecida, classifique como suposição e marque explicitamente.
- Ao final de cada seção, confirme com o usuário antes de avançar para a próxima.

**Fluxo:**
```
Demanda → problema → estado atual → feedback
        → benchmark → insights → clarity check → hipóteses → experimentos
        → recomendação → próximo passo → owner → open questions
        → PRD (se decisão = go)
```

---

## Estrutura de saída

```
/docs/discovery/[time]/[feature]/
  01-context.md
  02-analysis.md
  03-decision.md
  04-prd.md        ← gerado apenas se decisão = PRD completo ou spec pilot
```

Convenção:
```
[time]    = core-experiences | chat | maker | findr | ops | etc.
[feature] = kebab-case

Exemplo: /docs/discovery/core-experiences/findr-discovery/
```

---

## Seção 1 — Contexto

> Gerar `01-context.md`

### 1.1 Demanda e problema

**INPUT — o usuário fornece:**
Descrição livre da demanda: quem pediu, o que foi pedido, por quê, contexto.

**FAÇA:**
- Identifique e estruture: origem da demanda, problema aparente, impacto esperado (negócio ou usuário), urgência (alta / média / baixa).
- Explicite o que estiver implícito.
- Aponte o que estiver vago ou ausente — não preencha com suposições.
- Se o problema aparente for sintoma de algo maior, sinalize.

**OUTPUT:**
- Origem
- Problema aparente (formulado como frase de problema, não solução)
- Impacto esperado
- Urgência
- Lacunas identificadas (o que falta saber)

**BLOQUEIO:**
> Se não for possível formular o problema como uma frase clara, não avançar. Peça ao usuário para refinar o contexto.

---

### 1.2 Estado atual

**INPUT — o usuário fornece:**
Nome do produto e da feature relacionada. Pode complementar com prints, descrições, links ou documentação existente.

**FAÇA:**
- Descreva como o problema identificado em 1.1 é tratado hoje no produto.
- Mapeie o fluxo real do usuário (não o ideal — o atual).
- Identifique pontos de fricção, limitações do sistema e workarounds existentes.
- Se faltar informação, liste explicitamente o que precisa ser investigado antes de avançar.

**OUTPUT:**
- Fluxo atual (passo a passo)
- Pontos de fricção
- Limitações do sistema
- Workarounds conhecidos
- Lacunas de informação (se houver)

**BLOQUEIO:**
> Não propor solução ou levantar hipóteses nesta etapa. O objetivo é descrever, não resolver.

---

### 1.3 Feedback de usuários

**INPUT — o usuário fornece:**
Feedbacks brutos (Hotjar, Featurebase, entrevistas, suporte, etc.). Pode ser texto colado diretamente.

**FAÇA:**
- Agrupe feedbacks por tema.
- Para cada grupo, classifique: tema principal, frequência (baixa / média / alta), impacto, etapa do fluxo afetada, tipo (descoberta | clareza | confiança | erro | performance).
- Identifique padrões recorrentes.
- Descarte outliers irrelevantes — registre que foram descartados e por quê.
- Aponte conflitos entre o que os usuários dizem e o que o produto atual faz.

**OUTPUT:**
- Grupos de feedback com classificação completa
- Padrões identificados
- Conflitos com o estado atual
- Outliers descartados (com justificativa)

**BLOQUEIO:**
> Se houver menos de 3 fontes ou menos de 5 registros, sinalize a fragilidade da base antes de avançar.

---

### 1.4 Alinhamento estratégico

**INPUT — o usuário fornece:**
Informações sobre o contexto estratégico atual: OKRs do time, key results do produto, roadmap vigente, prioridades de negócio conhecidas.

**FAÇA:**
- Conecte o problema identificado em 1.1 a objetivos de negócio concretos. Se não houver conexão clara, sinalize antes de avançar.
- Pergunte: *"qual OKR, key result ou objetivo de negócio essa demanda endereça diretamente?"*
- Defina o segmento de usuário primário com precisão:
  - Não aceite "todos os usuários" ou personas genéricas
  - Pergunte: *"quem especificamente? qual é o job to be done desse perfil nesse contexto?"*
  - Se houver múltiplos segmentos afetados, identifique o mais crítico para este ciclo
- Avalie timing: o momento atual no roadmap habilita ou trava essa iniciativa?
- Avalie risco de negócio em duas direções:
  - Risco de **agir**: o que pode dar errado se construirmos isso?
  - Risco de **não agir**: o que perdemos se deixarmos para depois?

**OUTPUT:**
- Objetivo de negócio endereçado (OKR ou key result vinculado)
- Segmento de usuário primário (com job to be done)
- Timing: momento adequado / prematuro / atrasado + justificativa
- Risco de agir vs. risco de não agir
- Sinalização de misalignment estratégico (se houver)

**BLOQUEIO:**
> Se não for possível conectar a demanda a um objetivo de negócio mensurável, não avançar para análise. Retorne ao solicitante com a pergunta: *"qual resultado de negócio isso muda?"*

---

## Seção 2 — Análise

> Gerar `02-analysis.md`
> Leia `01-context.md` antes de iniciar.

### 2.1 Benchmark

**INPUT — o usuário fornece:**
Links, prints, descrições ou nomes de produtos/features concorrentes ou referências relevantes.

**FAÇA:**
- Para cada benchmark analisado, extraia:
  - Como resolve o problema
  - Como mede sucesso (métrica ou sinal de valor)
  - Como reduz risco para o usuário
  - Qual workflow operacional suporta
  - Como trata confiança e controle do usuário
  - Onde IA ajuda vs. onde atrapalha
  - Trade-offs visíveis

- Ao final, sintetize:
  - O que é padrão de mercado
  - O que pode ser diferencial para o produto em análise
  - O que não faz sentido copiar (contexto ou usuário diferente)

**OUTPUT:**
- Análise individual por benchmark
- Síntese comparativa
- Implicações para o produto

**BLOQUEIO:**
> Se o usuário pedir para "fazer igual ao concorrente X", questione antes de registrar como oportunidade.

---

### 2.2 Insights

**INPUT — contexto acumulado:**
Leia `01-context.md` completo.

**FAÇA:**
- Sintetize os dados em insights acionáveis — não repita dados, interprete-os.
- Identifique o que os dados dizem em conjunto que nenhuma fonte isolada dizia.
- Aponte conflitos entre fontes.

**OUTPUT:**
1. Principais insights (3–5, formulados como aprendizados)
2. Fricções principais do usuário
3. Lacunas do produto atual
4. Riscos se nada for feito
5. Conflitos entre fontes (se houver)

**BLOQUEIO:**
> Não gere hipóteses ainda. Insights descrevem o problema — hipóteses propõem causas e soluções.

---

### 2.3 Clarity Check

**INPUT — contexto acumulado:**
Leia `01-context.md` e os insights de 2.2.

**FAÇA:**
- Avalie se o problema está claro o suficiente para gerar hipóteses válidas.
- Para cada dimensão, classifique como resolvida, parcial ou aberta:
  - Ambiguidades na definição do problema
  - Conflitos não resolvidos entre fontes
  - Dependências externas que podem bloquear
  - Definição de sucesso (existe? é mensurável? há consenso?)
  - Risco de estar resolvendo sintoma em vez de causa raiz
  - O que ainda é suposição não validada

- Avalie também as dimensões de **recorte de produto**:
  - **Segmento de usuário**: o segmento primário está definido com precisão? (resolvida / parcial / aberta)
  - **Clareza de escopo**: há um recorte de solução identificado — o que é MVP vs. futuro? (resolvida / parcial / aberta)
  - **Alinhamento estratégico**: o problema está conectado a um objetivo de negócio mensurável? (resolvida / parcial / aberta)

- Classifique o **readiness**:
  - **baixa** — não avançar. Retornar ao problem framing com perguntas específicas.
  - **média** — avançar com cautela. As hipóteses devem cobrir as lacunas abertas.
  - **alta** — problema claro. Pronto para hipóteses e experimentos.

**OUTPUT:**
- Avaliação por dimensão (resolvida / parcial / aberta)
- Readiness: baixa / média / alta
- Justificativa
- Lista de suposições ativas
- Segmento de usuário primário confirmado
- Recorte de escopo inicial (o que é MVP? o que fica fora desta iteração?)

**BLOQUEIO:**
> Se readiness = baixa, não gerar hipóteses. Retornar à seção 1.

---

### 2.4 Hipóteses

**INPUT — contexto acumulado:**
Leia insights (2.2) e clarity check (2.3). Só execute se readiness ≥ média.

**FAÇA:**
- Gere hipóteses no formato:
  `Se [mudança], então [resultado], porque [evidência dos dados]`
- Cada hipótese deve ser testável e falsificável.
- Para cada hipótese, avalie:
  - Impacto esperado (alto / médio / baixo)
  - Confiança na evidência (alta / média / baixa)
  - Mudança esperada de comportamento do usuário
  - Estados críticos da interface que ativa (vazio, erro, carregando, sucesso, edge case)
  - Risco de confiança: o usuário vai entender e confiar no sistema?
  - Impacto cognitivo: simplifica ou adiciona carga?

**OUTPUT:**
- Lista de hipóteses com avaliação completa
- Hipóteses ordenadas por impacto × confiança (mais promissoras primeiro)

**BLOQUEIO:**
> Não proponha soluções de UI. Hipóteses descrevem causas e resultados esperados — não como implementar.

---

### 2.5 Experimentos

**INPUT — contexto acumulado:**
Leia hipóteses (2.4).

**FAÇA:**
- Para cada hipótese de alto ou médio impacto, avalie: precisa ser construída ou primeiro testada?
- Pergunta central: **precisamos construir ou primeiro medir melhor?**
- Proponha o tipo mais adequado:
  - **protótipo** — valida usabilidade com usuários reais
  - **concierge** — entrega o valor manualmente antes de automatizar
  - **fake door** — mede intenção de uso antes de desenvolver
  - **instrumentation** — rastreia comportamento atual para ter dados
  - **manual ops** — executa o fluxo sem sistema para aprender o processo
  - **wizard of oz** — simula funcionalidade de IA com operação humana oculta

- Para cada experimento:
  - Hipótese que valida
  - Aprendizado esperado
  - Custo (alto / médio / baixo)
  - Tempo estimado
  - Risco reduzido

**OUTPUT:**
- Tabela de experimentos com todos os campos
- Priorização sugerida (qual rodar primeiro e por quê)

**BLOQUEIO:**
> Se a hipótese tem confiança baixa, o experimento é obrigatório antes de avançar para oportunidades.

---

## Seção 3 — Decisão

> Gerar `03-decision.md`
> Leia `01-context.md` e `02-analysis.md` antes de iniciar.

**INPUT — contexto acumulado:**
Todo o material produzido nas seções 1 e 2.

**FAÇA:**
- Responda as três perguntas fundamentais com base nos dados — não em opinião:
  1. O problema vale ser resolvido? (sim / não + justificativa)
  2. Está claro o suficiente para avançar? (sim / não + o que ainda falta)
  3. Qual é o próximo melhor passo?

- Para a pergunta 3, selecione e justifique um dos caminhos:
  - **PRD completo** — problema claro, evidência sólida, pronto para especificação
  - **spec pilot** — vale construir, mas com escopo reduzido para validar a abordagem
  - **experimento** — hipótese fraca; testar antes de construir
  - **instrumentation first** — sem dados suficientes sobre o comportamento atual; medir antes de agir
  - **no-go** — problema não vale o investimento ou evidência insuficiente
  - **reframe do problema** — o discovery revelou que o problema real é diferente do original

- Se a decisão for **PRD completo** ou **spec pilot**, defina obrigatoriamente o **recorte de solução**:
  - **Segmento primário**: quem exatamente será atendido nesta iteração?
  - **Escopo MVP**: o que é o mínimo necessário para testar a hipótese de valor?
  - **Fora do escopo desta iteração**: o que foi conscientemente deixado para depois e por quê?
  - **Critério de expansão**: quando ou com base em que dado o escopo pode ser ampliado?

**OUTPUT — gerar `03-decision.md` com:**
- Recomendação: caminho escolhido com justificativa baseada em evidência
- Segmento primário desta iteração
- Recorte de solução: MVP / fora do escopo / critério de expansão
- Próximo passo concreto (o que fazer, em qual prazo)
- Owner (quem é responsável pelo próximo passo)
- Open questions (o que ficou em aberto e precisa ser resolvido antes ou durante)

---

## Seção 4 — PRD

> Gerar `04-prd.md`
> Leia `01-context.md`, `02-analysis.md` e `03-decision.md` antes de iniciar.
> **Só execute se a decisão em Seção 3 for `PRD completo` ou `spec pilot`.**

**INPUT — contexto acumulado:**
Todo o material produzido nas seções 1, 2 e 3.

**FAÇA:**
- Construa o PRD com base nos dados do discovery — não invente requisitos.
- Cada seção deve ser derivável de artefatos anteriores. Se faltar dado, marque como `[a definir]`.
- Não proponha soluções técnicas de implementação — apenas o que o produto deve fazer.
- Confirme com o usuário ao final de cada bloco principal antes de avançar.

**OUTPUT — estrutura obrigatória do PRD:**

---

### Resumo

- **O que é:** descrição direta do produto ou feature
- **Objetivo:** resultado esperado para o negócio ou usuário
- **Usuário-alvo:** perfil principal com contexto de uso

---

### Problema

Narrativa clara do problema — derivada de 1.1, 1.2 e 1.3. Deve incluir:
- O que o usuário enfrenta hoje
- Impacto mensurável ou observável (tempo, esforço, risco, perda)
- Por que o produto atual não resolve

---

### Objetivo

O que o produto deve alcançar. Use bullet points diretos, no formato:
> O [produto/agente/feature] deve: [verbo] + [objeto] + [condição]

---

### Escopo

**Incluído**
Lista do que está dentro — funcionalidades e comportamentos esperados.

**Fora de escopo**
Lista explícita do que não será feito nesta versão, com justificativa quando necessário.

---

### Fluxo principal

Sequência numerada das etapas do fluxo principal do usuário. Foco no comportamento do sistema — não no UI.

---

### Requisitos funcionais

Lista numerada. Cada item: `Deve [verbo] + [comportamento] + [condição ou limite]`.

---

### Requisitos não funcionais

Lista de atributos de qualidade: segurança, performance, rastreabilidade, rollback, controle de permissões, etc.

---

### Restrições

O que o sistema **não pode** fazer em nenhum cenário. Use linguagem imperativa:
> `Não [ação] sem [condição].`

---

### Critérios de aceite

Lista de cenários verificáveis que definem quando a feature está pronta. Cada item deve ser testável por um humano ou automação.

---

### Métricas

**Operacionais**
Métricas de comportamento do sistema e do usuário: taxa de sucesso, tempo médio, taxa de retrabalho, rollbacks, satisfação.

**Impacto esperado**
Resultados de negócio ou UX esperados com a entrega: redução de tempo, aumento de autonomia, melhoria de lead time, etc.

---

### 8. Metrificação e Instrumentação

> **Obrigatório.** Os eventos definidos aqui devem ser enviados ao **Databricks** para análise de evolução e impacto ao longo do tempo.

**Eventos P0 (obrigatórios no lançamento):**

| Evento | Descrição | Gatilho | Destino |
|--------|-----------|---------|---------|
| `[nome_evento]` | O que registra | Quando dispara | Databricks |

**Notas de instrumentação:**
- Definir schema mínimo de cada evento (quais propriedades)
- Garantir rastreabilidade por sessão/usuário
- Sem instrumentação → sem go-live

---

**BLOQUEIO:**
> Não gere o PRD sem os artefatos das seções 1, 2 e 3. Não preencha seções com dados que não foram fornecidos ou derivados do discovery — marque como `[a definir]` e aponte o que falta.

---

## Resumo

| # | Seção | Artefato | Depende de |
|---|-------|----------|------------|
| 1 | Contexto (demanda + estado atual + feedback + alinhamento estratégico) | `01-context.md` | — |
| 2 | Análise (benchmark + insights + clarity + escopo + hipóteses + experimentos) | `02-analysis.md` | 01 |
| 3 | Decisão (recomendação + recorte de solução + segmento + owner + open questions) | `03-decision.md` | 01, 02 |
| 4 | PRD (resumo → instrumentação) | `04-prd.md` | 01, 02, 03 |
