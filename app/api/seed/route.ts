import { openDb } from '@/lib/db';
import { projects } from '@/data/projects';
import { hero } from '@/data/hero';
import { aboutData } from '@/data/about';
import { socialLinks } from '@/data/contact';
import { NextResponse } from 'next/server';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';

export async function POST() {
  if (!(await checkAdminAuth())) return unauthorizedResponse();
  try {
    const db = await openDb();

    // Insert Projects
    for (const project of projects) {
      await db.execute({
        sql: `INSERT OR REPLACE INTO projects (id, title, description, imageSrc, technologies, liveUrl, githubUrl, client, services, productionYear, detailedDescription, contentBlocks) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          project.id,
          project.title,
          project.description,
          project.imageSrc,
          JSON.stringify(project.technologies || []),
          project.liveUrl,
          project.githubUrl,
          project.client || '',
          JSON.stringify(project.services || []),
          project.productionYear || '',
          project.detailedDescription || '',
          JSON.stringify(project.contentBlocks || [])
        ]
      });
    }

    // Insert Hero
    await db.execute({
      sql: `INSERT OR REPLACE INTO hero (id, name, mainTitle, paragraph, card1Title, card1Paragraph, card2Title, card2Paragraph)
            VALUES (1, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        hero.name,
        hero.mainTitle,
        hero.paragraph,
        hero.card1.title,
        hero.card1.paragraph,
        hero.card2.title,
        hero.card2.paragraph
      ]
    });

    // Insert About
    await db.execute({
      sql: `INSERT OR REPLACE INTO about (id, description, stats_years, stats_projects, stats_satisfied, stats_industries)
            VALUES (1, ?, ?, ?, ?, ?)`,
      args: [
        aboutData.description,
        aboutData.stats.years,
        aboutData.stats.projects,
        aboutData.stats.satisfied,
        aboutData.stats.industries
      ]
    });

    // Insert Process
    await db.execute('DELETE FROM process');
    for (const p of aboutData.process) {
      await db.execute({
        sql: `INSERT INTO process (fcol, scol) VALUES (?, ?)`,
        args: [p.fcol, p.scol]
      });
    }

    // Insert Work Experience
    await db.execute('DELETE FROM work_experience');
    for (const we of aboutData.work_experience) {
      await db.execute({
        sql: `INSERT INTO work_experience (fcol, type, dateInterval) VALUES (?, ?, ?)`,
        args: [we.fcol, we.scol.type, we.scol.dateInterval]
      });
    }

    // Insert Social Links
    await db.execute('DELETE FROM social_links');
    for (const sl of socialLinks) {
      await db.execute({
        sql: `INSERT INTO social_links (platform, url, icon) VALUES (?, ?, ?)`,
        args: [sl.platform, sl.url, sl.icon]
      });
    }

    return NextResponse.json({ success: true, message: 'Database seeded successfully' });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
