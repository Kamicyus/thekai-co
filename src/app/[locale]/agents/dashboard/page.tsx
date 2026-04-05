"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

/* ── Types ─────────────────────────────────────── */
type Department = { id: string; name: string; icon: string; color: string; description: string | null; agent_count: number; created_at: string };
type Agent = { id: string; department_id: string; name: string; role: string; icon: string; description: string | null; capabilities: string[]; created_at: string };
type Task = { id: string; agent_id: string | null; department_id: string | null; title: string; description: string | null; status: string; created_at: string };

/* ── Constants ─────────────────────────────────── */
const ease = [0.16, 1, 0.3, 1] as const;
const slide = { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" as const }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.3, ease } };
const inputCls = "w-full bg-white/[0.04] border border-white/[0.08] text-white text-sm rounded-lg px-3.5 py-2.5 placeholder:text-white/20 focus:outline-none focus:border-[#D8FB32]/40 focus:ring-1 focus:ring-[#D8FB32]/20 transition-all";
const cardCls = "bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl";
const DEPT_ICONS = ["🏢", "💻", "🎨", "📊", "🎵", "📢", "🔧", "🧠", "🎯", "📦", "🔬", "🛡️"];
const DEPT_COLORS = ["#D8FB32", "#3B82F6", "#A855F7", "#F97316", "#EF4444", "#06B6D4", "#EC4899", "#10B981"];

/* ── Helpers ───────────────────────────────────── */
function formatTimeAgo(dateStr: string, now: number) {
  const diff = now - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "az önce";
  if (m < 60) return `${m}dk önce`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}sa önce`;
  return `${Math.floor(h / 24)}g önce`;
}

/* ── SVG Icons (inline, compact) ───────────────── */
const svgP = { fill: "none" as const, stroke: "currentColor" as const, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const I = {
  dept: <svg width="16" height="16" viewBox="0 0 24 24" {...svgP}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  agent: <svg width="16" height="16" viewBox="0 0 24 24" {...svgP}><path d="M12 2a4 4 0 014 4v1a4 4 0 01-8 0V6a4 4 0 014-4z"/><path d="M16 15H8a4 4 0 00-4 4v2h16v-2a4 4 0 00-4-4z"/></svg>,
  task: <svg width="16" height="16" viewBox="0 0 24 24" {...svgP}><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  check: <svg width="16" height="16" viewBox="0 0 24 24" {...svgP}><path d="M20 6L9 17l-5-5"/></svg>,
  plus: <svg width="16" height="16" viewBox="0 0 24 24" {...svgP}><path d="M12 5v14M5 12h14"/></svg>,
  logout: <svg width="14" height="14" viewBox="0 0 24 24" {...svgP}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  back: <svg width="14" height="14" viewBox="0 0 24 24" {...svgP}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>,
  clock: <svg width="12" height="12" viewBox="0 0 24 24" {...svgP}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
};

function Spinner({ s = 16 }: { s?: number }) {
  return <svg className="animate-spin" width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20"/><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>;
}

function StatusBadge({ status }: { status: string }) {
  const m: Record<string, [string, string, string]> = {
    pending: ["bg-yellow-500/10 border-yellow-500/20", "text-yellow-400", "Bekliyor"],
    running: ["bg-blue-500/10 border-blue-500/20", "text-blue-400", "Çalışıyor"],
    completed: ["bg-green-500/10 border-green-500/20", "text-green-400", "Tamamlandı"],
    failed: ["bg-red-500/10 border-red-500/20", "text-red-400", "Hata"],
  };
  const [bg, txt, label] = m[status] ?? m.pending;
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${bg} ${txt}`}>{label}</span>;
}

function StatCard({ label, value, icon, delay }: { label: string; value: number; icon: React.ReactNode; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4, ease }}
      className={`${cardCls} p-5 hover:border-[#D8FB32]/20 transition-all duration-300`}>
      <div className="w-9 h-9 rounded-lg bg-[#D8FB32]/10 border border-[#D8FB32]/20 flex items-center justify-center text-[#D8FB32] mb-3">{icon}</div>
      <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
      <div className="text-white/40 text-xs mt-0.5">{label}</div>
    </motion.div>
  );
}

