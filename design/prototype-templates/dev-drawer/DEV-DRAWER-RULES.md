---
title: DevModeDrawer — Regras de Implementação e Handoff
type: guidelines
domain: platform
status: active
updated: 2026-05-14
---

# DevModeDrawer — Regras de Implementação

O DevModeDrawer é uma **ferramenta de handoff viva**, embutida no protótipo. Serve para documentar e expor, de forma interativa, tudo que o receptor precisa saber para implementar ou validar a experiência — desenvolvedor, QA ou PM.

---

## O drawer só está funcionando quando

- [ ] Cada tela listada em `screens` navega corretamente ao clicar
- [ ] Cada estado com `trigger` é acessível via clique (onTrigger conectado)
- [ ] O diagrama reflete o fluxo real implementado (sem `✏️`)
- [ ] Nenhuma seção ativa contém dados de placeholder (`✏️`)
- [ ] Zero erros de console ao abrir o drawer
- [ ] Seções mudam ao trocar de view (se `sectionsByView` está configurado)

---

## Quando implementar

**Implemente quando:**
- As jornadas principais do protótipo estão estáveis
- O receptor do handoff foi identificado (dev, QA, PM)
- As telas e estados principais estão implementados

**Não implemente em:**
- Wireframes ou protótipos exploratórios descartáveis
- Protótipos sem views/rotas definidas
- Experimentos de divergência (você ainda não sabe o que vai existir)

---

## Run Mode — Protocolo de Configuração

> Este protocolo é obrigatório quando alguém pede **"implementa a dev drawer no protótipo X"**.

### Fase 1 — Análise automática (Claude lê o código sem perguntar)

Ler e extrair:
1. Todos os arquivos de views em `src/` — nomes, caminhos, identificadores
2. Como a navegação funciona no App (`setCurrentView`, `setView`, `navigate`, etc.)
3. Estados por view: quais variáveis controlam `loading`, `empty`, `error`, `success`
4. Feedbacks/toasts existentes: mensagens, contextos, tipos
5. Se há fluxos alternativos: caminhos de erro, edge cases, permissões

### Fase 2 — Perguntas obrigatórias ANTES de escrever qualquer código

Claude DEVE perguntar ao solicitar implementação:

1. **Jornadas principais**: "Quais são as 1–3 jornadas que este handoff deve cobrir?"
   *(Ex: criar bundle, editar distribuição, revisar métricas)*

2. **Receptor do handoff**: "Quem recebe? Dev, QA ou PM?"
   - Dev → ativar seções `components`, `tokens`, detalhar `fields`
   - QA → priorizar `states`, `messages`, cobrir edge cases
   - PM → focar em `screens`, `messages`, evitar seções técnicas

3. **Fluxos de erro**: "Há estados de erro ou edge cases que o handoff deve cobrir? Quais?"

4. **Setter de navegação**: "Qual é o nome da função que controla a view atual no App?"
   *(ex: `setCurrentView`, `setView`, `setActiveView`, `navigate`)*

5. **Posição do botão Dev**: "Onde deve ficar o botão Dev? `left`, `center` ou `right`?"
   *(padrão: `right`)*

### Fase 3 — Implementação dirigida

Com as respostas em mãos:
- Gerar `FLOW_DIAGRAM` real (Mermaid, happy path + erros, nomes reais das views)
- Preencher `screens` com todas as telas reais + seus estados reais
- Criar constantes `SECTIONS_BY_VIEW` separadas por view (ou `SPEC_SECTIONS` único se view única)
- Ativar seções relevantes para o receptor; omitir seções sem dados
- Conectar `onTrigger` no App pai com o handler correto
- Marcar `closesDrawer: true` em estados que disparam snackbar/toast
- Definir `buttonPosition` conforme resposta da pergunta 5

### Fase 4 — Validação antes de considerar completo

