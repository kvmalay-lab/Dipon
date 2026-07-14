# Product Requirements Document (PRD)

## 1. Executive Summary
Dipon Group is a leading multinational conglomerate established in 1970, operating across critical sectors including Energy, Engineering, IT, Shipping, and Infrastructure. The objective of this project is to deliver a modern, high-performance, and secure Enterprise Digital Platform that showcases Dipon Group's global capabilities, manages corporate assets, and provides a robust Content Management System (CMS) for internal administrators.

---

## 2. Target Audience
* **Clients & Partners:** Global energy companies, government bodies, and infrastructure developers seeking engineering and IT solutions.
* **Job Seekers:** Professionals looking to join a multinational conglomerate.
* **Media & Public:** Journalists, industry analysts, and the general public seeking corporate news and announcements.
* **Internal Administrators:** Corporate communications and HR teams managing website content, job postings, and inquiries.

---

## 3. Functional Requirements

### 3.1 Public Website
* **Homepage:**
  * High-impact hero section with professional imagery/video.
  * Key trust statistics (Years of experience, completed projects, global footprint, equipment fleet).
  * Overview of the 4 business divisions.
  * Featured projects and latest news.
  * Call-to-action (CTA) for business inquiries.
* **About Us:**
  * Corporate history, philosophy, vision, and mission.
  * Interactive timeline of milestones since 1970.
* **Business Divisions:**
  * Dedicated landing page listing the 4 divisions.
  * Dynamic detail pages (`/divisions/:slug`) showcasing division-specific overview, key projects, and specialized equipment.
* **Project Portfolio:**
  * Filterable portfolio by division/category.
  * Rich detail pages (`/projects/:slug`) featuring project specifications, client details, location, and an image gallery.
* **Leadership:**
  * Profiles of the founder, board of directors, and executive leadership team.
* **Careers:**
  * Dynamic job board listing open positions.
  * Online application form allowing candidates to submit details and upload resumes.
* **Media Centre:**
  * Corporate news, press releases, and announcements.
  * Dynamic article detail pages (`/media/:slug`).
* **Contact Us:**
  * Global headquarters and regional office contact details.
  * Interactive map showing global office locations.
  * Secure contact form routing inquiries to specific departments (General, Business Development, HR, Media).

### 3.2 Content Management System (CMS)
* **Secure Authentication:** JWT-based login with Role-Based Access Control (RBAC).
* **Dashboard:** Overview of key metrics (total projects, open jobs, unread inquiries, recent activity).
* **Content Management (CRUD):**
  * Full management of Projects, News, Careers, Leadership, Clients, Awards, and Offices.
* **Media Library:**
  * Centralized repository for uploading, organizing, and deleting media assets.
  * Integration with Cloudinary for optimized image delivery.
* **SEO Manager:**
  * Ability to customize meta titles, descriptions, and keywords for every public route.
* **Audit Logging:**
  * Automatic tracking of all administrative actions (create, update, delete) with user details and timestamps.

---

## 4. Non-Functional Requirements

### 4.1 Performance & SEO
* **Fast Loading:** Optimized asset delivery, lazy loading of images, and minimal bundle size.
* **Dynamic SEO:** Server-side or dynamic client-side injection of meta tags to ensure search engine indexability.
* **Responsive Design:** Seamless user experience across mobile, tablet, and desktop devices.

### 4.2 Security
* **Stateless Auth:** Secure JWT storage and transmission.
* **Rate Limiting:** Protection against brute-force attacks on API and authentication endpoints.
* **Input Validation:** Robust schema validation using Zod on both client and server.
* **Security Headers:** Implementation of Helmet middleware to prevent common web vulnerabilities.

---

## 5. Definition of Done (DoD)
1. All public pages are fully responsive and match the luxury minimalist design system.
2. Dynamic detail pages (`/divisions/:slug`, `/projects/:slug`, `/media/:slug`) fetch and render data correctly from the database.
3. Career application form successfully saves submissions and handles resume uploads.
4. CMS portal is fully functional, secure, and restricted to authenticated administrators.
5. All database operations utilize Drizzle ORM.
6. Codebase passes TypeScript compilation without errors.