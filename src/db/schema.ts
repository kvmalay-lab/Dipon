import { pgTable, serial, text, varchar, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  firstName: varchar('first_name', { length: 256 }).notNull(),
  lastName: varchar('last_name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 256 }),
  phone: varchar('phone', { length: 256 }),
  avatar: text('avatar'),
  roleId: varchar('role_id', { length: 36 }).notNull(),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

export const roles = pgTable('roles', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
});

export const permissions = pgTable('permissions', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
});

export const rolePermissions = pgTable('role_permissions', {
  roleId: varchar('role_id', { length: 36 }).notNull(),
  permissionId: varchar('permission_id', { length: 36 }).notNull(),
});

export const projects = pgTable('projects', {
  id: varchar('id', { length: 36 }).primaryKey(),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
  title: varchar('title', { length: 256 }).notNull(),
  shortDescription: text('short_description'),
  overview: text('overview'),
  divisionId: varchar('division_id', { length: 36 }),
  status: varchar('status', { length: 50 }).default('published').notNull(),
  featured: boolean('featured').default(false).notNull(),
  heroImage: text('hero_image'),
  thumbnail: text('thumbnail'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  publishedAt: timestamp('published_at'),
});

export const projectImages = pgTable('project_images', {
  id: varchar('id', { length: 36 }).primaryKey(),
  projectId: varchar('project_id', { length: 36 }).notNull(),
  imageUrl: text('image_url').notNull(),
  caption: text('caption'),
  displayOrder: integer('display_order').default(0).notNull(),
  altText: text('alt_text'),
});

export const divisions = pgTable('divisions', {
  id: varchar('id', { length: 36 }).primaryKey(),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description'),
  heroImage: text('hero_image'),
  overview: text('overview'),
});

export const leaders = pgTable('leaders', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  designation: varchar('designation', { length: 256 }).notNull(),
  department: varchar('department', { length: 256 }),
  photo: text('photo'),
  biography: text('biography'),
  displayOrder: integer('display_order').default(0).notNull(),
  featured: boolean('featured').default(false).notNull(),
});

export const news = pgTable('news', {
  id: varchar('id', { length: 36 }).primaryKey(),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
  title: varchar('title', { length: 256 }).notNull(),
  summary: text('summary'),
  content: text('content'),
  author: varchar('author', { length: 256 }),
  category: varchar('category', { length: 256 }),
  featuredImage: text('featured_image'),
  publishDate: timestamp('publish_date'),
  featured: boolean('featured').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const careers = pgTable('careers', {
  id: varchar('id', { length: 36 }).primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  department: varchar('department', { length: 256 }),
  location: varchar('location', { length: 256 }),
  employmentType: varchar('employment_type', { length: 100 }),
  experience: varchar('experience', { length: 100 }),
  description: text('description'),
  status: varchar('status', { length: 50 }).default('open').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const applications = pgTable('applications', {
  id: varchar('id', { length: 36 }).primaryKey(),
  careerId: varchar('career_id', { length: 36 }).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  phone: varchar('phone', { length: 256 }),
  resume: text('resume'),
  status: varchar('status', { length: 50 }).default('received').notNull(),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
});

export const contactInquiries = pgTable('contact_inquiries', {
  id: varchar('id', { length: 36 }).primaryKey(),
  department: varchar('department', { length: 256 }),
  name: varchar('name', { length: 256 }).notNull(),
  company: varchar('company', { length: 256 }),
  email: varchar('email', { length: 256 }).notNull(),
  phone: varchar('phone', { length: 256 }),
  subject: varchar('subject', { length: 256 }),
  message: text('message').notNull(),
  status: varchar('status', { length: 50 }).default('new').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const clients = pgTable('clients', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  logo: text('logo'),
  industry: varchar('industry', { length: 256 }),
  website: varchar('website', { length: 256 }),
  displayOrder: integer('display_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const awards = pgTable('awards', {
  id: varchar('id', { length: 36 }).primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  organization: varchar('organization', { length: 256 }).notNull(),
  year: integer('year').notNull(),
  description: text('description'),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const certifications = pgTable('certifications', {
  id: varchar('id', { length: 36 }).primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  issuer: varchar('issuer', { length: 256 }).notNull(),
  issueDate: timestamp('issue_date'),
  expiryDate: timestamp('expiry_date'),
  image: text('image'),
  description: text('description'),
});

export const offices = pgTable('offices', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  countryId: varchar('country_id', { length: 36 }),
  address: text('address').notNull(),
  phone: varchar('phone', { length: 256 }),
  email: varchar('email', { length: 256 }),
  isHeadquarter: boolean('is_headquarter').default(false).notNull(),
});

export const countries = pgTable('countries', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  code: varchar('code', { length: 10 }).notNull().unique(),
});

export const industries = pgTable('industries', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
  description: text('description'),
});

export const equipment = pgTable('equipment', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  category: varchar('category', { length: 256 }),
  quantity: integer('quantity').default(1).notNull(),
  specifications: text('specifications'),
});

export const technologies = pgTable('technologies', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description'),
  icon: text('icon'),
});

export const downloads = pgTable('downloads', {
  id: varchar('id', { length: 36 }).primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description'),
  fileUrl: text('file_url').notNull(),
  fileType: varchar('file_type', { length: 50 }),
  fileSize: varchar('file_size', { length: 50 }),
  isPublic: boolean('is_public').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const media = pgTable('media', {
  id: varchar('id', { length: 36 }).primaryKey(),
  fileName: varchar('file_name', { length: 256 }).notNull(),
  fileUrl: text('file_url').notNull(),
  mimeType: varchar('mime_type', { length: 100 }),
  size: integer('size'),
  folder: varchar('folder', { length: 256 }).default('/'),
  altText: text('alt_text'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const seo = pgTable('seo', {
  id: varchar('id', { length: 36 }).primaryKey(),
  path: varchar('path', { length: 256 }).notNull().unique(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description'),
  keywords: text('keywords'),
  ogImage: text('og_image'),
});

export const homepage = pgTable('homepage', {
  id: varchar('id', { length: 36 }).primaryKey(),
  sectionName: varchar('section_name', { length: 256 }).notNull().unique(),
  content: jsonb('content').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  displayOrder: integer('display_order').default(0).notNull(),
});

export const settings = pgTable('settings', {
  id: varchar('id', { length: 36 }).primaryKey(),
  key: varchar('key', { length: 256 }).notNull().unique(),
  value: text('value'),
  group: varchar('group', { length: 256 }),
});

export const auditLogs = pgTable('audit_logs', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }),
  action: varchar('action', { length: 256 }).notNull(),
  entityType: varchar('entity_type', { length: 256 }).notNull(),
  entityId: varchar('entity_id', { length: 36 }),
  details: jsonb('details'),
  ipAddress: varchar('ip_address', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const tags = pgTable('tags', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
});

export const categories = pgTable('categories', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
  description: text('description'),
});
