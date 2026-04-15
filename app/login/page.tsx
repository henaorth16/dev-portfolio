"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        // Force refresh to handle cookie correctly and navigate
        window.location.href = "/admin";
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 bg-muted/20 p-8 rounded-lg border border-border w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Admin Login</h1>
        
        {error && <div className="bg-red-500/10 text-red-500 p-3 rounded-md text-sm border border-red-500/20">{error}</div>}
        
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">Email</label>
          <input 
            type="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md border border-border bg-background focus:border-primary outline-none transition" 
            placeholder="admin@example.com" 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">Password</label>
          <input 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md border border-border bg-background focus:border-primary outline-none transition" 
            placeholder="••••••••" 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="mt-6 bg-primary text-primary-foreground py-3 rounded-md font-bold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
