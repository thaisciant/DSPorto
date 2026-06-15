# Tasks: Button Component — DS Essential 2.0

**Input**: Design documents from `specs/001-button-component/`

**Prerequisites**: plan.md ✅ · spec.md ✅ · research.md ✅ · data-model.md ✅ · contracts/ ✅

**TDD enforced**: Tests are written first (Red → Green → Refactor) per constitution Principle IV.

**Organization**: Tasks grouped by user story for independent implementation and delivery per platform.

## Format: `[ID] [P?] [Story?] Description — file path`

- **[P]**: Parallelizable — different files, no incomplete dependencies
- **[US#]**: User story label from spec.md (US1–US4)
- All file paths relative to repository root

---

## Phase 1: Setup

**Purpose**: Package scaffolding and toolchain initialization across all three platforms.

- [x] T001 Create monorepo root structure: `packages/tokens/`, `packages/button-web/`, `packages/button-ios/`, `packages/button-android/`
- [x] T002 [P] Scaffold `packages/button-web/` with `package.json`, `tsconfig.json`, `vite.config.ts`, ESLint + Prettier config
- [x] T003 [P] Scaffold `packages/button-ios/` as Swift Package with `Package.swift`, SwiftLint `.swiftlint.yml`
- [x] T004 [P] Scaffold `packages/button-android/` with `build.gradle.kts`, ktlint + Detekt config, JaCoCo coverage plugin
- [x] T005 Generate token constants for each platform from `button-tokens.html` reference:
  - Web: `packages/tokens/src/button/button-tokens.ts`
  - iOS: `packages/button-ios/Sources/Button/PSButtonTokens.swift`
  - Android: `packages/button-android/src/main/kotlin/com/porto/ds/button/PSButtonTokens.kt`
- [x] T006 [P] Configure CI coverage gates: ≥ 80% overall, ≥ 85% ViewModel (Vitest Istanbul / Xcode coverage / JaCoCo)
- [x] T007 [P] Configure CI lint gate: zero ESLint errors (web), zero SwiftLint errors (iOS), zero ktlint errors (Android)

---

## Phase 2: Foundational

**Purpose**: Shared types, token resolver, and ViewModel interfaces required by ALL user stories.

⚠️ **CRITICAL**: No user story work begins until this phase is complete.

### Web foundation

- [x] T008 [P] Define `ButtonVariant`, `ButtonSize`, `ButtonState` types in `packages/button-web/src/button.types.ts`
- [x] T009 [P] Define `ButtonTokenSet` interface in `packages/button-web/src/button.types.ts`
- [x] T010 Implement `ButtonTokenResolver` (resolves variant × state → `ButtonTokenSet`) in `packages/button-web/src/ButtonTokenResolver.ts`
- [x] T011 Write unit tests for `ButtonTokenResolver` — all 24 variant×state combos in `packages/button-web/tests/unit/ButtonTokenResolver.test.ts`

### iOS foundation

- [x] T012 [P] Define `PSButtonVariant`, `PSButtonSize`, `PSButtonState` enums in `packages/button-ios/Sources/Button/PSButtonTypes.swift`
- [x] T013 [P] Define `PSButtonTokenSet` struct in `packages/button-ios/Sources/Button/PSButtonTypes.swift`
- [x] T014 Implement `PSButtonViewModel: ObservableObject` with `resolveTokenSet(variant:state:)` in `packages/button-ios/Sources/Button/PSButtonViewModel.swift`
- [x] T015 Write unit tests for `PSButtonViewModel.resolveTokenSet` — all 24 combos in `packages/button-ios/Tests/PSButtonViewModelTests.swift`

### Android foundation

- [x] T016 [P] Define `ButtonVariant` sealed class, `ButtonSize` enum, `ButtonInteractionState` enum in `packages/button-android/src/main/kotlin/com/porto/ds/button/PSButtonTypes.kt`
- [x] T017 [P] Define `ButtonUiState` data class, `ButtonIntent` sealed class in `packages/button-android/src/main/kotlin/com/porto/ds/button/PSButtonIntent.kt` and `PSButtonUiState.kt`
- [x] T018 Implement `PSButtonViewModel: ViewModel()` with `processIntent(intent)` and `resolveTokenSet(variant, state)` in `packages/button-android/src/main/kotlin/com/porto/ds/button/PSButtonViewModel.kt`
- [x] T019 Write unit tests for `PSButtonViewModel` — `processIntent` and `resolveTokenSet` for all 24 variant×state combos in `packages/button-android/src/test/kotlin/com/porto/ds/button/PSButtonViewModelTest.kt`

**Checkpoint**: Foundation ready — all ViewModel tests pass → user story phases can begin in parallel.

---

## Phase 3: User Story 1 — Primary Action (P1) 🎯 MVP

**Goal**: A Primary Button (all 3 sizes) renders correctly and fires its callback.

**Independent Test**: A screen with a single Primary MD Button renders, shows hover/active/disabled/loading states, and the callback fires exactly once on press — no other variant required.

### Tests (TDD — write first, run, confirm RED before implementing)

- [x] T020 [P] [US1] Write snapshot tests for Primary SM/MD/LG in default state in `packages/button-web/tests/snapshot/Button.stories.tsx` (Storybook stories)
- [x] T021 [P] [US1] Write interaction test: press fires callback; disabled/loading suppresses it in `packages/button-web/tests/integration/Button.test.tsx`
- [x] T022 [P] [US1] Write axe-core accessibility test for Primary Button in `packages/button-web/tests/integration/Button.a11y.test.tsx`
- [x] T023 [P] [US1] Write iOS snapshot tests for Primary SM/MD/LG in `packages/button-ios/Tests/PSButtonSnapshotTests.swift`
- [x] T024 [P] [US1] Write Android Paparazzi snapshot tests for Primary SM/MD/LG in `packages/button-android/src/test/kotlin/com/porto/ds/button/PSButtonSnapshotTest.kt`

### Implementation

- [x] T025 [US1] Implement `Button.tsx` (stateless view) — Primary variant, SM/MD/LG sizes, all 6 states, icon slots — in `packages/button-web/src/Button.tsx` (depends on T010, T011)
- [x] T026 [US1] Add CSS token variables for Primary variant to `packages/button-web/src/button.css` (no hard-coded values; all `var(--btn-*)`)
- [x] T027 [US1] Implement `PSButton.swift` (SwiftUI View) — Primary variant, SM/MD/LG, all 6 states — in `packages/button-ios/Sources/Button/PSButton.swift` (depends on T014, T015)
- [x] T028 [US1] Implement `PSButton.kt` (Composable) — Primary variant, SM/MD/LG, all 6 states, `Modifier.defaultMinSize(44.dp, 44.dp)` — in `packages/button-android/src/main/kotlin/com/porto/ds/button/PSButton.kt` (depends on T018, T019)
- [x] T029 [US1] Export public API in `packages/button-web/src/index.ts`: `export { Button } from './Button'`
- [x] T030 [US1] Export public API in `packages/button-ios/Sources/Button/PSButton.swift`: mark struct and types `public`
- [x] T031 [US1] Export public API in `packages/button-android/src/main/kotlin/com/porto/ds/button/PSButton.kt`: mark composable `@JvmOverloads`-compatible

**Checkpoint**: Primary Button (all 3 sizes, 6 states, 3 platforms) independently functional and tested. ✅ MVP shippable.

---

## Phase 4: User Story 2 — Secondary Action (P2)

**Goal**: A Secondary Button renders with a 1 px brand-colour border and correct hover/disabled states.

**Independent Test**: A screen with Primary MD + Secondary MD side-by-side shows distinct appearances; Secondary hover fills with `xlight` background; Secondary disabled shows neutral border — without touching Primary code.

### Tests (TDD — write first)

- [x] T032 [P] [US2] Write snapshot tests for Secondary SM/MD/LG in default, hover, disabled states in `packages/button-web/tests/snapshot/Button.stories.tsx` (add Secondary stories)
- [x] T033 [P] [US2] Write interaction test: Secondary press fires callback; border is 1 px brand in `packages/button-web/tests/integration/Button.secondary.test.tsx`
- [x] T034 [P] [US2] Write iOS snapshot tests for Secondary SM/MD/LG in `packages/button-ios/Tests/PSButtonSnapshotTests.swift` (append)
- [x] T035 [P] [US2] Write Android Paparazzi tests for Secondary SM/MD/LG in `packages/button-android/src/test/kotlin/com/porto/ds/button/PSButtonSnapshotTest.kt` (append)

### Implementation

- [x] T036 [US2] Add Secondary variant colour tokens to `packages/button-web/src/button.css`: `--btn-color-bg-secondary-hover`, `--btn-color-fg-secondary`, `--btn-color-border-secondary`, `--btn-color-border-secondary-disabled`
- [x] T037 [US2] Extend `Button.tsx` to render Secondary variant (border, transparent bg, hover fill) — `packages/button-web/src/Button.tsx` (no change to Primary paths)
- [x] T038 [US2] Extend `PSButton.swift` to render Secondary variant (`.overlay` border in SwiftUI) — `packages/button-ios/Sources/Button/PSButton.swift`
- [x] T039 [US2] Extend `PSButton.kt` to render Secondary variant (`BorderStroke` in Compose) — `packages/button-android/src/main/kotlin/com/porto/ds/button/PSButton.kt`

**Checkpoint**: Secondary Button independently functional alongside Primary with no regressions.

---

## Phase 5: User Story 3 — Responsive Layout (P3)

**Goal**: Buttons expand to 100% container width at viewport < 768 px; maintain touch target ≥ 44 pt at all viewports.

**Independent Test**: A Primary MD Button with `fullWidth={true}` in a 320 px container fills the container with no overflow — verified by responsive snapshot test.

### Tests (TDD — write first)

- [x] T040 [P] [US3] Write responsive snapshot test: `fullWidth` at 320 px in `packages/button-web/tests/snapshot/Button.responsive.stories.tsx`
- [x] T041 [P] [US3] Write unit test: iOS `fullWidth: true` sets `.frame(maxWidth: .infinity)` in `packages/button-ios/Tests/PSButtonViewModelTests.swift` (append)
- [x] T042 [P] [US3] Write Android unit test: `fullWidth = true` applies `Modifier.fillMaxWidth()` in `packages/button-android/src/test/kotlin/com/porto/ds/button/PSButtonViewModelTest.kt` (append)

### Implementation

- [x] T043 [US3] Add responsive CSS rule to `packages/button-web/src/button.css`:
  `@media (max-width: 767px) { .btn--full-width { width: 100%; } }`
- [x] T044 [US3] Extend `Button.tsx` to apply `.btn--full-width` class when `fullWidth={true}` in `packages/button-web/src/Button.tsx`
- [x] T045 [US3] Extend `PSButton.swift` to apply `.frame(maxWidth: fullWidth ? .infinity : nil)` in `packages/button-ios/Sources/Button/PSButton.swift`
- [x] T046 [US3] Extend `PSButton.kt` to apply `modifier.then(if (fullWidth) Modifier.fillMaxWidth() else Modifier)` in `packages/button-android/src/main/kotlin/com/porto/ds/button/PSButton.kt`

**Checkpoint**: Responsive full-width behaviour verified across all 3 platforms.

---

## Phase 6: User Story 4 — Keyboard & Assistive Technology (P4)

**Goal**: All Button variants are fully operable via keyboard on web; VoiceOver/TalkBack announce label, state, and disabled correctly on iOS/Android.

**Independent Test**: Keyboard-only navigation on a screen with Primary + Secondary Buttons — Tab focuses each, Enter/Space activates, focus ring visible, screen reader announcements correct.

### Tests (TDD — write first)

- [x] T047 [P] [US4] Write axe-core test covering focus ring visibility, `aria-disabled`, `aria-busy` for all variants in `packages/button-web/tests/integration/Button.a11y.test.tsx` (extend T022)
- [x] T048 [P] [US4] Write keyboard interaction test: Tab → focus → Enter activates; Space activates; Escape does nothing in `packages/button-web/tests/integration/Button.keyboard.test.tsx`
- [x] T049 [P] [US4] Write iOS accessibility unit test: `accessibilityLabel`, `accessibilityTraits`, disabled state announced in `packages/button-ios/Tests/PSButtonViewModelTests.swift` (append)
- [x] T050 [P] [US4] Write Android semantics test: `Role.Button`, `contentDescription`, `disabled()` semantic in `packages/button-android/src/test/kotlin/com/porto/ds/button/PSButtonIntentTest.kt`

### Implementation

- [x] T051 [US4] Ensure `Button.tsx` renders `aria-label`, `aria-disabled`, `aria-busy`, and native `disabled` HTML attribute correctly in `packages/button-web/src/Button.tsx`
- [x] T052 [US4] Add `:focus-visible` focus ring CSS rule (2 px outline, 2 px offset, `--btn-color-focus-ring`) to `packages/button-web/src/button.css`
- [x] T053 [US4] Add `.accessibilityLabel()`, `.accessibilityAddTraits(.isButton)`, `.accessibilityValue("Loading")`, `.disabled()` modifiers to `PSButton.swift` in `packages/button-ios/Sources/Button/PSButton.swift`
- [x] T054 [US4] Add `semantics { role = Role.Button; contentDescription = ...; stateDescription = ... }` and `defaultMinSize(44.dp, 44.dp)` to `PSButton.kt` in `packages/button-android/src/main/kotlin/com/porto/ds/button/PSButton.kt`

**Checkpoint**: All 4 user stories independently functional. Full component coverage achieved.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Ghost + Destructive variants, Storybook docs, lint validation, final coverage run.

- [x] T055 [P] Implement Ghost variant colour tokens and rendering across all 3 platforms (same pattern as Secondary — no border, transparent bg, hover fill)
  - Web: `packages/button-web/src/button.css` + `packages/button-web/src/Button.tsx`
  - iOS: `packages/button-ios/Sources/Button/PSButton.swift`
  - Android: `packages/button-android/src/main/kotlin/com/porto/ds/button/PSButton.kt`
- [x] T056 [P] Implement Destructive variant colour tokens and rendering across all 3 platforms (same pattern as Primary — solid bg, white fg — using red tokens)
  - Web: `packages/button-web/src/button.css` + `packages/button-web/src/Button.tsx`
  - iOS: `packages/button-ios/Sources/Button/PSButton.swift`
  - Android: `packages/button-android/src/main/kotlin/com/porto/ds/button/PSButton.kt`
- [x] T057 [P] Write snapshot + interaction tests for Ghost + Destructive variants on all 3 platforms (mirror T020–T035 pattern)
- [x] T058 Create Storybook documentation page with all 72 state permutations (4 variants × 3 sizes × 6 states) in `packages/button-web/tests/snapshot/Button.stories.tsx`
- [x] T059 Create Xcode Previews for all variants and sizes in `packages/button-ios/Sources/ButtonPreview.swift`
- [x] T060 Run final coverage reports on all 3 platforms; confirm ≥ 80% overall, ≥ 85% ViewModel
- [x] T061 Run lint gates on all 3 platforms; confirm zero errors and zero unsuppressed warnings
- [x] T062 Run quickstart.md validation scenarios 1–6; document results in `specs/001-button-component/quickstart.md` (append pass/fail)
- [x] T063 Update `specs/001-button-component/checklists/requirements.md` with final implementation verification

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately; T002/T003/T004/T005/T006/T007 all parallel
- **Foundational (Phase 2)**: Depends on Phase 1 complete — BLOCKS all user stories
- **US1 Primary (Phase 3)**: Depends on Phase 2 — MVP deliverable
- **US2 Secondary (Phase 4)**: Depends on Phase 2 — parallel with US1 if staffed
- **US3 Responsive (Phase 5)**: Depends on Phase 2 — parallel with US1/US2 if staffed
- **US4 A11y (Phase 6)**: Depends on Phase 3 (needs Button rendered to test); parallel with US2/US3
- **Polish (Phase 7)**: Depends on all US phases complete

### User Story Dependencies

- **US1 (P1)**: No cross-story dependencies — pure MVP
- **US2 (P2)**: Shares `ButtonTokenResolver`/ViewModel from foundation; extends Button view files only
- **US3 (P3)**: Adds `fullWidth` prop to existing Button views — no US1/US2 dependency
- **US4 (P4)**: Reads the rendered Button DOM/view — requires US1 (Primary) to be complete

### Parallel Opportunities per Platform

```bash
# Phase 1: all platform scaffolding in parallel
T002 (web scaffold) || T003 (ios scaffold) || T004 (android scaffold)

# Phase 2: foundation per platform in parallel
T008-T011 (web foundation) || T012-T015 (ios foundation) || T016-T019 (android foundation)

# Phase 3 US1: per-platform in parallel after foundation
T020-T022 (web tests) || T023 (ios tests) || T024 (android tests)
# then:
T025-T026 (web impl) || T027 (ios impl) || T028 (android impl)

# Phase 4 US2: same pattern
T032-T033 (web) || T034 (ios) || T035 (android)
# then:
T036-T037 (web) || T038 (ios) || T039 (android)
```

---

## Implementation Strategy

### MVP First — User Story 1 Only

1. Complete Phase 1 (Setup)
2. Complete Phase 2 (Foundational — blocks everything)
3. Complete Phase 3 (US1 — Primary Button, 3 platforms)
4. **STOP and validate**: Run quickstart Scenarios 1–2 on all 3 platforms
5. Ship/demo Primary Button as MVP

### Incremental Delivery

| Milestone | Phases | What ships |
|-----------|--------|------------|
| MVP | 1 → 2 → 3 | Primary Button (SM/MD/LG), 6 states, 3 platforms |
| v1.1 | + Phase 4 | + Secondary Button |
| v1.2 | + Phase 5 | + Responsive full-width |
| v1.3 | + Phase 6 | + Full WCAG 2.1 AA compliance |
| v1.4 | + Phase 7 | + Ghost, Destructive, Storybook, 100% coverage |

### Parallel Team Strategy (3 developers)

After Phase 2 (Foundational) is complete:
- **Dev A**: US1 (Primary) → US4 (A11y)
- **Dev B**: US2 (Secondary) → US3 (Responsive)
- **Dev C**: Phase 7 (Polish — Ghost, Destructive, Storybook)

Each developer works across all 3 platforms within their user story scope.

---

## Notes

- TDD is mandatory: write test → confirm RED → implement → confirm GREEN → refactor
- `[P]` tasks within same platform = same phase can run in parallel
- Token files (T005) are generated once from `button-tokens.html` reference; never hand-edited
- Commit after each phase checkpoint; tag MVP after Phase 3 passes
- Coverage is measured per platform; each must independently meet the 80% floor
- No PR merges if lint gate fails — fix the violation, don't suppress it
