---
title: "Craft — Animation Discipline"
type: craft
domain: platform
status: current
updated: 2026-05-22
craft.id: animation-discipline
craft.applies-to: all
---

# Animation Discipline — Flow Platform

Regras universais sobre quando motion tem lugar numa UI Flow e quais números o constrangem. O `design-system.md` define personalidade de movimento por produto; este arquivo define se o movimento deve existir e a que duração, curva e piso de acessibilidade.

> Baseado no `craft/animation-discipline.md` do Open Design (com embasamento em pesquisa primária). Adaptado para o contexto Flow: ferramenta enterprise, não produto de consumo. O orçamento de movimento fica dentro do produto — no micro-feedback funcional — nunca no marketing de feature.

---

## Quando motion ganha seu lugar

Pesquisa (Tversky/Morrison/Bétrancourt 2002, IJHCS) mostra que animation não supera versão estática para ensinar sistemas complexos quando os controles são equalizados. O único caso endossado é **reorientação espacial ou temporal em tempo real**: transições de página, morphs de container, mudanças de viewpoint, indicadores de progresso.

**Animar quando** o usuário está se movendo por espaço, tempo ou estado:
- Navegação entre views
- Abertura/fechamento de container (sheet, modal, accordion)
- Feedback de progresso de ação
- Follow-through de gesto

**Não animar para:**
- Ensinar como algo funciona
- Decorar uma seção
- Sinalizar "premium" ou "polimento"
- Preencher silêncio durante carregamento com movimento ornamental

**Regra Flow específica — sem "delight theater":** animações elaboradas de entrada, transições cinematográficas entre abas, paralaxe decorativo e choreography de hero não têm lugar numa ferramenta de trabalho. O tempo de atenção do usuário é capital; não gastá-lo com motion que não serve à tarefa.

---

## Thresholds de duração

O consenso entre design systems (Material 3, IBM Carbon, Shopify Polaris) converge para **150ms** como duração default para feedback de confirmação de estado. Usar como âncora.

| Duração | Uso |
|---------|-----|
| 50–100ms | Feedback instantâneo (press de botão, toggle commit, hover) |
| 150ms | Default para confirmação de estado |
| 200–300ms | UI entrando (modais, sheets, dropdowns) |
| 300–500ms | Transições entre views, morphs de container |
| > 500ms | Reservado para transições cross-screen ou nativas de plataforma |

Microinterações não-navegacionais — hover, press, toggle, validação, seleção de chip, expansão de row — devem ficar abaixo de 500ms. Acima disso o usuário percebe o movimento como movimento e espera a UI em vez de trabalhar através dela.

Animações frequentes (um efeito de hover visto 50× por sessão) devem ficar ≤ 200ms. Mobile deve rodar 20–30% mais curto que desktop — distâncias de travel são menores.

---

## Curva vs spring

| Tipo de propriedade | Animação correta |
|---------------------|-----------------|
| Opacity, cor, qualquer valor entre dois pontos conhecidos | Curva cúbica (`cubic-bezier`) |
| Posição, escala, rotação, motion conduzido por gesto | Spring (parece físico) |

**Curva padrão recomendada (ease-out agressivo):**
`cubic-bezier(0.23, 1, 0.32, 1)` — front-loaded, o trailing zera a curva no target.

Não usar `ease` nativo do CSS — muito suave. Não usar `ease-in` em elementos UI — parece lento demais para resposta de ação.

Para entradas de UI (modals, sheets):
- `opacity: 0 → 1` com `cubic-bezier(0.23, 1, 0.32, 1)` em 200ms
- `transform: translateY(8px) → translateY(0)` simultâneo

Para saídas (dismiss): ~140ms — exit mais rápido parece mais decisivo.

---

## Reduced motion — obrigatório

Toda animação que translada, escala, rotaciona ou cria paralaxe deve respeitar `@media (prefers-reduced-motion: reduce)`.

**Regra operacional:**
- Remover motion em eixo (translate, scale, rotate, parallax)
- Manter crossfades de opacity/cor como substitutos quando a mudança de estado ainda precisa ser comunicada
- Ser explícito — a View Transitions API **não** aplica `prefers-reduced-motion` automaticamente

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Calibração WCAG:**
- WCAG 2.2.2 (Level A) — piso legal — cobre populações cognitivas e de leitura
- WCAG 2.3.3 (AAA) — cobre vestibular
- Construir para usuários vestibulares é compromisso de craft além do piso legal, mas está no nosso padrão de acessibilidade

**Limites de flashing:** WCAG 2.3.1 (Level A) permite flashing só se ≤3 flashes por segundo ou abaixo dos thresholds de área. Confetti, celebrações, shimmer: preferir animação one-shot em vez de loop.

---

## Motion repetitivo e ambiente

- Carousel: 3–5 ciclos, depois pausar
- Skeleton shimmer: até o conteúdo carregar — nunca indefinidamente
- WCAG 2.2.2 (Level A) exige controle de pausa para qualquer motion rodando mais de 5 segundos
- Cancelar motion ambiente na troca de rota
- Animações de reward são one-shot — confetti, sparkles, level-up disparam uma vez e saem; sem timer de loop
- Spinners não rodam indefinidamente — escalar para progress/cancel e parar animação aos 60s (ver `state-coverage.md`)

---

## Accordion e disclosure (padrão Flow)

Para abertura/fechamento de seções (accordion, collapsible, expandable cards):

```css
/* Padrão recomendado */
.collapsible {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 200ms cubic-bezier(0.23, 1, 0.32, 1);
}

.collapsible.open {
  grid-template-rows: 1fr;
}

.collapsible-inner {
  overflow: hidden;
}
```

Combinar com `opacity: 0 → 1` para suavizar entrada. Nunca animar de `height: 0 → auto` diretamente — causa reflow caro.

---

## Erros comuns a detectar

- Animação como **único** sinal de mudança de estado — usuários com reduced-motion não percebem; sempre parear com affordance estática (cor, posição, label)
- `prefers-reduced-motion` ignorado em animações com `transform` — os triggers vestibulares de maior custo
- Animação com curva em `transform: scale()` que deveria ser spring — parece mecânico
- `ease-in` em elementos UI — parece sluggish para feedback de ação
- > 500ms em qualquer transição que não seja cross-screen
- Choreography elaborada de hero em ferramenta de produtividade — o orçamento de motion fica no micro-feedback funcional
- Motion decorativo no canvas de trabalho — tabs, dashboards, listas não precisam de entrada animada
- Spinner rodando indefinidamente em request lento — escalar para progress/cancel
- Animação performando uma mudança de estado em vez de confirmá-la — UI optimista primeiro, motion depois
- Ignorar `prefers-reduced-motion` na View Transitions API — o autor deve adicionar override explícito
