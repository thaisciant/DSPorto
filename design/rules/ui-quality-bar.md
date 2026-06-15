---
type: reference
domain: platform
status: current
date: 2026-04-17
---

# UI Guardrails — Flow Platform

Guardrails de design para geração e revisão de interfaces no Flow.
Lidos por Claude antes de gerar qualquer tela. Atualizado por: Bruna Urbina · Abril 2026.

---

## Como usar este documento

- **Antes de gerar interface:** ler os 6 guardrails base + guardrails por tipo de tela
- **Ao revisar protótipo:** usar o Prompt de Revisão e o Checklist
- **Ao decidir sobre componente:** seguir a Ordem de Decisão de UI no Guardrail 6

---

## Guardrail 1 — Hierarquia

**Problema que previne:** dashboard caótico, tela sem foco, conteúdo que não se escaneia.

Regras:
- Máximo 3 níveis de hierarquia visual por tela
- Uma única área de foco primário por tela (não duas seções competindo)
- Headings devem comunicar o conteúdo em até 5 segundos de leitura
- Whitespace separa blocos de conteúdo — não preenche espaço decorativamente
- Seções sem peso visual diferenciado são lidas como equivalentes — evitar isso

---

## Guardrail 2 — Ações

**Problema que previne:** interface indecisa, usuário sem caminho claro, ações perdidas.

Regras:
- Máximo 1 CTA primário por tela
- Máximo 2 ações primárias por seção
- Ações destrutivas (deletar, desativar, revogar) visualmente separadas das demais
- Ações devem estar próximas do conteúdo que afetam
- Ações críticas nunca ficam escondidas em menus de overflow (`...`)

---

## Guardrail 3 — Estados

**Problema que previne:** protótipo sem realidade, interface que não comunica o que está acontecendo.

Todos os estados abaixo são obrigatórios em qualquer tela principal:

| Estado | O que mostrar |
|--------|---------------|
| `loading` | Skeleton ou spinner — nunca tela em branco |
| `empty` | Ilustração ou texto + CTA para próximo passo |
| `error` | Mensagem descritiva + ação de recovery |
| `success` | Feedback imediato após ação (toast, banner inline) |
| `partial` | Indicar que dados estão incompletos ou carregando parcialmente |
| `disabled` | Explicar por que o elemento está desabilitado — nunca só cinza |

---

## Guardrail 4 — Navegação

**Problema que previne:** usuário perdido, fluxo sem saída, contexto quebrado entre telas.

Regras:
- O usuário sempre sabe onde está — título de seção, breadcrumb ou item ativo na sidebar
- Navegação persistente (sidebar) sempre visível onde esperada
- Breadcrumbs em estruturas com mais de 2 níveis de profundidade
- Modais não devem resolver tarefas complexas — usar página ou drawer lateral
- Progresso de wizard ou formulário multi-step não é perdido sem confirmação explícita

---

## Guardrail 5 — Conteúdo e Copy

**Problema que previne:** UX corporativa vaga, labels que não comunicam, erros sem recovery.

Regras:
- Labels descrevem literalmente o que acontece — não são criativos nem metafóricos
- Botões começam com verbo: "Create bundle", "Delete team", "Save settings"
- Empty states explicam o próximo passo concreto: "No bundles yet. Create your first one."
- Mensagens de erro descrevem a causa e a ação: "Failed to save. Check your connection and try again."
- Termos proibidos por vagos: manage, optimize, configure, handle, leverage, enhance

---

## Guardrail 6 — Consistência

**Problema que previne:** Frankenstein UI, padrões inventados, componentes duplicados.

Ordem de decisão — seguir sempre nesta sequência:
1. Componente existente do Design System (`@ci-t-hyperx/flow-ds`)
2. Primitivo do shadcn/ui
3. Composição com primitivos existentes (Radix + Tailwind)
4. Componente novo — apenas se nenhum dos anteriores resolve, com justificativa documentada

Regras adicionais:
- Padrões repetidos devem ter comportamento idêntico em todas as ocorrências
- Espaçamento segue a escala de tokens — sem valores arbitrários
- Ícones: `react-icons/tb` (Tabler Icons) — único pacote permitido
- `TbBrandJira` não existe — usar `TbCode`. Verificar ícones `TbBrand*` antes de usar.

