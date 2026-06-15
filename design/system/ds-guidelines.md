---
title: DS Guidelines — Diretrizes de Uso do Design System Flow
type: document
domain: platform
status: current
updated: 2026-05-06
---

# DS Guidelines — Diretrizes de Uso do Design System Flow

Regras operacionais de como usar o DS na prática: interações, grid, posicionamento, ícones, conteúdo e padrões de ação. Baseado nos padrões de referência Shopify Polaris, IBM Carbon, Material Design 3 e Salesforce Lightning DS2 — adaptados ao contexto Flow (B2B, desktop-first, plataforma de IA).

**Leitura complementar:** [`ds-mapping.md`](ds-mapping.md) (componente a componente) · [`design-system.md`](design-system.md) (tokens e inventário)

---

## 1. Sistema de Grade e Layout

### 1.1 Unidade base

Toda medida de espaçamento, padding e gap deve ser múltipla de **8px**. Valores intermediários de 4px são aceitáveis apenas em espaçamentos internos de componentes (ex: padding de badge, gap de ícone + texto em botão).

| Token | Valor | Uso principal |
|-------|-------|---------------|
| `space-1` | 4px | Interno a componentes (gap ícone/label, padding badge) |
| `space-2` | 8px | Gap entre elementos relacionados dentro de um mesmo card |
| `space-4` | 16px | Padding interno de card, gap entre campos de formulário |
| `space-6` | 24px | Separação entre seções dentro de uma view |
| `space-8` | 32px | Separação entre blocos distintos de conteúdo |
| `space-12` | 48px | Separação entre seções de página |

**Regra:** quanto mais profundo o nível de aninhamento, menor o espaçamento. O inverso não é válido.

> Para os tokens Tailwind exatos (`p-4`, `gap-6`, `mt-8`, etc.) e o mapeamento completo para CSS custom properties, ver [`DESIGN.md`](../foundations/DESIGN.md).

### 1.2 Shell de página

O shell é a estrutura de layout de qualquer tela Flow. É não-negociável.

```
+--------+--------------------------------------+
|        | Header (shrink-0)                    |
| 76px   +--------------------------------------+
| Side-  | Content area (flex-1, overflow-y)    |
| bar    |                                      |
| (fixo) |                                      |
|        +--------------------------------------+
|        | Footer de ação (shrink-0, se houver) |
+--------+--------------------------------------+
```

**Regras do shell:**
- `sidebar`: `w-[76px]`, fixo, sempre visível (exceto Coder e AIMS)
- `header`: `shrink-0` — nunca cresce nem encolhe com o conteúdo
- `content`: `flex-1 overflow-y-auto` — único scroll da tela
- `footer`: `shrink-0` — fixo na parte inferior quando existir

> JSX canônico do shell e da Sidebar (com ThemeProvider e tokens computados) em [`DESIGN.md`](../foundations/DESIGN.md).

### 1.3 Regiões de conteúdo

| Região | Largura | Uso |
|--------|---------|-----|
| **Full** | `flex-1` (toda área útil) | Views de listagem, dashboards, home |
| **Centered medium** | máx. 768px centrado | Formulários, wizards, configurações simples |
| **Centered large** | máx. 1024px centrado | Detail views com conteúdo rico |
| **Split** | 50%/50% ou 60%/40% | Views de comparação, painéis side-by-side |

### 1.4 Breakpoints

O Flow é **desktop-first**. Não existem breakpoints mobile definidos ainda. Ao projetar:

| Window class | Largura | Comportamento |
|--------------|---------|---------------|
| **Expanded** | ≥1280px | Layout padrão com sidebar + conteúdo |
| **Large** | ≥1920px | Mesma estrutura, conteúdo mais respirado |

Ao introduzir responsividade futura: seguir o padrão **Compact → Medium → Expanded** do Material Design 3 — começar pela janela menor, expandir. Nunca reduzir de forma reativa.

### 1.5 Cartões e separadores

**Cartão:**
- `rounded-lg` (8px border-radius)
- `border border-[#f0f0f5]` como separação visual padrão (sem sombra como padrão, sombra apenas para elevação contextual — ex: dropdown aberto, card em hover)
- `p-4` (16px) como padding interno padrão; `p-6` para cards com mais hierarquia visual

