import { openDb } from '@/lib/db';
import { NextResponse } from 'next/server';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET() {
  try {
    const db = await openDb();
    const result = await db.execute('SELECT * FROM hero WHERE id = 1');
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Hero data not found' }, { status: 404 });
    }
    const row = result.rows[0];
    const heroData = {
      name: row.name,
      mainTitle: row.mainTitle,
      paragraph: row.paragraph,
      card1: {
        title: row.card1Title,
        paragraph: row.card1Paragraph
      },
      card2: {
        title: row.card2Title,
        paragraph: row.card2Paragraph
      },
      resumeLink: row.resumeLink || ""
    };
    return NextResponse.json(heroData);
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
      sql: `UPDATE hero SET name = ?, mainTitle = ?, paragraph = ?, card1Title = ?, card1Paragraph = ?, card2Title = ?, card2Paragraph = ?, resumeLink = ? WHERE id = 1`,
      args: [
        data.name,
        data.mainTitle,
        data.paragraph,
        data.card1.title,
        data.card1.paragraph,
        data.card2.title,
        data.card2.paragraph,
        data.resumeLink
      ]
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
