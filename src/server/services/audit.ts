import { db } from '../../db/index.js';
import { auditLogs } from '../../db/schema.js';
import { v4 as uuidv4 } from 'uuid';

export const logAction = async (
  userId: string | undefined, 
  action: string, 
  entityType: string, 
  entityId?: string, 
  details?: any,
  ipAddress?: string
) => {
  try {
    await db.insert(auditLogs).values({
      id: uuidv4(),
      userId,
      action,
      entityType,
      entityId,
      details,
      ipAddress
    });
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
};
