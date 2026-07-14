import { Router } from 'express';
import { db } from '../../db/index.js';
import * as schema from '../../db/schema.js';
import { desc, eq, sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import authRoutes from './auth.js';
import projectRoutes from './projects.js';
import uploadRoutes from './upload.js';
import { createCRUDRouter } from '../utils/crud.js';
import { apiLimiter } from '../middleware/security.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

// Apply rate limiting to all API routes
router.use(apiLimiter);

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/upload', uploadRoutes);

// Public Job Application Submission
router.post('/applications', async (req, res, next) => {
  try {
    const { careerId, name, email, phone, resume } = req.body;
    if (!careerId || !name || !email || !resume) {
      return res.status(400).json({ success: false, error: { message: 'Missing required fields' } });
    }
    const app = await db.insert(schema.applications).values({
      id: uuidv4(),
      careerId, name, email, phone, resume
    }).returning();
    res.json({ success: true, data: app[0], message: 'Application submitted successfully' });
  } catch (error) {
    next(error);
  }
});

// Generic CRUD Routes with appropriate security controls
router.use('/clients', createCRUDRouter(schema.clients, 'Client', 'name', false, ['Super Admin']));
router.use('/awards', createCRUDRouter(schema.awards, 'Award', 'title', false, ['Super Admin']));
router.use('/certifications', createCRUDRouter(schema.certifications, 'Certification', 'title', false, ['Super Admin']));
router.use('/offices', createCRUDRouter(schema.offices, 'Office', 'name', false, ['Super Admin']));
router.use('/countries', createCRUDRouter(schema.countries, 'Country', 'name', false, ['Super Admin']));
router.use('/industries', createCRUDRouter(schema.industries, 'Industry', 'name', false, ['Super Admin']));
router.use('/equipment', createCRUDRouter(schema.equipment, 'Equipment', 'name', false, ['Super Admin']));
router.use('/technologies', createCRUDRouter(schema.technologies, 'Technology', 'name', false, ['Super Admin']));
router.use('/downloads', createCRUDRouter(schema.downloads, 'Download', 'title', false, ['Super Admin']));
router.use('/media', createCRUDRouter(schema.media, 'Media', 'fileName', false, ['Super Admin']));
router.use('/seo', createCRUDRouter(schema.seo, 'SEO', 'path', false, ['Super Admin']));
router.use('/homepage', createCRUDRouter(schema.homepage, 'HomepageSection', 'sectionName', false, ['Super Admin']));
router.use('/tags', createCRUDRouter(schema.tags, 'Tag', 'name', false, ['Super Admin']));
router.use('/categories', createCRUDRouter(schema.categories, 'Category', 'name', false, ['Super Admin']));
router.use('/news', createCRUDRouter(schema.news, 'News', 'title', false, ['Super Admin']));
router.use('/careers', createCRUDRouter(schema.careers, 'Career', 'title', false, ['Super Admin']));
router.use('/leadership', createCRUDRouter(schema.leaders, 'Leader', 'name', false, ['Super Admin']));
router.use('/divisions', createCRUDRouter(schema.divisions, 'Division', 'title', false, ['Super Admin']));

// Sensitive CRUD Routes requiring authentication on read and Super Admin role on write
router.use('/settings', createCRUDRouter(schema.settings, 'Setting', 'key', true, ['Super Admin']));
router.use('/applications', createCRUDRouter(schema.applications, 'Application', 'name', true, ['Super Admin']));
router.use('/inquiries', createCRUDRouter(schema.contactInquiries, 'Inquiry', 'name', true, ['Super Admin']));
router.use('/users', createCRUDRouter(schema.users, 'User', 'email', true, ['Super Admin'], true));
router.use('/roles', createCRUDRouter(schema.roles, 'Role', 'name', true, ['Super Admin']));
router.use('/permissions', createCRUDRouter(schema.permissions, 'Permission', 'name', true, ['Super Admin']));

// Contact Inquiries (Public POST)
router.post('/contact', async (req, res, next) => {
  try {
    const { name, email, department, message, subject } = req.body;
    const inquiry = await db.insert(schema.contactInquiries).values({
      id: uuidv4(),
      name, email, department, message, subject
    }).returning();
    res.json({ success: true, data: inquiry[0], message: 'Inquiry submitted successfully' });
  } catch (error) {
    next(error);
  }
});

// Admin Dashboard stats
router.get('/admin/stats', authenticate, async (req, res, next) => {
  try {
    const [{ count: projectsCount }] = await db.select({ count: sql`count(*)` }).from(schema.projects);
    const [{ count: newsCount }] = await db.select({ count: sql`count(*)` }).from(schema.news);
    const [{ count: jobsCount }] = await db.select({ count: sql`count(*)` }).from(schema.careers).where(eq(schema.careers.status, 'open'));
    const [{ count: inquiriesCount }] = await db.select({ count: sql`count(*)` }).from(schema.contactInquiries).where(eq(schema.contactInquiries.status, 'new'));
    
    res.json({ 
      success: true, 
      data: {
        projects: Number(projectsCount),
        publishedNews: Number(newsCount),
        openJobs: Number(jobsCount),
        unreadMessages: Number(inquiriesCount)
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;