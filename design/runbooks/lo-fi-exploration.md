---
title: "Lo-fi Exploration — Exploração Visual Rápida"
type: runbook
domain: platform
status: current
updated: 2026-05-22
---

# Lo-fi Exploration

> Exploração visual rápida para alinhar estrutura, arquitetura de informação e alternativas de layout — antes de qualquer decisão de stack, tokens ou fidelidade.
> Pode ser iniciado de uma ideia, nota, PRD fragmentado ou problema observado. Não exige PRD completo.

---

## Quando usar este runbook

| Situação | Usar lo-fi-exploration |
|----------|----------------------|
| PM ou PD quer visualizar 2–3 abordagens antes de escrever o PRD | ✅ |
| Time precisa alinhar "onde vai cada coisa" antes de codar | ✅ |
| Exploração de conceito sem hipótese formal | ✅ |
| Validar arquitetura de informação com stakeholder | ✅ |
| Discovery revelou problema — quer visualizar antes de spec | ✅ |
| PRD completo existe e estrutura está clara | ❌ → usar `prd-ao-prototipo.md` direto |
| Precisa validar com usuário real | ❌ → `discovery-sprint.md` Etapa 4 primeiro |

**Não usar para** features com PRD definido e estrutura conhecida — o custo de lo-fi antes de hi-fi não se justifica quando a direção já foi decidida.

---

## Posição no processo

```
Ideia / nota / observação
        │
        ▼
lo-fi-exploration          ← você está aqui
        │
        ├──→ descartar (exploração mostrou que não vale)
        │
        ├──→ mais discovery → discovery-sprint.md
        │
        ├──→ PRD + hi-fi   → prd-ao-prototipo.md (Etapa 1)
        │
        └──→ hi-fi direto  → prd-ao-prototipo.md (Etapa 7, se PRD já existe)
```

---

## Estrutura de saída

```
/docs/lo-fi/[feature]/
  00-context.md          ← contexto mínimo estruturado
  01-alternatives.md     ← 2–3 direções divergentes com trade-offs
  02-wireframe.html      ← wireframe navegável (self-contained)
  03-decision.md         ← o que aprendemos + próximo passo
```

---

## Fase 1 — Contexto mínimo

**Input:** qualquer coisa — ideia verbal, nota, PRD fragmentado, print de referência, problema observado
**Output:** `00-context.md`

Responda apenas estas três perguntas antes de explorar. Sem isso, a exploração não tem critério de avaliação.

```
1. O que estamos explorando?
   [descrição livre — feature, fluxo, tela, conceito]

2. Para quem?
   [perfil específico — não "todos os usuários"]

3. Qual pergunta esta exploração precisa responder?
   [ex: "Qual estrutura facilita a comparação entre bundles?"
        "Onde o usuário configura permissões sem sair do fluxo principal?"
        "Como apresentar o estado vazio de forma que o usuário saiba o que fazer?"]
```

**O que o Claude faz:**
- Estrutura o contexto no formato acima
- Sinaliza se a pergunta é muito vaga para guiar a exploração: *"essa pergunta tem resposta visual ou precisa de discovery primeiro?"*
- Identifica o tipo de tela (tabela, dashboard, wizard, detalhe, configuração) para guiar as alternativas
- Se não há contexto suficiente, faz no máximo 2 perguntas — não bloqueia com formulário longo

**Mínimo para avançar:** pergunta central formulada. Se não existe, a exploração não tem critério de avaliação.

---

## Fase 2 — Alternativas de estrutura

**Input:** `00-context.md`
**Output:** `01-alternatives.md`

Gerar **2 ou 3 direções divergentes** — não variações sutis da mesma abordagem. Cada alternativa deve representar uma aposta diferente sobre o que importa.

**O que o Claude gera para cada alternativa:**

```
### Alternativa [A/B/C] — [nome conceitual]

**Aposta:** [o que esta direção prioriza — ex: "densidade e comparação", "foco e progressão", "contexto e navegação"]

**Estrutura:**
- Layout: [full-width / centered narrow / split / etc.]
- Hierarquia: [o que domina visualmente]
- Fluxo: [como o usuário percorre a tela]
- CTA principal: [onde e o quê]

**Funciona bem quando:** [contexto favorável]
**Funciona mal quando:** [contexto desfavorável]

**Trade-off central:** [o que esta alternativa sacrifica para priorizar o que prioriza]
```

