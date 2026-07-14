# Database Schema Documentation

This document details the PostgreSQL database schema for the Dipon Group Enterprise Digital Platform, managed via Drizzle ORM.

---

## 1. Entity Relationship Overview

The database schema is designed to support a multi-sector conglomerate with robust content management, career tracking, and security auditing.

```
  [ divisions ] ───1:N─── [ projects ] ───1:N─── [ project_images ]
                                 
  [ careers ] ───1:N─── [ applications ]

  [ roles ] ───1:N─── [ users ] ───1:N─── [ audit_logs ]
```

---

## 2. Table Definitions

### 2.1 Core Content Tables

#### `divisions`
Stores the primary business units of Dipon Group.
* `id` (varchar, PK): Unique identifier (UUID).
* `slug` (varchar, Unique): URL-friendly identifier.
* `title` (varchar): Division name.
* `description` (text): Short summary.
* `hero_image` (text): URL to division hero banner.
* `overview` (text): Detailed division overview.

#### `projects`
Stores corporate projects, linked to divisions.
* `id` (varchar, PK): Unique identifier (UUID).
* `slug` (varchar, Unique): URL-friendly identifier.
* `title` (varchar): Project name.
* `short_description` (text): Brief summary.
* `overview` (text): Detailed project description.
* `division_id` (varchar, FK): Links to `divisions.id`.
* `status` (varchar): Publication status (`published`, `draft`).
* `featured` (boolean): Highlights project on homepage.
* `hero_image` (text): Main project banner.
* `thumbnail` (text): Portfolio grid image.

#### `project_images`
Stores additional gallery images for projects.
* `id` (varchar, PK): Unique identifier (UUID).
* `project_id` (varchar, FK): Links to `projects.id`.
* `image_url` (text): URL of the gallery image.
* `caption` (text): Optional image caption.
* `display_order` (integer): Sorting order.

---

### 2.2 Careers & Inquiries

#### `careers`
Stores open job postings.
* `id` (varchar, PK): Unique identifier (UUID).
* `title` (varchar): Job title.
* `department` (varchar): Department name.
* `location` (varchar): Job location.
* `employment_type` (varchar): e.g., Full-time, Contract.
* `experience` (varchar): Required experience.
* `description` (text): Job description and requirements.
* `status` (varchar): e.g., `open`, `closed`.

#### `applications`
Stores candidate job applications.
* `id` (varchar, PK): Unique identifier (UUID).
* `career_id` (varchar, FK): Links to `careers.id`.
* `name` (varchar): Candidate name.
* `email` (varchar): Candidate email.
* `phone` (varchar): Candidate phone number.
* `resume` (text): URL or text content of the resume.
* `status` (varchar): e.g., `received`, `reviewed`, `shortlisted`.

#### `contact_inquiries`
Stores messages submitted via the contact form.
* `id` (varchar, PK): Unique identifier (UUID).
* `department` (varchar): Target department.
* `name` (varchar): Sender name.
* `company` (varchar): Sender company.
* `email` (varchar): Sender email.
* `phone` (varchar): Sender phone.
* `subject` (varchar): Message subject.
* `message` (text): Message body.
* `status` (varchar): e.g., `new`, `read`, `archived`.

---

### 2.3 Security & Administration

#### `users`
Stores administrative users.
* `id` (varchar, PK): Unique identifier (UUID).
* `first_name` (varchar): User's first name.
* `last_name` (varchar): User's last name.
* `email` (varchar, Unique): User's email address.
* `password_hash` (varchar): Bcrypt hashed password.
* `role_id` (varchar, FK): Links to `roles.id`.
* `status` (varchar): e.g., `active`, `inactive`.

#### `audit_logs`
Tracks administrative actions for security compliance.
* `id` (varchar, PK): Unique identifier (UUID).
* `user_id` (varchar, FK): Performing user.
* `action` (varchar): e.g., `CREATE`, `UPDATE`, `DELETE`.
* `entity_type` (varchar): e.g., `Project`, `News`.
* `entity_id` (varchar): ID of the affected record.
* `details` (jsonb): Optional metadata about the change.
* `ip_address` (varchar): IP address of the user.