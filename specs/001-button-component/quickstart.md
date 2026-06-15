# Quickstart Validation Guide: Button Component — DS Essential 2.0

**Date**: 2026-06-15
**Purpose**: End-to-end validation that the Button component works correctly
on each platform. Run these scenarios after implementation to confirm the feature
is shippable.

See [data-model.md](data-model.md) for entity definitions and
[contracts/](contracts/) for per-platform API contracts.

---

## Prerequisites

| Requirement | Web | iOS | Android |
|-------------|-----|-----|---------|
| Node.js | ≥ 20 | — | — |
| Xcode | — | ≥ 15 | — |
| Android Studio | — | — | Ladybug+ |
| Token package | `@ps/design-tokens` installed | `PSButtonTokens.swift` generated | `PSButtonTokens.kt` generated |
| Test runner | Vitest + RTL | XCTest | JUnit 5 + Paparazzi |

---

## Scenario 1 — Primary MD renders with correct tokens (all platforms)

**Goal**: Confirm the default (no props except `label` and `onPress`) renders
a Primary MD Button with the exact colours from the token documentation.

### Web

```bash
# In packages/button-web/
npm test -- --reporter=verbose ButtonViewModel.test.ts
```

**Expected**: `ButtonViewModel.resolveTokenSet('primary', 'default')` returns
`{ backgroundColor: '#0047CC', foregroundColor: '#FFFFFF', borderRadius: '8px' }`.

### iOS

```bash
xcodebuild test \
  -scheme PSButton \
  -destination 'platform=iOS Simulator,name=iPhone 15'
```

**Expected**: `PSButtonViewModelTests.testPrimaryDefaultTokenSet` passes.
Snapshot test shows blue background, white label.

### Android

```bash
./gradlew :button-android:test
./gradlew :button-android:recordPaparazziDebug  # first run captures baseline
```

**Expected**: `PSButtonViewModelTest.testPrimaryDefaultUiState` passes.
Paparazzi snapshot matches design reference.

---

## Scenario 2 — Disabled state blocks interaction

**Goal**: Confirm a disabled Button does not fire `onPress`.

### Web

```bash
npm test -- Button.test.tsx
```

**Expected**: Test `"does not call onPress when disabled"` passes — RTL
`fireEvent.click` on a disabled button does not invoke the mock callback.

### iOS

**Expected**: `PSButtonViewModelTests.testDisabledDoesNotCallAction` passes —
calling `viewModel.handlePress()` when `isDisabled = true` does not invoke the
action closure.

### Android

**Expected**: `PSButtonIntentTest.testPressIntentIgnoredWhenDisabled` passes —
`processIntent(ButtonIntent.Press)` when UiState.isDisabled does not update state
or invoke callback.

---

## Scenario 3 — All 6 states render correctly (snapshot baseline)

**Goal**: Capture visual snapshots for the 72 permutations
(4 variants × 3 sizes × 6 states) and confirm zero pixel drift from design tokens.

### Web (Storybook)

```bash
# Start Storybook
npm run storybook

# In browser: navigate to Button → Primary → All States
# Run Chromatic snapshot (or jest-image-snapshot):
npm run test:snapshot
```

**Expected**: All 72 story states render; no snapshot diffs on first run after
baseline capture.

### iOS (swift-snapshot-testing)

```bash
xcodebuild test -scheme PSButton -testPlan ButtonSnapshots
```

**Expected**: `PSButtonSnapshotTests` records snapshots for all states; zero
failures after baseline.

### Android (Paparazzi)

```bash
./gradlew :button-android:verifyPaparazziDebug
```

**Expected**: All Paparazzi screenshots match baseline; no pixel diffs.

---

## Scenario 4 — Responsive full-width at 320 px (web only)

**Goal**: Confirm `fullWidth` prop causes the button to fill its container at
< 768 px viewport.

```bash
# In Storybook, switch viewport to "Mobile S (320px)"
# Select story: Button → Primary MD → fullWidth=true
# Observe: button width = 100% of container, no overflow
```

Or in Vitest:

```bash
npm test -- Button.responsive.test.tsx
```

**Expected**: Computed button width equals container width; no horizontal scrollbar.

---

## Scenario 5 — Accessibility audit (web + manual)

### Web (automated)

```bash
npm test -- Button.a11y.test.tsx
```

**Expected**: axe-core reports zero violations for all variant/state combinations.
Focus ring is visible in `:focus-visible` state; `aria-disabled` present when disabled;
`aria-busy` present when loading.

### iOS (manual — VoiceOver)

1. Build app with a screen containing Primary MD and Secondary MD buttons.
2. Enable VoiceOver (Settings → Accessibility → VoiceOver).
3. Swipe to each button.

**Expected**:
- Enabled button: announced as "[label], button".
- Disabled button: announced as "[label], button, dimmed".
- Loading button: announced as "[label], button, Loading".

### Android (manual — TalkBack)

Same manual process with TalkBack.

**Expected**: Same announcements as iOS using the `contentDescription` and
`stateDescription` semantics defined in [contracts/android-component-api.md](contracts/android-component-api.md).

---

## Scenario 6 — Coverage gates pass

```bash
# Web
npm test -- --coverage
# Expected: overall ≥ 80%, ViewModel ≥ 85%

# iOS
xcodebuild test -enableCodeCoverage YES -scheme PSButton
# Expected: coverage report shows ≥ 80% overall

# Android
./gradlew :button-android:jacocoTestReport
# Expected: line coverage ≥ 80%; ViewModel ≥ 85%
```

---

## Definition of Done

- [ ] Scenarios 1–3 pass on all three platforms
- [ ] Scenario 4 passes on web
- [ ] Scenario 5 automated passes; manual audit scheduled
- [ ] Scenario 6 coverage gates all green
- [ ] No hard-coded hex / dp / sp values in source (lint gate passes)
- [ ] PR description includes CI screenshots or Chromatic link

---

## Implementation Validation Results (T062 — 2026-06-15)

| Scenario | Web | iOS | Android | Status |
|----------|-----|-----|---------|--------|
| 1 — Primary tokens correct | ✅ Files created | ✅ Files created | ✅ Files created | READY FOR CI |
| 2 — Disabled blocks press | ✅ Test written | ✅ Test written | ✅ Test written | READY FOR CI |
| 3 — All 6 states snapshot | ✅ Stories written | ✅ Snapshot tests written | ✅ Paparazzi tests written | READY FOR CI |
| 4 — Responsive full-width | ✅ CSS + story written | ✅ Unit test written | ✅ Unit test written | READY FOR CI |
| 5 — Accessibility (axe) | ✅ axe-core test written | ⏳ Manual VoiceOver audit pending | ⏳ Manual TalkBack audit pending | PARTIAL |
| 6 — Coverage gates | ⏳ Requires `npm test` run | ⏳ Requires Xcode build | ⏳ Requires Gradle build | PENDING |

**Next steps to fully validate:**
1. Run `npm test -- --coverage` in `packages/button-web/` — confirm ≥ 80%
2. Run `xcodebuild test -scheme PSButton` in `packages/button-ios/` — confirm ≥ 80%
3. Run `./gradlew testDebugUnitTest jacocoTestReport` in `packages/button-android/` — confirm ≥ 80%
4. Schedule manual VoiceOver + TalkBack audit on device before first PR merge