**Regras das alternativas:**
- Cada alternativa deve ter um nome que comunica sua aposta (não "Opção 1")
- Mínimo 2, máximo 3 — mais do que isso fragmenta sem acrescentar
- Ao menos uma alternativa deve ser "não óbvia" — algo que o time provavelmente não considerou
- Alternativas que diferem só em cor ou tipografia não contam

**Mínimo para avançar:** 2 alternativas com trade-off central explícito.

---

## Fase 3 — Wireframe navegável

**Input:** `00-context.md` + `01-alternatives.md` + direção escolhida (ou múltiplas para comparação)
**Output:** `02-wireframe.html`

### Pergunta obrigatória antes de gerar

Responda isso antes de qualquer código:

| Formato | Quando usar | Prós | Contras |
|---------|-------------|------|---------|
| **HTML puro** (gray boxes, sem CSS do DS) | Exploração — estrutura ainda em aberto, nenhuma decisão tomada | Navegável, zero build, zero dependência do projeto | Não reutiliza stack |
| **React wireframe mode** (Tailwind `bg-gray-200`, sem tokens reais) | Time já decidiu construir e quer validar o fluxo antes de aplicar o DS | Reutiliza stack, pode ser "promovido" a hi-fi | Requer setup do projeto |

**Padrão: HTML puro.** React wireframe mode só se a Fase 4 já apontou "hi-fi direto" e o time quer aproveitar o scaffold existente.

```
[ ] HTML puro     ← default para exploração
[ ] React wireframe mode  ← só se já decidido que vai construir
```

---

Gerar um arquivo único, self-contained, navegável. Sem build, sem dependências, abre direto no browser.

### Regras do wireframe lo-fi

**O que usar:**
- Fundo branco puro `#ffffff`
- Blocos de conteúdo: `background: #e5e7eb; border-radius: 4px`
- Imagens/mídia: `background: #d1d5db` com `×` centralizado
- Texto: `color: #6b7280; font-family: system-ui, sans-serif`
- Bordas: `1px solid #d1d5db`
- Botões: `background: #374151; color: white` (sem diferenciação por importância)
- Anotações: sticky notes amarelas `background: #fef9c3` para decisões em aberto

**O que NÃO usar:**
- Tokens Flow (`#000050`, `#fa5a50`, etc.) — sem cor do DS
- Ícones reais — usar `[ícone]` como placeholder ou quadrado vazio
- Imagens reais — usar placeholder `bg-gray-300`
- Tipografia real — sem Inter, sem font-weight semântico
- Nenhuma referência ao design system final