**Separadores de conteúdo:**
- `<hr>` ou `border-t border-[#f0f0f5]` para dividir seções dentro de um mesmo card
- Não usar linhas decorativas entre itens de lista — usar espaçamento (`gap`) como separador implícito
- Separador explícito apenas quando o conteúdo muda de natureza (ex: seção de dados → seção de ações)

---

## 2. Regras de Posicionamento

Regras sobre onde objetos fixos devem estar na interface. Não devem variar por produto.

### 2.1 Mapa de posicionamento global

```
+--------+-----------------------------------------+-------+
|        | [Logo / Contexto tenant + squad]        | [Avatar] ← sempre aqui
| 76px   +-----------------------------------------+-------+
| Side-  | [Breadcrumb / Título da view]            |
| bar    +-----------------------------------------+
| ↑      | Conteúdo principal                       |
| Nav    |                                          |
| Engine |                                          |
| ↓      |                                          |
| Util   +-----------------------------------------+
|        | [Ação secundária]  [CTA principal] ←---- sempre aqui
+--------+-----------------------------------------+
```

### 2.2 Avatar, perfil e logout

- Avatar do usuário: **sempre no canto superior direito** do header
- Logout: dentro do menu dropdown do Avatar (nunca exposto diretamente na sidebar ou no header)
- Ações de conta (configurações, perfil, idioma): dentro do dropdown do Avatar

### 2.3 Navegação primária

- Sidebar esquerda: navegação de **nível de plataforma** (entre produtos)
- Tabs horizontais: navegação de **nível de produto** (entre views de um mesmo produto)
- Tabs NÃO devem ser usadas como navegação primária — apenas como sub-navegação dentro de uma view

### 2.4 CTAs

| Contexto | Posição do CTA primário | Posição da ação secundária |
|----------|-------------------------|---------------------------|
| Footer de wizard | Direita (`justify-end`) | Imediatamente à esquerda do primário |
| Header de view | Direita (`ml-auto`) | À esquerda do primário |
| Card de item | Direto no card (trailing) | — |
| Dialog | Direita no footer | Esquerda do primário no footer |
| Inline / contextual | Junto ao elemento relacionado | — |

**Regra crítica:** CTAs nunca ficam dentro do scroll container. Sempre no footer fixo do shell.

### 2.5 Notificações e feedback

| Tipo | Posição | Persistência |
|------|---------|--------------|
| Snackbar (toast) | **Top-right** (`fixed top-4 right-4 z-50`) | Auto-dismiss (3–5s) |
| Banner de alerta | Topo da content area (abaixo do header) | Persistente até ação |
| Dialog de confirmação | Centralizado, sobre a view | Bloqueia interação |
| Inline error | Abaixo do campo ou elemento de origem | Até ser corrigido |

---

## 3. Diretrizes de Interação

### 3.1 Painéis deslizantes (Sheet)

Usar `Sheet` (painel lateral deslizante) quando:
- O conteúdo é contextual e complementar à view principal (ex: detalhes de um item selecionado)
- O usuário precisa comparar o painel com a lista/view por trás
- A quantidade de informação é grande demais para um Dialog, mas não justifica nova rota

**Não usar Sheet quando:**
- A ação é destrutiva ou requer confirmação explícita → usar Dialog
- O conteúdo é completamente independente da view → criar nova rota
- A ação é transitória e de feedback → usar Snackbar

**Comportamento esperado:**
- Abrir via ação explícita (clique em item, botão "Ver detalhes")
- Fechar via: botão de fechar (X), tecla Escape, clique fora do painel
- Foco deve ir para o primeiro elemento interativo do Sheet ao abrir
- Foco deve retornar ao elemento que abriu o Sheet ao fechar

### 3.2 Wizards e Steppers

Usar wizard quando:
- O fluxo tem 3 ou mais etapas distintas e sequenciais
- O usuário precisa de orientação progressiva (não pode ver tudo de uma vez)
- Cada etapa tem validação própria antes de avançar

