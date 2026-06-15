---
type: strategy
domain: design
status: current
date: 2026-03-19
---

# Flow Platform — Diretrizes de Tracking e Métricas de Sucesso

> Este documento define como medir o sucesso de features no Flow AIMS. Estabelece o que deve ser instrumentado, como estruturar a seção de métricas em PRDs, e quais eventos mínimos cada produto deve rastrear.

**Última atualização:** 2026-03-19
**Responsável:** Design Strategy

---

## Por que isso importa

Sem instrumentação intencional, tomamos decisões com base em feeling.
Com dados corretos, conseguimos responder:

- Os usuários concluem os fluxos que desenhamos?
- Onde há abandono ou fricção?
- A feature está sendo usada do jeito que esperávamos?
- O negócio está sendo impactado?

---

## Estrutura obrigatória de métricas em PRDs

Todo PRD deve incluir uma seção **"Como mediremos sucesso"** com os quatro blocos abaixo.

### 1. North Star Metric (NSM)

A métrica principal que indica que a feature está entregando valor.

> Deve ser uma métrica de **outcome**, não de output.
> ❌ "feature lançada" → ✅ "taxa de adoção nos primeiros 14 dias"

### 2. Métricas de produto

Indicadores que refletem comportamento do usuário dentro do produto.

Categorias:

| Categoria | O que mede |
|-----------|------------|
| **Adoção** | Quantos usuários usaram a feature ao menos uma vez |
| **Ativação** | Quantos completaram o fluxo principal com sucesso |
| **Retenção** | Quantos voltaram a usar nos dias/semanas seguintes |
| **Frequência** | Com que regularidade a feature é usada |
| **Eficiência** | Tempo médio para completar o fluxo principal |

### 3. Métricas de negócio

Indicadores que conectam uso do produto ao impacto no negócio.

Exemplos:
- Redução de tempo de onboarding de contas
- Aumento de reuso de soluções entre times
- Aumento de penetração de IA em projetos monitorados

### 4. Guardrails (métricas de alerta)

Métricas que indicam degradação de experiência. Se cruzarem um threshold, investigar imediatamente.

Exemplos:
- Taxa de erro acima de X%
- Taxa de abandono de fluxo acima de Y%
- Tempo de resposta de ação acima de Z segundos

---

## O que pode ser rastreado

### Eventos de interação

Qualquer ação intencional do usuário sobre a interface.

| Tipo de evento | Exemplos |
|----------------|----------|
| **Clique em CTA** | "Instalar bundle", "Criar bundle", "Confirmar", "Cancelar" |
| **Clique em link/navegação** | Mudança de tab, item de menu, link externo |
| **Abertura de modal/drawer** | Detail panel, confirmation dialog, filter drawer |
| **Submissão de formulário** | Salvar configuração, publicar solução |
| **Seleção em dropdown ou filtro** | Tipo de bundle, status, categoria |
| **Busca** | Query submetida, resultado clicado |
| **Expansão/colapso** | Accordion, seção retrátil, card expandível |

### Eventos de upload e ingestão

| Evento | O que capturar |
|--------|----------------|
| **Upload iniciado** | Tipo de arquivo, tamanho, fonte (CSV/API) |
| **Upload concluído** | Quantidade de registros processados, tempo |
| **Upload com erro** | Tipo de erro, linha/campo problemático |
| **Retry de upload** | Quantas tentativas até sucesso |

### Eventos de fluxo (wizard / multi-step)

| Evento | O que capturar |
|--------|----------------|
| **Step iniciado** | Número do step, contexto |
| **Step concluído** | Tempo no step, campos preenchidos |
| **Step abandonado** | Em qual step saiu, campos preenchidos |
| **Fluxo concluído** | Tempo total, path percorrido |
| **Fluxo abandonado** | Ponto de saída, contexto |

### Eventos de conteúdo (Findr / bundles)

| Evento | O que capturar |
|--------|----------------|
| **Bundle visualizado** | ID do bundle, categoria, origem (busca, direta, recomendação) |
| **Bundle instalado** | ID, versão, contexto do dev |
| **Bundle desinstalado** | ID, tempo de uso antes da remoção |
| **Solução favoritada/salva** | ID, tipo de conteúdo |
| **Review submetida** | Rating, tem texto? |
| **CLI install executado** | Comando, versão, sucesso/erro |

### Eventos do sistema

| Evento | O que capturar |
|--------|----------------|
| **Erro de API** | Endpoint, status code, contexto |
| **Timeout** | Ação que causou, duração |
| **Sessão iniciada** | Origem (direto, IDE, link) |
| **Sessão encerrada** | Duração, última ação |

---

## Taxonomia de eventos

Todos os eventos devem seguir o padrão:

```
<objeto>_<ação>
```

