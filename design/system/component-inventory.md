---
type: document
domain: platform
status: current
date: 2026-03-14
---

# Flow Platform — Component Inventory

## Overview

This document catalogs all reusable components identified across the Flow Platform design system in Figma. The inventory covers 54+ screens across 5 product engines (Chat, Steps, Ops, Coders, Companion) and includes usage counts, variant descriptions, dependency relationships, and gap analysis.

**Last updated:** 2026-02-27
**Source:** Figma design files for Flow Platform
**Codebase:** `@ci-t-hyperx/flow-ds` v2.8.7 ([flow-core-design-system](https://github.com/CI-T-HyperX/flow-core-design-system))

---

## Component Inventory

### Core Components

| Component Name | Category | Variants/States | Usage Count | Used In | Codebase Status | Notes |
|----------------|----------|-----------------|-------------|---------|-----------------|-------|
| Badge | Data Display | Default, Status (active/inactive/warning/error), Counter, Label | 355 | All engines, dashboards, navigation, cards | **Implemented** — Atom `Badge` | Foundational data display primitive. Most-used component in the system. Used for status indicators, counters, labels, and category tags across every product engine. |
| Icon Container / Icon container | Layout / Wrapper | Size: 14px, 16px, 20px, 24px | 342 | Everywhere icons appear | **Different name** — Atom `Icons` + `cn()` utility | Wrapper component that standardizes icon sizing and alignment. In code, implemented via Icons atom + Tailwind utility classes, not a separate container. |
| button / Button | Interactive | Primary, Secondary, Ghost, Destructive; States: default, hover, active, disabled, loading | 107 | All engines, forms, dialogs, cards, headers | **Implemented** — Atom `Button` (unified, 12 variants, 2 sizes) | Naming inconsistency resolved in codebase: single `Button` with variants: primary, secondary, brand, brand-ghost, error, primary-outline, secondary-outline, error-outline, brand-outline, primary-ghost, success, success-outline. Sizes: large, medium. |
| Avatar | Data Display | Default (40px), with status indicator, with initials fallback | 38 | User profiles, team lists, activity feeds, Avatar menu | **Implemented** — Atom `Avatar` | Standard 40px user representation. Used in headers, team member lists, and activity displays. |
| Tag | Data Display | Default, Removable, Color-coded (per engine) | 17 | Categorization, filters, engine labels | **Implemented** — Atom `Tag` | Used for categorization labels. Distinct from Badge — Tags are interactive/removable, Badges are read-only. |
| Tooltip | Feedback / Overlay | Top, Bottom, Left, Right | 4 | Icon buttons, truncated text, info icons | **Implemented** — Atom `Tooltip` (Radix-based) | Low usage suggests potential underutilization. Should be applied more consistently for accessibility. |
| Loading | Feedback | Spinner, Skeleton, Progress bar | 3 | Data-heavy screens (Ops dashboards, Steps pipelines) | **Implemented** — Atoms: `Loading`, `Skeleton`, `SkeletonWrapper`, `ShimmerText` | Expanded in codebase to 4 components. Very low Figma usage — likely indicates missing loading states in many screens. |

### Navigation Components

| Component Name | Category | Variants/States | Usage Count | Used In | Codebase Status | Notes |
|----------------|----------|-----------------|-------------|---------|-----------------|-------|
| Side menu | Navigation | Collapsed (76px), Expanded; Active/Inactive states per item | — | All pages (global layout) | **Not in codebase** (product-specific) | Fixed left sidebar. 76px collapsed width is the standard layout template. Contains engine icons and navigation items. |
| Nav container / .nav container item | Navigation | Horizontal bar, with/without active indicator | — | Top-level navigation within engines | **Implemented** — Atom `NavigationMenu` (Radix-based) | Two naming patterns: `Nav container` (public) and `.nav container item` (private/internal, dot-prefix). |
| Portal menu item | Navigation | Default, Hover, Active, Disabled | — | Portal-level menu (cross-engine navigation) | **Implemented** — Part of `NavigationMenu` | Top-level menu items for switching between product engines or platform areas. |
| Menu item | Navigation | Default, Hover, Active, with icon, with badge, with submenu indicator | — | Dropdowns, context menus, side menu | **Implemented** — Part of `Dropdown` atom | Generic menu item used inside various menu containers. |
| Avatar menu | Navigation | Collapsed (avatar only), Expanded (dropdown with user info and options) | — | Header (top-right) | **Implemented** — Composed: `Avatar` + `Dropdown` | User dropdown menu combining Avatar component with menu items. Contains profile, settings, and logout actions. |
| Header | Layout | Default, with breadcrumbs, with action buttons, engine-specific variants | — | All pages (global layout) | **Not in codebase** (product-specific) | Page header component. Contains page title, breadcrumbs, and contextual action buttons. |

### Input Components

| Component Name | Category | Variants/States | Usage Count | Used In | Codebase Status | Notes |
|----------------|----------|-----------------|-------------|---------|-----------------|-------|
| .Chat input | Input | Default, Focused, With attachment, Disabled; Multi-line | 3 | Chat engine | **Implemented** — Organism `Chat` (atoms/Chat + organisms/Chat) | Dot-prefix (`.`) indicates private/internal component. In codebase, part of the Chat organism with full streaming and attachment support. |
| Dropdown menu | Input / Selection | Single-select, Multi-select; Open/Closed states | 6 | Filters, settings, form fields | **Implemented** — Atom `Dropdown` + Molecule `DropdownSearchable` | Standard dropdown for option selection. Codebase provides both basic and searchable variants. |
| icon button | Interactive | Sizes: small, medium, large; States: default, hover, active, disabled | 8 | Toolbars, cards, inline actions | **Implemented** — Atom `IconButton` (PascalCase) | Lowercase naming resolved in codebase as `IconButton`. |

### Product-Specific Components

| Component Name | Category | Variants/States | Usage Count | Used In | Codebase Status | Notes |
|----------------|----------|-----------------|-------------|---------|-----------------|-------|
| Product Card | Content / Card | Per engine: Chat, Steps, Ops, Coders, Companion; States: default, hover, selected | — | Portal, engine selection screens | **Implemented** — built on Atom `Card` + `CardButton` | Showcases each product engine with its icon, description, and color. Codebase provides generic Card and CardButton atoms as base components. |
| CTA Card | Content / Card | Primary CTA, Secondary CTA; with/without icon | — | Portal, onboarding, marketing surfaces | **Implemented** — built on Atom `Card` + `CardButton` | Call-to-action cards for driving user engagement. Built on generic Card atom. |
| Maturidade | Data Display / Assessment | Levels: 1-5 (or equivalent scale); with/without progress indicator | 8 | Ops engine, AIMS module | **Not in codebase** (product-specific) | Maturity assessment component. Not in the shared design system — implemented directly in product code. Portuguese name — should be evaluated for i18n. |
| Steps Studio | Product-Specific | Editor mode, Preview mode, various step types | — | Steps engine only | **Not in codebase** (product-specific) | Steps-specific component for the step editor/studio. Tightly coupled to the Steps product engine. |

### Icon Library (Most Used)

Icon library confirmed as **Tabler Icons** (`react-icons/tb`). Additionally, custom Flow icons are available in the `Icons` atom.

| Icon Name | Category | Usage Count | Primary Usage Context | Codebase Status | Notes |
|-----------|----------|-------------|----------------------|-----------------|-------|
| terminal-flow | Engine Icon | 110 | Coders engine | **Implemented** (Tabler) | Dedicated engine icon. Custom Flow Platform icon. |
| message | Engine Icon | 108 | Chat engine | **Implemented** (Tabler) | Dedicated engine icon. Highest usage among engine icons. |
| layout-cards | Engine Icon | 100 | Steps engine | **Implemented** (Tabler) | Dedicated engine icon. |
| arrow-up-right | Action / Navigation | 98 | External links | **Implemented** (Tabler) | Used consistently for external link indicators across all engines. |
| chart-bar | Engine Icon | 86 | Ops engine | **Implemented** (Tabler) | Dedicated engine icon. |
| lifebuoy | Support | 37 | Help/support sections | **Implemented** (Tabler) | Help and support icon. Used in navigation and contextual help. |
| book-2 | Documentation | 29 | Documentation links, knowledge base | **Implemented** (Tabler) | Used for documentation and learning resources. |
| layout-sidebar-right | Engine Icon | 22 | Companion engine | **Implemented** (Tabler) | Dedicated engine icon. |
| arrow-bar-to-right | Action / Navigation | 15 | Expand/collapse, navigation | **Implemented** (Tabler) | Used for sidebar and panel toggle actions. |
| source-code | Content | 11 | Code-related features | **Implemented** (Tabler) | Used in code display and code-related UI sections. |
| bulb | Content / Ideas | 11 | Ideas, suggestions, tips | **Implemented** (Tabler) | Used for idea/suggestion indicators and tip callouts. |
| flask | Content / Labs | — | Labs/experimental features | **Implemented** (Tabler) | Used to indicate experimental or beta features. |
| news | Content | — | News feed, announcements | **Implemented** (Tabler) | Used in news and announcement sections. |
| brand-openai | Third-Party | 2 | AI provider indicators | **Implemented** (Tabler) | Third-party brand icon. Low usage — specific to AI provider attribution. |
| thumb-up | Feedback | — | Likes, positive feedback | **Implemented** (Tabler) | Used in feedback and reaction features. |
| bell | Notification | — | Notifications | **Implemented** (Tabler) | Used for notification indicators and alerts. |

#### Custom Flow Icons (in codebase, not in Tabler)

| Icon Name | Category | Description |
|-----------|----------|-------------|
| Flow | Brand | Flow logo mark (monochrome) |
| FlowColorful | Brand | Flow logo mark (full color) |
| FlowFull | Brand | Flow full wordmark (monochrome) |
| FlowFullColorful | Brand | Flow full wordmark (full color) |
| FlowLogo | Brand | Flow standalone logo |
| FlowLogoColorful | Brand | Flow standalone logo (full color) |
| User | Utility | Custom user/person icon |
| AzureStorage | Integration Source | Azure Blob Storage connector |
| Confluence | Integration Source | Atlassian Confluence connector |
| GoogleDrive | Integration Source | Google Drive connector |
| Plug | Integration Source | Generic integration/connection icon |

---

## Component Dependency Map

The following describes which components contain or depend on other components:

```
Side menu
  +-- Icon Container
  |     +-- [engine icons: message, terminal-flow, layout-cards, chart-bar, layout-sidebar-right]
  +-- Menu item
  |     +-- Badge (counter variant)
  +-- Avatar menu
        +-- Avatar
        +-- Menu item

Header
  +-- Badge (status/label variant)
  +-- button / Button (action buttons)
  +-- icon button (toolbar actions)
  +-- Avatar menu

Nav container
  +-- .nav container item
        +-- Icon Container
        +-- Badge

Product Card
  +-- Icon Container
  |     +-- [engine icon]
  +-- Badge (label variant)
  +-- Tag (engine category)
  +-- button / Button

CTA Card
  +-- Icon Container
  +-- button / Button
  +-- Badge (optional)

Dropdown menu
  +-- Menu item
        +-- Icon Container
        +-- Badge (optional)

.Chat input
  +-- icon button (send, attach)
  +-- Icon Container

Tooltip
  +-- (standalone, wraps any trigger element)

Maturidade
  +-- Badge (level indicator)
  +-- Icon Container

Steps Studio
  +-- button / Button
  +-- icon button
  +-- Dropdown menu
  +-- Badge
  +-- Tag
  +-- Loading
```

---

## Naming Convention Summary

### Current State

The design system uses several naming patterns, some intentional and some inconsistent:

| Convention | Pattern | Example | Status |
|------------|---------|---------|--------|
| Dot-prefix (`.`) | `.ComponentName` | `.Chat input`, `.nav container item` | **Intentional** — marks internal/private components not meant for direct use |
| PascalCase | `ComponentName` | `Avatar`, `Badge`, `Tag`, `Tooltip`, `Loading` | **Standard** — majority of core components |
| lowercase | `componentname` | `button`, `icon button` | **Inconsistent** — should be PascalCase |
| Mixed case variants | Both cases coexist | `button` / `Button`, `Icon Container` / `Icon container` | **Bug** — duplicate naming for same component |
| kebab-case | `icon-name` | `arrow-up-right`, `terminal-flow`, `chart-bar` | **Standard** — used consistently for icon names |
| Screen naming | `[Page] / [Product]` | `Dashboard / Ops`, `Studio / Steps` | **Emerging** — not fully adopted across all screens |

### Recommended Standardization

1. **Components:** PascalCase with spaces for multi-word names (e.g., `Icon Container`, `Icon Button`, `Chat Input`)
2. **Private/Internal components:** Dot-prefix + PascalCase (e.g., `.Nav Container Item`)
3. **Icons:** kebab-case (already consistent)
4. **Screens:** `[Page] / [Product]` pattern (e.g., `Dashboard / Ops`)
5. **Variants:** Slash-separated hierarchy (e.g., `Button / Primary / Default`)

---

## Gap Analysis

### Missing or Underrepresented Components — Updated Status

The following table updates the original gap analysis with the current status in `flow-core-design-system` v2.8.7:

| Gap | Original Severity | Codebase Status | Resolution Details |
|-----|-------------------|-----------------|-------------------|
| **Form inputs** (text field, textarea, checkbox, radio, switch, date picker) | High | **RESOLVED** | Atoms: `Input`, `TextArea`, `Checkbox`, `Radio`, `Switch`, `Select`. Molecules: `Form` (composite). Only Date Picker is still missing as a standalone atom. |
| **Modal / Dialog** | High | **RESOLVED** | Atoms: `Dialog` (Radix-based modal) + `Sheet` (slide-out panel). Together they cover all modal/dialog use cases including full-screen and side panel patterns. |
| **Toast / Notification** | Medium | **RESOLVED** | Molecules: `Snackbar` (auto-dismiss toast) + `Banner` (persistent notification/alert). Full notification lifecycle supported. |
| **Table / Data Grid** | High | **RESOLVED** | Atom: `Table` with header, body, row, and cell sub-components. Pagination available as separate molecule. |
| **Card (generic)** | Medium | **RESOLVED** | Atoms: `Card` (generic container) + `CardButton` (clickable card). Product Card and CTA Card can now extend these base atoms. |
| **Breadcrumbs** | Low | **RESOLVED** | Atom: `Breadcrumb` — standalone breadcrumb trail component. |
| **Pagination** | Medium | **RESOLVED** | Molecule: `Pagination` — page navigation controls for tables and lists. |
| **Empty State** | Medium | **STILL MISSING** | No empty state component in the codebase. Remains a gap. Recommendation: Create `EmptyState` atom with illustration, message, and optional CTA. |
| **Error State** | Medium | **STILL MISSING** | No error boundary or error display component in the design system. Remains a gap. Recommendation: Create `ErrorState` atom for API failures and error boundaries. |
| **Skeleton / Loading States** | High | **RESOLVED** | Atoms: `Loading` (spinner), `Skeleton` (placeholder), `SkeletonWrapper` (container for skeleton groups), `ShimmerText` (animated text placeholder). Comprehensive loading state coverage. |
| **Sidebar Panel** | Low | **PARTIALLY RESOLVED** | Atom: `Sheet` provides slide-out panel functionality from any screen edge. Covers the Companion sidebar use case but may need product-specific customization. |

### Gap Summary

| Status | Count | Gaps |
|--------|-------|------|
| **Resolved** | 8 | Form inputs, Modal/Dialog, Toast/Notification, Table, Card, Breadcrumbs, Pagination, Loading States |
| **Partially Resolved** | 1 | Sidebar Panel (via Sheet) |
| **Still Missing** | 2 | Empty State, Error State |

### Naming Inconsistencies Requiring Resolution

| Issue | Current State | Proposed Fix |
|-------|--------------|--------------|
| `button` vs `Button` | Two naming variants for the same component (107 total instances) | Unify as `Button` (PascalCase) |
| `Icon Container` vs `Icon container` | Inconsistent capitalization (342 total instances) | Unify as `Icon Container` (PascalCase with space) |
| `icon button` | Lowercase, inconsistent with other components | Rename to `Icon Button` (PascalCase with space) |
| `Maturidade` | Portuguese name in an English-convention system | Evaluate renaming to `Maturity` or keep with alias for i18n |
| `.Chat input` | Mixed convention: dot-prefix (correct for private) but lowercase `input` | Standardize as `.Chat Input` |

### Engine Icon Completeness

| Engine | Icon | Status |
|--------|------|--------|
| Chat | `message` (108 instances) | Complete |
| Coders | `terminal-flow` (110 instances) | Complete |
| Steps | `layout-cards` (100 instances) | Complete |
| Ops | `chart-bar` (86 instances) | Complete |
| Companion | `layout-sidebar-right` (22 instances) | Complete |

All five product engines have dedicated icons with consistent kebab-case naming. Companion's lower usage count reflects its newer/smaller scope.

---

## Codebase Components Not in Figma

The following components exist in `flow-core-design-system` but were **not identified** in the Figma Homepage file analysis. They may exist in other Figma files, or they represent codebase-first additions that need to be backported to Figma.

### Atoms Not in Figma Inventory

| Component | Category | Description | Priority for Figma |
|-----------|----------|-------------|--------------------|
| Accordion | Layout | Collapsible content sections (Radix-based) | Medium |
| AiButton | Interactive | Specialized button for AI-related actions | High (AIMS relevance) |
| Breadcrumb | Navigation | Breadcrumb trail navigation | Low (simple pattern) |
| CardButton | Content / Card | Clickable card variant acting as a button | Medium |
| Divider | Layout | Horizontal/vertical divider line | Low |
| HelperText | Form / Feedback | Form field helper and validation text | Medium |
| Label | Form | Form field label | Medium |
| NavigationMenu | Navigation | Top-level navigation menu (Radix-based) | Medium |
| Popover | Overlay | Contextual popover anchored to trigger (Radix-based) | Medium |
| Sheet | Overlay / Layout | Slide-out panel from screen edge | High |
| ShimmerText | Feedback | Animated shimmer text placeholder for loading | Low |
| SkeletonWrapper | Feedback | Container for grouping skeleton placeholders | Low |
| Slider | Input | Range slider control | Low |
| StarBorder | Data Display | Star/rating border element | Low |
| Switch | Input | Toggle switch control | Medium |
| TextArea | Input | Multi-line text input | Medium |

### Molecules Not in Figma Inventory

| Component | Category | Description | Priority for Figma |
|-----------|----------|-------------|--------------------|
| Banner | Feedback | Notification/alert banner with dismiss action | High |
| DragAndDrop | Interactive | Drag-and-drop interaction container | Medium |
| DropdownSearchable | Input / Selection | Dropdown with search/filter for large option lists | Medium |
| DynamicChip | Data Display | Dynamic tag/chip with creation and removal | Medium |
| File | Content | File display/upload with preview | Medium |
| Form | Form (composite) | Composite form assembling Input, Label, HelperText, validation | High |
| List | Content | Structured list display | Medium |
| Model | Content | Data model display component | Low |
| Prompt | Input | AI prompt input for Chat and Steps | High (AIMS relevance) |
| Search | Input | Search with suggestions and results | High |
| Share | Interactive | Share action molecule | Medium |
| Snackbar | Feedback | Toast notification with auto-dismiss | High |

### Organisms Not in Figma Inventory

| Component | Category | Description | Priority for Figma |
|-----------|----------|-------------|--------------------|
| Chat (advanced) | Product Feature | Full chat interface with message list, input, file attachments, AI streaming | High |
| Form (EditableList) | Form | Editable list form with dynamic add/remove/reorder | Medium |
| Share (ShareContent + ShareDialog) | Interactive | Complete sharing organism with content display and dialog flow | Medium |

---

## Naming Cross-Reference

Mapping between Figma component names and codebase component names in `flow-core-design-system`:

| Figma Name | Codebase Name | Level | Notes |
|------------|---------------|-------|-------|
| `Badge` | `Badge` | Atom | Direct match |
| `Icon Container` / `Icon container` | `Icons` + `cn()` utility | Atom + utility | Different approach: Figma uses wrapper component, code uses atom + utility classes |
| `button` / `Button` | `Button` | Atom | Unified in code. 12 variants (primary, secondary, brand, brand-ghost, error, primary-outline, secondary-outline, error-outline, brand-outline, primary-ghost, success, success-outline), 2 sizes (large, medium) |
| `Avatar` | `Avatar` | Atom | Direct match |
| `Tag` | `Tag` | Atom | Direct match |
| `Tooltip` | `Tooltip` | Atom | Direct match. Radix-based in code. |
| `Loading` | `Loading` + `Skeleton` + `SkeletonWrapper` + `ShimmerText` | Atoms (4) | Expanded: single Figma component maps to 4 codebase atoms |
| `icon button` | `IconButton` | Atom | Name normalized to PascalCase in code |
| `.Chat input` | `Chat` (atom) + `Chat` (organism) | Atom + Organism | Internal Figma component maps to full Chat system in code |
| `Dropdown menu` | `Dropdown` (atom) + `DropdownSearchable` (molecule) | Atom + Molecule | Code provides both basic and searchable variants |
| `Nav container` | `NavigationMenu` | Atom | Radix-based in code |
| `Menu item` | Part of `Dropdown` | Atom (sub-component) | Integrated into Dropdown atom in code |
| `Product Card` | Built on `Card` + `CardButton` | Atoms (base) | Generic card atoms provide the foundation; product-specific rendering in app code |
| `CTA Card` | Built on `Card` + `CardButton` | Atoms (base) | Same as Product Card — composed from generic card atoms |
| `Maturidade` | — | Not in DS | Product-specific component, not part of the shared design system |
| `Steps Studio` | — | Not in DS | Product-specific component, not part of the shared design system |
| `Side menu` | — | Not in DS | Product-specific layout component |
| `Header` | — | Not in DS | Product-specific layout component |
| `Avatar menu` | `Avatar` + `Dropdown` | Composed | Composed from two atoms in code |

---

## Summary Statistics

### Figma Inventory

| Metric | Value |
|--------|-------|
| Total documented Figma components | 20 (core + navigation + input + product-specific) |
| Total documented Figma icons | 16 (all confirmed in Tabler Icons) |
| Total component instances (tracked) | ~900+ |
| Naming inconsistencies requiring fix | 5 (3 resolved in codebase, 2 remain in Figma) |
| Product engines covered | 5 (Chat, Steps, Ops, Coders, Companion) |

### Codebase Inventory (`@ci-t-hyperx/flow-ds` v2.8.7)

| Metric | Value |
|--------|-------|
| Total codebase components | 52 (35 atoms + 14 molecules + 3 organisms) |
| Custom Flow icons | 11 (6 brand + 1 utility + 4 integration sources) |
| CSS custom properties (design tokens) | 250+ |
| i18n languages supported | 2 (pt-BR, en-US) |
| Architecture | Atomic Design (React 18 + TypeScript + Tailwind + Radix UI + CVA) |

### Figma-to-Codebase Coverage

| Metric | Value |
|--------|-------|
| Figma components implemented in codebase | 14 of 20 (70%) |
| Figma components NOT in codebase | 4 (Side menu, Header, Maturidade, Steps Studio — all product-specific) |
| Figma components with different name in codebase | 2 (Icon Container → Icons, icon button → IconButton) |
| Codebase atoms NOT in Figma | 24 of 35 (69%) |
| Codebase molecules NOT in Figma | 12 of 14 (86%) |
| Codebase organisms NOT in Figma | 3 of 3 (100%) |

### Gap Analysis Resolution

| Metric | Value |
|--------|-------|
| Original gaps identified | 11 |
| Gaps resolved in codebase | 8 (73%) |
| Gaps partially resolved | 1 (Sidebar Panel → Sheet) |
| Gaps still open | 2 (Empty State, Error State) |
