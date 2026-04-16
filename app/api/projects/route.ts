import { openDb } from '@/lib/db';
import { NextResponse } from 'next/server';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET() {
  try {
    const db = await openDb();
    const result = await db.execute('SELECT * FROM projects');
    const projects = result.rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      imageSrc: row.imageSrc,
      technologies: JSON.parse(row.technologies as string),
      liveUrl: row.liveUrl,
      githubUrl: row.githubUrl,
      client: row.client,
      services: JSON.parse((row.services as string) || '[]'),
      productionYear: row.productionYear,
      detailedDescription: row.detailedDescription,
      contentBlocks: JSON.parse((row.contentBlocks as string) || '[]')
    }));
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await checkAdminAuth())) return unauthorizedResponse();
  try {
    const data = await request.json();
    const db = await openDb();

    if (!data.title || data.title.trim() === "") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const id = data.id || Math.random().toString(36).substr(2, 9);
    
    await db.execute({
      sql: `INSERT INTO projects (id, title, description, imageSrc, technologies, liveUrl, githubUrl, client, services, productionYear, detailedDescription, contentBlocks) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        data.title,
        data.description,
        data.imageSrc,
        JSON.stringify(data.technologies || []),
        data.liveUrl,
        data.githubUrl,
        data.client || '',
        JSON.stringify(data.services || []),
        data.productionYear || '',
        data.detailedDescription || '',
        JSON.stringify(data.contentBlocks || [])
      ]
    });
    
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
