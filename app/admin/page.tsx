import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin_token');
  const secret = process.env.ADMIN_SECRET || 'fallback-secret';

  // "if the user is not admin return notfound"
  if (!adminToken || adminToken.value !== secret) {
    notFound();
  }

  return <AdminDashboard />;
}
