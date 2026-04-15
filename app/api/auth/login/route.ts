import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const adminUsersEnv = process.env.ADMIN_USERS || '[]';
    
    let adminUsers: any[] = [];
    try {
      adminUsers = JSON.parse(adminUsersEnv);
    } catch (e) {
      console.error("Invalid ADMIN_USERS JSON in .env.local");
    }

    const isValidUser = adminUsers.some(
      (user) => user.email === email && user.password === password
    );

    if (isValidUser) {
      const secret = process.env.ADMIN_SECRET || 'fallback-secret';
      // In a real app we would issue a JWT, but for a simple portfolio a signed/strong cookie is sufficient.
      (await cookies()).set('admin_token', secret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 1 day
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