/* ── Inline Form ───────────────────────────────── */
function InlineForm({ title, fields, onSubmit, onCancel, submitting }: {
  title: string; fields: { key: string; label: string; placeholder: string; type?: string }[];
  onSubmit: (d: Record<string, string>) => void; onCancel: () => void; submitting: boolean;
}) {
  const [form, setForm] = useState<Record<string, string>>({});
  const set = (k: string, v: string) => setForm({ ...form, [k]: v });
  return (
    <motion.div {...slide} className="overflow-hidden">
      <div className={`${cardCls} border-[#D8FB32]/20 p-5 mt-4`}>
        <h3 className="text-sm font-bold text-white mb-4">{title}</h3>
        <div className="space-y-3">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="text-white/40 text-xs font-medium mb-1.5 block">{f.label}</label>
              {f.type === "textarea"
                ? <textarea value={form[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} placeholder={f.placeholder} rows={2} className={`${inputCls} resize-none`}/>
                : <input type="text" value={form[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} placeholder={f.placeholder} className={inputCls}/>}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={() => onSubmit(form)} disabled={submitting} className="bg-[#D8FB32] text-[#0A0A0A] px-5 py-2 rounded-[10px] text-sm font-semibold hover:bg-[#B4F030] transition-all disabled:opacity-40 flex items-center gap-2">
            {submitting && <Spinner s={14}/>} Oluştur
          </button>
          <button onClick={onCancel} className="text-white/40 text-sm hover:text-white/60 transition-colors px-3 py-2">İptal</button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Department Form (with icon/color pickers) ─── */
function DeptForm({ icon, setIcon, color, setColor, onSubmit, onCancel, submitting }: {
  icon: string; setIcon: (v: string) => void; color: string; setColor: (v: string) => void;
  onSubmit: (f: Record<string, string>) => void; onCancel: () => void; submitting: boolean;
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <div className="space-y-4">
      <div>
        <label className="text-white/40 text-xs font-medium mb-1.5 block">Departman Adı</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Örn: Pazarlama" className={inputCls}/>
      </div>
      <div>
        <label className="text-white/40 text-xs font-medium mb-1.5 block">Açıklama (opsiyonel)</label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Bu departman ne yapar?" rows={2} className={`${inputCls} resize-none`}/>
      </div>
      <div>
        <label className="text-white/40 text-xs font-medium mb-2 block">Ikon</label>
        <div className="flex flex-wrap gap-1.5">
          {DEPT_ICONS.map((ic) => (
            <button key={ic} type="button" onClick={() => setIcon(ic)}
              className={`w-9 h-9 rounded-lg text-base flex items-center justify-center transition-all ${icon === ic ? "bg-[#D8FB32]/20 border border-[#D8FB32]/40 scale-110" : "bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.12]"}`}>
              {ic}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-white/40 text-xs font-medium mb-2 block">Renk</label>
        <div className="flex flex-wrap gap-2">
          {DEPT_COLORS.map((c) => (
            <button key={c} type="button" onClick={() => setColor(c)} style={{ background: c }}
              className={`w-7 h-7 rounded-full transition-all ${color === c ? "ring-2 ring-white/40 ring-offset-2 ring-offset-[#0A0A0A] scale-110" : "hover:scale-110"}`}/>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 pt-1">
        <button onClick={() => onSubmit({ name, description: desc })} disabled={submitting || !name.trim()}
          className="bg-[#D8FB32] text-[#0A0A0A] px-5 py-2 rounded-[10px] text-sm font-semibold hover:bg-[#B4F030] transition-all disabled:opacity-40 flex items-center gap-2">
          {submitting && <Spinner s={14}/>} Oluştur
        </button>
        <button onClick={onCancel} className="text-white/40 text-sm hover:text-white/60 transition-colors px-3 py-2">İptal</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN DASHBOARD
   ══════════════════════════════════════════════════ */
export default function DashboardPage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<"dept" | "agent" | "task" | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [deptIcon, setDeptIcon] = useState("🏢");
  const [deptColor, setDeptColor] = useState("#D8FB32");

  // Auth
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
      else window.location.href = "/agents/giris";
      setLoading(false);
    });
  }, [supabase.auth]);

  // Fetch
  const fetchData = useCallback(async () => {
    setDataLoading(true);
    setError(null);
    try {
      const [dR, aR, tR] = await Promise.all([fetch("/api/departments"), fetch("/api/agents"), fetch("/api/tasks")]);
      if (!dR.ok || !aR.ok || !tR.ok) {
        throw new Error("API istekleri başarısız oldu");
      }
      const [d, a, t] = await Promise.all([dR.json(), aR.json(), tR.json()]);
      if (Array.isArray(d)) setDepartments(d);
      if (Array.isArray(a)) setAgents(a);
      if (Array.isArray(t)) setTasks(t);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Veriler yüklenirken bir hata oluştu");
    }
    setDataLoading(false);
  }, []);

  useEffect(() => { if (user) fetchData(); }, [user, fetchData]);

  const handleLogout = async () => { await supabase.auth.signOut(); window.location.href = "/agents"; };

  const postJSON = async (url: string, body: Record<string, unknown>) => {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    return res.ok;
  };

  const createDept = async (form: Record<string, string>) => {
    if (!form.name?.trim()) return;
    setSubmitting(true);
    try { if (await postJSON("/api/departments", { name: form.name.trim(), description: form.description?.trim() || null, icon: deptIcon, color: deptColor })) { setShowForm(null); setDeptIcon("🏢"); setDeptColor("#D8FB32"); await fetchData(); } } catch { /* noop */ }
    setSubmitting(false);
  };

  const createAgent = async (form: Record<string, string>) => {
    if (!form.name?.trim() || !form.role?.trim() || !selectedDept) return;
    setSubmitting(true);
    try { if (await postJSON("/api/agents", { department_id: selectedDept, name: form.name.trim(), role: form.role.trim(), description: form.description?.trim() || null, icon: form.icon?.trim() || "🤖" })) { setShowForm(null); await fetchData(); } } catch { /* noop */ }
    setSubmitting(false);
  };

  const createTask = async (form: Record<string, string>) => {
    if (!form.title?.trim()) return;
    setSubmitting(true);
    try { if (await postJSON("/api/tasks", { title: form.title.trim(), description: form.description?.trim() || null, agent_id: null, department_id: selectedDept || null })) { setShowForm(null); await fetchData(); } } catch { /* noop */ }
    setSubmitting(false);
  };

  // Derived
  const completed = tasks.filter((t) => t.status === "completed").length;
  const filteredAgents = selectedDept ? agents.filter((a) => a.department_id === selectedDept) : agents;
  const selDeptData = departments.find((d) => d.id === selectedDept);
  const recent = tasks.slice(0, 10);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const now = useMemo(() => Date.now(), [tasks]);

  const openForm = (f: "dept" | "agent" | "task") => {
    setShowForm(showForm === f ? null : f);
    if (f === "agent" && !selectedDept && departments.length) setSelectedDept(departments[0].id);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="flex items-center gap-3 text-[#D8FB32]"><Spinner s={20}/><span className="text-white/40 text-sm">Yükleniyor...</span></div>
    </div>
  );

  const actionBtn = (label: string, form: "dept" | "agent" | "task", disabled = false) => {
    const active = showForm === form;
    const base = form === "dept"
      ? active ? "bg-[#D8FB32] text-[#0A0A0A]" : "bg-[#D8FB32]/10 text-[#D8FB32] border border-[#D8FB32]/20 hover:bg-[#D8FB32]/20"
      : "border border-white/[0.08] text-white/60 hover:border-[#D8FB32]/30 hover:text-white/80";
    return (
      <button onClick={() => !disabled && openForm(form)} disabled={disabled}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-sm font-semibold transition-all disabled:opacity-25 disabled:cursor-not-allowed ${base}`}>
        {I.plus} {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D8FB32]/[0.015] rounded-full blur-[180px]"/>
      <div className="pointer-events-none absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#5532FA]/[0.015] rounded-full blur-[150px]"/>

      {/* Top Bar */}
      <div className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/kai-carkli.svg" alt="Kai" className="h-7"/>
            <span className="text-white font-bold text-sm tracking-tight">Dashboard</span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#D8FB32]/10 text-[#D8FB32] border border-[#D8FB32]/20 uppercase tracking-wider">Beta</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/30 text-xs hidden sm:block truncate max-w-[200px]">{user?.email}</span>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-white/30 text-xs hover:text-white/60 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/5">
              {I.logout}<span className="hidden sm:inline">Çıkış</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <StatCard label="Departman" value={departments.length} icon={I.dept} delay={0.05}/>
            <StatCard label="Ajan" value={agents.length} icon={I.agent} delay={0.1}/>
            <StatCard label="Toplam Görev" value={tasks.length} icon={I.task} delay={0.15}/>
            <StatCard label="Tamamlanan" value={completed} icon={I.check} delay={0.2}/>
          </div>

          {/* Error State */}
          {error && (
            <div className={`${cardCls} border-red-500/20 bg-red-500/[0.04] p-5 mb-8`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-lg">!</div>
                  <div>
                    <div className="text-sm font-semibold text-red-400">Hata</div>
                    <div className="text-white/40 text-xs mt-0.5">{error}</div>
                  </div>
                </div>
                <button onClick={fetchData} className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-[10px] text-sm font-semibold hover:bg-red-500/20 transition-all">
                  Tekrar Dene
                </button>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.4, ease }} className="mb-8">
            <div className="flex flex-wrap gap-2.5">
              {actionBtn("Departman Oluştur", "dept")}
              {actionBtn("Ajan Ekle", "agent", departments.length === 0)}
              {actionBtn("Görev Ver", "task", agents.length === 0)}
            </div>
            <AnimatePresence mode="wait">
              {showForm === "dept" && (
                <motion.div key="df" {...slide} className="overflow-hidden">
                  <div className={`${cardCls} border-[#D8FB32]/20 p-5 mt-4`}>
                    <h3 className="text-sm font-bold text-white mb-4">Yeni Departman</h3>
                    <DeptForm icon={deptIcon} setIcon={setDeptIcon} color={deptColor} setColor={setDeptColor} onSubmit={createDept} onCancel={() => setShowForm(null)} submitting={submitting}/>
                  </div>
                </motion.div>
              )}
              {showForm === "agent" && (
                <InlineForm key="af" title="Yeni Ajan" fields={[
                  { key: "name", label: "Ajan Adı", placeholder: "Örn: Pazarlama Uzmanı" },
                  { key: "role", label: "Rol", placeholder: "Örn: İçerik üretimi ve strateji" },
                  { key: "icon", label: "Emoji (opsiyonel)", placeholder: "🤖" },
                  { key: "description", label: "Açıklama", placeholder: "Bu ajan ne yapar?", type: "textarea" },
                ]} onSubmit={createAgent} onCancel={() => setShowForm(null)} submitting={submitting}/>
              )}
              {showForm === "task" && (
                <InlineForm key="tf" title="Yeni Görev" fields={[
                  { key: "title", label: "Görev Başlığı", placeholder: "Örn: Blog yazısı yaz" },
                  { key: "description", label: "Detay", placeholder: "Görev detayları...", type: "textarea" },
                ]} onSubmit={createTask} onCancel={() => setShowForm(null)} submitting={submitting}/>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Departments + Agents */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4, ease }}>
                <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-[#D8FB32]">{I.dept}</span> Departmanlar {dataLoading && <Spinner s={14}/>}
                </h2>
                {departments.length === 0 && !dataLoading ? (
                  <div className={`${cardCls} border-dashed p-10 text-center`}>
                    <div className="text-3xl mb-3">🏗️</div>
                    <p className="text-white/50 text-sm font-medium mb-1">Henüz departman yok</p>
                    <p className="text-white/30 text-xs">İlk departmanını oluştur, ajanlarını ata, görevler ver.</p>
                    <button onClick={() => openForm("dept")} className="mt-4 text-[#D8FB32] text-xs font-semibold hover:underline">+ Departman Oluştur</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {departments.map((d) => (
                      <button key={d.id} onClick={() => setSelectedDept(selectedDept === d.id ? null : d.id)}
                        className={`group text-left ${cardCls} p-4 transition-all duration-300 ${selectedDept === d.id ? "border-[#D8FB32]/40 bg-[#D8FB32]/[0.04]" : "hover:border-[#D8FB32]/20"}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ background: `${d.color}15`, border: `1px solid ${d.color}30` }}>{d.icon}</div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-white truncate">{d.name}</div>
                            {d.description && <div className="text-white/30 text-xs mt-0.5 line-clamp-1">{d.description}</div>}
                            <div className="text-white/40 text-xs mt-1.5"><span style={{ color: d.color }}>{d.agent_count}</span> ajan</div>
                          </div>
                        </div>
                      </button>
                    ))}
                    <button onClick={() => openForm("dept")}
                      className="group bg-white/[0.02] border border-dashed border-white/[0.08] rounded-xl p-4 transition-all duration-300 hover:border-[#D8FB32]/30 hover:bg-[#D8FB32]/[0.02] flex items-center justify-center gap-2 min-h-[80px]">
                      <span className="text-white/20 group-hover:text-[#D8FB32]/60 transition-colors">{I.plus}</span>
                      <span className="text-white/20 group-hover:text-white/40 text-sm font-medium transition-colors">Yeni Departman</span>
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Agents for selected dept */}
              <AnimatePresence mode="wait">
                {selectedDept && (
                  <motion.div key={selectedDept} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease }}>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-base font-bold text-white flex items-center gap-2"><span>{selDeptData?.icon}</span> {selDeptData?.name} Ajanları</h2>
                      <button onClick={() => setSelectedDept(null)} className="text-white/30 text-xs hover:text-white/50 transition-colors flex items-center gap-1">{I.back} Tümü</button>
                    </div>
                    {filteredAgents.length === 0 ? (
                      <div className={`${cardCls} border-dashed p-8 text-center`}>
                        <div className="text-2xl mb-2">🤖</div>
                        <p className="text-white/40 text-sm">Bu departmanda henüz ajan yok.</p>
                        <button onClick={() => openForm("agent")} className="mt-3 text-[#D8FB32] text-xs font-semibold hover:underline">+ Ajan Ekle</button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {filteredAgents.map((a, i) => (
                          <motion.div key={a.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, duration: 0.3, ease }}
                            className={`${cardCls} p-4 hover:border-[#D8FB32]/20 transition-all duration-300`}>
                            <div className="flex items-start gap-3">
                              <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-base shrink-0">{a.icon}</div>
                              <div className="min-w-0 flex-1">
                                <span className="text-sm font-semibold text-white">{a.name}</span>
                                <div className="text-[#D8FB32]/70 text-xs mt-0.5">{a.role}</div>
                                {a.description && <div className="text-white/30 text-xs mt-1 line-clamp-2">{a.description}</div>}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Recent Tasks */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.4, ease }}>
              <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2"><span className="text-[#D8FB32]">{I.task}</span> Son Görevler</h2>
              {tasks.length === 0 && !dataLoading ? (
                <div className={`${cardCls} border-dashed p-8 text-center`}>
                  <div className="text-2xl mb-2">📋</div>
                  <p className="text-white/40 text-sm">Henüz görev yok.</p>
                  <p className="text-white/25 text-xs mt-1">Ajan ekledikten sonra görev verebilirsin.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {recent.map((t, i) => {
                    const ag = agents.find((a) => a.id === t.agent_id);
                    return (
                      <motion.div key={t.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.04, duration: 0.3, ease }}
                        className={`${cardCls} p-3.5 hover:border-white/[0.1] transition-all duration-300`}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-white truncate">{t.title}</div>
                            {ag && <div className="text-white/30 text-xs mt-1 flex items-center gap-1"><span>{ag.icon}</span> {ag.name}</div>}
                          </div>
                          <StatusBadge status={t.status}/>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-white/20 text-[10px]">{I.clock} {formatTimeAgo(t.created_at, now)}</div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
