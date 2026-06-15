---
title: PrototypeNotes — Regras de Implementação e Handoff
type: guidelines
domain: platform
status: active
updated: 2026-05-08
---

# PrototypeNotes — Regras de Implementação

O PrototypeNotes é uma **ferramenta de anotação viva**, embutida no protótipo. Serve para comunicar, de forma persistente e visível, contextos que não existem na experiência real — comportamentos exclusivos de papéis, limitações de escopo, diferenças entre o que o protótipo simula e o que a implementação entregará.

Diferente do DevModeDrawer (que documenta specs técnicas em um drawer lateral), o PrototypeNotes é uma anotação inline, fixada na tela, endereçada a quem está **navegando** o protótipo: PM, QA, stakeholder, designer ou desenvolvedor em revisão.

---

## O componente só está funcionando quando

- [ ] Há pelo menos uma nota visível em alguma tela do protótipo
- [ ] Cada nota descreve um comportamento **real e relevante**, não um placeholder
- [ ] A condição de exibição de cada nota está corretamente conectada ao estado ou contexto da view
- [ ] O texto é compreensível para o receptor sem contexto adicional
- [ ] Nenhuma nota contém `✏️` (dados de placeholder)
- [ ] O componente não bloqueia interações importantes da tela

---

## Quando implementar

**Implemente quando:**
- Uma tela tem comportamento exclusivo por papel (ex: criador vê X, demais usuários veem Y)
- Uma view representa um estado que não existiria tal qual na implementação (ex: visão combinada admin + usuário)
- Há limitações de escopo do protótipo que precisam ser explicitadas (ex: "este fluxo não cobre o caso de erro")
- O receptor precisa saber o que **não está** na tela para entender o que **está**
- Uma solução ou dado está simulado e difere do comportamento real esperado

**Não implemente em:**
- Telas sem contexto de protótipo a comunicar — não polua visualmente sem necessidade
- Protótipos exploratórios descartáveis (wireframes, divergências)
- Quando a informação já está documentada no DevModeDrawer ativo — evite duplicação
- Views onde a nota bloquearia a área de conteúdo principal

---

## Run Mode — Protocolo de Configuração

> Este protocolo é obrigatório quando alguém pede **"adiciona uma nota de protótipo na tela X"**.

### Fase 1 — Análise automática (Claude lê o código sem perguntar)

Ler e extrair:
1. Qual view ou componente recebe a nota
2. Qual a condição de exibição (sempre visível? só para role X? só para bundle/item Y?)
3. Se já existe `PrototypeNotes` nesse protótipo — reaproveitar o componente existente
4. Se há `DevModeDrawer` ativo — verificar se a informação já está documentada lá

### Fase 2 — Perguntas obrigatórias ANTES de escrever qualquer código

Claude DEVE perguntar:

1. **Contexto da nota**: "O que esta nota precisa comunicar? É um comportamento de papel, uma limitação de escopo ou uma diferença entre protótipo e implementação real?"

2. **Condição de exibição**: "Esta nota deve aparecer sempre nesta tela, ou apenas em um estado/contexto específico (ex: só para um item específico, só quando um flag está ativo)?"

3. **Receptor**: "Quem precisa ler esta nota? Dev, QA, PM ou stakeholder?"
   - Dev/QA → pode mencionar nomes de componentes e comportamentos técnicos
   - PM/Stakeholder → linguagem de produto, sem jargões de código

### Fase 3 — Implementação dirigida

Com as respostas em mãos:
- Escrever o texto da nota seguindo a **anatomia de uma boa nota** (ver abaixo)
- Conectar a condição de exibição ao estado correto no JSX pai
- Importar e renderizar o `PrototypeNotes` no local correto
- Verificar que o componente não sobrepõe elementos interativos

### Fase 4 — Validação antes de considerar completo

- [ ] A nota aparece apenas quando e onde esperado
- [ ] O texto é claro sem precisar de explicação adicional
- [ ] Não há `✏️` no conteúdo
- [ ] O componente não cobre botões, inputs ou conteúdo crítico da tela

---

## Anatomia de uma boa nota

