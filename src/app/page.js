import { auth } from "@/auth";
import { HUB_CSS, HUB_HTML } from "./hubData";
import SessionBar from "./SessionBar";

export const metadata = { title: "EBSPL Cloud Accounting — UI Prototypes" };

export default async function Home() {
  const session = await auth();
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HUB_CSS }} />
      <div dangerouslySetInnerHTML={{ __html: HUB_HTML }} />
      <SessionBar user={session?.user || null} />
    </>
  );
}
