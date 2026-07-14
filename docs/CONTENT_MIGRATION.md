# Content Migration Plan

This document outlines the strategy, schema mapping, and initial content seed data for migrating Dipon Group's corporate assets to the new Enterprise Digital Platform.

---

## 1. Migration Strategy

The migration process is divided into three phases:
1. **Schema Alignment:** Ensuring all legacy content fields map directly to the Drizzle ORM schema defined in `src/db/schema.ts`.
2. **Initial Seeding:** Populating the database with core corporate data (Divisions, Global Offices, Leadership, and Key Projects) via the seed script.
3. **CMS Content Entry:** Utilizing the Admin Portal for dynamic content updates, news articles, and media uploads.

---

## 2. Core Content Mapping

### 2.1 Business Divisions
Dipon Group operates across four primary divisions. These must be seeded initially to allow projects to link to them.

| Division Name | Slug | Key Focus Areas |
| :--- | :--- | :--- |
| **Engineering & Construction** | `engineering` | EPC pipelines, power plants, refineries, terminals, and mega industrial works. |
| **IT & ITES** | `it` | Identity solutions, trust services, smart cards, and data centers. |
| **Shipping & Logistics** | `shipping` | Marine logistics, salvage operations, and heavy equipment leasing. |
| **Investment & Development** | `investment` | Infrastructure project development and strategic long-term investments. |

### 2.2 Global Offices
Dipon Group's global footprint spans multiple countries.

| Office Name | Country | Address | Type |
| :--- | :--- | :--- | :--- |
| **Dhaka HQ** | Bangladesh | Dipon Centre, Plot 4, Block C, Gulshan-1, Dhaka 1212 | Headquarter |
| **New Delhi Office** | India | 42, Community Centre, Saket, New Delhi 110017 | Regional |
| **Kuala Lumpur Office** | Malaysia | Level 15, Menara Binjai, No. 2 Jalan Binjai, 50450 KL | Regional |
| **Singapore Office** | Singapore | 10 Anson Road, #26-04 International Plaza, Singapore 079903 | Regional |
| **Dubai Office** | UAE | Office 702, Onyx Tower 1, The Greens, Dubai | Regional |

---

## 3. Seed Data Payload

To ensure the platform is fully functional and visually complete upon initial deployment, the `seed.ts` script will be expanded to include the following initial records:

### 3.1 Divisions Seed
```typescript
const divisionsData = [
  {
    id: "div-engineering",
    slug: "engineering",
    title: "Engineering & Construction",
    description: "Executing sizeable projects on EPC basis in Oil and Gas Sector, Power Plant, Process Plant, Refinery, Tank & Terminal and Mega Industrial Works.",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=2835&auto=format&fit=crop",
    overview: "Since 1970, Dipon Group has been a pioneer in pipeline construction and heavy engineering. We deliver complex infrastructure projects with international scale and technical precision."
  },
  {
    id: "div-it",
    slug: "it",
    title: "IT & ITES",
    description: "Providing end to end solutions in IT sector including e-signatures, Trust Services, Digital Certificates, Smart Cards, and Datacenter Installation.",
    heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2834&auto=format&fit=crop",
    overview: "Our IT division drives digital transformation across governments and enterprises, specializing in secure identity management, national PKI infrastructure, and state-of-the-art data centers."
  },
  {
    id: "div-shipping",
    slug: "shipping",
    title: "Shipping & Logistics",
    description: "Providing logistics services including equipment leasing, salvage operations, and shipping of bulk construction materials.",
    heroImage: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2940&auto=format&fit=crop",
    overview: "With a robust fleet of marine vessels and heavy logistics equipment, we support major offshore and coastal infrastructure projects across South Asia and the Middle East."
  },
  {
    id: "div-investment",
    slug: "investment",
    title: "Investment & Project Development",
    description: "Investing in project development and management of infrastructure projects in Power, Oil and Gas, Shipping and IT sectors.",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop",
    overview: "We actively invest in and develop high-impact infrastructure projects, partnering with global financial institutions and governments to deliver sustainable value."
  }
];
```

### 3.2 Projects Seed
```typescript
const projectsData = [
  {
    id: "proj-bibiyana",
    slug: "bibiyana-gas-plant",
    title: "Bibiyana Gas Processing Plant",
    shortDescription: "EPC pipeline and facility construction for Chevron's major gas field.",
    overview: "Dipon Group successfully executed the mechanical, piping, and structural works for the Bibiyana Gas Expansion Project, ensuring adherence to world-class safety and quality standards.",
    divisionId: "div-engineering",
    status: "published",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "proj-national-id",
    slug: "national-id-guinea",
    title: "National ID and Population Management",
    shortDescription: "End-to-end digital identity solution for the Republic of Guinea.",
    overview: "A landmark IT project delivering secure biometric enrollment, national registry database, and smart card issuance for millions of citizens.",
    divisionId: "div-it",
    status: "published",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
  }
];
```

---

## 4. Media Asset Migration

All media assets (images, PDFs, brochures) must be organized in the Media Library under logical folders:
* `/divisions` - Hero images and icons for business units.
* `/projects` - Project thumbnails and gallery images.
* `/leadership` - Executive portraits.
* `/downloads` - Corporate brochures, financial reports, and certificates.