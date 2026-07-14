# Design System

This document defines the visual language, typography, color palette, and UI components for the Dipon Group Enterprise Digital Platform, ensuring a consistent, luxury minimalist, and editorial aesthetic.

---

## 1. Design Philosophy

The Dipon Group brand represents **Excellence, Trust, and Global Scale**. The design system reflects these values through:
* **Luxury Minimalism:** Generous whitespace, clean borders, and high-contrast typography.
* **Editorial Layouts:** Asymmetric grids, large display headings, and high-quality corporate photography.
* **Fluid Motion:** Subtle, high-performance transitions that guide the user's attention without distraction.

---

## 2. Color Palette

The color palette is defined as custom CSS variables in `src/index.css` and integrated into Tailwind CSS v4.

### 2.1 Brand Colors
* **Deep Navy (`#071A3D`):** The primary brand color, representing stability, authority, and corporate heritage. Used for headings, navigation, and dark sections.
* **Corporate Blue (`#0F4C81`):** A professional secondary blue used for supporting elements and secondary branding.
* **Electric Blue (`#0066FF`):** The accent color, representing innovation, technology, and forward-looking energy. Used for primary buttons, active states, and links.
* **Steel Gray (`#5E6B7A`):** A neutral cool gray used for body text, borders, and subtle backgrounds.

### 2.2 Status Colors
* **Success (`#16A34A`):** Used for successful actions, open job statuses, and positive notifications.
* **Warning (`#F59E0B`):** Used for pending items, unread messages, and alerts.
* **Danger (`#DC2626`):** Used for destructive actions, errors, and closed statuses.

---

## 3. Typography

We utilize two primary font families to establish a clear visual hierarchy:

* **Headings (Space Grotesk):** A modern, geometric sans-serif with subtle technical details. Used for all display headings (H1 to H6) to convey engineering precision.
* **Body (Inter):** A highly legible, neutral sans-serif optimized for screen readability. Used for all body copy, UI labels, and form inputs.

---

## 4. UI Components & Classes

Standardized UI components are styled using Tailwind utility classes and custom component classes:

### 4.1 Buttons
* **Primary Button (`.btn-primary`):** Rounded corners (`14px`), electric blue background, white text. Subtle hover lift and shadow.
* **Secondary Button (`.btn-secondary`):** Electric blue border, white background, electric blue text. Subtle hover background tint.

### 4.2 Cards
* **Standard Card (`.card`):** Rounded corners (`24px`), white background, subtle shadow. Smooth shadow transition on hover.

### 4.3 Form Inputs
* **Input Field (`.input-field`):** Rounded corners (`14px`), light gray border, white background. Focus state transitions to electric blue border with a subtle ring.