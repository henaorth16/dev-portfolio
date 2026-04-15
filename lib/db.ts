import { createClient } from '@libsql/client';
import path from 'path';

let db: ReturnType<typeof createClient> | null = null;

export async function openDb() {
  if (db) return db;
  
  db = createClient({
    url: 'file:' + path.join(process.cwd(), 'portfolio.sqlite'),
  });

  // Initialize DB tables if they don't exist
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT,
      imageSrc TEXT,
      technologies TEXT,
      liveUrl TEXT,
      githubUrl TEXT,
      client TEXT,
      services TEXT,
      productionYear TEXT,
      detailedDescription TEXT,
      contentBlocks TEXT
    );
    CREATE TABLE IF NOT EXISTS hero (
      id INTEGER PRIMARY KEY DEFAULT 1,
      name TEXT,
      mainTitle TEXT,
      paragraph TEXT,
      card1Title TEXT,
      card1Paragraph TEXT,
      card2Title TEXT,
      card2Paragraph TEXT
    );
    CREATE TABLE IF NOT EXISTS about (
      id INTEGER PRIMARY KEY DEFAULT 1,
      description TEXT,
      stats_years INTEGER,
      stats_projects INTEGER,
      stats_satisfied INTEGER,
      stats_industries INTEGER
    );
    CREATE TABLE IF NOT EXISTS process (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fcol TEXT,
      scol TEXT
    );
    CREATE TABLE IF NOT EXISTS work_experience (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fcol TEXT,
      type TEXT,
      dateInterval TEXT
    );
    CREATE TABLE IF NOT EXISTS social_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform TEXT,
      url TEXT,
      icon TEXT
    );
  `);

  // Setup new columns if they are missing
  try { await db.execute("ALTER TABLE projects ADD COLUMN client TEXT"); } catch (e) {}
  try { await db.execute("ALTER TABLE projects ADD COLUMN services TEXT"); } catch (e) {}
  try { await db.execute("ALTER TABLE projects ADD COLUMN productionYear TEXT"); } catch (e) {}
  try { await db.execute("ALTER TABLE projects ADD COLUMN detailedDescription TEXT"); } catch (e) {}
  try { await db.execute("ALTER TABLE projects ADD COLUMN contentBlocks TEXT"); } catch (e) {}

  // Auto seed if empty
  const heroResult = await db.execute('SELECT COUNT(*) as count FROM hero');
  if (heroResult.rows[0].count === 0) {
    const { projects } = await import('@/data/projects');
    const { hero } = await import('@/data/hero');
    const { aboutData } = await import('@/data/about');
    const { socialLinks } = await import('@/data/contact');

    // Insert Projects
    for (const project of projects) {
      await db.execute({
        sql: `INSERT OR REPLACE INTO projects (id, title, description, imageSrc, technologies, liveUrl, githubUrl, client, services, productionYear, detailedDescription, contentBlocks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [project.id, project.title, project.description, project.imageSrc, JSON.stringify(project.technologies), project.liveUrl, project.githubUrl, project.client || '', JSON.stringify(project.services || []), project.productionYear || '', project.detailedDescription || '', JSON.stringify(project.contentBlocks || [])]
      });
    }

    // Insert Hero
    await db.execute({
      sql: `INSERT OR REPLACE INTO hero (id, name, mainTitle, paragraph, card1Title, card1Paragraph, card2Title, card2Paragraph) VALUES (1, ?, ?, ?, ?, ?, ?, ?)`,
      args: [hero.name, hero.mainTitle, hero.paragraph, hero.card1.title, hero.card1.paragraph, hero.card2.title, hero.card2.paragraph]
    });

    // Insert About
    await db.execute({
      sql: `INSERT OR REPLACE INTO about (id, description, stats_years, stats_projects, stats_satisfied, stats_industries) VALUES (1, ?, ?, ?, ?, ?)`,
      args: [aboutData.description, aboutData.stats.years, aboutData.stats.projects, aboutData.stats.satisfied, aboutData.stats.industries]
    });

    // Insert Process
    for (const p of aboutData.process) {
      await db.execute({ sql: `INSERT INTO process (fcol, scol) VALUES (?, ?)`, args: [p.fcol, p.scol] });
    }

    // Insert Work Experience
    for (const we of aboutData.work_experience) {
      await db.execute({ sql: `INSERT INTO work_experience (fcol, type, dateInterval) VALUES (?, ?, ?)`, args: [we.fcol, we.scol.type, we.scol.dateInterval] });
    }

    // Insert Social Links
    for (const sl of socialLinks) {
      await db.execute({ sql: `INSERT INTO social_links (platform, url, icon) VALUES (?, ?, ?)`, args: [sl.platform, sl.url, sl.icon] });
    }
  }
  
  return db;
}
