"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Shield,
  LayoutDashboard,
  User,
  FolderKanban,
  Cpu,
  Briefcase,
  Wrench,
  FileText,
  Image as ImageIcon,
  Mail,
  Settings,
  LogOut,
  Save,
  Check,
  AlertCircle,
  ExternalLink,
  Plus,
  Trash2,
  Upload,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { PortfolioConfig, DEFAULT_PORTFOLIO_CONFIG, ProjectItemConfig } from "@/app/lib/config";

type AdminTab =
  | "overview"
  | "hero"
  | "projects"
  | "skills"
  | "experience"
  | "services"
  | "resumes"
  | "media"
  | "enquiries"
  | "settings";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface EnquiryItem {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  projectType: string;
  budget?: string | null;
  message: string;
  country?: string | null;
  countryCode?: string | null;
  currency?: string | null;
  status: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [config, setConfig] = useState<PortfolioConfig>(DEFAULT_PORTFOLIO_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Enquiries state
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [enquiryFilter, setEnquiryFilter] = useState("ALL");
  const [enquirySearch, setEnquirySearch] = useState("");
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);

  // Upload state
  const [uploadProgress, setUploadProgress] = useState(false);
  const [lastUploadedUrl, setLastUploadedUrl] = useState<string | null>(null);

  // 1. Initial Authentication & Config Fetch
  useEffect(() => {
    let active = true;

    async function init() {
      try {
        // Verify Session
        const authRes = await fetch("/api/admin/me");
        if (!authRes.ok) {
          router.replace("/admin/login");
          return;
        }
        const authData = await authRes.json();
        if (!authData.success || !authData.user) {
          router.replace("/admin/login");
          return;
        }
        if (active) setCurrentUser(authData.user);

        // Fetch Config
        const configRes = await fetch("/api/config");
        if (configRes.ok) {
          const configData = await configRes.json();
          if (active && configData) {
            setConfig({
              ...DEFAULT_PORTFOLIO_CONFIG,
              ...configData,
            });
          }
        }
      } catch (err) {
        console.error("Admin init error:", err);
      } finally {
        if (active) setLoading(false);
      }
    }

    init();

    return () => {
      active = false;
    };
  }, [router]);

  // 2. Fetch enquiries helper
  const fetchEnquiries = async () => {
    setLoadingEnquiries(true);
    try {
      const res = await fetch("/api/admin/enquiries");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.enquiries) {
          setEnquiries(data.enquiries);
        }
      }
    } catch (err) {
      console.error("Failed to load enquiries:", err);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  // Fetch enquiries when enquiries tab is active
  useEffect(() => {
    if (activeTab === "enquiries" || activeTab === "overview") {
      fetchEnquiries();
    }
  }, [activeTab]);

  // 3. Save Configuration Handler
  const handleSaveConfig = async () => {
    setSaving(true);
    setNotification(null);

    try {
      const res = await fetch("/api/config", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update portfolio configuration.");
      }

      setIsDirty(false);
      setNotification({
        type: "success",
        message: "Portfolio configuration saved successfully to Neon PostgreSQL database.",
      });

      // Clear notification after 4 seconds
      setTimeout(() => setNotification(null), 4000);
    } catch (err: unknown) {
      setNotification({
        type: "error",
        message: err instanceof Error ? err.message : "Error saving configuration",
      });
    } finally {
      setSaving(false);
    }
  };

  // 4. Logout Handler
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // ignore
    }
    router.replace("/admin/login");
  };

  // 5. File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, folder = "images") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress(true);
    setNotification(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "File upload failed");
      }

      setLastUploadedUrl(data.assetUrl);
      setNotification({
        type: "success",
        message: `Uploaded "${data.fileName}" successfully to ${data.assetUrl}`,
      });
    } catch (err: unknown) {
      setNotification({
        type: "error",
        message: err instanceof Error ? err.message : "Upload error",
      });
    } finally {
      setUploadProgress(false);
    }
  };

  // 6. Update enquiry status
  const handleUpdateEnquiryStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  // 7. Delete enquiry
  const handleDeleteEnquiry = async (id: number) => {
    if (!confirm("Are you sure you want to delete this enquiry record?")) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Helper to mark dirty
  const updateConfig = (updater: (prev: PortfolioConfig) => PortfolioConfig) => {
    setConfig((prev) => {
      const updated = updater(prev);
      setIsDirty(true);
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0f12]">
        <div className="flex items-center gap-3 text-zinc-400 font-mono text-sm">
          <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading Owner Control Center...</span>
        </div>
      </div>
    );
  }

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesFilter = enquiryFilter === "ALL" || item.status === enquiryFilter;
    const matchesSearch =
      !enquirySearch ||
      item.name.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      item.email.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      item.projectType.toLowerCase().includes(enquirySearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0d11]">
      {/* Top Header */}
      <header className="h-16 border-b border-[#1b222d] bg-[#10141b] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#e50914]/15 border border-[#e50914]/30 flex items-center justify-center text-[#e50914]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-white tracking-wide uppercase">
                Owner Control Center
              </span>
              <span className="px-2 py-0.5 rounded bg-red-950/70 border border-red-600/40 text-[#e50914] text-[10px] font-mono font-bold uppercase tracking-wider">
                OWNER
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-400 block -mt-0.5">
              {currentUser?.email || "firoznissar@gmail.com"}
            </span>
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="flex items-center gap-3">
          {/* Live Portfolio link */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#19202a] hover:bg-[#222c3a] border border-[#2b3647] text-xs font-semibold text-zinc-300 transition-colors"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Save Button */}
          <button
            onClick={handleSaveConfig}
            disabled={saving || !isDirty}
            className={`px-4 py-1.5 rounded-lg font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${isDirty
              ? "bg-[#e50914] hover:bg-[#f40612] text-white shadow-[0_0_20px_rgba(229,9,20,0.4)] animate-pulse"
              : "bg-[#19202a] text-zinc-500 cursor-not-allowed border border-[#232b38]"
              }`}
          >
            {saving ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{isDirty ? "Save Changes" : "Saved"}</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Log out of Owner session"
            className="p-2 rounded-lg bg-[#19202a] hover:bg-red-950/50 hover:text-red-400 border border-[#232b38] text-zinc-400 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`px-6 py-2.5 text-xs font-medium flex items-center justify-between border-b ${notification.type === "success"
            ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
            : "bg-red-950/60 border-red-500/40 text-red-300"
            }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#1b222d] bg-[#0e1218] shrink-0 p-3 flex md:flex-col gap-1 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "hero", label: "Hero Management", icon: User },
            { id: "projects", label: "Projects Management", icon: FolderKanban },
            { id: "skills", label: "Skills Management", icon: Cpu },
            { id: "experience", label: "Experience Management", icon: Briefcase },
            { id: "services", label: "Services Management", icon: Wrench },
            { id: "resumes", label: "Resume Management", icon: FileText },
            { id: "media", label: "Media Management", icon: ImageIcon },
            { id: "enquiries", label: "Enquiries & Clients", icon: Mail, badge: enquiries.filter((e) => e.status === "NEW").length },
            { id: "settings", label: "Website Configuration", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap ${isActive
                  ? "bg-[#e50914] text-white shadow-md shadow-red-900/30"
                  : "text-zinc-400 hover:text-white hover:bg-[#161c26]"
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </div>
                {typeof tab.badge === "number" && tab.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${isActive ? "bg-white text-red-600" : "bg-red-600 text-white"
                      }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Pane */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-6xl">
          {/* ========================================================
              TAB 1: OVERVIEW
          ======================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  Portfolio Operations Dashboard
                </h2>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  Authoritative status, backend services and live operational metrics.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#12161f] border border-[#202735]">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block mb-1">
                    Database State
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-lg font-bold text-white">Neon PostgreSQL</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 mt-1 block">
                    Pooler Connected & Synced
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#12161f] border border-[#202735]">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block mb-1">
                    Total Enquiries
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-white">{enquiries.length}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-500/40 text-blue-400 text-xs font-mono">
                      {enquiries.filter((e) => e.status === "NEW").length} New
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 mt-1 block">
                    Saved in Neon Enquiry Table
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#12161f] border border-[#202735]">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block mb-1">
                    Active Projects
                  </span>
                  <span className="text-2xl font-black text-white">
                    {config.projects?.length || 0}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 mt-1 block">
                    {config.projects?.filter((p) => p.isTopPick).length || 0} Featured in Top 5
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#12161f] border border-[#202735]">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block mb-1">
                    Hero Interaction
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-base font-bold text-white">
                      Standalone Portrait
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 mt-1 block">
                    Smooth Zoom-Out on Hover (700ms)
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-6 rounded-2xl bg-[#12161f] border border-[#202735]">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#e50914]" />
                  <span>Quick Administrative Actions</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setActiveTab("hero")}
                    className="p-3 rounded-xl bg-[#181f2b] hover:bg-[#202a3a] border border-[#263244] text-left transition-colors cursor-pointer"
                  >
                    <span className="text-xs font-bold text-white block">Update Hero Content</span>
                    <span className="text-[11px] text-zinc-400">Portrait, bio, degree, tags</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("projects")}
                    className="p-3 rounded-xl bg-[#181f2b] hover:bg-[#202a3a] border border-[#263244] text-left transition-colors cursor-pointer"
                  >
                    <span className="text-xs font-bold text-white block">Manage Projects</span>
                    <span className="text-[11px] text-zinc-400">Add, reorder or edit projects</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("enquiries")}
                    className="p-3 rounded-xl bg-[#181f2b] hover:bg-[#202a3a] border border-[#263244] text-left transition-colors cursor-pointer"
                  >
                    <span className="text-xs font-bold text-white block">Review Client Enquiries</span>
                    <span className="text-[11px] text-zinc-400">Status, budget & locations</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: HERO MANAGEMENT
          ======================================================== */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  Hero Section Management
                </h2>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  Update primary headline, bio, professional portrait and clapping animation behavior.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Form Controls (8 cols) */}
                <div className="lg:col-span-8 space-y-4 bg-[#12161f] border border-[#202735] p-6 rounded-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-zinc-300 uppercase mb-1">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={config.hero.name}
                        onChange={(e) =>
                          updateConfig((c) => ({
                            ...c,
                            hero: { ...c.hero, name: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg bg-[#0b0e14] border border-[#232b38] text-sm text-white focus:border-[#e50914] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-zinc-300 uppercase mb-1">
                        Professional Title
                      </label>
                      <input
                        type="text"
                        value={config.hero.title}
                        onChange={(e) =>
                          updateConfig((c) => ({
                            ...c,
                            hero: { ...c.hero, title: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg bg-[#0b0e14] border border-[#232b38] text-sm text-white focus:border-[#e50914] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-300 uppercase mb-1">
                      Hero Tagline
                    </label>
                    <input
                      type="text"
                      value={config.hero.tagline}
                      onChange={(e) =>
                        updateConfig((c) => ({
                          ...c,
                          hero: { ...c.hero, tagline: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#0b0e14] border border-[#232b38] text-sm text-white focus:border-[#e50914] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-300 uppercase mb-1">
                      Bio Statement
                    </label>
                    <textarea
                      rows={3}
                      value={config.hero.bio}
                      onChange={(e) =>
                        updateConfig((c) => ({
                          ...c,
                          hero: { ...c.hero, bio: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#0b0e14] border border-[#232b38] text-sm text-white focus:border-[#e50914] focus:outline-none leading-relaxed"
                    />
                  </div>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                        Availability Badge
                      </label>
                      <input
                        type="text"
                        value={config.hero.availabilityBadge}
                        onChange={(e) =>
                          updateConfig((c) => ({
                            ...c,
                            hero: { ...c.hero, availabilityBadge: e.target.value },
                          }))
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                        Degree
                      </label>
                      <input
                        type="text"
                        value={config.hero.degree}
                        onChange={(e) =>
                          updateConfig((c) => ({
                            ...c,
                            hero: { ...c.hero, degree: e.target.value },
                          }))
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                        Years Active
                      </label>
                      <input
                        type="text"
                        value={config.hero.yearsActive}
                        onChange={(e) =>
                          updateConfig((c) => ({
                            ...c,
                            hero: { ...c.hero, yearsActive: e.target.value },
                          }))
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                        Experience Badge
                      </label>
                      <input
                        type="text"
                        value={config.hero.experienceBadge}
                        onChange={(e) =>
                          updateConfig((c) => ({
                            ...c,
                            hero: { ...c.hero, experienceBadge: e.target.value },
                          }))
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Standalone Photograph Configuration */}
                  <div className="pt-4 border-t border-[#1f2735] space-y-4">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Standalone Cinematic Photograph
                    </h4>

                    <div>
                      <label className="block text-xs font-mono text-zinc-300 uppercase mb-1">
                        Portrait Image URL
                      </label>
                      <input
                        type="text"
                        value={config.hero.imageUrl}
                        onChange={(e) =>
                          updateConfig((c) => ({
                            ...c,
                            hero: { ...c.hero, imageUrl: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg bg-[#0b0e14] border border-[#232b38] text-sm text-white"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0b0e14] border border-[#232b38] space-y-1">
                      <span className="text-xs font-bold text-white block">
                        Desktop Interaction: Smooth Zoom-Out on Hover (700ms)
                      </span>
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">
                        Renders directly against the deep black hero background without card containers, borders, or overlay badges. Smoothly zooms out on mouse hover from scale(1.05) to scale(0.92) with zero layout shifts.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Live Preview (4 cols) */}
                <div className="lg:col-span-4 bg-[#12161f] border border-[#202735] p-5 rounded-2xl flex flex-col items-center text-center">
                  <span className="text-xs font-mono uppercase text-zinc-400 font-bold mb-3 tracking-wider">
                    Standalone Photograph Preview
                  </span>
                  <div className="relative w-48 aspect-[1199/1312] rounded-xl overflow-hidden drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] border border-[#2b3546]">
                    <Image
                      src={config.hero.imageUrl || "/images/firozkhan-hero.png"}
                      alt="Hero Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="mt-4 text-left w-full space-y-1">
                    <span className="text-sm font-black text-white uppercase block">
                      {config.hero.name}
                    </span>
                    <span className="text-xs font-mono text-[#e50914] font-bold block">
                      {config.hero.title}
                    </span>
                    <span className="text-[11px] text-zinc-400 block line-clamp-2">
                      {config.hero.tagline}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: PROJECTS MANAGEMENT
          ======================================================== */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tight">
                    Projects Management
                  </h2>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    Add, edit, reorder or feature projects in the Netflix Top 5 picks.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newProj: ProjectItemConfig = {
                      id: `project-${Date.now()}`,
                      title: "New Flagship Project",
                      categoryTag: "FULL-STACK · ARCHITECTURE",
                      shortDesc: "Short project summary description...",
                      fullDesc: "Detailed engineering description...",
                      technologies: ["Next.js", "Node.js", "PostgreSQL"],
                      keyFeatures: ["Feature 1", "Feature 2"],
                      isTopPick: false,
                    };
                    updateConfig((c) => ({
                      ...c,
                      projects: [newProj, ...(c.projects || [])],
                    }));
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#e50914] hover:bg-[#f40612] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects List */}
              <div className="space-y-4">
                {config.projects?.map((project, idx) => (
                  <div
                    key={project.id || idx}
                    className="p-5 rounded-2xl bg-[#12161f] border border-[#202735] space-y-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                            Project Title
                          </label>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateConfig((c) => ({
                                ...c,
                                projects: c.projects.map((p, i) =>
                                  i === idx ? { ...p, title: val } : p
                                ),
                              }));
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-sm text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                            Category Tag
                          </label>
                          <input
                            type="text"
                            value={project.categoryTag}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateConfig((c) => ({
                                ...c,
                                projects: c.projects.map((p, i) =>
                                  i === idx ? { ...p, categoryTag: val } : p
                                ),
                              }));
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-[#e50914] font-mono uppercase"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#181f2b] border border-[#253042] text-xs text-white font-mono cursor-pointer">
                          <input
                            type="checkbox"
                            checked={project.isTopPick}
                            onChange={(e) => {
                              const val = e.target.checked;
                              updateConfig((c) => ({
                                ...c,
                                projects: c.projects.map((p, i) =>
                                  i === idx ? { ...p, isTopPick: val } : p
                                ),
                              }));
                            }}
                            className="accent-[#e50914]"
                          />
                          <span>Top Pick</span>
                        </label>
                        <button
                          onClick={() => {
                            if (confirm(`Delete project "${project.title}"?`)) {
                              updateConfig((c) => ({
                                ...c,
                                projects: c.projects.filter((_, i) => i !== idx),
                              }));
                            }
                          }}
                          className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/40 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                        Short Summary Description
                      </label>
                      <input
                        type="text"
                        value={project.shortDesc}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateConfig((c) => ({
                            ...c,
                            projects: c.projects.map((p, i) =>
                              i === idx ? { ...p, shortDesc: val } : p
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-zinc-300"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                          Technologies (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={project.technologies.join(", ")}
                          onChange={(e) => {
                            const val = e.target.value.split(",").map((s) => s.trim());
                            updateConfig((c) => ({
                              ...c,
                              projects: c.projects.map((p, i) =>
                                i === idx ? { ...p, technologies: val } : p
                              ),
                            }));
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-zinc-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                          Screenshot URL
                        </label>
                        <input
                          type="text"
                          value={project.screenshots?.[0] || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateConfig((c) => ({
                              ...c,
                              projects: c.projects.map((p, i) =>
                                i === idx ? { ...p, screenshots: [val] } : p
                              ),
                            }));
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-zinc-300 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: SKILLS MANAGEMENT
          ======================================================== */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  Skills Universe Management
                </h2>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  Update technical skill groups, proficiency ratings and highlight chips.
                </p>
              </div>

              <div className="space-y-4">
                {config.skills?.map((cat, catIdx) => (
                  <div
                    key={cat.id || catIdx}
                    className="p-5 rounded-2xl bg-[#12161f] border border-[#202735] space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={cat.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateConfig((c) => ({
                              ...c,
                              skills: c.skills.map((s, i) =>
                                i === catIdx ? { ...s, title: val } : s
                              ),
                            }));
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-sm text-white font-bold"
                        />
                        <input
                          type="text"
                          value={cat.subtitle}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateConfig((c) => ({
                              ...c,
                              skills: c.skills.map((s, i) =>
                                i === catIdx ? { ...s, subtitle: val } : s
                              ),
                            }));
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-zinc-400 font-mono"
                        />
                      </div>
                    </div>

                    {/* Skill chips */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase">
                        Skills List (JSON / Comma Separated)
                      </label>
                      <input
                        type="text"
                        value={cat.skills.map((s) => s.name).join(", ")}
                        onChange={(e) => {
                          const names = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                          updateConfig((c) => ({
                            ...c,
                            skills: c.skills.map((s, i) =>
                              i === catIdx
                                ? {
                                  ...s,
                                  skills: names.map((name) => ({
                                    name,
                                    level: "Production",
                                    highlight: false,
                                  })),
                                }
                                : s
                            ),
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 5: EXPERIENCE MANAGEMENT
          ======================================================== */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  Executive Dossier · Experience
                </h2>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  Update authentic career milestones: SODISYS, Srishti Innovative Technopark and education.
                </p>
              </div>

              <div className="space-y-4">
                {config.experience?.map((exp, expIdx) => (
                  <div
                    key={exp.id || expIdx}
                    className="p-5 rounded-2xl bg-[#12161f] border border-[#202735] space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateConfig((c) => ({
                              ...c,
                              experience: c.experience.map((ex, i) =>
                                i === expIdx ? { ...ex, company: val } : ex
                              ),
                            }));
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-sm text-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                          Role Title
                        </label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateConfig((c) => ({
                              ...c,
                              experience: c.experience.map((ex, i) =>
                                i === expIdx ? { ...ex, role: val } : ex
                              ),
                            }));
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                          Period
                        </label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateConfig((c) => ({
                              ...c,
                              experience: c.experience.map((ex, i) =>
                                i === expIdx ? { ...ex, period: val } : ex
                              ),
                            }));
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-[#e50914] font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                        Executive Overview
                      </label>
                      <input
                        type="text"
                        value={exp.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateConfig((c) => ({
                            ...c,
                            experience: c.experience.map((ex, i) =>
                              i === expIdx ? { ...ex, description: val } : ex
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-zinc-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 6: SERVICES MANAGEMENT
          ======================================================== */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  Freelance Services Management
                </h2>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  Manage engineering service packages, deliverables and delivery timelines.
                </p>
              </div>

              <div className="space-y-4">
                {config.services?.map((svc, svcIdx) => (
                  <div
                    key={svc.id || svcIdx}
                    className="p-5 rounded-2xl bg-[#12161f] border border-[#202735] space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                          Service Title
                        </label>
                        <input
                          type="text"
                          value={svc.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateConfig((c) => ({
                              ...c,
                              services: c.services.map((s, i) =>
                                i === svcIdx ? { ...s, title: val } : s
                              ),
                            }));
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-sm text-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                          Delivery Timeline
                        </label>
                        <input
                          type="text"
                          value={svc.baseTimeline}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateConfig((c) => ({
                              ...c,
                              services: c.services.map((s, i) =>
                                i === svcIdx ? { ...s, baseTimeline: val } : s
                              ),
                            }));
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                        Service Description
                      </label>
                      <input
                        type="text"
                        value={svc.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateConfig((c) => ({
                            ...c,
                            services: c.services.map((s, i) =>
                              i === svcIdx ? { ...s, description: val } : s
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-zinc-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 7: RESUME MANAGEMENT
          ======================================================== */}
          {activeTab === "resumes" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  Resume Assets & Downloads
                </h2>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  Configure Indian & Dubai/UAE resume file paths and download filenames.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* India Resume */}
                <div className="p-6 rounded-2xl bg-[#12161f] border border-[#202735] space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🇮🇳</span>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      India Resume
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase mb-1">
                      File Path / URL
                    </label>
                    <input
                      type="text"
                      value={config.resumes.india.url}
                      onChange={(e) =>
                        updateConfig((c) => ({
                          ...c,
                          resumes: {
                            ...c.resumes,
                            india: { ...c.resumes.india, url: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase mb-1">
                      Download Filename
                    </label>
                    <input
                      type="text"
                      value={config.resumes.india.filename}
                      onChange={(e) =>
                        updateConfig((c) => ({
                          ...c,
                          resumes: {
                            ...c.resumes,
                            india: { ...c.resumes.india, filename: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-white font-mono"
                    />
                  </div>

                  <a
                    href={config.resumes.india.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:underline font-mono"
                  >
                    <span>Test Preview India PDF</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Dubai Resume */}
                <div className="p-6 rounded-2xl bg-[#12161f] border border-[#202735] space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🇦🇪</span>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Dubai / UAE Resume
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase mb-1">
                      File Path / URL
                    </label>
                    <input
                      type="text"
                      value={config.resumes.dubai.url}
                      onChange={(e) =>
                        updateConfig((c) => ({
                          ...c,
                          resumes: {
                            ...c.resumes,
                            dubai: { ...c.resumes.dubai, url: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase mb-1">
                      Download Filename
                    </label>
                    <input
                      type="text"
                      value={config.resumes.dubai.filename}
                      onChange={(e) =>
                        updateConfig((c) => ({
                          ...c,
                          resumes: {
                            ...c.resumes,
                            dubai: { ...c.resumes.dubai, filename: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#0b0e14] border border-[#232b38] text-xs text-white font-mono"
                    />
                  </div>

                  <a
                    href={config.resumes.dubai.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:underline font-mono"
                  >
                    <span>Test Preview Dubai PDF</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 8: MEDIA MANAGEMENT
          ======================================================== */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  Media & Asset Vault
                </h2>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  Upload photographs, animated clapping GIFs, screenshots or PDF resumes directly to the server.
                </p>
              </div>

              {/* Upload Dropzones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#12161f] border border-[#202735] flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center justify-center text-[#e50914]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase">Upload Image / GIF</h3>
                    <p className="text-[11px] font-mono text-zinc-400">
                      Supports PNG, JPG, WEBP, GIF (Max 10MB)
                    </p>
                  </div>
                  <label className="px-4 py-2 rounded-xl bg-[#e50914] hover:bg-[#f40612] text-white font-bold text-xs cursor-pointer shadow-md transition-all">
                    <span>{uploadProgress ? "Uploading..." : "Select Image"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadProgress}
                      onChange={(e) => handleFileUpload(e, "images")}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="p-6 rounded-2xl bg-[#12161f] border border-[#202735] flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase">Upload Resume PDF</h3>
                    <p className="text-[11px] font-mono text-zinc-400">
                      Supports PDF documents (Max 10MB)
                    </p>
                  </div>
                  <label className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer shadow-md transition-all">
                    <span>{uploadProgress ? "Uploading..." : "Select PDF"}</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      disabled={uploadProgress}
                      onChange={(e) => handleFileUpload(e, "resumes")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {lastUploadedUrl && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center justify-between">
                  <span>Last Uploaded: {lastUploadedUrl}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(lastUploadedUrl)}
                    className="px-2.5 py-1 rounded bg-emerald-900/60 hover:bg-emerald-800 text-white text-[10px]"
                  >
                    Copy URL
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 9: ENQUIRIES & CLIENTS
          ======================================================== */}
          {activeTab === "enquiries" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tight">
                    Project Enquiries Pipeline
                  </h2>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    Real-time client leads collected from the Netflix portfolio enquiry form.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Status Filter */}
                  <select
                    value={enquiryFilter}
                    onChange={(e) => setEnquiryFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-[#12161f] border border-[#202735] text-xs text-white font-mono"
                  >
                    <option value="ALL">All Enquiries</option>
                    <option value="NEW">New Only</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>

                  <button
                    onClick={fetchEnquiries}
                    disabled={loadingEnquiries}
                    className="p-2 rounded-lg bg-[#12161f] hover:bg-[#1c2432] border border-[#202735] text-zinc-400 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingEnquiries ? "animate-spin" : ""}`} />
                  </button>
                </div>
              </div>

              {/* Enquiries List */}
              <div className="space-y-3">
                {filteredEnquiries.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl bg-[#12161f] border border-[#202735] text-zinc-500 font-mono text-xs">
                    No enquiries found matching filter criteria.
                  </div>
                ) : (
                  filteredEnquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-5 rounded-2xl bg-[#12161f] border border-[#202735] space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1b222d] pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{enq.name}</span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${enq.status === "NEW"
                                ? "bg-red-950 text-red-400 border border-red-500/40 animate-pulse"
                                : enq.status === "CONTACTED"
                                  ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                                  : "bg-zinc-800 text-zinc-400"
                                }`}
                            >
                              {enq.status}
                            </span>
                          </div>
                          <span className="text-xs text-zinc-400 font-mono">
                            {enq.email} {enq.phone ? `· ${enq.phone}` : ""}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={enq.status}
                            onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                            className="px-2.5 py-1 rounded bg-[#0b0e14] border border-[#232b38] text-[11px] text-zinc-300 font-mono"
                          >
                            <option value="NEW">Mark NEW</option>
                            <option value="CONTACTED">Mark CONTACTED</option>
                            <option value="ARCHIVED">Mark ARCHIVED</option>
                          </select>
                          <button
                            onClick={() => handleDeleteEnquiry(enq.id)}
                            className="p-1.5 rounded bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/40 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-zinc-400">
                        <div>
                          <span className="text-zinc-500 block uppercase">Project Type</span>
                          <span className="text-white font-semibold">{enq.projectType}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block uppercase">Budget</span>
                          <span className="text-emerald-400 font-semibold">
                            {enq.budget || "Not specified"}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block uppercase">Client Location</span>
                          <span className="text-white">
                            {enq.country || "Worldwide"} {enq.countryCode ? `(${enq.countryCode})` : ""}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block uppercase">Received</span>
                          <span className="text-zinc-400">
                            {new Date(enq.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#0b0e14] border border-[#1b222d] text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                        {enq.message}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 10: WEBSITE CONFIGURATION
          ======================================================== */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  Website Configuration & Features
                </h2>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  Toggle interactive runtime capabilities and notification pipelines.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#12161f] border border-[#202735] space-y-5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Runtime Feature Toggles
                </h3>

                {[
                  {
                    key: "recruiterMode" as const,
                    title: "Recruiter Profile & Priority Viewing",
                    desc: "Enables recruiter tab in Profile Selector with verified credentials and direct resume access",
                  },
                  {
                    key: "currencyDetection" as const,
                    title: "Automatic Worldwide Geolocation Currency Detection",
                    desc: "Detects visitor country and formats budget estimates in local currency automatically",
                  },
                  {
                    key: "resumeModal" as const,
                    title: "In-Browser PDF Resume Preview Modal",
                    desc: "Allows visitors to preview Indian and Dubai resumes inside a modal before downloading",
                  },
                  {
                    key: "enquiryPipeline" as const,
                    title: "Freelance Project Enquiry Intake",
                    desc: "Saves client leads to Neon PostgreSQL and dispatches notification via Resend",
                  },
                  {
                    key: "clappingAnimation" as const,
                    title: "Clapping Animation Interaction Flag",
                    desc: "Master toggle for clapping animation triggers across desktop hover and mobile tap",
                  },
                ].map((feat) => (
                  <div
                    key={feat.key}
                    className="flex items-center justify-between p-4 rounded-xl bg-[#0b0e14] border border-[#232b38]"
                  >
                    <div>
                      <span className="text-sm font-bold text-white block">{feat.title}</span>
                      <span className="text-xs text-zinc-400 block mt-0.5">{feat.desc}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.features[feat.key]}
                      onChange={(e) =>
                        updateConfig((c) => ({
                          ...c,
                          features: {
                            ...c.features,
                            [feat.key]: e.target.checked,
                          },
                        }))
                      }
                      className="w-5 h-5 accent-[#e50914] cursor-pointer"
                    />
                  </div>
                ))}

                <div className="pt-4 border-t border-[#1f2735]">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-2">
                    Enquiry Notification Recipient Email
                  </h4>
                  <input
                    type="email"
                    value={config.enquirySettings?.notificationEmail || "firoznissar@gmail.com"}
                    onChange={(e) =>
                      updateConfig((c) => ({
                        ...c,
                        enquirySettings: {
                          ...c.enquirySettings,
                          notificationEmail: e.target.value,
                        },
                      }))
                    }
                    className="w-full sm:w-96 px-3 py-2 rounded-lg bg-[#0b0e14] border border-[#232b38] text-sm text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