**Estrutura do HTML:**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Wireframe — [nome da feature]</title>
  <style>
    /* wireframe reset */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #f3f4f6; color: #374151; }

    /* navegação entre telas */
    .screen { display: none; min-height: 100vh; }
    .screen.active { display: block; }

    /* componentes lo-fi */
    .wf-block { background: #e5e7eb; border-radius: 4px; }
    .wf-image { background: #d1d5db; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 12px; }
    .wf-text { color: #6b7280; font-size: 13px; line-height: 1.5; }
    .wf-label { color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; }
    .wf-btn { background: #374151; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 13px; }
    .wf-btn-ghost { background: transparent; border: 1px solid #d1d5db; color: #374151; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 13px; }
    .wf-card { border: 1px solid #d1d5db; border-radius: 8px; padding: 16px; background: white; }
    .wf-input { border: 1px solid #d1d5db; border-radius: 4px; padding: 8px 12px; width: 100%; color: #6b7280; font-size: 13px; background: white; }
    .wf-note { background: #fef9c3; border: 1px solid #fde047; border-radius: 4px; padding: 8px 12px; font-size: 12px; color: #713f12; }

    /* nav do wireframe */
    .wf-nav { position: fixed; top: 0; left: 0; right: 0; background: #1f2937; padding: 8px 16px; display: flex; gap: 8px; align-items: center; z-index: 100; font-size: 12px; }
    .wf-nav span { color: #9ca3af; }
    .wf-nav a { color: #e5e7eb; text-decoration: none; padding: 4px 8px; border-radius: 4px; background: #374151; }
    .wf-nav a.active { background: #4b5563; color: white; }
    .wf-content { padding-top: 40px; }
  </style>
</head>
<body>

<!-- nav de telas (barra de wireframe) -->
<nav class="wf-nav">
  <span>Wireframe:</span>
  <a href="#" onclick="show('tela-1')" id="nav-tela-1" class="active">[Tela 1]</a>
  <a href="#" onclick="show('tela-2')" id="nav-tela-2">[Tela 2]</a>
</nav>

<div class="wf-content">

  <!-- TELA 1 -->
  <div id="tela-1" class="screen active">
    <!-- conteúdo da tela 1 -->
  </div>

  <!-- TELA 2 -->
  <div id="tela-2" class="screen">
    <!-- conteúdo da tela 2 -->
  </div>

</div>

<script>
  function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.wf-nav a').forEach(a => a.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById('nav-' + id).classList.add('active');
  }
</script>
</body>
</html>
```

**Obrigações do wireframe:**
- Navegação funcional entre todas as telas do fluxo
- Cada estado relevante da state matrix (se existir `05-state-matrix.md`) tem uma tela própria
- Anotações `wf-note` nos pontos de decisão em aberto
- Label `wf-label` acima de cada seção para identificar o bloco
- Mínimo 2 telas, máximo o necessário para cobrir o fluxo — sem telas decorativas

---

## Fase 4 — Gate de decisão

**Input:** `02-wireframe.html` + reação do time
**Output:** `03-decision.md`

```markdown
## Decisão de exploração — [nome da feature] — [data]

**Pergunta que a exploração respondia:**
[da Fase 1]

**Alternativa escolhida:** [A/B/C — nome]
**Por quê:** [o que a exploração revelou que justifica a escolha]

**O que aprendemos que não sabiamos antes:**
[o insight da exploração — se não há nenhum, a exploração foi desnecessária]

**Decisões em aberto (anotações wf-note não resolvidas):**
- [decisão 1]
- [decisão 2]

**Próximo passo:**
[ ] Descartar — exploração mostrou que não vale o investimento
[ ] Mais discovery → `discovery-sprint.md` (hipótese precisa ser validada antes de estruturar)
[ ] PRD + hi-fi → `prd-ao-prototipo.md` Etapa 1 (wireframe aprovado, PRD a escrever)
[ ] Hi-fi direto → `prd-ao-prototipo.md` Etapa 7 (PRD já existe, usar wireframe como guia de estrutura)

**Artefatos gerados:**
- `00-context.md`
- `01-alternatives.md`
- `02-wireframe.html`
```

**Quando o próximo passo é hi-fi direto**, o wireframe entra como artefato de input na Etapa 7 do `prd-ao-prototipo.md` — o Claude lê o HTML para entender a estrutura antes de gerar o React.

---

## Anti-patterns que este runbook previne

| Anti-pattern | Como previne |
|-------------|-------------|
| Começar hi-fi sem alinhar estrutura | Lo-fi força decisão de layout antes de código |
| Explorar com fidelidade alta por default | Regras explícitas proibem tokens e DS no wireframe |
| Gerar variações sutis da mesma ideia | Fase 2 exige divergência real entre alternativas |
| Explorar sem critério de avaliação | Fase 1 exige a pergunta central antes de qualquer output |
| Wireframe vira entregável permanente | Gate de decisão força resolução explícita do próximo passo |
| Hi-fi que repete wireframe sem melhorar | Wireframe é descartável — o hi-fi pode (e deve) evoluir a estrutura |

---

## Relação com outros documentos

| Documento | Relação |
|-----------|---------|
| [`discovery-sprint.md`](discovery-sprint.md) | Etapa 3 (exploração) pode usar a Fase 3 deste runbook para gerar artefatos visuais |
| [`prd-ao-prototipo.md`](prd-ao-prototipo.md) | Recebe o wireframe aprovado como artefato de entrada opcional na Etapa 7 |
| [`screen-design-research`](~/.claude/skills/screen-design-research/SKILL.md) | Skill de pesquisa pré-build — pode ser executada após Fase 4 antes do hi-fi |
| [`ux-review-protocol.md`](ux-review-protocol.md) | Revisão heurística — aplica-se ao hi-fi, não ao wireframe lo-fi |