---

## Guardrails por tipo de tela

### Dashboard

**Contexto:** métricas, KPIs, overview operacional (ex: DashboardOps, PerformanceView)

- Status visível no primeiro viewport — sem scroll obrigatório para entender o estado
- Insight em texto acompanha cada gráfico ("Taxa de sucesso caiu 12% esta semana")
- Máximo 5 métricas principais sem interação — demais em progressive disclosure
- Filtros avançados colapsados por padrão
- Tabelas: coluna mais importante à esquerda, linhas escaneáveis antes de detalhe

### Formulário

**Contexto:** criação de entidade, edição de configuração, importação de dados

- Campos obrigatórios primeiro, opcionais depois
- Inputs relacionados agrupados com label de seção
- Validação inline (próxima ao campo) — não só no submit
- Em erro de submit: preservar todos os dados inseridos, focar no primeiro campo com erro
- Formulário com mais de 5 campos: mostrar indicador de seção ou progresso

### Settings

**Contexto:** configurações por produto, workspace, usuário

- Organização por modelo mental do usuário (não pela estrutura do backend)
- Ações destrutivas (deletar conta, revogar acesso) isoladas na seção — não misturadas
- Valor atual (default) sempre visível antes de qualquer edição
- Impacto da mudança explicado próximo à configuração
- Botão de salvar fixo no footer em páginas longas

### AI Chat / Agent UI

**Contexto:** interfaces conversacionais, agentes, automações (ex: Chat, Agentic Bus)

- Status do modelo/sistema sempre visível (online, processando, erro)
- Distinguir visualmente: mensagem do usuário vs. resposta do agente vs. ação do sistema
- Confiança e incerteza do modelo indicados quando relevante ("Based on limited data…")
- Retry, edição de mensagem e cancelamento sempre disponíveis
- Streaming de texto: transição suave — sem saltos ou reposicionamento de conteúdo

### Flow — Guardrails de plataforma

**Contexto:** qualquer protótipo no ecossistema Flow

- Usar o shell de sidebar existente — ver `docs/system/ui-shells.md`
- Sidebar canônica de `findr-bundles-app` em todos os produtos Flow (exceto Coder, Agentic Bus, AIMS)
- Continuidade visual entre produtos: mesmos tokens, mesma sidebar, mesmos padrões de layout
- Ações refletem ambiente enterprise: sem animações desnecessárias, sem gamificação de processo
- Governance e status do sistema são conteúdo, não decoração — mostrar quando relevante
- Velocidade e clareza > "delight theater"

---

## Regras de componentes e tokens

**Componentes — proibições:**
- Não criar novo tipo de botão sem justificativa (primary, secondary, ghost existem)
- Não criar badge/tag se existe equivalente no DS
- Não criar wrapper visual sem função estrutural

**Cards:**
- Usar: agrupar conteúdo com autonomia própria, itens com ação independente
- Não usar: container genérico, adicionar padding sem hierarquia, empilhar sem ganho
- Teste: se remover o card e nada mudar na compreensão → card desnecessário

**Cores:**
- Tokens do sistema apenas — sem cores arbitrárias
- Cor = estado do sistema (`success`, `error`, `warning`, `info`)
- Cor ≠ contexto, categoria ou papel do usuário

**Acessibilidade mínima (obrigatória):**
- Contraste mínimo 4.5:1 para texto
- Foco visível em todos os elementos interativos
- Navegação completa por teclado
- Ícones sozinhos não carregam significado — sempre acompanhados de label ou tooltip
- Erro nunca comunicado apenas por cor — sempre com texto

---

## Prompt — antes de gerar interface

Usar este bloco antes de qualquer geração de tela:

