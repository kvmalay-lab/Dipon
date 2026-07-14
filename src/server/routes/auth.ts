import { Router } from 'express';
import { db } from '../../db/index.js';
import { users, roles } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authLimiter } from '../middleware/security.js';

const router = Router();

if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error("FATAL: JWT_SECRET environment variable is not set in production.");
}

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev';

router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      return res.status(400).json({ success: false, error: { message: 'Email and password are required and must be strings' } });
    }

    const userList = await db
      .select({
        user: users,
        roleName: roles.name
      })
      .from(users)
      .leftJoin(roles, eq(users.roleId, roles.id))
      .where(eq(users.email, email))
      .limit(1);
    
    if (userList.length === 0) {
      return res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });
    }

    const { user, roleName } = userList[0];
    
    if (!user.passwordHash) {
      return res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isValid) {
      return res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });
    }

    const token = jwt.sign(
      { id: user.id, roleId: user.roleId, roleName: roleName || '', email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          roleId: user.roleId,
          roleName: roleName || '',
          avatar: user.avatar
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Login failed' } });
  }
});

export default router;