import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../../db/index.js';
import { eq, desc, ilike } from 'drizzle-orm';
import { authenticate, requireRole } from '../middleware/auth.js';
import { v4 as uuidv4 } from 'uuid';
import { logAction } from '../services/audit.js';
import { validate } from '../middleware/validate.js';
import { createInsertSchema } from 'drizzle-zod';

export function createCRUDRouter(
  table: any, 
  entityName: string, 
  searchField?: string,
  requireAuthOnRead = false,
  allowedRolesOnWrite?: string[],
  preventSelfPrivilegeEscalation = false
) {
  const router = Router();
  const insertSchema = createInsertSchema(table).partial({ id: true, createdAt: true, updatedAt: true });

  // Read middleware
  const readMiddleware = requireAuthOnRead ? [authenticate] : [];

  // Write middleware
  const writeMiddleware = [authenticate];
  if (allowedRolesOnWrite) {
    writeMiddleware.push(requireRole(allowedRolesOnWrite));
  }

  router.get('/', ...readMiddleware, async (req, res, next) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = (page - 1) * limit;
      const search = req.query.search as string;

      let query = db.select().from(table);
      
      if (search && searchField && table[searchField]) {
        query = query.where(ilike(table[searchField], `%${search}%`)) as any;
      }
      
      if (table.createdAt) {
        query = query.orderBy(desc(table.createdAt)) as any;
      } else if (table.displayOrder) {
        query = query.orderBy(table.displayOrder) as any;
      }

      const data = await (query as any).limit(limit).offset(offset);
      res.json({ success: true, data, page, limit });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', ...readMiddleware, async (req, res, next) => {
    try {
      const data = await db.select().from(table).where(eq(table.id, req.params.id)).limit(1);
      if (data.length === 0) return res.status(404).json({ success: false, error: { message: 'Not found' } });
      res.json({ success: true, data: data[0] });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', ...writeMiddleware, validate(insertSchema), async (req: any, res: Response, next: NextFunction) => {
    try {
      const id = req.body.id || uuidv4();
      const payload = { ...req.body, id };
      const data = await db.insert(table).values(payload).returning();
      
      if (req.user) {
        await logAction(req.user.id, 'CREATE', entityName, id, undefined, req.ip);
      }
      
      res.status(201).json({ success: true, data: data[0] });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', ...writeMiddleware, validate(insertSchema.partial()), async (req: any, res: Response, next: NextFunction) => {
    try {
      // Prevent self-service privilege escalation
      if (preventSelfPrivilegeEscalation && req.user && req.params.id === req.user.id) {
        if (req.body.roleId !== undefined || req.body.status !== undefined) {
          return res.status(403).json({ 
            success: false, 
            error: { message: 'You cannot modify your own role or status.' } 
          });
        }
      }

      const data = await db.update(table).set(req.body).where(eq(table.id, req.params.id)).returning();
      if (data.length === 0) return res.status(404).json({ success: false, error: { message: 'Not found' } });
      
      if (req.user) {
        await logAction(req.user.id, 'UPDATE', entityName, req.params.id, undefined, req.ip);
      }

      res.json({ success: true, data: data[0] });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', ...writeMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
      const data = await db.delete(table).where(eq(table.id, req.params.id)).returning() as any;
      if (data.length === 0) return res.status(404).json({ success: false, error: { message: 'Not found' } });
      
      if (req.user) {
        await logAction(req.user.id, 'DELETE', entityName, req.params.id, undefined, req.ip);
      }

      res.json({ success: true, data: data[0] });
    } catch (err) {
      next(err);
    }
  });

  return router;
}