<!--
  SYNC IMPACT REPORT
  ==================
  Version change: [NEW] → 1.0.0

  Added sections:
  - I. Clean Code & Clean Architecture
  - II. SOLID Principles
  - III. MVVM & MVI Architecture
  - IV. Test Coverage (NON-NEGOTIABLE)
  - V. Code Style
  - Quality Gates
  - Security Standards
  - Governance

  Modified principles: N/A (initial ratification)

  Templates updated:
  - .specify/templates/plan-template.md   ✅ Constitution Check gates aligned
  - .specify/templates/spec-template.md   ✅ FR/SC structure compatible
  - .specify/templates/tasks-template.md  ✅ Test task phases aligned
  - .specify/templates/commands/          ✅ No commands/ dir present — N/A

  Deferred TODOs: none
-->

# DS Essential 2.0 — SuperApp Constitution

## Core Principles

### I. Clean Code & Clean Architecture

Every module, class, and function MUST have a single, clearly named responsibility.
Dependencies MUST flow inward: presentation → domain → data.
No layer MUST reference an outer layer directly — only via defined interfaces or
abstractions. Hard-coded values, magic numbers, and inline logic MUST be extracted
to named constants or services. Code MUST be readable without inline comments
explaining *what* it does — naming MUST carry that meaning. Comments are permitted
only to explain *why* a non-obvious decision was made.

**Rationale**: A design system codebase is consumed by multiple platforms
(Web, React, iOS, Android, Angular). Loose coupling between layers ensures a change
in token delivery format (Platform layer) does not cascade into domain logic.

### II. SOLID Principles

- **S — Single Responsibility**: Every class and function MUST do one thing.
  If a class requires the word "and" to describe its purpose, it MUST be split.
- **O — Open/Closed**: Modules MUST be open for extension, closed for modification.
  New token variants or component states MUST be added without editing existing
  stable code.
- **L — Liskov Substitution**: Subtypes MUST be substitutable for their base types
  without breaking consumers. Overrides MUST honour the base contract.
- **I — Interface Segregation**: Interfaces MUST be lean. No consumer MUST be forced
  to depend on methods it does not use.
- **D — Dependency Inversion**: High-level modules MUST NOT depend on low-level
  modules. Both MUST depend on abstractions (interfaces/protocols).

**Rationale**: SOLID directly enables the token hierarchy
(Primitive → Brand → Theme → Channel → Platform) to remain independently
evolvable without ripple effects across platform output layers.

### III. MVVM & MVI Architecture

All UI surfaces MUST follow either **MVVM** (Model–View–ViewModel) or **MVI**
(Model–View–Intent) depending on the platform:

- **Web / Angular / React**: MVVM preferred; state managed in ViewModel/Store with
  unidirectional data flow.
- **iOS (SwiftUI)**: MVVM with ObservableObject ViewModels.
- **Android (Jetpack Compose)**: MVI with a sealed Intent class, single immutable
  UiState, and a ViewModel emitting state via StateFlow.

Views MUST be stateless — all state MUST live in the ViewModel or State holder.
Business logic MUST NOT exist in View classes. ViewModels MUST NOT import UI
framework types (UIKit, Compose, Angular modules).

**Rationale**: The DS SuperApp ships tokens and components to five platforms.
A consistent architectural contract prevents state management from being
re-invented per platform and enables shared test strategies.

### IV. Test Coverage (NON-NEGOTIABLE)

Unit test coverage MUST be ≥ 80% for all production code paths.
Tests MUST be written **before** implementation (TDD: Red → Green → Refactor).
Every public function, ViewModel, use-case, mapper, and token resolver MUST have
at least one unit test covering the happy path and at least one covering a
failure/edge case.

Coverage thresholds per layer:
- **Domain (use-cases, mappers, validators)**: MUST reach 90%+
- **ViewModel / Presenter**: MUST reach 85%+
- **Data (repositories, data-sources)**: MUST reach 80%+
- **UI components**: integration/snapshot tests MUST cover all component states
  (default, hover, focus, active, disabled, loading, error)

