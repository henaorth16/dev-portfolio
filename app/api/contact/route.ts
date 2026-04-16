import { openDb } from '@/lib/db';
import { NextResponse } from 'next/server';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET() {
  try {
    const db = await openDb();
    const result = await db.execute('SELECT * FROM social_links');
    const links = result.rows.map((row: any) => ({
      platform: row.platform,
      url: row.url,
      icon: row.icon
    }));
    return NextResponse.json(links);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await checkAdminAuth())) return unauthorizedResponse();
  try {
    const data = await request.json();
    const db = await openDb();
    
    // Filter out rows with empty platform or url
    const validLinks = data.filter((link: any) => 
      link.platform && link.platform.trim() !== "" && 
      link.url && link.url.trim() !== ""
    );
    
    await db.execute('DELETE FROM social_links');
    for (const link of validLinks) {
      await db.execute({
        sql: `INSERT INTO social_links (platform, url, icon) VALUES (?, ?, ?)`,
        args: [link.platform, link.url, link.icon]
      });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
