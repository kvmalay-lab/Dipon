import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error("FATAL: JWT_SECRET environment variable is not set in production.");
}

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    roleId: string;
    roleName: string;
    email: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, error: { message: 'Authentication required' } });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; roleId: string; roleName: string; email: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: { message: 'Invalid or expired token' } });
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.roleName)) {
      return res.status(403).json({ success: false, error: { message: 'Forbidden' } });
    }
    next();
  };
};