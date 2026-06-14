import { redirect } from "next/navigation";
import { auth, hasRealGoogle } from "@/auth";
import { prisma } from "@/lib/prisma";
import LoginClient from "./LoginClient";

export const metadata = { title: "Login - EBSPL Cloud Accounting" };

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  const mockMode = !hasRealGoogle;
  let mockProfiles = [];
  if (mockMode) {
    mockProfiles = await prisma.user.findMany({
      select: { name: true, email: true, role: true, initial: true, company: true },
      orderBy: [{ role: "asc" }, { name: "asc" }],
    });
  }

  return <LoginClient mockMode={mockMode} mockProfiles={mockProfiles} />;
}
