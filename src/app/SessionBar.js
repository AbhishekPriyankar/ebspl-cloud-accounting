"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

// Reproduces index.html's session status bar, wired to the real Auth.js session.
// Also bridges the session into localStorage so the static prototype pages
// (served from /public) see an active session and don't bounce to their own login.
export default function SessionBar({ user }) {
  useEffect(() => {
    try {
      if (user && user.name) {
        localStorage.setItem(
          "ebspl_user",
          JSON.stringify({
            name: user.name,
            email: user.email,
            role: user.role,
            initial: user.initial,
            company: user.company,
            loginMethod: user.loginMethod,
          })
        );
      }
    } catch (e) {}
  }, [user]);

  if (user && user.name) {
    const initial =
      user.initial ||
      user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
    return (
      <div
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, background: "#1e293b",
          color: "#f8fafc", padding: "10px 24px", fontFamily: "Inter, sans-serif",
          fontSize: 13, display: "flex", alignItems: "center", gap: 12, zIndex: 9999,
          borderTop: "2px solid #ec5b13",
        }}
      >
        <div
          style={{
            width: 28, height: 28, borderRadius: "50%", background: "#ec5b13",
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 11, flexShrink: 0,
          }}
        >
          {initial}
        </div>
        <div>
          <strong>{user.name}</strong>{" "}
          <span style={{ opacity: 0.6, fontSize: 11 }}>{user.role ? "· " + user.role : ""}</span>
        </div>
        <div style={{ flex: 1 }} />
        <span style={{ opacity: 0.5, fontSize: 11 }}>Active session</span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          style={{
            background: "#ef4444", border: "none", color: "#fff", padding: "6px 14px",
            borderRadius: 6, fontWeight: 700, fontSize: 12, cursor: "pointer", marginLeft: 8,
          }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, background: "#0f172a",
        color: "#94a3b8", padding: "8px 24px", fontFamily: "Inter, sans-serif",
        fontSize: 12, textAlign: "center", zIndex: 9999,
      }}
    >
      No active session — click <strong style={{ color: "#f8fafc" }}>Login</strong> below to sign in
    </div>
  );
}
