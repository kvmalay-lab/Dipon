import { Router } from 'express';
import { db } from '../../db/index.js';
import { projects } from '../../db/schema.js';
import { desc, eq } from 'drizzle-orm';
import { authenticate, requireRole } from '../middleware/auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt));
    res.json({ success: true, data: allProjects });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Failed to fetch projects' } });
  }
});

// Get project by slug
router.get('/:slug', async (req, res) => {
  try {
    const project = await db.select().from(projects).where(eq(projects.slug, req.params.slug)).limit(1);
    if (project.length === 0) {
      return res.status(404).json({ success: false, error: { message: 'Project not found' } });
    }
    res.json({ success: true, data: project[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Failed to fetch project' } });
  }
});

// Create project (Admin only)
router.post('/', authenticate, requireRole(['Super Admin']), async (req, res) => {
  try {
    const { title, slug, shortDescription, overview, divisionId, status, featured, heroImage, thumbnail } = req.body;
    const newProject = await db.insert(projects).values({
      id: uuidv4(),
      title, slug, shortDescription, overview, divisionId, status, featured, heroImage, thumbnail
    }).returning();
    res.json({ success: true, data: newProject[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Failed to create project' } });
  }
});

export default router;