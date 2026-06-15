---
type: document
domain: platform
status: current
date: 2026-03-14
---

# Flow Platform Design System

> **Author:** Design Strategy / UX Team
> **Date:** 2026-02-27
> **Status:** Draft
> **Area:** Flow Platform / Design
> **Design Tool:** Figma
> **Figma File:** Homepage (`CEy4t56KAFnPtirjzY3Emg`)
> **Version:** v0.7.6
> **Codebase Version:** `@ci-t-hyperx/flow-ds` v2.8.7

---

## 1. Overview

This document captures the design system of the **Flow Platform** as observed in the Figma Homepage file (v0.7.6). It serves as a living reference for both designers and frontend developers, cataloging the layout system, component library, icon set, naming conventions, and recurring design patterns across 54+ screens.

The Flow Platform is a multi-engine product suite. The homepage acts as the central hub, surfacing all five product engines and providing entry points into each. This design system analysis is derived from the production Figma file and reflects the current state of the platform's visual language.

### 1.1 Purpose

- Provide a single source of truth for UI components and patterns
- Enable consistent implementation across Flow Platform modules (Ops, Chat, Steps, Coders, Companion)
- Serve as onboarding material for new designers and developers
- Support the AIMS module design work with established patterns

### 1.2 Scope

This document covers the **Homepage** Figma file, which includes the platform shell (sidebar, header, navigation), all five engine landing pages, error states, and documentation pages. Product-specific internal screens (e.g., Ops dashboards, Chat conversations) are documented separately in their respective design files.

---

## 1A. Design System Codebase

The Flow Platform design system is implemented as a shared React component library published to GitHub Packages. This section documents the actual codebase that implements the Figma designs described in the rest of this document.

### 1A.1 Repository and Package

