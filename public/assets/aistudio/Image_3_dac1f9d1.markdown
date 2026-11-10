---
name: CertiCraft Credential System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#2f1500'
  on-tertiary-container: '#c76c00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-hero:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
  display-hero-mobile:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-credential-id:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-badge:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
  button-text:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The brand personality projects institutional trust, cryptographic integrity, and modern refinement. It bridges academic prestige with high-velocity SaaS efficiency. The interface balances high-density administrative workflows with celebration-worthy certificate outputs, evoking the gravity of an accredited degree combined with the crisp security of a financial verification platform.

The visual style blends **Corporate / Modern** precision with **Tactile / Verification-grade** details:
- Matte surfaces paired with micro-milled vector detailing.
- High-contrast verification cues inspired by secure currency and modern fintech passports.
- Subtle inner glows and crisp double-stroke borders on credential containers to establish verifiable authenticity without decorative clutter.

## Colors

The palette establishes an immediate perception of security, institutional validity, and cryptographic validation.

- **Primary (`#0F172A` - Deep Obsidian Navy):** Anchors headers, high-level navigation, primary buttons, and key framing elements. Delivers unyielding authority and legibility.
- **Secondary (`#0D9488` - Deep Emerald Teal):** Signifies live verification, digital signatures, valid issuer statuses, and cryptographic success states. Used for badge pills, verified seals, and primary confirmation cues.
- **Tertiary (`#D97706` - Warm Architectural Gold):** Reserved for honors, high distinction certifications, commemorative seals, ribbons, and premium tier indicators.
- **Neutral (`#64748B` - Slate Neutral):** Powers secondary type, subtle divider lines, table cell metadata, and structural outlines.

### Background & Surface Hierarchy
- `surface-base`: `#F8FAFC` (Cool Crisp Canvas)
- `surface-raised`: `#FFFFFF` (Pristine Card White)
- `surface-overlay`: `#F1F5F9` (Subtle Recessed Wells & Inputs)
- `surface-border`: `#E2E8F0` (Default Micro-Borders)
- `surface-border-subtle`: `#EDF2F7`

## Typography

The typographic hierarchy enforces immediate legibility and structured trust. 

- **Display & Headings (Manrope):** Geometric structure with humanized finishes creates commanding, modern headlines suited for institution titles and recipient names on credentials.
- **Body & Controls (Inter):** High x-height, neutral tone, and robust horizontal metrics ensure zero ambiguity in recipient verification, date stamps, and credential metadata.
- **Data & Verification Identifiers (JetBrains Mono):** Monospaced, tabular numbers applied exclusively to hash strings, credential IDs, validation timestamps, and blockchain record references to evoke tamper-proof authenticity.

## Layout & Spacing

The layout is built around a structured 12-column responsive fluid grid designed to accommodate credential designers, audit tables, and standalone digital certificate renders.

### Grid Breakpoints
- **Mobile (< 768px):** 4 columns, 16px (`1rem`) gutters, 16px (`1rem`) page margins. Floating bottom actions for single-handed credential distribution.
- **Tablet (768px - 1024px):** 8 columns, 24px (`1.5rem`) gutters, 24px (`1.5rem`) page margins.
- **Desktop (> 1024px):** 12 columns, 24px (`1.5rem`) gutters, 32px (`2rem`) outer page margins. Max content container is capped at 1440px to ensure preview canvas stability.

### Rhythm & Alignment
Spacing follows an intentional 4px base increment (`0.25rem`). Component clusters (e.g., verification badge next to recipient name) maintain tight `space-xs` and `space-sm` grouping, while discrete audit sections are separated by `space-lg` to prevent visual fatigue.

## Elevation & Depth

Visual depth is achieved through layered structural planes and razor-thin boundaries rather than heavy diffusion.