| Objeto | Ação | Evento resultante |
|--------|------|-------------------|
| `bundle` | `viewed` | `bundle_viewed` |
| `bundle` | `installed` | `bundle_installed` |
| `bundle` | `uninstalled` | `bundle_uninstalled` |
| `upload` | `started` | `upload_started` |
| `upload` | `completed` | `upload_completed` |
| `upload` | `failed` | `upload_failed` |
| `flow` | `step_completed` | `flow_step_completed` |
| `flow` | `abandoned` | `flow_abandoned` |
| `review` | `submitted` | `review_submitted` |
| `search` | `executed` | `search_executed` |
| `filter` | `applied` | `filter_applied` |
| `cta` | `clicked` | `cta_clicked` |

### Propriedades mínimas por evento

Todo evento deve incluir:

```json
{
  "event": "bundle_installed",
  "timestamp": "ISO-8601",
  "user_id": "uuid",
  "tenant_id": "uuid",
  "session_id": "uuid",
  "properties": {
    "bundle_id": "uuid",
    "source": "search | direct | recommendation"
  }
}
```

---

## Métricas por produto

### Ops (CSV Upload / API Ingestion)

| Métrica | Tipo | Como medir |
|---------|------|------------|
| Taxa de upload concluído | Ativação | `upload_completed` / `upload_started` |
| Taxa de erro de upload | Guardrail | `upload_failed` / `upload_started` |
| Tempo médio de ingestão | Eficiência | `upload_completed.duration` |
| Taxa de retry | Guardrail | `upload_retried` / `upload_failed` |
| Contas ativadas com dados | Adoção | contas com ≥1 `upload_completed` |

### Findr (Bundles / Instalação)

| Métrica | Tipo | Como medir |
|---------|------|------------|
| Taxa de instalação após visualização | Ativação | `bundle_installed` / `bundle_viewed` |
| Bundles únicos instalados por semana | Adoção | contagem de `bundle_installed` distintos |
| Taxa de retenção do bundle | Retenção | bundles não desinstalados em 30 dias |
| Avaliações submetidas | Engajamento | contagem de `review_submitted` |
| Taxa de conclusão do CLI install | Eficiência | install sucesso / install iniciado |
| Tempo mediano de instalação | Eficiência | `cli_install_completed.duration` |

### AI Usage / Agentic Metrics

| Métrica | Tipo | Como medir |
|---------|------|------------|
| Penetração de IA por projeto | NSM | projetos com eventos OTEL / total de projetos |
| Taxa de adoção de ferramentas IA | Adoção | ferramentas únicas usadas por dev |
| Frequência de uso semanal | Frequência | sessões por dev por semana |
| Taxa de sucesso de agente | Qualidade | runs com status `success` / total |

---

## Níveis de prioridade de instrumentação

| Prioridade | Definição | Exemplo |
|-----------|-----------|---------|
| **P0 — Obrigatório no lançamento** | Necessário para validar a hipótese principal da feature | Instalação de bundle, conclusão de upload |
| **P1 — Próximo sprint** | Enriquece a análise sem bloquear o lançamento | Origem da navegação, tempo por step |
| **P2 — Evolução** | Aprofundamento quando o produto amadurece | Heatmaps, replay de sessão, A/B test |

---

## Como incluir no PRD

A seção de métricas deve aparecer **antes das capacidades técnicas**, pois orienta o que medir, não como implementar.

### Template mínimo

```markdown
## Como mediremos sucesso

### North Star Metric
[Uma frase: o que indica que a feature está entregando valor]

### Métricas de produto
| Métrica | Tipo | Meta |
|---------|------|------|
| [métrica] | adoção / ativação / retenção / eficiência | [valor] |

### Métricas de negócio
- [impacto 1]
- [impacto 2]

### Guardrails
| Métrica | Threshold de alerta |
|---------|---------------------|
| [métrica] | > [valor] |

### Eventos a instrumentar (P0)
| Evento | Propriedades |
|--------|-------------|
| [evento] | [campos] |
```

---

## Considerações para IA e agentes

Quando a feature envolve IA (geração, sugestão, automação), instrumentar também:

| Evento | Por quê |
|--------|---------|
| `ai_suggestion_shown` | Quantas sugestões são geradas |
| `ai_suggestion_accepted` | Taxa de aceitação — proxy de qualidade |
| `ai_suggestion_rejected` | Indica desalinhamento com expectativa do usuário |
| `ai_suggestion_edited` | Usuário aceitou mas corrigiu — sinal de qualidade parcial |
| `ai_run_started` | Volume de uso de agente |
| `ai_run_completed` | Taxa de sucesso |
| `ai_run_failed` | Taxa de falha — guardrail crítico |
| `ai_run_duration` | Latência percebida pelo usuário |

> Regra: nunca expor output de IA sem medir aceitação ou rejeição. Sem esses dados, não temos como saber se a IA está ajudando.

---

## Documentos relacionados

| Documento | Relevância |
|-----------|------------|
| [`../tech/05-devex.md`](../tech/05-devex.md) | Estratégia de coleta via OTEL para CLI tools |
| [`../tech/06-infra-operations.md`](../tech/06-infra-operations.md) | Estratégia de observabilidade com Langfuse |