```
Siga os UI Guardrails do Flow Platform.

GUARDRAIL 1 — HIERARQUIA
Máx 3 níveis de hierarquia visual. Um foco primário por tela.
Headings escaneáveis em 5s. Whitespace organiza, não decora.

GUARDRAIL 2 — AÇÕES
Máx 1 CTA primário por tela. Máx 2 por seção.
Destrutivas separadas visualmente. Críticas nunca em overflow menu.

GUARDRAIL 3 — ESTADOS
Obrigatórios: loading (skeleton), empty (+ CTA), error (+ recovery), success (feedback).
Disabled sempre explica o motivo. Dados parciais indicados.

GUARDRAIL 4 — NAVEGAÇÃO
Usuário sempre orientado. Sidebar persistente.
Breadcrumbs em estruturas profundas. Sem reset de progresso sem confirmação.

GUARDRAIL 5 — COPY
Labels literais. Botões com verbo. Empty states com próximo passo concreto.
Erros com causa + recovery. Proibido: manage, optimize, configure, handle.

GUARDRAIL 6 — CONSISTÊNCIA
Ordem: DS → shadcn → composição → novo (com justificativa).
Tokens de spacing/radius/cores. Ícones: react-icons/tb (Tabler) único permitido.

FLOW PLATFORM
Sidebar canônica de findr-bundles-app. Não inventar navegação.
Enterprise: clareza e velocidade, sem delight theater.
```

---

## Prompt — revisão após gerar protótipo

```
Revise esta interface com base nos UI Guardrails do Flow Platform.

Para cada item, indique: OK / PROBLEMA (severidade: alta/média/baixa) / correção

HIERARQUIA
- Máx 3 níveis de hierarquia visual?
- Um foco primário por tela?
- Nenhuma seção compete por atenção com peso igual?

AÇÕES
- Máx 1 CTA primário por tela?
- Ações destrutivas separadas visualmente?
- Nenhuma ação crítica em overflow?

ESTADOS
- Loading com skeleton (não tela em branco)?
- Empty state com CTA concreto?
- Error com mensagem e recovery?
- Success com feedback após ação?
- Disabled com explicação do motivo?

NAVEGAÇÃO
- Usuário sabe onde está (título, breadcrumb, item ativo)?
- Sidebar presente e com item correto ativo?
- Sem reset de progresso inesperado?

COPY
- Labels literais (não vagos)?
- Botões começam com verbo?
- Empty state explica próximo passo?
- Mensagens de erro têm recovery?

CONSISTÊNCIA
- DS primeiro? Shadcn quando DS não cobre?
- Sem componentes inventados?
- Tokens de spacing/radius respeitados?
- Somente ícones Tabler (react-icons/tb)?

FLOW
- Sidebar canônica usada?
- Produto correto ativo na sidebar?
- Sem nova navegação inventada?
```

---

## Checklist de qualidade

**Hierarquia**
- [ ] Máx 3 níveis de hierarquia visual
- [ ] Um foco primário por tela
- [ ] Headings escaneáveis em 5s

**Ações**
- [ ] Máx 1 CTA primário por tela
- [ ] Ações destrutivas separadas visualmente
- [ ] Nenhuma ação crítica em overflow menu

**Estados**
- [ ] Loading explícito (skeleton ou spinner)
- [ ] Empty state com próximo passo concreto
- [ ] Error com mensagem de recovery
- [ ] Success feedback após ação
- [ ] Disabled explica o motivo

**Navegação**
- [ ] Usuário sabe onde está o tempo todo
- [ ] Sidebar com item ativo correto
- [ ] Sem reset de progresso inesperado

**Copy**
- [ ] Labels literais
- [ ] Botões começam com verbo
- [ ] Sem termos vagos (manage, configure, optimize)

**Consistência**
- [ ] Componentes do DS usados primeiro
- [ ] Tokens de spacing e radius respeitados
- [ ] Somente ícones Tabler (react-icons/tb)

**Flow**
- [ ] Sidebar canônica de findr-bundles-app
- [ ] Produto correto ativo na sidebar
- [ ] Sem nova navegação inventada

---

---

## Skills associadas

| Skill | Papel |
|-------|-------|
| `ui-guardrails-builder` | Aplica estes guardrails antes de gerar qualquer interface |
| `ui-critic` | Avalia interfaces contra estes guardrails |
| `prd-to-prototype` | Carrega estes guardrails no Step 8 (geração de protótipo) |
| `flow-prototype-builder` | Usa estes guardrails como checklist de validação pré-entrega |

> Interface que quebra qualquer guardrail acima não está pronta para review.
