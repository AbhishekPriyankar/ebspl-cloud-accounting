"use client";

import dynamic from "next/dynamic";

// The dashboard is a client SPA (MemoryRouter + window/localStorage). Load client-only.
const DashboardApp = dynamic(() => import("./DashboardApp"), { ssr: false });

export default function DashboardMount({ user }) {
  return (
    <div className="ebspl-dashboard">
      <DashboardApp user={user} />
    </div>
  );
}