**Regras:**
- Step atual: sempre visível no topo da view (breadcrumb de progresso)
- "Voltar" é sempre possível (exceto no step 1)
- "Cancelar" deve estar disponível em todos os steps com confirmação de perda de dados
- CTA do step (Próximo / Concluir): sempre no footer fixo, nunca dentro do scroll
- Avançar não é possível sem validação do step atual

### 3.3 Focus management

| Evento | Comportamento de foco |
|--------|-----------------------|
| Dialog abre | Foco vai para: botão primário (confirmação) ou botão "Cancelar" (ação destrutiva) |
| Dialog fecha | Foco retorna ao elemento que abriu o Dialog |
| Sheet abre | Foco vai para o primeiro elemento interativo do Sheet |
| Sheet fecha | Foco retorna ao elemento de origem |
| Snackbar aparece | Foco permanece onde estava — Snackbar é não-bloqueante |
| Erro inline aparece | Foco pode ir para o campo com erro (depende do contexto) |

### 3.4 Estados de componente

Todo componente interativo deve ter os 5 estados visuais:

| Estado | Condição | Aparência |
|--------|----------|-----------|
| **Default** | Normal, disponível | Aparência base |
| **Hover** | Cursor sobre o elemento | Background levemente escurecido (`#eef0f7` na sidebar) |
| **Focus** | Selecionado via teclado | Ring de foco visível (nunca remover `outline`) |
| **Active / Pressed** | Em clique / pressionado | Levemente mais escuro que hover |
| **Disabled** | Não disponível no momento | Opacidade reduzida, cursor `not-allowed` |
| **Loading** | Ação em processamento | Spinner inline, botão desabilitado durante processo |

**Regra:** usar `loading` state durante operações assíncronas — não usar `disabled` para bloquear durante carregamento.

### 3.5 Drag and drop

Quando drag-and-drop for oferecido:
- Sempre oferecer alternativa não-drag (reordenar via ações ou inputs explícitos) para acessibilidade
- Indicar arrastrabilidade visualmente com ícone de grip (ex: `TbGripVertical`)
- Estado de "arrastando": elevação visual do item (sombra), feedback de posição de destino
- Cancelar com Escape durante drag

---

## 4. Catálogo de Ícones e Significados

### 4.1 Ícones de produto (engine icons)

Esses ícones representam produtos do Flow. São a âncora de identidade de cada produto na sidebar.

| Ícone | Produto | Significado |
|-------|---------|-------------|
| `TbMessage` | Chat | Conversação / agente de IA |
| `TbTerminal2` | Coders | Ferramentas de código / terminal |
| `TbLayoutCards` | Steps | Workflow / cards de processo |
| `TbChartPie` | Metrics / Ops | Dashboards / métricas |
| *(4-grid custom)* | Maker | Composição / builder visual |
| `TbTriangleSquareCircle` | Findr | Busca / descoberta de recursos |

**Regra:** nunca usar esses ícones para outros fins. São reservados para representar os produtos.

### 4.2 Ícones de ação

| Ícone | Ação | Uso |
|-------|------|-----|
| `TbPlus` | Adicionar / criar | Botões de criação, FAB |
| `TbPencil` | Editar | Ação inline em cards e listas |
| `TbTrash` | Excluir | Sempre acompanhado de confirmação |
| `TbCopy` | Copiar | Copiar texto, ID, código |
| `TbDownload` | Baixar | Download de arquivos |
| `TbUpload` | Enviar / publicar | Upload, deploy, publicação |
| `TbSearch` | Buscar | Campo de busca, filtro global |
| `TbFilter` | Filtrar | Aplicar filtros em listagens |
| `TbRefresh` | Atualizar | Recarregar dados |
| `TbSettings` | Configurações | Ajustes, preferências |
| `TbArrowUpRight` | Link externo | Abre em nova aba — mais usado (98x) |
| `TbArrowBarToRight` | Expandir / navegar | Expandir painel, avançar |
| `TbX` | Fechar / remover | Fechar modal, remover tag |
| `TbCheck` | Confirmar / concluído | Confirmação, estado de sucesso |
| `TbChevronDown` | Expandir (dropdown) | Accordion, select, menu |

