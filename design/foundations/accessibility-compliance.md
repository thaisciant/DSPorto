---
type: document
domain: platform
status: current
date: 2026-03-14
---

# Flow Core Design System — Accessibility Compliance Tracker

> **Author:** Design Strategy / Accessibility
> **Date:** 2026-02-27
> **Status:** Draft
> **Target:** WCAG 2.1 Level AA
> **Design System:** `@ci-t-hyperx/flow-ds` v2.8.7

---

## 1. Overview

This document tracks WCAG 2.1 AA compliance status for every component in the Flow Core Design System (`@ci-t-hyperx/flow-ds` v2.8.7). It serves as a living reference that will be updated as audits progress.

### 1.1 Accessibility Baseline

The design system is built on a combination of **Radix UI primitives** and **custom components**:

- **Radix UI primitives** provide built-in accessibility features out of the box: keyboard navigation, focus management, proper ARIA attributes, and screen reader support. Components built on Radix inherit these behaviors automatically, though configuration must still be verified.
- **Custom components** (not built on Radix) require manual accessibility implementation and thorough verification. These represent the majority of the component library and are the primary focus of this audit.

### 1.2 Radix-Based Components (13)

The following components use Radix UI primitives and benefit from built-in accessibility:

Accordion, Checkbox, Dialog, Dropdown, NavigationMenu, Popover, Radio, Select, Sheet, Slider, Switch, Tabs, Tooltip

### 1.3 Custom Components (34+)

Components NOT using Radix primitives require manual accessibility verification:

Button, AiButton, IconButton, CardButton, Avatar, Badge, Breadcrumb, Card, Divider, HelperText, Icons, Input, Label, Loading, Skeleton, SkeletonWrapper, ShimmerText, StarBorder, Table, Tag, TextArea, Banner, Chat, DragAndDrop, DropdownSearchable, DynamicChip, File, Form, List, Model, Pagination, Prompt, Search, Share, Snackbar

### 1.4 Compliance Target

**WCAG 2.1 Level AA** for all 52 components across the design system, covering both light and dark modes.

---

## 2. Compliance Matrix

### 2.1 Atoms (35 components)

#### Radix-Based Atoms (High Confidence)

These components inherit accessibility from Radix UI primitives. Color contrast still needs a dedicated audit.

| Component | Atomic Level | Radix-Based | Keyboard Nav | Focus Management | ARIA Attributes | Screen Reader | Color Contrast | Status |
|-----------|-------------|-------------|--------------|------------------|-----------------|---------------|----------------|--------|
| Accordion | Atom | Yes | Yes | Yes | Yes | Yes | Needs audit | Compliant (Radix) |
| Checkbox | Atom | Yes | Yes | Yes | Yes | Yes | Needs audit | Compliant (Radix) |
| Dialog | Atom | Yes | Yes | Yes (trap focus) | Yes | Yes | Needs audit | Compliant (Radix) |
| Dropdown | Atom | Yes | Yes | Yes | Yes | Yes | Needs audit | Compliant (Radix) |
| NavigationMenu | Atom | Yes | Yes | Yes | Yes | Yes | Needs audit | Compliant (Radix) |
| Popover | Atom | Yes | Yes | Yes (trap focus) | Yes | Yes | Needs audit | Compliant (Radix) |
| Radio | Atom | Yes | Yes | Yes | Yes | Yes | Needs audit | Compliant (Radix) |
| Select | Atom | Yes | Yes | Yes | Yes | Yes | Needs audit | Compliant (Radix) |
| Sheet | Atom | Yes | Yes | Yes (trap focus) | Yes | Yes | Needs audit | Compliant (Radix) |
| Slider | Atom | Yes | Yes | Yes | Yes | Yes | Needs audit | Compliant (Radix) |
| Switch | Atom | Yes | Yes | Yes | Yes | Yes | Needs audit | Compliant (Radix) |
| Tabs | Atom | Yes | Yes | Yes | Yes | Yes | Needs audit | Compliant (Radix) |
| Tooltip | Atom | Yes | N/A | N/A | Yes | Yes | N/A | Compliant (Radix) |

#### Custom Atoms (Needs Audit)

These components do not use Radix primitives and require full accessibility verification.

