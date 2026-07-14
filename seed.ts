import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './src/db/schema.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function main() {
  console.log('Seeding database...');
  
  const isProduction = process.env.NODE_ENV === 'production';
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (isProduction && !adminPassword) {
    console.error('FATAL ERROR: ADMIN_PASSWORD environment variable must be set in production.');
    process.exit(1);
  }

  const passwordToUse = adminPassword || 'admin123';
  if (!adminPassword) {
    console.warn('WARNING: No ADMIN_PASSWORD environment variable set. Using default password "admin123".');
  }

  // Create admin role
  const roleId = uuidv4();
  await db.insert(schema.roles).values({
    id: roleId,
    name: 'Super Admin',
  }).onConflictDoNothing();

  // Create admin user
  const passwordHash = await bcrypt.hash(passwordToUse, 10);
  await db.insert(schema.users).values({
    id: uuidv4(),
    firstName: 'System',
    lastName: 'Administrator',
    email: 'admin@dipongroup.com',
    passwordHash,
    roleId: roleId,
  }).onConflictDoNothing();

  console.log('Database seeded successfully.');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});