# Design System & UI Specification: Acharya's Kitchen Web App

> **Extracted from Stitch Project:** `projects/7850364895728007221`  
> **Theme Name:** Authentic Modernity ("The Modern Hearth")

---

## 1. Brand Concept & Aesthetic Vision

**The Modern Hearth**: Acharya's Kitchen bridges traditional culinary heritage with the efficiency of a high-end cloud kitchen. The brand voice is warm, expert, transparent, and grounded.

- **Visual Style:** Refined Minimalism featuring airy layouts, natural imagery, and paper-like warm neutrals.
- **Elevation & Contrast:** Soft ambient shadows with a 4% primary tint rather than stark drop shadows, combined with glassmorphism for scrolling headers.
- **Imagery:** High-definition, directional lighting on earthy pottery and rustic textures.

---

## 2. Color Palette & Tokens

| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `primary` | `#873415` | Terracotta — Main brand accent, CTA buttons, active state highlights |
| `primary-container` | `#a64b2a` | Hover states for primary buttons |
| `on-primary` | `#ffffff` | Text on primary containers |
| `secondary` | `#556343` | Sage Green — Organic tags, secondary borders, complementary accents |
| `secondary-container` | `#d5e5bd` | Badge backgrounds, secondary highlight pill backgrounds |
| `on-secondary-container` | `#596747` | Text inside sage green pill badges |
| `tertiary` | `#77401c` | Warm brown supporting accents |
| `tertiary-container` | `#945732` | Container backgrounds for tertiary elements |
| `background` / `surface` | `#fff8f5` | Cream Silk — Soft, papery main background color |
| `surface-container-low` | `#fbf2ed` | Linen tone for subtle cards and section backgrounds |
| `surface-container` | `#f5ece7` | Middle depth containers (e.g., Chef's quote background) |
| `surface-container-high` | `#efe6e2` | Footer and high-contrast section containers |
| `on-surface` | `#1e1b18` | Deep Charcoal — Primary body text and headings |
| `on-surface-variant` | `#56423c` | Muted body text and metadata |
| `outline` | `#89726b` | Primary borders and dividers |
| `outline-variant` | `#dcc1b8` | Subtitle borders and light card borders |
| `error` | `#ba1a1a` | Alert and error states |

---

## 3. Typography Hierarchy

### Google Fonts Required:
- **Serif (Display & Headings):** `EB Garamond` (Weights: 400, 500, 600, 700)
- **Sans-Serif (Body & UI):** `Plus Jakarta Sans` (Weights: 400, 500, 600, 700)

| Style Token | Font Family | Size / Line Height | Weight & Spacing | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `display-lg` | EB Garamond | 48px / 56px | 600 weight, `-0.02em` | Desktop Hero title |
| `display-lg-mobile` | EB Garamond | 36px / 44px | 600 weight, `-0.01em` | Mobile Hero title |
| `headline-lg` | EB Garamond | 32px / 40px | 500 weight | Section Headings |
| `headline-md` | EB Garamond | 24px / 32px | 500 weight | Card Titles, Dish Names, Subheaders |
| `body-lg` | Plus Jakarta Sans | 18px / 28px | 400 weight | Hero subtitle, lead paragraphs |
| `body-md` | Plus Jakarta Sans | 16px / 24px | 400 weight | General body text & dish descriptions |
| `label-lg` | Plus Jakarta Sans | 14px / 20px | 600 weight, `0.05em` | Button text, navigation links |
| `label-md` | Plus Jakarta Sans | 12px / 16px | 500 weight | Dish badges, metadata chips |

---

## 4. Layout, Spacing & Shapes

- **Max Container Width:** `1200px` (`max-w-container-max`)
- **Gutter Padding:** `24px` (`px-gutter`)
- **Section Vertical Gap:** `80px` (`py-section-gap`)
- **Border Radii:**
  - `DEFAULT`: `0.125rem` (2px)
  - `lg`: `0.25rem` (4px) — Buttons & Input fields
  - `xl`: `0.5rem` (8px) — Cards & Image containers
  - `full`: `9999px` — Badges & Pill buttons
- **Custom Shadows & Glassmorphism:**
  - `soft-shadow`: `box-shadow: 0 20px 25px -5px rgba(135, 52, 21, 0.04), 0 10px 10px -5px rgba(135, 52, 21, 0.02);`
  - `nav-glass`: `background-color: rgba(255, 248, 245, 0.8); backdrop-filter: blur(12px);`
  - `chef-note`: `border-left: 4px solid #873415;`

---

## 5. Screen Components Structure

1. **Top Navigation Bar (`Header`)**
   - Fixed positioning with `nav-glass` background
   - Brand logo & title: *Acharya's Kitchen* in EB Garamond `#873415`
   - Navigation links: *Home*, *Menu*, *About*, *Contact*
   - Actions: Search icon modal/input & "Order Now" button

2. **Hero Section**
   - Left column: Badge (`PREMIUM CLOUD KITCHEN`), Display title with italic accent line, lead description, and dual CTAs ("Order Now" & "View Full Menu").
   - Right column: High-end hero dish image rotated gently with shadow.

3. **How It Works Section**
   - Section heading with terracotta accent underline.
   - 3-step grid: *Browse Our Menu* -> *Expertly Crafted* -> *Safe Delivery* with round icon containers and micro-hover scaling.

4. **Trending Dishes (Asymmetric Bento Grid)**
   - Left main feature: Large card with Bestseller badge,dish title, price, description, and dietary tags (Vegan, Gluten-Free).
   - Right 2-row grid: Secondary featured dishes (e.g. *Lamb Rogan Josh*, *Handmade Garlic Naan*).
   - Interactive modal / drawer to view full details & add dishes to cart.

5. **Chef's Note & Customer Testimonials**
   - Left side: Chef Rajesh Acharya portrait, quote block with terracotta left border.
   - Right side: Customer reviews with star ratings and verified buyer tags.

6. **CTA Banner & Footer**
   - Terracotta background banner with high contrast white typography.
   - Multicolumn footer with operating hours, contact info, social links, and copyright metadata.

7. **Interactive Features (React App Enhancements)**
   - Interactive Category Filterable Menu (Curries, Tandoori & Breads, Rice & Biryanis, Desserts & Beverages).
   - Functional Slide-over Shopping Cart with item quantity controls, price calculation, and order modal checkout simulation.
