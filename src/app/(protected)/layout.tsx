import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
