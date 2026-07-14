import { Router } from 'express';
import { db } from '../db/index.js';
import { contactInquiries, projects, news } from '../db/schema.js';
import { desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Projects
router.get('/projects', async (req, res) => {
  try {
    const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt));
    res.json({ success: true, data: allProjects });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Failed to fetch projects' } });
  }
});

// Contact Inquiries
router.post('/contact', async (req, res) => {
  try {
    const { name, email, department, message, subject } = req.body;
    const inquiry = await db.insert(contactInquiries).values({
      id: uuidv4(),
      name, email, department, message, subject
    }).returning();
    res.json({ success: true, data: inquiry[0], message: 'Inquiry submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Failed to submit inquiry' } });
  }
});

// Admin Dashboard stats
router.get('/admin/stats', async (req, res) => {
  try {
    // In a real app, count from DB
    res.json({ 
      success: true, 
      data: {
        projects: 260,
        publishedNews: 45,
        openJobs: 12,
        unreadMessages: 8
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Failed to fetch stats' } });
  }
});

export default router;