Testar manualmente:
- [ ] Clicar em cada tela em `screens` → navega corretamente?
- [ ] Clicar em cada estado com trigger → demonstra o estado correto?
- [ ] Estados com `closesDrawer: true` → drawer fecha e snackbar aparece?
- [ ] Diagrama renderiza sem erro e reflete o fluxo real?
- [ ] Ao trocar de view, as seções da drawer mudam?
- [ ] Nenhuma seção ativa tem `✏️` no conteúdo?
- [ ] Console sem erros ao abrir/fechar o drawer?

---

## Seções disponíveis

| Seção | Quando ativar | Quando omitir |
|-------|--------------|---------------|
| Diagrama (`FLOW_DIAGRAM`) | **Sempre — obrigatório** | Nunca |
| Telas & Estados (`screens`) | **Sempre — obrigatório** | Nunca |
| `components` | Receptor = Dev; há componentes não óbvios | Receptor PM/QA; tudo usa o DS padrão |
| `tokens` | Há customização de tokens além do DS padrão | Protótipo 100% padrão do DS |
| `messages` | Há toasts, validações inline, feedbacks, microcopy | Views read-only sem feedback ao usuário |
| `data` / `fields` | Schema de dados é relevante (ex: campos de formulário) | Protótipos de UI pura sem input |
| `rules` | Regras de negócio não óbvias pelo código | Comportamento completamente autoexplicativo |
| Fluxos (`FLOW_ROUTES`) | Protótipo tem múltiplas versões (v1, WIP, deprecated) | Protótipo com um único fluxo ativo |

**Não existe seção de Rotas & Views** — já coberta pelo dropdown de screens.

**Não existe campo `tooltip`** — use grupos `messages` com botão de cópia quando precisar de texto copiável.

---

## Seções contextuais por view — padrão obrigatório

Quando o protótipo tem múltiplas views, as seções da drawer **devem mudar** ao trocar de view.

```tsx
// Padrão canônico: definir constantes separadas por view
export const DASHBOARD_SECTIONS: SpecSection[] = [ /* ... */ ]
export const CALCULATOR_SECTIONS: SpecSection[] = [ /* ... */ ]
export const SETTINGS_SECTIONS: SpecSection[] = [ /* ... */ ]

const SECTIONS_BY_VIEW: Record<string, SpecSection[]> = {
  dashboard: DASHBOARD_SECTIONS,
  calculator: CALCULATOR_SECTIONS,
  settings: SETTINGS_SECTIONS,
}

// No App:
<DevModeDrawer
  currentView={currentView}
  sectionsByView={SECTIONS_BY_VIEW}
  screens={SCREENS}
  onTrigger={handleTrigger}
/>
```

**Regras:**
- Cada view deve ter apenas as seções relevantes ao que está na tela
- Seções globais (ex: tokens de cor, fluxo de navegação) podem ir numa view de entrada (ex: `dashboard`)
- Se o protótipo tem só uma view, usar `sections` diretamente (sem `sectionsByView`)

---

## closesDrawer — estados que fecham a drawer

Quando um estado dispara um snackbar/toast, marcar `closesDrawer: true` no estado.  
A drawer fecha automaticamente ao disparar o trigger, tornando a notificação visível.

```tsx
{
  id: 'calculator-success',
  label: 'success',
  description: 'Cálculo concluído. Snackbar + aba History.',
  trigger: 'calculator:success',
  closesDrawer: true,  // ← drawer fecha, snackbar aparece
}
```

**Quando usar:**
- Estados que disparam snackbar, toast ou notificação visualmente bloqueada pela drawer
- Estados de conclusão de fluxo (sucesso, envio de formulário)

**Quando não usar:**
- Estados de loading, empty, error inline (notificação fica na própria tela)

---

## Posição do botão Dev

```tsx
// Props disponíveis: 'left' | 'center' | 'right' (padrão: 'right')
<DevModeDrawer buttonPosition="right" ... />
```

