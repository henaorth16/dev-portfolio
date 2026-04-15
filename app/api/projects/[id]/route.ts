import { openDb } from '@/lib/db';
import { NextResponse } from 'next/server';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) return unauthorizedResponse();
  try {
    const data = await request.json();
    const db = await openDb();
    const { id } = await props.params;
    
    await db.execute({
      sql: `UPDATE projects SET title = ?, description = ?, imageSrc = ?, technologies = ?, liveUrl = ?, githubUrl = ?, client = ?, services = ?, productionYear = ?, detailedDescription = ?, contentBlocks = ? WHERE id = ?`,
      args: [
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
        JSON.stringify(data.contentBlocks || []),
        id
      ]
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) return unauthorizedResponse();
  try {
    const db = await openDb();
    const { id } = await props.params;
    await db.execute({
      sql: `DELETE FROM projects WHERE id = ?`,
      args: [id]
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