### 4.3 Ícones de status e feedback

| Ícone | Status | Cor de referência |
|-------|--------|-------------------|
| `TbCircleCheck` | Sucesso | `#166534` (verde — WCAG AA 5.74:1) |
| `TbAlertCircle` | Erro / falha | `#b91c1c` (vermelho — WCAG AA 6.1:1) |
| `TbAlertTriangle` | Aviso / atenção | `#92400e` (âmbar — WCAG AA 7.2:1) |
| `TbInfoCircle` | Informação | `#1d4ed8` (azul — WCAG AA 5.9:1) |
| `TbLoader` | Carregando | Neutro (animado) |
| `TbClock` | Pendente / aguardando | Neutro |

### 4.4 Ícones de navegação e layout

| Ícone | Uso |
|-------|-----|
| `TbNews` | News / novidades |
| `TbHelpSquareRounded` | Ajuda / documentação |
| `TbArrowBarToRight` | Logout |
| `TbLifebuoy` | Suporte |
| `TbBook2` | Documentação / Flow Docs |
| `TbGripVertical` | Arrastrável (drag handle) |
| `TbDotsVertical` | Menu de ações (context menu) |
| `TbLayoutSidebarRight` | Companion / painel lateral |

### 4.5 Ícones de integração (custom Flow)

| Ícone | Representa |
|-------|------------|
| `AzureStorage` | Azure Blob Storage |
| `Confluence` | Atlassian Confluence |
| `GoogleDrive` | Google Drive |
| `Plug` | Integração genérica / connector |

---

## 5. Regras de Ícone vs Label

### 5.1 Quando usar ícone sem label

Permitido apenas quando:
1. A ação é universalmente reconhecida (ex: fechar = X, busca = lupa)
2. O ícone está na sidebar de navegação — contexto torna o significado claro
3. **Tooltip obrigatório** descrevendo a ação (acessibilidade WCAG 2.5.3)
4. Touch target mínimo: 44×44px (independente do tamanho visual do ícone)

**Exemplos válidos:**
- Botões de ação na sidebar (sempre com tooltip)
- Ícone de fechar (X) em Dialogs e Sheets
- Botão de copiar ao lado de um campo de código

### 5.2 Quando usar ícone + label

**Default para botões de ação primária e secundária.** Use quando:
- A ação é importante e precisa de clareza máxima (ex: "Publicar bundle", "Criar solução")
- O contexto é novo para o usuário (onboarding, primeira vez)
- O ícone sozinho pode ser ambíguo (ex: seta pode significar avançar, expandir ou exportar)

**Formato:** ícone antes do label (`TbPlus Adicionar`, `TbUpload Publicar`)

### 5.3 Quando usar apenas label

Use quando:
- Não existe ícone que represente bem a ação
- O label é suficientemente curto e claro
- O contexto já tem muitos ícones e texto adiciona clareza visual

**Exemplos:** "Salvar rascunho", "Cancelar", "Não, manter"

### 5.4 Tamanho de ícone por contexto

| Contexto | Tamanho do ícone |
|----------|-----------------|
| Sidebar (navegação) | 24px |
| Botão (small) | 14–16px |
| Botão (medium/default) | 16–18px |
| Botão (large) | 18–20px |
| Header de seção | 20px |
| Badge / Tag (inline) | 12–14px |
| Toast / Snackbar | 18–20px |

---

## 6. Diretrizes de Conteúdo (UX Writing)

### 6.1 Voz e tom

O Flow é uma plataforma para times técnicos de produto e desenvolvimento. A voz deve ser:

- **Direta.** Menos palavras, mais clareza. Não há espaço para floreio.
- **Técnica, mas humana.** Pode usar jargão técnico (PR, deploy, pipeline) — mas não burocratize.
- **Confiante.** Não use "talvez", "pode ser que", "tente fazer". Seja assertivo.
- **Respeitosa do tempo.** O usuário está trabalhando. Não explique o óbvio.

### 6.2 Labels de menu e navegação

**Use substantivos para itens de navegação:**

