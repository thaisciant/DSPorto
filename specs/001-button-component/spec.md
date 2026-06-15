# Feature Specification: Button Component — DS Essential 2.0

**Feature Branch**: `001-button-component`

**Created**: 2026-06-15

**Status**: Draft

**Input**: Desenvolva o componente Button.fig com breakpoint, tipografia, cores, espaçamento,
especificação de primário (large, md e sm), secundário (large, md e sm), arredondamentos,
responsividade e acessibilidade. Develop in Web (React), Android Native (Kotlin), iOS Native (Swift).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Trigger a primary action (Priority: P1)

A product engineer adds a Button to a screen and the user taps/clicks it to trigger
the application's main action (e.g., "Publicar bundle", "Criar solução").

**Why this priority**: Primary is the most-used variant and the entry point for all
other variants. Without it, no other story can be demonstrated.

**Independent Test**: A standalone screen with a single Primary MD Button renders
correctly, responds to tap/click with a visible pressed state, and the correct
action callback fires — verifiable with no other variant present.

**Acceptance Scenarios**:

1. **Given** the Button is in its default state, **When** the user views it,
   **Then** it displays the correct background colour, label text, and size tokens
   for the requested size (SM / MD / LG).
2. **Given** the Button is enabled, **When** the user hovers over it (web),
   **Then** the background transitions to the hover colour within 150 ms.
3. **Given** the Button is enabled, **When** the user presses it,
   **Then** the active/pressed state colour is applied while the press is held.
4. **Given** the Button action is in progress, **When** the loading state is active,
   **Then** a spinner replaces or accompanies the label and the button is non-interactive.
5. **Given** the Button is disabled, **When** the user attempts to interact,
   **Then** no action fires, the cursor shows "not-allowed" (web), and the disabled
   colour tokens are applied.

---

### User Story 2 — Trigger a secondary action (Priority: P2)

A product engineer uses the Secondary variant alongside a Primary to give the user
an alternative, lower-emphasis action (e.g., "Salvar rascunho" next to "Publicar").

**Why this priority**: Secondary is the second most common variant; it shares most
infrastructure with Primary but adds border rendering.

**Independent Test**: A standalone screen with a Secondary MD Button beside a
Primary MD Button shows the correct outlined appearance, distinct from Primary,
and fires its callback independently.

**Acceptance Scenarios**:

1. **Given** a Secondary Button is rendered, **When** the user views it,
   **Then** it shows a transparent background with a 1 px brand-colour border and
   brand-colour label text.
2. **Given** a Secondary Button is hovered (web), **When** the cursor enters the
   button area, **Then** the background fills with the `xlight` brand colour.
3. **Given** a Secondary Button is disabled, **When** rendered, **Then** the border
   colour and text colour shift to neutral disabled tokens.

---

### User Story 3 — Adapt layout across viewport sizes (Priority: P3)

A product engineer places a Button inside a responsive layout; the Button must
render correctly across mobile (≥ 320 px), tablet (≥ 768 px), and desktop
(≥ 1440 px) viewports without overflowing or losing touch-target compliance.

**Why this priority**: Responsiveness is a cross-cutting concern but does not block
the core interaction stories.

**Independent Test**: A Primary MD Button in a fluid container at 320 px, 768 px,
and 1440 px viewports maintains its token-defined height, padding, and minimum
touch target of 44 × 44 pt without text truncation.

**Acceptance Scenarios**:

1. **Given** the viewport is 320 px wide, **When** a Button is rendered inside a
   full-width container, **Then** the button expands to fill the container width
   while keeping its SM or MD height.
2. **Given** the viewport is ≥ 768 px, **When** the same Button is rendered,
   **Then** it reverts to intrinsic (content-driven) width.
3. **Given** the label text is long (> 30 chars), **When** rendered at any viewport,
   **Then** the text does not overflow — it truncates with ellipsis or wraps
   within the button boundary.

---

### User Story 4 — Navigate and activate with keyboard and assistive technology (Priority: P4)

A user navigating with only a keyboard (Tab, Enter, Space) or a screen reader
(VoiceOver, TalkBack) can locate, identify, and activate every Button variant.

**Why this priority**: Accessibility is non-negotiable per the constitution
(WCAG 2.1 AA) but requires the core interaction stories to be in place first.

**Independent Test**: Using a keyboard only on a screen containing one Primary and
one Secondary Button, both buttons receive focus in DOM order, display a visible
focus ring, and their labels are announced correctly by a screen reader — without
any mouse interaction.

**Acceptance Scenarios**:

1. **Given** a Button is focusable, **When** it receives keyboard focus,
   **Then** a 2 px focus ring in the interactive-focus colour appears with 2 px
   offset from the button edge.
2. **Given** a Button has a visible label, **When** a screen reader encounters it,
   **Then** the accessible name matches the visible label text exactly.
3. **Given** the Button is disabled, **When** traversed by a screen reader,
   **Then** it is announced as "dimmed" / disabled and cannot be activated.
4. **Given** a Button has an icon-only layout, **When** read by a screen reader,
   **Then** an `aria-label` describing the action is announced in place of the icon.

---

### Edge Cases

- What happens when the label text is empty or whitespace only?
- How does the Button render when placed inside an RTL (right-to-left) layout?
- What happens when both `icon-leading` and `icon-trailing` slots are filled simultaneously?
- How does the Button behave when its parent container is narrower than the
  minimum touch-target width (44 pt)?