### Elevation Levels
- **Level 0 (Flat Canvas):** `#F8FAFC` base background; no shadows.
- **Level 1 (Default Data Surface):** `#FFFFFF` cards, lists, and preview containers. Border: `1px solid #E2E8F0`. Shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`.
- **Level 2 (Interactive & Hovered Modules):** Hovered certificate cards, dropdowns, and batch menus. Border: `1px solid #CBD5E1`. Shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
- **Level 3 (Certificate Preview Canvas / Modals):** Verified certificate viewport and active issuance modals. Shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.09), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.

### Verification Seal Depth
Credential badges, medals, and verification seals incorporate a dedicated micro-bevel: a `1px` inner white highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.6)`) and a subtle colored aura matching the status accent (`0 0 12px rgba(13, 148, 136, 0.15)` for teal; `0 0 12px rgba(217, 119, 6, 0.18)` for gold).

## Shapes

The geometric architecture relies on **Soft** geometry (`0.25rem` standard). This retains the architectural gravity, sharp precision, and official gravitas of secure legal instruments while remaining clean and modern.

- **Base Radius (`rounded` - 4px):** Applied to buttons, inputs, badge tags, and table cells.
- **Medium Radius (`rounded-lg` - 8px):** Applied to certificate containers, modals, preview framing cards, and notification panels.
- **Pill Shape (`rounded-full`):** Exclusively reserved for status chips (`VERIFIED`, `ISSUED`, `REVOKED`) and biometric/verification seal circular emblems.

## Components

### Buttons
- **Primary:** Obsidian Navy background (`#0F172A`), white text (`#FFFFFF`), `4px` radius, subtle transition (`all 150ms cubic-bezier(0.4, 0, 0.2, 1)`). Focus ring: `2px solid #0D9488` with a `2px` offset.
- **Secondary (Verified Action):** Deep Teal surface (`#0D9488`), white text, hover state scales background brightness by 10%.
- **Tertiary / Outline:** `#FFFFFF` fill with `1px solid #E2E8F0`, slate text (`#0F172A`), hover background `#F8FAFC`.

### Verification Chips & Status Badges
- Compact padding (`4px 10px`), uppercase `JetBrains Mono` or semi-bold `Inter` at `11px`.
- **Verified:** Background `#F0FDFA`, border `1px solid #99F6E4`, text `#0F766E`, prefixed with a solid verification checkmark icon.
- **Honors / Distinction:** Background `#FFFBEB`, border `1px solid #FDE68A`, text `#B45309`.
- **Revoked / Inactive:** Background `#FEF2F2`, border `1px solid #FECACA`, text `#B91C1C`.

### Input Fields & Controls
- Height: `40px` default (`36px` compact). Background: `#FFFFFF`. Border: `1px solid #CBD5E1`.
- Active focus state: Border color changes to `#0F172A` with a subtle box-shadow ring (`0 0 0 1px #0F172A`).
- Monospaced inputs for Certificate IDs and Cryptographic Hashes feature a subtle recessed background (`#F8FAFC`).

### Checkboxes & Radios
- Size: `16px x 16px` with `3px` radius for checkboxes; fully circular for radios.
- Unchecked: Border `1px solid #94A3B8`, background `#FFFFFF`.
- Checked: Background `#0F172A`, border `#0F172A`, displaying a crisp white micro-check.

### Certificate Presentation Cards
- Premium card containers featuring a dual-layer border: an outer `1px solid #E2E8F0` and an inner framing inset border `1px solid rgba(226, 232, 240, 0.6)`.
- Metadata footer embedded directly into the base with a subtle hairline divider (`#F1F5F9`), highlighting recipient name, credential ID, and issuer logo.

### Verification Seals & Crests
- Circular emblems (36px to 64px) rendered with an embossed double vector ring.
- Uses subtle metallic gradients for tertiary gold achievements (from `#F59E0B` to `#D97706`) and cryptographic teal for automated integrity seals (from `#14B8A6` to `#0D9488`).