| ✅ Correto | ❌ Evitar |
|-----------|-----------|
| Bundles | Gerenciar Bundles |
| Configurações | Configurar |
| Métricas | Ver Métricas |
| Histórico | Consultar Histórico |

Exceção: quando o item é uma ação única e não há ambiguidade (ex: "Criar novo bundle" em um menu de contexto).

### 6.3 Labels de ação (botões, CTAs)

**Use verbo + substantivo específico:**

| ✅ Correto | ❌ Evitar |
|-----------|-----------|
| Publicar bundle | Confirmar |
| Salvar rascunho | Salvar |
| Criar solução | OK |
| Instalar agora | Instalar |
| Remover bundle | Remover |
| Descartar alterações | Cancelar |

**Regras:**
- Comece sempre com verbo no infinitivo (Publicar, Criar, Salvar, Remover)
- Inclua o objeto quando possível — evita ambiguidade em telas com múltiplas ações
- Evite "OK", "Confirmar", "Sim" sem contexto — não dizem nada sobre a ação

### 6.4 Pessoa gramatical

| Contexto | Regra |
|----------|-------|
| Interface (labels, placeholders) | Segunda pessoa: "Seu projeto", "Seus times", "Configure aqui" |
| Mensagens de sistema (erros, confirmações) | Segunda pessoa: "Você tem certeza?", "Suas alterações serão perdidas" |
| Documentação inline (tooltips, helper text) | Impessoal ou imperativo: "Insira o nome do bundle", "Selecione pelo menos uma equipe" |
| E-mails e notificações externas | Segunda pessoa: "Você foi adicionado ao projeto X" |

**Não misturar** segunda e terceira pessoa na mesma tela.

### 6.5 Placeholder vs label

- **Label** é obrigatório para todos os campos de formulário — nunca usar apenas placeholder como substituto de label
- **Placeholder** é opcional, usado para dar dica de formato: `ex: nome-do-bundle`, `ex: João Silva`
- Placeholder some ao digitar — informação crítica nunca pode estar só no placeholder

### 6.6 Mensagens de erro

Estrutura obrigatória: **o que deu errado + o que fazer**.

| ✅ Correto | ❌ Evitar |
|-----------|-----------|
| "Nome já existe. Use um nome diferente." | "Erro de validação." |
| "Selecione ao menos uma equipe para continuar." | "Campo obrigatório." |
| "Não foi possível publicar. Tente novamente ou contate o suporte." | "Erro 500." |

### 6.7 Português vs inglês na interface

| Elemento | Idioma |
|----------|--------|
| Labels e botões da UI | Português (pt-BR) |
| Nomes de produtos e engines | Inglês (Chat, Coders, Steps, Findr, Ops, AIMS) |
| Termos técnicos consolidados | Inglês (deploy, bundle, pipeline, PR) |
| Mensagens de erro e feedback | Português (pt-BR) |
| Código e snippets | Inglês |

---

## 7. Hierarquia e Posicionamento de CTAs

### 7.1 Hierarquia de ações

| Nível | Variante | Uso |
|-------|----------|-----|
| **Primária** | `Button variant="primary"` | Ação principal da tela — máximo 1 por contexto |
| **Secundária** | `Button variant="secondary"` | Ação alternativa relevante — máximo 2 por contexto |
| **Ghost / Outline** | `Button variant="outline"` | Ação de suporte, menos ênfase visual |
| **Destrutiva** | `Button variant="destructive"` *(quando disponível)* | Ação irreversível — sempre com confirmação |
| **Link** | Texto com underline | Navegação inline, links informativos |

**Regras:**
- Nunca mais de 1 botão primário por contexto imediato
- CTA destrutivo fisicamente separado dos CTAs funcionais (salvar/publicar)
- Em dialogs: ação primária à direita, ação secundária à esquerda

### 7.2 Posicionamento por contexto

**Footer de wizard:**
```
[Cancelar]          [← Voltar]   [Próximo →]
```
ou no último step:
```
[Cancelar]          [← Voltar]   [Publicar bundle]
```

**Header de view (ações de página):**
```
Título da View                    [Ação secundária]  [CTA Principal]
```

