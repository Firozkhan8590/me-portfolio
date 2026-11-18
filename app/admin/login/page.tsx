"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if already authenticated
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/me");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            router.replace("/admin");
            return;
          }
        }
      } catch {
        // ignore
      } finally {
        setCheckingAuth(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Authentication failed. Please verify credentials.");
        setLoading(false);
        return;
      }

      // Successful login
      router.replace("/admin");
    } catch {
      setError("A network error occurred while communicating with the authentication server.");
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0f12]">
        <div className="flex items-center gap-3 text-zinc-400 font-mono text-sm">
          <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          <span>Verifying security credentials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0c10] relative overflow-hidden">
      {/* Subtle ambient security glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="bg-[#12161f] border border-[#232b38] rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#e50914]/10 border border-[#e50914]/30 flex items-center justify-center mb-4 text-[#e50914] shadow-[0_0_20px_rgba(229,9,20,0.2)]">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase">
              Owner Control Center
            </h1>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              FIROZKHAN PORTFOLIO MANAGEMENT SYSTEM
            </p>
            <div className="mt-3 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Restricted Access · Owner Only</span>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-start gap-2.5 leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-2">
                Owner Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="firoznissar@gmail.com"
                  required
                  autoFocus
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0b0e14] border border-[#232b38] focus:border-[#e50914] focus:outline-none text-sm text-white placeholder-zinc-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-2">
                Owner Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#0b0e14] border border-[#232b38] focus:border-[#e50914] focus:outline-none text-sm text-white placeholder-zinc-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#e50914] hover:bg-[#f40612] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(229,9,20,0.35)] transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  <span>Authenticate as Owner</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer notice */}
          <div className="mt-8 pt-6 border-t border-[#1d2430] text-center">
            <p className="text-[11px] font-mono text-zinc-500 leading-relaxed">
              Every administrative interaction is signed, verified, and logged in Neon PostgreSQL.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

