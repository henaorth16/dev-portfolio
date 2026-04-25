import { openDb } from '@/lib/db';
import { NextResponse } from 'next/server';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET() {
  try {
    const db = await openDb();
    const result = await db.execute('SELECT * FROM contact_settings WHERE id = 1');
    if (result.rows.length > 0) {
      return NextResponse.json({
        email: result.rows[0].email,
        budget_options: result.rows[0].budget_options
      });
    }
    return NextResponse.json({ email: "davemak4621@gmail.com", budget_options: "Not specified, 5K-10K, 10K-20K, 20K-50K, 50K+" });
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
      sql: `INSERT OR REPLACE INTO contact_settings (id, email, budget_options) VALUES (1, ?, ?)`,
      args: [data.email, data.budget_options]
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