| Component | Atomic Level | Radix-Based | Keyboard Nav | Focus Management | ARIA Attributes | Screen Reader | Color Contrast | Status |
|-----------|-------------|-------------|--------------|------------------|-----------------|---------------|----------------|--------|
| AiButton | Atom | No | Likely (button) | Likely | Needs audit | Needs audit | Needs audit | Needs Audit |
| Avatar | Atom | No | N/A | N/A | Needs audit | Needs audit | Needs audit | Needs Audit |
| Badge | Atom | No | N/A | N/A | N/A | Needs audit | Needs audit | Needs Audit |
| Breadcrumb | Atom | No | Yes (links) | Needs audit | Needs audit | Needs audit | Needs audit | Needs Audit |
| Button | Atom | No | Yes (native button) | Yes (native) | Needs audit | Needs audit | Needs audit | Needs Audit |
| Card | Atom | No | N/A | N/A | N/A | Needs audit | Needs audit | Needs Audit |
| CardButton | Atom | No | Yes (clickable) | Needs audit | Needs audit | Needs audit | Needs audit | Needs Audit |
| Divider | Atom | No | N/A | N/A | Needs audit (`role="separator"`) | Needs audit | Needs audit | Needs Audit |
| HelperText | Atom | No | N/A | N/A | Needs audit (`aria-describedby`) | Needs audit | Needs audit | Needs Audit |
| IconButton | Atom | No | Yes (button) | Yes (native) | Needs audit (`aria-label`) | Needs audit | Needs audit | Needs Audit |
| Icons | Atom | No | N/A | N/A | Needs audit (`aria-hidden`) | Needs audit | N/A | Needs Audit |
| Input | Atom | No | Yes (native input) | Yes (native) | Needs audit | Needs audit | Needs audit | Needs Audit |
| Label | Atom | No | N/A | N/A | Needs audit (`htmlFor`) | Needs audit | Needs audit | Needs Audit |
| Loading | Atom | No | N/A | N/A | Needs audit (`aria-live`) | Needs audit | N/A | Needs Audit |
| Skeleton | Atom | No | N/A | N/A | Needs audit (`aria-hidden`) | Needs audit | N/A | Needs Audit |
| SkeletonWrapper | Atom | No | N/A | N/A | Needs audit | Needs audit | N/A | Needs Audit |
| ShimmerText | Atom | No | N/A | N/A | Needs audit | Needs audit | N/A | Needs Audit |
| StarBorder | Atom | No | N/A | N/A | N/A | Needs audit | N/A | Needs Audit |
| Table | Atom | No | Yes (native) | Needs audit | Needs audit (`scope`, `headers`) | Needs audit | Needs audit | Needs Audit |
| Tag | Atom | No | Likely (if removable) | Needs audit | Needs audit | Needs audit | Needs audit | Needs Audit |
| TextArea | Atom | No | Yes (native) | Yes (native) | Needs audit | Needs audit | Needs audit | Needs Audit |

### 2.2 Molecules (14 components)

| Component | Atomic Level | Radix-Based | Keyboard Nav | Focus Management | ARIA Attributes | Screen Reader | Color Contrast | Status |
|-----------|-------------|-------------|--------------|------------------|-----------------|---------------|----------------|--------|
| Banner | Molecule | No | Needs audit | Needs audit | Needs audit (`role="alert"`) | Needs audit | Needs audit | Needs Audit |
| Chat | Molecule | No | Needs audit | Needs audit | Needs audit | Needs audit | Needs audit | Needs Audit |
| DragAndDrop | Molecule | No | Needs audit | Needs audit | Needs audit | Needs audit | Needs audit | Needs Audit |
| DropdownSearchable | Molecule | Partial (Radix dropdown + custom search) | Needs audit | Needs audit | Needs audit | Needs audit | Needs audit | Needs Audit |
| DynamicChip | Molecule | No | Needs audit | Needs audit | Needs audit | Needs audit | Needs audit | Needs Audit |
| File | Molecule | No | Needs audit | Needs audit | Needs audit | Needs audit | Needs audit | Needs Audit |
| Form | Molecule | Partial (uses Radix inputs) | Needs audit | Needs audit | Needs audit | Needs audit | Needs audit | Needs Audit |
| List | Molecule | No | Needs audit | Needs audit | Needs audit (`role="list"`) | Needs audit | Needs audit | Needs Audit |
| Model | Molecule | No | Needs audit | Needs audit | Needs audit | Needs audit | Needs audit | Needs Audit |
| Pagination | Molecule | No | Yes (buttons) | Needs audit | Needs audit (`aria-label`) | Needs audit | Needs audit | Needs Audit |
| Prompt | Molecule | No | Needs audit | Needs audit | Needs audit | Needs audit | Needs audit | Needs Audit |
| Search | Molecule | No | Yes (input) | Needs audit | Needs audit (`role="search"`) | Needs audit | Needs audit | Needs Audit |
| Share | Molecule | Partial (uses Dialog) | Needs audit | Needs audit | Needs audit | Needs audit | Needs audit | Needs Audit |
| Snackbar | Molecule | No | Needs audit | Needs audit | Needs audit (`role="alert"`) | Needs audit | Needs audit | Needs Audit |