CI pipelines MUST fail if coverage drops below the 80% floor. No PR MUST be merged
with failing or skipped tests without written justification in the PR description.

**Rationale**: Design system tokens and components are referenced by every product
team. A regression in a token value or component state propagates to all consumers
simultaneously. The coverage floor is the contractual safety net.

### V. Code Style

All code MUST conform to the project's configured linter and formatter with zero
warnings suppressed silently:

- **TypeScript/JavaScript**: ESLint + Prettier; strict mode enabled; no `any` types
  without explicit `// eslint-disable` comment and justification.
- **Swift**: SwiftLint with the project `.swiftlint.yml`; no force-unwrap (`!`)
  without a guarded check or a documented invariant comment.
- **Kotlin**: ktlint + Detekt; no `!!` operator without a null-safety guard.
- **SCSS/CSS**: Stylelint; no hard-coded hex values — only token variables allowed.

Naming conventions:
- Token names: `kebab-case` following `coleção.grupo.elemento.variante` formula.
- Classes/Types: `PascalCase`.
- Functions/variables: `camelCase`.
- Constants: `SCREAMING_SNAKE_CASE`.
- File names: `kebab-case` for web/styles; `PascalCase` for Swift/Kotlin.

**Rationale**: The DS Essential 2.0 naming convention is the contract between
Figma and every platform. Style rules enforce that this contract is not broken
by inconsistent casing or hard-coded values bypassing the token system.

## Quality Gates

Every feature or component MUST pass the following gates before merging:

1. **Constitution Check**: All principles I–V verified against the PR diff.
2. **Coverage Gate**: Automated coverage report MUST show ≥ 80% overall;
   domain layer ≥ 90%.
3. **Lint Gate**: Zero linter errors; zero suppressed warnings without justification.
4. **Token Integrity**: No hard-coded colour, spacing, radius, or typography value
   in component code — all values MUST reference a token variable.
5. **State Coverage**: All component states (default, hover, focus, active,
   disabled, loading, error, empty) MUST be covered by tests or snapshot/visual
   regression tests.
6. **Accessibility**: Contrast ratio ≥ 4.5:1 for text (WCAG 2.1 AA); focus ring
   visible; interactive elements keyboard-navigable.
7. **PR Description**: MUST include: what changed, why, which tokens/components
   are affected, and test evidence (screenshot or CI link).

## Security Standards

1. **No secrets in source**: API keys, tokens, credentials MUST NOT be committed.
   Use environment variables or a secrets manager.
2. **Dependency audit**: `npm audit` / `pip audit` / `pod audit` MUST run in CI;
   HIGH or CRITICAL vulnerabilities MUST be resolved before merge.
3. **Input validation**: All user-supplied or external data MUST be validated at
   system boundaries before use in business logic.
4. **Token values are data, not code**: Design token JSON files MUST NOT be
   evaluated as executable code. Parsers MUST treat them as static data.
5. **Third-party content**: Fetched content (e.g., remote Figma exports) MUST be
   treated as untrusted data and sanitised before rendering.

## Governance

This constitution supersedes all other project practices and ad-hoc conventions.

**Amendment procedure**:
- MAJOR bump (breaking governance change): Requires written proposal, team review,
  and documented migration plan before adoption.
- MINOR bump (new principle or material expansion): Requires PR with rationale;
  approved by at least one design system lead and one platform engineer.
- PATCH bump (clarification or wording): Single reviewer approval sufficient.

**Compliance review**: Every sprint retrospective MUST include a brief check that
active PRs and merged work comply with this constitution. Violations MUST be
logged as tech-debt tickets and scheduled within two sprints.

**Versioning policy**: `CONSTITUTION_VERSION` follows semantic versioning.
The version line at the bottom of this file is the authoritative version.
All dependent artifacts (plan-template, spec-template, tasks-template) MUST
reference the constitution version they were last validated against.

Use `.specify/memory/constitution.md` as the runtime reference for all coding
agent sessions in this project.

**Version**: 1.0.0 | **Ratified**: 2026-06-15 | **Last Amended**: 2026-06-15