**Card de item (ações inline):**
```
[Ícone/Título do item]            [Editar]  [•••]
```

**Dialog de confirmação:**
```
[Cancelar]                             [Confirmar ação]
```

**Dialog destrutivo:**
```
                             [Não, manter]  [Sim, remover]
```
_(Foco padrão: "Não, manter" — não no destrutivo)_

### 7.3 Quando usar floating action vs CTA fixo

| Contexto | Recomendação |
|----------|--------------|
| View de listagem com 1 ação primária recorrente | CTA fixo no header da view |
| Wizard com múltiplos steps | Footer fixo em todos os steps |
| View com scroll longo e ação global | Footer fixo ou CTA fixo no header |
| Ação contextual em item específico | Inline no item (trailing) |

---

## 8. Padrões de Salvar / Cancelar

### 8.1 Quando usar cada padrão

| Padrão | Quando usar | Exemplos no Flow |
|--------|-------------|-----------------|
| **Save explícito** | Formulários de criação, configurações críticas, publicações | Criar bundle, configurar projeto, publicar solução |
| **Auto-save** | Edições de conteúdo longo, rascunhos, configurações não-críticas | Descrição de bundle, notas, preferências pessoais |
| **Draft / Rascunho** | Conteúdo que será publicado em etapa posterior | Bundles em criação, soluções em draft |
| **Cancel com confirmação** | Formulários com dados preenchidos, wizards com progresso | Qualquer wizard com 2+ campos preenchidos |
| **Cancel sem confirmação** | Formulários vazios, ações que não alteraram dados | Abrir e fechar modal sem digitar nada |

### 8.2 Auto-save

Quando implementar auto-save:
- Indicar visualmente que o dado foi salvo: "Salvo automaticamente agora" (com timestamp)
- Não interromper o fluxo do usuário com snackbar a cada auto-save — usar indicador sutil no header ou footer
- Oferecer "Desfazer" por pelo menos 5 segundos após uma mudança crítica

### 8.3 Save explícito

- Botão "Salvar" ou "Publicar" deve refletir exatamente o que acontece (ver seção 6.3)
- Se a ação é irreversível (ex: publicar bundle para todos os times), adicionar etapa de confirmação
- Após salvar com sucesso: Snackbar de confirmação ("Bundle publicado com sucesso") + permanece na mesma tela

### 8.4 Confirmação de ação destrutiva — níveis

| Nível | Impacto | Padrão |
|-------|---------|--------|
| **Trivial** | Ação reversível, fácil de refazer | Executar direto sem confirmação |
| **Moderado** | Perda de dados local, difícil de recuperar | Dialog: explicar consequência + "Cancelar" / "Remover" |
| **Alto impacto** | Irreversível, afeta outros usuários ou sistemas | Dialog com texto de confirmação manual (digitar nome do recurso) |

**Exemplos:**
- Remover tag de um bundle → trivial → sem dialog
- Descartar rascunho de bundle → moderado → dialog: "Suas alterações serão perdidas. Descartar mesmo assim?"
- Remover bundle publicado de produção → alto impacto → dialog com confirmação manual

### 8.5 Label das ações no dialog destrutivo

| ✅ Correto | ❌ Evitar |
|-----------|-----------|
| "Remover bundle" | "Confirmar" |
| "Sim, descartar" | "OK" |
| "Não, manter rascunho" | "Cancelar" |
| "Excluir permanentemente" | "Deletar" |

O botão de cancelar deve ser a saída segura mais clara — foco padrão vai para ele quando a ação é destrutiva.

---

## 9. Interações com IA (Flow-específico)

Produtos com IA (Chat, AIMS, Steps com agentes) têm diretrizes adicionais:

### 9.1 Transparência do sistema

- Sempre indicar quando o conteúdo foi gerado por IA (badge, label, ícone específico)
- Indicar modelo/versão quando relevante para o contexto (ex: qual LLM respondeu)
- Não disfarçar outputs de IA como se fossem ações humanas

### 9.2 Estados do agente

