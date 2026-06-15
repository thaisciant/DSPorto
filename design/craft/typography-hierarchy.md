---
title: "Craft — Typography Hierarchy"
type: craft
domain: platform
status: current
updated: 2026-05-22
craft.id: typography-hierarchy
craft.applies-to: all
---

# Typography Hierarchy — Flow Platform

Contrato de como a hierarquia tipográfica se *comporta* no Flow. Não repete escala ou valores — isso está em `design-system.md`. Este arquivo define entry points, ritmo, tensão e quando violações controladas são permitidas.

> Baseado no `craft/typography-hierarchy.md` do Open Design, adaptado para Inter variable e a escala de tokens Flow.

---

## O contrato central

Todo surface tipográfico deve satisfazer os três:

1. **Um ponto de entrada dominante.** O olho precisa de um lugar para começar. Um elemento vence a hierarquia — não dois, não três. Se tudo compete, nada lidera.
2. **Ritmo intencional entre níveis.** Hierarquia não é uma lista de tamanhos. É o *contraste* entre eles. Níveis adjacentes próximos demais em escala, peso ou espaçamento produzem uma superfície plana, indiferenciada.
3. **Fluxo de informação recuperável.** A hierarquia pode ser invertida ou comprimida — mas o usuário ainda deve conseguir reconstruir a estrutura do conteúdo sem reler. Se não conseguir, é caos, não tensão.

---

## Escala de tokens Flow

| Token | Tamanho | Peso padrão | Uso |
|-------|---------|-------------|-----|
| `text-xs` | 12px | 400 | Labels, metadados, captions |
| `text-sm` | 14px | 400 / 500 | Body padrão, itens de lista |
| `text-base` | 16px | 400 / 500 | Body expandido, parágrafos |
| `text-lg` | 18px | 500 / 600 | Subheadings, títulos de card |
| `text-xl` | 20px | 600 | Section headings |
| `text-2xl` | 24px | 600 / 700 | Page headings |
| `text-3xl` | 30px | 700 | Display (usar raramente) |

**Font:** Inter variable — o único permitido no Flow. Peso 510 (entre `font-normal` 400 e `font-medium` 500) existe via `font-[510]` com Inter variable e é especialmente útil para labels de alto volume sem peso visual pesado.

---

## Vetores de hierarquia

Escala é um dos vetores. Usar os cinco.

| Vetor | O que controla | Direção de hierarquia |
|-------|----------------|-----------------------|
| Escala | Contraste de tamanho entre níveis | Grande → pequeno = primário → secundário |
| Peso | Contraste de massa | Mais pesado = primário (ver violações controladas) |
| Espaçamento | Breathing room ao redor | Mais espaço = mais importância visual |
| Tracking | Tensão e velocidade | Mais apertado = mais rápido; mais espaçado = mais cerimonial |
| Alinhamento | Relação com a grade | Quebra de alinhamento sinaliza importância |

Nenhum vetor é obrigatório isoladamente. Um heading pode liderar só pelo espaçamento se a escala foi deliberadamente suprimida. Mas o elemento dominante deve ter pelo menos **dois vetores trabalhando na mesma direção**.

---

## Papel semântico ≠ papel visual

Permitido. Não é erro.

Um `<h1>` pode renderizar mais quieto que um `<p>` próximo se a composição exige. Copy de body pode se comportar como display. Um label pode superar visualmente um heading.

**A condição:** o fluxo de informação deve permanecer intacto. Um usuário lendo linearmente ainda deve entender o que é importante, o que suporta, e o que é incidental — independente de qual elemento "vence" visualmente.

---

## Os dois modos de falha

### Hierarquia plana
Tudo no mesmo peso visual. O surface parece uma parede. Causado por:
- Steps de escala próximos demais (ex: 14/16/18px para três níveis)
- Peso usado uma única vez (tudo `font-normal` ou tudo `font-medium`)
- Espaçamento uniforme entre todos os elementos

**Fix:** aumentar contraste entre níveis. Usar pelo menos dois vetores simultaneamente.

### Hierarquia barulhenta
Elementos demais competindo por dominância. Tudo é bold, grande, ou colorido. O olho não tem ponto de descanso nem caminho.

