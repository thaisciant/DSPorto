---
title: "Craft — Accessibility Baseline"
type: craft
domain: platform
status: current
updated: 2026-05-22
craft.id: accessibility-baseline
craft.applies-to: interactive-ui
---

# Accessibility baseline craft rules

Universal rules for the legal floor of accessibility plus the craft commitments that go beyond it. The active design system decides brand appearance; this file decides which rules an artifact has to clear before it ships.

> Adaptado de [refero_skill](https://github.com/referodesign/refero_skill) (MIT) via [nexu-io/open-design](https://github.com/nexu-io/open-design).
> Grounded in: WCAG 2.2, ISO/IEC 40500:2025, WAI-ARIA 1.3, WebAIM Million 2026 (February 2026).

## The legal floor

Target **WCAG 2.2 AA** as the working ceiling. It clears the WCAG 2.1 AA legal floor (EU/EAA, ADA Title II) and prepares for EN 301 549 v4.1.1. Anything below 2.2 AA is craft debt.

Lint integration: os BLOCKERs e WARNINGs de a11y estão em `design-lint-rules.md` — seção 6.

---

## Color contrast

| Pair | WCAG 2.x AA minimum |
|---|---|
| Normal text ≤ 16 px regular | 4.5:1 |
| Large text ≥ 18 pt regular (≈24 px) ou ≥ 14 pt bold (≈18.5 px) | 3:1 |
| Non-text UI components e graphical objects | 3:1 |
| Focus indicator vs adjacent unfocused state | 3:1 |

Thresholds são **inclusivos** — exatamente 4.5:1 ou 3:1 passa. "Large text" significa **18 pt** regular, não 18 px: 18 px regular precisa de 4.5:1; 14 pt bold (≈18.5 px) qualifica para 3:1, mas 14 px bold não qualifica.

**APCA como check paralelo de design.** Corpo em Lc ≥ 60 é um parallel pass razoável — mas WCAG 2.2 AA é o compliance floor, APCA é design-review only.

---

## Touch targets

| Bar | SC | Size |
|---|---|---|
| AA (legal floor) | 2.5.8 | **24×24 CSS px** |
| AAA (craft commitment) | 2.5.5 | 44×44 CSS px |
| iOS HIG | — | 44×44 pt |
| Material 3 | — | 48×48 dp |

WCAG 2.5.8 tem 5 exceções onde o mínimo de 24×24 não se aplica: **Spacing** (exclusion circle de 24 CSS px não intersecta adjacentes), **Equivalent** (controle alternativo de tamanho suficiente), **Inline** (dentro de sentença), **User agent control**, **Essential**. A exceção Spacing é na qual barras de ícones se apóiam — não usar as outras para justificar ações primárias com tamanho insuficiente.

---

## Focus visibility

Remover o outline via CSS é uma **triple failure**: 1.4.11 Non-text Contrast, 2.4.7 Focus Visible, e 2.4.13 Focus Appearance (AAA). Usar `:focus-visible` para usuários de teclado; suprimir o outline para mouse only quando existe affordance alternativo não-cor.

Para AAA (2.4.13): área do indicador deve igualar pelo menos um perímetro de 2 CSS px do componente, contraste ≥ 3:1 entre estado focado e não-focado. Um outline de 1 px a 3:1 não qualifica.

```css
/* ❌ BLOCKER — remove focus sem substituição */
button:focus { outline: none; }

/* ✅ CORRETO — suprime para mouse, mantém para teclado */
button:focus { outline: none; }
button:focus-visible { outline: 2px solid #000050; outline-offset: 2px; }
```

---

## Form input labels

WebAIM Million 2026: **51% dos top 1M home pages têm pelo menos um label ausente**; **33.1% de todos os 6.9M inputs são sem label** — e essa taxa está subindo (era 48.2% em 2025).

Wiring padrão (WCAG 2.2 + ARIA APG):

```html
<label for="email">Email</label>
<input id="email" type="email" required
       aria-describedby="email-hint email-error"
       aria-invalid="true">
<span id="email-hint">Usado apenas para recibos.</span>
<span id="email-error" role="alert">Email deve conter @ e um domínio.</span>
```

`aria-describedby` é o default de produção; `aria-errormessage` tem suporte incompleto em leitores de tela como de 2026-05 — tratar como progressive enhancement.

WCAG 3.3.7 Redundant Entry é **Level A** (legal floor). Re-pedir dados que o usuário já forneceu "no mesmo processo" falha a menos que o site auto-preencha ou ofereça atalho selecionável.

---

## Keyboard operability and semantic structure

- **Tab reachability** (2.1.1, Level A): todo elemento interativo deve ser alcançável e operável via teclado. `tabindex="-1"` remove do tab order; valores `tabindex > 0` quebram ordem de documento.
- **Activation keys** (2.1.1, Level A): `<button>` ativa em Enter e Space; `<a href="…">` ativa em Enter. Um `<a>` sem `href` não é link, não é focusable, não é keyboard-operable — usar `<a href="…">` para navegação ou `<button>` para ações.
- **No keyboard trap** (2.1.2, Level A): foco deve conseguir sair de qualquer componente pelas mesmas teclas que entrou. Modais são focus-trap por design — não é violação.
- **Focus order** (2.4.3, Level A): tab order deve seguir a ordem de leitura significativa. Não usar `tabindex` positivo para corrigir DOM fora de ordem — corrigir o DOM.
- **Native control first** (craft convention, 4.1.2 Level A): `<button>` é keyboard-operable, focusable, e anunciado como button por todo AT gratuitamente. `<div role="button" tabindex="0">` exige reimplementar tudo — e a maioria das reimplementações perde `aria-pressed`, estado disabled ou Space-on-keyup.
- **Document language** (3.1.1, Level A): `<html lang="pt-BR">` é obrigatório.
- **Heading hierarchy** (1.3.1, 2.4.6): preferir um `<h1>` por página e não pular níveis. Tamanho visual e nível de heading são independentes.
- **Landmarks**: usar `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` ao invés de `<div role="banner">` etc. Usuários de AT navegam por landmark.
- **Text alternatives** (1.1.1, Level A): `<img alt="…">` para imagens de conteúdo, `alt=""` para decorativas; `aria-label` em botões icon-only; descrição textual para charts e SVG de dados.

---

## ARIA discipline

WebAIM Million 2026: páginas com ARIA têm média de **59.1 erros** vs **42** em páginas sem ARIA. ARIA deployment supera ARIA correctness.

Decision order (ARIA APG):
1. Native HTML element com a semântica correta.
2. Native element sob visuais customizados se restyling for necessário.
3. APG pattern verbatim se nem um nem outro serve.
4. APG pattern mais desvio documentado. Último recurso.

Nunca inventar ARIA.

---

## Reduced motion and flashing

Ver `animation-discipline.md` para o conjunto completo de regras. O não-negociável que ancora aqui: WCAG 2.3.1 (Level A) — flashing mais de 3× por segundo é não-conforme a menos que a área do flash fique abaixo dos thresholds de flash geral e vermelho. Epilepsia fotossensível é a preocupação protegida.

---

## Common mistakes (lint these)

- "Target Size 44×44 é o bar AA." Errado. 44×44 é **AAA** (2.5.5). AA é **24×24** (2.5.8).
- "18 px = large text." Errado. O threshold é 18 *pt* regular (≈24 px) ou 14 pt bold (≈18.5 px).
- "Tabindex corrige focus order." `tabindex > 0` reordena contra o DOM e quase sempre piora. Corrigir o DOM.
- "Modal que trapa foco = keyboard trap." Um modal que trapa foco até Escape/fechar é comportamento correto, não violação de 2.1.2.
- "Adicionar ARIA melhora acessibilidade." Empiricamente o oposto — WebAIM Million 2026: páginas com ARIA têm 59.1 erros em média vs 42 sem ARIA.
- "`<a>` com click handler é um link." Errado. `<a>` sem `href` não é focusable, não é keyboard-operable, não é link.
- Remover focus outline com `outline: none` sem substituição. Triple failure: 1.4.11, 2.4.7, 2.4.13.
- Placeholder text como único label de input. Falha 1.3.1 e 3.3.2; placeholder some ao digitar.
- `<button>` nativo reimplementado como `<div role="button">` sem keyboard handling, focus ou `aria-pressed`.