| Property | Value |
|----------|-------|
| **Repository** | [flow-core-design-system](https://github.com/CI-T-HyperX/flow-core-design-system) |
| **NPM Package** | `@ci-t-hyperx/flow-ds` |
| **Current Version** | v2.8.7 |
| **Distribution** | GitHub Packages (npm registry: `https://npm.pkg.github.com`) |
| **License** | Private (CI&T internal) |

### 1A.2 Technology Stack

| Layer | Technology | Version / Notes |
|-------|-----------|-----------------|
| **UI Framework** | React | 18.x |
| **Language** | TypeScript | Strict mode |
| **Styling** | Tailwind CSS | Utility-first, with custom theme extensions |
| **Primitives** | Radix UI | Accessible, unstyled primitives for Tooltip, Dialog, Popover, Select, etc. |
| **Component Patterns** | Shadcn/ui | Component architecture patterns adapted for Flow |
| **Variant Management** | CVA (class-variance-authority) | Type-safe variant definitions for components |
| **Documentation** | Storybook | 7.6.12 — interactive component playground and docs |
| **Testing** | Jest + Testing Library | Unit and interaction tests |
| **i18n** | `@ci-t-hyperx/i18n` | Localization for pt-BR and en-US |

### 1A.3 Architecture: Atomic Design

The codebase follows the Atomic Design methodology with three levels:

| Level | Count | Description |
|-------|-------|-------------|
| **Atoms** | 35 | Smallest reusable building blocks: Button, Badge, Avatar, Input, Label, Checkbox, etc. |
| **Molecules** | 14 | Composed atoms that form functional units: Banner, Chat, Form, Pagination, Search, Snackbar, etc. |
| **Organisms** | 3 | Complex, self-contained sections: Chat (advanced), Form (EditableList), Share (ShareContent + ShareDialog) |
| **Total** | **52** | Full component count across all levels |

### 1A.4 Utility Layer

Beyond components, the codebase provides:

- **`cn()` utility** — Tailwind class merging function (based on `clsx` + `tailwind-merge`)
- **CSS Custom Properties** — 250+ design tokens exported via `styles.css`
- **Custom Icons** — Flow-branded icons not available in Tabler Icons
- **i18n hooks** — Internationalization utilities for pt-BR and en-US

---

## 2. Layout System

### 2.1 Base Grid

The platform uses a fixed-width layout optimized for desktop:

| Property | Value |
|----------|-------|
| **Total width** | 1920px |
| **Left sidebar** | 76px (fixed) |
| **Main content area** | 1844px |
| **Layout approach** | Fixed sidebar + fluid content area |

The left sidebar is always visible and provides product-level navigation via icon-only buttons. The main content area contains the page header (with tenant/squad context selector) and a scrollable content region.

```
+--------+----------------------------------------------------+
|        |  Header (tenant selector, user avatar, welcome)    |
| 76px   +----------------------------------------------------+
| Side   |                                                    |
| bar    |  Scrollable Content Area (1844px)                  |
|        |                                                    |
| (nav   |  - Section cards                                   |
|  icons)|  - Engine cards                                    |
|        |  - Trending content                                |
|        |                                                    |
+--------+----------------------------------------------------+
```

### 2.2 Page Templates

The Homepage file contains the following page template categories:

| Template | Variants | Dimensions | Description |
|----------|----------|------------|-------------|
| **Homepage** | 10 | 1920 x 3127~3335 | Main landing with all engines, trending content, and CTAs |
| **Homepage / Steps** | 11 | ~1920 x 1405 | Steps engine landing (formerly "Refiner") |
| **Homepage / Chat** | 5 | ~1920 x 1409 | Chat engine landing with AI conversation features |
| **Homepage / Coders** | 3 | 1920 x 1405 | Coders engine landing with developer tools |
| **Homepage / Galaxy** | 3 | 1920 x 1405 | Galaxy (platform admin/org) landing |
| **Product Page** | 9 | varies | Generic product detail page ("Pagina de produto") |
| **Error Pages** | 4 | 1920 x 1080 | Error states: Erro 404, 405, 406, 407 |
| **Flow Docs** | 1 | varies | Documentation/help page |

### 2.3 Responsive Considerations

The current design targets **1920px desktop** as the primary breakpoint. No mobile or tablet variants are present in the Homepage file. Responsive behavior should be defined in a future iteration.

---

## 3. Five Product Engines

The Flow Platform is organized around five distinct "engines," each with a dedicated icon, color treatment, and section on the homepage. The engine model is central to the platform's information architecture.

| Engine | Icon Name | Purpose | Description |
|--------|-----------|---------|-------------|
| **Chat** | `message` | AI conversation / agents | Conversational AI interface for interacting with LLM-powered agents |
| **Steps** | `layout-cards` | Workflow automation | Workflow builder for process refinement (formerly called "Refiner") |
| **Ops** | `chart-bar` | Productivity dashboards | Analytics for team productivity, quality, lead time, and AI usage |
| **Coders** | `terminal-flow` | Code tools | Developer-focused tools: code completion, code chat, code review |
| **Companion** | `layout-sidebar-right` | Side assistant | Context-aware AI assistant embedded as a sidebar in other engines |

### 3.1 Engine Card Pattern

Each engine is presented on the homepage as a **Product Card** component containing:
- Engine icon (from the icon set above)
- Engine name
- Brief description
- CTA button or link
- Visual indicator of engine status (active, coming soon, etc.)

---

## 4. Component Catalog

This section enumerates the reusable components identified in the Figma file, organized by function. Instance counts reflect usage across all 54+ screens. The **Codebase** column indicates the implementation status in `flow-core-design-system` (`@ci-t-hyperx/flow-ds` v2.8.7).

### 4.1 Core Components

These are the foundational building blocks used across all engines and pages.

| Component | Instances | Codebase | Description |
|-----------|-----------|----------|-------------|
| **Badge** | 355 | Atom — `Badge` | Most-used component. Used for status labels, notification counters, category markers, and data display tags. Versatile component with multiple size and color variants. |
| **Icon Container** | 342 | Atom — `Icons` + `cn()` utility | Standardized wrapper for icons. In the codebase, implemented via the `Icons` atom combined with Tailwind utility classes through `cn()` rather than a separate container component. |
| **Button / button** | 107 | Atom — `Button` (unified) | Primary action component. **Resolved in codebase**: unified as single `Button` atom with 12 variants (primary, secondary, brand, brand-ghost, error, primary-outline, secondary-outline, error-outline, brand-outline, primary-ghost, success, success-outline) and 2 sizes (large, medium). |
| **Avatar** | 38 | Atom — `Avatar` | User representation component. Default size: 40px. Used in headers, menus, comment threads, and team displays. |
| **Tag** | 17 | Atom — `Tag` | Categorization labels. Distinct from Badge in that Tags are user-assignable content categories (e.g., topics, skills). |
| **Tooltip** | 4 | Atom — `Tooltip` (Radix-based) | Informational overlay triggered on hover. Built on Radix UI `Tooltip` primitive for accessibility. |
| **Loading** | 3 | Atom — `Loading` + `Skeleton` + `SkeletonWrapper` + `ShimmerText` | Loading state feedback. **Expanded in codebase**: four related components covering spinner, skeleton placeholders, skeleton wrappers, and animated shimmer text effects. |

> **Note:** The `Badge` and `Icon Container` components together account for nearly 45% of all component instances, underscoring their role as the atomic building blocks of the system.

### 4.1.1 Atoms, Molecules e Organisms adicionais no codebase

Além dos componentes identificados no Figma Homepage, o `flow-core-design-system` v2.8.7 contém 24 atoms, 14 molecules e 3 organisms não mapeados no arquivo Homepage — incluindo Accordion, AiButton, Dialog, Sheet, Table, Snackbar, Banner, Chat (advanced), entre outros.

> Inventário completo com descrições, status e prioridade de backport para o Figma: ver [`component-inventory.md`](component-inventory.md).

### 4.2 Navigation Components

Components that form the platform shell and navigation structure.

| Component | Codebase | Description |
|-----------|----------|-------------|
| **Side menu** | Product-specific (not in DS) | Left sidebar navigation (76px fixed width). Contains engine icons and platform-level actions. Always visible. |
| **Nav container** | Atom — `NavigationMenu` | Horizontal navigation bar container. Groups navigation items within a page section. Codebase uses Radix-based `NavigationMenu`. |
| **.nav container item** | Part of `NavigationMenu` | Individual item within a Nav container. Internal component (dot-prefix naming). |
| **Portal menu item** | Atom — `NavigationMenu` item | Portal-level menu entry. Used for top-level platform navigation. |
| **Menu item** | Atom — `Dropdown` item | Generic menu entry. Used in dropdown menus and context menus. |
| **Avatar menu** | Composed: `Avatar` + `Dropdown` | User dropdown menu triggered by clicking the Avatar in the header. Contains profile, settings, and logout actions. |
| **Header** | Product-specific (not in DS) | Page-level header. Contains welcome message, tenant selector, squad/team selector, and user Avatar menu. Consistent across all pages. |

### 4.3 Input Components

Components for user data entry and selection.

| Component | Instances | Codebase | Description |
|-----------|-----------|----------|-------------|
| **.Chat input** | 3 | Organism — `Chat` | Specialized text input for the Chat engine. In the codebase, part of the `Chat` organism (atoms/Chat + organisms/Chat) which includes send button, attachments, and streaming support. |
| **Dropdown menu** | 6 | Atom — `Dropdown` + Molecule — `DropdownSearchable` | Selection dropdown. The codebase provides both a basic `Dropdown` atom and a `DropdownSearchable` molecule with filtering. |

> **Additional input components in codebase:** `Input`, `TextArea`, `Checkbox`, `Radio`, `Switch`, `Select`, `Slider` — all implemented as atoms. See section 4.1.1.

### 4.4 Feedback Components

Components that communicate system state to the user.

| Component | Instances | Codebase | Description |
|-----------|-----------|----------|-------------|
| **Loading** | 3 | Atom — `Loading` + `Skeleton` + `SkeletonWrapper` + `ShimmerText` | Spinner or skeleton state for loading feedback. Codebase provides four related components for comprehensive loading states. |
| **Badge** (notification variant) | — | Atom — `Badge` | Badge component reused as notification counter on icons and menu items. |

> **Additional feedback components in codebase:** `Banner` (molecule), `Snackbar` (molecule) — for toast notifications and alert banners.

### 4.5 Product-Specific Components

Components tied to specific engines or features rather than the shared platform shell.

| Component | Instances | Codebase | Description |
|-----------|-----------|----------|-------------|
| **Product Card** | — | Atom — `Card` + `CardButton` | Card component showcasing an engine/product. The codebase provides generic `Card` and `CardButton` atoms that serve as the base for this pattern. |
| **CTA Card** | — | Atom — `Card` + `CardButton` | Call-to-action card. Larger visual card prompting user action. Built on generic `Card` atom in codebase. |
| **Maturidade** | 8 | Not in design system (product-specific) | Maturity assessment component. Displays a maturity score or level. Used in Ops and AIMS contexts. Implemented directly in product code, not in the shared design system. |
| **Steps Studio** | — | Not in design system (product-specific) | Steps-specific UI component for the workflow builder interface. Implemented directly in the Steps product code. |

---

## 5. Icon System

### 5.1 Naming Convention

All icons follow **lowercase kebab-case** naming (e.g., `terminal-flow`, `chart-bar`, `arrow-up-right`). This convention must be maintained for consistency across the codebase and design files.

### 5.2 Sizes

Icons are rendered at four standard sizes, always wrapped in an **Icon Container** component:

| Size | Usage |
|------|-------|
| **14px** | Inline text icons, compact UI elements |
| **16px** | Default size for body-level icons, badges, tags |
| **20px** | Medium emphasis icons, card elements, buttons |
| **24px** | High emphasis icons, sidebar navigation, section headers |

### 5.3 Icon Inventory

#### Product Engine Icons

| Icon | Engine | Usage |
|------|--------|-------|
| `message` | Chat | Conversation/agent interface |
| `layout-cards` | Steps | Workflow/cards interface |
| `chart-bar` | Ops | Charts/dashboards |
| `terminal-flow` | Coders | Terminal/code tools |
| `layout-sidebar-right` | Companion | Sidebar assistant |

#### Action Icons

| Icon | Count | Usage |
|------|-------|-------|
| `arrow-up-right` | 98 | External link / open in new tab. Most-used action icon. |
| `arrow-bar-to-right` | 15 | Navigation / expand action |
| `thumb-up` | — | Positive feedback / approval |

#### Feature Icons

| Icon | Usage |
|------|-------|
| `flask` | Labs / experimental features |
| `news` | News / announcements |
| `lifebuoy` | Help / support |
| `book-2` | Documentation / Flow Docs |
| `source-code` | Source code / repositories |
| `bulb` | Ideas / suggestions |

#### Third-Party Icons

| Icon | Usage |
|------|-------|
| `brand-openai` | OpenAI integration indicator |

### 5.4 Icon Library — Confirmed: Tabler Icons

The icon library is confirmed as **[Tabler Icons](https://tabler.io/icons)** via the `react-icons/tb` package (e.g., `TbArrowUpRight`, `TbLayoutCards`, `TbLifebuoy`). All standard icons referenced in Figma are available through this library.

### 5.5 Custom Flow Icons

O codebase inclui ícones Flow-branded não disponíveis no Tabler: 6 variações do logo Flow (mono e colorful), 1 ícone utilitário (`User`) e 4 ícones de fontes de integração (AzureStorage, Confluence, GoogleDrive, Plug). Todos são importados do atom `Icons`.

> Inventário completo com descrições: ver [`component-inventory.md`](component-inventory.md).

---

## 6. Naming Conventions

Consistent naming is critical for designer-developer handoff. The following conventions are observed in the Figma file:

### 6.1 Screen Naming

| Pattern | Example | Usage |
|---------|---------|-------|
| `Homepage / [Engine]` | `Homepage / Chat` | Engine-specific landing pages |
| `Homepage / [Engine] / [Variant]` | `Homepage / Steps / Empty` | Variant states of engine pages |
| `Erro NNN` | `Erro 404` | Error pages (Portuguese naming) |
| `Pagina de produto` | — | Product detail page template (Portuguese) |

### 6.2 Component Naming

| Convention | Pattern | Example |
|------------|---------|---------|
| **Public components** | PascalCase or Title Case | `Badge`, `Button`, `Product Card` |
| **Internal components** | Dot prefix + lowercase | `.Chat input`, `.nav container item` |
| **Unnamed containers** | `Frame NNNNN` | `Frame 48291` |
| **Variant notation** | Component + `/` + variant | `Button / Primary`, `Badge / Small` |

### 6.3 Language Mix

The Figma file uses a **mixed-language approach**:

- **English**: UI labels, button text, component names, section headers
- **Portuguese**: Some screen names (`Erro NNN`, `Pagina de produto`), the `Maturidade` component, content placeholder text

> **Recommendation:** Standardize all component and screen names to English for international team alignment. Retain Portuguese only in user-facing content that targets Brazilian audiences.

---

## 7. Element Distribution

A quantitative breakdown of the element types across all 54+ screens in the Figma file:

| Element Type | Count | Notes |
|--------------|-------|-------|
| **Frames** (containers) | 4,380 | Auto-layout containers, sections, wrappers |
| **Text elements** | 2,105 | Labels, headings, body text, placeholders |
| **Component instances** | 1,569 | Reusable components from the design system |
| **Ellipses** | 56 | Decorative elements, avatars, status indicators |
| **Rounded rectangles** | 35 | Cards, buttons, input fields |
| **Vectors** | 23 | Custom graphics, illustrations |
| **Regular polygons** | 11 | Decorative shapes, indicators |
| **Lines** | 8 | Dividers, separators |

### 7.1 Key Ratios

- **Component reuse rate**: 1,569 instances across 54+ screens = ~29 component instances per screen
- **Text density**: 2,105 text elements = ~39 text elements per screen
- **Frame nesting**: 4,380 frames suggests deep nesting (average ~81 frames per screen), indicating heavy use of auto-layout

---

## 7A. Design Tokens (Codebase)

The `flow-core-design-system` codebase exports **250+ CSS custom properties** via `styles.css`. These tokens form the single source of truth for visual consistency between Figma and code.

### 7A.1 Color System

The color system uses numbered palettes (50-950) following the Tailwind convention:

| Palette | Range | Usage |
|---------|-------|-------|
| **Primary** | 50–950 | Core UI colors, text, backgrounds, borders |
| **Brand** | 50–900 | CI&T brand colors, accent elements, branding surfaces |
| **Destructive** | (semantic) | Error states, delete actions, danger alerts |
| **Success** | (semantic) | Success states, confirmation, positive indicators |
| **Warning** | (semantic) | Warning states, caution indicators |
| **Info** | (semantic) | Informational states, help indicators |
| **Flow-Indigo** | (semantic) | Flow-specific accent color |
| **Flow-Rose** | (semantic) | Flow-specific accent color |

Each color palette includes component-level tokens for specific states:

- **Hover** — `--color-primary-hover`, etc.
- **Focus** — Focus ring colors and outlines
- **Disabled** — Muted variants for disabled states
- **Error** — Error-specific color overrides
- **Success** — Success-specific color overrides
- **Loading** — Loading state color treatments

### 7A.2 Dark Mode

Dark mode is **implemented** using Tailwind's `dark:` class strategy. All components support dark mode via CSS custom property overrides that activate when the `dark` class is present on a parent element.

### 7A.3 Typography

| Property | Value |
|----------|-------|
| **Primary font** | Inter (variable) |
| **Font loading** | `@fontsource-variable/inter` |
| **Scale** | Follows Tailwind default type scale |

### 7A.4 Spacing and Shape

| Property | Value |
|----------|-------|
| **Border radius (default)** | `0.5rem` (8px) |
| **Spacing scale** | Tailwind default (4px base unit) |

### 7A.5 Animations

Custom animations defined in the Tailwind theme:

| Animation | Usage |
|-----------|-------|
| `accordion-down` / `accordion-up` | Accordion expand/collapse |
| `shimmer` | Loading shimmer effect (SkeletonWrapper, ShimmerText) |
| `thinking` | AI processing/thinking indicator |
| `bubble` | Chat message bubble entrance |

---

## 8. Design Patterns

### 8.1 Card-Based Sections

The homepage uses a consistent **Title + Card Grid** pattern for content sections:

```
+------------------------------------------+
|  Section Title              [See all ->] |
+------------------------------------------+
|  +--------+  +--------+  +--------+     |
|  | Card 1 |  | Card 2 |  | Card 3 |     |
|  |        |  |        |  |        |     |
|  +--------+  +--------+  +--------+     |
+------------------------------------------+
```

Observed instances:
- **FLOW Engines** — Grid of Product Cards for each engine
- **Trending Prompts** — Popular Chat prompts across the organization
- **Trending Dashboards** — Popular Ops dashboards
- **CTA Cards** — Promotional cards for features and onboarding

### 8.2 Badge as Universal Building Block

The `Badge` component (355 instances) is the single most reused element. It appears in:
- Status indicators (active, inactive, beta, coming soon)
- Notification counters on sidebar icons
- Data labels in dashboard previews
- Category tags on cards
- Version badges

This pattern suggests the Badge is intentionally designed as a **polymorphic component** with variants covering a wide range of use cases.

### 8.3 Consistent Sidebar Navigation

The 76px fixed sidebar is the most persistent UI element:
- Always visible on every page
- Contains only icons (no text labels)
- Engine icons are vertically stacked
- Active engine is highlighted
- Bottom of sidebar contains utility icons (help, settings, docs)

### 8.4 Tenant/Squad Context Selector

The header always contains a **context selector** for:
- **Tenant**: The organization/client context
- **Squad/Team**: The team within the tenant

This pattern ensures that all data displayed on any page is scoped to the correct organizational context. It is critical for multi-tenant environments where a user may belong to multiple tenants.

### 8.5 Welcome Message Pattern

The header includes a personalized welcome message (e.g., "Welcome back, [Name]") that provides a human touch and confirms the user's identity and context.

### 8.6 Error Page Pattern

Error pages (404-407) follow a consistent layout:
- Full viewport (1920 x 1080)
- Centered content with error illustration
- Error code and description
- CTA to return to homepage
- Portuguese naming convention (`Erro NNN`)

---

## 9. Implementation Guidelines

### 9.1 Installation and Setup

To use the Flow Design System in a project:

```bash
# Configure GitHub Packages registry (one-time setup)
# Add to .npmrc: @ci-t-hyperx:registry=https://npm.pkg.github.com

# Install the package
npm install @ci-t-hyperx/flow-ds
```

### 9.2 Usage

```tsx
// Import components from the v2 namespace
import { Button } from '@ci-t-hyperx/flow-ds/v2'
import { Badge, Avatar, Card } from '@ci-t-hyperx/flow-ds/v2'

// Import required CSS (once, in your app entry point)
import '@ci-t-hyperx/flow-ds/styles.css'

// Example usage
function MyComponent() {
  return (
    <Button variant="primary" size="large">
      Click me
    </Button>
  )
}
```

### 9.3 Component Import Patterns

```tsx
// Atoms
import { Button, Badge, Input, Select } from '@ci-t-hyperx/flow-ds/v2'

// Icons (Tabler)
import { TbArrowUpRight, TbChartBar } from 'react-icons/tb'

// Custom Flow icons
import { Flow, FlowColorful, FlowLogo } from '@ci-t-hyperx/flow-ds/v2'

// i18n
import { useTranslation } from '@ci-t-hyperx/i18n'
```

### 9.4 For Developers

1. **Sidebar width is non-negotiable**: The 76px sidebar must remain fixed. Do not make it collapsible or resizable without a design decision.
2. **Use the Icons atom**: Never render icons without proper sizing. Use the `Icons` atom or Tailwind utility classes via `cn()` to ensure consistent sizing and spacing.
3. **Badge is your Swiss Army knife**: Before creating a new component for labels, status, or counters, check if `Badge` with an appropriate variant covers the use case.
4. **Respect the dot-prefix convention**: Components prefixed with `.` (e.g., `.Chat input`) are internal/private in Figma and should not be used outside their parent component's context.
5. **Icon library is Tabler Icons**: Use `react-icons/tb` for standard icons. Custom Flow icons are available from the `Icons` atom. Do not mix icon libraries.
6. **Use CVA for variants**: When extending components, use `class-variance-authority` (CVA) for type-safe variant management, consistent with the design system's approach.
7. **Tailwind for styling**: Use Tailwind utility classes. Avoid custom CSS unless absolutely necessary. Use the `cn()` utility for conditional class merging.
8. **Dark mode support**: All components support dark mode via the `dark:` class strategy. Test both modes when implementing new features.
9. **Import from v2**: Always import from `@ci-t-hyperx/flow-ds/v2` — the v2 namespace contains the current, unified component API.

### 9.5 For Designers

1. **Use existing components**: With 1,569 instances already in play, the component library is mature. Avoid creating one-off elements when a component exists.
2. **Follow the naming convention**: Public components in PascalCase, internal components with dot-prefix, icons in kebab-case.
3. **Maintain the screen naming hierarchy**: `Homepage / [Engine] / [State]` pattern for all new screens.
4. **Document new components**: When adding components to the Figma library, include description, usage guidelines, and variant documentation.
5. **Check the codebase first**: Before designing new components, check if they already exist in `flow-core-design-system`. See Section 4.1.1 for atoms not yet reflected in Figma.

---

## 10. Open Questions and Recommendations

### 10.1 Open Questions — Status Update

| # | Question | Status | Resolution |
|---|----------|--------|------------|
| 1 | **Button naming inconsistency** — Why do both `Button` and `button` exist? | **RESOLVED** | Unified as single `Button` atom in the codebase (v2). 12 variants and 2 sizes. Figma should be updated to match. |
| 2 | **Language standardization** — Should all Figma names be English? | **Partially resolved** | Codebase uses English throughout. i18n support for pt-BR/en-US via `@ci-t-hyperx/i18n`. Figma still has mixed-language names. |
| 3 | **Responsive strategy** — No mobile/tablet breakpoints exist. | **Open** | Tailwind responsive utilities (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) are available in the codebase but no formal breakpoint strategy has been defined for Figma. |
| 4 | **Dark mode** — Is there a dark mode variant planned? | **RESOLVED** | Dark mode is implemented in the codebase via Tailwind's `dark:` class strategy. All 250+ CSS custom properties have dark mode overrides. Figma dark mode variants may still need to be created. |
| 5 | **Design tokens** — Are values extracted as tokens for code? | **RESOLVED** | 250+ CSS custom properties exported via `styles.css`. Covers colors (Primary 50-950, Brand 50-900, semantic colors), typography (Inter variable), spacing, border radius (0.5rem), and animations. See Section 7A. |

### 10.2 Remaining Open Questions

1. **Figma-to-code sync**: How to keep Figma components in sync with the 52 codebase components? Several codebase atoms (Accordion, Dialog, Sheet, etc.) have no Figma counterpart yet.
2. **Responsive strategy**: Formal breakpoint definitions and responsive patterns for Figma.
3. **Dark mode in Figma**: Creating Figma dark mode variants to match the codebase implementation.
4. **Component versioning**: Strategy for versioning components between Figma library and npm package.

### 10.3 Recommendations

1. ~~**Unify Button naming**~~ — Resolved in codebase. Update Figma to match.
2. ~~**Extract design tokens**~~ — Resolved. 250+ CSS custom properties in `styles.css`.
3. **Add responsive breakpoints** for tablet (1024px) and mobile (375px) at minimum. Tailwind utilities are available but Figma patterns are needed.
4. **Eliminate unnamed Frames** (`Frame NNNNN`) by assigning semantic names to all containers.
5. **Create a component changelog** to track additions, modifications, and deprecations across versions.
6. **Align AIMS module design** with these established patterns from the start, extending rather than duplicating the component library.
7. **Backport codebase components to Figma** — 24 atoms, 14 molecules, and 3 organisms exist in code but not in the Figma Homepage file. Priority: Dialog, Input, Select, Table, Form, Sheet.
8. **Establish Code Connect** — Use Figma's Code Connect feature to link Figma components directly to their codebase implementations for seamless developer handoff.

---

## Appendix A: Component Instance Frequency

Top components by usage count:

| Rank | Component | Instances |
|------|-----------|-----------|
| 1 | Badge | 355 |
| 2 | Icon Container | 342 |
| 3 | Button / button | 107 |
| 4 | Avatar | 38 |
| 5 | Tag | 17 |
| 6 | Maturidade | 8 |
| 7 | Dropdown menu | 6 |
| 8 | Tooltip | 4 |
| 9 | Loading | 3 |
| 10 | .Chat input | 3 |

---

## Appendix B: Figma File Reference

| Property | Value |
|----------|-------|
| **File Name** | Homepage |
| **File Key** | `CEy4t56KAFnPtirjzY3Emg` |
| **Version** | v0.7.6 |
| **Total Screens** | 54+ |
| **Total Component Instances** | 1,569 |
| **Total Elements** | ~8,200 |
| **Figma URL** | `https://figma.com/design/CEy4t56KAFnPtirjzY3Emg/Homepage` |