### 2.3 Organisms (3 components)

| Component | Atomic Level | Radix-Based | Keyboard Nav | Focus Management | ARIA Attributes | Screen Reader | Color Contrast | Status |
|-----------|-------------|-------------|--------------|------------------|-----------------|---------------|----------------|--------|
| Chat (advanced) | Organism | Partial | Needs audit | Needs audit | Needs audit | Needs audit | Needs audit | Needs Audit |
| Form (EditableList) | Organism | Partial | Needs audit | Needs audit | Needs audit | Needs audit | Needs audit | Needs Audit |
| Share (complex) | Organism | Partial (Dialog) | Needs audit | Needs audit | Needs audit | Needs audit | Needs audit | Needs Audit |

---

## 3. WCAG 2.1 AA Criteria Checklist

This section maps key WCAG 2.1 Level AA success criteria to design system concerns.

### 3.1 Perceivable

| Criterion | Description | Design System Impact | Status |
|-----------|-------------|---------------------|--------|
| **1.1.1** Non-text Content | All non-text content has a text alternative | Icons need `aria-label` or `aria-hidden`; Avatar images need `alt` text; Loading indicators need accessible labels | Needs Audit |
| **1.3.1** Info and Relationships | Information, structure, and relationships can be programmatically determined | Form inputs need associated `<label>` elements; Table needs `scope` and `headers` attributes; Breadcrumb needs `<nav>` landmark | Needs Audit |
| **1.3.2** Meaningful Sequence | Reading and navigation order is correct and meaningful | Tab order in forms, modals, and navigation must be logical | Needs Audit |
| **1.4.1** Use of Color | Color is not used as the only visual means of conveying information | Badge/Tag status should not rely solely on color; Form error states need text indicators alongside red color | Needs Audit |
| **1.4.3** Contrast (Minimum) | Text has a contrast ratio of at least 4.5:1 (normal) or 3:1 (large text) | ALL color tokens need audit against backgrounds in both light and dark mode | Needs Audit |
| **1.4.4** Resize Text | Text can be resized up to 200% without loss of content or functionality | Components must support text scaling; no fixed pixel heights on text containers | Needs Audit |
| **1.4.11** Non-text Contrast | UI components and graphical objects have at least 3:1 contrast against adjacent colors | Button borders, Input borders, Switch tracks, Slider thumbs, focus indicators all need verification | Needs Audit |

### 3.2 Operable

| Criterion | Description | Design System Impact | Status |
|-----------|-------------|---------------------|--------|
| **2.1.1** Keyboard | All functionality is operable through a keyboard interface | All interactive components (Button, Input, Select, Dropdown, Tabs, Dialog, etc.) must be keyboard accessible | Needs Audit |
| **2.1.2** No Keyboard Trap | Focus can be moved away from any component using the keyboard | Dialog, Sheet, and Popover must allow escape; no keyboard traps in forms | Needs Audit |
| **2.4.3** Focus Order | Focusable components receive focus in an order that preserves meaning | Tab order must be logical in all composite components (Form, Pagination, NavigationMenu) | Needs Audit |
| **2.4.6** Headings and Labels | Headings and labels describe topic or purpose | Form labels must be descriptive; Dialog titles must describe purpose | Needs Audit |
| **2.4.7** Focus Visible | Keyboard focus indicator is visible | Focus indicators must be visible; Tailwind `focus-visible:` utilities should be applied consistently | Needs Audit |
| **2.5.3** Label in Name | Accessible names include the visible text label | Button text must match `aria-label` when provided; IconButton needs meaningful `aria-label` | Needs Audit |

