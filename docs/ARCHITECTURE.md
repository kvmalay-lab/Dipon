# Architecture Document

This document outlines the architectural design, directory structure, and data flow for the Dipon Group Enterprise Digital Platform.

---

## 1. Architectural Overview

The platform is built as a high-performance, secure Single Page Application (SPA) powered by React 19 on the frontend, backed by a robust Express.js server, and integrated with a PostgreSQL database via Drizzle ORM.

```
[ Browser (React 19 SPA) ]
           │
           ▼ (HTTPS / JSON)
[ Express.js API Layer (/api/v1) ]
           │
           ▼ (Drizzle ORM)
[ PostgreSQL Database ]
```

---

## 2. Layered Architecture

The backend follows a clean, layered architecture to ensure separation of concerns, maintainability, and testability:

1. **Routing Layer (`src/server/routes/`):** Defines API endpoints, applies rate limiters, and maps requests to controllers or generic CRUD handlers.
2. **Middleware Layer (`src/server/middleware/`):** Handles cross-cutting concerns such as authentication (JWT), input validation (Zod), security headers (Helmet), and global error handling.
3. **Database Layer (`src/db/`):** Defines the relational schema using Drizzle ORM and manages database connections.
4. **Audit & Logging Layer (`src/server/services/`):** Automatically records administrative actions for security compliance.

---

## 3. Directory Structure

```
├── docs/                  # Architecture, PRD, and Database documentation
├── src/
│   ├── components/        # Reusable UI components (Layout, SEO, etc.)
│   │   ├── admin/         # CMS-specific components (GenericCRUD)
│   │   └── layout/        # Global layout (Navbar, Footer)
│   ├── db/                # Database schema, migrations, and connection
│   ├── pages/             # Page components (Home, About, Projects, etc.)
│   │   └── admin/         # CMS pages (Dashboard, MediaLibrary, Login)
│   ├── server/            # Express.js backend
│   │   ├── middleware/    # Auth, validation, security, and error handlers
│   │   ├── routes/        # API route definitions
│   │   └── services/      # Audit logging and business logic
│   ├── App.tsx            # React router and application entry
│   ├── index.css          # Tailwind CSS v4 configuration and global styles
│   └── main.tsx           # React DOM mounting
├── server.ts              # Express server entry point
└── seed.ts                # Database seeding script
```

---

## 4. Key Architectural Decisions

### 4.1 React 19 & Tailwind CSS v4
* **Decision:** Utilize React 19 for modern component rendering and Tailwind CSS v4 for a CSS-first, high-performance styling system.
* **Benefit:** Eliminates runtime CSS overhead and ensures a highly responsive, luxury minimalist design.

### 4.2 Drizzle ORM
* **Decision:** Use Drizzle ORM instead of traditional heavy ORMs.
* **Benefit:** Provides type-safe SQL queries with zero overhead, matching the performance of raw SQL while retaining the developer experience of an ORM.

### 4.3 Generic CRUD Router
* **Decision:** Implement a reusable CRUD router generator (`src/server/utils/crud.ts`) for standard entities.
* **Benefit:** Drastically reduces boilerplate code, ensuring consistent validation, error handling, and audit logging across all administrative endpoints.