- What renders when the loading state is triggered but the action resolves in < 300 ms?

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Button MUST support four variants: Primary, Secondary, Ghost,
  Destructive — each with distinct visual treatment per the token documentation.
- **FR-002**: Each variant MUST be available in three sizes — SM, MD, LG —
  with token-defined heights of 32 px, 40 px, and 48 px respectively.
- **FR-003**: The Button MUST render six interaction states: default, hover, focus,
  active/pressed, disabled, and loading.
- **FR-004**: All colour, spacing, typography, and shape values MUST be consumed
  exclusively from design tokens — no hard-coded values permitted.
- **FR-005**: The Button MUST support an optional leading icon slot and an optional
  trailing icon slot; the label slot is always mandatory.
- **FR-006**: On viewports < 768 px (channel.breakpoint.tablet), a Button inside a
  full-width container MUST expand to 100% container width.
- **FR-007**: The touch/click target MUST be ≥ 44 × 44 pt on all platforms to meet
  WCAG 2.5.5 (Target Size).
- **FR-008**: The Button MUST expose a loading state that disables interaction and
  provides a spinner or activity indicator.
- **FR-009**: Disabled Buttons MUST convey their state through both colour and, on
  mobile platforms, a `contentDescription`/`accessibilityLabel` annotation — not
  colour alone.
- **FR-010**: The focus ring MUST be 2 px wide with 2 px offset, rendered in the
  interactive-focus token colour (`#5B9BFF`), and visible on all platforms that
  support keyboard navigation.
- **FR-011**: All text contrast ratios MUST meet WCAG 2.1 AA (≥ 4.5:1 for normal
  text, ≥ 3:1 for large text / UI components).
- **FR-012**: The Button MUST be fully operable via keyboard (Tab to focus,
  Enter/Space to activate) on web platforms.
- **FR-013**: The Button MUST support dark mode by switching to the dark-mode token
  values defined in the theme collection without any code change in the consuming
  component.

### Key Entities

- **ButtonVariant**: `primary | secondary | ghost | destructive` — determines the
  colour treatment applied to background, foreground, and border slots.
- **ButtonSize**: `sm | md | lg` — determines height, horizontal padding, vertical
  padding, icon size, gap, and font size via numeric-values tokens.
- **ButtonState**: `default | hover | focus | active | disabled | loading` —
  determines which colour token set is applied at render time.
- **ButtonSlot**: `icon-leading | label | icon-trailing` — the three composable
  content areas within the button boundary.
- **DesignToken**: Named value from `channel.component.button.*` hierarchy;
  resolves through Theme → Brand → Primitive without hard-coded literals.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All six interaction states (default, hover, focus, active, disabled,
  loading) render correctly for both Primary and Secondary variants at all three
  sizes — verified by snapshot/visual regression tests with zero pixel differences
  from the design reference.
- **SC-002**: Unit test coverage for the Button component across all three platforms
  reaches ≥ 80% overall, with ViewModel/Presenter layer ≥ 85% (per constitution
  Principle IV).
- **SC-003**: All token references are validated automatically — zero hard-coded hex
  colour, spacing, or radius values exist in Button source files (verified by lint
  rule).
- **SC-004**: The Button passes WCAG 2.1 AA automated checks: contrast ≥ 4.5:1 for
  all text, focus ring visible, and interactive elements keyboard-operable — with
  zero violations in automated accessibility audit.
- **SC-005**: Touch targets measure ≥ 44 × 44 pt on iOS and Android at the MD and
  LG sizes, confirmed by layout inspector verification.
- **SC-006**: A Button rendered at 320 px viewport width occupies 100% container
  width without horizontal overflow — verified by responsive snapshot test.
- **SC-007**: Screen-reader announcements on iOS (VoiceOver) and Android (TalkBack)
  match the visible label text for enabled Buttons and announce the disabled state
  for disabled Buttons — verified by manual accessibility audit on device.
- **SC-008**: The Button component compiles and renders on all three target
  platforms (Web/React, iOS/Swift, Android/Kotlin) from a single specification
  with zero platform-specific business logic.

---

## Assumptions

- The DS Essential 2.0 token system (`channel.component.button.*`) is the single
  source of truth; no values are overridden at the consuming product level.
- Dark mode token overrides follow the Theme collection `dark` mode values already
  defined in `design-tokens-docs.html`; no additional dark-mode design work is
  required for this spec.
- Icon assets are provided separately (Tabler Icons on web; SF Symbols on iOS;
  Material Icons / custom drawables on Android) and are not in scope for this spec.
- The Destructive and Ghost variants share the same size/shape tokens as Primary
  and Secondary; only colour tokens differ. Full Destructive and Ghost
  documentation is in `button-tokens.html`; this spec covers Primary + Secondary
  as the primary deliverable, with Ghost and Destructive following the same
  implementation pattern.
- Animation/transition durations (e.g., hover background transition of 150 ms) are
  platform-idiomatic and not defined as design tokens; each platform uses its
  native transition system.
- RTL layout support is out of scope for v1 of this component.
- The Button does not manage its own routing or navigation — it fires a callback
  that the consuming screen handles.
- `icon-only` (no label) is out of scope; the `IconButton` component covers that
  use case separately.
