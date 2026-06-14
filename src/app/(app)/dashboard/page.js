import { redirect } from "next/navigation";
import { auth } from "@/auth";
import DashboardMount from "./DashboardMount";

export const metadata = { title: "EBSPL Cloud Accounting - Enterprise Dashboard" };

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const u = session.user;
  const user = {
    name: u.name,
    email: u.email,
    role: u.role,
    initial: u.initial,
    company: u.company,
    loginMethod: u.loginMethod,
  };

  return <DashboardMount user={user} />;
}
