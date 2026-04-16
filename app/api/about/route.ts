import { openDb } from '@/lib/db';
import { NextResponse } from 'next/server';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET() {
  try {
    const db = await openDb();
    
    const aboutResult = await db.execute('SELECT * FROM about WHERE id = 1');
    const processResult = await db.execute('SELECT * FROM process');
    const experienceResult = await db.execute('SELECT * FROM work_experience');
    
    if (aboutResult.rows.length === 0) {
      return NextResponse.json({ error: 'About data not found' }, { status: 404 });
    }

    const row = aboutResult.rows[0];
    const data = {
      description: row.description,
      stats: {
        years: row.stats_years,
        projects: row.stats_projects,
        satisfied: row.stats_satisfied,
        industries: row.stats_industries
      },
      process: processResult.rows.map((p: any) => ({
        fcol: p.fcol,
        scol: p.scol
      })),
      work_experience: experienceResult.rows.map((we: any) => ({
        fcol: we.fcol,
        scol: {
          type: we.type,
          dateInterval: we.dateInterval
        }
      }))
    };
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await checkAdminAuth())) return unauthorizedResponse();
  try {
    const data = await request.json();
    const db = await openDb();
    
    await db.execute({
      sql: `UPDATE about SET description = ?, stats_years = ?, stats_projects = ?, stats_satisfied = ?, stats_industries = ? WHERE id = 1`,
      args: [
        data.description,
        data.stats.years,
        data.stats.projects,
        data.stats.satisfied,
        data.stats.industries
      ]
    });
    
    // Filter out rows with empty inputs for process
    const validProcess = (data.process || []).filter((p: any) => 
      (p.fcol && p.fcol.trim() !== "") || (p.scol && p.scol.trim() !== "")
    );
    
    await db.execute('DELETE FROM process');
    for (const p of validProcess) {
      await db.execute({
        sql: `INSERT INTO process (fcol, scol) VALUES (?, ?)`,
        args: [p.fcol, p.scol]
      });
    }

    // Filter out rows with empty inputs for work_experience
    const validExperience = (data.work_experience || []).filter((we: any) => 
      (we.fcol && we.fcol.trim() !== "") || 
      (we.scol?.type && we.scol.type.trim() !== "") || 
      (we.scol?.dateInterval && we.scol.dateInterval.trim() !== "")
    );

    await db.execute('DELETE FROM work_experience');
    for (const we of validExperience) {
      await db.execute({
        sql: `INSERT INTO work_experience (fcol, type, dateInterval) VALUES (?, ?, ?)`,
        args: [we.fcol, we.scol.type, we.scol.dateInterval]
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
