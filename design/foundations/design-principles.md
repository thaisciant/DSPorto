---
title: Design Principles — Flow Platform
type: reference
domain: platform
status: current
updated: 2026-04-17
---

# Design Principles — Flow Platform

Princípios que guiam todas as decisões de interface no Flow. Complementa o `ui-quality-bar.md` com o raciocínio por trás das regras.

---

## Princípios fundamentais

### 1. Sistema > preferências individuais
Interfaces são partes de um sistema. Cada decisão impacta consistência cross-produto. Preferências pessoais não justificam novos padrões.

### 2. Reuso > criação
Antes de criar qualquer componente, tela ou padrão: verificar o que já existe.
Ordem de decisão: DS → shadcn → composição existente → novo (com justificativa).

### 3. Clareza > densidade
Interface clara é interface usável. Não adicionar elementos, cards, ou seções sem função clara. Cada elemento deve ganhar seu espaço.

### 4. Continuidade espacial
O usuário não deve se perder. Contexto deve ser preservado entre telas. Breadcrumbs, títulos e back navigation existem para isso.

### 5. Estados são parte do design
Loading, erro, vazio e sucesso não são afterthoughts — são parte do fluxo real. Uma tela sem esses estados está incompleta.

### 6. Confiança do usuário
O sistema deve comunicar o que está acontecendo. Feedback imediato em toda ação. Erros com contexto e caminho de recovery. Ações destrutivas com confirmação explícita.

### 7. Acessibilidade é obrigatória
Contraste adequado, navegação por teclado, labels claros, erros com texto (não só cor). Interface inacessível = interface inválida.

---

## Design System — tokens obrigatórios

### Cores principais

| Token | Valor | Uso |
|-------|-------|-----|
| Primary/800 | `#000050` | Navy — cor primária, texto forte, ícones ativos |
| Secondary/400 | `#fa5a50` | Coral — CTAs destaque, ações primárias |
| Success | `#16a34a` | bg: `#f0fdf4` |
| Error | `#dc2626` | bg: `#fef2f2` |
| Info | `#3b82f6` | bg: `#eff6ff` |
| Warning | `#eab308` | bg: `#fefce8` |
| Background | `#f8f9fc` | Background geral das views |
| Border | `#edf2f7` | Bordas de sidebar e containers |

### Tipografia
- Font: Inter (variable)
- Tamanhos: 12 / 14 / 16 / 18 / 20 / 24 / 30px

### Ícones
- **Único permitido:** `react-icons/tb` (Tabler Icons)
- Nunca usar `lucide-react`, `heroicons` ou outros
- Verificar existência antes de usar: `TbBrand*` podem não existir
- `TbBrandJira` não existe → usar `TbCode`

### Stack técnica obrigatória
- React + TypeScript + Vite
- Tailwind CSS v3
- Radix UI (primitivos)
- `react-icons/tb` — único pacote de ícones permitido

---

## Padrões de layout obrigatórios

```
div.flex.h-screen.overflow-hidden     ← root
  Sidebar (shrink-0)
  main.flex-1.flex.flex-col.overflow-hidden
    header (shrink-0)                 ← fixo, não scrollável
    div.flex-1.overflow-y-auto        ← scroll container
    footer (shrink-0)                 ← CTAs fixos, NUNCA dentro do scroll
```

### Radix Select — fix obrigatório
```tsx
<SelectTrigger className="relative">
<SelectScrollUpButton className="hidden" />
<SelectScrollDownButton className="hidden" />
```

---

## Cor representa estado de sistema

Cor semântica representa **estado do sistema**, nunca contexto, papel ou categoria do usuário.

```
✓ verde = sucesso | vermelho = erro | amarelo = alerta | azul = info
✗ verde = time A | vermelho = time B — proibido
```

---

## Heurísticas de avaliação

Ao avaliar qualquer interface, aplicar na ordem:

1. **Visibilidade do estado** — o sistema está comunicando o que está acontecendo?
2. **Correspondência com o mundo real** — linguagem e metáforas fazem sentido para o usuário?
3. **Controle e liberdade** — o usuário pode desfazer, voltar, cancelar?
4. **Consistência** — mesmo problema → mesmo padrão em todo o produto?
5. **Prevenção de erros** — a interface previne erros antes que aconteçam?
6. **Reconhecimento > memorização** — o usuário precisa lembrar ou pode reconhecer?
7. **Eficiência** — usuários frequentes têm atalhos?
8. **Minimalismo** — cada elemento ganha seu espaço?
9. **Recovery de erros** — erros têm contexto e caminho claro de recuperação?
10. **Documentação** — quando necessário, está acessível?

---

## Princípio geral de UX

> Todas as escolhas devem priorizar uma boa usabilidade sem comprometer a interface nem a acessibilidade.
