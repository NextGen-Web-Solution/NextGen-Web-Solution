import { useEffect, useState } from "react";
import {
  Lock, LogOut, Mail, Phone, Inbox, CheckCheck,
  Loader2, ShieldCheck, RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { LogoMark } from "@/components/Logo";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { API_BASE } from "@/lib/api";

const FIELD =
  "h-11 rounded-xl border-white/10 bg-white/[0.04] text-white placeholder:text-gray-500 focus-visible:ring-[#9F5937] focus-visible:border-[#9F5937]";

function formatApiErrorDetail(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).filter(Boolean).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (res.status === 401) {
    const err = new Error("Not authenticated");
    err.status = 401;
    throw err;
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(formatApiErrorDetail(data.detail));
  }
  return res.json();
}

const STATUS_META = {
  new: { label: "New", active: "border border-orange-300/40 bg-orange-300/10 text-orange-200" },
  in_talk: { label: "In Talk", active: "border border-amber-400/40 bg-amber-400/10 text-amber-300" },
  won: { label: "Won", active: "border border-emerald-400/40 bg-emerald-400/10 text-emerald-300" },
};

function InquiryCard({ inquiry, index, onMarkRead, onStatus }) {
  const date = inquiry.created_at
    ? new Date(inquiry.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
    : "—";
  const currentStatus = inquiry.status || "new";
  return (
    <div
      data-testid={`admin-inquiry-card-${index + 1}`}
      className={`rounded-2xl border p-6 transition-colors duration-300 ${
        inquiry.is_read ? "border-white/[0.08] bg-white/[0.02]" : "border-[#9F5937]/40 bg-[#9F5937]/[0.07]"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="font-display text-lg font-semibold text-white">{inquiry.name}</h3>
            {!inquiry.is_read && (
              <span className="rounded-full bg-orange-300/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-orange-200">
                New
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-gray-500">{date}</p>
        </div>
        <div className="flex items-center gap-2">
          {!inquiry.is_read && (
            <button
              data-testid={`admin-mark-read-button-${index + 1}`}
              onClick={() => onMarkRead(inquiry.id, index)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:border-orange-300/50 hover:text-orange-100"
            >
              <CheckCheck size={13} />
              Mark read
            </button>
          )}
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-gray-300">
            {inquiry.service}
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-gray-300">{inquiry.message}</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Status</span>
        {Object.entries(STATUS_META).map(([key, meta]) => (
          <button
            key={key}
            data-testid={`admin-status-${key}-${index + 1}`}
            onClick={() => onStatus(inquiry.id, key, index)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 ${
              currentStatus === key
                ? meta.active
                : "border border-white/10 bg-white/[0.03] text-gray-400 hover:text-white"
            }`}
          >
            {meta.label}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <a
          href={`mailto:${inquiry.email}`}
          data-testid={`admin-inquiry-email-${index + 1}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-gray-200 transition-colors hover:border-orange-300/50 hover:text-orange-100"
        >
          <Mail size={13} />
          {inquiry.email}
        </a>
        <a
          href={`tel:${inquiry.phone.replace(/[^+\d]/g, "")}`}
          data-testid={`admin-inquiry-phone-${index + 1}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-gray-200 transition-colors hover:border-orange-300/50 hover:text-orange-100"
        >
          <Phone size={13} />
          {inquiry.phone}
        </a>
        <a
          href={`https://wa.me/${inquiry.phone.replace(/\D/g, "").replace(/^0+/, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`admin-inquiry-whatsapp-${index + 1}`}
          className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-2 text-xs font-medium text-[#4ade80] transition-colors hover:bg-[#25D366]/20"
        >
          <WhatsAppIcon size={13} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function Admin() {
  const [state, setState] = useState("checking"); // checking | login | ready
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [filter, setFilter] = useState("all");

  const loadInquiries = async () => {
    const data = await api("/admin/inquiries");
    setInquiries(data.inquiries || []);
  };

  const checkSession = async () => {
    setState("checking");
    try {
      await api("/admin/me");
      await loadInquiries();
      setState("ready");
    } catch (e) {
      if (e.status === 401) {
        try {
          await fetch(`${API_BASE}/admin/refresh`, { method: "POST", credentials: "include" });
          await api("/admin/me");
          await loadInquiries();
          setState("ready");
          return;
        } catch (_) {
          /* fall through to login */
        }
      }
      setState("login");
    }
  };

  useEffect(() => {
    document.title = "TheZipCode Admin";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await api("/admin/login", { method: "POST", body: JSON.stringify({ email, password }) });
      setPassword("");
      await loadInquiries();
      setState("ready");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    try {
      await api("/admin/logout", { method: "POST" });
    } catch (_) { /* ignore */ }
    setInquiries([]);
    setState("login");
  };

  const markRead = async (inquiryId) => {
    setInquiries((list) => list.map((q) => (q.id === inquiryId ? { ...q, is_read: true } : q)));
    try {
      await api(`/admin/inquiries/${inquiryId}/read`, { method: "PATCH" });
    } catch (err) {
      toast.error(err.message);
      checkSession();
    }
  };

  const changeStatus = async (inquiryId, status) => {
    const prev = inquiries;
    setInquiries((list) => list.map((q) => (q.id === inquiryId ? { ...q, status } : q)));
    try {
      await api(`/admin/inquiries/${inquiryId}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
    } catch (err) {
      setInquiries(prev);
      toast.error(err.message);
    }
  };

  if (state === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111110] text-gray-400">
        <Loader2 size={28} className="animate-spin text-orange-200" data-testid="admin-loading-spinner" />
      </div>
    );
  }

  if (state === "login") {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111110] px-5">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />
        <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-[#9F5937]/20 blur-[140px]" />
        <form
          onSubmit={login}
          data-testid="admin-login-form"
          className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#1B1A18]/70 p-10 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <LogoMark size={40} />
            <div>
              <h1 className="font-display text-xl font-bold tracking-tight text-white">TheZipCode Admin</h1>
              <p className="text-xs text-gray-400">Private inquiries dashboard</p>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div className="space-y-2">
              <label htmlFor="admin-email" className="text-[13px] text-gray-300">
                Admin Email
              </label>
              <input
                id="admin-email"
                data-testid="admin-login-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className={`w-full px-4 ${FIELD}`}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-[13px] text-gray-300">
                Password
              </label>
              <input
                id="admin-password"
                data-testid="admin-login-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                required
                className={`w-full px-4 ${FIELD}`}
              />
            </div>
            {error && (
              <p data-testid="admin-login-error" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                {error}
              </p>
            )}
            <button
              type="submit"
              data-testid="admin-login-submit-button"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9F5937] to-[#D2A078] px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60"
            >
              {busy ? <Loader2 size={16} className="animate-spin" /> : <Lock size={15} />}
              {busy ? "Signing in…" : "Sign In"}
            </button>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <ShieldCheck size={13} />
            Authorized access only
          </p>
        </form>
      </div>
    );
  }

  const unreadCount = inquiries.filter((q) => !q.is_read).length;
  const visible = filter === "all" ? inquiries : inquiries.filter((q) => (q.status || "new") === filter);

  return (
    <div className="min-h-screen bg-[#111110] text-white" data-testid="admin-dashboard">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#111110]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <LogoMark size={32} />
            <div>
              <p className="font-display text-base font-bold tracking-tight">TheZipCode Admin</p>
              <p className="text-[11px] text-gray-400">Inquiries dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              data-testid="admin-inquiries-count"
              className="rounded-full border border-[#9F5937]/40 bg-[#9F5937]/10 px-3.5 py-1.5 text-xs font-semibold text-orange-100"
            >
              {unreadCount} unread · {inquiries.length} total
            </span>
            <button
              data-testid="admin-logout-button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-gray-300 transition-colors hover:border-red-400/40 hover:text-red-300"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        {inquiries.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] py-24 text-center" data-testid="admin-empty-state">
            <span className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-orange-200">
              <Inbox size={28} />
            </span>
            <div>
              <p className="font-display text-lg font-semibold">No inquiries yet</p>
              <p className="mt-1 text-sm text-gray-400">
                New project inquiries from your website will appear here instantly.
              </p>
            </div>
            <button
              onClick={() => checkSession()}
              data-testid="admin-refresh-button"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-gray-300 transition-colors hover:border-orange-300/50 hover:text-orange-100"
            >
              <RefreshCw size={13} />
              Refresh
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap gap-2" data-testid="admin-status-filters">
              {[["all", "All"], ["new", "New"], ["in_talk", "In Talk"], ["won", "Won"]].map(([key, label]) => {
                const count = key === "all" ? inquiries.length : inquiries.filter((q) => (q.status || "new") === key).length;
                return (
                  <button
                    key={key}
                    data-testid={`admin-filter-${key}`}
                    onClick={() => setFilter(key)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-200 ${
                      filter === key
                        ? "bg-gradient-to-r from-[#9F5937] to-[#D2A078] text-white"
                        : "border border-white/10 bg-white/[0.03] text-gray-400 hover:text-white"
                    }`}
                  >
                    {label} ({count})
                  </button>
                );
              })}
            </div>

            <div className="space-y-4" data-testid="admin-inquiry-list">
              {visible.length === 0 ? (
                <p className="py-16 text-center text-sm text-gray-500">No inquiries in this stage.</p>
              ) : (
                visible.map((q, i) => (
                  <InquiryCard key={q.id || i} inquiry={q} index={i} onMarkRead={markRead} onStatus={changeStatus} />
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