**Fix:** promover um elemento deliberadamente. Rebaixar todo o resto — incluindo o que parece importante. Hierarquia é relativa, não absoluta.

---

## Violações controladas

As seguintes são explicitamente permitidas quando os três contratos centrais são atendidos:

| Violação | Permitida quando |
|----------|-----------------|
| Body copy em escala display | É o entry point intencional e nada mais compete |
| Heading renderizado mais leve que o body | Inversão visual intencional com fluxo de informação intacto |
| Zero contraste de escala entre níveis | Hierarquia carregada inteiramente por espaçamento ou tracking |
| Nenhum elemento de heading visível | Hierarquia emerge do layout/espaçamento sozinho |
| Espaçamento de nível primário em elemento secundário | Cria tensão deliberada mantendo fluxo de informação |

---

## Espaçamento como hierarquia

Espaçamento é um vetor completo. Um nível tipográfico pode ser elevado inteiramente pelo whitespace ao redor sem alterar tamanho ou peso.

Regras Flow (mapeadas nos tokens de espaçamento):

| Token | Valor | Uso de hierarquia |
|-------|-------|-------------------|
| `gap-1` / `space-1` | 4px | Interno a componentes |
| `gap-2` / `space-2` | 8px | Entre elementos relacionados num mesmo card |
| `gap-4` / `space-4` | 16px | Padding interno de card, entre campos |
| `gap-6` / `space-6` | 24px | Separação entre seções numa view |
| `gap-8` / `space-8` | 32px | Separação entre blocos distintos |
| `gap-12` / `space-12` | 48px | Separação entre seções de página |

- Espaço acima de um elemento sinaliza sua relação com o que veio antes
- Espaço abaixo sinaliza sua relação com o que vem depois
- Elemento isolado com espaço grande ao redor lê como display — independente do tamanho da fonte
- Espaçamento uniforme entre todos os elementos destrói hierarquia espacial

---

## Modelo de trabalho em três níveis

A maioria dos surfaces pode ser mapeada em três níveis funcionais:

| Nível | Papel | Vetores típicos |
|-------|-------|-----------------|
| **Primário** | Entry point. Um por vez por região visual | Escala, espaçamento ou quebra de alinhamento |
| **Secundário** | Estrutura. Subdivide ou suporta o primário | Peso, step de escala ou mudança de tracking |
| **Terciário** | Incidental. Labels, captions, metadados | Redução de escala, redução de peso, tracking positivo |

Mais de três níveis visíveis acima do fold é geralmente um problema de composição, não uma oportunidade de hierarquia. Colapsar ou rebaixar antes de adicionar um quarto nível.

---

## Anti-patterns

- **Escada de peso graduada** — regular → medium → semibold → bold → extrabold, cada nível um step mais pesado. Parece escala padrão, não hierarquia autoral. Peso deve *saltar*, não escalar gradualmente.
- **Espaçamento uniforme entre seções** — todo gap é o mesmo valor. Nenhuma informação de hierarquia carregada pelo espaçamento.
- **Heading como único vetor** — o heading é grande e bold; todo o resto é flat. Um sinal de que espaçamento e tracking não estão sendo usados como vetores.
- **Ênfase simétrica** — dois elementos recebem o mesmo peso visual como co-primários. Escolher um. O outro vira secundário.
- **Hierarquia só por tamanho** — todo contraste está no font-size. Frágil — qualquer constraint de layout que colapsa o contraste de tamanho destrói a hierarquia.

---

## Lint

- [ ] Um elemento é inequivocamente dominante acima do fold
- [ ] Pelo menos dois vetores de hierarquia estão ativos no elemento dominante
- [ ] Nenhum dois níveis adjacentes compartilham a mesma escala, peso E espaçamento
- [ ] Espaçamento entre níveis varia — pelo menos um gap é ≥1.5× os outros
- [ ] Inversões semântico/visuais permanecem estruturalmente legíveis
- [ ] Steps de escala entre níveis são ≥1.25× ou compensados por salto de peso/espaçamento
- [ ] No máximo um elemento lê como primário acima do fold