### 3.3 Understandable

| Criterion | Description | Design System Impact | Status |
|-----------|-------------|---------------------|--------|
| **3.2.1** On Focus | No unexpected context change when a component receives focus | Dropdown and Select must not trigger navigation on focus alone | Needs Audit |
| **3.2.2** On Input | No unexpected context change when changing a component's setting | Form inputs must not auto-submit; Select changes must not navigate without user confirmation | Needs Audit |
| **3.3.1** Error Identification | Input errors are automatically detected and described in text | Form validation errors must be described in text, not just color; HelperText should be linked via `aria-describedby` | Needs Audit |
| **3.3.2** Labels or Instructions | Labels or instructions are provided for user input | All form inputs need visible labels; required fields need indication; Input placeholder is NOT a substitute for Label | Needs Audit |

### 3.4 Robust

| Criterion | Description | Design System Impact | Status |
|-----------|-------------|---------------------|--------|
| **4.1.2** Name, Role, Value | All UI components have accessible name, role, and value that can be programmatically determined | Every interactive component needs proper ARIA attributes; custom widgets need explicit roles | Needs Audit |
| **4.1.3** Status Messages | Status messages can be programmatically determined without receiving focus | Snackbar, Banner, Loading, and form validation messages need `aria-live` regions | Needs Audit |

---

## 4. Color Contrast Audit Status

All color palettes must be audited for WCAG 2.1 AA compliance: **4.5:1** minimum contrast ratio for normal text, **3:1** for large text and UI components.

### 4.1 Palette Audit Status

| Palette | Usage Context | Light Mode | Dark Mode | Status |
|---------|--------------|------------|-----------|--------|
| **Primary** (50-950 shades) | Buttons, links, active states | Needs audit | Needs audit | Not Started |
| **Brand** | Logo, brand elements, accents | Needs audit | Needs audit | Not Started |
| **Destructive / Error** (red) | Error states, delete actions | Needs audit (red on white) | Needs audit (red on dark) | Not Started |
| **Success** (green) | Success states, completion indicators | Needs audit (green on white) | Needs audit (green on dark) | Not Started |
| **Warning** (yellow) | Warning states, caution indicators | Needs audit (HIGH RISK — yellow on white is often insufficient) | Needs audit | Not Started |
| **Info** (blue) | Informational states, help text | Needs audit (blue on white) | Needs audit (blue on dark) | Not Started |
| **Neutral / Gray** (50-950) | Text, borders, backgrounds, disabled states | Needs audit | Needs audit | Not Started |
| **Background / Surface** | Cards, containers, page backgrounds | Needs audit | Needs audit | Not Started |

### 4.2 Known Risk Areas

- **Warning palette (yellow):** Yellow on white backgrounds frequently fails contrast requirements. This palette needs special attention and may require darker shades or alternative visual indicators.
- **Disabled states:** Disabled component colors often fail contrast ratios. While WCAG does not require contrast for disabled elements, best practice is to maintain at least 3:1.
- **Placeholder text:** Input placeholder text is often too light. Verify placeholder color tokens meet 4.5:1 against input backgrounds.
- **Dark mode:** Dark mode palettes need independent verification — contrast relationships change completely.

---

## 5. Audit Roadmap

| Phase | Scope | Priority | Target Date | Status |
|-------|-------|----------|-------------|--------|
| **Phase 1** | Audit Radix-based components (13 atoms) — verify Radix configuration is correct and no overrides break accessibility | High | TBD | Not Started |
| **Phase 2** | Audit custom interactive atoms (Button, Input, TextArea, IconButton, CardButton, Table, Tag) — these are highest-usage components | High | TBD | Not Started |
| **Phase 3** | Color contrast audit — all palettes, light + dark mode, text and non-text elements | High | TBD | Not Started |
| **Phase 4** | Audit molecules (especially Form, Pagination, Search, Snackbar, Banner) — user-facing composite components | Medium | TBD | Not Started |
| **Phase 5** | Audit organisms (Chat advanced, Form EditableList, Share complex) | Medium | TBD | Not Started |
| **Phase 6** | Audit decorative/display atoms (Badge, Avatar, Loading, Skeleton, ShimmerText, StarBorder) — lower interaction surface | Low | TBD | Not Started |
| **Phase 7** | Automated accessibility testing integration (axe-core in Storybook, CI/CD pipeline) | Medium | TBD | Not Started |

