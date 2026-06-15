---
title: Navigation Rules — Flow Platform
type: reference
domain: platform
status: current
updated: 2026-04-17
---

# Navigation Rules — Flow Platform

Regras obrigatórias de navegação para protótipos. Baseadas nos padrões reais do produto.

---

## Regras estruturais

### 1. Shell antes de tela
Antes de criar qualquer tela, o shell deve estar definido. Ver `ui-shells.md`.

### 2. Rotas reais
Cada estado da interface deve ser acessível por uma rota real — não por tabs de cenário, não por botões escondidos.

```
✓ /aims/ops          → estado default
✓ /aims/ops/loading  → estado de loading (demo)
✗ /aims/ops?tab=loading  → tab de cenário — proibido
```

### 3. CTAs no footer fixo
Ações primárias e secundárias de fluxo **nunca** ficam dentro do scroll container.

```
✓ footer shrink-0 com botões fixos
✗ botão "Salvar" no final do conteúdo scrollável
```

### 4. Estados na mesma rota
Estados de loading, error e success acontecem **na mesma rota** da tela principal. Não criar rotas separadas para estados.

### 5. Entrada definida
Todo fluxo tem uma entrada clara. Protótipos começam por uma view de entry/setup — nunca abrindo direto no meio de um fluxo.

### 6. Continuidade espacial
O usuário não deve se perder entre telas. Usar breadcrumb, títulos de seção e back navigation quando necessário.

---

## Padrões de roteamento por shell

### AppShell / ProductShell
- Router: `BrowserRouter` (HashRouter apenas para deploy estático sem servidor)
- Estrutura: `Shell` como layout com `<Outlet>`, rotas filhas por produto
- Exemplo: `/aims/*`, `/findr/*`

### WizardShell
- Rotas por step: `/setup/wizard/1`, `/setup/wizard/2`…
- Entrada: `/setup` ou `/setup/wizard/intent`
- Conclusão: `/setup/wizard/ready` ou redirect para view principal

### PortalShell
- Rota única ou por categoria
- Sem sub-navegação de produto

---

## Navegação inter-produto

- Produtos são acessados pela sidebar canônica (ícones)
- Cada produto tem seu próprio namespace de rota
- Não criar rotas cross-produto (ex: `/chat/from-findr`)

---

## URL parameters

- `?panel=action-center` → abre painéis overlay (padrão aims-app)
- Parâmetros de URL devem ser limpos ao fechar o painel
- Não usar query params para estado principal de tela
