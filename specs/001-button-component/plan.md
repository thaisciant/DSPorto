# Implementation Plan: Button Component — DS Essential 2.0

**Branch**: `001-button-component` | **Date**: 2026-06-15 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-button-component/spec.md`

---

## Summary

Implement the Button component for the DS Essential 2.0 SuperApp Design System across
three native platforms — Web (React + TypeScript), iOS (Swift / SwiftUI), and Android
(Kotlin / Jetpack Compose). The component exposes four variants (Primary, Secondary,
Ghost, Destructive), three sizes (SM / MD / LG), and six interaction states
(default, hover, focus, active, disabled, loading), consuming 100% of its visual
values from the `channel.component.button.*` design-token hierarchy. The component
architecture follows MVVM on Web/iOS and MVI on Android, with ≥ 80% unit test
coverage and full WCAG 2.1 AA compliance.

---

## Technical Context

**Language/Version**:
- Web: TypeScript 5.x + React 18.x
- iOS: Swift 5.10 / SwiftUI (iOS 16+)
- Android: Kotlin 2.x / Jetpack Compose 1.6+ (API 26+)

**Primary Dependencies**:
- Web: React, `@ps/design-tokens` (token package), ESLint, Prettier, Vitest, Storybook 8
- iOS: SwiftUI, SwiftLint, XCTest / swift-snapshot-testing
- Android: Jetpack Compose, ktlint, Detekt, JUnit 5, Paparazzi (snapshot)

**Storage**: N/A — stateless UI component

**Testing**:
- Web: Vitest + React Testing Library + Storybook play functions + axe-core (a11y)
- iOS: XCTest + swift-snapshot-testing
- Android: JUnit 5 + Paparazzi + Espresso (integration)

**Target Platform**:
- Web: modern evergreen browsers (Chrome 120+, Firefox 121+, Safari 17+)
- iOS: iOS 16+
- Android: API 26+ (Android 8.0+)

**Project Type**: Shared UI component library (design system)

**Performance Goals**:
- Web: render time < 16 ms (one frame at 60 fps) for a single button
- iOS/Android: first-frame render < 16 ms; no jank on state transitions

**Constraints**:
- Zero hard-coded colour/spacing/typography values — all via design tokens
- Token package is the single source of truth; component never imports raw hex
- WCAG 2.1 AA compliance mandatory (contrast ≥ 4.5:1, focus ring visible,
  keyboard operable)
- Minimum touch target 44 × 44 pt on mobile platforms (WCAG 2.5.5)
- Full-width layout on viewports < 768 px (channel.breakpoint.tablet)
- No RTL support in v1 (documented assumption in spec)

**Scale/Scope**: Single component, 4 variants × 3 sizes × 6 states = 72 state
permutations per platform; 3 platforms total.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| I. Clean Code & Clean Architecture | ✅ PASS | Presentation → Domain (token resolver) → Data (token JSON). No layer crosses boundaries. |
| II. SOLID Principles | ✅ PASS | ButtonVariant/ButtonSize/ButtonState are sealed types (OCP). TokenResolver interface enables DI. |
| III. MVVM / MVI Architecture | ✅ PASS | Web/iOS: MVVM with ButtonViewModel owning state. Android: MVI with ButtonIntent sealed class + ButtonUiState. |
| IV. Test Coverage ≥ 80% | ✅ PASS | TDD enforced — tests written before implementation. Coverage gates in CI. |
| V. Code Style | ✅ PASS | ESLint/Prettier (web), SwiftLint (iOS), ktlint+Detekt (Android). No hard-coded values. |
| Token Integrity Gate | ✅ PASS | All values from `channel.component.button.*` — lint rule `no-hardcoded-token-values` enforced. |
| Accessibility Gate | ✅ PASS | axe-core automated (web), VoiceOver/TalkBack manual audit required before ship. |

*Post-design re-check: All gates still pass after Phase 1 design — no new violations introduced.*

---

## Project Structure

### Documentation (this feature)

```text
specs/001-button-component/
├── plan.md              ← this file
├── spec.md              ← feature specification
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── checklists/
│   └── requirements.md
├── contracts/
│   ├── web-component-api.md
│   ├── ios-component-api.md
│   └── android-component-api.md
└── tasks.md             ← Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
packages/
├── tokens/                          # Design token package (existing)
│   └── src/
│       └── button/
│           └── button-tokens.ts     # Generated token object (as const)
│
├── button-web/                      # Web (React + TypeScript)
│   ├── src/
│   │   ├── Button.tsx               # View — stateless, consumes ButtonViewModel
│   │   ├── ButtonViewModel.ts       # ViewModel — owns ButtonState, computes styles
│   │   ├── ButtonTokenResolver.ts   # Maps token keys → resolved CSS var strings
│   │   ├── button.types.ts          # ButtonVariant, ButtonSize, ButtonState types
│   │   └── index.ts                 # Public API export
│   ├── tests/
│   │   ├── unit/
│   │   │   ├── ButtonViewModel.test.ts
│   │   │   └── ButtonTokenResolver.test.ts
│   │   ├── integration/
│   │   │   └── Button.test.tsx      # RTL interaction tests
│   │   └── snapshot/
│   │       └── Button.stories.tsx   # Storybook + play functions
│   └── package.json
│
├── button-ios/                      # iOS (SwiftUI)
│   ├── Sources/
│   │   ├── Button/
│   │   │   ├── PSButton.swift           # View — stateless SwiftUI View
│   │   │   ├── PSButtonViewModel.swift  # ObservableObject ViewModel
│   │   │   ├── PSButtonTokens.swift     # Token constants (generated)
│   │   │   └── PSButtonTypes.swift      # ButtonVariant, ButtonSize, ButtonState enums
│   │   └── ButtonPreview.swift          # Xcode Previews
│   └── Tests/
│       ├── PSButtonViewModelTests.swift
│       └── PSButtonSnapshotTests.swift
│
└── button-android/                  # Android (Kotlin + Compose)
    ├── src/
    │   ├── main/kotlin/com/porto/ds/button/
    │   │   ├── PSButton.kt              # Composable View
    │   │   ├── PSButtonViewModel.kt     # ViewModel + StateFlow
    │   │   ├── PSButtonIntent.kt        # Sealed Intent class (MVI)
    │   │   ├── PSButtonUiState.kt       # Immutable UiState data class
    │   │   ├── PSButtonTokens.kt        # Token constants object (generated)
    │   │   └── PSButtonTypes.kt         # ButtonVariant, ButtonSize enums
    │   └── test/kotlin/com/porto/ds/button/
    │       ├── PSButtonViewModelTest.kt
    │       ├── PSButtonIntentTest.kt
    │       └── PSButtonSnapshotTest.kt  # Paparazzi
    └── build.gradle.kts
```

**Structure Decision**: Multi-package monorepo (one package per platform) with a
shared `tokens/` package. Each platform is independently publishable. No cross-
platform code sharing beyond the token values themselves, which are generated per
platform by Style Dictionary.

---

## Complexity Tracking

No constitution violations requiring justification. The multi-package structure is
required because each platform uses its own native language and test toolchain —
a single shared codebase is not feasible across TypeScript, Swift, and Kotlin.
