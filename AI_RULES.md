# AI Development Rules & Tech Stack Guidelines

This document outlines the architecture, tech stack, and development rules for the Dipon Group Enterprise Digital Platform. All AI agents and developers must strictly adhere to these guidelines.

## Tech Stack Overview

* **Frontend Framework:** React 19 (Single Page Application) with TypeScript.
* **Routing:** React Router DOM v7 for client-side routing (configured in `src/App.tsx`).
* **Backend Server:** Express.js running on Node.js, serving as both the API layer and the static file server in production.
* **Database & ORM:** PostgreSQL database accessed via Drizzle ORM with the `pg` driver.
* **Styling:** Tailwind CSS v4 utilizing modern CSS-first configuration and custom theme variables.
* **Animations:** Motion (formerly Framer Motion) for smooth, high-performance UI transitions.
* **Icons:** Lucide React for a consistent, modern iconography set.
* **Authentication:** JWT-based stateless authentication with bcryptjs for password hashing.
* **Validation:** Zod and `drizzle-zod` for robust schema validation on both client and server.

---

## Library Usage & Development Rules

### 1. Frontend & UI Components
* **Styling:** Always use Tailwind CSS utility classes. Custom theme variables (e.g., `var(--color-primary-navy)`) are defined in `src/index.css` and should be used for brand consistency.
* **Icons:** Use `lucide-react` exclusively. Do not install or import other icon libraries.
* **Animations:** Use the `motion` package for page transitions, hover states, and modal entries. Keep animations subtle and professional.
* **Component Structure:** Keep components small, focused, and under 100 lines of code where possible. Create new files in `src/components/` rather than bloating existing ones.

### 2. Backend & API Development
* **Routing:** All API endpoints must be prefixed with `/api/v1` and defined under `src/server/routes/`.
* **Database Queries:** Always use Drizzle ORM (`db`) for database operations. Do not write raw SQL queries unless absolutely necessary for performance.
* **Validation:** Validate all incoming request bodies using Zod schemas. Use `createInsertSchema` from `drizzle-zod` to automatically generate schemas from Drizzle tables.
* **Error Handling:** Use the custom `APIError` class and let errors bubble up to the global `errorHandler` middleware. Avoid silent try/catch blocks.

### 3. Database & Migrations
* **Schema Definition:** All database tables must be defined in `src/db/schema.ts`.
* **Migrations:** Use `drizzle-kit` to generate and run migrations. Do not modify SQL migration files manually.

### 4. Authentication & Security
* **Route Protection:** Protect admin routes on the frontend using the `<RequireAuth>` component, and on the backend using the `authenticate` middleware.
* **Rate Limiting:** Apply `apiLimiter` to general API routes and `authLimiter` to authentication endpoints to prevent abuse.