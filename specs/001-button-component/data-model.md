# Data Model: Button Component — DS Essential 2.0

**Date**: 2026-06-15
**Feature**: specs/001-button-component/spec.md

All entities are platform-agnostic. Platform-specific type names are noted in
parentheses.

---

## Entity: ButtonVariant

Determines the colour treatment of background, foreground, and border slots.

| Field | Type | Values | Notes |
|-------|------|--------|-------|
| `value` | enum | `primary \| secondary \| ghost \| destructive` | Immutable once set |

**Validation**: MUST be one of the four defined values. No default — always
explicitly declared by the consumer.

**Platform names**:
- Web/TS: `ButtonVariant` (string union type)
- iOS/Swift: `enum PSButtonVariant`
- Android/Kotlin: `sealed class ButtonVariant`

---

## Entity: ButtonSize

Determines height, horizontal/vertical padding, icon size, gap, and font size.

| Field | Type | Values | Resolved tokens |
|-------|------|--------|-----------------|
| `value` | enum | `sm \| md \| lg` | See token table below |

**Size → Token mapping**:

| Size | height | padding-x | padding-y | icon-size | gap | font-size |
|------|--------|-----------|-----------|-----------|-----|-----------|
| SM   | 32 px  | 12 px     | 6 px      | 16 px     | 4 px| 12 px    |
| MD   | 40 px  | 16 px     | 9 px      | 20 px     | 4 px| 14 px    |
| LG   | 48 px  | 20 px     | 12 px     | 24 px     | 8 px| 16 px    |

All values reference `channel.component.button.numeric-values.*`.

**Default**: `md`

---

## Entity: ButtonState

Represents the current interaction state. Determines which colour token set
is applied.

| State | Trigger condition | Colour set applied |
|-------|------------------|-------------------|
| `default` | No interaction | Base variant tokens |
| `hover` | Cursor enters button (web only) | `.hover` token suffix |
| `focus` | Keyboard focus received | `.focus` token suffix + focus ring |
| `active` | Mouse/touch pressed | `.active` token suffix |
| `disabled` | `disabled` prop / `isEnabled = false` | `.disabled` token suffix; non-interactive |
| `loading` | `loading` prop active | Spinner visible; `disabled` applied |

**State transitions** (valid transitions only):

```
default → hover    (pointer enters)
default → focus    (keyboard Tab)
hover   → active   (pointer down)
hover   → default  (pointer leaves)
active  → default  (pointer up / release)
focus   → active   (Enter / Space pressed)
active  → focus    (Enter / Space released)
any     → disabled (disabled prop set at render time — not a runtime transition)
any     → loading  (loading prop set; implies disabled)
loading → default  (loading prop cleared)
```

---

## Entity: ButtonSlot

The three composable content areas within the button boundary.

| Slot | Required | Description | Constraint |
|------|----------|-------------|------------|
| `icon-leading` | No | Icon before label | MUST use icon from token-defined size; inherits `fg` colour |
| `label` | **Yes** | Button text | MUST be non-empty; no truncation — ellipsis if overflow |
| `icon-trailing` | No | Icon after label | Same constraints as `icon-leading` |

**Validation**:
- `label` MUST NOT be empty or whitespace-only.
- `icon-only` (no label) is **out of scope** — use `IconButton` component instead.
- Both icon slots MAY be filled simultaneously; gap token applies between all
  three slots uniformly.

---

## Entity: ButtonTokenSet

The resolved set of design token values applied to a specific `(variant, state)`
combination. Computed at render time by `ButtonTokenResolver`.

| Field | Source token | Example (Primary, default) |
|-------|-------------|---------------------------|
| `backgroundColor` | `channel.component.button.color.bg.{variant}[.{state}]` | `#0047CC` |
| `foregroundColor` | `channel.component.button.color.fg.{variant}[.{state}]` | `#FFFFFF` |
| `borderColor` | `channel.component.button.color.border.{variant}[.{state}]` | `transparent` |
| `focusRingColor` | `channel.component.button.color.focus-ring` | `#5B9BFF` |
| `borderWidth` | `channel.component.button.numeric-values.border-width.{variant}` | `0` (primary) / `1px` (secondary) |
| `borderRadius` | `channel.component.button.numeric-values.radius` | `8px` |
| `focusRingWidth` | `channel.component.button.numeric-values.focus-ring-width` | `2px` |
| `focusRingOffset` | `channel.component.button.numeric-values.focus-ring-offset` | `2px` |

**Resolver logic**:
1. Look up `bg.{variant}.{state}` — fall back to `bg.{variant}` if state-specific
   token does not exist.
2. Same fallback logic for `fg` and `border`.
3. `focusRingColor` and shape tokens are state-independent.

---

## Entity: ButtonProps (Web) / PSButtonConfiguration (iOS) / ButtonUiState (Android)

The public configuration surface exposed to consumers.

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `variant` | `ButtonVariant` | No | `primary` | Visual treatment |
| `size` | `ButtonSize` | No | `md` | Size tier |
| `label` | `String` | **Yes** | — | Button text |
| `iconLeading` | `Icon?` | No | `null` | Leading icon |
| `iconTrailing` | `Icon?` | No | `null` | Trailing icon |
| `isDisabled` | `Bool` | No | `false` | Disables interaction |
| `isLoading` | `Bool` | No | `false` | Shows spinner; implies disabled |
| `fullWidth` | `Bool` | No | `false` | Expands to 100% container width |
| `onPress` | `() → Void` | **Yes** | — | Action callback |
| `accessibilityLabel` | `String?` | No | equals `label` | Override for AT |

**Validation rules**:
- `label` MUST be non-empty.
- `onPress` MUST be provided (non-null callback).
- When `isLoading = true`, `isDisabled` is implicitly `true`; consumer does not
  need to set both.
- `accessibilityLabel` defaults to `label` value; only override for icon-adjacent
  contexts where the visual label alone is insufficient.
