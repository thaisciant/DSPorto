---
title: "Craft — Laws of UX"
type: craft
domain: platform
status: current
updated: 2026-05-22
craft.id: laws-of-ux
craft.applies-to: all
---

# Laws of UX craft rules

Universal cognitive, perceptual, and behavioral heuristics that decide what a UI composes — how many options fit on a screen, where a primary action anchors in scanning order, when a progress indicator earns its place, why a settings list needs grouping. O design system decide linguagem visual; os outros módulos `craft/` decidem regras de renderização; este arquivo decide **regras de composição** fundamentadas em pesquisa nomeada.

> Adaptado de [refero_skill](https://github.com/referodesign/refero_skill) (MIT) via [nexu-io/open-design](https://github.com/nexu-io/open-design).
> Grounded in primary sources: Hick (1952), Miller (1956), Cowan (2001), Fitts (1954), Wertheimer (1923), Palmer (1992), Kahneman et al. (1993), Zeigarnik (1927), Hull (1932), von Restorff (1933), Broadbent (1958), Sweller (1988), Nielsen (2000), Norman (1988), Carroll & Rosson (1987), Tversky & Kahneman (1974), Parkinson (1955).

**Uso com as heurísticas de Nielsen:** quando uma violação heurística é identificada (ver `ux-review-protocol.md`), use este módulo para nomear a lei cognitiva subjacente — ela fundamenta a severidade. Ex: "H8 violado por 7 opções primárias visíveis = Hick's Law + Choice Overload."

As regras abaixo são **guidance**, não auto-checked. Revisores e o agente as aplicam; o linter não.

---

## Perception and visual grouping

- **Law of Proximity** (Wertheimer, 1923). Objetos próximos leem como grupo. É o sinal de agrupamento mais barato — mais barato que bordas ou cor compartilhada. Aplicar ritmo vertical variável: 8–12 px dentro de um grupo, 32–48 px entre grupos. Espaçamento uniforme não agrupa nada.

- **Law of Similarity** (Wertheimer, 1923). Elementos visualmente similares leem como grupo. Affordances equivalentes devem ter tratamento igual — toda linha de lista com o mesmo conjunto de classes, todo botão secundário idêntico, toda ação destrutiva idêntica. Desvio visível é reservado para o único item que deve atrair atenção.

- **Law of Common Region** (Palmer, 1992). Uma área delimitada compartilhada une os elementos dentro dela. Usar enclosure quando proximidade não é suficiente — e reservar. Números concretos: padding ≥ 16 px dentro da região, superfície distinta (borda + fundo tingido, ou chrome de card com ≥ 1 px hairline). Uma página onde toda seção tem borda destrói o sinal.

- **Law of Prägnanz / Good Figure** (Wertheimer, 1923). O olho resolve layouts complexos na forma subjacente mais simples. Designs que alinham com um grid claro (12 colunas, F-pattern, 4 quadrantes) parecem inevitáveis; quebras ornamentais que não acrescentam semântica parecem arbitrárias.

- **Law of Uniform Connectedness** (Palmer & Rock, 1994). O sinal de agrupamento mais forte da hierarquia Gestalt: linhas conectadas, toolbars compartilhadas ou containers de delimitação unem itens mais fortemente do que proximidade ou similaridade. Usar para wizard steps, comparison sets, fluxos de navegação explícitos.

- **Selective Attention** (Broadbent, 1958). Largura de banda cognitiva é finita. Usuários filtram agressivamente e ignoram qualquer coisa que pareça irrelevante para seu objetivo — banner blindness vem disso. Reservar o contraste visual mais forte para a única ação relevante ao objetivo; deixar conteúdo de suporte recuar em peso.

- **Von Restorff Effect** (von Restorff, 1933). O item que difere de um campo uniforme é o mais provável de ser lembrado. Fazer o tier recomendado de pricing, o item ativo de nav, o estado de warning visualmente distintos. Parear contraste com sinal não-cor (ícone, text label, posição) — sinalização só por cor falha para daltônicos.

- **Aesthetic-Usability Effect** (Kurosu & Kashimura, 1995). Polimento visual enviesa a usabilidade percebida. Tipografia refinada, espaço em branco generoso e paleta calma ganham o benefício da dúvida para friction menor. Nunca substitui usabilidade mensurável.

---

## Decision-making

- **Hick's Law** (Hick, 1952; Hyman, 1953). Tempo de decisão cresce aproximadamente log(n+1) com o número de opções equivalentes. Cap de 3–5 opções primárias visíveis por tela de decisão; colapsar o resto atrás de "More" / progressive disclosure; distinguir visualmente a escolha recomendada. Truncar agressivamente escondendo o caminho à frente é o oposto failure mode.

- **Choice Overload** (Iyengar & Lepper, 2000). Opções demais praticamente equivalentes param ou abandonam a decisão. Pricing pages: 3–4 tiers, exatamente um marcado como recomendado. Product grids: 6–9 hero cards acima do fold. Settings panels: ≤ 5 grupos nomeados.

- **Anchoring** (Tversky & Kahneman, 1974). O primeiro número que o usuário vê repesa todos os subsequentes. Posicionar o tier recomendado de pricing onde ancora a comparação; renderizar savings de billing anual como deltas de dólar concretos, não apenas badges de porcentagem; pré-selecionar o default mais seguro em radio groups.

- **Pareto Principle / 80-20** (Pareto, c.1906; Juran, 1951). Uma pequena fração de features dirige a maior parte do valor. Identificar as 2–3 ações que dirigem a jornada dominante para a persona-alvo; enfatizá-las visualmente; rebaixar a cauda longa para overflow menus, superfícies de footer ou settings.

- **Tesler's Law / Conservation of Complexity** (Tesler, Apple, 1980s). Todo produto tem uma quantidade irredutível de complexidade. A escolha de design é *onde* ela vive — equipe de engenharia, interface ou usuário. Quando a complexidade chega ao usuário, surfacear guidance contextual (tooltips, defaults inteligentes, empty-state coaching inline, progressive disclosure) no passo exato onde ela aparece.

- **Occam's Razor** (Ockham, séc. XIV). Entre opções que explicam os dados igualmente bem, preferir a que tem menos suposições. Especificar um inventário mínimo de elementos; proibir chrome decorativo que não serve a uma tarefa declarada do usuário.

---

## Memory and learning

- **Miller's Law and Chunking** (Miller, 1956; Cowan, 2001 para bound ~4 itens). Memória de trabalho retém cerca de 4 itens de forma confiável e até 7 para recall de curto prazo — mas cada slot pode conter uma *unidade familiar maior*, limitada pelo conhecimento de domínio do usuário. Agrupar campos relacionados com headings de seção, dividers ou containers de card. Uma página de settings com seções "Account / Notifications / Privacy / Billing / Danger zone" supera uma lista flat de 30 toggles.

- **Working Memory** (Baddeley & Hitch, 1974). Itens decaem em segundos sem rehearsal. Recognition bate recall: persistir contexto anterior entre telas, marcar elementos visitados e surfacear views de comparação supera forçar o usuário a memorizar. Em dashboards: sticky filter chips, últimas N seleções persistidas, breadcrumbs que incluem filtros aplicados.

- **Serial Position Effect** (Ebbinghaus, 1885). Recall favorece os extremos — primacy no início, recency no fim — enquanto itens do meio desvanecem. Ancorar os itens de nav mais importantes nas posições leftmost e rightmost de um menu horizontal; agrupar utilities no meio.

- **Peak-End Rule** (Kahneman, Fredrickson, Schreiber, Redelmeier, 1993). Memória de uma experiência é dominada pelo pico emocional e pelo fim, não pela média. Construir um success state celebratório de alto esforço; deixar steps intermediários calmos. O pico pertence ao *final* de um fluxo, não como motion arbitrário de meio de fluxo — `animation-discipline.md` rejeita motion que performatiza em vez de confirmar uma mudança de estado.

- **Zeigarnik Effect** (Zeigarnik, 1927). Tarefas incompletas criam tensão cognitiva que puxa o usuário de volta. Progress visível ("3 of 5 steps", seções acinzentadas) converte essa tensão em pressão de conclusão. Reservar para fluxos genuinamente benéficos como onboarding; aplicar o mesmo recurso a streaks, daily-quest counters ou nags de notificação é dark pattern.

---

## Interaction and motor

- **Fitts's Law** (Fitts, 1954). Tempo para adquirir um alvo depende de sua distância e tamanho — maior e mais próximo é mais rápido. Espaçamento entre hit zones adjacentes importa tanto quanto o tamanho. Parear com o floor de touch target de 24×24 CSS px AA de `accessibility-baseline.md`; em mobile, colocar controles de alta frequência no arco natural do polegar.

- **Doherty Threshold** (Doherty & Thadani, 1982). Feedback sub-segundo mantém usuários em flow; latência acima de ~1 s quebra atenção. A diretiva implementável vive na tabela de loading-threshold de `state-coverage.md` (nenhum indicador abaixo de 300 ms; skeleton 300 ms–2 s; spinner rotulado 2–10 s; barra determinada com cancel 10–60 s; parar e oferecer error/retry após 60 s).

- **Flow** (Csíkszentmihályi, 1975). Flow fica no equilíbrio entre desafio e habilidade — difícil demais gera frustração, fácil demais gera tédio. Feedback contínuo e senso claro de controle mantêm o usuário no estado. Friction e latência do sistema são as formas mais rápidas de quebrá-lo.

- **Goal-Gradient Effect** (Hull, 1932). Motivação para concluir sobe conforme o objetivo se aproxima. Fluxos multi-step renderizam com indicador de progresso proeminente que reflete progresso *real* — mostrar pré-requisitos concluídos quando realmente existem. Quando nenhum pré-requisito real existe, renderizar o step atual honestamente como `1 de N`.

- **Postel's Law / Robustness Principle** (Postel, RFC 760, 1980). "Be liberal in what you accept, conservative in what you send." Aceitar input no formato que os usuários naturalmente fornecem (números de telefone com ou sem traços, datas em formatos mistos, porcentagens com ou sem `%`); normalizar internamente; emitir um formato consistente na saída.

---

## Behavior and expectation

- **Jakob's Law** (Nielsen, 2000). Usuários passam a maior parte do tempo em outros produtos e esperam que o seu funcione da mesma forma. Reutilizar convenção de categoria — posição de nav, ícone de carrinho, settings gear, CTA primário no upper right de SaaS landing — para que o usuário gaste zero ciclos reaprendendo gramática de interação. Novidade deve ganhar seu lugar contra o ROI da convenção.

- **Mental Model** (Craik, 1943; Norman, 1988). Todo usuário chega com um prior construído de produtos concorrentes e do mundo físico. Quando a previsão se confirma, o produto parece intuitivo; quando quebra, friction aparece como confusão, não curiosidade. Quando o brief nomeia um produto de referência, ancorar explicitamente — o agente herda uma gramática de interação transferível.

- **Paradox of the Active User** (Carroll & Rosson, 1987). Usuários pulam o manual e começam a usar o software imediatamente, mesmo quando ler seria mais rápido. Construir guidance dentro da própria superfície — empty-state coaching, tooltips inline, hints contextuais — no ponto de ação.

- **Parkinson's Law** (Parkinson, 1955). Trabalho se expande para preencher o tempo alocado a ele. Interfaces frouxas deixam usuários procrastinarem; cortar friction e pré-preencher o que for possível — autofill, defaults inteligentes, estado salvo — para que um fluxo termine mais rápido do que o usuário esperava. Superar a duração antecipada vira o ganho percebido.

- **Cognitive Load** (Sweller, 1988). Esforço mental total se divide em intrínseco (dificuldade inerente da tarefa) e extrínseco (layout ruim, jargão, padrões inconsistentes, ruído visual). Designers não podem reduzir carga intrínseca; possuem completamente a extrínseca. As diretivas de visual restraint (`color.md`, `typography-hierarchy.md`, anti-default list de `anti-ai-slop.md`) já restringem a carga extrínseca — este item existe para nomear o custo cognitivo que as regras irmãs reduzem.

---

## Common mistakes (lint these)

- "Hick's Law = limitar listas a 7 itens." Miller's Law é sobre chunking; Hick's é sobre tempo de decisão com opções equivalentes. Listas longas de itens não-equivalentes (log de atividade, resultados de busca) não violam Hick's.
- "Anchoring effect = Tversky & Kahneman 1972." O paper é de 1974 (*Science* 185:1124–1131).
- "Tesler's Law foi desenvolvida no Xerox PARC." Tesler foi para a Apple em 1980; a formulação Conservation-of-Complexity é dos anos na Apple.
- "Paradox of the Active User foi um artigo da CACM." É um capítulo em Carroll's *Interfacing Thought* (MIT Press, 1987).
- "Selective Attention = resolvida com dots vermelhos e badges." Iscas de atenção repetidas treinam banner blindness. Reservar o contraste mais forte para uma ação goal-relevant por superfície.
- "Fitts's Law é suficiente para touch targets." Fitts dá o tradeoff velocidade-precisão. WCAG 2.2 SC 2.5.8 define o floor AA em 24×24 CSS px; iOS HIG sugere 44×44 pt; Material 3 sugere 48×48 dp. Fitts + floor de plataforma — nunca só Fitts.
- "Goal-Gradient = progresso fabricado justificado." Hull descreve o efeito; aplicá-lo a streaks, daily-quest counters ou cotas de loyalty program é dark pattern.