| Estado | Feedback visual |
|--------|-----------------|
| Processando / pensando | Animação `thinking` + label "Processando..." |
| Gerando resposta | Animação `bubble` + texto sendo renderizado |
| Erro no modelo | Snackbar `error` + opção de tentar novamente |
| Aguardando input | Campo ativo, nenhum loader |

### 9.3 Controle do usuário

- Sempre oferecer "Parar geração" durante outputs longos
- Sempre oferecer "Tentar novamente" após erro
- Não executar ações automaticamente sem confirmação explícita do usuário (ex: não criar card no Jira sem o usuário clicar em "Criar")

### 9.4 Explicabilidade

- Quando o sistema faz uma recomendação automática, deve ser possível entender o motivo
- Indicar quando uma sugestão é baseada em dados do usuário vs dados gerais
- Não ocultar o grau de confiança de outputs críticos (ex: estimativas de esforço no AIMS)

---

## 10. Visualização de Dados (Charts)

### 10.1 Paleta de cores obrigatória

Cores usadas em gráficos (Recharts, D3, ou qualquer biblioteca) **devem obrigatoriamente** vir de uma das duas fontes:

1. **Classes Tailwind CSS** — via variáveis do Tailwind (ex: `bg-indigo-500`, `stroke-emerald-400`)
2. **Hex values do DS Flow** — valores documentados nos tokens do `flow-core-design-system` (ex: `#000050`, `#6366f1`, `#10b981`)

**Proibido:** valores hexadecimais arbitrários que não existem no DS Flow ou no tema Tailwind do projeto.

**Por quê:** manter a identidade visual consistente e garantir que gráficos participem do sistema de dark mode e theming.

### 10.2 Sequência de cores para séries

Ao precisar de múltiplas cores para séries de dados (barras, linhas, pizzas), usar esta sequência preferencial — todas extraídas do DS Flow / Tailwind:

| Posição | Cor | Token / Hex |
|---------|-----|-------------|
| Série 1 | Indigo | `#6366f1` (indigo-500) |
| Série 2 | Emerald | `#10b981` (emerald-500) |
| Série 3 | Amber | `#f59e0b` (amber-500) |
| Série 4 | Rose | `#f43f5e` (rose-500) |
| Série 5 | Sky | `#0ea5e9` (sky-500) |
| Série 6 | Violet | `#8b5cf6` (violet-500) |

Se precisar de mais de 6 séries: usar variações de opacidade (ex: `#6366f1` → `#6366f180`) ou reportar ao time de design para extensão da paleta.

### 10.3 Cores semânticas em gráficos

Quando a cor tem significado semântico, seguir:

| Semântica | Cor | Hex |
|-----------|-----|-----|
| Positivo / Meta atingida | `success` | `#10b981` |
| Negativo / Fora da meta | `destructive` | `#ef4444` |
| Neutro / Baseline | `primary-300` | `#a5b4fc` |
| Alerta / Atenção | `warning` | `#f59e0b` |
| Dado de referência / Comparação | Cinza | `#9ca3af` (gray-400) |

### 10.4 Legenda e rótulos

Ver CLAUDE.md (regras globais):
- **Labels inline no gráfico:** `text-xs leading-4 text-[#4B5563]`
- **Tooltips:** `text-xs leading-4 text-[#6B7280] text-center` · sem `<Tooltip.Arrow />`

---

## Correlações com outros documentos

| Documento | Relação |
|-----------|---------|
| [`ds-mapping.md`](ds-mapping.md) | Detalhamento componente a componente (node Figma, variantes, onde usar) |
| [`design-system.md`](design-system.md) | Tokens, inventário de componentes, setup técnico |
| [`component-inventory.md`](component-inventory.md) | Inventário completo com status de implementação |
| [`canonical-screens.md`](canonical-screens.md) | Telas de referência que aplicam estas diretrizes |
| [`ui-quality-bar.md`](../ui-quality-bar.md) | Regras inegociáveis de qualidade de UI |
| [`accessibility-compliance.md`](../foundations/accessibility-compliance.md) | Tracker de conformidade WCAG 2.1 AA |

---

*Referências externas: Shopify Polaris · IBM Carbon Design System · Material Design 3 · Salesforce Lightning DS2*