Perguntar sempre ao implementar — algumas telas têm FAB ou botão de ação no canto inferior direito que conflita.

---

## Padrão de navegação — contrato obrigatório

O drawer comunica navegação via `onTrigger`. O App pai é responsável por interpretar e executar.

```tsx
// DevModeDrawer emite:
onTrigger('navigate:nome-da-view')       // navegar para uma tela
onTrigger('state:nome-da-view:estado')   // navegar + aplicar estado
onTrigger('trigger:identificador')       // trigger livre (ex: abrir modal)

// App pai — handler obrigatório:
<DevModeDrawer
  currentView={currentView}
  sectionsByView={SECTIONS_BY_VIEW}
  screens={SCREENS}
  subtitle="Produto · Tela"
  buttonPosition="right"
  onTrigger={(action) => {
    if (action.startsWith('navigate:')) {
      const view = action.replace('navigate:', '')
      setCurrentView(view as ViewName)
    }
    if (action.startsWith('state:')) {
      const [, view, state] = action.split(':')
      setCurrentView(view as ViewName)
      setViewState(state)
    }
    if (action.startsWith('trigger:')) {
      const id = action.replace('trigger:', '')
      handleDevTrigger(id)
    }
  }}
/>
```

**Regras:**
- Telas sem `onTrigger` conectado não devem aparecer em `screens` — são ruído
- O valor `view` em cada screen deve ser o identificador **exato** usado em `setCurrentView()`
- Estados sem trigger funcional: omitir ou mover para `rules` (texto)

---

## Diagrama de fluxo — requisitos

| Requisito | Obrigatório |
|-----------|-------------|
| Cobertura do happy path completo | Sim |
| Ao menos os erros principais | Sim |
| Nomes dos nós = nomes reais das views | Sim |
| Atualizado quando o protótipo mudar | Sim |
| Mermaid `flowchart LR` ou `flowchart TD` | Sim |

**Convenções de nomenclatura nos nós:**
```
["NomeDaView"]          — tela/view
{"condição?"}           — ponto de decisão
(["resultado"])         — estado terminal
-->|"label da aresta"|  — transição com contexto
```

---

## Erros comuns

| Erro | Causa | Correção |
|------|-------|----------|
| Telas clicáveis mas sem navegação | `onTrigger` não implementado no App | Adicionar o handler no App pai |
| Estados existem mas não demonstram nada | `trigger` não interpretado no App | Ampliar o `onTrigger` handler |
| Diagrama com `✏️` | `FLOW_DIAGRAM` não foi substituído | Escrever o diagrama Mermaid real |
| Seções ativas com conteúdo vazio | Seções template não foram preenchidas | Preencher ou remover a seção |
| Seções não mudam ao trocar de view | `currentView` não passado ou `sectionsByView` não configurado | Verificar props e chaves do Record |
| Drawer não fecha ao trigger de sucesso | `closesDrawer: true` ausente no estado | Adicionar a flag no estado correspondente |
| Botão Dev conflita com elemento da tela | `buttonPosition` no valor padrão | Passar `buttonPosition="left"` ou `"center"` |
| Drawer abre em view errada ao clicar | `view` no `screens` não bate com o identificador real | Conferir os nomes no App |

---

## Checklist de definição de "pronto"

```
[ ] FLOW_DIAGRAM sem ✏️ e renderizando corretamente
[ ] Cada screen em screens: view real, sem ✏️, onTrigger conectado
[ ] Cada estado relevante: trigger funcional
[ ] Estados que disparam snackbar: closesDrawer: true
[ ] sectionsByView configurado (se múltiplas views)
[ ] Seções mudam ao trocar de view — verificado manualmente
[ ] Seções ativas: sem placeholder, sem items vazios
[ ] Console limpo ao abrir/fechar drawer
[ ] Receptor consegue entender o fluxo sem explicação verbal
```