### 5.1 Phase Details

**Phase 1 — Radix Verification:**
Radix components provide excellent accessibility out of the box, but custom styling and prop overrides can break these behaviors. This phase verifies that our wrapper components do not interfere with Radix's built-in accessibility. Focus on: Dialog focus trap, Sheet focus trap, Popover focus trap, Tabs arrow-key navigation, Select keyboard interaction, Accordion expand/collapse.

**Phase 2 — Custom Interactive Atoms:**
These are the most frequently used interactive components and represent the highest risk. Audit each for: keyboard operability, focus indicators, ARIA attributes, screen reader announcements. Special attention: IconButton (needs `aria-label`), Input/TextArea (need label association), Table (needs `scope` and `headers`).

**Phase 3 — Color Contrast:**
Use automated tooling (axe-core, Stark plugin) to audit all color token combinations. Document every failing combination and propose alternatives. Warning palette is highest risk.

**Phase 4-5 — Composite Components:**
Molecules and organisms combine multiple atoms. Audit interaction patterns, focus flow between sub-components, and overall screen reader experience. Form validation flow is especially critical.

**Phase 6 — Decorative Components:**
Lower priority but still important. Verify decorative elements are properly hidden from assistive technology (`aria-hidden`), and that informational components (Badge, Avatar) provide proper text alternatives.

**Phase 7 — Automation:**
Integrate accessibility testing into the development workflow to prevent regressions. Storybook addon-a11y is already installed — verify it is active and running. Add axe-core to unit tests and pa11y to CI/CD.

---

## 6. Tooling Recommendations

### 6.1 Currently Available

| Tool | Status | Notes |
|------|--------|-------|
| **Storybook addon-a11y** | Installed (verify active) | Runs axe-core checks in Storybook panel. Verify it is enabled and running for all component stories. |

### 6.2 Recommended Additions

| Tool | Purpose | Integration Point | Priority |
|------|---------|-------------------|----------|
| **axe-core** | Automated accessibility testing in unit tests | Jest / Vitest test suite | High |
| **pa11y** | Automated accessibility testing in CI/CD | GitHub Actions pipeline | High |
| **Stark (Figma plugin)** | Color contrast checking in design files | Figma design workflow | Medium |
| **VoiceOver** (macOS) | Manual screen reader testing | Developer workstations | High |
| **NVDA** (Windows) | Manual screen reader testing | QA workstations | Medium |
| **Keyboard-only testing** | Manual keyboard navigation verification | All development and QA | High |
| **eslint-plugin-jsx-a11y** | Static analysis for accessibility issues in JSX | Linting pipeline | Medium |

### 6.3 Testing Strategy

1. **Automated (Storybook):** Every component story should pass addon-a11y checks with zero violations.
2. **Automated (CI/CD):** axe-core or pa11y runs on every PR, blocking merge on critical/serious violations.
3. **Manual (Keyboard):** Every interactive component must be usable with keyboard only — no mouse required.
4. **Manual (Screen Reader):** Key user flows tested with VoiceOver and NVDA at least once per release.
5. **Design Review:** Color contrast and visual accessibility checked in Figma before implementation.

---

## 7. Summary Statistics

| Metric | Value |
|--------|-------|
| **Total components** | 52 |
| **Radix-based (high confidence)** | 13 (25%) |
| **Partial Radix** | 5 (~10%) |
| **Custom (needs full audit)** | 34 (~65%) |
| **Color palettes to audit** | 8+ (light + dark) |
| **WCAG criteria applicable** | ~20 key criteria |
| **Storybook a11y addon** | Installed (verify active) |
| **Automated testing in CI** | Not yet configured |
| **Components fully audited** | 0 (0%) |
| **Components passing AA** | TBD |

---

## Revision History

| Date | Author | Changes |
|------|--------|---------|
| 2026-02-27 | Design Strategy / Accessibility | Initial document creation — compliance matrix, criteria checklist, audit roadmap |

---

*This is a living document. Update compliance status as audits progress. Each component's status should be changed from "Needs Audit" to "Compliant", "Partial", or "Non-Compliant" as audits are completed.*
