import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin_token');
  const secret = process.env.ADMIN_SECRET || 'fallback-secret';

  if (!adminToken || adminToken.value !== secret) {
    return false;
  }
  return true;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
