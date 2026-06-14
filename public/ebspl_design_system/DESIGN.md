---
name: EBSPL Design System
colors:
  surface: '#f1fbff'
  surface-dim: '#d1dce0'
  surface-bright: '#f1fbff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eaf5fa'
  surface-container: '#e4f0f4'
  surface-container-high: '#dfeaef'
  surface-container-highest: '#d9e4e9'
  on-surface: '#131d21'
  on-surface-variant: '#484551'
  inverse-surface: '#283236'
  inverse-on-surface: '#e7f3f7'
  outline: '#797583'
  outline-variant: '#cac4d3'
  surface-tint: '#644eaf'
  primary: '#2d0d76'
  on-primary: '#ffffff'
  primary-container: '#432b8c'
  on-primary-container: '#b09aff'
  inverse-primary: '#ccbdff'
  secondary: '#5644d0'
  on-secondary: '#ffffff'
  secondary-container: '#6f5fea'
  on-secondary-container: '#fffbff'
  tertiary: '#002f24'
  on-tertiary: '#ffffff'
  tertiary-container: '#004738'
  on-tertiary-container: '#19bf9a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e7deff'
  primary-fixed-dim: '#ccbdff'
  on-primary-fixed: '#1f005f'
  on-primary-fixed-variant: '#4c3595'
  secondary-fixed: '#e4dfff'
  secondary-fixed-dim: '#c6bfff'
  on-secondary-fixed: '#160066'
  on-secondary-fixed-variant: '#4029ba'
  tertiary-fixed: '#6dfad2'
  tertiary-fixed-dim: '#4bddb7'
  on-tertiary-fixed: '#002018'
  on-tertiary-fixed-variant: '#005140'
  background: '#f1fbff'
  on-background: '#131d21'
  surface-variant: '#d9e4e9'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-sm:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 24px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style
The brand personality of this design system is built upon four pillars: **Trust, Efficiency, Clarity, and Modernity.** As a cloud accounting platform, the interface must prioritize financial data integrity while reducing the cognitive load of complex bookkeeping tasks.

The visual style follows a **Corporate Modern** direction. It utilizes high-density information layouts balanced by generous whitespace and subtle tonal layering. The aesthetic is clean and structured, using deep purples to signify premium stability and sophisticated data visualization to transform numbers into actionable insights. Every element is designed to feel precise, reliable, and intentionally organized for professional accountants and business owners alike.

## Colors
The palette is anchored by "Deep Treasury Purple" (#432B8C), used for primary actions, navigation headers, and brand identification. This is complemented by "Professional Violet" (#6C5CE7) to provide depth in data visualization.

- **Primary & Secondary:** Used for high-level UI structure, primary buttons, and active states.
- **Surface & Background:** A "Clean Slate" white (#FFFFFF) is used for cards and content containers, set against a "Soft Ledger" gray (#F5F6FA) page background to provide subtle contrast.
- **Semantic Colors:** Critical for accounting, these are used for status badges. Success (Mint Green) for paid/balanced items, Warning (Amber) for pending tasks, and Error (Crimson) for overdue invoices.
- **Neutrals:** A range of cool grays is used for typography and borders to maintain a professional, low-fatigue environment.

## Typography
The typography system uses a dual-font approach to balance character with utility. 

**Manrope** is used for headlines, card titles, and dashboard summaries. Its modern, slightly geometric construction adds a contemporary feel to the brand. 

**Inter** is the workhorse for all body text, data tables, and input fields. It is selected for its exceptional legibility at small sizes and its neutral, systematic appearance, which is vital for reading long rows of financial figures. 

- **Numerical Alignment:** For tables, ensure tabular lining figures are used so that columns of numbers align vertically for easier comparison.
- **Hierarchy:** Use weight (Semi-bold vs. Regular) rather than just size to distinguish between labels and data.

## Layout & Spacing
This design system utilizes a **Fixed-Fluid Hybrid Grid**. The sidebar remains at a fixed width for consistent navigation access, while the main content area uses a 12-column fluid grid that adapts to the screen width.

- **Rhythm:** All spacing is based on a 4px baseline grid. 
- **Density:** The dashboard uses a "Medium Density" approach. Cards have 24px of internal padding to let financial data "breathe," but list items use a tighter 8-12px vertical padding to maximize information density in reports.
- **Grouping:** Related data points (e.g., an invoice number and its date) should be grouped with 4px spacing, while distinct sections within a card should be separated by 16px.

## Elevation & Depth
Depth in this design system is created through **Tonal Layering** and **Soft Ambient Shadows**. 

1.  **Level 0 (Base):** The main background (#F5F6FA) is the lowest layer.
2.  **Level 1 (Cards):** Pure white (#FFFFFF) surfaces used for the main content containers. These use a very soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.05)) to appear slightly raised.
3.  **Level 2 (Overlays):** Tooltips, dropdowns, and modals use a more pronounced shadow (0px 10px 30px rgba(0,0,0,0.12)) to ensure they sit clearly above the interactive surface.

Avoid heavy borders; instead, use 1px subtle strokes (#E1E4E8) only when elements of the same color (like a white search bar on a white card) need clear definition.

## Shapes
The shape language is consistently **Rounded**, evoking a sense of modern accessibility and "soft" professionalism. 

- **Cards & Modules:** Use a 1rem (16px) corner radius to create friendly, distinct containers for data.
- **Buttons & Inputs:** Use a 0.5rem (8px) radius to maintain a structural, clickable appearance.
- **Badges:** Status badges use a fully rounded (pill) style to distinguish them from interactive buttons.
- **Icons:** Should follow a "Soft Linear" style with 1.5pt strokes and rounded terminals to match the container geometry.

## Components

### Buttons
- **Primary:** Solid "Deep Treasury Purple" with white text.
- **Secondary:** Ghost style with a purple border and purple text.
- **Tertiary:** Text-only for low-priority actions like "View All" or "Cancel."
- **States:** Hover states should involve a 10% darken; active states a 20% darken.

### Data Tables
- **Header:** Light gray background (#F8F9FB) with uppercase, bold Inter labels at 11px.
- **Rows:** White background with a 1px bottom border. Hover state should trigger a subtle background change to #F5F6FA.
- **Cell Alignment:** Text is left-aligned; currency and dates are right-aligned for rapid visual scanning.

### Status Badges
- **Style:** Small, pill-shaped containers with a high-transparency background (10-15% opacity) of the semantic color and a fully opaque text label in the same hue.

### Input Fields
- **Default:** 1px border (#D1D5DB) with 8px padding.
- **Focus:** 2px border in "Professional Violet" with a soft outer glow.
- **Labels:** Always placed above the input, never as placeholder text only, to ensure accessibility and persistent context.

### Cards
- **Structure:** Cards should always include a Title Bar section if they contain lists or charts. Use "Headline-sm" for these titles.
- **Interactive Cards:** Cards that lead to a detail view (like summary metrics) should have a subtle scale-up or shadow-deepening effect on hover.