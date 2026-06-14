"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const ROLES = [
  { key: "Client", icon: "person" },
  { key: "Admin", icon: "admin_panel_settings" },
  { key: "Accountant", icon: "calculate" },
  { key: "User", icon: "groups" },
];
const ROLE_ORDER = ["Admin", "Accountant", "Client", "User"];

export default function LoginClient({ mockMode, mockProfiles = [] }) {
  const router = useRouter();
  const [role, setRole] = useState("Client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleOpen, setGoogleOpen] = useState(false);
  const [ssoOpen, setSsoOpen] = useState(false);
  const [ssoEmail, setSsoEmail] = useState("");

  async function handleSignIn(e) {
    e.preventDefault();
    setError("");
    if (!email.trim()) return setError("Please enter your email address.");
    if (!password) return setError("Please enter your password.");
    setLoading(true);
    const res = await signIn("credentials", { email: email.trim(), password, redirect: false });
    if (res?.error) {
      setLoading(false);
      return setError("Invalid email or password.");
    }
    router.push("/dashboard");
    router.refresh();
  }

  function handleGoogle() {
    setError("");
    if (mockMode) return setGoogleOpen(true);
    signIn("google", { callbackUrl: "/dashboard" });
  }

  async function pickProfile(profileEmail) {
    setError("");
    setLoading(true);
    const res = await signIn("mock-google", { email: profileEmail, redirect: false });
    if (res?.error) {
      setLoading(false);
      setGoogleOpen(false);
      return setError("Sign-in failed for that profile.");
    }
    router.push("/dashboard");
    router.refresh();
  }

  async function handleSsoSubmit(e) {
    e.preventDefault();
    if (!ssoEmail.trim()) return;
    await pickProfile(ssoEmail.trim());
  }

  const grouped = {};
  for (const p of mockProfiles) (grouped[p.role] ||= []).push(p);

  return (
    <div className="bg-login-pattern min-h-screen flex items-center justify-center p-container-padding font-body-md text-on-surface">
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden border border-outline-variant">
        {/* Left Side: Visual/Context */}
        <div className="hidden md:flex flex-col justify-between p-stack-lg bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container opacity-20 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-tertiary-fixed-dim opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-stack-sm mb-stack-lg">
              <div className="w-10 h-10 bg-on-primary rounded-lg flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-primary text-[28px]">account_balance</span>
              </div>
              <span className="font-title-sm text-title-sm font-extrabold text-on-primary tracking-tight">EBSPL</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-on-primary mb-stack-md leading-tight">
              Manage your <br />
              <span className="text-tertiary-fixed-dim">financial future</span> with clarity.
            </h1>
            <p className="text-on-primary-container font-body-md opacity-90 max-w-sm">
              Access the industry's most trusted cloud accounting platform for professionals, firms, and enterprise clients.
            </p>
          </div>
          <div className="relative z-10 mt-auto">
            <div className="grid grid-cols-2 gap-stack-md">
              <div className="p-stack-md bg-primary-container/40 rounded-lg border border-primary-fixed-dim/20 backdrop-blur-sm">
                <span className="material-symbols-outlined text-tertiary-fixed-dim mb-2">security</span>
                <h3 className="font-label-bold text-label-bold text-on-primary mb-1">Encrypted Security</h3>
                <p className="text-[11px] text-on-primary-container/80 leading-relaxed">Enterprise-grade protection for all your sensitive financial data.</p>
              </div>
              <div className="p-stack-md bg-primary-container/40 rounded-lg border border-primary-fixed-dim/20 backdrop-blur-sm">
                <span className="material-symbols-outlined text-tertiary-fixed-dim mb-2">speed</span>
                <h3 className="font-label-bold text-label-bold text-on-primary mb-1">Real-time Insights</h3>
                <p className="text-[11px] text-on-primary-container/80 leading-relaxed">Automated reconciliation and instant financial reporting.</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-full opacity-20 pointer-events-none">
            <img
              className="w-full h-48 object-cover grayscale brightness-150"
              alt="A professional high-angle view of a modern minimalist office workspace."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvb2QHLitLaBhiCBuDTWfS-MQKcjMwJbHzXnYJr2L89Kpr6Cb3EIafQC595vlIGeZijKEwGROuMwxK9J2MnKz4OXP4D-LMjfG3UnSP6AYf-6g4DZmEUngY86Ox3DdFftOzP3qzKnikh7z-gtSKmxYwp6wlOqcWJDA3dPnY6HhLEv2US39Iz89uZQGmqLxxzxLb89y9PJXzss07gqYRxLWhLaA-pdhA1LBaKwG3RhTRNbbNswKiMum3aO7cc5XDaeMPHrEOwkaLCEY"
            />
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-stack-lg flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            {/* Mobile Logo */}
            <div className="flex md:hidden items-center gap-stack-sm mb-stack-lg">
              <span className="material-symbols-outlined text-primary text-[32px]">account_balance</span>
              <span className="font-title-sm text-title-sm font-bold text-primary">EBSPL</span>
            </div>
            <div className="mb-stack-lg">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Welcome Back</h2>
              <p className="text-on-surface-variant font-body-md">Please enter your credentials to access your account.</p>
            </div>

            {/* Role Selector */}
            <div className="mb-stack-lg">
              <label className="block font-label-bold text-label-bold text-on-surface-variant mb-stack-sm">LOGIN AS</label>
              <div className="grid grid-cols-4 gap-stack-sm">
                {ROLES.map((r) => {
                  const active = role === r.key;
                  return (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setRole(r.key)}
                      className={
                        "role-btn flex flex-col items-center p-stack-sm rounded-lg border transition-all active:scale-95 " +
                        (active
                          ? "role-active border-primary bg-primary-container/10 text-primary"
                          : "border-outline-variant text-on-surface-variant hover:bg-surface-container-high")
                      }
                    >
                      <span className="material-symbols-outlined mb-1">{r.icon}</span>
                      <span className="text-[10px] font-bold">{r.key}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form className="space-y-stack-md" onSubmit={handleSignIn}>
              {/* Email Field */}
              <div>
                <label className="block font-label-bold text-label-bold text-on-surface-variant mb-unit" htmlFor="email">EMAIL ADDRESS</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">mail</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all font-body-md"
                    id="email"
                    placeholder="e.g. john@company.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-unit">
                  <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="password">PASSWORD</label>
                  <a className="text-primary font-label-bold text-label-bold hover:underline" href="#">Forgot password?</a>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">lock</span>
                  <input
                    className="w-full pl-10 pr-12 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all font-body-md"
                    id="password"
                    placeholder="••••••••"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                  >
                    <span className="material-symbols-outlined">{showPw ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>
              {/* Remember Me */}
              <div className="flex items-center">
                <input className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary-container cursor-pointer" id="remember" type="checkbox" />
                <label className="ml-2 text-body-sm text-on-surface-variant cursor-pointer select-none" htmlFor="remember">Remember me for 30 days</label>
              </div>

              {error && <p className="text-error text-body-sm">{error}</p>}

              {/* Sign In Button */}
              <button
                className="w-full py-4 bg-primary text-on-primary rounded-lg font-title-sm text-title-sm font-bold shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-80"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined" style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>progress_activity</span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-stack-lg">
              <div className="flex items-center gap-3 mb-stack-md">
                <div className="flex-grow h-px bg-outline-variant"></div>
                <span className="font-label-bold text-label-bold text-on-surface-variant uppercase text-[11px]">or continue with</span>
                <div className="flex-grow h-px bg-outline-variant"></div>
              </div>
              <div className="grid grid-cols-2 gap-stack-sm">
                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-lg font-label-bold text-label-bold text-on-surface hover:bg-surface-container-high transition-colors active:scale-95"
                >
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" /> Google
                </button>
                <button
                  type="button"
                  onClick={() => { setError(""); setSsoOpen(true); }}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-lg font-label-bold text-label-bold text-on-surface hover:bg-surface-container-high transition-colors active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">business</span> SSO
                </button>
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-stack-lg pt-stack-lg border-t border-outline-variant flex flex-col items-center gap-stack-md">
              <p className="text-body-sm text-on-surface-variant">
                Don't have an account? <a className="text-primary font-bold hover:underline" href="#">Register your business</a>
              </p>
              <div className="flex items-center gap-stack-md text-on-surface-variant opacity-60">
                <a className="text-[11px] hover:text-primary transition-colors" href="#">Privacy Policy</a>
                <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
                <a className="text-[11px] hover:text-primary transition-colors" href="#">Terms of Service</a>
                <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
                <a className="text-[11px] hover:text-primary transition-colors" href="#">Help Center</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google profile picker (mock mode) */}
      {googleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setGoogleOpen(false)}>
          <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 px-stack-lg py-stack-md border-b border-outline-variant">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              <span className="font-title-sm text-title-sm font-bold text-on-surface">Choose an account</span>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-stack-md">
              {ROLE_ORDER.filter((r) => grouped[r]?.length).map((r) => (
                <div key={r} className="mb-stack-md">
                  <div className="font-label-bold text-label-bold text-on-surface-variant px-2 mb-stack-sm">{r}</div>
                  {grouped[r].map((p) => (
                    <button
                      key={p.email}
                      type="button"
                      disabled={loading}
                      onClick={() => pickProfile(p.email)}
                      className="w-full flex items-center gap-3 p-stack-sm rounded-lg hover:bg-surface-container-high transition-colors text-left"
                    >
                      <span className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center text-[12px] font-bold">{p.initial}</span>
                      <span className="min-w-0">
                        <span className="block text-body-md text-on-surface font-semibold truncate">{p.name}</span>
                        <span className="block text-body-sm text-on-surface-variant truncate">{p.email}</span>
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SSO dialog */}
      {ssoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setSsoOpen(false)}>
          <form onSubmit={handleSsoSubmit} className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant p-stack-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-stack-md">
              <span className="material-symbols-outlined text-primary">business</span>
              <span className="font-title-sm text-title-sm font-bold text-on-surface">Single Sign-On</span>
            </div>
            <label className="block font-label-bold text-label-bold text-on-surface-variant mb-unit" htmlFor="ssoEmail">WORK EMAIL</label>
            <input
              id="ssoEmail"
              type="email"
              autoFocus
              value={ssoEmail}
              onChange={(e) => setSsoEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all font-body-md mb-stack-md"
            />
            <button type="submit" disabled={loading} className="w-full py-3 bg-primary text-on-primary rounded-lg font-title-sm text-title-sm font-bold hover:brightness-110 active:scale-[0.98] transition-all">
              Continue with SSO
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
