import { Router } from 'express';
import { db } from '../../db/index.js';
import { projects } from '../../db/schema.js';
import { desc, eq } from 'drizzle-orm';
import { authenticate, requireRole } from '../middleware/auth.js';
import { v4 as uuidv4 } from 'uuid';
import { createInsertSchema } from 'drizzle-zod';
import { validate } from '../middleware/validate.js';
import { logAction } from '../services/audit.js';

const router = Router();
const insertSchema = createInsertSchema(projects as any).partial({ id: true, createdAt: true, updatedAt: true });

// Get all projects
router.get('/', async (req, res, next) => {
  try {
    const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt));
    res.json({ success: true, data: allProjects });
  } catch (error) {
    next(error);
  }
});

// Get project by slug
router.get('/:slug', async (req, res, next) => {
  try {
    const project = await db.select().from(projects).where(eq(projects.slug, req.params.slug)).limit(1);
    if (project.length === 0) {
      return res.status(404).json({ success: false, error: { message: 'Project not found' } });
    }
    res.json({ success: true, data: project[0] });
  } catch (error) {
    next(error);
  }
});

// Create project (Admin only)
router.post('/', authenticate, requireRole(['Super Admin']), validate(insertSchema), async (req: any, res: any, next: any) => {
  try {
    const id = req.body.id || uuidv4();
    const payload = { ...req.body, id };
    const newProject = await db.insert(projects).values(payload).returning();
    
    await logAction(req.user.id, 'CREATE', 'Project', id, undefined, req.ip);
    
    res.status(201).json({ success: true, data: newProject[0] });
  } catch (error) {
    next(error);
  }
});

// Update project (Admin only)
router.put('/:id', authenticate, requireRole(['Super Admin']), validate(insertSchema.partial()), async (req: any, res: any, next: any) => {
  try {
    const data = await db.update(projects).set(req.body).where(eq(projects.id, req.params.id)).returning();
    if (data.length === 0) {
      return res.status(404).json({ success: false, error: { message: 'Project not found' } });
    }
    
    await logAction(req.user.id, 'UPDATE', 'Project', req.params.id, undefined, req.ip);
    
    res.json({ success: true, data: data[0] });
  } catch (error) {
    next(error);
  }
});

// Delete project (Admin only)
router.delete('/:id', authenticate, requireRole(['Super Admin']), async (req: any, res: any, next: any) => {
  try {
    const data = await db.delete(projects).where(eq(projects.id, req.params.id)).returning();
    if (data.length === 0) {
      return res.status(404).json({ success: false, error: { message: 'Project not found' } });
    }
    
    await logAction(req.user.id, 'DELETE', 'Project', req.params.id, undefined, req.ip);
    
    res.json({ success: true, data: data[0] });
  } catch (error) {
    next(error);
  }
});

export default router;