import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../src/db/schema.js';
import dotenv from 'dotenv';
import { sql } from 'drizzle-orm';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function cleanDatabase() {
  console.log('Connecting to database for cleaning image paths...');

  try {
    // 1. Clean divisions
    console.log('Cleaning divisions heroImage...');
    const divisions = await db.select().from(schema.divisions);
    for (const div of divisions) {
      if (div.heroImage && div.heroImage.startsWith('/')) {
        const cleanUrl = `https://www.dipongroup.com${div.heroImage}`;
        console.log(`Updating division ${div.slug} heroImage to: ${cleanUrl}`);
        await db.update(schema.divisions)
          .set({ heroImage: cleanUrl })
          .where(sql`id = ${div.id}`);
      }
    }

    // 2. Clean projects
    console.log('Cleaning projects images...');
    const projects = await db.select().from(schema.projects);
    for (const proj of projects) {
      const updates: any = {};
      if (proj.heroImage && proj.heroImage.startsWith('/')) {
        updates.heroImage = `https://www.dipongroup.com${proj.heroImage}`;
      }
      if (proj.thumbnail && proj.thumbnail.startsWith('/')) {
        updates.thumbnail = `https://www.dipongroup.com${proj.thumbnail}`;
      }
      if (Object.keys(updates).length > 0) {
        console.log(`Updating project ${proj.slug} image paths...`);
        await db.update(schema.projects)
          .set(updates)
          .where(sql`id = ${proj.id}`);
      }
    }

    // 3. Clean news
    console.log('Cleaning news featuredImage...');
    const newsArticles = await db.select().from(schema.news);
    for (const article of newsArticles) {
      if (article.featuredImage && article.featuredImage.startsWith('/')) {
        const cleanUrl = `https://www.dipongroup.com${article.featuredImage}`;
        console.log(`Updating news ${article.slug} featuredImage to: ${cleanUrl}`);
        await db.update(schema.news)
          .set({ featuredImage: cleanUrl })
          .where(sql`id = ${article.id}`);
      }
    }

    // 4. Clean clients
    console.log('Cleaning clients logos...');
    const clientsList = await db.select().from(schema.clients);
    for (const client of clientsList) {
      if (client.logo && client.logo.startsWith('/')) {
        const cleanUrl = `https://www.dipongroup.com${client.logo}`;
        console.log(`Updating client ${client.name} logo to: ${cleanUrl}`);
        await db.update(schema.clients)
          .set({ logo: cleanUrl })
          .where(sql`id = ${client.id}`);
      }
    }

    // 5. Clean awards
    console.log('Cleaning awards images...');
    const awardsList = await db.select().from(schema.awards);
    for (const award of awardsList) {
      if (award.image && award.image.startsWith('/')) {
        const cleanUrl = `https://www.dipongroup.com${award.image}`;
        console.log(`Updating award ${award.title} image to: ${cleanUrl}`);
        await db.update(schema.awards)
          .set({ image: cleanUrl })
          .where(sql`id = ${award.id}`);
      }
    }

    // 6. Force Update Leadership Photos from seed mappings
    console.log('Updating leadership photos from static mappings...');
    const leadersList = await db.select().from(schema.leaders);
    const photoMappings: Record<string, string> = {
      'Mahmud Hasan': '/assets/leadership/mahmud-hasan.png',
      'Rashed Mahmud': '/assets/leadership/rashed-mahmud.png',
      'Yaseer Mahmud': '/assets/leadership/yaseer-mahmud.png',
      'Aarouni Verma': '/assets/leadership/aarouni-verma.png',
      'Uttam Singh': '/assets/leadership/uttam-singh.png',
      'Syed Javed Iqbal': '/assets/leadership/syed-javed-iqbal.png',
      'Dr. A.K. Balyan': '/assets/leadership/dr-ak-balyan.jpg',
      'S. C. Verma': '/assets/leadership/sc-verma.png'
    };

    for (const leader of leadersList) {
      const photoPath = photoMappings[leader.name];
      if (photoPath !== undefined) {
        console.log(`Updating leader ${leader.name} photo to: ${photoPath}`);
        await db.update(schema.leaders)
          .set({ photo: photoPath })
          .where(sql`id = ${leader.id}`);
      }
    }

    console.log('Database image paths cleaning completed successfully.');
  } catch (error) {
    console.error('Error cleaning database:', error);
  } finally {
    await pool.end();
  }
}

cleanDatabase();