| Elemento | Regra |
|----------|-------|
| **Prefixo implícito** | O título "Nota do protótipo" já está fixo no componente — não repita no texto |
| **Sujeito** | Nomear o papel ou contexto afetado sem jargões técnicos (`user_creator` → "criador do bundle") |
| **Comportamento** | Descrever o que este contexto vê ou pode fazer |
| **Contraste** | Descrever o que outros contextos veem — o "negativo" da nota |
| **Escopo** | Se aplicável, mencionar onde o comportamento se manifesta ("na tela de edição", "no componente drag-and-drop") |

**Exemplo canônico (Findr Bundles — bundle b2):**
> "Esta visão é exclusiva do criador do bundle. Demais usuários veem apenas as soluções disponíveis — sem indicativo de conteúdo ausente. Na tela de edição, o criador visualiza no componente drag-and-drop somente as soluções do bundle que ainda estão disponíveis no catálogo."

**Anti-padrões:**
```
❌ "Nota: user_creator vê isUnavailable=true na solution s3"       — jargão de código
❌ "Isso é só protótipo, na vida real seria diferente."            — vago, não acionável
❌ "Esta tela está incompleta."                                    — não informa o que falta
✅ "Esta visão é exclusiva do criador. Outros usuários veem X."    — específico e acionável
```

---

## Seções disponíveis no componente

| Prop | Obrigatória | Descrição |
|------|-------------|-----------|
| `notes` | Sim | Array de notas a exibir. Cada nota tem `id` e `description`. |
| `title` | Não | Título exibido em todas as notas. Default: `"Nota do protótipo"`. |
| `topOffset` | Não | Distância do topo da viewport em px. Default: `16`. Se o protótipo tiver header fixo, use `altura_do_header + 16` para posicionar a nota abaixo dele e não sobrepor elementos da tela. |

A condição de exibição é controlada pelo **pai** — basta passar o array filtrado:

```tsx
// Nota sempre visível nesta tela
<PrototypeNotes notes={[{ id: 'scope', description: '...' }]} />

// Nota condicional
{bundle.id === 'b2' && (
  <PrototypeNotes notes={[{ id: 'creator-view', description: '...' }]} />
)}

// Múltiplas notas
<PrototypeNotes notes={[
  { id: 'role',  description: 'Visão exclusiva do criador.' },
  { id: 'scope', description: 'O fluxo de erro não está coberto aqui.' },
]} />
```

---

## Relação com o DevModeDrawer

| PrototypeNotes | DevModeDrawer |
|----------------|---------------|
| Anotação inline, visível durante a navegação | Documentação técnica em drawer lateral |
| Endereçado a quem navega o protótipo | Endereçado ao receptor do handoff (dev, QA) |
| Comunicar contexto de protótipo vs. produto real | Documentar specs, estados, tokens, mensagens |
| Sem interação — leitura passiva | Interativo — permite acionar estados |
| Pode coexistir com o DevModeDrawer | Pode coexistir com o PrototypeNotes |

> Regra: se a informação é útil para **navegar** o protótipo → PrototypeNotes.
> Se é útil para **implementar** o produto → DevModeDrawer.

---

## Erros comuns

| Erro | Causa | Correção |
|------|-------|----------|
| Jargão técnico no texto (`isUnavailable`, `user_creator`) | Copiar nomes de código sem adaptar | Reescrever com linguagem de produto |
| Nota sempre visível quando deveria ser condicional | Condição não conectada ao estado do pai | Envolver em condicional no JSX pai |
| Texto muito longo (mais de 3 linhas) | Tentativa de cobrir múltiplos contextos em uma nota | Separar em múltiplas notas por contexto |
| Nota duplicando o DevModeDrawer | Falta de verificação prévia | Checar o drawer antes de adicionar |
| Nota sobrepondo botões ou conteúdo principal | Posicionamento não validado | Ajustar z-index ou rever layout da tela |

---

## Checklist de definição de "pronto"

```
[ ] Nenhuma nota contém ✏️
[ ] Cada nota tem condição de exibição correta no JSX pai
[ ] Texto em linguagem de produto — sem jargões de código
[ ] Posicionamento não bloqueia interações da tela
[ ] Receptor consegue entender o contexto sem explicação verbal
[ ] Se há DevModeDrawer, não há duplicação de informação
```
